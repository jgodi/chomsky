import { test } from 'ava';
const sinon = require('sinon'); // Require because this package does not support commonjs modules
import { Loader } from './loader';

let server;

test.beforeEach(t => {
    t.context.loader = new Loader();
    server = sinon.fakeServer.create();
});

test.afterEach(() => {
    server.restore();
});

// Method Checking

test('should be defined', t => {
    t.truthy(t.context.loader);
});

test('should have a method load', t => {
    t.truthy(t.context.loader.load);
});

// load(url)

test('load should properly load a json file', t => {
    let valid = { KEY: 'value' };
    t.context.loader.load('/valid.json').then(result => {
        t.deepEqual(result, valid);
    });
    server.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(valid));
});

test('load should reject with JSON parse fails', t => {
    t.context.loader.load('/invalid.json').then(() => { }, error => {
        t.is(error, 'Parse Error: Invalid JSON');
    });
    server.requests[0].respond(200, { 'Content-Type': 'application/json' }, '["\t"]');
});

test('load should reject when 404 happens', t => {
    t.context.loader.load('/404.json').then(() => { }, error => {
        t.is(error, 'Not Found');
    });
    server.requests[0].respond(404);
});

test.todo('Find out how to force error to test "onerror"');
