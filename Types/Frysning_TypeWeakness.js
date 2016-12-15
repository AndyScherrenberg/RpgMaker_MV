var Imported = Imported || {};
Imported.Frysning_TypeWeakness = true;
/*:
 * @plugindesc V1.2: Change level of monsters. So you wont feel overpowerd
 * Supports a lot of customization!
 * @author Frysning

 * @param lowestDamage
 * @desc The lowest amount if damage that you can do against an enemy
 * @default 1
 *
 *
 * @param absorb
 * @desc if the damage is negative it will heal
 * @default 0
 *
 *
 * @param DefaultWeaknessMultiplier
 * @desc
 * @default 2
 *
 * @param DefaultResistMultiplier
 * @desc
 * @default 0.5
 *
 */

var $dataTypes = null;
DataManager._databaseFiles.push({name: '$dataTypes', src: 'Types.json'});


var Frysning_TypeWeakness = Frysning_TypeWeakness || {};
Frysning_TypeWeakness.Parameters = PluginManager.parameters('Frysning_TypeWeakness');

//Frysning_TypeWeakness.Types = ["Youkai", "Bat", "Annoy", "Human", "Minitour"]
//Game_Enemy
Frysning_TypeWeakness.setupEnemy = Game_Enemy.prototype.setup
Frysning_TypeWeakness.setupActor = Game_Actor.prototype.setup
Game_Actor.prototype.setup = function (actorId) {
    Frysning_TypeWeakness.setupActor.apply(this, [actorId]);
    this.SetType()
    this.IncreaseAgainstTypes()
}


/*
 <Type 3> Type of Object
 <decreaseType 2 10> Type that gives less damage
 <increaseType 1 10> Type that gives more damage

 */

Game_Enemy.prototype.setup = function (enemyId, x, y) {
    Frysning_TypeWeakness.setupEnemy.apply(this, [enemyId, x, y]);
    this.SetType()
    this.IncreaseAgainstTypes()

}


Object.defineProperties(Game_Battler.prototype, {
    Type: {
        get: function () {
            return this._Type;
        }, configurable: true
    },
    TypeTag: {
        get: function () {
            return this._TypeTag;
        }, configurable: true
    },
    IncreaseTypes: {
        get: function () {
            return this._IncreaseTypes;
        }, configurable: true
    },
    DecreaseTypes: {
        get: function () {
            return this._DecreaseTypes;
        }, configurable: true
    },
});

Game_Battler.prototype.IncreaseAgainstTypes = function () {


    this._IncreaseTypes = Frysning_TypeWeakness.IncreaseDamageToTypes(this._TypeTag);
    this._DecreaseTypes = Frysning_TypeWeakness.DecreaseDamageFromTypes(this._TypeTag);
}

Game_Battler.prototype.SetType = function () {
    this._Type = new Array();
    this._TypeTag = ""

    var notePattern = /<(type ?(?:[,]?(?:[0-9]+))*)>/i

    if (this instanceof Game_Enemy) {
        this._TypeTag = $dataEnemies[this.enemyId()].note;
    } else if (this instanceof Game_Actor) {
        this._TypeTag = $dataActors[this.actorId()].note;
    }

    var NoteArray = this._TypeTag.match(notePattern);

    if (NoteArray == "undefined" || NoteArray == null) {
        return
    }

    NoteArray = NoteArray[0].toLowerCase().replace("<type", "").replace(">", "")
    NoteArray = NoteArray.trim()

    var partsOfStr = NoteArray.split(',');

    for (var i = 0; i < partsOfStr.length; i++) {
        this._Type.push(parseInt(partsOfStr[i]))
    }
}


Game_Action.prototype.GetItemType = function () {
    var itemTypes = new Array()


    var tempNote = this.item().note
    var notePattern = /<(Type ?(?:[,]?(?:[0-9]+?))*)>/i

    var NoteArray = tempNote.match(notePattern);
    if (NoteArray == "undefined" || NoteArray == null) {
        return null
    }

    NoteArray = NoteArray[0].toLowerCase().replace("<type", "").replace(">", "")
    NoteArray = NoteArray.trim()


    var partsOfStr = NoteArray.split(',');
    for (var i = 0; i < partsOfStr.length; i++) {
        itemTypes.push(parseInt(partsOfStr[i]))
    }

    return itemTypes

}

Frysning_TypeWeakness.DecreaseDamageFromTypes = function (note) {
    var resist = new Array()

    var tempNote = note
    var notePattern = /<(decreaseType ?(?:[,]?(?:[0-9]+%?)[ ]?)*)>/i

    var NoteArray = tempNote.match(notePattern);
    if (NoteArray == "undefined" || NoteArray == null) {
        return
    }

    NoteArray = NoteArray[0].toLowerCase().replace("<decreasetype", "").replace(">", "")
    NoteArray = NoteArray.trim()

    //   console.log(NoteArray)
    var partsOfStr = NoteArray.split(',');

    for (var i = 0; i < partsOfStr.length; i++) {
        var a = partsOfStr[i].split(' ');

        var decrease = 0;
        var t_type = a[0] //type
        var decreasing = a[1];
        var decreasePercent = decreasing.contains('%') ? true : false;


        if (decreasePercent) {
            decreasing = decreasing.split('%')[0]

            if (decreasePercent === true) {
                if (decreasing.length == 2)
                    decrease = parseFloat(0 + "." + decreasing);
                if (decreasing.length == 1)
                    decrease = parseFloat(0 + ".0" + decreasing);
                if (decreasing.length == 3)
                    decrease = parseFloat(decreasing[0] + "." + decreasing[1] + "" + decreasing[2]);
            }

        } else {
            decrease = parseInt(decreasing)
        }

        resist.push([t_type, decrease, decreasePercent])
    }

    return resist

}

Frysning_TypeWeakness.IncreaseDamageToTypes = function (note) {

    var weakness = new Array()

    var tempNote = note
    var notePattern = /<(increaseType ?(?:[,]?(?:[0-9]+%?)[ ]?)*)>/i

    var NoteArray = tempNote.match(notePattern);
    if (NoteArray == "undefined" || NoteArray == null) {
        return
    }

    NoteArray = NoteArray[0].toLowerCase().replace("<increasetype", "").replace(">", "")
    NoteArray = NoteArray.trim()

    //   console.log(NoteArray)
    var partsOfStr = NoteArray.split(',');

    for (var i = 0; i < partsOfStr.length; i++) {
        var a = partsOfStr[i].split(' ');
        var increase = 0;
        var t_type = a[0] //type
        var increasing = a[1];
        var increasePercent = (increasing.contains('%')) ? true : false;
        if (increasePercent) {
            increasing = increasing.split('%')[0]

            if (increasePercent === true) {
                if (increasing.length == 2)
                    increase = parseFloat(0 + "." + increasing);
                if (increasing.length == 1)
                    increase = parseFloat(0 + ".0" + increasing);
                if (increasing.length == 3)
                    increase = parseFloat(increasing[0] + "." + increasing[1] + "" + increasing[2]);
            }

        } else {
            increase = parseInt(increasing)
        }

        weakness.push([t_type, increase, increasePercent])
    }

    return weakness
}

//RewriteDamageValue
Frysning_TypeWeakness.OrignalDamageValue = Game_Action.prototype.makeDamageValue

Game_Action.prototype.makeDamageValue = function (target, critical) {
    var staticNumber = Frysning_TypeWeakness.OrignalDamageValue.apply(this, [target, critical]);

    var consoleNumber = staticNumber
    staticNumber = this.Multiplier(staticNumber, target)

    var multiNumber = staticNumber


    var increasingNumber = 0//this.calculateWeakness(target, staticNumber)//0
    var decreasingNumber = 0//this.calculateResists(target, staticNumber)

    if (increasingNumber != 0) {
        increasingNumber = Math.round(increasingNumber * 10) / 10;
        staticNumber += increasingNumber
    }

    if (decreasingNumber != 0) {
        decreasingNumber = Math.round(decreasingNumber * 10) / 10;

        staticNumber -= decreasingNumber
        var par = parseInt(Frysning_TypeWeakness.Parameters["lowestDamage"])

        if (staticNumber < par && parseInt(Frysning_TypeWeakness.Parameters["absorb"]) == 0 && consoleNumber > 0)
            staticNumber = par
    }

    console.log("Increased Value:" + increasingNumber)
    console.log("Decreased Value:" + decreasingNumber)
    console.log("Orginal value:" + consoleNumber)
    console.log("After Multiply value:" + multiNumber)
    console.log("After value: " + staticNumber)
    return staticNumber;
}


Game_Action.prototype.Multiplier = function (baseDamage, target) {

    var types = this.GetItemType()
    var targetTypes = target.Type

    if (types == null || types == undefined) {
        return baseDamage
    }

    for (var index = 0; index < $dataTypes.Types.length; index++) {
        var id = $dataTypes.Types[index]._Id

        for (var jindex = 0; jindex < targetTypes.length; jindex++) {
            if (id == targetTypes[jindex]) {

                var currentWeaknes = $dataTypes.Types[index].Weakness
                var currentResist = $dataTypes.Types[index].Resist
                var currentImmunity = $dataTypes.Types[index].Immunity

                for (var ajindex = 0; ajindex < currentWeaknes.length; ajindex++) {
                    if (types.indexOf(currentWeaknes[ajindex]) >= 0) {
                        this.Effective = true
                        baseDamage *= 2
                    }
                }

                for (var ajindex = 0; ajindex < currentResist.length; ajindex++) {
                    if (types.indexOf(currentResist[ajindex]) >= 0) {
                        this.didResist = true
                        baseDamage *= 0.5
                    }
                }

                for (var ajindex = 0; ajindex < currentImmunity.length; ajindex++) {
                    if (types.indexOf(currentImmunity[ajindex]) >= 0) {
                        this.immunity = true
                        return baseDamage
                    }
                }
            }

            break
        }


    }

    return baseDamage
}


Game_Action.prototype.calculateResists = function (target, baseDamage) {
    var decreasingNumber = 0

    var resistance = new Array()

    console.log(target)

    if (target instanceof Game_Actor) {
        var equips = target._equips
        for (var index = 0; index < equips.length; index++) {

            if (equips[index]._dataClass == "armor") {
                var armor = $dataArmors[equips[index]._itemId]
                if (armor != null) {
                    var temp = Frysning_TypeWeakness.DecreaseDamageFromTypes(armor.note)

                    if (temp != undefined) {
                        resistance.push(temp)
                    }
                }
            }
        }

        if (resistance[0] == null || resistance[0] == undefined) {
        } else {
            resistance = resistance[0]
        }

        var otherresistance = target._DecreaseTypes
        if (otherresistance == null || otherresistance == undefined) {
        }
        else {
            for (var index = 0; index < otherresistance.length; index++) {
                resistance.push(otherresistance[index])
            }
        }
    }
    else {
        resistance = target._DecreaseTypes
    }


    if (resistance == null || resistance == undefined) {
    } else {
        for (var index = 0; index < this.subject()._Type.length; index++) {
            for (var jindex = 0; jindex < resistance.length; jindex++) {
                if (this.subject()._Type[index] == resistance[jindex][0]) {
                    if (resistance[jindex][2] == true) {
                        decreasingNumber += resistance[jindex][1] * baseDamage
                    }
                    else {
                        decreasingNumber += resistance[jindex][1]
                    }
                }
            }
        }
    }

    return decreasingNumber
}

Game_Action.prototype.calculateWeakness = function (target, baseDamage) {

    if (target._Type == null || target._Type == "undefined")
        return 0

    var increasingNumber = 0
    var weakness = new Array()

    if (this.subject() instanceof Game_Actor) {
        var equips = this.subject()._equips


        for (var index = 0; index < equips.length; index++) {

            if (equips[index]._dataClass == "weapon") {
                var weapon = $dataWeapons[equips[index]._itemId]

                if (weapon != null) {
                    var temp = Frysning_TypeWeakness.IncreaseDamageToTypes(weapon.note)
                    if (temp != undefined) {
                        weakness.push(temp)
                    }
                }

            }
        }

        if (weakness[0] == null || weakness[0] == undefined) {

        } else {
            weakness = weakness[0]
        }

        var otherWeakness = this.subject()._IncreaseTypes
        if (otherWeakness == null || otherWeakness == undefined) {
        } else {
            for (var index = 0; index < otherWeakness.length; index++) {
                weakness.push(otherWeakness[index])
            }
        }

    } else {
        weakness = this.subject()._IncreaseTypes
    }

    if (weakness == null || weakness == undefined) {
        weakness = new Array()
    }

    var itemTypes = Frysning_TypeWeakness.IncreaseDamageToTypes(this.item().note)
    if (itemTypes != undefined) {
        for (var pindex = 0; pindex < itemTypes.length; pindex++)
            weakness.push(itemTypes[pindex])
    }

    if (weakness == null || weakness == undefined) {
    } else {
        for (var index = 0; index < target._Type.length; index++) {
            for (var jindex = 0; jindex < weakness.length; jindex++) {
                if (target._Type[index] == weakness[jindex][0]) {
                    if (weakness[jindex][2] == true) {
                        increasingNumber += weakness[jindex][1] * baseDamage
                    }
                    else {
                        increasingNumber += weakness[jindex][1]
                    }
                }
            }
        }
    }

    return increasingNumber
}