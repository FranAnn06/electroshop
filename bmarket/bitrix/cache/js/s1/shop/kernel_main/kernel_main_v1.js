; /* /bitrix/js/main/core/core_dd.js?15956917723613*/
; /* /bitrix/js/main/core/core_timer.min.js?15956917724311*/
; /* /bitrix/js/main/dd.js?159569177714809*/
; /* /bitrix/js/main/rating_like.min.js?159569177221082*/
; /* /bitrix/js/main/session.min.js?15956917772511*/
; /* /bitrix/js/main/core/core_window.min.js?159569177275923*/
; /* /bitrix/js/main/date/main.date.min.js?159569177216360*/
; /* /bitrix/js/main/core/core_date.js?159569177233995*/
; /* /bitrix/js/main/utils.js?159569177730973*/
; /* /bitrix/js/main/core/core_fx.min.js?15956917729768*/

; /* Start:"a:4:{s:4:"full";s:45:"/bitrix/js/main/session.min.js?15956917772511";s:6:"source";s:26:"/bitrix/js/main/session.js";s:3:"min";s:30:"/bitrix/js/main/session.min.js";s:3:"map";s:30:"/bitrix/js/main/session.map.js";}"*/
function CBXSession(){var e=this;this.mess={};this.timeout=null;this.sessid=null;this.bShowMess=true;this.dateStart=new Date;this.dateInput=new Date;this.dateCheck=new Date;this.activityInterval=0;this.notifier=null;this.Expand=function(t,i,s,n){this.timeout=t;this.sessid=i;this.bShowMess=s;this.key=n;BX.ready(function(){BX.bind(document,"keypress",e.OnUserInput);BX.bind(document.body,"mousemove",e.OnUserInput);BX.bind(document.body,"click",e.OnUserInput);setTimeout(e.CheckSession,(e.timeout-60)*1e3)})};this.OnUserInput=function(){var t=new Date;e.dateInput.setTime(t.valueOf())};this.CheckSession=function(){var t=new Date;if(t.valueOf()-e.dateCheck.valueOf()<3e4)return;e.activityInterval=Math.round((e.dateInput.valueOf()-e.dateStart.valueOf())/1e3);e.dateStart.setTime(e.dateInput.valueOf());var i=e.activityInterval>e.timeout?e.timeout-60:e.activityInterval;var s={method:"GET",dataType:"html",url:"/bitrix/tools/public_session.php?sessid="+e.sessid+"&interval="+i+"&k="+e.key,data:"",onsuccess:function(t){e.CheckResult(t)},lsId:"sess_expand",lsTimeout:60};if(i>0){s.lsForce=true}BX.ajax(s)};this.CheckResult=function(t){if(t=="SESSION_EXPIRED"){if(e.bShowMess){if(!e.notifier){e.notifier=document.body.appendChild(BX.create("DIV",{props:{className:"bx-session-message"},style:{top:"0px",backgroundColor:"#FFEB41",border:"1px solid #EDDA3C",width:"630px",fontFamily:"Arial,Helvetica,sans-serif",fontSize:"13px",fontWeight:"bold",textAlign:"center",color:"black",position:"absolute",zIndex:"10000",padding:"10px"},html:'<a class="bx-session-message-close" style="display:block; width:12px; height:12px; background:url(/bitrix/js/main/core/images/close.gif) center no-repeat; float:right;" href="javascript:bxSession.Close()"></a>'+e.mess.messSessExpired}));var i=BX.GetWindowScrollPos();var s=BX.GetWindowInnerSize();e.notifier.style.left=parseInt(i.scrollLeft+s.innerWidth/2-parseInt(e.notifier.clientWidth)/2)+"px";if(BX.browser.IsIE()){e.notifier.style.top=i.scrollTop+"px";BX.bind(window,"scroll",function(){var t=BX.GetWindowScrollPos();e.notifier.style.top=t.scrollTop+"px"})}else{e.notifier.style.position="fixed"}}e.notifier.style.display=""}}else{var n;if(t=="SESSION_CHANGED")n=e.timeout-60;else n=e.activityInterval<60?60:e.activityInterval>e.timeout?e.timeout-60:e.activityInterval;var o=new Date;e.dateCheck.setTime(o.valueOf());setTimeout(e.CheckSession,n*1e3)}};this.Close=function(){this.notifier.style.display="none"}}var bxSession=new CBXSession;
/* End */
;
; /* Start:"a:4:{s:4:"full";s:55:"/bitrix/js/main/core/core_window.min.js?159569177275923";s:6:"source";s:35:"/bitrix/js/main/core/core_window.js";s:3:"min";s:39:"/bitrix/js/main/core/core_window.min.js";s:3:"map";s:39:"/bitrix/js/main/core/core_window.map.js";}"*/
(function(window){if(BX.WindowManager)return;BX.WindowManager={_stack:[],_runtime_resize:{},_delta:2,_delta_start:1e3,currently_loaded:null,settings_category:"BX.WindowManager.9.5",register:function(t){this.currently_loaded=null;var e=t.Get();e.style.zIndex=t.zIndex=this.GetZIndex();t.WM_REG_INDEX=this._stack.length;this._stack.push(t);if(this._stack.length<2){BX.bind(document,"keyup",BX.proxy(this.__checkKeyPress,this))}},unregister:function(t){if(null==t.WM_REG_INDEX)return null;var e;if(this._stack.length>0){while((e=this.__pop_stack())!=t){if(!e){e=null;break}}if(this._stack.length<=0){this.enableKeyCheck()}return e}else{return null}},__pop_stack:function(t){if(this._stack.length>0){var e=this._stack.pop();e.WM_REG_INDEX=null;BX.onCustomEvent(e,"onWindowUnRegister",[t===true]);return e}else return null},clean:function(){while(this.__pop_stack(true)){}this._stack=null;this.disableKeyCheck()},Get:function(){if(this.currently_loaded)return this.currently_loaded;else if(this._stack.length>0)return this._stack[this._stack.length-1];else return null},setStartZIndex:function(t){this._delta_start=t},restoreStartZIndex:function(){this._delta_start=1e3},GetZIndex:function(){var t;return null!=(t=this._stack[this._stack.length-1])?parseInt(t.Get().style.zIndex)+this._delta:this._delta_start},__get_check_url:function(t){var e=t.indexOf("?");return e==-1?t:t.substring(0,e)},saveWindowSize:function(t,e){var i=this.__get_check_url(t);if(BX.userOptions){BX.userOptions.save(this.settings_category,"size_"+i,"width",e.width);BX.userOptions.save(this.settings_category,"size_"+i,"height",e.height)}this._runtime_resize[i]=e},saveWindowOptions:function(t,e){if(BX.userOptions){for(var i in e){if(e.hasOwnProperty(i)){BX.userOptions.save(this.settings_category,"options_"+t,i,e[i])}}}},getRuntimeWindowSize:function(t){return this._runtime_resize[this.__get_check_url(t)]},disableKeyCheck:function(){BX.unbind(document,"keyup",BX.proxy(this.__checkKeyPress,this))},enableKeyCheck:function(){BX.bind(document,"keyup",BX.proxy(this.__checkKeyPress,this))},__checkKeyPress:function(t){if(null==t)t=window.event;if(t.keyCode==27){var e=BX.WindowManager.Get();if(e&&!e.unclosable)e.Close()}}};BX.garbage(BX.WindowManager.clean,BX.WindowManager);BX.CWindowButton=function(t){if(t.btn){this.btn=t.btn;this.parentWindow=t.parentWindow;if(/save|apply/i.test(this.btn.name)){BX.bind(this.btn,"click",BX.delegate(this.disableUntilError,this))}}else{this.title=t.title;this.hint=t.hint;this.id=t.id;this.name=t.name;this.className=t.className;this.action=t.action;this.onclick=t.onclick;if(t.Button&&BX.type.isFunction(t.Button))this.Button=t.Button;this.btn=null}};BX.CWindowButton.prototype.disable=function(){if(this.btn)this.parentWindow.showWait(this.btn)};BX.CWindowButton.prototype.enable=function(){if(this.btn)this.parentWindow.closeWait(this.btn)};BX.CWindowButton.prototype.emulate=function(){if(this.btn&&this.btn.disabled)return;var t=this.action?BX.delegate(this.action,this):this.onclick?this.onclick:this.btn?this.btn.getAttribute("onclick"):"";if(t){setTimeout(t,50);if(this.btn&&/save|apply/i.test(this.btn.name)&&!this.action){this.disableUntilError()}}};BX.CWindowButton.prototype.Button=function(parentWindow){this.parentWindow=parentWindow;var btn={props:{type:"button",name:this.id?this.id:this.name,value:this.title?this.title:this.name,id:this.id}};if(this.hint)btn.props.title=this.hint;if(!!this.className)btn.props.className=this.className;if(this.action){btn.events={click:BX.delegate(this.action,this)}}else if(this.onclick){if(BX.browser.IsIE()){btn.events={click:BX.delegate(function(){eval(this.onclick)},this)}}else{btn.attrs={onclick:this.onclick}}}this.btn=BX.create("INPUT",btn);return this.btn};BX.CWindowButton.prototype.disableUntilError=function(){this.disable();if(!this.__window_error_handler_set){BX.addCustomEvent(this.parentWindow,"onWindowError",BX.delegate(this.enable,this));this.__window_error_handler_set=true}};BX.CWindow=function(t,e){this.DIV=t||document.createElement("DIV");this.SETTINGS={resizable:false,min_height:0,min_width:0,top:0,left:0,draggable:false,drag_restrict:true,resize_restrict:true};this.ELEMENTS={draggable:[],resizer:[],close:[]};this.type=e=="float"?"float":"dialog";BX.adjust(this.DIV,{props:{className:"bx-core-window"},style:{zIndex:0,position:"absolute",display:"none",top:this.SETTINGS.top+"px",left:this.SETTINGS.left+"px",height:"100px",width:"100px"}});this.isOpen=false;BX.addCustomEvent(this,"onWindowRegister",BX.delegate(this.onRegister,this));BX.addCustomEvent(this,"onWindowUnRegister",BX.delegate(this.onUnRegister,this));this.MOUSEOVER=null;BX.bind(this.DIV,"mouseover",BX.delegate(this.__set_msover,this));BX.bind(this.DIV,"mouseout",BX.delegate(this.__unset_msover,this));BX.ready(BX.delegate(function(){document.body.appendChild(this.DIV)},this))};BX.CWindow.prototype.Get=function(){return this.DIV};BX.CWindow.prototype.visible=function(){return this.isOpen};BX.CWindow.prototype.Show=function(t){this.DIV.style.display="block";if(!t){BX.WindowManager.register(this);BX.onCustomEvent(this,"onWindowRegister")}};BX.CWindow.prototype.Hide=function(){BX.WindowManager.unregister(this);this.DIV.style.display="none"};BX.CWindow.prototype.onRegister=function(){this.isOpen=true};BX.CWindow.prototype.onUnRegister=function(t){this.isOpen=false;if(t||this.PARAMS&&this.PARAMS.content_url){if(t){BX.onCustomEvent(this,"onWindowClose",[this,true])}if(this.DIV.parentNode)this.DIV.parentNode.removeChild(this.DIV)}else{this.DIV.style.display="none"}};BX.CWindow.prototype.CloseDialog=BX.CWindow.prototype.Close=function(t){BX.onCustomEvent(this,"onBeforeWindowClose",[this]);if(t!==true){if(this.denyClose)return false}BX.onCustomEvent(this,"onWindowClose",[this]);if(this.bExpanded){var e=BX.GetDocElement();BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));e.style.overflow=this.__expand_settings.overflow}BX.WindowManager.unregister(this);return true};BX.CWindow.prototype.SetResize=function(t){t.style.cursor="se-resize";BX.bind(t,"mousedown",BX.proxy(this.__startResize,this));this.ELEMENTS.resizer.push(t);this.SETTINGS.resizable=true};BX.CWindow.prototype.SetExpand=function(t,e){e=e||"click";BX.bind(t,e,BX.proxy(this.__expand,this))};BX.CWindow.prototype.__expand_onresize=function(){var t=BX.GetWindowInnerSize();this.DIV.style.width=t.innerWidth+"px";this.DIV.style.height=t.innerHeight+"px";BX.onCustomEvent(this,"onWindowResize")};BX.CWindow.prototype.__expand=function(){var t=BX.GetDocElement();if(!this.bExpanded){var e=BX.GetWindowScrollPos(),i=BX.GetWindowInnerSize();this.__expand_settings={resizable:this.SETTINGS.resizable,draggable:this.SETTINGS.draggable,width:this.DIV.style.width,height:this.DIV.style.height,left:this.DIV.style.left,top:this.DIV.style.top,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft,overflow:BX.style(t,"overflow")};this.SETTINGS.resizable=false;this.SETTINGS.draggable=false;window.scrollTo(0,0);t.style.overflow="hidden";this.DIV.style.top="0px";this.DIV.style.left="0px";this.DIV.style.width=i.innerWidth+"px";this.DIV.style.height=i.innerHeight+"px";this.bExpanded=true;BX.onCustomEvent(this,"onWindowExpand");BX.onCustomEvent(this,"onWindowResize");BX.bind(window,"resize",BX.proxy(this.__expand_onresize,this))}else{BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));this.SETTINGS.resizable=this.__expand_settings.resizable;this.SETTINGS.draggable=this.__expand_settings.draggable;t.style.overflow=this.__expand_settings.overflow;this.DIV.style.top=this.__expand_settings.top;this.DIV.style.left=this.__expand_settings.left;this.DIV.style.width=this.__expand_settings.width;this.DIV.style.height=this.__expand_settings.height;window.scrollTo(this.__expand_settings.scrollLeft,this.__expand_settings.scrollTop);this.bExpanded=false;BX.onCustomEvent(this,"onWindowNarrow");BX.onCustomEvent(this,"onWindowResize")}};BX.CWindow.prototype.Resize=function(t,e){var i=Math.max(t-this.pos.left+this.dx,this.SETTINGS.min_width);var s=Math.max(e-this.pos.top+this.dy,this.SETTINGS.min_height);if(this.SETTINGS.resize_restrict){var o=BX.GetWindowScrollSize();if(this.pos.left+i>o.scrollWidth-this.dw)i=o.scrollWidth-this.pos.left-this.dw}this.DIV.style.width=i+"px";this.DIV.style.height=s+"px";BX.onCustomEvent(this,"onWindowResize")};BX.CWindow.prototype.__startResize=function(t){if(!this.SETTINGS.resizable)return false;if(!t)t=window.event;this.wndSize=BX.GetWindowScrollPos();this.wndSize.innerWidth=BX.GetWindowInnerSize().innerWidth;this.pos=BX.pos(this.DIV);this.x=t.clientX+this.wndSize.scrollLeft;this.y=t.clientY+this.wndSize.scrollTop;this.dx=this.pos.left+this.pos.width-this.x;this.dy=this.pos.top+this.pos.height-this.y;this.dw=this.pos.width-parseInt(this.DIV.style.width);BX.bind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.bind(document,"mouseup",BX.proxy(this.__stopResize,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="se-resize";BX.onCustomEvent(this,"onWindowResizeStart");return true};BX.CWindow.prototype.__moveResize=function(t){if(!t)t=window.event;var e=BX.GetWindowScrollPos();var i=t.clientX+e.scrollLeft;var s=t.clientY+e.scrollTop;if(this.x==i&&this.y==s)return;this.Resize(i,s);this.x=i;this.y=s};BX.CWindow.prototype.__stopResize=function(){if(document.body.releaseCapture)document.body.releaseCapture();BX.unbind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.unbind(document,"mouseup",BX.proxy(this.__stopResize,this));document.onmousedown=null;var t=document.body;t.ondrag=t.onselectstart=null;t.style.MozUserSelect=this.DIV.style.MozUserSelect="";t.style.cursor="";BX.onCustomEvent(this,"onWindowResizeFinished")};BX.CWindow.prototype.SetClose=function(t){BX.bind(t,"click",BX.proxy(this.Close,this));this.ELEMENTS.close.push(t)};BX.CWindow.prototype.SetDraggable=function(t){BX.bind(t,"mousedown",BX.proxy(this.__startDrag,this));t.style.cursor="move";this.ELEMENTS.draggable.push(t);this.SETTINGS.draggable=true};BX.CWindow.prototype.Move=function(t,e){var i=1;var s=parseInt(this.DIV.style.left)+t;var o=parseInt(this.DIV.style.top)+e;if(this.SETTINGS.drag_restrict){if(s<0)s=0;var n=BX.GetWindowScrollSize();var r=this.DIV.offsetWidth;var h=this.DIV.offsetHeight;if(s>n.scrollWidth-r-i)s=n.scrollWidth-r-i;var a=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight,n.scrollHeight);if(o>a-h-i)o=a-h-i;if(o<0)o=0}this.DIV.style.left=s+"px";this.DIV.style.top=o+"px"};BX.CWindow.prototype.__startDrag=function(t){if(!this.SETTINGS.draggable)return false;if(!t)t=window.event;this.x=t.clientX+document.body.scrollLeft;this.y=t.clientY+document.body.scrollTop;this.__bWasDragged=false;BX.bind(document,"mousemove",BX.proxy(this.__moveDrag,this));BX.bind(document,"mouseup",BX.proxy(this.__stopDrag,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="move";return BX.PreventDefault(t)};BX.CWindow.prototype.__moveDrag=function(t){if(!t)t=window.event;var e=t.clientX+document.body.scrollLeft;var i=t.clientY+document.body.scrollTop;if(this.x==e&&this.y==i)return;this.Move(e-this.x,i-this.y);this.x=e;this.y=i;if(!this.__bWasDragged){BX.onCustomEvent(this,"onWindowDragStart");this.__bWasDragged=true;BX.bind(BX.proxy_context,"click",BX.PreventDefault)}BX.onCustomEvent(this,"onWindowDrag")};BX.CWindow.prototype.__stopDrag=function(t){if(document.body.releaseCapture)document.body.releaseCapture();BX.unbind(document,"mousemove",BX.proxy(this.__moveDrag,this));BX.unbind(document,"mouseup",BX.proxy(this.__stopDrag,this));document.onmousedown=null;var e=document.body;e.ondrag=e.onselectstart=null;e.style.MozUserSelect=this.DIV.style.MozUserSelect="";e.style.cursor="";if(this.__bWasDragged){BX.onCustomEvent(this,"onWindowDragFinished");var i=BX.proxy_context;setTimeout(function(){BX.unbind(i,"click",BX.PreventDefault)},100);this.__bWasDragged=false}return BX.PreventDefault(t)};BX.CWindow.prototype.DenyClose=function(){this.denyClose=true};BX.CWindow.prototype.AllowClose=function(){this.denyClose=false};BX.CWindow.prototype.ShowError=function(t){BX.onCustomEvent(this,"onWindowError",[t]);if(this._wait)BX.closeWait(this._wait);window.alert(t)};BX.CWindow.prototype.__set_msover=function(){this.MOUSEOVER=true};BX.CWindow.prototype.__unset_msover=function(){this.MOUSEOVER=false};BX.CWindowDialog=function(){var t=arguments;t[1]="dialog";BX.CWindowDialog.superclass.constructor.apply(this,t);this.DIV.style.top="10px";this.OVERLAY=null};BX.extend(BX.CWindowDialog,BX.CWindow);BX.CWindowDialog.prototype.__resizeOverlay=function(){var t=BX.GetWindowScrollSize();this.OVERLAY.style.width=t.scrollWidth+"px"};BX.CWindowDialog.prototype.CreateOverlay=function(t){if(null==this.OVERLAY){var e=BX.GetWindowScrollSize();var i=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight,e.scrollHeight);this.OVERLAY=document.body.appendChild(BX.create("DIV",{style:{position:"absolute",top:"0px",left:"0px",zIndex:t||parseInt(this.DIV.style.zIndex)-2,width:e.scrollWidth+"px",height:i+"px"}}))}return this.OVERLAY};BX.CWindowDialog.prototype.Show=function(){BX.CWindowDialog.superclass.Show.apply(this,arguments);this.CreateOverlay();this.OVERLAY.style.display="block";this.OVERLAY.style.zIndex=parseInt(this.DIV.style.zIndex)-2;BX.unbind(window,"resize",BX.proxy(this.__resizeOverlay,this));BX.bind(window,"resize",BX.proxy(this.__resizeOverlay,this))};BX.CWindowDialog.prototype.onUnRegister=function(t){BX.CWindowDialog.superclass.onUnRegister.apply(this,arguments);if(this.clean){if(this.OVERLAY.parentNode)this.OVERLAY.parentNode.removeChild(this.OVERLAY)}else{this.OVERLAY.style.display="none"}BX.unbind(window,"resize",BX.proxy(this.__resizeOverlay,this))};BX.CDialog=function(t){BX.CDialog.superclass.constructor.apply(this);this._sender="core_window_cdialog";this.PARAMS=t||{};for(var e in this.defaultParams){if(typeof this.PARAMS[e]=="undefined")this.PARAMS[e]=this.defaultParams[e]}this.PARAMS.width=!isNaN(parseInt(this.PARAMS.width))?this.PARAMS.width:this.defaultParams["width"];this.PARAMS.height=!isNaN(parseInt(this.PARAMS.height))?this.PARAMS.height:this.defaultParams["height"];if(this.PARAMS.resize_id||this.PARAMS.content_url){var i=BX.WindowManager.getRuntimeWindowSize(this.PARAMS.resize_id||this.PARAMS.content_url);if(i){this.PARAMS.width=i.width;this.PARAMS.height=i.height}}BX.addClass(this.DIV,"bx-core-adm-dialog");this.DIV.id="bx-admin-prefix";this.PARTS={};this.DIV.style.height=null;this.DIV.style.width=null;this.PARTS.TITLEBAR=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head"}}));this.PARTS.TITLE_CONTAINER=this.PARTS.TITLEBAR.appendChild(BX.create("SPAN",{props:{className:"bx-core-adm-dialog-head-inner"},text:this.PARAMS.title}));this.PARTS.TITLEBAR_ICONS=this.PARTS.TITLEBAR.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head-icons"},children:this.PARAMS.resizable?[BX.create("SPAN",{props:{className:"bx-core-adm-icon-expand",title:BX.message("JS_CORE_WINDOW_EXPAND")}}),BX.create("SPAN",{props:{className:"bx-core-adm-icon-close",title:BX.message("JS_CORE_WINDOW_CLOSE")}})]:[BX.create("SPAN",{props:{className:"bx-core-adm-icon-close",title:BX.message("JS_CORE_WINDOW_CLOSE")}})]}));this.PARTS.CONTENT=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-content-wrap adm-workarea"}}));this.PARTS.CONTENT_DATA=this.PARTS.CONTENT.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-content"},style:{height:this.PARAMS.height+"px",width:this.PARAMS.width+"px"}}));this.PARTS.HEAD=this.PARTS.CONTENT_DATA.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head-block"+(this.PARAMS.icon?" "+this.PARAMS.icon:"")}}));this.SetHead(this.PARAMS.head);this.SetContent(this.PARAMS.content);this.SetTitle(this.PARAMS.title);this.SetClose(this.PARTS.TITLEBAR_ICONS.lastChild);if(this.PARAMS.resizable){this.SetExpand(this.PARTS.TITLEBAR_ICONS.firstChild);this.SetExpand(this.PARTS.TITLEBAR,"dblclick");BX.addCustomEvent(this,"onWindowExpand",BX.proxy(this.__onexpand,this));BX.addCustomEvent(this,"onWindowNarrow",BX.proxy(this.__onexpand,this))}this.PARTS.FOOT=this.PARTS.BUTTONS_CONTAINER=this.PARTS.CONTENT.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-buttons"},children:this.ShowButtons()}));if(this.PARAMS.draggable)this.SetDraggable(this.PARTS.TITLEBAR);if(this.PARAMS.resizable){this.PARTS.RESIZER=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-resizer"}}));this.SetResize(this.PARTS.RESIZER);this.SETTINGS.min_width=this.PARAMS.min_width;this.SETTINGS.min_height=this.PARAMS.min_height}this.auth_callback=BX.delegate(function(){this.PARAMS.content="";this.hideNotify();this.Show()},this)};BX.extend(BX.CDialog,BX.CWindowDialog);BX.CDialog.prototype.defaultParams={width:700,height:400,min_width:500,min_height:300,resizable:true,draggable:true,title:"",icon:""};BX.CDialog.prototype.showWait=function(t){if(BX.type.isElementNode(t)&&(t.type=="button"||t.type=="submit")){BX.defer(function(){t.disabled=true})();var e=BX.hasClass(t,"adm-btn-save")||BX.hasClass(t,"adm-btn-save"),i=BX.pos(t,true);t.bxwaiter=this.PARTS.FOOT.appendChild(BX.create("DIV",{props:{className:"adm-btn-load-img"+(e?"-green":"")},style:{top:parseInt((i.bottom+i.top)/2-10)+"px",left:parseInt((i.right+i.left)/2-10)+"px"}}));BX.addClass(t,"adm-btn-load");this.lastWaitElement=t;return t.bxwaiter}return null};BX.CDialog.prototype.closeWait=function(t){t=t||this.lastWaitElement;if(BX.type.isElementNode(t)){if(t.bxwaiter){if(t.bxwaiter.parentNode){t.bxwaiter.parentNode.removeChild(t.bxwaiter)}t.bxwaiter=null}t.disabled=false;BX.removeClass(t,"adm-btn-load");if(this.lastWaitElement==t)this.lastWaitElement=null}};BX.CDialog.prototype.Authorize=function(t){this.bSkipReplaceContent=true;this.ShowError(BX.message("JSADM_AUTH_REQ"));BX.onCustomEvent(this,"onWindowError",[]);BX.closeWait();new BX.CAuthDialog({content_url:this.PARAMS.content_url,auth_result:t,callback:BX.delegate(function(){if(this.auth_callback)this.auth_callback()},this)}).Show()};BX.CDialog.prototype.ShowError=function(t){BX.onCustomEvent(this,"onWindowError",[t]);this.closeWait();if(this._wait)BX.closeWait(this._wait);this.Notify(t,true)};BX.CDialog.prototype.__expandGetSize=function(){var t=BX.GetDocElement();t.style.overflow="hidden";var e=BX.GetWindowInnerSize();t.scrollTop=0;this.DIV.style.top="-"+this.dxShadow+"px";this.DIV.style.left="-"+this.dxShadow+"px";return{width:e.innerWidth-parseInt(BX.style(this.PARTS.CONTENT,"padding-right"))-parseInt(BX.style(this.PARTS.CONTENT,"padding-left"))+this.dxShadow,height:e.innerHeight-this.PARTS.TITLEBAR.offsetHeight-this.PARTS.FOOT.offsetHeight-parseInt(BX.style(this.PARTS.CONTENT,"padding-top"))-parseInt(BX.style(this.PARTS.CONTENT,"padding-bottom"))+this.dxShadow}};BX.CDialog.prototype.__expand=function(){var t=BX.GetDocElement();this.dxShadow=2;if(!this.bExpanded){var e=BX.GetWindowScrollPos();this.__expand_settings={resizable:this.SETTINGS.resizable,draggable:this.SETTINGS.draggable,width:this.PARTS.CONTENT_DATA.style.width,height:this.PARTS.CONTENT_DATA.style.height,left:this.DIV.style.left,top:this.DIV.style.top,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft,overflow:BX.style(t,"overflow")};this.SETTINGS.resizable=false;this.SETTINGS.draggable=false;var i=this.__expandGetSize();this.PARTS.CONTENT_DATA.style.width=i.width+"px";this.PARTS.CONTENT_DATA.style.height=i.height+"px";window.scrollTo(0,0);t.style.overflow="hidden";this.bExpanded=true;BX.onCustomEvent(this,"onWindowExpand");BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{width:i.width,height:i.height}]);BX.bind(window,"resize",BX.proxy(this.__expand_onresize,this))}else{BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));this.SETTINGS.resizable=this.__expand_settings.resizable;this.SETTINGS.draggable=this.__expand_settings.draggable;t.style.overflow=this.__expand_settings.overflow;this.DIV.style.top=this.__expand_settings.top;this.DIV.style.left=this.__expand_settings.left;this.PARTS.CONTENT_DATA.style.width=this.__expand_settings.width;this.PARTS.CONTENT_DATA.style.height=this.__expand_settings.height;window.scrollTo(this.__expand_settings.scrollLeft,this.__expand_settings.scrollTop);this.bExpanded=false;BX.onCustomEvent(this,"onWindowNarrow");BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{width:parseInt(this.__expand_settings.width),height:parseInt(this.__expand_settings.height)}])}};BX.CDialog.prototype.__expand_onresize=function(){var t=this.__expandGetSize();this.PARTS.CONTENT_DATA.style.width=t.width+"px";this.PARTS.CONTENT_DATA.style.height=t.height+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[t])};BX.CDialog.prototype.__onexpand=function(){var t=this.PARTS.TITLEBAR_ICONS.firstChild;t.className=BX.toggle(t.className,["bx-core-adm-icon-expand","bx-core-adm-icon-narrow"]);t.title=BX.toggle(t.title,[BX.message("JS_CORE_WINDOW_EXPAND"),BX.message("JS_CORE_WINDOW_NARROW")]);if(this.PARTS.RESIZER){this.PARTS.RESIZER.style.display=this.bExpanded?"none":"block"}};BX.CDialog.prototype.__startResize=function(t){if(!this.SETTINGS.resizable)return false;if(!t)t=window.event;this.wndSize=BX.GetWindowScrollPos();this.wndSize.innerWidth=BX.GetWindowInnerSize().innerWidth;this.pos=BX.pos(this.PARTS.CONTENT_DATA);this.x=t.clientX+this.wndSize.scrollLeft;this.y=t.clientY+this.wndSize.scrollTop;this.dx=this.pos.left+this.pos.width-this.x;this.dy=this.pos.top+this.pos.height-this.y;this.dw=this.pos.width-parseInt(this.PARTS.CONTENT_DATA.style.width)+parseInt(BX.style(this.PARTS.CONTENT,"padding-right"));BX.bind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.bind(document,"mouseup",BX.proxy(this.__stopResize,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="se-resize";BX.onCustomEvent(this,"onWindowResizeStart");return true};BX.CDialog.prototype.Resize=function(t,e){var i=Math.max(t-this.pos.left+this.dx,this.SETTINGS.min_width);var s=Math.max(e-this.pos.top+this.dy,this.SETTINGS.min_height);if(this.SETTINGS.resize_restrict){var o=BX.GetWindowScrollSize();if(this.pos.left+i>o.scrollWidth-this.dw)i=o.scrollWidth-this.pos.left-this.dw}this.PARTS.CONTENT_DATA.style.width=i+"px";this.PARTS.CONTENT_DATA.style.height=s+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{height:s,width:i}])};BX.CDialog.prototype.SetSize=function(t){this.PARTS.CONTENT_DATA.style.width=t.width+"px";this.PARTS.CONTENT_DATA.style.height=t.height+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[t])};BX.CDialog.prototype.GetParameters=function(t){var e=this.GetForm();if(!e)return"";var i,s="";var o=e.elements.length;var n="";for(i=0;i<o;i++){if(s!="")n="&";var r=e.elements[i];if(r.disabled)continue;switch(r.type.toLowerCase()){case"text":case"textarea":case"password":case"hidden":if(null==t&&r.name.substr(r.name.length-4)=="_alt"&&e.elements[r.name.substr(0,r.name.length-4)])break;s+=n+r.name+"="+BX.util.urlencode(r.value);break;case"radio":if(r.checked)s+=n+r.name+"="+BX.util.urlencode(r.value);break;case"checkbox":s+=n+r.name+"="+BX.util.urlencode(r.checked?"Y":"N");break;case"select-one":var h="";if(null==t&&e.elements[r.name+"_alt"]&&r.selectedIndex==0)h=e.elements[r.name+"_alt"].value;else h=r.value;s+=n+r.name+"="+BX.util.urlencode(h);break;case"select-multiple":var a,l=false;var d=r.options.length;for(a=0;a<d;a++){if(r.options[a].selected){s+=n+r.name+"="+BX.util.urlencode(r.options[a].value);l=true}}if(!l)s+=n+r.name+"=";break;default:break}}return s};BX.CDialog.prototype.PostParameters=function(t){var e=this.PARAMS.content_url;if(null==t)t="";t+=(t==""?"":"&")+"bxsender="+this._sender;var i=e.indexOf("?");if(i==-1)e+="?"+t;else e=e.substring(0,i)+"?"+t+"&"+e.substring(i+1);BX.showWait();this.auth_callback=BX.delegate(function(){this.hideNotify();this.PostParameters(t)},this);BX.ajax.Setup({skipAuthCheck:true},true);BX.ajax.post(e,this.GetParameters(),BX.delegate(function(t){BX.closeWait();if(!this.bSkipReplaceContent){this.ClearButtons();this.SetContent(t);this.Show(true)}this.bSkipReplaceContent=false},this))};BX.CDialog.prototype.Submit=function(t,e){var i=this.GetForm();if(i){i.onsubmit=null;i.method="POST";if(!i.action||e){e=e||this.PARAMS.content_url;if(null!=t){var s=e.indexOf("?");if(s==-1)e+="?"+t;else e=e.substring(0,s)+"?"+t+"&"+e.substring(s+1)}i.action=e}if(!i._bxsender){i._bxsender=i.appendChild(BX.create("INPUT",{attrs:{type:"hidden",name:"bxsender",value:this._sender}}))}this._wait=BX.showWait();this.auth_callback=BX.delegate(function(){this.hideNotify();this.Submit(t)},this);BX.ajax.submit(i,BX.delegate(function(){this.closeWait()},this))}else{window.alert("no form registered!")}};BX.CDialog.prototype.GetForm=function(){if(null==this.__form){var t=this.PARTS.CONTENT_DATA.getElementsByTagName("FORM");this.__form=t[0]?t[0]:null}return this.__form};BX.CDialog.prototype.GetRealForm=function(){if(null==this.__rform){var t=this.PARTS.CONTENT_DATA.getElementsByTagName("FORM");this.__rform=t[1]?t[1]:t[0]?t[0]:null}return this.__rform};BX.CDialog.prototype._checkButton=function(t){var e=["btnSave","btnCancel","btnClose"];for(var i=0;i<e.length;i++){if(this[e[i]]&&t==this[e[i]])return e[i]}return false};BX.CDialog.prototype.ShowButtons=function(){var t=[];if(this.PARAMS.buttons){if(this.PARAMS.buttons.title)this.PARAMS.buttons=[this.PARAMS.buttons];for(var e=0,i=this.PARAMS.buttons.length;e<i;e++){if(BX.type.isNotEmptyString(this.PARAMS.buttons[e])){t.push(this.PARAMS.buttons[e])}else if(BX.type.isElementNode(this.PARAMS.buttons[e])){t.push(this.PARAMS.buttons[e])}else if(this.PARAMS.buttons[e]){if(!BX.is_subclass_of(this.PARAMS.buttons[e],BX.CWindowButton)){var s=this._checkButton(this.PARAMS.buttons[e]);this.PARAMS.buttons[e]=new BX.CWindowButton(this.PARAMS.buttons[e]);if(s)this[s]=this.PARAMS.buttons[e]}t.push(this.PARAMS.buttons[e].Button(this))}}}return t};BX.CDialog.prototype.setAutosave=function(){if(!this.bSetAutosaveDelay){this.bSetAutosaveDelay=true;setTimeout(BX.proxy(this.setAutosave,this),10)}};BX.CDialog.prototype.SetTitle=function(t){this.PARAMS.title=t;BX.cleanNode(this.PARTS.TITLE_CONTAINER).appendChild(document.createTextNode(this.PARAMS.title))};BX.CDialog.prototype.SetHead=function(t){this.PARAMS.head=BX.util.trim(t);this.PARTS.HEAD.innerHTML=this.PARAMS.head||"&nbsp;";this.PARTS.HEAD.style.display=this.PARAMS.head?"block":"none";this.adjustSize()};BX.CDialog.prototype.Notify=function(t,e,i){if(!this.PARTS.NOTIFY){this.PARTS.NOTIFY=this.DIV.insertBefore(BX.create("DIV",{props:{className:"adm-warning-block"},children:[BX.create("SPAN",{props:{className:"adm-warning-text"}}),BX.create("SPAN",{props:{className:"adm-warning-icon"}}),BX.create("SPAN",{props:{className:"adm-warning-close"},events:{click:BX.proxy(this.hideNotify,this)}})]}),this.DIV.firstChild)}if(e)BX.addClass(this.PARTS.NOTIFY,"adm-warning-block-red");else BX.removeClass(this.PARTS.NOTIFY,"adm-warning-block-red");if(i!==true){t=BX.util.htmlspecialchars(t)}this.PARTS.NOTIFY.firstChild.innerHTML=t||"&nbsp;";this.PARTS.NOTIFY.firstChild.style.width=this.PARAMS.width-50+"px";BX.removeClass(this.PARTS.NOTIFY,"adm-warning-animate")};BX.CDialog.prototype.hideNotify=function(){BX.addClass(this.PARTS.NOTIFY,"adm-warning-animate")};BX.CDialog.prototype.__adjustHeadToIcon=function(){if(!this.PARTS.HEAD.offsetHeight){setTimeout(BX.delegate(this.__adjustHeadToIcon,this),50)}else{if(this.icon_image&&this.icon_image.height&&this.icon_image.height>this.PARTS.HEAD.offsetHeight-5){this.PARTS.HEAD.style.height=this.icon_image.height+5+"px";this.adjustSize()}this.icon_image.onload=null;this.icon_image=null}};BX.CDialog.prototype.SetIcon=function(t){if(this.PARAMS.icon!=t){if(this.PARAMS.icon)BX.removeClass(this.PARTS.HEAD,this.PARAMS.icon);this.PARAMS.icon=t;if(this.PARAMS.icon){BX.addClass(this.PARTS.HEAD,this.PARAMS.icon);var e=BX.style(this.PARTS.HEAD,"background-image")||BX.style(this.PARTS.HEAD,"backgroundImage");if(BX.type.isNotEmptyString(e)&&e!="none"){var i=e.match(new RegExp("url\\s*\\(\\s*('|\"|)(.+?)(\\1)\\s*\\)"));if(i){e=i[2];if(BX.type.isNotEmptyString(e)){this.icon_image=new Image;this.icon_image.onload=BX.delegate(this.__adjustHeadToIcon,this);this.icon_image.src=e}}}}}this.adjustSize()};BX.CDialog.prototype.SetIconFile=function(t){this.icon_image=new Image;this.icon_image.onload=BX.delegate(this.__adjustHeadToIcon,this);this.icon_image.src=t;BX.adjust(this.PARTS.HEAD,{style:{backgroundImage:"url("+t+")",backgroundPosition:"right 9px"}});this.adjustSize()};BX.CDialog.prototype.SetButtons=function(t){if(BX.type.isString(t)){if(t.length>0){this.PARTS.BUTTONS_CONTAINER.innerHTML+=t;var e=this.PARTS.BUTTONS_CONTAINER.getElementsByTagName("INPUT");if(e.length>0){this.PARAMS.buttons=[];for(var i=0;i<e.length;i++){this.PARAMS.buttons.push(new BX.CWindowButton({btn:e[i],parentWindow:this}))}}}}else{this.PARAMS.buttons=t;BX.adjust(this.PARTS.BUTTONS_CONTAINER,{children:this.ShowButtons()})}this.adjustSize()};BX.CDialog.prototype.ClearButtons=function(){BX.cleanNode(this.PARTS.BUTTONS_CONTAINER);this.adjustSize()};BX.CDialog.prototype.SetContent=function(t){this.__form=null;if(BX.type.isElementNode(t)){if(t.parentNode)t.parentNode.removeChild(t)}else if(BX.type.isString(t)){t=BX.create("DIV",{html:t})}this.PARAMS.content=t;BX.cleanNode(this.PARTS.CONTENT_DATA);BX.adjust(this.PARTS.CONTENT_DATA,{children:[this.PARTS.HEAD,BX.create("DIV",{props:{className:"bx-core-adm-dialog-content-wrap-inner"},children:[this.PARAMS.content]})]});if(this.PARAMS.content_url&&this.GetForm()){this.__form.submitbtn=this.__form.appendChild(BX.create("INPUT",{props:{type:"submit"},style:{display:"none"}}));this.__form.onsubmit=BX.delegate(this.__submit,this)}};BX.CDialog.prototype.__submit=function(t){for(var e=0,i=this.PARAMS.buttons.length;e<i;e++){if(this.PARAMS.buttons[e]&&(this.PARAMS.buttons[e].name&&/save|apply/i.test(this.PARAMS.buttons[e].name)||this.PARAMS.buttons[e].btn&&this.PARAMS.buttons[e].btn.name&&/save|apply/i.test(this.PARAMS.buttons[e].btn.name))){this.PARAMS.buttons[e].emulate();break}}return BX.PreventDefault(t)};BX.CDialog.prototype.SwapContent=function(t){t=BX(t);BX.cleanNode(this.PARTS.CONTENT_DATA);t.parentNode.removeChild(t);this.PARTS.CONTENT_DATA.appendChild(t);t.style.display="block";this.SetContent(t.innerHTML)};BX.CDialog.prototype.adjustSize=function(){};BX.CDialog.prototype.__adjustSize=function(){};BX.CDialog.prototype.adjustSizeEx=function(){BX.defer(this.__adjustSizeEx,this)()};BX.CDialog.prototype.__adjustSizeEx=function(){var t=this.PARTS.CONTENT_DATA.firstChild,e=0,i,s;while(t){if(BX.type.isElementNode(t)){i=parseInt(BX.style(t,"margin-top"),10);if(isNaN(i))i=0;s=parseInt(BX.style(t,"margin-bottom"),10);if(isNaN(s))s=0;e+=t.offsetHeight+i+s}t=BX.nextSibling(t)}if(e)this.PARTS.CONTENT_DATA.style.height=e+"px"};BX.CDialog.prototype.__onResizeFinished=function(){BX.WindowManager.saveWindowSize(this.PARAMS.resize_id||this.PARAMS.content_url,{height:parseInt(this.PARTS.CONTENT_DATA.style.height),width:parseInt(this.PARTS.CONTENT_DATA.style.width)})};BX.CDialog.prototype.Show=function(t){if(!this.PARAMS.content&&this.PARAMS.content_url&&BX.ajax&&!t){var e=BX.showWait();BX.WindowManager.currently_loaded=this;var i=this.PARAMS.zIndex?this.PARAMS.zIndex:parseInt(BX.style(e,"z-index"))-1;this.CreateOverlay(i);this.OVERLAY.style.display="block";this.OVERLAY.className="bx-core-dialog-overlay";var s="",o="GET";if(this.PARAMS.content_post){s=this.PARAMS.content_post;o="POST"}var n=this.PARAMS.content_url+(this.PARAMS.content_url.indexOf("?")<0?"?":"&")+"bxsender="+this._sender;this.auth_callback=BX.delegate(function(){this.PARAMS.content="";this.hideNotify();this.Show()},this);BX.ajax({method:o,dataType:"html",url:n,data:s,skipAuthCheck:true,onsuccess:BX.delegate(function(t){BX.closeWait(null,e);this.SetContent(t||"&nbsp;");this.Show()},this)})}else{BX.WindowManager.currently_loaded=null;BX.CDialog.superclass.Show.apply(this,arguments);this.adjustPos();this.OVERLAY.className="bx-core-dialog-overlay";this.__adjustSize();BX.removeCustomEvent(this,"onWindowResize",BX.proxy(this.__adjustSize,this));BX.addCustomEvent(this,"onWindowResize",BX.proxy(this.__adjustSize,this));if(this.PARAMS.resizable&&(this.PARAMS.content_url||this.PARAMS.resize_id)){BX.removeCustomEvent(this,"onWindowResizeFinished",BX.proxy(this.__onResizeFinished,this));BX.addCustomEvent(this,"onWindowResizeFinished",BX.proxy(this.__onResizeFinished,this))}}};BX.CDialog.prototype.GetInnerPos=function(){return{width:parseInt(this.PARTS.CONTENT_DATA.style.width),height:parseInt(this.PARTS.CONTENT_DATA.style.height)}};BX.CDialog.prototype.adjustPos=function(){if(!this.bExpanded){var t=window;if(top.BX.SidePanel&&top.BX.SidePanel.Instance&&top.BX.SidePanel.Instance.getTopSlider()){t=top.BX.SidePanel.Instance.getTopSlider().getWindow()}var e=t.BX.GetWindowInnerSize();var i=t.BX.GetWindowScrollPos();var s={left:parseInt(i.scrollLeft+e.innerWidth/2-parseInt(this.DIV.offsetWidth)/2)+"px",top:Math.max(parseInt(i.scrollTop+e.innerHeight/2-parseInt(this.DIV.offsetHeight)/2),0)+"px"};if(this.PARAMS.zIndex){s["z-index"]=this.PARAMS.zIndex}BX.adjust(this.DIV,{style:s})}};BX.CDialog.prototype.GetContent=function(){return this.PARTS.CONTENT_DATA};BX.CDialog.prototype.btnSave=BX.CDialog.btnSave={title:BX.message("JS_CORE_WINDOW_SAVE"),id:"savebtn",name:"savebtn",className:BX.browser.IsIE()&&BX.browser.IsDoctype()&&!BX.browser.IsIE10()?"":"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.PostParameters()}};BX.CDialog.prototype.btnCancel=BX.CDialog.btnCancel={title:BX.message("JS_CORE_WINDOW_CANCEL"),id:"cancel",name:"cancel",action:function(){this.parentWindow.Close()}};BX.CDialog.prototype.btnClose=BX.CDialog.btnClose={title:BX.message("JS_CORE_WINDOW_CLOSE"),id:"close",name:"close",action:function(){this.parentWindow.Close()}};BX.CAdminDialog=function(t){BX.CAdminDialog.superclass.constructor.apply(this,arguments);this._sender="core_window_cadmindialog";BX.addClass(this.DIV,"bx-core-adm-admin-dialog");this.PARTS.CONTENT.insertBefore(this.PARTS.HEAD,this.PARTS.CONTENT.firstChild);this.PARTS.HEAD.className="bx-core-adm-dialog-tabs"};BX.extend(BX.CAdminDialog,BX.CDialog);BX.CAdminDialog.prototype.SetHead=function(){BX.CAdminDialog.superclass.SetHead.apply(this,arguments);if(this.PARTS.HEAD.firstChild&&BX.type.isElementNode(this.PARTS.HEAD.firstChild)){var t=this.PARTS.HEAD.firstChild,e=0,i=0,s=0;while(t){if(BX.type.isElementNode(t)){i=parseInt(BX.style(t,"margin-left"),10);if(isNaN(i))i=0;s=parseInt(BX.style(t,"margin-right"),10);if(isNaN(s))s=0;e+=t.offsetWidth+i+s}t=BX.nextSibling(t)}this.SETTINGS.min_width=Math.max(e,this.SETTINGS.min_width)-2;if(this.PARAMS.width<this.SETTINGS.min_width){BX.adjust(this.PARTS.CONTENT_DATA,{style:{width:this.SETTINGS.min_width+"px"}})}}};BX.CAdminDialog.prototype.SetContent=function(t){this.__form=null;if(BX.type.isElementNode(t)){if(t.parentNode)t.parentNode.removeChild(t)}this.PARAMS.content=t;BX.cleanNode(this.PARTS.CONTENT_DATA);BX.adjust(this.PARTS.CONTENT_DATA,{children:[this.PARAMS.content||"&nbsp;"]});if(this.PARAMS.content_url&&this.GetForm()){this.__form.appendChild(BX.create("INPUT",{props:{type:"submit"},style:{display:"none"}}));this.__form.onsubmit=BX.delegate(this.__submit,this)}};BX.CAdminDialog.prototype.__expandGetSize=function(){var t=BX.CAdminDialog.superclass.__expandGetSize.apply(this,arguments);t.width-=parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-right"))+parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-left"));t.height-=parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-top"))+parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-bottom"));t.height-=this.PARTS.HEAD.offsetHeight;return t};BX.CAdminDialog.prototype.Submit=function(){var t=this.GetForm();if(t&&!t["bxpublic"]&&!/bxpublic=/.test(t.action)){t.appendChild(BX.create("INPUT",{props:{type:"hidden",name:"bxpublic",value:"Y"}}))}return BX.CAdminDialog.superclass.Submit.apply(this,arguments)};BX.CAdminDialog.prototype.btnSave=BX.CAdminDialog.btnSave={title:BX.message("JS_CORE_WINDOW_SAVE"),id:"savebtn",name:"savebtn",className:"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.Submit()}};BX.CAdminDialog.btnCancel=BX.CAdminDialog.superclass.btnCancel;BX.CAdminDialog.btnClose=BX.CAdminDialog.superclass.btnClose;BX.CDebugDialog=function(t){BX.CDebugDialog.superclass.constructor.apply(this,arguments)};BX.extend(BX.CDebugDialog,BX.CDialog);BX.CDebugDialog.prototype.ShowDetails=function(t){var e=BX(t);if(e){if(this.div_detail_current)this.div_detail_current.style.display="none";e.style.display="block";this.div_detail_current=e}};BX.CDebugDialog.prototype.SetContent=function(t){if(!t)return;var e=t.split("#DIVIDER#");if(e.length>1){this.PARAMS.content=e[1];this.PARTS.CONTENT_DATA.style.overflow="hidden";BX.CDebugDialog.superclass.SetContent.apply(this,[e[1]]);this.PARTS.CONTENT_INNER=this.PARTS.CONTENT_DATA.firstChild.nextSibling;this.PARTS.CONTENT_TOP=this.PARTS.CONTENT_DATA.insertBefore(BX.create("DIV",{props:{className:"bx-debug-content-top"},html:e[0]}),this.PARTS.CONTENT_INNER);this.PARTS.CONTENT_INNER.style.overflow="auto"}else{BX.CDebugDialog.superclass.SetContent.apply(this,arguments)}};BX.CDebugDialog.prototype.__adjustSize=function(){BX.CDebugDialog.superclass.__adjustSize.apply(this,arguments);if(this.PARTS.CONTENT_TOP){var t=this.PARTS.CONTENT_DATA.offsetHeight-this.PARTS.HEAD.offsetHeight-this.PARTS.CONTENT_TOP.offsetHeight-38;if(t>0){this.PARTS.CONTENT_INNER.style.height=t+"px"}}};BX.CEditorDialog=function(t){BX.CEditorDialog.superclass.constructor.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT,"bx-core-adm-dialog-content-wrap");BX.removeClass(this.PARTS.CONTENT_DATA,"bx-core-adm-dialog-content");BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner");BX.removeClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-adm-dialog-buttons");BX.addClass(this.PARTS.CONTENT,"bx-core-editor-dialog-content-wrap");BX.addClass(this.PARTS.CONTENT_DATA,"bx-core-editor-dialog-content");BX.addClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-editor-dialog-buttons")};BX.extend(BX.CEditorDialog,BX.CDialog);BX.CEditorDialog.prototype.SetContent=function(){BX.CEditorDialog.superclass.SetContent.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner")};BX.CWizardDialog=function(t){BX.CWizardDialog.superclass.constructor.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT,"bx-core-adm-dialog-content-wrap");BX.removeClass(this.PARTS.CONTENT_DATA,"bx-core-adm-dialog-content");BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner");BX.removeClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-adm-dialog-buttons");BX.addClass(this.PARTS.CONTENT,"bx-core-wizard-dialog-content-wrap")};BX.extend(BX.CWizardDialog,BX.CDialog);BX.CAuthDialog=function(t){t.resizable=false;t.width=350;t.height=200;t.buttons=[this.btnSave];BX.CAuthDialog.superclass.constructor.apply(this,arguments);this._sender="core_window_cauthdialog";BX.addClass(this.DIV,"bx-core-auth-dialog");BX.AUTHAGENT=this};BX.extend(BX.CAuthDialog,BX.CDialog);BX.CAuthDialog.prototype.btnSave=BX.CAuthDialog.btnSave={title:BX.message("JS_CORE_WINDOW_AUTH"),id:"savebtn",name:"savebtn",className:"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.Submit("",this.parentWindow.PARAMS.content_url)}};BX.CAuthDialog.prototype.SetError=function(t){BX.closeWait();if(!!t)this.ShowError(t.MESSAGE||t)};BX.CAuthDialog.prototype.setAuthResult=function(t){BX.closeWait();if(t===false){this.Close();if(this.PARAMS.callback)this.PARAMS.callback()}else{this.SetError(t)}};BX.CWindowFloat=function(t){BX.CWindowFloat.superclass.constructor.apply(this,[t,"float"]);this.SETTINGS.resizable=false};BX.extend(BX.CWindowFloat,BX.CWindow);BX.CWindowFloat.prototype.adjustPos=function(){if(this.PARAMS.parent)this.adjustToNode();else if(this.PARAMS.x&&this.PARAMS.y)this.adjustToPos([this.PARAMS.x,this.PARAMS.y])};BX.CWindowFloat.prototype.adjustToPos=function(t){this.DIV.style.left=parseInt(t[0])+"px";this.DIV.style.top=parseInt(t[1])+"px"};BX.CWindowFloat.prototype.adjustToNodeGetPos=function(){return BX.pos(this.PARAMS.parent)};BX.CWindowFloat.prototype.adjustToNode=function(t){t=t||this.PARAMS.parent;this.PARAMS.parent=BX(t);if(this.PARAMS.parent){var e=this.adjustToNodeGetPos();this.DIV.style.top=e.top+"px";this.DIV.style.left=e.left+"px";this.PARAMS.parent.OPENER=this}};BX.CWindowFloat.prototype.Show=function(){this.adjustToPos([-1e3,-1e3]);BX.CWindowFloat.superclass.Show.apply(this,arguments);this.adjustPos()};BX.COpener=function(t){this.PARAMS=t||{};this.MENU=t.MENU||[];this.DIV=t.DIV;this.ATTACH=t.ATTACH||t.DIV;this.ATTACH_MODE=t.ATTACH_MODE||"bottom";this.ACTIVE_CLASS=t.ACTIVE_CLASS||"";this.PUBLIC_FRAME=t.PUBLIC_FRAME||0;this.LEVEL=t.LEVEL||0;this.CLOSE_ON_CLICK=typeof t.CLOSE_ON_CLICK!="undefined"?!!t.CLOSE_ON_CLICK:true;this.ADJUST_ON_CLICK=typeof t.ADJUST_ON_CLICK!="undefined"?!!t.ADJUST_ON_CLICK:true;this.TYPE=this.PARAMS.TYPE=="hover"?"hover":"click";this._openTimeout=null;if(this.PARAMS.TYPE=="hover"&&t.TIMEOUT!==0)this.TIMEOUT=t.TIMEOUT||1e3;else this.TIMEOUT=0;if(!!this.PARAMS.MENU_URL){this.bMenuLoaded=false;this.bMenuLoading=false;this.MENU=[{TEXT:BX.message("JS_CORE_LOADING"),CLOSE_ON_CLICK:false}];if(this.PARAMS.MENU_PRELOAD){BX.defer(this.Load,this)()}}BX.ready(BX.defer(this.Init,this))};BX.COpener.prototype.Init=function(){this.DIV=BX(this.DIV);switch(this.TYPE){case"hover":BX.bind(this.DIV,"mouseover",BX.proxy(this.Open,this));BX.bind(this.DIV,"click",BX.proxy(this.Toggle,this));break;case"click":BX.bind(this.DIV,"click",BX.proxy(this.Toggle,this));break}this.bMenuInit=false};BX.COpener.prototype.Load=function(){if(this.PARAMS.MENU_URL&&!this.bMenuLoaded){if(!this.bMenuLoading){var t=this.PARAMS.MENU_URL;if(t.indexOf("sessid=")<=0)t+=(t.indexOf("?")>0?"&":"?")+"sessid="+BX.bitrix_sessid();this.bMenuLoading=true;BX.ajax.loadJSON(t,BX.proxy(this.SetMenu,this),BX.proxy(this.LoadFailed,this))}}};BX.COpener.prototype.SetMenu=function(t){this.bMenuLoaded=true;this.bMenuLoading=false;if(this.bMenuInit){this.MENU.setItems(t)}else{this.MENU=t}};BX.COpener.prototype.LoadFailed=function(t,e){this.bMenuLoading=false;this.SetMenu([{TEXT:BX.message("JS_CORE_NO_DATA"),CLOSE_ON_CLICK:true}]);BX.debug(arguments)};BX.COpener.prototype.checkAdminMenu=function(){if(document.documentElement.id=="bx-admin-prefix")return true;return!!BX.findParent(this.DIV,{property:{id:"bx-admin-prefix"}})};BX.COpener.prototype.Toggle=function(t){this.__clear_timeout();if(!this.bMenuInit||!this.MENU.visible()){var e=this.TIMEOUT;this.TIMEOUT=0;this.Open(t);this.TIMEOUT=e}else{this.MENU.Close()}return!!(t||window.event)&&BX.PreventDefault(t)};BX.COpener.prototype.GetMenu=function(){if(!this.bMenuInit){if(BX.type.isArray(this.MENU)){this.MENU=new BX.CMenu({ITEMS:this.MENU,ATTACH_MODE:this.ATTACH_MODE,SET_ID:this.checkAdminMenu()?"bx-admin-prefix":"",CLOSE_ON_CLICK:!!this.CLOSE_ON_CLICK,ADJUST_ON_CLICK:!!this.ADJUST_ON_CLICK,PUBLIC_FRAME:!!this.PUBLIC_FRAME,LEVEL:this.LEVEL,parent:BX(this.DIV),parent_attach:BX(this.ATTACH)});if(this.LEVEL>0){BX.bind(this.MENU.DIV,"mouseover",BX.proxy(this._on_menu_hover,this));BX.bind(this.MENU.DIV,"mouseout",BX.proxy(this._on_menu_hout,this))}}BX.addCustomEvent(this.MENU,"onMenuOpen",BX.proxy(this.handler_onopen,this));BX.addCustomEvent(this.MENU,"onMenuClose",BX.proxy(this.handler_onclose,this));BX.addCustomEvent("onMenuItemHover",BX.proxy(this.handler_onover,this));this.bMenuInit=true}return this.MENU};BX.COpener.prototype.Open=function(){this.GetMenu();this.bOpen=true;this.__clear_timeout();if(this.TIMEOUT>0){BX.bind(this.DIV,"mouseout",BX.proxy(this.__clear_timeout,this));this._openTimeout=setTimeout(BX.proxy(this.__open,this),this.TIMEOUT)}else{this.__open()}if(!!this.PARAMS.MENU_URL&&!this.bMenuLoaded){this._loadTimeout=setTimeout(BX.proxy(this.Load,this),parseInt(this.TIMEOUT/2))}return true};BX.COpener.prototype.__clear_timeout=function(){if(!!this._openTimeout)clearTimeout(this._openTimeout);if(!!this._loadTimeout)clearTimeout(this._loadTimeout);BX.unbind(this.DIV,"mouseout",BX.proxy(this.__clear_timeout,this))};BX.COpener.prototype._on_menu_hover=function(){this.bMenuHover=true;this.__clear_timeout();if(this.ACTIVE_CLASS)BX.addClass(this.DIV,this.ACTIVE_CLASS)};BX.COpener.prototype._on_menu_hout=function(){this.bMenuHover=false};BX.COpener.prototype.handler_onover=function(t,e){if(this.bMenuHover)return;if(e!=this&&t==this.LEVEL-1&&this.ACTIVE_CLASS){BX.removeClass(this.DIV,this.ACTIVE_CLASS)}if(this.bMenuInit&&t<=this.LEVEL-1&&this.MENU.visible()){if(e!=this){this.__clear_timeout();this._openTimeout=setTimeout(BX.proxy(this.Close,this),this.TIMEOUT)}}};BX.COpener.prototype.handler_onopen=function(){this.bOpen=true;if(this.ACTIVE_CLASS)BX.addClass(this.DIV,this.ACTIVE_CLASS);BX.defer(function(){BX.onCustomEvent(this,"onOpenerMenuOpen")},this)()};BX.COpener.prototype.handler_onclose=function(){this.bOpen=false;BX.onCustomEvent(this,"onOpenerMenuClose");if(this.ACTIVE_CLASS)BX.removeClass(this.DIV,this.ACTIVE_CLASS)};BX.COpener.prototype.Close=function(){if(!this.bMenuInit)return;if(!!this._openTimeout)clearTimeout(this._openTimeout);this.bOpen=false;this.__close()};BX.COpener.prototype.__open=function(){this.__clear_timeout();if(this.bMenuInit&&this.bOpen&&!this.MENU.visible())this.MENU.Show()};BX.COpener.prototype.__close=function(){if(this.bMenuInit&&!this.bOpen&&this.MENU.visible())this.MENU.Hide()};BX.COpener.prototype.__close_immediately=function(){this.bOpen=false;this.__close()};BX.COpener.prototype.isMenuVisible=function(){return null!=this.MENU.visible&&this.MENU.visible()};BX.CMenu=function(t){BX.CMenu.superclass.constructor.apply(this);this.DIV.style.width="auto";this.DIV.style.height="auto";this.PARAMS=t||{};this.PARTS={};this.PARAMS.ATTACH_MODE=this.PARAMS.ATTACH_MODE||"bottom";this.PARAMS.CLOSE_ON_CLICK=typeof this.PARAMS.CLOSE_ON_CLICK=="undefined"?true:this.PARAMS.CLOSE_ON_CLICK;this.PARAMS.ADJUST_ON_CLICK=typeof this.PARAMS.ADJUST_ON_CLICK=="undefined"?true:this.PARAMS.ADJUST_ON_CLICK;this.PARAMS.PUBLIC_FRAME=typeof this.PARAMS.PUBLIC_FRAME=="undefined"?false:this.PARAMS.PUBLIC_FRAME;this.PARAMS.LEVEL=this.PARAMS.LEVEL||0;this.DIV.className="bx-core-popup-menu bx-core-popup-menu-"+this.PARAMS.ATTACH_MODE+" bx-core-popup-menu-level"+this.PARAMS.LEVEL+(typeof this.PARAMS.ADDITIONAL_CLASS!="undefined"?" "+this.PARAMS.ADDITIONAL_CLASS:"");if(!!this.PARAMS.SET_ID)this.DIV.id=this.PARAMS.SET_ID;if(this.PARAMS.LEVEL==0){this.ARROW=this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-core-popup-menu-angle"},style:{left:"15px"}}))}if(!!this.PARAMS.CLASS_NAME)this.DIV.className+=" "+this.PARAMS.CLASS_NAME;BX.bind(this.DIV,"click",BX.eventCancelBubble);this.ITEMS=[];this.setItems(this.PARAMS.ITEMS);BX.addCustomEvent("onMenuOpen",BX.proxy(this._onMenuOpen,this));BX.addCustomEvent("onMenuItemSelected",BX.proxy(this.Hide,this))};BX.extend(BX.CMenu,BX.CWindowFloat);BX.CMenu.broadcastCloseEvent=function(){BX.onCustomEvent("onMenuItemSelected")};BX.CMenu._toggleChecked=function(){BX.toggleClass(this,"bx-core-popup-menu-item-checked")};BX.CMenu._itemDblClick=function(){window.location.href=this.href};BX.CMenu.prototype.toggleArrow=function(t){if(!!this.ARROW){if(typeof t=="undefined"){t=this.ARROW.style.visibility=="hidden"}this.ARROW.style.visibility=!!t?"visible":"hidden"}};BX.CMenu.prototype.visible=function(){return this.DIV.style.display!=="none"};BX.CMenu.prototype._onMenuOpen=function(t,e){if(this.visible()){if(e==this.PARAMS.LEVEL&&t!=this){this.Hide()}}};BX.CMenu.prototype.onUnRegister=function(){if(!this.visible())return;this.Hide()};BX.CMenu.prototype.setItems=function(t){this.PARAMS.ITEMS=t;BX.cleanNode(this.DIV);if(!!this.ARROW)this.DIV.appendChild(this.ARROW);if(this.PARAMS.ITEMS){this.PARAMS.ITEMS=BX.util.array_values(this.PARAMS.ITEMS);var e=false;var i=0;for(var s=0,o=this.PARAMS.ITEMS.length;s<o;s++){if((s==0||s==o-1)&&this.PARAMS.ITEMS[s].SEPARATOR)continue;i++;if(!e)e=!!this.PARAMS.ITEMS[s].GLOBAL_ICON;this.addItem(this.PARAMS.ITEMS[s],s)}if(i===1)BX.addClass(this.DIV,"bx-core-popup-menu-single-item");else BX.removeClass(this.DIV,"bx-core-popup-menu-single-item");if(!e)BX.addClass(this.DIV,"bx-core-popup-menu-no-icons");else BX.removeClass(this.DIV,"bx-core-popup-menu-no-icons")}};BX.CMenu.prototype.addItem=function(t){this.ITEMS.push(t);if(t.SEPARATOR){t.NODE=BX.create("DIV",{props:{className:"bx-core-popup-menu-separator"}})}else{var e=!!t.MENU&&(BX.type.isArray(t.MENU)&&t.MENU.length>0||t.MENU instanceof BX.CMenu)||!!t.MENU_URL;if(t.DISABLED){t.CLOSE_ON_CLICK=false;t.LINK=null;t.ONCLICK=null;t.ACTION=null}var i={};if(!!t.LINK||BX.browser.IsIE()&&!BX.browser.IsDoctype()){i.href=t.LINK||"javascript:void(0)"}if(this.PARAMS.PUBLIC_FRAME){i.target="_top"}t.NODE=BX.create(!!t.LINK||BX.browser.IsIE()&&!BX.browser.IsDoctype()?"A":"SPAN",{props:{className:"bx-core-popup-menu-item"+(e?" bx-core-popup-menu-item-opener":"")+(!!t.DEFAULT?" bx-core-popup-menu-item-default":"")+(!!t.DISABLED?" bx-core-popup-menu-item-disabled":"")+(!!t.CHECKED?" bx-core-popup-menu-item-checked":""),title:!!BX.message["MENU_ENABLE_TOOLTIP"]||!!t.SHOW_TITLE?t.TITLE||"":"",BXMENULEVEL:this.PARAMS.LEVEL},attrs:i,events:{mouseover:function(){BX.onCustomEvent("onMenuItemHover",[this.BXMENULEVEL,this.OPENER])}},html:'<span class="bx-core-popup-menu-item-icon'+(t.GLOBAL_ICON?" "+t.GLOBAL_ICON:"")+'"></span><span class="bx-core-popup-menu-item-text">'+(t.HTML||(t.TEXT?BX.util.htmlspecialchars(t.TEXT):""))+"</span>"});if(e&&!t.DISABLED){t.NODE.OPENER=new BX.COpener({DIV:t.NODE,ACTIVE_CLASS:"bx-core-popup-menu-item-opened",TYPE:"hover",MENU:t.MENU,MENU_URL:t.MENU_URL,MENU_PRELOAD:!!t.MENU_PRELOAD,LEVEL:this.PARAMS.LEVEL+1,ATTACH_MODE:"right",TIMEOUT:500})}else if(this.PARAMS.CLOSE_ON_CLICK&&(typeof t.CLOSE_ON_CLICK=="undefined"||!!t.CLOSE_ON_CLICK)){BX.bind(t.NODE,"click",BX.CMenu.broadcastCloseEvent)}else if(this.PARAMS.ADJUST_ON_CLICK&&(typeof t.ADJUST_ON_CLICK=="undefined"||!!t.ADJUST_ON_CLICK)){BX.bind(t.NODE,"click",BX.defer(this.adjustPos,this))}if(e&&!!t.LINK){BX.bind(t.NODE,"dblclick",BX.CMenu._itemDblClick)}if(typeof t.CHECKED!="undefined"){BX.bind(t.NODE,"click",BX.CMenu._toggleChecked)}t.ONCLICK=t.ACTION||t.ONCLICK;if(!!t.ONCLICK){if(BX.type.isString(t.ONCLICK)){t.ONCLICK=new Function("event",t.ONCLICK)}BX.bind(t.NODE,"click",t.ONCLICK)}}this.DIV.appendChild(t.NODE)};BX.CMenu.prototype._documentClickBind=function(){this._documentClickUnBind();BX.bind(document,"click",BX.proxy(this._documentClick,this))};BX.CMenu.prototype._documentClickUnBind=function(){BX.unbind(document,"click",BX.proxy(this._documentClick,this))};BX.CMenu.prototype._documentClick=function(t){t=t||window.event;if(!!t&&!(BX.getEventButton(t)&BX.MSLEFT))return;this.Close()};BX.CMenu.prototype.Show=function(){BX.onCustomEvent(this,"onMenuOpen",[this,this.PARAMS.LEVEL]);BX.CMenu.superclass.Show.apply(this,[]);this.bCloseEventFired=false;BX.addCustomEvent(this.PARAMS.parent_attach,"onChangeNodePosition",BX.proxy(this.adjustToNode,this));BX.defer(this._documentClickBind,this)()};BX.CMenu.prototype.Close=BX.CMenu.prototype.Hide=function(){if(!this.visible())return;BX.removeCustomEvent(this.PARAMS.parent_attach,"onChangeNodePosition",BX.proxy(this.adjustToNode,this));this._documentClickUnBind();if(!this.bCloseEventFired){BX.onCustomEvent(this,"onMenuClose",[this,this.PARAMS.LEVEL]);this.bCloseEventFired=true}BX.CMenu.superclass.Hide.apply(this,arguments)};BX.CMenu.prototype.__adjustMenuToNode=function(){var t=BX.pos(this.PARAMS.parent_attach),e=!!BX.findParent(this.PARAMS.parent_attach,BX.is_fixed);if(e)this.DIV.style.position="fixed";else this.DIV.style.position="absolute";if(!t.top){this.DIV.style.top="-1000px";this.DIV.style.left="-1000px"}if(this.bTimeoutSet)return;var i=this.DIV.offsetWidth,s=this.DIV.offsetHeight;if(!i){setTimeout(BX.delegate(function(){this.bTimeoutSet=false;this.__adjustMenuToNode()},this),100);this.bTimeoutSet=true;return}var o={},n=BX.GetWindowSize();switch(this.PARAMS.ATTACH_MODE){case"bottom":o.top=t.bottom+9;o.left=t.left;var r=0;if(!!this.ARROW){if(t.width>i)r=parseInt(i/2-7);else r=parseInt(Math.min(i,t.width)/2-7);if(r<7){o.left-=15;r+=15}}if(o.left>n.scrollWidth-i-10){var h=o.left;o.left=n.scrollWidth-i-10;if(!!this.ARROW)r+=h-o.left}if(e){o.left-=n.scrollLeft}if(!!this.ARROW)this.ARROW.style.left=r+"px";break;case"right":o.top=t.top-1;o.left=t.right;if(o.left>n.scrollWidth-i-10){o.left=t.left-i-1}break}if(e){o.top-=n.scrollTop}if(!!this.ARROW)this.ARROW.className="bx-core-popup-menu-angle";if(o.top+s>n.scrollTop+n.innerHeight||o.top+s>n.scrollHeight){var a=this.PARAMS.ATTACH_MODE=="bottom"?t.top-s-9:t.bottom-s+1;if(a>n.scrollTop||o.top+s>n.scrollHeight){if(o.top+s>n.scrollHeight){o.top=Math.max(0,n.scrollHeight-s);this.toggleArrow(false)}else{o.top=a;if(!!this.ARROW)this.ARROW.className="bx-core-popup-menu-angle-bottom"}}}if(o.top+o.left==0){this.Hide()}else{this.DIV.style.top=o.top+"px";this.DIV.style.left=o.left+"px"}};BX.CMenu.prototype.adjustToNode=function(t){this.PARAMS.parent_attach=BX(t)||this.PARAMS.parent_attach||this.PARAMS.parent;this.__adjustMenuToNode()};BX.CMenuOpener=function(t){BX.CMenuOpener.superclass.constructor.apply(this);this.PARAMS=t||{};this.setParent(this.PARAMS.parent);this.PARTS={};this.SETTINGS.drag_restrict=true;this.defaultAction=null;this.timeout=500;this.DIV.className="bx-component-opener";this.DIV.ondblclick=BX.PreventDefault;if(this.PARAMS.component_id){this.PARAMS.transform=!!this.PARAMS.transform}this.OPENERS=[];this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar"+(this.PARAMS.transform?" bx-context-toolbar-vertical-mode":"")}}));this.PARTS.INNER=this.DIV.firstChild.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-inner"},html:'<span class="bx-context-toolbar-drag-icon"></span><span class="bx-context-toolbar-vertical-line"></span><br>'}));this.EXTRA_BUTTONS={};var e=0;for(var i=0,s=this.PARAMS.menu.length;i<s;i++){var o=this.addItem(this.PARAMS.menu[i]);if(null!=o){e++;this.PARTS.INNER.appendChild(o);this.PARTS.INNER.appendChild(BX.create("BR"))}}var n=e>0;this.PARTS.ICONS=this.PARTS.INNER.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-icons"}}));if(this.PARAMS.component_id){this.PARAMS.pin=!!this.PARAMS.pin;if(n)this.PARTS.ICONS.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-separator"}}));this.PARTS.ICON_PIN=this.PARTS.ICONS.appendChild(BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:this.PARAMS.pin?"bx-context-toolbar-pin-fixed":"bx-context-toolbar-pin"},events:{click:BX.delegate(this.__pin_btn_clicked,this)}}))}if(this.EXTRA_BUTTONS["components2_props"]){var r=this.EXTRA_BUTTONS["components2_props"]||{URL:"javascript:void(0)"};if(null==this.defaultAction){this.defaultAction=r.ONCLICK;this.defaultActionTitle=r.TITLE||r.TEXT}r.URL="javascript:"+BX.util.urlencode(r.ONCLICK);this.ATTACH=this.PARTS.ICONS.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button bx-context-toolbar-button-settings"},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-inner"},children:[BX.create("A",{attrs:{href:r.URL},events:{mouseover:BX.proxy(this.__msover_text,this),mouseout:BX.proxy(this.__msout_text,this),mousedown:BX.proxy(this.__msdown_text,this)},html:'<span class="bx-context-toolbar-button-icon bx-context-toolbar-settings-icon"></span>'}),BX.create("A",{attrs:{href:"javascript: void(0)"},props:{className:"bx-context-toolbar-button-arrow"},events:{mouseover:BX.proxy(this.__msover_arrow,this),mouseout:BX.proxy(this.__msout_arrow,this),mousedown:BX.proxy(this.__msdown_arrow,this)},html:'<span class="bx-context-toolbar-button-arrow"></span>'})]})]}));this.OPENER=this.ATTACH.firstChild.lastChild;var h=this.attachMenu(this.EXTRA_BUTTONS["components2_submenu"]["MENU"]);BX.addCustomEvent(h,"onOpenerMenuOpen",BX.proxy(this.__menu_open,this));BX.addCustomEvent(h,"onOpenerMenuClose",BX.proxy(this.__menu_close,this))}if(e>1){this.PARTS.ICONS.appendChild(BX.create("span",{props:{className:"bx-context-toolbar-separator bx-context-toolbar-separator-switcher"}}));this.ICON_TRANSFORM=this.PARTS.ICONS.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},props:{className:"bx-context-toolbar-switcher"},events:{click:BX.delegate(this.__trf_btn_clicked,this)}}))}if(this.PARAMS.HINT){this.DIV.BXHINT=this.HINT=new BX.CHint({parent:this.DIV,hint:this.PARAMS.HINT.TEXT||"",title:this.PARAMS.HINT.TITLE||"",hide_timeout:this.timeout/2,preventHide:false})}BX.addCustomEvent(this,"onWindowDragFinished",BX.delegate(this.__onMoveFinished,this));BX.addCustomEvent("onDynamicModeChange",BX.delegate(this.__onDynamicModeChange,this));BX.addCustomEvent("onTopPanelCollapse",BX.delegate(this.__onPanelCollapse,this));BX.addCustomEvent("onMenuOpenerMoved",BX.delegate(this.checkPosition,this));BX.addCustomEvent("onMenuOpenerUnhide",BX.delegate(this.checkPosition,this));if(this.OPENERS){for(i=0,s=this.OPENERS.length;i<s;i++){BX.addCustomEvent(this.OPENERS[i],"onOpenerMenuOpen",BX.proxy(this.__hide_hint,this))}}};BX.extend(BX.CMenuOpener,BX.CWindowFloat);BX.CMenuOpener.prototype.setParent=function(t){t=BX(t);if(t.OPENER&&t.OPENER!=this){t.OPENER.Close();t.OPENER.clearHoverHoutEvents()}if(this.PARAMS.parent&&this.PARAMS.parent!=t){this.clearHoverHoutEvents();this.PARAMS.parent.OPENER=null}this.PARAMS.parent=t;this.PARAMS.parent.OPENER=this};BX.CMenuOpener.prototype.setHoverHoutEvents=function(t,e){if(!this.__opener_events_set){BX.bind(this.Get(),"mouseover",t);BX.bind(this.Get(),"mouseout",e);this.__opener_events_set=true}};BX.CMenuOpener.prototype.clearHoverHoutEvents=function(){if(this.Get()){BX.unbindAll(this.Get());this.__opener_events_set=false}};BX.CMenuOpener.prototype.unclosable=true;BX.CMenuOpener.prototype.__check_intersection=function(t,e){return!(e.right<=t.left||e.left>=t.right||e.bottom<=t.top||e.top>=t.bottom)};BX.CMenuOpener.prototype.__msover_text=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-text-hover")};BX.CMenuOpener.prototype.__msout_text=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.ATTACH,"bx-context-toolbar-button-text-hover bx-context-toolbar-button-text-active")};BX.CMenuOpener.prototype.__msover_arrow=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-arrow-hover")};BX.CMenuOpener.prototype.__msout_arrow=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.ATTACH,"bx-context-toolbar-button-arrow-hover bx-context-toolbar-button-arrow-active")};BX.CMenuOpener.prototype.__msdown_text=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-text-active")};BX.CMenuOpener.prototype.__msdown_arrow=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-arrow-active")};BX.CMenuOpener.prototype.__menu_close=function(){this._menu_open=false;this.bx_active=false;BX.removeClass(this.ATTACH,"bx-context-toolbar-button-active bx-context-toolbar-button-text-active bx-context-toolbar-button-arrow-active");if(!this.bx_hover){BX.removeClass(this.ATTACH,"bx-context-toolbar-button-hover bx-context-toolbar-button-text-hover bx-context-toolbar-button-arrow-hover");this.bx_hover=false}};BX.CMenuOpener.prototype.__menu_open=function(){this._menu_open=true};BX.CMenuOpener.prototype.checkPosition=function(){if(this.isMenuVisible()||this.DIV.style.display=="none"||this==BX.proxy_context||BX.proxy_context.zIndex>this.zIndex)return;this.correctPosition(BX.proxy_context)};BX.CMenuOpener.prototype.correctPosition=function(t){var e=BX.pos(this.DIV),i=BX.pos(t.Get());if(this.__check_intersection(e,i)){var s=i.top-e.height;if(s<0)s=i.bottom;this.DIV.style.top=s+"px";BX.addCustomEvent(t,"onMenuOpenerHide",BX.proxy(this.restorePosition,this));BX.onCustomEvent(this,"onMenuOpenerMoved")}};BX.CMenuOpener.prototype.restorePosition=function(){if(!this.MOUSEOVER&&!this.isMenuVisible()){if(this.originalPos)this.DIV.style.top=this.originalPos.top+"px";BX.removeCustomEvent(BX.proxy_context,"onMenuOpenerHide",BX.proxy(this.restorePosition,this));if(this.restore_pos_timeout)clearTimeout(this.restore_pos_timeout)}else{this.restore_pos_timeout=setTimeout(BX.proxy(this.restorePosition,this),this.timeout)}};BX.CMenuOpener.prototype.Show=function(){BX.CMenuOpener.superclass.Show.apply(this,arguments);this.SetDraggable(this.PARTS.INNER.firstChild);this.DIV.style.width="auto";this.DIV.style.height="auto";if(!this.PARAMS.pin){this.DIV.style.left="-1000px";this.DIV.style.top="-1000px";this.Hide()}else{this.bPosAdjusted=true;this.bMoved=true;if(this.PARAMS.top)this.DIV.style.top=this.PARAMS.top+"px";if(this.PARAMS.left)this.DIV.style.left=this.PARAMS.left+"px";this.DIV.style.display=!BX.admin.dynamic_mode||BX.admin.dynamic_mode_show_borders?"block":"none";if(this.DIV.style.display=="block"){setTimeout(BX.delegate(function(){BX.onCustomEvent(this,"onMenuOpenerUnhide")},this),50)}}};BX.CMenuOpener.prototype.executeDefaultAction=function(){if(this.defaultAction){if(BX.type.isFunction(this.defaultAction))this.defaultAction();else if(BX.type.isString(this.defaultAction))BX.evalGlobal(this.defaultAction)}};BX.CMenuOpener.prototype.__onDynamicModeChange=function(t){this.DIV.style.display=t?"block":"none"};BX.CMenuOpener.prototype.__onPanelCollapse=function(t,e){this.DIV.style.top=parseInt(this.DIV.style.top)+e+"px";if(this.PARAMS.pin){this.__savePosition()}};BX.CMenuOpener.prototype.__onMoveFinished=function(){BX.onCustomEvent(this,"onMenuOpenerMoved");this.bMoved=true;if(this.PARAMS.pin)this.__savePosition()};BX.CMenuOpener.prototype.__savePosition=function(){var t={};t.pin=this.PARAMS.pin;if(!this.PARAMS.pin){t.top=false;t.left=false;t.transform=false}else{t.transform=this.PARAMS.transform;if(this.bMoved){t.left=parseInt(this.DIV.style.left);t.top=parseInt(this.DIV.style.top)}}BX.WindowManager.saveWindowOptions(this.PARAMS.component_id,t)};BX.CMenuOpener.prototype.__pin_btn_clicked=function(){this.Pin()};BX.CMenuOpener.prototype.Pin=function(t){if(null==t)this.PARAMS.pin=!this.PARAMS.pin;else this.PARAMS.pin=!!t;this.PARTS.ICON_PIN.className=this.PARAMS.pin?"bx-context-toolbar-pin-fixed":"bx-context-toolbar-pin";this.__savePosition()};BX.CMenuOpener.prototype.__trf_btn_clicked=function(){this.Transform()};BX.CMenuOpener.prototype.Transform=function(t){var e={};if(null==t)this.PARAMS.transform=!this.PARAMS.transform;else this.PARAMS.transform=!!t;if(this.bMoved){e=BX.pos(this.DIV)}if(this.PARAMS.transform)BX.addClass(this.DIV.firstChild,"bx-context-toolbar-vertical-mode");else BX.removeClass(this.DIV.firstChild,"bx-context-toolbar-vertical-mode");if(!this.bMoved){this.adjustPos()}else{this.DIV.style.left=e.right-this.DIV.offsetWidth-(BX.browser.IsIE()&&!BX.browser.IsDoctype()?2:0)+"px"}this.__savePosition()};BX.CMenuOpener.prototype.adjustToNodeGetPos=function(){var t=BX.pos(this.PARAMS.parent);var e=BX.GetWindowScrollSize();var i=this.DIV.offsetWidth;t.left-=BX.admin.__border_dx;t.top-=BX.admin.__border_dx;if(true||!this.PARAMS.transform){t.top-=45}if(t.left>e.scrollWidth-i){t.left=e.scrollWidth-i}return t};BX.CMenuOpener.prototype.addItem=function(t){if(t.TYPE){this.EXTRA_BUTTONS[t.TYPE]=t;return null}else{var e=new BX.CMenuOpenerItem(t);if(null==this.defaultAction){if(e.item.ONCLICK){this.defaultAction=t.ONCLICK}else if(e.item.MENU){this.defaultAction=BX.delegate(function(){this.Open()},e.item.OPENER)}this.defaultActionTitle=t.TITLE||t.TEXT;BX.addClass(e.Get(),"bx-content-toolbar-default")}if(e.item.OPENER)this.OPENERS[this.OPENERS.length]=e.item.OPENER;return e.Get()}};BX.CMenuOpener.prototype.attachMenu=function(t){var e=new BX.COpener({DIV:this.OPENER,ATTACH:this.ATTACH,MENU:t,TYPE:"click"});this.OPENERS[this.OPENERS.length]=e;return e};BX.CMenuOpener.prototype.__hide_hint=function(){if(this.HINT)this.HINT.__hide_immediately()};BX.CMenuOpener.prototype.isMenuVisible=function(){for(var t=0,e=this.OPENERS.length;t<e;t++){if(this.OPENERS[t].isMenuVisible())return true}return false};BX.CMenuOpener.prototype.Hide=function(){if(!this.PARAMS.pin){this.DIV.style.display="none";BX.onCustomEvent(this,"onMenuOpenerHide")}};BX.CMenuOpener.prototype.UnHide=function(){this.DIV.style.display="block";if(!this.bPosAdjusted&&!this.PARAMS.pin){this.adjustPos();this.bPosAdjusted=true}if(null==this.originalPos&&!this.bMoved){this.originalPos=BX.pos(this.DIV)}BX.onCustomEvent(this,"onMenuOpenerUnhide")};BX.CMenuOpenerItem=function(t){this.item=t;if(this.item.ACTION&&!this.item.ONCLICK){this.item.ONCLICK=this.item.ACTION}this.DIV=BX.create("SPAN");this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button-underlay"}}));this.WRAPPER=this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button-wrapper"},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button",title:t.TITLE},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-inner"}})]})]}));var e=BX.create("SPAN",{props:{className:"bx-context-toolbar-button-icon"+(this.item.ICON||this.item.ICONCLASS?" "+(this.item.ICON||this.item.ICONCLASS):"")},attrs:!(this.item.ICON||this.item.ICONCLASS)&&(this.item.SRC||this.item.IMAGE)?{style:"background: scroll transparent url("+(this.item.SRC||this.item.IMAGE)+") no-repeat center center !important;"}:{}}),i=BX.create("SPAN",{props:{className:"bx-context-toolbar-button-text"},text:this.item.TEXT});if(this.item.ACTION&&!this.item.ONCLICK){this.item.ONCLICK=this.item.ACTION}this.bHasMenu=!!this.item.MENU;this.bHasAction=!!this.item.ONCLICK;if(this.bHasAction){this.LINK=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},events:{mouseover:this.bHasMenu?BX.proxy(this.__msover_text,this):BX.proxy(this.__msover,this),mouseout:this.bHasMenu?BX.proxy(this.__msout_text,this):BX.proxy(this.__msout,this),mousedown:this.bHasMenu?BX.proxy(this.__msdown_text,this):BX.proxy(this.__msdown,this)},children:[e,i]}));if(this.bHasMenu){this.LINK_MENU=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{props:{className:"bx-context-toolbar-button-arrow"},attrs:{href:"javascript: void(0)"},events:{mouseover:BX.proxy(this.__msover_arrow,this),mouseout:BX.proxy(this.__msout_arrow,this),mousedown:BX.proxy(this.__msdown_arrow,this)},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-arrow"}})]}))}}else if(this.bHasMenu){this.item.ONCLICK=null;this.LINK=this.LINK_MENU=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},events:{mouseover:BX.proxy(this.__msover,this),mouseout:BX.proxy(this.__msout,this),mousedown:BX.proxy(this.__msdown,this)},children:[e,i]}));this.LINK.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-single-button-arrow"}}))}if(this.bHasMenu){this.item.SUBMENU=new BX.CMenu({ATTACH_MODE:"bottom",ITEMS:this.item["MENU"],parent:this.LINK_MENU,parent_attach:this.WRAPPER.firstChild});this.item.OPENER=new BX.COpener({DIV:this.LINK_MENU,TYPE:"click",MENU:this.item.SUBMENU});BX.addCustomEvent(this.item.OPENER,"onOpenerMenuOpen",BX.proxy(this.__menu_open,this));BX.addCustomEvent(this.item.OPENER,"onOpenerMenuClose",BX.proxy(this.__menu_close,this))}if(this.bHasAction){BX.bind(this.LINK,"click",BX.delegate(this.__click,this))}};BX.CMenuOpenerItem.prototype.Get=function(){return this.DIV};BX.CMenuOpenerItem.prototype.__msover=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover")};BX.CMenuOpenerItem.prototype.__msout=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover bx-context-toolbar-button-active")};BX.CMenuOpenerItem.prototype.__msover_text=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-hover")};BX.CMenuOpenerItem.prototype.__msout_text=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-hover bx-context-toolbar-button-text-active")};BX.CMenuOpenerItem.prototype.__msover_arrow=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-hover")};BX.CMenuOpenerItem.prototype.__msout_arrow=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-hover bx-context-toolbar-button-arrow-active")};BX.CMenuOpenerItem.prototype.__msdown=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-active")};BX.CMenuOpenerItem.prototype.__msdown_text=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-active")};BX.CMenuOpenerItem.prototype.__msdown_arrow=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-active")};BX.CMenuOpenerItem.prototype.__menu_close=function(){this._menu_open=false;this.bx_active=false;BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-active bx-context-toolbar-button-text-active bx-context-toolbar-button-arrow-active");if(!this.bx_hover){BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover bx-context-toolbar-button-text-hover bx-context-toolbar-button-arrow-hover");this.bx_hover=false}};BX.CMenuOpenerItem.prototype.__menu_open=function(){this._menu_open=true};BX.CMenuOpenerItem.prototype.__click=function(){BX.evalGlobal(this.item.ONCLICK)};BX.CPageOpener=function(t){BX.CPageOpener.superclass.constructor.apply(this,arguments);this.timeout=505;window.PAGE_EDIT_CONTROL=this};BX.extend(BX.CPageOpener,BX.CMenuOpener);BX.CPageOpener.prototype.checkPosition=function(){if(this==BX.proxy_context)return;this.correctPosition(BX.proxy_context)};BX.CPageOpener.prototype.correctPosition=function(t){if(this.bPosCorrected)return;var e;if(this.DIV.style.display=="none"){e=this.adjustToNodeGetPos();e.bottom=e.top+30;e.right=e.left+300}else{e=BX.pos(this.DIV)}var i=BX.pos(t.Get());if(this.__check_intersection(e,i)){this.DIV.style.display="none";BX.addCustomEvent(t,"onMenuOpenerHide",BX.proxy(this.restorePosition,this));this.bPosCorrected=true}};BX.CPageOpener.prototype.restorePosition=function(){if(BX.proxy_context&&BX.proxy_context.Get().style.display=="none"){this.bPosCorrected=false;if(this.PARAMS.parent.bx_over||this.PARAMS.pin)this.UnHide();BX.removeCustomEvent("onMenuOpenerHide",BX.proxy(this.restorePosition,this))}};BX.CPageOpener.prototype.UnHide=function(){if(!this.bPosCorrected)BX.CPageOpener.superclass.UnHide.apply(this,arguments)};BX.CPageOpener.prototype.Remove=function(){BX.admin.removeComponentBorder(this.PARAMS.parent);BX.userOptions.save("global","settings","page_edit_control_enable","N");this.DIV.style.display="none"};BX.CHintSimple=function(){BX.CHintSimple.superclass.constructor.apply(this,arguments)};BX.extend(BX.CHintSimple,BX.CHint);BX.CHintSimple.prototype.Init=function(){this.DIV=document.body.appendChild(BX.create("DIV",{props:{className:"bx-tooltip-simple"},style:{display:"none"},children:[this.CONTENT=BX.create("DIV")]}));if(this.HINT_TITLE)this.CONTENT.appendChild(BX.create("B",{text:this.HINT_TITLE}));if(this.HINT)this.CONTENT_TEXT=this.CONTENT.appendChild(BX.create("DIV")).appendChild(BX.create("SPAN",{html:this.HINT}));if(this.PARAMS.preventHide){BX.bind(this.DIV,"mouseout",BX.proxy(this.Hide,this));BX.bind(this.DIV,"mouseover",BX.proxy(this.Show,this))}this.bInited=true};BX.adminInformer={itemsShow:3,Init:function(t){if(t)BX.adminInformer.itemsShow=t;var e=BX("admin-informer");if(e)document.body.appendChild(e);BX.addCustomEvent("onTopPanelCollapse",BX.proxy(BX.adminInformer.Close,BX.adminInformer))},Toggle:function(t){var e=BX("admin-informer");if(!e)return false;var i=BX.pos(t);e.style.top=parseInt(i.top)+parseInt(i.height)+7+"px";e.style.left=i.left+"px";if(!BX.hasClass(e,"adm-informer-active"))BX.adminInformer.Show(e);else BX.adminInformer.Hide(e);return false},Close:function(){BX.adminInformer.Hide(BX("admin-informer"))},OnInnerClick:function(t){var e=t.target||t.srcElement;if(e.nodeName.toLowerCase()!="a"||BX.hasClass(e,"adm-informer-footer")){return BX.PreventDefault(t)}return true},ToggleExtra:function(){var t=BX("adm-informer-footer");if(BX.hasClass(t,"adm-informer-footer-collapsed"))this.ShowAll();else this.HideExtra();return false},ShowAll:function(){var t=BX("admin-informer");for(var e=0;e<t.children.length;e++)if(BX.hasClass(t.children[e],"adm-informer-item")&&t.children[e].style.display=="none"){t.children[e].style.display="block"}var i=BX("adm-informer-footer");if(i.textContent!==undefined)i.textContent=BX.message("JSADM_AI_HIDE_EXTRA");else i.innerText=BX.message("JSADM_AI_HIDE_EXTRA");BX.removeClass(i,"adm-informer-footer-collapsed");return false},HideExtra:function(){var t=BX("admin-informer");var e=0;for(var i=BX.adminInformer.itemsShow+1;i<t.children.length;i++){if(BX.hasClass(t.children[i],"adm-informer-item")&&t.children[i].style.display=="block"){t.children[i].style.display="none";e++}}var s=BX("adm-informer-footer");var o=BX.message("JSADM_AI_ALL_NOTIF")+" ("+(BX.adminInformer.itemsShow+parseInt(e))+")";if(s.textContent!==undefined)s.textContent=o;else s.innerText=o;BX.addClass(s,"adm-informer-footer-collapsed");return false},Show:function(t){var e=BX("adm-header-notif-block");if(e)BX.addClass(e,"adm-header-notif-block-active");BX.onCustomEvent(t,"onBeforeAdminInformerShow");setTimeout(BX.proxy(function(){BX.bind(document,"click",BX.proxy(BX.adminInformer.Close,BX.adminInformer))},BX.adminInformer),0);BX.addClass(t,"adm-informer-active");setTimeout(function(){BX.addClass(t,"adm-informer-animate")},0)},Hide:function(t){var e=BX("adm-header-notif-block");if(e)BX.removeClass(e,"adm-header-notif-block-active");BX.unbind(document,"click",BX.proxy(BX.adminInformer.Close,BX.adminInformer));BX.removeClass(t,"adm-informer-animate");if(this.IsAnimationSupported())setTimeout(function(){BX.removeClass(t,"adm-informer-active")},300);else BX.removeClass(t,"adm-informer-active");BX.onCustomEvent(t,"onAdminInformerHide")},IsAnimationSupported:function(){var t=document.body||document.documentElement;if(typeof t.style.transition=="string")return true;else if(typeof t.style.MozTransition=="string")return true;else if(typeof t.style.OTransition=="string")return true;else if(typeof t.style.WebkitTransition=="string")return true;else if(typeof t.style.msTransition=="string")return true;return false},SetItemHtml:function(t,e){var i=BX("adm-informer-item-html-"+t);if(!i)return false;i.innerHTML=e;return true},SetItemFooter:function(t,e){var i=BX("adm-informer-item-footer-"+t);if(!i)return false;i.innerHTML=e;if(e)i.style.display="block";else i.style.display="none";return true}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/bitrix/js/main/date/main.date.min.js?159569177216360";s:6:"source";s:33:"/bitrix/js/main/date/main.date.js";s:3:"min";s:37:"/bitrix/js/main/date/main.date.min.js";s:3:"map";s:37:"/bitrix/js/main/date/main.date.map.js";}"*/
(function(e){if(!e.BX){e.BX={}}if(!e.BX.Main){e.BX.Main={}}else if(e.BX.Main.Date){return}var t=e.BX;t.Main.Date={AM_PM_MODE:{UPPER:1,LOWER:2,NONE:false},format:function(e,t,_,n){var a=this;var D=r.isDate(t)?new Date(t.getTime()):r.isNumber(t)?new Date(t*1e3):new Date;var i=r.isDate(_)?new Date(_.getTime()):r.isNumber(_)?new Date(_*1e3):new Date;var s=!!n;if(r.isArray(e))return g(e,D,i,s);else if(!r.isNotEmptyString(e))return"";var o=(e.match(/{{([^{}]*)}}/g)||[]).map(function(e){return(e.match(/[^{}]+/)||[""])[0]});if(o.length>0){o.forEach(function(t,r){e=e.replace("{{"+t+"}}","{{"+r+"}}")})}var M=/\\?(sago|iago|isago|Hago|dago|mago|Yago|sdiff|idiff|Hdiff|ddiff|mdiff|Ydiff|sshort|ishort|Hshort|dshort|mhort|Yshort|yesterday|today|tommorow|tomorrow|[a-z])/gi;var u={d:function(){return r.strPadLeft(c(D).toString(),2,"0")},D:function(){return a._getMessage("DOW_"+H(D))},j:function(){return c(D)},l:function(){return a._getMessage("DAY_OF_WEEK_"+H(D))},N:function(){return H(D)||7},S:function(){if(c(D)%10==1&&c(D)!=11)return"st";else if(c(D)%10==2&&c(D)!=12)return"nd";else if(c(D)%10==3&&c(D)!=13)return"rd";else return"th"},w:function(){return H(D)},z:function(){var e=new Date(F(D),0,1);var t=new Date(F(D),T(D),c(D));return Math.ceil((t-e)/(24*3600*1e3))},W:function(){var e=new Date(D.getTime());var t=(H(D)+6)%7;R(e,c(e)-t+3);var _=e.getTime();S(e,0,1);if(H(e)!=4)S(e,0,1+(4-H(e)+7)%7);var n=1+Math.ceil((_-e)/(7*24*3600*1e3));return r.strPadLeft(n.toString(),2,"0")},F:function(){return a._getMessage("MONTH_"+(T(D)+1)+"_S")},f:function(){return a._getMessage("MONTH_"+(T(D)+1))},m:function(){return r.strPadLeft((T(D)+1).toString(),2,"0")},M:function(){return a._getMessage("MON_"+(T(D)+1))},n:function(){return T(D)+1},t:function(){var e=s?new Date(Date.UTC(F(D),T(D)+1,0)):new Date(F(D),T(D)+1,0);return c(e)},L:function(){var e=F(D);return e%4==0&&e%100!=0||e%400==0?1:0},o:function(){var e=new Date(D.getTime());R(e,c(e)-(H(D)+6)%7+3);return F(e)},Y:function(){return F(D)},y:function(){return F(D).toString().slice(2)},a:function(){return E(D)>11?"pm":"am"},A:function(){return E(D)>11?"PM":"AM"},B:function(){var e=(D.getUTCHours()+1)%24+D.getUTCMinutes()/60+D.getUTCSeconds()/3600;return r.strPadLeft(Math.floor(e*1e3/24).toString(),3,"0")},g:function(){return E(D)%12||12},G:function(){return E(D)},h:function(){return r.strPadLeft((E(D)%12||12).toString(),2,"0")},H:function(){return r.strPadLeft(E(D).toString(),2,"0")},i:function(){return r.strPadLeft(l(D).toString(),2,"0")},s:function(){return r.strPadLeft(A(D).toString(),2,"0")},u:function(){return r.strPadLeft((m(D)*1e3).toString(),6,"0")},e:function(){if(s)return"UTC";return""},I:function(){if(s)return 0;var e=new Date(F(D),0,1);var t=Date.UTC(F(D),0,1);var r=new Date(F(D),6,0);var _=Date.UTC(F(D),6,0);return 0+(e-t!==r-_)},O:function(){if(s)return"+0000";var e=D.getTimezoneOffset();var t=Math.abs(e);return(e>0?"-":"+")+r.strPadLeft((Math.floor(t/60)*100+t%60).toString(),4,"0")},P:function(){if(s)return"+00:00";var e=this.O();return e.substr(0,3)+":"+e.substr(3)},Z:function(){if(s)return 0;return-D.getTimezoneOffset()*60},c:function(){return"Y-m-d\\TH:i:sP".replace(M,h)},r:function(){return"D, d M Y H:i:s O".replace(M,h)},U:function(){return Math.floor(D.getTime()/1e3)},sago:function(){return d(N((i-D)/1e3),{0:"FD_SECOND_AGO_0",1:"FD_SECOND_AGO_1","10_20":"FD_SECOND_AGO_10_20",MOD_1:"FD_SECOND_AGO_MOD_1",MOD_2_4:"FD_SECOND_AGO_MOD_2_4",MOD_OTHER:"FD_SECOND_AGO_MOD_OTHER"})},sdiff:function(){return d(N((i-D)/1e3),{0:"FD_SECOND_DIFF_0",1:"FD_SECOND_DIFF_1","10_20":"FD_SECOND_DIFF_10_20",MOD_1:"FD_SECOND_DIFF_MOD_1",MOD_2_4:"FD_SECOND_DIFF_MOD_2_4",MOD_OTHER:"FD_SECOND_DIFF_MOD_OTHER"})},sshort:function(){return a._getMessage("FD_SECOND_SHORT").replace(/#VALUE#/g,N((i-D)/1e3))},iago:function(){return d(N((i-D)/60/1e3),{0:"FD_MINUTE_AGO_0",1:"FD_MINUTE_AGO_1","10_20":"FD_MINUTE_AGO_10_20",MOD_1:"FD_MINUTE_AGO_MOD_1",MOD_2_4:"FD_MINUTE_AGO_MOD_2_4",MOD_OTHER:"FD_MINUTE_AGO_MOD_OTHER"})},idiff:function(){return d(N((i-D)/60/1e3),{0:"FD_MINUTE_DIFF_0",1:"FD_MINUTE_DIFF_1","10_20":"FD_MINUTE_DIFF_10_20",MOD_1:"FD_MINUTE_DIFF_MOD_1",MOD_2_4:"FD_MINUTE_DIFF_MOD_2_4",MOD_OTHER:"FD_MINUTE_DIFF_MOD_OTHER"})},isago:function(){var e=N((i-D)/60/1e3);var t=d(e,{0:"FD_MINUTE_0",1:"FD_MINUTE_1","10_20":"FD_MINUTE_10_20",MOD_1:"FD_MINUTE_MOD_1",MOD_2_4:"FD_MINUTE_MOD_2_4",MOD_OTHER:"FD_MINUTE_MOD_OTHER"});t+=" ";var r=N((i-D)/1e3)-e*60;t+=d(r,{0:"FD_SECOND_AGO_0",1:"FD_SECOND_AGO_1","10_20":"FD_SECOND_AGO_10_20",MOD_1:"FD_SECOND_AGO_MOD_1",MOD_2_4:"FD_SECOND_AGO_MOD_2_4",MOD_OTHER:"FD_SECOND_AGO_MOD_OTHER"});return t},ishort:function(){return a._getMessage("FD_MINUTE_SHORT").replace(/#VALUE#/g,N((i-D)/60/1e3))},Hago:function(){return d(N((i-D)/60/60/1e3),{0:"FD_HOUR_AGO_0",1:"FD_HOUR_AGO_1","10_20":"FD_HOUR_AGO_10_20",MOD_1:"FD_HOUR_AGO_MOD_1",MOD_2_4:"FD_HOUR_AGO_MOD_2_4",MOD_OTHER:"FD_HOUR_AGO_MOD_OTHER"})},Hdiff:function(){return d(N((i-D)/60/60/1e3),{0:"FD_HOUR_DIFF_0",1:"FD_HOUR_DIFF_1","10_20":"FD_HOUR_DIFF_10_20",MOD_1:"FD_HOUR_DIFF_MOD_1",MOD_2_4:"FD_HOUR_DIFF_MOD_2_4",MOD_OTHER:"FD_HOUR_DIFF_MOD_OTHER"})},Hshort:function(){return a._getMessage("FD_HOUR_SHORT").replace(/#VALUE#/g,N((i-D)/60/60/1e3))},yesterday:function(){return a._getMessage("FD_YESTERDAY")},today:function(){return a._getMessage("FD_TODAY")},tommorow:function(){return a._getMessage("FD_TOMORROW")},tomorrow:function(){return a._getMessage("FD_TOMORROW")},dago:function(){return d(N((i-D)/60/60/24/1e3),{0:"FD_DAY_AGO_0",1:"FD_DAY_AGO_1","10_20":"FD_DAY_AGO_10_20",MOD_1:"FD_DAY_AGO_MOD_1",MOD_2_4:"FD_DAY_AGO_MOD_2_4",MOD_OTHER:"FD_DAY_AGO_MOD_OTHER"})},ddiff:function(){return d(N((i-D)/60/60/24/1e3),{0:"FD_DAY_DIFF_0",1:"FD_DAY_DIFF_1","10_20":"FD_DAY_DIFF_10_20",MOD_1:"FD_DAY_DIFF_MOD_1",MOD_2_4:"FD_DAY_DIFF_MOD_2_4",MOD_OTHER:"FD_DAY_DIFF_MOD_OTHER"})},dshort:function(){return a._getMessage("FD_DAY_SHORT").replace(/#VALUE#/g,N((i-D)/60/60/24/1e3))},mago:function(){return d(N((i-D)/60/60/24/31/1e3),{0:"FD_MONTH_AGO_0",1:"FD_MONTH_AGO_1","10_20":"FD_MONTH_AGO_10_20",MOD_1:"FD_MONTH_AGO_MOD_1",MOD_2_4:"FD_MONTH_AGO_MOD_2_4",MOD_OTHER:"FD_MONTH_AGO_MOD_OTHER"})},mdiff:function(){return d(N((i-D)/60/60/24/31/1e3),{0:"FD_MONTH_DIFF_0",1:"FD_MONTH_DIFF_1","10_20":"FD_MONTH_DIFF_10_20",MOD_1:"FD_MONTH_DIFF_MOD_1",MOD_2_4:"FD_MONTH_DIFF_MOD_2_4",MOD_OTHER:"FD_MONTH_DIFF_MOD_OTHER"})},mshort:function(){return a._getMessage("FD_MONTH_SHORT").replace(/#VALUE#/g,N((i-D)/60/60/24/31/1e3))},Yago:function(){return d(N((i-D)/60/60/24/365/1e3),{0:"FD_YEARS_AGO_0",1:"FD_YEARS_AGO_1","10_20":"FD_YEARS_AGO_10_20",MOD_1:"FD_YEARS_AGO_MOD_1",MOD_2_4:"FD_YEARS_AGO_MOD_2_4",MOD_OTHER:"FD_YEARS_AGO_MOD_OTHER"})},Ydiff:function(){return d(N((i-D)/60/60/24/365/1e3),{0:"FD_YEARS_DIFF_0",1:"FD_YEARS_DIFF_1","10_20":"FD_YEARS_DIFF_10_20",MOD_1:"FD_YEARS_DIFF_MOD_1",MOD_2_4:"FD_YEARS_DIFF_MOD_2_4",MOD_OTHER:"FD_YEARS_DIFF_MOD_OTHER"})},Yshort:function(){return d(N((i-D)/60/60/24/365/1e3),{0:"FD_YEARS_SHORT_0",1:"FD_YEARS_SHORT_1","10_20":"FD_YEARS_SHORT_10_20",MOD_1:"FD_YEARS_SHORT_MOD_1",MOD_2_4:"FD_YEARS_SHORT_MOD_2_4",MOD_OTHER:"FD_YEARS_SHORT_MOD_OTHER"})},x:function(){var e=a.isAmPmMode(true);var t=e===a.AM_PM_MODE.LOWER?"g:i a":e===a.AM_PM_MODE.UPPER?"g:i A":"H:i";return a.format([["tomorrow","tomorrow, "+t],["-",a.convertBitrixFormat(a._getMessage("FORMAT_DATETIME")).replace(/:s/g,"")],["s","sago"],["i","iago"],["today","today, "+t],["yesterday","yesterday, "+t],["",a.convertBitrixFormat(a._getMessage("FORMAT_DATETIME")).replace(/:s/g,"")]],D,i,s)},X:function(){var e=a.isAmPmMode(true);var t=e===a.AM_PM_MODE.LOWER?"g:i a":e===a.AM_PM_MODE.UPPER?"g:i A":"H:i";var r=a.format([["tomorrow","tomorrow"],["-",a.convertBitrixFormat(a._getMessage("FORMAT_DATE"))],["today","today"],["yesterday","yesterday"],["",a.convertBitrixFormat(a._getMessage("FORMAT_DATE"))]],D,i,s);var _=a.format([["tomorrow",t],["today",t],["yesterday",t],["",""]],D,i,s);if(_.length>0)return a._getMessage("FD_DAY_AT_TIME").replace(/#DAY#/g,r).replace(/#TIME#/g,_);else return r},Q:function(){var e=N((i-D)/60/60/24/1e3);if(e==0)return a._getMessage("FD_DAY_DIFF_1").replace(/#VALUE#/g,1);else return a.format([["d","ddiff"],["m","mdiff"],["","Ydiff"]],D,i)}};var f=false;if(e[0]&&e[0]=="^"){f=true;e=e.substr(1)}var O=e.replace(M,h);if(f){O=O.replace(/\s*00:00:00\s*/g,"").replace(/(\d\d:\d\d)(:00)/g,"$1").replace(/(\s*00:00\s*)(?!:)/g,"")}if(o.length>0){o.forEach(function(e,t){O=O.replace("{{"+t+"}}",e)})}return O;function g(e,t,r,_){var n=N((r-t)/1e3);for(var D=0;D<e.length;D++){var i=e[D][0];var s=e[D][1];var o=null;if(i=="s"){if(n<60)return a.format(s,t,r,_)}else if((o=/^s(\d+)\>?(\d+)?/.exec(i))!=null){if(o[1]&&o[2]){if(n<o[1]&&n>o[2]){return a.format(s,t,r,_)}}else if(n<o[1]){return a.format(s,t,r,_)}}else if(i=="i"){if(n<60*60)return a.format(s,t,r,_)}else if((o=/^i(\d+)\>?(\d+)?/.exec(i))!=null){if(o[1]&&o[2]){if(n<o[1]*60&&n>o[2]*60){return a.format(s,t,r,_)}}else if(n<o[1]*60){return a.format(s,t,r,_)}}else if(i=="H"){if(n<24*60*60)return a.format(s,t,r,_)}else if((o=/^H(\d+)\>?(\d+)?/.exec(i))!=null){if(o[1]&&o[2]){if(n<o[1]*60*60&&n>o[2]*60*60){return a.format(s,t,r,_)}}else if(n<o[1]*60*60){return a.format(s,t,r,_)}}else if(i=="d"){if(n<31*24*60*60)return a.format(s,t,r,_)}else if((o=/^d(\d+)\>?(\d+)?/.exec(i))!=null){if(o[1]&&o[2]){if(n<o[1]*24*60*60&&n>o[2]*24*60*60){return a.format(s,t,r,_)}}else if(n<o[1]*24*60*60){return a.format(s,t,r,_)}}else if(i=="m"){if(n<365*24*60*60)return a.format(s,t,r,_)}else if((o=/^m(\d+)\>?(\d+)?/.exec(i))!=null){if(o[1]&&o[2]){if(n<o[1]*31*24*60*60&&n>o[2]*31*24*60*60){return a.format(s,t,r,_)}}else if(n<o[1]*31*24*60*60){return a.format(s,t,r,_)}}else if(i=="now"){if(t.getTime()==r.getTime()){return a.format(s,t,r,_)}}else if(i=="today"){var M=F(r),u=T(r),f=c(r);var O=_?new Date(Date.UTC(M,u,f,0,0,0,0)):new Date(M,u,f,0,0,0,0);var g=_?new Date(Date.UTC(M,u,f+1,0,0,0,0)):new Date(M,u,f+1,0,0,0,0);if(t>=O&&t<g)return a.format(s,t,r,_)}else if(i=="todayFuture"){var M=F(r),u=T(r),f=c(r);var O=r.getTime();var g=_?new Date(Date.UTC(M,u,f+1,0,0,0,0)):new Date(M,u,f+1,0,0,0,0);if(t>=O&&t<g)return a.format(s,t,r,_)}else if(i=="yesterday"){M=F(r);u=T(r);f=c(r);var E=_?new Date(Date.UTC(M,u,f-1,0,0,0,0)):new Date(M,u,f-1,0,0,0,0);var l=_?new Date(Date.UTC(M,u,f,0,0,0,0)):new Date(M,u,f,0,0,0,0);if(t>=E&&t<l)return a.format(s,t,r,_)}else if(i=="tommorow"||i=="tomorrow"){M=F(r);u=T(r);f=c(r);var A=_?new Date(Date.UTC(M,u,f+1,0,0,0,0)):new Date(M,u,f+1,0,0,0,0);var m=_?new Date(Date.UTC(M,u,f+2,0,0,0,0)):new Date(M,u,f+2,0,0,0,0);if(t>=A&&t<m)return a.format(s,t,r,_)}else if(i=="-"){if(n<0)return a.format(s,t,r,_)}}return e.length>0?a.format(e[e.length-1][1],t,r,_):""}function F(e){return s?e.getUTCFullYear():e.getFullYear()}function c(e){return s?e.getUTCDate():e.getDate()}function T(e){return s?e.getUTCMonth():e.getMonth()}function E(e){return s?e.getUTCHours():e.getHours()}function l(e){return s?e.getUTCMinutes():e.getMinutes()}function A(e){return s?e.getUTCSeconds():e.getSeconds()}function m(e){return s?e.getUTCMilliseconds():e.getMilliseconds()}function H(e){return s?e.getUTCDay():e.getDay()}function R(e,t){return s?e.setUTCDate(t):e.setDate(t)}function S(e,t,r){return s?e.setUTCMonth(t,r):e.setMonth(t,r)}function d(e,t){var r=e<100?Math.abs(e):Math.abs(e%100);var _=r%10;var n="";if(r==0)n=a._getMessage(t["0"]);else if(r==1)n=a._getMessage(t["1"]);else if(r>=10&&r<=20)n=a._getMessage(t["10_20"]);else if(_==1)n=a._getMessage(t["MOD_1"]);else if(2<=_&&_<=4)n=a._getMessage(t["MOD_2_4"]);else n=a._getMessage(t["MOD_OTHER"]);return n.replace(/#VALUE#/g,e)}function h(e,t){if(u[e])return u[e]();else return t}function N(e){return e>=0?Math.floor(e):Math.ceil(e)}},convertBitrixFormat:function(e){if(!r.isNotEmptyString(e))return"";return e.replace("YYYY","Y").replace("MMMM","F").replace("MM","m").replace("M","M").replace("DD","d").replace("G","g").replace(/GG/i,"G").replace("H","h").replace(/HH/i,"H").replace("MI","i").replace("SS","s").replace("TT","A").replace("T","a")},convertToUTC:function(e){if(!r.isDate(e))return null;return new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()))},getNewDate:function(e){return new Date(this.getBrowserTimestamp(e))},getBrowserTimestamp:function(e){e=parseInt(e,10);var t=new Date(e*1e3).getTimezoneOffset()*60;return(parseInt(e,10)+parseInt(this._getMessage("SERVER_TZ_OFFSET"))+t)*1e3},getServerTimestamp:function(e){e=parseInt(e,10);var t=new Date(e).getTimezoneOffset()*60;return Math.round(e/1e3-(parseInt(this._getMessage("SERVER_TZ_OFFSET"),10)+parseInt(t,10)))},formatLastActivityDate:function(e,t,r){var _=this.isAmPmMode(true);var n=_===this.AM_PM_MODE.LOWER?"g:i a":_===this.AM_PM_MODE.UPPER?"g:i A":"H:i";var a=[["tomorrow","#01#"+n],["now","#02#"],["todayFuture","#03#"+n],["yesterday","#04#"+n],["-",this.convertBitrixFormat(this._getMessage("FORMAT_DATETIME")).replace(/:s/g,"")],["s60","sago"],["i60","iago"],["H5","Hago"],["H24","#03#"+n],["d31","dago"],["m12>1","mago"],["m12>0","dago"],["","#05#"]];var D=this.format(a,e,t,r);var i=null;if((i=/^#(\d+)#(.*)/.exec(D))!=null){switch(i[1]){case"01":D=this._getMessage("FD_LAST_SEEN_TOMORROW").replace("#TIME#",i[2]);break;case"02":D=this._getMessage("FD_LAST_SEEN_NOW");break;case"03":D=this._getMessage("FD_LAST_SEEN_TODAY").replace("#TIME#",i[2]);break;case"04":D=this._getMessage("FD_LAST_SEEN_YESTERDAY").replace("#TIME#",i[2]);break;case"05":D=this._getMessage("FD_LAST_SEEN_MORE_YEAR");break;default:D=i[2];break}}return D},isAmPmMode:function(e){if(e===true){return this._getMessage("AMPM_MODE")}return this._getMessage("AMPM_MODE")!==false},_getMessage:function(e){return t.message(e)},parse:function(e,t,_,n){if(r.isNotEmptyString(e)){if(!_)_=this._getMessage("FORMAT_DATE");if(!n)n=this._getMessage("FORMAT_DATETIME");var a="";for(o=1;o<=12;o++){a=a+"|"+this._getMessage("MON_"+o)}var D=new RegExp("([0-9]+|[a-z]+"+a+")","ig"),i=e.match(D),s=_.match(/(DD|MI|MMMM|MM|M|YYYY)/gi),o,M,u=[],f=[],O={};if(!i){return null}if(i.length>s.length){s=n.match(/(DD|MI|MMMM|MM|M|YYYY|HH|H|SS|TT|T|GG|G)/gi)}for(o=0,M=i.length;o<M;o++){if(i[o].trim()!==""){u[u.length]=i[o]}}for(o=0,M=s.length;o<M;o++){if(s[o].trim()!==""){f[f.length]=s[o]}}var g=r.array_search("MMMM",f);if(g>0){u[g]=this.getMonthIndex(u[g]);f[g]="MM"}else{g=r.array_search("M",f);if(g>0){u[g]=this.getMonthIndex(u[g]);f[g]="MM"}}for(o=0,M=f.length;o<M;o++){var F=f[o].toUpperCase();O[F]=F==="T"||F==="TT"?u[o]:parseInt(u[o],10)}if(O["DD"]>0&&O["MM"]>0&&O["YYYY"]>0){var c=new Date;if(t){c.setUTCDate(1);c.setUTCFullYear(O["YYYY"]);c.setUTCMonth(O["MM"]-1);c.setUTCDate(O["DD"]);c.setUTCHours(0,0,0,0)}else{c.setDate(1);c.setFullYear(O["YYYY"]);c.setMonth(O["MM"]-1);c.setDate(O["DD"]);c.setHours(0,0,0,0)}if((!isNaN(O["HH"])||!isNaN(O["GG"])||!isNaN(O["H"])||!isNaN(O["G"]))&&!isNaN(O["MI"])){if(!isNaN(O["H"])||!isNaN(O["G"])){var T=(O["T"]||O["TT"]||"am").toUpperCase()==="PM",E=parseInt(O["H"]||O["G"]||0,10);if(T){O["HH"]=E+(E===12?0:12)}else{O["HH"]=E<12?E:0}}else{O["HH"]=parseInt(O["HH"]||O["GG"]||0,10)}if(isNaN(O["SS"]))O["SS"]=0;if(t){c.setUTCHours(O["HH"],O["MI"],O["SS"])}else{c.setHours(O["HH"],O["MI"],O["SS"])}}return c}}return null},getMonthIndex:function(e){var t,r=e.toUpperCase(),_=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],n=["january","february","march","april","may","june","july","august","september","october","november","december"];for(t=1;t<=12;t++){if(r===this._getMessage("MON_"+t).toUpperCase()||r===this._getMessage("MONTH_"+t).toUpperCase()||r===_[t-1].toUpperCase()||r===n[t-1].toUpperCase()){return t}}return e}};var r={isDate:function(e){return e&&Object.prototype.toString.call(e)=="[object Date]"},isNumber:function(e){return e===0?true:e?typeof e=="number"||e instanceof Number:false},isArray:function(e){return e&&Object.prototype.toString.call(e)=="[object Array]"},isString:function(e){return e===""?true:e?typeof e=="string"||e instanceof String:false},isNotEmptyString:function(e){return this.isString(e)?e.length>0:false},strPadLeft:function(e,t,r){var _=e.length,n=r.length;if(_>=t)return e;for(;_<t;_+=n)e=r+e;return e},array_search:function(e,t){for(var r=0;r<t.length;r++){if(t[r]==e)return r}return-1}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:49:"/bitrix/js/main/core/core_date.js?159569177233995";s:6:"source";s:33:"/bitrix/js/main/core/core_date.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(){

if (BX.date)
	return;

BX.date = BX.Main.Date;

/************************************** calendar class **********************************/

var obCalendarSingleton = null;

/*
params: {
	node: bind element || document.body

	value - start value in site format (using 'field' param if 'value' does not exist)
	callback - date check handler. can return false to prevent calendar closing.
	callback_after - another handler, called after date picking

	field - field to read/write data

	bTime = true - whether to enable time control
	bHideTime = false - whether to hide time control by default

	currentTime - current UTC time()

}
*/


BX.calendar = function(params)
{
	return BX.calendar.get().Show(params);
};

BX.calendar.get = function()
{
	if (!obCalendarSingleton)
		obCalendarSingleton = new BX.JCCalendar();

	return obCalendarSingleton;
};

// simple func for compatibility with the oldies
BX.calendar.InsertDaysBack = function(input, days)
{
	if (days != '')
	{
		var d = new Date();
		if(days > 0)
		{
			d.setTime(d.valueOf() - days*86400000);
		}

		input.value = BX.date.format(BX.date.convertBitrixFormat(BX.message('FORMAT_DATE')), d, null);
	}
	else
	{
		input.value = '';
	}
};

BX.calendar.ValueToString = function(value, bTime, bUTC)
{
	return BX.date.format(
		BX.date.convertBitrixFormat(BX.message(bTime ? 'FORMAT_DATETIME' : 'FORMAT_DATE')),
		value,
		null,
		!!bUTC
	);
};

BX.calendar.ValueToStringFormat = function(value, bitrixFormat, bUTC)
{
	return BX.date.format(
		BX.date.convertBitrixFormat(bitrixFormat),
		value,
		null,
		!!bUTC
	);
};


BX.CalendarPeriod =
{
	Init: function(inputFrom, inputTo, selPeriod)
	{
		if((inputFrom.value != "" || inputTo.value != "") && selPeriod.value == "")
			selPeriod.value = "interval";

		selPeriod.onchange();
	},

	ChangeDirectOpts: function(peroidValue, selPParent) // "week" || "others"
	{
		var selDirect = BX.findChild(selPParent, {'className':'adm-select adm-calendar-direction'}, true);

		if(peroidValue == "week")
		{
			selDirect.options[0].text = BX.message('JSADM_CALEND_PREV_WEEK');
			selDirect.options[1].text = BX.message('JSADM_CALEND_CURR_WEEK');
			selDirect.options[2].text = BX.message('JSADM_CALEND_NEXT_WEEK');
		}
		else
		{
			selDirect.options[0].text = BX.message('JSADM_CALEND_PREV');
			selDirect.options[1].text = BX.message('JSADM_CALEND_CURR');
			selDirect.options[2].text = BX.message('JSADM_CALEND_NEXT');
		}
	},

	SaveAndClearInput: function(oInput)
	{
		if(!window.SavedPeriodValues)
			window.SavedPeriodValues = {};

		window.SavedPeriodValues[oInput.id] = oInput.value;
		oInput.value="";
	},

	RestoreInput: function(oInput)
	{
		if(!window.SavedPeriodValues || !window.SavedPeriodValues[oInput.id])
			return;

		oInput.value = window.SavedPeriodValues[oInput.id];
		delete(window.SavedPeriodValues[oInput.id]);
	},

	OnChangeP: function(sel)
	{
		var selPParent = sel.parentNode.parentNode;
		var bShowFrom, bShowTo, bShowDirect, bShowSeparate;
		bShowFrom = bShowTo = bShowDirect = bShowSeparate = false;

		var inputFromWrap = BX.findChild(selPParent, {'className':'adm-input-wrap adm-calendar-inp adm-calendar-first'});
		var inputToWrap = BX.findChild(selPParent, {'className':'adm-input-wrap adm-calendar-second'});
		var selDirectWrap = BX.findChild(selPParent, {'className':'adm-select-wrap adm-calendar-direction'});
		var separator = BX.findChild(selPParent, {'className':'adm-calendar-separate'});
		var inputFrom = BX.findChild(selPParent, {'className':'adm-input adm-calendar-from'},true);
		var inputTo = BX.findChild(selPParent, {'className':'adm-input adm-calendar-to'},true);

		// define who must be shown
		switch (sel.value)
		{
			case "day":
			case "week":
			case "month":
			case "quarter":
			case "year":
				bShowDirect=true;
				BX.CalendarPeriod.OnChangeD(selDirectWrap.children[0]);
				break;

			case "before":
				bShowTo = true;
				break;

			case "after":
				bShowFrom = true;
				break;

			case "exact":
				bShowFrom= true;
				break;

			case "interval":
				bShowFrom = bShowTo = bShowSeparate = true;
				BX.CalendarPeriod.RestoreInput(inputFrom);
				BX.CalendarPeriod.RestoreInput(inputTo);

				break;

			case "":
				BX.CalendarPeriod.SaveAndClearInput(inputFrom);
				BX.CalendarPeriod.SaveAndClearInput(inputTo);
				break;

			default:
				break;

		}

		BX.CalendarPeriod.ChangeDirectOpts(sel.value, selPParent);

		inputFromWrap.style.display = (bShowFrom? 'inline-block':'none');
		inputToWrap.style.display = (bShowTo? 'inline-block':'none');
		selDirectWrap.style.display = (bShowDirect? 'inline-block':'none');
		separator.style.display = (bShowSeparate? 'inline-block':'none');
	},


	OnChangeD: function(sel)
	{
		var selPParent = sel.parentNode.parentNode;
		var inputFrom = BX.findChild(selPParent, {'className':'adm-input adm-calendar-from'},true);
		var inputTo = BX.findChild(selPParent, {'className':'adm-input adm-calendar-to'},true);
		var selPeriod = BX.findChild(selPParent, {'className':'adm-select adm-calendar-period'},true);

		var offset=0;

		switch (sel.value)
		{
			case "previous":
				offset = -1;
				break;

			case "next":
				offset = 1;
				break;

			case "current":
			default:
				break;

		}

		var from = false;
		var to = false;

		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth();
		var day = today.getDate();
		var dayW = today.getDay();

		if (dayW == 0)
				dayW = 7;

		switch (selPeriod.value)
		{
			case "day":
				from = new Date(year, month, day+offset, 0, 0, 0);
				to = new Date(year, month, day+offset, 23, 59, 59);
				break;

			case "week":
				from = new Date(year, month, day-dayW+1+offset*7, 0, 0, 0);
				to = new Date(year, month, day+(7-dayW)+offset*7, 23, 59, 59);
				break;

			case "month":
				from = new Date(year, month+offset, 1, 0, 0, 0);
				to = new Date(year, month+1+offset, 0, 23, 59, 59);
				break;

			case "quarter":
				var quarterNum = Math.floor((month/3))+offset;
				from = new Date(year, 3*(quarterNum), 1, 0, 0, 0);
				to = new Date(year, 3*(quarterNum+1), 0, 23, 59, 59);
				break;

			case "year":
				from = new Date(year+offset, 0, 1, 0, 0, 0);
				to = new Date(year+1+offset, 0, 0, 23, 59, 59);
				break;

			default:
				break;
		}

		var format = window[inputFrom.name+"_bTime"] ? BX.message('FORMAT_DATETIME') : BX.message('FORMAT_DATE');

		if(from)
		{
			inputFrom.value = BX.formatDate(from, format);
			BX.addClass(inputFrom,"adm-calendar-inp-setted");
		}

		if(to)
		{
			inputTo.value = BX.formatDate(to, format);
			BX.addClass(inputTo,"adm-calendar-inp-setted");
		}
	}
};


BX.JCCalendar = function()
{
	this.params = {};

	this.bAmPm = BX.isAmPmMode();

	this.popup = null;
	this.popup_month = null;
	this.popup_year = null;
	this.month_popup_classname = '';
	this.year_popup_classname = '';

	this.value = null;

	this.control_id = Math.random();

	this._layers = {};
	this._current_layer = null;

	this.DIV = null;
	this.PARTS = {};

	this.weekStart = 0;
	this.numRows = 6;

	this._create = function(params)
	{
		this.popup = new BX.PopupWindow('calendar_popup_' + this.control_id, params.node, {
			closeByEsc: true,
			autoHide: false,
			content: this._get_content(),
			zIndex: 3000,
			bindOptions: {forceBindPosition: true}
		});

		BX.bind(this.popup.popupContainer, 'click', function(event) {
			event.stopPropagation();
		});
	};

	this._auto_hide_disable = function()
	{
		BX.unbind(document, 'click', BX.proxy(this._auto_hide, this));
	};

	this._auto_hide_enable = function()
	{
		BX.bind(document, 'click', BX.proxy(this._auto_hide, this));
	};

	this._auto_hide = function(e)
	{
		this._auto_hide_disable();
		this.popup.close();
	};

	this._get_content = function()
	{
		var _layer_onclick = BX.delegate(function(e) {
			e = e||window.event;
			this.SetDate(new Date(parseInt(BX.proxy_context.getAttribute('data-date'))), e.type=='dblclick')
		}, this);

		this.DIV = BX.create('DIV', {
			props: {className: 'bx-calendar'},
			children: [
				BX.create('DIV', {
					props: {
						className: 'bx-calendar-header'
					},
					children: [
						BX.create('A', {
							attrs: {href: 'javascript:void(0)'},
							props: {className: 'bx-calendar-left-arrow'},
							events: {click: BX.proxy(this._prev, this)}
						}),

						BX.create('SPAN', {
							props: {className: 'bx-calendar-header-content'},
							children: [
								(this.PARTS.MONTH = BX.create('A', {
									attrs: {href: 'javascript:void(0)'},
									props: {className: 'bx-calendar-top-month'},
									events: {click: BX.proxy(this._menu_month, this)}
								})),

								(this.PARTS.YEAR = BX.create('A', {
									attrs: {href: 'javascript:void(0)'},
									props: {className: 'bx-calendar-top-year'},
									events: {click: BX.proxy(this._menu_year, this)}
								}))
							]
						}),

						BX.create('A', {
							attrs: {href: 'javascript:void(0)'},
							props: {className: 'bx-calendar-right-arrow'},
							events: {click: BX.proxy(this._next, this)}
						})
					]
				}),

				(this.PARTS.WEEK = BX.create('DIV', {
					props: {
						className: 'bx-calendar-name-day-wrap'
					}
				})),

				(this.PARTS.LAYERS = BX.create('DIV', {
					props: {
						className: 'bx-calendar-cell-block'
					},
					events: {
						click: BX.delegateEvent({className: 'bx-calendar-cell'}, _layer_onclick),
						dblclick: BX.delegateEvent({className: 'bx-calendar-cell'}, _layer_onclick)
					}
				})),

				(this.PARTS.TIME = BX.create('DIV', {
					props: {
						className: 'bx-calendar-set-time-wrap'
					},
					events: {
						click: BX.delegateEvent(
							{attr: 'data-action'},
							BX.delegate(this._time_actions, this)
						)
					},
					html: '<a href="javascript:void(0)" data-action="time_show" class="bx-calendar-set-time"><i></i>'+BX.message('CAL_TIME_SET')+'</a><div class="bx-calendar-form-block"><span class="bx-calendar-form-text">'+BX.message('CAL_TIME')+'</span><span class="bx-calendar-form"><input type="text" class="bx-calendar-form-input" maxwidth="2" onkeyup="BX.calendar.get()._check_time()" /><span class="bx-calendar-form-separator"></span><input type="text" class="bx-calendar-form-input" maxwidth="2" onkeyup="BX.calendar.get()._check_time()" />'+(this.bAmPm?'<span class="bx-calendar-AM-PM-block"><span class="bx-calendar-AM-PM-text" data-action="time_ampm"></span><span class="bx-calendar-form-arrow-r"><a href="javascript:void(0)" class="bx-calendar-form-arrow-top" data-action="time_ampm_up"><i></i></a><a href="javascript:void(0)" class="bx-calendar-form-arrow-bottom" data-action="time_ampm_down"><i></i></a></span></span>':'')+'</span><a href="javascript:void(0)" data-action="time_hide" class="bx-calendar-form-close"><i></i></a></div>'
				})),

				BX.create('DIV', {
					props: {className: 'bx-calendar-button-block'},
					events: {
						click: BX.delegateEvent(
							{attr: 'data-action'},
							BX.delegate(this._button_actions, this)
						)
					},
					html: '<a href="javascript:void(0)" class="bx-calendar-button bx-calendar-button-select" data-action="submit"><span class="bx-calendar-button-left"></span><span class="bx-calendar-button-text">'+BX.message('CAL_BUTTON')+'</span><span class="bx-calendar-button-right"></span></a><a href="javascript:void(0)" class="bx-calendar-button bx-calendar-button-cancel" data-action="cancel"><span class="bx-calendar-button-left"></span><span class="bx-calendar-button-text">'+BX.message('JS_CORE_WINDOW_CLOSE')+'</span><span class="bx-calendar-button-right"></span></a>'
				})
			]
		});

		this.PARTS.TIME_INPUT_H = BX.findChild(this.PARTS.TIME, {tag: 'INPUT'}, true);
		this.PARTS.TIME_INPUT_M = this.PARTS.TIME_INPUT_H.nextSibling.nextSibling;

		if (this.bAmPm)
			this.PARTS.TIME_AMPM = this.PARTS.TIME_INPUT_M.nextSibling.firstChild;

		var spinner = (new BX.JCSpinner({
			input: this.PARTS.TIME_INPUT_H,
			callback_change: BX.proxy(this._check_time, this),
			bSaveValue: false
		})).Show();
		spinner.className = 'bx-calendar-form-arrow-l';
		this.PARTS.TIME_INPUT_H.parentNode.insertBefore(spinner, this.PARTS.TIME_INPUT_H);

		spinner = (new BX.JCSpinner({
			input: this.PARTS.TIME_INPUT_M,
			callback_change: BX.proxy(this._check_time, this),
			bSaveValue: true
		})).Show();
		spinner.className = 'bx-calendar-form-arrow-r';
		if (!this.PARTS.TIME_INPUT_M.nextSibling)
			this.PARTS.TIME_INPUT_M.parentNode.appendChild(spinner);
		else
			this.PARTS.TIME_INPUT_M.parentNode.insertBefore(spinner, this.PARTS.TIME_INPUT_M.nextSibling);

		for (var i = 0; i < 7; i++)
		{
			this.PARTS.WEEK.appendChild(BX.create('SPAN', {
				props: {
					className: 'bx-calendar-name-day'
				},
				text: BX.message('DOW_' + ((i + this.weekStart) % 7))
			}));
		}

		return this.DIV;
	};

	this._time_actions = function()
	{
		switch (BX.proxy_context.getAttribute('data-action'))
		{
			case 'time_show':
				BX.addClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
				this.popup.adjustPosition();
			break;
			case 'time_hide':
				BX.removeClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
				this.popup.adjustPosition();
			break;
			case 'time_ampm':
				this.PARTS.TIME_AMPM.innerHTML = this.PARTS.TIME_AMPM.innerHTML == 'AM' ? 'PM' : 'AM';
			break;
			case 'time_ampm_up':
				this._check_time({bSaveValue: false}, null, 12);
				return;
			break;
			case 'time_ampm_down':
				this._check_time({bSaveValue: false}, null, -12);
				return;
			break;
		}

		this._check_time();
	};

	this._button_actions = function()
	{
		switch (BX.proxy_context.getAttribute('data-action'))
		{
			case 'submit':
				this.SaveValue();
			break;
			case 'cancel':
				this.Close();
			break;
		}
	};

	this._check_time = function(params, value, direction)
	{
		var h = parseInt(this.PARTS.TIME_INPUT_H.value.substring(0,5),10)||0,
			m = parseInt(this.PARTS.TIME_INPUT_M.value.substring(0,5),10)||0,
			bChanged = false;

		if (!!params && !params.bSaveValue)
		{
			this.value.setUTCHours(this.value.getUTCHours() + direction);
		}
		else if (!isNaN(h))
		{
			if (this.bAmPm)
			{
				if (h != 12 && this.PARTS.TIME_AMPM.innerHTML == 'PM')
				{
					h += 12;
				}
			}

			bChanged = true;
			this.value.setUTCHours(h % 24);
		}

		if (!isNaN(m))
		{
			bChanged = true;
			this.value.setUTCMinutes(m % 60);
		}

		if (bChanged)
		{
			this.SetValue(this.value);
		}
	};

	this._set_layer = function()
	{
		var layerId = parseInt(this.value.getUTCFullYear() + '' + BX.util.str_pad_left(this.value.getUTCMonth()+'', 2, "0"));

		if (!this._layers[layerId])
		{
			this._layers[layerId] = this._create_layer();
			this._layers[layerId].BXLAYERID = layerId;
		}

		if (this._current_layer)
		{
			var v = new Date(this.value.valueOf());
			v.setUTCHours(0); v.setUTCMinutes(0);

			var cur_value = BX.findChild(this._layers[layerId], {
					tag: 'A',
					className: 'bx-calendar-active'
				}, true),
				new_value = BX.findChild(this._layers[layerId], {
					tag: 'A',
					attr: {
						'data-date' : v.valueOf() + ''
					}
				}, true);

			if (cur_value)
			{
				BX.removeClass(cur_value, 'bx-calendar-active');
			}

			if (new_value)
			{
				BX.addClass(new_value, 'bx-calendar-active');
			}

			this._replace_layer(this._current_layer, this._layers[layerId]);
		}
		else
		{
			this.PARTS.LAYERS.appendChild(this._layers[layerId]);
		}

		this._current_layer = this._layers[layerId];
	};

	this._replace_layer = function(old_layer, new_layer)
	{
		if (old_layer != new_layer)
		{
			if (!BX.browser.IsIE() || BX.browser.IsDoctype())
			{
				var dir = old_layer.BXLAYERID > new_layer.BXLAYERID ? 1 : -1;

				var old_top = 0;
				var new_top = -dir * old_layer.offsetHeight;

				old_layer.style.position = 'relative';
				old_layer.style.top = "0px";
				old_layer.style.zIndex = 5;

				new_layer.style.position = 'absolute';
				new_layer.style.top = new_top + 'px';
				new_layer.style.zIndex = 6;

				this.PARTS.LAYERS.appendChild(new_layer);

				var delta = 15;

				var f;
				(f = function() {
					new_top += dir * delta;
					old_top += dir * delta;

					if (dir * new_top < 0)
					{
						old_layer.style.top = old_top + 'px';
						new_layer.style.top = new_top + 'px';
						setTimeout(f, 10);
					}
					else
					{
						old_layer.parentNode.removeChild(old_layer);

						new_layer.style.top = "0px";
						new_layer.style.position = 'static';
						new_layer.style.zIndex = 0;
					}
				})();
			}
			else
			{
				this.PARTS.LAYERS.replaceChild(new_layer, old_layer);
			}
		}
	};

	this._create_layer = function()
	{
		var l = BX.create('DIV', {
			props: {
				className: 'bx-calendar-layer'
			}
		});

		var month_start = new Date(this.value);
		month_start.setUTCHours(0);
		month_start.setUTCMinutes(0);

		month_start.setUTCDate(1);

		if (month_start.getUTCDay() != this.weekStart)
		{
			var d = month_start.getUTCDay() - this.weekStart;
			d += d < 0 ? 7 : 0;
			month_start.setUTCDate(month_start.getUTCDate()-d);
		}

		var cur_month = this.value.getUTCMonth(),
			cur_day = this.value.getUTCDate(),
			s = '';
		for (var i = 0; i < this.numRows; i++)
		{
			s += '<div class="bx-calendar-range'
				+(i == this.numRows-1 ? ' bx-calendar-range-noline' : '')
				+'">';

			for (var j = 0; j < 7; j++)
			{
				d = month_start.getUTCDate();
				var wd = month_start.getUTCDay();
				var className = 'bx-calendar-cell';

				if (cur_month != month_start.getUTCMonth())
					className += ' bx-calendar-date-hidden';
				else if (cur_day == d)
					className += ' bx-calendar-active';


				if (wd == 0 || wd == 6)
					className += ' bx-calendar-weekend';

				s += '<a href="javascript:void(0)" class="'+className+'" data-date="' + month_start.valueOf() + '">' + d + '</a>';

				month_start.setUTCDate(month_start.getUTCDate()+1);
			}
			s += '</div>';
		}

		l.innerHTML = s;

		return l;
	};

	this._prev = function()
	{
		this.SetMonth(this.value.getUTCMonth()-1);
	};

	this._next = function()
	{
		this.SetMonth(this.value.getUTCMonth()+1);
	};

	this._menu_month_content = function()
	{
		var months = '', cur_month = this.value.getMonth(), i;
		for (i = 0; i < 12; i++)
		{
			months += '<span class="bx-calendar-month'+(i == cur_month ? ' bx-calendar-month-active' : '')+'" data-bx-month="' + i + '">' + BX.message('MONTH_' + (i + 1)) + '</span>';
		}

		return '<div class="bx-calendar-month-popup"><div class="bx-calendar-month-title" data-bx-month="' + this.value.getUTCMonth() + '">' + BX.message('MONTH_' + (this.value.getUTCMonth() + 1)) + '</div><div class="bx-calendar-month-content">' + months + '</div></div>';
	};

	this._menu_month = function()
	{
		if (!this.popup_month)
		{
			this.popup_month = new BX.PopupWindow(
				'calendar_popup_month_' + this.control_id, this.PARTS.MONTH,
				{
					content: this._menu_month_content(),
					zIndex: 3001,
					closeByEsc: true,
					autoHide: true,
					offsetTop: -29,
					offsetLeft: -1,
					className: this.month_popup_classname,
					events: {
						onPopupShow: BX.delegate(function() {
							if (this.popup_year)
							{
								this.popup_year.close();
							}
						}, this)
					}
				}
			);

			BX.bind(this.popup_month.popupContainer, 'click', BX.proxy(this.month_popup_click, this));
			this.popup_month.BXMONTH = this.value.getUTCMonth();
		}
		else if (this.popup_month.BXMONTH != this.value.getUTCMonth())
		{
			this.popup_month.setContent(this._menu_month_content());
			this.popup_month.BXMONTH = this.value.getUTCMonth();
		}

		this.popup_month.show();
	};

	this.month_popup_click = function(e)
	{
		var target = e.target || e.srcElement;
		if (target && target.getAttribute && target.getAttribute('data-bx-month'))
		{
			this.SetMonth(parseInt(target.getAttribute('data-bx-month')));
			this.popup_month.close();
		}
	};

	this._menu_year_content = function()
	{
		var s = '<div class="bx-calendar-year-popup"><div class="bx-calendar-year-title" data-bx-year="' + this.value.getUTCFullYear() + '">' + this.value.getUTCFullYear() + '</div><div class="bx-calendar-year-content" id="bx-calendar-year-content">';

		for (var i=-3; i <= 3; i++)
		{
			s += '<span class="bx-calendar-year-number' + (i == 0?' bx-calendar-year-active' : '') + '" data-bx-year="' + (this.value.getUTCFullYear() - i) + '">' + (this.value.getUTCFullYear() - i)+'</span>';
		}

		s += '</div><input data-bx-year-input="Y" type="text" class="bx-calendar-year-input" maxlength="4" /></div>';

		return s;
	};

	this._menu_year = function()
	{
		if (!this.popup_year)
		{
			this.popup_year = new BX.PopupWindow(
				'calendar_popup_year_' + this.control_id, this.PARTS.YEAR,
				{
					content: this._menu_year_content(),
					zIndex: 3001,
					closeByEsc: true,
					autoHide: true,
					offsetTop: -29,
					offsetLeft: -1,
					className: this.year_popup_classname,
					events: {
						onPopupShow: BX.delegate(function() {
							if (this.popup_month)
							{
								this.popup_month.close();
							}
						}, this)
					}
				}
			);

			BX.bind(this.popup_year.popupContainer, 'click', BX.proxy(this.year_popup_click, this));
			BX.bind(this.popup_year.popupContainer, 'keyup', BX.proxy(this.year_popup_keyup, this));
			this.popup_year.BXYEAR = this.value.getUTCFullYear();
		}
		else if (this.popup_year.BXYEAR != this.value.getUTCFullYear())
		{
			this.popup_year.setContent(this._menu_year_content());
			this.popup_year.BXYEAR = this.value.getUTCFullYear();
		}

		this.popup_year.show();
	};

	this.year_popup_click = function(e)
	{
		var target = e.target || e.srcElement;
		if (target && target.getAttribute && target.getAttribute('data-bx-year'))
		{
			this.SetYear(parseInt(target.getAttribute('data-bx-year')));
			this.popup_year.close();
		}
	};
	this.year_popup_keyup = function(e)
	{
		var target = e.target || e.srcElement;
		if (target && target.getAttribute && target.getAttribute('data-bx-year-input') == 'Y')
		{
			var value = parseInt(target.value);
			if(value >= 1900 && value <= 2100)
			{
				this.SetYear(value);
				this.popup_year.close();
			}
		}
	};

	this._check_date = function(v)
	{
		var res = v;

		if (BX.type.isString(v))
		{
			res = BX.parseDate(v, true);
		}

		if (!BX.type.isDate(res) || isNaN(res.valueOf()))
		{
			res = BX.date.convertToUTC(new Date());
			if (this.params.bHideTime)
			{
				res.setUTCHours(0);
				res.setUTCMinutes(0);
			}
		}

		res.setUTCMilliseconds(0);
		res.setUTCSeconds(0);

		res.BXCHECKED = true;

		return res;
	};
};

BX.JCCalendar.prototype.Show = function(params)
{
	if (!BX.isReady)
	{
		BX.ready(BX.delegate(function() {this.Show(params)}, this));
		return;
	}

	params.node = params.node||document.body;

	if (BX.type.isNotEmptyString(params.node))
	{
		var n = BX(params.node);
		if (!n)
		{
			n = document.getElementsByName(params.node);
			if (n && n.length > 0)
			{
				n = n[0]
			}
		}
		params.node = n;
	}

	if (!params.node)
		return;

	if (!!params.field)
	{
		if (BX.type.isString(params.field))
		{
			n = BX(params.field);
			if (!!n)
			{
				params.field = n;
			}
			else
			{
				if (params.form)
				{
					if (BX.type.isString(params.form))
					{
						params.form = document.forms[params.form];
					}
				}

				if (BX.type.isDomNode(params.form) && !!params.form[params.field])
				{
					params.field = params.form[params.field];
				}
				else
				{
					n = document.getElementsByName(params.field);
					if (n && n.length > 0)
					{
						n = n[0];
						params.field = n;
					}
				}
			}

			if (BX.type.isString(params.field))
			{
				params.field = BX(params.field);
			}
		}
	}

	var bShow = !this.popup || !this.popup.isShown() || this.params.node != params.node;

	this.params = params;

	this.params.bTime = typeof this.params.bTime == 'undefined' ? true : !!this.params.bTime;
	this.params.bHideTime = typeof this.params.bHideTime == 'undefined' ? true : !!this.params.bHideTime;
	this.params.bUseSecond = typeof this.params.bUseSecond == 'undefined' ? true : !!this.params.bUseSecond;

	this.weekStart = parseInt(this.params.weekStart || this.params.weekStart || BX.message('WEEK_START'));
	if (isNaN(this.weekStart))
		this.weekStart = 1;

	if (!this.popup)
	{
		this._create(this.params);
	}
	else
	{
		this.popup.setBindElement(this.params.node);
	}

	var bHideTime = !!this.params.bHideTime;
	if (this.params.value)
	{
		this.SetValue(this.params.value);
		bHideTime = this.value.getUTCHours() <= 0 && this.value.getUTCMinutes() <= 0;
	}
	else if (this.params.field)
	{
		this.SetValue(this.params.field.value);
		bHideTime = this.value.getUTCHours() <= 0 && this.value.getUTCMinutes() <= 0;
	}
	else if (!!this.params.currentTime)
	{
		this.SetValue(this.params.currentTime);
	}
	else
	{
		this.SetValue();
	}

	if (!!this.params.bTime)
		BX.removeClass(this.DIV, 'bx-calendar-time-disabled');
	else
		BX.addClass(this.DIV, 'bx-calendar-time-disabled');

	if (!!bHideTime)
		BX.removeClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
	else
		BX.addClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');

	if (bShow)
	{
		this._auto_hide_disable();
		this.popup.show();
		setTimeout(BX.proxy(this._auto_hide_enable, this), 0);
	}

	this.params.bSetFocus = typeof this.params.bSetFocus == 'undefined' ? true : !!this.params.bSetFocus;
	if(this.params.bSetFocus)
	{
		params.node.blur();
	}
	else
	{
		BX.bind(params.node, 'keyup', BX.defer(function(){
			this.SetValue(params.node.value);
			if(!!this.params.bTime)
			{
				if(this.value.getUTCHours() <= 0 && this.value.getUTCMinutes() <= 0)
					BX.removeClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
				else
					BX.addClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
			}
		}, this));
	}

	return this;
};

BX.JCCalendar.prototype.SetDay = function(d)
{
	this.value.setUTCDate(d);
	return this.SetValue(this.value);
};

BX.JCCalendar.prototype.SetMonth = function(m)
{
	if (this.popup_month)
		this.popup_month.close();

	this.value.setUTCMonth(m);

	if(m < 0)
		m += 12;
	else if (m >= 12)
		m -= 12;

	while(this.value.getUTCMonth() > m)
	{
		this.value.setUTCDate(this.value.getUTCDate()-1);
	}

	return this.SetValue(this.value);
};

BX.JCCalendar.prototype.SetYear = function(y)
{
	if (this.popup_year)
		this.popup_year.close();
	this.value.setUTCFullYear(y);
	return this.SetValue(this.value);
};

BX.JCCalendar.prototype.SetDate = function(v, bSet)
{
	v = this._check_date(v);
	v.setUTCHours(this.value.getUTCHours());
	v.setUTCMinutes(this.value.getUTCMinutes());
	v.setUTCSeconds(this.value.getUTCSeconds());

	if (this.params.bTime && !bSet)
	{
		return this.SetValue(v);
	}
	else
	{
		this.SetValue(v);
		this.SaveValue();
	}
};

BX.JCCalendar.prototype.SetValue = function(v)
{
	this.value = (v && v.BXCHECKED) ? v : this._check_date(v);

	this.PARTS.MONTH.innerHTML = BX.message('MONTH_' + (this.value.getUTCMonth()+1));
	this.PARTS.YEAR.innerHTML = this.value.getUTCFullYear();

	if (!!this.params.bTime)
	{
		var h = this.value.getUTCHours();
		if (this.bAmPm)
		{
			if (h >= 12)
			{
				this.PARTS.TIME_AMPM.innerHTML = 'PM';

				if (h != 12)
					h -= 12;
			}
			else
			{
				this.PARTS.TIME_AMPM.innerHTML = 'AM';

				if (h == 0)
					h = 12;
			}
		}

		this.PARTS.TIME_INPUT_H.value = BX.util.str_pad_left(h.toString(), 2, "0");
		this.PARTS.TIME_INPUT_M.value = BX.util.str_pad_left(this.value.getUTCMinutes().toString(), 2, "0");
	}

	this._set_layer();

	return this;
};

BX.JCCalendar.prototype.SaveValue = function()
{
	if (this.popup_month)
		this.popup_month.close();
	if (this.popup_year)
		this.popup_year.close();

	var bSetValue = true;
	if (!!this.params.callback)
	{
		var res = this.params.callback.apply(this, [new Date(this.value.valueOf()+this.value.getTimezoneOffset()*60000)]);
		if (res === false)
			bSetValue = false;
	}

	if (bSetValue)
	{
		var bTime = !!this.params.bTime && BX.hasClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');

		if (this.params.field)
		{
			var format = BX.message(bTime ? 'FORMAT_DATETIME' : 'FORMAT_DATE');

			if(bTime && !this.params.bUseSecond)
			{
				format = format.replace(':SS', '');
			}

			this.params.field.value = BX.calendar.ValueToStringFormat(this.value, format, true);
			BX.fireEvent(this.params.field, 'change');
		}

		this.popup.close();

		if (!!this.params.callback_after)
		{
			this.params.callback_after.apply(this, [new Date(this.value.valueOf()+this.value.getTimezoneOffset()*60000), bTime]);
		}
	}

	return this;
};

BX.JCCalendar.prototype.Close = function()
{
	if (!!this.popup)
		this.popup.close();

	return this;
};

BX.JCSpinner = function(params)
{
	params = params || {};
	this.params = {
		input: params.input || null,

		delta: params.delta || 1,

		timeout_start: params.timeout_start || 1000,
		timeout_cont: params.timeout_cont || 150,

		callback_start: params.callback_start || null,
		callback_change: params.callback_change || null,
		callback_finish: params.callback_finish || null,

		bSaveValue: typeof params.bSaveValue == 'undefined' ? !!params.input : !!params.bSaveValue
	};

	this.mousedown = false;
	this.direction = 1;
};

BX.JCSpinner.prototype.Show = function()
{
	this.node = BX.create('span', {
		events: {
			mousedown: BX.delegateEvent(
				{attr: 'data-dir'},
				BX.delegate(this.Start, this)
			)
		},
		html: '<a href="javascript:void(0)" class="bx-calendar-form-arrow bx-calendar-form-arrow-top" data-dir="1"><i></i></a><a href="javascript:void(0)" class="bx-calendar-form-arrow bx-calendar-form-arrow-bottom" data-dir="-1"><i></i></a>'
	});
	return this.node;
};

BX.JCSpinner.prototype.Start = function()
{
	this.mousedown = true;
	this.direction = BX.proxy_context.getAttribute('data-dir') > 0 ? 1 : -1;
	BX.bind(document, "mouseup", BX.proxy(this.MouseUp, this));
	this.ChangeValue(true);
};

BX.JCSpinner.prototype.ChangeValue = function(bFirst)
{
	if(!this.mousedown)
		return;

	if (this.params.input)
	{
		var v = parseInt(this.params.input.value, 10) + this.params.delta * this.direction;

		if (this.params.bSaveValue)
			this.params.input.value = v;

		if (!!bFirst && this.params.callback_start)
			this.params.callback_start(this.params, v, this.direction);

		if (this.params.callback_change)
			this.params.callback_change(this.params, v, this.direction);

		setTimeout(
			BX.proxy(this.ChangeValue, this),
			!!bFirst ? this.params.timeout_start : this.params.timeout_cont
		);
	}
};

BX.JCSpinner.prototype.MouseUp = function()
{
	this.mousedown = false;
	BX.unbind(document, "mouseup", BX.proxy(this.MouseUp, this));

	if (this.params.callback_finish)
		this.params.callback_finish(this.params, this.params.input.value);
};

/**************** compatibility hacks ***************************/

window.jsCalendar = {
	Show: function(obj, field, fieldFrom, fieldTo, bTime, serverTime, form_name, bHideTimebar)
	{
		return BX.calendar({
			node: obj, field: field, form: form_name, bTime: !!bTime, currentTime: serverTime, bHideTimebar: !!bHideTimebar
		});
	},

	ValueToString: BX.calendar.ValueToString
};


/************ clock popup transferred from timeman **************/

BX.CClockSelector = function(params)
{
	this.params = params;

	this.params.popup_buttons = this.params.popup_buttons || [
		new BX.PopupWindowButton({
			text : BX.message('CAL_BUTTON'),
			className : "popup-window-button-create",
			events : {click : BX.proxy(this.setValue, this)}
		})
	];

	this.isReady = false;

	this.WND = new BX.PopupWindow(
		this.params.popup_id || 'clock_selector_popup',
		this.params.node,
		this.params.popup_config || {
			titleBar: BX.message('CAL_TIME'),
			offsetLeft: -45,
			offsetTop: -135,
			autoHide: true,
			closeIcon: true,
			closeByEsc: true,
			zIndex: this.params.zIndex
		}
	);

	this.SHOW = false;
	BX.addCustomEvent(this.WND, "onPopupClose", BX.delegate(this.onPopupClose, this));

	this.obClocks = {};
	this.CLOCK_ID = this.params.clock_id || 'clock_selector';
};

BX.CClockSelector.prototype.Show = function()
{
	if (!this.isReady)
	{
		//BX.timeman.showWait(this.parent.DIV);

		BX.addCustomEvent('onClockRegister', BX.proxy(this.onClockRegister, this));
		return BX.ajax.get('/bitrix/tools/clock_selector.php', {start_time: this.params.start_time, clock_id: this.CLOCK_ID, sessid: BX.bitrix_sessid()}, BX.delegate(this.Ready, this));
	}

	this.WND.setButtons(this.params.popup_buttons);
	this.WND.show();

	this.SHOW = true;

	if (window['bxClock_' + this.obClocks[this.CLOCK_ID]])
	{
		setTimeout("window['bxClock_" + this.obClocks[this.CLOCK_ID] + "'].CalculateCoordinates()", 40);
	}

	return true;
};

BX.CClockSelector.prototype.onClockRegister = function(obClocks)
{
	if (obClocks[this.CLOCK_ID])
	{
		this.obClocks[this.CLOCK_ID] = obClocks[this.CLOCK_ID];
		BX.removeCustomEvent('onClockRegister', BX.proxy(this.onClockRegister, this));
	}
};

BX.CClockSelector.prototype.Ready = function(data)
{
	this.content = this.CreateContent(data);
	this.WND.setContent(this.content);

	this.isReady = true;
	//BX.timeman.closeWait();

	setTimeout(BX.proxy(this.Show, this), 30);
};

BX.CClockSelector.prototype.CreateContent = function(data)
{
	return BX.create('DIV', {
		events: {click: BX.PreventDefault},
		html:
			'<div class="bx-tm-popup-clock">' + data + '</div>'
	});
};

BX.CClockSelector.prototype.setValue = function(e)
{
	if (this.params.callback)
	{
		var input = BX.findChild(this.content, {tagName: 'INPUT'}, true);
		this.params.callback.apply(this.params.node, [input.value]);
	}

	return BX.PreventDefault(e);
};

BX.CClockSelector.prototype.closeWnd = function(e)
{
	this.WND.close();
	return (e || window.event) ? BX.PreventDefault(e) : true;
};

BX.CClockSelector.prototype.setNode = function(node)
{
	this.WND.setBindElement(node);
};

BX.CClockSelector.prototype.setTime = function(timestamp)
{
	this.params.start_time = timestamp;
	if (window['bxClock_' + this.obClocks[this.CLOCK_ID]])
	{
		window['bxClock_' +  this.obClocks[this.CLOCK_ID]].SetTime(parseInt(timestamp/3600), parseInt((timestamp%3600)/60));
	}
};

BX.CClockSelector.prototype.setCallback = function(cb)
{
	this.params.callback = cb;
};

BX.CClockSelector.prototype.onPopupClose = function()
{
	this.SHOW = false;
};

})();

/* End */
;
; /* Start:"a:4:{s:4:"full";s:40:"/bitrix/js/main/utils.js?159569177730973";s:6:"source";s:24:"/bitrix/js/main/utils.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
var phpVars;
if(!phpVars)
{
	phpVars = {
		ADMIN_THEME_ID: '.default',
		LANGUAGE_ID: 'en',
		FORMAT_DATE: 'DD.MM.YYYY',
		FORMAT_DATETIME: 'DD.MM.YYYY HH:MI:SS',
		opt_context_ctrl: false,
		cookiePrefix: 'BITRIX_SM',
		titlePrefix: '',
		bitrix_sessid: '',
		messHideMenu: '',
		messShowMenu: '',
		messHideButtons: '',
		messShowButtons: '',
		messFilterInactive: '',
		messFilterActive: '',
		messFilterLess: '',
		messLoading: 'Loading...',
		messMenuLoading: '',
		messMenuLoadingTitle: '',
		messNoData: '',
		messExpandTabs: '',
		messCollapseTabs: '',
		messPanelFixOn: '',
		messPanelFixOff: '',
		messPanelCollapse: '',
		messPanelExpand: ''
	};
}

var jsUtils =
{
	arEvents: Array(),

	addEvent: function(el, evname, func, capture)
	{
		if(el.attachEvent) // IE
			el.attachEvent("on" + evname, func);
		else if(el.addEventListener) // Gecko / W3C
			el.addEventListener(evname, func, false);
		else
			el["on" + evname] = func;
		this.arEvents[this.arEvents.length] = {'element': el, 'event': evname, 'fn': func};
	},

	removeEvent: function(el, evname, func)
	{
		if(el.detachEvent) // IE
			el.detachEvent("on" + evname, func);
		else if(el.removeEventListener) // Gecko / W3C
			el.removeEventListener(evname, func, false);
		else
			el["on" + evname] = null;
	},

	removeAllEvents: function(el)
	{
		var i;
		for(i=0; i<this.arEvents.length; i++)
		{
			if(this.arEvents[i] && (el==false || el==this.arEvents[i].element))
			{
				jsUtils.removeEvent(this.arEvents[i].element, this.arEvents[i].event, this.arEvents[i].fn);
				this.arEvents[i] = null;
			}
		}
		if(el==false)
			this.arEvents.length = 0;
	},

	IsDoctype: function()
	{
		if (document.compatMode)
			return (document.compatMode == "CSS1Compat");

		if (document.documentElement && document.documentElement.clientHeight)
			return true;

		return false;
	},

	GetRealPos: function(el)
	{
		if(window.BX)
			return BX.pos(el);

		if(!el || !el.offsetParent)
			return false;

		var res = Array();
		res["left"] = el.offsetLeft;
		res["top"] = el.offsetTop;
		var objParent = el.offsetParent;

		while(objParent && objParent.tagName != "BODY")
		{
			res["left"] += objParent.offsetLeft;
			res["top"] += objParent.offsetTop;
			objParent = objParent.offsetParent;
		}
		res["right"] = res["left"] + el.offsetWidth;
		res["bottom"] = res["top"] + el.offsetHeight;

		return res;
	},

	FindChildObject: function(obj, tag_name, class_name, recursive)
	{
		if(!obj)
			return null;
		var tag = tag_name.toUpperCase();
		var cl = (class_name? class_name.toLowerCase() : null);
		var n = obj.childNodes.length;
		for(var j=0; j<n; j++)
		{
			var child = obj.childNodes[j];
			if(child.tagName && child.tagName.toUpperCase() == tag)
				if(!class_name || child.className.toLowerCase() == cl)
					return child;
			if(recursive == true)
			{
				var deepChild;
				if((deepChild = jsUtils.FindChildObject(child, tag_name, class_name, true)))
					return deepChild;
			}
		}
		return null;
	},

	FindParentObject: function(obj, tag_name, class_name)
	{
		if(!obj)
			return null;
		var o = obj;
		var tag = tag_name.toUpperCase();
		var cl = (class_name? class_name.toLowerCase() : null);
		while(o.parentNode)
		{
			var parent = o.parentNode;
			if(parent.tagName && parent.tagName.toUpperCase() == tag)
				if(!class_name || parent.className.toLowerCase() == cl)
					return parent;
			o = parent;
		}
		return null;
	},

	FindNextSibling: function(obj, tag_name)
	{
		if(!obj)
			return null;
		var o = obj;
		var tag = tag_name.toUpperCase();
		while(o.nextSibling)
		{
			var sibling = o.nextSibling;
			if(sibling.tagName && sibling.tagName.toUpperCase() == tag)
				return sibling;
			o = sibling;
		}
		return null;
	},

	FindPreviousSibling: function(obj, tag_name)
	{
		if(!obj)
			return null;
		var o = obj;
		var tag = tag_name.toUpperCase();
		while(o.previousSibling)
		{
			var sibling = o.previousSibling;
			if(sibling.tagName && sibling.tagName.toUpperCase() == tag)
				return sibling;
			o = sibling;
		}
		return null;
	},

	bOpera : navigator.userAgent.toLowerCase().indexOf('opera') != -1,
	bIsIE : document.attachEvent && navigator.userAgent.toLowerCase().indexOf('opera') == -1,

	IsIE: function()
	{
		return this.bIsIE;
	},

	IsOpera: function()
	{
		return this.bOpera;
	},

	IsSafari: function()
	{
		var userAgent = navigator.userAgent.toLowerCase();
		return (/webkit/.test(userAgent));
	},

	IsEditor: function()
	{
		var userAgent = navigator.userAgent.toLowerCase();
		var version = (userAgent.match( /.+(msie)[\/: ]([\d.]+)/ ) || [])[2];
		var safari = /webkit/.test(userAgent);

		if (this.IsOpera() || (document.all && !document.compatMode && version < 6) || safari)
			return false;

		return true;
	},

	ToggleDiv: function(div)
	{
		var style = document.getElementById(div).style;
		if(style.display!="none")
			style.display = "none";
		else
			style.display = "block";
		return (style.display != "none");
	},

	urlencode: function(s)
	{
		return escape(s).replace(new RegExp('\\+','g'), '%2B');
	},

	OpenWindow: function(url, width, height)
	{
		var w = screen.width, h = screen.height;
		if(this.IsOpera())
		{
			w = document.body.offsetWidth;
			h = document.body.offsetHeight;
		}
		window.open(url, '', 'status=no,scrollbars=yes,resizable=yes,width='+width+',height='+height+',top='+Math.floor((h - height)/2-14)+',left='+Math.floor((w - width)/2-5));
	},

	SetPageTitle: function(s)
	{
		document.title = phpVars.titlePrefix+s;
		var h1 = document.getElementsByTagName("H1");
		if(h1)
			h1[0].innerHTML = s;
	},

	LoadPageToDiv: function(url, div_id)
	{
		var div = document.getElementById(div_id);
		if(!div)
			return;
		CHttpRequest.Action = function(result)
		{
			CloseWaitWindow();
			document.getElementById(div_id).innerHTML = result;
		}
		ShowWaitWindow();
		CHttpRequest.Send(url);
	},

	trim: function(s)
	{
		if (typeof s == 'string' || typeof s == 'object' && s.constructor == String)
		{
			var r, re;

			re = /^[\s\r\n]+/g;
			r = s.replace(re, "");
			re = /[\s\r\n]+$/g;
			r = r.replace(re, "");
			return r;
		}
		else
			return s;
	},

	Redirect: function(args, url)
	{
		var e = null, bShift = false;
		if(args && args.length > 0)
			e = args[0];
		if(!e)
			e = window.event;
		if(e)
			bShift = e.shiftKey;

		if(bShift)
			window.open(url);
		else
		{
			window.location.href=url;
		}
	},

	False: function(){return false;},

	AlignToPos: function(pos, w, h)
	{
		var x = pos["left"], y = pos["bottom"];

		var scroll = jsUtils.GetWindowScrollPos();
		var size = jsUtils.GetWindowInnerSize();

		if((size.innerWidth + scroll.scrollLeft) - (pos["left"] + w) < 0)
		{
			if(pos["right"] - w >= 0 )
				x = pos["right"] - w;
			else
				x = scroll.scrollLeft;
		}

		if((size.innerHeight + scroll.scrollTop) - (pos["bottom"] + h) < 0)
		{
			if(pos["top"] - h >= 0)
				y = pos["top"] - h;
			else
				y = scroll.scrollTop;
		}

		return {'left':x, 'top':y};
	},

	// evaluate js string in window scope
	EvalGlobal: function(script)
	{
		try {
		if (window.execScript)
			window.execScript(script, 'javascript');
		else if (jsUtils.IsSafari())
			window.setTimeout(script, 0);
		else
			window.eval(script);
		} catch (e) {/*alert("Error! jsUtils.EvalGlobal");*/}
	},

	GetStyleValue: function(el, styleProp)
	{
		var res;
		if(el.currentStyle)
			res = el.currentStyle[styleProp];
		else if(window.getComputedStyle)
			res = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
		if(!res)
			res = '';
		return res;
	},

	GetWindowInnerSize: function(pDoc)
	{
		var width, height;
		if (!pDoc)
			pDoc = document;

		if (self.innerHeight) // all except Explorer
		{
			width = self.innerWidth;
			height = self.innerHeight;
		}
		else if (pDoc.documentElement && (pDoc.documentElement.clientHeight || pDoc.documentElement.clientWidth)) // Explorer 6 Strict Mode
		{
			width = pDoc.documentElement.clientWidth;
			height = pDoc.documentElement.clientHeight;
		}
		else if (pDoc.body) // other Explorers
		{
			width = pDoc.body.clientWidth;
			height = pDoc.body.clientHeight;
		}
		return {innerWidth : width, innerHeight : height};
	},

	GetWindowScrollPos: function(pDoc)
	{
		var left, top;
		if (!pDoc)
			pDoc = document;

		if (self.pageYOffset) // all except Explorer
		{
			left = self.pageXOffset;
			top = self.pageYOffset;
		}
		else if (pDoc.documentElement && (pDoc.documentElement.scrollTop || pDoc.documentElement.scrollLeft)) // Explorer 6 Strict
		{
			left = document.documentElement.scrollLeft;
			top = document.documentElement.scrollTop;
		}
		else if (pDoc.body) // all other Explorers
		{
			left = pDoc.body.scrollLeft;
			top = pDoc.body.scrollTop;
		}
		return {scrollLeft : left, scrollTop : top};
	},

	GetWindowScrollSize: function(pDoc)
	{
		var width, height;
		if (!pDoc)
			pDoc = document;

		if ( (pDoc.compatMode && pDoc.compatMode == "CSS1Compat"))
		{
			width = pDoc.documentElement.scrollWidth;
			height = pDoc.documentElement.scrollHeight;
		}
		else
		{
			if (pDoc.body.scrollHeight > pDoc.body.offsetHeight)
				height = pDoc.body.scrollHeight;
			else
				height = pDoc.body.offsetHeight;

			if (pDoc.body.scrollWidth > pDoc.body.offsetWidth ||
				(pDoc.compatMode && pDoc.compatMode == "BackCompat") ||
				(pDoc.documentElement && !pDoc.documentElement.clientWidth)
			)
				width = pDoc.body.scrollWidth;
			else
				width = pDoc.body.offsetWidth;
		}
		return {scrollWidth : width, scrollHeight : height};
	},

	GetWindowSize: function()
	{
		var innerSize = jsUtils.GetWindowInnerSize();
		var scrollPos = jsUtils.GetWindowScrollPos();
		var scrollSize = jsUtils.GetWindowScrollSize();

		return  {
			innerWidth : innerSize.innerWidth, innerHeight : innerSize.innerHeight,
			scrollLeft : scrollPos.scrollLeft, scrollTop : scrollPos.scrollTop,
			scrollWidth : scrollSize.scrollWidth, scrollHeight : scrollSize.scrollHeight
		};
	},


	arCustomEvents: {},

	addCustomEvent: function(eventName, eventHandler, arParams, handlerContextObject)
	{
		if (!this.arCustomEvents[eventName])
			this.arCustomEvents[eventName] = [];

		if (!arParams)
			arParams = [];
		if (!handlerContextObject)
			handlerContextObject = false;

		this.arCustomEvents[eventName].push(
			{
				handler: eventHandler,
				arParams: arParams,
				obj: handlerContextObject
			}
		);
	},

	removeCustomEvent: function(eventName, eventHandler)
	{
		if (!this.arCustomEvents[eventName])
			return;

		var l = this.arCustomEvents[eventName].length;
		if (l == 1)
		{
			delete this.arCustomEvents[eventName];
			return;
		}

		for (var i = 0; i < l; i++)
		{
			if (!this.arCustomEvents[eventName][i])
				continue;
			if (this.arCustomEvents[eventName][i].handler == eventHandler)
			{
				delete this.arCustomEvents[eventName][i];
				return;
			}
		}
	},

	onCustomEvent: function(eventName, arEventParams)
	{
		if (!this.arCustomEvents[eventName])
			return;

		if (!arEventParams)
			arEventParams = [];

		var h;
		for (var i = 0, l = this.arCustomEvents[eventName].length; i < l; i++)
		{
			h = this.arCustomEvents[eventName][i];
			if (!h || !h.handler)
				continue;

			if (h.obj)
				h.handler.call(h.obj, h.arParams, arEventParams);
			else
				h.handler(h.arParams, arEventParams);
		}
	},

	loadJSFile: function(arJs, oCallBack, pDoc)
	{
		if (!pDoc)
			pDoc = document;
		if (typeof arJs == 'string')
			arJs = [arJs];
		var callback = function()
		{
			if (!oCallBack)
				return;
			if (typeof oCallBack == 'function')
				return oCallBack();
			if (typeof oCallBack != 'object' || !oCallBack.func)
				return;
			var p = oCallBack.params || {};
			if (oCallBack.obj)
				oCallBack.func.apply(oCallBack.obj, p);
			else
				oCallBack.func(p);
		};
		var load_js = function(ind)
		{
			if (ind >= arJs.length)
				return callback();
			var oSript = pDoc.body.appendChild(pDoc.createElement('script'));
			oSript.src = arJs[ind];
			var bLoaded = false;
			oSript.onload = oSript.onreadystatechange = function()
			{
				if (!bLoaded && (!oSript.readyState || oSript.readyState == "loaded" || oSript.readyState == "complete"))
				{
					bLoaded = true;
					setTimeout(function (){load_js(++ind);}, 50);
				}
			};
		};
		load_js(0);
	},

	loadCSSFile: function(arCSS, pDoc, pWin)
	{
		if (typeof arCSS == 'string')
		{
			var bSingle = true;
			arCSS = [arCSS];
		}
		var i, l = arCSS.length, pLnk = [];
		if (l == 0)
			return;
		if (!pDoc)
			pDoc = document;
		if (!pWin)
			pWin = window;
		if (!pWin.bxhead)
		{
			var heads = pDoc.getElementsByTagName('HEAD');
			pWin.bxhead = heads[0];
		}
		if (!pWin.bxhead)
			return;
		for (i = 0; i < l; i++)
		{
			var lnk = document.createElement('LINK');
			lnk.href = arCSS[i];
			lnk.rel = 'stylesheet';
			lnk.type = 'text/css';
			pWin.bxhead.appendChild(lnk);
			pLnk.push(lnk);
		}
		if (bSingle)
			return lnk;
		return pLnk;
	},

	appendBXHint : function(node, html)
	{
		if (!node || !node.parentNode || !html)
			return;
		var oBXHint = new BXHint(html);
		node.parentNode.insertBefore(oBXHint.oIcon, node);
		node.parentNode.removeChild(node);
		oBXHint.oIcon.style.marginLeft = "5px";
	},

	PreventDefault : function(e)
	{
		if(!e) e = window.event;
		if(e.stopPropagation)
		{
			e.preventDefault();
			e.stopPropagation();
		}
		else
		{
			e.cancelBubble = true;
			e.returnValue = false;
		}
		return false;
	},

	CreateElement: function(tag, arAttr, arStyles, pDoc)
	{
		if (!pDoc)
			pDoc = document;
		var pEl = pDoc.createElement(tag), p;
		if(arAttr)
		{
			for(p in arAttr)
			{
				if(p == 'className' || p == 'class')
				{
					pEl.setAttribute('class', arAttr[p]);
					if (jsUtils.IsIE())
						pEl.setAttribute('className', arAttr[p]);
					continue;
				}

				if (arAttr[p] != undefined && arAttr[p] != null)
					pEl.setAttribute(p, arAttr[p]);
			}
		}
		if(arStyles)
		{
			for(p in arStyles)
				pEl.style[p] = arStyles[p];
		}
		return pEl;
	},

	in_array: function(needle, haystack)
	{
		for(var i=0; i<haystack.length; i++)
		{
			if(haystack[i] == needle)
				return true;
		}
		return false;
	},

	htmlspecialchars: function(str)
	{
		if(!str.replace)
			return str;

		return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
}

/************************************************/

function JCFloatDiv()
{
	var _this = this;
	this.floatDiv = null;
	this.x = this.y = 0;

	this.Create = function(arParams)
	{
		var div = document.body.appendChild(document.createElement("DIV"));
		div.id = arParams.id;
		div.style.position = 'absolute';
		div.style.left = '-10000px';
		div.style.top = '-10000px';
		if(arParams.className)
			div.className = arParams.className;
		if(arParams.zIndex)
			div.style.zIndex = arParams.zIndex;
		if(arParams.width)
			div.style.width = arParams.width+'px';
		if(arParams.height)
			div.style.height = arParams.height+'px';
		return div;
	}

	this.Show = function(div, left, top, dxShadow, restrictDrag, showSubFrame)
	{
		if (showSubFrame !== false)
			showSubFrame = true;
		var zIndex = parseInt(div.style.zIndex);
		if(zIndex <= 0 || isNaN(zIndex))
			zIndex = 100;

		//document.title = 'zIndex = ' + zIndex;
		div.style.zIndex = zIndex;

		if (left < 0)
			left = 0;

		if (top < 0)
			top = 0;

		div.style.left = parseInt(left) + "px";
		div.style.top = parseInt(top) + "px";

		if(jsUtils.IsIE() && showSubFrame === true)
		{
			var frame = document.getElementById(div.id+"_frame");
			if(!frame)
			{
				frame = document.createElement("IFRAME");
				frame.src = "javascript:''";
				frame.id = div.id+"_frame";
				frame.style.position = 'absolute';
				frame.style.borderWidth = '0px';
				frame.style.zIndex = zIndex-1;
				document.body.appendChild(frame);
			}
			frame.style.width = div.offsetWidth + "px";
			frame.style.height = div.offsetHeight + "px";
			frame.style.left = div.style.left;
			frame.style.top = div.style.top;
			frame.style.visibility = 'visible';
		}

		/*Restrict drag*/
		div.restrictDrag = restrictDrag || false;

		/*shadow*/
		if(isNaN(dxShadow))
			dxShadow = 5;

		if(dxShadow > 0)
		{
			var img = document.getElementById(div.id+'_shadow');
			if(!img)
			{
				if(jsUtils.IsIE())
				{
		 			img = document.createElement("DIV");
		 			img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/bitrix/themes/"+phpVars.ADMIN_THEME_ID+"/images/shadow.png',sizingMethod='scale')";
				}
				else
				{
		 			img = document.createElement("IMG");
					img.src = '/bitrix/themes/' + phpVars.ADMIN_THEME_ID+'/images/shadow.png';
				}
				img.id = div.id+'_shadow';
				img.style.position = 'absolute';
				img.style.zIndex = zIndex-2;
				img.style.left = '-1000px';
				img.style.top = '-1000px';
				img.style.lineHeight = 'normal';
				img.className = "bx-js-float-shadow";
				document.body.appendChild(img);
			}
			img.style.width = div.offsetWidth+'px';
			img.style.height = div.offsetHeight+'px';
			img.style.left = parseInt(div.style.left)+dxShadow+'px';
			img.style.top = parseInt(div.style.top)+dxShadow+'px';
			img.style.visibility = 'visible';
		}
		div.dxShadow = dxShadow;
	}

	this.Close = function(div)
	{
		if(!div)
			return;
		var sh = document.getElementById(div.id+"_shadow");
		if(sh)
			sh.style.visibility = 'hidden';

		var frame = document.getElementById(div.id+"_frame");
		if(frame)
			frame.style.visibility = 'hidden';
	}

	this.Move = function(div, x, y)
	{
		if(!div)
			return;

		var dxShadow = div.dxShadow;
		var left = parseInt(div.style.left)+x;
		var top = parseInt(div.style.top)+y;

		if (div.restrictDrag)
		{
			//Left side
			if (left < 0)
				left = 0;

			//Right side
			if ( (document.compatMode && document.compatMode == "CSS1Compat"))
				windowWidth = document.documentElement.scrollWidth;
			else
			{
				if (document.body.scrollWidth > document.body.offsetWidth ||
					(document.compatMode && document.compatMode == "BackCompat") ||
					(document.documentElement && !document.documentElement.clientWidth)
				)
					windowWidth = document.body.scrollWidth;
				else
					windowWidth = document.body.offsetWidth;
			}

			var floatWidth = div.offsetWidth;
			if (left > (windowWidth - floatWidth - dxShadow))
				left = windowWidth - floatWidth - dxShadow;

			//Top side
			if (top < 0)
				top = 0;
		}

		div.style.left = left+'px';
		div.style.top = top+'px';

		this.AdjustShadow(div);
	}

	this.HideShadow = function(div)
	{
		var sh = document.getElementById(div.id + "_shadow");
		sh.style.visibility = 'hidden';
	}

	this.UnhideShadow = function(div)
	{
		var sh = document.getElementById(div.id + "_shadow");
		sh.style.visibility = 'visible';
	}

	this.AdjustShadow = function(div)
	{
		var sh = document.getElementById(div.id + "_shadow");
		if(sh && sh.style.visibility != 'hidden')
		{
			var dxShadow = div.dxShadow;

			sh.style.width = div.offsetWidth+'px';
			sh.style.height = div.offsetHeight+'px';
			sh.style.left = parseInt(div.style.left)+dxShadow+'px';
			sh.style.top = parseInt(div.style.top)+dxShadow+'px';
		}

		var frame = document.getElementById(div.id+"_frame");
		if(frame)
		{
			frame.style.width = div.offsetWidth + "px";
			frame.style.height = div.offsetHeight + "px";
			frame.style.left = div.style.left;
			frame.style.top = div.style.top;
		}
	}

	this.StartDrag = function(e, div)
	{
		if(!e)
			e = window.event;
		this.x = e.clientX + document.body.scrollLeft;
		this.y = e.clientY + document.body.scrollTop;
		this.floatDiv = div;

		jsUtils.addEvent(document, "mousemove", this.MoveDrag);
		document.onmouseup = this.StopDrag;
		if(document.body.setCapture)
			document.body.setCapture();

		document.onmousedown = jsUtils.False;
		var b = document.body;
		b.ondrag = jsUtils.False;
		b.onselectstart = jsUtils.False;
		b.style.MozUserSelect = _this.floatDiv.style.MozUserSelect = 'none';
		b.style.cursor = 'move';
	}

	this.StopDrag = function(e)
	{
		if(document.body.releaseCapture)
			document.body.releaseCapture();

		jsUtils.removeEvent(document, "mousemove", _this.MoveDrag);
		document.onmouseup = null;

		this.floatDiv = null;

		document.onmousedown = null;
		var b = document.body;
		b.ondrag = null;
		b.onselectstart = null;
		b.style.MozUserSelect = _this.floatDiv.style.MozUserSelect = '';
		b.style.cursor = '';
	}

	this.MoveDrag = function(e)
	{
		var x = e.clientX + document.body.scrollLeft;
		var y = e.clientY + document.body.scrollTop;

		if(_this.x == x && _this.y == y)
			return;

		_this.Move(_this.floatDiv, (x - _this.x), (y - _this.y));
		_this.x = x;
		_this.y = y;
	}
}
var jsFloatDiv = new JCFloatDiv();

/************************************************/

var BXHint = function(innerHTML, element, addParams)
{
	this.oDivOver = false;
	this.timeOutID = null;
	this.oIcon = null;
	this.freeze = false;
	this.x = 0;
	this.y = 0;
	this.time = 700;

	if (!innerHTML)
		innerHTML = "";
	this.Create(innerHTML, element, addParams);
}

BXHint.prototype.Create = function(innerHTML, element, addParams)
{
	var
		_this = this,
		width = 0,
		height = 0,
		className = null,
		type = "icon";
	this.bWidth = true;

	if (addParams)
	{
		if (addParams.width === false)
			this.bWidth = false;
		else if (addParams.width)
			width = addParams.width;

		if (addParams.height)
			height = addParams.height;

		if (addParams.className)
			className = addParams.className;

		if (addParams.type && (addParams.type == "link" || addParams.type == "icon"))
			type = addParams.type;
		if (addParams.time > 0)
			this.time = addParams.time;
	}

	if (element)
		type = "element";

	if (type == "icon")
	{
		var element = document.createElement("IMG");
		element.src = (addParams && addParams.iconSrc) ? addParams.iconSrc : "/bitrix/themes/"+phpVars.ADMIN_THEME_ID+"/public/popup/hint.gif";
		element.ondrag = jsUtils.False;
	}
	else if (type == "link")
	{
		var element = document.createElement("A");
		element.href = "";
		element.onclick = function(e){return false;}
		element.innerHTML = "[?]";
	}

	this.element = element;
	if (type == "element")
	{
		if(addParams && addParams.show_on_click)
		{
			jsUtils.addEvent(
				element,
				"click",
				function (event)
				{
					if (!event)
						event = window.event;
					_this.GetMouseXY(event);
					_this.timeOutID = setTimeout(function () {_this.Show(innerHTML,width,height,className) }, 10);
				}
			);
		}
		else
		{
			jsUtils.addEvent(
				element,
				"mouseover",
				function (event)
				{
					if (!event)
						event = window.event;
					_this.GetMouseXY(event);
					_this.timeOutID = setTimeout(function () {_this.Show(innerHTML,width,height,className) }, 750);
				}
			);
		}

		jsUtils.addEvent(
			element,
			"mouseout",
			function(event)
			{
				if (_this.timeOutID)
					clearTimeout(_this.timeOutID);
				_this.SmartHide(_this);
			}
		);
	}
	else
	{
		this.oIcon = element;
		element.onmouseover = function(event) {if (!event) event = window.event; _this.GetMouseXY(event); _this.Show(innerHTML,width,height,className)};
		element.onmouseout = function() {_this.SmartHide(_this);};
	}
}

BXHint.prototype.IsFrozen = function()
{
	return this.freeze;
}

BXHint.prototype.Freeze = function()
{
	this.freeze = true;
	this.Hide();
}

BXHint.prototype.UnFreeze = function()
{
	this.freeze = false;
}

BXHint.prototype.GetMouseXY = function(event)
{
	if (event.pageX || event.pageY)
	{
		this.x = event.pageX;
		this.y = event.pageY;
	}
	else if (event.clientX || event.clientY)
	{
		this.x = event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
		this.y = event.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	}
}

BXHint.prototype.Show = function(innerHTML, width, height, className)
{
	//Delete previous hint
	var old = document.getElementById("__BXHint_div");
	if (old)
		this.Hide();

	if (this.freeze)
		return;

	var _this = this;
	var oDiv = document.body.appendChild(document.createElement("DIV"));
	oDiv.onmouseover = function(){_this.oDivOver = true};
	oDiv.onmouseout = function(){_this.oDivOver = false; _this.SmartHide(_this);}
	oDiv.id = "__BXHint_div";
	oDiv.className = (className) ? className : "bxhint";
	oDiv.style.position = 'absolute';
	if (width && this.bWidth)
		oDiv.style.width = width + "px";

	if (height)
		oDiv.style.height = height + "px";
	oDiv.innerHTML = innerHTML;

	var w = oDiv.offsetWidth;
	var h = oDiv.offsetHeight;
	if (this.bWidth)
	{
		if (!width && w>200)
			w = Math.round(Math.sqrt(1.618*w*h));
		oDiv.style.width = w + "px";
		h = oDiv.offsetHeight;
	}

	var pos = {left : this.x + 10, right : this.x + w, top : this.y, bottom : this.y + h};

	pos = this.AlignToPos(pos, w, h);

	oDiv.style.zIndex = 2100;

	jsFloatDiv.Show(oDiv, pos.left, pos.top,3);

//	oDiv.ondrag = jsUtils.False;
//	oDiv.onselectstart = jsUtils.False;
//	oDiv.style.MozUserSelect = 'none';
	oDiv = null;
}

BXHint.prototype.AlignToPos = function(pos, w, h)
{
	var body = document.body;
	if((body.clientWidth + body.scrollLeft) < (pos.left + w))
		pos.left = (pos.left - w >= 0) ? (pos.left - w) : body.scrollLeft;

	if((body.clientHeight + body.scrollTop) - (pos["bottom"]) < 0)
		pos.top = (pos.top - h >= 0) ? (pos.top - h) : body.scrollTop;

	return pos;
}

BXHint.prototype.Hide = function()
{
	var oDiv = document.getElementById("__BXHint_div");

	if (!oDiv)
		return;

	jsFloatDiv.Close(oDiv);
	oDiv.parentNode.removeChild(oDiv);
	oDiv = null;
}

BXHint.prototype.SmartHide = function(_this)
{
	setTimeout(function ()
		{
			if (!_this.oDivOver)
				_this.Hide();
		}, 100
	);
}

/************************************************/

function WaitOnKeyPress(e)
{
	if(!e) e = window.event
	if(!e) return;
	if(e.keyCode == 27)
		CloseWaitWindow();
}

function ShowWaitWindow()
{
	CloseWaitWindow();

	var obWndSize = jsUtils.GetWindowSize();

	var div = document.body.appendChild(document.createElement("DIV"));
	div.id = "wait_window_div";
	div.innerHTML = phpVars.messLoading;
	div.className = "waitwindow";
	//div.style.left = obWndSize.scrollLeft + (obWndSize.innerWidth - div.offsetWidth) - (jsUtils.IsIE() ? 5 : 20) + "px";
	div.style.right = (5 - obWndSize.scrollLeft) + 'px';
	div.style.top = obWndSize.scrollTop + 5 + "px";

	if(jsUtils.IsIE())
	{
		var frame = document.createElement("IFRAME");
		frame.src = "javascript:''";
		frame.id = "wait_window_frame";
		frame.className = "waitwindow";
		frame.style.width = div.offsetWidth + "px";
		frame.style.height = div.offsetHeight + "px";
		frame.style.right = div.style.right;
		frame.style.top = div.style.top;
		document.body.appendChild(frame);
	}
	jsUtils.addEvent(document, "keypress", WaitOnKeyPress);
}

function CloseWaitWindow()
{
	jsUtils.removeEvent(document, "keypress", WaitOnKeyPress);

	var frame = document.getElementById("wait_window_frame");
	if(frame)
		frame.parentNode.removeChild(frame);

	var div = document.getElementById("wait_window_div");
	if(div)
		div.parentNode.removeChild(div);
}

/************************************************/

var jsSelectUtils =
{
	addNewOption: function(select_id, opt_value, opt_name, do_sort, check_unique)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var n = oSelect.length;
			if(check_unique !== false)
			{
				for(var i=0;i<n;i++)
					if(oSelect[i].value==opt_value)
						return;
			}
			var newoption = new Option(opt_name, opt_value, false, false);
			oSelect.options[n]=newoption;
		}
		if(do_sort === true)
			this.sortSelect(select_id);
	},

	deleteOption: function(select_id, opt_value)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			for(var i=0;i<oSelect.length;i++)
				if(oSelect[i].value==opt_value)
				{
					oSelect.remove(i);
					break;
				}
		}
	},

	deleteSelectedOptions: function(select_id)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var i=0;
			while(i<oSelect.length)
				if(oSelect[i].selected)
				{
					oSelect[i].selected=false;
					oSelect.remove(i);
				}
				else
					i++;
		}
	},

	deleteAllOptions: function(oSelect)
	{
		if(oSelect)
		{
			for(var i=oSelect.length-1; i>=0; i--)
				oSelect.remove(i);
		}
	},

	optionCompare: function(record1, record2)
	{
		var value1 = record1.optText.toLowerCase();
		var value2 = record2.optText.toLowerCase();
		if (value1 > value2) return(1);
		if (value1 < value2) return(-1);
		return(0);
	},

	sortSelect: function(select_id)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var myOptions = [];
			var n = oSelect.options.length;
			for (var i=0;i<n;i++)
			{
				myOptions[i] = {
					optText:oSelect[i].text,
					optValue:oSelect[i].value
				};
			}
			myOptions.sort(this.optionCompare);
			oSelect.length=0;
			n = myOptions.length;
			for(var i=0;i<n;i++)
			{
				var newoption = new Option(myOptions[i].optText, myOptions[i].optValue, false, false);
				oSelect[i]=newoption;
			}
		}
	},

	selectAllOptions: function(select_id)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var n = oSelect.length;
			for(var i=0;i<n;i++)
				oSelect[i].selected=true;
		}
	},

	selectOption: function(select_id, opt_value)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var n = oSelect.length;
			for(var i=0;i<n;i++)
				oSelect[i].selected = (oSelect[i].value == opt_value);
		}
	},

	addSelectedOptions: function(oSelect, to_select_id, check_unique, do_sort)
	{
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=0; i<n; i++)
			if(oSelect[i].selected)
				this.addNewOption(to_select_id, oSelect[i].value, oSelect[i].text, do_sort, check_unique);
	},

	moveOptionsUp: function(oSelect)
	{
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=0; i<n; i++)
		{
			if(oSelect[i].selected && i>0 && oSelect[i-1].selected == false)
			{
				var option1 = new Option(oSelect[i].text, oSelect[i].value);
				var option2 = new Option(oSelect[i-1].text, oSelect[i-1].value);
				oSelect[i] = option2;
				oSelect[i].selected = false;
				oSelect[i-1] = option1;
				oSelect[i-1].selected = true;
			}
		}
	},

	moveOptionsDown: function(oSelect)
	{
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=n-1; i>=0; i--)
		{
			if(oSelect[i].selected && i<n-1 && oSelect[i+1].selected == false)
			{
				var option1 = new Option(oSelect[i].text, oSelect[i].value);
				var option2 = new Option(oSelect[i+1].text, oSelect[i+1].value);
				oSelect[i] = option2;
				oSelect[i].selected = false;
				oSelect[i+1] = option1;
				oSelect[i+1].selected = true;
			}
		}
	}

}

/************************************************/

/* End */
;
; /* Start:"a:4:{s:4:"full";s:50:"/bitrix/js/main/core/core_fx.min.js?15956917729768";s:6:"source";s:31:"/bitrix/js/main/core/core_fx.js";s:3:"min";s:35:"/bitrix/js/main/core/core_fx.min.js";s:3:"map";s:35:"/bitrix/js/main/core/core_fx.map.js";}"*/
(function(t){var i={time:1,step:.05,type:"linear",allowFloat:false};BX.fx=function(t){this.options=t;if(null!=this.options.time)this.options.originalTime=this.options.time;if(null!=this.options.step)this.options.originalStep=this.options.step;if(!this.__checkOptions())return false;this.__go=BX.delegate(this.go,this);this.PARAMS={}};BX.fx.prototype.__checkOptions=function(){if(typeof this.options.start!=typeof this.options.finish)return false;if(null==this.options.time)this.options.time=i.time;if(null==this.options.step)this.options.step=i.step;if(null==this.options.type)this.options.type=i.type;if(null==this.options.allowFloat)this.options.allowFloat=i.allowFloat;this.options.time*=1e3;this.options.step*=1e3;if(typeof this.options.start!="object"){this.options.start={_param:this.options.start};this.options.finish={_param:this.options.finish}}var e;for(e in this.options.start){if(null==this.options.finish[e]){this.options.start[e]=null;delete this.options.start[e]}}if(!BX.type.isFunction(this.options.type)){if(BX.type.isFunction(t[this.options.type]))this.options.type=t[this.options.type];else if(BX.type.isFunction(BX.fx.RULES[this.options.type]))this.options.type=BX.fx.RULES[this.options.type];else this.options.type=BX.fx.RULES[i.type]}return true};BX.fx.prototype.go=function(){var t=(new Date).valueOf();if(t<this.PARAMS.timeFinish){for(var i in this.PARAMS.current){this.PARAMS.current[i][0]=this.options.type.apply(this,[{start_value:this.PARAMS.start[i][0],finish_value:this.PARAMS.finish[i][0],current_value:this.PARAMS.current[i][0],current_time:t-this.PARAMS.timeStart,total_time:this.options.time}])}this._callback(this.options.callback);if(!this.paused)this.PARAMS.timer=setTimeout(this.__go,this.options.step)}else{this.stop()}};BX.fx.prototype._callback=function(t){var i={};t=t||this.options.callback;for(var e in this.PARAMS.current){i[e]=(this.options.allowFloat?this.PARAMS.current[e][0]:Math.round(this.PARAMS.current[e][0]))+this.PARAMS.current[e][1]}return t.apply(this,[null!=i["_param"]?i._param:i])};BX.fx.prototype.start=function(){var t,i,e;this.PARAMS.start={};this.PARAMS.current={};this.PARAMS.finish={};for(t in this.options.start){i=+this.options.start[t];e=(this.options.start[t]+"").substring((i+"").length);this.PARAMS.start[t]=[i,e];this.PARAMS.current[t]=[i,e];this.PARAMS.finish[t]=[+this.options.finish[t],e]}this._callback(this.options.callback_start);this._callback(this.options.callback);this.PARAMS.timeStart=(new Date).valueOf();this.PARAMS.timeFinish=this.PARAMS.timeStart+this.options.time;this.PARAMS.timer=setTimeout(BX.delegate(this.go,this),this.options.step);return this};BX.fx.prototype.pause=function(){if(this.paused){this.PARAMS.timer=setTimeout(this.__go,this.options.step);this.paused=false}else{clearTimeout(this.PARAMS.timer);this.paused=true}};BX.fx.prototype.stop=function(t){t=!!t;if(this.PARAMS.timer)clearTimeout(this.PARAMS.timer);if(null!=this.options.originalTime)this.options.time=this.options.originalTime;if(null!=this.options.originalStep)this.options.step=this.options.originalStep;this.PARAMS.current=this.PARAMS.finish;if(!t){this._callback(this.options.callback);this._callback(this.options.callback_complete)}};BX.fx.RULES={linear:function(t){return t.start_value+t.current_time/t.total_time*(t.finish_value-t.start_value)},decelerated:function(t){return t.start_value+Math.sqrt(t.current_time/t.total_time)*(t.finish_value-t.start_value)},accelerated:function(t){var i=t.current_time/t.total_time;return t.start_value+i*i*(t.finish_value-t.start_value)}};BX.fx.hide=function(t,i,e){t=BX(t);if(typeof i=="object"&&null==e){e=i;i=e.type}if(!e)e={};if(!BX.type.isNotEmptyString(i)){t.style.display="none";return}var s=BX.fx.EFFECTS[i](t,e,0);s.callback_complete=function(){if(e.hide!==false)t.style.display="none";if(e.callback_complete)e.callback_complete.apply(this,arguments)};return new BX.fx(s).start()};BX.fx.show=function(t,i,e){t=BX(t);if(typeof i=="object"&&null==e){e=i;i=e.type}if(!e)e={};if(!BX.type.isNotEmptyString(i)){t.style.display="block";return}var s=BX.fx.EFFECTS[i](t,e,1);s.callback_complete=function(){if(e.show!==false)t.style.display="block";if(e.callback_complete)e.callback_complete.apply(this,arguments)};return new BX.fx(s).start()};BX.fx.EFFECTS={scroll:function(t,e,s){if(!e.direction)e.direction="vertical";var n=e.direction=="horizontal"?"width":"height";var o=parseInt(BX.style(t,n));if(isNaN(o)){o=BX.pos(t)[n]}if(s==0)var a=o,r=e.min_height?parseInt(e.min_height):0;else var r=o,a=e.min_height?parseInt(e.min_height):0;return{start:a,finish:r,time:e.time||i.time,type:"linear",callback_start:function(){if(BX.style(t,"position")=="static")t.style.position="relative";t.style.overflow="hidden";t.style[n]=a+"px";t.style.display="block"},callback:function(i){t.style[n]=i+"px"}}},fade:function(t,e,s){var n={time:e.time||i.time,type:s==0?"decelerated":"linear",start:s==0?1:0,finish:s==0?0:1,allowFloat:true};if(BX.browser.IsIE()&&!BX.browser.IsIE9()){n.start*=100;n.finish*=100;n.allowFloat=false;n.callback_start=function(){t.style.display="block";t.style.filter+="progid:DXImageTransform.Microsoft.Alpha(opacity="+n.start+")"};n.callback=function(i){(t.filters["DXImageTransform.Microsoft.alpha"]||t.filters.alpha).opacity=i}}else{n.callback_start=function(){t.style.display="block"};n.callback=function(i){t.style.opacity=t.style.KhtmlOpacity=t.style.MozOpacity=i}}return n},fold:function(t,e,s){if(s!=0)return;var n=BX.pos(t);var o=n.height/(n.width+n.height);var a={time:e.time||i.time,callback_complete:e.callback_complete,hide:e.hide};e.type="scroll";e.direction="vertical";e.min_height=e.min_height||10;e.hide=false;e.time=o*a.time;e.callback_complete=function(){t.style.whiteSpace="nowrap";e.direction="horizontal";e.min_height=null;e.time=a.time-e.time;e.hide=a.hide;e.callback_complete=a.callback_complete;BX.fx.hide(t,e)};return BX.fx.EFFECTS.scroll(t,e,s)},scale:function(t,e,s){var n={width:parseInt(BX.style(t,"width")),height:parseInt(BX.style(t,"height"))};if(isNaN(n.width)||isNaN(n.height)){var o=BX.pos(t);n={width:o.width,height:o.height}}if(s==0)var a=n,r={width:0,height:0};else var r=n,a={width:0,height:0};return{start:a,finish:r,time:e.time||i.time,type:"linear",callback_start:function(){t.style.position="relative";t.style.overflow="hidden";t.style.display="block";t.style.height=a.height+"px";t.style.width=a.width+"px"},callback:function(i){t.style.height=i.height+"px";t.style.width=i.width+"px"}}}};var e={arStack:{},arRules:{},globalAnimationId:0};BX.fx.colorAnimate=function(t,i,s){if(t==null)return;animationId=t.getAttribute("data-animation-id");if(animationId==null){animationId=e.globalAnimationId;t.setAttribute("data-animation-id",e.globalAnimationId++)}var n=i.split(/\s*,\s*/);for(var o=0;o<n.length;o++){i=n[o];if(!e.arRules[i])continue;var a=0;if(!e.arStack[animationId]){e.arStack[animationId]={}}else if(e.arStack[animationId][i]){a=e.arStack[animationId][i].i;clearInterval(e.arStack[animationId][i].tId)}if(a==0&&s||a==e.arRules[i][3]&&!s)continue;e.arStack[animationId][i]={i:a,element:t,tId:setInterval('BX.fx.colorAnimate.run("'+animationId+'","'+i+'")',e.arRules[i][4]),back:Boolean(s)}}};BX.fx.colorAnimate.addRule=function(t,i,s,n,o,a,r){e.arRules[t]=[BX.util.hex2rgb(i),BX.util.hex2rgb(s),n.replace(/\-(.)/g,function(){return arguments[1].toUpperCase()}),o,a||1,r||false]};BX.fx.colorAnimate.run=function(t,i){element=e.arStack[t][i].element;e.arStack[t][i].i+=e.arStack[t][i].back?-1:1;var s=e.arStack[t][i].i/e.arRules[i][3];var n=1-s;var o=e.arRules[i][0];var a=e.arRules[i][1];element.style[e.arRules[i][2]]="rgb("+Math.floor(o["r"]*n+a["r"]*s)+","+Math.floor(o["g"]*n+a["g"]*s)+","+Math.floor(o["b"]*n+a["b"]*s)+")";if(e.arStack[t][i].i==e.arRules[i][3]||e.arStack[t][i].i==0){clearInterval(e.arStack[t][i].tId);if(e.arRules[i][5])BX.fx.colorAnimate(e.arStack[t][i].element,i,true)}};BX.easing=function(t){this.options=t;this.timer=null};BX.easing.prototype.animate=function(){if(!this.options||!this.options.start||!this.options.finish||typeof this.options.start!="object"||typeof this.options.finish!="object")return null;for(var t in this.options.start){if(typeof this.options.finish[t]=="undefined"){delete this.options.start[t]}}this.options.progress=function(t){var i={};for(var e in this.start)i[e]=Math.round(this.start[e]+(this.finish[e]-this.start[e])*t);if(this.step){this.step(i)}};this.animateProgress()};BX.easing.prototype.stop=function(t){if(this.timer){cancelAnimationFrame(this.timer);this.timer=null;if(t){this.options.complete&&this.options.complete()}}};BX.easing.prototype.animateProgress=function(){if(!t.requestAnimationFrame){this.options.progress(1);this.options.complete&&this.options.complete();return}var i=null;var e=this.options.transition||BX.easing.transitions.linear;var s=this.options.duration||1e3;var n=BX.proxy(function(t){if(i===null){i=t}var o=(t-i)/s;if(o>1){o=1}this.options.progress(e(o));if(o==1){this.stop(true)}else{this.timer=requestAnimationFrame(n)}},this);this.timer=requestAnimationFrame(n)};BX.easing.makeEaseInOut=function(t){return function(i){if(i<.5)return t(2*i)/2;else return(2-t(2*(1-i)))/2}};BX.easing.makeEaseOut=function(t){return function(i){return 1-t(1-i)}};BX.easing.transitions={linear:function(t){return t},quad:function(t){return Math.pow(t,2)},cubic:function(t){return Math.pow(t,3)},quart:function(t){return Math.pow(t,4)},quint:function(t){return Math.pow(t,5)},circ:function(t){return 1-Math.sin(Math.acos(t))},back:function(t){return Math.pow(t,2)*((1.5+1)*t-1.5)},elastic:function(t){return Math.pow(2,10*(t-1))*Math.cos(20*Math.PI*1.5/3*t)},bounce:function(t){for(var i=0,e=1;1;i+=e,e/=2){if(t>=(7-4*i)/11){return-Math.pow((11-6*i-11*t)/4,2)+Math.pow(e,2)}}}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:50:"/bitrix/js/main/rating_like.min.js?159569177221082";s:6:"source";s:30:"/bitrix/js/main/rating_like.js";s:3:"min";s:34:"/bitrix/js/main/rating_like.min.js";s:3:"map";s:34:"/bitrix/js/main/rating_like.map.js";}"*/
if(!BXRL){var BXRL={};var BXRLW=null;var lastVoteRepo={};var lastReactionRepo={};var BXRLParams={pathToUserProfile:null}}RatingLike=function(e,t,i,n,o,a,s,r,l){var p=t+"_"+i;this.enabled=true;this.likeId=e;this.entityTypeId=t;this.entityId=i;this.available=n=="Y";this.userId=o;this.localize=a;this.template=s;this.pathToUserProfile=r;this.pathToAjax=BX.type.isNotEmptyString(l)?l:"/bitrix/components/bitrix/rating.vote/vote.ajax.php";this.box=BX("bx-ilike-button-"+e);if(this.box===null){this.enabled=false;return false}this.button=BX.findChild(this.box,{className:"bx-ilike-left-wrap"},true,false);this.buttonText=BX.findChild(this.button,{className:"bx-ilike-text"},true,false);this.count=BX.findChild(this.box,{tagName:"span",className:"bx-ilike-right-wrap"},true,false);if(!this.count){this.count=BX("bx-ilike-count-"+e)}this.countText=BX.findChild(this.count,{className:"bx-ilike-right"},true,false);this.topPanelContainer=BX("feed-post-emoji-top-panel-container-"+e);this.topPanel=BX("feed-post-emoji-top-panel-"+e);this.topUsersText=BX("bx-ilike-top-users-"+e);this.topUsersDataNode=BX("bx-ilike-top-users-data-"+e);this.userReactionNode=BX("bx-ilike-user-reaction-"+e);this.reactionsNode=BX("feed-post-emoji-icons-"+e);this.popup=null;this.popupId=null;this.popupTimeoutIdShow=null;this.popupTimeoutIdList=null;this.popupContent=BX.findChild(BX("bx-ilike-popup-cont-"+e),{tagName:"span",className:"bx-ilike-popup"},true,false);this.popupContentPage=1;this.popupTimeout=false;this.likeTimeout=false;this.mouseOverHandler=null;this.version=BXRL.render&&this.topPanel?2:1;this.mouseInShowPopupNode={};this.listXHR=null;if(typeof lastVoteRepo[p]!="undefined"){this.lastVote=lastVoteRepo[p];var u=s=="standart"?this.button:this.count;if(this.lastVote=="plus"){BX.addClass(u,"bx-you-like")}else{BX.removeClass(u,"bx-you-like")}}else{this.lastVote=BX.hasClass(s=="standart"?this.button:this.count,"bx-you-like")?"plus":"cancel";lastVoteRepo[p]=this.lastVote}if(typeof lastReactionRepo[p]!="undefined"){this.lastReaction=lastReactionRepo[p];this.count.setAttribute("data-myreaction",this.lastReaction)}else{var R=this.count.getAttribute("data-myreaction");this.lastReaction=BX.type.isNotEmptyString(R)?R:"like";lastReactionRepo[p]=this.lastReaction}if(this.topPanelContainer&&typeof BXRL.manager!="undefined"){BXRL.manager.addEntity(p,this)}};RatingLike.Draw=function(e,t){var i=e;var n=BXRL[i];n.countText.innerHTML=parseInt(t.TOTAL_POSITIVE_VOTES);if(typeof t.TYPE!="undefined"&&typeof t.USER_ID!="undefined"&&parseInt(t.USER_ID)>0&&typeof t.USER_DATA!="undefined"&&typeof t.USER_DATA.WEIGHT!="undefined"){var o=parseFloat(t.USER_DATA.WEIGHT);var a=BXRL[i].topUsersDataNode?JSON.parse(BXRL[i].topUsersDataNode.getAttribute("data-users")):false;if(t.TYPE!="CHANGE"&&BX.type.isPlainObject(a)){var s=a.TOP.length<2;for(var r in a.TOP){if(s){break}if(!a.TOP.hasOwnProperty(r)){continue}if(t.TYPE=="ADD"&&o>a.TOP[r].WEIGHT||t.TYPE=="CANCEL"&&t.USER_ID==a.TOP[r].ID){s=true}}if(s){if(t.TYPE=="ADD"&&t.USER_ID!=BX.message("USER_ID")){if(!a.TOP.find(function(e){return e.ID==t.USER_ID})){a.TOP.push({ID:parseInt(t.USER_ID),NAME_FORMATTED:t.USER_DATA.NAME_FORMATTED,WEIGHT:parseFloat(t.USER_DATA.WEIGHT)})}}else if(t.TYPE=="CANCEL"){a.TOP=a.TOP.filter(function(e){return e.ID!=t.USER_ID})}a.TOP.sort(function(e,t){if(e.WEIGHT==t.WEIGHT){return 0}return e.WEIGHT>t.WEIGHT?-1:1});if(a.TOP.length>2&&t.TYPE=="ADD"){a.TOP.pop();a.MORE++}}else{if(t.TYPE=="ADD"){a.MORE=typeof a.MORE!="undefined"?parseInt(a.MORE)+1:1}else if(t.TYPE=="CANCEL"){a.MORE=typeof a.MORE!="undefined"&&parseInt(a.MORE)>0?parseInt(a.MORE)-1:0}}BXRL[i].topUsersDataNode.setAttribute("data-users",JSON.stringify(a));if(BXRL[i].topUsersText){BXRL[i].topUsersText.innerHTML=BXRL.render.getTopUsersText({you:t.USER_ID==BX.message("USER_ID")?t.TYPE!="CANCEL":BX.hasClass(BXRL[i].count,"bx-you-like"),top:a.TOP,more:a.MORE})}}if(BX.type.isNotEmptyString(t.REACTION)&&BX.type.isNotEmptyString(t.REACTION_OLD)&&t.TYPE=="CHANGE"){BXRL.render.setReaction({likeId:i,rating:BXRL[i],action:"change",userReaction:t.REACTION,userReactionOld:t.REACTION_OLD,totalCount:t.TOTAL_POSITIVE_VOTES,userId:t.USER_ID})}else if(BX.type.isNotEmptyString(t.REACTION)&&BX.util.in_array(t.TYPE,["ADD","CANCEL"])){BXRL.render.setReaction({likeId:i,rating:BXRL[i],userReaction:t.REACTION,action:t.TYPE=="ADD"?"add":"cancel",totalCount:t.TOTAL_POSITIVE_VOTES,userId:t.USER_ID})}}if(BXRL[i].topPanel){BXRL[i].topPanel.setAttribute("data-popup","N")}if(!BXRL[i].userReactionNode){n.count.insertBefore(BX.create("span",{props:{className:"bx-ilike-plus-one"},style:{width:n.countText.clientWidth-8+"px",height:n.countText.clientHeight-8+"px"},html:t.TYPE=="ADD"?"+1":"-1"}),n.count.firstChild)}if(n.popup){n.popup.close();n.popupContentPage=1}};RatingLike.LiveUpdate=function(e){if(e.USER_ID==BX.message("USER_ID")){return false}for(var t in BXRL){if(!BXRL.hasOwnProperty(t)){continue}if(BXRL[t].entityTypeId==e.ENTITY_TYPE_ID&&BXRL[t].entityId==e.ENTITY_ID){RatingLike.Draw(t,e)}}if(typeof BXRL.manager!="undefined"){BXRL.manager.live(e)}};RatingLike.Set=function(e,t,i,n,o,a,s,r,l,p){p=!!p;if(s===undefined)s="standart";if(BXRLParams.pathToUserProfile){r=BXRLParams.pathToUserProfile}if(!BXRL[e]||BXRL[e].tryToSet<=5){var u=BXRL[e]&&BXRL[e].tryToSet?BXRL[e].tryToSet:1;BXRL[e]=new RatingLike(e,t,i,n,o,a,s,r,l);if(BXRL[e].enabled){RatingLike.Init(e,{mobile:p})}else{setTimeout(function(){BXRL[e].tryToSet=u+1;RatingLike.Set(e,t,i,n,o,a,s,r,l,p)},500)}}};RatingLike.ClickVote=function(e,t,i){var n=null,o=null,a=null;if(typeof t=="undefined"){t="like"}if(BXRL[e].version==2&&BXRL[e].userReactionNode){BXRL.render.hideReactionsPopup({likeId:e});BXRL.render.blockReactionsPopup();BX.unbind(document,"mousemove",BXRL.render.reactionsPopupMouseOutHandler)}clearTimeout(BXRL[e].likeTimeout);var s=BX.hasClass(BXRL[e].template=="standart"?this:BXRL[e].count,"bx-you-like");i=!!i;var r=false,l=false;if(s&&!i){t=BXRL[e].version==2?BXRL.render.getUserReaction({userReactionNode:BXRL[e].userReactionNode}):false;BXRL[e].buttonText.innerHTML=BXRL[e].localize["LIKE_N"];BXRL[e].countText.innerHTML=parseInt(BXRL[e].countText.innerHTML)-1;BX.removeClass(BXRL[e].template=="standart"?this:BXRL[e].count,"bx-you-like");BX.removeClass(BXRL[e].button,"bx-you-like-button");BXRL[e].likeTimeout=setTimeout(function(){if(BXRL[e].lastVote!="cancel"){RatingLike.Vote(e,"cancel",t)}},1e3)}else if(s&&i){r=true;l=BXRL[e].version==2?BXRL.render.getUserReaction({userReactionNode:BXRL[e].userReactionNode}):false;if(t!=l){BXRL[e].likeTimeout=setTimeout(function(){RatingLike.Vote(e,"change",t,l)},1e3)}}else if(!s){BXRL[e].buttonText.innerHTML=BXRL[e].localize["LIKE_Y"];BXRL[e].countText.innerHTML=parseInt(BXRL[e].countText.innerHTML)+1;BX.addClass(BXRL[e].template=="standart"?this:BXRL[e].count,"bx-you-like");BX.addClass(BXRL[e].button,"bx-you-like-button");BXRL[e].likeTimeout=setTimeout(function(){if(BXRL[e].lastVote!="plus"){RatingLike.Vote(e,"plus",t)}else if(t!=BXRL[e].lastReaction){RatingLike.Vote(e,"change",t,BXRL[e].lastReaction)}},1e3)}if(BXRL[e].version==2){if(r){BXRL.render.setReaction({likeId:e,rating:BXRL[e],action:"change",userReaction:t,userReactionOld:l,totalCount:parseInt(BXRL[e].countText.innerHTML)})}else{BXRL.render.setReaction({likeId:e,rating:BXRL[e],action:s?"cancel":"add",userReaction:t,totalCount:parseInt(BXRL[e].countText.innerHTML)})}}if(!r&&BXRL[e].version==2){var p=BXRL[e].topUsersDataNode?JSON.parse(BXRL[e].topUsersDataNode.getAttribute("data-users")):false;if(p){BXRL[e].topUsersText.innerHTML=BXRL.render.getTopUsersText({you:!s,top:p.TOP,more:p.MORE})}}if(BXRL[e].template=="light"&&!BXRL[e].userReactionNode){n=BXRL[e].box;o=n.cloneNode(true);o.id="like_anim";var u="normal";if(BX.findParent(n,{className:"feed-com-informers-bottom"})){u="comment"}else if(BX.findParent(n,{className:"feed-post-informers"})){u="post"}BX.removeClass(o,"bx-ilike-button-hover");BX.addClass(o,"bx-like-anim");BX.adjust(n.parentNode,{style:{position:"relative"}});BX.adjust(o,{style:{position:"absolute",whiteSpace:"nowrap",top:u=="post"?"1px":u=="comment"?"0":""}});BX.adjust(n,{style:{visibility:"hidden"}});BX.prepend(o,n.parentNode);new BX.easing({duration:140,start:{scale:100},finish:{scale:u=="comment"?110:115},transition:BX.easing.transitions.quad,step:function(e){o.style.transform="scale("+e.scale/100+")"},complete:function(){a=BX.create("SPAN",{props:{className:s?"bx-ilike-icon":"bx-ilike-icon bx-ilike-icon-orange"}});BX.adjust(a,{style:{position:"absolute",whiteSpace:"nowrap"}});BX.prepend(a,n.parentNode);new BX.easing({duration:140,start:{scale:u=="comment"?110:115},finish:{scale:100},transition:BX.easing.transitions.quad,step:function(e){o.style.transform="scale("+e.scale/100+")"},complete:function(){}}).animate();var e={opacity:100,scale:u=="comment"?110:115,top:0};var t={opacity:0,scale:200,top:u=="comment"?-3:-2};if(u!="comment"){e.left=-5;t.left=-13}new BX.easing({duration:200,start:e,finish:t,transition:BX.easing.transitions.linear,step:function(e){a.style.transform="scale("+e.scale/100+")";a.style.opacity=e.opacity/100;if(u!="comment"){a.style.left=e.left+"px"}a.style.top=e.top+"px"},complete:function(){o.parentNode.removeChild(o);a.parentNode.removeChild(a);BX.adjust(n.parentNode,{style:{position:"static"}});BX.adjust(n,{style:{visibility:"visible"}})}}).animate()}}).animate()}BX.removeClass(this.box,"bx-ilike-button-hover")};RatingLike.Init=function(e,t){if(typeof t=="undefined"){t={}}if(typeof BXRL.manager!="undefined"){BXRL.manager.init(t)}if(BXRL[e].available){var i=BXRL[e].template=="standart"?BXRL[e].button:BXRL[e].buttonText;if(BXRL[e].version>=2&&BXRL.manager.mobile){BX.bind(i,"touchstart",BX.delegate(function(e){BXRL.manager.startScrollTop=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop}))}var n=typeof BXRL.manager!="undefined"&&BXRL.manager.mobile?"touchend":"click";BX.bind(i,n,BX.delegate(function(t){if(BXRL[e].version>=2&&BXRL.manager.mobile&&BXRL.render.blockTouchEndByScroll){BXRL.render.blockTouchEndByScroll=false;return}if(BXRL[e].version<2||!BXRL.manager.mobile||!BXRL.render.reactionsPopupLikeId){if(BXRL[e].version>=2&&BXRL.manager.mobile){var i=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop;if(Math.abs(i-BXRL.manager.startScrollTop)>2){return}}RatingLike.ClickVote(e)}if(BXRL[e].version==2){BXRL.render.afterClick({likeId:e})}t.preventDefault()},this));if(typeof BXRL.manager=="undefined"||!BXRL.manager.mobile){BX.bind(BXRL[e].box,"mouseover",function(){BX.addClass(this,"bx-ilike-button-hover")});BX.bind(BXRL[e].box,"mouseout",function(){BX.removeClass(this,"bx-ilike-button-hover")})}else{BXRL[e].pathToAjax=BX.message("SITE_DIR")+"mobile/ajax.php?mobile_action=like";BX.bind(BXRL[e].topPanel,"click",function(t){BXRL.render.openMobileReactionsPage({entityTypeId:BXRL[e].entityTypeId,entityId:BXRL[e].entityId});t.stopPropagation()})}}else if(BXRL[e].buttonText!=undefined){BXRL[e].buttonText.innerHTML=BXRL[e].localize["LIKE_D"]}var o=BXRL[e].topUsersText?BXRL[e].topUsersText:BXRL[e].count;if(typeof BXRL.manager=="undefined"||!BXRL.manager.mobile){BX.bind(o,"mouseenter",function(t){RatingLike.onResultMouseEnter({likeId:e,event:t,nodeId:t.currentTarget.id})});BX.bind(o,"mouseleave",BX.proxy(function(){RatingLike.onResultMouseLeave({likeId:e})},{likeId:e}))}if(typeof BXRL.manager=="undefined"||!BXRL.manager.mobile){BX.bind(o,"click",function(t){RatingLike.onResultClick({likeId:e,event:t,nodeId:t.currentTarget.id})})}if(BXRL[e].version==2&&BXRL[e].available&&BXRL[e].userReactionNode){BXRL.render.bindReactionsPopup({likeId:e})}};RatingLike.onResultClick=function(e){var t=BX.type.isNotEmptyString(e.likeId)?e.likeId:false,i=typeof e.event!="undefined"?e.event:null,n=BX.type.isNotEmptyString(e.reaction)?e.reaction:"";if(BXRL[t].resultPopupAnimation){return}if(BXRL[t].popup&&BXRL[t].popup.isShown()){BXRL[t].popup.close()}else{clearTimeout(BXRL[t].popupTimeoutIdList);clearTimeout(BXRL[t].popupTimeoutIdShow);if(BXRL[t].popupContentPage==1&&(i.currentTarget.getAttribute("data-popup")!="Y"||BXRL[t].popupCurrentReaction!=n)){RatingLike.List(t,1,n,true)}RatingLike.OpenWindow(t,i.currentTarget==BXRL[t].count?null:i,i.currentTarget,i.currentTarget.id)}};RatingLike.onResultMouseEnter=function(e){var t=BX.type.isNotEmptyString(e.likeId)?e.likeId:false,i=typeof e.event!="undefined"?e.event:null,n=BX.type.isNotEmptyString(e.reaction)?e.reaction:"",o=i&&BX.type.isNotEmptyString(i.currentTarget.id)?i.currentTarget.id:"";BXRL[t].mouseInShowPopupNode[n]=true;clearTimeout(BXRL[t].popupTimeoutIdList);clearTimeout(BXRL[t].popupTimeoutIdShow);BXRL[t].popupTimeoutIdList=setTimeout(BX.proxy(function(){if(BXRLW==this.likeId){return false}if(BXRL[this.likeId].popupContentPage==1&&this.target.getAttribute("data-popup")!="Y"){RatingLike.List(this.likeId,1,this.reaction,true)}BXRL[this.likeId].popupTimeoutIdShow=setTimeout(BX.proxy(function(){BXRL[this._likeId].resultPopupAnimation=true;var e=this._likeId;setTimeout(function(){BXRL[e].resultPopupAnimation=false},500);if(BXRL[this._likeId].mouseInShowPopupNode[this._reaction]){RatingLike.OpenWindow(this._likeId,null,this._target,this._nodeId)}},{_likeId:this.likeId,_reaction:this.reaction,_target:this.target,_nodeId:this.nodeId}),100)},{likeId:t,target:i.currentTarget,reaction:n,nodeId:o}),300)};RatingLike.onResultMouseLeave=function(e){var t=BX.type.isNotEmptyString(e.likeId)?e.likeId:false,i=BX.type.isNotEmptyString(e.reaction)?e.reaction:"";BXRL[t].mouseInShowPopupNode[i]=false;BXRL[t].resultPopupAnimation=false};RatingLike.OpenWindow=function(e,t,i,n){if(parseInt(BXRL[e].countText.innerHTML)==0){return}var o=BXRL[e].template=="standart"?BXRL[e].count:BXRL[e].version==2?BX(i)?BX(i):BX.type.isNotEmptyString(n)&&BX(n)?BX(n):null:BXRL[e].box;if(!BX(o)){return}if(BXRL[e].popup==null){var a=RatingLike.getGlobalIndex(BX(o));BXRL[e].popup=new BX.PopupWindow("ilike-popup-"+e,o,{lightShadow:true,offsetTop:0,offsetLeft:typeof t!="undefined"&&t!=null&&typeof t.offsetX!="undefined"?t.offsetX-100:BXRL[e].version==2?-30:5,autoHide:true,closeByEsc:true,zIndexAbsolute:a>1e3?a+1:1e3,bindOptions:{position:"top"},animation:"fading-slide",events:{onPopupClose:function(){BXRLW=null},onPopupDestroy:function(){}},content:BX("bx-ilike-popup-cont-"+e),className:(BXRL[e].topPanel?"bx-ilike-wrap-block-react-wrap":"")+(typeof BXRL.manager!="undefined"&&BXRL.manager.mobile?" bx-ilike-mobile-wrap":"")});if(!BXRL[e].topPanel&&(typeof BXRL.manager=="undefined"||!BXRL.manager.mobile)){BXRL[e].popup.setAngle({});BX.bind(BX("ilike-popup-"+e),"mouseout",function(){clearTimeout(BXRL[e].popupTimeout);BXRL[e].popupTimeout=setTimeout(function(){BXRL[e].popup.close()},1e3)});BX.bind(BX("ilike-popup-"+e),"mouseover",function(){clearTimeout(BXRL[e].popupTimeout)})}}else{if(typeof t!="undefined"&&t!=null&&typeof t.offsetX!="undefined"){BXRL[e].popup.offsetLeft=t.offsetX-100}if(BX(o)){BXRL[e].popup.setBindElement(o)}}if(BXRLW!=null&&BXRLW!=e){BXRL[BXRLW].popup.close()}BXRLW=e;BXRL[e].popup.show();if(typeof BX.SidePanel!="undefined"&&BX.SidePanel.Instance.getTopSlider()){BX.addCustomEvent(BX.SidePanel.Instance.getTopSlider().getWindow(),"SidePanel.Slider:onClose",function e(){BX.removeCustomEvent(BX.SidePanel.Instance.getTopSlider().getWindow(),"SidePanel.Slider:onClose",e);if(typeof BXRL[BXRLW]!="undefined"){BXRL[BXRLW].popup.close()}})}RatingLike.AdjustWindow(e)};RatingLike.getGlobalIndex=function(e){var t=0,i="";do{i=BX.style(e,"z-index");if(i!=="auto"){t=BX.type.stringToInt(i)}e=e.offsetParent}while(e&&e.tagName!=="BODY");return t};RatingLike.Vote=function(e,t,i,n){if(!BX.type.isNotEmptyString(i)){i="like"}var o=null;if(typeof BXRL.manager!="undefined"&&BXRL.manager.mobile){o=new MobileAjaxWrapper}var a=o?BX.proxy(o.Wrap,o):BX.ajax,s=o?"callback":"onsuccess",r=o?"callback_failure":"onfailure";var l=BXRL[e].pathToAjax;l=BX.util.add_url_param(l,{b24statAction:"addLike"});if(BXRL[e].version>=2&&BXRL.manager.mobile){l=BX.util.add_url_param(l,{b24statContext:"mobile"})}var p={url:l,method:"POST",dataType:"json",type:"json",data:{RATING_VOTE:"Y",RATING_VOTE_TYPE_ID:BXRL[e].entityTypeId,RATING_VOTE_ENTITY_ID:BXRL[e].entityId,RATING_VOTE_ACTION:t,RATING_VOTE_REACTION:i,sessid:BX.bitrix_sessid()}};p[s]=function(o){BXRL[e].lastVote=o.action;BXRL[e].lastReaction=i;lastVoteRepo[BXRL[e].entityTypeId+"_"+BXRL[e].entityId]=o.action;lastReactionRepo[BXRL[e].entityTypeId+"_"+BXRL[e].entityId]=o.voteReaction;BXRL[e].countText.innerHTML=o.items_all;BXRL[e].popupContentPage=1;BXRL[e].popupContent.innerHTML="";spanTag0=document.createElement("span");spanTag0.className="bx-ilike-wait";BXRL[e].popupContent.appendChild(spanTag0);if(BXRL[e].topPanel){BXRL[e].topPanel.setAttribute("data-popup","N")}RatingLike.AdjustWindow(e);if(BX("ilike-popup-"+e)&&BX("ilike-popup-"+e).style.display=="block"){RatingLike.List(e,null,"",true)}if(BXRL[e].version>=2&&BXRL.manager.mobile){BXMobileApp.onCustomEvent("onRatingLike",{action:o.action,ratingId:e,entityTypeId:BXRL[e].entityTypeId,entityId:BXRL[e].entityId,voteAction:t,voteReaction:i,voteReactionOld:n,userId:BX.message("USER_ID"),userData:typeof o.user_data!="undefined"?o.user_data:null,itemsAll:o.items_all},true)}};p[r]=function(o){var a=BXRL[e].topUsersDataNode?JSON.parse(BXRL[e].topUsersDataNode.getAttribute("data-users")):false;if(BXRL[e].version==2){if(t=="change"){BXRL.render.setReaction({likeId:e,rating:BXRL[e],action:t,userReaction:i,userReactionOld:n,totalCount:parseInt(BXRL[e].countText.innerHTML)})}else{BXRL.render.setReaction({likeId:e,rating:BXRL[e],action:t=="cancel"?"add":"cancel",userReaction:i,totalCount:t=="cancel"?parseInt(BXRL[e].countText.innerHTML)+1:parseInt(BXRL[e].countText.innerHTML)-1})}if(BXRL[e].buttonText){if(t=="add"){BXRL[e].buttonText.innerHTML=BX.message("RATING_LIKE_EMOTION_LIKE_CALC")}else if(t=="change"){BXRL[e].buttonText.innerHTML=BX.message("RATING_LIKE_EMOTION_"+n.toUpperCase()+"_CALC")}else{BXRL[e].buttonText.innerHTML=BX.message("RATING_LIKE_EMOTION_"+i.toUpperCase()+"_CALC")}}}if(a&&t!="change"&&BXRL[e].version==2){BXRL[e].topUsersText.innerHTML=BXRL.render.getTopUsersText({you:t=="cancel",top:a.TOP,more:a.MORE})}};a(p);return false};RatingLike.List=function(e,t,i,n){if(parseInt(BXRL[e].countText.innerHTML)==0){return false}i=BX.type.isNotEmptyString(i)?i:"";if(t==null){t=BXRL[e].version==2?typeof BXRL.render.popupPagesList[i]!="undefined"?BXRL.render.popupPagesList[i]:1:BXRL[e].popupContentPage}if(n&&t==1&&BXRL[e].version==2){BXRL.render.clearPopupContent({likeId:e})}if(BXRL[e].listXHR){BXRL[e].listXHR.abort()}BXRL[e].listXHR=BX.ajax({url:BXRL[e].pathToAjax,method:"POST",dataType:"json",data:{RATING_VOTE_LIST:"Y",RATING_VOTE_TYPE_ID:BXRL[e].entityTypeId,RATING_VOTE_ENTITY_ID:BXRL[e].entityId,RATING_VOTE_LIST_PAGE:t,RATING_VOTE_REACTION:i=="all"?"":i,PATH_TO_USER_PROFILE:BXRL[e].pathToUserProfile,sessid:BX.bitrix_sessid()},onsuccess:function(o){if(!o){return false}BXRL[e].countText.innerHTML=o.items_all;if(parseInt(o.items_page)==0){return false}if(BXRL[e].version==2){BXRL.render.buildPopupContent({likeId:e,reaction:i,rating:BXRL[e],page:t,data:o,clear:n});BXRL[e].topPanel.setAttribute("data-popup","Y")}else{if(t==1){BXRL[e].popupContent.innerHTML="";spanTag0=document.createElement("span");spanTag0.className="bx-ilike-bottom_scroll";BXRL[e].popupContent.appendChild(spanTag0)}BXRL[e].popupContentPage+=1;var a=null;for(var s=0;s<o.items.length;s++){if(o.items[s]["PHOTO_SRC"].length>0){a=BX.create("IMG",{attrs:{src:o.items[s]["PHOTO_SRC"]},props:{className:"bx-ilike-popup-avatar-img"}})}else{a=BX.create("IMG",{attrs:{src:"/bitrix/images/main/blank.gif"},props:{className:"bx-ilike-popup-avatar-img bx-ilike-popup-avatar-img-default"}})}BXRL[e].popupContent.appendChild(BX.create("A",{attrs:{href:o.items[s]["URL"],target:"_blank"},props:{className:"bx-ilike-popup-img"+(!!o.items[s]["USER_TYPE"]?" bx-ilike-popup-img-"+o.items[s]["USER_TYPE"]:"")},children:[BX.create("SPAN",{props:{className:"bx-ilike-popup-avatar-new"},children:[a,BX.create("SPAN",{props:{className:"bx-ilike-popup-avatar-status-icon"}})]}),BX.create("SPAN",{props:{className:"bx-ilike-popup-name-new"},html:o.items[s]["FULL_NAME"]})]}))}}RatingLike.AdjustWindow(e);RatingLike.PopupScroll(e)},onfailure:function(e){}});return false};RatingLike.AdjustWindow=function(e){if(BXRL[e].popup!=null){BXRL[e].popup.bindOptions.forceBindPosition=true;BXRL[e].popup.adjustPosition();BXRL[e].popup.bindOptions.forceBindPosition=false}};RatingLike.PopupScroll=function(e){var t=BX.findChildren(BXRL[e].popupContent,{className:"bx-ilike-popup-content"},true);if(t.length<=0){t=[BXRL[e].popupContent]}var i=null;for(var n=0;n<t.length;n++){i=t[n];BX.bind(i,"scroll",function(){if(this.scrollTop>(this.scrollHeight-this.offsetHeight)/1.5){RatingLike.List(e,null,BXRL[e].version==2?BXRL.render.popupCurrentReaction:false);BX.unbindAll(this)}})}};RatingLike.setParams=function(e){if(typeof e!="undefined"){if(typeof e.pathToUserProfile!="undefined"){BXRLParams.pathToUserProfile=e.pathToUserProfile}}};
/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/bitrix/js/main/core/core_timer.min.js?15956917724311";s:6:"source";s:34:"/bitrix/js/main/core/core_timer.js";s:3:"min";s:38:"/bitrix/js/main/core/core_timer.min.js";s:3:"map";s:38:"/bitrix/js/main/core/core_timer.map.js";}"*/
(function(t){if(t.BX.timer)return;var i=[],e=200,a=null,s=0;BX.timer=function(t,i){i=i||{};if(BX.type.isString(t)||BX.type.isElementNode(t))i.container=t;else if(typeof t=="object")i=t;if(!i.container)return false;var s=new BX.CTimer(i);BX.timer.start(s);if(null==a){a=setInterval(r,e);BX.garbage(BX.timer.clear)}return s};BX.timer.stop=function(t){i[t.TIMER_INDEX]=null};BX.timer.start=function(t){t.TIMER_INDEX=s;i[s++]=t};BX.timer.clock=function(t,i){return BX.timer({container:t,dt:i})};BX.timer.clear=function(){clearInterval(a);i=null};BX.timer.registerFormat=function(t,i){BX.CTimer.prototype.formatValueHandlers[t]=i};BX.timer.getHandler=function(t){return BX.CTimer.prototype.formatValueHandlers[t]};BX.CTimer=function(t,i){this.container=t.container;this.from=t.from?parseInt(t.from.valueOf()):null;this.to=t.to?parseInt(t.to.valueOf()):null;this.index=i;this.dt=parseInt(t.dt);if(isNaN(this.dt))this.dt=0;this.display=t.display||(BX.isAmPmMode()?"clock_am_pm":"clock");this.accuracy=t.accuracy||60;this.callback=this.from?this._callback_from:this.to?this._callback_to:this._callback;this.callback_finish=t.callback_finish;this.formatValue=this.formatValueHandlers.clock;this.bInited=false;BX.ready(BX.delegate(this.Init,this))};BX.CTimer.prototype.Init=function(){if(this.bInited)return;this.container=BX(this.container);this.container_value_fld=this.container.tagName.toUpperCase()=="INPUT"?"value":"innerHTML";if(this.container_value_fld=="value"&&(this.display=="clock"||this.display=="clock_am_pm")){if(this.display=="clock"){this.display="simple"}else if(this.display=="clock_am_pm"){this.display="simple_am_pm"}}this.formatValue=this.formatValueHandlers[this.display]?this.formatValueHandlers[this.display]:this.formatValueHandlers.clock;this.bInited=true};BX.CTimer.prototype.setFrom=function(t){if(!this.from)return;this.from=t};BX.CTimer.prototype.setTo=function(t){if(!this.to)return;this.to=t};BX.CTimer.prototype._callback=function(t){if(this.dt!==0)var t=new Date(t.valueOf()+this.dt);this.setValue(this.formatValue(t.getHours(),t.getMinutes(),t.getSeconds()))};BX.CTimer.prototype._callback_from=function(t){var i=(t.valueOf()-this.from.valueOf()+this.dt)/1e3;this.setValue(this.formatValue(parseInt(i/3600),parseInt(i%3600/60),parseInt(i%60)))};BX.CTimer.prototype._callback_to=function(t){var i=(this.to.valueOf()-t.valueOf())/1e3;if(i>0){this.setValue(this.formatValue(parseInt(i/3600),parseInt(i%3600/60),parseInt(i%60)))}else{this.Finish()}};BX.CTimer.prototype.formatValueHandlers={clock:function(t,i,e){var a='<span class="bx-timer-semicolon">:</span>';return BX.util.str_pad(t,2,"0","left")+a+(this.accuracy>=3600?"00":BX.util.str_pad(i,2,"0","left"))+(this.accuracy>=60?"":a+BX.util.str_pad(e,2,"0","left"))},clock_am_pm:function(t,i,e){var a="am";var s='<span class="bx-timer-semicolon">:</span>';if(t>12){t=t-12;a="pm"}else if(t==0){t=12;a="am"}else if(t==12){a="pm"}return t+s+(this.accuracy>=3600?"00":BX.util.str_pad(i,2,"0","left"))+(this.accuracy>=60?"":s+BX.util.str_pad(e,2,"0","left"))+" "+a},simple:function(t,i,e){return BX.util.str_pad(t,2,"0","left")+":"+(this.accuracy>=3600?"00":BX.util.str_pad(i,2,"0","left"))+(this.accuracy>=60?"":":"+BX.util.str_pad(e,2,"0","left"))},simple_am_pm:function(t,i,e){var a="am";if(t>12){t=t-12;a="pm"}else if(t==0){t=12;a="am"}else if(t==12){a="pm"}return t+":"+(this.accuracy>=3600?"00":BX.util.str_pad(i,2,"0","left"))+(this.accuracy>=60?"":":"+BX.util.str_pad(e,2,"0","left"))+" "+a},worktime:function(t,i,e){return t+BX.message("JS_CORE_H")+" "+(this.accuracy>=3600?"":i+BX.message("JS_CORE_M")+(this.accuracy>=60?"":" "+e+BX.message("JS_CORE_S")))},worktime_short:function(t,i,e){return BX.util.rtrim((t>0?t+BX.message("JS_CORE_H")+" ":"")+(i>0&&this.accuracy<3600?i+BX.message("JS_CORE_M")+" ":"")+(this.accuracy>=60?"":e>0?e+BX.message("JS_CORE_S"):""))}};BX.CTimer.prototype.setValue=function(t){if(this.bInited){if(t!=this._last_value)this.container[this.container_value_fld]=t;this._last_value=t}};BX.CTimer.prototype.Finish=function(){BX.timer.stop(this);if(this.callback_finish)this.callback_finish.apply(this);BX.cleanNode(this.container.parentNode)};function r(){var t=new Date;for(var e=0,a=s;e<a;e++){if(i[e]&&i[e].callback)i[e].callback.apply(i[e],[t])}t=null}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:37:"/bitrix/js/main/dd.js?159569177714809";s:6:"source";s:21:"/bitrix/js/main/dd.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(){

if (window.jsDD)
	return;

jsDD = {
	arObjects: [],
	arDestinations: [],
	arDestinationsPriority: [],

	arContainers: [],
	arContainersPos: [],

	current_dest_index: false,
	current_node: null,

	wndSize: null,

	bStarted: false,
	bDisable: false,
	bDisableDestRefresh: false,

	bEscPressed: false,

	bScrollWindow: false,
	scrollViewTimer: null,
	scrollViewConfig: {
		checkerTimeout: 30,
		scrollZone: 25,
		scrollBy: 25,
		scrollContainer: null,
		bScrollH: true,
		bScrollV: true,
		pos: null
	},

	setScrollWindow: function(val)
	{
		jsDD.bScrollWindow = !!val;
		if (BX.type.isDomNode(val))
		{
			jsDD.scrollViewConfig.scrollContainer = val;
			jsDD.scrollViewConfig.pos = BX.pos(val);

			var s = BX.style(val, 'overflow') || 'visible',
				s1 = BX.style(val, 'overflow-x') || 'visible',
				s2 = BX.style(val, 'overflow-y') || 'visible';

			jsDD.scrollViewConfig.bScrollH = s != 'visible' || s1 != 'visible';
			jsDD.scrollViewConfig.bScrollV = s != 'visible' || s2 != 'visible';
		}
	},

	Reset: function()
	{
		jsDD.arObjects = [];
		jsDD.arDestinations = [];
		jsDD.arDestinationsPriority = [];
		jsDD.bStarted = false;
		jsDD.current_node = null;
		jsDD.current_dest_index = false;
		jsDD.bDisableDestRefresh = false;
		jsDD.bDisable = false;
		jsDD.x = null;
		jsDD.y = null;
		jsDD.start_x = null;
		jsDD.start_y = null;
		jsDD.wndSize = null;

		jsDD.bEscPressed = false;

		clearInterval(jsDD.scrollViewTimer)
		jsDD.bScrollWindow = false;
		jsDD.scrollViewTimer = null;
		jsDD.scrollViewConfig.scrollContainer = null;
	},

	registerObject: function (obNode)
	{
		BX.bind(obNode, 'mousedown', jsDD.startDrag);
		BX.Event.bind(obNode, 'touchstart', jsDD.startDrag, { passive: true });

		obNode.__bxddid = jsDD.arObjects.length;

		jsDD.arObjects[obNode.__bxddid] = obNode;
	},
	unregisterObject: function(obNode)
	{
		if(typeof(obNode["__bxddid"]) === "undefined")
		{
			return;
		}

		delete jsDD.arObjects[obNode.__bxddid];
		delete obNode.__bxddid;
		BX.unbind(obNode, 'mousedown', jsDD.startDrag);
		BX.unbind(obNode, 'touchstart', jsDD.startDrag);
	},
	registerDest: function (obDest, priority)
	{
		if (!priority)
			priority = 100;

		obDest.__bxddeid = jsDD.arDestinations.length;
		obDest.__bxddpriority = priority;

		jsDD.arDestinations[obDest.__bxddeid] = obDest;
		if (!jsDD.arDestinationsPriority[priority])
			jsDD.arDestinationsPriority[priority] = [obDest.__bxddeid]
		else
			jsDD.arDestinationsPriority[priority].push(obDest.__bxddeid);

		jsDD.refreshDestArea(obDest.__bxddeid);
	},
	unregisterDest: function(obDest)
	{
		if(typeof(obDest["__bxddeid"]) === "undefined")
		{
			return;
		}

		delete jsDD.arDestinations[obDest.__bxddeid];
		delete obDest.__bxddeid;
		delete obDest.__bxddpriority;

		jsDD.refreshDestArea();
	},
	disableDest: function(obDest)
	{
		if (typeof(obDest.__bxddeid) !== "undefined")
		{
			obDest.__bxdddisabled = true;
		}
	},

	enableDest: function(obDest)
	{
		if (typeof(obDest.__bxddeid) !== "undefined")
		{
			obDest.__bxdddisabled = false;
		}
	},

	registerContainer: function (obCont)
	{
		jsDD.arContainers[jsDD.arContainers.length] = obCont;
	},

	getContainersScrollPos: function(x, y)
	{
		var pos = {'left':0, 'top':0};
		for(var i=0, n=jsDD.arContainers.length; i<n; i++)
		{
			if(jsDD.arContainers[i] && x >= jsDD.arContainersPos[i]["left"] && x <= jsDD.arContainersPos[i]["right"] && y >= jsDD.arContainersPos[i]["top"] && y <= jsDD.arContainersPos[i]["bottom"])
			{
				pos.left = jsDD.arContainers[i].scrollLeft;
				pos.top = jsDD.arContainers[i].scrollTop;
			}
		}
		return pos;
	},

	setContainersPos: function()
	{
		for(var i=0, n=jsDD.arContainers.length; i<n; i++)
		{
			if(jsDD.arContainers[i])
				jsDD.arContainersPos[i] = BX.pos(jsDD.arContainers[i]);
		}
	},

	refreshDestArea: function(id)
	{
		if (id && typeof (id) == "object" && typeof (id.__bxddeid) != 'undefined')
		{
			id = id.__bxddeid;
		}

		if (typeof id == 'undefined')
		{
			for (var i = 0, cnt = jsDD.arDestinations.length; i < cnt; i++)
			{
				jsDD.refreshDestArea(i);
			}
		}
		else
		{
			if (null == jsDD.arDestinations[id])
				return;

			var arPos = BX.pos(jsDD.arDestinations[id]);
			jsDD.arDestinations[id].__bxpos = [arPos.left, arPos.top, arPos.right, arPos.bottom];
		}
	},

	_checkEsc: function(e)
	{
		e = e||window.event;
		if (jsDD.bStarted && e.keyCode == 27)
		{
			jsDD.stopCurrentDrag();
		}
	},

	stopCurrentDrag: function()
	{
		if (jsDD.bStarted)
		{
			jsDD.bEscPressed = true;
			jsDD.stopDrag();
		}
	},

	/* scroll checkers */

	_onscroll: function() {
		jsDD.wndSize = BX.GetWindowSize();
	},

	_checkScroll: function()
	{
		if (jsDD.bScrollWindow)
		{
			var pseudo_e = {
					clientX: jsDD.x - jsDD.wndSize.scrollLeft,
					clientY: jsDD.y - jsDD.wndSize.scrollTop
				},
				bChange = false,
				d = jsDD.scrollViewConfig.scrollZone;

			// check whether window scroll needed
			if (pseudo_e.clientY < d && jsDD.wndSize.scrollTop > 0)
			{
				window.scrollBy(0, -jsDD.scrollViewConfig.scrollBy);
				bChange = true;
			}

			if (pseudo_e.clientY > jsDD.wndSize.innerHeight - d && jsDD.wndSize.scrollTop < jsDD.wndSize.scrollHeight - jsDD.wndSize.innerHeight)
			{
				window.scrollBy(0, jsDD.scrollViewConfig.scrollBy);
				bChange = true;
			}

			if (pseudo_e.clientX < d && jsDD.wndSize.scrollLeft > 0)
			{
				window.scrollBy(-jsDD.scrollViewConfig.scrollBy, 0);
				bChange = true;
			}

			if (pseudo_e.clientX > jsDD.wndSize.innerWidth - d && jsDD.wndSize.scrollLeft < jsDD.wndSize.scrollWidth - jsDD.wndSize.innerWidth)
			{
				window.scrollBy(jsDD.scrollViewConfig.scrollBy, 0);
				bChange = true;
			}

			// check whether container scroll needed

			if (jsDD.scrollViewConfig.scrollContainer)
			{
				var c = jsDD.scrollViewConfig.scrollContainer;

				if (jsDD.scrollViewConfig.bScrollH)
				{
					if (pseudo_e.clientX + jsDD.wndSize.scrollLeft < jsDD.scrollViewConfig.pos.left + d && c.scrollLeft > 0)
					{
						c.scrollLeft -= jsDD.scrollViewConfig.scrollBy;
						bChange = true;
					}

					if (pseudo_e.clientX + jsDD.wndSize.scrollLeft > jsDD.scrollViewConfig.pos.right - d
						&& c.scrollLeft < c.scrollWidth - c.offsetWidth)
					{
						c.scrollLeft += jsDD.scrollViewConfig.scrollBy;
						bChange = true;
					}
				}

				if (jsDD.scrollViewConfig.bScrollV)
				{
					if (pseudo_e.clientY + jsDD.wndSize.scrollTop < jsDD.scrollViewConfig.pos.top + d && c.scrollTop > 0)
					{
						c.scrollTop -= jsDD.scrollViewConfig.scrollBy;
						bChange = true;
					}

					if (pseudo_e.clientY + jsDD.wndSize.scrollTop > jsDD.scrollViewConfig.pos.bottom - d
						&& c.scrollTop < c.scrollHeight - c.offsetHeight)
					{
						c.scrollTop += jsDD.scrollViewConfig.scrollBy;
						bChange = true;
					}
				}
			}

			if (bChange)
			{
				jsDD._onscroll();
				jsDD.drag(pseudo_e);
			}
		}
	},

	/* DD process */

	startDrag: function(e)
	{
		if (jsDD.bDisable)
			return true;

		e = e || window.event;

		if (!(BX.getEventButton(e)&BX.MSLEFT))
			return true;

		jsDD.current_node = null;
		if (e.currentTarget)
		{
			jsDD.current_node = e.currentTarget;
			if (null == jsDD.current_node || null == jsDD.current_node.__bxddid)
			{
				jsDD.current_node = null;
				return;
			}
		}
		else
		{
			jsDD.current_node = e.srcElement;
			if (null == jsDD.current_node)
				return;

			while (null == jsDD.current_node.__bxddid)
			{
				jsDD.current_node = jsDD.current_node.parentNode;
				if (jsDD.current_node.tagName == 'BODY')
					return;
			}
		}

		jsDD.bStarted = false;
		jsDD.bPreStarted = true;

		jsDD.wndSize = BX.GetWindowSize();

		jsDD.start_x = e.clientX + jsDD.wndSize.scrollLeft;
		jsDD.start_y = e.clientY + jsDD.wndSize.scrollTop;

		BX.bind(document, "mouseup", jsDD.stopDrag);
		BX.bind(document, "touchend", jsDD.stopDrag);
		BX.bind(document, "mousemove", jsDD.drag);
		BX.bind(document, "touchmove", jsDD.drag);
		BX.bind(window, 'scroll', jsDD._onscroll);

		if(document.body.setCapture)
			document.body.setCapture();

		if (!jsDD.bDisableDestRefresh)
			jsDD.refreshDestArea();

		jsDD.setContainersPos();

		if(e.type !== "touchstart")
		{
			jsDD.denySelection();
			return BX.PreventDefault(e);
		}
		else
		{
			return true;
		}
	},

	start: function()
	{
		if (jsDD.bDisable)
			return true;

		document.body.style.cursor = 'move';

		if (jsDD.current_node.onbxdragstart)
			jsDD.current_node.onbxdragstart();

		for (var i = 0, cnt = jsDD.arDestinations.length; i < cnt; i++)
		{
			if (jsDD.arDestinations[i] && jsDD.arDestinations[i].onbxdestdragstart)
				jsDD.arDestinations[i].onbxdestdragstart(jsDD.current_node);
		}

		jsDD.bStarted = true;
		jsDD.bPreStarted = false;

		if (jsDD.bScrollWindow)
		{
			if (jsDD.scrollViewTimer)
				clearInterval(jsDD.scrollViewTimer);

			jsDD.scrollViewTimer = setInterval(jsDD._checkScroll, jsDD.scrollViewConfig.checkerTimeout);
		}

		BX.bind(document, 'keypress', this._checkEsc);
	},

	drag: function(e)
	{
		if (jsDD.bDisable)
			return true;

		e = e || window.event;

		jsDD.x = e.clientX + jsDD.wndSize.scrollLeft;
		jsDD.y = e.clientY + jsDD.wndSize.scrollTop;

		if (!jsDD.bStarted)
		{
			var delta = 5;
			if(jsDD.x >= jsDD.start_x-delta && jsDD.x <= jsDD.start_x+delta && jsDD.y >= jsDD.start_y-delta && jsDD.y <= jsDD.start_y+delta)
				return true;

			jsDD.start();
		}

		if (jsDD.current_node.onbxdrag)
		{
			jsDD.current_node.onbxdrag(jsDD.x, jsDD.y, e);
		}

		var containersScroll = jsDD.getContainersScrollPos(jsDD.x, jsDD.y);
		var current_dest_index = jsDD.searchDest(jsDD.x+containersScroll.left, jsDD.y+containersScroll.top);

		if (current_dest_index !== jsDD.current_dest_index)
		{
			if (jsDD.current_dest_index !== false)
			{
				if (jsDD.current_node.onbxdraghout)
					jsDD.current_node.onbxdraghout(jsDD.arDestinations[jsDD.current_dest_index], jsDD.x, jsDD.y);

				if (jsDD.arDestinations[jsDD.current_dest_index].onbxdestdraghout)
					jsDD.arDestinations[jsDD.current_dest_index].onbxdestdraghout(jsDD.current_node, jsDD.x, jsDD.y);
			}

			if (current_dest_index !== false)
			{
				if (jsDD.current_node.onbxdraghover)
					jsDD.current_node.onbxdraghover(jsDD.arDestinations[current_dest_index], jsDD.x, jsDD.y);

				if (jsDD.arDestinations[current_dest_index].onbxdestdraghover)
					jsDD.arDestinations[current_dest_index].onbxdestdraghover(jsDD.current_node, jsDD.x, jsDD.y);
			}
		}

		jsDD.current_dest_index = current_dest_index;
	},

	stopDrag: function(e)
	{
		BX.unbind(document, 'keypress', jsDD._checkEsc);

		e = e || window.event;

		jsDD.bPreStarted = false;

		if (jsDD.bStarted)
		{
			if (!jsDD.bEscPressed)
			{
				jsDD.x = e.clientX + jsDD.wndSize.scrollLeft;
				jsDD.y = e.clientY + jsDD.wndSize.scrollTop;
			}

			if (null != jsDD.current_node.onbxdragstop)
				jsDD.current_node.onbxdragstop(jsDD.x, jsDD.y, e);

			var containersScroll = jsDD.getContainersScrollPos(jsDD.x, jsDD.y);
			var dest_index = jsDD.searchDest(jsDD.x+containersScroll.left, jsDD.y+containersScroll.top);

			if (false !== dest_index)
			{
				if (jsDD.bEscPressed)
				{
					if (null != jsDD.arDestinations[dest_index].onbxdestdraghout)
					{
						if (!jsDD.arDestinations[dest_index].onbxdestdraghout(jsDD.current_node, jsDD.x, jsDD.y))
							dest_index = false;
						else
						{
							if (null != jsDD.current_node.onbxdragfinish)
								jsDD.current_node.onbxdragfinish(jsDD.arDestinations[dest_index], jsDD.x, jsDD.y);
						}
					}

				}
				else
				{
					if (null != jsDD.arDestinations[dest_index].onbxdestdragfinish)
					{
						if (!jsDD.arDestinations[dest_index].onbxdestdragfinish(jsDD.current_node, jsDD.x, jsDD.y, e))
							dest_index = false;
						else
						{
							if (null != jsDD.current_node.onbxdragfinish)
								jsDD.current_node.onbxdragfinish(jsDD.arDestinations[dest_index], jsDD.x, jsDD.y);
						}
					}
				}
			}

			if (false === dest_index)
			{
				if (null != jsDD.current_node.onbxdragrelease)
					jsDD.current_node.onbxdragrelease(jsDD.x, jsDD.y);
			}
			else
			{
				for (var i = 0, cnt = jsDD.arDestinations.length; i < cnt; i++)
				{
					if (i != dest_index && jsDD.arDestinations[i] && null != jsDD.arDestinations[i].onbxdestdragrelease)
						jsDD.arDestinations[i].onbxdestdragrelease(jsDD.current_node, jsDD.x, jsDD.y);
				}
			}

			for (var i = 0, cnt = jsDD.arDestinations.length; i < cnt; i++)
			{
				if (jsDD.arDestinations[i] && null != jsDD.arDestinations[i].onbxdestdragstop)
					jsDD.arDestinations[i].onbxdestdragstop(jsDD.current_node, jsDD.x, jsDD.y);
			}
		}

		if(document.body.releaseCapture)
			document.body.releaseCapture();

		BX.unbind(window, 'scroll', jsDD._onscroll);
		BX.unbind(document, "mousemove", jsDD.drag);
		BX.unbind(document, "touchmove", jsDD.drag);
		BX.unbind(document, "keypress", jsDD._checkEsc);
		BX.unbind(document, "mouseup", jsDD.stopDrag);
		BX.unbind(document, "touchend", jsDD.stopDrag);

		jsDD.allowSelection();
		document.body.style.cursor = '';

		jsDD.current_node = null;
		jsDD.current_dest_index = false;

		if (jsDD.bScrollWindow)
		{
			if (jsDD.scrollViewTimer)
				clearInterval(jsDD.scrollViewTimer);
		}

		if (jsDD.bStarted && !jsDD.bDisableDestRefresh)
			jsDD.refreshDestArea();

		jsDD.bStarted = false;
		jsDD.bEscPressed = false;
	},

	searchDest: function(x, y)
	{
		var p, len, p1, len1, i;
		for (p = 0, len = jsDD.arDestinationsPriority.length; p < len; p++)
		{
			if (jsDD.arDestinationsPriority[p] && BX.type.isArray(jsDD.arDestinationsPriority[p]))
			{
				for (p1 = 0, len1 = jsDD.arDestinationsPriority[p].length; p1 < len1; p1++)
				{
					i = jsDD.arDestinationsPriority[p][p1];
					if (jsDD.arDestinations[i] && !jsDD.arDestinations[i].__bxdddisabled)
					{
						if (
							jsDD.arDestinations[i].__bxpos[0] <= x &&
							jsDD.arDestinations[i].__bxpos[2] >= x &&

							jsDD.arDestinations[i].__bxpos[1] <= y &&
							jsDD.arDestinations[i].__bxpos[3] >= y
							)
						{
							return i;
						}
					}
				}
			}
		}

		return false;
	},

	allowSelection: function()
	{
		document.onmousedown = document.ontouchstart = null;
		var b = document.body;
		b.ondrag = null;
		b.onselectstart = null;
		b.style.MozUserSelect = '';

		if (jsDD.current_node)
		{
			jsDD.current_node.ondrag = null;
			jsDD.current_node.onselectstart = null;
			jsDD.current_node.style.MozUserSelect = '';
		}
	},

	denySelection: function()
	{
		document.onmousedown = document.ontouchstart = BX.False;
		var b = document.body;
		b.ondrag = BX.False;
		b.onselectstart = BX.False;
		b.style.MozUserSelect = 'none';
		if (jsDD.current_node)
		{
			jsDD.current_node.ondrag = BX.False;
			jsDD.current_node.onselectstart = BX.False;
			jsDD.current_node.style.MozUserSelect = 'none';
		}
	},

	Disable: function() {jsDD.bDisable = true;},
	Enable: function() {jsDD.bDisable = false;}
}

})();

/* End */
;
; /* Start:"a:4:{s:4:"full";s:46:"/bitrix/js/main/core/core_dd.js?15956917723613";s:6:"source";s:31:"/bitrix/js/main/core/core_dd.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(window){
BX.DD = function(params)
{
	return new BX.DD.dragdrop(params);
}

BX.DD.allowSelection = function()
{
	document.onmousedown = null;
	var b = document.body;
	b.ondrag = null;
	b.onselectstart = null;
	b.style.MozUserSelect = '';
	
	// if (jsDD.current_node)
	// {
		// jsDD.current_node.ondrag = null;
		// jsDD.current_node.onselectstart = null;
		// jsDD.current_node.style.MozUserSelect = '';
	// }
}
	
BX.DD.denySelection = function()
{
	document.onmousedown = BX.False;
	var b = document.body;
	b.ondrag = BX.False;
	b.onselectstart = BX.False;
	b.style.MozUserSelect = 'none';
	// if (jsDD.current_node) 
	// {
		// jsDD.current_node.ondrag = jsUtils.False;
		// jsDD.current_node.onselectstart = jsUtils.False;
		// jsDD.current_node.style.MozUserSelect = 'none';
	// }
}

BX.DD.dragdrop = function(params)
{


}

/*
 * BX.DD.dropFiles - for html5 drag and drop files
 *
 * example:
 *
 * BX(function() {
 *	  var dropBoxNode = BX('WebDAV23');
 *    var dropbox = new BX.DD.dropFiles(dropBoxNode);
 *    if (dropbox && dropbox.supported())
 *    {
 *        BX.addCustomEvent(dropbox, 'dropFiles', function(files) { WDUploadDroppedFiles(files);});
 *        BX.addCustomEvent(dropbox, 'dragEnter', function() {BX.addClass( dropBoxNode, 'droptarget');});
 *        BX.addCustomEvent(dropbox, 'dragLeave', function() {BX.removeClass( dropBoxNode, 'droptarget');});
 *    }
 * });
 *
 * to save files use BX.ajax.FormData
 */
BX.DD.dropFiles = function(div)
{
	if (BX.type.isElementNode(div)
		&& this.supported())
	{
		div.setAttribute('dropzone', 'copy f:*/*');
		this.DIV = div;
		this._timer = null;
		this._initEvents();

		this._cancelLeave = function()
		{
			if (this._timer != null)
			{
				clearTimeout(this._timer);
				this._timer = null;
			}
		}
		this._prepareLeave = function()
		{
			this._cancelLeave();
			this._timer = setTimeout( BX.delegate(function() {
				BX.onCustomEvent(this, 'dragLeave')
			}, this), 100);
		}

		return this;
	}
	return false;
}

BX.DD.dropFiles.prototype._initEvents = function()
{
	BX.bind(this.DIV, 'dragover', BX.proxy(this._dragOver, this));
	BX.bind(this.DIV, 'dragenter', BX.proxy(this._dragEnter, this));
	BX.bind(this.DIV, 'dragleave', BX.proxy(this._dragLeave, this));
	BX.bind(this.DIV, 'dragexit', BX.proxy(this._dragExit, this));
	BX.bind(this.DIV, 'drop', BX.proxy(this._drop, this));
}

BX.DD.dropFiles.prototype._dragEnter = function(e)
{
	BX.PreventDefault(e);
	this._cancelLeave();
	BX.onCustomEvent(this, 'dragEnter', [e]);
	return true;
}

BX.DD.dropFiles.prototype._dragExit = function(e)
{
	BX.PreventDefault(e);
	this._prepareLeave();
	return false;
}


BX.DD.dropFiles.prototype._dragLeave = function(e)
{
	BX.PreventDefault(e);
	this._prepareLeave();
	return false;
}

BX.DD.dropFiles.prototype._dragOver = function(e)
{
	BX.PreventDefault(e);
	this._cancelLeave();
	return true;
}

BX.DD.dropFiles.prototype._drop = function(e)
{
	BX.PreventDefault(e);
	var dt = e.dataTransfer;
	var files = dt.files;
	BX.onCustomEvent(this, 'dropFiles', [files, e]);
	BX.onCustomEvent(this, 'dragLeave')
	return false;
}

BX.DD.dropFiles.prototype.isEventSupported = function(event)
{
	var div = BX.create('DIV');
	var eventName = 'on'+event;
	var result = (eventName in div);
	
	if (!result && div.setAttribute && div.removeAttribute)
	{
		div.setAttribute(eventName, '');
		result = (typeof div[eventName] === 'function');
	}

	div = null;
	return result;
}

BX.DD.dropFiles.prototype.supported = function()
{
	return ( (!!window.FileReader) && this.isEventSupported('dragstart') && this.isEventSupported('drop') );
}

})(window)


/* End */
;
//# sourceMappingURL=kernel_main.map.js