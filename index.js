'use strict'

var sinon = require('sinon')

function makeSandbox (config) {
  var sandbox = sinon.sandbox.create(config)

  // clean up after each test
  afterEach(function () {
    sandbox.restore()
  })

  // expose additional sinon properties
  sandbox.createStubInstance = sinon.createStubInstance
  sandbox.assert = sinon.assert
  sandbox.match = sinon.match

  return sandbox
}

module.exports = makeSandbox
