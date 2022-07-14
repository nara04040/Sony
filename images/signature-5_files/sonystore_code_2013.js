/* SiteCatalyst code version: H.24.
Copyright 1996-2011 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
(()=>{
	var s_account="sonykrstyledev"
	var s=s_gi(s_account)
	/************************** CONFIG SECTION **************************/
	/* You may add or alter any code config here. */
	s.charSet="utf-8"
	/* Link Tracking Config */
	s.trackDownloadLinks=true
	s.trackExternalLinks=true
	s.trackInlineStats=true
	s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
	s.linkInternalFilters="javascript:,sony.co.kr"
	s.linkLeaveQueryString=false
	s.linkTrackVars="None"
	s.linkTrackEvents="None"
	
	function trackLogin (login_id) {
		s.linkTrackVars="events,prop10,eVar10";
		s.linkTrackEvents="event4";
		s.prop10=login_id;
	  s.eVar10=login_id;
		s.events="event4";
		s.tl(true,'o','login_success');
	}
	
	/* Plugin Config */
	s.usePlugins=true
	function s_doPlugins(s) {
	
		  /* Custom PageView Event */
		s.events = s.apl(s.events,"event1",",",2);
		
		/* Copy prop to eVar */
	  if(s.prop1&&!s.eVar1) s.eVar1=s.prop1;
	  if(s.prop2&&!s.eVar2) s.eVar2=s.prop2;
	  if(s.prop3&&!s.eVar3) s.eVar3=s.prop3;
	  if(s.prop3&&!s.eVar3) s.eVar3=s.prop4;
	  if(s.pageName&&!s.hier1) s.hier1=s.pageName;
	  
		/* Time Parting */
		s.eVar11=s.getTimeParting('h','+9','','0');
		s.eVar12=s.getTimeParting('d','+9','','0');
		s.eVar13=s.getTimeParting('w','+9','','0');
		
		 /* Day Since Last Visit */
		 s.eVar9=s.getDaysSinceLastVisit('s_lv');
		 
		 /* New vs Repeat */
		 s.eVar14=s.getNewRepeat();
		 
		 /* Error Page */
		 if(s.pageName=='404 error page'){s.prop9=s.getPreviousValue(s.pageName,'gpv_p9','');}
	
	   /* Internal Promotion */
			s.eVar7=s.getQueryParam('intcmp');
			s.eVar7=s.getValOnce(s.eVar7,'s_ev7',0);
		
		  /* Campaign tracking code */
		s.campaign=s.getQueryParam('cmpid');
		s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
		s.prop12=s.getAndPersistValue(s.campaign,'s_prop12',0);
	  if(s.prop12) s.prop11=s.prop12+">"+s.pageName;
		
	}
	s.doPlugins=s_doPlugins
	/************************** PLUGINS SECTION *************************/
	/* You may insert any plugins you wish to use here.                 */
	
	/*
	 * Plugin Utility: apl v1.1
	 */
	s.apl=new Function("L","v","d","u",""
	+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
	+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
	+"e()));}}if(!m)L=L?L+d+v:v;return L");
	
	/*
	 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
	 */
	s.split=new Function("l","d",""
	+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
	+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
	
	/*
	 * Plugin: getQueryParam 2.4
	 */
	s.getQueryParam=new Function("p","d","u","h",""
	+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
	+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
	+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
	+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
	+"g(i==p.length?i:i+1)}return v");
	s.p_gpv=new Function("k","u","h",""
	+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
	+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
	s.p_gvf=new Function("t","k",""
	+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
	+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
	+"epa(v)}return''");
	
	/*
	 * Plugin: getValOnce 0.2 - get a value once per session or number of days
	 */
	s.getValOnce=new Function("v","c","e",""
	+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
	+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
	
	/*
	 * Plugin: getTimeParting 2.0 
	 */
	s.getTimeParting=new Function("t","z","y","l",""
	+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
	+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
	+".substring(2,4);X='092925|102831|112730|122528|133127|143026|152925"
	+"|162730|172629|182828|193127';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
	+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
	+"g(4,6)}}if(!B||!C){B='29';C='25'}B='03/'+B+'/'+A;C='10/'+C+'/'+A;}D"
	+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
	+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
	+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
	+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
	+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
	+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='';A='Weekday';X='"
	+"00';if(C>30){X='30'}if(B<=9){U='0'};if(D==6"
	+"||D==0){A='Weekend'}W=U+B+':'+X;if(y&&y!=Y){return'Data Not Availab"
	+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
	+"eturn A}}else{return Z+', '+W}}}");
	/*
	 * Plugin: getAndPersistValue 0.3 - get a value on every page
	 */
	s.getAndPersistValue=new Function("v","c","e",""
	+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
	+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");
	/*
	 * Plugin: Days since last Visit 1.0.H - capture time from last visit
	 */
	s.getDaysSinceLastVisit=new Function(""
	+"var s=this,e=new Date(),cval,ct=e.getTime(),c='s_lastvisit',day=24*"
	+"60*60*1000;e.setTime(ct+3*365*day);cval=s.c_r(c);if(!cval){s.c_w(c,"
	+"ct,e);return 'First page view or cookies not supported';}else{var d"
	+"=ct-cval;if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);return 'More t"
	+"han 30 days';}if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);return 'More "
	+"than 7 days';}if(d<7*day+1 && d>day){s.c_w(c,ct,e);return 'Less tha"
	+"n 7 days';}if(d<day+1){s.c_w(c,ct,e);return 'Less than 1 day';}}els"
	+"e return '';}");
	/*
	 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
	 */
	s.getNewRepeat=new Function("d","cn",""
	+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
	+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
	+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
	+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
	+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
	/*
	 * Plugin: getPreviousValue v1.0 - return previous value of designated
	 *   variable (requires split utility)
	 */
	s.getPreviousValue=new Function("v","c","el",""
	+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
	+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
	+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
	+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
	+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
	
	/* WARNING: Changing any of the below variables will cause drastic
	changes to how your visitor data is collected.  Changes should only be
	made when instructed to do so by your account manager.*/
	s.trackingServer="sonykorea.112.2o7.net"
	
	/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
	var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.24';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\"\\"
	+"\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return "
	+"x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x"
	+".length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpp"
	+"erCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.s"
	+"ubstring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U"
	+"')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){v"
	+"ar s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring"
	+"(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a"
	+".substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s"
	+"=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefi"
	+"ned){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s."
	+"c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pars"
	+"eInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape"
	+"(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd()"
	+",l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k"
	+"+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._i"
	+"n,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x."
	+"b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r'"
	+");r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe"
	+"=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,"
	+"p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('"
	+"gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=funct"
	+"ion(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object"
	+",l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p='"
	+"'}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(r"
	+"s,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s"
	+"_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_"
	+"l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s"
	+".debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name"
	+"&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=f"
	+"unction(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=t"
	+"his;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase("
	+");j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l='"
	+",q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.subs"
	+"tring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){"
	+"var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)"
	+"){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.inde"
	+"xOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv)"
	+"{if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';els"
	+"e if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs!="
	+"'')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){"
	+"fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if"
	+"(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e)"
	+"{v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL')"
	+"{q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationSer"
	+"verSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.e"
	+"m==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc"
	+"';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else "
	+"if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else i"
	+"f(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='"
	+"mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='d"
	+"eleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b="
	+"='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():"
	+"'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.in"
	+"dexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s."
	+"trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';ret"
	+"urn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,"
	+"tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){"
	+"}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o"
	+".protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':"
	+"'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT"
	+"'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;i"
	+"f(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPU"
	+"T'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_"
	+"oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&"
	+"u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=functio"
	+"n(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=funct"
	+"ion(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.p"
	+"rototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}retu"
	+"rn s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:"
	+"\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if"
	+"(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.v"
	+"isitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000"
	+">v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring("
	+"i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m"
	+"=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s="
	+"this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)"
	+"s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i"
	+"','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l["
	+"i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+"
	+"\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);e"
	+"lse s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i]"
	+";if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&"
	+"&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o."
	+"e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}i"
	+"f((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\""
	+"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)"
	+"/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o."
	+"defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o"
	+".n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;f"
	+"or(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va"
	+"_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!"
	+"s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){va"
	+"r s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk="
	+"1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1"
	+"900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_l"
	+"l();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.s"
	+"etUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){"
	+"}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.in"
	+"nerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.of"
	+"fsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('"
	+"s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if("
	+"p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;"
	+"s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s."
	+"_1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.pa"
	+"rentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if"
	+"(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'"
	+"?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');"
	+"x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){i"
	+"f(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq"
	+"(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code"
	+"};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightInc"
	+"rementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<"
	+"t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype"
	+"[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].a"
	+"pply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.b"
	+"ody;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.ind"
	+"exOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf("
	+"'Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));els"
	+"e s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.s"
	+"a(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pa"
	+"geURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s."
	+"vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightInc"
	+"rementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<="
	+"3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage"
	+",plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitor"
	+"SamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,li"
	+"nkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;"
	+"if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
	w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
	+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
	w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
	w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
	w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
	+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
	+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
	w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
	w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
	+"a");
	w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
	+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
	+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
	c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
	function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
	
	
	/////////////////////////////////////////////////////////////////////////
	//////// omniture code tagging start - add by goeun 2021.10.01 //////////
	/////////////////////////////////////////////////////////////////////////
	let gb = ":";									// : 구분자
	let hostnameStr = window.location.hostname;
	let pathnameStr = window.location.pathname;
	let searchTxt = window.location.search;
	
	// URL
	s.pageURL = hostnameStr + pathnameStr;

	let thisUrl = pathnameStr + searchTxt;			// URL 정보
	let site_sec_length = 0;										// DEPTH 정보
	
	let site = "메인";													// 디폴트 페이지명
	let prop1 = "";
	let prop2 = "";
	let prop3 = "";
	let prop4 = "";
	let prop5 = "";
	let prop6 = "";
	
	let defaultStr = "자세히 보기";
	
	// URL 대소문자 구분 없게
	thisUrl = thisUrl.toLowerCase();
	// 메인 DEPTH = 1
	prop1 = site;
	site_sec_length = 1;
	
	// 로그인
	if(thisUrl.indexOf("login") != -1){
		prop1 = "로그인";
		site_sec_length = 1;
	// 회원가입
	} else if(thisUrl.indexOf("join") != -1) {
		prop1 = "회원가입";
		site_sec_length = 1;
		if(thisUrl.indexOf("join-agree") != -1){
			prop2 = "간편회원가입";
			site_sec_length = 2;
		} else if(thisUrl.indexOf("joinstep") != -1) {
			prop2 = "간편회원가입";
			prop3 = "약관 동의";
			site_sec_length = 3;
		}
	} else if(thisUrl.indexOf("member/search") != -1) {
		prop1 = "회원가입";
		prop2 = "아이디·비밀번호 찾기";
		site_sec_length = 2;
	// 장바구니
	} else if(thisUrl.indexOf("cart") != -1) {
		prop1 = "장바구니";
		prop2 = "장바구니";
		site_sec_length = 2;
	} else if(thisUrl.indexOf("order/sheet") != -1 && thisUrl.indexOf("ordersheetno") != -1) {
		prop1 = "장바구니";
		prop2 = "주문·결제";
		site_sec_length = 2;
	} else if(thisUrl.indexOf("order/complete") != -1 && thisUrl.indexOf("ordersheetno") != -1) {
		if(thisUrl.indexOf("ordertype=default") != -1) {
			prop1 = "장바구니";
		} else if(thisUrl.indexOf("ordertype=gift") != -1) {
			prop1 = "선물하기";
		}
		prop2 = "주문 완료";
		site_sec_length = 2;
	// 선물하기
	} else if(thisUrl.indexOf("gift/sheet") != -1) {
		prop1 = "선물하기";
		prop2 = "주문·결제";
		site_sec_length = 2;
	} else if(thisUrl.indexOf("gift/receive") != -1) {
		prop1 = "선물하기";
		prop2 = "배송지 입력";
		site_sec_length = 2;
	
	// 마이페이지
	} else if(thisUrl.indexOf("my-page") != -1) {
		prop1 = "마이페이지";
		site_sec_length = 1;
		if(thisUrl.indexOf("member") != -1) {
			prop2 = "회원정보 수정";
			site_sec_length = 2;
		} else if(thisUrl.indexOf("order-list") != -1) {
			prop2 = "주문/배송내역";
			site_sec_length = 2;
			if(thisUrl.indexOf("old-order-list") != -1) {
				prop2 = "이전 주문/배송내역";
			}
		} else if(thisUrl.indexOf("order-detail") != -1 && thisUrl.indexOf("orderno") != -1) {
			prop2 = "주문/배송내역";
			prop3 = "주문 상세 조회";
			site_sec_length = 3;
		} else if(thisUrl.indexOf("withdraw") != -1) {
			prop2 = "회원탈퇴";
			site_sec_length = 2;
			if(thisUrl.indexOf("withdrawcomplete") !=-1) {
				prop2 = "회원탈퇴 완료";
			}
		}
	// 멤버십
	} else if(thisUrl.indexOf("membership/benefit") != -1) {
		prop1 = "마이페이지";
		prop2 = "멤버십";
		site_sec_length = 2;
	// 스토어 추천 제품
	} else if(thisUrl.indexOf("recommend") != -1) {
		prop1 = "스토어 추천 제품";
		prop2 = "추천 제품";
		site_sec_length = 2;
	// 선물제안
	} else if(thisUrl.indexOf("curation") != -1) {
		prop1 = "스토어 추천 제품";
		prop2 = "선물제안";
		site_sec_length = 2;
	
	/* 제품 - 카메라, 비디오 카메라, 오디오, 액세서리, PlayStation START
	 
		대카테고리
				카메라				: 카메라
				비디오 카메라			: 비디오
				오디오				: 오디오
				액세서리				: 액세서리
				PlayStation			: PS
				연장서비스플랜 ESP	: ESP
		중카테고리
				렌즈 교환식 카메라	: 렌즈교환식
				컴팩트 카메라			: 컴팩트
				시네마라인 카메라		: 시네마라인
				캠코더				: 캠코더
				액션캠				: 액션캠
				헤드폰/이어폰			: 헤드폰
				스피커				: 스피커
				홈오디오				: 홈오디오
				워크맨/녹음기			: 워크맨
				카메라 액세서리		: AC카메라
				오디오 액세서리		: AC오디오
				PlayStation			: PS중
				게임 타이틀 및 주변기기	: PS게임
	
	*/
	// 카메라
	} else if(thisUrl.indexOf("products/camera") != -1) {
		prop1 = "제품";
		prop2 = "카메라";			// 카메라
		prop3 = "전체보기";
		site_sec_length = 3;
		if(thisUrl.indexOf("lens") != -1) {
			prop3 = "렌즈교환식";		// 렌즈 교환식 카메라
		} else if(thisUrl.indexOf("compact") != -1) {
			prop3 = "컴팩트";		// 컴팩트 카메라
		}
	// 비디오 카메라
	} else if(thisUrl.indexOf("products/videocamera") != -1) {
		prop1 = "제품";
		prop2 = "비디오";			// 비디오 카메라
		prop3 = "전체보기";
		site_sec_length = 3;
		if(thisUrl.indexOf("cinema") != -1) {
			prop3 = "시네마라인";		// 시네마라인 카메라
		} else if(thisUrl.indexOf("camcoder") != -1) {
			prop3 = "캠코더";		// 캠코더
		} else if(thisUrl.indexOf("action") != -1) {
			prop3 = "액션캠";		// 액션캠
		}
	// 오디오
	} else if(thisUrl.indexOf("products/audio") != -1) {
		prop1 = "제품";
		prop2 = "오디오";			// 오디오
		prop3 = "전체보기";
		site_sec_length = 3;
		if(thisUrl.indexOf("headphone") != -1) {
			prop3 = "헤드폰";		// 헤드폰/이어폰
		} else if(thisUrl.indexOf("speaker") != -1) {
			prop3 = "스피커";		// 스피커
		} else if(thisUrl.indexOf("homeaudio") != -1) {
			prop3 = "홈오디오";		// 홈오디오
		} else if(thisUrl.indexOf("recorder") != -1) {
			prop3 = "워크맨";		// 워크맨/녹음기
		}
	// 액세서리
	} else if(thisUrl.indexOf("products/accessory") != -1) {
		prop1 = "제품";
		prop2 = "액세서리";			// 액세서리
		prop3 = "전체보기";
		site_sec_length = 3;
		if(thisUrl.indexOf("camera") != -1) {
			prop3 = "AC카메라";		// 카메라 액세서리
		} else if(thisUrl.indexOf("audio") != -1) {
			prop3 = "AC오디오";		// 오디오 액세서리
		}
	// PlayStation
	} else if(thisUrl.indexOf("products/playstation") != -1) {
		prop1 = "제품";
		prop2 = "PS";			// PlayStation
		prop3 = "전체보기";
		site_sec_length = 3;
		if(thisUrl.indexOf("playstation/playstation") != -1) {
			prop3 = "PS중";		// PlayStation
		} else if(thisUrl.indexOf("title") != -1) {
			prop3 = "PS게임";		// 게임 타이틀 및 주변기기
		}
	// 연장서비스플랜 ESP
	} else if(thisUrl.indexOf("esp") != -1 && thisUrl.length < 5) {
		prop1 = "제품";
		prop2 = "ESP";			// 연장서비스플랜 ESP
		site_sec_length = 2;
	// 연장서비스플랜 ESP:정품/보증기간/연장서비스플랜
	} else if(thisUrl.indexOf("esp/list") != -1) {
		prop1 = "제품";
		prop2 = "ESP";			// 연장서비스플랜 ESP
		prop3 = "정품/보증기간/연장서비스플랜";
		site_sec_length = 3;
	// 제품상세
	} else if(thisUrl.indexOf("product-view") != -1) {
		let title = "";
		let nlevel = 0;
		let toknStr = {};
		let strExAd = "";
		prop1 = "제품";
		prop2 = "상세";
		site_sec_length = 2;
	
		// 제품 명
		if( document.getElementsByTagName("title")[0].innerHTML != null
			&& document.getElementsByTagName("title")[0].innerHTML != "" ) {
			title = document.getElementsByTagName("title")[0].innerHTML;
			let code = "";
			let flCode = false;
	
			toknStr = title.split(":");
			nlevel = toknStr.length;
	
			for(let i=0; i<nlevel; i++) {
				toknStr[i] = toknStr[i].replace(/(^\s*)|(\s*$)/g,"");
				toknStr[i] = categoryToCode(toknStr[i]);
				// 대카/중카가 같을 경우 (Playstation : Playstation)
				if( i>0 && toknStr[i] == toknStr[i-1] && toknStr[i] != "" ) {
					toknStr[i] += "중";
				}
				if( !isNaN(toknStr[i]) && toknStr[i].length > 8 ) {
					flCode = true;
				}
			}
			// 타이틀에 9자리 이상 숫자로만 된 문자열(제품코드)가 없을 경우
			if( !flCode ) {
				// URL에서 제품코드 추가
				let arrUrl = thisUrl.split("/");
				for(let j=0; j<arrUrl.length; j++) {
					if(arrUrl[j].indexOf("product-view") != -1 && (j < arrUrl.length-1)) {
						code = nvl(arrUrl[j+1], defaultStr);
						code = code.split("?")[0].replace(/(^\s*)|(\s*$)/g,"");
					}
				}
				toknStr[0] = code + gb + toknStr[0];
			}
	
			// 레벨에 따른 타이틀 성형 및 cmpid 외부경로유입페이지 타이틀추가
			if(thisUrl.indexOf("cmpid=")) {
				strExAd = exBannerLinkAd(thisUrl, "product");
			}
			switch(nlevel){
				case 1:
					prop3 = toknStr[0] + strExAd;
					break;
				case 2:
					prop3 = toknStr[0] + strExAd;
					prop4 = toknStr[1];
					break;
				case 3:
					prop3 = toknStr[0];
					prop4 = toknStr[1] + strExAd;
					prop5 = toknStr[2];
					break;
				case 4:
					prop3 = toknStr[0];
					prop4 = toknStr[1];
					prop5 = toknStr[2] + strExAd;
					prop6 = toknStr[3];
					break;
			}
		}
		site_sec_length += nlevel;
	/* 제품 - 카메라, 비디오 카메라, 오디오, 액세서리, PlayStation END */
	
	// 기획전
	} else if(thisUrl.indexOf("event/list") != -1) {
		prop1 = "기획전";
		site_sec_length = 1;
		if(thisUrl.indexOf("tab=only") != -1) {
			prop2 = "소니스토어 단독";
			site_sec_length = 2;
		} else if(thisUrl.indexOf("tab=benefit-zone") != -1) {
			prop2 = "혜택존";
			site_sec_length = 2;
		} else if(thisUrl.indexOf("tab=pre-order") != -1) {
			prop2 = "예약판매";
			site_sec_length = 2;
		} else if(thisUrl.indexOf("tab=refined") != -1) {
			prop2 = "정품등록 이벤트";
			site_sec_length = 2;
		} else if(thisUrl.indexOf("tab=live-on") != -1) {
			prop2 = "LIVE ON";
			site_sec_length = 2;
		}
	// 종료된 기획전
	} else if(thisUrl.indexOf("event/expired") != -1) {
		prop1 = "기획전";
		prop2 = "종료된 기획전";
		site_sec_length = 2;
	// 기획전(이벤트) 상세
	} else if(thisUrl.indexOf("event/detail") != -1 || thisUrl.indexOf("event/refined") != -1
				|| thisUrl.indexOf("event/employee") != -1 || thisUrl.indexOf("event/refurbish") != -1
				|| thisUrl.indexOf("event/asc") != -1) {
		let code = "";
		let title = "";
		prop1 = "기획전";
		prop2 = "기획전 상세";
	
		// 기획전 코드
		let arrUrl = thisUrl.split("/");
		for(let i=0; i<arrUrl.length; i++) {
			if(arrUrl[i].indexOf("detail") != -1 && (i < arrUrl.length-1)) {
				code = nvl(arrUrl[i+1], defaultStr);
			} else if(arrUrl[i].indexOf("refined") != -1 && (i < arrUrl.length-1)) {
				code = nvl(arrUrl[i+1], defaultStr);
			} else if(arrUrl[i].indexOf("employee") != -1 && (i < arrUrl.length-1)) {
				code = nvl(arrUrl[i+1], defaultStr);
			} else if(arrUrl[i].indexOf("refurbish") != -1 && (i < arrUrl.length-1)) {
				code = nvl(arrUrl[i+1], defaultStr);
			} else if(arrUrl[i].indexOf("asc") != -1 && (i < arrUrl.length-1)) {
				code = nvl(arrUrl[i+1], defaultStr);
			}

			// cmpid 외부경로유입페이지 타이틀추가
			if(code.indexOf("cmpid=") != -1) {
				code = exBannerLinkAd(code, "event");
			}
		}
	
		// 기획전 명
		if( document.getElementsByTagName("title")[0].innerHTML != null
			&& document.getElementsByTagName("title")[0].innerHTML != "" ) {
			title = document.getElementsByTagName("title")[0].innerHTML;
			title = title.replace(/(^\s*)|(\s*$)/g,"");
		}
		prop3 = code;
		prop4 = title;
		site_sec_length = 4;
	// 고객서비스
	} else if(thisUrl.indexOf("faq") != -1 && thisUrl.length < 5) {
		prop1 = "고객서비스";
		prop2 = "FAQ & 공지사항";
		prop3 = "FAQ";
		site_sec_length = 3;
	} else if(thisUrl.indexOf("notice") != -1) {
		prop1 = "고객서비스";
		prop2 = "FAQ & 공지사항";
		prop3 = "공지사항";
		site_sec_length = 3;
	} else if(thisUrl.indexOf("agreement") != -1) {
		prop1 = "고객서비스";
		prop2 = "구매 상담";
		site_sec_length = 2;
		if(thisUrl.indexOf("purchase-consulting") != -1) {
			prop3 = "구매상담 안내";
			site_sec_length = 3;
		}
	} else if(thisUrl.indexOf("store-info") != -1) {
		prop1 = "고객서비스";
		prop2 = "직영점 안내";
		site_sec_length = 2;
	} else if(thisUrl.indexOf("video-course") != -1) {
		prop1 = "고객서비스";
		prop2 = "동영상 강좌";
		site_sec_length = 2;
	// 푸터 공통
	} else if(thisUrl.indexOf("terms") != -1) {
		prop1 = "이용약관";
		site_sec_length = 1;
	} else if(thisUrl.indexOf("sitemap") != -1) {
		prop1 = "사이트맵";
		site_sec_length = 1;
	// 검색결과
	} else if(thisUrl.indexOf("search-result") != -1) {
		prop1 = "검색결과";
		site_sec_length = 1;
	// 비회원 구매동의
	} else if(thisUrl.indexOf("order/agree") != -1 && thisUrl.indexOf("accessordersheetno") != -1) {
		prop1 = "비회원 구매동의";
		site_sec_length = 1;
	}
	
	
	
	/**
	 * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
	 * @param str           : 체크할 문자열
	 * @param defaultStr    : 문자열이 비어있을경우 리턴할 기본 문자열
	 */
	function nvl(str, defaultStr){
		 
		if(typeof str == "undefined" || str == null || str == "")
			str = defaultStr ;
		 
		return str ;
	}
	
	/**
	 * 카테고리 명을 카테고리 코드로 변환해 리턴한다.
	 * @param cate          : 카테고리 명
	 */
	function categoryToCode(cate){
		let strCate = cate.replace(/(\s*)/g, "");		// 모든 공백 제거
		let cateCode = "";
	
		if(strCate == "카메라") {
			cateCode = "카메라";
		} else if(strCate == "비디오카메라") {
			cateCode = "비디오";
		} else if(strCate == "오디오") {
			cateCode = "오디오";
		} else if(strCate == "액세서리") {
			cateCode = "액세서리";
		} else if(strCate == "PlayStation") {
			cateCode = "PS";
		} else if(strCate == "렌즈교환식카메라") {
			cateCode = "렌즈교환식";
		} else if(strCate == "컴팩트카메라") {
			cateCode = "컴팩트";
		} else if(strCate == "시네마라인카메라") {
			cateCode = "시네마라인";
		} else if(strCate == "캠코더") {
			cateCode = "캠코더";
		} else if(strCate == "액션캠") {
			cateCode = "액션캠";
		} else if(strCate == "헤드폰/이어폰") {
			cateCode = "헤드폰";
		} else if(strCate == "스피커") {
			cateCode = "스피커";
		} else if(strCate == "홈오디오") {
			cateCode = "홈오디오";
		} else if(strCate == "워크맨/녹음기") {
			cateCode = "워크맨";
		} else if(strCate == "카메라액세서리") {
			cateCode = "AC카메라";
		} else if(strCate == "오디오액세서리") {
			cateCode = "AC오디오";
		} else if(strCate == "게임타이틀및주변기기") {
			cateCode = "PS게임";
		} else if(strCate == "연장서비스플랜ESP") {
			cateCode = "ESP";
		} else {
			cateCode = cate;
		}
		return cateCode;
	}
	

	/** cmpid 외부경로유입페이지 타이틀추가
	 * @param strAd			: 외부경로유입 문자열
	 * @param type			: 페이지 유형(event || product)
	 * 
		kr_vd_cj_youtube	: CJTVE_유튜브
		kr_sns_fb_ig		: 페북인스타
		kr_da_kakao			: 카카오
		kr_bn_danawa		: 다나와
		kr_bn_google_Discovery	: 구글
		kr_SNS_REVU			: 레뷰
		kr_communities		: 커뮤
		kr_da_naver-brandsearch		: 네이버브랜드
		kr_da_naver-productsearch	: 네이버신제품
		kr_da_naver-gfa				: 네이버gfa
		kr_vd_youtube		: 유튜브
		kr_QRcode		: QR코드
	**/
	function exBannerLinkAd(strAd, type) {
		let returnStr = "";

		if(strAd.indexOf("cmpid=kr_vd_cj_youtube") != -1){
			returnStr = "(CJTVE_유튜브)";
		} else if(strAd.indexOf("cmpid=kr_sns_fb_ig") != -1){
			returnStr = "(페북인스타)";
		} else if(strAd.indexOf("cmpid=kr_da_kakao") != -1){
			returnStr = "(카카오)";
		} else if(strAd.indexOf("cmpid=kr_bn_danawa") != -1){
			returnStr = "(다나와)";
		} else if(strAd.indexOf("cmpid=kr_bn_google_discovery") != -1){
			returnStr = "(구글)";
		} else if(strAd.indexOf("cmpid=kr_sns_revu") != -1){
			returnStr = "(레뷰)";
		} else if(strAd.indexOf("cmpid=kr_communities") != -1){
			returnStr = "(커뮤)";
		} else if(strAd.indexOf("cmpid=kr_da_naver-brandsearch") != -1){
			returnStr = "(네이버브랜드)";
		} else if(strAd.indexOf("cmpid=kr_da_naver-productsearch") != -1){
			returnStr = "(네이버신제품)";
		} else if(strAd.indexOf("cmpid=kr_da_naver-gfa") != -1){
			returnStr = "(네이버gfa)";
		} else if(strAd.indexOf("cmpid=kr_vd_youtube") != -1){
			returnStr = "(유튜브)";
		} else if(strAd.indexOf("cmpid=kr_qrcode") != -1){
			returnStr = "(QR코드)";
		}

		if(type == "event") {
			let arrUrl = strAd.split("?");
			returnStr = arrUrl[0] + returnStr;
		}
		return returnStr;
	}
	/** cmpid 외부경로유입페이지 타이틀추가 **/
	
	switch(site_sec_length){
		case 1:
			s.prop1=prop1;
			s.channel=s.prop1;
			break;
		case 2:
			s.prop1=prop1;
			s.prop2=prop1 + gb + prop2;
			s.channel=s.prop2;
			break;
		case 3:
			s.prop1=prop1;
			s.prop2=prop1 + gb + prop2;
			s.prop3=prop1 + gb + prop2 + gb + prop3;
			s.channel=s.prop3;
			break;
		case 4:
			s.prop1=prop1;
			s.prop2=prop1 + gb + prop2;
			s.prop3=prop1 + gb + prop2 + gb + prop3;
			s.prop4=prop1 + gb + prop2 + gb + prop3 + gb + prop4;
			s.channel=s.prop4;
			break;
		case 5:
			s.prop1=prop1;
			s.prop2=prop1 + gb + prop2;
			s.prop3=prop1 + gb + prop2 + gb + prop3;
			s.prop4=prop1 + gb + prop2 + gb + prop3 + gb + prop4 + gb + prop5;
			s.channel=s.prop4;
			break;
		case 6:
			s.prop1=prop1;
			s.prop2=prop1 + gb + prop2;
			s.prop3=prop1 + gb + prop2 + gb + prop3;
			s.prop4=prop1 + gb + prop2 + gb + prop3 + gb + prop4 + gb + prop5;
			s.prop5=prop1 + gb + prop2 + gb + prop3 + gb + prop4 + gb + prop5 + gb + prop6;
			s.channel=s.prop5;
			break;
	}
	s.pageName = s.channel;
	console.log(' ~ file: sonystore_code_2013.js ~ line 972 ~ s', s);
	console.log(' ~ file: sonystore_code_2013.js ~ line 972 ~ channel',
		s.channel,
	);
	
	/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
	var s_code=s.t();if(s_code)document.write(s_code)
	})();
	/////////////////////////////////////////////////////////////////////////
	//////// omniture code tagging end - add by ssb 2021.10.01 //////////////
	/////////////////////////////////////////////////////////////////////////
	