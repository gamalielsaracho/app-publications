function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export default () => {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return h + ":" + m + ":" + s;
}