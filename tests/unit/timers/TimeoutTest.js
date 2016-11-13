'use strict';

import TestHelper from '../../helpers/TestHelper';
import faker from 'faker';

describe('Timeout', function(){

    it('can create instance', function () {
        let timeout = TestHelper.makeTimeout();

        expect(timeout).toBeTruthy();
    });

    it('can start timeout', function (done) {
        let callback = () => {
            done();
        };

        let timer = TestHelper.makeTimeout(null, callback, 2);
        timer.start();
    });

    it('can cancel timeout', function (done) {
        let callback = () => {
            throw Error('Timeout was not cancelled!');
        };

        let timer = TestHelper.makeTimeout(null, callback, 100);
        timer.start();

        let x = setTimeout(() => {
            timer.cancel();

            expect(timer.nativeId).toBeUndefined('Native id has not been reset!');

            clearTimeout(x);
            done();
        }, 20);
    });
});