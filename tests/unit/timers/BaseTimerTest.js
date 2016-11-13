'use strict';

import BaseTimer from '../../../src/Timers/BaseTimer';
import TestHelper from '../../helpers/TestHelper';
import faker from 'faker';

describe('Base Timer', function(){

    it('fails when attempting to create instance - is abstract', function () {
        let f = () => {
            return new BaseTimer(faker.random.word());
        };

        expect(f).toThrowError(TypeError);
    });

    it('can set and get properties', function () {
        let id = faker.random.uuid();
        let callback = () => {
            return true;
        };
        let delay = 1200;

        let timer = TestHelper.makeEmptyTimer(id, callback, delay);

        expect(timer.id).toBe(id, 'Incorrect id');
        expect(timer.callback).toBe(callback, 'Incorrect callback');
        expect(timer.delay).toBe(delay, 'Incorrect delay');
    });

    it('can set and get native id', function () {
        let nativeId = faker.random.number();

        let timer = TestHelper.makeEmptyTimer();
        timer.nativeId = nativeId;

        expect(timer.nativeId).toBe(nativeId);
    });

    it('has a string tag', function () {
        let timer = TestHelper.makeEmptyTimer();

        let result = timer.toString();

        console.log(timer.toString());

        expect(result).not.toBeFalsy(); // Can't exactly test this too well...
                                        // not all FireFox does not seem to support it to well.
    });
});