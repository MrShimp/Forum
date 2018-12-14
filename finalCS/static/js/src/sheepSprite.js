var animationLayer = null;
var AnimationLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.initDate();
    },

    initDate: function(){
        animationLayer = this;
    },

    playBoomEffect: function(pos){
        var beginNum = 1;
        var EndNum = 8;

        var anim = new cc.Animation();
        anim.setDelayPerUnit(0.1);
        for (var i = beginNum; i <= EndNum; i++)
        {
            anim.addSpriteFrameWithFile("res/boom"+i+".png")
        }

        var sp = new cc.Sprite();
        sp.setPosition(pos);
        this.addChild(sp);
        sp.runAction(cc.sequence(cc.animate(anim), cc.fadeOut(0.2)));
    }

});
