
(function (window) {
    var tools = function (selector, context) {
    };
    tools.prototype.getViewPortSize = function (w) {
        var w = w || window;
        if (w.innerWidth) {
            return {width: w.innerWidth, height: w.innerHeight};
        }
        var d = w.document;
        if (d.compatMode == "CSS1Compat") {
            return {width: d.documentElement.clientWidth, height: d.documentElement.clientHeight};
        }
        return {width: d.body.clientWidth, height: d.body.clientHeight};
    };
    tools.prototype.getScrollOffsets = function (w) {
        var w = w || window;
        if (w.pageXOffset != null) {
            return {scrollX: w.pageXOffset, scrollY: w.pageYOffset};
        }
        var doc = w.document;
        if (doc.compatMode == "CSS1Compat") {
            return {scrollX: doc.documentElement.scrollLeft, scrollY: doc.documentElement.scrollTop};
        }
        return {scrollX: doc.body.scrollLeft, scrollY: doc.body.scrollTop};
    };
    tools.prototype.getOffset = function (element) {
        var left = 0, top = 0;
        var parent = element;
        while (parent != null) {
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {offsetX: left, offsetY: top};
    };
    tools.prototype.format = function (fmt, day, objDate) {
        //fmt：时间格式 yyyy-MM-dd hh:mm:ss
        //objDate：传入时间
        //day:传入时间后N天
        var dataTime = objDate;
        if (!dataTime)
            return "";
        //dataTime = new Date();
        if (dataTime == "now")
            dataTime = new Date();
        if (!!day) {
            dataTime = new Date(dataTime);
            dataTime = +dataTime + day * (1000 * 60 * 60 * 24);
            dataTime = new Date(dataTime);
        } else {
            dataTime = new Date(dataTime);
        }

        var o = {
            "M+": dataTime.getMonth() + 1, //月份
            "d+": dataTime.getDate(), //日
            "h+": dataTime.getHours(), //小时
            "m+": dataTime.getMinutes(), //分
            "s+": dataTime.getSeconds(), //秒
            "q+": Math.floor((dataTime.getMonth() + 3) / 3), //季度
            "S": dataTime.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (dataTime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    tools.prototype.isLeapYear = function (objDate) {//判断闰年
        var pYear = objDate.getFullYear();
        if (!isNaN(parseInt(pYear))) {
            if ((pYear % 4 == 0 && pYear % 100 != 0) || (pYear % 100 == 0 && pYear % 400 == 0)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    /* 数量千字符 */
    tools.prototype.toThousands = function (num) {
        var result = [], counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) {
                result.unshift(',');
            }
        }
        return result.join('');
    }
    /***************************************************
     *比较两个日期的间隔
     *参数说明:
     *objDate：结束日期
     *interval要返回的两个日期的间隔,比如：
     *s：返回两个日期相差的秒数
     *n：返回两个日期相差的分钟数
     *h：返回两个日期相差的小时数
     *d：返回两个日期相差的天数
     *w：返回两个日期相差的周数
     *m：返回连个日期相差的月数
     *y：返回连个日期相差的年数
     ****************************************************/
    tools.prototype.dateDiff = function (interval, objBeginDate, objEndDate) {
        var dtBegin = new Date(objBeginDate);
        var dtEnd = new Date(objEndDate);
        if (isNaN(dtEnd)) return undefined;
        switch (interval) {
            case "s":
                return parseInt((dtEnd - dtBegin) / 1000);
            case "n":
                return parseInt((dtEnd - dtBegin) / 60000);
            case "h":
                return parseInt((dtEnd - dtBegin) / 3600000);
            case "d":
                return parseInt((dtEnd - dtBegin) / 86400000);
            case "w":
                return parseInt((dtEnd - dtBegin) / (86400000 * 7));
            case "m":
                return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtBegin.getFullYear()) * 12) - (dtBegin.getMonth() + 1);
            case "y":
                return dtEnd.getFullYear() - dtBegin.getFullYear();
        }
    };
    tools.prototype.timeStamp = function (second_time) {

        var time = parseInt(second_time) + "秒";
        if (parseInt(second_time) > 60) {

            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = min + "分" + second + "秒";

            if (min > 60) {
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt(parseInt(second_time / 60) / 60);
                time = hour + "小时" + min + "分" + second + "秒";

                if (hour > 24) {
                    hour = parseInt(parseInt(second_time / 60) / 60) % 24;
                    var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
                    time = day + "天" + hour + "小时" + min + "分" + second + "秒";
                }
            }
        }
        return time;
    };
    tools.prototype.timeStampT = function (second_time) {
        var time = parseInt(second_time) + "秒";
        if (parseInt(second_time) > 60) {

            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = min + "分";

            if (min > 60) {
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt(parseInt(second_time / 60) / 60);
                time = hour + "小时" + min + "分";

                if (hour > 24) {
                    hour = parseInt(parseInt(second_time / 60) / 60) % 24;
                    var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
                    time = day + "天" + hour + "小时" + min + "分";
                }
            }
        }
        return time;
    };
    tools.prototype.createCorrectDate = function (strFormatDate, dateArr) {
        if (strFormatDate == undefined || strFormatDate == null || strFormatDate == '') return 'invalidDate';
        var dateObj;
        try {
            var dateArray;
            if (strFormatDate.indexOf('-') > -1) {
                dateArray = strFormatDate.toString().split('-');
                dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
                if (Number(dateArray[0]) != dateObj.getFullYear())
                    return 'invalidDate';
                if (Number(dateArray[1]) != dateObj.getMonth() + 1)
                    return 'invalidDate';
                if (Number(dateArray[2]) != dateObj.getDate())
                    return 'invalidDate';
            } else if (strFormatDate.indexOf('.') > -1) {
                dateArray = strFormatDate.toString().split('.');
                dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
                if (Number(dateArray[0]) != dateObj.getFullYear())
                    return 'invalidDate';
                if (Number(dateArray[1]) != dateObj.getMonth() + 1)
                    return 'invalidDate';
                if (Number(dateArray[2]) != dateObj.getDate())
                    return 'invalidDate';
            } else if (strFormatDate.indexOf('/') > -1) {
                dateArray = strFormatDate.toString().split('/');
                dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
                if (Number(dateArray[0]) != dateObj.getFullYear())
                    return 'invalidDate';
                if (Number(dateArray[1]) != dateObj.getMonth() + 1)
                    return 'invalidDate';
                if (Number(dateArray[2]) != dateObj.getDate())
                    return 'invalidDate';
            }
            dateArr = dateArr || [];
            for (var i = 0; i < dateArr.length; i++) {
                switch (i) {
                    case 0:
                        dateObj.setHours(dateArr[0]);
                        if (dateObj.getHours() != Number(dateArr[0]))
                            return 'invalidDate';
                        break;
                    case 1:
                        dateObj.setMinutes(dateArr[1]);
                        if (dateObj.getMinutes() != Number(dateArr[1]))
                            return 'invalidDate';
                        break;
                    case 2:
                        dateObj.setSeconds(dateArr[2]);
                        if (dateObj.getSeconds() != Number(dateArr[2]))
                            return 'invalidDate';
                        break;
                    case 3:
                        dateObj.setMilliseconds(dateArr[3]);
                        if (dateObj.getMilliseconds() != Number(dateArr[3]))
                            return 'invalidDate';
                    default:
                        break;
                }
            }
            if (dateArr.length <= 0) {
                dateObj.setHours(0);
                dateObj.setMinutes(0);
                dateObj.setSeconds(0);
                dateObj.setMilliseconds(0);
            }
            return dateObj;
        } catch (e) {
            return 'invalidDate';
        }
    };
    tools.prototype.findElementIndex = function (arr, element) {
        for (var i = 0; i < arr.length; i++) {
            if (Object.prototype.toString.call(arr[i]) == "[object Object]") {
                for (var key in  arr[i]) {
                    if (key == element) {
                        return i;
                    }
                }
            } else if (element === arr[i]) {
                return i;
            }
        }
        return -1;
    };
    tools.prototype.removeElement = function (array, element) {
        var n = tools.prototype.findElementIndex(array, element);
        if (n < 0) {
            return array;
        } else {
            return array.splice(n, 1); //this.slice(0, n).concat(this.slice(n + 1, this.length));
        }
    };
    tools.prototype.delArr = function (arr, dx) {
        if (isNaN(dx) || dx > arr.length) {
            return false;
        }
        arr.splice(dx, 1);
    };
    //删除数组空值
    tools.prototype.removeDefault = function (arr) {
        var array = [];
        for (var i = 0; i < arr.length; i++) {
            if ($.trim(arr[i].code) != "" && $.trim(arr[i].desc) != "") {
                array.push(arr[i]);
            }
        }
        return array;
    };
    tools.prototype.browser = (function () {
        var userAgen = navigator.userAgent.toLowerCase();
        var brower = {};
        var s;
        (s = userAgen.match(/msie ([\d.]+)/)) ? brower.ie = s[1]
            : (s = userAgen.match(/firefox\/([\d.]+)/)) ? brower.firefox = s[1]
            : (s = userAgen.match(/chrome\/([\d.]+)/)) ? brower.chrome = s[1]
                : (s = userAgen.match(/opera\/.*version\/([\d.]+)/)) ? brower.opera = s[1]
                    : (s = userAgen.match(/version\/([\d.]+).*safari/)) ? brower.safari = s[1]
                        : 0;

        if (/webkit/.test(userAgen))
            brower.webkit = userAgen.match(/webkit\/([\d.]+)/)[1];
        return brower;
    })();
    tools.prototype.resetImageSize = function (ImgD, iwidth, iheight, center) {
        var image = new Image();
        image.src = ImgD.src;
        if (image.width > 0 && image.height > 0) {
            if (image.width / image.height >= iwidth / iheight) {
                if (image.width > iwidth) {
                    ImgD.width = iwidth;
                    ImgD.height = (image.height * iwidth) / image.width;
                } else {
                    ImgD.width = image.width;
                    ImgD.height = image.height;
                }
            } else {
                if (image.height > iheight) {
                    ImgD.height = iheight;
                    ImgD.width = (image.width * iheight) / image.height;
                } else {
                    ImgD.width = image.width;
                    ImgD.height = image.height;
                }
            }
            if (center) {
                ImgD.parentNode.style.marginTop = (iheight - ImgD.height) / 2;
                ImgD.parentNode.style.marginLeft = (iwidth - ImgD.width) / 2;
            }
        }
    };
    tools.prototype.getQuery = function (name) {
        var reg = new RegExp("(^|[&?]{1})" + name + "=([^&]*)(|$)", "i");
        var r = window.location.search.match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    };
    tools.prototype.trim = function (value) {
        var regEx = /(^\s*|\s*$)$/gi;
        return value.replace(regEx, "");
    };
    tools.prototype.cookie = function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var regExp = new RegExp("" + name + "=([^;=]+)");
                if (regExp.test(document.cookie)) {
                    cookieValue = RegExp.$1;
                }
            }
            return cookieValue;
        }
    };
    //设置cookie方法
    tools.prototype.setCookie = function (key, val, time) {
        var date = new Date();
        var expiresDays = time;
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
    };
    tools.prototype.unique = function (arr) {
        var res = [];
        var json = {};
        for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    };
    /* 获取URL中数据 */
    tools.prototype.getQueryString = function (name) {
        var reg = new RegExp("(^|[&?]{1})" + name + "=([^&]*)(|$)", "i");
        var r = window.location.search.match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    };
    //判断数组是否有重复,只能判断非数字
    tools.prototype.arrBoolean = function (a) {
        return /(\x0f[^\x0f]+)\x0f[\s\S]*\1/.test("\x0f" + a.join("\x0f\x0f") + "\x0f");
    };
    //返回数组重复值
    tools.prototype.duplicate = function (arr) {
        var tmp = [];
        arr.concat().sort(function (a, b) {
            if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
        });
        return tmp;
    };
    tools.prototype.findSame = function (arr) {
        var tmp = [];
        arr.sort();
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] == arr[i + 1]) {
                tmp.push(arr[i]);
            }
        }
        ;
        return tmp;
    };

    //返回数组重复值
    tools.prototype.loading = function (type, text) {
        if (!text) {
            text = "加载中...";
        }
        if (type == "show") {
            $(".loading").show().find("strong").html(text);
        } else {
            $(".loading").hide();
        }
    };

    //提示
    tools.prototype.alert = function (text, type, callback, time) {
        var htm = '';
        switch (type) {
            case "yes":
                htm = '<div class="hint-alert"><div class="alert alert-green"><strong>提示：</strong>' + text + '</div></div>';
                break;
            case "no":
                htm = '<div class="hint-alert"><div class="alert alert-red"><strong>提示：</strong>' + text + '</div></div>';
                break;
            default:
                htm = '<div class="hint-alert"><div class="alert"><strong>提示：</strong>' + text + '</div></div>';
        }
        $("body").append(htm);
        var _this = $('.hint-alert');
        if (type == "show") {
            _this.fadeIn(300);
        } else {
            if (!time) {
                time = 3000;
            }
            _this.fadeIn(10).delay(time).animate({opacity: 'toggle'}, 10, function () {
                _this.remove();
                if (typeof callback == "function") {
                    callback();
                }
            });
        }
        _this.find(".close").on("click", function () {
            $('.hint-alert').remove();
            if (typeof callback == "function") {
                callback();
            }
        });
    };
    tools.prototype.html2Escape = function (sHtml) {
        return sHtml.replace(/[<>&"]/g, function (c) {
            return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[c];
        });
    };

    //url参数加密 --- huchunlei add
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

    tools.prototype.base64encode = function (str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    };

    tools.prototype.base64decode = function (str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;
            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    };

    //登录 退出
    tools.prototype.login = function () {
        $.getJSON("//sso.jd.com/exit?t=" + new Date() + "&callback=?", function () {
            $.getJSON("//sso.jdpay.com/exit?t=" + new Date() + "&callback=?", function () {
                var url = encodeURIComponent("http://" + location.host + "/");
                location.href = "https://passport.jd.com/new/login.aspx?ReturnUrl=" + url;
            });
        });
    };
    //localStorage key值
    tools.prototype.saveLocalStorageKey = function () {
        var objKey = '';
        objKey = location.pathname;
        objKey = objKey.replace(/\//g, '_');
        return objKey;
    };
    //存localstorage
    tools.prototype.setLocalStorage = function (data) {
        var objKey = tools.prototype.saveLocalStorageKey();
        window.localStorage.setItem(objKey, JSON.stringify(data));
    };
    //自动存localstorage
    tools.prototype.autoLocalStorage = function (ele) {
        var currentEle = ele.closest('.localWrapper');
        var localList = currentEle.find('.localList');
        var data ={},pageNum;
        localList.each(function(){
            data[$(this).attr('name')] = $(this).val();
        });
        currentEle.find('.page li').each(function () {
            if ($(this).attr('class') == 'active') {
                pageNum = $(this).find('a').html();
            }
        });
        if(pageNum){
            data.pageNum = pageNum;
        }
        var objKey = tools.prototype.saveLocalStorageKey();
        window.localStorage.setItem(objKey, JSON.stringify(data));
    };
    //取localstorage
    tools.prototype.getLocalStorage = function () {
        var objKey = tools.prototype.saveLocalStorageKey();
        local = localStorage[objKey];
        if (local) {
            local = JSON.parse(local);
        }
        return local;
    };
    //判断图片加载
    tools.prototype.loadImage = function (url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            /*console.log(img.width)
            callback.call(img);*/
            callback(img);
            return; // 直接返回，不用再处理onload事件
        }
        img.onload = function () { //图片下载完毕时异步调用callback函数。
            /*console.log(img.width)
            callback.call(img);//将回调函数的this替换为Image对象*/
            callback(img)
        };
    };
    //遍历json数组合并重复项目
    tools.prototype.mergeSameItem = function (jsonArr, num) {
        var tmp = {}, a = jsonArr.slice();
        for (var i = j = 0; i < a.length; i++) {
            if (!tmp[a[i].materialId]) {
                tmp[a[i].materialId] = !0;
                j++;
            } else {
                jsonArr.splice(num, 1);
            }
        }
        return jsonArr;
    };
    //匹配只能输入数组
    tools.prototype.floatNum = function () {
        $(document).on("input propertychange", ".floatNum", function () {
            var _this = $(this);
            if (!/^\d+\.$/.test(_this.val())) {
                this.value = this.value.replace(/[^/^\d+\.$/]/g, '');
            }
        });
    };
    //匹配input只能输入数字整数
    tools.prototype.Number = function () {
        $(document).on("input propertychange", ".typeNumber", function () {
            var _this = $(this);
            if (!/^\d+$/.test(_this.val())) {
                this.value = this.value.replace(/[^/^\d+$/]/g, '');
            }
            if(_this.val().indexOf('+') != -1){
                _this.val('');
            }
        });
    };
    //匹配input输入百分比
    tools.prototype.twoNum = function () {
        $(document).on("input propertychange", ".twoNumber", function () {
            var _this = $(this);
            console.log($.trim(_this.val()).length)
            if ($.trim(_this.val()).length >= 3) {
                $(this).val('');
            }
        });
    };
    //匹配输入数字小数点最多四位
    tools.prototype.fourNum = function () {
        $(document).on("input", ".fourNumber", function () {
            var _this = $(this);
            var text = _this.val();
            if (text.indexOf('.') != -1) {
                text = text.split('.');
                if (text[1].length > 3) {
                    $(this).val('');
                }
            }

        });
    };
    //判断字段是否存在/空/null/"null"
    tools.prototype.keywordNull = function (data) {
            if(data==null||data=='null'||data==''||!data){
                return false
            }else{
                return true
            }
    };
    tools.prototype.valueNull = function (data) {
        if(data==null||data=='null'||data==''||!data){
            return "--"
        }else{
            return data
        }
    };
    //获取图片原始数据
    tools.prototype.getNaturalWidth = function (img) {
        var image = new Image();
        image.src = img[0].src;
        var naturalWidth = image.width;
        return naturalWidth
    };
    //获取图片原始数据
    tools.prototype.loadImg= function (img,callback) {
        var imgdefereds=[];
        img.each(function(){
            var dfd=$.Deferred();
            $(this).bind('load',function(){
                dfd.resolve();
            }).bind('error',function(){
                //图片加载错误，加入错误处理
                //  dfd.resolve();
            });
            if(this.complete) setTimeout(function(){
                dfd.resolve();
            },1000);
            imgdefereds.push(dfd);
        });
        $.when.apply(null,imgdefereds).done(function(callback){
            if (typeof callback == "function") {
                callback();
            }
        });
    };
    //插入模板
    tools.prototype.choseTem = function () {
        var templateCode = tools.prototype.getQuery("templateCode"),
            processNode = tools.prototype.getQuery("processNode"),
            modeCode = tools.prototype.getQuery("modeCode");
        var data = {};
        //引入模板模块
        data.modalHtml = "text!templates/" + templateCode + "/content.html";
        data.modalJs = "/js/templates/" + templateCode + "/content.js";
        data.initDataJs = "/js/templates/" + templateCode + "/initData.js";
        //引入提交模块
        if(modeCode=="acc"){
            data.submitHtml = "text!templates/submit/A-submit.html";
            data.submitJs = "/js/templates/submit/A-submit.js";
            data.choseData = '/js/templates/lib/choseDataAcc.js';
        }else{
            data.choseData = '/js/templates/lib/choseData.js';
            if (processNode.indexOf('C') != -1 || processNode.indexOf('S') != -1) {
                data.submitHtml = "text!templates/submit/C-submit.html";
                data.submitJs = "/js/templates/submit/C-submit.js";
            } else {
                data.submitHtml = "text!templates/submit/A-submit.html";
                data.submitJs = "/js/templates/submit/A-submit.js";
            }
        }

        return data;
    };
    tools.prototype.checkData = function (v) {
        var  entry = { "'": "&apos;", '"': '&quot;', '<': '&lt;', '>': '&gt;' };
        v = v.replace(/(['")-><&\\\/\.])/g, function ($0) { return entry[$0] || $0; });
        return v;
    };
    //history返回
    tools.prototype.history = function(){
        if(document.referrer.indexOf('passport.jd.com') != -1){
            window.location = '/';
        }else{
            history.back();
        }
    };
    //iframe高度自适应
    tools.prototype.initFrame = function (){
        var iframe=window.frameElement;
        var bHeight=iframe.contentWindow.document.body.scrollHeight;
        // var dHeight=iframe.contentWindow.document.documentElement.scrollHeight;
        // var height=Math.max(bHeight,dHeight);
        iframe.height=bHeight;
    };
    //改变输入框高度
    tools.prototype.setLineHeight = function (setObj){
        $('.'+setObj.elm).find('li .text_line ').on('focus', function () {
            $(this).parent().siblings('li').find('.'+setObj.sonElm).css('height','32px');
            $(this).css('height',$(this)[0].scrollHeight + "px");
        });
    };
    //全选
    tools.prototype.selectedAll = function (elm,elm2,checkName){
        $(elm).on('click', function(){
            if(elm2){
                $(elm2).prop("checked",false);
            }

            var inputNum = $("input[name='"+checkName+"']");

            if($(elm).prop("checked") == true){
                inputNum.prop("checked", true);
            }else {
                inputNum.prop("checked", false);
            }

            inputNum.on('click', function(){
                var chkNum = $("input[name='"+checkName+"']").size();//选项总个数
                var chk = 0;

                inputNum.each(function () {
                    if($(this).prop("checked")==true){
                        chk++;
                    }
                });
                if(chkNum==chk){//全选
                    $(elm).prop("checked",true);
                }else{//不全选
                    $(elm).prop("checked",false);
                }
            });
        });


    };
    //反选
    tools.prototype.unSelectAll = function (elm,elm2,checkName) {
        $(elm).on('click', function(){
            $(elm2).prop("checked",false);

            var inputNum = $("input[name='"+checkName+"']");

            inputNum.each(function(){
                $(this).prop("checked",!$(this).prop("checked"));
            });

            var chkNum = inputNum.size();//选项总个数
            var chk = 0;

            inputNum.each(function () {
                if($(this).prop("checked")==true){
                    chk++;
                }
            });
            if(chkNum==chk){//全选
                $(elm).prop("checked",true);
            }else{//不全选
                $(elm).prop("checked",false);
            }
        });
    };

    //答题环节提交按钮倒计时
    tools.prototype.countDown = function (time) {
        //console.log(time)
        var ele;
        if(tools.prototype.getQuery('modeCode') != 'acc'){
            ele = $('#submitOne');
        }else{
            ele = $("#submitOne",window.parent.document);
        }
        ele.attr('disabled', true);
        var timerBox, timerBtn;
        clearTimeout(timerBox);
        var i = time;
        timerBtn = setInterval(function () {
            i--;
            ele.html("提交（" + i + "）").attr("timer", "on")
        }, 1000);
        timerBox = setTimeout(function () {
            clearInterval(timerBtn);
            ele.attr('disabled', false);
            ele.html("提交").removeAttr("timer");
        }, i * 1000);
    };

    //编辑显示全选按钮是否默认勾选
    tools.prototype.getSelectAll = function (checkName,id) {
        var elm = $("input[name='"+checkName+"']");
        if (elm.size() == $("input[name='"+checkName+"']:checked").size()) {
            $('#'+id).prop('checked', true);
        }

        elm.on('click', function () {
            var chkNum = $("input[name='"+checkName+"']").size();//选项总个数
            var chk = 0;

            $("input[name='"+checkName+"']").each(function () {
                if ($(this).prop("checked") == true) {
                    chk++;
                }
            });
            if (chkNum == chk) {//全选
                $('#'+id).prop('checked', true)
            } else {//不全选
                $('#'+id).prop('checked', false)
            }
        });
    };

    //通用接口ajax
    tools.prototype.portData = function (data, url, callback) {
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            success: function (res) {
                if (res.code == 200) {
                    if (typeof callback == "function") {
                        callback(res);
                    }
                } else {
                    utils.alert(res.msg);
                }
            },
            error: function () {
                utils.alert("网络请求失败！");
            }
        });
    }
    tools.prototype.Number();
    tools.prototype.floatNum();
    tools.prototype.twoNum();
    tools.prototype.fourNum();
    var utils = new tools();
    window.utils = utils;
})(window);
