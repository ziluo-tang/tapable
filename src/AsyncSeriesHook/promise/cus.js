class AsyncSeriesHook {
  constructor(args) {
    this.tasks = []
    this.number = 0
  }
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  promise(...args) {
    const [first, ...others] = this.tasks
    const ret = first(...args)
    return others.reduce((total, cur) => {
      return total.then(() => cur(...args))
    }, ret)
  }
}
const hook = new AsyncSeriesHook()
hook.tapPromise('node', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name)
      resolve()
    }, 1000)
  })
})
hook.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name)
      resolve()
    }, 1000)
  })
})
hook.tapPromise('vue', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('vue', name)
      resolve()
    }, 1000)
  })
})

hook.promise('tuya.cn').then(() => {
  console.log('end')
})
