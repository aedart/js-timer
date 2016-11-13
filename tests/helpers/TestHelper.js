'use strict';

import BaseTimer from '../../src/Timers/BaseTimer';
import Timeout from '../../src/Timers/Timeout';
import Interval from '../../src/Timers/Interval';
import Limited from '../../src/Timers/Limited';
import TimeMaster from '../../src/TimeMaster';
import TimerServiceProvider from '../../src/Providers/TimerServiceProvider';
import Facade from '@aedart/js-facade';
import IoC from '@aedart/js-ioc';
import faker from 'faker';

/**
 * Test Helper
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class TestHelper {

    /*********************************************************************************
     * Before and After methods
     ********************************************************************************/

    static before(){
        Facade.ioc = IoC;
        IoC.instances.set('ioc', IoC);

        this.provider = new TimerServiceProvider(IoC);
        this.provider.register();
    }

    static after(){
        IoC.flush();

        Facade.ioc = null;
        Facade.clearResolvedInstances();
    }

    /*********************************************************************************
     * Helpers
     ********************************************************************************/

    /**
     * Returns a new Timer Master instance
     *
     * @return {TimeMaster}
     */
    static makeTimeMaster(){
        return new TimeMaster();
    }

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

    /**
     * Returns a new Limited instance
     *
     * @param {string|null} [id] If null, an id is generated
     * @param {function} [callback] Callback function to invoke
     * @param {number} [delay]      Delay in milliseconds
     * @param {number} [limit]      Amount of times...
     * @param {function} [onLimitReached] Callback function to invoke, once limit has been reached
     *
     * @return {Limited}
     */
    static makeLimited(id = null, callback = () => {}, delay = 1000, limit = 10, onLimitReached = () => {}){
        if(id === null){
            id = faker.random.uuid();
        }

        return new Limited(id, {
            callback: callback,
            delay: delay,
            limit: limit,
            onLimitReached: onLimitReached
        });
    }
}

export default TestHelper;