//=============================================================================
// RPG Maker MZ - bsb notetag parser
//=============================================================================

var Imported = Imported || {};
Imported.BSB_0_NotetagParser = true;

var BSB = BSB || {};
BSB.NP = BSB.NP || {};

/*:
 * @target MZ
 * @plugindesc a robust notetag parser
 * @author briarsweetbriar
 */

(() => {
  /**
   * finds all instance of a multiline tag and returns their values in an array
   *
   * @function getMultiLineTags
   *
   * @param {string} note - the note
   * @param {string} tag - the tag name
   *
   * @returns {array} an array of object matching the key/values inside the tag
   * @example
   * let note = `
   *   <Foo>
   *     boolean: true
   *     number: 8.88
   *     string: other value
   *     array: [1, 2, 3]
   *     object: { boo: 1 }
   *     nestedStuff: [{ boo: 1, baz: 2 }, { boo: 3, baz: 99 }]
   *   </Foo>
   *   <Foo>
   *     anotherVal: 123
   *   </Foo>
   *   <Bar>
   *     something: else
   *   </Bar>
   * `
   * 
   * BSB.NP.getMultiLineTag(note, "Foo");
   * => [{
   *  boolean: true,
   *  number: 8.88,
   *  string: 'other value',
   *  array: [1, 2, 3],
   *  object: { boo: 1 },
   *  nestedStuff: [{ boo: 1, baz: 2 }, { boo: 3, baz: 99 }]
   * }, {
   *   anotherVal: 123
   * }]
   *
   */
  BSB.NP.getMultiLineTags = function(note, tag) {
    if (!note || !tag) { return []; }
    return BSB.NP.filterText(note, new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g')).map(BSB.NP.parseTag);
  }

  /**
   * finds the first instance of a multie line tag and returns its attributes
   *
   * @function getMultiLineTag
   *
   */
  BSB.NP.getMultiLineTag = function(note, tag) {
    return BSB.NP.getMultiLineTags(note, tag)[0];
  }

  /**
   * finds all instance of a multiline tag on a battler and its equipment/class/states
   *
   * @function getMultiLineTags
   *
   * @param {string} tag - the tag name
   *
   * @returns {array} an array of object matching the key/values inside the tag
   *
   */
  Game_BattlerBase.prototype.getMultiLineTags = function(tag) {
    let aspects = this.states();
    if (this.isActor()) {
      aspects = aspects.concat([this.actor(), this.currentClass(), ...this.equips()]);
    } else {
      aspects = aspects.concat(this.enemy());
    }
    return aspects.reduce((tags, aspect) => {
      if (aspect?.note) {
        return tags.concat(BSB.NP.getMultiLineTags(aspect.note, tag));
      } else {
        return tags;
      }
    }, []);
  }

  /**
   * finds all instances of a single line tag and returns their attributes
   *
   * @function getTag
   *
   * @param {string} note - The note
   * @param {string} tag - The tag name
   *
   * @returns {array} an array of arrays of tag attributes
   * @example
   * BSB.NP.getTag('<Foo: 1, true, bar>', "Foo");
   * => [[1, true, 'bar']]
   * 
   * BSB.NP.getTag('<Foo: 1, true, bar> <Foo: baz> <Bar>', "Foo");
   * => [[1, true, 'bar'], ['baz']]
   * 
   * BSB.NP.getTag('<Foo>', "Foo");
   * => [[]]
   * 
   * BSB.NP.getTag('<Foo>', "Bar");
   * => undefined
   *
   */
  BSB.NP.getTags = function(note, tag) {
    if (!note || !tag) { return []; }
    return BSB.NP.filterText(note, new RegExp(`<${tag}:([\\s\\S]*?)>|<${tag}>`, 'g')).map(str => str ? str.split(',').map(BSB.NP.parse) : []);
  }

  /**
   * finds the first instance of a single line tag and returns its attributes
   *
   * @function getTag
   *
   */
  BSB.NP.getTag = function(note, tag) {
    return BSB.NP.getTags(note, tag)[0];
  }
  
  /**
   * finds all instances of a js tag and returns their contents
   *
   * @function getJSTags
   *
   * @param {string} note - The note
   * @param {string} tag - The tag name
   *
   * @returns {array} an array of code strings
   * let note = `
   *   <Foo>
   *     my custom code
   *   </Foo>
   *   <Foo>
   *     my other code
   *   </Foo>
   * 
   * BSB.NP.getMultiLineTag(note, "Foo");
   * => ["my custom code", "my other code"]
   *
   */
  BSB.NP.getJSTags = function(note, tag) {
    if (!note || !tag) { return []; }
    return BSB.NP.filterText(note, new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g'));
  }
  
  /**
   * finds the first instance of a js tag and returns its contents
   *
   * @function getJSTag
   *
   */
  BSB.NP.getJSTag = function(note, tag) {
    return BSB.NP.getJSTags(note, tag)[0];
  }

  // derived from https://fenixenginemv.gitlab.io/fenix-tools/Utils_filterText.js.html
  BSB.NP.filterText = function(text, re) {
    let result = [];
    let match;
    while (match = re.exec(text)) {
      result.push(match[1]?.trim());
    }
    return result;
  }

  BSB.NP.parseTag = function(tag) {
    return BSB.NP.applyKeyValues({}, tag.split('\n').filter(line => line.includes(':')).map(BSB.NP.parseToKeyValue));
  }

  BSB.NP.parse = function(string) {
    let trimmed = string.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return BSB.NP.parseToArray(trimmed);
    } else if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return BSB.NP.parseToObject(trimmed);
    } else {
      return BSB.NP.parseToPrimitive(trimmed);
    }
  }

  BSB.NP.parseToArray = function(string) {
    return BSB.NP.shallowParse(string.slice(1, string.length - 1)).map(BSB.NP.parse);
  }

  BSB.NP.parseToObject = function(string) {
    return BSB.NP.applyKeyValues({}, BSB.NP.shallowParse(string.slice(1, string.length - 1)).map(BSB.NP.parseToKeyValue));
  }

  BSB.NP.parseToPrimitive = function(string) {
    try {
      return JSON.parse(string);
    } catch (e) {
      return string;
    }
  }

  BSB.NP.parseToKeyValue = function(string) {
    let [key, value] = string.split(/:(.+)/);

    return [key.trim(), value.trim()];
  }

  BSB.NP.applyKeyValues = function(object, keyValues) {
    keyValues.forEach(([key, value]) => {
      object[key] = BSB.NP.parse(value);
    });

    return object;
  }

  // derived from https://stackoverflow.com/questions/41516862/split-by-commas-but-not-within-brackets-using-regexp
  BSB.NP.shallowParse = function(str) {
    let result = [], item = '', depth = 0;
  
    function push() { if (item) result.push(item); item = ''; }
  
    for (let i = 0, c; c = str[i], i < str.length; i++) {
      if (!depth && c === ',') push();
      else {
        item += c;
        if (c === '[' || c === '{') depth++;
        if (c === ']' || c === '}') depth--;
      }
    }
    
    push();
    return result;
  }
})();
