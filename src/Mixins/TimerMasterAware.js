'use strict';

import { IoCFacade } from '@aedart/js-service-provider';
import { TIME_MASTER_CLASS } from './../Contracts/Services';
import {Mixin} from 'mixwith/src/mixwith';

/**
 * timer Master symbol
 *
 * @type {Symbol}
 * @private
 */
const _timerMaster = Symbol('timer-master');

/**
 * Timer Master Aware Mixin
 *
 * @return {TimerMasterAware}
 */
export default Mixin((superClass) => class TimerMasterAware extends superClass {

    /**
     * Set timer Master
     *
     * @param {TimerMaster|null} instance Timer Master instance
     */
    set timerMaster(instance) {
        this[_timerMaster] = instance;
    }

    /**
     * Get timer Master
     *
     * @return {TimerMaster|null} Timer Master instance
     */
    get timerMaster() {
        if (!this.hasTimerMaster()) {
            this.timerMaster = this.defaultTimerMaster;
        }
        return this[_timerMaster];
    }

    /**
     * Check if "timer Master" has been set
     *
     * @return {boolean}
     */
    hasTimerMaster() {
        return (this[_timerMaster] !== undefined && this[_timerMaster] !== null);
    }

    /**
     * Get a default "timer Master"
     *
     * @return {TimerMaster|null} A default "timer Master" value or null if none is available
     */
    get defaultTimerMaster() {
        return IoCFacade.make(TIME_MASTER_CLASS);
    }
});