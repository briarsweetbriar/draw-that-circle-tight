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
  BSB.NP.getMultiLineTags = function(note, tag) {
    if (!note || !tag) { return []; }
    return BSB.NP.filterText(note, new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g')).map(BSB.NP.parseTag);
  }

  BSB.NP.getMultiLineTag = function(note, tag) {
    return BSB.NP.getMultiLineTags(note, tag)[0];
  }

  BSB.NP.getTags = function(note, tag) {
    if (!note || !tag) { return []; }
    return BSB.NP.filterText(note, new RegExp(`<${tag}:([\\s\\S]*?)>|<${tag}>`, 'g')).map(str => str ? str.split(',').map(BSB.NP.parse) : []);
  }

  BSB.NP.getTag = function(note, tag) {
    return BSB.NP.getTags(note, tag)[0];
  }
  
  BSB.NP.getJSTags = function(note, tag) {
    if (!note || !tag) { return []; }
    return BSB.NP.filterText(note, new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g'));
  }

  BSB.NP.getJSTag = function(note, tag) {
    return BSB.NP.getJSTags(note, tag)[0];
  }

  Game_BattlerBase.prototype._getTagsOfType = function(tag, getTags) {
    let aspects = this.states();
    if (this.isActor()) {
      aspects = aspects.concat([this.actor(), this.currentClass(), ...this.equips()]);
    } else {
      aspects = aspects.concat(this.enemy());
    }
    return aspects.reduce((tags, aspect) => {
      if (aspect?.note) {
        return tags.concat(getTags(aspect.note, tag));
      } else {
        return tags;
      }
    }, []);
  }

  Game_BattlerBase.prototype.getMultiLineTags = function(tag) {
    return this._getTagsOfType(tag, BSB.NP.getMultiLineTags);
  }

  Game_BattlerBase.prototype.getMultiLineTag = function(tag) {
    return this._getTagsOfType(tag, BSB.NP.getMultiLineTags)[0];
  }

  Game_BattlerBase.prototype.getTags = function(tag) {
    return this._getTagsOfType(tag, BSB.NP.getTags);
  }

  Game_BattlerBase.prototype.getTag = function(tag) {
    return this._getTagsOfType(tag, BSB.NP.getTags)[0];
  }

  Game_Action.prototype._getTagsOfType = function(tag, getTags) {
    let tags = getTags(this.item());
    
    return tags.concat(this.subject()._getTagsOfType(tag, getTags));
  }

  Game_Action.prototype.getMultiLineTags = function(tag) {
    return this._getTagsOfType(tag, BSB.NP.getMultiLineTags);
  }

  Game_Action.prototype.getTags = function(tag) {
    return this._getTagsOfType(tag, BSB.NP.getTags);
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
