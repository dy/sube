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
const registry = new FinalizationRegistry(unsub => unsub()),

// create weak wrapped handler
weak = (fn, ref=new WeakRef(fn)) => e => ref.deref()?.(e)

// lil subscriby (v-less)
export default (target, next, error, complete, stop, unsub) => target && (
  next &&= weak(next), error &&= weak(error), complete &&= weak(complete),

  unsub = target.subscribe?.( next, error, complete ) ||
  target[Symbol.observable]?.().subscribe?.( next, error, complete ) ||
  target.set && target.call?.(stop, next) || // observ
  (
    target.then?.(v => (!stop && next(v), complete?.()), error) ||
    (async _ => {
      try {
        // FIXME: possible drawback: it will catch error happened in next, not only in iterator
        for await (target of target) { if (stop) return; next(target) }
        complete?.()
      } catch (err) { error?.(err) }
    })()
  ) && (_ => stop=1),

  // register autocleanup
  registry.register(next||error||complete, unsub),
  unsub
)
