'use strict';

import { TIME_MASTER_CLASS } from './../Contracts/Services';
import TimeMaster from './../TimerMaster';
import ServiceProvider from '@aedart/js-service-provider';

/**
 * Timer Service Provider
 *
 * @author Alin Eugen Deac <aedart@gmail.com>
 */
class TimerServiceProvider extends ServiceProvider{

    /**
     * Register all of this provider's services
     *
     * @return {void}
     */
    register(){
        this.ioc.singletonInstance(TIME_MASTER_CLASS, TimeMaster);
    }

}

export default TimerServiceProvider;