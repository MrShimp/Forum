var DogSprite = cc.Sprite.extend({
  disappearAction:null,
  touchListener : null,
  index : null,

  onEnter:function(){
    cc.log("OnEnter");
    this._super();
		//this.disappearAction = this.createDisappearAction();
		//this.disappearAction.retain();

		this.addTouchEventListenser();
  },

  onExist:function(){
    cc.log("OnExit");
    //this.disappearAction.release();
		this._super();
  },

  addTouchEventListenser:function(){
     this.touchListener = cc.EventListener.create({
         event: cc.EventListener.MOUSE,
         // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
         swallowTouches: true,
         //onTouchBegan event callback function

         onTouchMove : function(event){
           var target = event.getCurrentTarget();
           //var var pos = touch.getLocation();
           console.log("this touches the item");

         },

         onTouchBegan: function (touch, event) {
             var pos = touch.getLocation();
             var target = event.getCurrentTarget();
             if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
               target.removeTouchEventListenser();
               cc.log("pos.x="+pos.x+",pos.y="+pos.y);

               cc.log("touched");
     					 var seqAc = cc.Sequence.create( cc.CallFunc.create(function () {
       				   cc.log("callfun........");
       				   target.getParent().addScore(1);
       					 target.getParent().removeAnimalsByIndex(target.index - 1);
       					 target.removeFromParent();
               },target) );

     					 target.runAction(seqAc);
               return true;
             }
             return false;
         }

    });
    cc.eventManager.addListener(this.touchListener,this);
  },

  removeTouchEventListenser:function(){
		cc.eventManager.removeListener(this.touchListener);
	}
});


var DogListener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
      swallowTouches: true,
      //onTouchBegan event callback function
      onTouchMoved : function(event){
        var target = event.getCurrentTarget();
        //var var pos = touch.getLocation();
        console.log("this touches the item");

      },
      onTouchBegan: function (touch, event) {
          var pos = touch.getLocation();
          var target = event.getCurrentTarget();
          if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
            var seqAc = cc.Sequence.create( cc.CallFunc.create(function () {

              target.getParent().addScore(1);
              target.getParent().removeAnimalsByIndex(target.index - 1);
              target.removeFromParent();
            },target) );

            target.runAction(seqAc);
            return true;
          }
          return false;
    }

});
