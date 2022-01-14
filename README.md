# sube

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
