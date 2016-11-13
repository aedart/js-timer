'use strict';

import TimerMasterAware from '../../../src/Mixins/TimerMasterAware';
import TimerMaster from '../../../src/TimerMaster';
import TestHelper from '../../helpers/TestHelper';
import Facade from '@aedart/js-facade';
import IoC from '@aedart/js-ioc';
import { mix } from 'mixwith/src/mixwith';

describe('Timer Master Aware Mixin', function(){

    afterEach(() => {
        TestHelper.after();
    });

    /********************************************************************
     * Helpers
     *******************************************************************/

    class DummyClass extends mix(Object).with(TimerMasterAware) {}

    /********************************************************************
     * Actual tests
     *******************************************************************/

    it('has null as default Timer Master', function () {
        let dummy = new DummyClass();

        expect(dummy.timerMaster).toBeNull();
    });

    it('can get and set Timer Master', function () {
        let dummy = new DummyClass();

        let timerMaster = TestHelper.makeTimerMaster();

        dummy.timerMaster = timerMaster;

        expect(dummy.timerMaster).toBe(timerMaster);
    });

    it('returns Timer Master, when service has been registered', function () {
        TestHelper.before();

        let dummy = new DummyClass();

        expect(dummy.timerMaster).not.toBeNull();
        expect(dummy.timerMaster instanceof TimerMaster).toBe(true);
    });
});