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
 * @fileoverview Utility functions for handling variables and procedure names.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Names');


/**
 * Class for a database of entity names (variables, functions, etc).
 * @param {string} reservedWords A comma-separated string of words that are
 *     illegal for use as names in a language (e.g. 'new,if,this,...').
 * @constructor
 */
Blockly.Names = function(reservedWords) {
  this.reservedDict_ = {};
  if (reservedWords) {
    var splitWords = reservedWords.split(',');
    for (var x = 0; x < splitWords.length; x++) {
      this.reservedDict_[Blockly.Names.PREFIX_ + splitWords[x]] = true;
    }
  }
  this.reset();
};

/**
 * When JavaScript (or most other languages) is generated, variable 'foo' and
 * procedure 'foo' would collide.  However, Blockly has no such problems since
 * variable get 'foo' and procedure call 'foo' are unambiguous.
 * Therefore, Blockly keeps a separate type name to disambiguate.
 * getName('foo', 'variable') -> 'foo'
 * getName('foo', 'procedure') -> 'foo2'
 */

/**
 * JavaScript doesn't have a true hashtable, it uses object properties.
 * Since even clean objects have a few properties, prepend this prefix onto
 * names so that they don't collide with any builtins.
 * @const
 * @private
 */
Blockly.Names.PREFIX_ = 'v_';

/**
 * Empty the database and start from scratch.  The reserved words are kept.
 */
Blockly.Names.prototype.reset = function() {
  this.db_ = {};
  this.dbReverse_ = {};
};

/**
 * Convert a Blockly entity name to a legal exportable entity name.
 * @param {string} name The Blockly entity name (no constraints).
 * @param {string} type The type of entity in Blockly
 *     ('variable', 'procedure', 'builtin', etc...).
 * @return {string} An entity name legal for the exported language.
 */
Blockly.Names.prototype.getName = function(name, type) {
  var normalized = Blockly.Names.PREFIX_ + name.toLowerCase() + 'X' + type;
  if (normalized in this.db_) {
    return this.db_[normalized];
  }
  var safeName = this.getDistinctName(name, type);
  this.db_[normalized] = safeName;
  return safeName;
};

/**
 * Convert a Blockly entity name to a legal exportable entity name.
 * Ensure that this is a new name not overlapping any previously defined name.
 * Also check against list of reserved words for the current language and
 * ensure name doesn't collide.
 * @param {string} name The Blockly entity name (no constraints).
 * @param {string} type The type of entity in Blockly
 *     ('variable', 'procedure', 'builtin', etc...).
 * @return {string} An entity name legal for the exported language.
 */
Blockly.Names.prototype.getDistinctName = function(name, type) {
  var safeName = this.safeName_(name);
  var i = '';
  while (this.dbReverse_[Blockly.Names.PREFIX_ + safeName + i] ||
      (Blockly.Names.PREFIX_ + safeName + i) in this.reservedDict_) {
    // Collision with existing name.  Create a unique name.
    i = i ? i + 1 : 2;
  }
  safeName += i;
  this.dbReverse_[Blockly.Names.PREFIX_ + safeName] = true;
  return safeName;
};

/**
 * Given a proposed entity name, generate a name that conforms to the
 * [_A-Za-z][_A-Za-z0-9]* format that most languages consider legal for
 * variables.
 * @param {string} name Potentially illegal entity name.
 * @return {string} Safe entity name.
 * @private
 */
Blockly.Names.prototype.safeName_ = function(name) {
  if (!name) {
    name = 'unnamed';
  } else {
    // Unfortunately names in non-latin characters will look like
    // _E9_9F_B3_E4_B9_90 which is pretty meaningless.
    name = encodeURI(name.replace(/ /g, '_')).replace(/[^\w]/g, '_');
    // Most languages don't allow names with leading numbers.
    if ('0123456789'.indexOf(name[0]) != -1) {
      name = 'my_' + name;
    }
  }
  return name;
};

/**
 * Do the given two entity names refer to the same entity?
 * Blockly names are case-insensitive.
 * @param {string} name1 First name.
 * @param {string} name2 Second name.
 * @return {boolean} True if names are the same.
 */
Blockly.Names.equals = function(name1, name2) {
  return name1.toLowerCase() == name2.toLowerCase();
};
