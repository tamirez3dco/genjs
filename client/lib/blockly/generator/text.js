/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.text');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.text_text = function() {
  // Text value.
  var code = Blockly.JavaScript.quote_(this.getTitleValue('TEXT'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_join = function() {
  // Create a string made up of any number of elements of any type.
  var code;
  if (this.itemCount_ == 0) {
    return ['\'\'', Blockly.JavaScript.ORDER_ATOMIC];
  } else if (this.itemCount_ == 1) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'ADD0',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = 'String(' + argument0 + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  } else if (this.itemCount_ == 2) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'ADD0',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.valueToCode(this, 'ADD1',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = 'String(' + argument0 + ') + String(' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_ADDITION];
  } else {
    code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
      code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
          Blockly.JavaScript.ORDER_COMMA) || '\'\'';
    }
    code = '[' + code.join(',') + '].join(\'\')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
};

Blockly.JavaScript.text_append = function() {
  // Append to a variable in place.
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return varName + ' = String(' + varName + ') + String(' + argument0 + ');\n';
};

Blockly.JavaScript.text_length = function() {
  // String length.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.text_isEmpty = function() {
  // Is the string null?
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  return ['!' + argument0, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

Blockly.JavaScript.text_endString = function() {
  // Return a leading or trailing substring.
  var first = this.getTitleValue('END') == 'FIRST';
  var code;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
      Blockly.JavaScript.ORDER_COMMA) || '1';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  if (first) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_COMMA) || '1';
    code = argument1 + '.substring(0, ' + argument0 + ')';
  } else {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_UNARY_NEGATION) || '1';
    if (argument0.match(/^\d+$/) && !argument0.match(/^0+$/)) {
      // Shortcut for a plain positive number.
      code = argument1 + '.slice(-' + argument0 + ')';
    } else {
      code = argument1 + '.slice(- ' + argument0 + ' || Infinity)';
    }
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_indexOf = function() {
  // Search the text for a substring.
  var operator = this.getTitleValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FIND',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.text_charAt = function() {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = this.getTitleValue('WHERE') || 'FROM_START';
  var at = Blockly.JavaScript.valueToCode(this, 'AT',
      Blockly.JavaScript.ORDER_UNARY_NEGATION) || '1';
  var text = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = text + '.slice(-1)';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      // Blockly uses one-based indicies.
      if (at.match(/^-?\d+$/)) {
        // If the index is a naked number, decrement it right now.
        at = parseInt(at, 10) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      var code = text + '.charAt(' + at + ')';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'FROM_END':
      var code = text + '.slice(-' + at + ').charAt(0)';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      if (!Blockly.JavaScript.definitions_['text_random_letter']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'text_random_letter', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.text_charAt.text_random_letter = functionName;
        var func = [];
        func.push('function ' + functionName + '(text) {');
        func.push('  var x = Math.floor(Math.random() * text.length);');
        func.push('  return text[x];');
        func.push('}');
        Blockly.JavaScript.definitions_['text_random_letter'] = func.join('\n');
      }
      code = Blockly.JavaScript.text_charAt.text_random_letter +
          '(' + text + ')';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};

Blockly.JavaScript.text_changeCase = function() {
  // Change capitalization.
  var mode = this.getTitleValue('CASE');
  var operator = Blockly.JavaScript.text_changeCase.OPERATORS[mode];
  var code;
  if (operator) {
    // Upper and lower case are functions built into JavaScript.
    var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
        Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
    code = argument0 + operator;
  } else {
    if (!Blockly.JavaScript.definitions_['text_toTitleCase']) {
      // Title case is not a native JavaScript function.  Define one.
      var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
          'text_toTitleCase', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.text_changeCase.toTitleCase = functionName;
      var func = [];
      func.push('function ' + functionName + '(str) {');
      func.push('  return str.replace(/\\S+/g,');
      func.push('      function(txt) {return txt[0].toUpperCase() + ' +
                'txt.substring(1).toLowerCase();});');
      func.push('}');
      Blockly.JavaScript.definitions_['text_toTitleCase'] = func.join('\n');
    }
    var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = Blockly.JavaScript.text_changeCase.toTitleCase +
        '(' + argument0 + ')';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_changeCase.OPERATORS = {
  UPPERCASE: '.toUpperCase()',
  LOWERCASE: '.toLowerCase()',
  TITLECASE: null
};

Blockly.JavaScript.text_trim = function() {
  // Trim spaces.
  var mode = this.getTitleValue('MODE');
  var operator = Blockly.JavaScript.text_trim.OPERATORS[mode];
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  return [argument0 + operator, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_trim.OPERATORS = {
  LEFT: '.trimLeft()',
  RIGHT: '.trimRight()',
  BOTH: '.trim()'
};

Blockly.JavaScript.text_print = function() {
  // Print statement.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'window.alert(' + argument0 + ');\n';
};

Blockly.JavaScript.text_prompt = function() {
  // Prompt function.
  var msg = Blockly.JavaScript.quote_(this.getTitleValue('TEXT'));
  var code = 'window.prompt(' + msg + ')';
  var toNumber = this.getTitleValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'window.parseFloat(' + code + ')';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
