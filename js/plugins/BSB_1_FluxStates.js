//=============================================================================
// RPG Maker MZ - Flux States
//=============================================================================

/*:
 * @target MZ
 * @plugindesc adds states that can fluxuate into other states
 * @author briarsweetbriar
 * 
 * @param threshold
 * 
 * @param minThreshold
 * @parent threshold
 * @text minimum threshold value
 * @type number
 * @default 0
 * 
 * @param maxThreshold
 * @parent threshold
 * @text maximum threshold value
 * @type number
 * @default 100
 */

var BSB = BSB || {};
BSB.FS = BSB.FS || {};

(() => {
  BSB.FS.Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    let subject = this.subject();
    BSB.FS.Game_Action_apply.call(this, target);
    BSB.C.getCharacterMultiLineTag(subject, 'Alter Flux State').forEach((changeTag) => {
      let currentState = BSB.FS.getActorFluxState(changeTag.type, target);
      let potency = BSB.C.valOrEval(changeTag.potency || 1, subject, target, currentState)
      let resistance = BSB.C.getCharacterMultiLineTag(target, 'Resist Flux State').reduce((resistance, resistTag) => {
        if (resistTag.type === changeTag.type) {
          return resistance + BSB.C.valOrEval(resistTag[changeTag.reduce ? 'reduce resistance' : 'resistance'] || 0, subject, target, currentState);
        } else {
          return resistance;
        }
      }, 0);

      target._fluxStateThresholds = target._fluxStateThresholds || {};
      let newVal = target._fluxStateThresholds[changeTag.type] || 0;
      newVal += Math.max(potency - resistance, 0) * (changeTag.reduce ? -1 : 1);
      
      let max = PluginManager.parameters('bsb_1_fluxstate')['maxThreshold'];
      let min = PluginManager.parameters('bsb_1_fluxstate')['minThreshold'];
      target._fluxStateThresholds[changeTag.type] = newVal = Math.min(max, Math.max(min, newVal));
      
      let newState = BSB.FS.getFluxState(changeTag.type, newVal);

      if (!newState) {
        target.eraseState(currentState);
      } else if (newState?.id !== currentState?.id) {
        target.eraseState(currentState);
        target.addNewState(newState);
      }
    });
  };

  BSB.FS.gatherFluxStates = function(states) {
    return states.reduce((fluxStates, state) => {
      BSB.C.getMultiLineTag(state?.note || '', 'Flux State').forEach(({ type, threshold }) => {
        fluxStates[type] = fluxStates[type] || [];
        fluxStates[type].push({ threshold, state });
        fluxStates[type].sort((a, b) => b.threshold - a.threshold);
      });

      return fluxStates;
    }, {});
  }
  
  BSB.FS.getFluxState = function(type, threshold) {
    return BSB.FS.fluxStates()[type].find((fs) => threshold >= fs.threshold);
  }
  
  BSB.FS.getActorFluxState = function(type, actor) {
    return actor.states().find((state) => {
      return BSB.C.getMultiLineTag(state.note, 'Flux State').length > 0;
    });
  }
  
  BSB.FS.fluxStates = function() {
    return BSB.FS._fluxStates || BSB.FS.initializeFluxStates();
  }
  
  BSB.FS.initializeFluxStates = function() {
    return BSB.FS._fluxStates = BSB.FS._fluxStates || BSB.FS.gatherFluxStates($dataStates);
  }
})();
