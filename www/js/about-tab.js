/**
 * Created by hxiao on 15/9/15.
 */
function changeUILang(param) {
    switch (param) {
        case "german":
            lang.change('de');
            break;
        case "english":
            lang.change('en');
            break;
        case "s-chinese":
            lang.change('zh-s');
            break;
        case "t-chinese":
            lang.change('zh-t');
            break;
    }
    window.localStorage.setItem('ui-lang', param);
    $('[name="applanguage"]').val(param);
    $('#appLang').text($('[name="applanguage"] option[value="'+ param +'"]').text());
}

function changeDBLang(param) {
    switch (param) {
        case "german":
            loadAllData("trafficsign-de.json");
            break;
        case "english":
            loadAllData("trafficsign-en.json");
            break;
        case "s-chinese":
            loadAllData("trafficsign-cn.json");
            break;
        case "t-chinese":
            break;
    }
    window.localStorage.setItem('db-lang', param);
    $('[name="dblanguage"]').val(param);
    $('#dbLang').text($('[name="dblanguage"] option[value="'+ param +'"]').text());
}

function openMail() {
    var a = document.createElement('a');
    a.setAttribute("href", 'mailto:vzguru@ojins.com');
    a.setAttribute("target", "_blank");
    fireClick(a);
}

function openOjins() {
    var a = document.createElement('a');
    a.setAttribute("href", 'http://ojins.com');
    a.setAttribute("target", "_blank");
    fireClick(a);
}

function openAppRate() {
    var a = document.createElement('a');
    a.setAttribute("href", 'itms-apps://itunes.apple.com/app/id1041784760');
    a.setAttribute("target", "_blank");
    fireClick(a);
}
