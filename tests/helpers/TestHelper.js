'use strict';

import BaseTimer from '../../src/Timers/BaseTimer';
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

        return new DummyEmptyTimer(id, callback, delay);
    }
}

export default TestHelper;