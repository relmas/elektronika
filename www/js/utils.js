/**
 * Created by hxiao on 15/9/12.
 */
/* finds the intersection of
 * two arrays in a simple fashion.
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *
 *  Should have O(n) operations, where n is
 *    n = MIN(a.length(), b.length())
 */
function intersect_safe(a, b)
{
    var ai=0, bi=0;
    var result = new Array();

    while( ai < a.length && bi < b.length )
    {
        if      (a[ai] < b[bi] ){ ai++; }
        else if (a[ai] > b[bi] ){ bi++; }
        else /* they're equal */
        {
            result.push(a[ai]);
            ai++;
            bi++;
        }
    }

    return result;
}

function reformatLine(param) {
    return param.replace(". ", ". <br />")
        .replace(/\n+/g, "<br />")
        .replace(/(<br>)+$/, "")
        .replace(/(<br\ ?\/?>)+/, "<br />");
}

function randInt(bound) {
    return Math.floor(Math.random() * bound);
}


function renderSingleItem(idx, item) {
    console.log(idx);
}

$('.list-block.virtual-list').on("scrollstop",function(){
    alert("Stopped scrolling!");
});

function loadVirtualList() {
    return myApp.virtualList('.list-block.virtual-list', {
        cache: false,
        // Array with items data
        items: allData.traffic_sign,
        // Template 7 template to render each item
        template: '<li class="card">' +
        '<div class="ribbon" data-id="{{id}}" onclick="toggleStar(this);" {{#if isStar}} {{else}} style="display:none" {{/if}} ><span><i class="fa fa-star"></i></span></div>' +
        '<div class="addStarBtn" data-id="{{id}}" onclick="toggleStar(this);" {{#if isStar}} style="display:none"  {{else}} {{/if}}>' +
        '<a href="#" class="link icon-only"><i class="fa fa-star-o"></i></a>' +
        '</div>' +
        '<div class="card-header">' +
        '<div class="mylabel">{{id}}</div>' +
        '<div class="sign-name">{{name}}</div>' +
        '</div>' +
        '<div class="card-content">' +
        '<a href="#detail" class="item-link" onclick=openDetail("'+ '{{id}}' +'")>' +
        '<div class="list-block media-list inside-card">' +
        '<ul>' +
        '<li class="item-content">' +
        '<div class="item-media">' +
        '<img class="card-sign-img" src="sign-svg/{{id}}.svg">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-subtitle">' +
        '{{short_meaning}}' +
        '</div>' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</a>' +
        '</div>' +
        '</li>'
    });
}

function loadAllDataToVirtualList(filename) {
    myApp.showIndicator();
    $.getJSON("data/" + filename, function(json) {
        allData = {traffic_sign: json};
        preprocess(allData.traffic_sign);
        if (typeof cardVirtualList !== 'undefined') {
            cardVirtualList.deleteAllItems();
            cardVirtualList.destroy();
        }
        cardVirtualList = loadVirtualList();
        refreshStars();
        openSearch();
        updateSummaryCard();
        myApp.hideIndicator();
    });
}


function fireClick(node){
    if ( document.createEvent ) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        node.dispatchEvent(evt);
    } else if( document.createEventObject ) {
        node.fireEvent('onclick') ;
    } else if (typeof node.onclick == 'function' ) {
        node.onclick();
    }
}

function showRateDialog() {
    if (numStart % 4 == 0 && !hasRated) {
        myApp.modal({
            title: window.lang.translate('Bitte geben Sie eine Bewertung'),
            buttons: [
                {
                    text: window.lang.translate('Später'),
                    onClick: function() {
                        //ga('send', 'event', 'cart-dialog', 'cancel');
                    }
                },
                {
                    text: window.lang.translate('Zum App Store'),
                    bold: true,
                    onClick: function() {
                        openAppRate();
                      window.localStorage.setItem('hasRated', true);
                        //ga('send', 'event', 'cart-dialog', 'go-to-shop');
                    }
                }
            ]
        });

    }
}
