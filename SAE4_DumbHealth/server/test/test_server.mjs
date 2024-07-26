'use strict';
import * as chai from 'chai';
import fs from 'fs';
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;
import supertest from "supertest"
import server from '../server.mjs';
const requestWithSuperTest = supertest(server);

describe('Request to micro-service', () => {
   /**
    * To run this test insure that the micro-services in the config.json are on.
    */
    it('Test proxy', async = () => {
        
    }); 
});

