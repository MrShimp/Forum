var OptionLayer = cc.LayerColor.extend({
    listener:null,
    ctor:function(){
        this._super(cc.color(250,250,250,180),1800,960);
        //使得下层的点击事情无效
        cc.log("into the OptionLayer");
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchEnded: function (touch, event) {
            }
        });

        cc.eventManager.addListener(this.listener, this);
        //add my own UI
        var size = cc.winSize;

        var background = new cc.Sprite(Shop_pop_item.Shop_Background);
        background.setPosition(size.width/2,size.height/2);
        this.addChild(background,0);
        this.addShoppingList();

    },


    addShoppingList : function(){
      var num = 10;
      var size = cc.winSize;
      var posx = size.width/2-300;
      var posy = size.height/2+80;
      for(var i=0;i<10;i++){
        var name = "img/Shop_pop/item"+(i+10)+"__50p.png";
        this.makeListItem(name,posx,posy);
        posx+=150;
        if(i==4){
          posy-=150;
          posx = size.width/2-300;
        }
      }
      var goleft = new cc.Sprite(Shop_pop_item.go_left);
      var goright = new cc.Sprite(Shop_pop_item.go_right);
      goleft.setPosition(size.width/2-120,size.height/2-200);
      goright.setPosition(size.width/2+40,size.height/2-200);
      goleft.setScale(0.75);
      goright.setScale(0.75);
      var goback = new cc.Sprite(Shop_pop_item.closetag);
      goback.setPosition(size.width/2-40,size.height/2-200);
      this.addChild(goback);
      this.addChild(goleft);
      this.addChild(goright);
      var self = this;
      var btnListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                target.setOpacity(255);
                if(target ==  goback){
                    //target.getParent().getParent().removeChild(layer);
                    self.destory();
                }
                console.log("logged!:"+(++self.num));
            }
        });
        cc.eventManager.addListener(btnListener, goback);

    },



    makeListItem : function(a,x,y){
      var back = new cc.Sprite(Shop_pop_item.item_Background);
      var front = new cc.Sprite(a);
      var cointag = new cc.Sprite(Shop_pop_item.cointag);
      var price = 200;
      var pricelabel = cc.LabelTTF.create(price,"Arial",15);

      back.setPosition(x,y);
      front.setPosition(x,y);
      back.setScale(0.75);
      //front.setScale(0.75);
      cointag.setPosition(x-20,y-80);
      cointag.setScale(0.75);
      pricelabel.setPosition(x+30,y-80);
      this.addChild(back);
      this.addChild(front,1);
      this.addChild(cointag);
      this.addChild(pricelabel);

    },

    destory:function(){
        console.log("Optionlayer gone.");
        //BaseLayer.prototype.destory.apply(this,arguments);
        cc.eventManager.removeListener(this.btnListener);
        //this.removeChild();
        this.removeFromParent();
        cc.eventManager.removeListener(this.listener);
    }


});

var MenuListener_Option = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
    swallowTouches: true,
    //onTouchBegan event callback function
    onTouchBegan: function (touch, event) {
        var pos = touch.getLocation();
        var target = event.getCurrentTarget();
        if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {

          var seqAc = cc.Sequence.create( cc.CallFunc.create(function () {
            var layer = new OptionLayer();
            target.getParent().getParent().addChild(layer);
          },target) );

          target.runAction(seqAc);
          return true;
        }
        return false;
      }
});
