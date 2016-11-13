'use strict';

import BaseTimer from './BaseTimer';

/**
 * Interval
 *
 * @description Wrapper for setInterval
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class Interval extends BaseTimer {

    /**
     * Create a new Interval instance
     *
     * @param {string} id           Id of timer
     * @param {function} [callback] Callback function to invoke
     * @param {number} [delay]      Delay in milliseconds
     */
    constructor(id, callback = () => {}, delay = 1000){
        super(id, callback, delay);
    }

    /**
     * @inheritDoc
     */
    start(){
        this.nativeId = setInterval(this.callback, this.delay);
    }

    /**
     * @inheritDoc
     */
    cancel(){
        clearInterval(this.nativeId);

        // Remove native id reference.
        this.nativeId = undefined;
    }
}

export default Interval;