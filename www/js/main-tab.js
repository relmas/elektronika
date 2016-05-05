/**
 * Created by hxiao on 15/9/7.
 */


function openSearch() {
    $('.searchbar').fadeToggle();
    $('.index-subnavbar').fadeToggle();
    $('#main-page').toggleClass('with-subnavbar');
}

function openDetail(id) {
    var result = $.grep(allData.traffic_sign, function(e){ return e.id == id; });
    var data = result[0];
    data.subtitle1 = window.lang.translate('Was bedeutet das Verkehrsschild?');
    data.subtitle2 = window.lang.translate('Was soll man tun?');
    data.subtitle3 = window.lang.translate('Bußgeld bei Nicht-Beachtung');
    data.subtitle4 = window.lang.translate('Schilder in der Nähe');
    window.localStorage.setItem('numLearn', ++numLearn);
    mainView.router.loadContent(compiledDetailTemplate(data));
}

function refreshStars() {
    $('.ribbon').hide();
    $.each(starList, function(i, id) {
        $('.addStarBtn[data-id="'+id+'"]').hide();
        $('.ribbon[data-id="'+id+'"]').show();
    });
    var numCardsShowed = $('.cards-list ul').length - 1;
    $('.panel-badge').text(numCardsShowed);
    if (numCardsShowed < allData.traffic_sign.length) {
        $('.open-panel').addClass('animated rubberBand infinite');
    } else {
        $('.open-panel').removeClass('animated rubberBand infinite');
    }
    numStar = starList.length;
    window.localStorage.setItem('numStar', numStar);
}

function showStars() {
    if ($('.show-star-off').length > 0) {
        $('.show-star-off').html('<i class="fa fa-star"></i>').removeClass('show-star-off').addClass('show-star-on');
        var result = {traffic_sign: $.grep(allData.traffic_sign, function(e){ return $.inArray(e.id, starList) > -1;})};
        $('.cards-list').empty().html(compiledListTemplate(result));
    } else {
        $('.show-star-on').html('<i class="fa fa-star-o"></i>').removeClass('show-star-on').addClass('show-star-off');
        $('.cards-list').empty().html(compiledListTemplate(allData));
    }
    refreshStars();
}

function toggleCheck(param) {
    var index = colorList.indexOf(param.dataset.id);
    if (index == -1) {
        colorList.push(param.dataset.id);
    } else {
        colorList.splice(index, 1);
    }
    $(param).toggleClass('select-color');
    showColors();
}

function toggleStar(param) {
    var index = starList.indexOf(param.dataset.id);
    var targetItem = $.grep(allData.traffic_sign, function(e){ return e.id == param.dataset.id; });
    if (index == -1) {
        starList.push(param.dataset.id);
        targetItem[0].isStar = true;
        $(param).fadeOut();
        $('.ribbon[data-id="'+param.dataset.id+'"]').fadeIn();
    } else {
        starList.splice(index, 1);
        targetItem[0].isStar = false;
        $('.addStarBtn[data-id="'+param.dataset.id+'"]').fadeIn();
        $(param).fadeOut();
    }
    numStar = starList.length;
  window.localStorage.setItem('numStar', numStar);
  window.localStorage.setItem('starList', JSON.stringify(starList));
}

function showColors() {
    var result = {traffic_sign: $.grep(allData.traffic_sign, function(e) {
        return  e.color.filter(function(value) {
                return colorList.indexOf(value) > -1;
            }).length ==  e.color.length;
    })};
    $('.cards-list').empty().html(compiledListTemplate(result));
    refreshStars();
}

function showCategory(param) {
    var result;
    if (param.dataset.category === "alle") {
        result = allData;
    } else {
        result = {traffic_sign: $.grep(allData.traffic_sign, function(e) {
            return  e.category === param.dataset.category;
        })};
    }
    $('.cards-list').empty().html(compiledListTemplate(result));
    refreshStars();
}


