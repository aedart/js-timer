'use strict';

import TestHelper from '../../helpers/TestHelper';
import faker from 'faker';

describe('Limited', function(){

    it('can create instance', function () {
        let timeout = TestHelper.makeLimited();

        expect(timeout).toBeTruthy();
    });

    it('can start and cancel limited', function (done) {
        let count = 0;
        let limit = 5;

        let callback = () => {
            count++;
            console.log('Limited Interval', count);
        };

        let onReached = () => {

            console.log('Limited Interval limit reached', count);
            expect(count).toBe(limit, 'Incorrect amount of callbacks executed');

            done();
        };

        let timer = TestHelper.makeLimited(null, callback, 5, limit, onReached);
        timer.start();
    });
});