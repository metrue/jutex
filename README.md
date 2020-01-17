# mutex

A mutex implementation in Node/JavaScript

## Usage

* function

```javascript
  const mutex = new Mutex()

  let mark1 = false
  let mark2 = false

  const fn1 = () => {
    setTimeout(() => {
      mark1 = true
    }, 1000)
  }
  const fn2 = () => {
    setTimeout(() => {
      mark2 = true
    }, 1500)
  }

  mutex.aquire(fn1)
  mutex.aquire(fn2)

```

* async function (Promise)

```javascript
  const mutex = new Mutex()

  let mark1 = false
  let mark2 = false

  const fn1 = async () => new Promise(res => {
    setTimeout(() => {
      mark1 = true
      res(true)
    }, 1000)
  })
  const fn2 = async () => new Promise(res => {
    setTimeout(() => {
      mark2 = true
      res(true)
    }, 1500)
  })

  mutex.aquire(fn1)
  mutex.aquire(fn2)
```
