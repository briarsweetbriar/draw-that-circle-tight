//=============================================================================
// RPG Maker MZ - Flux States
//=============================================================================

var Imported = Imported || {};
Imported.BSB_0_Core = true;

var BSB = BSB || {};
BSB.C = BSB.C || {};

/*:
 * @target MZ
 * @plugindesc Adds states that can fluxuate into other states
 * @author briarsweetbriar
 */

(() => {
  // Taken from https://fenixenginemv.gitlab.io/fenix-tools/Utils_filterText.js.html
  BSB.C.filterText = function(text, re) {
    let result = [];
    let match;
    while (match = re.exec(text)) {
      result.push(match[1].trim());
    }
    return result
  }

  // inspired by https://fenixenginemv.gitlab.io/fenix-tools/Utils_getMultilineTag.js.html
  BSB.C.getMultiLineTag = function(text, tag) {
    if (!text || !tag) { return []; }
    return BSB.C.filterText(text, new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g')).map(BSB.C.parseTag);
  }

  // inspired by https://fenixenginemv.gitlab.io/fenix-tools/Utils_getTag.js.html
  BSB.C.getTag = function(text, tag) {
    if (!text || !tag) { return []; }
    return BSB.C.filterText(text, new RegExp(`<${tag}:([\\s\\S]*?)>|<${tag}>`, 'g')).map(BSB.C.parseTag);
  }

  BSB.C.getCharacterMultiLineTag = function(character, tag) {
    let objects = character.states();
    if (character.isActor()) {
      objects = objects.concat([character.actor(), ...character.equips()]);
    } else {
      objects = objects.concat(character.enemy());
    }
    return objects.reduce((tags, object) => {
      if (object?.note) {
        return tags.concat(BSB.C.getMultiLineTag(object.note, tag));
      } else {
        return tags;
      }
    }, []);
  }

  BSB.C.parseTag = function(tag) {
    return BSB.C.applyKeyValues({}, tag.split('\n').filter(line => line.includes(':')).map(BSB.C.parseToKeyValue));
  }

  BSB.C.parse = function(string) {
    let trimmed = string.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return BSB.C.parseToArray(trimmed);
    } else if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return BSB.C.parseToObject(trimmed);
    } else {
      return BSB.C.parseToPrimitive(trimmed);
    }
  }

  BSB.C.parseToArray = function(string) {
    return BSB.C.shallowParse(string.slice(1, string.length - 1)).map(BSB.C.parse);
  }

  BSB.C.parseToObject = function(string) {
    return BSB.C.applyKeyValues({}, BSB.C.shallowParse(string.slice(1, string.length - 1)).map(BSB.C.parseToKeyValue));
  }

  BSB.C.parseToPrimitive = function(string) {
    try {
      return JSON.parse(string);
    } catch (e) {
      return string;
    }
  }

  BSB.C.parseToKeyValue = function(string) {
    let [key, value] = string.split(/:(.+)/);

    return [key.trim(), value.trim()];
  }

  BSB.C.applyKeyValues = function(object, keyValues) {
    keyValues.forEach(([key, value]) => {
      object[key] = BSB.C.parse(value);
    });

    return object;
  }

  // inspired by https://stackoverflow.com/questions/41516862/split-by-commas-but-not-within-brackets-using-regexp
  BSB.C.shallowParse = function(str) {
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

  BSB.C.evalFormula = function(formula, a, b, c) {
    return eval(formula);
  }

  BSB.C.valOrEval = function(val, a, b, c) {
    return isNaN(val) ? BSB.C.evalFormula(val, a, b, c) : val;
  } 
})();
