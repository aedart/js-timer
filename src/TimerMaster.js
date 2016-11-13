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

    /**
     * Add a timer
     *
     * Method will delete eventual existing timer that shared the same id
     *
     * @see TimerMaster.delete()
     *
     * @param {BaseTimer} timer
     */
    add(timer){
        // If there is an old timer, we must delete it
        this.delete(timer.id);

        // Set new timer
        this.timers.set(timer.id, timer);
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
     * Cancels and deletes all existing timers
     *
     * @see TimerMaster.delete()
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

export default TimerMaster;