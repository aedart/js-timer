'use strict';

import Interval from './Interval';

/**
 * limit symbol
 *
 * @type {Symbol}
 * @private
 */
const _limit = Symbol('limit');

/**
 * count symbol
 *
 * @type {Symbol}
 * @private
 */
const _count = Symbol('count');

/**
 * on Limit Reached symbol
 *
 * @type {Symbol}
 * @private
 */
const _onLimitReached = Symbol('on-limit-reached');

/**
 * Limited Interval Timer
 *
 * @description Interval that executes given callback for a limited amount of times
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class Limited extends Interval{

    /**
     * Create a new Limited Interval instance
     *
     * @param {string} id           Id of timer
     * @param {object} [options]    Timer options
     */
    constructor(id, options = {callback: () => {}, delay: 1000, limit: 10, onLimitReached: () => {}}){
        super(id, options);

        this.count = 0;
    }

    /**
     * Set limit
     *
     * @param {number} amount Amount of times the callback is allowed to be executed
     */
    set limit(amount) {
        this[_limit] = amount;
    }

    /**
     * Get limit
     *
     * @return {number} Amount of times the callback is allowed to be executed
     */
    get limit() {
        return this[_limit];
    }

    /**
     * Set count
     *
     * @param {number} value Amount of times callback has been executed
     */
    set count(value) {
        this[_count] = value;
    }

    /**
     * Get count
     *
     * @return {number} Amount of times callback has been executed
     */
    get count() {
        return this[_count];
    }

    /**
     * Set on Limit Reached
     *
     * @param {function} callbackFn Callback to be invoked once the limit has been reached
     */
    set onLimitReached(callbackFn) {
        this[_onLimitReached] = callbackFn;
    }

    /**
     * Get on Limit Reached
     *
     * @return {function} Callback to be invoked once the limit has been reached
     */
    get onLimitReached() {
        return this[_onLimitReached];
    }

    /**
     * @inheritDoc
     */
    start(){
        let limited = () => {

            if(this.count >= this.limit){
                // Cancel the timer
                this.cancel();

                // Invoke the "on limit reached" callback
                this.onLimitReached.apply(this);
            } else {
                // Invoke the original callback
                this.callback.apply(this);

                // Increase count
                this.count++;
            }
        };

        this.nativeId = setInterval(limited, this.delay);
    }

    /**
     * @inheritDoc
     */
    cancel(){
        // Reset count
        this.count = 0;

        // Invoke super
        super.cancel();
    }
}

export default Limited;