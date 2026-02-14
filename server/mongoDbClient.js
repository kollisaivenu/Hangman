const {MongoClient} = require('mongodb');
require('dotenv').config();

class MongoDbClient {
    async init() {
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;
        const url = `mongodb+srv://${username}:${password}@hangman-cluster.4t3t4b5.mongodb.net/?retryWrites=true&w=majority&appName=hangman-cluster&compressors=zlib`
        try {
            this.client = new MongoClient(url);
            await this.client.connect();
        } catch(err) {
            console.error('Connection error:', err);
        }
        this.database = this.client.db("hangman");
        this.collection = this.database.collection("game");
    }

    async getPuzzle(gameName) {
        const query = {gameName: gameName};
        const options = {
            projection: {puzzle: 1}
        };
        const cursor = await this.collection.findOne(query, options);
        return cursor.puzzle;

    }

    async getTries(gameName){
        const query = {gameName: gameName};
        const options = {
            projection: {tries: 1}
        };
        const cursor = await this.collection.findOne(query, options);
        return cursor.tries;
    }

    async getState(gameName) {
        const query = {gameName: gameName};
        const options = {
            projection: {stateOfGame: 1}
        };
        const cursor = await this.collection.findOne(query, options);
        return cursor.stateOfGame;
    }


    async createGame(gameName){
        const doc = {gameName: gameName, puzzle: '', tries:0, stateOfGame: '', guesserPlayer: '', riddlerPlayer:'', guesserSocketId: '', riddlerSocketId: ''};
        return this.collection.insertOne(doc);
    }
    async setState(gameName, stateOfGame) {
        const filter = { gameName: gameName };
        const updateDoc = {
            $set: {
                stateOfGame: stateOfGame
            },
        };
        const options = { upsert: false };
        return await this.collection.updateOne(filter, updateDoc, options);
    }

    async setTries(gameName, tries) {
        const filter = { gameName: gameName };
        const updateDoc = {
            $set: {
                tries: tries
            },
        };
        const options = { upsert: false };
        return await this.collection.updateOne(filter, updateDoc, options);

    }

    async setPuzzle(gameName, puzzle) {
        const filter = { gameName: gameName };
        const updateDoc = {
            $set: {
                puzzle: puzzle
            },
        };
        const options = { upsert: false };
        return await this.collection.updateOne(filter, updateDoc, options);

    }

    async setRiddlerPlayer(gameName, playerName) {
        const filter = { gameName: gameName };
        const updateDoc = {
            $set: {
                riddlerPlayer: playerName
            },
        };
        const options = { upsert: false };
        return await this.collection.updateOne(filter, updateDoc, options);
    }

    async setGuesserPlayer(gameName, playerName) {
        const filter = { gameName: gameName };
        const updateDoc = {
            $set: {
                guesserPlayer: playerName
            },
        };
        const options = { upsert: false };
        return await this.collection.updateOne(filter, updateDoc, options);
    }

    async setGuesserSocketId(gameName, socketId) {
        const filter = { gameName: gameName };
        const updateDoc = {
            $set: {
                guesserSocketId: socketId
            },
        };
        const options = { upsert: false };
        return await this.collection.updateOne(filter, updateDoc, options);
    }

    async setRiddlerSocketId(gameName, socketId) {
        const filter = { gameName: gameName };
        const updateDoc = {
            $set: {
                riddlerSocketId: socketId
            },
        };
        const options = { upsert: false };
        return await this.collection.updateOne(filter, updateDoc, options);
    }

    async getGuesserSocketId(gameName){
        const query = {gameName: gameName};
        const options = {
            projection: {guesserSocketId: 1}
        };
        const cursor = await this.collection.findOne(query, options);
        return cursor.tries;
    }

    async getRiddlerSocketId(gameName){
        const query = {gameName: gameName};
        const options = {
            projection: {riddlerSocketId: 1}
        };
        const cursor = await this.collection.findOne(query, options);
        return cursor.tries;
    }

    getStream(filter, retrieve){
        return this.client.watch(filter, retrieve);
    }
}
module.exports = MongoDbClient;