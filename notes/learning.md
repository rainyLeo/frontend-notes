- 3.15
 * mock, json-server
 * promise 顺序执行
   ```js
   function promiseFactory(index){
       return new Promise((resolve, reject) => {
           resolve()
           console.log(index)
       })
   }

   function executePromises(promisesIndexArr){
       var result = Promise.resolve()
       promisesIndexArr.forEach(index => {
           // result = result.then(promiseFactory(index))
           result = result.then(() => {
             promiseFactory(index)
           })
       })
       return result
   }

   executePromises([1,2,3,4])//1,2,3,4
   ```
 * new Image(), onload


- 3.16
 * 下面的四种 promises 的区别是什么
  ```js
  doSomething().then(function () {
    return doSomethingElse();
  });

  doSomething().then(function () {
    doSomethingElse();
  });

  doSomething().then(doSomethingElse());

  doSomething().then(doSomethingElse);
  ```
  
  * 动态规划(LCS, LIS)

- 3.17
  * Vue 按需加载(路由, webpack code split, 异步组件)