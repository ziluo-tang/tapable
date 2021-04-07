/**
 * 异步串行
 * 1，通过tapAsync注册异步事件，并且传入cb回调，异步操作执行完成后调用cb通知hook异步执行完成了；
 * 2，调用callAsync执行注册在hook中的异步事件，各异步事件并发执行，并在所有异步完成之后执行回调函数；
 * 3，如果其中有一个异步操作没有完成（没有执行cb回调），callAsync的callback都不会执行
 */
const { AsyncSeriesHook } = require('tapable')
class TapAsyncSeriesHook {
  constructor() {
    this.hooks = {
      log: new AsyncSeriesHook(['name']),
    }
  }
  tap() {
    this.hooks.log.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 1000)
    })
    this.hooks.log.tapAsync('react', (data, cb) => {
      setTimeout(() => {
        console.log('react', data)
        cb()
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
const tap = new TapAsyncSeriesHook()
tap.tap()
tap.run('tuya.cn')

/**
    * 执行结果：
    * node tuya.cn
      react tuya.cn
      vue tuya.cn
      end 
    */
