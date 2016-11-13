'use strict';

/**
 * id symbol
 *
 * @type {Symbol}
 * @private
 */
const _id = Symbol('id');

/**
 * callback symbol
 *
 * @type {Symbol}
 * @private
 */
const _callback = Symbol('callback');

/**
 * delay symbol
 *
 * @type {Symbol}
 * @private
 */
const _delay = Symbol('delay');

/**
 * native Id symbol
 *
 * @type {Symbol}
 * @private
 */
const _nativeId = Symbol('native-id');

/**
 * Base Timer
 *
 * @description Abstract timer class for all timers
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class BaseTimer {

    /**
     * Create a Base Timer instance
     *
     * @param {string} id           Id of timer
     * @param {function} [callback] Callback function to invoke
     * @param {number} [delay]      Delay in milliseconds
     *
     * @throws {TypeError} Abstract class
     */
    constructor(id, callback = () => {}, delay = 1000){
        if(new.target === BaseTimer){
            throw new TypeError('Cannot create Base Timer instance, class is abstract');
        }

        this.id = id;
        this.callback = callback;
        this.delay = delay;
    }

    /**
     * Set id
     *
     * @param {string} identifier TimerMaster id
     */
    set id(identifier) {
        this[_id] = identifier;
    }

    /**
     * Get id
     *
     * @return {string} TimerMaster id
     */
    get id() {
        return this[_id];
    }

    /**
     * Set callback
     *
     * @param {function} callbackFn Callback function to be invoked
     */
    set callback(callbackFn) {
        this[_callback] = callbackFn;
    }

    /**
     * Get callback
     *
     * @return {function} Callback function to be invoked
     */
    get callback() {
        return this[_callback];
    }

    /**
     * Set delay
     *
     * @param {number} interval Delay in milliseconds
     */
    set delay(interval) {
        this[_delay] = interval;
    }

    /**
     * Get delay
     *
     * @return {number} Delay in milliseconds
     */
    get delay() {
        return this[_delay];
    }

    /**
     * Set native Id
     *
     * @param {number} id Native id of a timer, e.g. from setTimeout() or setInterval
     */
    set nativeId(id) {
        this[_nativeId] = id;
    }

    /**
     * Get native Id
     *
     * @return {number} Native id of a timer, e.g. from setTimeout() or setInterval
     */
    get nativeId() {
        return this[_nativeId];
    }

    /**
     * Returns the to string tag
     *
     * @return {string}
     */
    get [Symbol.toStringTag](){
        return this.constructor.name + '(' + this.id + ')';
    }

    /**
     * Start the timer
     *
     * Method ensures to set the native id
     */
    start(){
        throw new Error('Start method is abstract, please implement in sub-class');
    }

    /**
     * Stops and cancels the timer
     *
     * Method ensures to clear internal id
     */
    cancel(){
        throw new Error('Cancel method is abstract, please implement in sub-class');
    }
}

export default BaseTimer;