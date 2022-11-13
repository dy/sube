# sube <a href="https://github.com/spectjs/sube/actions/workflows/test.yml"><img src="https://github.com/spectjs/sube/actions/workflows/test.yml/badge.svg"/></a> <a href="http://npmjs.org/sube"><img src="https://img.shields.io/npm/v/sube"/></a>

> Subscribe weakly to any reactive source

```js
import sub from './sube.js'

unsub = sub(source, onnext, onerror?, oncomplete?)

// ...unsubscribe
unsub()
```

Kinds of sources:

* _Promise_ / _Thenable_
* _Observable_ / _Subscribable_ / _Subject_ ([@preact/signals](https://ghub.io/@preact/signals), [rxjs](https://ghub.io/rxjs), [value-ref](https://ghub.io/value-ref) etc)
* _AsyncIterable_ (see [it-awesome](https://github.com/alanshaw/it-awesome))
* _observ-\*_ ([observ](https://www.npmjs.com/package/observ), [observable](https://www.npmjs.com/package/observable), [mutant](https://www.npmjs.com/package/mutant))

Subscription is [weak](https://v8.dev/features/weak-references), so manual `unsub()` isn't necessary - it is called when `source` is garbage collected.

<p align="center">🕉<p>
