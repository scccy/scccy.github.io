
define(["common/startMove"], function () {
    var mainObject = {
        //初始化数据请求
        loadData: function () {
            // console.log(1);
        },
        //获取个人信息
        verifyUser:function(btnType){
            $.ajax({
                url: '/newData/systemUser/verifyUser',
                dataType: 'json',
                success: function (res) {
                    if (btnType == 1){
                        if (res.code == "200") {
                            var businessTypeAuditStatus = res.data.businessTypeAuditStatus;
                            var auditStatus = res.data.auditStatus;
                            //退会未申请
                            if(auditStatus=='3'){
                                location.href = '/task/list';
                                return false;
                            }
                            //全部未申请
                            if(businessTypeAuditStatus=='-1'&&auditStatus=='-1'){
                                location.href = "/isin/applyFor?type=1";
                                return false;
                            }
                            //普通公会申请中
                            if(auditStatus=='0'){
                                location.href = "/isin/applyStatus";
                                return false;
                            }
                            //企业公会申请中
                            if(businessTypeAuditStatus=='0'){
                                location.href = "/isin/teamBuild?companyType="+1;
                                return false;
                            }
                            //企业公会申请通过
                            if(businessTypeAuditStatus=='1'){
                                //------>  是否实名
                               mainObject.getApplyStatus();
                               return false;
                            }
                            //普通公会申请通过
                            if(auditStatus=='1'){
                                location.href = "/task/list";
                                return false;
                            }
                            //普通公会申请拒绝
                            if(auditStatus=='2'){
                                location.href = "/isin/applyStatus";
                                return false;
                            }
                            //企业公会申请拒绝
                            if(businessTypeAuditStatus=='2'){
                                location.href = "/isin/teamBuild?companyType="+1;
                                return false;
                            }
                        } else {
                            location.href = "/isin/applyFor?type=1";
                        }
                    } else if(btnType == 2){
                        if (res.code == "200") {
                            if(res.data.haveCompanyRoles){
                                var str = res.data.haveCompanyRoles;
                                    str = str.join(',');
                                    console.log(str)
                                if(str.indexOf('2') != -1){
                                    location.href = "/business/center?companyType="+2;
                                }else{
                                    location.href = "/business/enter?companyType="+2;
                                }
                            }



                        } else {
                            mainObject.createUser(btnType);
                        }
                    }

                },
                error: function () {
                    utils.login();
                }
            });
        },
        //查询企业入驻审核状态
        getApplyStatus: function (str) {
            var data = {};
            data.companyType = 1;
            $.ajax({
                url: '/newData/companyInfo/getApplyStatus',
                dataType: 'json',
                data:data,
                success: function (res) {
                    if (res.code == 200) {
                        if(res.data.isRealNameAuth == '1'){
                            location.href = "/task/list";
                        }else{
                            location.href = "/isin/teamBuild?companyType="+1;
                            return false;
                        }
                    }

                },
                error: function () {
                    utils.alert("网络请求失败!");
                }
            });
        },
        //创建用户
        createUser:function(btnType){
            $.ajax({
                type: 'POST',
                url: '/newData/systemUser/createUser',
                dataType: 'json',
                data:{jdPin:$.cookie('pin')},
                success: function (res) {
                    if (res.code == 200) {
                        mainObject.verifyUser(btnType);
                    }
                },
                error: function () {
                    utils.alert("网络请求失败!");
                }
            });
        },
        tabSwitch: function () {
            var oUl = document.getElementById('ul-box');
            var aLi = $('.tab-box');
            var aTabCon = $('.tab-con');
            var navLi = document.getElementById('tab-nav').getElementsByTagName('li');

            var iNow = 1;
            var iNow2 = 1;
            var bBtn = true;
            var num = 3;
            var timer = null;

            oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';

            $('#left-btn').on('click',function () {
                if(bBtn){
                    clearInterval(timer);
                    timer = setInterval(autoPlay,30000);

                    for(var i=0;i<aLi.length;i++){
                        aLi[i].style.position = 'relative';
                        aLi[i].style.filter = 'alpha(opacity=100)';
                        aLi[i].style.opacity = 1;
                    }
                    oUl.style.left = -(iNow-1)*aLi[0].offsetWidth + 'px';
                    if(iNow==1){
                        iNow = aLi.length;
                        aLi[aLi.length-1].style.position = 'relative';
                        aLi[aLi.length-1].style.left = -aLi.length * aLi[0].offsetWidth + 'px';
                    }
                    else{
                        iNow--;
                    }
                    iNow2--;
                    toRun();
                    bBtn = false;
                }
            });
            $('#right-btn').on('click',function () {
                if(bBtn){
                    clearInterval(timer);
                    timer = setInterval(autoPlay,30000);

                    for(var i=0;i<aLi.length;i++){
                        aLi[i].style.position = 'relative';
                        aLi[i].style.filter = 'alpha(opacity=100)';
                        aLi[i].style.opacity = 1;
                    }
                    oUl.style.left = -(iNow-1)*aLi[0].offsetWidth + 'px';
                    if(iNow==aLi.length){
                        iNow = 1;
                        aLi[0].style.position = 'relative';
                        aLi[0].style.left = aLi.length * aLi[0].offsetWidth + 'px';
                    }
                    else{
                        iNow++;
                    }
                    iNow2++;
                    toRun();
                    bBtn = false;
                }
            });

            function toRun(){
                for(var i=0;i<aTabCon.length;i++){
                    aTabCon[i].style.display = 'none';
                    navLi[i].className = ''
                }
                aTabCon[iNow-1].style.display = 'block';
                navLi[iNow-1].className = 'active';

                startMove(oUl,{left:-(iNow2-1)*aLi[0].offsetWidth},function(){
                    if(iNow==1){
                        aLi[0].style.position = 'relative';
                        aLi[0].style.left = 0;
                        oUl.style.left = 0;
                        iNow2 = 1;
                    }else if(iNow==aLi.length){
                        aLi[aLi.length-1].style.position = 'relative';
                        aLi[aLi.length-1].style.left = 0;
                        oUl.style.left = -(aLi.length-1)*aLi[0].offsetWidth + 'px';
                        iNow2 = aLi.length;
                    }

                    for(var i=0;i<aLi.length;i++){
                        aLi[i].style.position = 'absolute';
                        aLi[i].style.filter = 'alpha(opacity=0)';
                        aLi[i].style.opacity = 0;
                    }
                    oUl.style.left = 0;
                    aLi[iNow2-1].style.zIndex = num++;
                    aLi[iNow2-1].style.filter = 'alpha(opacity=100)';
                    aLi[iNow2-1].style.opacity = 1;

                    bBtn = true;
                });
            }

            function toShow(){
                for(var i=0;i<aLi.length;i++){
                    startMove(aLi[i],{opacity:0});
                    aTabCon[i].style.display = 'none';
                    navLi[i].className = ''
                }

                aTabCon[iNow-1].style.display = 'block';
                navLi[iNow-1].className = 'active';

                startMove(aLi[iNow-1],{opacity:100},function(){
                    aLi[iNow-1].style.zIndex = num++;
                });
            }

            timer = setInterval(autoPlay,30000);

            function autoPlay(){
                if(iNow==aLi.length){
                    iNow = 1;
                    iNow2 = 1;
                }else{
                    iNow++;
                    iNow2++;
                }
                toShow();
            }

        },
        //绑定事件
        registerEvents: function () {
            $("#login").on("click",function(){
                utils.login();
            });

            $("#banner-btn").on("click",function(){
                if($.cookie("pin")){
                    mainObject.verifyUser(1);
                }else{
                    utils.login();
                }

            });
            $("#banner-btn2").on("click",function(){
                if($.cookie("pin")){
                    mainObject.verifyUser(2);
                }else{
                    utils.login();
                }
            });

            $('.big-title01').removeClass('animated bounceInDown').addClass('animated bounceInDown show').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated bounceInDown');
            });

            $('.big-title02').removeClass('animated bounceIn').addClass('animated bounceIn show').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated bounceIn');
            });

            $('.sun-icon').removeClass('animated fadeInUp').addClass('animated fadeInUp show').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated fadeInUp');

                $('.sun-icon1').removeClass('animated fadeInUp').addClass('animated fadeInUp show').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated fadeInUp');

                    $('.sun-icon2').removeClass('animated fadeInUp').addClass('animated fadeInUp show').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass('animated fadeInUp');
                    });
                });
            });

            //鼠标悬停icon
            $('.service-icon').hover(function(){
                $(this).removeClass().addClass('zoomIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass();
                })
            });

            $('.advantage-icon').hover(function(){
                $(this).removeClass().addClass('animated rotateIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass();
                })
            });

            $('#phone-icon').hover(function(){
                $(this).removeClass('animated rotateIn').addClass('animated rotateIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated rotateIn');
                })
            });

            $('#email-icon').hover(function(){
                $(this).removeClass('animated rotateIn').addClass('animated rotateIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated rotateIn');
                })
            });
            mainObject.tabSwitch();
        }

    };

    var init = function () {
        mainObject.loadData();
        mainObject.registerEvents();
    };
    return init();
});
