# sube <a href="https://github.com/spectjs/sube/actions/workflows/test.yml"><img src="https://github.com/spectjs/sube/actions/workflows/test.yml/badge.svg"/></a> <a href="http://npmjs.org/sube"><img src="https://img.shields.io/npm/v/sube"/></a>

> Subscribe to any reactive source

```js
import sube from './sube.js'

unsube = sube(source, onnext, onerror?, oncomplete?)
unsube()
```

Kinds of sources:

* _Promise_ / _Thenable_
* _Observable_ / _Subscribable_ / _Subject_ (rxjs)
* _AsyncIterable_
* `observ-*` ([observ](https://www.npmjs.com/package/observ), [observable](https://www.npmjs.com/package/observable), [mutant](https://www.npmjs.com/package/mutant))

<p align="center">🕉<p>
