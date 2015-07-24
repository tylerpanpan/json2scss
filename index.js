"use strict";

function object2map(o) {
    var map = "";

    for (var item in o) {
        map += item2sass(item) + ": " + item2sass(o[item]) + ",\n";
    }

    return "(\n" + map.replace(/(,\n)$/, "") + "\n)";
}

function array2list(arr) {
    var list = "";

    for (var i = 0, l = arr.length; i < l; i++) {
        list += item2sass(arr[i]);

        if (i !== l - 1) {
            list += ", ";
        }
    }

    return "( " + list + " )";
}

function item2sass(item) {
    switch (typeof item) {
    case "string":
        return /(,|:)/.test(item) ? "\"" + item + "\"" : item;
    case "number":
        return item;
    case "object":
        if (item === null) {
            return "null";
        } else if (Array.isArray(item)) {
            return array2list(item);
        } else {
            return object2map(item);
        }
        break;
    default:
        return "";
    }
}

function json2sass(data) {
    var sass = "";

    for (var v in data) {
        sass += "$" + v + ": " + item2sass(data[v]) + ";\n";
    }

    return sass;
}

module.exports = json2sass;
