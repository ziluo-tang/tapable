class SyncWaterfallHook {
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    const [first, ...others] = this.tasks
    let ret = first(...args)
    others.reduce((total, cur, index) => {
      if (total) {
        ret = total
      }
      return cur(ret)
    }, ret)
  }
}
const hook = new SyncWaterfallHook(['name'])
hook.tap('node', (name) => {
  console.log('node', name)
  return 'hello'
})
hook.tap('react', (data) => {
  console.log('react', data)
})
hook.tap('vue', (data) => {
  console.log('vue', data)
  return 'vue'
})
hook.tap('js', (data) => {
  console.log('js', data)
})
hook.call('tuya.cn')
