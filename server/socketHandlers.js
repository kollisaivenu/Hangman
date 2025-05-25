const { SEND_GUESSER_SOCKET_ID, SEND_RIDDLER_SOCKET_ID } = require('./events');
const mongoDbClient = new (require('./mongoDbClient'))();

function setupSocketHandlers(io) {
    io.on('connection', (socket) => {
        socket.on(SEND_GUESSER_SOCKET_ID, async ({ gameName, id }) => {
            await mongoDbClient.setGuesserSocketId(gameName, id);
        });

        socket.on(SEND_RIDDLER_SOCKET_ID, async ({ gameName, id }) => {
            await mongoDbClient.setRiddlerSocketId(gameName, id);
        });
    });
}

module.exports = setupSocketHandlers;
