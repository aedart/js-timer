'use strict';

import TestHelper from '../helpers/TestHelper';
import BaseTimer from '../../src/Timers/BaseTimer';
import faker from 'faker';

describe('Time Master', function(){

    /********************************************************************
     * Helpers
     *******************************************************************/

    /********************************************************************
     * Actual tests
     *******************************************************************/

    it('can create instance', function () {
        let master = TestHelper.makeTimeMaster();

        expect(master).toBeTruthy()
    });

    /********************************************************************
     * Add timers tests
     *******************************************************************/

    describe('timers', function(){

        it('can add timeout', function (done) {
            let master = TestHelper.makeTimeMaster();

            let id = faker.random.uuid();

            let timer = master.addTimeout(id, () => {

                expect(master.has(id)).toBe(true, 'timer was not added');
                expect(master.get(id)).toBe(timer, 'Incorrect timer added');

                done();

            }, 1);
        });

        it('can add interval', function (done) {
            let master = TestHelper.makeTimeMaster();

            let id = faker.random.uuid();

            let total = 5;
            let count = 0;

            let timer = master.addInterval(id, () => {

                if(count >= total){

                    master.remove(id);

                    expect(master.has(id)).toBe(false, 'Interval should no longer exist');
                    expect(count).toBe(total, 'Incorrect amount executed');
                    done();
                } else {
                    count++;
                }

            }, 5);
        });

        it('can add limited interval', function (done) {
            let master = TestHelper.makeTimeMaster();

            let timer = null;
            let limit = 5;
            let count = 0;

            let id = faker.random.uuid();

            let callback = () => {
                count++;
            };

            let onLimitReached = () => {

                expect(count).toBe(limit, 'Incorrect amount executed');
                expect(timer.count).toBe(0, 'Internal limited interval counter not reset');

                done();
            };

            timer = master.addLimitedInterval(
                id,
                callback,
                10,
                true,
                limit,
                onLimitReached
            );
        });
    });

    /********************************************************************
     * Utilities tests
     *******************************************************************/

    describe('utilities', function(){

        it('can add timers', function () {
            let timerA = TestHelper.makeTimeout();
            let timerB = TestHelper.makeTimeout();
            let timerC = TestHelper.makeTimeout();

            let master = TestHelper.makeTimeMaster();
            master.add(timerA, false);
            master.add(timerB, false);
            master.add(timerC, false);

            // Count
            expect(master.count).toBe(3, 'Incorrect amount of timers added');

            // Identities
            expect(master.has(timerA.id)).toBe(true, 'Timer A not added');
            expect(master.get(timerA.id)).toBe(timerA, 'Timer A is incorrect');

            expect(master.has(timerB.id)).toBe(true, 'Timer B not added');
            expect(master.get(timerB.id)).toBe(timerB, 'Timer B is incorrect');

            expect(master.has(timerC.id)).toBe(true, 'Timer C not added');
            expect(master.get(timerC.id)).toBe(timerC, 'Timer C is incorrect');
        });

        it('can remove timers', function () {
            let timerA = TestHelper.makeTimeout();
            let timerB = TestHelper.makeTimeout();
            let timerC = TestHelper.makeTimeout();

            let master = TestHelper.makeTimeMaster();
            master.add(timerA, false);
            master.add(timerB, false);
            master.add(timerC, false);

            master.remove(timerA.id);
            master.remove(timerC.id);

            expect(master.has(timerA.id)).toBe(false, 'Timer A still exists in master');
            expect(master.has(timerC.id)).toBe(false, 'Timer C still exists in master');
            expect(master.has(timerB.id)).toBe(true, 'Timer B should NOT had been removed');
        });

        it('can clear all timers', function (done) {

            let failIfCalled = () => {
                done.fail('Timer was NOT cancelled!');
            };

            let timerA = TestHelper.makeTimeout(null, failIfCalled, 10);
            let timerB = TestHelper.makeTimeout(null, failIfCalled, 20);
            let timerC = TestHelper.makeTimeout(null, failIfCalled, 30);

            let master = TestHelper.makeTimeMaster();
            master.add(timerA);
            master.add(timerB);
            master.add(timerC);

            master.clear();

            let x = setTimeout(() => {
                clearTimeout(x);
                done();
            }, 100);
        });

        it('can obtain all active timers', function (done) {
            let doNothing = () => {};

            let timerA = TestHelper.makeTimeout(null, doNothing, 100);
            let timerB = TestHelper.makeTimeout(null, doNothing, 100);
            let timerC = TestHelper.makeTimeout(null, doNothing, 100);

            let master = TestHelper.makeTimeMaster();
            master.add(timerA);
            master.add(timerB);
            master.add(timerC, false);

            let activeTimers = master.activeTimers;

            expect(activeTimers.length).toBe(2, 'Incorrect amount of active timers');
            expect(activeTimers[0]).toBe(timerA);
            expect(activeTimers[1]).toBe(timerB);

            let x = setTimeout(() => {
                clearTimeout(x);

                master.clear();

                done();
            }, 100);
        });

        it('can loop timers via "for of" loop', function () {
            let timerA = TestHelper.makeTimeout();
            let timerB = TestHelper.makeTimeout();
            let timerC = TestHelper.makeTimeout();

            let master = TestHelper.makeTimeMaster();
            master.add(timerA, false);
            master.add(timerB, false);
            master.add(timerC, false);

            let c = 0;
            for(let [id, timer] of master){
                console.log('Timer', timer, 'id', id);
                c++;

                expect(id).not.toBeUndefined('Timer id is undefined!?');
                expect(timer instanceof BaseTimer).toBe(true);
            }

            expect(c).toBe(3, 'Incorrect amount of timers looped through');
        });
    });

});