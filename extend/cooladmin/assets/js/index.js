function getThemes() {
    return [
        {
            label: "钴蓝",
            name: "blue",
            color: "#4165d7"
        },
        {
            label: "极黑",
            name: "black",
            color: "#2f3447"
        },
        {
            label: "果绿",
            name: "green",
            color: "#51C21A"
        },
        {
            label: "酱紫",
            name: "purple",
            color: "#d0378d"
        }
    ];
}

function getBrowser() {
    var clientHeight = document.documentElement.clientHeight, clientWidth = document.documentElement.clientWidth;

    // 浏览器信息
    var ua = navigator.userAgent.toLowerCase();

    // 浏览器类型
    var type = (ua.match(/firefox|chrome|safari|opera/g) || "other")[0];

    if ((ua.match(/msie|trident/g) || [])[0]) {
        type = "msie";
    }

    // 平台标签
    var tag = "";

    var isTocuh =
        "ontouchstart" in window || ua.indexOf("touch") !== -1 || ua.indexOf("mobile") !== -1;
    if (isTocuh) {
        if (ua.indexOf("ipad") !== -1) {
            tag = "pad";
        } else if (ua.indexOf("mobile") !== -1) {
            tag = "mobile";
        } else if (ua.indexOf("android") !== -1) {
            tag = "androidPad";
        } else {
            tag = "pc";
        }
    } else {
        tag = "pc";
    }

    // 浏览器内核
    var prefix = "";

    switch (type) {
        case "chrome":
        case "safari":
        case "mobile":
            prefix = "webkit";
            break;
        case "msie":
            prefix = "ms";
            break;
        case "firefox":
            prefix = "Moz";
            break;
        case "opera":
            prefix = "O";
            break;
        default:
            prefix = "webkit";
            break;
    }

    // 操作平台
    var plat = ua.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();

    // 屏幕信息
    var screen = "full";

    if (clientWidth < 768) {
        screen = "xs";
    } else if (clientWidth < 992) {
        screen = "sm";
    } else if (clientWidth < 1200) {
        screen = "md";
    } else if (clientWidth < 1920) {
        screen = "xl";
    } else {
        screen = "full";
    }

    // 是否 ios
    var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    // 浏览器版本
    var version = (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];

    // 是否 PC 端
    var isPC = tag === "pc";

    // 是否移动端
    var isMobile = isPC ? false : true;

    // 是否移动端 + 屏幕宽过小
    var isMini = screen === "xs" || isMobile;

    return {
        height: clientHeight,
        width: clientWidth,
        version,
        type,
        plat,
        tag,
        prefix,
        isMobile,
        isIOS,
        isPC,
        isMini,
        screen
    };
}

function getSubMenu(treeObj) {
    var topMenu = [];
    var leftMenu = [];

    for (var i in treeObj) {
        var children = treeObj[i].children;
        if (!children || !children.length) {
            if (treeObj[i].url && treeObj[i].url != '#') {
                children = [treeObj[i]];
            }
        }
        if (children.length) {
            leftMenu = leftMenu.concat(children);
        }
        if (!treeObj[i].is_home) {
            delete treeObj[i].children;
            topMenu.push(treeObj[i]);
        }
    }

    return {
        left: leftMenu,
        top: topMenu,
    };
}

/**
 * @author CSDN 蔚莱先森
 * @param source json数据源
 * @param id 主键ID
 * @param parendId 父级ID名称
 * @param children 子级名称
 */
function treeData(source, id, parentId, children) {
    var cloneData = (typeof source == 'object') ? source : JSON.parse(source);
    return cloneData.filter(function (father) {
        var branchArr = cloneData.filter(function (child) { return father[id] == child[parentId] });
        branchArr.length > 0 ? father[children] = branchArr : '';
        return father[parentId] == 0
    })
}

function isEmpty(value) {
    if (isArray(value)) {
        return value.length === 0;
    }

    if (isObject(value)) {
        return Object.keys(value).length === 0;
    }

    return value === "" || value === undefined || value === null;
}

function isArray(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

function last(data) {
    if (isArray(data) || isString(data)) {
        return data[data.length - 1];
    }
}