'use strict'

var mochon = require('.')
var sinon = require('sinon')
var assert = require('assert')

describe('mochon', function () {
  var sandbox

  beforeEach(function () {
    sandbox = {}
    sinon.stub(sinon.sandbox, 'create').returns(sandbox)
    sinon.stub(global, 'afterEach')
  })

  afterEach(function () {
    sinon.sandbox.create.restore()
    afterEach.restore()
  })

  it('passes config to sinon sandbox create', function () {
    var config = {}
    mochon(config)
    sinon.assert.calledWith(sinon.sandbox.create, config)
  })

  it('returns a sandbox', function () {
    assert.equal(mochon(), sandbox)
  })

  it('restores the sandbox after each test', function () {
    sandbox.restore = sinon.spy()
    afterEach.callsArg(0)
    mochon()
    sinon.assert.calledOn(sandbox.restore, sandbox)
  })

  it('exposes sinon assert', function () {
    var ret = mochon()
    assert.equal(ret.assert, sinon.assert)
  })

  it('exposes sinon match', function () {
    var ret = mochon()
    assert.equal(ret.match, sinon.match)
  })
})
