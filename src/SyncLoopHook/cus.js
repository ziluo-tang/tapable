class SyncLoopHook {
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    this.tasks.forEach((task) => {
      let ret
      do {
        ret = task(...args)
      } while (ret != undefined)
    })
  }
}
const hook = new SyncLoopHook(['name'])
let loop = 3
hook.tap('node', (name) => {
  console.log('node', name)
  return --loop === 0 ? undefined : 'hello'
})
hook.tap('react', (name) => {
  console.log('react', name)
})
hook.tap('vue', (name) => {
  console.log('vue', name)
})
hook.tap('js', (name) => {
  console.log('js', name)
})
hook.call('tuya.cn')
