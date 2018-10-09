var share = {
	showPopup : function(url){
		var width = 600;
		var height = 400;
		var poswidth = window.screen.width / 2 - width / 2;
		var posheight = window.screen.height / 2 - height / 2;
		window.open(url, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=' + height + ',width=' + width + ',left=' + poswidth + ',top=' + posheight);
	}
}

var url = location.origin+"/itrack/order.php?prod="+$.cookie('PRODUCT')+"&lang="+$.cookie('PAGE_LANG');
var title = $('title').text();
var description = $('meta[name="description"]').attr('content');
$('.social-btn-container-facebook').on('click',function(){
	share.showPopup('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url));
});

$('.social-btn-container-twitter').on('click',function(){
	share.showPopup('https://twitter.com/intent/tweet/?text='+description+'&url='+url+'&via='+title);
});