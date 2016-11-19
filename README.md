# Js Timer

Container for timeouts and intervals that allows you to keep track of them.   

## Contents

* [How to install](#how-to-install)
* [Quick Start](#quick-start)
  * [Timeout](#timeout)
  * [Interval](#interval)
  * [Limited Interval](#limited-interval)
* [Timers](#timers)
* [Time Master](#time-master)
  * [Add custom timer](#add-custom-timer)
  * [Remove timer](#remove-timer)
  * [Clear all timers](#clear-all-timers)
  * [Active timers](#active-timers)
* [Service Provider](#service-provider)
* [Contribution](#contribution)
* [Versioning](#versioning)
* [License](#license)

## How to install

```console
npm install @aedart/js-timer
```

## Quick Start

The `TimeMaster` container allows you to create various forms of timers / intervals. Each timer is kept track of by the container.

In addition, each timer has a `string id` that can be used to obtain the timer instance. This is useful if you have multiple components that need to manipulate the same timer.

### Timeout

```javascript
import TimeMaster from '@aedart/js-timer';

let timeMaster = new TimeMaster();

// Execute the given callback once, after 1 second 
let timeout = timeMaster.addTimeout('my-timeout', () => {
    console.log('Timeout');
}, 1000);
```

### Interval

```javascript
import TimeMaster from '@aedart/js-timer';

let timeMaster = new TimeMaster();

// Execute the given callback every second 
let interval = timeMaster.addInterval('my-interval', () => {
    console.log('Interval');
}, 1000);
```

### Limited Interval

```javascript
import TimeMaster from '@aedart/js-timer';

let timeMaster = new TimeMaster();
 
// Execute the given callback 10 times, every second
let limitedInterval = timeMaster.addLimitedInterval(
    'my-limited-interval',
    () => {
        console.log('Limted interval');
    },
    1000,   // Delay
    true,   // automatically start
    10,     // Amount of iterations
    () => {
        // Executed on the last iteration
        console.log('Last iteration');
    }
);
```

## Timers

Each timer inherits from the `@aedart/js-timer/src/Timers/BaseTimer.js` abstraction, which accepts a string id and an options argument. 

Furthermore, each timer has a `start` and a `cancel` method.

```javascript
// Create an interva that does NOT automatically start
let interval = timeMaster.addInterval('my-interval', () => {
    console.log('Interval');
}, 1000, false);

// Later in your application... start the interval
interval.start(); 

// Cancel interval
interval.cancel();
```

## Time Master

The `@aedart/js-timer/src/TimeMaster.js` keeps track of timers that you create via the container - or manually added to it.

In this section, some of the most basic methods are covered. For a complete view of the container's API methods, please review the source code. 

### Add custom timer

If you need a specialised timer, e.g. a timer that performs a predefined callback, then you can do so by inheriting from the `@aedart/js-timer/src/Timers/BaseTimer.js` and you will be able to add it to the `TimeMaster` container.

**A custom timer**

```javascript
'use strict';

import { BaseTimer } from '@aedart/js-timer';

class MyInterval extends BaseTimer {

    /**
     * Create a new Interval instance
     *
     * @param {string} id           Id of timer
     * @param {object} [options]    Timer options
     */
    constructor(id, options = {callback: () => {}, delay: 1000}){
        super(id, options);
    }

    start(){
        // Keep track of browser's native timer id
        this.nativeId = setInterval(this.callback, this.delay);
    }

    cancel(){
        // Clear the interval by passing the native browser timer id
        clearInterval(this.nativeId);

        // Remove native id reference - important, so that TimeMaster
        // knows that this is no longer an active timer
        this.nativeId = undefined;
    }
}

export default MyInterval;
```

**Add custom timer to TimeMaster**

```javascript
import MyInterval from './MyInterval';
import TimeMaster from '@aedart/js-timer';

// Create time master instance
let timeMaster = new TimeMaster();

// Create instance of your custom timer
const MY_INTERVAL_ID = 'my-custom-interval'

let myInterval = new MyInterval(
    MY_INTERVAL_ID,
    {
        callback: () => {
            console.log('My interval');
        },
        delay: 500
    }
);

// Add timer to time master container  - let it autostart the timer
timeMaster.add(myInterval, true);

// Laster... obtain the timer
let t = timeMaster.get(MY_INTERVAL_ID);
```

### Remove timer

When you need to remove a timer, you can achieve such by invoking the `remove` method on the time master container.

The `remove` method will automatically invoke the timer's `cancel` method, before it's reference is removed from the container.

```javascript
// Returns true / false
timeMaster.remove('my-timer-id');
```

### Clear all timers

Clearing all timers has the same result as invoking `remove` on a timer.

```javascript
// Cancels and removes all added timers
timeMaster.clear();
```

### Active timers

A timer is considered active when it has started; when it's internal `nativeId` is NOT `undefined`.

You can obtain all active timers by means of the `activeTimers` property

```javascript
// Returns an array which all active timers
let activeTiemrs = timeMaster.activeTimers; 
```

## Service Provider

If you are using the [IoC](https://www.npmjs.com/package/@aedart/js-ioc), then you can register the [service provider](https://www.npmjs.com/package/@aedart/js-service-provider) that comes with this package.
It registers a singleton instance of the time master container.

```javascript
import { TimerServiceProvider } from '@aedart/js-timer'; 
```

-------------------------------------------------------------------------------
## Contribution

Have you found a defect ( [bug or design flaw](https://en.wikipedia.org/wiki/Software_bug) ), or do you wish improvements? In the following sections, you might find some useful information
on how you can help this project. In any case, I thank you for taking the time to help me improve this project's deliverables and overall quality.

### Bug Report

If you are convinced that you have found a bug, then at the very least you should create a new issue. In that given issue, you should as a minimum describe the following;

* Where is the defect located
* A good, short and precise description of the defect (Why is it a defect)
* How to replicate the defect
* (_A possible solution for how to resolve the defect_)

When time permits it, I will review your issue and take action upon it.

### Fork, code and send pull-request

A good and well written bug report can help me a lot. Nevertheless, if you can or wish to resolve the defect by yourself, here is how you can do so;

* Fork this project
* Create a new local development branch for the given defect-fix
* Write your code / changes
* Create executable test-cases (prove that your changes are solid!)
* Commit and push your changes to your fork-repository
* Send a pull-request with your changes
* _Drink a [Beer](https://en.wikipedia.org/wiki/Beer) - you earned it_ :)

As soon as I receive the pull-request (_and have time for it_), I will review your changes and merge them into this project. If not, I will inform you why I choose not to.

## Versioning

This package follows [Semantic Versioning 2.0.0](http://semver.org/)

## License

[BSD-3-Clause](http://spdx.org/licenses/BSD-3-Clause), Read the LICENSE file included in this package