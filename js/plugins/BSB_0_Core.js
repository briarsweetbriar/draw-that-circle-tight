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
  BSB.C.evalFormula = function(formula, a, b, c) {
    let r = Math.random();
    return eval(formula);
  }

  BSB.C.valOrEval = function(val, ...args) {
    return isNaN(val) ? BSB.C.evalFormula(val, ...args) : val;
  } 
})();
