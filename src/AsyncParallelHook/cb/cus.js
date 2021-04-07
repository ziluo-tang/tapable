class AsyncParallelHook {
  constructor(args) {
    this.tasks = []
    this.number = 0
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args) {
    const finalCallback = args.pop()
    const done = () => {
      this.number++
      if (this.number === this.tasks.length) {
        finalCallback()
      }
    }
    this.tasks.forEach((task) => {
      task(...args, done)
    })
  }
}
const hook = new AsyncParallelHook()
hook.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name)
    cb()
  }, 1000)
})
hook.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name)
    cb()
  }, 1000)
})
hook.tapAsync('vue', (name, cb) => {
  setTimeout(() => {
    console.log('vue', name)
    cb()
  }, 1000)
})

hook.callAsync('tuya.cn', () => {
  console.log('end')
})
