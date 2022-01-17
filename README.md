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
* _Observable_ / _Subscribable_ / _Subject_ ([rxjs](https://www.npmjs.com/package/rxjs))
* _AsyncIterable_
* _observ-\*_ ([observ](https://www.npmjs.com/package/observ), [observable](https://www.npmjs.com/package/observable), [mutant](https://www.npmjs.com/package/mutant))

Subscription is [weak](https://v8.dev/features/weak-references), so manual `unsub` isn't necessary.

<p align="center">🕉<p>
