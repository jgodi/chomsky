import { test } from 'ava';
import { Loader } from './loader';

test.beforeEach(t => {
    t.context = new Loader();
});

// Method Checking

test('should be defined', t => {
    t.truthy(t.context);
});

test('should have a method load', t => {
    t.truthy(t.context.load);
});

// TODO

test.todo('Figure out how to mock/test XMLHttpRequest & Observable!');
