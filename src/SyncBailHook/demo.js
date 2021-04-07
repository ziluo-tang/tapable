/**
 * 1，前面的事件返回undefined时继续往下执行；
 * 2，前面的事件返回不是undefined时停止往下执行
 */
const { SyncBailHook } = require('tapable')
class TapSyncBailHook {
  constructor() {
    this.hooks = {
      log: new SyncBailHook(['name']),
    }
  }
  tap() {
    this.hooks.log.tap('node', (name) => {
      console.log('node', name)
    })
    this.hooks.log.tap('react', (name) => {
      console.log('react', name)
      return 'react'
    })
    this.hooks.log.tap('vue', (name) => {
      console.log('vue', name)
    })
  }
  run(name) {
    this.hooks.log.call(name)
  }
}
const tap = new TapSyncBailHook()
tap.tap()
tap.run('tuya.cn')

/**
 * 执行结果：
 * node tuya.cn
   react tuya.cn
 */
