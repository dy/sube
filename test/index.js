import t, { is } from 'tst'
import sube from '../sube.js'
import { time, tick } from 'wait-please'
import v from 'value-ref'
import { effect, signal } from '@preact/signals-core'

t('Promise: next', async () => {
  let arr = []
  let p = new Promise(ok => setTimeout(() => ok(1)))
  sube(p, v => arr.push(v), e => arr.push(e), () => arr.push('end'))

  is(arr, [])
  await time()
  is(arr, [1, 'end'])

})
t('Promise: error', async () => {
  let arr = []
  let p = new Promise((ok, err) => setTimeout(() => { err(Error('xyz')) }))
  sube(p, null, err => arr.push(err.message), done => arr.push(done))

  is(arr, [])
  await time()
  is(arr, ['xyz'])
})

t('rxjs', async () => {
  const arr = []
  const { Subject } = await import('https://cdn.skypack.dev/rxjs')
  const subject = new Subject();

  const unsub = sube(subject, v => arr.push(v), err => arr.push(err), () => arr.push('end'))

  is(arr, [])
  subject.next(1);
  is(arr, [1])
  subject.next(2);
  is(arr, [1, 2])

  subject.complete()
  is(arr, [1, 2, 'end'])

  unsub()
})

t('observ', async () => {
  const arr = []
  const { default: Observable } = await import('https://cdn.skypack.dev/observ')

  var v = Observable(1)
  sube(v, v => arr.push(v))
  is(arr, [])
  v.set(2)
  is(arr, [2])
})

t('observable', async () => {
  const arr = []
  const { default: Observable } = await import('https://cdn.skypack.dev/observable')

  var v = Observable(1)
  sube(v, v => arr.push(v))
  is(arr, [1])
  v(2)
  is(arr, [1, 2])
})


t('asyncIterable', async () => {
  const arr = []

  const asyncIterable = {
    [Symbol.asyncIterator]() {
      return {
        i: 0,
        next() {
          if (this.i < 3) return new Promise(ok => ok({ value: this.i++, done: false }));
          return new Promise(ok => ok({ done: true }));
        }
      };
    }
  };

  sube(asyncIterable, v => arr.push(v), err => err, v => arr.push('end'))
  is(arr, [])
  await tick()
  is(arr, [0, 1])
  await tick()
  is(arr, [0, 1, 2, 'end'])
})

t('does not keep observer refs for mock', async () => {
  let arr = []
  let mock = { subscribe() { arr.push('sub'); return { unsubscribe: () => arr.push('unsub') } } }

  let unsub = sube(mock, v => arr.push(v))
  is(arr, ['sub'])

  mock = null

  await gc()

  is(arr, ['sub', 'unsub'])
})

t('collecting callback doesnt invoke unsubscribe', async () => {
  let arr = []
  let mock = { subscribe() { arr.push('sub'); return { unsubscribe: () => arr.push('unsub') } } }
  let cb = v => arr.push(v)
  let unsub = sube(mock, cb)
  is(arr, ['sub'])

  cb = null

  await gc()

  is(arr, ['sub'])
})

t('does not keep observer refs for v', async () => {
  // let foo = {x:1};
  // const weakRef = new WeakRef(foo);
  // foo = undefined; // Clear strong reference
  let arr = []
  let v1 = v(0), v1sub = v1.subscribe
  // v1.subscribe = (...args) => { let unsub = v1sub.apply(v1, args); return { unsubscribe: () => (arr.push('end'), unsub()) } }

  sube(v1, v => arr.push(v), null, () => arr.push('end'))

  is(arr, [0])

  await gc()
  is(arr, [0])

  v1.value = 1
  await tick()
  is(arr, [0, 1])

  v1 = null
  await gc()

  is(arr, [0, 1, 'end'])
})

t('does not keep observer refs for signal', async () => {
  let arr = []
  let s1 = signal(0)

  const unsub = sube(s1, v => arr.push(v), null, () => arr.push('end'))

  is(arr, [0])

  await gc()
  is(arr, [0])

  s1.value = 1
  await tick()
  is(arr, [0, 1])

  unsub()
  s1 = null
  await gc()

  is(arr, [0, 1, 'end'])
})

async function gc() {
  // gc is async somehow
  await time(50)
  global.gc()
  eval("%CollectGarbage('all')");
  await time(50)
}
