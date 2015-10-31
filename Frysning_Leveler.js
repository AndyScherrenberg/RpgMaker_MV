
	var Imported = Imported || {};
	Imported.Frysning_Leveler = true;

/*:
 * @plugindesc Change level of monsters. So you wont feel overpowerd
 * Supports a lot of customization!
 * @author Frysning

 * @param hp
 * @desc The basic growth of the hp stat if you did not define
 * it in the notetag.
 * @default 5

 * @param mp
 * @desc The basic growth of the mp stat if you did not define
 * it in the notetag.
 * @default 5

 * @param atk
 * @desc The basic growth of the atk stat if you did not define
 * it in the notetag.
 * @default 5

 * @param def
 * @desc The basic growth of the def stat if you did not define
 * it in the notetag.
 * @default 5

 * @param matck
 * @desc The basic growth of the matck stat if you did not define
 * it in the notetag.
 * @default 5


 * @param mdef
 * @desc The basic growth of the mdef stat if you did not define
 * it in the notetag.
 * @default 5

 * @param agi
 * @desc The basic growth of the agi stat if you did not define
 * it in the notetag.
 * @default 5

 * @param luck
 * @desc The basic growth of the luck stat if you did not define
 * it in the notetag.
 * @default 5

 * @param gold
 * @desc The basic growth of the gold stat if you did not define
 * it in the notetag.
 * @default 5

 * @param exp
 * @desc The basic growth of the exp stat if you did not define
 * it in the notetag.
 * @default 5

 * @param maxMonster
 * @desc The max level a monster can be. 
 * @default 99

 * @param usePartyLeader
 * @desc Set this to 1 if you want that the samelevel of the monsters
 * is that of the leader. 0 = highest level in party
 * @default 0


 * @help
 * This script is free to use for non-commercial. 
 * I like to see what you did with it, so send me a copy please :3
 * If you go commercial contact me please and we will sort it out really fast!  
 * For both I really want some credit :3

 * If you want that an enemy levels use the the tag
 * <level></level> 
 * The script will know that it should level this mob. 

 * If you only set that it will give the monster a level between 1 and what the maxMonsters is. 
 * for every level it will increase the monster with the parameters defined.

 * More customs Tags!

 * min 20 (means the monster will be base level 20)
 * max 50 (means that the max level of this monster will be 50)
 * In this set up a random level between 20 and 50 will get chosen for the monster.

 * same (this tag will make it so that a monster will be the same level as your party!)
 * What happens when you use same and max? 
 * This will set the monster to your level, but if the monsters is max is lower then that. It will set it to max.

 * Example's the partylevel = 25:
 * max 20
 * same 
 * this will create a monster of level 20 always!

 * max 30
 * same
 * this will create a monster of level 25! the same as your party!

 * If you want to show the level of the monsters use:
 * showlevel

 * Stats Increasing!
 * You can increase the stats of a monster based on an own value!

 * hp (the hit points of the monster)
 * mp (the mana points of the monster)
 * atk (the attack of the monster)
 * def (the defsence of the monster)
 * matck (the magic attack of the monster)
 * mdef (the magic defence of the monster.)
 * agi (the speed of the monster)
 * luck (the luck of the monster)
 * gold (the gold the monster drops)
 * exp (the exp the monster gives)

 * hp 5 (will mean that the map will grow 5 hp every level)
 * hp 05% (will mean that the monster will grow hp wth 5% ever level.)
 * remember for the max increase in % is 99! for 1-9 you need to use
 * 01% - 09% 
 * This will work with all the other stats!

 * Example: 
 * <level>
 * min 1
 * max 10
 * hp 10%
 * mp 2
 * atk 5
 * exp 4
 * </level>
 
 * This will create a monster between 1 and 10.
 * What I did not specify all the stats? 
 * Well that is not needed! The stats you did not define will
 * be based on the global values! 

*/


	var Frysning_Leveler = Frysning_Leveler || {};
	Frysning_Leveler.Parameters = PluginManager.parameters('Frysning_Leveler');
	
	Frysning_Leveler.paramNames = ["hp", "mp", "atk", "def", "matck", "mdef", "agi", "luck", "gold", "exp"];

	Game_BattlerBase.prototype.Leveled_Param = function(paramId)
	{
		if (typeof this.level_param === 'undefined') return -1;
		if ( typeof  this.level_param[paramId] === 'undefined') return -1;

		var value = this.level_param[paramId] + this.paramPlus(paramId);
		value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
	    var maxValue = this.paramMax(paramId);
	    var minValue = this.paramMin(paramId);

		return value;
	}


	Frysning_Leveler.param = Game_BattlerBase.prototype.param;
	Game_BattlerBase.prototype.param = function(paramId) {
		val = Frysning_Leveler.param.apply(this, arguments);

		if (this instanceof Game_Enemy)	{
			bval = this.Leveled_Param(paramId);
			val =( bval > 0) ? bval : val;

			console.log(this.name() +" Stat: " + Frysning_Leveler.paramNames[paramId] + " :" + val );
		}
		return val;
	};

	Game_Enemy.prototype.Level = function() {
	
		this.noteTag = $dataEnemies[this.enemyId()].note;
		var notePattern = /<(?:level)>([^"]*)<(?:\/level)>/i;

		this.NoteArray = this.noteTag.match(notePattern);
		if ( this.NoteArray === null)
			return;

		this.level_param = []

		for( i= 0; i <= 9; i++){	
			this.level_param[i] =-1;
		}

		this.NoteArray = this.NoteArray[1];

		cur = "\\b(?:min)(?:[ ]*)([0-9]*)";
		pattern = new RegExp(cur,"i");
		this.min = this.NoteArray.match(pattern);//CurrentLEvel

		cur = "\\b(?:max)(?:[ ]*)([0-9]*)";
		pattern = new RegExp(cur,"i");
		this.max = this.NoteArray.match(pattern);

		cur = "\\b(?:same)";
		pattern = new RegExp(cur,"i");
		this.same = this.NoteArray.match(pattern)

		cur = "\\b(?:showlevel)";
		pattern = new RegExp(cur,"i");
		this.showlevel = this.NoteArray.match(pattern)

		if (typeof 	this.min === 'undefined' || this.min == null)
			this.min = 1;
		else 
			this.min = parseInt(this.min[1])

		if (typeof 	this.max === 'undefined'|| this.max == null){
			this.usemax = false;
			this.max =  parseInt(Frysning_Leveler.Parameters["maxMonster"])}
		else {
			this.usemax  = true;
			this.max = parseInt(this.max[1])
		}

		if (typeof this.same !== 'undefined' && this.same != null)
			this.same = true;
		else this.same = false;

				if (typeof this.showlevel !== 'undefined' && this.showlevel != null)
			this.showlevel = true;
		else this.showlevel = false;


		if (this.same == true){

			this.same_level =0;

			console.log(Frysning_Leveler.Parameters["usePartyLeader"])
			if (Frysning_Leveler.Parameters["usePartyLeader"] == 1){
				console.log("HGello");
					this.same_level = $gameParty.leader()._level;
			}
			else
				this.same_level =  $gameParty.highestLevel();


			if (this.usemax == false)
				this.level =this.same_level
			else{	
			if (this.max > this.same_level){
				this.level = this.same_level;
			}
			else
				this.level = this.max;
			}	
		}
		else{
			this.level = Math.floor((Math.random() *( this.max - this.min)) + this.min);
		}

		for( i= 0; i <= 9; i++){
			this.IncreaseStat(i);
		}

	};

	Game_Enemy.prototype.IncreaseStat = function(type) {
		var s = Frysning_Leveler.paramNames[type]; 
		var f = "\\b(?:"+s+")(?:[ ]*)([0-9%]*)";
		
		pattern = new RegExp(f,"i");
		stat = this.NoteArray.match(pattern);


		if (stat == null || typeof stat === 'undefined'){
			stat = Frysning_Leveler.Parameters[s];
		}
		else{
			stat = stat[1];
		}

	 	var increasePercent = (stat.contains('%')) ? true :false;
	 	var increasing = stat.split('%')[0]
		var baseStat = this.param(type);

		if(type == 8)
			baseStat= this.gold();
		if(type == 9)
			baseStat = this.exp();

		if (increasePercent === true){

			if(increasing.length == 2)
				increasefloaty =  parseFloat(1+"." +increasing);
			if(increasing.length == 1)
				increasefloaty =  parseFloat(1+".0" +increasing);
			if(increasing.length == 3)
				increasefloaty =  parseFloat(increasing[0]+"." +increasing[1] + "" + increasing[2]);

			increasing = increasefloaty
		}


		for(j = this.min; j< this.level; j++){
			if (increasePercent === true){
				baseStat = baseStat *  increasing;
			}
			else{
				baseStat += parseInt(increasing);
			}
		}

		this.level_param[type] =Math.round(baseStat); 
		if (type==0){
			this._hp = Math.round(baseStat); 
		}
		if (type==1){
			this._mp = Math.round(baseStat); 
		}
	}




	Game_Enemy.prototype.name = function() {
	    return this.originalName() + (this._plural ? this._letter : '') + " " + (this.showlevel ?  ' Lv: ' + this.level : '');
	};

	Game_Enemy.prototype.exp = function() {
		if (typeof this.level_param !== 'undefined') 
			if ( typeof  this.level_param[9] !== 'undefined') 
				if ( this.level_param[9] !== -1) 
					return this.level_param[9]
	    return this.enemy().exp;
	};

	Game_Enemy.prototype.gold = function() {
		if (typeof this.level_param !== 'undefined') 
			if ( typeof  this.level_param[8] !== 'undefined') 
				if ( this.level_param[8] !== -1) 
					return this.level_param[8]
	    return this.enemy().gold;
	}


	Frysning_Leveler.setup = Game_Troop.prototype.setup;
	Game_Troop.prototype.setup  = function(troopId) {
		    Frysning_Leveler.setup.apply(this, arguments);
			this._enemies.forEach(function(member) {
				member.Level();
	 	});
	};
