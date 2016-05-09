import { Storage } from './storage.js';

describe('LocalStorage Tests', () => {
    it('constructor', () => {
        let setKey = '';
        let removeKey = '';

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            setKey = key
        });

        spyOn(localStorage, 'removeItem').and.callFake(function (key) {
            removeKey = key;
        });

        let storage = new Storage('test');

        expect(setKey == removeKey);
    });

    it('getItem missing', () => {
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        });

        spyOn(localStorage, 'removeItem').and.callFake(function (key) {
        });

        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return null;
        });

        let storage = new Storage('test');
        let actaul = storage.getItem('key');

        expect(actaul).toEqual(storage.defaultObject);
    });

    it('getItem', () => {
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        });

        spyOn(localStorage, 'removeItem').and.callFake(function (key) {
        });

        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            if (key == 'test-key') {
                return '{"success":true}';
            } else {
                return '{"success":false}';
            }
        });

        let storage = new Storage('test');
        let actaul = storage.getItem('key');

        expect(actaul).toEqual({ success: true });
    });

    it("setItem", () => {
        let setItemValue = undefined;
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            if (key == 'test-key') {
                setItemValue = value;
            }
        });

        spyOn(localStorage, 'removeItem').and.callFake(function (key) {
        });

        let storage = new Storage('test');
        storage.setItem('key', 'value');

        expect(setItemValue = 'value');

    });

    it("removeItem", () => {
        let removeItemCalled = false;

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        });

        spyOn(localStorage, 'removeItem').and.callFake(function (key) {
            if (key == 'test-key') {
                removeItemCalled = true;
            }
        });

        let storage = new Storage('test');
        storage.removeItem('key');

        expect(removeItemCalled);

    });

    it("clear", () => {
        let clearCalled = false;
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        });

        spyOn(localStorage, 'removeItem').and.callFake(function (key) {
        });

        spyOn(localStorage, 'clear').and.callFake(function () {
            clearCalled = true;
        });

        let storage = new Storage('test');
        storage.clear();

        expect(clearCalled);

    });

});

describe('SessionStorage Tests', () => {
    it('constructor', () => {
        let setKey = '';
        let removeKey = '';

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
            setKey = key;
        });

        spyOn(sessionStorage, 'removeItem').and.callFake(function (key) {
            removeKey = key;
        });

        let storage = new Storage('test');

        expect(setKey == removeKey);
    });

    it('getItem missing', () => {

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
        });

        spyOn(sessionStorage, 'removeItem').and.callFake(function (key) {
        });

        spyOn(sessionStorage, 'getItem').and.callFake(function (key) {
            return null;
        });

        let storage = new Storage('test');
        let actaul = storage.getItem('key');

        expect(actaul == storage.defaultObject);
    });

    it('getItem', () => {

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
        });

        spyOn(sessionStorage, 'removeItem').and.callFake(function (key) {
        });

        spyOn(sessionStorage, 'getItem').and.callFake(function (key) {
            if (key == 'test-key') {
                return '{"success":true}';
            } else {
                return '{"success":false}';
            }
        });

        let storage = new Storage('test');
        let actaul = storage.getItem('key');

        expect(actaul).toEqual({ success: true });
    });

    it('setItem', () => {
        let setItemValue = undefined;

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
            if (key == 'test-key') {
                setItemValue = value;
            }
        });

        spyOn(sessionStorage, 'removeItem').and.callFake(function (key) {
        });

        let storage = new Storage('test');
        storage.setItem('key', 'value');

        expect(setItemValue = 'value');

    });

    it('removeItem', () => {
        let removeItemCalled = false;

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
        });

        spyOn(sessionStorage, 'removeItem').and.callFake(function (key) {
            if (key == 'test-key') {
                removeItemCalled = true;
            }
        });

        let storage = new Storage('test');
        storage.removeItem('key');

        expect(removeItemCalled);

    });

    it('clear', () => {
        let clearCalled = false;

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
        });

        spyOn(sessionStorage, 'clear').and.callFake(function () {
            clearCalled = true;
        });

        let storage = new Storage('test');
        storage.clear();

        expect(clearCalled);

    });
});

describe('Default Implementation Tests', () => {
    it('constructor', () => {
        let setKey = '';
        let removeKey = '';

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        let storage = new Storage('test');

    });

    it('getItem missing', () => {
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        let storage = new Storage('test');
        let actualObj = storage.getItem('foo');

        expect(actualObj).toEqual(storage.defaultObject);
    });

    it('getItem/setItem', () => {
        let expectedValue = { field1: 'field1', field2: 'field2' };
        let key = 'testKey';

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        let storage = new Storage('test');
        storage.setItem(key, expectedValue);
        let actualValue = storage.getItem(key);

        expect(actualValue).toEqual(expectedValue);
    });

    it('removeItem', () => {
        let expectedValue = 'expectedValue';
        let key = 'testKey';

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        let storage = new Storage('test');
        storage.setItem(key, expectedValue);
        let actualValue = storage.getItem(key);

        expect(actualValue == expectedValue);

        storage.removeItem(key);
        actualValue = storage.getItem(key);

        expect(actualValue).toEqual(storage.defaultObject);

    });

    it('clear', () => {
        let expectedValue = 'expectedValue';
        let key = 'testKey';

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
            throw "Undefined";
        });

        let storage = new Storage('test');
        storage.setItem(key, expectedValue);
        let actualValue = storage.getItem(key);

        expect(actualValue == expectedValue);

        storage.clear();
        actualValue = storage.getItem(key);

        expect(actualValue).toEqual(storage.defaultObject);

    });

});

describe('Localstorage Implementation Tests', () => {
    it('constructor', () => {
        let setKey = '';
        let removeKey = '';

        localStorage.clear();

        let storage = new Storage('test');

        localStorage.clear();
    });

    it('getItem missing', () => {
        localStorage.clear();

        let storage = new Storage('test');
        let actualObj = storage.getItem('foo');

        expect(actualObj).toEqual(storage.defaultObject);

        localStorage.clear();
    });

    it('getItem/setItem', () => {
        let expectedValue = { field1: 'field1', field2: 'field2' };
        let key = 'testKey';

        localStorage.clear();

        let storage = new Storage('test');
        storage.setItem(key, expectedValue);
        let actualValue = storage.getItem(key);

        expect(actualValue).toEqual(expectedValue);

        localStorage.clear();
    });

    it('removeItem', () => {
        let expectedValue = 'expectedValue';
        let key = 'testKey';

        localStorage.clear();

        let storage = new Storage('test');
        storage.setItem(key, expectedValue);
        let actualValue = storage.getItem(key);

        expect(actualValue == expectedValue);

        storage.removeItem(key);
        actualValue = storage.getItem(key);

        expect(actualValue).toEqual(storage.defaultObject);

        localStorage.clear();
    });

    it('clear', () => {
        let expectedValue = 'expectedValue';
        let key = 'testKey';

        localStorage.clear();

        let storage = new Storage('test');
        storage.setItem(key, expectedValue);
        let actualValue = storage.getItem(key);

        expect(actualValue == expectedValue);

        storage.clear();
        actualValue = storage.getItem(key);

        expect(actualValue).toEqual(storage.defaultObject);

        localStorage.clear();
    });

});
