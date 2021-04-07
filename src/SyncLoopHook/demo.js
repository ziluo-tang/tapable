/**
 * 1，callback返回undefeated时，继续往下执行剩下的callback
 * 2，callback返回的值不是undefined时，循环执行当前callback
 */
const { SyncLoopHook } = require('tapable')
class TapSyncLoopHook {
  constructor() {
    this.hook = {
      log: new SyncLoopHook(['name']),
    }
    this.loop = 3
  }
  tap() {
    this.hook.log.tap('node', (name) => {
      console.log('node', name)
      return --this.loop === 0 ? undefined : 'node'
    })
    this.hook.log.tap('react', (name) => {
      console.log('react', name)
    })
    this.hook.log.tap('vue', (name) => {
      console.log('vue', name)
    })
  }
  run(...args) {
    this.hook.log.call(...args)
  }
}

const hook = new TapSyncLoopHook()
hook.tap()
hook.run('tuya.cn')

/**
 * 执行结果：
 * node tuya.cn
   node tuya.cn
   node tuya.cn
   react tuya.cn
   vue tuya.cn
 */
