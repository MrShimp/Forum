cc.setResize = function(){

    var _frameSize = cc.view.getFrameSize();
    cc.log(1);
    if(cc.view.isRetinaEnabled())
    {
        _frameSize =cc.size( _frameSize.width * 2, _frameSize.height*2);
    }

    var currentAspectRatio = _frameSize.width/_frameSize.height;
    var originalAspectRatio = cc.m_resolutionSize.width/cc.m_resolutionSize.height;

    if(currentAspectRatio>originalAspectRatio)
    {
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.FIXED_HEIGHT);
        cc.view.setDesignResolutionSize(cc.m_resolutionSize.width, cc.m_resolutionSize.height, policy);
    }
    if(currentAspectRatio<=originalAspectRatio)
    {
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.FIXED_WIDTH);
        cc.view.setDesignResolutionSize(cc.m_resolutionSize.width, cc.m_resolutionSize.height, policy);
    }

    cc.m_currentAndOrignalRatioX = _frameSize.width/cc.winSize.width;
    cc.m_currentAndOrignalRatioY = _frameSize.height/cc.winSize.height;

};


cc.game.onStart = function(){
    cc.m_resolutionSize = cc.size(800,600);
    cc.m_currentAndOrignalRatioX = 0;
    cc.m_currentAndOrignalRatioY = 0;

    cc.view.adjustViewPort(true);

    cc.view.resizeWithBrowserSize(true);

    cc.setResize();

    cc.view.setResizeCallback(function() {
        cc.setResize();
        var _frameSize = cc.view.getFrameSize();

        if(cc.view.isRetinaEnabled())
        {
            _frameSize =cc.size( _frameSize.width * 2, _frameSize.height*2);
        }
        cc.m_ingameLayer.setPosition(cc.p(_frameSize.width/2/cc.view.getScaleX() , _frameSize.height/2 /cc.view.getScaleY()));
        for(var i = 0; i < cc.m_ingameLayer._children.length; i++)
        {
            var _position =  cc.m_ingameLayer.Point(cc.m_ingameLayer._children[i]._originalPosition);
            cc.m_ingameLayer._children[i].setPosition(_position);
        }
    });

    var g_resources = g_resources || [];
    cc.LoaderScene.preload(g_resources, function () {

        cc.director.runScene(new StartScene());
    }, this);

};
cc.game.run();
