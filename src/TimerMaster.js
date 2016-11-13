'use strict';

/**
 * timers symbol
 *
 * @type {Symbol}
 * @private
 */
const _timers = Symbol('timers');

/**
 * TimerMaster
 *
 * @description Collection of various timers
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class TimerMaster {

    /**
     * Create a new Timer Master instance
     */
    constructor(){
        this.timers = new Map();
    }

    /**
     * Set timers
     *
     * @param {Map.<string, BaseTimer>} timers Map of all timers
     */
    set timers(timers) {
        this[_timers] = timers;
    }

    /**
     * Get timers
     *
     * @return {Map.<string, BaseTimer>} Map of all timers
     */
    get timers() {
        return this[_timers];
    }

    set(id, timer){
        
    }

    get(id){

    }

    has(id){

    }

    delete(id){

    }

    clear(){

    }
}

export default TimerMaster;