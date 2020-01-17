const Mutex = require('./mutex')

const delay = (ms) => new Promise(res => {
  setTimeout(() => {
    res()
  }, ms)
})

test('function', async () => {
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
  expect(mark1).toBe(false)
  expect(mark2).toBe(false)
  await delay(1100)
  expect(mark1).toBe(true)
  expect(mark2).toBe(false)
  await delay(500)
  expect(mark1).toBe(true)
  expect(mark2).toBe(true)
})

test('async function', async () => {
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
  expect(mark1).toBe(false)
  expect(mark2).toBe(false)
  await delay(1100)
  expect(mark1).toBe(true)
  expect(mark2).toBe(false)
  await delay(500)
  expect(mark1).toBe(true)
  expect(mark2).toBe(false)
  await delay(1000)
  expect(mark1).toBe(true)
  expect(mark2).toBe(true)
})

test('call chain', async () => {
  const mutex = new Mutex()

  let value2 = 0
  let value3 = 0

  const f1 = () => 1
  const f2 = (err, value) => {
    value2 += value
    return { err: null, value }
  }
  const f3 = (err, value) => {
    value3 += 1
    return { err: null, value }
  }

  mutex.aquire(f1)
  mutex.aquire(f2)
  mutex.aquire(f3)
  await delay(500)
  expect(value2).toBe(1)
  expect(value3).toBe(1)
})
