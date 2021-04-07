/**
 * 异步串行
 * 1，通过tapAsync注册异步事件，并且传入cb回调，异步操作执行完成后调用cb通知hook异步执行完成了；
 * 2，调用callAsync执行注册在hook中的异步事件，各异步事件串行执行。；
 * 3，执行完成后调用回调cb，cb接收两个入参，第一个标记是否执行后面的事件。如果是“error”，直接跳过后面的所有事件（不传默认是error）；如果不是“error”，cb传入的第二个参数作为入参进入下一个事件
 */
const { AsyncSeriesWaterfallHook } = require('tapable')
class TapAsyncSeriesWaterfallHook {
  constructor() {
    this.hooks = {
      log: new AsyncSeriesWaterfallHook(['name']),
    }
  }
  tap() {
    this.hooks.log.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb(null, 'node')
      }, 1000)
    })
    this.hooks.log.tapAsync('react', (data, cb) => {
      setTimeout(() => {
        console.log('react', data)
        cb(null, 'react')
      }, 1000)
    })
    this.hooks.log.tapAsync('vue', (data, cb) => {
      setTimeout(() => {
        console.log('vue', data)
        cb()
      }, 1000)
    })
  }
  run(name) {
    this.hooks.log.callAsync(name, () => {
      console.log('end')
    })
  }
}
const tap = new TapAsyncSeriesWaterfallHook()
tap.tap()
tap.run('tuya.cn')

/**
* 执行结果：
* node tuya.cn
  react node
  vue react
  end
*/
