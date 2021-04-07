class SyncBailHook {
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    let index = 0
    let ret
    do {
      ret = this.tasks[index++](...args)
    } while (ret === undefined && index < this.tasks.length)
  }
}

const hook = new SyncBailHook(['name'])
hook.tap('log', (name) => {
  console.log('react', name)
  return
})
hook.tap('say', (name) => {
  console.log('node', name)
})
hook.call('tuya.cn')
