'use strict'

var sinon = require('sinon')

function makeSandbox (config) {
  var sandbox = sinon.sandbox.create(config)

  // clean up after each test
  afterEach(function () {
    sandbox.restore()
  })

  // expose assertions and matchers
  sandbox.assert = sinon.assert
  sandbox.match = sinon.match

  return sandbox
}

module.exports = makeSandbox
