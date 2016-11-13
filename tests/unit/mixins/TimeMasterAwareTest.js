'use strict';

import TimeMasterAware from '../../../src/Mixins/TimeMasterAware';
import TimeMaster from '../../../src/TimeMaster';
import TestHelper from '../../helpers/TestHelper';
import Facade from '@aedart/js-facade';
import IoC from '@aedart/js-ioc';
import { mix } from 'mixwith/src/mixwith';

describe('Time Master Aware Mixin', function(){

    afterEach(() => {
        TestHelper.after();
    });

    /********************************************************************
     * Helpers
     *******************************************************************/

    class DummyClass extends mix(Object).with(TimeMasterAware) {}

    /********************************************************************
     * Actual tests
     *******************************************************************/

    it('has null as default Time Master', function () {
        let dummy = new DummyClass();

        expect(dummy.timeMaster).toBeNull();
    });

    it('can get and set Time Master', function () {
        let dummy = new DummyClass();

        let timeMaster = TestHelper.makeTimeMaster();

        dummy.timeMaster = timeMaster;

        expect(dummy.timeMaster).toBe(timeMaster);
    });

    it('returns Time Master, when service has been registered', function () {
        TestHelper.before();

        let dummy = new DummyClass();

        expect(dummy.timeMaster).not.toBeNull();
        expect(dummy.timeMaster instanceof TimeMaster).toBe(true);
    });
});