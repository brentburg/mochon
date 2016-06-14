# Mochon (Mocha + Sinon)

Mochon is a sinon helper for mocha. It creates a sandbox that is automatically cleaned up after each test. There are other modules that do basically the same thing like [mocha-sinon](https://www.npmjs.com/package/mocha-sinon). So why one more?

Rather than adding the sinon sandbox to the `this` context for the test functions (requiring that you not use arrow functions), Mochon returns a sinon sandbox to be used within a describe block. In addition to being able to use arrow functions for your tests, it is also much easier to get test cleanup protection in existing specs that are using sinon directly.

## Installation

```bash
npm install sinon mochon --save-dev
```

## Upgrading Existing Specs

### Before

```js
import sinon from 'sinon'

describe('Something I am testing', () => {
  beforeEach(() => {
    sinon.stub(someObject, 'someMethod')
  })

  afterEach(() => {
    someObject.someMethod.restore()
  })

  it('does something I expect', () => {
    testSubject()
    sinon.assert.called(someObject.someMethod)
  })
})
```

### After

```js
import mochon from 'mochon'

describe('Something I am testing', () => {
  const sinon = mochon()

  beforeEach(() => {
    sinon.stub(someObject, 'someMethod')
  })

  it('does something I expect', () => {
    testSubject()
    sinon.assert.called(someObject.someMethod)
  })
})
```

Get the benefits with no change to the actual tests!

## Assertions and Matchers

A sinon sandbox does not typically include `.assert` and `.match`. Though, if you plan to use Mochon as a drop in replacement for directly requiring sinon in your specs it is very useful. Sinon sandboxes created by mochon include a reference to both. You can use the sandbox returned by mochon exactly as you would have if you required sinon directly.
