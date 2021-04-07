class AsyncSeriesHook {
  constructor(args) {
    this.tasks = []
    this.number = 0
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args) {
    const finalCallback = args.pop()
    let index = 0
    const next = () => {
      if (this.tasks.length === index) return finalCallback()
      this.tasks[index++](...args, next)
    }
    next()
  }
}
const hook = new AsyncSeriesHook()
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
