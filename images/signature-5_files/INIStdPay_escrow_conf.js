//-------------------------------------------------------------------------------------------
// $jINI script 가 browser 에 로딩되어 있지 않으면 로딩 시키도록 한다. (모든 브라우저 호환)
// Created by Inicis(ehBang)
//-------------------------------------------------------------------------------------------

var INIopenDomain = "https://stdpay.inicis.com/";

var INImsgTitle = {
	info : "[INIStdPay Info] "
	,dev_err : "[INIStdPay / Dev. Error]\n\n"
};
var INImsg = {
		alert : function(msg) {
				alert(msg);
		}
		,info1		: INImsgTitle.info		+ "INIStdPay 라이브러리를 로딩중입니다.\n잠시만 기다려 주십세요"
		,dev_err1	: INImsgTitle.dev_err	+ "동일한 이름의 form 객체가 존재합니다."
		,dev_err2	: INImsgTitle.dev_err	+ "form 객체를 찾을수 없습니다."
		,dev_err3	: INImsgTitle.dev_err	+ "필수 변수(#)가 존재하지 않습니다."
		,dev_err4	: INImsgTitle.dev_err	+ "변수(#)의 값이 없습니다."
		,dev_err5	: INImsgTitle.dev_err	+ "변수(#1)의 값에 길이 문제가 있습니다.\n\n(값:#2)\n(길이:#3)\n(제한길이:#4)"
		,dev_err6	: INImsgTitle.dev_err	+ "통신에 실패하였습니다.\n잠시후 다시 시도해보시기 바랍니다."
		,dev_err7	: INImsgTitle.dev_err	+ "선택된 결제수단은 계약되지 않은 결제 수단입니다."
		,dev_err8	: INImsgTitle.dev_err	+ "payViewType를 popup으로 설정한 경우 반드시 popupUrl를 입력해야 합니다."
		,dev_err9	: INImsgTitle.dev_err   + "할부정보에 대한 값이 존재하지 않습니다."
		,dev_err10 	: INImsgTitle.dev_err	+ "카드코드가 입력되지 않았습니다."
};

var paramList = [
		"mid"			+":String,1~10"
		,"tid"			+":String,1~40"	
		,"timestamp"	+":String,1~20"		
		,"mKey"			+":String,1~128"
];



var INIUtil = {

	randomKey : function(str) {
		return str +"_"+ (Math.random() * (1 << 30)).toString(16).replace('.', '');

	}

};

var $jINIBrowser = {

		underIE9 : function() {
				var rv = -1; // Return value assumes failure.

				var re = null;

				var ua = navigator.userAgent;

				if(navigator.appName.charAt(0) == "M"){

					re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

					if (re.exec(ua) != null){
						rv = parseFloat(RegExp.$1);
					}

					if(rv <= 8 || document.documentMode == '7' ||  document.documentMode == '8'){
						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}

			}

};

var $jINILoader = {
		_startupJob : null

		,load: function(startupFunc) {
			_startupJob = startupFunc;

			if(this.$jINILoadChecker()) {
				_startupJob();
			}
			else {


				var jsUrl = INIopenDomain+'./stdjs/INIStdPay_third-party.js'
				if($jINIBrowser.underIE9()){
					var jsUrl = INIopenDomain+'./stdjs/INIStdPay_third-party_under_ie9.js'
				}

				var fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", jsUrl);
				fileref.onload = _startupJob;
				document.getElementsByTagName("head")[0].appendChild(fileref);

				if (navigator.userAgent.toUpperCase().indexOf("MSIE")>-1){
					this.waitForJQueryLoad();
				}
			}

		}
		,waitForJQueryLoad: function () {
			setTimeout(function() { if(!$jINILoader.$jINILoadChecker()) { $jINILoader.waitForJQueryLoad(); } else { _startupJob(); }
			}, 100);
		}
		,$jINILoadChecker: function () { try {var win = $jINI(window); return true;}catch(ex){ return false; } }
		//,$jINILoadChecker: function () {return false; }

	};

var $jINICSSLoader = {
		loadDefault: function(startupFunc) {

				$jINI("<link></link>").attr({
							href: INIopenDomain+'./stdcss/INIStdPay.css',
							type: 'text/css',
							rel: 'stylesheet'
					}).appendTo('head');

			//$jINI.getScript(INIopenDomain+'./stdcss/INIStdPay.css', function(data, textStatus){   });
		}
};



var INIStdPay = {

		vForm : null
		,vIframeName		: null

		//,vDefaultCharset	: "EUC_KR"
		,vDefaultCharset	: "UTF-8"
		,vPageCharset		: null
		,vPayViewType		: "overlay"

		,vMethod : "POST"
		,vActionUrl			: INIopenDomain + "payEscrowMain/pay"				// 결제창 URL
		,vCheckActionUrl	: INIopenDomain + "jsApi/payCheck"

		,vParamSHA256Hash	: ""											// 필수 파라미터 해쉬

		,boolInitDone 			: false		// init이 정상 실행되었는지 저장
		,boolSubmitRunCheck		: false		// Submit이 실행 됬는지 여부 체크
		,boolPayRequestCheck 	: false		// 파리미터 체크용 URL로 전송 여부 payRequestCheck()의 해서 사용
		,boolMobile				: false		// 모바일 여부 체크
		,boolWinMetro			: false		// MetroStyle 여부 체크
        ,boolViewParentWindow   : true      // 부모창이 보일까요? 않보일까요?
		,intMobileWidth			: 0			// 모바일 너비

		,$formObj			: null		// form Object
		,$iframe			: null		// iframe Object
		,$iframe2			: null		// iframe Object
		,$modalDiv			: null		// 결제창 레이어 Object
		,$overlay			: null		// 결제창 오버레이 구연 Object($jINI Tools Overlay Object)

		,$modalDivMsg	: null
		,$stdPopup			: null
		,$stdPopupInterval	: null
		,frmobj             : null   //ljh추가
		,jsLoaded           : false

		// INIStdPay 라이브러리 초기화
		,init : function() {
			if (!window.$jINI) {
				$jINILoader.load( function() {
					//INImsg.alert ('loaded $jINI Version:' + $jINI.fn.jquery );
					INIStdPay.init();
				});
				return;
			}else{
				//INImsg.alert ('loaded $jINI Version:' + $jINI.fn.jquery );
			};

			//$jINI.getScript(INIopenDomain+'./js/jquery.tools.min.js', function(data, textStatus){   });
			if(!INIStdPay.boolInitDone){
				$jINI(document).ready(function(){

					$jINICSSLoader.loadDefault();

//					$jINI("body").prepend(INIStdPay.$modalDiv);
//					$jINI("body").append(INIStdPay.$modalDivMsg);
//					$jINI("body").append(INIStdPay.$modalDivMsg2);

					INIStdPay.boolMobile = $jINI.mobileBrowser;

					// windows 8 일때 체크
					if("msie" == $jINI.ua.browser.name){

						try {
								new ActiveXObject("");

						}
						catch (e) {
							// FF has ReferenceError here
							if (e.name == 'TypeError' || e.name == 'Error') {

							}else{
								INIStdPay.boolMobile = true;
								INIStdPay.boolWinMetro = true;
							}

						}
					}

					if(!INIStdPay.boolMobile){
						INIStdPay.INIModal_init();
					}
					//ljh test
//					setTimeout(function() { INIStdPay.boolInitDone = true; }, 7000);
					INIStdPay.boolInitDone = true;
	/*
					alert($jINI.ua.browser.name)
					alert($jINI.ua.browser.version)
					alert($jINI.ua.platform.name)
					alert($jINI.ua.platform.version)
					//alert($jINI.browser.versionNumber)
	*/
				});
			}
			


		}

		// 모달 초기화 세팅
		,INIModal_init : function(){

			// 오버레이에 들어갈 모달 DIV 설정
			INIStdPay.vIframeName = INIUtil.randomKey("iframe");

			INIStdPay.$iframe = $jINI("<iframe name='"+INIStdPay.vIframeName+"' id='iframe'></iframe>")
							.addClass("inipay_iframe")
							.attr("frameborder","0")
							.attr("scrolling","no")
							.attr("allowtransparency","true");
			var modalCloseBtn = $jINI('<div class="inipay_close"><img src="'+INIopenDomain+'https://stdux.inicis.com/stdpay/img/close.png"></div>');

			modalCloseBtn.click(function(){
				INIStdPay.viewOff();
			});

			//var modalDivContant_header	= $jINI("<div>").addClass("inipay_modal-header").append(modalCloseBtn).append('<h3>KG Inicis Standard Payment</h3>');
			var modalDivContant_header	= $jINI("<div>").addClass("inipay_modal-header").append(modalCloseBtn);
			var modalDivContant_body 	= $jINI("<div>").addClass("inipay_modal-body").append(INIStdPay.$iframe);
			var modalDivContant_footter = $jINI("<div>").addClass("inipay_modal-footer");


			INIStdPay.$modalDiv = $jINI('<div id="inicisModalDiv" class="inipay_modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>');
			INIStdPay.$modalDivMsg = $jINI('<div id="inicisModalDivMsg" class="inipay_modal_msg fade" tabindex="-1" role="dialog" aria-hidden="true"></div>');

			INIStdPay.$modalDivMsg.html("<div style='padding:5px;'><b>결제 팝업창을 닫을 경우 약 5초후 자동으로 화면 복구됩니다.</b></div><div style='padding:5px;'>(현재창을 새로고침, 닫기, 페이지이동 하는 경우 결제창은 자동으로 종료됩니다.)</div>");

			INIStdPay.$modalDivMsg2 = $jINI('<div id="inicisModalDivMsg" class="inipay_modal_msg fade" tabindex="-1" role="dialog" aria-hidden="true"></div>');

			INIStdPay.$modalDivMsg2.html("<div style='padding:5px;'><b>결제 모듈 로딩중입니다.</b></div><div style='padding:5px;'>(최대 1분 가량 소요되며 현재창을 새로고침, 닫기, 페이지이동 하는 경우 결제 오류가 발생 할 수 있습니다.)</div>");
			// 코너처리
			//INIStdPay.$modalDiv.corner("cc:#757575 25px");;

			INIStdPay.$modalDiv.append(modalDivContant_body);

//			INIStdPay.$modalDiv.append(document.createTextNode(modalDivContant_body));

				//.append(modalDivContant_footter);



			INIStdPay.$modalDiv.modal({
				keyboard: false
				,backdrop : 'static'
				,show : false
				,remote:false
			});


			INIStdPay.$modalDivMsg.modal({
				keyboard: false
				,backdrop : 'static'
				,show : false
				,remote:false
			});

			INIStdPay.$modalDivMsg2.modal({
				keyboard: false
				,backdrop : 'static'
				,show : false
				,remote:false
			});
/*
			// 오버레이 구연
			INIStdPay.$overlay = INIStdPay.$modalDiv.overlay({
				mask: {
					// you might also consider a "transparent" color for the mask
					color: '#000',

					// load mask a little faster
					loadSpeed: 1000,

					// very transparent
					opacity: 0.5
				}
				,fixed:true
				,top: "center"
				,left: "center"
				,effect: "default"
				,closeOnClick: false
				,closeOnEsc:false
				,onClose : INIStdPay.viewOffTriger

			});

*/
		}
		,waitInit : function(){
//			console.log("waitInit!!");
			if(INIStdPay.boolInitDone){
				INIStdPay.pay(INIStdPay.frmobj);
			}else{
				setTimeout(function() {INIStdPay.waitInit();}, 100);
			}
		}
		// 초기화 완료 여부 체크
		,init_check : function(call_f){
//			console.log("init_check!!");
			if(!INIStdPay.boolInitDone){

				INIStdPay.waitInit();
//				INImsg.alert(INImsg.info1)
//				return false;
			}else{
//				console.log("true!!!!");
				return true;
			}

		}

		// 결제창 표시
		,viewOn : function(){


			$jINI(document).bind("dragstart", function(e) {
				return false;
			});
			$jINI(document).bind("selectstart", function(e) {
				return false;
			});
			$jINI(document).bind("contextmenu", function(e) {
				return false;
			});

			if(INIStdPay.init_check("INIModal_viewOn")){

				try{
					INIStdPay.$modalDiv.find(".header").html(INIStdPay.$formObj.find("[name=header]").val());
					INIStdPay.$modalDiv.find(".footer").html(INIStdPay.$formObj.find("[name=footer]").val());
				}catch(e){

				}

				INIStdPay.$modalDiv.modal('show');
			}




		}
		,hide : function(){
			INIStdPay.$modalDiv.modal('hide');
		}
		// 결제창 숨기기
		,viewOff : function(){

			INIStdPay.$modalDiv.modal('hide');
			INIStdPay.$modalDiv.remove();
			INIStdPay.$modalDivMsg.modal('hide');
			INIStdPay.$modalDivMsg.remove();
			INIStdPay.$modalDivMsg2.modal('hide');
			INIStdPay.$modalDivMsg2.remove();
//			INIStdPay.viewOffTriger();

		}


		// 결제창 숨기기
		,viewOffTriger : function(){

			INIStdPay.$iframe.attr("src","");
			INIStdPay.INIModal_init();			// Modal 재 초기화

			$jINI(document).unbind("dragstart");
			$jINI(document).unbind("selectstart");



			//$jINI(document).unbind("contextmenu");


		}

		// 팝업창 허용하도록 설정. 
		,allowpopup : function(obj){ 
 
			var i=document.createElement('IFRAME'); 
				i.src=INIopenDomain+"allowPopupIframe.jsp"; 
				i.width=0; 
				i.height=0; 
				document.body.appendChild(i); 
		} 		
		// 결제창 호출
		,pay : function(obj){
			INIStdPay.init();

			INIStdPay.frmobj = obj;
			if(INIStdPay.init_check("INIpaySubmit")){

				INIStdPay.vMethod ="POST";

				if(!INIStdPay.formCheck(obj)){
					return false;
				}else if(!INIStdPay.paramCheck(INIStdPay.$formObj)){
					return false;
				}else{

					if(INIStdPay.$formObj != null){

						INIStdPay.submit();
						//INIStdPay.checkBoolView(INIStdPay.$formObj.serialize());


					}

				}

			}

		}

        // 테스트용 get 결제창 호출
		,payGet : function(obj){

			if(INIStdPay.init_check("INIpaySubmit")){

				INIStdPay.vMethod ="GET";

				if(!INIStdPay.formCheck(obj)){
					return false;
				}else if(!INIStdPay.paramCheck(INIStdPay.$formObj)){
					return false;
				}else{

					if(INIStdPay.$formObj != null){
						// 정보 조회후
						INIStdPay.getBasicInfo("BASIC_INFO", INIStdPay.$formObj.serialize(), INIStdPay.submit);
					}

				}

			}

		}

		// 체크용 URL로 전송
		,payReqCheck : function(obj){


			INIStdPay.boolPayRequestCheck = true;

			INIStdPay.pay(obj);


		}


		// 결제창 POST 호출
		,submit : function(jsonData, status, jqXHR ){

			
				INIStdPay.submitBefore();
				// Direct option의 경우 popupType도 overlay처럼 진행 숨김
				if(!INIStdPay.boolMobile && ((INIStdPay.vPayViewType == "overlay" && ! INIStdPay.boolPayRequestCheck) || (!INIStdPay.boolViewParentWindow && ! INIStdPay.boolPayRequestCheck))){
					INIStdPay.$formObj.attr("target",INIStdPay.vIframeName);
					// 결제창 띄우기
					if(INIStdPay.boolViewParentWindow){
						INIStdPay.viewOn();
						INIStdPay.$modalDiv.hide();
						INIStdPay.$formObj.submit();
						INIStdPay.submitAfter();
						setTimeout(function(){INIStdPay.$modalDiv.show();}, 1000);	// iframe submit 할때 깜빡임 안보이게 하기

					}else{
						INIStdPay.viewOn();
//						INIStdPay.$modalDivMsg2.modal('show');
						INIStdPay.$modalDiv.hide();
						INIStdPay.$formObj.submit();

						INIStdPay.submitAfter();
					}

					return;
				}else if(!INIStdPay.boolMobile && INIStdPay.vPayViewType == "popup" && ! INIStdPay.boolPayRequestCheck){

						if($jINI.trim(INIStdPay.$formObj.find("input[name=popupUrl]").val()).length <= 0){
							INImsg.alert(INImsg.dev_err8);
							return false;
						}

						INIStdPay.$formObj.find("input[name=popupUrl]").val();

						INIStdPay.$modalDivMsg.modal('show');
						
						//-------------------------------------
						//분기처리 필요 - 네이버 nik 팝업인 경우 : 팝업창에 맞게 사이즈 조절 불가피./// by yang 2015-10-02
						//-------------------------------------
						INIStdPay.$stdPopup = window.open(INIStdPay.$formObj.find("input[name=popupUrl]").val(),"iniStdPayPopupIframe","width=467,height=496,resizable=no,scroll=yes,left="+(screen.availWidth-467)/2+",top="+(screen.availHeight-494)/2+",modal=yes");
						
						INIStdPay.$stdPopupInterval = setInterval(function(){

							if(typeof(INIStdPay.$stdPopup)=='undefined' || INIStdPay.$stdPopup.closed) {
								clearInterval(INIStdPay.$stdPopupInterval);

								INIStdPay.popupClose();

							}

						}, 5000);

						/*수정 소스 END*/

						return;

				}

		}
		,popupCallback : function(){


			INIStdPay.$formObj.attr("target","iniStdPayPopupIframe");

			INIStdPay.$formObj.submit();
			INIStdPay.submitAfter();



		}
		,popupClose : function(){

			INIStdPay.$modalDivMsg.modal('hide');
			INIStdPay.$modalDivMsg.remove();

			INIStdPay.viewOffTriger();

		}

		,submitBefore : function(){

			var $input;

			if($jINI("input[name=requestByJs]").size() >0 ){
				$input = INIStdPay.$formObj.find("input[name=requestByJs]");
			}else{
				$input = $jINI("<input/>")
							.attr("name", "requestByJs")
							.attr("type", "hidden")
				INIStdPay.$formObj.append($input);
			}

			$input.val("true");



			if("" == $jINI.trim(INIStdPay.$formObj.find("[name=payViewType]").val())){
				INIStdPay.$formObj.find("[name=payViewType]").val("overlay");
			}

			INIStdPay.vPayViewType = $jINI.trim(INIStdPay.$formObj.find("[name=payViewType]").val());

			if(INIStdPay.vPayViewType == null || INIStdPay.vPayViewType == ""){
				INIStdPay.vPayViewType = "overlay";
			}

//			// ActionUrl 세팅
//			if(INIStdPay.boolPayRequestCheck){
//				INIStdPay.$formObj.attr("action",INIStdPay.vCheckActionUrl);
//			}else{
				INIStdPay.$formObj.attr("action",INIStdPay.vActionUrl);
//			}

			// method 세팅
			INIStdPay.$formObj.attr("method",INIStdPay.vMethod);

			INIStdPay.$formObj.attr("accept-charset",INIStdPay.vDefaultCharset);

			// charset 세팅
			if(document.all){
				INIStdPay.vPageCharset = document.charset;
				try {
					document.charset = INIStdPay.vDefaultCharset;
				} catch (e) {
					// TODO: handle exception
				}

			}

		}
		,submitAfter : function(){
			INIStdPay.$formObj = null;


			// 파라미더 테스트 전송 체크 상태 복귀
			INIStdPay.boolPayRequestCheck = false;

			// charset 원상복구
			if(document.all){
				try {
					document.charset = INIStdPay.vPageCharset;
				} catch (e) {
					// TODO: handle exception
				}

			}

		}

		// 폼 객체 존재 여부체크
		,formCheck : function(obj){

			if($jINI(obj).is("form")){
				INIStdPay.$formObj = $jINI(obj);
			}else if($jINI("#"+obj).is("form")){
				INIStdPay.$formObj = $jINI("#"+obj);
			}else if($jINI("[name="+obj+"]").is("form")){

				if($jINI("[name="+obj+"]").size() > 1){
					INImsg.alert(INImsg.dev_err1);
					return false;
				}

				INIStdPay.$formObj = $jINI("[name="+obj+"]");

			}else{
				INImsg.alert(INImsg.dev_err2);
				return false;
			}
			return true;
		}

		// 파라미터 유효성 체크
		,paramCheck : function(){

			var paramCheckStatus = true;

			//var ParamHashValue = "";

			$jINI(paramList).each(function(){

				vName = this.split(":")[0];

				vType = this.split(":")[1].split(",")[0];
				vLength = this.split(":")[1].split(",")[1];

				$obj = INIStdPay.$formObj.find(":input[name="+vName+"]");


				// currency값이 "" 일경우 WON으로 강제 적용
				if(vName=="currency" && $obj.val().length <= 0 ){INIStdPay.$formObj.find("[name=currency]").val("WON");}

				if($obj.size() <= 0){
					INImsg.alert(INImsg.dev_err3.replace("#",vName));
					paramCheckStatus = false;
					return false;	// each중지용
				}else if($obj.val().length <= 0){
					INImsg.alert(INImsg.dev_err4.replace("#",vName));
					paramCheckStatus = false;
					return false;	// each중지용
				}else{
					if(vLength.indexOf("~") >= 0){

						var vLengthStart = vLength.split("~")[0];
						var vLengthEnd	 = vLength.split("~")[1];

						if($obj.val().length < Number(vLengthStart) || $obj.val().length > Number(vLengthEnd)){
							INImsg.alert(INImsg.dev_err5.replace("#1",vName).replace("#2",$obj.val()).replace("#3",$obj.val().length).replace("#4",vLength));
							paramCheckStatus = false;
							return false;	// each중지용
						}
					}else{
						if($obj.val().length > Number(vLength)){
							INImsg.alert(INImsg.dev_err5.replace("#1",vName).replace("#2",$obj.val()).replace("#3",$obj.val().length).replace("#4",vLength));
							paramCheckStatus = false;
							return false;	// each중지용
						}
					}

				}

				//ParamHashValue += $obj.attr("name")+"="+$obj.val()+"&";

			});

			//vParamSHA256Hash = hex_sha256(ParamHashValue);

			//INIStdPay.addHashparam();

			return paramCheckStatus;

		}

		// 파라미터 해쉬갑 생성
/*
		,addHashparam : function(){

			var $input;

			if($jINI("input[name=scriptHash]").size() >0 ){
				$input = INIStdPay.$formObj.find("input[name=scriptHash]");
			}else{
				$input = $jINI("<input/>")
							.attr("name", "scriptHash")
							.attr("type", "hidden");

				INIStdPay.$formObj.append($input);
			}

			$input.val(vParamSHA256Hash);

		}
*/
		// 정보 조회
		,getBasicInfo : function(type, paramJson, callback_f){

			paramJson['callback'] = "?";

			$jINI.ajax({
				asyn : true
				, url:INIopenDomain+'jsopenapi/basicInfo'
				, data : paramJson
				, dataType:"jsonp"
				, contentType:"application/x-www-form-urlencoded;charset=UTF-8"
				, success:callback_f
				, error:function(jqXHR,status,errorThrown ){
						INIStdPay.jsonpError(type,jqXHR,status,errorThrown);
					}
				, complete:function(jqXHR,status){
					}
			});
		}
		,jsonpError : function(type, jqXHR, status, errorThrown ){

			INImsg.alert(INImsg.dev_err6);

		}


};

window.onbeforeunload = function(){

	if(INIStdPay.$stdPopup != null ){
			INIStdPay.$stdPopup.close();

	}
}


window.name = "INIpayStd_Return";

