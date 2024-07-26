'use strict';
import * as chai from "chai";
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;
import mongoose from 'mongoose';
import keyDAO from "../api/dao/KeyDAO.mjs";
import { genKey } from "../tools/gen.mjs";
import { connectToTestDb } from "../tools/mongo.mjs";

describe('KeyDAO tests', () => {
    before(async () => {
        await mongoose.connection.close();
        await connectToTestDb()
    });

    after(async () => {
        // Close the database connection after all tests have run
        await mongoose.connection.close();
    });

    // Test finding a key by ID with an invalid ID
    it('findById - invalid id', async () => {
        expect(await keyDAO.findById('')).to.be.equal(null);
    });

    // Test finding a key by ID with a valid ID
    it('findById - valid id', async () => {
        const key = genKey();
        const id = (await keyDAO.add(key))._id;
        expect((await keyDAO.findById(id)).key).to.be.equal(key);
    });

    // Test finding a key with an invalid key
    it('find - invalid key', async () => {
        const key = genKey();
        expect(await keyDAO.find(key)).to.be.equal(null);
    });

    // Test finding a key with a valid key
    it('find - valid key', async () => {
        const key = genKey();
        await keyDAO.add(key);
        expect((await keyDAO.find(key)).key).to.be.equal(key);
    });

    // Test adding a key with invalid data
    it('add - invalid data', async () => {
        expect(await keyDAO.add('')).to.be.equal(null);
    });

    // Test adding a key with valid data
    it('add - valid data', async () => {
        const key = genKey();
        expect((await keyDAO.add(key)).key).to.be.equal(key);
    });

    // Test adding a key that already exists in the database
    it('add - already existing key', async () => {
        const key = genKey();
        await keyDAO.add(key);
        expect(await keyDAO.add(key)).to.be.equal(null);
    });

    // Test removing a key with an invalid ID
    it('remove - invalid id', async () => {
        expect(await keyDAO.remove('')).to.be.false;
    });

    // Test removing a key with a valid ID
    it('remove - valid id', async () => {
        const key = await keyDAO.add(genKey());
        expect(await keyDAO.remove(key._id)).to.be.true;
    });
});