    var Imported = Imported || {};
    Imported.Frysning_Dolls = true;

    /*:
    * @plugindesc V0.1: Equip items that give combinations
    * this script will not be supported.
    * @author Frysning

    * @param aType
    * @desc The basic growth of the hp stat if you did not define
    * it in the notetag.
    * @default 7

    * @param eSlot1
    * @desc The basic growth of the hp stat if you did not define
    * it in the notetag.
    * @default 5

    * @param eSlot2
    * @desc The basic growth of the hp stat if you did not define
    * it in the notetag.
    * @default 6
    
    * @help
    * This script should not be used. 
    * I made this script for my own projects.
    * If you use it, all the problems and errors are for your own. 

    */

    var Frysning_Dolls = Frysning_Dolls || {};
    Frysning_Dolls.Parameters = PluginManager.parameters('Frysning_Dolls');

    var $ParamIcons=[];

    $ParamIcons[0] = 1;
    $ParamIcons[1] = 2;
    $ParamIcons[2] = 3;
    $ParamIcons[3] = 4;
    $ParamIcons[4] = 5;
    $ParamIcons[5] = 6;
    $ParamIcons[6] = 7;
    $ParamIcons[7] = 8;

    var $ElementIcons=[];

    $ElementIcons[0] = 74;
    $ElementIcons[1] = 63;
    $ElementIcons[2] = 64;
    $ElementIcons[3] = 65;
    $ElementIcons[4] = 66;
    $ElementIcons[5] = 67;
    $ElementIcons[6] = 68;
    $ElementIcons[7] = 69;
    $ElementIcons[8] = 70;
    $ElementIcons[9] = 71;

    var $dataDolls = null;
    DataManager._databaseFiles.push({ name: '$dataDolls', src: 'Dolls.json'});

    (function() {

        var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            _Game_Interpreter_pluginCommand.call(this, command, args);
            if (command === "addDolls")
                $gameSystem.addDolls(Number(args[0]));
            if (command === "removeDolls")
                $gameSystem.removeDolls(Number(args[0]));
            if (command === "Seedolls")
                SceneManager.push(Scene_Dolls);
        };

        Game_System.prototype.addDolls = function(dollId) {
            if (!this._DollFlags){
                this._DollFlags=[] 
            }
        
            var DollFlag ={};
            DollFlag.isDiscoverd = false;


            this._DollFlags[dollId] = DollFlag;
            this._DollFlags[dollId].isDiscoverd = true;
        };

        Game_System.prototype.removeDolls = function(dollId) {
            if (!this._DollFlags) 
              this._DollFlags=[]
           
            this._DollFlags[dollId].isDiscoverd = false;
        
        };

        Game_System.prototype.DollGet = function(doll) {
            if (this._DollFlags && doll) 
                if(this._DollFlags[doll._Id])
                 return !!this._DollFlags[doll._Id].isDiscoverd;
            return false;
        };

        Game_System.prototype.GetDoll = function(dollid) {
            for(i =0; i < $dataDolls.Dolls.length; i++)
            {
                if ($dataDolls.Dolls[i]._Id === dollid)
                    return $dataDolls.Dolls[i];
            }
            return null;
        };

       function Scene_Dolls() {
            this.initialize.apply(this, arguments);
        }

        Scene_Dolls.prototype = Object.create(Scene_MenuBase.prototype);
        Scene_Dolls.prototype.constructor = Scene_Dolls;

        Scene_Dolls.prototype.initialize = function() {
            Scene_MenuBase.prototype.initialize.call(this);
        };

        Scene_Dolls.prototype.create = function() {

            Scene_MenuBase.prototype.create.call(this);
            this._indexWindow = new Window_DollList(0, 60);
            this._help = new Window_Help(1);
            this._help.setText("Dolls");
            this._indexWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._help);
            this.addWindow(  this._indexWindow);
            this._indexWindow.activate();
       
            this._statusWindow = new Window_DollInfo(Graphics.boxWidth/4, 70,Graphics.boxWidth - Graphics.boxWidth/4, 555);
            this.addWindow(this._indexWindow);
            this.addWindow(this._statusWindow);
            this._indexWindow.setStatusWindow(this._statusWindow);
        };

        Scene_Dolls.prototype.start = function() {
            Scene_MenuBase.prototype.start.call(this);
             this._indexWindow.refresh();
        };

        function Window_DollList() {
            this.initialize.apply(this, arguments);
        }

        Window_DollList.prototype = Object.create(Window_Selectable.prototype);
        Window_DollList.prototype.constructor = Window_DollList;

        Window_DollList.prototype.initialize = function(x,y) {
            var width = Graphics.boxWidth;
            var height = this.fittingHeight(6);
            Window_Selectable.prototype.initialize.call(this, 0, 70, width/4, 555);

            this.refresh();
            this._list = [];

            this.CreateList();
            this.select(0);
        };

        Window_DollList.prototype.CreateList = function(){
            for (var i = 0; i < $dataDolls.Dolls.length; i++) {  
                var Doll = $dataDolls.Dolls[i];
                if ($gameSystem.DollGet(Doll)) {
                   this._list.push(Doll);
                }
            }
        }

        Window_DollList.prototype.maxItems = function() {
            return this._list ? this._list.length : 0;
        };

        Window_DollList.prototype.refresh = function() {
            this.createContents();
            this.drawAllItems();
        };

        Window_DollList.prototype.lineHeight = function() {
            return 14;
        };


        Window_DollList.prototype.setStatusWindow = function(statusWindow) {
                this._statusWindow = statusWindow;
                this.updateStatus();
        };


        Window_DollList.prototype.update = function() {
            Window_Selectable.prototype.update.call(this);
            this.updateStatus();
            if(Input.isTriggered   ('left')){
                this._statusWindow.ChangePage(-1);
                this._statusWindow.refresh();
            }
            if(Input.isTriggered ('right')){
                this._statusWindow.ChangePage(1);
                this._statusWindow.refresh();
            }
        };

        Window_DollList.prototype.drawItem = function(index) {
            this.contents.fontSize = 14;
            var doll = this._list[index];
            var name = doll.Name;
            var rect = this.itemRectForText(index);
            this.changeTextColor(this.textColor(0));
            this.drawText(name, rect.x, rect.y, rect.width);
        };

        Window_DollList.prototype.setStatusWindow = function(statusWindow) {
            this._statusWindow = statusWindow;
           this.updateStatus();
        };

        Window_DollList.prototype.updateStatus = function() {
            if (this._statusWindow) {
                var doll = this._list[this.index()];
                this._statusWindow.setDoll(doll);
            }
        };


        function Window_DollInfo() {
             this.initialize.apply(this, arguments);
        }

        Window_DollInfo.prototype = Object.create(Window_Base.prototype);
        Window_DollInfo.prototype.constructor = Window_DollInfo;

        Window_DollInfo.prototype.initialize = function(x, y, width, height) {
            Window_Base.prototype.initialize.call(this, x, y, width, height);
            this._doll = null;
            this._dollSprite = new Sprite();  
            this._dollSprite.x = 10
            this._dollSprite.y = 10;
            this.maxpage = 6;
            this._page =0;
            this.addChildToBack(this._dollSprite);
            this.refresh();
        };

        Window_DollInfo.prototype.setDoll = function(doll) {
            if(doll){
                if (this._doll !== doll) {
                    this._doll = doll;
                    this._doll.item  =  $dataArmors[this._doll.itemId];
                    this.setSprite();
                    this.refresh();
                }
            }
        };

        Window_DollInfo.prototype.ChangePage = function(value){
            this._page += value;
            if(this._page > this.maxpage)
                this._page = 0;
            if(this._page < 0)
                this._page =this.maxpage;
        }

        Window_DollInfo.prototype.setSprite = function(){
            this._dollSprite.bitmap = ImageManager.loadBitmap("img/Dolls/",this._doll.iName + "Doll",0,0)
            
            if (this._dollSprite.bitmap) {
                var bitmapHeight = this._dollSprite.bitmap.height;
                var contentsHeight = this.contents.height;
                var scale = 1;
                if (bitmapHeight > contentsHeight) {
                    scale = contentsHeight / bitmapHeight;
                }
                this._dollSprite.height = 64;
                this._dollSprite.width = 64;
            }
        }

        Window_DollInfo.prototype.refresh = function() {
            this.contents.clear();
            
            if(!this._doll) 
                return;
        
            this.changeTextColor(this.textColor(0));
            this.contents.fontSize = 18;
            this.drawText(this._doll.Name , 70, 0, 200);
            this.changeTextColor(this.textColor(14));
            this.contents.fontSize = 14;
            this.drawText(this._doll.Title , 70, 20 + 4, 200);

            switch(this._page){
                case 0:
                    this.DrawMain();
                    break;
                case 1:
                    this.DrawSkills();
                    break;
                case 2:
                    this.DrawCombination();
                    break;
                case 3:
                    this.DrawEquips();
                    break;
                case 4:
                    this.DrawStats();
                    break;
                case 5:
                    this.DrawStates();
                    break;
                case 6:
                    this.DrawElements();
                    break;
            }
        };

        Window_DollInfo.prototype.DrawMain = function(){
            this.changeTextColor(this.textColor(1));
            this.contents.fontSize = 18;
            this.drawText("Description" , 0, 60, 200);
            this.drawTextEx( this._doll.Description.join("\n") , 0, 86 ,14,3);
        };

        Window_DollInfo.prototype.DrawSkills = function(){
            this.changeTextColor(this.textColor(1));
            this.contents.fontSize = 18;
            this.drawText("Skill List" , 0, 60, 200);
            i = 0;

            for(j = 0; j <  this._doll.item.traits.length; j++){
            var trait =  this._doll.item.traits[j];
            
                if (trait.code == 43) {
                    this.changeTextColor(this.textColor(17));
                    this.contents.fontSize = 16;
                    var skill = $dataSkills[trait.dataId];
                    this.drawIcon(skill.iconIndex, 0, 60 + i + 8);
                    this.drawText(skill.name , 40, 60 + i, 200);
                    this.drawTextEx(skill.description,40,80 + i + 8, 14,6);
                    i+=40;
               
                    var notePattern = /(?:<desc>)((?:.|\s)*)(?:<\/desc>)/i;
                    text = skill.note.match(notePattern);
                    if ( text !== null){
                            this.drawTextEx(text[1],40,80 + i + 12, 14,6);
                            i+=52;
                    }
                };
                i+=28;
            }
        }

        Window_DollInfo.prototype.DrawCombination = function(){
            this.changeTextColor(this.textColor(1));
            this.contents.fontSize = 18;
            this.drawText("Combination List" , 0, 60, 200);
           
            var i = 8;

            for(j = 0; j <  this._doll.givesExtra.length; j++){
               
                var DollCombi = this._doll.givesExtra[j];
                var Doll = $gameSystem.GetDoll(DollCombi.Doll)

                if ($gameSystem.DollGet(Doll) == false){
                    continue;
                }

                this.changeTextColor(this.textColor(5));
                this.contents.fontSize = 16;
                this.drawText(Doll.Name , 0, 80+i, 200);

                var skill = $dataSkills[DollCombi.Skill];
                this.changeTextColor(this.textColor(17));
                this.contents.fontSize = 16;

                this.drawIcon(skill.iconIndex, 0, 100 + 16+i);
                this.drawText(skill.name , 40, 100+ i +4 , 200);
                this.drawTextEx(skill.description,40,128+i, 14,6);
            
                i += 88;
            }

        }

        Window_DollInfo.prototype.DrawEquips = function(){
            this.changeTextColor(this.textColor(1));
            this.contents.fontSize = 18;
            this.drawText("Special Character Skill" , 0, 60, 200);
           
            var i = 8;

            for(j = 0; j <  this._doll.actorCombiners.length; j++){
               
                var DollCombi = this._doll.actorCombiners[j];
                var Actor =$dataActors[DollCombi.ActorId];
                
                var find = false;
                for(var b =0; b < $gameParty._actors.length; b++){
                    if($gameParty._actors[b] ===DollCombi.ActorId){
                        find = true;
                        break;
                    }
                }
                
                if(find === false){continue;}

                this.changeTextColor(this.textColor(5));
                this.contents.fontSize = 16;
                this.drawText(Actor.name , 0, 80+i, 200);

                var skill = $dataSkills[DollCombi.Skill];
                this.changeTextColor(this.textColor(17));
                this.contents.fontSize = 16;

                this.drawIcon(skill.iconIndex, 0, 100 + 16+i);
                this.drawText(skill.name , 40, 100+ i +4 , 200);
                this.drawTextEx(skill.description,40,128+i, 14,6);
            
                i += 88;
            }
        }

        Window_DollInfo.prototype.DrawStats = function(){
            this.changeTextColor(this.textColor(1));
            this.contents.fontSize = 18;
            this.drawText("Stats" , 0, 60, 200);

            var x = this.textPadding();
            y = 60;

            for (var i = 0; i < 8; i++) {
                if(i % 2 === 0){
                    x = this.textPadding();
                    y += 40;
                }
                else
                    x += 240;
                
                this.contents.fontSize = 14;
         
                //this.contents.fillRect(x, y+3, 200, 34,'#53a38d');
                this.changeTextColor(this.textColor(17));
                this.drawIcon( $ParamIcons[i], x + 4, y + 4);
                this.drawText(TextManager.param(i), x + 44 , y + 2, 160);
                this.resetTextColor();

                var val = this._doll.item.params[i];

                if(val === 0)
                    this.changeTextColor(this.textColor(0))
                else if(val >= 1)
                    this.changeTextColor(this.textColor(3))
                else
                    this.changeTextColor(this.textColor(18))

                this.drawText(val, x + 90, y +2 , 60, 'right');
            }
        }

    Window_DollInfo.prototype.DrawElements = function(){
        var elements = $dataSystem.elements;
        var x = this.textPadding();
             
        var y = 60;
        this.changeTextColor(this.textColor(1));
        this.contents.fontSize = 18;
        this.drawText("Elements" , 0, y, 200);
        this.contents.fontSize = 14;
        
        for(var i = 1; i < elements.length; i++){
            if(i % 2 !== 0){
                x = this.textPadding();
                y += 40;
            }
            else
                x += 240;
                
            //this.contents.fillRect(x, y+3, 200, 34,'#53a38d');
            this.changeTextColor(this.textColor(17));
            this.drawIcon( $ElementIcons[i], x + 4, y + 4);
            this.drawText(elements[i], x + 44 , y + 2, 160);
            
            var val = 100;
                 this.resetTextColor();

            this.changeTextColor(this.textColor(0))
            for(var j = 0; j < this._doll.item.traits.length; j++){
                var element = this._doll.item.traits[j];
                if(element.code == 11 && element.dataId == i){
                    val = element.value * 100;

                    if(val === 100)
                       this.changeTextColor(this.textColor(0))
                    else if(val >= 101)
                       this.changeTextColor(this.textColor(18))
                    else
                       this.changeTextColor(this.textColor(3))
                }
            }

            this.drawText(val  + "%", x + 120, y +2 , 60, 'right');
        }    
    }

    Window_DollInfo.prototype.DrawStates = function(){
        var x = this.textPadding();     
        var y = 60;
        this.changeTextColor(this.textColor(1));
        this.contents.fontSize = 18;
        this.drawText("States" , 0, y, 200);
        this.contents.fontSize = 14;
        var i =0;
        this.changeTextColor(this.textColor(0))
        for(var j = 0; j < this._doll.item.traits.length; j++){
            var state = this._doll.item.traits[j];

            if(state.code == 13){
                var rState = $dataStates[state.dataId];

                if(i % 2 === 0){
                    x = this.textPadding();
                    y += 40;
                }
                else
                x += 240;
            
                i++;
                this.contents.fontSize = 14;

                this.changeTextColor(this.textColor(17));
                this.drawIcon( rState.iconIndex, x + 4, y + 4);
                this.drawText(rState.name, x + 44 , y + 2, 160);
     
                val = state.value * 100;

                if(val === 100)
                   this.changeTextColor(this.textColor(0))
                else if(val >= 101)
                   this.changeTextColor(this.textColor(18))
                else
                   this.changeTextColor(this.textColor(3))

                 this.drawText(val  + "%", x + 120, y +2 , 60, 'right');
            }
        }

        y += 40;
        this.changeTextColor(this.textColor(1));
        this.contents.fontSize = 18;
          
        this.drawText("States Immunity" , 0, y, 200);
        this.contents.fontSize = 14;
        var i =0;
        this.changeTextColor(this.textColor(0))
        for(var j = 0; j < this._doll.item.traits.length; j++){
            var state = this._doll.item.traits[j];
            if(state.code == 14){
                var rState = $dataStates[state.dataId];

                if(i % 2 === 0){
                    x = this.textPadding();
                    y += 40;
                }
                else
                    x += 240;
                i++;
                this.contents.fontSize = 14;
                this.changeTextColor(this.textColor(17));
                this.drawIcon( rState.iconIndex, x + 4, y + 4);
                this.drawText(rState.name, x + 44 , y + 2, 160);
            }
        }          
    }


    Window_Base.prototype.drawTextEx = function(text, x, y, fontSize, fontColor) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };

            this.resetFontSettings();

            if(fontColor )//|| fontColor != 0)
                this.changeTextColor(this.textColor(fontColor));

            if(fontSize )//|| fontColor != 0)
                  this.contents.fontSize = fontSize;

            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };


    var _Game_Actor_Equip = Game_Actor.prototype.changeEquip;


    Game_Actor.prototype.DollSkillNew = function(slot, item , remove){
        var doll;
        var notePattern = /<dollid (\d)>/i;

        var nitem = $dataArmors[item.baseItemId];
        text = nitem.note.match(notePattern);
        if ( text !== null){
           doll = $gameSystem.GetDoll(Number(text[1]));
        }

        if (doll != null)
        {
            for(j = 0; j <  doll.actorCombiners.length; j++){
                var DollCombi = doll.actorCombiners[j];
                if (this._actorId == DollCombi.ActorId){
                    if (remove == false)
                        this.learnSkill(DollCombi.Skill)
                    else
                        this.forgetSkill(DollCombi.Skill)
                }

            }

            var otherItem = this.equips()[slot];  
            var odoll;
            if(otherItem != null )
            {
                var oitem = $dataArmors[otherItem.baseItemId];
                otext = oitem.note.match(notePattern);
                if ( otext !== null){
                    odoll = $gameSystem.GetDoll(Number(otext[1]));
                }

                for (var j =0; j < doll.givesExtra.length;j++){
                    var DollCombi = doll.givesExtra[j];
                
                
                    if(odoll._Id == DollCombi.Doll)
                    {
                        if (remove == false)
                            this.learnSkill(DollCombi.Skill)
                        else
                            this.forgetSkill(DollCombi.Skill)

                    }
                }

            }
        }    
    }

    Game_Actor.prototype.changeEquip = function(slotId, item) {
        var old_item = this.equips()[slotId];  
    
        console.log(this.name)

        if (item == null){
            if(DataManager.isArmor(old_item) && old_item.atypeId == Frysning_Dolls.Parameters["aType"]){
                if (slotId == Frysning_Dolls.Parameters["eSlot1"] ) { //SLOT VAR
                    this.DollSkillNew(Frysning_Dolls.Parameters["eSlot2"], old_item, true);
                }
                else if(slotId == Frysning_Dolls.Parameters["eSlot2"]){
                    this.DollSkillNew(Frysning_Dolls.Parameters["eSlot1"], old_item, true);
                }
            }
        }
        else if (item != null && old_item != null && old_item != item){
            if(DataManager.isArmor(old_item) && old_item.atypeId ==  Frysning_Dolls.Parameters["aType"]){
                if (slotId == Frysning_Dolls.Parameters["eSlot1"]){ 
                    this.DollSkillNew(Frysning_Dolls.Parameters["eSlot2"], old_item,true)
                    this.DollSkillNew(Frysning_Dolls.Parameters["eSlot2"], item,false)
                }
                else if (slotId == Frysning_Dolls.Parameters["eSlot2"])
                {
                    this.DollSkillNew(Frysning_Dolls.Parameters["eSlot1"], old_item,true)
                    this.DollSkillNew(Frysning_Dolls.Parameters["eSlot1"], item,false)
                }
            }
        }
        else
        {
            if(DataManager.isArmor(item) && item.atypeId ==  Frysning_Dolls.Parameters["aType"]){
                if (slotId ==  Frysning_Dolls.Parameters["eSlot1"]) 
                    this.DollSkillNew(Frysning_Dolls.Parameters["eSlot2"], item, false)
                else if (slotId == Frysning_Dolls.Parameters["eSlot2"])
                    this.DollSkillNew(Frysning_Dolls.Parameters["eSlot1"], item, false)  
            }
        }  
        
        _Game_Actor_Equip.call(this, slotId, item);    
    };
      



})();


