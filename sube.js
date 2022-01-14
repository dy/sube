// lil subscriby (v-less)
Symbol.observable||=Symbol('observable')

// observable utils
// FIXME: make an external dependency, shareable with spect/tmpl-parts
export const sube = (target, next, error, complete, stop) => (
  target && (
    target.subscribe?.( next, error, complete ) ||
    target[Symbol.observable]?.().subscribe?.( next, error, complete ) ||
    target.set && target.call?.(stop, v => { try { next(v) } catch (err) { error(err) } }) || // observ
    (
      target.then?.(v => stop ? complete?.(v) : next(v), error) ||
      (async _ => {
        try {
          for await (target of target) { if (stop) return complete?.(target); next(target) }
        } catch (err) error(err)
      })()
    ) && (_ => stop=1)
  )
),

observable = (arg) => arg && !!(
  arg[Symbol.observable] || arg[Symbol.asyncIterator] ||
  (arg.call && arg.set) ||
  arg.subscribe || arg.then
  // || arg.mutation && arg._state != null
)
