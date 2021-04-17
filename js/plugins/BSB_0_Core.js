//=============================================================================
// RPG Maker MZ - Flux States
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds states that can fluxuate into other states
 * @author briarsweetbriar
 */

var BSB = BSB || {};
BSB.C = BSB.C || {};

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

  BSB.C.toPrimitive = function(string) {
    try {
      return JSON.parse(string);
    } catch (e) {
      return string;
    }
  }

  BSB.C.parseTag = function(tag) {
    return tag.split('\n').reduce((params, line) => {
      const tup = line.split(':')
      params[tup[0].trim()] = BSB.C.toPrimitive(tup[1].trim());
      return params;
    }, {});
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

  BSB.C.evalFormula = function(formula, a, b, c) {
    return eval(formula);
  }

  BSB.C.valOrEval = function(val, a, b, c) {
    return isNaN(val) ? BSB.C.evalFormula(val, a, b, c) : val;
  } 
})();