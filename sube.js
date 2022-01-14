// lil subscriby (v-less)
Symbol.observable||=Symbol('observable')

// is target observable
export const observable = arg => arg && !!(
  arg[Symbol.observable] || arg[Symbol.asyncIterator] ||
  arg.call && arg.set ||
  arg.subscribe || arg.then
  // || arg.mutation && arg._state != null
)

export default (target, next, error, complete, stop) => 
  target && (
    target.subscribe?.( next, error, complete ) ||
    target[Symbol.observable]?.().subscribe?.( next, error, complete ) ||
    target.set && target.call?.(stop, v => { try { next(v) } catch (err) { error?.(err) } }) || // observ
    (
      target.then?.(v => (!stop && next(v), complete?.()), error) ||
      (async _ => {
        try {
          for await (target of target) { if (stop) return; next(target) }
          complete?.()
        } catch (err) { error?.(err) }
      })()
    ) && (_ => stop=1)
  )

