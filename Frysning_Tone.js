
	var Imported = Imported || {};
	Imported.Frysning_Tone = true;

/*:
 * @plugindesc Easy to manage tones for different situations in
 * your game There are 27 tones supported.  
 * @author Frysning

 * @param useTime
 * @desc if you want to update the tones on based on time set it on 1.
 * @default 0

 * @param useBattleTone
 * @desc set this to 0 if you don't want to use tones in battle.
 * @default 1

 * @param MidnightStart
 * @desc When do you want to let midnight start?
 * @default 0 

 * @param MorningStart
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

 * @param MidnightSwitch
 * @desc W A switch for Midnight events change the number for the gameSwitch
 * @default 1
 
 * @param MorningSwitch
 * @desc  A switch for Morning events change the number for the gameSwitch
 * @default 2

 * @param NoonSwitch
 * @desc  A switch for Noon events change the number for the gameSwitch
 * @default 3

 * @param AfternoonSwitch
 * @desc  A switch for  Afternoon events change the number for the gameSwitch
 * @default 4

 * @param NightSwitch
 * @desc A switch for night events change the number for the gameSwitch
 * @default 5

 * @param Null_Tone
 * @desc the common value for the Null_Tone
 * @default [0,0,0,0]

 * @param Midnight_Tone
 * @desc the common value for the Midnight_Tone
 * @default [-102,-102,-64,68]

 * @param Morning_Tone
 * @desc the common value for the Morning_Tone
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
 * for this set useTime to 1

 * You can turn of the tones in battle
 * for this set the var useBattleTone to 0
 * if you want to use the battletone set it to 1;

 * How are tones defined:
 * [Red,Green,Blue,Gray]
 * Minimum -255
 * Maximum 255

 * credits to TheUnproPro for giving me this idea to make.

 * If you want to use the based on time then set the param:
 * useTimeTone to 1 if not set it to 0.

 * You can choice to use the tones in Battle yes or no.
 * useBattleTone is one of the params that you can set. 1 for true, 0 for false

 * A lot of things are configurable so you can easy it.
 * Custom Times:
 * If you use the automatic time system you can set the the following variables.
 * The times are based on 00-23 format. All of these are integers and are getting used in the script like this.
 * Midnight runs from MignightStart to MorningStart. Morning runs from  till NoonStart and so on.

 *  MidnightStart
 *  Morning
 *  NoonStart
 *  AfternoonStart
 *  NightStart

Tones:
You can create up to 27 different tones.
Tones are an array of 4 numbers. [red,green,blue,gray]  Minimum -255 & Maximum 255
    Null_Tone this tone is used for clearing the tone.
    Midnight_Tone this is the tone it uses for midnight
    Morning_Tone this is the tone it uses for the morning
    Noon_Tone this is the tone it uses for noon
    Afternoon_Tone this is the tone it uses for the afternoon
    Night_Tone this is the tone it uses for the night
    Custom_Tone_0 till Custom_Tone_20 these tones are made for if you want to use a different tone.


Switches:

It is possible to set up to 5 gameSwitches. These switches are meant to use for time depending events. 
In the variable list you can sign them to a switch.
    MidnightSwitch
    MorningSwitch
    NoonSwitch
    AfternoonSwitch
    NightSwitch

PluginCommands:

setTone(Tone):
With this pluging command you can set a tone. It need 1 parameter ypi can send it a string. Example:
You want to use Custom_Tone_12 in an event. Just do setTone("Custom_Tone_12") as a plugin command.


clearTone
With this plugin command you can clear the current tone. Null_Tone gets used for this.


setUseBattleTone
Maybe you want for a certain fight that you need an extra tone in it or not. Well that is possible
you can on the run change if this should happen yes or no.
If call a plugin command wit setUseBattleTone(1) it will turn battletones on. if you use a 0 here it will turn it of.

setUseTime
So your game  started and the player was not bound to a time system. 
But on a certain part you want that this happens. Well no problem you can turn this on!
just call setUseTime(1) for activate and for decactivate use 0.

Just drop it in your plugin folder and activate it. Set the variables and have fun.
If you have any problems with it just let me know.

*/

	var Frysning_Tone = Frysning_Tone || {};
	Frysning_Tone.Parameters = PluginManager.parameters('Frysning_Tone');
	var ShouldUpdate = false;
	var CurrenTone = "";
	var OldTone = "";
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		var com = command.split('(')[0];
		var param = command.substring(command.lastIndexOf("(")+1,command.lastIndexOf(")"));

		if (com === "setTone")
			$gameMap.setTone(param);
		if (com === "setUseTime")
			Frysning_Tone.setUseTime(param);
		if (com === "setUseBattleTone")
			Frysning_Tone.setUseBattleTone(param);
		if (com === "clearTone")
			Frysning_Tone.clearTone();
	};

	Game_Map.prototype.setTone = function(tint) {
		if (CurrenTone === tint)
			return;

		CurrenTone = tint;

		if ( Frysning_Tone.Parameters[tint] === null ){
			console.log(tint + " is not known");
		}
		else{
			
			Frysning_Tone.setSwitch(tint);

			$gameScreen.startTint(JSON.parse(Frysning_Tone.Parameters[tint]),0);
		}
	};


	Frysning_Tone.setSwitch= function(param)
	{
		param = param.toString();
		$gameSwitches.setValue(Frysning_Tone.Parameters["MidnightSwitch"], false);
		$gameSwitches.setValue(Frysning_Tone.Parameters["MorningSwitch"], false);
		$gameSwitches.setValue(Frysning_Tone.Parameters["NoonSwitch"], false);
		$gameSwitches.setValue(Frysning_Tone.Parameters["AfternoonSwitch"], false);
		$gameSwitches.setValue(Frysning_Tone.Parameters["NightSwitch"], false);

		switch(param){
			case "Midnight_Tone":
		{
			$gameSwitches.setValue(Frysning_Tone.Parameters["MidnightSwitch"], true);
			break;
		}

			case "Morning_Tone":
		{
			$gameSwitches.setValue(Frysning_Tone.Parameters["MorningSwitch"], true);
			break;
		}
		case "Noon_Tone":
		{
			$gameSwitches.setValue(Frysning_Tone.Parameters["NoonSwitch"], true);
			break;
		}
		case "Afternoon_Tone":
		{
			$gameSwitches.setValue(Frysning_Tone.Parameters["AfternoonSwitch"], true);
			break;
		}
		case "Night_Tone":
		{
			$gameSwitches.setValue(Frysning_Tone.Parameters["NightSwitch"], true);
			break;
		}
			default:
			{
				break;
			}
		}
	}


	Frysning_Tone.clearTone = function(){
		CurrenTone = "";
		Game_Map.prototype.setTone("Null_Tone");
	}

	//Set The use timeZone 1 for true all the others are false;
	Frysning_Tone.setUseTime =function(set){
		Frysning_Tone.Parameters["useTime"] = set;
		Frysning_Tone.clearTone();
	}

	//Set The useBattleTone 1 for true all the others are false;
	Frysning_Tone.setUseBattleTone=function(set){
		Frysning_Tone.Parameters["useBattleTone"] = set;
		console.log($gameTroop)
	}

	Frysning_Tone.Update = function(){

		if($gameTroop._inBattle == true){ 
			if (Frysning_Tone.Parameters["useBattleTone"] != 1){
				if (OldTone =="")
				OldTone = CurrenTone;

				Frysning_Tone.clearTone();
				ShouldUpdate = true;
				return;
			}
		}	

		if (Frysning_Tone.Parameters["useTime"] == 1){
			if (DataManager.isMapLoaded()){
				ti =new Date().getHours();
			   	if(ti >= Frysning_Tone.Parameters["MidnightStart"]  && ti < Frysning_Tone.Parameters["MorningStart"]  )	{
			   		
			   		Game_Map.prototype.setTone("Midnight_Tone")
			   	}
			   	else if(ti >= Frysning_Tone.Parameters["MorningStart"]   && ti < Frysning_Tone.Parameters["NoonStart"]  )  {
			   		Game_Map.prototype.setTone("Morning_Tone")
			   	}
			   	else if(ti >= Frysning_Tone.Parameters["NoonStart"]    && ti < Frysning_Tone.Parameters["AfternoonStart"]  ){
			   		Game_Map.prototype.setTone("Noon_Tone")
			   	}
			   	else if(ti >= Frysning_Tone.Parameters["AfternoonStart"]    && ti < Frysning_Tone.Parameters["NightStart"]  ){
			   		Game_Map.prototype.setTone("Afternoon_Tone")
			   	}
			    else if(ti >= Frysning_Tone.Parameters["NightStart"] ){
			   		Game_Map.prototype.setTone("Night_Tone")
			   	}
			
			}
		}

		if($gameTroop._inBattle == false && Frysning_Tone.Parameters["useTime"] != 1){ 
			if (ShouldUpdate == true)
			{
				console.log(OldTone);
				ShouldUpdate = false;
				Game_Map.prototype.setTone(OldTone)
				OldTone = "";

			}
		}
	}

	var oldUpdate = Window.prototype.update;
	Window.prototype.update =
	function() {
	    oldUpdate.apply(this, arguments); 
	    Frysning_Tone.Update();}