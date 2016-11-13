'use strict';

import Timeout from './Timers/Timeout';
import Interval from './Timers/Interval';
import Limited from './Timers/Limited';

/**
 * timers symbol
 *
 * @type {Symbol}
 * @private
 */
const _timers = Symbol('timers');

/**
 * TimeMaster
 *
 * @description Collection of various timers
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class TimeMaster {

    /**
     * Create a new Timer Master instance
     */
    constructor(){
        this.timers = new Map();
    }

    /**
     * Add a timeout - a callback to be executed once
     *
     * @param {string} id           A human readable timer id, e.g. "enemiesSpawnTimer"
     * @param {function} [callback] Callback function to invoke
     * @param {number} [delay]      Delay in milliseconds
     * @param {boolean} [start]     If true, will start the timer
     *
     * @return {Timeout}
     */
    addTimeout(id, callback = () => {}, delay = 1000, start = true){
        let timer = new Timeout(id, {
            callback: callback,
            delay: delay
        });

        return this.add(timer, start);
    }

    /**
     * Add an interval - a callback to be executed repeatedly
     *
     * @param {string} id           A human readable timer id, e.g. "balanceChecker"
     * @param {function} [callback] Callback function to invoke
     * @param {number} [delay]      Delay in milliseconds
     * @param {boolean} [start]     If true, will start the timer
     *
     * @return {Interval}
     */
    addInterval(id, callback = () => {}, delay = 1000, start = true){
        let timer = new Interval(id, {
            callback: callback,
            delay: delay
        });

        return this.add(timer, start);
    }

    /**
     * Add a limited interval - a callback to be executed a certain amount of times
     *
     * @param {string} id                   A human readable timer id, e.g. "remoteCallAttempt"
     * @param {function} [callback]         Callback function to invoke
     * @param {number} [delay]              Delay in milliseconds
     * @param {boolean} [start]             If true, will start the timer
     * @param {number} [limit]              Amount of times callback is allowed to be executed
     * @param {function} [onLimitReached]   Callback to be invoked once the limit has been reached
     *
     * @return {Interval}
     */
    addLimitedInterval(
        id,
        callback = () => {},
        delay = 1000,
        start = true,
        limit = 10,
        onLimitReached = () => {}
    ){
        let timer = new Limited(id, {
            callback: callback,
            delay: delay,
            limit: limit,
            onLimitReached: onLimitReached
        });

        return this.add(timer, start);
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

    /**
     * Returns an array of all active timers
     *
     * A timer is considered to be active, if it's native id
     * is not undefined. The native id corresponds to the
     * id that `setTimeout()` or `setInterval()` returns.
     *
     * @return {Array.<BaseTimer>}
     */
    get activeTimers(){
        let timers = [];

        this.timers.forEach((timer) => {
            if(timer.nativeId !== undefined){
                timers[timers.length] = timer;
            }
        });

        return timers;
    }

    /**
     * Returns this Timer Master's iterator
     *
     * @return {Iterator.<BaseTimer>}
     */
    [Symbol.iterator](){
        return this.timers[Symbol.iterator]();
    }

    /**
     * Add a timer
     *
     * Method will delete eventual existing timer that shared the same id
     *
     * @see TimeMaster.delete()
     *
     * @param {BaseTimer} timer
     * @param {boolean} [start]     If true, will start the timer
     *
     * @return {BaseTimer} The timer that has been added
     */
    add(timer, start = true){
        // If there is an old timer, we must delete it
        this.delete(timer.id);

        // Add Timer Master reference
        timer.timeMaster = this;

        // Set new timer
        this.timers.set(timer.id, timer);

        // Start the timer if needed
        if(start){
            timer.start();
        }

        // Finally, return the timer
        return timer;
    }

    /**
     * Get timer that matches the given id
     *
     * @param {string} id
     *
     * @return {BaseTimer|null} Timer or null if no timer exists with given id
     */
    get(id){
        return (this.timers.has(id)) ? this.timers.get(id) : null;
    }

    /**
     * Check if a timer exists with the given id
     *
     * @param {string} id
     *
     * @return {boolean}
     */
    has(id){
        return this.timers.has(id);
    }

    /**
     * Cancel and delete timer that matches id
     *
     * @param {string} id
     *
     * @return {boolean}
     */
    delete(id){
        let timer = this.get(id);

        if(timer !== null){
            return this._cancelAndDelete(timer);
        }

        return false;
    }

    /**
     * Returns the current amount of timers
     * in this Timer Master
     *
     * @return {number}
     */
    count(){
        return this.timers.size;
    }

    /**
     * Cancels and deletes all existing timers
     *
     * @see TimeMaster.delete()
     */
    clear(){
        // Cancel and delete all timers
        this.timers.forEach((timer) => {
            this._cancelAndDelete(timer);
        });

        // Not needed - but just in case...
        this.timers.clear();
    }

    /**
     * Cancels and deletes the given timer
     *
     * @param {BaseTimer} timer
     *
     * @return {boolean}
     *
     * @private
     */
    _cancelAndDelete(timer){
        timer.cancel();
        return this.timers.delete(timer.id);
    }
}

export default TimeMaster;