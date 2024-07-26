"use strict"
import * as chai from "chai";
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;
import supertest from "supertest"
import server from "../server.mjs";
import mongoose from "mongoose";
import { genKey } from "../tools/gen.mjs";
import keyDAO from "../api/dao/KeyDAO.mjs";
import { connectToTestDb } from "../tools/mongo.mjs";
const request = supertest.agent(server);
const key = genKey();

/**
 * These tests require a functional DAO
 */
describe('GET /checkkey and /genkey', () => {
    before(async () => {
        await mongoose.connection.close();
        await connectToTestDb();

        // Add a test key with admin permission
        await keyDAO.add(key, true);
    });

    after(async () => {
        // Close the database connection after all tests have run
        await mongoose.connection.close();
    });

    // Test GET /checkkey with no parameters
    it('GET /checkkey - no params', async () => {
        const res = await request
            .get('/checkkey')
            .set('x-api-key', key);
        expect(res.status).to.be.equal(400); // 400: Bad Request
    });

    // Test GET /checkkey with an invalid key
    it('GET /checkkey - invalid key', async () => {
        const data = genKey();
        const res = await request
            .get('/checkkey?key=' + data)
            .set('x-api-key', key);
        expect(res.status).to.be.equal(404); // 404: Not Found
    });

    // Test GET /checkkey with a valid key
    it('GET /checkkey - valid key', async () => {
        const data = genKey();
        await keyDAO.add(data);
        const res = await request
            .get('/checkkey?key=' + data)
            .set('x-api-key', key);
        expect(res.status).to.be.equal(200); // 200: OK
        expect(res.body.key).to.be.not.equal(undefined);
    });

    // Test GET /genkey
    it('GET /genkey', async () => {
        const res = await request
            .get('/genkey')
            .set('x-api-key', key);
        expect(res.status).to.be.equal(201); // 201: Create
        expect(res.body.key).to.be.not.equal(undefined);
    });
























    // Test the admin middleware with no key
    it('Admin Middleware - no key', async () => {
        const res = await request.get('/');
        expect(res.status).to.be.equal(400); // 400: Bad Request
    });

    // Test the admin middleware with a non-admin key
    it('Admin Middleware - not an admin key', async () => {
        const data = genKey();
        await keyDAO.add(data, false);
        const res = await request
            .get('/')
            .set('x-api-key', data);
        expect(res.status).to.be.equal(401); // 401: Unauthorized
    });

    // Test the admin middleware with an admin key
    it('Admin Middleware - not an admin key', async () => {
        const data = genKey();
        await keyDAO.add(data, true);
        const res = await request
            .get('/')
            .set('x-api-key', data);
        expect(res.status).to.be.equal(404); // 404: Not Found
    });
});

