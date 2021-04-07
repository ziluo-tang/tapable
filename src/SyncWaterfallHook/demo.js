/**
 * 1，callback依次执行，并且下一个callback可以拿到上一个callback返回的数据
 * 2，如果其中一个callback没有返回，后面所有的callback拿到的数据都是最后一个callback返回的数据
 */
const { SyncWaterfallHook } = require('tapable')
class TapSyncWaterfallHook {
  constructor() {
    this.hooks = {
      log: new SyncWaterfallHook(['name']),
    }
  }
  tap() {
    this.hooks.log.tap('node', (name) => {
      console.log('node', name)
      return '返回数据'
    })
    this.hooks.log.tap('react', (data) => {
      console.log('react', data)
    })
    this.hooks.log.tap('vue', (data) => {
      console.log('vue', data)
      return 'vue'
    })
    this.hooks.log.tap('js', (data) => {
      console.log('js', data)
    })
  }
  run(name) {
    this.hooks.log.call(name)
  }
}
const tap = new TapSyncWaterfallHook()
tap.tap()
tap.run('tuya.cn')

/**
 * 执行结果：
 * node tuya.cn
   react 返回数据
   vue 返回数据
   js vue 
 */
