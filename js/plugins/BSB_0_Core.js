//=============================================================================
// RPG Maker MZ - BSB Core
//=============================================================================

var Imported = Imported || {};
Imported.BSB_0_Core = true;

var BSB = BSB || {};
BSB.C = BSB.C || {};

/*:
 * @target MZ
 * @plugindesc Adds essential functions to the BSB suite
 * @author briarsweetbriar
 */

(() => {
  BSB.C.destructureExtendedId = (extendedId) => {
    let [type, id] = extendedId.split('::');
  
    return { type, id };
  }

  BSB.C.getBattlerByExtendedId = (extendedId) => {
    let {type, id} = BSB.C.destructureExtendedId(extendedId);
    
    return type === 'Actor' ? $gameActors.actor(id) : new Game_Enemy($dataEnemies[id]);
  }

  BSB.C.boundBy = (value, min, max) => {
    return Math.max(min, Math.min(max, value));
  }

  BSB.C.evalFormula = function(formula, a, b, c) {
    let r = Math.random();
    return eval(formula);
  }

  BSB.C.valOrEval = function(val, ...args) {
    return isNaN(val) ? BSB.C.evalFormula(val, ...args) : val;
  }

  /* Game_BattlerBase */
  Game_BattlerBase.prototype.battlerData = function() {
    return this.isActor() ? this.actor() : this.enemy();
  };

  Game_BattlerBase.prototype.extendedId = function() {
    if (this._extendedId) return this._extendedId;

    let type = this.isActor() ? 'Actor' : 'Enemey';
    let baseId = this.battlerData().id;
  
    return this._extendedId = `${type}::${baseId}`;
  };

  Game_BattlerBase.prototype.allTargets = function() {
    return [...this.friendsUnit().members(), ...this.opponentsUnit().members()];
  };
})();
