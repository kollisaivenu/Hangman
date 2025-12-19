const express = require('express');
const router = express.Router();
const { generateGameName, generateMessage, generateState } = require('./gameUtils');
const mongoDbClient = new (require('./mongoDbClient'))();

router.post('/joingame', async (req, res) => {
    const { gameName, playerName } = req.body;
    await mongoDbClient.setGuesserPlayer(gameName, playerName);
    res.status(201).json({ success: true, message: 'Guesser set' });
});

router.post('/creategame', async (req, res) => {
    const { playerName } = req.body;
    const gameName = generateGameName();
    await mongoDbClient.createGame(gameName);
    await mongoDbClient.setRiddlerPlayer(gameName, playerName);
    res.status(201).json({ success: true, gameName, message: 'Game created' });
});

router.post('/riddler', async (req, res) => {
    const { gameName, puzzle } = req.body;
    const state = '-_'.repeat(puzzle.length).slice(1);
    await mongoDbClient.setPuzzle(gameName, puzzle);
    await mongoDbClient.setState(gameName, state);
    res.json({ success: true });
});

router.post('/guesser', async (req, res) => {
    const { gameName, guess } = req.body;
    const puzzle = await mongoDbClient.getPuzzle(gameName);
    const tries = await mongoDbClient.getTries(gameName);
    const state = await mongoDbClient.getState(gameName);
    const newState = generateState(puzzle, guess, state);
    await mongoDbClient.setState(gameName, newState);
    await mongoDbClient.setTries(gameName, tries + 1);
    const message = generateMessage(tries + 1);
    res.json({ message });
});

module.exports = router;
