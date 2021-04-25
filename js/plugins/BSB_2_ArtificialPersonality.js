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
 * @text purge enemy relationships after every battle
 * @type boolean
 * @default true
 */

(() => {
  /* AttitudeBase */
  BSB.AP.AttitudeBase = function() {
    this.initialize(...arguments);
  }

  BSB.AP.AttitudeBase.prototype.initialize = function(subject, attitudes) {
    this.setAttitudes(attitudes);
    this.setSubject(subject);
  };

  BSB.AP.AttitudeBase.prototype.AttitudeTypes = ['care', 'fear', 'hatred', 'obsession', 'protectiveness', 'rivalry'];

  BSB.AP.AttitudeBase.prototype.setAttitudes = function(attitude = {}) {
    Object.keys(attitude).forEach((key) => this.setAttitude(key, attitude[key]));
  };

  BSB.AP.AttitudeBase.prototype.setAttitude = function(key, value) {
    let max = BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['maxAttitude']);
    let min = BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['minAttitude']);
    return this[key] = Math.min(max, Math.max(min, value));
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
    this._subject = subject;
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

  /* Biases */
  BSB.AP.Bias = function() {
    this.initialize(...arguments);
  }

  BSB.AP.Bias.prototype = Object.create(BSB.AP.AttitudeBase.prototype);
  BSB.AP.Bias.prototype.constructor = BSB.AP.Bias;

  Object.defineProperties(BSB.AP.Relationship.prototype, {
    id: {
        get: function() {
            return BSB.AP.RelationshipId(this.subject(), this.category);
        },
        configurable: true
    },
  });

  BSB.AP.BiasId = function(subject, category) {
    return `${subject.extendedId()}->${category}`;
  }

  BSB.AP.Bias.prototype.initialize = function(subject, category, attitudes) {
    let tag = subject.getMultiLineTag(`AP::Bias::${category}`);
    this.AttitudeTypes.forEach((type) => this.setAttitude(type, tag[type] || 0));

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
    let biases = target.biasCategories.map((bc) => subject.biasTowards(bc));
    this.AttitudeTypes.forEach((type) => {
      let tagAttitude = tag[type] || 0;
      let totalBias = biases.reduce((sum, bias) => sum + bias[type], 0);
      this.setAttitude(type, tagAttitude + totalBias);
    });

    BSB.AP.AttitudeBase.prototype.initialize.call(this, subject, attitudes);

    this.setTarget(target);
  };

  BSB.AP.Relationship.prototype.setTarget = function(target) {
    this._target = target;
  };

  BSB.AP.Relationship.prototype.target = function() {
    return this._target;
  };

  BSB.AP.Relationship.prototype._stepBias = function(fnKey, key, amount) {
    let subject = this.subject();
    let target = this.target();
    let biasFormation = subject.biasFormation();
    let categories = target.biasCategories();

    categories.forEach((category) => {
      subject.biasTowards(category)[fnKey](key, amount * biasFormation);
    });
  };

  BSB.AP.Relationship.prototype.incrementAttitude = function(key, amount = 1) {
    this._stepBias('incrementAttitude', key, amount);

    return BSB.AP.AttitudeBase.prototype.incrementAttitude.call(this, key, amount);
  };

  BSB.AP.Relationship.prototype.decrementAttitude = function(key, amount = 1) {
    this._stepBias('decrementAttitude', key, amount);

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

    BSB.AP.AttitudeBase.prototype.initialize.call(this, subject, attitudes);

    this.setTarget(target);
  };

  BSB.AP.Rapport.prototype._stepBias = function(fnKey, key, amount) {
    let subject = this.subject();
    let target = this.target();
    let relationshipFormation = subject.relationshipFormation();

    subject.relationshipWith(target)[fnKey](key, amount * relationshipFormation);
  };

  BSB.AP.Rapport.prototype.incrementAttitude = function(key, amount = 1) {
    this._stepBias('incrementAttitude', key, amount);

    return BSB.AP.AttitudeBase.prototype.incrementAttitude.call(this, key, amount);
  };

  BSB.AP.Rapport.prototype.decrementAttitude = function(key, amount = 1) {
    this._stepBias('decrementAttitude', key, amount);

    return BSB.AP.AttitudeBase.prototype.decrementAttitude.call(this, key, amount);
  };

  BSB.AP.Rapport.prototype.noticeDefense = function() {
    return Math.max(this.care, this.fear * 0.1, this.hatred * 0.25, this.obsession, this.protectiveness, this.rivalry * 0.2);
  };

  BSB.AP.Rapport.prototype.noticeAttack = function() {
    return Math.max(this.care * 0.1, this.fear, this.hatred * 0.8, this.obsession, this.protectiveness * 0.2, this.rivalry * 0.8);
  };



  Game_Battler.prototype.extendedId = function() {
    if (this._extendedId) return this._extendedId;

    let baseCharacter = this.baseCharacter();

    let type = baseCharacter.isActor() ? 'Actor' : 'Enemey';
    let baseId = baseCharacter.isActor() ? baseCharacter.actor().id : baseCharacter.enemy().id;
  
    return this._extendedId = `${type}::${baseId}`;
  };

  Game_Battler.prototype._relateAsCharacter = function() {
    let relateAs = this.getTag('AP::RelateAs');

    if (relateAs) {
      let [type, id] = relateAs.split('::');
      let relateAsChar = type === 'Actor' ? $gameActors.actor(id) : $gameEnemies.enemy(id);
      
      return relateAsChar._relateAsCharacter() || relateAsChar;
    }
  };

  Game_Battler.prototype.baseCharacter = function() {
    if (this._baseCharacter) return this._baseCharacter;
    
    return this._baseCharacter = this._relateAsCharacter() || this.isActor() ? this.actor() : this.enemy();
  };

  Game_Battler.prototype.rapports = function() {
    return this.baseCharacter()._rapports;
  };

  Game_Battler.prototype.rapportWith = function(target, attitudes) {
    let baseSubject = this.baseCharacter();
    let baseTarget = target.baseCharacter();
    let id = BSB.AP.RelationshipId(baseSubject, baseTarget);
    return baseSubject.rapports()[id] = baseSubject.rapports()[id] || new BSB.AP.Rapport(baseSubject, baseTarget, attitudes);
  };

  Game_Battler.prototype.clearRapports = function() {
    return this.baseCharacter()._rapports = {};
  };

  Game_Battler.prototype.relationships = function() {
    return this.baseCharacter()._relationships;
  };

  Game_Battler.prototype.relationshipWith = function(target, attitudes) {
    let baseSubject = this.baseCharacter();
    let baseTarget = target.baseCharacter();
    let id = BSB.AP.RelationshipId(baseSubject, baseTarget);
    return baseSubject.relationships()[id] = baseSubject.relationships()[id] || new BSB.AP.Relationship(baseSubject, baseTarget, attitudes);
  };

  Game_Battler.prototype.clearTempRelationships = function() {
    let baseSubject = this.baseCharacter();
    if (!this.hasEnduringRelationships()) {
      baseSubject._relationships = {};
    } else {
      Object.entries(baseSubject.relationships()).filter(([_, r]) => !r.target().hasEnduringRelationships()).forEach(([id]) => {
        delete baseSubject.relationships()[id];
      });
    }
  };

  Game_Battler.prototype.biases = function() {
    return this.baseCharacter()._biases;
  };

  Game_Battler.prototype.biasTowards = function(category, attitudes) {
    let baseSubject = this.baseCharacter();
    let id = BSB.AP.BiasId(baseSubject, category);
    return baseSubject.biases()[id] = baseSubject.biases()[id] || new BSB.AP.Bias(baseSubject, category, attitudes);
  };

  Game_Battler.prototype.hasEnduringRelationships = function() {
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

  Game_Battler.prototype.maybeNoticeAction = function(target, action) {
    let baseThisChar = this.baseCharacter();
    let baseSubject = action.subject.baseCharacter();
    let baseTarget = target.baseCharacter();
    let noticeability = action.getTags('AP::Noticeability').reduce((product, tag) => {
      return product * (BSB.C.valOrEval(tag[0], baseSubject, baseTarget, target.result()) / 100);
    }, 1);
    let noticeAttack = baseThisChar.rapportWith(baseSubject).noticeAttack();
    let noticeDefense = baseTarget.extendedId() === baseThisChar.extendedId()
      ? BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['maxAttitude'])
      : baseThisChar.rapportWith(baseTarget).noticeDefense();
    
    let likelihood = (noticeAttack + noticeDefense) * noticeability;
  };

  Game_Battler.prototype.biasCategories = function() {
    let baseSubject = this.baseCharacter();
    return baseSubject._biasCategories = baseSubject._biasCategories || [...new Set(baseSubject.getTags('AP::BiasCategories').flatten())];
  };

  Game_Battler.prototype.biasFormation = function() {
    let baseSubject = this.baseCharacter();
    if (baseSubject._biasFormation) return baseSubject._biasFormation;

    let tag = baseSubject.getTag('AP::BiasFormation');

    return tag
      ? BSB.C.valOrEval(tag[0], baseSubject)
      : BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['defaultBiasFormation']);
  };

  Game_Battler.prototype.relationshipFormation = function() {
    let baseSubject = this.baseCharacter();
    if (baseSubject._relationshipFormation) return baseSubject._relationshipFormation;

    let tag = baseSubject.getTag('AP::RelationshipFormation');

    return tag
      ? BSB.C.valOrEval(tag[0], baseSubject)
      : BSB.NP.parse(PluginManager.parameters('bsb_2_artificialpersonality')['defaultRelationshipFormation']);
  };
})();