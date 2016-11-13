'use strict';

import BaseTimer from './BaseTimer';

/**
 * Timeout Timer
 *
 * @description Wrapper for setTimeout
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class Timeout extends BaseTimer {

    /**
     * Create a new Timeout instance
     *
     * @param {string} id           Id of timer
     * @param {object} [options]    Timer options
     */
    constructor(id, options = {callback: () => {}, delay: 1000}){
        super(id, options);
    }

    /**
     * @inheritDoc
     */
    start(){
        this.nativeId = setTimeout(this.callback, this.delay);
    }

    /**
     * @inheritDoc
     */
    cancel(){
        clearTimeout(this.nativeId);

        // Remove native id reference.
        this.nativeId = undefined;
    }
}

export default Timeout;