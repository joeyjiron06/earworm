import Utils from '../../../utils/utils';
import { module, test } from 'qunit';

module('Utils');

// Replace this with your real tests.
test('isNullOrEmpty', function(assert) {
  // empty tests
  assert.ok(Utils.isNoE(), 'no params is null or empty');
  assert.ok(Utils.isNoE(null), 'null');
  assert.ok(Utils.isNoE(undefined), 'null');
  assert.ok(Utils.isNoE([]), 'empty array');
  assert.ok(Utils.isNoE(''), 'empty string');
  assert.ok(Utils.isNoE('     '), 'string with only spaces');
  assert.ok(Utils.isNoE('\t\t'), 'string with only tabs');
  assert.ok(Utils.isNoE('\n'), 'string with only new line');
  assert.ok(Utils.isNoE({}), 'empty object');

  // non-empty tests
  
  assert.ok(!Utils.isNoE([0]), 'non-empty array');
  assert.ok(!Utils.isNoE('s', 'some text'));
  assert.ok(!Utils.isNoE(0), 'number 0');
  assert.ok(!Utils.isNoE(1), 'number 1');
  assert.ok(!Utils.isNoE({someKey:null}), 'object');
});


test('isArray', function(assert) {
  assert.ok(Utils.isArray([]), 'empty array');

  assert.ok(!Utils.isArray(undefined), 'undefined');
  assert.ok(!Utils.isArray(1), 'number is not array');
  assert.ok(!Utils.isArray(''), 'empty string is not array');
  assert.ok(!Utils.isArray('text'), 'string with text is not array');
  assert.ok(!Utils.isArray({}), 'object not array');
  assert.ok(!Utils.isArray(function(){}), 'function not array');
});
test('isString', function(assert) {
  assert.ok(Utils.isString(''), 'string');
  assert.ok(Utils.isString('text'), 'string with text');

  assert.ok(!Utils.isString(null), 'null');
  assert.ok(!Utils.isString(undefined), 'undefined');
  assert.ok(!Utils.isString([]), 'empty array');
  assert.ok(!Utils.isString(1), 'number');
  assert.ok(!Utils.isString({}), 'object');
  assert.ok(!Utils.isString(function(){}), 'function');
});
test('isObject', function(assert) {
  assert.ok(Utils.isObject({}), 'object');

  assert.ok(!Utils.isObject(''), 'string');
  assert.ok(!Utils.isObject('text'), 'string with text');
  assert.ok(!Utils.isObject(null), 'null');
  assert.ok(!Utils.isObject(undefined), 'undefined');
  assert.ok(!Utils.isObject([]), 'empty array');
  assert.ok(!Utils.isObject(1), 'number');
  assert.ok(!Utils.isObject(function(){}), 'function');
});
test('isNumber', function(assert) {
  assert.ok(Utils.isNumber(0), 'number');

  assert.ok(!Utils.isNumber(''), 'string');
  assert.ok(!Utils.isNumber('text'), 'string with text');
  assert.ok(!Utils.isNumber(null), 'null');
  assert.ok(!Utils.isNumber(undefined), 'undefined');
  assert.ok(!Utils.isNumber([]), 'empty array');
  assert.ok(!Utils.isNumber(function(){}), 'function');
});

test('isFunction', function(assert) {
  assert.ok(Utils.isFunction(function(){}), 'function');

  assert.ok(!Utils.isFunction(''), 'string');
  assert.ok(!Utils.isFunction('text'), 'string with text');
  assert.ok(!Utils.isFunction(null), 'null');
  assert.ok(!Utils.isFunction(undefined), 'undefined');
  assert.ok(!Utils.isFunction([]), 'empty array');
  assert.ok(!Utils.isFunction(0), 'number');
});
