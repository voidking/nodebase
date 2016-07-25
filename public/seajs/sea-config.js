seajs.config({
    base: window.host + '/',
    alias: {
    	// 手动CMD模块化文件，放在seajs文件夹中
        'jquery': 'seajs/jquery/jquery.min.js',
        'layer': 'seajs/layer/layer.js',
        'laypage': 'seajs/laypage/laypage.js',
        'imagecropper': 'seajs/imagecropper/imagecropper.js',
        'jquery-browser': 'seajs/qqface/js/jquery-browser.js',
        'qqface': 'seajs/qqface/js/jquery.qqFace.js',
        'baidu-map': 'seajs/map/api.map.js',
        'socketio': 'seajs/socket.io-client/socket.io.js',
        'test': 'seajs/test/test.js',

        // 遵循CMD模块化文件，放在bower_components中
        'template': 'art-template/dist/template.js',
        'template-native': 'art-template/dist/template-native.js',
        'bootstrap': 'bootstrap/dist/js/bootstrap.min.js',
        'swiper': 'Swiper/dist/js/swiper.min.js'
    }//,
    //preload: ['jquery']
});
