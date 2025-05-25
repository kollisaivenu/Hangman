const { SET_GAME_STATUS, SET_GAME_STATE } = require('./events');
const { generateMessageForRiddler } = require('./gameUtils');
const mongoDbClient = new (require('./mongoDbClient'))();

function watchChanges(io) {
    const retrieve = { fullDocument: 'updateLookup' };

    const filterTries = [{ $match: { operationType: 'update', 'updateDescription.updatedFields.tries': { $exists: true } } }];
    const filterState = [{ $match: { operationType: 'update', 'updateDescription.updatedFields.stateOfGame': { $exists: true } } }];

    const triesStream = mongoDbClient.getStream(filterTries, retrieve);
    const stateStream = mongoDbClient.getStream(filterState, retrieve);

    triesStream.on('change', ({ fullDocument }) => {
        const message = generateMessageForRiddler(fullDocument.tries);
        io.to(fullDocument.riddlerSocketId).emit(SET_GAME_STATUS, message);
    });

    stateStream.on('change', ({ fullDocument }) => {
        io.to(fullDocument.guesserSocketId).emit(SET_GAME_STATE, fullDocument.stateOfGame);
    });

    triesStream.on('error', (err) => console.error('Tries stream error:', err));
    stateStream.on('error', (err) => console.error('State stream error:', err));
}

module.exports = watchChanges;
