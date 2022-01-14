import t, {is} from '../node_modules/tst/tst.js'
import sube from '../sube.js'
import { time, tick } from '../node_modules/wait-please/index.js'

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

  sube(subject, v => arr.push(v), err => arr.push(err), () => arr.push('end'))

  is(arr, [])
  subject.next(1);
  is(arr, [1])
  subject.next(2);
  is(arr, [1,2])

  subject.complete()
  is(arr, [1,2,'end'])
})

t('observ', async () => {
  const arr = []
  const {default: Observable} = await import('https://cdn.skypack.dev/observ')

  var v = Observable(1)
  sube(v, v=>arr.push(v))
  is(arr, [])
  v.set(2)
  is(arr, [2])
})

t('observable', async () => {
  const arr = []
  const {default: Observable} = await import('https://cdn.skypack.dev/observable')

  var v = Observable(1)
  sube(v, v=>arr.push(v))
  is(arr, [1])
  v(2)
  is(arr, [1,2])
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

  sube(asyncIterable, v=>arr.push(v), err => err, v => arr.push('end'))
  is(arr,[])
  await tick()
  is(arr, [0,1])
  await tick()
  is(arr, [0,1,2,'end'])
})
