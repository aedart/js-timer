'use strict';

import BaseTimer from '../../src/Timers/BaseTimer';
import Timeout from '../../src/Timers/Timeout';
import Interval from '../../src/Timers/Interval';
import faker from 'faker';

/**
 * Test Helper
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class TestHelper {

    /**
     * Returns a new Empty Timer (dummy implementation of Base Timer)
     *
     * @param {string|null} [id] If null, an id is generated
     * @param {function} [callback] Callback function to invoke
     * @param {number} [delay]      Delay in milliseconds
     *
     * @return {BaseTimer}
     */
    static makeEmptyTimer(id = null, callback = () => {}, delay = 1000){
        if(id === null){
            id = faker.random.uuid();
        }

        class DummyEmptyTimer extends BaseTimer {}

        return new DummyEmptyTimer(id, {
            callback: callback,
            delay: delay
        });
    }

    /**
     * Returns a new Timeout instance
     *
     * @param {string|null} [id] If null, an id is generated
     * @param {function} [callback] Callback function to invoke
     * @param {number} [delay]      Delay in milliseconds
     *
     * @return {Timeout}
     */
    static makeTimeout(id = null, callback = () => {}, delay = 1000){
        if(id === null){
            id = faker.random.uuid();
        }

        return new Timeout(id, {
            callback: callback,
            delay: delay
        });
    }

    /**
     * Returns a new Interval instance
     *
     * @param {string|null} [id] If null, an id is generated
     * @param {function} [callback] Callback function to invoke
     * @param {number} [delay]      Delay in milliseconds
     *
     * @return {Interval}
     */
    static makeInterval(id = null, callback = () => {}, delay = 1000){
        if(id === null){
            id = faker.random.uuid();
        }

        return new Interval(id, {
            callback: callback,
            delay: delay
        });
    }
}

export default TestHelper;