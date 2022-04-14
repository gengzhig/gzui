/**
 *
 *
 * @class Scheduler
 */
class Scheduler {
    constructor(limit) {
        this.queue = []
        this.limit = limit
        this.count = 0
    }


    add(time, order) {
        const promiseCreator = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(order)
                    resolve()
                }, time)
            })
        }
        this.queue.push(promiseCreator)
    }

    taskStart() {
        for (let i = 0; i < this.limit; i++) {
            this.request()
        }
    }

    request() {
        if (!this.queue.length || this.count >= this.limit) return
        this.count++
        this.queue.shift()().then(() => {
            this.count--
            this.request()
        })
    }
}

