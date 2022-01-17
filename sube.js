Symbol.observable||=Symbol('observable')

// is target observable
export const observable = arg => arg && !!(
  arg[Symbol.observable] || arg[Symbol.asyncIterator] ||
  arg.call && arg.set ||
  arg.subscribe || arg.then
  // || arg.mutation && arg._state != null
)

// cleanup subscriptions
// ref: https://v8.dev/features/weak-references
// FIXME: maybe there's smarter way to unsubscribe in weakref
const registry = new FinalizationRegistry(unsub => unsub.call?.()),

// create weak wrapped handler
weak = (fn, ref=new WeakRef(fn)) => e => ref.deref()?.(e)

// lil subscriby (v-less)
export default (target, next, error, complete, stop, unsub, x=next) => target && (
  next &&= weak(next), error &&= weak(error), complete &&= weak(complete),

  unsub = target.subscribe?.( next, error, complete ) ||
  target[Symbol.observable]?.().subscribe?.( next, error, complete ) ||
  target.set && target.call?.(stop, next) || // observ
  (
    target.then?.(v => (!stop && next(v), complete?.()), error) ||
    (async v => {
      try {
        // FIXME: possible drawback: it will catch error happened in next, not only in iterator
        for await (v of target) { if (stop) return; next(v) }
        complete?.()
      } catch (err) { error?.(err) }
    })()
  ) && (_ => stop=1),

  // register autocleanup
  registry.register(target, unsub),
  unsub
)


