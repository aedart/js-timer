'use strict';

import TestHelper from '../../helpers/TestHelper';
import faker from 'faker';

describe('Interval', function(){

    it('can create instance', function () {
        let timeout = TestHelper.makeInterval();

        expect(timeout).toBeTruthy();
    });

    it('can start and cancel interval', function (done) {
        let timer = null;
        let total = 5;
        let count = 0;

        let callback = () => {

            if(count >= total){
                timer.cancel();
                done();
            } else {
                count++;
                console.log('interval callback', count);
            }
        };

        timer = TestHelper.makeInterval(null, callback, 10);
        timer.start();
    });
});