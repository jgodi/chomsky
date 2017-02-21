import { test } from 'ava';
import { isFunction, isObject, mergeDeep } from './object-assign-deep';

// Method Checking

test('should export isFunction', t => {
    t.truthy(isFunction);
});

test('should export isObject', t => {
    t.truthy(isObject);
});

test('should export mergeDeep', t => {
    t.truthy(mergeDeep);
});

// isObject(obj)

test('isObject should return true if the value is an object', t => {
    t.true(isObject({}));
});

test('isObject should return false if the value is not an object', t => {
    t.false(isObject([]));
    t.false(isObject('Test'));
    t.false(isObject(123));
});

// isFunction(obj)

test('isFunction should return true if the value is anfunction', t => {
    t.true(isFunction(() => { }));
});

test('isFunction should return false if the value is not a function', t => {
    t.false(isFunction([]));
    t.false(isFunction('Test'));
    t.false(isFunction(123));
});

// mergeDeep(...args)

test('mergeDeep should merge two basic objects', t => {
    const a = { a: 1 };
    const b = { b: { c: { d: 1 } } };
    const result = { a: 1, b: { c: { d: 1 } } };
    t.deepEqual(mergeDeep(a, b), result);
});

test('mergeDeep should perform overrides', t => {
    const a = { a: 1 };
    const b = { a: 2, b: { c: { d: 1 } } };
    const result = { a: 2, b: { c: { d: 1 } } };
    t.deepEqual(mergeDeep(a, b), result);
});

test('mergeDeep should merge two complex objects', t => {
    const a = { a: 1, e: [2] };
    const b = { b: { c: { d: [1, 2, 3] } }, e: [1] };
    const result = { a: 1, b: { c: { d: [1, 2, 3] } }, e: [2, 1] };
    t.deepEqual(mergeDeep(a, b), result);
});

test('mergeDeep should merge objects with functions', t => {
    const a = { a: () => { } };
    const b = { b: () => { } };
    const result = mergeDeep(a, b);
    t.true(isFunction(result.a));
    t.true(isFunction(result.b));
});

test('mergeDeep should handle undefined', t => {
    const a = { a: 1 };
    const b = { b: { c: { d: 1 } } };
    const result = { a: 1, b: { c: { d: 1 } } };
    t.deepEqual(mergeDeep(a, b, undefined), result);
});
