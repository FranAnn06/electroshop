
; /* Start:"a:4:{s:4:"full";s:97:"/local/templates/shop/components/bitrix/catalog.section/Catalog_elem/script.min.js?15963763005563";s:6:"source";s:78:"/local/templates/shop/components/bitrix/catalog.section/Catalog_elem/script.js";s:3:"min";s:82:"/local/templates/shop/components/bitrix/catalog.section/Catalog_elem/script.min.js";s:3:"map";s:82:"/local/templates/shop/components/bitrix/catalog.section/Catalog_elem/script.map.js";}"*/
(function(){"use strict";if(!!window.JCCatalogSectionComponent)return;window.JCCatalogSectionComponent=function(t){this.formPosting=false;this.siteId=t.siteId||"";this.ajaxId=t.ajaxId||"";this.template=t.template||"";this.componentPath=t.componentPath||"";this.parameters=t.parameters||"";if(t.navParams){this.navParams={NavNum:t.navParams.NavNum||1,NavPageNomer:parseInt(t.navParams.NavPageNomer)||1,NavPageCount:parseInt(t.navParams.NavPageCount)||1}}this.bigData=t.bigData||{enabled:false};this.container=document.querySelector('[data-entity="'+t.container+'"]');this.showMoreButton=null;this.showMoreButtonMessage=null;if(this.bigData.enabled&&BX.util.object_keys(this.bigData.rows).length>0){BX.cookie_prefix=this.bigData.js.cookiePrefix||"";BX.cookie_domain=this.bigData.js.cookieDomain||"";BX.current_server_time=this.bigData.js.serverTime;BX.ready(BX.delegate(this.bigDataLoad,this))}if(t.initiallyShowHeader){BX.ready(BX.delegate(this.showHeader,this))}if(t.deferredLoad){BX.ready(BX.delegate(this.deferredLoad,this))}if(t.lazyLoad){this.showMoreButton=document.querySelector('[data-use="show-more-'+this.navParams.NavNum+'"]');this.showMoreButtonMessage=this.showMoreButton.innerHTML;BX.bind(this.showMoreButton,"click",BX.proxy(this.showMore,this))}if(t.loadOnScroll){BX.bind(window,"scroll",BX.proxy(this.loadOnScroll,this))}};window.JCCatalogSectionComponent.prototype={checkButton:function(){if(this.showMoreButton){if(this.navParams.NavPageNomer==this.navParams.NavPageCount){BX.remove(this.showMoreButton)}else{this.container.appendChild(this.showMoreButton)}}},enableButton:function(){if(this.showMoreButton){BX.removeClass(this.showMoreButton,"disabled");this.showMoreButton.innerHTML=this.showMoreButtonMessage}},disableButton:function(){if(this.showMoreButton){BX.addClass(this.showMoreButton,"disabled");this.showMoreButton.innerHTML=BX.message("BTN_MESSAGE_LAZY_LOAD_WAITER")}},loadOnScroll:function(){var t=BX.GetWindowScrollPos().scrollTop,e=BX.pos(this.container).bottom;if(t+window.innerHeight>e){this.showMore()}},showMore:function(){if(this.navParams.NavPageNomer<this.navParams.NavPageCount){var t={};t["action"]="showMore";t["PAGEN_"+this.navParams.NavNum]=this.navParams.NavPageNomer+1;if(!this.formPosting){this.formPosting=true;this.disableButton();this.sendRequest(t)}}},bigDataLoad:function(){var t="https://analytics.bitrix.info/crecoms/v1_0/recoms.php",e=BX.ajax.prepareData(this.bigData.params);if(e){t+=(t.indexOf("?")!==-1?"&":"?")+e}var a=BX.delegate(function(t){this.sendRequest({action:"deferredLoad",bigData:"Y",items:t&&t.items||[],rid:t&&t.id,count:this.bigData.count,rowsRange:this.bigData.rowsRange,shownIds:this.bigData.shownIds})},this);BX.ajax({method:"GET",dataType:"json",url:t,timeout:3,onsuccess:a,onfailure:a})},deferredLoad:function(){this.sendRequest({action:"deferredLoad"})},sendRequest:function(t){var e={siteId:this.siteId,template:this.template,parameters:this.parameters};if(this.ajaxId){e.AJAX_ID=this.ajaxId}BX.ajax({url:this.componentPath+"/ajax.php"+(document.location.href.indexOf("clear_cache=Y")!==-1?"?clear_cache=Y":""),method:"POST",dataType:"json",timeout:60,data:BX.merge(e,t),onsuccess:BX.delegate(function(e){if(!e||!e.JS)return;BX.ajax.processScripts(BX.processHTML(e.JS).SCRIPT,false,BX.delegate(function(){this.showAction(e,t)},this))},this)})},showAction:function(t,e){if(!e)return;switch(e.action){case"showMore":this.processShowMoreAction(t);break;case"deferredLoad":this.processDeferredLoadAction(t,e.bigData==="Y");break}},processShowMoreAction:function(t){this.formPosting=false;this.enableButton();if(t){this.navParams.NavPageNomer++;this.processItems(t.items);this.processPagination(t.pagination);this.processEpilogue(t.epilogue);this.checkButton()}},processDeferredLoadAction:function(t,e){if(!t)return;var a=e?this.bigData.rows:{};this.processItems(t.items,BX.util.array_keys(a))},processItems:function(t,e){if(!t)return;var a=BX.processHTML(t,false),i=BX.create("DIV");var s,o,n;i.innerHTML=a.HTML;s=i.querySelectorAll('[data-entity="items-row"]');if(s.length){this.showHeader(true);for(o in s){if(s.hasOwnProperty(o)){n=e?this.container.querySelectorAll('[data-entity="items-row"]'):false;s[o].style.opacity=0;if(n&&BX.type.isDomNode(n[e[o]])){n[e[o]].parentNode.insertBefore(s[o],n[e[o]])}else{this.container.appendChild(s[o])}}}new BX.easing({duration:2e3,start:{opacity:0},finish:{opacity:100},transition:BX.easing.makeEaseOut(BX.easing.transitions.quad),step:function(t){for(var e in s){if(s.hasOwnProperty(e)){s[e].style.opacity=t.opacity/100}}},complete:function(){for(var t in s){if(s.hasOwnProperty(t)){s[t].removeAttribute("style")}}}}).animate()}BX.ajax.processScripts(a.SCRIPT)},processPagination:function(t){if(!t)return;var e=document.querySelectorAll('[data-pagination-num="'+this.navParams.NavNum+'"]');for(var a in e){if(e.hasOwnProperty(a)){e[a].innerHTML=t}}},processEpilogue:function(t){if(!t)return;var e=BX.processHTML(t,false);BX.ajax.processScripts(e.SCRIPT)},showHeader:function(t){var e=BX.findParent(this.container,{attr:{"data-entity":"parent-container"}}),a;if(e&&BX.type.isDomNode(e)){a=e.querySelector('[data-entity="header"]');if(a&&a.getAttribute("data-showed")!="true"){a.style.display="";if(t){new BX.easing({duration:2e3,start:{opacity:0},finish:{opacity:100},transition:BX.easing.makeEaseOut(BX.easing.transitions.quad),step:function(t){a.style.opacity=t.opacity/100},complete:function(){a.removeAttribute("style");a.setAttribute("data-showed","true")}}).animate()}else{a.style.opacity=100}}}}}})();
/* End */
;; /* /local/templates/shop/components/bitrix/catalog.section/Catalog_elem/script.min.js?15963763005563*/

//# sourceMappingURL=page_3298b669f3c398c2bdfcf8b49f433c19.map.js