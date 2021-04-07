class SyncHook {
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    this.tasks.forEach((task) => task(...args))
  }
}
const hook = new SyncHook(['name'])
hook.tap('node', (name) => {
  console.log('node', name)
})
hook.tap('react', (name) => {
  console.log('react', name)
})
hook.call('tuya.cn')
