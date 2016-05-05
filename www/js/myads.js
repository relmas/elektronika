var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: 'ca-app-pub-5408889511302651/3519189924',
    interstitial: 'ca-app-pub-5408889511302651/5076648321'
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: 'ca-app-pub-5408889511302651/3519189924',
    interstitial: 'ca-app-pub-5408889511302651/5076648321'
  };
} else {
  admobid = { // for Windows Phone
    banner: 'ca-app-pub-5408889511302651/3519189924',
    interstitial: 'ca-app-pub-5408889511302651/5076648321'
  };
}


function showMyAds() {
  if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

  AdMob.createBanner( {
    adId: admobid.banner,
    isTesting: false,
    overlap: false,
    offsetTopBar: false,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    bgColor: '#f7f7f8'
  } );

  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    autoShow: true,
    isTesting: false
  });
}


if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
  document.addEventListener('deviceready', showMyAds, false);
} else {
  showMyAds();
}
