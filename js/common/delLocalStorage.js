define([""], function (confirmModal) {
    var mainObject = {
        //事件
        registerEvents:function(){
            //删除全部页码缓存
            $(document).on('click','.delAllLocalStorage',function(){
                for( i in localStorage){
                    if(i.substring(0,1) == '_'){
                        localStorage.removeItem(i);
                    }
                }
            });
            //删除当前页缓存
            $(document).on('click','.delLocalStorage',function(){
                var objKey = utils.saveLocalStorageKey();
                localStorage.removeItem(objKey);
            })
        }
    };
    var init = function () {
        mainObject.registerEvents();
    };

    return init();
});
