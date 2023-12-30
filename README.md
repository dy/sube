# sube <a href="https://github.com/spectjs/sube/actions/workflows/test.yml"><img src="https://github.com/spectjs/sube/actions/workflows/test.yml/badge.svg"/></a> <a href="http://npmjs.org/sube"><img src="https://img.shields.io/npm/v/sube"/></a>

> Subscribe weakly to any reactive source

```js
import sub from './sube.js'

unsub = sub(source, onnext, onerror?, oncomplete?)

unsub() // unsubscribe
```

Kinds of sources:

* _Promise_, _Thenable_ (autocleanup)
* _Observable_, _Subscribable_, _Subject_ ([rxjs](https://ghub.io/rxjs), [zen-observable](https://github.com/zenparsing/zen-observable) etc.)
* _AsyncIterable_ (see [it-awesome](https://github.com/alanshaw/it-awesome))
* _Signal_ ([@preact/signals](https://ghub.io/@preact/signals), [value-ref](https://ghub.io/value-ref) etc.)
* _observ-\*_ ([observ](https://www.npmjs.com/package/observ), [observable](https://www.npmjs.com/package/observable), [mutant](https://www.npmjs.com/package/mutant))

<p align="center">🕉<p>
