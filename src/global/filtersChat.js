// 聊天的时间控制
export function chatTime(timestamp) {
    if (!Number(timestamp)) {
        return '-'
    }
    const date = new Date(timestamp);
    const y = date.getFullYear();
    const yy = y.toString().substr(2, 2)
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myddy = date.getDay();//获取存储当前日期,星期
    let days = (new Date(new Date().setHours(0, 0, 0, 0)).getTime() - timestamp) / (24 * 60 * 60 * 1000)
    console.log(days,"days")
    if (days < 0) {
        return h + ":" + m
    } else if (days > 0 && days < 1) {
        return '昨天' + ' ' + h + ":" + m
    } else if (days > 1 && days < 7) {
        return weekday[myddy] + ' ' + h + ":" + m
    } else if (days > 7) {
        return yy + "/" + MM + "/" + d;
    }
}
export function chatContentTime(timestamp) {
    if (!Number(timestamp)) {
        return '-'
    }
    const date = new Date(timestamp);
    const y = date.getFullYear();
    const yy = y.toString().substr(2, 2)
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myddy = date.getDay();//获取存储当前日期,星期
    let days = (new Date(new Date().setHours(0, 0, 0, 0)).getTime() - timestamp) / (24 * 60 * 60 * 1000)
    console.log(days,"days")
    if (days < 0) {
        return h + ":" + m
    } else if (days > 0 && days < 1) {
        return '昨天' + ' ' + h + ":" + m
    } else if (days > 1 && days < 7) {
        return weekday[myddy] + ' ' + h + ":" + m
    } else if (days > 7) {
        return y + "年" + MM + "月" + d + "日" + " " + h + ":" + m
    }
}