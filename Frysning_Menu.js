  

   var $dataDolls = null;
    DataManager._databaseFiles.push({ name: '$dataDolls',
                                  src: 'Dolls.json'});
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

        this._page =0;
        this.addChildToBack(this._dollSprite);
        this.refresh();
    };

    Window_DollInfo.prototype.setDoll = function(doll) {
        if(doll)
        if (this._doll !== doll) {
            this._doll = doll;
            this._doll.item  =  $dataArmors[this._doll.itemId];
            this.setSprite();
            this.refresh();
        }
    };


    Window_DollInfo.prototype.ChangePage = function(value)
    {
        this._page += value;
        if(this._page > 5)
            this._page = 0;
        if(this._page < 0)
            this._page =5;
    }

    Window_DollInfo.prototype.setSprite = function()
    {
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

        switch(this._page)
        {
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
        i = 0;
        i+=48;   
          for(j = 0; j <  this._doll.givesExtra.length; j++){
           
            var DollCombi = this._doll.givesExtra[j];
            var Doll = $gameSystem.GetDoll(DollCombi.Doll)


            this.changeTextColor(this.textColor(5));
            this.contents.fontSize = 16;
            this.drawText(Doll.Name , 0, 80 + i, 200);

            var skill = $dataSkills[DollCombi.Skill];
            this.changeTextColor(this.textColor(17));
            this.contents.fontSize = 16;

            this.drawIcon(skill.iconIndex, 0, 100 + i + 8);
            this.drawText(skill.name , 40, 100 + i, 200);
            this.drawTextEx(skill.description,40,120 + i + 8, 14,6);

            i+=28;
          }

    }

    Window_DollInfo.prototype.DrawEquips = function(){
      this.changeTextColor(this.textColor(14));
        this.contents.fontSize = 14;
        this.drawText("DrawEquips" , 0, 60, 200);
    }

    Window_DollInfo.prototype.DrawStats = function(){
      this.changeTextColor(this.textColor(14));
        this.contents.fontSize = 14;
        this.drawText("DrawStats" , 0, 60, 200);
    }


    Window_DollInfo.prototype.DrawStates = function(){
      this.changeTextColor(this.textColor(14));
        this.contents.fontSize = 14;
        this.drawText("DrawStates" , 0, 60, 200);
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

})();