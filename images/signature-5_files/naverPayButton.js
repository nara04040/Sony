function getInnerNaverPayButtonScriptFile() {
	var NAVER_PAY_BUTTON_SCRIPT_SRC_PATTERN = /^(https?:\/\/[^\/]*pay\.naver\.com\/[^?]*)naverPayButton.js/;
	function _findNaverPayButtonSrc() {
		var scriptObjects = document.getElementsByTagName("script");
		if ( scriptObjects == null ) {
			return null;
		}
		for ( var i in scriptObjects ) {
			try {
				var result = NAVER_PAY_BUTTON_SCRIPT_SRC_PATTERN.exec(scriptObjects[i].src);
				if ( result != null) {
					return result[1].replace("http://","https://");
				}
			} catch (e) {}
		}
		return null;
	}
	var naverPayButtonSrc = _findNaverPayButtonSrc();
	if (naverPayButtonSrc) {
		document.write('<script type="text/javascript" src="' + naverPayButtonSrc + 'innerNaverPayButton.js?site_preference=normal&' + Math.round(+new Date()/3600000) + '" charset="UTF-8"></script>');
	} else {
		alert("HOST 명을 찾을 수 없어 네이버 페이 버튼을 초기화 할 수 없습니다.");
	}
}
getInnerNaverPayButtonScriptFile();