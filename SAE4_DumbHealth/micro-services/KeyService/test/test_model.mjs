'use strict';
import * as chai from "chai";
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;
import Key from "../api/models/Key.mjs";

describe("Key Model tests", () => {
    // Test creating a key with invalid data
    it("create - invalid data", async () => {
        expect(() => {
            new Key({
                key: 'abc',
                isAdmin: false,
                created_at: new Date(Date.now()),
                expired_at: new Date(Date.now()),
            });
        }).to.throws();
    });

    // Test creating a key with valid data
    it("create - valid data", async () => {
        const data = {
            _id: '1234567890123',
            key: 'abcabcabc',
            isAdmin: false,
            created_at: new Date(Date.now()),
            expired_at: new Date(Date.now()),
        }
        const key = new Key(data);

        // Check that the key has the correct properties and values
        expect(key).to.have.property('_id', data._id);
        expect(key).to.have.property('key', data.key);
        expect(key).to.have.property('isAdmin', data.isAdmin);
        expect(key).to.have.property('created_at', data.created_at);
        expect(key).to.have.property('expired_at', data.expired_at);

        // Check that the key only has the expected properties
        expect(key).to.have.keys('_id', 'key', 'isAdmin', 'created_at', 'expired_at');
    });
});