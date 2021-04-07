/**
 * 1，通过hoook instance实例方法tap注册事件，存储在事件列表中
 * 2，调用实例方法call，依次执行事件列表中的事件
 */
const { SyncHook } = require('tapable')
class TapSyncHook {
  constructor() {
    this.hooks = {
      log: new SyncHook(['name']),
      say: new SyncHook(['name']),
    }
  }
  tap() {
    this.hooks.log.tap('log', (name) => {
      console.log('log', name)
    })
    this.hooks.say.tap('say', (name) => {
      console.log('say', name)
    })
    this.hooks.say.tap('say', (name) => {
      console.log('hello', name)
    })
  }
  run(name) {
    this.hooks.log.call(name)
    this.hooks.say.call(name)
  }
}
const tap = new TapSyncHook()
tap.tap()
tap.run('tuya.cn')

/**
 * 执行结果：
 * log tuya.cn
   say tuya.cn
   hello tuya.cn
 */
