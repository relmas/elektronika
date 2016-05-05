/**
 * Created by hxiao on 15/9/9.
 */


function loadAllData(filename) {
    myApp.showIndicator();
    $.getJSON("data/" + filename, function(json) {
        allData = {traffic_sign: json};
        preprocess(allData.traffic_sign);
        $('.cards-list').empty().html(compiledListTemplate(allData));
        refreshStars();
        openSearch();
        updateSummaryCard();
        myApp.hideIndicator();
    });
}


function preprocess(data) {
    $.each(data, function(i, item) {
        item.color = item.color.split(',');
        item.long_mean = reformatLine(item.long_mean);
        item.whattodo = reformatLine(item.whattodo);
        item.finefee = reformatLine(item.finefee);
        switch (i) {
            case 0:
                item.nearby_id = [allData.traffic_sign[i+1].id, allData.traffic_sign[i+2].id,
                    allData.traffic_sign[i+3].id, allData.traffic_sign[i+4].id];
                break;
            case 1:
                item.nearby_id = [allData.traffic_sign[0].id, allData.traffic_sign[i+1].id,
                    allData.traffic_sign[i+2].id, allData.traffic_sign[i+3].id];
                break;
            case allData.traffic_sign.length - 2:
                item.nearby_id = [allData.traffic_sign[i+1].id, allData.traffic_sign[i-1].id,
                    allData.traffic_sign[i-2].id, allData.traffic_sign[i-3].id];
                break;
            case allData.traffic_sign.length - 1:
                item.nearby_id = [allData.traffic_sign[i-1].id, allData.traffic_sign[i-2].id,
                    allData.traffic_sign[i-3].id, allData.traffic_sign[i-4].id];
                break;
            default:
                item.nearby_id = [allData.traffic_sign[i-2].id, allData.traffic_sign[i-1].id,
                    allData.traffic_sign[i+1].id, allData.traffic_sign[i+2].id];
                break;
        }
    });
}
