
	var Imported = Imported || {};
	Imported.Tone_Frysning = true;

/*:
 * @plugindesc Easy to manage tones for different situations in
 * your game There are 27 tones supported.  
 * @author Frysning

 * @param useTimedTone
 * @desc if you want to update the tones on based on time set it on 1.
 * @default 0

 * @param useBattleTone
 * @desc set this to 0 if you don't want to use tones in battle.
 * @default 1

 * @param MidnightStart
 * @desc When do you want to let midnight start?
 * @default 0 

 * @param LateMorningStart
 * @desc When do you want to let morning start?
 * @default 6

 * @param NoonStart
 * @desc When do you want to let Noon start?
 * @default 9 

 * @param AfternoonStart
 * @desc When do you want to let afternoon start?
 * @default 13

 * @param NightStart
 * @desc When do you want to let night start?
 * @default 19

 * @param Null_Tone
 * @desc the common value for the Null_Tone
 * @default [0,0,0,0]

 * @param Midnight_Tone
 * @desc the common value for the Midnight_Tone
 * @default [-102,-102,-64,68]

 * @param Late_Morning_Tone
 * @desc the common value for the Late_Morning_Tone
 * @default [-14,-14,-10,15]

 * @param Noon_Tone
 * @desc the common value for the Noon_Tone
 * @default [4,15, 0,0]

 * @param Afternoon_Tone
 * @desc the common value for the Afternoon_Tone
 * @default[32,24,0,24]

 * @param Night_Tone
 * @desc the common value for the Night_Tone
 * @default [64,-64,-32,45]

 * @param Custom_Tone_0
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_1
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_2
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]
 
 * @param Custom_Tone_3
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]
 
 * @param Custom_Tone_4
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]
 
 * @param Custom_Tone_5
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]
 
 * @param Custom_Tone_6
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]
 
 * @param Custom_Tone_7
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]
 
 * @param Custom_Tone_8
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_9
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_10
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_11
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_12
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_13
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_14
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_15
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_16
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_17
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @param Custom_Tone_18
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]


 * @param Custom_Tone_19
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]


 * @param Custom_Tone_20
 * @desc the common value for the Custom_Tone
 * @default [0,0,0,0]

 * @help
 * You can call a tone with a pluginCommand.
 * How to call:  setTone(<ToneName>)
 * How to call Example: setTone(Midnigth_Tone)

 * clear tone with clearTone

 * The game can automatic update the tone depending on the time of your
 * device 
 * for this set useTimedTone to 1

 * You can turn of the tones in battle
 * for this set the var useBattleTone to 0
 * if you want to use the battletone set it to 1;

 * How are tones defined:
 * [Red,Green,Blue,Gray]
 * Minimum -255
 * Maximum 255

 * credits to TheUnproPro for giving me this idea to make.

*/

	var Tone_Frysning = Tone_Frysning || {};
	Tone_Frysning.Parameters = PluginManager.parameters('Tone_Frysning');

	var CurrenTone = "";
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		var com = command.split('(')[0];
		var param = command.substring(command.lastIndexOf("(")+1,command.lastIndexOf(")"));

		if (com === "setTone")
			$gameMap.setTone(param);
		if (com === "setUseTimedZone")
			Tone_Frysning.setUseTimedZone(param);
		if (com === "setUseBattleTone")
			Tone_Frysning.setUseBattleTone(param);
		if (com === "clearTone")
			Tone_Frysning.clearTone();
	};

	Game_Map.prototype.setTone = function(tint) {
		if (CurrenTone === tint)
			return;

		CurrenTone = tint;

		if ( Tone_Frysning.Parameters[tint] === null ){
			console.log(tint + " is not known");
		}
		else{
			$gameScreen.startTint( JSON.parse(Tone_Frysning.Parameters[tint]),0);
		}
	};


	Tone_Frysning.clearTone = function(){
			Game_Map.prototype.setTone("Null_Tone");
	}

	//Set The use timeZone 1 for true all the others are false;
	Tone_Frysning.setUseTimedZone =function(set){
		Tone_Frysning.Parameters["useTimedTone"] = set;
		Tone_Frysning.clearTone();

	}

	//Set The useBattleTone 1 for true all the others are false;
	Tone_Frysning.setUseBattleTone=function(set){
		Tone_Frysning.Parameters["useBattleTone"] = set;
		console.log($gameTroop)
	}

	Tone_Frysning.Update = function(){

		if($gameTroop._inBattle == true){ 
			if (Tone_Frysning.Parameters["useBattleTone"] != 1){
				Tone_Frysning.clearTone();
				return;
			}
		}	

		if (Tone_Frysning.Parameters["useTimedTone"] == 1){
			if (DataManager.isMapLoaded()){
				ti =new Date().getHours();

			   	if(ti >= Tone_Frysning.Parameters["MidnightStart"]  && ti <Tone_Frysning.Parameters["LateMorningStart"]  )	{
			   		Game_Map.prototype.setTone("Midnight_Tone")
			   	}
			   	else if(ti >= Tone_Frysning.Parameters["LateMorningStart"]   && ti < Tone_Frysning.Parameters["NoonStart"]  )  {
			   		Game_Map.prototype.setTone("Late_Morning_Tone")
			   	}
			   	else if(ti >= Tone_Frysning.Parameters["NoonStart"]    && ti < Tone_Frysning.Parameters["AfternoonStart"]  ){
			   		Game_Map.prototype.setTone("Noon_Tone")
			   	}
			   	else if(ti >= Tone_Frysning.Parameters["AfternoonStart"]    && ti < Tone_Frysning.Parameters["NightStart"]  ){
			   		Game_Map.prototype.setTone("Afternoon_Tone")
			   	}
			    else if(ti >= Tone_Frysning.Parameters["NightStart"] ){
			   		Game_Map.prototype.setTone("Night_Tone")
			   	}
			
			}
		}
	}

	var oldUpdate = Window.prototype.update;
	Window.prototype.update =
	function() {
	    oldUpdate.apply(this, arguments); 
	    Tone_Frysning.Update();
	};


   



