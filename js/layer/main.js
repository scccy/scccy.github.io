requirejs.config({
    baseUrl: "./js/",
    paths: {
        jquery: ["libs/jquery-1.11.3.min"],
        pageIn: ["libs/jquery.pagination-1.2.7"],
        underscore: ["libs/underscore"],
        cookie: ["libs/jquery.cookie"],
        way: ["libs/way"],
        util_tools: ["common/utils_tools"],
        utilsPage: ["common/page_tools"],
        manage_nav:["common/manage_nav"],
        team_nav:["common/team_nav"],
        delLocalStorage:["common/delLocalStorage"],
        wangEditor:["libs/wangEditor.min"],
        text: ["libs/text"]
    },
    shim: {
        jquery: {
            exports: "$"
        },
        pageIn: {
            deps: ["jquery"]
        },
        cookie: {
            deps: ["jquery"]
        },
        text: {
            exports: "text"
        },
        underscore: {
            exports: "_",
            deps: ["jquery"]
        },
        way: {
            deps: ["jquery"]
        },
        nicescroll: {
            deps: ["jquery"]
        },
        util_tools: {
            exports: "utils",
            deps: ["jquery"]
        },
        wangEditor:{
            deps: ["jquery"]
        },
        delLocalStorage:{
            deps: ["jquery"]
        },
        autoLogin:{
            deps: ["jquery"]
        }
    },
    urlArgs: "v=1.03"
});
require([
    "underscore",
    "jquery",
    "text",
    "util_tools",
    "cookie",
    "way",
    "delLocalStorage"
], function () {
    var target = location.pathname;
    var match = null;
    switch (target) {
        case "/":
            match = "layer/index/index";
            break;
        default:
            match = "layer" + target;
    }

    if ($.type(match) === "string") {
        match = [match];
    }

    require(match);
});
