//=============================================================================
// RPG Maker MZ - Artificial Personality
//=============================================================================

var Imported = Imported || {};
Imported.BSB_ArtificialPersonality = true;

var BSB = BSB || {};
BSB.AP = BSB.AP || {};

/*:
 * @target MZ
 * @plugindesc enhances the autobattler to make decisions based on personality, mood, relationships, and awareness.
 * @author briarsweetbriar
 * @orderAfter BSB_NotetagParser
 * @orderAfter BSB_FluxStates
 * 
 * @param biases
 * 
 * @param defaultBiasFormation
 * @parent biases
 * @text default bias formation
 * @type number
 * @default 0.25
 * 
 * @param relationships
 * 
 * @param minAttitude
 * @parent relationships
 * @text min attitude
 * @type number
 * @default -100
 * 
 * @param maxAttitude
 * @parent relationships
 * @text max attitude
 * @type number
 * @default 100
 * 
 * @param defaultRelationshipFormation
 * @parent relationships
 * @text default relationship formation
 * @type number
 * @default 0.25
 * 
 * @param tempEnemyRelationships
 * @parent relationships
 * @text purge relationships w/ enemies after every battle
 * @type boolean
 * @default true
 */

(() => {

  /* AttitudeBase */
  BSB.AP.AttitudeBase = function() {
    this.initialize(...arguments);
  }

  Object.defineProperties(BSB.AP.AttitudeBase.prototype, {
    obsession: {
        get: function() {
            return this.AttitudeTypes.reduce((sum, type) => {
              return this[type] + sum;
            }, 0) / this.AttitudeTypes.length;
        },
        configurable: true
    },
  });

  BSB.AP.AttitudeBase.prototype.initialize = function(subject, attitudes) {
    this.setAttitudes(attitudes);
    this.setSubject(subject);
  };

  BSB.AP.AttitudeBase.prototype.AttitudeTypes = ['cooperation', 'fear', 'hate', 'love', 'rivalry', 'trust'];

  BSB.AP.AttitudeBase.prototype.setAttitudes = function(attitude = {}) {
    Object.keys(attitude).forEach((key) => this.setAttitude(key, attitude[key]));
  };

  BSB.AP.AttitudeBase.prototype.setAttitude = function(key, value) {
    let max = BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['maxAttitude']);
    let min = BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['minAttitude']);
    return this[key] = BSB.C.boundBy(value, min, max);
  };

  BSB.AP.AttitudeBase.prototype.getAttitudes = function() {
    return this.AttitudeTypes.reduce((attitudes, type) => {
      attitudes[type] = this[type];
      return attitudes;
    }, {});
  };

  BSB.AP.AttitudeBase.prototype.getAttitude = function(key) {
    return this[key];
  };

  BSB.AP.AttitudeBase.prototype.setSubject = function(subject) {
    return this._subject = subject;
  };

  BSB.AP.AttitudeBase.prototype.subject = function() {
    return this._subject;
  };

  BSB.AP.AttitudeBase.prototype.incrementAttitude = function(key, amount = 1) {
    return this.setAttitude(key, this.getAttitude(key) + amount);
  };

  BSB.AP.AttitudeBase.prototype.decrementAttitude = function(key, amount = 1) {
    return this.setAttitude(key, this.getAttitude(key) - amount);
  };

  /* Impression */
  BSB.AP.Impression = function() {
    this.initialize(...arguments);
  }

  BSB.AP.Impression.prototype = Object.create(BSB.AP.AttitudeBase.prototype);
  BSB.AP.Impression.prototype.constructor = BSB.AP.Impression;

  Object.defineProperties(BSB.AP.Impression.prototype, {
    id: {
        get: function() {
            return BSB.AP.ImpressionId(this.subject());
        },
        configurable: true
    },
  });

  BSB.AP.ImpressionId = function(subject) {
    return subject.extendedId();
  }

  BSB.AP.Impression.prototype.initialize = function(subject, attitudes = {}) {
    let tags = subject.getMultiLineTags('AP::Impression');
    attitudes = this.AttitudeTypes.reduce((attitudes, type) => {
      attitudes[type] = attitudes[type] || 0;
      tags.forEach((tag) => {
        attitude[type] = attitude[type] || 0;
        attitude[type] += tag[type] || 0;
      });

      return attitudes;
    }, attitudes);

    BSB.AP.AttitudeBase.prototype.initialize.call(this, subject, attitudes);
  };

  /* Biases */
  BSB.AP.Bias = function() {
    this.initialize(...arguments);
  }

  BSB.AP.Bias.prototype = Object.create(BSB.AP.AttitudeBase.prototype);
  BSB.AP.Bias.prototype.constructor = BSB.AP.Bias;

  Object.defineProperties(BSB.AP.Bias.prototype, {
    id: {
        get: function() {
            return BSB.AP.BiasId(this.subject(), this.category);
        },
        configurable: true
    },
  });

  BSB.AP.BiasId = function(subject, category) {
    return `${subject.extendedId()}->${category}`;
  }

  BSB.AP.Bias.prototype.initialize = function(subject, category, attitudes) {
    let tag = subject.getMultiLineTag(`AP::Bias::${category}`);
    this.AttitudeTypes.forEach((type) => this.setAttitude(type, tag && tag[type] ? tag[type] : 0));

    BSB.AP.AttitudeBase.prototype.initialize.call(this, subject, attitudes);

    this.setCategory(category);
  };

  BSB.AP.Bias.prototype.setCategory = function(category) {
    this._category = category;
  };

  BSB.AP.Bias.prototype.category = function() {
    return this._category;
  };

  /* Relationships */
  BSB.AP.Relationship = function() {
    this.initialize(...arguments);
  }

  BSB.AP.Relationship.prototype = Object.create(BSB.AP.AttitudeBase.prototype);
  BSB.AP.Relationship.prototype.constructor = BSB.AP.Relationship;

  Object.defineProperties(BSB.AP.Relationship.prototype, {
    id: {
        get: function() {
            return BSB.AP.RelationshipId(this.subject(), this.target());
        },
        configurable: true
    },
  });

  BSB.AP.RelationshipId = function(subject, target) {
    return `${subject.extendedId()}->${target.extendedId()}`;
  }

  BSB.AP.Relationship.prototype.initialize = function(subject, target, attitudes) {
    let tag = subject.getMultiLineTag(`AP::Relationship::${target.extendedId()}`);
    let biases = target.biasCategories().map((bc) => subject.biasTowards(bc));
    this.AttitudeTypes.forEach((type) => {
      let tagAttitude = tag && tag[type] ? tag[type] : 0;
      let totalBias = biases.reduce((sum, bias) => sum + bias[type], 0);
      this.setAttitude(type, tagAttitude + totalBias);
    });

    BSB.AP.AttitudeBase.prototype.initialize.call(this, subject, attitudes);

    this.setTarget(target);
  };

  BSB.AP.Relationship.prototype.setTarget = function(target) {
    return this._target = target
  };

  BSB.AP.Relationship.prototype.target = function() {
    return this._target;
  };

  BSB.AP.Relationship.prototype._stepRelationship = function(fnKey, key, amount) {
    let subject = this.subject();
    let target = this.target();
    let biasFormation = subject.biasFormation();
    let categories = target.biasCategories();

    categories.forEach((category) => {
      subject.biasTowards(category)[fnKey](key, amount * biasFormation);
    });
  };

  BSB.AP.Relationship.prototype.incrementAttitude = function(key, amount = 1) {
    this._stepRelationship('incrementAttitude', key, amount);

    return BSB.AP.AttitudeBase.prototype.incrementAttitude.call(this, key, amount);
  };

  BSB.AP.Relationship.prototype.decrementAttitude = function(key, amount = 1) {
    this._stepRelationship('decrementAttitude', key, amount);

    return BSB.AP.AttitudeBase.prototype.decrementAttitude.call(this, key, amount);
  };

  /* Rapports */
  BSB.AP.Rapport = function() {
    this.initialize(...arguments);
  }

  BSB.AP.Rapport.prototype = Object.create(BSB.AP.Relationship.prototype);
  BSB.AP.Rapport.prototype.constructor = BSB.AP.Rapport;

  Object.defineProperties(BSB.AP.Rapport.prototype, {
    id: {
        get: function() {
            return BSB.AP.RelationshipId(this.subject(), this.target());
        },
        configurable: true
    },
  });

  BSB.AP.Rapport.prototype.initialize = function(subject, target) {
    let relationship = subject.relationshipWith(target);
    let attitudes = relationship.getAttitudes();
    let impression = target.impression();
    
    this.AttitudeTypes.forEach((type) => attitudes[type] += impression[type]);

    BSB.AP.AttitudeBase.prototype.initialize.call(this, subject, attitudes);

    this.setTarget(target);
  };

  BSB.AP.Rapport.prototype._stepRapport = function(fnKey, key, amount) {
    let subject = this.subject();
    let target = this.target();
    let relationshipFormation = subject.relationshipFormation();

    subject.relationshipWith(target)[fnKey](key, amount * relationshipFormation);
  };

  BSB.AP.Rapport.prototype.incrementAttitude = function(key, amount = 1) {
    this._stepRapport('incrementAttitude', key, amount);

    return BSB.AP.AttitudeBase.prototype.incrementAttitude.call(this, key, amount);
  };

  BSB.AP.Rapport.prototype.decrementAttitude = function(key, amount = 1) {
    this._stepRapport('decrementAttitude', key, amount);

    return BSB.AP.AttitudeBase.prototype.decrementAttitude.call(this, key, amount);
  };

  BSB.AP.Rapport.prototype.noticeDefense = function() {
    return Math.max(this.cooperation, this.hate, this.love, this.obsession);
  };

  BSB.AP.Rapport.prototype.noticeAttack = function() {
    return Math.max(this.fear, this.rivalry, this.obsession);
  };

  /* Game_Action */
  BSB.AP.Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    BSB.AP.Game_Action_apply.call(this, ...arguments);
    this.targetsForEveryone().forEach((battler) => {
      battler.noticeAction(target, this);
    });
  };

  /* Game_BattlerBase */
  Game_BattlerBase.prototype.initApMeta = function() {
    let battler = this.battlerData();
    return battler.meta.ap = battler.meta.ap || {};
  };

  Game_BattlerBase.prototype.apMeta = function() {
    return this.battlerData().meta.ap;
  };

  Game_BattlerBase.prototype._relateAsCharacter = function() {
    let relateAs = this.getTag('AP::RelateAs');

    if (relateAs) {
      let relateAsChar = BSB.C.getBattlerByExtendedId(relateAs);
      
      return relateAsChar._relateAsCharacter() || relateAsChar;
    }
  };

  Game_BattlerBase.prototype.baseCharacter = function() {
    return this._relateAsCharacter() || this;
  };

  Game_BattlerBase.prototype.focus = function() {
    return this._focus;
  };

  Game_BattlerBase.prototype.deleteFocus = function() {
    delete this._focus;
  };

  Game_BattlerBase.prototype.focusFor = function(battler) {
    return this.focus().get(battler);
  };

  Game_BattlerBase.prototype.setFocus = function(focus) {
    return this._focus = focus;
  };

  Game_BattlerBase.prototype.resetFocus = function() {
    let battlers = this.allTargets().filter((b) => b.extendedId() !== this.extendedId());
    let focus = battlers.reduce((focus, battler) => {
      focus.set(battler, this.rapportWith(battler).obsession);

      return focus;
    }, new Map());
    this.setFocus(focus);
    this.normalizeFocus();
  };

  Game_BattlerBase.prototype.normalizeFocus = function() {
    let focusSum = [...this.focus().values()].reduce((sum, f) => sum + f, 0);
    let focus = [...this.focus().entries()].reduce((focus, [battler, f]) => {
      focus.set(battler, focusSum === 0 ? 1 / this.focus().size : f / focusSum);

      return focus;
    }, new Map());
    this.setFocus(focus);
  };

  Game_BattlerBase.prototype.awareness = function() {
    let tags = this.getTags('AP::Awareness');
    
    return BSB.C.boundBy(tags.reduce((awareness, tag) => {
      return sum + (BSB.C.valOrEval(tag[0], this) / 200);
    }, 0), -0.5, 0.5);
  };

  Game_BattlerBase.prototype.impression = function() {
    return this._impression;
  };

  Game_BattlerBase.prototype.deleteImpression = function(attitudes) {
    delete this._impression;
  };

  Game_BattlerBase.prototype.initImpression = function(attitudes) {
    return this._impression = new BSB.AP.Impression(this, attitudes);
  };

  Game_BattlerBase.prototype.rapports = function() {
    return this._rapports;
  };

  Game_BattlerBase.prototype.deleteRapports = function() {
    delete this._rapports;
  };

  Game_BattlerBase.prototype.rapportWith = function(target, attitudes) {
    let rapport = this.rapports().get(target);

    if (rapport) return rapport;

    this.rapports().set(target, new BSB.AP.Rapport(this, target, attitudes));

    return this.rapportWith(target, attitudes);
  };

  Game_BattlerBase.prototype.initRapports = function() {
    return this._rapports = new Map();
  };

  Game_BattlerBase.prototype.relationships = function() {
    return this.baseCharacter().apMeta().relationships;
  };

  Game_BattlerBase.prototype.relationshipWith = function(target, attitudes) {
    let baseSubject = this.baseCharacter();
    let baseTarget = target.baseCharacter();
    let id = BSB.AP.RelationshipId(baseSubject, baseTarget);
    return baseSubject.relationships()[id] = baseSubject.relationships()[id] || new BSB.AP.Relationship(baseSubject, baseTarget, attitudes);
  };

  Game_BattlerBase.prototype.initRelationships = function(relationships = {}) {
    let baseCharacter = this.baseCharacter();
    baseCharacter.apMeta().relationships = baseCharacter.apMeta().relationships || {};

    Object.entries(relationships).forEach(([id, attitudes]) => {
      let [_, targetId] = id.split('->');
      let target = BSB.C.getBattlerByExtendedId(targetId);
      baseCharacter.apMeta().relationships[id] = baseCharacter.apMeta().relationships[id] || new Relationship(this, target, attitudes);
    });
  };

  Game_BattlerBase.prototype.clearTempRelationships = function() {
    let baseSubject = this.baseCharacter();
    if (!this.hasEnduringRelationships()) {
      baseSubject.apMeta().relationships = {};
    } else {
      Object.entries(baseSubject.relationships()).filter(([_, r]) => !r.target().hasEnduringRelationships()).forEach(([id]) => {
        delete baseSubject.relationships()[id];
      });
    }
  };

  Game_BattlerBase.prototype.hasEnduringRelationships = function() {
    let baseSubject = this.baseCharacter();
    if (baseSubject._hasEnduringRelationships !== undefined) return baseSubject._hasEnduringRelationships;

    let tempEnemyRelationships = BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['tempEnemyRelationships']);
    let enduringTag = baseSubject.getTag('AP::EnduringRelationships');

    if (baseSubject.isActor() || !tempEnemyRelationships) {
      return baseSubject._hasEnduringRelationships = !(enduringTag && enduringTag[0] === false);
    } else {
      return baseSubject._hasEnduringRelationships = !!enduringTag;
    }
  };

  Game_BattlerBase.prototype.biases = function() {
    return this.baseCharacter().apMeta().biases;
  };

  Game_BattlerBase.prototype.biasTowards = function(category, attitudes) {
    let baseSubject = this.baseCharacter();
    let id = BSB.AP.BiasId(baseSubject, category);
    return baseSubject.biases()[id] = baseSubject.biases()[id] || new BSB.AP.Bias(baseSubject, category, attitudes);
  };

  Game_BattlerBase.prototype.initBiases = function(biases = {}) {
    let baseCharacter = this.baseCharacter();
    baseCharacter.apMeta().biases = baseCharacter.apMeta().biases || {};

    Object.entries(biases).forEach(([id, attitudes]) => {
      let [_, category] = id.split('->');
      baseCharacter.apMeta().relationships[id] = baseCharacter.apMeta().relationships[id] || new Bias(this, category, attitudes);
    });
  };

  Game_BattlerBase.prototype.biasCategories = function() {
    return [...new Set(this.getTags('AP::BiasCategories').flat())];
  };

  Game_BattlerBase.prototype.biasFormation = function() {
    let tag = this.getTag('AP::BiasFormation');

    return tag
      ? BSB.C.valOrEval(tag[0], this)
      : BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['defaultBiasFormation']);
  };

  Game_BattlerBase.prototype.relationshipFormation = function() {
    let tag = this.getTag('AP::RelationshipFormation');

    return tag
      ? BSB.C.valOrEval(tag[0], this)
      : BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['defaultRelationshipFormation']);
  };

  /* Game_Battler */
  Game_Battler.prototype.noticeAction = function(target, action) {
    let subject = action.subject();

    if (this === subject) return;

    let awareness = this.awareness();
    let noticeability = BSB.C.boundBy(action.getTags('AP::Noticeability').reduce((sum, tag) => {
      return sum + (BSB.C.valOrEval(tag[0], subject, target, target.result()) / 100);
    }, 1), 0, 2);
    let noticeAttack = this.rapportWith(subject).noticeAttack() * BSB.C.boundBy(this.focusFor(subject) + awareness, 0, 1);
    let noticeDefense = target.extendedId() === this.extendedId()
      ? BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['maxAttitude'])
      : this.rapportWith(baseTarget).noticeDefense() * BSB.C.boundBy(this.focusFor(baseTarget) + awareness, 0, 1);
    
    let total = (noticeAttack + noticeDefense) * noticeability;
    debugger
  };


  /* BattleManager */
  BSB.AP.BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function() {
    BSB.AP.BattleManager_startBattle.call(this, ...arguments);

    for (const member of this.allBattleMembers()) {
        member.resetFocus();
    }
  };


  /* Game_Battler */
  BSB.AP.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
  Game_Battler.prototype.onBattleStart = function() {
    BSB.AP.Game_Battler_onBattleStart.call(this, ...arguments);
    this.initImpression();
    this.initRapports();
  };

  BSB.AP.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
  Game_Battler.prototype.onBattleEnd = function() {
    BSB.AP.Game_Battler_onBattleEnd.call(this, ...arguments);
    this.deleteImpression();
    this.deleteRapports();
    this.deletFocus();
  };


  /* Game_Actor */
  BSB.AP.Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
    BSB.AP.Game_Actor_setup.call(this, ...arguments);
    let actor = $dataActors[actorId];
    this.initApMeta(actor);
    this.initBiases(actor.biases);
    this.initRelationships(actor.relationships);
  };

  /* Game_Enemy */
  BSB.AP.Game_Enemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function(enemyId) {
    BSB.AP.Game_Enemy_setup.call(this, ...arguments);
    let enemy = $dataEnemies[enemyId];
    this.initApMeta(enemy);
    this.initBiases(enemy.biases);
    this.initRelationships(enemy.relationships);
  };
})();
