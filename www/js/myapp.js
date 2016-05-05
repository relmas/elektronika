/**
 * Created by hxiao on 15/9/6.
 */

// Initialize your app
var myApp = new Framework7({
    // Default title for modals
    modalTitle: 'VZ',

    // If it is webapp, we can enable hash navigation:
    pushState: true,
    smartSelectBackTemplate: '<div class="left sliding">' +
    '<a href="#" class="back link icon-only">' +
    '<i class="fa fa-chevron-left"></i></a></div>',
    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

// Initialize View
// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache: true //enable inline pages
});

// Add view
var examView = myApp.addView('#examTab', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache: true //enable inline pages
});


// Add view
var aboutView = myApp.addView('#aboutTab', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache: true //enable inline pages
});

var mySearchbar = myApp.searchbar('.searchbar', {
    searchList: '.list-block-search',
    searchIn: '.card-header'
});

// compile it with Template7
var compiledListTemplate = Template7.compile($$('#list-template').html());
var compiledDetailTemplate = Template7.compile($$('#detail-template').html());
var compiledQuizTemplate1 = Template7.compile($$('#quiz0-template').html());
var compiledQuizTemplate2 = Template7.compile($$('#quiz1-template').html());
var compiledCardTemplate = Template7.compile($$('#summary-card-template').html());
var compiledItemTemplate = Template7.compile($$('#item-template').html());
var starListStr = window.localStorage.getItem('starList') || "[]";
var starList = JSON.parse(starListStr);
var colorList = ['black', 'white', 'red', 'blue', 'yellow', 'green', 'orange', 'gray'];

var numLearn = window.localStorage.getItem('numLearn') || 0;
var numStar = window.localStorage.getItem('numStar') || 0;
var numTest = window.localStorage.getItem('numTest') || 0;
var numCorr = window.localStorage.getItem('numCorr') || 0;
var numWrong = window.localStorage.getItem('numWrong') || 0;
var numStart = window.localStorage.getItem('numStart') || 0;
window.localStorage.setItem('numStart', ++numStart);
var hasRated = window.localStorage.getItem('hasRated') || false;
var numAcc = window.localStorage.getItem('numAcc') || 0;
var allData;

window.lang =  new Lang('de');
window.lang.dynamic('en', 'lang/en.json');
window.lang.dynamic('zh-s', 'lang/en.json');

var uiLang = window.localStorage.getItem('ui-lang') || "german";
var dbLang = window.localStorage.getItem('db-lang') || "german";
var cardVirtualList;

// select the right Ad Id according to platform
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { // for android
    admobid = {
        banner: 'ca-app-pub-xxx/xxx', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-xxx/yyy'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    admobid = {
        banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-xxx/kkk'
    };
} else { // for windows phone
    admobid = {
        banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-xxx/kkk'
    };
}

changeUILang(uiLang);
changeDBLang(dbLang);
