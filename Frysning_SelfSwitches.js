/*:
 * @plugindesc Manage selfswitches of other events  
 * @author Frysning
 */
	

	var Imported = Imported || {};
	Imported.Frysning_SelfSwitch = true;

	var Frysning_SelfSwitch = Frysning_SelfSwitch || {};

	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (command === "setSwitch")
			Frysning_SelfSwitch.setSwitch(args[0],args[1],args[2]);
	};


	Game_Map.prototype.getEventByName = function(name) { 
		return this.events().filter(function(e) { 
			return e.event().name.toLowerCase() === name.toLowerCase();
		})[0];
	}


	Frysning_SelfSwitch.setSwitch = function(eventId, p_Switch, p_value){
		game_event = $gameMap.getEventByName(eventId);

	 	if(game_event){
	 		eSwitch = typeof p_Switch !== 'undefined' ? p_Switch : 'A';
			eSwitch = eSwitch.toUpperCase();
	 		if (!eSwitch.match(/^[A-D]$/)) {
	 		    return;
	 		}

	 		value = typeof p_value!== 'undefined' ? p_value : 1;

			if(!isNaN(value)){
	 			if(p_value == 0)
	 				value =0;
	 		}
			else{
		 		if (value.toLowerCase() === 'off' || value === '0' || value.toLowerCase() === 'false')
		 			value = 0;
		 		else if (value.toLowerCase() == 'on' || value == '1' || value.toLowerCase() == 'true')
		 			value = 1;
		 	}

	      	key = [$gameMap._mapId,game_event._eventId, eSwitch];
			$gameSelfSwitches.setValue(key,value);
		}
	}