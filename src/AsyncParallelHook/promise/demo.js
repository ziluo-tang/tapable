/**
 * 异步并发
 * 1，通过tapPromise注册异步事件，并且传入cb回调，异步操作执行完成后调用cb通知hook异步执行完成了；
 * 2，调用hook instance实例的 promise 执行注册在hook中的异步事件，各异步事件并发执行，并在所有异步完成之后执行回调函数；
 * 3，如果其中有一个异步操作没有完成（没有执行resolve或者出现异常reject），都不会执行最后的promise.then，而是执行promise.reject
 * 4，相比async，采用了promise写法，本质是一样的，tapPromise，promise API调用不一样
 */
const { AsyncParallelHook } = require('tapable')
class TapAsyncParallelHook {
  constructor() {
    this.hooks = {
      log: new AsyncParallelHook(['name']),
    }
  }
  tap() {
    this.hooks.log.tapPromise('node', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          resolve()
        }, 1000)
      })
    })
    this.hooks.log.tapPromise('react', (data) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', data)
          resolve()
        }, 1000)
      })
    })
    this.hooks.log.tapPromise('vue', (data) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('vue', data)
          resolve()
        }, 1000)
      })
    })
  }
  run(name) {
    this.hooks.log.promise(name).then(() => {
      console.log('end')
    })
  }
}
const tap = new TapAsyncParallelHook()
tap.tap()
tap.run('tuya.cn')

/**
   * 执行结果：
   * node tuya.cn
     react tuya.cn
     vue tuya.cn
     end 
   */
