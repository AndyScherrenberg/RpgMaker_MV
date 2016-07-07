var Imported = Imported || {};
Imported.Frysning_EventMover = true;

/*:
 * @plugindesc V0.1: Let events move when the player moves.
 * Based on Lufia: Rise of the Sinistrals
 * @author Frysning
 *
 * @param speed
 * @desc The speed of the event. This is default 5 otherwise
 * it will look really weird. See NOTES.
 * @default 5
 *
 * @help
 * Useage: This script is free to use for non-commercial.
 * I like to see what you did with it, so send me a copy please :3
 * If you go commercial contact me please and we will sort it out really fast!
 * For both I really want some credit :3
 *
 * What does it do:
 * If you did move then the event will move. Works for every event.
 *
 * How to use:
 * Add a comment to the page Preferable as first entry.
 *
 * <Move_With_Player>
 * This will make it that the event will move when you move. It will be a random movement.
 *
 * <Move_Custom>
 * This will make the event follow the custom route you give
 *
 * <Stalk_Player>
 * This will make the event use the approach way to get to you.
 *
 * <Escape_Player>
 * This will make te event run away from a player
 *
 * <Mimic_Player>
 * The event will do the same move as the player.
 *
 * <Reverse_Mimic_Player>
 * The event will do the opposite move as the player
 *
 * You can also create it so that the event will trigger after a few steps of the player.
 * <Move_With_Player 3>
 * Every 3th step you do will trigger the event move once. This works for all the functions.
 *
 * You can also let an event move more tiles then 1 after every move you make or after the steps.
 * <Move_With_Player m2>
 * The event will now move 2 tiles in place of 1.
 *
 * Combining wait and move more tiles
 * <Move_With_Player 3 m2>
 * After every 3th step of the player the event moves 2.
 *
 * Custom speed:
 * <Move_With_Player s3>
 * The event will now have a move speed of 3. This works but will create wonky animations.
 * I recommend to use speed always with a wait. See the notes.
 *
 * You can chain  all 3 of them, but it will look weird.
 *
 * NOTES:
 * The speed of the event will always be 4. Reason otherwise it looks like the events warp around.
 * Making the speed faster is no problem making it slower well. That is.
 *
 * Using other speeds and get a flowing animation:
 * Speed 1 = 16 waits
 * Speed 2 = 8 waits
 * Speed 3 = 4 waits
 *
 * This way you can make it so that the events moves nicely.
 * With speeds lower then 4 don't skipt tiles because it looks really weird.
 *
 * If you use the multistep then the event speed will be 6 for the same reason.
 * Multistep of 2 and the speed of 6 looks the best.
*/

var Frysning_EventMover = Frysning_EventMover || {};
Frysning_EventMover.Parameters = PluginManager.parameters('Frysning_EventMover');

Frysning_EventMover.Game_Player_IncreaseSteps = Game_Player.prototype.increaseSteps;
Frysning_EventMover.currentDirection = 0


Game_Player.prototype.increaseSteps = function()  {
    Frysning_EventMover.Game_Player_IncreaseSteps.apply(this);


    Frysning_EventMover.currentDirection = this.direction()
    var events =  $gameMap._events
    for (index = 0; index < events.length; ++index) {
      if( events[index] != null){
          if (events[index].isExtraEvent == true){
          events[index].updateWalker()}
        }
    }
};

Frysning_EventMover.Game_Event_update = Game_Event.prototype.updateSelfMovement;
Frysning_EventMover.Game_Event_refresh = Game_Event.prototype.refresh;

Game_Event.prototype.isExtraEvent = false;
Game_Event.prototype.waitSteps = 0;
Game_Event.prototype.currentSteps = 0;
Game_Event.prototype.MoveType = 0;
Game_Event.prototype.OriginalSpeed = 0;
Game_Event.prototype.moveTimes = 1;

/*
Game_Event.prototype.moveTypeEnum = {
    Random: 0,
    Mimic: 1,
    Stalk: 2,
    Flee: 3,
    ReverseMimic: 4,
};
*/



Game_Event.prototype.initialize = function(mapId, eventId) {
    Game_Character.prototype.initialize.call(this);
    this._mapId = mapId;
    this._eventId = eventId;
    this.locate(this.event().x, this.event().y);
    this.OriginalSpeed = this._moveSpeed;
    this.refresh();
};



Game_Event.prototype.refresh = function() {
    Frysning_EventMover.Game_Event_refresh.call(this);
   this.PageClear();
    this.PageSetup();
};

Game_Event.prototype.PageClear = function () {
    this._moveSpeed =  this.OriginalSpeed;
    this.isExtraEvent = false;
    this.waitSteps = 0;
    this.currentSteps = 0;
    this.MoveType = 0;
    this.moveTimes = 1

}

Game_Event.prototype.PageSetup = function () {

    var index;

    if (!this){
        return
    }
    var pages = this.page().list

    for (index = 0; index < pages.length; ++index) {
      if (pages[index].code == 108){

          var notePattern = /<((?:Move_With_Player)|(?:Mimic_Player)|(?:Reverse_Mimic_Player)|(?:Stalk_Player)|(?:Escape_Player))(?:[ ]?)([0-9]*)(?:[ ]?)m?([0-9]*)(?:[ ]?)s?([0-9]*)>/i;
          var noteTag = pages[index].parameters[0]
          var NoteArray = noteTag.match(notePattern);

          if (NoteArray === null)
              return;

          switch (NoteArray[1]){
              case "Move_With_Player":
                 this.MoveType = 0;
                  break;
              case "Mimic_Player":
                  this.MoveType = 1;
                  break;
              case "Stalk_Player":
                  this.MoveType = 2;
                  break;
              case "Escape_Player":
                  this.MoveType = 3;
                  break;
              case "Reverse_Mimic_Player":
                  this.MoveType = 4;
                  break;
              case "Move_Custom":
                  this.prototype.MoveType = 5;
                  break;
          }
          this.isExtraEvent = true
          this.OriginalSpeed = this._moveSpeed;
          this._moveSpeed = parseInt(Frysning_EventMover.Parameters["speed"])
          if (NoteArray[2] != ""){
              this.waitSteps = parseInt(NoteArray[2]);
          }
          if (NoteArray[3] != ""){
              this.moveTimes = parseInt(NoteArray[3]);
              this._moveSpeed = 6
          }
          if (NoteArray[4] != ""){
              this._moveSpeed = parseInt(NoteArray[4]);
          }

          break;
      }
    }
}

Game_Event.prototype.updateWalker = function(){

    for(var index = 0; index < this.moveTimes; index++){
    if (this.waitSteps > 0){
        this.currentSteps++;
        if (this.waitSteps == this.currentSteps) {
            this.currentSteps = 0
            this.MyMoveEvent()
        }
    }
    else{
        this.MyMoveEvent()
    }
   }
}

Game_Event.prototype.MyMoveEvent = function() {

    if (this.isNearTheScreen()) {

        switch (this.MoveType) {
            case 0:
                this.moveTypeRandom()
                break;
            case 1:
                this.moveStraight(Frysning_EventMover.currentDirection);
                break;
            case 2:
                this.moveTowardPlayer();
                break;
            case 3:
                this.moveAwayFromPlayer();
                break;
            case 4:
                this.moveStraight(  this.reverseDir(Frysning_EventMover.currentDirection))
                break;
            case 5:
                this.moveTypeCustom();
                break;
        }


    }
}
Game_Event.prototype.updateSelfMovement = function() {
    if (this.isExtraEvent == false) {
        Frysning_EventMover.Game_Event_update.apply(this);
    }
};