var StartLayer = cc.Layer.extend({
    bgSprite:null,
	  label:null,
	  coinnumber:0,
	  DogSprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        var animals_number = 5;
        this.DogSprite = [];
        //this.schedule(this.update,1,16*1024,1);
        this.addUserInterface();
        this.addAnimals(animals_number);
        return true;
    },

    update : function(){
      this.addAnimals();
      //this.removeAnimals();
    },

    //this is the menu
    addUserInterface : function(){
      var size = cc.winSize;

      // add bg
      this.bgSprite = new cc.Sprite(res.BackGround_png);
      this.bgSprite.attr({
         x: size.width/2,
         y: size.height/2,
      });
      this.addChild(this.bgSprite, 0);

      //character
      this.UserInfo = new cc.Sprite(res.UserIconId_png);
      //this.MainCharacter.setScale(0.25);
      this.UserInfo.attr({
        scale:0.2,
        x : 55,
        y : 550,
      });
      this.addChild(this.UserInfo, 1);

      this.UserCoin = new cc.Sprite(res.CoinIcon_png);
      this.UserCoin.attr({
        x : 110,
        y : 550,
      });
      this.coinnumber = 1400;
      this.label = cc.LabelTTF.create(this.coinnumber, "Arial", 20);
      this.label.setColor(new cc.Color(255,215,0,255));
      this.label.setPosition( 170, 550);
      this.addChild(this.label, 1);
      this.addChild(this.UserCoin, 1);

      //add list of buttons

      var MenuItem_Shop = new cc.MenuItemImage(
        MenuButtonItems.MenuItem_Shop_NotClick,
        MenuButtonItems.MenuItem_Shop_Clicked,
        this.menuItemStartCallback,this);
      MenuItem_Shop.x = size.width-240;
      MenuItem_Shop.y = 550;
      MenuItem_Shop.scale = 0.75;

      var MenuItem_List = new cc.MenuItemImage(
        MenuButtonItems.MenuItem_List_NotClick,
        MenuButtonItems.MenuItem_List_Clicked,
        this.menuItemStartCallback,this);
      MenuItem_List.x = size.width-170;
      MenuItem_List.y = 550;
      MenuItem_List.scale = 0.75;

      var MenuItem_Setting = new cc.MenuItemImage(
        MenuButtonItems.MenuItem_Setting_NotClick,
        MenuButtonItems.MenuItem_Setting_Clicked,this.menuItemStartCallback,this);

        MenuItem_Setting.x = size.width-100;
        MenuItem_Setting.y = 550;
        MenuItem_Setting.scale = 0.75;

      var MenuItem_Bag = new cc.MenuItemImage(
        MenuButtonItems.MenuItem_Bag_NotClick,
        MenuButtonItems.MenuItem_Bag_Clicked,this.menuItemStartCallback,this);
      MenuItem_Bag.x = size.width-310;
      MenuItem_Bag.y = 550;
      MenuItem_Bag.scale = 0.75;

      var mu = new cc.Menu(MenuItem_Bag,MenuItem_Shop, MenuItem_List, MenuItem_Setting);
      mu.x = 0;
      mu.y = 0;
      cc.eventManager.addListener(MenuListener_Shop, MenuItem_Shop);
      this.addChild(mu);
      //this.addChild(MenuItem_Shop);
      //this.addChild(MenuItem_List);
      //this.addChild(MenuItem_Setting);

    },
    menuItemStartCallback:function (sender) {
       cc.log("menuItemStartCallback!");
    },

    addAnimals : function(nums){
      for(var i=0;i<nums;i++){
        var name = "img/lamb/10"+i+".png";
        var dogs = new cc.Sprite(name);
        var size = cc.winSize;

        var x = size.width/2-200+dogs.width/2+200*cc.random0To1();
        var y = size.height/2+dogs.height/2+200*cc.random0To1()-150;
        dogs.attr({
          x : x,
          y : y,
        });
        this.DogSprite.push(dogs);
        dogs.index = this.DogSprite.length;
        cc.eventManager.addListener(DogListener.clone(), dogs);
        this.addChild(dogs);
      }

    },

    addScore : function(id){
      switch(id){
        case 1:
          this.coinnumber += 100;
          this.label.setString(this.coinnumber);
          break;
        case 2:
          this.coinnumber += 400;
          this.label.setString(this.coinnumber);
          break;
        case 3:
          this.coinnumber += 800;
          this.label.setString(this.coinnumber);
          break;
        case 4:
          this.coinnumber += 1000;
          this.label.setString(this.coinnumber);
          break;
      }

    },

    removeAnimalsByIndex : function(dx){
      if(isNaN(dx)||dx>this.DogSprite.length){return false;}
  		for(var i=0,n=0;i<this.length;i++)
  		{
  			if(this.DogSprite[i]!=this[dx])
  			{
  				cc.log("--------------");
  				this.DogSprite[n++]=this.DogSprite[i]
  			}
  		}
  		this.DogSprite.length-=1
  	},

    removeAnimals : function() {
  		for (var i = 0; i < this.DogSprite.length; i++) {
  			cc.log("removeSushi.........");
  			if(-30 == this.DogSprite[i].y) {
  				cc.log("==============remove:"+i);
  				this.DogSprite[i].removeFromParent();
  				this.DogSprite[i] = undefined;
  				this.DogSprite.splice(i,1);
  				i= i-1;
  			}
  		}
  	}

});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.view.resizeWithBrowserSize(true);
        var layer = new StartLayer();
        this.addChild(layer);
    }
});
