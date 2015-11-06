
	var Imported = Imported || {};
	Imported.Frysning_Leveler = true;

/*:
 * @plugindesc V1.2: Change level of monsters. So you wont feel overpowerd
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

 * @param minMonster
 * @desc The min level a monster can be. 
 * @default 1

 * @param usePartyLeader
 * @desc Set this to 1 if you want that the samelevel of the monsters
 * is that of the leader. 0 = highest level in party
 * @default 0

 * @param UseSave
 * desc If you want to save the level variables. in your save file.
 * if it is not turned on then you always need to reset your values.
 * default 0

 * @param DebugModo
 * @desc Turn this one and when the battle starts you will see 
 * the stats in the console. Set it to false for release!
 * default 0

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

 * I want to use variables, is this possible?
 * Yes this is possible from version 1.2.

 * You can use 2 type of variables the gameVariables or levelVariable
 * To use the gamevariables:

 * Example: 
 * <level>
 * min 1
 * max 10
 * hp gameVariable 1
 * mp 2
 * atk 5
 * exp 4
 * </level>

 * This will create the monster of between level 1 and 10. 
 * The hp increasing will be based on the gameVariable. If the 
 * game variable is not set, excisting or useable the stat will be -1! 

 * levelVariables are little different to use. 
 * to set use the plugin command setLevelVar 
 * This expects 2 variables after. The first one is the key
 * the second one is the value;
 * Example:
 * setLevelVar 1 25
 * will set LevelVar1 on a value of 25.

 * How to use in noteTag:
 * Example: 
 * <level>
 * min 1
 * max 10
 * hp gameVariable 1
 * mp levelVariable 1
 * atk 5
 * exp 4
 * </level>

 * This will create the monster of between level 1 and 10. 
 * The hp increasing will be based on the gameVariable.
 * the mp increasing will be based on the levelVariable in this case 25
 * If the levelvariable is not set it will return 0; 

 * By default these variables will not get saved. When you save your game.
 * But you can save them by turning on the parameter.

 * Change Log:

 * V1.2:
 * Added support for GameVariables
 * Added support for LevelVariables
 * Fixed problem with the randomizer.
 * Added a way to save the levelvariables in the save.
   this is optional to use.
 * Bug fixed: Max not working
 * Bug fixed: Same not working
 * Optimized script when using other scripts.
 * Bug fix: level smaller then min level
 * bug fix: level bigger then max level
 * bug fix what happens when a string gets loaded. 
 * Added setLevelVar plugin command
 * Added getLevelVar plugin command
 * Extended Helpfile
 * Removed problem when loading in a string. 

 * V1.1
 * Added debug options. Set the param to 1 to get debug
   messages in your console.
 * Made start for extra variable support
 * Support for extra variables in the regex
 * Function created that handles regex.
 * GetValue created, handles what the regex returns. 
 * setUsePartyLeader plugin command added.
 * Added minmonster parameter.

 * V1.0 
 * First release version.

*/
	var Frysning_Leveler = Frysning_Leveler || {};
	Frysning_Leveler.Parameters = PluginManager.parameters('Frysning_Leveler');
	
	Frysning_Leveler.paramNames = ["hp", "mp", "atk", "def", "matck", "mdef", "agi", "luck", "gold", "exp"];
	Frysning_Leveler.LevelVars = [];

	Frysning_Leveler.setUsePartyLeader= function(use){
			Frysning_Leveler.Parameters["usePartyLeader"] = parseInt(use);
	}

	/*Frysning_Leveler.setStat= function(stat){
			Frysning_Leveler.Parameters[stat +"_stat"] = variable;
	}*/


	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (command === "setUsePartyLeader")
			Frysning_Leveler.setUsePartyLeader(args[0]);
		if (command === "setLevelVar")
			Frysning_Leveler.setLevelVar(args[0],args[1]);
		if (command === "getLevelVar")
			Frysning_Leveler.getLevelVar(args[0]);
	};


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
		
		val =-1;
		if (this.isEnemy()) {
			val = this.Leveled_Param(paramId);
		}

		if (val < 0){
			val = Frysning_Leveler.param.apply(this, arguments);
		}

		return val;
	};
	
	Frysning_Leveler.setLevelVar = function(key, value){
			Frysning_Leveler.LevelVars[key] = value;
	}


	Frysning_Leveler.getLevelVar =function(key){
		 if (typeof Frysning_Leveler.LevelVars[key] === 'undefined') return 0;
		return Frysning_Leveler.LevelVars[key];
	}

	Frysning_Leveler.getValue= function(value){
		c_value=0;
		if(value.contains('gameVariable'))	{
			temp = value.split(' ');
			b = parseInt(temp[1]);
			c_value = $gameVariables.value(b);
		}
		else if (value.contains('levelVariable')){
			temp = value.split(' ');
			b = parseInt(temp[1]);
			c_value = 	Frysning_Leveler.getLevelVar(b);
		}
		else 
			c_value = value;
		return c_value;

	}

	Frysning_Leveler.createRegex = function(stat){
		cur = "\\b(?:"+stat+")(?:[ ]*)(gameVariable \\d*|levelVariable \\d*|\\d*)";
		pattern = new RegExp(cur,"i");
		return pattern
	}

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

		if (Frysning_Leveler.Parameters["DebugModo"] == 1){
			this.old_values = []
			this.increasing_stats = [];

			for( i= 0; i <= 7; i++){	
				this.old_values[i] = this.param(i)
			}
			this.old_values[8] = this.gold();
			this.old_values[9] = this.exp()
		}

		this.NoteArray = this.NoteArray[1];
		this.min = this.NoteArray.match(Frysning_Leveler.createRegex("min"));
		this.max = this.NoteArray.match(Frysning_Leveler.createRegex("max"));

		cur = "\\b(?:same)";
		pattern = new RegExp(cur,"i");
		this.same = this.NoteArray.match(pattern)

		cur = "\\b(?:showlevel)";
		pattern = new RegExp(cur,"i");
		this.showlevel = this.NoteArray.match(pattern)

		if (typeof 	this.min === 'undefined' || this.min == null)
			this.min =  parseInt(Frysning_Leveler.Parameters["minMonster"])
		else 
		{
			this.min =  parseInt(Frysning_Leveler.getValue(this.min[1]))
			if (this.min === 0) {
				this.min =  parseInt(Frysning_Leveler.Parameters["minMonster"])}
		}

		if (typeof 	this.max === 'undefined'|| this.max == null){
			this.usemax = false;
			this.max =  parseInt(Frysning_Leveler.Parameters["maxMonster"])}
		else {
			this.usemax  = true;
			this.max = parseInt(Frysning_Leveler.getValue(this.max[1]))
	
			if (this.max === 0) {
				this.max =  parseInt(Frysning_Leveler.Parameters["maxMonster"])
			}
		}

		if (typeof this.same !== 'undefined' && this.same != null){
			this.same = true;
		}
		else{ this.same = false;}

		if (typeof this.showlevel !== 'undefined' && this.showlevel != null){
			this.showlevel = true;
		}
		else {
			this.showlevel = false;
		}


		if (this.same == true){
			this.same_level =0;
			if (Frysning_Leveler.Parameters["usePartyLeader"] == 1){
					this.same_level = $gameParty.leader()._level;
			}
			else
				this.same_level =  $gameParty.highestLevel();

			if (this.usemax == false)
				this.level_frys =this.same_level
			else{	
				if (this.max > this.same_level){
					this.level_frys = this.same_level;
				}
				else
					this.level_frys = this.max;
				}	
			}
		else{

			this.level_frys = Math.floor( Math.random() * (this.max -  this.min) +1);
			this.level_frys += this.min
		
			if(this.level_frys < this.min)
				this.level_frys = this.min
		
			if(this.level_frys > this.max)
				this.level_frys = this.max
		
		}

		for( i= 0; i <= 9; i++){
			this.IncreaseStat(i);
		}

		if (Frysning_Leveler.Parameters["DebugModo"] == 1)
		{
			this.new_values=[];
			for( i= 0; i <= 7; i++){	
				this.new_values[i] = this.param(i)
			}
			this.new_values[8] = this.gold();
			this.new_values[9] = this.exp()
		
			console.log('Information for: ' + this.name());
			console.log('Min Level: '+ this.min+'  Max Level: '+ this.max+' Choosen Level: '+ this.level_frys);

  			console.log('Smaller then 0 means not used' )	
			console.log('Params: Hp, Mp, Atk, Def, Matk, mDef, agi, luck, gold,exp' )	
			console.log('Current Params: ' )
			console.log(this.level_param)
			console.log('Database Values: ')
			console.log(this.old_values)
			console.log('Increasing each param: ');
			console.log(this.increasing_stats )

			console.log('Eventually: ');
			console.log(this.new_values )
		}
	};

	Game_Enemy.prototype.IncreaseStat = function(type) {
		var s = Frysning_Leveler.paramNames[type]; 
		stat = this.NoteArray.match(Frysning_Leveler.createRegex(s));

		if (stat == null || typeof stat === 'undefined'){
			stat = Frysning_Leveler.Parameters[s];
		}
		else{
			stat = Frysning_Leveler.getValue(stat[1])
		}

		if (Frysning_Leveler.Parameters["DebugModo"] == 1){
			this.increasing_stats[i] = stat;
		}
	
		var increasePercent= false;
	 	var increasing = stat;
		var baseStat = this.param(type);

		if (isNaN(stat)){
		 	increasePercent = (stat.contains('%')) ? true :false;
		 	if(increasePercent){
		 	increasing = stat.split('%')[0]
		 	console.log(increasing);}
		}

		if (isNaN(increasing) || increasing == "") {
				this.level_param[type] = -1;
				return
			};

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

		for(j = this.min; j< this.level_frys; j++){
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
	    return this.originalName() + (this._plural ? this._letter : '') + " " + (this.showlevel ?  ' Lv: ' + this.level_frys : '');
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
			member.Level();});
	};


	if (Frysning_Leveler.Parameters["UseSave"] == 1){
		Frysning_Leveler.makeSaveContents = DataManager.makeSaveContents;
		DataManager.makeSaveContents = function() {  
		 	var contents = Frysning_Leveler.makeSaveContents.apply(this, arguments);
		    contents.level_vars  =  Frysning_Leveler.LevelVars;
		    return contents;
		};


		Frysning_Leveler.extractSaveContents = DataManager.extractSaveContents;
		DataManager.extractSaveContents = function(contents) {
		  	Frysning_Leveler.extractSaveContents.apply(this, arguments);
		     Frysning_Leveler.LevelVars = contents.level_vars;  
		};
	}

