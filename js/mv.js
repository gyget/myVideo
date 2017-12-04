/**
 * Created by gengliangxiang on 2017/11/17.
 */


var musicPlayMV = {
    // 播放数据存储的对象
    zmMvTemp: null,
    // 判断是否全屏状态
    isMVFullScreen: false,
    // 当前播放时间，用于判断字幕显示
    curTime: 0,
    // 是否开启弹幕判断依据
    isBulletScreen: true,
    // 判断是否静音
    isSilent: false,
    // 页面打开初始化的播放
    initPlay:function () {
        setTimeout(function () {
            var thisPlay = $('.left-middle li:eq(0)');
            musicPlayMV.MVListFn(thisPlay.attr('data-id'));
        },140);
    },
    // 获取浏览器窗口大小
    getWH:function () {
        // 获取窗口宽度
        var winWidth, winHeight;
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        // 获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        // 通过深入 Document 内部对 body 进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
            winHeight = document.documentElement.clientHeight;
            winWidth = document.documentElement.clientWidth;
        }
        return {h: winHeight, w: winWidth};
    },
    // 检测浏览器窗口变化
    settingWindowSize:function () {
        musicPlayMV.settingSize();
        window.onresize = function(){
            var checkFull = musicPlayMV.checkFullScreen();
            musicPlayMV.settingSize();
            if(!checkFull){
                musicPlayMV.mvExitFullScreen();
            }
        };
    },
    // 设置窗口大小
    settingSize:function () {
        var mvTitle = $('.mv-index');// 包含整个页面的盒子
        var mvMain = $('.MVMain');
        var mvLyricBox = $('.MVContent-right');// 右侧歌词框
        var mvVideo = $('.MVContent-middle');// 中间video
        var mvCategoryBox = $('.MVContent-left');// 左侧list列表
        var mvFooterPro = $('.footer .progressBar');// 底部播放进度
        var size = musicPlayMV.getWH();// 获取浏览器宽高
        var mvListName = mvCategoryBox.find('.mv-name');// mv列表里的mv名
        // mv左侧目录列表在不同宽度设置mvName的最大显示长度
        size.w < 1180 ? mvListName.addClass('mvNameMin') : mvListName.removeClass('mvNameMin');
        mvTitle.width(size.w).height(size.h);
        mvFooterPro.width(size.w - 470);
        // 根据浏览器宽度对应不同设置判断
        switch (true){
            case size.h > 1080 :
                mvTitle.height(1080);
                mvMain.height(926)
                    .find('.left-middle').height(654).end()
                    .find('.mvLyric').height(649).end()
                    .find('.MVContent').height(917).end()
                    .find('.MVContent-left').height(917).end()
                    .find('.songContent').height(564).end()
                    .find('.MVContent-middle').height(917);
                break;
            case size.h <= 1080 && size.h >= 768 :
                mvMain.height(902 - (1080 - size.h))
                    .find('.left-middle').height(652 - (1080 - size.h)).end()
                    .find('.mvLyric').height(647- (1080 - size.h)).end()
                    .find('.MVContent').height(905 - (1080 - size.h)).end()
                    .find('.MVContent-left').height(905 - (1080 - size.h)).end()
                    .find('.songContent').height(562- (1080 - size.h)).end()
                    .find('.MVContent-middle').height(905 - (1080 - size.h));
                break;
            case size.h < 768 :
                mvTitle.height(768);
                mvMain.height(606)
                    .find('.left-middle').height(332).end()
                    .find('.mvLyric').height(343).end()
                    .find('.MVContent').height(595).end()
                    .find('.MVContent-left').height(595).end()
                    .find('.songContent').height(242).end()
                    .find('.MVContent-middle').height(595);
                break;
        }
        switch (true){
            case size.w > 1920 :
                mvFooterPro.width(1450);
                mvVideo.width(1290);
                mvLyricBox.width(318);
                mvCategoryBox.width(230);
                break;
            case size.w >= 1520 && size.w <= 1920 :
                mvVideo.width(size.w - 630);
                mvLyricBox.width(318);
                mvCategoryBox.width(230);
                break;
            case size.w >= 1480 && size.w < 1520 :
                mvVideo.width(890);
                mvLyricBox.width(318 - (1520 - size.w));
                mvCategoryBox.width(230);
                break;
            case size.w >= 1450 && size.w < 1480 :
                mvVideo.width(890);
                mvLyricBox.width(282);
                mvCategoryBox.width(230 - (1480 - size.w));
                break;
            case size.w >= 1410 && size.w < 1450 :
                mvVideo.width(890);
                mvLyricBox.width(282 - (1450 - size.w));
                mvCategoryBox.width(200);
                break;
            case size.w >= 1310 && size.w < 1410 :
                mvVideo.width(890 - (1410 - size.w));
                mvLyricBox.width(242);
                mvCategoryBox.width(200);
                break;
            case size.w >= 1290 && size.w < 1310 :
                mvVideo.width(790);
                mvLyricBox.width(242 - (1310 - size.w));
                mvCategoryBox.width(200);
                break;
            case size.w >= 1270 && size.w < 1290 :
                mvVideo.width(790);
                mvLyricBox.width(222);
                mvCategoryBox.width(200 - (1290 - size.w));
                break;
            case size.w >= 1180 && size.w < 1270 :
                mvVideo.width(790 - (1270 - size.w));
                mvLyricBox.width(222);
                mvCategoryBox.width(180);
                break;
            case size.w >= 1150 && size.w < 1180 :
                mvVideo.width(700);
                mvLyricBox.width(222);
                mvCategoryBox.width(180 - (1180 - size.w));
                break;
            case size.w >= 1130 && size.w < 1150 :
                mvVideo.width(700);
                mvLyricBox.width(222 - (1150 - size.w));
                mvCategoryBox.width(150);
                break;
            case size.w >= 1024 && size.w < 1130 :
                mvVideo.width(700 - (1130 - size.w));
                mvLyricBox.width(200);
                mvCategoryBox.width(150);
                break;
            case size.w < 1024 :
                mvTitle.width(1024);
                mvFooterPro.width(554);
                mvVideo.width(600);
                mvLyricBox.width(200);
                mvCategoryBox.width(150);
                break;
        }
    },
    // 弹幕调用方法
    bulletScreen:{
        // 点击发送按钮发送弹幕
        clickBtn:function () {
            $(document).on('click', '.mvBarrage .mvBarrageBtn', function () {
                var $this = $(this);
                // 点击发送获取弹幕框内容
                var bulletScreenContent = $this.siblings('textarea');
                var txt = bulletScreenContent.val();
                // 判断弹幕内容不能为空的时候才能发送
                if(bulletScreenContent.val().trim() !== ''){
                    // 调用发送弹幕方法
                    musicPlayMV.bulletScreen.valSpan(txt);
                    // 发送完毕清空弹幕文本框
                    bulletScreenContent.val('');
                }else {
                    // 情况弹幕框的空字符
                    bulletScreenContent.val('');
                }
            });
        },
        // 回车键发送弹幕
        keyUpEnter:function () {
            //  回车发送弹幕框内容
            $(document).on('keyup', '.mvBarrage textarea' ,function (event) {
                // 判断弹幕内容不能为空的时候才能发送
                if(event.keyCode === 13 && $(this).val().trim() !== ''){
                    // 调用发送弹幕方法
                    musicPlayMV.bulletScreen.valSpan($(this).val());
                    // 发送完毕清空弹幕文本框
                    $(this).val('');
                }else if(event.keyCode === 13 && $(this).val().trim() === '') {
                    // 情况弹幕框的空字符
                    $(this).val('');
                }
            });
            // 在输入弹幕时BackSpace不触发视频暂停事件
            $(document).on('keydown', '.mvBarrage textarea', function () {
                if(event.keyCode === 32) {
                    event.stopPropagation();
                }
            });
            // 使用BackSpace触发视频暂停事件时切换播放按钮的图标
            $(document).on('keydown', function () {
                if(event.keyCode === 32) {
                    if($('.mvBarrage textarea')[0] != document.activeElement){
                        var mvVideo = $('video')[0];
                        // 播放、暂停切换
                        if(mvVideo.paused){
                            mvVideo.play();
                            $('.MVFooter').find('.player ').removeClass('mvPlay').addClass('mvPause');
                        }else {
                            mvVideo.pause();
                            $('.MVFooter').find('.player ').addClass('mvPlay').removeClass('mvPause');
                        }
                    }
                }
            });
        },
        //创建弹幕的span标签设置样式以及动画，txt弹幕文字
        valSpan:function (txt) {
            // 创建标签
            var valSpan = document.createElement('span');
            var MVScreen = $('.mv-video');
            // 初始top和left的值
            var randomNumber = parseInt(Math.random() * Math.floor(MVScreen.height() * 0.7 / 16));
            for(var i = 0; i < randomNumber; i++){

            }
            var randomTop = randomNumber * 16;
            var randomLeft = MVScreen.find('video').width() + 5;
            musicPlayMV.isMVFullScreen ? MVScreen.addClass('flowVisible').removeClass('flowHidden') :
                MVScreen.addClass('flowHidden').removeClass('flowVisible');
            // 设置样式，添加类样式，设置文本内容
            $(valSpan).css({
                'position': 'absolute',
                'top': randomTop + 'px',
                'left': randomLeft + 'px',
                'z-index': 2147483648
            }).addClass('bulletScreenContent').text(txt);
            // 添加到视频上
            MVScreen.append(valSpan);
            // 设置移动动画以及动画事件
            $(valSpan).animate({left: -200 + 'px'}, 10000, function () {
                // 最后删除创建的弹幕标签
                $(this).remove()
            });
        }
    },
    // 点击是否屏蔽弹幕按钮
    bulletScreenBtn:function () {
        $(document).on('click', '.settingDanMu', function () {
            var $this = $(this);
            var txtBox = $('.mvBarrage').find('textarea'); // 弹幕文本框
            if(musicPlayMV.isBulletScreen){
                musicPlayMV.isBulletScreen = false; // 关闭弹幕
                $this.closest('.mv-index').find('span.bulletScreenContent').addClass('hideImportant');// 隐藏弹幕文字
                $this.removeClass('open').addClass('off');  // 弹幕按钮图标切换
                txtBox.attr({'readonly':true, 'placeholder': '弹幕已关闭'}).val(''); // 弹幕文本框设置只读
            }else {
                musicPlayMV.isBulletScreen = true;// 开启弹幕
                $this.closest('.mv-index').find('span.bulletScreenContent').removeClass('hideImportant');// 显示弹幕文字
                $this.removeClass('off').addClass('open'); // 弹幕按钮图标切换
                txtBox.attr({'readonly':false, 'placeholder': ''}); // 弹幕文本框恢复
            }
        })
    },
    // ajax请求方法，callback是ajax请求完成后的回调函数
    playMVAjax:function (data, url, callback) {
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            data: data,
            success: function (info) {
                // 存在回调函数就执行
                if(callback){callback(info)}
            },
            error:function (err) {
                console.log(err);
            }
        });
    },
    // 播放历史和我的收藏切换
    playMVSwitcher:function () {
        // 页面初始渲染-显示播放列表 调用ajax请求
        musicPlayMV.playMVAjax({}, 'json/zm_player_mv_history.json', function (info) {
            // 调用MV列表渲染函数拿到返回值
            var html = musicPlayMV.MVListRendering(info);
            musicPlayMV.zmMvTemp = {
                type: 0,    // 当前显示播放列表
                playType: 0,    // 实际播放列表
                isSelected: true,
                playArr: info.data, // 实际播放列表的数据
                tempArr: info.data  // 临时存储列表数据
            };
            // 添加到页面
            $('div.MVContent-left').find('.left-middle ul').html(html);
            musicPlayMV.settingSize();
        });
        // 点击头部tab切换mv列表
        $(document).on('click', '.left-tab li', function (event) {
            event.stopPropagation();
            var $this = $(this);
            var MVCategoryBox = $('div.MVContent-left');// MV列表box
            var sendData, url, tabStr, isCollected;
            // 记录播放

            // 判断是否被选中，选中的有selected类
            if(!$this.hasClass('selected')){
                // 排他选中
                $this.addClass('selected').siblings().removeClass('selected');
                // 判断选择的是收藏还是历史
                if($this.index() === 1){
                    sendData = {};
                    url = 'json/musicCollectList.json';
                    tabStr = 'MV我的收藏';
                    isCollected = true;
                    musicPlayMV.zmMvTemp.type = 1;
                }else {
                    sendData = {};
                    url = 'json/zm_player_mv_history.json';
                    tabStr = 'MV播放历史';
                    isCollected = false;
                    musicPlayMV.zmMvTemp.type = 0;
                }
                // 修改头部文字
                MVCategoryBox.find('.left-top').text(tabStr);
                // 请求数据
                if(0){

                }else {
                    musicPlayMV.playMVAjax(sendData, url, function (info) {
                        // 调用MV列表渲染函数拿到返回值
                        var html = musicPlayMV.MVListRendering(info, isCollected);
                        musicPlayMV.zmMvTemp.tempArr = info.data;
                        // 数据渲染添加到页面上
                        MVCategoryBox.find('.left-middle ul').html(html);
                        var presentPlay = $('.MVContent-left').find('li[data-id="'+ musicPlayMV.zmMvTemp.playArr[musicPlayMV.zmMvTemp.playIndex].fId +'"]');
                        if(musicPlayMV.zmMvTemp.playType == musicPlayMV.zmMvTemp.type){
                            presentPlay.addClass('selected').find('.mvSort').addClass('mvPlaying').find('span').hide().end().end()
                                .siblings().removeClass('selected').find('.mvSort').removeClass('mvPlaying').find('span').show();
                        }
                        musicPlayMV.settingSize();
                    })
                }
            }
        });
    },
    // MVList渲染函数,info是ajax请求获取的数据，isCollected判断是收藏还是历史
    MVListRendering:function (info, isCollected) {
        var html = '';
        // 获取数据拼接html
        for(var i = 0; i < info.data.length; i++) {
            if(isCollected){
                // 播放历史列表的渲染结构
                html += '<li class="MVList mv-fl clearFix" data-id="' + info.data[i].fId + '">'+
                    '<div class="mvName">'+
                    '<span class="mvSort"><span>' + (i + 1) + '</span></span>'+
                    '<span class="mv-name mvNameMin txtHide" title="'+ info.data[i].fName +'">'+ info.data[i].fName +'</span>'+
                    '</div>'+
                    '<div class="hoverIcon">' +
                    '<i class="mvCollected-hover"></i>'+
                    '<i class="mvShare-hover"></i>'+
                    '<i class="mvDel-hover"></i>'+
                    '</div>'+
                    '</li>';
            }else {
                // 我的收藏列表的渲染结构
                html += '<li class="MVList mv-fl clearFix" data-id="' + info.data[i].fId + '">'+
                    '<div class="mvName">'+
                    '<span class="mvSort"><span>' + (i + 1) + '</span></span>'+
                    '<span class="mv-name mvNameMin txtHide" title="'+ info.data[i].fName +'">'+ info.data[i].fName +'</span>'+
                    '</div>'+
                    '<div class="hoverIcon">'+
                    '<i class="mvShare-hover"></i>'+
                    '<i class="mvDel-hover"></i>'+
                    '</div>'+
                    '</li>';
            }
        }
        // 返回拼接好的字符串
        return html;
    },
    // MV列表点击事件处理
    MVListClick:function () {
        $(document).on('click', 'div.MVContent-left .MVList', function () {
            // 调用mv列表播放函数
            var $this = $(this);
            musicPlayMV.zmMvTemp.playType = $this.closest('.MVMain').find('.left-tab li.selected').index();
            musicPlayMV.zmMvTemp.playArr = musicPlayMV.zmMvTemp.tempArr;
            musicPlayMV.MVListFn($this.attr('data-id'));
        })
    },
    // mv列表播放函数，playId将要播放mv的id
    MVListFn:function (playId) {
        // 判断是否被选中，已经被选中不作处理，未选中就排他选中
        var $this = $('.MVContent-left').find('li[data-id="'+ playId +'"]');
        if(musicPlayMV.zmMvTemp){
            musicPlayMV.zmMvTemp.playArr.forEach(function (v,i) {
                if(playId == v.fId){
                    musicPlayMV.zmMvTemp.playIndex = i;
                }
            });
        }
        musicPlayMV.playMVAjax({}, 'json/mvDanMu.json', function (info) {
            musicPlayMV.zmMvTemp.danMu = info.data;
        });
        // 在下一个视频播放前移除掉上一个视频的弹幕
        $('.mv-index').find('span.bulletScreenContent').remove();
        var thisObj = musicPlayMV.zmMvTemp.playArr[musicPlayMV.zmMvTemp.playIndex];
        // 获取当前点击mv路径
        var newMvSrc = thisObj.fMvUrl;
        // 获取mv名称
        var mvName = thisObj.fName;
        var mvVideo = $('.MVMain').find('video')[0];
        // 切换mv
        mvVideo.src = newMvSrc;
        mvVideo.play();
        // 切换播放按钮的播放与暂停图标
        $('.mv-modal').find('.MVFooter') // 底部进度box
            .find('.player ').removeClass('mvPlay').addClass('mvPause').end() // 播放，暂停图标切换
            .find('.progressBar .mvName').text(mvName).attr('data-id', playId).end() // 底部mv名称切换
            .find('.playTime i:eq(1)').text(mvVideo.duration.zmTimeFormat()); // 总时间
        // 判断播放列表和界面显示列表是否一致
        if(musicPlayMV.zmMvTemp.playType == musicPlayMV.zmMvTemp.type){
            $this.addClass('selected').find('.mvSort').addClass('mvPlaying').find('span').hide().end().end()
                .siblings().removeClass('selected').find('.mvSort').removeClass('mvPlaying').find('span').show();
        }
    },
    // 点击mv上一个下一个
    mvPrevOrNext:{
        prev:function () {
            // 调用mv列表播放函数
            musicPlayMV.MVListFn(musicPlayMV.zmMvTemp.playArr[musicPlayMV.zmMvTemp.playIndex-1].fId);
        },
        next:function () {
            // 调用mv列表播放函数
            musicPlayMV.MVListFn(musicPlayMV.zmMvTemp.playArr[musicPlayMV.zmMvTemp.playIndex+1].fId);
        },
        random:function () {

        },
        click:function () {
            // 点击上一个切换mv
            $(document).on('click', '.prevPlay', function () {
                musicPlayMV.mvPrevOrNext.prev();
            });
            // 点击下一个切换mv
            $(document).on('click', '.nextPlay', function () {
                musicPlayMV.mvPrevOrNext.next();
            });
        }

    },
    // 点击MV列表上收藏图标事件
    MVListCollect:function () {
        $(document).on('click', '.MVList .mvCollected-hover', function (event) {
            event.preventDefault();
            // ajax请求参数
            var sendData = {
                fId: $(this).closest('li').attr('data-id')
            };
            // 调用ajax请求
            musicPlayMV.playMVAjax(sendData, url, function () {

            })
        })
    },
    // 点击MV列表上转发分享图标事件
    MVListShare:function () {
        $(document).on('click', '.MVList .mvShare-hover', function (event) {
            event.stopPropagation();
            // ajax请求参数
            var sendData = {
                fId: $(this).closest('li').attr('data-id')
            };
            // 调用ajax请求
            musicPlayMV.playMVAjax(sendData, url, function () {

            })
        })
    },
    // 点击MV列表上删除图标事件
    MVListDel:function () {
        $(document).on('click', '.MVList .mvDel-hover', function (event) {
            event.stopPropagation();
            // ajax请求参数
            var $This = $(this);
            var sendData = {
                fId: $This.closest('li').attr('data-id')
            };
            // 出去删除以外的序列号重排
            $This.closest('li').siblings().each(function (i,ele) {
                $(ele).find('.mvSort span').text(i + 1)
            });
            // 如果删除的是正在播放，自动跳转下一条播放
            if($This.closest('li').hasClass('selected')){
                musicPlayMV.MVListFn($This.closest('li').next().attr('data-id'));
                // 如果被删除的是正在播放且是最末尾的一条，自动播放第一条
                if($This.closest('li').next().length === 0){
                    musicPlayMV.MVListFn($This.closest('li').siblings('li:eq(0)').attr('data-id'));
                    // 如果被删除的是正在播放且是仅有的一条
                    if($This.closest('li').siblings.length === 0){
                        musicPlayMV.MVListFn({});
                    }
                }
            }
            // 判断显示列表是否是播放列表，是就从播放数组中删除，不是就从临时数组中删除
            if(musicPlayMV.zmMvTemp.type === musicPlayMV.zmMvTemp.playType){
                musicPlayMV.zmMvTemp.playArr.forEach(function (v,i) {
                    if($This.closest('li').attr('data-id') == v.fId){
                        musicPlayMV.zmMvTemp.playArr.splice(i, 1);
                    }
                });
            }else {
                musicPlayMV.zmMvTemp.tempArr.forEach(function (v,i) {
                    if($This.closest('li').attr('data-id') == v.fId){
                        musicPlayMV.zmMvTemp.tempArr.splice(i, 1);
                    }
                });
            }
            $This.closest('li').remove();
            // 调用ajax请求
            musicPlayMV.playMVAjax(sendData, url, function () {

            })
        })
    },
    // 歌词解析回调
    parseLyric:function () {
        // 调用ajax请求
        musicPlayMV.playMVAjax({}, 'json/musicLrc.json', function (info) {
            if(info.status === 0){
                var lyrics = info.data.split("\n");
                var lrcArr = [], lrcHtml = '';
                for(var i = 0; i < lyrics.length; i++) {
                    var lyric = decodeURIComponent(lyrics[i]);
                    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                    //解析时间数组
                    var timeRegExpArr = lyric.match(timeReg);
                    if(!timeRegExpArr){
                        continue;
                    }
                    var clause = lyric.replace(timeReg, ''); //每行歌词
                    if(clause) { //每行歌词去两端空格添加到数组
                        lrcArr.push($.trim(clause));
                    }
                }
                for(var j = 0; j < lrcArr.length; j++) {
                    if(j == 0) { //判断歌名，歌名大字体
                        lrcHtml += "<p>" + lrcArr[j] + "</p>";
                    } else {
                        lrcHtml += "<p>" + lrcArr[j] + "</p>";
                    }
                }
                $(".songContent").html(lrcHtml);
            }
        });
    },
    // MV搜索
    MVSearch:function () {

    },
    // 点赞
    thumbs:function () {
        $(document).on('click', '.MVMain .dianZan-btn', function () {
            var $this = $(this);
            if($this.hasClass('isThumbs')){
                $this.removeClass('isThumbs').find('span:eq(0)').show().siblings().hide();
            }else {
                $this.addClass('isThumbs').find('span:eq(1)').show().siblings().hide();
            }
        })
    },
    // 视频播放、暂停
    mvPlayer:function () {
        // 点击底部播放按钮判断视频播放、暂停
       $(document).on('click', '.MVFooter .player', function () {
           var $this = $(this);
           var mvVideo = $('video')[0];
           // 判断播放器是否暂停状态，然后播放、暂停切换
           if(mvVideo.paused){
               mvVideo.play();
               $this.removeClass('mvPlay').addClass('mvPause');
           }else {
               mvVideo.pause();
               $this.removeClass('mvPause').addClass('mvPlay');
           }
       });
       // 点击视频区域判断视频播放、暂停
        $(document).on('click', '.mv-video,.mv-video div:eq(8)', function () {
            var mvVideo = $('video')[0];
            var footer = $(this).closest('.MVMain').siblings('.MVFooter');
            // 播放、暂停切换
            if(!mvVideo.paused){
                mvVideo.pause();
                footer.find('.player').removeClass('mvPause').addClass('mvPlay');
            }else {
                mvVideo.play();
                footer.find('.player').removeClass('mvPlay').addClass('mvPause');
            }
        })
    },
    // 音量设置
    volumeSetting:function () {
        $('video')[0].volume = 0.5;
        // 跳转到指定音量
        $(document).on('click', '.MVFooter .volumePro', function (event) {
            var $this = $(this);
            var barLen = event.clientX - $this.offset().left;
            var mvVideo = $('video')[0];
            var volume = 0;
            // 音量进度条为63px
            if(barLen >= 23 && barLen <= 86){
                // 计算音量的点指定坐标设置
                $this.find('.volumeBar').css('width', barLen - 23).end()
                    .find('.volumeDot').css('left', barLen);
                // 计算需要调节的音量
                volume = Math.round(((barLen - 23) / 63) * 100) / 100;
                // 设置指定音量
                mvVideo.volume = volume;
            }else if(barLen > 86){
                // 超出最大范围设置音量100%
                $this.find('.volumeBar').css('width', 63).end()
                    .find('.volumeDot').css('left', 86);
                mvVideo.volume = 1.0;
            }else {
                // 超出最小范围设置音量0
                $this.find('.volumeBar').css('width', 0).end()
                    .find('.volumeDot').css('left', 23);
                mvVideo.volume = volume;
            }
        });
        // 点击音量喇叭，静音或者取消静音
        $(document).on('click', '.volumeIcon', function () {
            var mvVideo = $('video')[0];
            var $this = $(this);
            if(musicPlayMV.isSilent){
                // 取消静音
                mvVideo.muted = false;
                musicPlayMV.isSilent = false;
                // 切换图标
                $this.removeClass('muted').addClass('normal');
            }else {
                // 设置静音
                mvVideo.muted = true;
                musicPlayMV.isSilent = true;
                // 切换图标
                $this.removeClass('normal').addClass('muted');
            }
        });
    },
    // 播放进度实时检测
    playProgress:function () {
       var video = $('video');
        video[0].loop = false;
        video[0].addEventListener("timeupdate", function () {
            var currentTime= video[0].currentTime; //当前播放时间
            var durationTime= video[0].duration; //视频总时间
            var proportion = (currentTime / durationTime) * 100; // 播放进度比例
            var footerBox = $('.MVFooter'); // 底部播放进度box
            var videoDeffer = video[0].buffered.end(0) || 0;    // 视频已经缓冲的时间
            var videoLoaded = Math.floor(videoDeffer / durationTime * 100); // 视频预加载时间百分比
            // console.log('当前播放时间:'+currentTime+'，视频预加载时间百分比:'+videoLoaded+'视频总时间:'+durationTime);
            if(proportion.toString() === 'NaN' || proportion.toString() === 'Infinity'){
                proportion = 0;
            }
            if(Math.floor(currentTime) !== musicPlayMV.curTime){
                musicPlayMV.curTime = Math.floor(currentTime);
                // 弹幕时间与播放时间匹配
                if(musicPlayMV.zmMvTemp.danMu.hasOwnProperty(musicPlayMV.curTime.toString())){
                    // 遍历这个时间点的弹幕
                    musicPlayMV.zmMvTemp.danMu[musicPlayMV.curTime].forEach(function (v) {
                        // 发送弹幕
                        if(musicPlayMV.isBulletScreen){
                            musicPlayMV.bulletScreen.valSpan(v);
                        }
                    })
                }
            }
            footerBox.find('.proDot').css('left', proportion + '%').end()  // 进度点位置调整
                .find('.proBar').css('width', proportion + '%').end()   // 进度条跟进
                .find('.progress').css('width', videoLoaded + '%').end()   // 缓冲条跟进
                .find('.playTime i:eq(0)').text(currentTime.zmTimeFormat()).end() // 修改当前显示的播放时间
                .find('.playTime i:eq(1)').text(durationTime.zmTimeFormat()); // 总时间显示
        },false);
        // 当播放完毕继续播放下一个
        video[0].addEventListener("ended", function () {
            $('bulletScreenContent').remove();
            musicPlayMV.mvPrevOrNext.next();
        },false)
    },
    // 播放进度设置-跳转到指定时间
    playProgressSetting:function () {
        $(document).on('click', '.MVFooter .playLine', function (event) {
            var $this = $(this);
            var mvVideo = $('video')[0];
            // 计算当前点击的位置坐标
            var barLen = event.clientX - $this.offset().left;
            // 播放进度条
            var playProgress = Math.floor(barLen * 100 / $this.width());
            // 计算当前点击位置对应的时间,mvVideo.duration视频总时长
            var time = mvVideo.duration * playProgress / 100;
            time = Math.round(time * 100) / 100;
            // 进度点到达指定位置
            $this.find('.proDot').css('left', playProgress + '%').end() // 进度点位置调整
                .find('.proBar').css('width', playProgress + '%')   // 进度条跟进
                .closest('.MVFooter').find('.player ').removeClass('mvPlay').addClass('mvPause').end()  // 调整播放，暂停的按钮图标
                .find('.playTime i:eq(0)').text(time.zmTimeFormat()); // 修改当前显示的播放时间
            // 跳转到指定时间，mvVideo.currentTime视频当前播放的时间点
            mvVideo.currentTime = time;
        })
    },
    // 全屏与退出全屏设置
    videoIsFullScreen:function () {
        // 点击底部全屏按钮时调用全屏函数
        $(document).on('click', '.settingFullScreen', musicPlayMV.mvFullScreen);
        // 点击退出全屏
        $(document).on('click', '.ExitFullScreen', musicPlayMV.mvExitFullScreen);
        // 双击video全屏与退出全屏切换
        $(document).on('dblclick', 'video', function () {
            musicPlayMV.isMVFullScreen ? musicPlayMV.mvExitFullScreen() : musicPlayMV.mvFullScreen();
           //  检测屏幕分辨率
            console.log(screen.width + '*' + screen.height);
        })
    },
    // 检测浏览器是否全屏
    checkFullScreen:function () {
        var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
        if(isFull === undefined) isFull = false;
        return isFull;
    },
    // mv全屏方法
    mvFullScreen:function () {
        var mvVideo = $('video')[0];
        musicPlayMV.isMVFullScreen = true;
        $('.fullScreen').removeClass('settingFullScreen').addClass('ExitFullScreen');
        if(mvVideo.requestFullscreen){
            // W3C标准
            mvVideo.requestFullscreen();
        }else if (mvVideo.mozRequestFullScreen) {
            // Firefox 10+
            mvVideo.mozRequestFullScreen();
        }else if (mvVideo.webkitRequestFullScreen) {
            // Safari5.1 and Chrome 15
            mvVideo.webkitRequestFullScreen();
        }
    },
    // mv退出全屏方法
    mvExitFullScreen:function () {
        var doc = document;
        musicPlayMV.isMVFullScreen = false;
        $('.fullScreen').removeClass('ExitFullScreen').addClass('settingFullScreen');
        $('.mv-index').find('span.bulletScreenContent').remove();
        if(doc.exitFullscreen){
            // W3C标准
            doc.exitFullscreen();
        }else if (doc.mozCancelFullScreen) {
            // Firefox 10+
            doc.mozCancelFullScreen();
        }else if (doc.webkitCancelFullScreen) {
            // Safari5.1 and Chrome 15
            doc.webkitCancelFullScreen();
        }
    }
};
// 将时间（秒）转化为XX:XX的格式返回
Number.prototype.zmTimeFormat = function () {
    // 如果将要转化的事件非正常返回固定格式00:00
    if(this.toString() === 'NaN' || this.toString() === 'Infinity' || this <= 0){
        return '00:00';
    }
    var m = Math.floor(this / 60);
    var s = Math.ceil(this % 60);
    m = (m > 9) ?  m:  '0' + m;
    s = (s > 9) ?  s:  '0' + s;
    return m + ':' + s;
};