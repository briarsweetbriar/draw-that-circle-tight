//=============================================================================
// RPG Maker MZ - Flux States
//=============================================================================

var Imported = Imported || {};
Imported.BSB_1_FluxStates = true;

var BSB = BSB || {};
BSB.FS = BSB.FS || {};

/*:
 * @target MZ
 * @plugindesc adds states that can fluxuate into other states
 * @author briarsweetbriar
 * @orderAfter BSB_0_Core
 * 
 * @param threshold
 * 
 * @param minThreshold
 * @parent threshold
 * @text min
 * @type number
 * @default 0
 * 
 * @param maxThreshold
 * @parent threshold
 * @text max
 * @type number
 * @default 100
 */

(() => {
  BSB.FS.Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
  Scene_Boot.prototype.onDatabaseLoaded = function() {
    BSB.FS.Scene_Boot_onDatabaseLoaded.call(this, ...arguments);
    BSB.FS.initializeFluxStates();
  };

  BSB.FS.Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    let subject = this.subject();
    BSB.FS.Game_Action_apply.call(this, ...arguments);
    BSB.C.getBattlerMultiLineTag(subject, 'Alter Flux State').forEach((changeTag) => {
      let power = BSB.C.valOrEval(changeTag.power, subject, target,)
      let resistance = target.fluxStateResistance(changeTag.type, subject, changeTag.reduce);

      let threshold = target.fluxStateIntensity(changeTag.type) || 0;
      let mod = Math.max(power - resistance, 0) * (changeTag.reduce ? -1 : 1);
      target.updateFluxStateThreshold(changeTag.type, threshold + mod);

      target.updateFluxStates();
    });
  };


  Object.defineProperties(Game_BattlerBase.prototype, {
    fluxStateIntensities: {
      get: function() {
          return this._fluxStateIntensities;
      },
      configurable: true
    },
  });

  BSB.FS.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
  Game_BattlerBase.prototype.initMembers = function() {
    BSB.FS.Game_BattlerBase_initMembers.call(this, ...arguments);
    this.clearfluxStateIntensities();
  };

  Game_BattlerBase.prototype.clearfluxStateIntensities = function() {
    return this._fluxStateIntensities = [];
  };

  Game_BattlerBase.prototype.fluxStates = function() {
    return this.states().find((state) => {
      return BSB.C.getMultiLineTag(state.note, 'Flux State').length > 0;
    });
  };

  Game_BattlerBase.prototype.fluxState = function(type) {
    return this.states().find((state) => {
      return BSB.C.getMultiLineTag(state.note, 'Flux State').some((fs) => {
        return fs.type === type;
      });
    });
  };

  Game_BattlerBase.prototype.fluxStateResistance = function(type, subject, isReduction) {
    return BSB.C.getBattlerMultiLineTag(this, 'Resist Flux State').reduce((resistance, resistTag) => {
      if (resistTag.type === type) {
        return resistance + BSB.C.valOrEval(resistTag[isReduction ? 'reduce resistance' : 'resistance'] || 0, subject, this);
      } else {
        return resistance;
      }
    }, 0);
  };

  Game_BattlerBase.prototype.updateFluxStates = function() {
    let gfs = BSB.FS.groupedFluxStates();
    BSB.FS.fluxStateTypes().forEach((type) => {
      let currentState = this.fluxState(type);
      let newState = gfs[type].find((fs) => {
        return fs.thresholds.every(({ amount, type }) => this.fluxStateIntensity(type) >= amount);
      })?.state;

      if (newState?.id !== currentState?.id) {
        this.eraseState(currentState?.id);
        this.addNewState(newState?.id);
      }
    });
  };

  Game_BattlerBase.prototype.updateFluxStateThreshold = function(type, amount) {
    let max = BSB.C.parse(PluginManager.parameters('bsb_1_fluxstates')['maxThreshold']);
    let min = BSB.C.parse(PluginManager.parameters('bsb_1_fluxstates')['minThreshold']);

    this._fluxStateIntensities[type] = Math.min(max, Math.max(min, amount));
  };

  Game_BattlerBase.prototype.fluxStateIntensity = function(type) {
    return this._fluxStateIntensities[type];
  };
  
  BSB.FS.getFluxState = function(type, threshold) {
    return BSB.FS.fluxStates()[type].find((fs) => threshold >= fs.threshold)?.state;
  }
  
  BSB.FS.fluxStateTypes = function() {
    return BSB.FS._fluxStateTypes;
  }
  
  BSB.FS.fluxStates = function() {
    return BSB.FS._fluxStates;
  }
  
  BSB.FS.groupedFluxStates = function() {
    return BSB.FS._groupedFluxStates;
  }
  
  BSB.FS.initializeFluxStates = function() {
    BSB.FS._fluxStates = BSB.FS.gatherFluxStates($dataStates);
    BSB.FS._groupedFluxStates = BSB.FS.groupFluxStates(BSB.FS.fluxStates());
    BSB.FS._fluxStateTypes = BSB.FS.gatherFluxStateTypes(BSB.FS.groupedFluxStates());
    BSB.FS.sortGroupedFluxStates(BSB.FS.groupedFluxStates());
  }

  BSB.FS.gatherFluxStates = function(states) {
    return states.reduce((fluxStates, state) => {
      if (BSB.C.getMultiLineTag(state?.note || '', 'Flux State').length > 0) fluxStates.push(state);

      return fluxStates;
    }, []);
  }

  BSB.FS.groupFluxStates = function(states) {
    return states.reduce((fluxStates, state) => {
      BSB.C.getMultiLineTag(state.note, 'Flux State').forEach(({ type, threshold }) => {
        let thresholds = typeof threshold === 'number' ? [{ amount: threshold, type }] : threshold;
        fluxStates[type] = fluxStates[type] || [];
        fluxStates[type].push({ thresholds, state });
      });

      return fluxStates;
    }, {});
  }

  BSB.FS.sortGroupedFluxStates = function(groupedStates) {
    Object.values(groupedStates).forEach((fs) => {
      fs.sort((a, b) => {
        if (b.thresholds.length !== a.thresholds.length) {
          return b.thresholds.length - a.thresholds.length;
        } else {
          let aSum = a.thresholds.reduce((sum, threshold) => sum + threshold.amount, 0);
          let bSum = b.thresholds.reduce((sum, threshold) => sum + threshold.amount, 0);
          return  bSum - aSum;
        }
      })
    });
  }

  BSB.FS.gatherFluxStateTypes = function(states) {
    return Object.keys(states);
  }
})();
