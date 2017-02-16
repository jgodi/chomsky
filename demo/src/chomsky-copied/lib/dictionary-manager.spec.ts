import { test } from 'ava';
import { DictionaryManager } from './dictionary-manager';

test.beforeEach(t => {
    t.context.manager = new DictionaryManager();
});

// Method Checking

test('should be defined', t => {
    t.truthy(t.context.manager);
});

test('should have a method contains', t => {
    t.truthy(t.context.manager.contains);
});

test('should have a method get', t => {
    t.truthy(t.context.manager.get);
});

test('should have a method add', t => {
    t.truthy(t.context.manager.add);
});

// contains(key)

test('contains should return true if it contains the locale', t => {
    t.context.manager.dictionaries = { test: {} };
    t.true(t.context.manager.contains('test'));
});

test('contains should return false if it does not contains the locale', t => {
    t.false(t.context.manager.contains('test'));
});

// get(key)

test('get should return locale if it exists', t => {
    t.context.manager.dictionaries = { test: { KEY: 'value' } };
    t.deepEqual(t.context.manager.get('test'), { KEY: 'value' });
});

test('get should return undefined if it does not exists', t => {
    t.context.manager.dictionaries = {};
    t.is(t.context.manager.get('test'), undefined);
});

// add(key, value, value)

test('add should properly add a new object into the dictionary', t => {
    t.context.manager.add('test', { ONE: 1 }, { TWO: 2 });
    t.deepEqual(t.context.manager.get('test'), { ONE: 1, TWO: 2 });
});
