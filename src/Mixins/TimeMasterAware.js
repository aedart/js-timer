'use strict';

import { IoCFacade } from '@aedart/js-service-provider';
import { TIME_MASTER_CLASS } from './../Contracts/Services';
import {Mixin} from 'mixwith/src/mixwith';

/**
 * time Master symbol
 *
 * @type {Symbol}
 * @private
 */
const _timeMaster = Symbol('time-master');

/**
 * Time Master Aware Mixin
 *
 * @return {TimeMasterAware}
 */
export default Mixin((superClass) => class TimeMasterAware extends superClass {

    /**
     * Set time Master
     *
     * @param {TimeMaster|null} instance Time Master instance
     */
    set timeMaster(instance) {
        this[_timeMaster] = instance;
    }

    /**
     * Get time Master
     *
     * @return {TimeMaster|null} Time Master instance
     */
    get timeMaster() {
        if (!this.hasTimeMaster()) {
            this.timeMaster = this.defaultTimeMaster;
        }
        return this[_timeMaster];
    }

    /**
     * Check if "time Master" has been set
     *
     * @return {boolean}
     */
    hasTimeMaster() {
        return (this[_timeMaster] !== undefined && this[_timeMaster] !== null);
    }

    /**
     * Get a default "time Master"
     *
     * @return {TimeMaster|null} A default "time Master" value or null if none is available
     */
    get defaultTimeMaster() {
        return IoCFacade.make(TIME_MASTER_CLASS);
    }
});