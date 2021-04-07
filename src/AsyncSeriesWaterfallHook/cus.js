class AsyncSeriesWaterfallHook {
  constructor(args) {
    this.tasks = []
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args) {
    const finalCallback = args.pop()
    let index = 0
    const next = (err, data) => {
      const task = this.tasks[index]
      if (!task || err === 'error') return finalCallback()
      if (index === 0) {
        task(...args, next)
      } else {
        task(data, next)
      }
      index++
    }
    next()
  }
}
const hook = new AsyncSeriesWaterfallHook(['name'])
hook.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name)
    cb(null, 'node')
  }, 1000)
})
hook.tapAsync('react', (data, cb) => {
  setTimeout(() => {
    console.log('react', data)
    cb(null, 'react')
  }, 1000)
})
hook.tapAsync('vue', (data, cb) => {
  setTimeout(() => {
    console.log('vue', data)
    cb()
  }, 1000)
})
hook.callAsync('tuya.cn', () => {
  console.log('end')
})
