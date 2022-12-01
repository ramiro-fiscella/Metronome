function Timer(callback, timeInterval, options) {
    this.timeInterval = timeInterval;

    //start timer
    this.start = () => {
        //set expected time
        this.expected = Date.now() + this.timeInterval;
        //START THE TIMEOUT AND SAVE THE ID IN A PROPERTY, SO WE CAN CANCEL IT LATER
        this.timeout = null;

        if (options.immediate) {
            callback();
        }

        this.timeout = setTimeout(this.round, this.timeInterval);
        console.log('timer started!');
    }

    //stop timer
    this.stop = () => {
        clearTimeout(this.timeout);
        console.log(`timer stopped!`);
    }

    //metod that takes care of running our callback and adjusting the time interval
    this.round = () => {
        console.log('timeout', this.timeout);
        //the drift will be the current moment in time for this round minus the expected time
        let drift = Date.now() - this.expected;
        //run error callback if drift is greater than time interval, and if the callback is provided
        if (drift > this.timeInterval) {
            //if error callback is porovided
            if (options.errorCallback) {
                options.errorCallback();
            }
        }
        callback();
        //increment expected time by time interval for every round after running the callback function
        this.expected += this.timeInterval;
        console.log('drift: ', drift);
        console.log('next round time interval: ', this.timeInterval - drift);
        //run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}

export default Timer;