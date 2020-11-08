
; /* Start:"a:4:{s:4:"full";s:93:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/script.min.js?159569210822553";s:6:"source";s:73:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/script.js";s:3:"min";s:77:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/script.min.js";s:3:"map";s:77:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/script.map.js";}"*/
BasketPoolQuantity=function(){this.processing=false;this.poolQuantity={};this.updateTimer=null;this.currentQuantity={};this.lastStableQuantities={};this.updateQuantity()};BasketPoolQuantity.prototype.updateQuantity=function(){var e=BX("basket_items");if(basketJSParams["USE_ENHANCED_ECOMMERCE"]==="Y"){checkAnalytics(this.lastStableQuantities,e)}if(!!e&&e.rows.length>0){for(var t=1;e.rows.length>t;t++){var a=e.rows[t].id;this.currentQuantity[a]=BX("QUANTITY_"+a).value}}this.lastStableQuantities=BX.clone(this.currentQuantity,true)};BasketPoolQuantity.prototype.changeQuantity=function(e){var t=BX("QUANTITY_"+e).value;var a=this.isPoolEmpty();if(this.currentQuantity[e]&&this.currentQuantity[e]!=t){this.poolQuantity[e]=this.currentQuantity[e]=t}if(!a){this.enableTimer(true)}else{this.trySendPool()}};BasketPoolQuantity.prototype.trySendPool=function(){if(!this.isPoolEmpty()&&!this.isProcessing()){this.enableTimer(false);recalcBasketAjax({})}};BasketPoolQuantity.prototype.isPoolEmpty=function(){return Object.keys(this.poolQuantity).length==0};BasketPoolQuantity.prototype.clearPool=function(){this.poolQuantity={}};BasketPoolQuantity.prototype.isProcessing=function(){return this.processing===true};BasketPoolQuantity.prototype.setProcessing=function(e){this.processing=e===true};BasketPoolQuantity.prototype.enableTimer=function(e){clearTimeout(this.updateTimer);if(e===false)return;this.updateTimer=setTimeout(function(){basketPoolQuantity.trySendPool()},1500)};function updateBasketTable(e,t){var a=BX("basket_items"),i,s,l,r,n,o,_=false,u=false,c=false,d=false,p,T,f,A,b,B,y,E,m,X,v,h,I,S,k,D,N,P,C,g,U,O,R,L,Q,M,Y,x,F,w,H,K,V,j,W,G,J,q,z,Z,$,ee,te;if(!a||typeof t!=="object"){return}i=a.rows;r=i[i.length-1];p=t.PARAMS.QUANTITY_FLOAT==="Y";if(e!==null&&!!t.BASKET_DATA){T=BX(e);s=t.BASKET_ID;te=BX.type.isPlainObject(t.BASKET_DATA.GRID.ROWS[s]);if(te){l=t.BASKET_DATA.GRID.ROWS[s];n=document.createElement("tr");n.setAttribute("id",t.BASKET_ID);n.setAttribute("data-item-name",l["NAME"]);n.setAttribute("data-item-brand",l[basketJSParams["BRAND_PROPERTY"]+"_VALUE"]);n.setAttribute("data-item-price",l["PRICE"]);n.setAttribute("data-item-currency",l["CURRENCY"]);r.parentNode.insertBefore(n,T.nextSibling)}if(t.DELETE_ORIGINAL==="Y"){T.parentNode.removeChild(T)}if(te){f=n.insertCell(-1);f.setAttribute("class","margin");o=t.COLUMNS.split(",");for(A=0;A<o.length;A++){if(o[A]==="DELETE"){_=true}else if(o[A]==="DELAY"){u=true}else if(o[A]==="PROPS"){c=true}else if(o[A]==="TYPE"){d=true}}for(A=0;A<o.length;A++){switch(o[A]){case"PROPS":case"DELAY":case"DELETE":case"TYPE":break;case"NAME":b=n.insertCell(-1);B="";y="";b.setAttribute("class","itemphoto");if(l.PREVIEW_PICTURE_SRC.length>0){B=l.PREVIEW_PICTURE_SRC}else if(l.DETAIL_PICTURE_SRC.length>0){B=l.DETAIL_PICTURE_SRC}else{B=basketJSParams.TEMPLATE_FOLDER+"/images/no_photo.png"}if(l.DETAIL_PAGE_URL.length>0){y='<div class="bx_ordercart_photo_container">							<a href="'+l.DETAIL_PAGE_URL+'">								<div class="bx_ordercart_photo" style="background-image:url(\''+B+"')\"></div>							</a>						</div>"}else{y='<div class="bx_ordercart_photo_container">							<div class="bx_ordercart_photo" style="background-image:url(\''+B+"')\"></div>						</div>"}if(l.BRAND&&l.BRAND.length>0){y+='<div class="bx_ordercart_brand">							<img alt="" src="'+l.BRAND+'"/>						</div>'}b.innerHTML=y;E=n.insertCell(-1);m="";E.setAttribute("class","item");if(l["DETAIL_PAGE_URL"].length>0)m+='<h2 class="bx_ordercart_itemtitle"><a href="'+l["DETAIL_PAGE_URL"]+'">'+l["NAME"]+"</a></h2>";else m+='<h2 class="bx_ordercart_itemtitle">'+l["NAME"]+"</h2>";m+='<div class="bx_ordercart_itemart">';if(c){for(v=0;v<l["PROPS"].length;v++){h=l["PROPS"][v];if(l.SKU_DATA){X=false;for(I in l.SKU_DATA){if(l.SKU_DATA.hasOwnProperty(I)){S=l.SKU_DATA[I];if(S["CODE"]===h["CODE"]){X=true;break}}}if(X)continue}m+=BX.util.htmlspecialchars(h["NAME"])+":&nbsp;<span>"+h["VALUE"]+"</span><br/>"}}m+="</div>";if(l.SKU_DATA){z={};for(Q=0;Q<l["PROPS"].length;Q++){M=l["PROPS"][Q];z[M["CODE"]]=BX.type.isNotEmptyString(M["~VALUE"])?M["~VALUE"]:M["VALUE"]}for(I in l.SKU_DATA){if(l.SKU_DATA.hasOwnProperty(I)){Z=0;S=l.SKU_DATA[I];k=false;D=BX.util.array_keys(S["VALUES"]).length;if(D>5){N="full";P=D*20+"%";C=100/D+"%"}else{N="";P="100%";C="20%"}$=0;for(U in S["VALUES"]){$++;g=S["VALUES"][U];if(BX.type.isNotEmptyString(z[S["CODE"]])){if(z[S["CODE"]]==g["NAME"]||z[S["CODE"]]==g["XML_ID"])Z=$}if(!!g&&typeof g==="object"&&!!g["PICT"]){k=true}}ee="0";if(N!==""&&Z>5)ee=(5-Z)*20+"%";if(k){m+='<div class="bx_item_detail_scu_small_noadaptive '+N+'">';m+='<span class="bx_item_section_name_gray">'+BX.util.htmlspecialchars(S["NAME"])+"</span>";m+='<div class="bx_scu_scroller_container">';m+='<div class="bx_scu">';m+='<ul id="prop_'+S["CODE"]+"_"+l["ID"]+'" style="width: '+P+"; margin-left: "+ee+';" class="sku_prop_list">';$=0;for(L in S["VALUES"]){$++;O=S["VALUES"][L];R=Z==$?" bx_active":"";m+='<li style="width: '+C+"; padding-top: "+C+';"															class="sku_prop'+R+'" 															data-sku-selector="Y" 															data-value-id="'+O["XML_ID"]+'" 															data-sku-name="'+BX.util.htmlspecialchars(O["NAME"])+'" 															data-element="'+l["ID"]+'" 															data-property="'+S["CODE"]+'"															>															<a href="javascript:void(0)" class="cnt"><span class="cnt_item" style="background-image:url('+O["PICT"]["SRC"]+'"></span></a>														</li>'}m+="</ul>";m+="</div>";m+='<div class="bx_slide_left" onclick="leftScroll(\''+S["CODE"]+"', "+l["ID"]+", "+BX.util.array_keys(S["VALUES"]).length+');"></div>';m+='<div class="bx_slide_right" onclick="rightScroll(\''+S["CODE"]+"', "+l["ID"]+", "+BX.util.array_keys(S["VALUES"]).length+');"></div>';m+="</div>";m+="</div>"}else{m+='<div class="bx_item_detail_size_small_noadaptive '+N+'">';m+='<span class="bx_item_section_name_gray">'+BX.util.htmlspecialchars(S["NAME"])+"</span>";m+='<div class="bx_size_scroller_container">';m+='<div class="bx_size">';m+='<ul id="prop_'+S["CODE"]+"_"+l["ID"]+'" style="width: '+P+"; margin-left: "+ee+';" class="sku_prop_list">';$=0;for(L in S["VALUES"]){$++;O=S["VALUES"][L];R=Z==$?" bx_active":"";m+='<li style="width: '+C+';"															class="sku_prop '+R+'" 															data-sku-selector="Y" 															data-value-id="'+(S["TYPE"]==="S"&&S["USER_TYPE"]==="directory"?O["XML_ID"]:BX.util.htmlspecialchars(O["NAME"]))+'" 															data-sku-name="'+BX.util.htmlspecialchars(O["NAME"])+'" 															data-element="'+l["ID"]+'" 															data-property="'+S["CODE"]+'" 															>															<a href="javascript:void(0)" class="cnt">'+BX.util.htmlspecialchars(O["NAME"])+"</a>														</li>"}m+="</ul>";m+="</div>";m+='<div class="bx_slide_left" onclick="leftScroll(\''+S["CODE"]+"', "+l["ID"]+", "+BX.util.array_keys(S["VALUES"]).length+');"></div>';m+='<div class="bx_slide_right" onclick="rightScroll(\''+S["CODE"]+"', "+l["ID"]+", "+BX.util.array_keys(S["VALUES"]).length+');"></div>';m+="</div>";m+="</div>"}}}}E.innerHTML=m;break;case"QUANTITY":Y=n.insertCell(-1);x="";F=parseFloat(l["MEASURE_RATIO"])>0?l["MEASURE_RATIO"]:1;w=false;if(F!=0&&F!=""){H=l["QUANTITY"];l["QUANTITY"]=getCorrectRatioQuantity(l["QUANTITY"],F,p);if(H!=l["QUANTITY"]){w=true}}Y.setAttribute("class","custom");x+="<span>"+getColumnName(t,o[A])+":</span>";x+='<div class="centered">';x+='<table cellspacing="0" cellpadding="0" class="counter">';x+="<tr>";x+="<td>";x+='<input type="text" size="3" id="QUANTITY_INPUT_'+l["ID"]+'"											name="QUANTITY_INPUT_'+l["ID"]+'"											style="max-width: 50px"											value="'+l["QUANTITY"]+'"											onchange="updateQuantity(\'QUANTITY_INPUT_'+l["ID"]+"','"+l["ID"]+"', "+F+","+p+')"						>';x+="</td>";if(F!=0&&F!=""){x+='<td id="basket_quantity_control">							<div class="basket_quantity_control">								<a href="javascript:void(0);" class="plus" onclick="setQuantity('+l["ID"]+", "+F+", 'up', "+p+');"></a>								<a href="javascript:void(0);" class="minus" onclick="setQuantity('+l["ID"]+", "+F+", 'down', "+p+');"></a>							</div>						</td>'}if(l.hasOwnProperty("MEASURE_TEXT")&&l["MEASURE_TEXT"].length>0)x+='<td style="text-align: left">'+BX.util.htmlspecialchars(l["MEASURE_TEXT"])+"</td>";x+="</tr>";x+="</table>";x+="</div>";x+='<input type="hidden" id="QUANTITY_'+l["ID"]+'" name="QUANTITY_'+l["ID"]+'" value="'+l["QUANTITY"]+'" />';Y.innerHTML=x;if(w){updateQuantity("QUANTITY_INPUT_"+l["ID"],l["ID"],F,p)}break;case"PRICE":K=n.insertCell(-1);V=l["DISCOUNT_PRICE_PERCENT"]>0?l["FULL_PRICE_FORMATED"]:"";K.setAttribute("class","price");K.innerHTML='<div class="current_price" id="current_price_'+l["ID"]+'">'+l["PRICE_FORMATED"]+"</div>"+'<div class="old_price" id="old_price_'+l["ID"]+'">'+V+"</div>";if(d&&l["NOTES"].length>0){K.innerHTML+='<div class="type_price">'+basketJSParams["SALE_TYPE"]+"</div>";K.innerHTML+='<div class="type_price_value">'+l["NOTES"]+"</div>"}break;case"DISCOUNT":W=n.insertCell(-1);W.setAttribute("class","custom");W.innerHTML="<span>"+getColumnName(t,o[A])+":</span>";W.innerHTML+='<div id="discount_value_'+l["ID"]+'">'+l["DISCOUNT_PRICE_PERCENT_FORMATED"]+"</div>";break;case"WEIGHT":G=n.insertCell(-1);G.setAttribute("class","custom");G.innerHTML="<span>"+getColumnName(t,o[A])+":</span>";G.innerHTML+=l["WEIGHT_FORMATED"];break;default:J=n.insertCell(-1);q="";J.setAttribute("class","custom");J.innerHTML="<span>"+getColumnName(t,o[A])+":</span>";if(o[A]=="SUM")q+='<div id="sum_'+l["ID"]+'">';if(typeof l[o[A]]!="undefined"){q+=l[o[A]]}if(o[A]=="SUM")q+="</div>";J.innerHTML+=q;break}}if(_||u){var ae=n.insertCell(-1);ae.setAttribute("class","control");if(_)ae.innerHTML='<a href="'+basketJSParams["DELETE_URL"].replace("#ID#",l["ID"])+'">'+basketJSParams["SALE_DELETE"]+"</a><br />";if(u)ae.innerHTML+='<a href="'+basketJSParams["DELAY_URL"].replace("#ID#",l["ID"])+'">'+basketJSParams["SALE_DELAY"]+"</a>"}var ie=n.insertCell(-1);ie.setAttribute("class","margin")}}if(!!t.BASKET_DATA){for(j in t.BASKET_DATA.GRID.ROWS){if(t.BASKET_DATA.GRID.ROWS.hasOwnProperty(j)){var se=t.BASKET_DATA.GRID.ROWS[j];if(BX("discount_value_"+j))BX("discount_value_"+j).innerHTML=se.DISCOUNT_PRICE_PERCENT_FORMATED;if(BX("current_price_"+j))BX("current_price_"+j).innerHTML=se.PRICE_FORMATED;if(BX("old_price_"+j))BX("old_price_"+j).innerHTML=se.DISCOUNT_PRICE_PERCENT>0?se.FULL_PRICE_FORMATED:"";if(BX("sum_"+j))BX("sum_"+j).innerHTML=se.SUM;if(BX("QUANTITY_"+j)){BX("QUANTITY_INPUT_"+j).value=se.QUANTITY;BX("QUANTITY_INPUT_"+j).defaultValue=se.QUANTITY;BX("QUANTITY_"+j).value=se.QUANTITY}}}}if(!!t.BASKET_DATA)couponListUpdate(t.BASKET_DATA);if(t.hasOwnProperty("WARNING_MESSAGE")){var le="";for(A=t["WARNING_MESSAGE"].length-1;A>=0;A--)le+=t["WARNING_MESSAGE"][A]+"<br/>";BX("warning_message").innerHTML=le}if(!!t.BASKET_DATA){if(BX("allWeight_FORMATED"))BX("allWeight_FORMATED").innerHTML=t["BASKET_DATA"]["allWeight_FORMATED"].replace(/\s/g,"&nbsp;");if(BX("allSum_wVAT_FORMATED"))BX("allSum_wVAT_FORMATED").innerHTML=t["BASKET_DATA"]["allSum_wVAT_FORMATED"].replace(/\s/g,"&nbsp;");if(BX("allVATSum_FORMATED"))BX("allVATSum_FORMATED").innerHTML=t["BASKET_DATA"]["allVATSum_FORMATED"].replace(/\s/g,"&nbsp;");if(BX("allSum_FORMATED"))BX("allSum_FORMATED").innerHTML=t["BASKET_DATA"]["allSum_FORMATED"].replace(/\s/g,"&nbsp;");if(BX("PRICE_WITHOUT_DISCOUNT")){var re=t["BASKET_DATA"]["PRICE_WITHOUT_DISCOUNT"]!=t["BASKET_DATA"]["allSum_FORMATED"];BX("PRICE_WITHOUT_DISCOUNT").innerHTML=re?t["BASKET_DATA"]["PRICE_WITHOUT_DISCOUNT"].replace(/\s/g,"&nbsp;"):"";BX.style(BX("PRICE_WITHOUT_DISCOUNT").parentNode,"display",re?"table-row":"none")}BX.onCustomEvent("OnBasketChange")}}function couponCreate(e,t){var a="disabled";if(!BX.type.isElementNode(e))return;if(t.JS_STATUS==="BAD")a="bad";else if(t.JS_STATUS==="APPLYED")a="good";e.appendChild(BX.create("div",{props:{className:"bx_ordercart_coupon"},children:[BX.create("input",{props:{className:a,type:"text",value:t.COUPON,name:"OLD_COUPON[]"},attrs:{disabled:true,readonly:true}}),BX.create("span",{props:{className:a},attrs:{"data-coupon":t.COUPON}}),BX.create("div",{props:{className:"bx_ordercart_coupon_notes"},html:t.JS_CHECK_CODE})]}))}function couponListUpdate(e){var t,a,i,s,l,r,n,o;if(!!e&&typeof e!=="object"){return}t=BX("coupons_block");if(!!t){if(!!e.COUPON_LIST&&BX.type.isArray(e.COUPON_LIST)){i=BX("coupon");if(!!i){i.value=""}s=BX.findChildren(t,{tagName:"input",property:{name:"OLD_COUPON[]"}},true);if(!!s){if(BX.type.isElementNode(s)){s=[s]}for(r=0;r<e.COUPON_LIST.length;r++){l=false;o=-1;for(n=0;n<s.length;n++){if(s[n].value===e.COUPON_LIST[r].COUPON){l=true;o=n;s[n].couponUpdate=true;break}}if(l){a="disabled";if(e.COUPON_LIST[r].JS_STATUS==="BAD")a="bad";else if(e.COUPON_LIST[r].JS_STATUS==="APPLYED")a="good";BX.adjust(s[o],{props:{className:a}});BX.adjust(s[o].nextSibling,{props:{className:a}});BX.adjust(s[o].nextSibling.nextSibling,{html:e.COUPON_LIST[r].JS_CHECK_CODE})}else{couponCreate(t,e.COUPON_LIST[r])}}for(n=0;n<s.length;n++){if(typeof s[n].couponUpdate==="undefined"||!s[n].couponUpdate){BX.remove(s[n].parentNode);s[n]=null}else{s[n].couponUpdate=null}}}else{for(r=0;r<e.COUPON_LIST.length;r++){couponCreate(t,e.COUPON_LIST[r])}}}}t=null}function skuPropClickHandler(){var e=this,t,a,i={},s={},l,r,n,o,_;if(!!e&&e.hasAttribute("data-value-id")){BX.showWait();t=e.getAttribute("data-element");a=e.getAttribute("data-property");l=BX("action_var").value;i[a]=BX.util.htmlspecialcharsback(e.getAttribute("data-value-id"));if(BX.hasClass(e,"bx_active")){BX.closeWait();return}r=BX.findChildren(BX(t),{tagName:"ul",className:"sku_prop_list"},true);if(!!r&&r.length>0){for(n=0;r.length>n;n++){if(r[n].id!=="prop_"+a+"_"+t){o=BX.findChildren(BX(r[n].id),{tagName:"li",className:"bx_active"},true);if(!!o&&o.length>0){for(_=0;o.length>_;_++){if(o[_].hasAttribute("data-value-id")){i[o[_].getAttribute("data-property")]=BX.util.htmlspecialcharsback(o[_].getAttribute("data-value-id"))}}}}}}s={basketItemId:t,sessid:BX.bitrix_sessid(),site_id:BX.message("SITE_ID"),props:i,action_var:l,select_props:BX("column_headers").value,offers_props:BX("offers_props").value,quantity_float:BX("quantity_float").value,price_vat_show_value:BX("price_vat_show_value").value,hide_coupon:BX("hide_coupon").value,use_prepayment:BX("use_prepayment").value};s[l]="select_item";BX.ajax({url:"/bitrix/components/bitrix/sale.basket.basket/ajax.php",method:"POST",data:s,dataType:"json",onsuccess:function(e){BX.closeWait();updateBasketTable(t,e)}})}}function getColumnName(e,t){if(BX("col_"+t)){return BX.util.trim(BX("col_"+t).innerHTML)}else{return""}}function leftScroll(e,t,a){a=parseInt(a,10);var i=BX("prop_"+e+"_"+t);if(i){var s=parseInt(i.style.marginLeft,10);if(s<=-20)i.style.marginLeft=s+20+"%"}}function rightScroll(e,t,a){a=parseInt(a,10);var i=BX("prop_"+e+"_"+t);if(i){var s=parseInt(i.style.marginLeft,10);if(s>(5-a)*20)i.style.marginLeft=s-20+"%"}}function checkOut(){if(!!BX("coupon"))BX("coupon").disabled=true;BX("basket_form").submit();return true}function updateBasket(){recalcBasketAjax({})}function enterCoupon(){var e=BX("coupon");if(!!e&&!!e.value)recalcBasketAjax({coupon:e.value})}function updateQuantity(e,t,a,i){var s=BX(e).defaultValue,l=parseFloat(BX(e).value)||0,r=false,n=BX("auto_calculation")&&BX("auto_calculation").value=="Y"||!BX("auto_calculation");if(a===0||a==1){r=true}else{var o=l*1e4,_=a*1e4,u=o%_,c=parseInt(l);if(u===0){r=true}}var d=false;if(parseInt(l)!=parseFloat(l)){d=true}l=i===false&&d===false?parseInt(l):parseFloat(l).toFixed(4);l=correctQuantity(l);if(r){BX(e).defaultValue=l;BX("QUANTITY_INPUT_"+t).value=l;BX("QUANTITY_"+t).value=l;if(n){basketPoolQuantity.changeQuantity(t)}}else{l=getCorrectRatioQuantity(l,a,i);l=correctQuantity(l);if(l!=s){BX("QUANTITY_INPUT_"+t).value=l;BX("QUANTITY_"+t).value=l;if(n){basketPoolQuantity.changeQuantity(t)}}else{BX(e).value=s}}}function setQuantity(e,t,a,i){var s=parseFloat(BX("QUANTITY_INPUT_"+e).value),l;l=a=="up"?s+t:s-t;if(l<0)l=0;if(i){l=parseFloat(l).toFixed(4)}l=correctQuantity(l);if(t>0&&l<t){l=t}if(!i&&l!=l.toFixed(4)){l=parseFloat(l).toFixed(4)}l=getCorrectRatioQuantity(l,t,i);l=correctQuantity(l);BX("QUANTITY_INPUT_"+e).value=l;BX("QUANTITY_INPUT_"+e).defaultValue=l;updateQuantity("QUANTITY_INPUT_"+e,e,t,i)}function getCorrectRatioQuantity(e,t,a){var i=e*1e4,s=t*1e4,l=(e/t-(e/t).toFixed(0)).toFixed(6),r=e,n=false,o;t=parseFloat(t);if(l==0){return r}if(t!==0&&t!=1){for(o=t,max=parseFloat(e)+parseFloat(t);o<=max;o=parseFloat(parseFloat(o)+parseFloat(t)).toFixed(4)){r=o}}else if(t===1){r=e|0}if(parseInt(r,10)!=parseFloat(r)){n=true}r=a===false&&n===false?parseInt(r,10):parseFloat(r).toFixed(4);r=correctQuantity(r);return r}function correctQuantity(e){return parseFloat((e*1).toString())}function recalcBasketAjax(e){if(basketPoolQuantity.isProcessing()){return false}BX.showWait();var t={},a=BX("action_var").value,i=BX("basket_items"),s=BX("delayed_items"),l,r;l={sessid:BX.bitrix_sessid(),site_id:BX.message("SITE_ID"),props:t,action_var:a,select_props:BX("column_headers").value,offers_props:BX("offers_props").value,quantity_float:BX("quantity_float").value,price_vat_show_value:BX("price_vat_show_value").value,hide_coupon:BX("hide_coupon").value,use_prepayment:BX("use_prepayment").value};l[a]="recalculate";if(!!e&&typeof e==="object"){for(r in e){if(e.hasOwnProperty(r))l[r]=e[r]}}if(!!i&&i.rows.length>0){for(r=1;i.rows.length>r;r++)l["QUANTITY_"+i.rows[r].id]=BX("QUANTITY_"+i.rows[r].id).value}if(!!s&&s.rows.length>0){for(r=1;s.rows.length>r;r++)l["DELAY_"+s.rows[r].id]="Y"}basketPoolQuantity.setProcessing(true);basketPoolQuantity.clearPool();BX.ajax({url:"/bitrix/components/bitrix/sale.basket.basket/ajax.php",method:"POST",data:l,dataType:"json",onsuccess:function(t){BX.closeWait();basketPoolQuantity.setProcessing(false);if(e.coupon){if(!!t&&!!t.BASKET_DATA&&!!t.BASKET_DATA.NEED_TO_RELOAD_FOR_GETTING_GIFTS){BX.reload()}}if(basketPoolQuantity.isPoolEmpty()){updateBasketTable(null,t);basketPoolQuantity.updateQuantity()}else{basketPoolQuantity.enableTimer(true)}}})}function showBasketItemsList(e){BX.removeClass(BX("basket_toolbar_button"),"current");BX.removeClass(BX("basket_toolbar_button_delayed"),"current");BX.removeClass(BX("basket_toolbar_button_subscribed"),"current");BX.removeClass(BX("basket_toolbar_button_not_available"),"current");BX("normal_count").style.display="inline-block";BX("delay_count").style.display="inline-block";BX("subscribe_count").style.display="inline-block";BX("not_available_count").style.display="inline-block";if(e==2){if(BX("basket_items_list"))BX("basket_items_list").style.display="none";if(BX("basket_items_delayed")){BX("basket_items_delayed").style.display="block";BX.addClass(BX("basket_toolbar_button_delayed"),"current");BX("delay_count").style.display="none"}if(BX("basket_items_subscribed"))BX("basket_items_subscribed").style.display="none";if(BX("basket_items_not_available"))BX("basket_items_not_available").style.display="none"}else if(e==3){if(BX("basket_items_list"))BX("basket_items_list").style.display="none";if(BX("basket_items_delayed"))BX("basket_items_delayed").style.display="none";if(BX("basket_items_subscribed")){BX("basket_items_subscribed").style.display="block";BX.addClass(BX("basket_toolbar_button_subscribed"),"current");BX("subscribe_count").style.display="none"}if(BX("basket_items_not_available"))BX("basket_items_not_available").style.display="none"}else if(e==4){if(BX("basket_items_list"))BX("basket_items_list").style.display="none";if(BX("basket_items_delayed"))BX("basket_items_delayed").style.display="none";if(BX("basket_items_subscribed"))BX("basket_items_subscribed").style.display="none";if(BX("basket_items_not_available")){BX("basket_items_not_available").style.display="block";BX.addClass(BX("basket_toolbar_button_not_available"),"current");BX("not_available_count").style.display="none"}}else{if(BX("basket_items_list")){BX("basket_items_list").style.display="block";BX.addClass(BX("basket_toolbar_button"),"current");BX("normal_count").style.display="none"}if(BX("basket_items_delayed"))BX("basket_items_delayed").style.display="none";if(BX("basket_items_subscribed"))BX("basket_items_subscribed").style.display="none";if(BX("basket_items_not_available"))BX("basket_items_not_available").style.display="none"}}function deleteCoupon(){var e=this,t;if(BX.type.isElementNode(e)&&e.hasAttribute("data-coupon")){t=e.getAttribute("data-coupon");if(BX.type.isNotEmptyString(t)){recalcBasketAjax({delete_coupon:t})}}}function deleteProductRow(e){var t=BX.findParent(e,{tagName:"TR"}),a,i;if(t){a=BX("QUANTITY_"+t.id);if(a){i=getCurrentItemAnalyticsInfo(t,a.value)}}setAnalyticsDataLayer([],[i]);document.location.href=e.href;return false}function checkAnalytics(e,t){if(!e||!t||BX.util.array_values(e).length===0)return;var a,i,s={},l=[],r=[],n;if(!!t&&t.rows.length){for(n=1;t.rows.length>n;n++){a=t.rows[n].id;i=BX("QUANTITY_"+a).value-e[a];if(i!=0){s=getCurrentItemAnalyticsInfo(t.rows[n],i);if(i>0){l.push(s)}else{r.push(s)}}}}if(l.length||r.length){setAnalyticsDataLayer(l,r)}}function getCurrentItemAnalyticsInfo(e,t){if(!e)return;var a,i,s=[];var l={name:e.getAttribute("data-item-name")||"",id:e.id,price:e.getAttribute("data-item-price")||0,brand:(e.getAttribute("data-item-brand")||"").split(",  ").join("/"),variant:"",quantity:Math.abs(t)};a=e.querySelectorAll(".bx_active[data-sku-name]");for(i=0;i<a.length;i++){s.push(a[i].getAttribute("data-sku-name"))}l.variant=s.join("/");return l}function setAnalyticsDataLayer(e,t){window[basketJSParams["DATA_LAYER_NAME"]]=window[basketJSParams["DATA_LAYER_NAME"]]||[];if(e&&e.length){window[basketJSParams["DATA_LAYER_NAME"]].push({event:"addToCart",ecommerce:{currencyCode:getCurrencyCode(),add:{products:e}}})}if(t&&t.length){window[basketJSParams["DATA_LAYER_NAME"]].push({event:"removeFromCart",ecommerce:{currencyCode:getCurrencyCode(),remove:{products:t}}})}}function getCurrencyCode(){var e=BX("basket_items"),t,a="";if(e){t=e.querySelector("[data-item-currency");t&&(a=t.getAttribute("data-item-currency"))}return a}BX.ready(function(){basketPoolQuantity=new BasketPoolQuantity;var e=BX("coupons_block"),t=BX("basket_items");if(BX.type.isElementNode(e))BX.bindDelegate(e,"click",{attribute:"data-coupon"},deleteCoupon);if(BX.type.isElementNode(t))BX.bindDelegate(t,"click",{tagName:"li",attr:{"data-sku-selector":"Y"}},skuPropClickHandler);if(BX.type.isNotEmptyString(basketJSParams["EVENT_ONCHANGE_ON_START"])&&basketJSParams["EVENT_ONCHANGE_ON_START"]=="Y")BX.onCustomEvent("OnBasketChange")});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:97:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/mustache.min.js?15956921085835";s:6:"source";s:78:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/mustache.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function e(t,r){if(typeof exports==="object"&&exports&&typeof exports.nodeName!=="string"){r(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],r)}else{t.Mustache={};r(t.Mustache)}})(this,function e(t){var r=Object.prototype.toString;var n=Array.isArray||function e(t){return r.call(t)==="[object Array]"};function i(e){return typeof e==="function"}function s(e){return n(e)?"array":typeof e}function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e,t){return e!=null&&typeof e==="object"&&t in e}var u=RegExp.prototype.test;function l(e,t){return u.call(e,t)}var f=/\S/;function c(e){return!l(f,e)}var p={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function h(e){return String(e).replace(/[&<>"'`=\/]/g,function e(t){return p[t]})}var v=/\s*/;var d=/\s+/;var g=/\s*=/;var w=/\s*\}/;var y=/#|\^|\/|>|\{|&|=|!/;function x(e,r){if(!e)return[];var i=[];var s=[];var o=[];var u=false;var l=false;function f(){if(u&&!l){while(o.length)delete s[o.pop()]}else{o=[]}u=false;l=false}var p,h,x;function E(e){if(typeof e==="string")e=e.split(d,2);if(!n(e)||e.length!==2)throw new Error("Invalid tags: "+e);p=new RegExp(a(e[0])+"\\s*");h=new RegExp("\\s*"+a(e[1]));x=new RegExp("\\s*"+a("}"+e[1]))}E(r||t.tags);var U=new m(e);var T,j,S,V,C,A;while(!U.eos()){T=U.pos;S=U.scanUntil(p);if(S){for(var I=0,R=S.length;I<R;++I){V=S.charAt(I);if(c(V)){o.push(s.length)}else{l=true}s.push(["text",V,T,T+1]);T+=1;if(V==="\n")f()}}if(!U.scan(p))break;u=true;j=U.scan(y)||"name";U.scan(v);if(j==="="){S=U.scanUntil(g);U.scan(g);U.scanUntil(h)}else if(j==="{"){S=U.scanUntil(x);U.scan(w);U.scanUntil(h);j="&"}else{S=U.scanUntil(h)}if(!U.scan(h))throw new Error("Unclosed tag at "+U.pos);C=[j,S,T,U.pos];s.push(C);if(j==="#"||j==="^"){i.push(C)}else if(j==="/"){A=i.pop();if(!A)throw new Error('Unopened section "'+S+'" at '+T);if(A[1]!==S)throw new Error('Unclosed section "'+A[1]+'" at '+T)}else if(j==="name"||j==="{"||j==="&"){l=true}else if(j==="="){E(S)}}A=i.pop();if(A)throw new Error('Unclosed section "'+A[1]+'" at '+U.pos);return b(k(s))}function k(e){var t=[];var r,n;for(var i=0,s=e.length;i<s;++i){r=e[i];if(r){if(r[0]==="text"&&n&&n[0]==="text"){n[1]+=r[1];n[3]=r[3]}else{t.push(r);n=r}}}return t}function b(e){var t=[];var r=t;var n=[];var i,s;for(var a=0,o=e.length;a<o;++a){i=e[a];switch(i[0]){case"#":case"^":r.push(i);n.push(i);r=i[4]=[];break;case"/":s=n.pop();s[5]=i[2];r=n.length>0?n[n.length-1][4]:t;break;default:r.push(i)}}return t}function m(e){this.string=e;this.tail=e;this.pos=0}m.prototype.eos=function e(){return this.tail===""};m.prototype.scan=function e(t){var r=this.tail.match(t);if(!r||r.index!==0)return"";var n=r[0];this.tail=this.tail.substring(n.length);this.pos+=n.length;return n};m.prototype.scanUntil=function e(t){var r=this.tail.search(t),n;switch(r){case-1:n=this.tail;this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,r);this.tail=this.tail.substring(r)}this.pos+=n.length;return n};function E(e,t){this.view=e;this.cache={".":this.view};this.parent=t}E.prototype.push=function e(t){return new E(t,this)};E.prototype.lookup=function e(t){var r=this.cache;var n;if(r.hasOwnProperty(t)){n=r[t]}else{var s=this,a,u,l=false;while(s){if(t.indexOf(".")>0){n=s.view;a=t.split(".");u=0;while(n!=null&&u<a.length){if(u===a.length-1)l=o(n,a[u]);n=n[a[u++]]}}else{n=s.view[t];l=o(s.view,t)}if(l)break;s=s.parent}r[t]=n}if(i(n))n=n.call(this.view);return n};function U(){this.cache={}}U.prototype.clearCache=function e(){this.cache={}};U.prototype.parse=function e(r,n){var i=this.cache;var s=i[r];if(s==null)s=i[r+":"+(n||t.tags).join(":")]=x(r,n);return s};U.prototype.render=function e(t,r,n){var i=this.parse(t);var s=r instanceof E?r:new E(r);return this.renderTokens(i,s,n,t)};U.prototype.renderTokens=function e(t,r,n,i){var s="";var a,o,u;for(var l=0,f=t.length;l<f;++l){u=undefined;a=t[l];o=a[0];if(o==="#")u=this.renderSection(a,r,n,i);else if(o==="^")u=this.renderInverted(a,r,n,i);else if(o===">")u=this.renderPartial(a,r,n,i);else if(o==="&")u=this.unescapedValue(a,r);else if(o==="name")u=this.escapedValue(a,r);else if(o==="text")u=this.rawValue(a);if(u!==undefined)s+=u}return s};U.prototype.renderSection=function e(t,r,s,a){var o=this;var u="";var l=r.lookup(t[1]);function f(e){return o.render(e,r,s)}if(!l)return;if(n(l)){for(var c=0,p=l.length;c<p;++c){u+=this.renderTokens(t[4],r.push(l[c]),s,a)}}else if(typeof l==="object"||typeof l==="string"||typeof l==="number"){u+=this.renderTokens(t[4],r.push(l),s,a)}else if(i(l)){if(typeof a!=="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(r.view,a.slice(t[3],t[5]),f);if(l!=null)u+=l}else{u+=this.renderTokens(t[4],r,s,a)}return u};U.prototype.renderInverted=function e(t,r,i,s){var a=r.lookup(t[1]);if(!a||n(a)&&a.length===0)return this.renderTokens(t[4],r,i,s)};U.prototype.renderPartial=function e(t,r,n){if(!n)return;var s=i(n)?n(t[1]):n[t[1]];if(s!=null)return this.renderTokens(this.parse(s),r,n,s)};U.prototype.unescapedValue=function e(t,r){var n=r.lookup(t[1]);if(n!=null)return n};U.prototype.escapedValue=function e(r,n){var i=n.lookup(r[1]);if(i!=null)return t.escape(i)};U.prototype.rawValue=function e(t){return t[1]};t.name="mustache.js";t.version="2.3.0";t.tags=["{{","}}"];var T=new U;t.clearCache=function e(){return T.clearCache()};t.parse=function e(t,r){return T.parse(t,r)};t.render=function e(t,r,n){if(typeof t!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+s(t)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return T.render(t,r,n)};t.to_html=function e(r,n,s,a){var o=t.render(r,n,s);if(i(a)){a(o)}else{return o}};t.escape=h;t.Scanner=m;t.Context=E;t.Writer=U;return t});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:100:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/action-pool.min.js?15956921084358";s:6:"source";s:81:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/action-pool.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(){"use strict";BX.namespace("BX.Sale.BasketActionPool");BX.Sale.BasketActionPool=function(t){this.component=t;this.requestProcessing=false;this.updateTimer=null;this.isBasketRefreshed=this.component.params.DEFERRED_REFRESH!=="Y";this.needFullRecalculation=this.component.params.DEFERRED_REFRESH==="Y";this.pool={};this.lastActualPool={};this.approvedAction=["QUANTITY","DELETE","RESTORE","DELAY","OFFER","MERGE_OFFER"];this.switchTimer()};BX.Sale.BasketActionPool.prototype.setRefreshStatus=function(t){this.isBasketRefreshed=!!t};BX.Sale.BasketActionPool.prototype.getRefreshStatus=function(){return this.isBasketRefreshed};BX.Sale.BasketActionPool.prototype.isItemInPool=function(t){return!!this.pool[t]};BX.Sale.BasketActionPool.prototype.clearLastActualQuantityPool=function(t){this.lastActualPool[t]&&delete this.lastActualPool[t].QUANTITY};BX.Sale.BasketActionPool.prototype.checkItemPoolBefore=function(t){if(!t)return;this.pool[t]=this.pool[t]||{}};BX.Sale.BasketActionPool.prototype.checkItemPoolAfter=function(t){if(!t||!this.pool[t])return;if(Object.keys(this.pool[t]).length===0){delete this.pool[t]}};BX.Sale.BasketActionPool.prototype.addCoupon=function(t){this.pool.COUPON=t;this.switchTimer()};BX.Sale.BasketActionPool.prototype.removeCoupon=function(t){this.checkItemPoolBefore("REMOVE_COUPON");this.pool.REMOVE_COUPON[t]=t;this.switchTimer()};BX.Sale.BasketActionPool.prototype.changeQuantity=function(t,o,e){this.checkItemPoolBefore(t);if(this.lastActualPool[t]&&this.lastActualPool[t].QUANTITY!==o||!this.lastActualPool[t]&&o!==e){this.pool[t].QUANTITY=o}else{this.pool[t]&&delete this.pool[t].QUANTITY}this.checkItemPoolAfter(t);this.switchTimer()};BX.Sale.BasketActionPool.prototype.deleteItem=function(t){this.checkItemPoolBefore(t);if(this.pool[t].RESTORE){delete this.pool[t].RESTORE}else{this.pool[t].DELETE="Y"}this.checkItemPoolAfter(t);this.switchTimer()};BX.Sale.BasketActionPool.prototype.restoreItem=function(t,o){this.checkItemPoolBefore(t);if(this.pool[t].DELETE==="Y"){delete this.pool[t].DELETE}else{this.pool[t].RESTORE=o}this.checkItemPoolAfter(t);this.switchTimer()};BX.Sale.BasketActionPool.prototype.addDelayed=function(t){this.checkItemPoolBefore(t);this.pool[t].DELAY="Y";this.checkItemPoolAfter(t);this.switchTimer()};BX.Sale.BasketActionPool.prototype.removeDelayed=function(t){this.checkItemPoolBefore(t);this.pool[t].DELAY="N";this.checkItemPoolAfter(t);this.switchTimer()};BX.Sale.BasketActionPool.prototype.changeSku=function(t,o,e){if(JSON.stringify(o)!==JSON.stringify(e)){this.checkItemPoolBefore(t);this.pool[t].OFFER=o}else{this.pool[t]&&delete this.pool[t].OFFER;this.checkItemPoolAfter(t)}this.switchTimer()};BX.Sale.BasketActionPool.prototype.mergeSku=function(t){this.checkItemPoolBefore(t);this.pool[t].MERGE_OFFER="Y";this.switchTimer()};BX.Sale.BasketActionPool.prototype.switchTimer=function(){clearTimeout(this.updateTimer);if(this.isProcessing()){return}if(this.isPoolEmpty()){this.component.editPostponedBasketItems();this.component.fireCustomEvents()}if(!this.isPoolEmpty()){this.updateTimer=setTimeout(BX.proxy(this.trySendPool,this),300)}else if(!this.getRefreshStatus()){this.trySendPool()}};BX.Sale.BasketActionPool.prototype.trySendPool=function(){if(this.isPoolEmpty()&&this.getRefreshStatus()){return}this.doProcessing(true);if(!this.isPoolEmpty()){this.component.sendRequest("recalculateAjax",{basket:this.getPoolData()});this.lastActualPool=this.pool;this.pool={}}else if(!this.getRefreshStatus()){this.component.sendRequest("refreshAjax",{fullRecalculation:this.needFullRecalculation?"Y":"N"});this.needFullRecalculation=false}};BX.Sale.BasketActionPool.prototype.getPoolData=function(){var t={},o=this.pool;if(o.COUPON){t.coupon=o.COUPON;delete o.COUPON}if(o.REMOVE_COUPON){t.delete_coupon=o.REMOVE_COUPON;delete o.REMOVE_COUPON}for(var e in o){if(o.hasOwnProperty(e)){for(var i in o[e]){if(o[e].hasOwnProperty(i)&&BX.util.in_array(i,this.approvedAction)){t[i+"_"+e]=o[e][i]}}}}return t};BX.Sale.BasketActionPool.prototype.isPoolEmpty=function(){return Object.keys(this.pool).length===0};BX.Sale.BasketActionPool.prototype.doProcessing=function(t){this.requestProcessing=t===true;if(this.requestProcessing){this.component.startLoader()}else{this.component.endLoader()}};BX.Sale.BasketActionPool.prototype.isProcessing=function(){return this.requestProcessing===true}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:96:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/filter.min.js?159569210810511";s:6:"source";s:76:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/filter.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(){"use strict";BX.namespace("BX.Sale.BasketFilter");BX.Sale.BasketFilter=function(t){this.component=t;this.activeFilterMode=false;this.filterTimer=null;this.mouseOverClearFilter=false;this.realShownItems=[];this.realSortedItems=[];this.realScrollTop=0;this.lastShownItemsHash="";this.currentFilter={query:"",similarHash:"",warning:false,notAvailable:false,delayed:false};if(this.component.useItemsFilter){this.bindEvents()}};BX.Sale.BasketFilter.prototype.bindEvents=function(){var t;var e=this.component.getEntity(this.component.getCacheNode(this.component.ids.itemListWrapper),"basket-filter");t=this.component.getEntity(e,"basket-filter-input");if(BX.type.isDomNode(t)){BX.bind(t,"focus",function(){e.style.flex=3});BX.bind(t,"blur",BX.delegate(function(){if(!this.mouseOverClearFilter){e.style.flex=""}},this));BX.bind(t,"keyup",BX.proxy(this.onFilterInput,this));BX.bind(t,"cut",BX.proxy(this.onFilterInput,this));BX.bind(t,"paste",BX.proxy(this.onFilterInput,this))}t=this.component.getEntity(e,"basket-filter-clear-btn");if(BX.type.isDomNode(t)){BX.bind(t,"mouseenter",BX.delegate(function(){this.mouseOverClearFilter=true},this));BX.bind(t,"mouseout",BX.delegate(function(){this.mouseOverClearFilter=false},this));BX.bind(t,"click",BX.delegate(function(){if(!this.filterInputEmpty()){this.clearFilterInput();this.onFilterChange()}e.style.flex=""},this))}};BX.Sale.BasketFilter.prototype.isActive=function(){return this.activeFilterMode};BX.Sale.BasketFilter.prototype.showFilterByName=function(t){if(!t)return;switch(t){case"not-available":this.showNotAvailableItemsFilter();break;case"delayed":this.showDelayItemsFilter();break;case"warning":this.showWarningItemsFilter();break;case"similar":this.showSimilarItemsFilter();break;case"all":default:this.clearAllFiltersExcept([]);this.onFilterChange()}};BX.Sale.BasketFilter.prototype.onFilterInput=function(){var t=BX.type.isDomNode(BX.proxy_context)?BX.util.trim(BX.proxy_context.value).toLowerCase():"";if(this.currentFilter.query!==t){this.currentFilter.query=t;this.onFilterChange()}};BX.Sale.BasketFilter.prototype.clearAllFiltersExcept=function(t){if(!t||!BX.type.isArray(t))return;!BX.util.in_array("input",t)&&this.clearFilterInput();!BX.util.in_array("warning",t)&&this.clearWarningItemsFilter();!BX.util.in_array("delayed",t)&&this.clearDelayItemsFilter();!BX.util.in_array("not-available",t)&&this.clearNotAvailableItemsFilter();if(!BX.util.in_array("similar",t)){this.clearSimilarItemsFilter();this.component.showSimilarCount(false)}};BX.Sale.BasketFilter.prototype.filterInputEmpty=function(){return this.currentFilter.query.length===0};BX.Sale.BasketFilter.prototype.clearFilterInput=function(){this.currentFilter.query="";var t=this.component.getEntity(this.component.getCacheNode(this.component.ids.itemListWrapper),"basket-filter-input");if(BX.type.isDomNode(t)){t.value=""}};BX.Sale.BasketFilter.prototype.addWarningItemsFilter=function(){this.currentFilter.warning=true};BX.Sale.BasketFilter.prototype.clearWarningItemsFilter=function(){this.currentFilter.warning=false};BX.Sale.BasketFilter.prototype.showWarningItemsFilter=function(){if(!this.currentFilter.warning){this.clearAllFiltersExcept(["warning"]);this.addWarningItemsFilter();this.onFilterChange()}};BX.Sale.BasketFilter.prototype.addDelayItemsFilter=function(){this.currentFilter.delayed=true};BX.Sale.BasketFilter.prototype.clearDelayItemsFilter=function(){this.currentFilter.delayed=false};BX.Sale.BasketFilter.prototype.showDelayItemsFilter=function(){if(!this.currentFilter.delayed){this.clearAllFiltersExcept(["delayed"]);this.addDelayItemsFilter();this.onFilterChange()}};BX.Sale.BasketFilter.prototype.addNotAvailableItemsFilter=function(){this.currentFilter.notAvailable=true};BX.Sale.BasketFilter.prototype.clearNotAvailableItemsFilter=function(){this.currentFilter.notAvailable=false};BX.Sale.BasketFilter.prototype.showNotAvailableItemsFilter=function(){if(!this.currentFilter.notAvailable){this.clearAllFiltersExcept(["not-available"]);this.addNotAvailableItemsFilter();this.onFilterChange()}};BX.Sale.BasketFilter.prototype.addSimilarItemsFilter=function(t){this.currentFilter.similarHash=t.HASH};BX.Sale.BasketFilter.prototype.clearSimilarItemsFilter=function(){this.currentFilter.similarHash=""};BX.Sale.BasketFilter.prototype.showSimilarItemsFilter=function(){var t=this.component.getItemDataByTarget(BX.proxy_context);if(this.currentFilter.similarHash!==t.HASH){this.clearAllFiltersExcept(["similar"]);this.addSimilarItemsFilter(t);this.onFilterChange()}};BX.Sale.BasketFilter.prototype.getTimeoutDuration=function(){return this.component.duration.filterTimer};BX.Sale.BasketFilter.prototype.onFilterChange=function(){this.component.showItemsOverlay();if(this.currentFilter.query.length||this.currentFilter.similarHash.length||this.currentFilter.warning||this.currentFilter.notAvailable||this.currentFilter.delayed){clearTimeout(this.filterTimer);this.filterTimer=setTimeout(BX.proxy(this.enableFilterMode,this),this.getTimeoutDuration())}else{this.disableFilterMode()}};BX.Sale.BasketFilter.prototype.enableFilterMode=function(){var t;if(!this.activeFilterMode){this.activeFilterMode=true;this.realShownItems=BX.util.array_values(this.component.shownItems);this.realSortedItems=BX.util.array_values(this.component.sortedItems);this.realScrollTop=this.component.getDocumentScrollTop()}this.component.scrollToFirstItem();this.component.sortedItems=this.searchItems();t=JSON.stringify(this.component.sortedItems);if(this.lastShownItemsHash!==t){this.lastShownItemsHash=t;this.component.deleteBasketItems(BX.util.array_values(this.component.shownItems),false);if(this.component.sortedItems.length){this.component.initializeBasketItems();this.hideEmptyFilterResult()}else{this.showEmptyFilterResult()}if(this.currentFilter.similarHash.length){this.component.showSimilarCount(true)}}else{this.highlightFoundItems()}this.component.hideItemsOverlay()};BX.Sale.BasketFilter.prototype.disableFilterMode=function(){clearTimeout(this.filterTimer);this.lastShownItemsHash="";if(this.activeFilterMode){this.activeFilterMode=false;this.component.sortedItems=BX.util.array_values(this.realSortedItems);this.component.deleteBasketItems(BX.util.array_values(this.component.shownItems),false);this.hideEmptyFilterResult();this.component.editBasketItems(BX.util.array_values(this.realShownItems));window.scrollTo(0,this.realScrollTop)}this.component.hideItemsOverlay()};BX.Sale.BasketFilter.prototype.searchItems=function(){var t=[];for(var e=0;e<this.realSortedItems.length;e++){var i=this.component.items[this.realSortedItems[e]];if(i&&this.searchItemMatch(i)){t.push(i.ID)}}return t};BX.Sale.BasketFilter.prototype.highlightFoundItems=function(){if(!this.activeFilterMode)return;for(var t in this.component.shownItems){if(this.component.shownItems.hasOwnProperty(t)){this.highlightSearchMatch(this.component.items[this.component.shownItems[t]])}}};BX.Sale.BasketFilter.prototype.searchItemMatch=function(t){var e=false,i=false;if(this.currentFilter.notAvailable){i=!!t.NOT_AVAILABLE;if(!i){return e}}else if(this.currentFilter.delayed){i=!!t.DELAYED;if(!i){return e}}else if(this.currentFilter.warning){i=BX.util.in_array(t.ID,this.component.warningItems);if(!i){return e}}else if(BX.type.isNotEmptyString(this.currentFilter.similarHash)){i=this.currentFilter.similarHash===t.HASH;if(!i){return e}}if(BX.type.isNotEmptyString(this.currentFilter.query)){if(t.NAME.toLowerCase().indexOf(this.currentFilter.query)!==-1){e="NAME"}if(!e){var r=parseFloat(this.currentFilter.query);if(!isNaN(r)){if(parseFloat(t.PRICE)===r){e="PRICE"}else if(parseFloat(t.SUM_PRICE)===r){e="SUM_PRICE"}}}if(!e&&this.currentFilter.query.length>=3){if(t.PRICE_FORMATED.toLowerCase().indexOf(this.currentFilter.query)!==-1){e="PRICE"}else if(t.SUM_PRICE_FORMATED.toLowerCase().indexOf(this.currentFilter.query)!==-1){e="SUM_PRICE"}}var s,l;if(!e&&t.PROPS.length){for(s in t.PROPS){if(t.PROPS.hasOwnProperty(s)&&BX.type.isNotEmptyString(t.PROPS[s].VALUE)){l=t.PROPS[s].VALUE.toLowerCase();if(l===this.currentFilter.query||this.currentFilter.query.length>=3&&l.indexOf(this.currentFilter.query)!==-1){e="PROPS";break}}}}if(!e&&t.COLUMN_LIST.length){for(s in t.COLUMN_LIST){if(t.COLUMN_LIST.hasOwnProperty(s)&&BX.type.isNotEmptyString(t.COLUMN_LIST[s].VALUE)){l=t.COLUMN_LIST[s].VALUE.toLowerCase();if(l===this.currentFilter.query||this.currentFilter.query.length>=3&&l.indexOf(this.currentFilter.query)!==-1){e="COLUMNS";break}}}}}else if(i){e=true}return e};BX.Sale.BasketFilter.prototype.highlightSearchMatch=function(t){var e=this.searchItemMatch(t);if(e){var i,r,s,l;switch(e){case"NAME":i=this.component.getEntity(BX(this.component.ids.item+t.ID),"basket-item-name");if(BX.type.isDomNode(i)){i.innerHTML=t.NAME.replace(new RegExp("(.*)("+this.currentFilter.query.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")(.*)","gi"),function(t,e,i,r){return BX.util.htmlspecialchars(e)+'<span class="basket-item-highlighted">'+BX.util.htmlspecialchars(i)+"</span>"+BX.util.htmlspecialchars(r)})}break;case"PRICE":i=BX(this.component.ids.price+t.ID);BX.addClass(i,"basket-item-highlighted");break;case"SUM_PRICE":i=BX(this.component.ids.sumPrice+t.ID);BX.addClass(i,"basket-item-highlighted");break;case"PROPS":i=this.component.getEntities(BX(this.component.ids.item+t.ID),"basket-item-property-value");for(r=0;r<i.length;r++){l=i[r].getAttribute("data-property-code");for(s in t.PROPS){if(t.PROPS.hasOwnProperty(s)&&t.PROPS[s].CODE===l){i[r].innerHTML=t.PROPS[s].VALUE.replace(new RegExp("("+this.currentFilter.query+")","gi"),'<span class="basket-item-highlighted">$1</span>')}}}break;case"COLUMNS":i=this.component.getEntities(BX(this.component.ids.item+t.ID),"basket-item-property-column-value");for(r=0;r<i.length;r++){l=i[r].getAttribute("data-column-property-code");for(s in t.COLUMN_LIST){if(t.COLUMN_LIST.hasOwnProperty(s)&&t.COLUMN_LIST[s].CODE===l){i[r].innerHTML=t.COLUMN_LIST[s].VALUE.replace(new RegExp("("+this.currentFilter.query+")","gi"),'<span class="basket-item-highlighted">$1</span>')}}}break}}};BX.Sale.BasketFilter.prototype.showEmptyFilterResult=function(){var t=this.component.getCacheNode(this.component.ids.itemList);if(BX.type.isDomNode(t)&&t.clientHeight>=500){var e=this.component.getCacheNode(this.component.ids.itemListEmptyResult);if(BX.type.isDomNode(e)){e.style.display=""}}};BX.Sale.BasketFilter.prototype.hideEmptyFilterResult=function(){var t=this.component.getCacheNode(this.component.ids.itemListEmptyResult);if(BX.type.isDomNode(t)){t.style.display="none"}}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:99:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/component.min.js?159569210837537";s:6:"source";s:79:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/component.js";s:3:"min";s:83:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/component.min.js";s:3:"map";s:83:"/bitrix/components/bitrix/sale.basket.basket/templates/.default/js/component.map.js";}"*/
(function(){"use strict";BX.namespace("BX.Sale.BasketComponent");BX.Sale.BasketComponent={maxItemsShowCount:30,precisionFactor:Math.pow(10,6),stickyHeaderOffset:0,duration:{priceAnimation:300,filterTimer:300},ids:{item:"basket-item-",quantity:"basket-item-quantity-",price:"basket-item-price-",sumPrice:"basket-item-sum-price-",sumPriceOld:"basket-item-sum-price-old-",sumPriceDiff:"basket-item-sum-price-difference-",itemHeightAligner:"basket-item-height-aligner-",total:"basket-total-price",basketRoot:"basket-root",itemListWrapper:"basket-items-list-wrapper",itemListContainer:"basket-items-list-container",itemList:"basket-item-list",itemListTable:"basket-item-table",itemListEmptyResult:"basket-item-list-empty-result",itemListOverlay:"basket-items-list-overlay",warning:"basket-warning"},initializePrimaryFields:function(){this.templates={};this.nodes={};this.items={};this.sortedItems=[];this.shownItems=[];this.changedItems=[];this.postponedItems=[];this.warningItems=[];this.isMobile=BX.browser.IsMobile();this.isTouch=BX.hasClass(document.documentElement,"bx-touch");this.lastAction="initialLoad";this.coupons=null;this.imagePopup=null;this.loadingScreen=null;this.quantityDelay=null;this.quantityTimer=null},init:function(t){this.initializePrimaryFields();this.params=t.params||{};this.template=t.template||"";this.signedParamsString=t.signedParamsString||"";this.siteId=t.siteId||"";this.siteTemplateId=t.siteTemplateId||"";this.ajaxUrl=this.params.AJAX_PATH||"";this.templateFolder=t.templateFolder||"";this.useDynamicScroll=this.params.USE_DYNAMIC_SCROLL==="Y";this.useItemsFilter=this.params.SHOW_FILTER==="Y"&&!this.isMobile;this.initializeFilter();this.applyBasketResult(t.result);this.initializeActionPool();if(this.useItemsFilter){this.checkHeaderDisplay();this.bindHeaderEvents()}this.initializeBasketItems();this.editTotal();this.editWarnings();this.getCacheNode(this.ids.basketRoot).style.opacity=1;this.bindInitialEvents()},getTemplate:function(t){if(!this.templates.hasOwnProperty(t)){var i=BX(t);this.templates[t]=BX.type.isDomNode(i)?i.innerHTML:""}return this.templates[t]},getCacheNode:function(t){if(!this.nodes.hasOwnProperty(t)){this.nodes[t]=BX(t)}return this.nodes[t]},getEntity:function(t,i,e){if(!t||!i)return null;e=e||"";return t.querySelector(e+'[data-entity="'+i+'"]')},getEntities:function(t,i,e){if(!t||!i)return{length:0};e=e||"";return t.querySelectorAll(e+'[data-entity="'+i+'"]')},bindInitialEvents:function(){this.bindWarningEvents();BX.bind(window,"scroll",BX.proxy(this.checkStickyHeaders,this));BX.bind(window,"scroll",BX.proxy(this.lazyLoad,this));BX.bind(window,"resize",BX.throttle(this.checkStickyHeaders,20,this))},bindWarningEvents:function(){var t=this.getEntity(BX(this.ids.warning),"basket-items-warning-count");if(BX.type.isDomNode(t)){t.style.display="";BX.bind(t,"click",BX.delegate(function(){this.toggleFilter("warning")},this))}BX.bind(this.getEntity(BX(this.ids.warning),"basket-items-warning-notification-close"),"click",BX.proxy(this.removeAllWarnings,this))},toggleFilter:function(t){var i=BX.type.isNotEmptyString(t)?this.getEntity(this.getCacheNode(this.ids.itemListWrapper),"basket-items-count",'[data-filter="'+t+'"]'):BX.getEventTarget(t);if(!BX.type.isDomNode(i)||BX.hasClass(i,"active"))return;var e=i.getAttribute("data-filter");var s=i.parentNode.querySelectorAll("[data-filter]");for(var a=0;a<s.length;a++){if(s[a].getAttribute("data-filter")===e){BX.addClass(s[a],"active")}else if(BX.hasClass(s[a],"active")){BX.removeClass(s[a],"active")}}this.filter.showFilterByName(e)},scrollToFirstItem:function(){var t=this.getEntity(this.getCacheNode(this.ids.itemListWrapper),"basket-items-list-header");if(BX.type.isDomNode(t)){var i=BX.pos(this.getCacheNode(this.ids.itemListContainer)).top;var e=BX.pos(t).bottom;if(i<e){window.scrollTo(0,i-this.stickyHeaderOffset)}}},showItemsOverlay:function(){var t=this.getCacheNode(this.ids.itemListOverlay);if(BX.type.isDomNode(t)){t.style.display=""}},hideItemsOverlay:function(){var t=this.getCacheNode(this.ids.itemListOverlay);if(BX.type.isDomNode(t)){t.style.display="none"}},checkHeaderDisplay:function(){var t=this.getCacheNode(this.ids.itemListWrapper);if(BX.type.isDomNode(t)){BX.removeClass(t,"basket-items-list-wrapper-light")}},bindHeaderEvents:function(){var t=this.getEntities(this.getCacheNode(this.ids.itemListWrapper),"basket-items-count");for(var i=0;i<t.length;i++){BX.bind(t[i],"click",BX.proxy(this.toggleFilter,this))}},checkStickyHeaders:function(){if(this.isMobile)return;var t,i;var e=2,s=0;var a=this.getDocumentScrollTop();var n=BX.pos(this.getCacheNode(this.ids.basketRoot));var r=a+200>=n.bottom;if(BX.util.in_array("top",this.params.TOTAL_BLOCK_DISPLAY)){var o=this.getEntity(this.getCacheNode(this.ids.basketRoot),"basket-total-block");if(BX.type.isDomNode(o)){t=this.getEntity(o,"basket-checkout-aligner");if(BX.type.isDomNode(t)){i=BX.pos(o);if(a>=i.top){s+=t.clientHeight;if(!BX.hasClass(t,"basket-checkout-container-fixed")){o.style.height=i.height+"px";t.style.width=t.clientWidth+e+"px";BX.addClass(t,"basket-checkout-container-fixed")}}else if(BX.hasClass(t,"basket-checkout-container-fixed")){o.style.height="";t.style.width="";BX.removeClass(t,"basket-checkout-container-fixed")}if(r){if(!BX.hasClass(t,"basket-checkout-container-fixed-hide")){BX.addClass(t,"basket-checkout-container-fixed-hide")}}else if(BX.hasClass(t,"basket-checkout-container-fixed-hide")){BX.removeClass(t,"basket-checkout-container-fixed-hide")}}}}if(this.useItemsFilter){var h=this.getCacheNode(this.ids.itemListWrapper);t=this.getEntity(h,"basket-items-list-header");if(BX.type.isDomNode(t)){i=BX.pos(h);if(a+s>=i.top&&!r){if(!BX.hasClass(t,"basket-items-list-header-fixed")){t.style.width=t.clientWidth+e+"px";h.style.paddingTop=t.clientHeight+"px";BX.addClass(t,"basket-items-list-header-fixed")}if(s){t.style.top=s+"px"}s+=t.clientHeight}else if(BX.hasClass(t,"basket-items-list-header-fixed")){h.style.paddingTop="";t.style.width="";t.style.top="";BX.removeClass(t,"basket-items-list-header-fixed")}}}this.stickyHeaderOffset=s},getDocumentScrollTop:function(){return window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0)},lazyLoad:function(){var t=BX.pos(this.getCacheNode(this.ids.itemListContainer));if(this.getDocumentScrollTop()+window.innerHeight>=t.bottom-400){var i=this.getItemsAfter();if(i.length){this.editBasketItems(i)}}},fireCustomEvents:function(){if(this.result.EVENT_ONCHANGE_ON_START==="Y"){BX.onCustomEvent("OnBasketChange")}if(this.params.HIDE_COUPON!=="Y"){if(this.coupons!==null&&this.coupons!==this.result.COUPON_LIST){BX.onCustomEvent("OnCouponApply")}this.coupons=this.result.COUPON_LIST}},editTotal:function(){this.fillTotalBlocks();this.showItemsCount();this.showWarningItemsCount();this.showNotAvailableItemsCount();this.showDelayedItemsCount()},fillTotalBlocks:function(){var t=this.getEntities(this.getCacheNode(this.ids.basketRoot),"basket-total-block");if(t&&t.length){var i=this.getTemplate("basket-total-template");if(i){var e=this.render(i,this.result.TOTAL_RENDER_DATA);for(var s in t){if(t.hasOwnProperty(s)&&BX.type.isDomNode(t[s])){t[s].innerHTML=e;this.bindTotalEvents(t[s])}}}}this.checkStickyHeaders()},showItemsCount:function(){var t=this.getEntity(this.getCacheNode(this.ids.itemListWrapper),"basket-items-count",'[data-filter="all"]');if(BX.type.isDomNode(t)){t.innerHTML=BX.message("SBB_IN_BASKET")+" "+this.result.BASKET_ITEMS_COUNT+" "+this.getGoodsMessage(this.result.BASKET_ITEMS_COUNT);t.style.display=""}},showSimilarCount:function(t){var i=this.getEntity(this.getCacheNode(this.ids.itemListWrapper),"basket-items-count",'[data-filter="similar"]');if(BX.type.isDomNode(i)){if(t){i.innerHTML=this.sortedItems.length+" "+this.getGoodsMessage(this.result.BASKET_ITEMS_COUNT,"SBB_SIMILAR_ITEM");i.style.display=""}else{i.style.display="none"}}},showWarningItemsCount:function(){var t=this.getEntity(this.getCacheNode(this.ids.itemListWrapper),"basket-items-count",'[data-filter="warning"]');if(BX.type.isDomNode(t)){if(this.warningItems.length){t.innerHTML=this.warningItems.length+" "+BX.message("SBB_BASKET_ITEMS_WARNING");t.style.display=""}else{t.style.display="none"}}},showNotAvailableItemsCount:function(){var t=this.getEntity(this.getCacheNode(this.ids.itemListWrapper),"basket-items-count",'[data-filter="not-available"]');if(BX.type.isDomNode(t)){if(parseInt(this.result.NOT_AVAILABLE_BASKET_ITEMS_COUNT)){t.innerHTML=this.result.NOT_AVAILABLE_BASKET_ITEMS_COUNT+" "+this.getGoodsMessage(this.result.NOT_AVAILABLE_BASKET_ITEMS_COUNT,"SBB_NOT_AVAILABLE_ITEM");t.style.display=""}else{t.style.display="none"}}},showDelayedItemsCount:function(){var t=this.getEntity(this.getCacheNode(this.ids.itemListWrapper),"basket-items-count",'[data-filter="delayed"]');if(BX.type.isDomNode(t)){if(parseInt(this.result.DELAYED_BASKET_ITEMS_COUNT)){t.innerHTML=this.result.DELAYED_BASKET_ITEMS_COUNT+" "+this.getGoodsMessage(this.result.DELAYED_BASKET_ITEMS_COUNT,"SBB_DELAYED_ITEM");t.style.display=""}else{t.style.display="none"}}},getGoodsMessage:function(t,i){var e;var s=t>10&&t<20?0:t%10;if(s===1){e=i||"SBB_GOOD"}else if(s>=2&&s<=4){e=i?i+"_2":"SBB_GOOD_2"}else{e=i?i+"S":"SBB_GOODS"}return BX.message(e)},bindTotalEvents:function(t){if(!this.result.TOTAL_RENDER_DATA.DISABLE_CHECKOUT){BX.bind(this.getEntity(t,"basket-checkout-button"),"click",BX.proxy(this.checkOutAction,this))}BX.bind(this.getEntity(t,"basket-coupon-input"),"change",BX.proxy(this.addCouponAction,this));BX.bind(this.getEntity(t,"basket-coupon-input"),"paste",BX.proxy(this.pasteCouponAction,this));var i=this.getEntities(t,"basket-coupon-delete");for(var e=0,s=i.length;e<s;e++){BX.bind(i[e],"click",BX.proxy(this.removeCouponAction,this))}},checkOutAction:function(){document.location.href=this.params.PATH_TO_ORDER},addCouponAction:function(t){var i=BX.getEventTarget(t);if(i&&i.value){this.actionPool.addCoupon(i.value);i.disabled=true}},pasteCouponAction:function(t){setTimeout(BX.delegate(function(){this.addCouponAction(t)},this),10)},removeCouponAction:function(){var t=BX.proxy_context&&BX.util.trim(BX.proxy_context.getAttribute("data-coupon"));if(t){this.actionPool.removeCoupon(t)}},initializeActionPool:function(){this.actionPool=new BX.Sale.BasketActionPool(this)},initializeFilter:function(){this.filter=new BX.Sale.BasketFilter(this)},sendRequest:function(t,i){this.lastAction=t;if(this.lastAction==="recalculateAjax"){i.lastAppliedDiscounts=BX.util.array_keys(this.result.FULL_DISCOUNT_LIST).join(",");if(this.params.USE_ENHANCED_ECOMMERCE==="Y"){this.checkAnalytics(i)}}BX.ajax({method:"POST",dataType:"json",url:this.ajaxUrl,data:this.getData(i),onsuccess:BX.delegate(function(t){this.actionPool.doProcessing(false);if(!BX.type.isPlainObject(t))return;this.actionPool.setRefreshStatus(t.BASKET_REFRESHED);if(t.RESTORED_BASKET_ITEMS){this.restoreBasketItems(t.RESTORED_BASKET_ITEMS)}if(t.DELETED_BASKET_ITEMS){this.deleteBasketItems(t.DELETED_BASKET_ITEMS,this.params.SHOW_RESTORE==="Y")}if(t.MERGED_BASKET_ITEMS){this.deleteBasketItems(t.MERGED_BASKET_ITEMS,false,true)}this.applyBasketResult(t.BASKET_DATA);this.editBasketItems(this.getItemsToEdit());this.editTotal();this.applyPriceAnimation();this.editWarnings();this.actionPool.switchTimer();if(this.isBasketIntegrated()&&this.isBasketChanged()){BX.Sale.OrderAjaxComponent.sendRequest()}},this),onfailure:BX.delegate(function(){this.actionPool.doProcessing(false)},this)})},isBasketIntegrated:function(){return this.params.BASKET_WITH_ORDER_INTEGRATION==="Y"},isBasketChanged:function(){return this.changedItems.length},addPriceAnimationData:function(t,i,e,s){if(!BX.type.isPlainObject(this.priceAnimationData)){this.clearPriceAnimationData()}this.priceAnimationData.start[t]=parseFloat(i);this.priceAnimationData.finish[t]=parseFloat(e);this.priceAnimationData.currency[t]=s;this.priceAnimationData.int[t]=parseFloat(i)===parseInt(i)&&parseFloat(e)===parseInt(e)},clearPriceAnimationData:function(){this.priceAnimationData={start:{},finish:{},currency:{},int:{}}},applyBasketResult:function(t){this.changedItems=[];this.clearPriceAnimationData();if(!BX.type.isPlainObject(t)){return}if(t.BASKET_ITEM_RENDER_DATA){var i,e;for(i in t.BASKET_ITEM_RENDER_DATA){if(t.BASKET_ITEM_RENDER_DATA.hasOwnProperty(i)){e=t.BASKET_ITEM_RENDER_DATA[i];e.WARNINGS=this.checkBasketItemWarnings(e,t.WARNING_MESSAGE_WITH_CODE);if(this.items[e.ID]){if(JSON.stringify(this.items[e.ID])===JSON.stringify(e)){continue}}else{this.addSortedItem(e.ID,true)}this.changedItems.push(e.ID);e=this.checkBasketItemsAnimation(e);this.items[e.ID]=e}}this.changedItems=BX.util.array_unique(this.changedItems.concat(this.getChangedSimilarOffers()));if(this.isBasketChanged()){this.sortSortedItems(true)}}if(t.TOTAL_RENDER_DATA){t.TOTAL_RENDER_DATA=this.checkTotalAnimation(t.TOTAL_RENDER_DATA)}this.result=t},itemSortFunction:function(t,i){if(!this.items.hasOwnProperty(t)||!this.items.hasOwnProperty(i)){return 0}return parseFloat(this.items[t].SORT)-parseFloat(this.items[i].SORT)},getChangedSimilarOffers:function(){var t=[];var i,e;var s=this.getHashMap();for(var a in s){if(s.hasOwnProperty(a)){if(s[a].length>1){for(var n=0;n<s[a].length;n++){i=0;e=0;for(var r=0;r<s[a].length;r++){if(s[a][r]!=s[a][n]){i+=parseFloat(this.items[s[a][r]].QUANTITY)}e+=parseFloat(this.items[s[a][r]].QUANTITY)}if(!this.items[s[a][n]].HAS_SIMILAR_ITEMS||this.items[s[a][n]].SIMILAR_ITEMS_QUANTITY!=i||this.items[s[a][n]].TOTAL_SIMILAR_ITEMS_QUANTITY!=e){t.push(s[a][n]);this.items[s[a][n]].HAS_SIMILAR_ITEMS=true;this.items[s[a][n]].SIMILAR_ITEMS_QUANTITY=i;this.items[s[a][n]].TOTAL_SIMILAR_ITEMS_QUANTITY=e;this.items[s[a][n]].ALL_AVAILABLE_QUANTITY=this.items[s[a][n]].AVAILABLE_QUANTITY;this.items[s[a][n]].AVAILABLE_QUANTITY=this.items[s[a][n]].ALL_AVAILABLE_QUANTITY-i}}}else if(s[a][0]&&this.items[s[a][0]].HAS_SIMILAR_ITEMS){t.push(s[a][0]);delete this.items[s[a][0]].HAS_SIMILAR_ITEMS;delete this.items[s[a][0]].SIMILAR_ITEMS_QUANTITY;delete this.items[s[a][0]].TOTAL_SIMILAR_ITEMS_QUANTITY;this.items[s[a][0]].AVAILABLE_QUANTITY=this.items[s[a][0]].ALL_AVAILABLE_QUANTITY;delete this.items[s[a][0]].ALL_AVAILABLE_QUANTITY}}}return t},getHashMap:function(){var t={};for(var i in this.items){if(this.items.hasOwnProperty(i)&&this.isItemAvailable(i)){if(!t.hasOwnProperty(this.items[i].HASH)){t[this.items[i].HASH]=[]}t[this.items[i].HASH].push(i)}}return t},isItemAvailable:function(t){var i=this.filter.isActive()?this.filter.realSortedItems:this.sortedItems;return!this.items[t].NOT_AVAILABLE&&!this.items[t].SHOW_RESTORE&&BX.util.in_array(t,i)},checkTotalAnimation:function(t){if(this.result&&this.result.TOTAL_RENDER_DATA&&parseFloat(this.result.TOTAL_RENDER_DATA.PRICE)>parseFloat(t.PRICE)){t.PRICE_NEW=t.PRICE;t.PRICE=this.result.TOTAL_RENDER_DATA.PRICE;t.PRICE_FORMATED_NEW=t.PRICE_FORMATED;t.PRICE_FORMATED=this.result.TOTAL_RENDER_DATA.PRICE_FORMATED;this.addPriceAnimationData(this.ids.total,t.PRICE,t.PRICE_NEW,t.CURRENCY)}return t},checkBasketItemsAnimation:function(t){var i=t.ID;if(this.items[i]){var e=BX(this.ids.quantity+i);if(BX.type.isDomNode(e)&&!this.actionPool.isItemInPool(i)&&parseFloat(e.value)!==parseFloat(t.QUANTITY)){t.QUANTITY_ANIMATION=true;this.actionPool.clearLastActualQuantityPool(i)}if(parseFloat(this.items[i].PRICE)>parseFloat(t.PRICE)){t.PRICE_NEW=t.PRICE;t.PRICE=this.items[i].PRICE;t.PRICE_FORMATED_NEW=t.PRICE_FORMATED;t.PRICE_FORMATED=this.items[i].PRICE_FORMATED;this.addPriceAnimationData(this.ids.price+i,t.PRICE,t.PRICE_NEW,t.CURRENCY)}if(BX.util.in_array("SUM",this.params.COLUMNS_LIST)&&parseFloat(this.items[i].SUM_PRICE)>parseFloat(t.SUM_PRICE)&&parseFloat(this.items[i].QUANTITY)===parseFloat(t.QUANTITY)){t.SUM_PRICE_NEW=t.SUM_PRICE;t.SUM_PRICE=this.items[i].SUM_PRICE;t.SUM_PRICE_FORMATED_NEW=t.SUM_PRICE_FORMATED;t.SUM_PRICE_FORMATED=this.items[i].SUM_PRICE_FORMATED;this.addPriceAnimationData(this.ids.sumPrice+i,t.SUM_PRICE,t.SUM_PRICE_NEW,t.CURRENCY)}}return t},getData:function(t){t=t||{};t[this.params.ACTION_VARIABLE]=this.lastAction;t.via_ajax="Y";t.site_id=this.siteId;t.site_template_id=this.siteTemplateId;t.sessid=BX.bitrix_sessid();t.template=this.template;t.signedParamsString=this.signedParamsString;return t},startLoader:function(){},endLoader:function(){},editWarnings:function(){this.editGeneralWarnings();this.editBasketItemWarnings();this.toggleWarningBlock();this.showWarningItemsCount()},editGeneralWarnings:function(){var t=this.getEntity(this.getCacheNode(this.ids.warning),"basket-general-warnings");if(BX.type.isDomNode(t)){var i=t.innerHTML;if(this.result.WARNING_MESSAGE_WITH_CODE){for(var e in this.result.WARNING_MESSAGE_WITH_CODE){if(this.result.WARNING_MESSAGE_WITH_CODE.hasOwnProperty(e)){if(!this.items[e]&&i.indexOf(this.result.WARNING_MESSAGE_WITH_CODE[e])===-1){i+=this.result.WARNING_MESSAGE_WITH_CODE[e]+"<br/>"}}}}if(i){t.innerHTML=i;t.style.display=""}else{t.style.display="none";t.innerHTML=""}}},editBasketItemWarnings:function(){var t=this.getEntity(this.getCacheNode(this.ids.warning),"basket-item-warnings");if(BX.type.isDomNode(t)){if(this.warningItems.length){var i=this.getEntity(t,"basket-items-warning-count");if(BX.type.isDomNode(i)){i.innerHTML=this.warningItems.length+" "+this.getGoodsMessage(this.warningItems.length)}t.style.display=""}else if(t.style.display!=="none"){t.style.display="none";if(this.filter.isActive()){this.toggleFilter("all")}}}},toggleWarningBlock:function(){var t=this.getCacheNode(this.ids.warning);if(BX.type.isDomNode(t)){var i=this.getEntity(t,"basket-general-warnings");var e=this.getEntity(t,"basket-item-warnings");if((!BX.type.isDomNode(i)||i.style.display==="none")&&(!BX.type.isDomNode(e)||e.style.display==="none")){t.style.display="none"}else{t.style.display=""}}},checkBasketItemWarnings:function(t,i){if(!t)return;var e;if(this.items[t.ID]&&this.lastAction==="refreshAjax"){e=this.items[t.ID].WARNINGS}else{e=[]}if(BX.type.isArray(i[t.ID])&&i[t.ID].length){for(var s in i[t.ID]){if(i[t.ID].hasOwnProperty(s)&&!BX.util.in_array(i[t.ID][s],e)){e.push(i[t.ID][s])}}}if(e.length){if(!BX.util.in_array(t.ID,this.warningItems)){this.warningItems.push(t.ID)}}else if(BX.util.in_array(t.ID,this.warningItems)){this.warningItems.splice(BX.util.array_search(t.ID,this.warningItems),1)}return e},removeAllWarnings:function(t){this.clearGeneralWarnings();this.clearBasketItemsWarnings();this.editWarnings();t&&t.preventDefault()},clearGeneralWarnings:function(){this.result.WARNING_MESSAGE_WITH_CODE={};var t=this.getEntity(this.getCacheNode(this.ids.warning),"basket-general-warnings");if(BX.type.isDomNode(t)){t.innerHTML=""}},clearBasketItemsWarnings:function(){var t=[];for(var i in this.warningItems){if(this.warningItems.hasOwnProperty(i)){this.items[this.warningItems[i]].WARNINGS=[];if(this.isItemShown(this.warningItems[i])){t.push(this.warningItems[i])}}}this.warningItems=[];this.editBasketItems(t)},isItemShown:function(t){return BX.util.in_array(t,this.shownItems)},initializeBasketItems:function(){if(Object.keys(this.items).length===0)return;for(var t=0;t<this.sortedItems.length;t++){if(this.useDynamicScroll&&this.shownItems.length>=this.maxItemsShowCount){break}this.createBasketItem(this.sortedItems[t])}},createBasketItem:function(t){if(!this.items[t]){return}var i=this.getTemplate("basket-item-template");if(i){var e=this.renderBasketItem(i,this.items[t]);var s=BX.util.array_search(t,this.sortedItems);if(this.shownItems.length&&s>=0){if(s<BX.util.array_search(this.shownItems[0],this.sortedItems)){BX(this.ids.item+this.shownItems[0]).insertAdjacentHTML("beforebegin",e);this.shownItems.unshift(t)}else if(s>BX.util.array_search(this.shownItems[this.shownItems.length-1],this.sortedItems)){BX(this.ids.item+this.shownItems[this.shownItems.length-1]).insertAdjacentHTML("afterend",e);this.shownItems.push(t)}else{BX(this.ids.item+this.sortedItems[s+1]).insertAdjacentHTML("beforebegin",e);this.shownItems.splice(s+1,0,t)}}else{this.getCacheNode(this.ids.itemListTable).insertAdjacentHTML("beforeend",e);this.shownItems.push(t)}this.bindBasketItemEvents(this.items[t]);if(this.filter.isActive()){this.filter.highlightSearchMatch(this.items[t])}}},getItemsToEdit:function(){var t=[];if(this.isBasketChanged()){for(var i in this.changedItems){if(this.changedItems.hasOwnProperty(i)&&this.isItemShown(this.changedItems[i])){t.push(this.changedItems[i])}}}return t},getItemsAfter:function(){var t=[];if(this.useDynamicScroll){var i=this.shownItems[this.shownItems.length-1]||false;if(i){var e=0;var s=BX.util.array_search(i,this.sortedItems);while(this.sortedItems[++s]&&e++<this.maxItemsShowCount){t.push(this.sortedItems[s])}}}return t},editBasketItems:function(t){if(!t||t.length===0){return}var i,e;for(i in t){if(!t.hasOwnProperty(i)||!BX.type.isPlainObject(this.items[t[i]])){continue}e=this.items[t[i]];if(this.actionPool.isItemInPool(e.ID)){if(!BX.util.in_array(e.ID,this.postponedItems)){this.postponedItems.push(e.ID)}continue}if(BX.type.isDomNode(BX(this.ids.item+e.ID))){this.redrawBasketItemNode(e.ID);this.applyQuantityAnimation(e.ID)}else{this.createBasketItem(e.ID)}}},editPostponedBasketItems:function(){if(!this.postponedItems.length)return;var t=[];for(var i in this.postponedItems){if(this.postponedItems.hasOwnProperty(i)&&this.isItemShown(this.postponedItems[i])){t.push(this.postponedItems[i])}}this.postponedItems=[];this.editBasketItems(t)},applyQuantityAnimation:function(t){var i=BX(this.ids.item+t);if(BX.type.isDomNode(i)&&this.items[t]){if(this.items[t].QUANTITY_ANIMATION){BX.addClass(BX(this.ids.quantity+t),"basket-updated")}}},applyPriceAnimation:function(){if(!this.priceAnimationData||Object.keys(this.priceAnimationData.start).length===0)return;var t=this.priceAnimationData,i={};new BX.easing({duration:this.params.USE_PRICE_ANIMATION==="Y"?this.duration.priceAnimation:1,start:t.start,finish:t.finish,transition:BX.easing.makeEaseOut(BX.easing.transitions.quad),step:BX.delegate(function(e){for(var s in t.start){if(t.start.hasOwnProperty(s)){if(!i[s]){if(s===this.ids.total){i[s]=this.getEntities(this.getCacheNode(this.ids.basketRoot),this.ids.total)}else{var a=BX(s);i[s]=a?[a]:[]}}if(!t.int[s]){e[s]=(e[s]+e[s]%1e3/1e3).toFixed(5)}for(var n=0;n<i[s].length;n++){i[s][n].innerHTML=this.getFormatPrice(e[s],t.currency[s])}}}},this),complete:BX.delegate(function(){var e,s,a,n;for(e in t.start){if(t.start.hasOwnProperty(e)){s=this.getFormatPrice(t.finish[e],t.currency[e]);for(var r=0;r<i[e].length;r++){i[e][r].innerHTML=s}if(e.indexOf(this.ids.sumPrice)!==-1){n="SUM_PRICE";a=e.substr(this.ids.sumPrice.length)}else if(e.indexOf(this.ids.price)!==-1){n="PRICE";a=e.substr(this.ids.price.length)}else if(e.indexOf(this.ids.total)!==-1){n="TOTAL";a=""}else{a="";n=""}if(BX.type.isNotEmptyString(n)){if(a){this.items[a][n]=t.finish[e];delete this.items[a][n+"_NEW"];this.items[a][n+"_FORMATED"]=s;delete this.items[a][n+"_FORMATED_NEW"]}else if(n==="TOTAL"){this.result.TOTAL_RENDER_DATA.PRICE=t.finish[e];delete this.result.TOTAL_RENDER_DATA.PRICE_NEW;this.result.TOTAL_RENDER_DATA.PRICE_FORMATED=s;delete this.result.TOTAL_RENDER_DATA.PRICE_FORMATED_NEW}}}}this.filter.highlightFoundItems()},this)}).animate()},getFormatPrice:function(t,i){return BX.Currency.currencyFormat(t,i,true)},deleteBasketItems:function(t,i,e){if(!t||!t.length){return}for(var s in t){if(t.hasOwnProperty(s)){this.deleteBasketItem(t[s],i,e)}}},deleteBasketItem:function(t,i,e){if(this.items[t].NOT_AVAILABLE&&i){i=false;e=true}if(i){this.items[t].SHOW_RESTORE=true;this.items[t].SHOW_LOADING=false;this.redrawBasketItemNode(t)}else{this.changeShownItem(t);BX.remove(BX(this.ids.item+t))}if(e){this.changeSortedItem(t,false,true);this.changeShownItem(t,false,true)}},addSortedItem:function(t,i){this.sortedItems.push(t.toString());if(i&&this.filter.isActive()){this.filter.realSortedItems.push(t.toString())}},changeSortedItem:function(t,i,e){var s=BX.util.array_search(t,this.sortedItems);if(s>=0){if(i){this.sortedItems.splice(s,1,i.toString())}else{this.sortedItems.splice(s,1)}}if(e&&this.filter.isActive()){s=BX.util.array_search(t,this.filter.realSortedItems);if(s>=0){if(i){this.filter.realSortedItems.splice(s,1,i.toString())}else{this.filter.realSortedItems.splice(s,1)}}}},sortSortedItems:function(t){this.sortedItems.sort(BX.proxy(this.itemSortFunction,this));if(t&&this.filter.isActive()){this.filter.realSortedItems.sort(BX.proxy(this.itemSortFunction,this))}},changeShownItem:function(t,i,e){var s=BX.util.array_search(t,this.shownItems);if(s>=0){if(i){this.shownItems.splice(s,1,i.toString())}else{this.shownItems.splice(s,1)}}if(e&&this.filter.isActive()){s=BX.util.array_search(t,this.filter.realShownItems);if(s>=0){if(i){this.filter.realShownItems.splice(s,1,i.toString())}else{this.filter.realShownItems.splice(s,1)}}}},redrawBasketItemNode:function(t){var i=BX(this.ids.item+t);if(!this.items[t]||!BX.type.isDomNode(i))return;var e=this.getTemplate("basket-item-template");if(e){var s=BX(this.ids.itemHeightAligner+t),a;if(BX.type.isDomNode(s)){a=s.clientHeight}var n=this.renderBasketItem(e,this.items[t]);i.insertAdjacentHTML("beforebegin",n);BX.remove(i);if(a){s=BX(this.ids.itemHeightAligner+t);if(BX.type.isDomNode(s)&&s.clientHeight<a){s.style.minHeight=a+"px";setTimeout(function(){s.style.minHeight="0px"},1)}}this.bindBasketItemEvents(this.items[t]);if(this.filter.isActive()){this.filter.highlightSearchMatch(this.items[t])}}},restoreBasketItems:function(t){if(!t||Object.keys(t).length===0){return}var i,e,s;for(i in t){if(t.hasOwnProperty(i)){e=t[i];if(this.isItemShown(i)){this.changeShownItem(i,e,true);s=BX(this.ids.item+i);if(BX.type.isDomNode(s)){s.id=this.ids.item+e;s.setAttribute("data-id",e)}}this.changeSortedItem(i,false,true)}}},bindBasketItemEvents:function(t){if(!t)return;var i=BX(this.ids.item+t.ID);if(BX.type.isDomNode(i)){this.bindQuantityEvents(i,t);this.bindSkuEvents(i,t);this.bindImageEvents(i,t);this.bindActionEvents(i,t);this.bindRestoreAction(i,t);this.bindItemWarningEvents(i,t)}},bindQuantityEvents:function(t,i){if(!t||!i||!this.isItemAvailable(i.ID))return;var e;var s=this.getEntity(t,"basket-item-quantity-block");if(s){var a=this.isTouch?"touchstart":"mousedown";var n=this.isTouch?"touchend":"mouseup";e=this.getEntity(s,"basket-item-quantity-minus");BX.bind(e,a,BX.proxy(this.startQuantityInterval,this));BX.bind(e,n,BX.proxy(this.clearQuantityInterval,this));BX.bind(e,"mouseout",BX.proxy(this.clearQuantityInterval,this));BX.bind(e,"click",BX.proxy(this.quantityMinus,this));e=this.getEntity(s,"basket-item-quantity-plus");BX.bind(e,a,BX.proxy(this.startQuantityInterval,this));BX.bind(e,n,BX.proxy(this.clearQuantityInterval,this));BX.bind(e,"mouseout",BX.proxy(this.clearQuantityInterval,this));BX.bind(e,"click",BX.proxy(this.quantityPlus,this));e=this.getEntity(s,"basket-item-quantity-field");BX.bind(e,"change",BX.proxy(this.quantityChange,this))}},startQuantityInterval:function(){var t=BX.proxy_context;var i=t.getAttribute("data-entity")==="basket-item-quantity-minus"?BX.proxy(this.quantityMinus,this):BX.proxy(this.quantityPlus,this);this.quantityDelay=setTimeout(BX.delegate(function(){this.quantityTimer=setInterval(function(){i(t)},150)},this),300)},clearQuantityInterval:function(){clearTimeout(this.quantityDelay);clearInterval(this.quantityTimer)},quantityPlus:function(t){if(!BX.type.isDomNode(t)){t=BX.proxy_context;this.clearQuantityInterval()}var i=this.getItemDataByTarget(t);if(i){var e=BX(this.ids.quantity+i.ID);var s=this.isQuantityFloat(i);var a=s?parseFloat(e.value):Math.round(e.value);var n=s?parseFloat(i.MEASURE_RATIO):parseInt(i.MEASURE_RATIO);var r=parseFloat((a+n).toFixed(5));r=this.getCorrectQuantity(i,r);this.setQuantity(i,r)}},quantityMinus:function(t){t=BX.type.isDomNode(t)?t:BX.proxy_context;var i=this.getItemDataByTarget(t);if(i){var e=BX(this.ids.quantity+i.ID);var s=this.isQuantityFloat(i);var a=s?parseFloat(e.value):Math.round(e.value);var n=s?parseFloat(i.MEASURE_RATIO):parseInt(i.MEASURE_RATIO);var r=parseFloat((a-n).toFixed(5));r=this.getCorrectQuantity(i,r);this.setQuantity(i,r)}},quantityChange:function(){var t=this.getItemDataByTarget(BX.proxy_context);if(t){var i,e;i=BX(this.ids.quantity+t.ID);e=this.getCorrectQuantity(t,i.value);this.setQuantity(t,e)}},isQuantityFloat:function(t){return this.params.QUANTITY_FLOAT==="Y"||parseInt(t.MEASURE_RATIO)!==parseFloat(t.MEASURE_RATIO)},getCorrectQuantity:function(t,i){var e=this.isQuantityFloat(t),s=e?parseFloat(t.MEASURE_RATIO):parseInt(t.MEASURE_RATIO),a=0;i=(e?parseFloat(i):parseInt(i,10))||0;if(i<0){i=0}if(s>0&&i<s){i=s}if(t.CHECK_MAX_QUANTITY==="Y"){a=e?parseFloat(t.AVAILABLE_QUANTITY):parseInt(t.AVAILABLE_QUANTITY);if(a>0&&i>a){i=a}}var n=(i/s-(i/s).toFixed(0)).toFixed(5),r;if(parseFloat(n)===0){return i}if(s!==0&&s!==1){r=i*this.precisionFactor%(s*this.precisionFactor)/this.precisionFactor;if(s>0&&r>0){if(r>=s/2&&(a===0||i+s-r<=a)){i+=s-r}else{i-=r}}}i=e?parseFloat(i):parseInt(i,10);return i},setQuantity:function(t,i){var e=BX(this.ids.quantity+t.ID),s;if(e){i=parseFloat(i);s=parseFloat(e.getAttribute("data-value"));e.value=i;if(parseFloat(t.QUANTITY)!==parseFloat(i)){this.animatePriceByQuantity(t,i);this.actionPool.changeQuantity(t.ID,i,s)}}},animatePriceByQuantity:function(t,i){var e=BX(this.ids.sumPrice+t.ID);if(!BX.type.isDomNode(e))return;var s=i/parseFloat(t.MEASURE_RATIO);var a=parseFloat(t.SUM_PRICE),n=parseFloat(t.PRICE)*s,r=parseInt(a)===parseFloat(a)&&parseInt(n)===parseFloat(n);if(a!==n){this.items[t.ID].QUANTITY=i;this.items[t.ID].SUM_PRICE=n;new BX.easing({duration:this.params.USE_PRICE_ANIMATION==="Y"?this.duration.priceAnimation:1,start:{price:a},finish:{price:n},transition:BX.easing.makeEaseOut(BX.easing.transitions.quad),step:BX.delegate(function(i){if(!r){i.price=(i.price+i.price%1e3/1e3).toFixed(5)}e.innerHTML=this.getFormatPrice(i.price,t.CURRENCY)},this),complete:BX.delegate(function(){var i,a;e.innerHTML=this.getFormatPrice(n,t.CURRENCY);i=BX(this.ids.sumPriceOld+t.ID);if(BX.type.isDomNode(i)){a=parseFloat(t.FULL_PRICE)*s;i.innerHTML=this.getFormatPrice(a,t.CURRENCY)}i=BX(this.ids.sumPriceDiff+t.ID);if(BX.type.isDomNode(i)){a=parseFloat(t.DISCOUNT_PRICE)*s;i.innerHTML=this.getFormatPrice(a,t.CURRENCY)}},this)}).animate()}},getItemDataByTarget:function(t){var i=false;var e;var s=BX.findParent(t,{attrs:{"data-entity":"basket-item"}});if(s){e=s.getAttribute("data-id");i=this.items[e]}return i},bindSkuEvents:function(t,i){if(!t||!i)return;var e=this.getEntities(t,"basket-item-sku-block");var s,a,n,r,o;for(a=0,n=e.length;a<n;a++){s=this.getEntities(e[a],"basket-item-sku-field");for(r=0,o=s.length;r<o;r++){BX.bind(s[r],"click",BX.proxy(this.changeSku,this))}}},changeSku:function(){var t,i;var e=BX.proxy_context;if(BX.hasClass(e,"selected"))return;var s=this.getItemDataByTarget(e);if(s){var a=BX(this.ids.item+s.ID);if(a){var n=this.getEntities(e.parentNode,"basket-item-sku-field");for(t=0,i=n.length;t<i;t++){if(n[t].isEqualNode(e)){BX.addClass(n[t],"selected")}else{BX.removeClass(n[t],"selected")}}this.actionPool.changeSku(s.ID,this.getSkuPropertyValues(a),this.getInitialSkuPropertyValues(a))}}},getSkuPropertyValues:function(t){var i={};var e=this.getEntities(t,"basket-item-sku-field",".selected");for(var s=0,a=e.length;s<a;s++){i[e[s].getAttribute("data-property")]=BX.util.htmlspecialcharsback(e[s].getAttribute("data-value-id"))}return i},getInitialSkuPropertyValues:function(t){var i={};var e=this.getEntities(t,"basket-item-sku-field",'[data-initial="true"]');for(var s=0,a=e.length;s<a;s++){i[e[s].getAttribute("data-property")]=BX.util.htmlspecialcharsback(e[s].getAttribute("data-value-id"))}return i},bindImageEvents:function(t,i){if(!t||!i)return;var e=t.querySelectorAll(".basket-item-custom-block-photo-item");for(var s=0,a=e.length;s<a;s++){BX.bind(e[s],"click",BX.proxy(this.showPropertyImagePopup,this))}},showPropertyImagePopup:function(){var t,i,e,s,a,n;t=BX.proxy_context;s=this.getItemDataByTarget(t);i=t.getAttribute("data-column-property-code");e=t.getAttribute("data-image-index");if(s&&s.COLUMN_LIST){for(n in s.COLUMN_LIST){if(s.COLUMN_LIST.hasOwnProperty(n)&&s.COLUMN_LIST[n].CODE===i&&s.COLUMN_LIST[n].VALUE[e]){a=s.COLUMN_LIST[n].VALUE[e].IMAGE_SRC_ORIGINAL;break}}}if(!a){return}if(this.imagePopup){this.imagePopup.destroy()}var r="bx-soa-image-popup-content";var o=this;this.imagePopup=new BX.PopupWindow("bx-soa-image-popup",null,{lightShadow:true,offsetTop:0,offsetLeft:0,closeIcon:{top:"3px",right:"10px"},autoHide:true,bindOptions:{position:"bottom"},closeByEsc:true,zIndex:100,events:{onPopupShow:function(){BX.create("IMG",{props:{src:a},events:{load:function(){var t=BX(r);if(t){var i=BX.GetWindowInnerSize(),e=o.isMobile?.5:.9,s,a;BX.cleanNode(t);t.appendChild(this);s=t.offsetHeight;a=t.offsetWidth;if(s>i.innerHeight*e){t.style.height=i.innerHeight*e+"px";t.style.width=a*(i.innerHeight*e/s)+"px";s=t.offsetHeight;a=t.offsetWidth}if(a>i.innerWidth*e){t.style.width=i.innerWidth*e+"px";t.style.height=s*(i.innerWidth*e/a)+"px"}t.style.height=t.offsetHeight+"px";t.style.width=t.offsetWidth+"px";o.imagePopup.adjustPosition()}}}})},onPopupClose:function(){this.destroy()}},content:BX.create("DIV",{props:{id:r}})});this.imagePopup.show()},bindActionEvents:function(t,i){if(!t||!i)return;var e;if(BX.util.in_array("DELETE",this.params.COLUMNS_LIST)){e=this.getEntities(t,"basket-item-delete");for(var s=0,a=e.length;s<a;s++){BX.bind(e[s],"click",BX.proxy(this.deleteAction,this))}}if(BX.util.in_array("DELAY",this.params.COLUMNS_LIST)){e=this.getEntity(t,"basket-item-add-delayed");BX.bind(e,"click",BX.proxy(this.addDelayedAction,this))}e=this.getEntity(t,"basket-item-remove-delayed");BX.bind(e,"click",BX.proxy(this.removeDelayedAction,this));e=this.getEntity(t,"basket-item-merge-sku-link");BX.bind(e,"click",BX.proxy(this.mergeAction,this));e=this.getEntity(t,"basket-item-show-similar-link");BX.bind(e,"click",BX.delegate(function(){this.toggleFilter("similar")},this))},deleteAction:function(){var t=this.getItemDataByTarget(BX.proxy_context);if(t){this.actionPool.deleteItem(t.ID);this.items[t.ID].SHOW_LOADING=true;if(this.params.SHOW_RESTORE==="Y"&&this.isItemAvailable(t.ID)){this.items[t.ID].SHOW_RESTORE=true}this.redrawBasketItemNode(t.ID)}},addDelayedAction:function(){var t=this.getItemDataByTarget(BX.proxy_context);if(t){this.actionPool.addDelayed(t.ID);this.items[t.ID].SHOW_LOADING=true;this.redrawBasketItemNode(t.ID)}},removeDelayedAction:function(){var t=this.getItemDataByTarget(BX.proxy_context);if(t){this.actionPool.removeDelayed(t.ID);this.items[t.ID].SHOW_LOADING=true;this.redrawBasketItemNode(t.ID)}},mergeAction:function(){var t=this.getItemDataByTarget(BX.proxy_context);if(t){this.actionPool.mergeSku(t.ID)}},bindRestoreAction:function(t,i){if(!t||!i||this.params.SHOW_RESTORE!=="Y")return;BX.bind(this.getEntity(t,"basket-item-restore-button"),"click",BX.delegate(function(){this.actionPool.restoreItem(i.ID,{PRODUCT_ID:i.PRODUCT_ID,QUANTITY:i.QUANTITY,PROPS:i.PROPS_ALL,SORT:i.SORT,MODULE:i.MODULE,PRODUCT_PROVIDER_CLASS:i.PRODUCT_PROVIDER_CLASS});this.items[i.ID].SHOW_RESTORE=false;this.items[i.ID].SHOW_LOADING=true;this.redrawBasketItemNode(i.ID)},this));BX.bind(this.getEntity(t,"basket-item-close-restore-button"),"click",BX.delegate(function(){this.deleteBasketItem(i.ID,false,true)},this))},bindItemWarningEvents:function(t,i){if(!t||!i)return;BX.bind(this.getEntity(BX(this.ids.item+i.ID),"basket-item-warning-close"),"click",BX.proxy(this.closeItemWarnings,this))},closeItemWarnings:function(){var t=BX.proxy_context;if(BX.type.isDomNode(t)){var i=this.getItemDataByTarget(t);this.items[i.ID].WARNINGS=[];this.warningItems.splice(BX.util.array_search(i.ID,this.warningItems),1);this.redrawBasketItemNode(i.ID);this.editWarnings()}},renderBasketItem:function(t,i){var e=BX.clone(i);if(BX.type.isPlainObject(e)){e.USE_FILTER=this.useItemsFilter&&!this.filter.currentFilter.similarHash.length}return Mustache.render(t,e)},render:function(t,i){return Mustache.render(t,i)},checkAnalytics:function(t){if(!t||!t.basket)return;var i,e={};for(var s in t.basket){if(t.basket.hasOwnProperty(s)){if(s.indexOf("QUANTITY_")>=0){i=s.substr(9);if(this.items[i]){e[i]=parseFloat(t.basket[s])-parseFloat(BX(this.ids.quantity+i).getAttribute("data-value"))}}else if(s.indexOf("DELETE_")>=0){i=s.substr(7);if(this.items[i]){e[i]=-parseFloat(this.items[i].QUANTITY)}}else if(s.indexOf("RESTORE_")>=0){i=s.substr(8);if(this.items[i]){e[i]=parseFloat(this.items[i].QUANTITY)}}}}this.setAnalyticsDataLayer(e)},setAnalyticsDataLayer:function(t){if(!t||Object.keys(t).length===0)return;window[this.params.DATA_LAYER_NAME]=window[this.params.DATA_LAYER_NAME]||[];var i=[],e=[];for(var s in t){if(t.hasOwnProperty(s)){if(t[s]>0){i.push(this.getItemAnalyticsInfo(s,t[s]))}else if(t[s]<0){e.push(this.getItemAnalyticsInfo(s,t[s]))}}}if(i.length){window[this.params.DATA_LAYER_NAME].push({event:"addToCart",ecommerce:{currencyCode:this.items[s].CURRENCY||"",add:{products:i}}})}if(e.length){window[this.params.DATA_LAYER_NAME].push({event:"removeFromCart",ecommerce:{currencyCode:this.items[s].CURRENCY||"",remove:{products:e}}})}},getItemAnalyticsInfo:function(t,i){if(!this.items[t])return{};var e=(this.items[t].BRAND||"").split(",  ").join("/");var s=[];var a=this.getEntities(BX(this.ids.item+t),"basket-item-sku-field",".selected");for(var n=0,r=a.length;n<r;n++){s.push(a[n].getAttribute("data-sku-name"))}return{name:this.items[t].NAME||"",id:this.items[t].PRODUCT_ID||"",price:this.items[t].PRICE||0,brand:e,variant:s.join("/"),quantity:Math.abs(i)}}}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:99:"/bitrix/components/bitrix/sale.products.gift.basket/templates/.default/script.min.js?15956920973259";s:6:"source";s:80:"/bitrix/components/bitrix/sale.products.gift.basket/templates/.default/script.js";s:3:"min";s:84:"/bitrix/components/bitrix/sale.products.gift.basket/templates/.default/script.min.js";s:3:"map";s:84:"/bitrix/components/bitrix/sale.products.gift.basket/templates/.default/script.map.js";}"*/
(function(){"use strict";if(!!window.JCSaleProductsGiftBasketComponent)return;window.JCSaleProductsGiftBasketComponent=function(t){this.formPosting=false;this.siteId=t.siteId||"";this.template=t.template||"";this.componentPath=t.componentPath||"";this.parameters=t.parameters||"";this.container=document.querySelector('[data-entity="'+t.container+'"]');this.currentProductId=t.currentProductId;if(t.initiallyShowHeader){BX.ready(BX.proxy(this.showHeader,this))}if(t.deferredLoad){BX.ready(BX.proxy(this.deferredLoad,this))}BX.addCustomEvent("OnBasketChange",BX.proxy(this.reloadGifts,this));BX.addCustomEvent("OnCouponApply",BX.proxy(this.reloadGifts,this))};window.JCSaleProductsGiftBasketComponent.prototype={reloadGifts:function(){this.sendRequest({action:"deferredLoad",recalculateDiscounts:"Y"})},deferredLoad:function(){this.sendRequest({action:"deferredLoad"})},sendRequest:function(t){var e={siteId:this.siteId,template:this.template,parameters:this.parameters};BX.ajax({url:this.componentPath+"/ajax.php"+(document.location.href.indexOf("clear_cache=Y")!==-1?"?clear_cache=Y":""),method:"POST",dataType:"json",timeout:60,data:BX.merge(e,t),onsuccess:BX.delegate(function(e){if(!e||!e.JS){this.hideHeader();BX.cleanNode(this.container);return}BX.ajax.processScripts(BX.processHTML(e.JS).SCRIPT,false,BX.delegate(function(){this.showAction(e,t)},this))},this)})},showAction:function(t,e){if(!e)return;switch(e.action){case"deferredLoad":this.processDeferredLoadAction(t);break}},processDeferredLoadAction:function(t){if(!t)return;this.processItems(t.items)},processItems:function(t){if(!t)return;var e=BX.processHTML(t,false),i=BX.create("DIV");var a,n,s;i.innerHTML=e.HTML;s=this.container.querySelectorAll('[data-entity="items-row"]');if(s.length){BX.cleanNode(this.container);this.showHeader(false)}else{this.showHeader(true)}a=i.querySelectorAll('[data-entity="items-row"]');for(n in a){if(a.hasOwnProperty(n)){a[n].style.opacity=0;this.container.appendChild(a[n])}}new BX.easing({duration:2e3,start:{opacity:0},finish:{opacity:100},transition:BX.easing.makeEaseOut(BX.easing.transitions.quad),step:function(t){for(var e in a){if(a.hasOwnProperty(e)){a[e].style.opacity=t.opacity/100}}},complete:function(){for(var t in a){if(a.hasOwnProperty(t)){a[t].removeAttribute("style")}}}}).animate();BX.ajax.processScripts(e.SCRIPT)},showHeader:function(t){var e=BX.findParent(this.container,{attr:{"data-entity":"parent-container"}}),i;if(e&&BX.type.isDomNode(e)){i=e.querySelector('[data-entity="header"]');if(i&&i.getAttribute("data-showed")==="false"){i.style.display="";if(t){this.animation=new BX.easing({duration:2e3,start:{opacity:0},finish:{opacity:100},transition:BX.easing.makeEaseOut(BX.easing.transitions.quad),step:function(t){i.style.opacity=t.opacity/100},complete:function(){i.removeAttribute("style");i.setAttribute("data-showed","true")}});this.animation.animate()}else{i.style.opacity=100}}}},hideHeader:function(){var t=BX.findParent(this.container,{attr:{"data-entity":"parent-container"}}),e;if(t&&BX.type.isDomNode(t)){e=t.querySelector('[data-entity="header"]');if(e){if(this.animation){this.animation.stop()}e.style.display="none";e.style.opacity=0;e.setAttribute("data-showed","false")}}}}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:87:"/bitrix/components/bitrix/catalog.item/templates/.default/script.min.js?159569191340913";s:6:"source";s:67:"/bitrix/components/bitrix/catalog.item/templates/.default/script.js";s:3:"min";s:71:"/bitrix/components/bitrix/catalog.item/templates/.default/script.min.js";s:3:"map";s:71:"/bitrix/components/bitrix/catalog.item/templates/.default/script.map.js";}"*/
(function(t){"use strict";if(t.JCCatalogItem)return;var i=function(t){i.superclass.constructor.apply(this,arguments);this.buttonNode=BX.create("span",{props:{className:"btn btn-default btn-buy btn-sm",id:this.id},style:typeof t.style==="object"?t.style:{},text:t.text,events:this.contextEvents});if(BX.browser.IsIE()){this.buttonNode.setAttribute("hideFocus","hidefocus")}};BX.extend(i,BX.PopupWindowButton);t.JCCatalogItem=function(t){this.productType=0;this.showQuantity=true;this.showAbsent=true;this.secondPict=false;this.showOldPrice=false;this.showMaxQuantity="N";this.relativeQuantityFactor=5;this.showPercent=false;this.showSkuProps=false;this.basketAction="ADD";this.showClosePopup=false;this.useCompare=false;this.showSubscription=false;this.visual={ID:"",PICT_ID:"",SECOND_PICT_ID:"",PICT_SLIDER_ID:"",QUANTITY_ID:"",QUANTITY_UP_ID:"",QUANTITY_DOWN_ID:"",PRICE_ID:"",PRICE_OLD_ID:"",DSC_PERC:"",SECOND_DSC_PERC:"",DISPLAY_PROP_DIV:"",BASKET_PROP_DIV:"",SUBSCRIBE_ID:""};this.product={checkQuantity:false,maxQuantity:0,stepQuantity:1,isDblQuantity:false,canBuy:true,name:"",pict:{},id:0,addUrl:"",buyUrl:""};this.basketMode="";this.basketData={useProps:false,emptyProps:false,quantity:"quantity",props:"prop",basketUrl:"",sku_props:"",sku_props_var:"basket_props",add_url:"",buy_url:""};this.compareData={compareUrl:"",compareDeleteUrl:"",comparePath:""};this.defaultPict={pict:null,secondPict:null};this.defaultSliderOptions={interval:3e3,wrap:true};this.slider={options:{},items:[],active:null,sliding:null,paused:null,interval:null,progress:null};this.touch=null;this.quantityDelay=null;this.quantityTimer=null;this.checkQuantity=false;this.maxQuantity=0;this.minQuantity=0;this.stepQuantity=1;this.isDblQuantity=false;this.canBuy=true;this.precision=6;this.precisionFactor=Math.pow(10,this.precision);this.bigData=false;this.fullDisplayMode=false;this.viewMode="";this.templateTheme="";this.currentPriceMode="";this.currentPrices=[];this.currentPriceSelected=0;this.currentQuantityRanges=[];this.currentQuantityRangeSelected=0;this.offers=[];this.offerNum=0;this.treeProps=[];this.selectedValues={};this.obProduct=null;this.blockNodes={};this.obQuantity=null;this.obQuantityUp=null;this.obQuantityDown=null;this.obQuantityLimit={};this.obPict=null;this.obSecondPict=null;this.obPictSlider=null;this.obPictSliderIndicator=null;this.obPrice=null;this.obTree=null;this.obBuyBtn=null;this.obBasketActions=null;this.obNotAvail=null;this.obSubscribe=null;this.obDscPerc=null;this.obSecondDscPerc=null;this.obSkuProps=null;this.obMeasure=null;this.obCompare=null;this.obPopupWin=null;this.basketUrl="";this.basketParams={};this.isTouchDevice=BX.hasClass(document.documentElement,"bx-touch");this.hoverTimer=null;this.hoverStateChangeForbidden=false;this.mouseX=null;this.mouseY=null;this.useEnhancedEcommerce=false;this.dataLayerName="dataLayer";this.brandProperty=false;this.errorCode=0;if(typeof t==="object"){if(t.PRODUCT_TYPE){this.productType=parseInt(t.PRODUCT_TYPE,10)}this.showQuantity=t.SHOW_QUANTITY;this.showAbsent=t.SHOW_ABSENT;this.secondPict=t.SECOND_PICT;this.showOldPrice=t.SHOW_OLD_PRICE;this.showMaxQuantity=t.SHOW_MAX_QUANTITY;this.relativeQuantityFactor=parseInt(t.RELATIVE_QUANTITY_FACTOR);this.showPercent=t.SHOW_DISCOUNT_PERCENT;this.showSkuProps=t.SHOW_SKU_PROPS;this.showSubscription=t.USE_SUBSCRIBE;if(t.ADD_TO_BASKET_ACTION){this.basketAction=t.ADD_TO_BASKET_ACTION}this.showClosePopup=t.SHOW_CLOSE_POPUP;this.useCompare=t.DISPLAY_COMPARE;this.fullDisplayMode=t.PRODUCT_DISPLAY_MODE==="Y";this.bigData=t.BIG_DATA;this.viewMode=t.VIEW_MODE||"";this.templateTheme=t.TEMPLATE_THEME||"";this.useEnhancedEcommerce=t.USE_ENHANCED_ECOMMERCE==="Y";this.dataLayerName=t.DATA_LAYER_NAME;this.brandProperty=t.BRAND_PROPERTY;this.visual=t.VISUAL;switch(this.productType){case 0:case 1:case 2:if(t.PRODUCT&&typeof t.PRODUCT==="object"){this.currentPriceMode=t.PRODUCT.ITEM_PRICE_MODE;this.currentPrices=t.PRODUCT.ITEM_PRICES;this.currentPriceSelected=t.PRODUCT.ITEM_PRICE_SELECTED;this.currentQuantityRanges=t.PRODUCT.ITEM_QUANTITY_RANGES;this.currentQuantityRangeSelected=t.PRODUCT.ITEM_QUANTITY_RANGE_SELECTED;if(this.showQuantity){this.product.checkQuantity=t.PRODUCT.CHECK_QUANTITY;this.product.isDblQuantity=t.PRODUCT.QUANTITY_FLOAT;if(this.product.checkQuantity){this.product.maxQuantity=this.product.isDblQuantity?parseFloat(t.PRODUCT.MAX_QUANTITY):parseInt(t.PRODUCT.MAX_QUANTITY,10)}this.product.stepQuantity=this.product.isDblQuantity?parseFloat(t.PRODUCT.STEP_QUANTITY):parseInt(t.PRODUCT.STEP_QUANTITY,10);this.checkQuantity=this.product.checkQuantity;this.isDblQuantity=this.product.isDblQuantity;this.stepQuantity=this.product.stepQuantity;this.maxQuantity=this.product.maxQuantity;this.minQuantity=this.currentPriceMode==="Q"?parseFloat(this.currentPrices[this.currentPriceSelected].MIN_QUANTITY):this.stepQuantity;if(this.isDblQuantity){this.stepQuantity=Math.round(this.stepQuantity*this.precisionFactor)/this.precisionFactor}}this.product.canBuy=t.PRODUCT.CAN_BUY;if(t.PRODUCT.MORE_PHOTO_COUNT){this.product.morePhotoCount=t.PRODUCT.MORE_PHOTO_COUNT;this.product.morePhoto=t.PRODUCT.MORE_PHOTO}if(t.PRODUCT.RCM_ID){this.product.rcmId=t.PRODUCT.RCM_ID}this.canBuy=this.product.canBuy;this.product.name=t.PRODUCT.NAME;this.product.pict=t.PRODUCT.PICT;this.product.id=t.PRODUCT.ID;this.product.DETAIL_PAGE_URL=t.PRODUCT.DETAIL_PAGE_URL;if(t.PRODUCT.ADD_URL){this.product.addUrl=t.PRODUCT.ADD_URL}if(t.PRODUCT.BUY_URL){this.product.buyUrl=t.PRODUCT.BUY_URL}if(t.BASKET&&typeof t.BASKET==="object"){this.basketData.useProps=t.BASKET.ADD_PROPS;this.basketData.emptyProps=t.BASKET.EMPTY_PROPS}}else{this.errorCode=-1}break;case 3:if(t.PRODUCT&&typeof t.PRODUCT==="object"){this.product.name=t.PRODUCT.NAME;this.product.id=t.PRODUCT.ID;this.product.DETAIL_PAGE_URL=t.PRODUCT.DETAIL_PAGE_URL;this.product.morePhotoCount=t.PRODUCT.MORE_PHOTO_COUNT;this.product.morePhoto=t.PRODUCT.MORE_PHOTO;if(t.PRODUCT.RCM_ID){this.product.rcmId=t.PRODUCT.RCM_ID}}if(t.OFFERS&&BX.type.isArray(t.OFFERS)){this.offers=t.OFFERS;this.offerNum=0;if(t.OFFER_SELECTED){this.offerNum=parseInt(t.OFFER_SELECTED,10)}if(isNaN(this.offerNum)){this.offerNum=0}if(t.TREE_PROPS){this.treeProps=t.TREE_PROPS}if(t.DEFAULT_PICTURE){this.defaultPict.pict=t.DEFAULT_PICTURE.PICTURE;this.defaultPict.secondPict=t.DEFAULT_PICTURE.PICTURE_SECOND}}break;default:this.errorCode=-1}if(t.BASKET&&typeof t.BASKET==="object"){if(t.BASKET.QUANTITY){this.basketData.quantity=t.BASKET.QUANTITY}if(t.BASKET.PROPS){this.basketData.props=t.BASKET.PROPS}if(t.BASKET.BASKET_URL){this.basketData.basketUrl=t.BASKET.BASKET_URL}if(3===this.productType){if(t.BASKET.SKU_PROPS){this.basketData.sku_props=t.BASKET.SKU_PROPS}}if(t.BASKET.ADD_URL_TEMPLATE){this.basketData.add_url=t.BASKET.ADD_URL_TEMPLATE}if(t.BASKET.BUY_URL_TEMPLATE){this.basketData.buy_url=t.BASKET.BUY_URL_TEMPLATE}if(this.basketData.add_url===""&&this.basketData.buy_url===""){this.errorCode=-1024}}if(this.useCompare){if(t.COMPARE&&typeof t.COMPARE==="object"){if(t.COMPARE.COMPARE_PATH){this.compareData.comparePath=t.COMPARE.COMPARE_PATH}if(t.COMPARE.COMPARE_URL_TEMPLATE){this.compareData.compareUrl=t.COMPARE.COMPARE_URL_TEMPLATE}else{this.useCompare=false}if(t.COMPARE.COMPARE_DELETE_URL_TEMPLATE){this.compareData.compareDeleteUrl=t.COMPARE.COMPARE_DELETE_URL_TEMPLATE}else{this.useCompare=false}}else{this.useCompare=false}}}if(this.errorCode===0){BX.ready(BX.delegate(this.init,this))}};t.JCCatalogItem.prototype={init:function(){var t=0,i=null;this.obProduct=BX(this.visual.ID);if(!this.obProduct){this.errorCode=-1}this.obPict=BX(this.visual.PICT_ID);if(!this.obPict){this.errorCode=-2}if(this.secondPict&&this.visual.SECOND_PICT_ID){this.obSecondPict=BX(this.visual.SECOND_PICT_ID)}this.obPictSlider=BX(this.visual.PICT_SLIDER_ID);this.obPictSliderIndicator=BX(this.visual.PICT_SLIDER_ID+"_indicator");this.obPictSliderProgressBar=BX(this.visual.PICT_SLIDER_ID+"_progress_bar");if(!this.obPictSlider){this.errorCode=-4}this.obPrice=BX(this.visual.PRICE_ID);this.obPriceOld=BX(this.visual.PRICE_OLD_ID);this.obPriceTotal=BX(this.visual.PRICE_TOTAL_ID);if(!this.obPrice){this.errorCode=-16}if(this.showQuantity&&this.visual.QUANTITY_ID){this.obQuantity=BX(this.visual.QUANTITY_ID);this.blockNodes.quantity=this.obProduct.querySelector('[data-entity="quantity-block"]');if(!this.isTouchDevice){BX.bind(this.obQuantity,"focus",BX.proxy(this.onFocus,this));BX.bind(this.obQuantity,"blur",BX.proxy(this.onBlur,this))}if(this.visual.QUANTITY_UP_ID){this.obQuantityUp=BX(this.visual.QUANTITY_UP_ID)}if(this.visual.QUANTITY_DOWN_ID){this.obQuantityDown=BX(this.visual.QUANTITY_DOWN_ID)}}if(this.visual.QUANTITY_LIMIT&&this.showMaxQuantity!=="N"){this.obQuantityLimit.all=BX(this.visual.QUANTITY_LIMIT);if(this.obQuantityLimit.all){this.obQuantityLimit.value=this.obQuantityLimit.all.querySelector('[data-entity="quantity-limit-value"]');if(!this.obQuantityLimit.value){this.obQuantityLimit.all=null}}}if(this.productType===3&&this.fullDisplayMode){if(this.visual.TREE_ID){this.obTree=BX(this.visual.TREE_ID);if(!this.obTree){this.errorCode=-256}}if(this.visual.QUANTITY_MEASURE){this.obMeasure=BX(this.visual.QUANTITY_MEASURE)}}this.obBasketActions=BX(this.visual.BASKET_ACTIONS_ID);if(this.obBasketActions){if(this.visual.BUY_ID){this.obBuyBtn=BX(this.visual.BUY_ID)}}this.obNotAvail=BX(this.visual.NOT_AVAILABLE_MESS);if(this.showSubscription){this.obSubscribe=BX(this.visual.SUBSCRIBE_ID)}if(this.showPercent){if(this.visual.DSC_PERC){this.obDscPerc=BX(this.visual.DSC_PERC)}if(this.secondPict&&this.visual.SECOND_DSC_PERC){this.obSecondDscPerc=BX(this.visual.SECOND_DSC_PERC)}}if(this.showSkuProps){if(this.visual.DISPLAY_PROP_DIV){this.obSkuProps=BX(this.visual.DISPLAY_PROP_DIV)}}if(this.errorCode===0){if(this.isTouchDevice){BX.bind(this.obPictSlider,"touchstart",BX.proxy(this.touchStartEvent,this));BX.bind(this.obPictSlider,"touchend",BX.proxy(this.touchEndEvent,this));BX.bind(this.obPictSlider,"touchcancel",BX.proxy(this.touchEndEvent,this))}else{if(this.viewMode==="CARD"){BX.bind(this.obProduct,"mouseenter",BX.proxy(this.hoverOn,this));BX.bind(this.obProduct,"mouseleave",BX.proxy(this.hoverOff,this))}BX.bind(this.obProduct,"mouseenter",BX.proxy(this.cycleSlider,this));BX.bind(this.obProduct,"mouseleave",BX.proxy(this.stopSlider,this))}if(this.bigData){var e=BX.findChildren(this.obProduct,{tag:"a"},true);if(e){for(t in e){if(e.hasOwnProperty(t)){if(e[t].getAttribute("href")==this.product.DETAIL_PAGE_URL){BX.bind(e[t],"click",BX.proxy(this.rememberProductRecommendation,this))}}}}}if(this.showQuantity){var s=this.isTouchDevice?"touchstart":"mousedown";var r=this.isTouchDevice?"touchend":"mouseup";if(this.obQuantityUp){BX.bind(this.obQuantityUp,s,BX.proxy(this.startQuantityInterval,this));BX.bind(this.obQuantityUp,r,BX.proxy(this.clearQuantityInterval,this));BX.bind(this.obQuantityUp,"mouseout",BX.proxy(this.clearQuantityInterval,this));BX.bind(this.obQuantityUp,"click",BX.delegate(this.quantityUp,this))}if(this.obQuantityDown){BX.bind(this.obQuantityDown,s,BX.proxy(this.startQuantityInterval,this));BX.bind(this.obQuantityDown,r,BX.proxy(this.clearQuantityInterval,this));BX.bind(this.obQuantityDown,"mouseout",BX.proxy(this.clearQuantityInterval,this));BX.bind(this.obQuantityDown,"click",BX.delegate(this.quantityDown,this))}if(this.obQuantity){BX.bind(this.obQuantity,"change",BX.delegate(this.quantityChange,this))}}switch(this.productType){case 0:case 1:case 2:if(parseInt(this.product.morePhotoCount)>1&&this.obPictSlider){this.initializeSlider()}this.checkQuantityControls();break;case 3:if(this.offers.length>0){i=BX.findChildren(this.obTree,{tagName:"li"},true);if(i&&i.length){for(t=0;t<i.length;t++){BX.bind(i[t],"click",BX.delegate(this.selectOfferProp,this))}}this.setCurrent()}else if(parseInt(this.product.morePhotoCount)>1&&this.obPictSlider){this.initializeSlider()}break}if(this.obBuyBtn){if(this.basketAction==="ADD"){BX.bind(this.obBuyBtn,"click",BX.proxy(this.add2Basket,this))}else{BX.bind(this.obBuyBtn,"click",BX.proxy(this.buyBasket,this))}}if(this.useCompare){this.obCompare=BX(this.visual.COMPARE_LINK_ID);if(this.obCompare){BX.bind(this.obCompare,"click",BX.proxy(this.compare,this))}BX.addCustomEvent("onCatalogDeleteCompare",BX.proxy(this.checkDeletedCompare,this))}}},setAnalyticsDataLayer:function(i){if(!this.useEnhancedEcommerce||!this.dataLayerName)return;var e={},s={},r=[],a,o,h,n,l,u;switch(this.productType){case 0:case 1:case 2:e={id:this.product.id,name:this.product.name,price:this.currentPrices[this.currentPriceSelected]&&this.currentPrices[this.currentPriceSelected].PRICE,brand:BX.type.isArray(this.brandProperty)?this.brandProperty.join("/"):this.brandProperty};break;case 3:for(a in this.offers[this.offerNum].TREE){if(this.offers[this.offerNum].TREE.hasOwnProperty(a)){n=a.substring(5);l=this.offers[this.offerNum].TREE[a];for(o in this.treeProps){if(this.treeProps.hasOwnProperty(o)&&this.treeProps[o].ID==n){for(h in this.treeProps[o].VALUES){u=this.treeProps[o].VALUES[h];if(u.ID==l){r.push(u.NAME);break}}}}}}e={id:this.offers[this.offerNum].ID,name:this.offers[this.offerNum].NAME,price:this.currentPrices[this.currentPriceSelected]&&this.currentPrices[this.currentPriceSelected].PRICE,brand:BX.type.isArray(this.brandProperty)?this.brandProperty.join("/"):this.brandProperty,variant:r.join("/")};break}switch(i){case"addToCart":s={event:"addToCart",ecommerce:{currencyCode:this.currentPrices[this.currentPriceSelected]&&this.currentPrices[this.currentPriceSelected].CURRENCY||"",add:{products:[{name:e.name||"",id:e.id||"",price:e.price||0,brand:e.brand||"",category:e.category||"",variant:e.variant||"",quantity:this.showQuantity&&this.obQuantity?this.obQuantity.value:1}]}}};break}t[this.dataLayerName]=t[this.dataLayerName]||[];t[this.dataLayerName].push(s)},hoverOn:function(t){clearTimeout(this.hoverTimer);this.obProduct.style.height=getComputedStyle(this.obProduct).height;BX.addClass(this.obProduct,"hover");BX.PreventDefault(t)},hoverOff:function(t){if(this.hoverStateChangeForbidden)return;BX.removeClass(this.obProduct,"hover");this.hoverTimer=setTimeout(BX.delegate(function(){this.obProduct.style.height="auto"},this),300);BX.PreventDefault(t)},onFocus:function(){this.hoverStateChangeForbidden=true;BX.bind(document,"mousemove",BX.proxy(this.captureMousePosition,this))},onBlur:function(){this.hoverStateChangeForbidden=false;BX.unbind(document,"mousemove",BX.proxy(this.captureMousePosition,this));var t=document.elementFromPoint(this.mouseX,this.mouseY);if(!t||!this.obProduct.contains(t)){this.hoverOff()}},captureMousePosition:function(t){this.mouseX=t.clientX;this.mouseY=t.clientY},getCookie:function(t){var i=document.cookie.match(new RegExp("(?:^|; )"+t.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return i?decodeURIComponent(i[1]):null},rememberProductRecommendation:function(){var t=BX.cookie_prefix+"_RCM_PRODUCT_LOG",i=this.getCookie(t),e=false;var s=[],r;if(i){s=i.split(".")}var a=s.length;while(a--){r=s[a].split("-");if(r[0]==this.product.id){r=s[a].split("-");r[1]=this.product.rcmId;r[2]=BX.current_server_time;s[a]=r.join("-");e=true}else{if(BX.current_server_time-r[2]>3600*24*30){s.splice(a,1)}}}if(!e){s.push([this.product.id,this.product.rcmId,BX.current_server_time].join("-"))}var o=s.join("."),h=new Date((new Date).getTime()+1e3*3600*24*365*10).toUTCString();document.cookie=t+"="+o+"; path=/; expires="+h+"; domain="+BX.cookie_domain},startQuantityInterval:function(){var t=BX.proxy_context;var i=t.id===this.visual.QUANTITY_DOWN_ID?BX.proxy(this.quantityDown,this):BX.proxy(this.quantityUp,this);this.quantityDelay=setTimeout(BX.delegate(function(){this.quantityTimer=setInterval(i,150)},this),300)},clearQuantityInterval:function(){clearTimeout(this.quantityDelay);clearInterval(this.quantityTimer)},quantityUp:function(){var t=0,i=true;if(this.errorCode===0&&this.showQuantity&&this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){t+=this.stepQuantity;if(this.checkQuantity){if(t>this.maxQuantity){i=false}}if(i){if(this.isDblQuantity){t=Math.round(t*this.precisionFactor)/this.precisionFactor}this.obQuantity.value=t;this.setPrice()}}}},quantityDown:function(){var t=0,i=true;if(this.errorCode===0&&this.showQuantity&&this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){t-=this.stepQuantity;this.checkPriceRange(t);if(t<this.minQuantity){i=false}if(i){if(this.isDblQuantity){t=Math.round(t*this.precisionFactor)/this.precisionFactor}this.obQuantity.value=t;this.setPrice()}}}},quantityChange:function(){var t=0,i;if(this.errorCode===0&&this.showQuantity){if(this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):Math.round(this.obQuantity.value);if(!isNaN(t)){if(this.checkQuantity){if(t>this.maxQuantity){t=this.maxQuantity}}this.checkPriceRange(t);i=Math.floor(Math.round(t*this.precisionFactor/this.stepQuantity)/this.precisionFactor)||1;t=i<=1?this.stepQuantity:i*this.stepQuantity;t=Math.round(t*this.precisionFactor)/this.precisionFactor;if(t<this.minQuantity){t=this.minQuantity}this.obQuantity.value=t}else{this.obQuantity.value=this.minQuantity}}else{this.obQuantity.value=this.minQuantity}this.setPrice()}},quantitySet:function(t){var i,e;var s=this.offers[t],r=this.offers[this.offerNum];if(this.errorCode===0){this.canBuy=s.CAN_BUY;this.currentPriceMode=s.ITEM_PRICE_MODE;this.currentPrices=s.ITEM_PRICES;this.currentPriceSelected=s.ITEM_PRICE_SELECTED;this.currentQuantityRanges=s.ITEM_QUANTITY_RANGES;this.currentQuantityRangeSelected=s.ITEM_QUANTITY_RANGE_SELECTED;if(this.canBuy){if(this.blockNodes.quantity){BX.style(this.blockNodes.quantity,"display","")}if(this.obBasketActions){BX.style(this.obBasketActions,"display","")}if(this.obNotAvail){BX.style(this.obNotAvail,"display","none")}if(this.obSubscribe){BX.style(this.obSubscribe,"display","none")}}else{if(this.blockNodes.quantity){BX.style(this.blockNodes.quantity,"display","none")}if(this.obBasketActions){BX.style(this.obBasketActions,"display","none")}if(this.obNotAvail){BX.style(this.obNotAvail,"display","")}if(this.obSubscribe){if(s.CATALOG_SUBSCRIBE==="Y"){BX.style(this.obSubscribe,"display","");this.obSubscribe.setAttribute("data-item",s.ID);BX(this.visual.SUBSCRIBE_ID+"_hidden").click()}else{BX.style(this.obSubscribe,"display","none")}}}this.isDblQuantity=s.QUANTITY_FLOAT;this.checkQuantity=s.CHECK_QUANTITY;if(this.isDblQuantity){this.stepQuantity=Math.round(parseFloat(s.STEP_QUANTITY)*this.precisionFactor)/this.precisionFactor;this.maxQuantity=parseFloat(s.MAX_QUANTITY);this.minQuantity=this.currentPriceMode==="Q"?parseFloat(this.currentPrices[this.currentPriceSelected].MIN_QUANTITY):this.stepQuantity}else{this.stepQuantity=parseInt(s.STEP_QUANTITY,10);this.maxQuantity=parseInt(s.MAX_QUANTITY,10);this.minQuantity=this.currentPriceMode==="Q"?parseInt(this.currentPrices[this.currentPriceSelected].MIN_QUANTITY):this.stepQuantity}if(this.showQuantity){var a=r.ITEM_PRICES.length&&r.ITEM_PRICES[r.ITEM_PRICE_SELECTED]&&r.ITEM_PRICES[r.ITEM_PRICE_SELECTED].MIN_QUANTITY!=this.minQuantity;if(this.isDblQuantity){i=Math.round(parseFloat(r.STEP_QUANTITY)*this.precisionFactor)/this.precisionFactor!==this.stepQuantity||a||r.MEASURE!==s.MEASURE||this.checkQuantity&&parseFloat(r.MAX_QUANTITY)>this.maxQuantity&&parseFloat(this.obQuantity.value)>this.maxQuantity}else{i=parseInt(r.STEP_QUANTITY,10)!==this.stepQuantity||a||r.MEASURE!==s.MEASURE||this.checkQuantity&&parseInt(r.MAX_QUANTITY,10)>this.maxQuantity&&parseInt(this.obQuantity.value,10)>this.maxQuantity}this.obQuantity.disabled=!this.canBuy;if(i){this.obQuantity.value=this.minQuantity}if(this.obMeasure){if(s.MEASURE){BX.adjust(this.obMeasure,{html:s.MEASURE})}else{BX.adjust(this.obMeasure,{html:""})}}}if(this.obQuantityLimit.all){if(!this.checkQuantity||this.maxQuantity==0){BX.adjust(this.obQuantityLimit.value,{html:""});BX.adjust(this.obQuantityLimit.all,{style:{display:"none"}})}else{if(this.showMaxQuantity==="M"){e=this.maxQuantity/this.stepQuantity>=this.relativeQuantityFactor?BX.message("RELATIVE_QUANTITY_MANY"):BX.message("RELATIVE_QUANTITY_FEW")}else{e=this.maxQuantity;if(s.MEASURE){e+=" "+s.MEASURE}}BX.adjust(this.obQuantityLimit.value,{html:e});BX.adjust(this.obQuantityLimit.all,{style:{display:""}})}}}},initializeSlider:function(){var t=this.obPictSlider.getAttribute("data-slider-wrap");if(t){this.slider.options.wrap=t==="true"}else{this.slider.options.wrap=this.defaultSliderOptions.wrap}if(this.isTouchDevice){this.slider.options.interval=false}else{this.slider.options.interval=parseInt(this.obPictSlider.getAttribute("data-slider-interval"))||this.defaultSliderOptions.interval;if(this.slider.options.interval<700){this.slider.options.interval=700}if(this.obPictSliderIndicator){var i=this.obPictSliderIndicator.querySelectorAll("[data-go-to]");for(var e in i){if(i.hasOwnProperty(e)){BX.bind(i[e],"click",BX.proxy(this.sliderClickHandler,this))}}}if(this.obPictSliderProgressBar){if(this.slider.progress){this.resetProgress();this.cycleSlider()}else{this.slider.progress=new BX.easing({transition:BX.easing.transitions.linear,step:BX.delegate(function(t){this.obPictSliderProgressBar.style.width=t.width/10+"%"},this)})}}}},checkTouch:function(t){if(!t||!t.changedTouches)return false;return t.changedTouches[0].identifier===this.touch.identifier},touchStartEvent:function(t){if(t.touches.length!=1)return;this.touch=t.changedTouches[0]},touchEndEvent:function(t){if(!this.checkTouch(t))return;var i=this.touch.pageX-t.changedTouches[0].pageX,e=this.touch.pageY-t.changedTouches[0].pageY;if(Math.abs(i)>=Math.abs(e)+10){if(i>0){this.slideNext()}if(i<0){this.slidePrev()}}},sliderClickHandler:function(t){var i=BX.getEventTarget(t),e=i.getAttribute("data-go-to");if(e){this.slideTo(e)}BX.PreventDefault(t)},slideNext:function(){if(this.slider.sliding)return;return this.slide("next")},slidePrev:function(){if(this.slider.sliding)return;return this.slide("prev")},slideTo:function(t){this.slider.active=BX.findChild(this.obPictSlider,{className:"item active"},true,false);this.slider.progress&&(this.slider.interval=true);var i=this.getItemIndex(this.slider.active);if(t>this.slider.items.length-1||t<0)return;if(this.slider.sliding)return false;if(i==t){this.stopSlider();this.cycleSlider();return}return this.slide(t>i?"next":"prev",this.eq(this.slider.items,t))},slide:function(t,i){var e=BX.findChild(this.obPictSlider,{className:"item active"},true,false),s=this.slider.interval,r=t==="next"?"left":"right";i=i||this.getItemForDirection(t,e);if(BX.hasClass(i,"active")){return this.slider.sliding=false}this.slider.sliding=true;s&&this.stopSlider();if(this.obPictSliderIndicator){BX.removeClass(this.obPictSliderIndicator.querySelector(".active"),"active");var a=this.obPictSliderIndicator.querySelectorAll("[data-go-to]")[this.getItemIndex(i)];a&&BX.addClass(a,"active")}if(BX.hasClass(this.obPictSlider,"slide")&&!BX.browser.IsIE()){var o=this;BX.addClass(i,t);i.offsetWidth;BX.addClass(e,r);BX.addClass(i,r);setTimeout(function(){BX.addClass(i,"active");BX.removeClass(e,"active");BX.removeClass(e,r);BX.removeClass(i,t);BX.removeClass(i,r);o.slider.sliding=false},700)}else{BX.addClass(i,"active");this.slider.sliding=false}this.obPictSliderProgressBar&&this.resetProgress();s&&this.cycleSlider()},stopSlider:function(t){t||(this.slider.paused=true);this.slider.interval&&clearInterval(this.slider.interval);if(this.slider.progress){this.slider.progress.stop();var i=parseInt(this.obPictSliderProgressBar.style.width);this.slider.progress.options.duration=this.slider.options.interval*i/200;this.slider.progress.options.start={width:i*10};this.slider.progress.options.finish={width:0};this.slider.progress.options.complete=null;this.slider.progress.animate()}},cycleSlider:function(t){t||(this.slider.paused=false);this.slider.interval&&clearInterval(this.slider.interval);if(this.slider.options.interval&&!this.slider.paused){if(this.slider.progress){this.slider.progress.stop();var i=parseInt(this.obPictSliderProgressBar.style.width);this.slider.progress.options.duration=this.slider.options.interval*(100-i)/100;this.slider.progress.options.start={width:i*10};this.slider.progress.options.finish={width:1e3};this.slider.progress.options.complete=BX.delegate(function(){this.slider.interval=true;this.slideNext()},this);this.slider.progress.animate()}else{this.slider.interval=setInterval(BX.proxy(this.slideNext,this),this.slider.options.interval)}}},resetProgress:function(){this.slider.progress&&this.slider.progress.stop();this.obPictSliderProgressBar.style.width=0},getItemForDirection:function(t,i){var e=this.getItemIndex(i),s=t==="prev"&&e===0||t==="next"&&e==this.slider.items.length-1;if(s&&!this.slider.options.wrap)return i;var r=t==="prev"?-1:1,a=(e+r)%this.slider.items.length;return this.eq(this.slider.items,a)},getItemIndex:function(t){this.slider.items=BX.findChildren(t.parentNode,{className:"item"},true);return this.slider.items.indexOf(t||this.slider.active)},eq:function(t,i){var e=t.length,s=+i+(i<0?e:0);return s>=0&&s<e?t[s]:{}},selectOfferProp:function(){var t=0,i="",e="",s=[],r=null,a=BX.proxy_context;if(a&&a.hasAttribute("data-treevalue")){if(BX.hasClass(a,"selected"))return;e=a.getAttribute("data-treevalue");s=e.split("_");if(this.searchOfferPropIndex(s[0],s[1])){r=BX.findChildren(a.parentNode,{tagName:"li"},false);if(r&&0<r.length){for(t=0;t<r.length;t++){i=r[t].getAttribute("data-onevalue");if(i===s[1]){BX.addClass(r[t],"selected")}else{BX.removeClass(r[t],"selected")}}}}}},searchOfferPropIndex:function(t,i){var e="",s=false,r,a,o=[],h=[],n=-1,l={},u=[];for(r=0;r<this.treeProps.length;r++){if(this.treeProps[r].ID===t){n=r;break}}if(-1<n){for(r=0;r<n;r++){e="PROP_"+this.treeProps[r].ID;l[e]=this.selectedValues[e]}e="PROP_"+this.treeProps[n].ID;s=this.getRowValues(l,e);if(!s){return false}if(!BX.util.in_array(i,s)){return false}l[e]=i;for(r=n+1;r<this.treeProps.length;r++){e="PROP_"+this.treeProps[r].ID;s=this.getRowValues(l,e);if(!s){return false}h=[];if(this.showAbsent){o=[];u=[];u=BX.clone(l,true);for(a=0;a<s.length;a++){u[e]=s[a];h[h.length]=s[a];if(this.getCanBuy(u))o[o.length]=s[a]}}else{o=s}if(this.selectedValues[e]&&BX.util.in_array(this.selectedValues[e],o)){l[e]=this.selectedValues[e]}else{if(this.showAbsent)l[e]=o.length>0?o[0]:h[0];else l[e]=o[0]}this.updateRow(r,l[e],s,o)}this.selectedValues=l;this.changeInfo()}return true},updateRow:function(t,i,e,s){var r=0,a="",o=false,h=null;var n=this.obTree.querySelectorAll('[data-entity="sku-line-block"]'),l;if(t>-1&&t<n.length){l=n[t].querySelector("ul");h=BX.findChildren(l,{tagName:"li"},false);if(h&&0<h.length){for(r=0;r<h.length;r++){a=h[r].getAttribute("data-onevalue");o=a===i;if(o){BX.addClass(h[r],"selected")}else{BX.removeClass(h[r],"selected")}if(BX.util.in_array(a,s)){BX.removeClass(h[r],"notallowed")}else{BX.addClass(h[r],"notallowed")}h[r].style.display=BX.util.in_array(a,e)?"":"none";if(o){n[t].style.display=a==0&&s.length==1?"none":""}}}}},getRowValues:function(t,i){var e=0,s,r=[],a=false,o=true;if(0===t.length){for(e=0;e<this.offers.length;e++){if(!BX.util.in_array(this.offers[e].TREE[i],r)){r[r.length]=this.offers[e].TREE[i]}}a=true}else{for(e=0;e<this.offers.length;e++){o=true;for(s in t){if(t[s]!==this.offers[e].TREE[s]){o=false;break}}if(o){if(!BX.util.in_array(this.offers[e].TREE[i],r)){r[r.length]=this.offers[e].TREE[i]}a=true}}}return a?r:false},getCanBuy:function(t){var i,e,s=false,r=true;for(i=0;i<this.offers.length;i++){r=true;for(e in t){if(t[e]!==this.offers[i].TREE[e]){r=false;break}}if(r){if(this.offers[i].CAN_BUY){s=true;break}}}return s},setCurrent:function(){var t,i=0,e=[],s="",r=false,a={},o=[],h=this.offers[this.offerNum].TREE;for(t=0;t<this.treeProps.length;t++){s="PROP_"+this.treeProps[t].ID;r=this.getRowValues(a,s);if(!r){break}if(BX.util.in_array(h[s],r)){a[s]=h[s]}else{a[s]=r[0];this.offerNum=0}if(this.showAbsent){e=[];o=[];o=BX.clone(a,true);for(i=0;i<r.length;i++){o[s]=r[i];if(this.getCanBuy(o)){e[e.length]=r[i]}}}else{e=r}this.updateRow(t,a[s],r,e)}this.selectedValues=a;this.changeInfo()},changeInfo:function(){var t,i,e=-1,s=true,r;for(t=0;t<this.offers.length;t++){s=true;for(i in this.selectedValues){if(this.selectedValues[i]!==this.offers[t].TREE[i]){s=false;break}}if(s){e=t;break}}if(e>-1){if(parseInt(this.offers[e].MORE_PHOTO_COUNT)>1&&this.obPictSlider){if(this.obPict){this.obPict.style.display="none"}if(this.obSecondPict){this.obSecondPict.style.display="none"}BX.cleanNode(this.obPictSlider);for(t in this.offers[e].MORE_PHOTO){if(this.offers[e].MORE_PHOTO.hasOwnProperty(t)){this.obPictSlider.appendChild(BX.create("SPAN",{props:{className:"product-item-image-slide item"+(t==0?" active":"")},style:{backgroundImage:"url('"+this.offers[e].MORE_PHOTO[t].SRC+"')"}}))}}if(this.obPictSliderIndicator){BX.cleanNode(this.obPictSliderIndicator);for(t in this.offers[e].MORE_PHOTO){if(this.offers[e].MORE_PHOTO.hasOwnProperty(t)){this.obPictSliderIndicator.appendChild(BX.create("DIV",{attrs:{"data-go-to":t},props:{className:"product-item-image-slider-control"+(t==0?" active":"")}}));this.obPictSliderIndicator.appendChild(document.createTextNode(" "))}}this.obPictSliderIndicator.style.display=""}if(this.obPictSliderProgressBar){this.obPictSliderProgressBar.style.display=""}this.obPictSlider.style.display="";this.initializeSlider()}else{if(this.obPictSlider){this.obPictSlider.style.display="none"}if(this.obPictSliderIndicator){this.obPictSliderIndicator.style.display="none"}if(this.obPictSliderProgressBar){this.obPictSliderProgressBar.style.display="none"}if(this.obPict){if(this.offers[e].PREVIEW_PICTURE){BX.adjust(this.obPict,{style:{backgroundImage:"url('"+this.offers[e].PREVIEW_PICTURE.SRC+"')"}})}else{BX.adjust(this.obPict,{style:{backgroundImage:"url('"+this.defaultPict.pict.SRC+"')"}})}this.obPict.style.display=""}if(this.secondPict&&this.obSecondPict){if(this.offers[e].PREVIEW_PICTURE_SECOND){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url('"+this.offers[e].PREVIEW_PICTURE_SECOND.SRC+"')"}})}else if(this.offers[e].PREVIEW_PICTURE.SRC){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url('"+this.offers[e].PREVIEW_PICTURE.SRC+"')"}})}else if(this.defaultPict.secondPict){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url('"+this.defaultPict.secondPict.SRC+"')"}})}else{BX.adjust(this.obSecondPict,{style:{backgroundImage:"url('"+this.defaultPict.pict.SRC+"')"}})}this.obSecondPict.style.display=""}}if(this.showSkuProps&&this.obSkuProps){if(this.offers[e].DISPLAY_PROPERTIES.length){BX.adjust(this.obSkuProps,{style:{display:""},html:this.offers[e].DISPLAY_PROPERTIES})}else{BX.adjust(this.obSkuProps,{style:{display:"none"},html:""})}}this.quantitySet(e);this.setPrice();this.setCompared(this.offers[e].COMPARED);this.offerNum=e}},checkPriceRange:function(t){if(typeof t==="undefined"||this.currentPriceMode!="Q")return;var i,e=false;for(var s in this.currentQuantityRanges){if(this.currentQuantityRanges.hasOwnProperty(s)){i=this.currentQuantityRanges[s];if(parseInt(t)>=parseInt(i.SORT_FROM)&&(i.SORT_TO=="INF"||parseInt(t)<=parseInt(i.SORT_TO))){e=true;this.currentQuantityRangeSelected=i.HASH;break}}}if(!e&&(i=this.getMinPriceRange())){this.currentQuantityRangeSelected=i.HASH}for(var r in this.currentPrices){if(this.currentPrices.hasOwnProperty(r)){if(this.currentPrices[r].QUANTITY_HASH==this.currentQuantityRangeSelected){this.currentPriceSelected=r;break}}}},getMinPriceRange:function(){var t;for(var i in this.currentQuantityRanges){if(this.currentQuantityRanges.hasOwnProperty(i)){if(!t||parseInt(this.currentQuantityRanges[i].SORT_FROM)<parseInt(t.SORT_FROM)){t=this.currentQuantityRanges[i]}}}return t},checkQuantityControls:function(){if(!this.obQuantity)return;var t=this.checkQuantity&&parseFloat(this.obQuantity.value)+this.stepQuantity>this.maxQuantity,i=parseFloat(this.obQuantity.value)-this.stepQuantity<this.minQuantity;if(t){BX.addClass(this.obQuantityUp,"product-item-amount-field-btn-disabled")}else if(BX.hasClass(this.obQuantityUp,"product-item-amount-field-btn-disabled")){BX.removeClass(this.obQuantityUp,"product-item-amount-field-btn-disabled")}if(i){BX.addClass(this.obQuantityDown,"product-item-amount-field-btn-disabled")}else if(BX.hasClass(this.obQuantityDown,"product-item-amount-field-btn-disabled")){BX.removeClass(this.obQuantityDown,"product-item-amount-field-btn-disabled")}if(t&&i){this.obQuantity.setAttribute("disabled","disabled")}else{this.obQuantity.removeAttribute("disabled")}},setPrice:function(){var t,i;if(this.obQuantity){this.checkPriceRange(this.obQuantity.value)}this.checkQuantityControls();i=this.currentPrices[this.currentPriceSelected];if(this.obPrice){if(i){BX.adjust(this.obPrice,{html:BX.Currency.currencyFormat(i.RATIO_PRICE,i.CURRENCY,true)})}else{BX.adjust(this.obPrice,{html:""})}if(this.showOldPrice&&this.obPriceOld){if(i&&i.RATIO_PRICE!==i.RATIO_BASE_PRICE){BX.adjust(this.obPriceOld,{style:{display:""},html:BX.Currency.currencyFormat(i.RATIO_BASE_PRICE,i.CURRENCY,true)})}else{BX.adjust(this.obPriceOld,{style:{display:"none"},html:""})}}if(this.obPriceTotal){if(i&&this.obQuantity&&this.obQuantity.value!=this.stepQuantity){BX.adjust(this.obPriceTotal,{html:BX.message("PRICE_TOTAL_PREFIX")+" <strong>"+BX.Currency.currencyFormat(i.PRICE*this.obQuantity.value,i.CURRENCY,true)+"</strong>",style:{display:""}})}else{BX.adjust(this.obPriceTotal,{html:"",style:{display:"none"}})}}if(this.showPercent){if(i&&parseInt(i.DISCOUNT)>0){t={style:{display:""},html:-i.PERCENT+"%"}}else{t={style:{display:"none"},html:""}}if(this.obDscPerc){BX.adjust(this.obDscPerc,t)}if(this.obSecondDscPerc){BX.adjust(this.obSecondDscPerc,t)}}}},compare:function(t){var i=this.obCompare.querySelector('[data-entity="compare-checkbox"]'),e=BX.getEventTarget(t),s=true;if(i){s=e===i?i.checked:!i.checked}var r=s?this.compareData.compareUrl:this.compareData.compareDeleteUrl,a;if(r){if(e!==i){BX.PreventDefault(t);this.setCompared(s)}switch(this.productType){case 0:case 1:case 2:a=r.replace("#ID#",this.product.id.toString());break;case 3:a=r.replace("#ID#",this.offers[this.offerNum].ID);break}BX.ajax({method:"POST",dataType:s?"json":"html",url:a+(a.indexOf("?")!==-1?"&":"?")+"ajax_action=Y",onsuccess:s?BX.proxy(this.compareResult,this):BX.proxy(this.compareDeleteResult,this)})}},compareResult:function(t){var e,s;if(this.obPopupWin){this.obPopupWin.close()}if(!BX.type.isPlainObject(t))return;this.initPopupWindow();if(this.offers.length>0){this.offers[this.offerNum].COMPARED=t.STATUS==="OK"}if(t.STATUS==="OK"){BX.onCustomEvent("OnCompareChange");e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+BX.message("COMPARE_MESSAGE_OK")+"</p></div>";if(this.showClosePopup){s=[new i({text:BX.message("BTN_MESSAGE_COMPARE_REDIRECT"),events:{click:BX.delegate(this.compareRedirect,this)},style:{marginRight:"10px"}}),new i({text:BX.message("BTN_MESSAGE_CLOSE_POPUP"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}else{s=[new i({text:BX.message("BTN_MESSAGE_COMPARE_REDIRECT"),events:{click:BX.delegate(this.compareRedirect,this)}})]}}else{e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+(t.MESSAGE?t.MESSAGE:BX.message("COMPARE_UNKNOWN_ERROR"))+"</p></div>";s=[new i({text:BX.message("BTN_MESSAGE_CLOSE"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}this.obPopupWin.setTitleBar(BX.message("COMPARE_TITLE"));this.obPopupWin.setContent(e);this.obPopupWin.setButtons(s);this.obPopupWin.show()},compareDeleteResult:function(){BX.onCustomEvent("OnCompareChange");if(this.offers&&this.offers.length){this.offers[this.offerNum].COMPARED=false}},setCompared:function(t){if(!this.obCompare)return;var i=this.obCompare.querySelector('[data-entity="compare-checkbox"]');if(i){i.checked=t}},setCompareInfo:function(t){if(!BX.type.isArray(t))return;for(var i in this.offers){if(this.offers.hasOwnProperty(i)){this.offers[i].COMPARED=BX.util.in_array(this.offers[i].ID,t)}}},compareRedirect:function(){if(this.compareData.comparePath){location.href=this.compareData.comparePath}else{this.obPopupWin.close()}},checkDeletedCompare:function(t){switch(this.productType){case 0:case 1:case 2:if(this.product.id==t){this.setCompared(false)}break;case 3:var i=this.offers.length;while(i--){if(this.offers[i].ID==t){this.offers[i].COMPARED=false;if(this.offerNum==i){this.setCompared(false)}break}}}},initBasketUrl:function(){this.basketUrl=this.basketMode==="ADD"?this.basketData.add_url:this.basketData.buy_url;switch(this.productType){case 1:case 2:this.basketUrl=this.basketUrl.replace("#ID#",this.product.id.toString());break;case 3:this.basketUrl=this.basketUrl.replace("#ID#",this.offers[this.offerNum].ID);break}this.basketParams={ajax_basket:"Y"};if(this.showQuantity){this.basketParams[this.basketData.quantity]=this.obQuantity.value}if(this.basketData.sku_props){this.basketParams[this.basketData.sku_props_var]=this.basketData.sku_props}},fillBasketProps:function(){if(!this.visual.BASKET_PROP_DIV){return}var t=0,i=null,e=false,s=null;if(this.basketData.useProps&&!this.basketData.emptyProps){if(this.obPopupWin&&this.obPopupWin.contentContainer){s=this.obPopupWin.contentContainer}}else{s=BX(this.visual.BASKET_PROP_DIV)}if(s){i=s.getElementsByTagName("select");if(i&&i.length){for(t=0;t<i.length;t++){if(!i[t].disabled){switch(i[t].type.toLowerCase()){case"select-one":this.basketParams[i[t].name]=i[t].value;e=true;break;default:break}}}}i=s.getElementsByTagName("input");if(i&&i.length){for(t=0;t<i.length;t++){if(!i[t].disabled){switch(i[t].type.toLowerCase()){case"hidden":this.basketParams[i[t].name]=i[t].value;e=true;break;case"radio":if(i[t].checked){this.basketParams[i[t].name]=i[t].value;e=true}break;default:break}}}}}if(!e){this.basketParams[this.basketData.props]=[];this.basketParams[this.basketData.props][0]=0}},add2Basket:function(){this.basketMode="ADD";this.basket()},buyBasket:function(){this.basketMode="BUY";this.basket()},sendToBasket:function(){if(!this.canBuy){return}if(this.product&&this.product.id&&this.bigData){this.rememberProductRecommendation()}this.initBasketUrl();this.fillBasketProps();BX.ajax({method:"POST",dataType:"json",url:this.basketUrl,data:this.basketParams,onsuccess:BX.proxy(this.basketResult,this)})},basket:function(){var t="";if(!this.canBuy){return}switch(this.productType){case 1:case 2:if(this.basketData.useProps&&!this.basketData.emptyProps){this.initPopupWindow();this.obPopupWin.setTitleBar(BX.message("TITLE_BASKET_PROPS"));if(BX(this.visual.BASKET_PROP_DIV)){t=BX(this.visual.BASKET_PROP_DIV).innerHTML}this.obPopupWin.setContent(t);this.obPopupWin.setButtons([new i({text:BX.message("BTN_MESSAGE_SEND_PROPS"),events:{click:BX.delegate(this.sendToBasket,this)}})]);this.obPopupWin.show()}else{this.sendToBasket()}break;case 3:this.sendToBasket();break}},basketResult:function(t){var e="",s="",r,a=[];if(this.obPopupWin)this.obPopupWin.close();if(!BX.type.isPlainObject(t))return;r=t.STATUS==="OK";if(r){this.setAnalyticsDataLayer("addToCart")}if(r&&this.basketAction==="BUY"){this.basketRedirect()}else{this.initPopupWindow();if(r){BX.onCustomEvent("OnBasketChange");if(BX.findParent(this.obProduct,{className:"bx_sale_gift_main_products"},10)){BX.onCustomEvent("onAddToBasketMainProduct",[this])}switch(this.productType){case 1:case 2:s=this.product.pict.SRC;break;case 3:s=this.offers[this.offerNum].PREVIEW_PICTURE?this.offers[this.offerNum].PREVIEW_PICTURE.SRC:this.defaultPict.pict.SRC;break}e='<div style="width: 100%; margin: 0; text-align: center;"><img src="'+s+'" height="130" style="max-height:130px"><p>'+this.product.name+"</p></div>";if(this.showClosePopup){a=[new i({text:BX.message("BTN_MESSAGE_BASKET_REDIRECT"),events:{click:BX.delegate(this.basketRedirect,this)},style:{marginRight:"10px"}}),new i({text:BX.message("BTN_MESSAGE_CLOSE_POPUP"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}else{a=[new i({text:BX.message("BTN_MESSAGE_BASKET_REDIRECT"),events:{click:BX.delegate(this.basketRedirect,this)}})]}}else{e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+(t.MESSAGE?t.MESSAGE:BX.message("BASKET_UNKNOWN_ERROR"))+"</p></div>";a=[new i({text:BX.message("BTN_MESSAGE_CLOSE"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}this.obPopupWin.setTitleBar(r?BX.message("TITLE_SUCCESSFUL"):BX.message("TITLE_ERROR"));this.obPopupWin.setContent(e);this.obPopupWin.setButtons(a);this.obPopupWin.show()}},basketRedirect:function(){location.href=this.basketData.basketUrl?this.basketData.basketUrl:BX.message("BASKET_URL")},initPopupWindow:function(){if(this.obPopupWin)return;this.obPopupWin=BX.PopupWindowManager.create("CatalogSectionBasket_"+this.visual.ID,null,{autoHide:true,offsetLeft:0,offsetTop:0,overlay:true,closeByEsc:true,titleBar:true,closeIcon:true,contentColor:"white",className:this.templateTheme?"bx-"+this.templateTheme:""})}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:89:"/bitrix/components/bitrix/sale.order.ajax/templates/.default/script.min.js?15956921076461";s:6:"source";s:70:"/bitrix/components/bitrix/sale.order.ajax/templates/.default/script.js";s:3:"min";s:74:"/bitrix/components/bitrix/sale.order.ajax/templates/.default/script.min.js";s:3:"map";s:74:"/bitrix/components/bitrix/sale.order.ajax/templates/.default/script.map.js";}"*/
BX.saleOrderAjax={BXCallAllowed:false,options:{},indexCache:{},controls:{},modes:{},properties:{},init:function(e){var t=this;this.options=e;window.submitFormProxy=BX.proxy(function(){t.submitFormProxy.apply(t,arguments)},this);BX(function(){t.initDeferredControl()});BX(function(){t.BXCallAllowed=true});this.controls.scope=BX("bx-soa-order");BX.bindDelegate(this.controls.scope,"click",{className:"-bx-popup-set-mode-add-loc"},function(){var e=BX.create("input",{attrs:{type:"hidden",name:"PERMANENT_MODE_STEPS",value:"1"}});BX.prepend(e,BX("bx-soa-order"));t.BXCallAllowed=false;BX.Sale.OrderAjaxComponent.sendRequest()})},cleanUp:function(){for(var e in this.properties){if(this.properties.hasOwnProperty(e)){if(typeof this.properties[e].input!="undefined"){BX.unbindAll(this.properties[e].input);this.properties[e].input=null}if(typeof this.properties[e].control!="undefined")BX.unbindAll(this.properties[e].control)}}this.properties={}},addPropertyDesc:function(e){this.properties[e.id]=e.attributes;this.properties[e.id].id=e.id},initDeferredControl:function(){var e=this,t,i,o,r,n,s,p,a,l;if(typeof window.BX.locationsDeferred!="undefined"){this.BXCallAllowed=false;for(t in window.BX.locationsDeferred){window.BX.locationsDeferred[t].call(this);window.BX.locationsDeferred[t]=null;delete window.BX.locationsDeferred[t];this.properties[t].control=window.BX.locationSelectors[t];delete window.BX.locationSelectors[t]}}for(t in this.properties){if(this.properties[t].isZip){i=this.controls.scope.querySelector('[data-property-id-row="'+t+'"]');if(BX.type.isElementNode(i)){o=i.querySelector('input[type="text"]');if(BX.type.isElementNode(o)){this.properties[t].input=o;r=false;for(n in this.properties){if(this.properties[n].type=="LOCATION"){r=n;break}}if(r!==false){BX.bindDebouncedChange(o,function(t){var n=BX("ZIP_PROPERTY_CHANGED");n&&(n.value="Y");o=null;i=null;if(BX.type.isNotEmptyString(t)&&/^\s*\d+\s*$/.test(t)&&t.length>3){e.getLocationsByZip(t,function(t){e.properties[r].control.setValueByLocationIds(t)},function(){try{}catch(e){}})}})}}}}if(this.properties[t].type=="LOCATION"){if(typeof this.properties[t].control!="undefined"){s=this.properties[t].control;p=s.getSysCode();if(typeof this.properties[t].altLocationPropId!="undefined"){if(p=="sls"){s.replaceTemplate("nothing-found",this.options.messages.notFoundPrompt)}if(p=="slst"){(function(t,i){i.setOption("pseudoValues",["other"]);i.bindEvent("control-before-display-page",function(t){i=null;var o=t.getParentValue();if(o==this.getOption("rootNodeValue")||!this.checkCanSelectItem(o))return;var r=t.getControl();if(typeof r.vars.cache.nodes["other"]=="undefined"){r.fillCache([{CODE:"other",DISPLAY:e.options.messages.otherLocation,IS_PARENT:false,VALUE:"other"}],{modifyOrigin:true,modifyOriginPosition:"prepend"})}});a=BX("LOCATION_ALT_PROP_DISPLAY_MANUAL["+parseInt(t)+"]");i.bindEvent("after-select-real-value",function(){if(BX.type.isDomNode(a))a.value="0"});i.bindEvent("after-select-pseudo-value",function(){if(BX.type.isDomNode(a))a.value="1"});i.bindEvent("before-set-value",function(){if(BX.type.isDomNode(a))a.value="0"});if(BX.type.isDomNode(a)&&a.value=="1"){l=i.getAdapterAtPosition(i.getStackSize()-1);if(typeof l!="undefined"&&l!==null)l.setValuePair("other",e.options.messages.otherLocation)}})(t,s)}}}}}this.BXCallAllowed=true;if(BX.Sale.OrderAjaxComponent)BX.Sale.OrderAjaxComponent.locationsCompletion()},checkMode:function(e,t){if(t=="altLocationChoosen"){if(this.checkAbility(e,"canHaveAltLocation")){var i=this.getInputByPropId(this.properties[e].altLocationPropId);var o=this.properties[e].altLocationPropId;if(i!==false&&i.value.length>0&&!i.disabled&&this.properties[o].valueSource!="default"){return true}}}return false},checkAbility:function(e,t){if(typeof this.properties[e]=="undefined")this.properties[e]={};if(typeof this.properties[e].abilities=="undefined")this.properties[e].abilities={};if(typeof this.properties[e].abilities!="undefined"&&this.properties[e].abilities[t])return true;if(t=="canHaveAltLocation"){if(this.properties[e].type=="LOCATION"){if(typeof this.properties[e].altLocationPropId!="undefined"&&typeof this.properties[this.properties[e].altLocationPropId]){var i=this.properties[e].altLocationPropId;if(typeof this.properties[e].control!="undefined"&&this.properties[e].control.getSysCode()=="slst"){if(this.getInputByPropId(i)!==false){this.properties[e].abilities[t]=true;return true}}}}}return false},getInputByPropId:function(e){if(typeof this.properties[e].input!="undefined")return this.properties[e].input;var t=this.getRowByPropId(e);if(BX.type.isElementNode(t)){var i=t.querySelector('input[type="text"]');if(BX.type.isElementNode(i)){this.properties[e].input=i;return i}}return false},getRowByPropId:function(e){if(typeof this.properties[e].row!="undefined")return this.properties[e].row;var t=this.controls.scope.querySelector('[data-property-id-row="'+e+'"]');if(BX.type.isElementNode(t)){this.properties[e].row=t;return t}return false},getAltLocPropByRealLocProp:function(e){if(typeof this.properties[e].altLocationPropId!="undefined")return this.properties[this.properties[e].altLocationPropId];return false},toggleProperty:function(e,t,i){var o=this.properties[e];if(typeof o.row=="undefined")o.row=this.getRowByPropId(e);if(typeof o.input=="undefined")o.input=this.getInputByPropId(e);if(!t){if(!i)BX.hide(o.row);o.input.disabled=true}else{if(!i)BX.show(o.row);o.input.disabled=false}},submitFormProxy:function(e,t){var i=false;for(var o in this.properties){if(typeof this.properties[o].control!="undefined"&&this.properties[o].control==t){i=o;break}}if(e!="other"){if(this.BXCallAllowed){this.BXCallAllowed=false;setTimeout(function(){BX.Sale.OrderAjaxComponent.sendRequest()},20)}}},getPreviousAdapterSelectedNode:function(e,t){var i=t.getIndex();var o=e.getAdapterAtPosition(i-1);if(typeof o!=="undefined"&&o!=null){var r=o.getControl().getValue();if(typeof r!="undefined"){var n=e.getNodeByValue(r);if(typeof n!="undefined")return n;return false}}return false},getLocationsByZip:function(e,t,i){if(typeof this.indexCache[e]!="undefined"){t.apply(this,[this.indexCache[e]]);return}var o=this;BX.ajax({url:this.options.source,method:"post",dataType:"json",async:true,processData:true,emulateOnload:true,start:true,data:{ACT:"GET_LOCS_BY_ZIP",ZIP:e},onsuccess:function(r){if(r.result){o.indexCache[e]=r.data;t.apply(o,[r.data])}else{i.call(o)}},onfailure:function(e,t){}})}};
/* End */
;
; /* Start:"a:4:{s:4:"full";s:91:"/bitrix/components/bitrix/sale.order.ajax/templates/.default/order_ajax.js?1595692107235778";s:6:"source";s:74:"/bitrix/components/bitrix/sale.order.ajax/templates/.default/order_ajax.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
BX.namespace('BX.Sale.OrderAjaxComponent');

(function() {
	'use strict';

	/**
	 * Show empty default property value to multiple properties without default values
	 */
	if (BX.Sale && BX.Sale.Input && BX.Sale.Input.Utils)
	{
		BX.Sale.Input.Utils.asMultiple = function (value)
		{
			if (value === undefined || value === null || value === '')
			{
				return [];
			}
			else if (value.constructor === Array)
			{
				var i = 0, length = value.length, val;

				for (; i < length;)
				{
					val = value[i];

					if (val === undefined || val === null || val === '')
					{
						value.splice(i, 1);
						--length;
					}
					else
					{
						++i;
					}
				}

				return value.length ? value : [''];
			}
			else
			{
				return [value];
			}
		};
	}

	BX.Sale.OrderAjaxComponent = {

		initializePrimaryFields: function()
		{
			this.BXFormPosting = false;
			this.regionBlockNotEmpty = false;
			this.locationsInitialized = false;
			this.locations = {};
			this.cleanLocations = {};
			this.locationsTemplate = '';
			this.pickUpMapFocused = false;
			this.options = {};
			this.activeSectionId = '';
			this.firstLoad = true;
			this.initialized = {};
			this.mapsReady = false;
			this.lastSelectedDelivery = 0;
			this.deliveryLocationInfo = {};
			this.deliveryPagination = {};
			this.deliveryCachedInfo = [];
			this.paySystemPagination = {};
			this.validation = {};
			this.hasErrorSection = {};
			this.pickUpPagination = {};
			this.timeOut = {};
			this.isMobile = BX.browser.IsMobile();
			this.isHttps = window.location.protocol === "https:";
			this.orderSaveAllowed = false;
			this.socServiceHiddenNode = false;
		},

		/**
		 * Initialization of sale.order.ajax component js
		 */
		init: function(parameters)
		{
			this.initializePrimaryFields();

			this.result = parameters.result || {};
			this.prepareLocations(parameters.locations);
			this.params = parameters.params || {};
			this.signedParamsString = parameters.signedParamsString || '';
			this.siteId = parameters.siteID || '';
			this.ajaxUrl = parameters.ajaxUrl || '';
			this.templateFolder = parameters.templateFolder || '';
			this.defaultBasketItemLogo = this.templateFolder + "/images/product_logo.png";
			this.defaultStoreLogo = this.templateFolder + "/images/pickup_logo.png";
			this.defaultDeliveryLogo = this.templateFolder + "/images/delivery_logo.png";
			this.defaultPaySystemLogo = this.templateFolder + "/images/pay_system_logo.png";

			this.orderBlockNode = BX(parameters.orderBlockId);
			this.totalBlockNode = BX(parameters.totalBlockId);
			this.mobileTotalBlockNode = BX(parameters.totalBlockId + '-mobile');
			this.savedFilesBlockNode = BX('bx-soa-saved-files');
			this.orderSaveBlockNode = BX('bx-soa-orderSave');
			this.mainErrorsNode = BX('bx-soa-main-notifications');

			this.authBlockNode = BX(parameters.authBlockId);
			this.authHiddenBlockNode = BX(parameters.authBlockId + '-hidden');
			this.basketBlockNode = BX(parameters.basketBlockId);
			this.basketHiddenBlockNode = BX(parameters.basketBlockId + '-hidden');
			this.regionBlockNode = BX(parameters.regionBlockId);
			this.regionHiddenBlockNode = BX(parameters.regionBlockId + '-hidden');
			this.paySystemBlockNode = BX(parameters.paySystemBlockId);
			this.paySystemHiddenBlockNode = BX(parameters.paySystemBlockId + '-hidden');
			this.deliveryBlockNode = BX(parameters.deliveryBlockId);
			this.deliveryHiddenBlockNode = BX(parameters.deliveryBlockId + '-hidden');
			this.pickUpBlockNode = BX(parameters.pickUpBlockId);
			this.pickUpHiddenBlockNode = BX(parameters.pickUpBlockId + '-hidden');
			this.propsBlockNode = BX(parameters.propsBlockId);
			this.propsHiddenBlockNode = BX(parameters.propsBlockId + '-hidden');

			if (this.result.SHOW_AUTH)
			{
				this.authBlockNode.style.display = '';
				BX.addClass(this.authBlockNode, 'bx-active');
				this.authGenerateUser = this.result.AUTH.new_user_registration_email_confirmation !== 'Y' && this.result.AUTH.new_user_phone_required !== 'Y';
			}

			if (this.totalBlockNode)
			{
				this.totalInfoBlockNode = this.totalBlockNode.querySelector('.bx-soa-cart-total');
				this.totalGhostBlockNode = this.totalBlockNode.querySelector('.bx-soa-cart-total-ghost');
			}

			this.options.deliveriesPerPage = parseInt(parameters.params.DELIVERIES_PER_PAGE);
			this.options.paySystemsPerPage = parseInt(parameters.params.PAY_SYSTEMS_PER_PAGE);
			this.options.pickUpsPerPage = parseInt(parameters.params.PICKUPS_PER_PAGE);

			this.options.showWarnings = !!parameters.showWarnings;
			this.options.propertyValidation = !!parameters.propertyValidation;
			this.options.priceDiffWithLastTime = false;

			this.options.pickUpMap = parameters.pickUpMap;
			this.options.propertyMap = parameters.propertyMap;

			this.options.totalPriceChanged = false;

			if (!this.result.IS_AUTHORIZED || typeof this.result.LAST_ORDER_DATA.FAIL !== 'undefined')
				this.initFirstSection();

			this.initOptions();
			this.editOrder();
			this.bindEvents();

			this.orderBlockNode.removeAttribute('style');
			this.basketBlockScrollCheck();

			if (this.params.USE_ENHANCED_ECOMMERCE === 'Y')
			{
				this.setAnalyticsDataLayer('checkout');
			}

			if (this.params.USER_CONSENT === 'Y')
			{
				this.initUserConsent();
			}
		},

		/**
		 * Send ajax request with order data and executes callback by action
		 */
		sendRequest: function(action, actionData)
		{
			var form;

			if (!this.startLoader())
				return;

			this.firstLoad = false;

			action = BX.type.isNotEmptyString(action) ? action : 'refreshOrderAjax';

			if (action === 'saveOrderAjax')
			{
				form = BX('bx-soa-order-form');
				if (form)
				{
					form.querySelector('input[type=hidden][name=sessid]').value = BX.bitrix_sessid();
				}

				BX.ajax.submitAjax(
					BX('bx-soa-order-form'),
					{
						url: this.ajaxUrl,
						method: 'POST',
						dataType: 'json',
						data: {
							via_ajax: 'Y',
							action: 'saveOrderAjax',
							sessid: BX.bitrix_sessid(),
							SITE_ID: this.siteId,
							signedParamsString: this.signedParamsString
						},
						onsuccess: BX.proxy(this.saveOrderWithJson, this),
						onfailure: BX.proxy(this.handleNotRedirected, this)
					}
				);
			}
			else
			{
				BX.ajax({
					method: 'POST',
					dataType: 'json',
					url: this.ajaxUrl,
					data: this.getData(action, actionData),
					onsuccess: BX.delegate(function(result) {
						if (result.redirect && result.redirect.length)
							document.location.href = result.redirect;

						this.saveFiles();
						switch (action)
						{
							case 'refreshOrderAjax':
								this.refreshOrder(result);
								break;
							case 'confirmSmsCode':
							case 'showAuthForm':
								this.firstLoad = true;
								this.refreshOrder(result);
								break;
							case 'enterCoupon':
								if (result && result.order)
								{
									this.deliveryCachedInfo = [];
									this.refreshOrder(result);
								}
								else
								{
									this.addCoupon(result);
								}

								break;
							case 'removeCoupon':
								if (result && result.order)
								{
									this.deliveryCachedInfo = [];
									this.refreshOrder(result);
								}
								else
								{
									this.removeCoupon(result);
								}

								break;
						}
						BX.cleanNode(this.savedFilesBlockNode);
						this.endLoader();
					}, this),
					onfailure: BX.delegate(function(){
						this.endLoader();
					}, this)
				});
			}
		},

		getData: function(action, actionData)
		{
			var data = {
				order: this.getAllFormData(),
				sessid: BX.bitrix_sessid(),
				via_ajax: 'Y',
				SITE_ID: this.siteId,
				signedParamsString: this.signedParamsString
			};

			data[this.params.ACTION_VARIABLE] = action;

			if (action === 'enterCoupon' || action === 'removeCoupon')
				data.coupon = actionData;

			return data;
		},

		getAllFormData: function()
		{
			var form = BX('bx-soa-order-form'),
				prepared = BX.ajax.prepareForm(form),
				i;

			for (i in prepared.data)
			{
				if (prepared.data.hasOwnProperty(i) && i == '')
				{
					delete prepared.data[i];
				}
			}

			return !!prepared && prepared.data ? prepared.data : {};
		},

		/**
		 * Refreshes order via json data from ajax request
		 */
		refreshOrder: function(result)
		{
			if (result.error)
			{
				this.showError(this.mainErrorsNode, result.error);
				this.animateScrollTo(this.mainErrorsNode, 800, 20);
			}
			else if (result.order.SHOW_AUTH)
			{
				var animation = result.order.OK_MESSAGE && result.order.OK_MESSAGE.length || result.order.SMS_AUTH.TYPE === 'OK' ? 'bx-step-good' : 'bx-step-bad';
				this.addAnimationEffect(this.authBlockNode, animation);
				BX.merge(this.result, result.order);
				this.editAuthBlock();
				this.showAuthBlock();
				this.showErrors(result.order.ERROR, false);
				this.animateScrollTo(this.authBlockNode);
			}
			else
			{
				this.isPriceChanged(result);

				if (this.activeSectionId !== this.deliveryBlockNode.id)
					this.deliveryCachedInfo = [];

				this.result = result.order;
				this.prepareLocations(result.locations);
				this.locationsInitialized = false;
				this.maxWaitTimeExpired = false;
				this.pickUpMapFocused = false;
				this.deliveryLocationInfo = {};

				this.initialized = {};
				this.clearHiddenBlocks();

				this.initOptions();
				this.editOrder();
				this.mapsReady && this.initMaps();
				BX.saleOrderAjax && BX.saleOrderAjax.initDeferredControl();
			}

			return true;
		},

		saveOrderWithJson: function(result)
		{
			var redirected = false;

			if (result && result.order)
			{
				result = result.order;

				if (result.REDIRECT_URL)
				{
					if (this.params.USE_ENHANCED_ECOMMERCE === 'Y')
					{
						this.setAnalyticsDataLayer('purchase', result.ID);
					}

					(window.b24order=window.b24order||[]).push({id: result.ID, sum: this.result.TOTAL.ORDER_PRICE});

					redirected = true;
					location.href = result.REDIRECT_URL;
				}
				else if (result.SHOW_AUTH)
				{
					this.result.SHOW_AUTH = result.SHOW_AUTH;
					this.result.AUTH = result.AUTH;
					this.result.SMS_AUTH = result.SMS_AUTH;

					this.editAuthBlock();
					this.showAuthBlock();
					this.animateScrollTo(this.authBlockNode);
				}
				else
				{
					this.showErrors(result.ERROR, true, true);
				}
			}

			if (!redirected)
			{
				this.handleNotRedirected();
			}
		},

		handleNotRedirected: function()
		{
			this.endLoader();
			this.disallowOrderSave();
		},

		/**
		 * Showing loader image with overlay.
		 */
		startLoader: function()
		{
			if (this.BXFormPosting === true)
				return false;

			this.BXFormPosting = true;

			if (!this.loadingScreen)
			{
				this.loadingScreen = new BX.PopupWindow('loading_screen', null, {
					overlay: {backgroundColor: 'white', opacity: 1},
					events: {
						onAfterPopupShow: BX.delegate(function(){
							BX.cleanNode(this.loadingScreen.popupContainer);
							BX.removeClass(this.loadingScreen.popupContainer, 'popup-window');
							this.loadingScreen.popupContainer.appendChild(
								BX.create('IMG', {props: {src: this.templateFolder + '/images/loader.gif'}})
							);
							this.loadingScreen.popupContainer.removeAttribute('style');
							this.loadingScreen.popupContainer.style.display = 'block';
						}, this)
					}
				});
				BX.addClass(this.loadingScreen.overlay.element, 'bx-step-opacity');
			}

			this.loadingScreen.overlay.element.style.opacity = '0';
			this.loadingScreen.show();
			this.loadingScreen.overlay.element.style.opacity = '0.6';

			return true;
		},

		/**
		 * Hiding loader image with overlay.
		 */
		endLoader: function()
		{
			this.BXFormPosting = false;

			if (this.loadingScreen && this.loadingScreen.isShown())
			{
				this.loadingScreen.close();
			}
		},

		htmlspecialcharsEx: function(str)
		{
			return str.replace(/&amp;/g, '&amp;amp;')
				.replace(/&lt;/g, '&amp;lt;').replace(/&gt;/g, '&amp;gt;')
				.replace(/&quot;/g, '&amp;quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		},

		saveFiles: function()
		{
			if (this.result.ORDER_PROP && this.result.ORDER_PROP.properties)
			{
				var props = this.result.ORDER_PROP.properties, i, prop;
				for (i = 0; i < props.length; i++)
				{
					if (props[i].TYPE == 'FILE')
					{
						prop = this.orderBlockNode.querySelector('div[data-property-id-row="' + props[i].ID + '"]');
						if (prop)
							this.savedFilesBlockNode.appendChild(prop);
					}
				}
			}
		},

		/**
		 * Animating scroll to certain node
		 */
		animateScrollTo: function(node, duration, shiftToTop)
		{
			if (!node)
				return;

			var scrollTop = BX.GetWindowScrollPos().scrollTop,
				orderBlockPos = BX.pos(this.orderBlockNode),
				ghostTop = BX.pos(node).top - (this.isMobile ? 50 : 0);

			if (shiftToTop)
				ghostTop -= parseInt(shiftToTop);

			if (ghostTop + window.innerHeight > orderBlockPos.bottom)
				ghostTop = orderBlockPos.bottom - window.innerHeight + 17;

			new BX.easing({
				duration: duration || 800,
				start: {scroll: scrollTop},
				finish: {scroll: ghostTop},
				transition: BX.easing.makeEaseOut(BX.easing.transitions.quad),
				step: BX.delegate(function(state){
					window.scrollTo(0, state.scroll);
				}, this)
			}).animate();
		},

		checkKeyPress: function(event)
		{
			if (event.keyCode == 13)
			{
				var target = event.target || event.srcElement,
					send = target.getAttribute('data-send'),
					nextAttr, next;

				if (!send)
				{
					nextAttr = target.getAttribute('data-next');
					if (nextAttr)
					{
						next = this.orderBlockNode.querySelector('input[name=' + nextAttr + ']');
						next && next.focus();
					}

					return BX.PreventDefault(event);
				}
			}
		},

		getSizeString: function(maxSize, len)
		{
			var gbDivider = 1024 * 1024 * 1024,
				mbDivider = 1024 * 1024,
				kbDivider = 1024,
				str;

			maxSize = parseInt(maxSize);
			len = parseInt(len);

			if (maxSize > gbDivider)
				str = parseFloat(maxSize / gbDivider).toFixed(len) + ' Gb';
			else if (maxSize > mbDivider)
				str = parseFloat(maxSize / mbDivider).toFixed(len) + ' Mb';
			else if (maxSize > kbDivider)
				str = parseFloat(maxSize / kbDivider).toFixed(len) + ' Kb';
			else
				str = maxSize + ' B';

			return str;
		},

		getFileAccepts: function(accepts)
		{
			var arr = [],
				arAccepts = accepts.split(','),
				i, currentAccept;

			var mimeTypesMap = {
				json: 'application/json', javascript: 'application/javascript', 'octet-stream': 'application/octet-stream',
				ogg: 'application/ogg', pdf: 'application/pdf', zip: 'application/zip', gzip: 'application/gzip',
				aac: 'audio/aac', mp3: 'audio/mpeg', gif: 'image/gif', jpeg: 'image/jpeg', png: 'image/png', svg: 'image/svg+xml',
				tiff: 'image/tiff', css: 'text/css', csv: 'text/csv', html: 'text/html', plain: 'text/plain',
				php: 'text/php', xml: 'text/xml', mpeg: 'video/mpeg', mp4: 'video/mp4', quicktime: 'video/quicktime',
				flv: 'video/x-flv', doc: 'application/msword', docx: 'application/msword',
				xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.ms-excel'
			};

			for (i = 0; i < arAccepts.length; i++)
			{
				currentAccept = BX.util.trim(arAccepts[i]);
				currentAccept = mimeTypesMap[currentAccept] || currentAccept;
				arr.push(currentAccept);
			}

			return arr.join(',');
		},

		uniqueText: function(text, separator)
		{
			var phrases, i, output = [];

			text = text || '';
			separator = separator || '<br>';

			phrases = text.split(separator);
			phrases = BX.util.array_unique(phrases);

			for (i = 0; i < phrases.length; i++)
			{
				if (phrases[i] == '')
					continue;

				output.push(BX.util.trim(phrases[i]));
			}

			return output.join(separator);
		},

		getImageSources: function(item, key)
		{
			if (!item || !key || !item[key])
				return false;

			return {
				src_1x: item[key + '_SRC'],
				src_2x: item[key + '_SRC_2X'],
				src_orig: item[key + '_SRC_ORIGINAL']
			};
		},

		getErrorContainer: function(node)
		{
			if (!node)
				return;

			node.appendChild(
				BX.create('DIV', {props: {className: 'alert alert-danger'}, style: {display: 'none'}})
			);
		},

		showError: function(node, msg, border)
		{
			if (BX.type.isArray(msg))
				msg = msg.join('<br>');

			var errorContainer = node.querySelector('.alert.alert-danger'), animate;
			if (errorContainer && msg.length)
			{
				BX.cleanNode(errorContainer);
				errorContainer.appendChild(BX.create('DIV', {html: msg}));

				animate = !this.hasErrorSection[node.id];
				if (animate)
				{
					errorContainer.style.opacity = 0;
					errorContainer.style.display = '';
					new BX.easing({
						duration: 300,
						start: {opacity: 0},
						finish: {opacity: 100},
						transition: BX.easing.makeEaseOut(BX.easing.transitions.quad),
						step: function(state){
							errorContainer.style.opacity = state.opacity / 100;
						},
						complete: function(){
							errorContainer.removeAttribute('style');
						}
					}).animate();
				}
				else
					errorContainer.style.display = '';

				if (!!border)
					BX.addClass(node, 'bx-step-error');
			}
		},

		showErrors: function(errors, scroll, showAll)
		{
			var errorNodes = this.orderBlockNode.querySelectorAll('div.alert.alert-danger'),
				section, k, blockErrors;

			for (k = 0; k < errorNodes.length; k++)
			{
				section = BX.findParent(errorNodes[k], {className: 'bx-soa-section'});
				BX.removeClass(section, 'bx-step-error');
				errorNodes[k].style.display = 'none';
				BX.cleanNode(errorNodes[k]);
			}

			if (!errors || BX.util.object_keys(errors).length < 1)
				return;

			for (k in errors)
			{
				if (!errors.hasOwnProperty(k))
					continue;

				blockErrors = errors[k];
				switch (k.toUpperCase())
				{
					case 'MAIN':
						this.showError(this.mainErrorsNode, blockErrors);
						this.animateScrollTo(this.mainErrorsNode, 800, 20);
						scroll = false;
						break;
					case 'AUTH':
						if (this.authBlockNode.style.display == 'none')
						{
							this.showError(this.mainErrorsNode, blockErrors, true);
							this.animateScrollTo(this.mainErrorsNode, 800, 20);
							scroll = false;
						}
						else
							this.showError(this.authBlockNode, blockErrors, true);
						break;
					case 'REGION':
						if (showAll || this.regionBlockNode.getAttribute('data-visited') === 'true')
						{
							this.showError(this.regionBlockNode, blockErrors, true);
							this.showError(this.regionHiddenBlockNode, blockErrors);
						}
						break;
					case 'DELIVERY':
						if (showAll || this.deliveryBlockNode.getAttribute('data-visited') === 'true')
						{
							this.showError(this.deliveryBlockNode, blockErrors, true);
							this.showError(this.deliveryHiddenBlockNode, blockErrors);
						}
						break;
					case 'PAY_SYSTEM':
						if (showAll || this.paySystemBlockNode.getAttribute('data-visited') === 'true')
						{
							this.showError(this.paySystemBlockNode, blockErrors, true);
							this.showError(this.paySystemHiddenBlockNode, blockErrors);
						}
						break;
					case 'PROPERTY':
						if (showAll || this.propsBlockNode.getAttribute('data-visited') === 'true')
						{
							this.showError(this.propsBlockNode, blockErrors, true);
							this.showError(this.propsHiddenBlockNode, blockErrors);
						}
						break;
				}
			}

			!!scroll && this.scrollToError();
		},

		showBlockErrors: function(node)
		{
			var errorNode = node.querySelector('div.alert.alert-danger'),
				hiddenNode, errors;

			if (!errorNode)
				return;

			BX.removeClass(node, 'bx-step-error');
			errorNode.style.display = 'none';
			BX.cleanNode(errorNode);

			switch (node.id)
			{
				case this.regionBlockNode.id:
					hiddenNode = this.regionHiddenBlockNode;
					errors = this.result.ERROR.REGION;
					break;
				case this.deliveryBlockNode.id:
					hiddenNode = this.deliveryHiddenBlockNode;
					errors = this.result.ERROR.DELIVERY;
					break;
				case this.paySystemBlockNode.id:
					hiddenNode = this.paySystemHiddenBlockNode;
					errors = this.result.ERROR.PAY_SYSTEM;
					break;
				case this.propsBlockNode.id:
					hiddenNode = this.propsHiddenBlockNode;
					errors = this.result.ERROR.PROPERTY;
					break;
			}

			if (errors && BX.util.object_keys(errors).length)
			{
				this.showError(node, errors, true);
				this.showError(hiddenNode, errors);
			}
		},

		checkNotifications: function()
		{
			var informer = this.mainErrorsNode.querySelector('[data-type="informer"]'),
				success, sections, className, text, scrollTop, informerPos;

			if (informer)
			{
				if (this.firstLoad && this.result.IS_AUTHORIZED && typeof this.result.LAST_ORDER_DATA.FAIL === 'undefined')
				{
					sections = this.orderBlockNode.querySelectorAll('.bx-soa-section.bx-active');
					success = sections.length && sections[sections.length - 1].getAttribute('data-visited') == 'true';
					className = success ? 'success' : 'warning';
					text = (success ? this.params.MESS_SUCCESS_PRELOAD_TEXT : this.params.MESS_FAIL_PRELOAD_TEXT).split('#ORDER_BUTTON#').join(this.params.MESS_ORDER);

					informer.appendChild(
						BX.create('DIV', {
							props: {className: 'row'},
							children: [
								BX.create('DIV', {
									props: {className: 'col-xs-12'},
									style: {position: 'relative', paddingLeft: '48px'},
									children: [
										BX.create('DIV', {props: {className: 'icon-' + className}}),
										BX.create('DIV', {html: text})
									]
								})
							]
						})
					);
					BX.addClass(informer, 'alert alert-' + className);
					informer.style.display = '';
				}
				else if (BX.hasClass(informer, 'alert'))
				{
					scrollTop = BX.GetWindowScrollPos().scrollTop;
					informerPos = BX.pos(informer);

					new BX.easing({
						duration: 300,
						start: {opacity: 100},
						finish: {opacity: 0},
						transition: BX.easing.transitions.linear,
						step: function(state){
							informer.style.opacity = state.opacity / 100;
						},
						complete: function(){
							if (scrollTop > informerPos.top)
								window.scrollBy(0, -(informerPos.height + 20));

							informer.style.display = 'none';
							BX.cleanNode(informer);
							informer.removeAttribute('class');
							informer.removeAttribute('style');
						}
					}).animate();
				}
			}
		},

		/**
		 * Returns status of preloaded data from back-end for certain block
		 */
		checkPreload: function(node)
		{
			var status;

			switch (node.id)
			{
				case this.regionBlockNode.id:
					status = this.result.LAST_ORDER_DATA && this.result.LAST_ORDER_DATA.PERSON_TYPE;
					break;
				case this.paySystemBlockNode.id:
					status = this.result.LAST_ORDER_DATA && this.result.LAST_ORDER_DATA.PAY_SYSTEM;
					break;
				case this.deliveryBlockNode.id:
					status = this.result.LAST_ORDER_DATA && this.result.LAST_ORDER_DATA.DELIVERY;
					break;
				case this.pickUpBlockNode.id:
					status = this.result.LAST_ORDER_DATA && this.result.LAST_ORDER_DATA.PICK_UP;
					break;
				default:
					status = true;
			}

			return status;
		},

		checkBlockErrors: function(node)
		{
			var hiddenNode, errorNode, showError, showWarning, errorTooltips, i;

			if (hiddenNode = BX(node.id + '-hidden'))
			{
				errorNode = hiddenNode.querySelector('div.alert.alert-danger');
				showError = errorNode && errorNode.style.display != 'none';
				showWarning = hiddenNode.querySelector('div.alert.alert-warning.alert-show');

				if (!showError)
				{
					errorTooltips = hiddenNode.querySelectorAll('div.tooltip');
					for (i = 0; i < errorTooltips.length; i++)
					{
						if (errorTooltips[i].getAttribute('data-state') == 'opened')
						{
							showError = true;
							break;
						}
					}
				}
			}

			if (showError)
				BX.addClass(node, 'bx-step-error');
			else if (showWarning)
				BX.addClass(node, 'bx-step-warning');
			else
				BX.removeClass(node, 'bx-step-error bx-step-warning');

			return !showError;
		},

		scrollToError: function()
		{
			var sections = this.orderBlockNode.querySelectorAll('div.bx-soa-section.bx-active'),
				i, errorNode;

			for (i in sections)
			{
				if (sections.hasOwnProperty(i))
				{
					errorNode = sections[i].querySelector('.alert.alert-danger');
					if (errorNode && errorNode.style.display != 'none')
					{
						this.animateScrollTo(sections[i]);
						break;
					}
				}
			}
		},

		showWarnings: function()
		{
			var sections = this.orderBlockNode.querySelectorAll('div.bx-soa-section.bx-active'),
				currentDelivery = this.getSelectedDelivery(),
				k,  warningString;

			for (k = 0; k < sections.length; k++)
			{
				BX.removeClass(sections[k], 'bx-step-warning');

				if (sections[k].getAttribute('data-visited') == 'false')
					BX.removeClass(sections[k], 'bx-step-completed');
			}

			if (currentDelivery && currentDelivery.CALCULATE_ERRORS)
			{
				BX.addClass(this.deliveryBlockNode, 'bx-step-warning');

				warningString = '<strong>' + this.params.MESS_DELIVERY_CALC_ERROR_TITLE + '</strong>';
				if (this.params.MESS_DELIVERY_CALC_ERROR_TEXT.length)
					warningString += '<br><small>' + this.params.MESS_DELIVERY_CALC_ERROR_TEXT + '</small>';

				this.showBlockWarning(this.deliveryBlockNode, warningString);
				this.showBlockWarning(this.deliveryHiddenBlockNode, warningString);

				if (this.activeSectionId != this.deliveryBlockNode.id)
				{
					BX.addClass(this.deliveryBlockNode, 'bx-step-completed');
					BX.bind(this.deliveryBlockNode.querySelector('.alert.alert-warning'), 'click', BX.proxy(this.showByClick, this));
				}
			}
			else if (BX.hasClass(this.deliveryBlockNode, 'bx-step-warning') && this.activeSectionId != this.deliveryBlockNode.id)
			{
				BX.removeClass(this.deliveryBlockNode, 'bx-step-warning');
			}

			if (!this.result.WARNING || !this.options.showWarnings)
				return;

			for (k in this.result.WARNING)
			{
				if (this.result.WARNING.hasOwnProperty(k))
				{
					switch (k.toUpperCase())
					{
						case 'DELIVERY':
							if (this.deliveryBlockNode.getAttribute('data-visited') === 'true')
							{
								this.showBlockWarning(this.deliveryBlockNode, this.result.WARNING[k], true);
								this.showBlockWarning(this.deliveryHiddenBlockNode, this.result.WARNING[k], true);
							}

							break;
						case 'PAY_SYSTEM':
							if (this.paySystemBlockNode.getAttribute('data-visited') === 'true')
							{
								this.showBlockWarning(this.paySystemBlockNode, this.result.WARNING[k], true);
								this.showBlockWarning(this.paySystemHiddenBlockNode, this.result.WARNING[k], true);
							}

							break;
					}
				}
			}
		},

		notifyAboutWarnings: function(node)
		{
			if (!BX.type.isDomNode(node))
				return;

			switch (node.id)
			{
				case this.deliveryBlockNode.id:
					this.showBlockWarning(this.deliveryBlockNode, this.result.WARNING.DELIVERY, true);
					break;
				case this.paySystemBlockNode.id:
					this.showBlockWarning(this.paySystemBlockNode, this.result.WARNING.PAY_SYSTEM, true);
					break;
			}
		},

		showBlockWarning: function(node, warnings, hide)
		{
			var errorNode = node.querySelector('.alert.alert-danger'),
				warnStr = '',
				i, warningNode, existedWarningNodes;

			if (errorNode)
			{
				if (BX.type.isString(warnings))
				{
					warnStr = warnings;
				}
				else
				{
					for (i in warnings)
					{
						if (warnings.hasOwnProperty(i) && warnings[i])
						{
							warnStr += warnings[i] + '<br>';
						}
					}
				}

				if (!warnStr)
				{
					return;
				}

				existedWarningNodes = node.querySelectorAll('.alert.alert-warning');
				for (i in existedWarningNodes)
				{
					if (existedWarningNodes.hasOwnProperty(i) && BX.type.isDomNode(existedWarningNodes[i]))
					{
						if (existedWarningNodes[i].innerHTML.indexOf(warnStr) !== -1)
						{
							return;
						}
					}
				}

				warningNode = BX.create('DIV', {
					props: {className: 'alert alert-warning' + (!!hide ? ' alert-hide' : ' alert-show')},
					html: warnStr
				});
				BX.prepend(warningNode, errorNode.parentNode);
				BX.addClass(node, 'bx-step-warning');
			}
		},

		showPagination: function(entity, node)
		{
			if (!node || !entity)
				return;

			var pagination, navigation = [], i,
				pageCounter, active,
				colorTheme, paginationNode;

			switch (entity)
			{
				case 'delivery':
					pagination = this.deliveryPagination; break;
				case 'paySystem':
					pagination = this.paySystemPagination; break;
				case 'pickUp':
					pagination = this.pickUpPagination; break;
			}

			if (pagination.pages.length > 1)
			{
				navigation.push(
					BX.create('LI', {
						attrs: {
							'data-action': 'prev',
							'data-entity': entity
						},
						props: {className: 'bx-pag-prev'},
						html: pagination.pageNumber == 1
							? '<span>' + this.params.MESS_NAV_BACK + '</span>'
							: '<a href=""><span>' + this.params.MESS_NAV_BACK + '</span></a>',
						events: {click: BX.proxy(this.doPagination, this)}
					})
				);
				for (i = 0; i < pagination.pages.length; i++)
				{
					pageCounter = parseInt(i) + 1;
					active = pageCounter == pagination.pageNumber ? 'bx-active' : '';

					navigation.push(
						BX.create('LI', {
							attrs: {
								'data-action': pageCounter,
								'data-entity': entity
							},
							props: {className: active},
							html: '<a href=""><span>' + pageCounter  + '</span></a>',
							events: {click: BX.proxy(this.doPagination, this)}
						})
					);
				}

				navigation.push(
					BX.create('LI', {
						attrs: {
							'data-action': 'next',
							'data-entity': entity
						},
						props: {className: 'bx-pag-next'},
						html: pagination.pageNumber == pagination.pages.length
							? '<span>' + this.params.MESS_NAV_FORWARD + '</span>'
							: '<a href=""><span>' + this.params.MESS_NAV_FORWARD + '</span></a>',
						events: {click: BX.proxy(this.doPagination, this)}
					})
				);
				colorTheme = this.params.TEMPLATE_THEME || '';
				paginationNode = BX.create('DIV', {
					props: {className: 'bx-pagination' + (colorTheme ? ' bx-' + colorTheme : '')},
					children: [
						BX.create('DIV', {
							props: {className: 'bx-pagination-container'},
							children: [BX.create('UL', {children: navigation})]
						})
					]
				});

				node.appendChild(BX.create('DIV', {style: {clear: 'both'}}));
				node.appendChild(paginationNode);
			}
		},

		doPagination: function(e)
		{
			var target = e.target || e.srcElement,
				node = target.tagName == 'LI' ? target : BX.findParent(target, {tagName: 'LI'}),
				page = node.getAttribute('data-action'),
				entity = node.getAttribute('data-entity'),
				pageNum;

			if (BX.hasClass(node, 'bx-active'))
				return BX.PreventDefault(e);

			if (page == 'prev' || page == 'next')
			{
				pageNum = parseInt(BX.findParent(node).querySelector('.bx-active').getAttribute('data-action'));
				page = page == 'next' ? ++pageNum : --pageNum;
			}

			if (entity == 'delivery')
				this.showDeliveryItemsPage(page);
			else if (entity == 'paySystem')
				this.showPaySystemItemsPage(page);
			else if (entity == 'pickUp')
				this.showPickUpItemsPage(page);

			return BX.PreventDefault(e);
		},

		showDeliveryItemsPage: function(page)
		{
			this.getCurrentPageItems('delivery', page);

			var selectedDelivery = this.getSelectedDelivery(), hidden,
				deliveryItemsContainer, k, deliveryItemNode;

			if (selectedDelivery && selectedDelivery.ID)
			{
				hidden = this.deliveryBlockNode.querySelector('input[type=hidden][name=DELIVERY_ID]');
				if (!hidden)
				{
					hidden = BX.create('INPUT', {
						props: {
							type: 'hidden',
							name: 'DELIVERY_ID',
							value: selectedDelivery.ID
						}
					})
				}
			}

			deliveryItemsContainer = this.deliveryBlockNode.querySelector('.bx-soa-pp-item-container');
			BX.cleanNode(deliveryItemsContainer);

			if (BX.type.isDomNode(hidden))
				BX.prepend(hidden, BX.findParent(deliveryItemsContainer));

			for (k = 0; k < this.deliveryPagination.currentPage.length; k++)
			{
				deliveryItemNode = this.createDeliveryItem(this.deliveryPagination.currentPage[k]);
				deliveryItemsContainer.appendChild(deliveryItemNode);
			}

			this.showPagination('delivery', deliveryItemsContainer);
		},

		showPaySystemItemsPage: function(page)
		{
			this.getCurrentPageItems('paySystem', page);

			var selectedPaySystem = this.getSelectedPaySystem(), hidden,
				paySystemItemsContainer, k, paySystemItemNode;

			if (selectedPaySystem && selectedPaySystem.ID)
			{
				hidden = this.paySystemBlockNode.querySelector('input[type=hidden][name=PAY_SYSTEM_ID]');
				if (!hidden)
				{
					hidden = BX.create('INPUT', {
						props: {
							type: 'hidden',
							name: 'PAY_SYSTEM_ID',
							value: selectedPaySystem.ID
						}
					})
				}
			}

			paySystemItemsContainer = this.paySystemBlockNode.querySelector('.bx-soa-pp-item-container');
			BX.cleanNode(paySystemItemsContainer);

			if (BX.type.isDomNode(hidden))
				BX.prepend(hidden, BX.findParent(paySystemItemsContainer));

			for (k = 0; k < this.paySystemPagination.currentPage.length; k++)
			{
				paySystemItemNode = this.createPaySystemItem(this.paySystemPagination.currentPage[k]);
				paySystemItemsContainer.appendChild(paySystemItemNode);
			}

			this.showPagination('paySystem', paySystemItemsContainer);
		},

		showPickUpItemsPage: function(page)
		{
			this.getCurrentPageItems('pickUp', page);
			this.editPickUpList(false);
		},

		getCurrentPageItems: function(entity, page)
		{
			if (!entity || typeof page === 'undefined')
				return;

			var pagination, perPage;

			switch (entity)
			{
				case 'delivery':
					pagination = this.deliveryPagination;
					perPage = this.options.deliveriesPerPage;
					break;
				case 'paySystem':
					pagination = this.paySystemPagination;
					perPage = this.options.paySystemsPerPage;
					break;
				case 'pickUp':
					pagination = this.pickUpPagination;
					perPage = this.options.pickUpsPerPage;
					break;
			}

			if (pagination && perPage > 0)
			{
				if (page <= 0 || page > pagination.pages.length)
					return;

				pagination.pageNumber = page;
				pagination.currentPage = pagination.pages.slice(pagination.pageNumber - 1, pagination.pageNumber)[0];
			}
		},

		initPropsListForLocation: function()
		{
			if (BX.saleOrderAjax && this.result.ORDER_PROP && this.result.ORDER_PROP.properties)
			{
				var i, k, curProp, attrObj;

				BX.saleOrderAjax.cleanUp();

				for (i = 0; i < this.result.ORDER_PROP.properties.length; i++)
				{
					curProp = this.result.ORDER_PROP.properties[i];

					if (curProp.TYPE == 'LOCATION' && curProp.MULTIPLE == 'Y' && curProp.IS_LOCATION != 'Y')
					{
						for (k = 0; k < this.locations[curProp.ID].length; k++)
						{
							BX.saleOrderAjax.addPropertyDesc({
								id: curProp.ID + '_' + k,
								attributes: {
									id: curProp.ID + '_' + k,
									type: curProp.TYPE,
									valueSource: curProp.SOURCE == 'DEFAULT' ? 'default' : 'form'
								}
							});
						}
					}
					else
					{
						attrObj = {
							id: curProp.ID,
							type: curProp.TYPE,
							valueSource: curProp.SOURCE == 'DEFAULT' ? 'default' : 'form'
						};

						if (!this.deliveryLocationInfo.city && parseInt(curProp.INPUT_FIELD_LOCATION) > 0)
						{
							attrObj.altLocationPropId = parseInt(curProp.INPUT_FIELD_LOCATION);
							this.deliveryLocationInfo.city = curProp.INPUT_FIELD_LOCATION;
						}

						if (!this.deliveryLocationInfo.loc && curProp.IS_LOCATION == 'Y')
							this.deliveryLocationInfo.loc = curProp.ID;

						if (!this.deliveryLocationInfo.zip && curProp.IS_ZIP == 'Y')
						{
							attrObj.isZip = true;
							this.deliveryLocationInfo.zip = curProp.ID;
						}

						BX.saleOrderAjax.addPropertyDesc({
							id: curProp.ID,
							attributes: attrObj
						});
					}
				}
			}
		},

		/**
		 * Binds main events for scrolling/resizing
		 */
		bindEvents: function()
		{
			BX.bind(this.orderSaveBlockNode.querySelector('[data-save-button]'), 'click', BX.proxy(this.clickOrderSaveAction, this));
			BX.bind(window, 'scroll', BX.proxy(this.totalBlockScrollCheck, this));
			BX.bind(window, 'resize', BX.throttle(function(){
				this.totalBlockResizeCheck();
				this.alignBasketColumns();
				this.basketBlockScrollCheck();
				this.mapsReady && this.resizeMapContainers();
			}, 50, this));
			BX.addCustomEvent('onDeliveryExtraServiceValueChange', BX.proxy(this.sendRequest, this));
		},

		initFirstSection: function()
		{
			var firstSection = this.orderBlockNode.querySelector('.bx-soa-section.bx-active');
			BX.addClass(firstSection, 'bx-selected');
			this.activeSectionId = firstSection.id;
		},

		initOptions: function()
		{
			var headers, i, total;

			this.initPropsListForLocation();

			this.propertyCollection = new BX.Sale.PropertyCollection(BX.merge({publicMode: true}, this.result.ORDER_PROP));
			this.fadedPropertyCollection = new BX.Sale.PropertyCollection(BX.merge({publicMode: true}, this.result.ORDER_PROP));

			if (this.options.propertyValidation)
				this.initValidation();

			this.initPagination();

			this.options.showPreviewPicInBasket = false;
			this.options.showDetailPicInBasket = false;
			this.options.showPropsInBasket = false;
			this.options.showPriceNotesInBasket = false;

			if (this.result.GRID && this.result.GRID.HEADERS)
			{
				headers = this.result.GRID.HEADERS;
				for (i = 0; i < headers.length; i++)
				{
					if (headers[i].id === 'PREVIEW_PICTURE')
						this.options.showPreviewPicInBasket = true;

					if (headers[i].id === 'DETAIL_PICTURE')
						this.options.showDetailPicInBasket = true;

					if (headers[i].id === 'PROPS')
						this.options.showPropsInBasket = true;

					if (headers[i].id === 'NOTES')
						this.options.showPriceNotesInBasket = true;
				}
			}

			if (this.result.TOTAL)
			{
				total = this.result.TOTAL;
				this.options.showOrderWeight = total.ORDER_WEIGHT && parseFloat(total.ORDER_WEIGHT) > 0;
				this.options.showPriceWithoutDiscount = parseFloat(total.ORDER_PRICE) < parseFloat(total.PRICE_WITHOUT_DISCOUNT_VALUE);
				this.options.showDiscountPrice = total.DISCOUNT_PRICE && parseFloat(total.DISCOUNT_PRICE) > 0;
				this.options.showTaxList = total.TAX_LIST && total.TAX_LIST.length;
				this.options.showPayedFromInnerBudget = total.PAYED_FROM_ACCOUNT_FORMATED && total.PAYED_FROM_ACCOUNT_FORMATED.length;
			}
		},

		reachGoal: function(goal, section)
		{
			var counter = this.params.YM_GOALS_COUNTER || '',
				useGoals = this.params.USE_YM_GOALS == 'Y' && typeof window['yaCounter' + counter] !== 'undefined',
				goalId;

			if (useGoals)
			{
				goalId = this.getGoalId(goal, section);
				window['yaCounter' + counter].reachGoal(goalId);
			}
		},

		getGoalId: function(goal, section)
		{
			if (!goal)
				return '';

			if (goal == 'initialization')
				return this.params.YM_GOALS_INITIALIZE;

			if (goal == 'order')
				return this.params.YM_GOALS_SAVE_ORDER;

			var goalId = '',
				isEdit = goal == 'edit';

			if (!section || !section.id)
				return '';

			switch (section.id)
			{
				case this.basketBlockNode.id:
					goalId = isEdit ? this.params.YM_GOALS_EDIT_BASKET : this.params.YM_GOALS_NEXT_BASKET; break;
				case this.regionBlockNode.id:
					goalId = isEdit ? this.params.YM_GOALS_EDIT_REGION : this.params.YM_GOALS_NEXT_REGION; break;
				case this.paySystemBlockNode.id:
					goalId = isEdit ? this.params.YM_GOALS_EDIT_PAY_SYSTEM : this.params.YM_GOALS_NEXT_PAY_SYSTEM; break;
				case this.deliveryBlockNode.id:
					goalId = isEdit ? this.params.YM_GOALS_EDIT_DELIVERY : this.params.YM_GOALS_NEXT_DELIVERY; break;
				case this.pickUpBlockNode.id:
					goalId = isEdit ? this.params.YM_GOALS_EDIT_PICKUP : this.params.YM_GOALS_NEXT_PICKUP; break;
				case this.propsBlockNode.id:
					goalId = isEdit ? this.params.YM_GOALS_EDIT_PROPERTIES : this.params.YM_GOALS_NEXT_PROPERTIES; break;
			}

			return goalId;
		},

		isPriceChanged: function(result)
		{
			var priceBefore = this.result.TOTAL.ORDER_TOTAL_LEFT_TO_PAY === null || this.result.TOTAL.ORDER_TOTAL_LEFT_TO_PAY === ''
					? this.result.TOTAL.ORDER_TOTAL_PRICE
					: this.result.TOTAL.ORDER_TOTAL_LEFT_TO_PAY,
				priceAfter = result.order.TOTAL.ORDER_TOTAL_LEFT_TO_PAY === null ? result.order.TOTAL.ORDER_TOTAL_PRICE : result.order.TOTAL.ORDER_TOTAL_LEFT_TO_PAY;

			this.options.totalPriceChanged = parseFloat(priceBefore) != parseFloat(priceAfter);
		},

		initValidation: function()
		{
			if (!this.result.ORDER_PROP || !this.result.ORDER_PROP.properties)
				return;

			var properties = this.result.ORDER_PROP.properties,
				obj = {}, i;

			for (i in properties)
			{
				if (properties.hasOwnProperty(i))
					obj[properties[i].ID] = properties[i];
			}

			this.validation.properties = obj;
		},

		initPagination: function()
		{
			var arReserve, pages, arPages, i;

			if (this.result.DELIVERY)
			{
				this.result.DELIVERY = this.getDeliverySortedArray(this.result.DELIVERY);

				if (this.options.deliveriesPerPage > 0 && this.result.DELIVERY.length > this.options.deliveriesPerPage)
				{
					arReserve = this.result.DELIVERY.slice();
					pages = Math.ceil(arReserve.length / this.options.deliveriesPerPage);
					arPages = [];

					for (i = 0; i < pages; i++)
					{
						arPages.push(arReserve.splice(0, this.options.deliveriesPerPage));
					}
					this.deliveryPagination.pages = arPages;

					for (i = 0; i < this.result.DELIVERY.length; i++)
					{
						if (this.result.DELIVERY[i].CHECKED == 'Y')
						{
							this.deliveryPagination.pageNumber = Math.ceil(++i / this.options.deliveriesPerPage);
							break;
						}
					}

					this.deliveryPagination.pageNumber = this.deliveryPagination.pageNumber || 1;
					this.deliveryPagination.currentPage = arPages.slice(this.deliveryPagination.pageNumber - 1, this.deliveryPagination.pageNumber)[0];
					this.deliveryPagination.show = true
				}
				else
				{
					this.deliveryPagination.pageNumber = 1;
					this.deliveryPagination.currentPage = this.result.DELIVERY;
					this.deliveryPagination.show = false;
				}
			}

			if (this.result.PAY_SYSTEM)
			{
				if (this.options.paySystemsPerPage > 0 && this.result.PAY_SYSTEM.length > this.options.paySystemsPerPage)
				{
					arReserve = this.result.PAY_SYSTEM.slice();
					pages = Math.ceil(arReserve.length / this.options.paySystemsPerPage);
					arPages = [];

					for (i = 0; i < pages; i++)
					{
						arPages.push(arReserve.splice(0, this.options.paySystemsPerPage));
					}
					this.paySystemPagination.pages = arPages;

					for (i = 0; i < this.result.PAY_SYSTEM.length; i++)
					{
						if (this.result.PAY_SYSTEM[i].CHECKED == 'Y')
						{
							this.paySystemPagination.pageNumber = Math.ceil(++i / this.options.paySystemsPerPage);
							break;
						}
					}

					this.paySystemPagination.pageNumber = this.paySystemPagination.pageNumber || 1;
					this.paySystemPagination.currentPage = arPages.slice(this.paySystemPagination.pageNumber - 1, this.paySystemPagination.pageNumber)[0];
					this.paySystemPagination.show = true
				}
				else
				{
					this.paySystemPagination.pageNumber = 1;
					this.paySystemPagination.currentPage = this.result.PAY_SYSTEM;
					this.paySystemPagination.show = false;
				}
			}
		},

		initPickUpPagination: function()
		{
			var usePickUpPagination = false,
				usePickUp = false,
				stores, i = 0,
				arReserve, pages, arPages;

			if (this.options.pickUpsPerPage >= 0 && this.result.DELIVERY)
			{
				for (i = 0; i < this.result.DELIVERY.length; i++)
				{
					if (this.result.DELIVERY[i].CHECKED === 'Y' && this.result.DELIVERY[i].STORE_MAIN)
					{
						usePickUp = this.result.DELIVERY[i].STORE_MAIN.length > 0;
						usePickUpPagination = this.result.DELIVERY[i].STORE_MAIN.length > this.options.pickUpsPerPage;
						if (usePickUp)
							stores = this.getPickUpInfoArray(this.result.DELIVERY[i].STORE_MAIN);
						break;
					}
				}
			}

			if (usePickUp)
			{
				if (this.options.pickUpsPerPage > 0 && usePickUpPagination)
				{
					arReserve = stores.slice();
					pages = Math.ceil(arReserve.length / this.options.pickUpsPerPage);
					arPages = [];

					for (i = 0; i < pages; i++)
						arPages.push(arReserve.splice(0, this.options.pickUpsPerPage));

					this.pickUpPagination.pages = arPages;

					for (i = 0; i < stores.length; i++)
					{
						if (!this.result.BUYER_STORE || stores[i].ID == this.result.BUYER_STORE)
						{
							this.pickUpPagination.pageNumber = Math.ceil(++i / this.options.pickUpsPerPage);
							break;
						}
					}

					if (!this.pickUpPagination.pageNumber)
						this.pickUpPagination.pageNumber = 1;

					this.pickUpPagination.currentPage = arPages.slice(this.pickUpPagination.pageNumber - 1, this.pickUpPagination.pageNumber)[0];
					this.pickUpPagination.show = true
				}
				else
				{
					this.pickUpPagination.pageNumber = 1;
					this.pickUpPagination.currentPage = stores;
					this.pickUpPagination.show = false;
				}
			}
		},

		prepareLocations: function(locations)
		{
			this.locations = {};
			this.cleanLocations = {};

			var temporaryLocations,
				i, k, output;

			if (BX.util.object_keys(locations).length)
			{
				for (i in locations)
				{
					if (!locations.hasOwnProperty(i))
						continue;

					this.locationsTemplate = locations[i].template || '';
					temporaryLocations = [];
					output = locations[i].output;

					if (output.clean)
					{
						this.cleanLocations[i] = BX.processHTML(output.clean, false);
						delete output.clean;
					}

					for (k in output)
					{
						if (output.hasOwnProperty(k))
						{
							temporaryLocations.push({
								output: BX.processHTML(output[k], false),
								showAlt: locations[i].showAlt,
								lastValue: locations[i].lastValue,
								coordinates: locations[i].coordinates || false
							});
						}
					}

					this.locations[i] = temporaryLocations;
				}
			}
		},

		locationsCompletion: function()
		{
			var i, locationNode, clearButton, inputStep, inputSearch,
				arProperty, data, section;

			this.locationsInitialized = true;
			this.fixLocationsStyle(this.regionBlockNode, this.regionHiddenBlockNode);
			this.fixLocationsStyle(this.propsBlockNode, this.propsHiddenBlockNode);

			for (i in this.locations)
			{
				if (!this.locations.hasOwnProperty(i))
					continue;

				locationNode = this.orderBlockNode.querySelector('div[data-property-id-row="' + i + '"]');
				if (!locationNode)
					continue;

				clearButton = locationNode.querySelector('div.bx-ui-sls-clear');
				inputStep = locationNode.querySelector('div.bx-ui-slst-pool');
				inputSearch = locationNode.querySelector('input.bx-ui-sls-fake[type=text]');

				locationNode.removeAttribute('style');
				this.bindValidation(i, locationNode);
				if (clearButton)
				{
					BX.bind(clearButton, 'click', function(e){
						var target = e.target || e.srcElement,
							parent = BX.findParent(target, {tagName: 'DIV', className: 'form-group'}),
							locationInput;

						if (parent)
							locationInput = parent.querySelector('input.bx-ui-sls-fake[type=text]');

						if (locationInput)
							BX.fireEvent(locationInput, 'keyup');
					});
				}

				if (!this.firstLoad && this.options.propertyValidation)
				{
					if (inputStep)
					{
						arProperty = this.validation.properties[i];
						data = this.getValidationData(arProperty, locationNode);
						section = BX.findParent(locationNode, {className: 'bx-soa-section'});

						if (section && section.getAttribute('data-visited') == 'true')
							this.isValidProperty(data);
					}

					if (inputSearch)
						BX.fireEvent(inputSearch, 'keyup');
				}
			}

			if (this.firstLoad && this.result.IS_AUTHORIZED && typeof this.result.LAST_ORDER_DATA.FAIL === 'undefined')
			{
				this.showActualBlock();
			}
			else if (!this.result.SHOW_AUTH)
			{
				this.changeVisibleContent();
			}

			this.checkNotifications();

			if (this.activeSectionId !== this.regionBlockNode.id)
				this.editFadeRegionContent(this.regionBlockNode.querySelector('.bx-soa-section-content'));

			if (this.activeSectionId != this.propsBlockNode.id)
				this.editFadePropsContent(this.propsBlockNode.querySelector('.bx-soa-section-content'));
		},

		fixLocationsStyle: function(section, hiddenSection)
		{
			if (!section || !hiddenSection)
				return;

			var regionActive = this.activeSectionId == section.id ? section : hiddenSection,
				locationSearchInputs, locationStepInputs, i;

			locationSearchInputs = regionActive.querySelectorAll('div.bx-sls div.dropdown-block.bx-ui-sls-input-block');
			locationStepInputs = regionActive.querySelectorAll('div.bx-slst div.dropdown-block.bx-ui-slst-input-block');

			if (locationSearchInputs.length)
				for (i = 0; i < locationSearchInputs.length; i++)
					BX.addClass(locationSearchInputs[i], 'form-control');

			if (locationStepInputs.length)
				for (i = 0; i < locationStepInputs.length; i++)
					BX.addClass(locationStepInputs[i], 'form-control');
		},

		/**
		 * Order saving action with validation. Doesn't send request while have errors
		 */
		clickOrderSaveAction: function(event)
		{
			if (this.isValidForm())
			{
				this.allowOrderSave();

				if (this.params.USER_CONSENT === 'Y' && BX.UserConsent)
				{
					BX.onCustomEvent('bx-soa-order-save', []);
				}
				else
				{
					this.doSaveAction();
				}
			}

			return BX.PreventDefault(event);
		},

		doSaveAction: function()
		{
			if (this.isOrderSaveAllowed())
			{
				this.reachGoal('order');
				this.sendRequest('saveOrderAjax');
			}
		},

		/**
		 * Hiding current block node and showing next available block node
		 */
		clickNextAction: function(event)
		{
			var target = event.target || event.srcElement,
				actionSection = BX.findParent(target, {className : "bx-active"}),
				section = this.getNextSection(actionSection),
				allSections, titleNode, editStep;

			this.reachGoal('next', actionSection);

			if (
				(!this.result.IS_AUTHORIZED || typeof this.result.LAST_ORDER_DATA.FAIL !== 'undefined')
				&& section.next.getAttribute('data-visited') == 'false'
			)
			{
				titleNode = section.next.querySelector('.bx-soa-section-title-container');
				BX.bind(titleNode, 'click', BX.proxy(this.showByClick, this));
				editStep = section.next.querySelector('.bx-soa-editstep');
				if (editStep)
					editStep.style.display = '';

				allSections = this.orderBlockNode.querySelectorAll('.bx-soa-section.bx-active');
				if (section.next.id == allSections[allSections.length - 1].id)
					this.switchOrderSaveButtons(true);
			}

			this.fade(actionSection, section.next);
			this.show(section.next);

			return BX.PreventDefault(event);
		},

		/**
		 * Hiding current block node and showing previous available block node
		 */
		clickPrevAction: function(event)
		{
			var target = event.target || event.srcElement,
				actionSection = BX.findParent(target, {className: "bx-active"}),
				section = this.getPrevSection(actionSection);

			this.fade(actionSection);
			this.show(section.next);
			this.animateScrollTo(section.next, 800);
			return BX.PreventDefault(event);
		},

		/**
		 * Showing authentication block node
		 */
		showAuthBlock: function()
		{
			var showNode = this.authBlockNode,
				fadeNode = BX(this.activeSectionId);

			if (!showNode || BX.hasClass(showNode, 'bx-selected'))
				return;

			fadeNode && this.fade(fadeNode);
			this.show(showNode);
		},

		/**
		 * Hiding authentication block node
		 */
		closeAuthBlock: function()
		{
			var actionSection = this.authBlockNode,
				nextSection = this.getNextSection(actionSection).next;

			this.fade(actionSection);
			BX.cleanNode(BX(nextSection.id + '-hidden'));
			this.show(nextSection);
		},

		/**
		 * Checks possibility to skip section
		 */
		shouldSkipSection: function(section)
		{
			var skip = false;

			if (this.params.SKIP_USELESS_BLOCK === 'Y')
			{
				if (section.id === this.pickUpBlockNode.id)
				{
					var delivery = this.getSelectedDelivery();
					if (delivery)
					{
						skip = this.getPickUpInfoArray(delivery.STORE).length === 1;
					}
				}

				if (section.id === this.deliveryBlockNode.id)
				{
					skip = this.result.DELIVERY && this.result.DELIVERY.length === 1
						&& this.result.DELIVERY[0].EXTRA_SERVICES.length === 0
						&& !this.result.DELIVERY[0].CALCULATE_ERRORS;
				}

				if (section.id === this.paySystemBlockNode.id)
				{
					skip = this.result.PAY_SYSTEM && this.result.PAY_SYSTEM.length === 1 && this.result.PAY_FROM_ACCOUNT !== 'Y';
				}
			}

			return skip;
		},

		/**
		 * Returns next available block node (node skipped while have one pay system, delivery or pick up)
		 */
		getNextSection: function(actionSection, skippedSection)
		{
			if (!this.orderBlockNode || !actionSection)
				return {};

			var allSections = this.orderBlockNode.querySelectorAll('.bx-soa-section.bx-active'),
				nextSection, i;

			for (i = 0; i < allSections.length; i++)
			{
				if (allSections[i].id === actionSection.id && allSections[i + 1])
				{
					nextSection = allSections[i + 1];

					if (this.shouldSkipSection(nextSection))
					{
						this.markSectionAsCompleted(nextSection);

						return this.getNextSection(nextSection, nextSection);
					}

					return {
						prev: actionSection,
						next: nextSection,
						skip: skippedSection
					};
				}
			}

			return {next: actionSection};
		},

		markSectionAsCompleted: function(section)
		{
			var titleNode;

			if (
				(!this.result.IS_AUTHORIZED || typeof this.result.LAST_ORDER_DATA.FAIL !== 'undefined')
				&& section.getAttribute('data-visited') === 'false'
			)
			{
				this.changeVisibleSection(section, true);
				titleNode = section.querySelector('.bx-soa-section-title-container');
				BX.bind(titleNode, 'click', BX.proxy(this.showByClick, this));
			}

			section.setAttribute('data-visited', 'true');
			BX.addClass(section, 'bx-step-completed');
			BX.remove(section.querySelector('.alert.alert-warning.alert-hide'));
			this.checkBlockErrors(section);
		},

		/**
		 * Returns previous available block node (node skipped while have one pay system, delivery or pick up)
		 */
		getPrevSection: function(actionSection)
		{
			if (!this.orderBlockNode || !actionSection)
				return {};

			var allSections = this.orderBlockNode.querySelectorAll('.bx-soa-section.bx-active'),
				prevSection, i;

			for (i = 0; i < allSections.length; i++)
			{
				if (allSections[i].id === actionSection.id && allSections[i - 1])
				{
					prevSection = allSections[i - 1];

					if (this.shouldSkipSection(prevSection))
					{
						this.markSectionAsCompleted(prevSection);

						return this.getPrevSection(prevSection);
					}

					return {
						prev: actionSection,
						next: prevSection
					};
				}
			}

			return {next: actionSection};
		},

		addAnimationEffect: function(node, className, timeout)
		{
			if (!node || !className)
				return;

			if (this.timeOut[node.id])
			{
				clearTimeout(this.timeOut[node.id].timer);
				BX.removeClass(node, this.timeOut[node.id].className);
			}

			setTimeout(function(){BX.addClass(node, className)}, 10);
			this.timeOut[node.id] = {
				className: className,
				timer: setTimeout(
					BX.delegate(function(){
						BX.removeClass(node, className);
						delete this.timeOut[node.id];
					}, this),
					timeout || 5000)
			};
		},

		/**
		 * Replacing current active block node with generated fade block node
		 */
		fade: function(node, nextSection)
		{
			if (!node || !node.id || this.activeSectionId != node.id)
				return;

			this.hasErrorSection[node.id] = false;

			var objHeightOrig = node.offsetHeight,
				objHeight;

			switch (node.id)
			{
				case this.authBlockNode.id:
					this.authBlockNode.style.display = 'none';
					BX.removeClass(this.authBlockNode, 'bx-active');
					break;
				case this.basketBlockNode.id:
					this.editFadeBasketBlock();
					break;
				case this.regionBlockNode.id:
					this.editFadeRegionBlock();
					break;
				case this.paySystemBlockNode.id:
					BX.remove(this.paySystemBlockNode.querySelector('.alert.alert-warning.alert-hide'));
					this.editFadePaySystemBlock();
					break;
				case this.deliveryBlockNode.id:
					BX.remove(this.deliveryBlockNode.querySelector('.alert.alert-warning.alert-hide'));
					this.editFadeDeliveryBlock();
					break;
				case this.pickUpBlockNode.id:
					this.editFadePickUpBlock();
					break;
				case this.propsBlockNode.id:
					this.editFadePropsBlock();
					break;
			}

			BX.addClass(node, 'bx-step-completed');
			BX.removeClass(node, 'bx-selected');

			objHeight = node.offsetHeight;
			node.style.height = objHeightOrig + 'px';

			// calculations of scrolling animation
			if (nextSection)
			{
				var windowScrollTop = BX.GetWindowScrollPos().scrollTop,
					orderPos = BX.pos(this.orderBlockNode),
					nodePos = BX.pos(node),
					diff, scrollTo, nextSectionHeightBefore, nextSectionHeightAfter, nextSectionHidden, offset;

				nextSectionHidden = BX(nextSection.id + '-hidden');
				nextSectionHidden.style.left = '-10000';
				nextSectionHidden.style.position = 'absolute';
				this.orderBlockNode.appendChild(nextSectionHidden);
				nextSectionHeightBefore = nextSection.offsetHeight;
				nextSectionHeightAfter = nextSectionHidden.offsetHeight + 57;
				BX(node.id + '-hidden').parentNode.appendChild(nextSectionHidden);
				nextSectionHidden.removeAttribute('style');

				diff = objHeight + nextSectionHeightAfter - objHeightOrig - nextSectionHeightBefore;

				offset = window.innerHeight - orderPos.height - diff;
				if (offset > 0)
					scrollTo = orderPos.top - offset/2;
				else
				{
					if (nodePos.top > windowScrollTop)
						scrollTo = nodePos.top;
					else
						scrollTo = nodePos.bottom + 6 - objHeightOrig + objHeight;

					if (scrollTo + window.innerHeight > orderPos.bottom + 25 + diff)
						scrollTo = orderPos.bottom + 25 + diff - window.innerHeight;
				}

				scrollTo -= this.isMobile ? 50 : 0;
			}

			new BX.easing({
				duration: nextSection ? 800 : 600,
				start: {height: objHeightOrig, scrollTop: windowScrollTop},
				finish: {height: objHeight, scrollTop: scrollTo},
				transition: BX.easing.makeEaseOut(BX.easing.transitions.quad),
				step: function(state){
					node.style.height = state.height + "px";
					if (nextSection)
						window.scrollTo(0, state.scrollTop);
				},
				complete: function(){
					node.style.height = '';
				}
			}).animate();

			this.checkBlockErrors(node);
		},

		/**
		 * Showing active data in certain block node
		 */
		show: function(node)
		{
			if (!node || !node.id || this.activeSectionId == node.id)
				return;

			this.activeSectionId = node.id;
			BX.removeClass(node, 'bx-step-error bx-step-warning');

			switch (node.id)
			{
				case this.authBlockNode.id:
					this.authBlockNode.style.display = '';
					BX.addClass(this.authBlockNode, 'bx-active');
					break;
				case this.basketBlockNode.id:
					this.editActiveBasketBlock(true);
					this.alignBasketColumns();
					break;
				case this.regionBlockNode.id:
					this.editActiveRegionBlock(true);
					break;
				case this.deliveryBlockNode.id:
					this.editActiveDeliveryBlock(true);
					break;
				case this.paySystemBlockNode.id:
					this.editActivePaySystemBlock(true);
					break;
				case this.pickUpBlockNode.id:
					this.editActivePickUpBlock(true);
					break;
				case this.propsBlockNode.id:
					this.editActivePropsBlock(true);
					break;
			}

			if (node.getAttribute('data-visited') === 'false')
			{
				this.showBlockErrors(node);
				this.notifyAboutWarnings(node);
			}

			node.setAttribute('data-visited', 'true');
			BX.addClass(node, 'bx-selected');
			BX.removeClass(node, 'bx-step-completed');
		},

		showByClick: function(event)
		{
			var target = event.target || event.srcElement,
				showNode = BX.findParent(target, {className: "bx-active"}),
				fadeNode = BX(this.activeSectionId),
				scrollTop = BX.GetWindowScrollPos().scrollTop;

			if (!showNode || BX.hasClass(showNode, 'bx-selected'))
				return BX.PreventDefault(event);

			this.reachGoal('edit', showNode);

			fadeNode && this.fade(fadeNode);
			this.show(showNode);

			setTimeout(BX.delegate(function(){
				if (BX.pos(showNode).top < scrollTop)
					this.animateScrollTo(showNode, 300);
			}, this), 320);

			return BX.PreventDefault(event);
		},

		/**
		 * Checks each active block from top to bottom for errors (showing first block with errors or last block)
		 */
		showActualBlock: function()
		{
			var allSections = this.orderBlockNode.querySelectorAll('.bx-soa-section.bx-active'),
				i = 0;

			while (allSections[i])
			{
				if (allSections[i].id === this.regionBlockNode.id)
					this.isValidRegionBlock();

				if (allSections[i].id === this.propsBlockNode.id)
					this.isValidPropertiesBlock();

				if (!this.checkBlockErrors(allSections[i]) || !this.checkPreload(allSections[i]))
				{
					if (this.activeSectionId !== allSections[i].id)
					{
						BX(this.activeSectionId) && this.fade(BX(this.activeSectionId));
						this.show(allSections[i]);
					}

					break;
				}

				BX.addClass(allSections[i], 'bx-step-completed');
				allSections[i].setAttribute('data-visited', 'true');
				i++;
			}
		},

		/**
		 * Returns footer node with navigation buttons
		 */
		getBlockFooter: function(node)
		{
			var sections = this.orderBlockNode.querySelectorAll('.bx-soa-section.bx-active'),
				firstSection = sections[0],
				lastSection = sections[sections.length - 1],
				currentSection = BX.findParent(node, {className: "bx-soa-section"}),
				isLastNode = false,
				buttons = [];

			if (currentSection && currentSection.id.indexOf(firstSection.id) == '-1')
			{
				buttons.push(
					BX.create('A', {
						props: {
							href: 'javascript:void(0)',
							className: 'pull-left btn btn-default btn-md'
						},
						html: this.params.MESS_BACK,
						events: {
							click: BX.proxy(this.clickPrevAction, this)
						}
					})
				);
			}

			if (currentSection && currentSection.id.indexOf(lastSection.id) != '-1')
				isLastNode = true;

			if (!isLastNode)
			{
				buttons.push(
					BX.create('A', {
						props: {href: 'javascript:void(0)', className: 'pull-right btn btn-default btn-md'},
						html: this.params.MESS_FURTHER,
						events: {click: BX.proxy(this.clickNextAction, this)}
					})
				);
			}

			node.appendChild(
				BX.create('DIV', {
					props: {className: 'row bx-soa-more'},
					children: [
						BX.create('DIV', {
							props: {className: 'bx-soa-more-btn col-xs-12'},
							children: buttons
						})
					]
				})
			);
		},

		getNewContainer: function(notFluid)
		{
			return BX.create('DIV', {props: {className: 'bx-soa-section-content' + (!!notFluid ? '' : ' container-fluid')}});
		},

		/**
		 * Showing/hiding order save buttons
		 */
		switchOrderSaveButtons: function(state)
		{
			var orderSaveNode = this.orderSaveBlockNode,
				totalButton = this.totalBlockNode.querySelector('.bx-soa-cart-total-button-container'),
				mobileButton = this.mobileTotalBlockNode.querySelector('.bx-soa-cart-total-button-container'),
				lastState = this.orderSaveBlockNode.style.display == '';

			if (lastState != state)
			{
				if (state)
				{
					orderSaveNode.style.opacity = 0;
					orderSaveNode.style.display = '';
					if (totalButton)
					{
						totalButton.style.opacity = 0;
						totalButton.style.display = '';
					}
					if (mobileButton)
					{
						mobileButton.style.opacity = 0;
						mobileButton.style.display = '';
					}

					new BX.easing({
						duration: 500,
						start: {opacity: 0},
						finish: {opacity: 100},
						transition: BX.easing.transitions.linear,
						step: function(state){
							orderSaveNode.style.opacity = state.opacity / 100;
							if (totalButton)
								totalButton.style.opacity = state.opacity / 100;
							if (mobileButton)
								mobileButton.style.opacity = state.opacity / 100;
						},
						complete: function(){
							orderSaveNode.removeAttribute('style');
							totalButton && totalButton.removeAttribute('style');
							mobileButton && mobileButton.removeAttribute('style');
						}
					}).animate();
				}
				else
				{
					orderSaveNode.style.display = 'none';
					if (totalButton)
						totalButton.setAttribute('style', 'display: none !important');
					if (mobileButton)
						mobileButton.setAttribute('style', 'display: none !important');
				}
			}
		},

		/**
		 * Returns true if current section or next sections had already visited
		 */
		shouldBeSectionVisible: function(sections, currentPosition)
		{
			var state = false, editStepNode;

			if (!sections || !sections.length)
				return state;

			for (; currentPosition < sections.length; currentPosition++)
			{
				if (sections[currentPosition].getAttribute('data-visited') == 'true')
				{
					state = true;
					break;
				}

				if (!this.firstLoad)
				{
					editStepNode = sections[currentPosition].querySelector('.bx-soa-editstep');
					if (editStepNode && editStepNode.style.display !== 'none')
					{
						state = true;
						break;
					}
				}
			}

			return state;
		},

		/**
		 * Showing/hiding blocks content if user authorized/unauthorized
		 */
		changeVisibleContent: function()
		{
			var sections = this.orderBlockNode.querySelectorAll('.bx-soa-section.bx-active'),
				i, state;

			var orderDataLoaded = !!this.result.IS_AUTHORIZED && this.params.USE_PRELOAD === 'Y' && this.result.LAST_ORDER_DATA.FAIL !== true,
				skipFlag = true;

			for (i = 0; i < sections.length; i++)
			{
				state = this.firstLoad && orderDataLoaded;
				state = state || this.shouldBeSectionVisible(sections, i);

				this.changeVisibleSection(sections[i], state);

				if (this.firstLoad && skipFlag)
				{
					if (
						state
						&& sections[i + 1]
						&& this.checkBlockErrors(sections[i])
						&& (
							(orderDataLoaded && this.checkPreload(sections[i]))
							|| (!orderDataLoaded && this.shouldSkipSection(sections[i]))
						)
					)
					{
						this.fade(sections[i]);
						this.markSectionAsCompleted(sections[i]);
						this.show(sections[i + 1]);
					}
					else
					{
						skipFlag = false;
					}
				}
			}

			if (
				(!this.result.IS_AUTHORIZED || typeof this.result.LAST_ORDER_DATA.FAIL !== 'undefined')
				&& this.params.SHOW_ORDER_BUTTON === 'final_step'
			)
			{
				this.switchOrderSaveButtons(this.shouldBeSectionVisible(sections, sections.length - 1));
			}
		},

		changeVisibleSection: function(section, state)
		{
			var titleNode, content, editStep;

			if (section.id !== this.basketBlockNode.id)
			{
				content = section.querySelector('.bx-soa-section-content');
				if (content)
					content.style.display = state ? '' : 'none';
			}

			editStep = section.querySelector('.bx-soa-editstep');
			if (editStep)
				editStep.style.display = state ? '' : 'none';

			titleNode = section.querySelector('.bx-soa-section-title-container');
			if (titleNode && !state)
				BX.unbindAll(titleNode);
		},

		clearHiddenBlocks: function()
		{
			BX.remove(BX.lastChild(this.authHiddenBlockNode));
			BX.remove(BX.lastChild(this.basketHiddenBlockNode));
			BX.remove(BX.lastChild(this.regionHiddenBlockNode));
			BX.remove(BX.lastChild(this.paySystemHiddenBlockNode));
			BX.remove(BX.lastChild(this.deliveryHiddenBlockNode));
			BX.remove(BX.lastChild(this.pickUpHiddenBlockNode));
			BX.remove(BX.lastChild(this.propsHiddenBlockNode));
		},

		/**
		 * Edit order block nodes with this.result/this.params data
		 */
		editOrder: function()
		{
			if (!this.orderBlockNode || !this.result)
				return;

			if (this.result.DELIVERY.length > 0)
			{
				BX.addClass(this.deliveryBlockNode, 'bx-active');
				this.deliveryBlockNode.removeAttribute('style');
			}
			else
			{
				BX.removeClass(this.deliveryBlockNode, 'bx-active');
				this.deliveryBlockNode.style.display = 'none';
			}

			this.orderSaveBlockNode.style.display = this.result.SHOW_AUTH ? 'none' : '';
			this.mobileTotalBlockNode.style.display = this.result.SHOW_AUTH ? 'none' : '';

			this.checkPickUpShow();

			var sections = this.orderBlockNode.querySelectorAll('.bx-soa-section.bx-active'), i;
			for (i in sections)
			{
				if (sections.hasOwnProperty(i))
				{
					this.editSection(sections[i]);
				}
			}

			this.editTotalBlock();
			this.totalBlockFixFont();

			this.showErrors(this.result.ERROR, false);
			this.showWarnings();
		},

		/**
		 * Edit certain block node
		 */
		editSection: function(section)
		{
			if (!section || !section.id)
				return;

			if (this.result.SHOW_AUTH && section.id != this.authBlockNode.id && section.id != this.basketBlockNode.id)
				section.style.display = 'none';
			else if (section.id != this.pickUpBlockNode.id)
				section.style.display = '';

			var active = section.id == this.activeSectionId,
				titleNode = section.querySelector('.bx-soa-section-title-container'),
				editButton, errorContainer;

			BX.unbindAll(titleNode);
			if (this.result.SHOW_AUTH)
			{
				BX.bind(titleNode, 'click', BX.delegate(function(){
					this.animateScrollTo(this.authBlockNode);
					this.addAnimationEffect(this.authBlockNode, 'bx-step-good');
				}, this));
			}
			else
			{
				BX.bind(titleNode, 'click', BX.proxy(this.showByClick, this));
				editButton = titleNode.querySelector('.bx-soa-editstep');
				editButton && BX.bind(editButton, 'click', BX.proxy(this.showByClick, this));
			}

			errorContainer = section.querySelector('.alert.alert-danger');
			this.hasErrorSection[section.id] = errorContainer && errorContainer.style.display != 'none';

			switch (section.id)
			{
				case this.authBlockNode.id:
					this.editAuthBlock();
					break;
				case this.basketBlockNode.id:
					this.editBasketBlock(active);
					break;
				case this.regionBlockNode.id:
					this.editRegionBlock(active);
					break;
				case this.paySystemBlockNode.id:
					this.editPaySystemBlock(active);
					break;
				case this.deliveryBlockNode.id:
					this.editDeliveryBlock(active);
					break;
				case this.pickUpBlockNode.id:
					this.editPickUpBlock(active);
					break;
				case this.propsBlockNode.id:
					this.editPropsBlock(active);
					break;
			}

			if (active)
				section.setAttribute('data-visited', 'true');
		},

		editAuthBlock: function()
		{
			if (!this.authBlockNode)
				return;

			var authContent = this.authBlockNode.querySelector('.bx-soa-section-content'),
				regContent, okMessageNode;

			if (BX.hasClass(authContent, 'reg'))
			{
				regContent = authContent;
				authContent = BX.firstChild(this.authHiddenBlockNode);
			}
			else
				regContent = BX.firstChild(this.authHiddenBlockNode);

			BX.cleanNode(authContent);
			BX.cleanNode(regContent);

			if (this.result.SHOW_AUTH)
			{
				this.getErrorContainer(authContent);
				this.editAuthorizeForm(authContent);
				this.editSocialContent(authContent);
				this.getAuthReference(authContent);

				this.getErrorContainer(regContent);
				this.editRegistrationForm(regContent);
				this.getAuthReference(regContent);
			}
			else
			{
				BX.onCustomEvent('OnBasketChange');
				this.closeAuthBlock();
			}

			if (this.result.OK_MESSAGE && this.result.OK_MESSAGE.length)
			{
				this.toggleAuthForm({target: this.authBlockNode.querySelector('input[type=submit]')});
				okMessageNode = BX.create('DIV', {
					props: {className: 'alert alert-success'},
					text: this.result.OK_MESSAGE.join()
				});
				this.result.OK_MESSAGE = '';
				BX.prepend(okMessageNode, this.authBlockNode.querySelector('.bx-soa-section-content'));
			}
		},

		editAuthorizeForm: function(authContent)
		{
			var login, password, remember, button, authFormNode;

			login = this.createAuthFormInputContainer(
				BX.message('STOF_LOGIN'),
				BX.create('INPUT', {
					attrs: {'data-next': 'USER_PASSWORD'},
					props: {
						name: 'USER_LOGIN',
						type: 'text',
						value: this.result.AUTH.USER_LOGIN,
						maxlength: "30"
					},
					events: {keypress: BX.proxy(this.checkKeyPress, this)}
				})
			);
			password = this.createAuthFormInputContainer(
				BX.message('STOF_PASSWORD'),
				BX.create('INPUT', {
					attrs: {'data-send': true},
					props: {
						name: 'USER_PASSWORD',
						type: 'password',
						value: '',
						maxlength: "30"
					},
					events: {keypress: BX.proxy(this.checkKeyPress, this)}
				})
			);
			remember = BX.create('DIV', {
				props: {className: 'bx-authform-formgroup-container'},
				children: [
					BX.create('DIV', {
						props: {className: 'checkbox'},
						children: [
							BX.create('LABEL', {
								props: {className: 'bx-filter-param-label'},
								children: [
									BX.create('INPUT', {
										props: {
											type: 'checkbox',
											name: 'USER_REMEMBER',
											value: 'Y'
										}
									}),
									BX.create('SPAN', {props: {className: 'bx-filter-param-text'}, text: BX.message('STOF_REMEMBER')})
								]
							})
						]
					})
				]
			});
			button = BX.create('DIV', {
				props: {className: 'bx-authform-formgroup-container'},
				children: [
					BX.create('INPUT', {
						props: {
							id: 'do_authorize',
							type: 'hidden',
							name: 'do_authorize',
							value: 'N'
						}
					}),
					BX.create('INPUT', {
						props: {
							type: 'submit',
							className: 'btn btn-lg btn-default',
							value: BX.message('STOF_ENTER')
						},
						events: {
							click: BX.delegate(function(e){
								BX('do_authorize').value = 'Y';
								this.sendRequest('showAuthForm');
								return BX.PreventDefault(e);
							}, this)
						}
					})
				]
			});
			authFormNode = BX.create('DIV', {
				props: {className: 'bx-authform'},
				children: [
					BX.create('H3', {props: {className: 'bx-title'}, text: BX.message('STOF_AUTH_REQUEST')}),
					login,
					password,
					remember,
					button,
					BX.create('A', {
						props: {
							href: this.params.PATH_TO_AUTH + '?forgot_password=yes&back_url=' + encodeURIComponent(document.location.href)
						},
						text: BX.message('STOF_FORGET_PASSWORD')
					})
				]
			});

			authContent.appendChild(BX.create('DIV', {props: {className: 'col-md-6'}, children: [authFormNode]}));
		},

		createAuthFormInputContainer: function(labelText, inputNode, required)
		{
			var labelHtml = '';

			if (required)
				labelHtml += '<span class="bx-authform-starrequired">*</span>';

			labelHtml += labelText;

			return BX.create('DIV', {
				props: {className: 'bx-authform-formgroup-container'},
				children: [
					BX.create('DIV', {props: {className: 'bx-authform-label-container'}, html: labelHtml}),
					BX.create('DIV', {props: {className: 'bx-authform-input-container'},  children: [inputNode]})
				]
			});
		},

		activatePhoneAuth: function()
		{
			if (!this.result.SMS_AUTH)
				return;

			new BX.PhoneAuth({
				containerId: 'bx_register_resend',
				errorContainerId: 'bx_register_error',
				interval: 60,
				data: {
					signedData: this.result.SMS_AUTH.SIGNED_DATA
				},
				onError: function(response)
				{
					var errorDiv = BX('bx_register_error');
					var errorNode = BX.findChildByClassName(errorDiv, 'errortext');
					errorNode.innerHTML = '';

					for (var i = 0; i < response.errors.length; i++)
					{
						errorNode.innerHTML = errorNode.innerHTML + BX.util.htmlspecialchars(response.errors[i].message) + '<br>';
					}

					errorDiv.style.display = '';
				}
			});
		},

		editRegistrationForm: function(authContent)
		{
			if (!this.result.AUTH)
				return;

			var authFormNodes = [];
			var showSmsConfirm = this.result.SMS_AUTH && this.result.SMS_AUTH.TYPE === 'OK';

			if (showSmsConfirm)
			{
				authFormNodes.push(BX.create('DIV', {
					props: {className: 'alert alert-success'},
					text: BX.message('STOF_REG_SMS_REQUEST')
				}));
				authFormNodes.push(BX.create('INPUT', {
					props: {
						type: 'hidden',
						name: 'SIGNED_DATA',
						value: this.result.SMS_AUTH.SIGNED_DATA || ''
					}
				}));
				authFormNodes.push(this.createAuthFormInputContainer(
					BX.message('STOF_SMS_CODE'),
					BX.create('INPUT', {
						attrs: {'data-send': true},
						props: {
							name: 'SMS_CODE',
							type: 'text',
							size: 40,
							value: ''
						},
						events: {keypress: BX.proxy(this.checkKeyPress, this)}
					}),
					true
				));
				authFormNodes.push(BX.create('DIV', {
					props: {className: 'bx-authform-formgroup-container'},
					children: [
						BX.create('INPUT', {
							props: {
								name: 'code_submit_button',
								type: 'submit',
								className: 'btn btn-lg btn-default',
								value: BX.message('STOF_SEND')
							},
							events: {
								click: BX.delegate(function(e)
								{
									this.sendRequest('confirmSmsCode');
									return BX.PreventDefault(e);
								}, this)
							}
						})
					]
				}));
				authFormNodes.push(BX.create('DIV', {
					props: {className: 'bx-authform-formgroup-container'},
					children: [
						BX.create('DIV', {
							props: {id: 'bx_register_error'},
							style: {display: 'none'}
						}),
						BX.create('DIV', {
							props: {id: 'bx_register_resend'}
						})
					]
				}));
			}
			else
			{
				authFormNodes.push(BX.create('H3', {
					props: {className: 'bx-title'},
					text: BX.message('STOF_REG_REQUEST')
				}));
				authFormNodes.push(this.createAuthFormInputContainer(
					BX.message('STOF_NAME'),
					BX.create('INPUT', {
						attrs: {'data-next': 'NEW_LAST_NAME'},
						props: {
							name: 'NEW_NAME',
							type: 'text',
							size: 40,
							value: this.result.AUTH.NEW_NAME || ''
						},
						events: {keypress: BX.proxy(this.checkKeyPress, this)}
					}),
					true
				));
				authFormNodes.push(this.createAuthFormInputContainer(
					BX.message('STOF_LASTNAME'),
					BX.create('INPUT', {
						attrs: {'data-next': 'NEW_EMAIL'},
						props: {
							name: 'NEW_LAST_NAME',
							type: 'text',
							size: 40,
							value: this.result.AUTH.NEW_LAST_NAME || ''
						},
						events: {keypress: BX.proxy(this.checkKeyPress, this)}
					}),
					true
				));
				authFormNodes.push(this.createAuthFormInputContainer(
					BX.message('STOF_EMAIL'),
					BX.create('INPUT', {
						attrs: {'data-next': 'PHONE_NUMBER'},
						props: {
							name: 'NEW_EMAIL',
							type: 'text',
							size: 40,
							value: this.result.AUTH.NEW_EMAIL || ''
						},
						events: {keypress: BX.proxy(this.checkKeyPress, this)}
					}),
					this.result.AUTH.new_user_email_required == 'Y'
				));

				if (this.result.AUTH.new_user_phone_auth === 'Y')
				{
					authFormNodes.push(this.createAuthFormInputContainer(
						BX.message('STOF_PHONE'),
						BX.create('INPUT', {
							attrs: {'data-next': 'captcha_word'},
							props: {
								name: 'PHONE_NUMBER',
								type: 'text',
								size: 40,
								value: this.result.AUTH.PHONE_NUMBER || ''
							},
							events: {keypress: BX.proxy(this.checkKeyPress, this)}
						}),
						this.result.AUTH.new_user_phone_required === 'Y'
					));
				}

				if (this.authGenerateUser)
				{
					authFormNodes.push(
						BX.create('LABEL', {
							props: {for: 'NEW_GENERATE_N'},
							children: [
								BX.create('INPUT', {
									attrs: {checked: !this.authGenerateUser},
									props: {
										id: 'NEW_GENERATE_N',
										type: 'radio',
										name: 'NEW_GENERATE',
										value: 'N'
									}
								}),
								BX.message('STOF_MY_PASSWORD')
							],
							events: {
								change: BX.delegate(function(){
									var generated = this.authBlockNode.querySelector('.generated');
									generated.style.display = '';
									this.authGenerateUser = false;
								}, this)
							}
						})
					);
					authFormNodes.push(BX.create('BR'));
					authFormNodes.push(
						BX.create('LABEL', {
							props: {for: 'NEW_GENERATE_Y'},
							children: [
								BX.create('INPUT', {
									attrs: {checked: this.authGenerateUser},
									props: {
										id: 'NEW_GENERATE_Y',
										type: 'radio',
										name: 'NEW_GENERATE',
										value: 'Y'
									}
								}),
								BX.message('STOF_SYS_PASSWORD')
							],
							events: {
								change: BX.delegate(function(){
									var generated = this.authBlockNode.querySelector('.generated');
									generated.style.display = 'none';
									this.authGenerateUser = true;
								}, this)
							}
						})
					);
				}

				authFormNodes.push(
					BX.create('DIV', {
						props: {className: 'generated'},
						style: {display: this.authGenerateUser ? 'none' : ''},
						children: [
							this.createAuthFormInputContainer(
								BX.message('STOF_LOGIN'),
								BX.create('INPUT', {
									props: {
										name: 'NEW_LOGIN',
										type: 'text',
										size: 30,
										value: this.result.AUTH.NEW_LOGIN || ''
									},
									events: {
										keypress: BX.proxy(this.checkKeyPress, this)
									}
								}),
								true
							),
							this.createAuthFormInputContainer(
								BX.message('STOF_PASSWORD'),
								BX.create('INPUT', {
									props: {
										name: 'NEW_PASSWORD',
										type: 'password',
										size: 30
									},
									events: {
										keypress: BX.proxy(this.checkKeyPress, this)
									}
								}),
								true
							),
							this.createAuthFormInputContainer(
								BX.message('STOF_RE_PASSWORD'),
								BX.create('INPUT', {
									props: {
										name: 'NEW_PASSWORD_CONFIRM',
										type: 'password',
										size: 30
									},
									events: {
										keypress: BX.proxy(this.checkKeyPress, this)
									}
								}),
								true
							)
						]
					})
				);

				if (this.result.AUTH.captcha_registration == 'Y')
				{
					authFormNodes.push(BX.create('DIV', {
						props: {className: 'bx-authform-formgroup-container'},
						children: [
							BX.create('DIV', {
								props: {className: 'bx-authform-label-container'},
								children: [
									BX.create('SPAN', {props: {className: 'bx-authform-starrequired'}, text: '*'}),
									BX.message('CAPTCHA_REGF_PROMT'),
									BX.create('DIV', {
										props: {className: 'bx-captcha'},
										children: [
											BX.create('INPUT', {
												props: {
													name: 'captcha_sid',
													type: 'hidden',
													value: this.result.AUTH.capCode || ''
												}
											}),
											BX.create('IMG', {
												props: {
													src: '/bitrix/tools/captcha.php?captcha_sid=' + this.result.AUTH.capCode,
													alt: ''
												}
											})
										]
									})
								]
							}),
							BX.create('DIV', {
								props: {className: 'bx-authform-input-container'},
								children: [
									BX.create('INPUT', {
										attrs: {'data-send': true},
										props: {
											name: 'captcha_word',
											type: 'text',
											size: '30',
											maxlength: '50',
											value: ''
										},
										events: {keypress: BX.proxy(this.checkKeyPress, this)}
									})
								]
							})
						]
					}));
				}
				authFormNodes.push(
					BX.create('DIV', {
						props: {className: 'bx-authform-formgroup-container'},
						children: [
							BX.create('INPUT', {
								props: {
									id: 'do_register',
									name: 'do_register',
									type: 'hidden',
									value: 'N'
								}
							}),
							BX.create('INPUT', {
								props: {
									type: 'submit',
									className: 'btn btn-lg btn-default',
									value: BX.message('STOF_REGISTER')
								},
								events: {
									click: BX.delegate(function(e){
										BX('do_register').value = 'Y';
										this.sendRequest('showAuthForm');
										return BX.PreventDefault(e);
									}, this)
								}
							}),
							BX.create('A', {
								props: {className: 'btn btn-link', href: ''},
								text: BX.message('STOF_DO_AUTHORIZE'),
								events: {
									click: BX.delegate(function(e){
										this.toggleAuthForm(e);
										return BX.PreventDefault(e);
									}, this)
								}
							})
						]
					})
				);
			}

			authContent.appendChild(
				BX.create('DIV', {
					props: {className: 'col-md-12'},
					children: [BX.create('DIV', {props: {className: 'bx-authform'}, children: authFormNodes})]
				})
			);

			if (showSmsConfirm)
			{
				this.activatePhoneAuth();
			}
		},

		editSocialContent: function(authContent)
		{
			if (!BX('bx-soa-soc-auth-services'))
				return;

			var nodes = [];

			if (this.socServiceHiddenNode === false)
			{
				var socServiceHiddenNode = BX('bx-soa-soc-auth-services').querySelector('.bx-authform-social');

				if (BX.type.isDomNode(socServiceHiddenNode))
				{
					this.socServiceHiddenNode = socServiceHiddenNode.innerHTML;
					BX.remove(socServiceHiddenNode);
				}
			}

			if (this.socServiceHiddenNode)
			{
				nodes.push(BX.create('DIV', {
					props: {className: 'bx-authform-social'},
					html: '<h3 class="bx-title">' + BX.message('SOA_DO_SOC_SERV') + '</h3>' + this.socServiceHiddenNode
				}));
				nodes.push(BX.create('hr', {props: {className: 'bxe-light'}}));
			}

			if (this.result.AUTH.new_user_registration === 'Y')
			{
				nodes.push(BX.create('DIV', {
					props: {className: 'bx-soa-reg-block'},
					children: [
						BX.create('P', {html: this.params.MESS_REGISTRATION_REFERENCE}),
						BX.create('A', {
							props: {className: 'btn btn-default btn-lg'},
							text: BX.message('STOF_DO_REGISTER'),
							events: {
								click: BX.delegate(function(e){
									this.toggleAuthForm(e);
									return BX.PreventDefault(e);
								}, this)
							}
						})
					]
				}));
			}

			authContent.appendChild(BX.create('DIV', {props: {className: 'col-md-6'}, children: nodes}));
		},

		getAuthReference: function(authContent)
		{
			authContent.appendChild(
				BX.create('DIV', {
					props: {className: 'row'},
					children: [
						BX.create('DIV', {
							props: {className: 'bx-soa-reference col-xs-12'},
							children: [
								this.params.MESS_AUTH_REFERENCE_1,
								BX.create('BR'),
								this.params.MESS_AUTH_REFERENCE_2,
								BX.create('BR'),
								this.params.MESS_AUTH_REFERENCE_3
							]
						})
					]
				})
			);
		},

		toggleAuthForm: function(event)
		{
			if (!event)
				return;

			var target = event.target || event.srcElement,
				section = BX.findParent(target, {className: 'bx-soa-section'}),
				container = BX.findParent(target, {className: 'bx-soa-section-content'}),
				insertContainer = BX.firstChild(this.authHiddenBlockNode);

			new BX.easing({
				duration: 100,
				start: {opacity: 100},
				finish: {opacity: 0},
				transition: BX.easing.makeEaseOut(BX.easing.transitions.quad),
				step: function(state){
					container.style.opacity = state.opacity / 100;
				}
			}).animate();

			this.authHiddenBlockNode.appendChild(container);
			BX.cleanNode(section);
			section.appendChild(
				BX.create('DIV', {
					props: {className: 'bx-soa-section-title-container'},
					children: [
						BX.create('h2', {
							props: {className: 'bx-soa-section-title col-xs-7 col-sm-9'},
							html: BX.hasClass(insertContainer, 'reg') ? this.params.MESS_REG_BLOCK_NAME : this.params.MESS_AUTH_BLOCK_NAME
						})
					]
				})
			);
			insertContainer.style.opacity = 0;
			section.appendChild(insertContainer);

			setTimeout(function(){
				new BX.easing({
					duration: 100,
					start: {opacity: 0},
					finish: {opacity: 100},
					transition: BX.easing.makeEaseOut(BX.easing.transitions.quart),
					step: function(state){
						insertContainer.style.opacity = state.opacity / 100;
					},
					complete: function() {
						insertContainer.style.height = '';
						insertContainer.style.opacity = '';
					}
				}).animate();
			}, 110);

			this.animateScrollTo(section);
		},

		alignBasketColumns: function()
		{
			if (!this.basketBlockNode)
				return;

			var i = 0, k, columns = 0, columnNodes,
				windowSize = BX.GetWindowInnerSize(),
				basketRows, percent;

			if (windowSize.innerWidth > 580 && windowSize.innerWidth < 992)
			{
				basketRows = this.basketBlockNode.querySelectorAll('.bx-soa-basket-info');
				percent = 100;

				if (basketRows.length)
				{
					columnNodes = basketRows[0].querySelectorAll('.bx-soa-item-properties');

					if (columnNodes.length && columnNodes[0].style.width != '')
						return;

					columns = columnNodes.length;
					if (columns > 0)
					{
						columns = columns > 4 ? 4 : columns;
						percent = parseInt(percent / columns);
						for (; i < basketRows.length; i++)
						{
							columnNodes = basketRows[i].querySelectorAll('.bx-soa-item-properties')
							for (k = 0; k < columnNodes.length; k++)
							{
								columnNodes[k].style.width = percent + '%';
							}
						}
					}
				}
			}
			else
			{
				columnNodes = this.basketBlockNode.querySelectorAll('.bx-soa-item-properties');

				if (columnNodes.length && columnNodes[0].style.width == '')
					return;

				for (; i < columnNodes.length; i++)
				{
					columnNodes[i].style.width = '';
				}
			}
		},

		editBasketBlock: function(active)
		{
			if (!this.basketBlockNode || !this.basketHiddenBlockNode || !this.result.GRID)
				return;

			BX.remove(BX.lastChild(this.basketBlockNode));
			BX.remove(BX.lastChild(this.basketHiddenBlockNode));

			this.editActiveBasketBlock(active);
			this.editFadeBasketBlock(active);

			this.initialized.basket = true;
		},

		editActiveBasketBlock: function(activeNodeMode)
		{
			var node = !!activeNodeMode ? this.basketBlockNode : this.basketHiddenBlockNode,
				basketContent, basketTable;

			if (this.initialized.basket)
			{
				this.basketHiddenBlockNode.appendChild(BX.lastChild(node));
				node.appendChild(BX.firstChild(this.basketHiddenBlockNode));
			}
			else
			{
				basketContent = node.querySelector('.bx-soa-section-content');
				basketTable = BX.create('DIV', {props: {className: 'bx-soa-item-table'}});

				if (!basketContent)
				{
					basketContent = this.getNewContainer();
					node.appendChild(basketContent);
				}
				else
				{
					BX.cleanNode(basketContent);
				}

				this.editBasketItems(basketTable, true);

				basketContent.appendChild(
					BX.create('DIV', {
						props: {className: 'bx-soa-table-fade'},
						children: [
							BX.create('DIV', {
								style: {overflowX: 'auto', overflowY: 'hidden'},
								children: [basketTable]
							})
						]
					})
				);

				if (this.params.SHOW_COUPONS_BASKET === 'Y')
				{
					this.editCoupons(basketContent);
				}

				this.getBlockFooter(basketContent);

				BX.bind(
					basketContent.querySelector('div.bx-soa-table-fade').firstChild,
					'scroll',
					BX.proxy(this.basketBlockScrollCheckEvent, this)
				);
			}

			this.alignBasketColumns();
		},

		editFadeBasketBlock: function(activeNodeMode)
		{
			var node = !!activeNodeMode ? this.basketHiddenBlockNode : this.basketBlockNode,
				newContent, basketTable;

			if (this.initialized.basket)
			{
				this.basketHiddenBlockNode.appendChild(node.querySelector('.bx-soa-section-content'));
				this.basketBlockNode.appendChild(BX.firstChild(this.basketHiddenBlockNode));
			}
			else
			{
				newContent = this.getNewContainer();
				basketTable = BX.create('DIV', {props: {className: 'bx-soa-item-table'}});

				this.editBasketItems(basketTable, false);

				newContent.appendChild(
					BX.create('DIV', {
						props: {className: 'bx-soa-table-fade'},
						children: [
							BX.create('DIV', {
								style: {overflowX: 'auto', overflowY: 'hidden'},
								children: [basketTable]
							})
						]
					})
				);

				if (this.params.SHOW_COUPONS_BASKET === 'Y')
				{
					this.editCouponsFade(newContent);
				}

				node.appendChild(newContent);
				this.alignBasketColumns();
				this.basketBlockScrollCheck();

				BX.bind(
					this.basketBlockNode.querySelector('div.bx-soa-table-fade').firstChild,
					'scroll',
					BX.proxy(this.basketBlockScrollCheckEvent, this)
				);
			}

			this.alignBasketColumns();
		},

		editBasketItems: function(basketItemsNode, active)
		{
			if (!this.result.GRID.ROWS)
				return;

			var index = 0, i;

			if (this.params.SHOW_BASKET_HEADERS === 'Y')
			{
				this.editBasketItemsHeader(basketItemsNode);
			}

			for (i in this.result.GRID.ROWS)
			{
				if (this.result.GRID.ROWS.hasOwnProperty(i))
				{
					this.createBasketItem(basketItemsNode, this.result.GRID.ROWS[i], index++, !!active);
				}
			}
		},

		editBasketItemsHeader: function(basketItemsNode)
		{
			if (!basketItemsNode)
				return;

			var headers = [
					BX.create('DIV', {
						props: {className: 'bx-soa-item-td'},
						style: {paddingBottom: '5px'},
						children: [
							BX.create('DIV', {
								props: {className: 'bx-soa-item-td-title'},
								text: BX.message('SOA_SUM_NAME')
							})
						]
					})
				],
				toRight = false, column, basketColumnIndex = 0, i;

			for (i = 0; i < this.result.GRID.HEADERS.length; i++)
			{
				column = this.result.GRID.HEADERS[i];

				if (column.id === 'NAME' || column.id === 'PREVIEW_PICTURE' || column.id === 'PROPS' || column.id === 'NOTES')
					continue;

				if (column.id === 'DETAIL_PICTURE' && !this.options.showPreviewPicInBasket)
					continue;

				toRight = BX.util.in_array(column.id, ["QUANTITY", "PRICE_FORMATED", "DISCOUNT_PRICE_PERCENT_FORMATED", "SUM"]);
				headers.push(
					BX.create('DIV', {
						props: {className: 'bx-soa-item-td bx-soa-item-properties' + (toRight ? ' bx-text-right' : '')},
						style: {paddingBottom: '5px'},
						children: [
							BX.create('DIV', {
								props: {className: 'bx-soa-item-td-title'},
								text: column.name
							})
						]
					})
				);

				++basketColumnIndex;
				if (basketColumnIndex == 4 && this.result.GRID.HEADERS[i + 1])
				{
					headers.push(BX.create('DIV', {props: {className: 'bx-soa-item-nth-4p1'}}));
					basketColumnIndex = 0;
				}
			}

			basketItemsNode.appendChild(
				BX.create('DIV', {
					props: {className: 'bx-soa-item-tr hidden-sm hidden-xs'},
					children: headers
				})
			);
		},

		createBasketItem: function(basketItemsNode, item, index, active)
		{
			var mainColumns = [],
				otherColumns = [],
				hiddenColumns = [],
				currentColumn, basketColumnIndex = 0,
				i, tr, cols;

			if (this.options.showPreviewPicInBasket || this.options.showDetailPicInBasket)
				mainColumns.push(this.createBasketItemImg(item.data));

			mainColumns.push(this.createBasketItemContent(item.data));

			for (i = 0; i < this.result.GRID.HEADERS.length; i++)
			{
				currentColumn = this.result.GRID.HEADERS[i];

				if (currentColumn.id === 'NAME' || currentColumn.id === 'PREVIEW_PICTURE' || currentColumn.id === 'PROPS' || currentColumn.id === 'NOTES')
					continue;

				if (currentColumn.id === 'DETAIL_PICTURE' && !this.options.showPreviewPicInBasket)
					continue;

				otherColumns.push(this.createBasketItemColumn(currentColumn, item, active));

				++basketColumnIndex;
				if (basketColumnIndex == 4 && this.result.GRID.HEADERS[i + 1])
				{
					otherColumns.push(BX.create('DIV', {props: {className: 'bx-soa-item-nth-4p1'}}));
					basketColumnIndex = 0;
				}
			}

			if (active)
			{
				for (i = 0; i < this.result.GRID.HEADERS_HIDDEN.length; i++)
				{
					tr = this.createBasketItemHiddenColumn(this.result.GRID.HEADERS_HIDDEN[i], item);
					if (BX.type.isArray(tr))
						hiddenColumns = hiddenColumns.concat(tr);
					else if (tr)
						hiddenColumns.push(tr);
				}
			}

			cols = [
				BX.create('DIV', {
					props: {className: 'bx-soa-item-td'},
					style: {minWidth: '300px'},
					children: [
						BX.create('DIV', {
							props: {className: 'bx-soa-item-block'},
							children: mainColumns
						})
					]
				})
			].concat(otherColumns);

			basketItemsNode.appendChild(
				BX.create('DIV', {
					props: {className: 'bx-soa-item-tr bx-soa-basket-info' + (index == 0 ? ' bx-soa-item-tr-first' : '')},
					children: cols
				})
			);

			if (hiddenColumns.length)
			{
				basketItemsNode.appendChild(
					BX.create('DIV', {
						props: {className: 'bx-soa-item-tr bx-soa-item-info-container'},
						children: [
							BX.create('DIV', {
								props: {className: 'bx-soa-item-td'},
								children: [
									BX.create('A', {
										props: {href: '', className: 'bx-soa-info-shower'},
										html: this.params.MESS_ADDITIONAL_PROPS,
										events: {
											click: BX.proxy(this.showAdditionalProperties, this)
										}
									}),
									BX.create('DIV', {
										props: {className: 'bx-soa-item-info-block'},
										children: [
											BX.create('TABLE', {
												props: {className: 'bx-soa-info-block'},
												children: hiddenColumns
											})
										]
									})
								]
							})
						]
					})
				);
			}
		},

		showAdditionalProperties: function(event)
		{
			var target = event.target || event.srcElement,
				infoContainer = target.nextSibling,
				parentContainer = BX.findParent(target, {className: 'bx-soa-item-tr bx-soa-item-info-container'}),
				parentHeight = parentContainer.offsetHeight;

			if (BX.hasClass(infoContainer, 'bx-active'))
			{
				new BX.easing({
					duration: 300,
					start: {opacity: 100, height: parentHeight},
					finish: {opacity: 0, height: 35},
					transition: BX.easing.makeEaseOut(BX.easing.transitions.quad),
					step: function(state){
						infoContainer.style.opacity = state.opacity / 100;
						infoContainer.style.height = state.height + 'px';
						parentContainer.style.height = state.height + 'px';
					},
					complete: function(){
						BX.removeClass(infoContainer, 'bx-active');
						infoContainer.removeAttribute("style");
						parentContainer.removeAttribute("style");
					}
				}).animate();
			}
			else
			{
				infoContainer.style.opacity = 0;
				BX.addClass(infoContainer, 'bx-active');
				var height = infoContainer.offsetHeight + parentHeight;
				BX.removeClass(infoContainer, 'bx-active');
				infoContainer.style.paddingTop = '10px';

				new BX.easing({
					duration: 300,
					start: {opacity: 0, height: parentHeight},
					finish: {opacity: 100, height: height},
					transition: BX.easing.makeEaseOut(BX.easing.transitions.quad),
					step: function(state){
						infoContainer.style.opacity = state.opacity / 100;
						infoContainer.style.height = state.height + 'px';
						parentContainer.style.height = state.height + 'px';
					},
					complete: function(){
						BX.addClass(infoContainer, 'bx-active');
						infoContainer.removeAttribute("style");
					}
				}).animate();
			}

			return BX.PreventDefault(event);
		},

		createBasketItemImg: function(data)
		{
			if (!data)
				return;

			var logoNode, logotype;

			logoNode = BX.create('DIV', {props: {className: 'bx-soa-item-imgcontainer'}});

			if (data.PREVIEW_PICTURE_SRC && data.PREVIEW_PICTURE_SRC.length)
				logotype = this.getImageSources(data, 'PREVIEW_PICTURE');
			else if (data.DETAIL_PICTURE_SRC && data.DETAIL_PICTURE_SRC.length)
				logotype = this.getImageSources(data, 'DETAIL_PICTURE');

			if (logotype && logotype.src_2x)
			{
				logoNode.setAttribute('style',
					'background-image: url(' + logotype.src_1x + ');' +
					'background-image: -webkit-image-set(url(' + logotype.src_1x + ') 1x, url(' + logotype.src_2x + ') 2x)'
				);
			}
			else
			{
				logotype = logotype && logotype.src_1x || this.defaultBasketItemLogo;
				logoNode.setAttribute('style', 'background-image: url(' + logotype + ');');
			}

			if (this.params.HIDE_DETAIL_PAGE_URL !== 'Y' && data.DETAIL_PAGE_URL && data.DETAIL_PAGE_URL.length)
			{
				logoNode = BX.create('A', {
					props: {href: data.DETAIL_PAGE_URL},
					children: [logoNode]
				});
			}

			return BX.create('DIV', {
				props: {className: 'bx-soa-item-img-block'},
				children: [logoNode]
			});
		},

		createBasketItemContent: function(data)
		{
			var itemName = data.NAME || '',
				titleHtml = this.htmlspecialcharsEx(itemName),
				props = data.PROPS || [],
				propsNodes = [];

			if (this.params.HIDE_DETAIL_PAGE_URL !== 'Y' && data.DETAIL_PAGE_URL && data.DETAIL_PAGE_URL.length)
			{
				titleHtml = '<a href="' + data.DETAIL_PAGE_URL + '">' + titleHtml + '</a>';
			}

			if (this.options.showPropsInBasket && props.length)
			{
				for (var i in props)
				{
					if (props.hasOwnProperty(i))
					{
						var name = props[i].NAME || '',
							value = props[i].VALUE || '';

						propsNodes.push(
							BX.create('DIV', {
								props: {className: 'bx-soa-item-td-title'},
								style: {textAlign: 'left'},
								text: name
							})
						);
						propsNodes.push(
							BX.create('DIV', {
								props: {className: 'bx-soa-item-td-text'},
								style: {textAlign: 'left'},
								text: value
							})
						);
					}
				}
			}

			return BX.create('DIV', {
				props: {className: 'bx-soa-item-content'},
				children: propsNodes.length ? [
					BX.create('DIV', {props: {className: 'bx-soa-item-title'}, html: titleHtml}),
					BX.create('DIV', {props: {className: 'bx-scu-container'}, children: propsNodes})
				] : [
					BX.create('DIV', {props: {className: 'bx-soa-item-title'}, html: titleHtml})
				]
			});
		},

		createBasketItemColumn: function(column, allData, active)
		{
			if (!column || !allData)
				return;

			var data = allData.columns[column.id] ? allData.columns : allData.data,
				toRight = BX.util.in_array(column.id, ["QUANTITY", "PRICE_FORMATED", "DISCOUNT_PRICE_PERCENT_FORMATED", "SUM"]),
				textNode = BX.create('DIV', {props: {className: 'bx-soa-item-td-text'}}),
				logotype, img;

			if (column.id === 'PRICE_FORMATED')
			{
				textNode.appendChild(BX.create('STRONG', {props: {className: 'bx-price'}, html: data.PRICE_FORMATED}));
				if (parseFloat(data.DISCOUNT_PRICE) > 0)
				{
					textNode.appendChild(BX.create('BR'));
					textNode.appendChild(BX.create('STRONG', {
						props: {className: 'bx-price-old'},
						html: data.BASE_PRICE_FORMATED
					}));
				}

				if (this.options.showPriceNotesInBasket && active)
				{
					textNode.appendChild(BX.create('BR'));
					textNode.appendChild(BX.create('SMALL', {text: data.NOTES}));
				}
			}
			else if (column.id === 'SUM')
			{
				textNode.appendChild(BX.create('STRONG', {props: {className: 'bx-price all'}, html: data.SUM}));
				if (parseFloat(data.DISCOUNT_PRICE) > 0)
				{
					textNode.appendChild(BX.create('BR'));
					textNode.appendChild(BX.create('STRONG', {
						props: {className: 'bx-price-old'},
						html: data.SUM_BASE_FORMATED
					}));
				}
			}
			else if (column.id === 'DISCOUNT')
			{
				textNode.appendChild(BX.create('STRONG', {props: {className: 'bx-price'}, text: data.DISCOUNT_PRICE_PERCENT_FORMATED}));
			}
			else if (column.id === 'DETAIL_PICTURE')
			{
				logotype = this.getImageSources(allData.data, column.id),
				img = BX.create('IMG', {props: {src: logotype && logotype.src_1x || this.defaultBasketItemLogo}});

				if (logotype && logotype.src_1x && logotype.src_orig)
				{
					BX.bind(img, 'click', BX.delegate(function(e){this.popupShow(e, logotype.src_orig);}, this));
				}

				textNode.appendChild(img);
			}
			else if (BX.util.in_array(column.id, ["QUANTITY", "WEIGHT_FORMATED", "DISCOUNT_PRICE_PERCENT_FORMATED"]))
			{
				textNode.appendChild(BX.create('SPAN', {html: data[column.id]}));
			}
			else if (column.id === 'PREVIEW_TEXT')
			{
				if (data['PREVIEW_TEXT_TYPE'] === 'html')
				{
					textNode.appendChild(BX.create('SPAN', {html: data['PREVIEW_TEXT'] || ''}));
				}
				else
				{
					textNode.appendChild(BX.create('SPAN', {text: data['PREVIEW_TEXT'] || ''}));
				}
			}
			else
			{
				var columnData = data[column.id], val = [];
				if (BX.type.isArray(columnData))
				{
					for (var i in columnData)
					{
						if (columnData.hasOwnProperty(i))
						{
							if (columnData[i].type == 'image')
								val.push(this.getImageContainer(columnData[i].value, columnData[i].source));
							else if (columnData[i].type == 'linked')
							{
								textNode.appendChild(BX.create('SPAN', {html: columnData[i].value_format}));
								textNode.appendChild(BX.create('BR'));
							}
							else if (columnData[i].value)
							{
								textNode.appendChild(BX.create('SPAN', {html: columnData[i].value}));
								textNode.appendChild(BX.create('BR'));
							}
						}
					}

					if (val.length)
					{
						textNode.appendChild(
							BX.create('DIV', {
								props: {className: 'bx-scu-list'},
								children: [BX.create('UL', {props: {className: 'bx-scu-itemlist'}, children: val})]
							})
						);
					}
				}
				else if (columnData)
				{
					textNode.appendChild(BX.create('SPAN', {html: BX.util.htmlspecialchars(columnData)}));
				}
			}

			return BX.create('DIV', {
				props: {className: 'bx-soa-item-td bx-soa-item-properties' + (toRight ? ' bx-text-right' : '')},
				children: [
					BX.create('DIV', {
						props: {className: 'bx-soa-item-td-title visible-xs visible-sm'},
						text: column.name
					}),
					textNode
				]
			});
		},

		createBasketItemHiddenColumn: function(column, allData)
		{
			if (!column || !allData)
				return;

			var data = allData.columns[column.id] ? allData.columns : allData.data,
				textNode = BX.create('TD', {props: {className: 'bx-soa-info-text'}}),
				logotype, img, i;

			if (column.id === 'PROPS')
			{
				var propsNodes = [], props = allData.data.PROPS;
				if (props && props.length)
				{
					for (i in props)
					{
						if (props.hasOwnProperty(i))
						{
							var name = props[i].NAME || '',
								value = props[i].VALUE || '';

							if (value.length == 0)
								continue;

							propsNodes.push(
								BX.create('TR', {
									props: {className: 'bx-soa-info-line'},
									children: [
										BX.create('TD', {props: {className: 'bx-soa-info-title'}, text: name + ':'}),
										BX.create('TD', {props: {className: 'bx-soa-info-text'}, html: BX.util.htmlspecialchars(value)})
									]
								})
							);
						}
					}

					return propsNodes;
				}
				else return;
			}
			else if (column.id === 'PRICE_FORMATED')
			{
				textNode.appendChild(BX.create('STRONG', {props: {className: 'bx-price'}, html: data.PRICE_FORMATED}));
				if (parseFloat(data.DISCOUNT_PRICE) > 0)
				{
					textNode.appendChild(BX.create('BR'));
					textNode.appendChild(BX.create('STRONG', {
						props: {className: 'bx-price-old'},
						html: data.BASE_PRICE_FORMATED
					}));
				}
			}
			else if (column.id === 'SUM')
				textNode.appendChild(BX.create('STRONG', {props: {className: 'bx-price all'}, text: data.SUM}));
			else if (column.id === 'DISCOUNT')
				textNode.appendChild(BX.create('STRONG', {props: {className: 'bx-price'}, text: data.DISCOUNT_PRICE_PERCENT_FORMATED}));
			else if (column.id === 'DETAIL_PICTURE' || column.id === 'PREVIEW_PICTURE')
			{
				logotype = this.getImageSources(allData.data, column.id),
				img = BX.create('IMG', {props: {src: logotype && logotype.src_1x || this.defaultBasketItemLogo}, style: {maxWidth: '50%'}});

				if (logotype && logotype.src_1x && logotype.src_orig)
				{
					BX.bind(img, 'click', BX.delegate(function(e){this.popupShow(e, logotype.src_orig);}, this));
				}

				textNode.appendChild(img);
			}
			else if (BX.util.in_array(column.id, ["QUANTITY", "WEIGHT_FORMATED", "DISCOUNT_PRICE_PERCENT_FORMATED"]))
			{
				textNode.appendChild(BX.create('SPAN', {html: data[column.id]}));
			}
			else if (column.id === 'PREVIEW_TEXT')
			{
				if (data['PREVIEW_TEXT_TYPE'] === 'html')
				{
					textNode.appendChild(BX.create('SPAN', {html: data['PREVIEW_TEXT'] || ''}));
				}
				else
				{
					textNode.appendChild(BX.create('SPAN', {text: data['PREVIEW_TEXT'] || ''}));
				}
			}
			else
			{
				var columnData = data[column.id], val = [];
				if (BX.type.isArray(columnData))
				{
					for (i in columnData)
					{
						if (columnData.hasOwnProperty(i))
						{
							if (columnData[i].type == 'image')
								val.push(this.getImageContainer(columnData[i].value, columnData[i].source));
							else if (columnData[i].type == 'linked')
							{
								textNode.appendChild(BX.create('SPAN', {html: columnData[i].value_format}));
								textNode.appendChild(BX.create('BR'));
							}
							else if (columnData[i].value)
							{
								textNode.appendChild(BX.create('SPAN', {html: columnData[i].value}));
								textNode.appendChild(BX.create('BR'));
							}
							else return;
						}
					}

					if (val.length)
					{
						textNode.appendChild(
							BX.create('DIV', {
								props: {className: 'bx-scu-list'},
								children: [BX.create('UL', {props: {className: 'bx-scu-itemlist'}, children: val})]
							})
						);
					}

				}
				else if (columnData)
				{
					textNode.appendChild(BX.create('SPAN', {html: BX.util.htmlspecialchars(columnData)}));
				}
				else
				{
					return;
				}
			}

			return BX.create('TR', {
				props: {className: 'bx-soa-info-line'},
				children: [
					BX.create('TD', {
						props: {className: 'bx-soa-info-title'},
						text: column.name + ':'
					}),
					textNode
				]
			});
		},

		popupShow: function(e, url, source)
		{
			if (this.popup)
				this.popup.destroy();

			var that = this;
			this.popup = new BX.PopupWindow('bx-soa-image-popup', null, {
				lightShadow: true,
				offsetTop: 0,
				offsetLeft: 0,
				closeIcon: {top: '3px', right: '10px'},
				autoHide: true,
				bindOptions: {position: "bottom"},
				closeByEsc: true,
				zIndex: 100,
				events: {
					onPopupShow: function() {
						BX.create("IMG", {
							props: {src: source || url},
							events: {
								load: function() {
									var content = BX('bx-soa-image-popup-content');
									if (content)
									{
										var windowSize = BX.GetWindowInnerSize(),
											ratio = this.isMobile ? 0.5 : 0.9,
											contentHeight, contentWidth;

										BX.cleanNode(content);
										content.appendChild(this);

										contentHeight = content.offsetHeight;
										contentWidth = content.offsetWidth;

										if (contentHeight > windowSize.innerHeight * ratio)
										{
											content.style.height = windowSize.innerHeight * ratio + 'px';
											content.style.width = contentWidth * (windowSize.innerHeight * ratio / contentHeight) + 'px';
											contentHeight = content.offsetHeight;
											contentWidth = content.offsetWidth;
										}

										if (contentWidth > windowSize.innerWidth * ratio)
										{
											content.style.width = windowSize.innerWidth * ratio + 'px';
											content.style.height = contentHeight * (windowSize.innerWidth * ratio / contentWidth) + 'px';
										}

										content.style.height = content.offsetHeight + 'px';
										content.style.width = content.offsetWidth + 'px';

										that.popup.adjustPosition();
									}
								}
							}
						});
					},
					onPopupClose: function() {
						this.destroy();
					}
				},
				content: BX.create('DIV', {
					props: {id: 'bx-soa-image-popup-content'},
					children: [BX.create('IMG', {props: {src: this.templateFolder + "/images/loader.gif"}})]
				})
			});
			this.popup.show();
		},

		getImageContainer: function(link, source)
		{
			return BX.create('LI', {
				props: {className: 'bx-img-item'},
				children: [
					BX.create('DIV', {
						props: {className: 'bx-scu-itemColorBlock'},
						children: [
							BX.create('DIV', {
								props: {className: 'bx-img-itemColor'},
								style: {backgroundImage: 'url(' + link + ')'}
							})
						],
						events: {
							click: BX.delegate(function(e){this.popupShow(e, link, source)}, this)
						}
					})
				]
			});
		},

		editCoupons: function(basketItemsNode)
		{
			var couponsList = this.getCouponsList(true),
				couponsLabel = this.getCouponsLabel(true),
				couponsBlock = BX.create('DIV', {
					props: {className: 'bx-soa-coupon-block'},
					children: [
						BX.create('DIV', {
							props: {className: 'bx-soa-coupon-input'},
							children: [
								BX.create('INPUT', {
									props: {
										className: 'form-control bx-ios-fix',
										type: 'text'
									},
									events: {
										change: BX.delegate(function(event){
											var newCoupon = BX.getEventTarget(event);
											if (newCoupon && newCoupon.value)
											{
												this.sendRequest('enterCoupon', newCoupon.value);
												newCoupon.value = '';
											}
										}, this)
									}
								})
							]
						}),
						BX.create('SPAN', {props: {className: 'bx-soa-coupon-item'}, children: couponsList})
					]
				});

			basketItemsNode.appendChild(
				BX.create('DIV', {
					props: {className: 'bx-soa-coupon'},
					children: [
						couponsLabel,
						couponsBlock
					]
				})
			);
		},

		editCouponsFade: function(basketItemsNode)
		{
			if (this.result.COUPON_LIST.length < 1)
				return;

			var couponsList = this.getCouponsList(false),
				couponsLabel, couponsBlock;

			if (couponsList.length)
			{
				couponsLabel = this.getCouponsLabel(false);
				couponsBlock = BX.create('DIV', {
					props: {className: 'bx-soa-coupon-block'},
					children: [
						BX.create('DIV', {
							props: {className: 'bx-soa-coupon-list'},
							children: [
								BX.create('DIV', {
									props: {className: 'bx-soa-coupon-item'},
									children: [couponsLabel].concat(couponsList)
								})
							]
						})
					]
				});

				basketItemsNode.appendChild(
					BX.create('DIV', {
						props: {className: 'bx-soa-coupon bx-soa-coupon-item-fixed'},
						children: [couponsBlock]
					})
				);
			}
		},

		getCouponsList: function(active)
		{
			var couponsList = [], i;

			for (i = 0; i < this.result.COUPON_LIST.length; i++)
			{
				if (active || (!active && this.result.COUPON_LIST[i].JS_STATUS == 'APPLIED'))
				{
					couponsList.push(this.getCouponNode({
						text: this.result.COUPON_LIST[i].COUPON,
						desc: this.result.COUPON_LIST[i].JS_CHECK_CODE,
						status: this.result.COUPON_LIST[i].JS_STATUS
					}, active));
				}
			}

			return couponsList;
		},

		getCouponNode: function(coupon, active)
		{
			var couponName = BX.util.htmlspecialchars(coupon.text) || '',
				couponDesc = coupon.desc && coupon.desc.length
					? coupon.desc.charAt(0).toUpperCase() + coupon.desc.slice(1)
					: BX.message('SOA_NOT_FOUND'),
				couponStatus = coupon.status || 'BAD',
				couponItem, tooltip;

			switch (couponStatus.toUpperCase())
			{
				case 'ENTERED': couponItem = 'used'; tooltip = 'warning'; break;
				case 'BAD': couponItem = tooltip = 'danger'; break;
				default: couponItem = tooltip  = 'success';
			}

			return BX.create('STRONG', {
				attrs: {
					'data-coupon': couponName,
					className: 'bx-soa-coupon-item-' + couponItem
				},
				children: active ? [
					couponName || '',
					BX.create('SPAN', {
						props: {className: 'bx-soa-coupon-remove'},
						events: {
							click: BX.delegate(function(e){
								var target = e.target || e.srcElement,
									coupon = BX.findParent(target, {tagName: 'STRONG'});

								if (coupon && coupon.getAttribute('data-coupon'))
								{
									this.sendRequest('removeCoupon', coupon.getAttribute('data-coupon'))
								}
							}, this)
						}
					}),
					BX.create('SPAN', {
						props: {
							className: 'bx-soa-tooltip bx-soa-tooltip-coupon bx-soa-tooltip-' + tooltip + ' tooltip top'
						},
						children: [
							BX.create('SPAN', {props: {className: 'tooltip-arrow'}}),
							BX.create('SPAN', {props: {className: 'tooltip-inner'}, text: couponDesc})
						]
					})
				] : [couponName]
			});
		},

		getCouponsLabel: function(active)
		{
			return BX.create('DIV', {
				props: {className: 'bx-soa-coupon-label'},
				children: active
					? [BX.create('LABEL', {html: this.params.MESS_USE_COUPON + ':'})]
					: [this.params.MESS_COUPON + ':']
			});
		},

		addCoupon: function(coupon)
		{
			var couponListNodes = this.orderBlockNode.querySelectorAll('.bx-soa-coupon:not(.bx-soa-coupon-item-fixed) .bx-soa-coupon-item');

			for (var i = 0; i < couponListNodes.length; i++)
			{
				if (couponListNodes[i].querySelector('[data-coupon="' + BX.util.htmlspecialchars(coupon) + '"]'))
					break;

				couponListNodes[i].appendChild(this.getCouponNode({text: coupon}, true, 'bx-soa-coupon-item-danger'));
			}
		},

		removeCoupon: function(coupon)
		{
			var couponNodes = this.orderBlockNode.querySelectorAll('[data-coupon="' + BX.util.htmlspecialchars(coupon) + '"]'), i;

			for (i in couponNodes)
			{
				if (couponNodes.hasOwnProperty(i))
				{
					BX.remove(couponNodes[i]);
				}
			}
		},

		editRegionBlock: function(active)
		{
			if (!this.regionBlockNode || !this.regionHiddenBlockNode || !this.result.PERSON_TYPE)
				return;

			if (active)
			{
				this.editActiveRegionBlock(true);
				!this.regionBlockNotEmpty && this.editFadeRegionBlock();
			}
			else
				this.editFadeRegionBlock();

			this.initialized.region = true;
		},

		editActiveRegionBlock: function(activeNodeMode)
		{
			var node = activeNodeMode ? this.regionBlockNode : this.regionHiddenBlockNode,
				regionContent, regionNode, regionNodeCol;

			if (this.initialized.region)
			{
				BX.remove(BX.lastChild(node));
				node.appendChild(BX.firstChild(this.regionHiddenBlockNode));
			}
			else
			{
				regionContent = node.querySelector('.bx-soa-section-content');
				if (!regionContent)
				{
					regionContent = this.getNewContainer();
					node.appendChild(regionContent);
				}
				else
					BX.cleanNode(regionContent);

				this.getErrorContainer(regionContent);

				regionNode = BX.create('DIV', {props: {className: 'bx_soa_location row'}});
				regionNodeCol = BX.create('DIV', {props: {className: 'col-xs-12'}});

				this.getPersonTypeControl(regionNodeCol);

				this.getProfilesControl(regionNodeCol);

				this.getDeliveryLocationInput(regionNodeCol);

				if (!this.result.SHOW_AUTH)
				{
					if (this.regionBlockNotEmpty)
					{
						BX.addClass(this.regionBlockNode, 'bx-active');
						this.regionBlockNode.style.display = '';
					}
					else
					{
						BX.removeClass(this.regionBlockNode, 'bx-active');
						this.regionBlockNode.style.display = 'none';

						if (!this.result.IS_AUTHORIZED || typeof this.result.LAST_ORDER_DATA.FAIL !== 'undefined')
							this.initFirstSection();
					}
				}

				regionNode.appendChild(regionNodeCol);
				regionContent.appendChild(regionNode);
				this.getBlockFooter(regionContent);
			}
		},

		editFadeRegionBlock: function()
		{
			var regionContent = this.regionBlockNode.querySelector('.bx-soa-section-content'), newContent;

			if (this.initialized.region)
			{
				this.regionHiddenBlockNode.appendChild(regionContent);
			}
			else
			{
				this.editActiveRegionBlock(false);
				BX.remove(BX.lastChild(this.regionBlockNode));
			}

			newContent = this.getNewContainer(true);
			this.regionBlockNode.appendChild(newContent);
			this.editFadeRegionContent(newContent);
		},

		editFadeRegionContent: function(node)
		{
			if (!node || !this.locationsInitialized)
				return;

			var selectedPersonType = this.getSelectedPersonType(),
				errorNode = this.regionHiddenBlockNode.querySelector('.alert.alert-danger'),
				addedHtml = '', props = [], locationProperty,
				input, zipValue = '', zipProperty,
				fadeParamName, i, k, locationString, validRegionErrors;

			BX.cleanNode(node);

			if (errorNode)
				node.appendChild(errorNode.cloneNode(true));

			if (selectedPersonType && selectedPersonType.NAME && this.result.PERSON_TYPE.length > 1)
			{
				addedHtml += '<strong>' + this.params.MESS_PERSON_TYPE + ':</strong> '
					+ BX.util.htmlspecialchars(selectedPersonType.NAME) + '<br>';
			}

			if (selectedPersonType)
			{
				fadeParamName = 'PROPS_FADE_LIST_' + selectedPersonType.ID;
				props = this.params[fadeParamName] || [];
			}

			for (i in this.result.ORDER_PROP.properties)
			{
				if (this.result.ORDER_PROP.properties.hasOwnProperty(i))
				{
					if (this.result.ORDER_PROP.properties[i].IS_LOCATION == 'Y'
						&& this.result.ORDER_PROP.properties[i].ID == this.deliveryLocationInfo.loc)
					{
						locationProperty = this.result.ORDER_PROP.properties[i];
					}
					else if (this.result.ORDER_PROP.properties[i].IS_ZIP == 'Y'
						&& this.result.ORDER_PROP.properties[i].ID == this.deliveryLocationInfo.zip)
					{
						zipProperty = this.result.ORDER_PROP.properties[i];
						for (k = 0; k < props.length; k++)
						{
							if (props[k] == zipProperty.ID)
							{
								input = BX('zipProperty');
								zipValue = input && input.value && input.value.length ? input.value : BX.message('SOA_NOT_SPECIFIED');
								break;
							}
						}
					}
				}
			}

			locationString = this.getLocationString(this.regionHiddenBlockNode);
			if (locationProperty && locationString.length)
				addedHtml += '<strong>' + BX.util.htmlspecialchars(locationProperty.NAME) + ':</strong> '
					+ BX.util.htmlspecialchars(locationString) + '<br>';

			if (zipProperty && zipValue.length)
				addedHtml += '<strong>' + BX.util.htmlspecialchars(zipProperty.NAME) + ':</strong> '
					+ BX.util.htmlspecialchars(zipValue);

			node.innerHTML += addedHtml;

			if (this.regionBlockNode.getAttribute('data-visited') == 'true')
			{
				validRegionErrors = this.isValidRegionBlock();

				if (validRegionErrors.length)
				{
					BX.addClass(this.regionBlockNode, 'bx-step-error');
					this.showError(this.regionBlockNode, validRegionErrors);
				}
				else
					BX.removeClass(this.regionBlockNode, 'bx-step-error');
			}

			BX.bind(node.querySelector('.alert.alert-danger'), 'click', BX.proxy(this.showByClick, this));
			BX.bind(node.querySelector('.alert.alert-warning'), 'click', BX.proxy(this.showByClick, this));
		},

		getSelectedPersonType: function()
		{
			var personTypeInput, currentPersonType, personTypeId, i,
				personTypeLength = this.result.PERSON_TYPE.length;

			if (personTypeLength == 1)
			{
				personTypeInput = this.regionBlockNode.querySelector('input[type=hidden][name=PERSON_TYPE]');
				if (!personTypeInput)
					personTypeInput = this.regionHiddenBlockNode.querySelector('input[type=hidden][name=PERSON_TYPE]');
			}
			else if (personTypeLength == 2)
			{
				personTypeInput = this.regionBlockNode.querySelector('input[type=radio][name=PERSON_TYPE]:checked');
				if (!personTypeInput)
					personTypeInput = this.regionHiddenBlockNode.querySelector('input[type=radio][name=PERSON_TYPE]:checked');
			}
			else
			{
				personTypeInput = this.regionBlockNode.querySelector('select[name=PERSON_TYPE] > option:checked');
				if (!personTypeInput)
					personTypeInput = this.regionHiddenBlockNode.querySelector('select[name=PERSON_TYPE] > option:checked');
			}

			if (personTypeInput)
			{
				personTypeId = personTypeInput.value;

				for (i in this.result.PERSON_TYPE)
				{
					if (this.result.PERSON_TYPE[i].ID == personTypeId)
					{
						currentPersonType = this.result.PERSON_TYPE[i];
						break;
					}
				}
			}

			return currentPersonType;
		},

		getDeliveryLocationInput: function(node)
		{
			var currentProperty, locationId, altId, location, k, altProperty,
				labelHtml, currentLocation, insertedLoc,
				labelTextHtml, label, input, altNode;

			for (k in this.result.ORDER_PROP.properties)
			{
				if (this.result.ORDER_PROP.properties.hasOwnProperty(k))
				{
					currentProperty = this.result.ORDER_PROP.properties[k];
					if (currentProperty.IS_LOCATION == 'Y')
					{
						locationId = currentProperty.ID;
						altId = parseInt(currentProperty.INPUT_FIELD_LOCATION);
						break;
					}
				}
			}

			location = this.locations[locationId];
			if (location && location[0] && location[0].output)
			{
				this.regionBlockNotEmpty = true;

				labelHtml = '<label class="bx-soa-custom-label" for="soa-property-' + parseInt(locationId) + '">'
					+ (currentProperty.REQUIRED == 'Y' ? '<span class="bx-authform-starrequired">*</span> ' : '')
					+ BX.util.htmlspecialchars(currentProperty.NAME)
					+ (currentProperty.DESCRIPTION.length ? ' <small>(' + BX.util.htmlspecialchars(currentProperty.DESCRIPTION) + ')</small>' : '')
					+ '</label>';

				currentLocation = location[0].output;
				insertedLoc = BX.create('DIV', {
					attrs: {'data-property-id-row': locationId},
					props: {className: 'form-group bx-soa-location-input-container'},
					style: {visibility: 'hidden'},
					html:  labelHtml + currentLocation.HTML
				});
				node.appendChild(insertedLoc);
				node.appendChild(BX.create('INPUT', {
					props: {
						type: 'hidden',
						name: 'RECENT_DELIVERY_VALUE',
						value: location[0].lastValue
					}
				}));

				for (k in currentLocation.SCRIPT)
					if (currentLocation.SCRIPT.hasOwnProperty(k))
						BX.evalGlobal(currentLocation.SCRIPT[k].JS);
			}

			if (location && location[0] && location[0].showAlt && altId > 0)
			{
				for (k in this.result.ORDER_PROP.properties)
				{
					if (parseInt(this.result.ORDER_PROP.properties[k].ID) == altId)
					{
						altProperty = this.result.ORDER_PROP.properties[k];
						break;
					}
				}
			}

			if (altProperty)
			{
				altNode = BX.create('DIV', {
					attrs: {'data-property-id-row': altProperty.ID},
					props: {className: "form-group bx-soa-location-input-container"}
				});

				labelTextHtml = altProperty.REQUIRED == 'Y' ? '<span class="bx-authform-starrequired">*</span> ' : '';
				labelTextHtml += BX.util.htmlspecialchars(altProperty.NAME);

				label = BX.create('LABEL', {
					attrs: {for: 'altProperty'},
					props: {className: 'bx-soa-custom-label'},
					html: labelTextHtml
				});

				input = BX.create('INPUT', {
					props: {
						id: 'altProperty',
						type: 'text',
						placeholder: altProperty.DESCRIPTION,
						autocomplete: 'city',
						className: 'form-control bx-soa-customer-input bx-ios-fix',
						name: 'ORDER_PROP_' + altProperty.ID,
						value: altProperty.VALUE
					}
				});

				altNode.appendChild(label);
				altNode.appendChild(input);
				node.appendChild(altNode);

				this.bindValidation(altProperty.ID, altNode);
			}

			this.getZipLocationInput(node);

			if (location && location[0])
			{
				node.appendChild(
					BX.create('DIV', {
						props: {className: 'bx-soa-reference'},
						html: this.params.MESS_REGION_REFERENCE
					})
				);
			}
		},

		getLocationString: function(node)
		{
			if (!node)
				return '';

			var locationInputNode = node.querySelector('.bx-ui-sls-route'),
				locationString = '',
				locationSteps, i, altLoc;

			if (locationInputNode && locationInputNode.value && locationInputNode.value.length)
				locationString = locationInputNode.value;
			else
			{
				locationSteps = node.querySelectorAll('.bx-ui-combobox-fake.bx-combobox-fake-as-input');
				for (i = locationSteps.length; i--;)
				{
					if (locationSteps[i].innerHTML.indexOf('...') >= 0)
						continue;

					if (locationSteps[i].innerHTML.indexOf('---') >= 0)
					{
						altLoc = BX('altProperty');
						if (altLoc && altLoc.value.length)
							locationString += altLoc.value;

						continue;
					}

					if (locationString.length)
						locationString += ', ';

					locationString += locationSteps[i].innerHTML;
				}

				if (locationString.length == 0)
					locationString = BX.message('SOA_NOT_SPECIFIED');
			}

			return locationString;
		},

		getZipLocationInput: function(node)
		{
			var zipProperty, i, propsItemNode, labelTextHtml, label, input;

			for (i in this.result.ORDER_PROP.properties)
			{
				if (this.result.ORDER_PROP.properties.hasOwnProperty(i) && this.result.ORDER_PROP.properties[i].IS_ZIP == 'Y')
				{
					zipProperty = this.result.ORDER_PROP.properties[i];
					break;
				}
			}

			if (zipProperty)
			{
				this.regionBlockNotEmpty = true;

				propsItemNode = BX.create('DIV', {props: {className: "form-group bx-soa-location-input-container"}});
				propsItemNode.setAttribute('data-property-id-row', zipProperty.ID);

				labelTextHtml = zipProperty.REQUIRED == 'Y' ? '<span class="bx-authform-starrequired">*</span> ' : '';
				labelTextHtml += BX.util.htmlspecialchars(zipProperty.NAME);

				label = BX.create('LABEL', {
					attrs: {'for': 'zipProperty'},
					props: {className: 'bx-soa-custom-label'},
					html: labelTextHtml
				});
				input = BX.create('INPUT', {
					props: {
						id: 'zipProperty',
						type: 'text',
						placeholder: zipProperty.DESCRIPTION,
						autocomplete: 'zip',
						className: 'form-control bx-soa-customer-input bx-ios-fix',
						name: 'ORDER_PROP_' + zipProperty.ID,
						value: zipProperty.VALUE
					}
				});

				propsItemNode.appendChild(label);
				propsItemNode.appendChild(input);
				node.appendChild(propsItemNode);
				node.appendChild(
					BX.create('input', {
						props: {
							id: 'ZIP_PROPERTY_CHANGED',
							name: 'ZIP_PROPERTY_CHANGED',
							type: 'hidden',
							value: this.result.ZIP_PROPERTY_CHANGED || 'N'
						}
					})
				);

				this.bindValidation(zipProperty.ID, propsItemNode);
			}
		},

		getPersonTypeSortedArray: function(objPersonType)
		{
			var personTypes = [], k;

			for (k in objPersonType)
			{
				if (objPersonType.hasOwnProperty(k))
				{
					personTypes.push(objPersonType[k]);
				}
			}

			return personTypes.sort(function(a, b){return parseInt(a.SORT) - parseInt(b.SORT)});
		},

		getPersonTypeControl: function(node)
		{
			if (!this.result.PERSON_TYPE)
				return;

			this.result.PERSON_TYPE = this.getPersonTypeSortedArray(this.result.PERSON_TYPE);

			var personTypesCount = this.result.PERSON_TYPE.length,
				currentType, oldPersonTypeId, i,
				input, options = [], label, delimiter = false;

			if (personTypesCount > 1)
			{
				input = BX.create('DIV', {
					props: {className: 'form-group'},
					children: [
						BX.create('LABEL', {props: {className: 'bx-soa-custom-label'}, html: this.params.MESS_PERSON_TYPE}),
						BX.create('BR')
					]
				});
				node.appendChild(input);
				node = input;
			}

			if (personTypesCount > 2)
			{
				for (i in this.result.PERSON_TYPE)
				{
					if (this.result.PERSON_TYPE.hasOwnProperty(i))
					{
						currentType = this.result.PERSON_TYPE[i];
						options.push(BX.create('OPTION', {
							props: {
								value: currentType.ID,
								selected: currentType.CHECKED == 'Y'
							},
							text: currentType.NAME
						}));

						if (currentType.CHECKED == 'Y')
							oldPersonTypeId = currentType.ID;
					}

				}
				node.appendChild(BX.create('SELECT', {
					props: {name: 'PERSON_TYPE', className: 'form-control'},
					children: options,
					events: {change: BX.proxy(this.sendRequest, this)}
				}));

				this.regionBlockNotEmpty = true;
			}
			else if (personTypesCount == 2)
			{
				for (i in this.result.PERSON_TYPE)
				{
					if (this.result.PERSON_TYPE.hasOwnProperty(i))
					{
						currentType = this.result.PERSON_TYPE[i];
						label = BX.create('LABEL', {
							children: [
								BX.create('INPUT', {
									attrs: {checked: currentType.CHECKED == 'Y'},
									props: {type: 'radio', name: 'PERSON_TYPE', value: currentType.ID}
								}),
								BX.util.htmlspecialchars(currentType.NAME)
							],
							events: {change: BX.proxy(this.sendRequest, this)}
						});

						if (delimiter)
							node.appendChild(BX.create('BR'));

						node.appendChild(BX.create('DIV', {props: {className: 'radio-inline'}, children: [label]}));
						delimiter = true;

						if (currentType.CHECKED == 'Y')
							oldPersonTypeId = currentType.ID;
					}
				}

				this.regionBlockNotEmpty = true;
			}
			else
			{
				for (i in this.result.PERSON_TYPE)
					if (this.result.PERSON_TYPE.hasOwnProperty(i))
						node.appendChild(BX.create('INPUT', {props: {type: 'hidden', name: 'PERSON_TYPE', value: this.result.PERSON_TYPE[i].ID}}));
			}

			if (oldPersonTypeId)
			{
				node.appendChild(
					BX.create('INPUT', {
						props: {
							type: 'hidden',
							name: 'PERSON_TYPE_OLD',
							value: oldPersonTypeId

						}
					})
				);
			}
		},

		getProfilesControl: function(node)
		{
			var profilesLength = BX.util.object_keys(this.result.USER_PROFILES).length,
				i, label, options = [],
				profileChangeInput, input;

			if (profilesLength)
			{
				if (
					this.params.ALLOW_USER_PROFILES === 'Y'
					&& (profilesLength > 1 || this.params.ALLOW_NEW_PROFILE === 'Y')
				)
				{
					this.regionBlockNotEmpty = true;

					label = BX.create('LABEL', {props: {className: 'bx-soa-custom-label'}, html: this.params.MESS_SELECT_PROFILE});

					for (i in this.result.USER_PROFILES)
					{
						if (this.result.USER_PROFILES.hasOwnProperty(i))
						{
							options.unshift(
								BX.create('OPTION', {
									props: {
										value: this.result.USER_PROFILES[i].ID,
										selected: this.result.USER_PROFILES[i].CHECKED === 'Y'
									},
									html: this.result.USER_PROFILES[i].NAME
								})
							);
						}
					}

					if (this.params.ALLOW_NEW_PROFILE === 'Y')
					{
						options.unshift(BX.create('OPTION', {props: {value: 0}, text: BX.message('SOA_PROP_NEW_PROFILE')}));
					}

					profileChangeInput = BX.create('INPUT', {
						props: {
							type: 'hidden',
							value: 'N',
							id: 'profile_change',
							name: 'profile_change'
						}
					});
					input = BX.create('SELECT', {
						props: {className: 'form-control', name: 'PROFILE_ID'},
						children: options,
						events:{
							change: BX.delegate(function(){
								BX('profile_change').value = 'Y';
								this.sendRequest();
							}, this)
						}
					});

					node.appendChild(
						BX.create('DIV', {
							props: {className: 'form-group bx-soa-location-input-container'},
							children: [label, profileChangeInput, input]
						})
					);
				}
				else
				{
					for (i in this.result.USER_PROFILES)
					{
						if (
							this.result.USER_PROFILES.hasOwnProperty(i)
							&& this.result.USER_PROFILES[i].CHECKED === 'Y'
						)
						{
							node.appendChild(
								BX.create('INPUT', {
									props: {
										name: 'PROFILE_ID',
										type: 'hidden',
										value: this.result.USER_PROFILES[i].ID}
								})
							);
						}
					}
				}
			}
		},

		editPaySystemBlock: function(active)
		{
			if (!this.paySystemBlockNode || !this.paySystemHiddenBlockNode || !this.result.PAY_SYSTEM)
				return;

			if (active)
				this.editActivePaySystemBlock(true);
			else
				this.editFadePaySystemBlock();

			this.initialized.paySystem = true;
		},

		editActivePaySystemBlock: function(activeNodeMode)
		{
			var node = activeNodeMode ? this.paySystemBlockNode : this.paySystemHiddenBlockNode,
				paySystemContent, paySystemNode;

			if (this.initialized.paySystem)
			{
				BX.remove(BX.lastChild(node));
				node.appendChild(BX.firstChild(this.paySystemHiddenBlockNode));
			}
			else
			{
				paySystemContent = node.querySelector('.bx-soa-section-content');
				if (!paySystemContent)
				{
					paySystemContent = this.getNewContainer();
					node.appendChild(paySystemContent);
				}
				else
					BX.cleanNode(paySystemContent);

				this.getErrorContainer(paySystemContent);
				paySystemNode = BX.create('DIV', {props: {className: 'bx-soa-pp row'}});
				this.editPaySystemItems(paySystemNode);
				paySystemContent.appendChild(paySystemNode);
				this.editPaySystemInfo(paySystemNode);

				if (this.params.SHOW_COUPONS_PAY_SYSTEM == 'Y')
					this.editCoupons(paySystemContent);

				this.getBlockFooter(paySystemContent);
			}
		},

		editFadePaySystemBlock: function()
		{
			var paySystemContent = this.paySystemBlockNode.querySelector('.bx-soa-section-content'), newContent;

			if (this.initialized.paySystem)
			{
				this.paySystemHiddenBlockNode.appendChild(paySystemContent);
			}
			else
			{
				this.editActivePaySystemBlock(false);
				BX.remove(BX.lastChild(this.paySystemBlockNode));
			}

			newContent = this.getNewContainer(true);
			this.paySystemBlockNode.appendChild(newContent);

			this.editFadePaySystemContent(newContent);

			if (this.params.SHOW_COUPONS_PAY_SYSTEM == 'Y')
				this.editCouponsFade(newContent);
		},

		editPaySystemItems: function(paySystemNode)
		{
			if (!this.result.PAY_SYSTEM || this.result.PAY_SYSTEM.length <= 0)
				return;

			var paySystemItemsContainer = BX.create('DIV', {props: {className: 'col-sm-7 bx-soa-pp-item-container'}}),
				paySystemItemNode, i;

			for (i = 0; i < this.paySystemPagination.currentPage.length; i++)
			{
				paySystemItemNode = this.createPaySystemItem(this.paySystemPagination.currentPage[i]);
				paySystemItemsContainer.appendChild(paySystemItemNode);
			}

			if (this.paySystemPagination.show)
				this.showPagination('paySystem', paySystemItemsContainer);

			paySystemNode.appendChild(paySystemItemsContainer);
		},

		createPaySystemItem: function(item)
		{
			var checked = item.CHECKED == 'Y',
				logotype, logoNode,
				paySystemId = parseInt(item.ID),
				title, label, itemNode;

			logoNode = BX.create('DIV', {props: {className: 'bx-soa-pp-company-image'}});
			logotype = this.getImageSources(item, 'PSA_LOGOTIP');
			if (logotype && logotype.src_2x)
			{
				logoNode.setAttribute('style',
					'background-image: url(' + logotype.src_1x + ');' +
					'background-image: -webkit-image-set(url(' + logotype.src_1x + ') 1x, url(' + logotype.src_2x + ') 2x)'
				);
			}
			else
			{
				logotype = logotype && logotype.src_1x || this.defaultPaySystemLogo;
				logoNode.setAttribute('style', 'background-image: url(' + logotype + ');');
			}
			label = BX.create('DIV', {
				props: {className: 'bx-soa-pp-company-graf-container'},
				children: [
					BX.create('INPUT', {
						props: {
							id: 'ID_PAY_SYSTEM_ID_' + paySystemId,
							name: 'PAY_SYSTEM_ID',
							type: 'checkbox',
							className: 'bx-soa-pp-company-checkbox',
							value: paySystemId,
							checked: checked
						}
					}),
					logoNode
				]
			});

			if (this.params.SHOW_PAY_SYSTEM_LIST_NAMES == 'Y')
			{
				title = BX.create('DIV', {props: {className: 'bx-soa-pp-company-smalltitle'}, text: item.NAME});
			}

			itemNode = BX.create('DIV', {
				props: {className: 'bx-soa-pp-company col-lg-4 col-sm-4 col-xs-6'},
				children: [label, title],
				events: {
					click: BX.proxy(this.selectPaySystem, this)
				}
			});

			if (checked)
				BX.addClass(itemNode, 'bx-selected');

			return itemNode;
		},

		editPaySystemInfo: function(paySystemNode)
		{
			if (!this.result.PAY_SYSTEM || (this.result.PAY_SYSTEM.length == 0 && this.result.PAY_FROM_ACCOUNT != 'Y'))
				return;

			var paySystemInfoContainer = BX.create('DIV', {
					props: {
						className: (this.result.PAY_SYSTEM.length == 0 ? 'col-sm-12' : 'col-sm-5') + ' bx-soa-pp-desc-container'
					}
				}),
				innerPs, extPs, delimiter, currentPaySystem,
				logotype, logoNode, subTitle, label, title, price;

			BX.cleanNode(paySystemInfoContainer);

			if (this.result.PAY_FROM_ACCOUNT == 'Y')
				innerPs = this.getInnerPaySystem(paySystemInfoContainer);

			currentPaySystem = this.getSelectedPaySystem();
			if (currentPaySystem)
			{
				logoNode = BX.create('DIV', {props: {className: 'bx-soa-pp-company-image'}});
				logotype = this.getImageSources(currentPaySystem, 'PSA_LOGOTIP');
				if (logotype && logotype.src_2x)
				{
					logoNode.setAttribute('style',
						'background-image: url(' + logotype.src_1x + ');' +
						'background-image: -webkit-image-set(url(' + logotype.src_1x + ') 1x, url(' + logotype.src_2x + ') 2x)'
					);
				}
				else
				{
					logotype = logotype && logotype.src_1x || this.defaultPaySystemLogo;
					logoNode.setAttribute('style', 'background-image: url(' + logotype + ');');
				}

				if (this.params.SHOW_PAY_SYSTEM_INFO_NAME == 'Y')
				{
					subTitle = BX.create('DIV', {
						props: {className: 'bx-soa-pp-company-subTitle'},
						text: currentPaySystem.NAME
					});
				}

				label = BX.create('DIV', {
					props: {className: 'bx-soa-pp-company-logo'},
					children: [
						BX.create('DIV', {
							props: {className: 'bx-soa-pp-company-graf-container'},
							children: [logoNode]
						})
					]
				});

				title = BX.create('DIV', {
					props: {className: 'bx-soa-pp-company-block'},
					children: [BX.create('DIV', {props: {className: 'bx-soa-pp-company-desc'}, html: currentPaySystem.DESCRIPTION})]
				});

				if (currentPaySystem.PRICE && parseFloat(currentPaySystem.PRICE) > 0)
				{
					price = BX.create('UL', {
						props: {className: 'bx-soa-pp-list'},
						children: [
							BX.create('LI', {
								children: [
									BX.create('DIV', {props: {className: 'bx-soa-pp-list-termin'}, html: this.params.MESS_PRICE + ':'}),
									BX.create('DIV', {props: {className: 'bx-soa-pp-list-description'}, text: '~' + currentPaySystem.PRICE_FORMATTED})
								]
							})
						]
					});
				}

				extPs = BX.create('DIV', {children: [subTitle, label, title, price]});
			}

			if (innerPs && extPs)
				delimiter = BX.create('HR', {props: {className: 'bxe-light'}});

			paySystemInfoContainer.appendChild(
				BX.create('DIV', {
					props: {className: 'bx-soa-pp-company'},
					children: [innerPs, delimiter, extPs]
				})
			);
			paySystemNode.appendChild(paySystemInfoContainer);
		},

		getInnerPaySystem: function()
		{
			if (!this.result.CURRENT_BUDGET_FORMATED || !this.result.PAY_CURRENT_ACCOUNT || !this.result.INNER_PAY_SYSTEM)
				return;

			var accountOnly = this.params.ONLY_FULL_PAY_FROM_ACCOUNT && (this.params.ONLY_FULL_PAY_FROM_ACCOUNT == 'Y'),
				isSelected = this.result.PAY_CURRENT_ACCOUNT && (this.result.PAY_CURRENT_ACCOUNT == 'Y'),
				paySystem = this.result.INNER_PAY_SYSTEM,
				logotype, logoNode,subTitle, label, title, hiddenInput, htmlString, innerPsDesc;

			if (this.params.SHOW_PAY_SYSTEM_INFO_NAME == 'Y')
			{
				subTitle = BX.create('DIV', {
					props: {className: 'bx-soa-pp-company-subTitle'},
					text: paySystem.NAME
				});
			}

			logoNode = BX.create('DIV', {props: {className: 'bx-soa-pp-company-image'}});
			logotype = this.getImageSources(paySystem, 'LOGOTIP');
			if (logotype && logotype.src_2x)
			{
				logoNode.setAttribute('style',
					'background-image: url(' + logotype.src_1x + ');' +
					'background-image: -webkit-image-set(url(' + logotype.src_1x + ') 1x, url(' + logotype.src_2x + ') 2x)'
				);
			}
			else
			{
				logotype = logotype && logotype.src_1x || this.defaultPaySystemLogo;
				logoNode.setAttribute('style', 'background-image: url(' + logotype + ');');
			}

			label = BX.create('DIV', {
				props: {className: 'bx-soa-pp-company-logo'},
				children: [
					BX.create('DIV', {
						props: {className: 'bx-soa-pp-company-graf-container'},
						children: [
							BX.create('INPUT', {
								props: {
									type: 'checkbox',
									className: 'bx-soa-pp-company-checkbox',
									name: 'PAY_CURRENT_ACCOUNT',
									value: 'Y',
									checked: isSelected
								}
							}),
							logoNode
						],
						events: {
							click: BX.proxy(this.selectPaySystem, this)
						}
					})
				]
			});

			if (paySystem.DESCRIPTION && paySystem.DESCRIPTION.length)
			{
				title = BX.create('DIV', {
					props: {className: 'bx-soa-pp-company-block'},
					children: [BX.create('DIV', {props: {className: 'bx-soa-pp-company-desc'}, html: paySystem.DESCRIPTION})]
				});
			}

			hiddenInput = BX.create('INPUT', {
				props: {
					type: 'hidden',
					name: 'PAY_CURRENT_ACCOUNT',
					value: 'N'
				}
			});

			htmlString = this.params.MESS_INNER_PS_BALANCE + ' <b class="wsnw">' + this.result.CURRENT_BUDGET_FORMATED
				+ '</b><br>' + (accountOnly ? BX.message('SOA_PAY_ACCOUNT3') : '');
			innerPsDesc = BX.create('DIV', {props: {className: 'bx-soa-pp-company-desc'}, html: htmlString});

			return BX.create('DIV', {
				props: {className: 'bx-soa-pp-inner-ps' + (isSelected ? ' bx-selected' : '')},
				children: [hiddenInput, subTitle, label, title, innerPsDesc]
			});
		},

		editFadePaySystemContent: function(node)
		{
			var selectedPaySystem = this.getSelectedPaySystem(),
				errorNode = this.paySystemHiddenBlockNode.querySelector('div.alert.alert-danger'),
				warningNode = this.paySystemHiddenBlockNode.querySelector('div.alert.alert-warning.alert-show'),
				addedHtml = '', logotype, imgSrc;

			if (errorNode)
				node.appendChild(errorNode.cloneNode(true));
			else
				this.getErrorContainer(node);

			if (warningNode && warningNode.innerHTML)
				node.appendChild(warningNode.cloneNode(true));

			if (this.isSelectedInnerPayment())
			{
				logotype = this.getImageSources(this.result.INNER_PAY_SYSTEM, 'LOGOTIP');
				imgSrc = logotype && logotype.src_1x || this.defaultPaySystemLogo;

				addedHtml += '<div class="bx-soa-pp-company-selected">';
				addedHtml += '<img src="' + imgSrc + '" style="height:18px;" alt="">';
				addedHtml += '<strong>' + this.result.INNER_PAY_SYSTEM.NAME + '</strong><br>';
				addedHtml += '</div>';
			}

			if (selectedPaySystem && selectedPaySystem.NAME)
			{
				logotype = this.getImageSources(selectedPaySystem, 'PSA_LOGOTIP');
				imgSrc = logotype && logotype.src_1x || this.defaultPaySystemLogo;

				addedHtml += '<div class="bx-soa-pp-company-selected">';
				addedHtml += '<img src="' + imgSrc + '" style="height:18px;" alt="">';
				addedHtml += '<strong>' + BX.util.htmlspecialchars(selectedPaySystem.NAME) + '</strong>';
				addedHtml += '</div>';
			}

			if (!addedHtml.length)
				addedHtml = '<strong>' + BX.message('SOA_PS_SELECT_ERROR') + '</strong>';

			node.innerHTML += addedHtml;

			node.appendChild(BX.create('DIV', {style: {clear: 'both'}}));
			BX.bind(node.querySelector('.alert.alert-danger'), 'click', BX.proxy(this.showByClick, this));
			BX.bind(node.querySelector('.alert.alert-warning'), 'click', BX.proxy(this.showByClick, this));
		},

		getSelectedPaySystem: function()
		{
			var paySystemCheckbox = this.paySystemBlockNode.querySelector('input[type=checkbox][name=PAY_SYSTEM_ID]:checked'),
				currentPaySystem = null, paySystemId, i;

			if (!paySystemCheckbox)
				paySystemCheckbox = this.paySystemHiddenBlockNode.querySelector('input[type=checkbox][name=PAY_SYSTEM_ID]:checked');

			if (!paySystemCheckbox)
				paySystemCheckbox = this.paySystemHiddenBlockNode.querySelector('input[type=hidden][name=PAY_SYSTEM_ID]');

			if (paySystemCheckbox)
			{
				paySystemId = paySystemCheckbox.value;

				for (i = 0; i < this.result.PAY_SYSTEM.length; i++)
				{
					if (this.result.PAY_SYSTEM[i].ID == paySystemId)
					{
						currentPaySystem = this.result.PAY_SYSTEM[i];
						break;
					}
				}
			}

			return currentPaySystem;
		},

		isSelectedInnerPayment: function()
		{
			var innerPaySystemCheckbox = this.paySystemBlockNode.querySelector('input[type=checkbox][name=PAY_CURRENT_ACCOUNT]');

			if (!innerPaySystemCheckbox)
				innerPaySystemCheckbox = this.paySystemHiddenBlockNode.querySelector('input[type=checkbox][name=PAY_CURRENT_ACCOUNT]');

			return innerPaySystemCheckbox && innerPaySystemCheckbox.checked;
		},

		selectPaySystem: function(event)
		{
			if (!this.orderBlockNode || !event)
				return;

			var target = event.target || event.srcElement,
				innerPaySystemSection = this.paySystemBlockNode.querySelector('div.bx-soa-pp-inner-ps'),
				innerPaySystemCheckbox = this.paySystemBlockNode.querySelector('input[type=checkbox][name=PAY_CURRENT_ACCOUNT]'),
				fullPayFromInnerPaySystem = this.result.TOTAL && parseFloat(this.result.TOTAL.ORDER_TOTAL_LEFT_TO_PAY) === 0;

			var innerPsAction = BX.hasClass(target, 'bx-soa-pp-inner-ps') ? target : BX.findParent(target, {className: 'bx-soa-pp-inner-ps'}),
				actionSection = BX.hasClass(target, 'bx-soa-pp-company') ? target : BX.findParent(target, {className: 'bx-soa-pp-company'}),
				actionInput, selectedSection;

			if (innerPsAction)
			{
				if (target.nodeName == 'INPUT')
					innerPaySystemCheckbox.checked = !innerPaySystemCheckbox.checked;

				if (innerPaySystemCheckbox.checked)
				{
					BX.removeClass(innerPaySystemSection, 'bx-selected');
					innerPaySystemCheckbox.checked = false;
				}
				else
				{
					BX.addClass(innerPaySystemSection, 'bx-selected');
					innerPaySystemCheckbox.checked = true;
				}
			}
			else if (actionSection)
			{
				if (BX.hasClass(actionSection, 'bx-selected'))
					return BX.PreventDefault(event);

				if (innerPaySystemCheckbox && innerPaySystemCheckbox.checked && fullPayFromInnerPaySystem)
				{
					BX.addClass(actionSection, 'bx-selected');
					actionInput = actionSection.querySelector('input[type=checkbox]');
					actionInput.checked = true;
					BX.removeClass(innerPaySystemSection, 'bx-selected');
					innerPaySystemCheckbox.checked = false;
				}
				else
				{
					selectedSection = this.paySystemBlockNode.querySelector('.bx-soa-pp-company.bx-selected');
					BX.addClass(actionSection, 'bx-selected');
					actionInput = actionSection.querySelector('input[type=checkbox]');
					actionInput.checked = true;

					if (selectedSection)
					{
						BX.removeClass(selectedSection, 'bx-selected');
						selectedSection.querySelector('input[type=checkbox]').checked = false;
					}
				}
			}

			this.sendRequest();
		},

		editDeliveryBlock: function(active)
		{
			if (!this.deliveryBlockNode || !this.deliveryHiddenBlockNode || !this.result.DELIVERY)
				return;

			if (active)
				this.editActiveDeliveryBlock(true);
			else
				this.editFadeDeliveryBlock();

			this.checkPickUpShow();

			this.initialized.delivery = true;
		},

		editActiveDeliveryBlock: function(activeNodeMode)
		{
			var node = activeNodeMode ? this.deliveryBlockNode : this.deliveryHiddenBlockNode,
				deliveryContent, deliveryNode;

			if (this.initialized.delivery)
			{
				BX.remove(BX.lastChild(node));
				node.appendChild(BX.firstChild(this.deliveryHiddenBlockNode));
			}
			else
			{
				deliveryContent = node.querySelector('.bx-soa-section-content');
				if (!deliveryContent)
				{
					deliveryContent = this.getNewContainer();
					node.appendChild(deliveryContent);
				}
				else
					BX.cleanNode(deliveryContent);

				this.getErrorContainer(deliveryContent);

				deliveryNode = BX.create('DIV', {props: {className: 'bx-soa-pp row'}});
				this.editDeliveryItems(deliveryNode);
				deliveryContent.appendChild(deliveryNode);
				this.editDeliveryInfo(deliveryNode);

				if (this.params.SHOW_COUPONS_DELIVERY == 'Y')
					this.editCoupons(deliveryContent);

				this.getBlockFooter(deliveryContent);
			}
		},

		editDeliveryItems: function(deliveryNode)
		{
			if (!this.result.DELIVERY || this.result.DELIVERY.length <= 0)
				return;

			var deliveryItemsContainer = BX.create('DIV', {props: {className: 'col-sm-7 bx-soa-pp-item-container'}}),
				deliveryItemNode, k;

			for (k = 0; k < this.deliveryPagination.currentPage.length; k++)
			{
				deliveryItemNode = this.createDeliveryItem(this.deliveryPagination.currentPage[k]);
				deliveryItemsContainer.appendChild(deliveryItemNode);
			}

			if (this.deliveryPagination.show)
				this.showPagination('delivery', deliveryItemsContainer);

			deliveryNode.appendChild(deliveryItemsContainer);
		},

		editDeliveryInfo: function(deliveryNode)
		{
			if (!this.result.DELIVERY)
				return;

			var deliveryInfoContainer = BX.create('DIV', {props: {className: 'col-sm-5 bx-soa-pp-desc-container'}}),
				currentDelivery, logotype, name, logoNode,
				subTitle, label, title, price, period,
				clear, infoList, extraServices, extraServicesNode;

			BX.cleanNode(deliveryInfoContainer);
			currentDelivery = this.getSelectedDelivery();

			logoNode = BX.create('DIV', {props: {className: 'bx-soa-pp-company-image'}});
			logotype = this.getImageSources(currentDelivery, 'LOGOTIP');
			if (logotype && logotype.src_2x)
			{
				logoNode.setAttribute('style',
					'background-image: url(' + logotype.src_1x + ');' +
					'background-image: -webkit-image-set(url(' + logotype.src_1x + ') 1x, url(' + logotype.src_2x + ') 2x)'
				);
			}
			else
			{
				logotype = logotype && logotype.src_1x || this.defaultDeliveryLogo;
				logoNode.setAttribute('style', 'background-image: url(' + logotype + ');');
			}

			name = this.params.SHOW_DELIVERY_PARENT_NAMES != 'N' ? currentDelivery.NAME : currentDelivery.OWN_NAME;

			if (this.params.SHOW_DELIVERY_INFO_NAME == 'Y')
				subTitle = BX.create('DIV', {props: {className: 'bx-soa-pp-company-subTitle'}, text: name});

			label = BX.create('DIV', {
				props: {className: 'bx-soa-pp-company-logo'},
				children: [
					BX.create('DIV', {
						props: {className: 'bx-soa-pp-company-graf-container'},
						children: [logoNode]
					})
				]
			});
			title = BX.create('DIV', {
				props: {className: 'bx-soa-pp-company-block'},
				children: [
					BX.create('DIV', {props: {className: 'bx-soa-pp-company-desc'}, html: currentDelivery.DESCRIPTION}),
					currentDelivery.CALCULATE_DESCRIPTION
						? BX.create('DIV', {props: {className: 'bx-soa-pp-company-desc'}, html: currentDelivery.CALCULATE_DESCRIPTION})
						: null
				]
			});

			if (currentDelivery.PRICE >= 0)
			{
				price = BX.create('LI', {
					children: [
						BX.create('DIV', {
							props: {className: 'bx-soa-pp-list-termin'},
							html: this.params.MESS_PRICE + ':'
						}),
						BX.create('DIV', {
							props: {className: 'bx-soa-pp-list-description'},
							children: this.getDeliveryPriceNodes(currentDelivery)
						})
					]
				});
			}

			if (currentDelivery.PERIOD_TEXT && currentDelivery.PERIOD_TEXT.length)
			{
				period = BX.create('LI', {
					children: [
						BX.create('DIV', {props: {className: 'bx-soa-pp-list-termin'}, html: this.params.MESS_PERIOD + ':'}),
						BX.create('DIV', {props: {className: 'bx-soa-pp-list-description'}, html: currentDelivery.PERIOD_TEXT})
					]
				});
			}

			clear = BX.create('DIV', {style: {clear: 'both'}});
			infoList = BX.create('UL', {props: {className: 'bx-soa-pp-list'}, children: [price, period]});
			extraServices = this.getDeliveryExtraServices(currentDelivery);

			if (extraServices.length)
			{
				extraServicesNode = BX.create('DIV', {
					props: {className: 'bx-soa-pp-company-block'},
					children: extraServices
				});
			}

			deliveryInfoContainer.appendChild(
				BX.create('DIV', {
					props: {className: 'bx-soa-pp-company'},
					children: [subTitle, label, title, clear, extraServicesNode, infoList]
				})
			);
			deliveryNode.appendChild(deliveryInfoContainer);

			if (this.params.DELIVERY_NO_AJAX != 'Y')
				this.deliveryCachedInfo[currentDelivery.ID] = currentDelivery;
		},

		getDeliveryPriceNodes: function(delivery)
		{
			var priceNodesArray;

			if (typeof delivery.DELIVERY_DISCOUNT_PRICE !== 'undefined'
				&& parseFloat(delivery.DELIVERY_DISCOUNT_PRICE) != parseFloat(delivery.PRICE))
			{
				if (parseFloat(delivery.DELIVERY_DISCOUNT_PRICE) > parseFloat(delivery.PRICE))
					priceNodesArray = [delivery.DELIVERY_DISCOUNT_PRICE_FORMATED];
				else
					priceNodesArray = [
						delivery.DELIVERY_DISCOUNT_PRICE_FORMATED,
						BX.create('BR'),
						BX.create('SPAN', {props: {className: 'bx-price-old'}, html: delivery.PRICE_FORMATED})
					];
			}
			else
			{
				priceNodesArray = [delivery.PRICE_FORMATED];
			}

			return priceNodesArray;
		},

		getDeliveryExtraServices: function(delivery)
		{
			var extraServices = [], brake = false,
				i, currentService, serviceNode, serviceName, input;

			for (i in delivery.EXTRA_SERVICES)
			{
				if (!delivery.EXTRA_SERVICES.hasOwnProperty(i))
					continue;

				currentService = delivery.EXTRA_SERVICES[i];

				if (!currentService.canUserEditValue)
					continue;

				if (currentService.editControl.indexOf('this.checked') == -1)
				{
					serviceName = BX.create('LABEL', {
						html: BX.util.htmlspecialchars(currentService.name)
						+ (currentService.price ? ' (' + currentService.priceFormatted + ')' : '')
					});

					if (i == 0)
						brake = true;

					serviceNode = BX.create('DIV', {
						props: {className: 'form-group bx-soa-pp-field'},
						html: currentService.editControl
						+ (currentService.description && currentService.description.length
							? '<div class="bx-soa-service-small">' + BX.util.htmlspecialchars(currentService.description) + '</div>'
							: '')
					});

					BX.prepend(serviceName, serviceNode);
					input = serviceNode.querySelector('input[type=text]');
					if (!input)
						input = serviceNode.querySelector('select');

					if (input)
						BX.addClass(input, 'form-control');
				}
				else
				{
					serviceNode = BX.create('DIV', {
						props: {className: 'checkbox'},
						children: [
							BX.create('LABEL', {
								html: currentService.editControl + BX.util.htmlspecialchars(currentService.name)
								+ (currentService.price ? ' (' + currentService.priceFormatted + ')' : '')
								+ (currentService.description && currentService.description.length
									? '<div class="bx-soa-service-small">' + BX.util.htmlspecialchars(currentService.description) + '</div>'
									: '')
							})
						]
					});
				}

				extraServices.push(serviceNode);
			}

			brake && extraServices.unshift(BX.create('BR'));

			return extraServices;
		},

		editFadeDeliveryBlock: function()
		{
			var deliveryContent = this.deliveryBlockNode.querySelector('.bx-soa-section-content'), newContent;

			if (this.initialized.delivery)
			{
				this.deliveryHiddenBlockNode.appendChild(deliveryContent);
			}
			else
			{
				this.editActiveDeliveryBlock(false);
				BX.remove(BX.lastChild(this.deliveryBlockNode));
			}

			newContent = this.getNewContainer(true);
			this.deliveryBlockNode.appendChild(newContent);

			this.editFadeDeliveryContent(newContent);

			if (this.params.SHOW_COUPONS_DELIVERY == 'Y')
				this.editCouponsFade(newContent);
		},

		createDeliveryItem: function(item)
		{
			var checked = item.CHECKED == 'Y',
				deliveryId = parseInt(item.ID),
				labelNodes = [
					BX.create('INPUT', {
						props: {
							id: 'ID_DELIVERY_ID_' + deliveryId,
							name: 'DELIVERY_ID',
							type: 'checkbox',
							className: 'bx-soa-pp-company-checkbox',
							value: deliveryId,
							checked: checked
						}
					})
				],
				deliveryCached = this.deliveryCachedInfo[deliveryId],
				logotype, label, title, itemNode, logoNode;

			logoNode = BX.create('DIV', {props: {className: 'bx-soa-pp-company-image'}});
			logotype = this.getImageSources(item, 'LOGOTIP');
			if (logotype && logotype.src_2x)
			{
				logoNode.setAttribute('style',
					'background-image: url(' + logotype.src_1x + ');' +
					'background-image: -webkit-image-set(url(' + logotype.src_1x + ') 1x, url(' + logotype.src_2x + ') 2x)'
				);
			}
			else
			{
				logotype = logotype && logotype.src_1x || this.defaultDeliveryLogo;
				logoNode.setAttribute('style', 'background-image: url(' + logotype + ');');
			}
			labelNodes.push(logoNode);

			if (item.PRICE >= 0 || typeof item.DELIVERY_DISCOUNT_PRICE !== 'undefined')
			{
				labelNodes.push(
					BX.create('DIV', {
						props: {className: 'bx-soa-pp-delivery-cost'},
						html: typeof item.DELIVERY_DISCOUNT_PRICE !== 'undefined'
							? item.DELIVERY_DISCOUNT_PRICE_FORMATED
							: item.PRICE_FORMATED})
				);
			}
			else if (deliveryCached && (deliveryCached.PRICE >= 0 || typeof deliveryCached.DELIVERY_DISCOUNT_PRICE !== 'undefined'))
			{
				labelNodes.push(
					BX.create('DIV', {
						props: {className: 'bx-soa-pp-delivery-cost'},
						html: typeof deliveryCached.DELIVERY_DISCOUNT_PRICE !== 'undefined'
							? deliveryCached.DELIVERY_DISCOUNT_PRICE_FORMATED
							: deliveryCached.PRICE_FORMATED})
				);
			}

			label = BX.create('DIV', {
				props: {
					className: 'bx-soa-pp-company-graf-container'
					+ (item.CALCULATE_ERRORS || deliveryCached && deliveryCached.CALCULATE_ERRORS ? ' bx-bd-waring' : '')},
				children: labelNodes
			});

			if (this.params.SHOW_DELIVERY_LIST_NAMES == 'Y')
			{
				title = BX.create('DIV', {
					props: {className: 'bx-soa-pp-company-smalltitle'},
					text: this.params.SHOW_DELIVERY_PARENT_NAMES != 'N' ? item.NAME : item.OWN_NAME
				});
			}

			itemNode = BX.create('DIV', {
				props: {className: 'bx-soa-pp-company col-lg-4 col-sm-4 col-xs-6'},
				children: [label, title],
				events: {click: BX.proxy(this.selectDelivery, this)}
			});
			checked && BX.addClass(itemNode, 'bx-selected');

			if (checked && this.result.LAST_ORDER_DATA.PICK_UP)
				this.lastSelectedDelivery = deliveryId;

			return itemNode;
		},

		editFadeDeliveryContent: function(node)
		{
			var selectedDelivery = this.getSelectedDelivery(),
				name = this.params.SHOW_DELIVERY_PARENT_NAMES != 'N' ? selectedDelivery.NAME : selectedDelivery.OWN_NAME,
				errorNode = this.deliveryHiddenBlockNode.querySelector('div.alert.alert-danger'),
				warningNode = this.deliveryHiddenBlockNode.querySelector('div.alert.alert-warning.alert-show'),
				extraService, logotype, imgSrc, arNodes, i;

			if (errorNode && errorNode.innerHTML)
				node.appendChild(errorNode.cloneNode(true));
			else
				this.getErrorContainer(node);

			if (warningNode && warningNode.innerHTML)
				node.appendChild(warningNode.cloneNode(true));

			if (selectedDelivery && selectedDelivery.NAME)
			{
				logotype = this.getImageSources(selectedDelivery, 'LOGOTIP');
				imgSrc = logotype && logotype.src_1x || this.defaultDeliveryLogo;
				arNodes = [
					BX.create('IMG', {props: {src: imgSrc, alt: ''}, style: {height: '18px'}}),
					BX.create('STRONG', {text: name})
				];

				if (this.params.DELIVERY_FADE_EXTRA_SERVICES == 'Y' && BX.util.object_keys(selectedDelivery.EXTRA_SERVICES).length)
				{
					arNodes.push(BX.create('BR'));

					for (i in selectedDelivery.EXTRA_SERVICES)
					{
						if (selectedDelivery.EXTRA_SERVICES.hasOwnProperty(i))
						{
							extraService = selectedDelivery.EXTRA_SERVICES[i];
							if (extraService.value && extraService.value != 'N' && extraService.canUserEditValue)
							{
								arNodes.push(BX.create('BR'));
								arNodes.push(BX.create('STRONG', {text: extraService.name + ': '}));
								arNodes.push(extraService.viewControl);
							}
						}
					}
				}

				node.appendChild(
					BX.create('DIV', {
						props: {className: 'col-sm-9 bx-soa-pp-company-selected'},
						children: arNodes
					})
				);
				node.appendChild(
					BX.create('DIV', {
						props: {className: 'col-sm-3 bx-soa-pp-price'},
						children: this.getDeliveryPriceNodes(selectedDelivery)
					})
				);
			}
			else
				node.appendChild(BX.create('STRONG', {text: BX.message('SOA_DELIVERY_SELECT_ERROR')}));

			node.appendChild(BX.create('DIV', {style: {clear: 'both'}}));
			BX.bind(node.querySelector('.alert.alert-danger'), 'click', BX.proxy(this.showByClick, this));
			BX.bind(node.querySelector('.alert.alert-warning'), 'click', BX.proxy(this.showByClick, this));
		},

		selectDelivery: function(event)
		{
			if (!this.orderBlockNode)
				return;

			var target = event.target || event.srcElement,
				actionSection =  BX.hasClass(target, 'bx-soa-pp-company') ? target : BX.findParent(target, {className: 'bx-soa-pp-company'}),
				selectedSection = this.deliveryBlockNode.querySelector('.bx-soa-pp-company.bx-selected'),
				actionInput, selectedInput;

			if (BX.hasClass(actionSection, 'bx-selected'))
				return BX.PreventDefault(event);

			if (actionSection)
			{
				actionInput = actionSection.querySelector('input[type=checkbox]');
				BX.addClass(actionSection, 'bx-selected');
				actionInput.checked = true;
			}
			if (selectedSection)
			{
				selectedInput = selectedSection.querySelector('input[type=checkbox]');
				BX.removeClass(selectedSection, 'bx-selected');
				selectedInput.checked = false;
			}

			this.sendRequest();
		},

		getSelectedDelivery: function()
		{
			var deliveryCheckbox = this.deliveryBlockNode.querySelector('input[type=checkbox][name=DELIVERY_ID]:checked'),
				currentDelivery = false,
				deliveryId, i;

			if (!deliveryCheckbox)
				deliveryCheckbox = this.deliveryHiddenBlockNode.querySelector('input[type=checkbox][name=DELIVERY_ID]:checked');

			if (!deliveryCheckbox)
				deliveryCheckbox = this.deliveryHiddenBlockNode.querySelector('input[type=hidden][name=DELIVERY_ID]');

			if (deliveryCheckbox)
			{
				deliveryId = deliveryCheckbox.value;

				for (i in this.result.DELIVERY)
				{
					if (this.result.DELIVERY[i].ID == deliveryId)
					{
						currentDelivery = this.result.DELIVERY[i];
						break;
					}
				}
			}

			return currentDelivery;
		},

		activatePickUp: function(deliveryName)
		{
			if (!this.pickUpBlockNode || !this.pickUpHiddenBlockNode)
				return;

			this.pickUpBlockNode.style.display = '';
			this.pickUpBlockNode.querySelector('h2.bx-soa-section-title').innerHTML =
				'<span class="bx-soa-section-title-count"></span>' + BX.util.htmlspecialchars(deliveryName);

			if (BX.hasClass(this.pickUpBlockNode, 'bx-active'))
				return;

			BX.addClass(this.pickUpBlockNode, 'bx-active');
			this.pickUpBlockNode.style.display = '';
		},

		deactivatePickUp: function()
		{
			if (!this.pickUpBlockNode || !this.pickUpHiddenBlockNode)
				return;

			if (!BX.hasClass(this.pickUpBlockNode, 'bx-active'))
				return;

			BX.removeClass(this.pickUpBlockNode, 'bx-active');
			this.pickUpBlockNode.style.display = 'none';
		},

		editPickUpBlock: function(active)
		{
			if (!this.pickUpBlockNode || !this.pickUpHiddenBlockNode || !BX.hasClass(this.pickUpBlockNode, 'bx-active') || !this.result.DELIVERY)
				return;

			this.initialized.pickup = false;

			if (active)
				this.editActivePickUpBlock(true);
			else
				this.editFadePickUpBlock();

			this.initialized.pickup = true;
		},

		editActivePickUpBlock: function(activeNodeMode)
		{
			var node = activeNodeMode ? this.pickUpBlockNode : this.pickUpHiddenBlockNode,
				pickUpContent, pickUpContentCol;

			if (this.initialized.pickup)
			{
				BX.remove(BX.lastChild(node));
				node.appendChild(BX.firstChild(this.pickUpHiddenBlockNode));

				if (
					this.params.SHOW_NEAREST_PICKUP === 'Y'
					&& this.maps
					&& !this.maps.maxWaitTimeExpired
				)
				{
					this.maps.maxWaitTimeExpired = true;
					this.initPickUpPagination();
					this.editPickUpList(true);
					this.pickUpFinalAction();
				}

				if (this.maps && !this.pickUpMapFocused)
				{
					this.pickUpMapFocused = true;
					setTimeout(BX.proxy(this.maps.pickUpMapFocusWaiter, this.maps), 200);
				}
			}
			else
			{
				pickUpContent = node.querySelector('.bx-soa-section-content');
				if (!pickUpContent)
				{
					pickUpContent = this.getNewContainer();
					node.appendChild(pickUpContent);
				}
				BX.cleanNode(pickUpContent);

				pickUpContentCol = BX.create('DIV', {props: {className: 'col-xs-12'}});
				this.editPickUpMap(pickUpContentCol);
				this.editPickUpLoader(pickUpContentCol);

				pickUpContent.appendChild(
					BX.create('DIV', {
						props: {className: 'bx_soa_pickup row'},
						children: [pickUpContentCol]
					})
				);

				if (this.params.SHOW_PICKUP_MAP != 'Y' || this.params.SHOW_NEAREST_PICKUP != 'Y')
				{
					this.initPickUpPagination();
					this.editPickUpList(true);
					this.pickUpFinalAction();
				}

				this.getBlockFooter(pickUpContent);
			}
		},

		editFadePickUpBlock: function()
		{
			var pickUpContent = this.pickUpBlockNode.querySelector('.bx-soa-section-content'), newContent;

			if (this.initialized.pickup)
			{
				this.pickUpHiddenBlockNode.appendChild(pickUpContent);
			}
			else
			{
				this.editActivePickUpBlock(false);
				BX.remove(BX.lastChild(this.pickUpBlockNode));
			}

			newContent = this.getNewContainer();
			this.pickUpBlockNode.appendChild(newContent);

			this.editFadePickUpContent(newContent);
		},

		editFadePickUpContent: function(pickUpContainer)
		{
			var selectedPickUp = this.getSelectedPickUp(), html = '', logotype, imgSrc;

			if (selectedPickUp)
			{
				if (this.params.SHOW_STORES_IMAGES == 'Y')
				{
					logotype = this.getImageSources(selectedPickUp, 'IMAGE_ID');
					imgSrc = logotype.src_1x || this.defaultStoreLogo;

					html += '<img src="' + imgSrc + '" class="bx-soa-pickup-preview-img">';
				}

				html += '<strong>' + BX.util.htmlspecialchars(selectedPickUp.TITLE) + '</strong>';
				if (selectedPickUp.ADDRESS)
					html += '<br><strong>' + BX.message('SOA_PICKUP_ADDRESS') + ':</strong> ' + BX.util.htmlspecialchars(selectedPickUp.ADDRESS);

				if (selectedPickUp.PHONE)
					html += '<br><strong>' + BX.message('SOA_PICKUP_PHONE') + ':</strong> ' + BX.util.htmlspecialchars(selectedPickUp.PHONE);

				if (selectedPickUp.SCHEDULE)
					html += '<br><strong>' + BX.message('SOA_PICKUP_WORK') + ':</strong> ' + BX.util.htmlspecialchars(selectedPickUp.SCHEDULE);

				if (selectedPickUp.DESCRIPTION)
					html += '<br><strong>' + BX.message('SOA_PICKUP_DESC') + ':</strong> ' + BX.util.htmlspecialchars(selectedPickUp.DESCRIPTION);

				pickUpContainer.innerHTML = html;

				if (this.params.SHOW_STORES_IMAGES == 'Y')
				{
					BX.bind(pickUpContainer.querySelector('.bx-soa-pickup-preview-img'), 'click', BX.delegate(function(e){
						this.popupShow(e, logotype && logotype.src_orig || imgSrc);
					}, this));
				}
			}
		},

		getPickUpInfoArray: function(storeIds)
		{
			if (!storeIds || storeIds.length <= 0)
				return [];

			var arr = [], i;

			for (i = 0; i < storeIds.length; i++)
				if (this.result.STORE_LIST[storeIds[i]])
					arr.push(this.result.STORE_LIST[storeIds[i]]);

			return arr;
		},

		getSelectedPickUp: function()
		{
			var pickUpInput = BX('BUYER_STORE'),
				currentPickUp, pickUpId,
				allStoresList = this.result.STORE_LIST,
				stores, i;

			if (pickUpInput)
			{
				pickUpId = pickUpInput.value;
				currentPickUp = allStoresList[pickUpId];

				if (!currentPickUp)
				{
					stores = this.getSelectedDelivery().STORE;
					if (stores)
					{
						for (i in stores)
						{
							if (stores.hasOwnProperty(i))
							{
								currentPickUp = allStoresList[stores[i]];
								pickUpInput.setAttribute('value', stores[i]);
								break;
							}
						}
					}
				}
			}

			return currentPickUp;
		},

		/**
		 * Checking delivery for pick ups. Displaying/hiding pick up block node.
		 */
		checkPickUpShow: function()
		{
			var currentDelivery = this.getSelectedDelivery(), name, stores;

			if (currentDelivery && currentDelivery.STORE && currentDelivery.STORE.length)
				stores = this.getPickUpInfoArray(currentDelivery.STORE);

			if (stores && stores.length)
			{
				name = this.params.SHOW_DELIVERY_PARENT_NAMES != 'N' ? currentDelivery.NAME : currentDelivery.OWN_NAME;
				currentDelivery.STORE_MAIN = currentDelivery.STORE;
				this.activatePickUp(name);
				this.editSection(this.pickUpBlockNode);
			}
			else
			{
				this.deactivatePickUp();
			}
		},

		geoLocationSuccessCallback: function(result)
		{
			var activeStores,
				currentDelivery = this.getSelectedDelivery();

			if (currentDelivery && currentDelivery.STORE)
			{
				activeStores = this.getPickUpInfoArray(currentDelivery.STORE);
			}

			if (activeStores && activeStores.length >= this.options.pickUpMap.minToShowNearestBlock)
			{
				this.editPickUpRecommendList(result.geoObjects.get(0));
			}

			this.initPickUpPagination();
			this.editPickUpList(true);
			this.pickUpFinalAction();
		},

		geoLocationFailCallback: function()
		{
			this.initPickUpPagination();
			this.editPickUpList(true);
			this.pickUpFinalAction();
		},

		initMaps: function()
		{
			this.maps = BX.Sale.OrderAjaxComponent.Maps.init(this);
			if (this.maps)
			{
				this.mapsReady = true;
				this.resizeMapContainers();

				if (this.params.SHOW_PICKUP_MAP === 'Y' && BX('pickUpMap'))
				{
					var currentDelivery = this.getSelectedDelivery();
					if (currentDelivery && currentDelivery.STORE && currentDelivery.STORE.length)
					{
						var activeStores = this.getPickUpInfoArray(currentDelivery.STORE);
					}

					if (activeStores && activeStores.length)
					{
						var selected = this.getSelectedPickUp();
						this.maps.initializePickUpMap(selected);

						if (this.params.SHOW_NEAREST_PICKUP === 'Y')
						{
							this.maps.showNearestPickups(BX.proxy(this.geoLocationSuccessCallback, this), BX.proxy(this.geoLocationFailCallback, this));
						}

						this.maps.buildBalloons(activeStores);
					}
				}

				if (this.params.SHOW_MAP_IN_PROPS === 'Y' && BX('propsMap'))
				{
					var propsMapData = this.getPropertyMapData();
					this.maps.initializePropsMap(propsMapData);
				}
			}
		},

		getPropertyMapData: function()
		{
			var currentProperty, locationId, k;
			var data = this.options.propertyMap.defaultMapPosition;

			for (k in this.result.ORDER_PROP.properties)
			{
				if (this.result.ORDER_PROP.properties.hasOwnProperty(k))
				{
					currentProperty = this.result.ORDER_PROP.properties[k];
					if (currentProperty.IS_LOCATION == 'Y')
					{
						locationId = currentProperty.ID;
						break;
					}
				}
			}

			if (this.locations[locationId] && this.locations[locationId][0] && this.locations[locationId][0].coordinates)
			{
				currentProperty = this.locations[locationId][0].coordinates;

				var long = parseFloat(currentProperty.LONGITUDE),
					lat = parseFloat(currentProperty.LATITUDE);

				if (!isNaN(long) && !isNaN(lat) && long != 0 && lat != 0)
				{
					data.lon = long;
					data.lat = lat;
				}
			}

			return data;
		},

		resizeMapContainers: function()
		{
			var pickUpMapContainer = BX('pickUpMap'),
				propertyMapContainer = BX('propsMap'),
				resizeBy = this.propsBlockNode,
				width, height;

			if (resizeBy && (pickUpMapContainer || propertyMapContainer))
			{
				width = resizeBy.clientWidth;
				height = parseInt(width / 16 * 9);

				if (this.params.SHOW_PICKUP_MAP === 'Y' && pickUpMapContainer)
				{
					pickUpMapContainer.style.height = height + 'px';
				}

				if (this.params.SHOW_MAP_IN_PROPS === 'Y' && propertyMapContainer)
				{
					propertyMapContainer.style.height = height + 'px';
				}
			}
		},

		editPickUpMap: function(pickUpContent)
		{
			pickUpContent.appendChild(BX.create('DIV', {
				props: {id: 'pickUpMap'},
				style: {width: '100%', marginBottom: '10px'}
			}));
		},

		editPickUpLoader: function(pickUpContent)
		{
			pickUpContent.appendChild(
				BX.create('DIV', {
					props: {id: 'pickUpLoader', className: 'text-center'},
					children: [BX.create('IMG', {props: {src: this.templateFolder + '/images/loader.gif'}})]
				})
			);
		},

		editPickUpList: function(isNew)
		{
			if (!this.pickUpPagination.currentPage || !this.pickUpPagination.currentPage.length)
				return;

			BX.remove(BX('pickUpLoader'));

			var pickUpList = BX.create('DIV', {props: {className: 'bx-soa-pickup-list main'}}),
				buyerStoreInput = BX('BUYER_STORE'),
				selectedStore,
				container, i, found = false,
				recommendList, selectedDelivery, currentStore, storeNode;

			if (buyerStoreInput)
				selectedStore = buyerStoreInput.value;

			recommendList = this.pickUpBlockNode.querySelector('.bx-soa-pickup-list.recommend');
			if (!recommendList)
				recommendList = this.pickUpHiddenBlockNode.querySelector('.bx-soa-pickup-list.recommend');

			if (!recommendList || !recommendList.querySelector('.bx-soa-pickup-list-item.bx-selected'))
			{
				selectedDelivery = this.getSelectedDelivery();
				if (selectedDelivery && selectedDelivery.STORE)
				{
					for (i = 0; i < selectedDelivery.STORE.length; i++)
						if (selectedDelivery.STORE[i] == selectedStore)
							found = true;
				}
			}
			else
				found = true;

			for (i = 0; i < this.pickUpPagination.currentPage.length; i++)
			{
				currentStore = this.pickUpPagination.currentPage[i];

				if (currentStore.ID == selectedStore || parseInt(selectedStore) == 0 || !found)
				{
					selectedStore = buyerStoreInput.value = currentStore.ID;
					found = true;
				}

				storeNode = this.createPickUpItem(currentStore, {selected: currentStore.ID == selectedStore});
				pickUpList.appendChild(storeNode);
			}

			if (!!isNew)
			{
				container = this.pickUpHiddenBlockNode.querySelector('.bx_soa_pickup>.col-xs-12');
				if (!container)
					container = this.pickUpBlockNode.querySelector('.bx_soa_pickup>.col-xs-12');

				container.appendChild(
					BX.create('DIV', {
						props: {className: 'bx-soa-pickup-subTitle'},
						html: this.params.MESS_PICKUP_LIST
					})
				);
				container.appendChild(pickUpList);
			}
			else
			{
				container = this.pickUpBlockNode.querySelector('.bx-soa-pickup-list.main');
				BX.insertAfter(pickUpList, container);
				BX.remove(container);
			}

			this.pickUpPagination.show && this.showPagination('pickUp', pickUpList);
		},

		pickUpFinalAction: function()
		{
			var selectedDelivery = this.getSelectedDelivery(),
				deliveryChanged;

			if (selectedDelivery)
			{
				deliveryChanged = this.lastSelectedDelivery !== parseInt(selectedDelivery.ID);
				this.lastSelectedDelivery = parseInt(selectedDelivery.ID);
			}

			if (deliveryChanged && this.pickUpBlockNode.id !== this.activeSectionId)
			{
				if (this.pickUpBlockNode.id !== this.activeSectionId)
				{
					this.editFadePickUpContent(BX.lastChild(this.pickUpBlockNode));
				}

				BX.removeClass(this.pickUpBlockNode, 'bx-step-completed');
			}

			this.maps && this.maps.pickUpFinalAction();
		},

		getStoreInfoHtml: function(currentStore)
		{
			var html = '';

			if (currentStore.ADDRESS)
				html += BX.message('SOA_PICKUP_ADDRESS') + ': ' + BX.util.htmlspecialchars(currentStore.ADDRESS) + '<br>';

			if (currentStore.PHONE)
				html += BX.message('SOA_PICKUP_PHONE') + ': ' + BX.util.htmlspecialchars(currentStore.PHONE) + '<br>';

			if (currentStore.SCHEDULE)
				html += BX.message('SOA_PICKUP_WORK') + ': ' + BX.util.htmlspecialchars(currentStore.SCHEDULE) + '<br>';

			if (currentStore.DESCRIPTION)
				html += BX.message('SOA_PICKUP_DESC') + ': ' + BX.util.htmlspecialchars(currentStore.DESCRIPTION) + '<br>';

			return html;
		},

		createPickUpItem: function(currentStore, options)
		{
			options = options || {};

			var imgClassName = 'bx-soa-pickup-l-item-detail',
				buttonClassName = 'bx-soa-pickup-l-item-btn',
				logoNode, logotype, html, storeNode, imgSrc;

			if (this.params.SHOW_STORES_IMAGES === 'Y')
			{
				logotype = this.getImageSources(currentStore, 'IMAGE_ID');
				imgSrc = logotype && logotype.src_1x || this.defaultStoreLogo;
				logoNode = BX.create('IMG', {
					props: {
						src: imgSrc,
						className: 'bx-soa-pickup-l-item-img'
					},
					events: {
						click: BX.delegate(function(e){
							this.popupShow(e, logotype && logotype.src_orig || imgSrc);
						}, this)
					}
				});
			}
			else
			{
				imgClassName += ' no-image';
				buttonClassName += ' no-image';
			}

			html = this.getStoreInfoHtml(currentStore);
			storeNode = BX.create('DIV', {
				props: {className: 'bx-soa-pickup-list-item', id: 'store-' + currentStore.ID},
				children: [
					BX.create('DIV', {
						props: {className: 'bx-soa-pickup-l-item-adress'},
						children: options.distance ? [
							BX.util.htmlspecialchars(currentStore.ADDRESS),
							' ( ~' + options.distance + ' ' + BX.message('SOA_DISTANCE_KM') + ' ) '
						] : [BX.util.htmlspecialchars(currentStore.ADDRESS)]
					}),
					BX.create('DIV', {
						props: {className: imgClassName},
						children: [
							logoNode,
							BX.create('DIV', {props: {className: 'bx-soa-pickup-l-item-name'}, text: currentStore.TITLE}),
							BX.create('DIV', {props: {className: 'bx-soa-pickup-l-item-desc'}, html: html})
						]
					}),
					BX.create('DIV', {
						props: {className: buttonClassName},
						children: [
							BX.create('A', {
								props: {href: '', className: 'btn btn-sm btn-default'},
								html: this.params.MESS_SELECT_PICKUP,
								events: {
									click: BX.delegate(function(event){
										this.selectStore(event);
										this.clickNextAction(event)
									}, this)
								}
							})
						]
					})
				],
				events: {
					click: BX.proxy(this.selectStore, this)
				}
			});

			if (options.selected)
				BX.addClass(storeNode, 'bx-selected');

			return storeNode;
		},

		editPickUpRecommendList: function(geoLocation)
		{
			if (!this.maps || !this.maps.canUseRecommendList() || !geoLocation)
			{
				return;
			}

			BX.remove(BX('pickUpLoader'));

			var recommendList = BX.create('DIV', {props: {className: 'bx-soa-pickup-list recommend'}}),
				buyerStoreInput = BX('BUYER_STORE'),
				selectedDelivery = this.getSelectedDelivery();

			var i, currentStore, currentStoreId, distance, storeNode, container;

			var recommendedStoreIds = this.maps.getRecommendedStoreIds(geoLocation);
			for (i = 0; i < recommendedStoreIds.length; i++)
			{
				currentStoreId = recommendedStoreIds[i];
				currentStore = this.getPickUpInfoArray([currentStoreId])[0];

				if (i === 0 && parseInt(selectedDelivery.ID) !== this.lastSelectedDelivery)
				{
					buyerStoreInput.value = parseInt(currentStoreId);
				}

				distance = this.maps.getDistance(geoLocation, currentStoreId);
				storeNode = this.createPickUpItem(currentStore, {
					selected: buyerStoreInput.value === currentStoreId,
					distance: distance
				});
				recommendList.appendChild(storeNode);

				if (selectedDelivery.STORE_MAIN)
				{
					selectedDelivery.STORE_MAIN.splice(selectedDelivery.STORE_MAIN.indexOf(currentStoreId), 1);
				}
			}

			container = this.pickUpHiddenBlockNode.querySelector('.bx_soa_pickup>.col-xs-12');
			if (!container)
			{
				container = this.pickUpBlockNode.querySelector('.bx_soa_pickup>.col-xs-12');
			}

			container.appendChild(
				BX.create('DIV', {
					props: {className: 'bx-soa-pickup-subTitle'},
					html: this.params.MESS_NEAREST_PICKUP_LIST
				})
			);
			container.appendChild(recommendList);
		},

		selectStore: function(event)
		{
			var storeItem,
				storeInput = BX('BUYER_STORE'),
				selectedPickUp, storeItemId, i, k, page,
				target, h1, h2;

			if (BX.type.isString(event))
			{
				storeItem = BX('store-' + event);
				if (!storeItem)
				{
					for (i = 0; i < this.pickUpPagination.pages.length; i++)
					{
						page = this.pickUpPagination.pages[i];
						for (k = 0; k < page.length; k++)
						{
							if (page[k].ID == event)
							{
								this.showPickUpItemsPage(++i);
								break;
							}
						}
					}
					storeItem = BX('store-' + event);
				}
			}
			else
			{
				target = event.target || event.srcElement;
				storeItem = BX.hasClass(target, 'bx-soa-pickup-list-item')
					? target
					: BX.findParent(target, {className: 'bx-soa-pickup-list-item'});
			}

			if (storeItem && storeInput)
			{
				if (BX.hasClass(storeItem, 'bx-selected'))
					return;

				selectedPickUp = this.pickUpBlockNode.querySelector('.bx-selected');
				storeItemId = storeItem.id.substr('store-'.length);

				BX.removeClass(selectedPickUp, 'bx-selected');

				h1 = storeItem.clientHeight;
				storeItem.style.overflow = 'hidden';
				BX.addClass(storeItem, 'bx-selected');
				h2 = storeItem.clientHeight;
				storeItem.style.height = h1 + 'px';

				new BX.easing({
					duration: 300,
					start: {height: h1, opacity: 0},
					finish: {height: h2, opacity: 100},
					transition: BX.easing.transitions.quad,
					step: function(state){
						storeItem.style.height = state.height + "px";
					},
					complete: function(){
						storeItem.removeAttribute('style');
					}
				}).animate();

				storeInput.setAttribute('value', storeItemId);
				this.maps && this.maps.selectBalloon(storeItemId);
			}
		},

		getDeliverySortedArray: function(objDelivery)
		{
			var deliveries = [],
				problemDeliveries = [],
				sortFunc = function(a, b){
					var sort = parseInt(a.SORT) - parseInt(b.SORT);
					if (sort === 0)
					{
						return a.OWN_NAME.toLowerCase() > b.OWN_NAME.toLowerCase()
							? 1
							: (a.OWN_NAME.toLowerCase() < b.OWN_NAME.toLowerCase() ? -1 : 0);
					}
					else
					{
						return sort;
					}
				},
				k;

			for (k in objDelivery)
			{
				if (objDelivery.hasOwnProperty(k))
				{
					if (this.params.SHOW_NOT_CALCULATED_DELIVERIES === 'L' && objDelivery[k].CALCULATE_ERRORS)
					{
						problemDeliveries.push(objDelivery[k]);
					}
					else
					{
						deliveries.push(objDelivery[k]);
					}
				}
			}

			deliveries.sort(sortFunc);
			problemDeliveries.sort(sortFunc);

			return deliveries.concat(problemDeliveries);
		},

		editPropsBlock: function(active)
		{
			if (!this.propsBlockNode || !this.propsHiddenBlockNode || !this.result.ORDER_PROP)
				return;

			if (active)
				this.editActivePropsBlock(true);
			else
				this.editFadePropsBlock();

			this.initialized.props = true;
		},

		editActivePropsBlock: function(activeNodeMode)
		{
			var node = activeNodeMode ? this.propsBlockNode : this.propsHiddenBlockNode,
				propsContent, propsNode, selectedDelivery, showPropMap = false, i, validationErrors;

			if (this.initialized.props)
			{
				BX.remove(BX.lastChild(node));
				node.appendChild(BX.firstChild(this.propsHiddenBlockNode));
				this.maps && setTimeout(BX.proxy(this.maps.propsMapFocusWaiter, this.maps), 200);
			}
			else
			{
				propsContent = node.querySelector('.bx-soa-section-content');
				if (!propsContent)
				{
					propsContent = this.getNewContainer();
					node.appendChild(propsContent);
				}
				else
					BX.cleanNode(propsContent);

				this.getErrorContainer(propsContent);

				propsNode = BX.create('DIV', {props: {className: 'row'}});
				selectedDelivery = this.getSelectedDelivery();

				if (
					selectedDelivery && this.params.SHOW_MAP_IN_PROPS === 'Y'
					&& this.params.SHOW_MAP_FOR_DELIVERIES && this.params.SHOW_MAP_FOR_DELIVERIES.length
				)
				{
					for (i = 0; i < this.params.SHOW_MAP_FOR_DELIVERIES.length; i++)
					{
						if (parseInt(selectedDelivery.ID) === parseInt(this.params.SHOW_MAP_FOR_DELIVERIES[i]))
						{
							showPropMap = true;
							break;
						}
					}
				}

				this.editPropsItems(propsNode);
				showPropMap && this.editPropsMap(propsNode);

				if (this.params.HIDE_ORDER_DESCRIPTION !== 'Y')
				{
					this.editPropsComment(propsNode);
				}

				propsContent.appendChild(propsNode);
				this.getBlockFooter(propsContent);

				if (this.propsBlockNode.getAttribute('data-visited') === 'true')
				{
					validationErrors = this.isValidPropertiesBlock(true);
					if (validationErrors.length)
						BX.addClass(this.propsBlockNode, 'bx-step-error');
					else
						BX.removeClass(this.propsBlockNode, 'bx-step-error');
				}
			}
		},

		editFadePropsBlock: function()
		{
			var propsContent = this.propsBlockNode.querySelector('.bx-soa-section-content'), newContent;

			if (this.initialized.props)
			{
				this.propsHiddenBlockNode.appendChild(propsContent);
			}
			else
			{
				this.editActivePropsBlock(false);
				BX.remove(BX.lastChild(this.propsBlockNode));
			}

			newContent = this.getNewContainer();
			this.propsBlockNode.appendChild(newContent);

			this.editFadePropsContent(newContent);
		},

		editFadePropsContent: function(node)
		{
			if (!node || !this.locationsInitialized)
				return;

			var errorNode = this.propsHiddenBlockNode.querySelector('.alert'),
				personType = this.getSelectedPersonType(),
				fadeParamName, props,
				group, property, groupIterator, propsIterator, i, validPropsErrors;

			BX.cleanNode(node);

			if (errorNode)
				node.appendChild(errorNode.cloneNode(true));

			if (personType)
			{
				fadeParamName = 'PROPS_FADE_LIST_' + personType.ID;
				props = this.params[fadeParamName];
			}

			if (!props || props.length === 0)
			{
				node.innerHTML += '<strong>' + BX.message('SOA_ORDER_PROPS') + '</strong>';
			}
			else
			{
				groupIterator = this.fadedPropertyCollection.getGroupIterator();
				while (group = groupIterator())
				{
					propsIterator = group.getIterator();
					while (property = propsIterator())
					{
						for (i = 0; i < props.length; i++)
							if (props[i] == property.getId() && property.getSettings()['IS_ZIP'] != 'Y')
								this.getPropertyRowNode(property, node, true);
					}
				}
			}

			if (this.propsBlockNode.getAttribute('data-visited') === 'true')
			{
				validPropsErrors = this.isValidPropertiesBlock();
				if (validPropsErrors.length)
					this.showError(this.propsBlockNode, validPropsErrors);
			}

			BX.bind(node.querySelector('.alert.alert-danger'), 'click', BX.proxy(this.showByClick, this));
			BX.bind(node.querySelector('.alert.alert-warning'), 'click', BX.proxy(this.showByClick, this));
		},

		editPropsItems: function(propsNode)
		{
			if (!this.result.ORDER_PROP || !this.propertyCollection)
				return;

			var propsItemsContainer = BX.create('DIV', {props: {className: 'col-sm-12 bx-soa-customer'}}),
				group, property, groupIterator = this.propertyCollection.getGroupIterator(), propsIterator;

			if (!propsItemsContainer)
				propsItemsContainer = this.propsBlockNode.querySelector('.col-sm-12.bx-soa-customer');

			while (group = groupIterator())
			{
				propsIterator =  group.getIterator();
				while (property = propsIterator())
				{
					if (
						this.deliveryLocationInfo.loc == property.getId()
						|| this.deliveryLocationInfo.zip == property.getId()
						|| this.deliveryLocationInfo.city == property.getId()
					)
						continue;

					this.getPropertyRowNode(property, propsItemsContainer, false);
				}
			}

			propsNode.appendChild(propsItemsContainer);
		},

		getPropertyRowNode: function(property, propsItemsContainer, disabled)
		{
			var propsItemNode = BX.create('DIV'),
				textHtml = '',
				propertyType = property.getType() || '',
				propertyDesc = property.getDescription() || '',
				label;

			if (disabled)
			{
				propsItemNode.innerHTML = '<strong>' + BX.util.htmlspecialchars(property.getName()) + ':</strong> ';
			}
			else
			{
				BX.addClass(propsItemNode, "form-group bx-soa-customer-field");

				if (property.isRequired())
					textHtml += '<span class="bx-authform-starrequired">*</span> ';

				textHtml += BX.util.htmlspecialchars(property.getName());
				if (propertyDesc.length && propertyType != 'STRING' && propertyType != 'NUMBER' && propertyType != 'DATE')
					textHtml += ' <small>(' + BX.util.htmlspecialchars(propertyDesc) + ')</small>';

				label = BX.create('LABEL', {
					attrs: {'for': 'soa-property-' + property.getId()},
					props: {className: 'bx-soa-custom-label'},
					html: textHtml
				});
				propsItemNode.setAttribute('data-property-id-row', property.getId());
				propsItemNode.appendChild(label);
			}

			switch (propertyType)
			{
				case 'LOCATION':
					this.insertLocationProperty(property, propsItemNode, disabled);
					break;
				case 'DATE':
					this.insertDateProperty(property, propsItemNode, disabled);
					break;
				case 'FILE':
					this.insertFileProperty(property, propsItemNode, disabled);
					break;
				case 'STRING':
					this.insertStringProperty(property, propsItemNode, disabled);
					break;
				case 'ENUM':
					this.insertEnumProperty(property, propsItemNode, disabled);
					break;
				case 'Y/N':
					this.insertYNProperty(property, propsItemNode, disabled);
					break;
				case 'NUMBER':
					this.insertNumberProperty(property, propsItemNode, disabled);
			}

			propsItemsContainer.appendChild(propsItemNode);
		},

		insertLocationProperty: function(property, propsItemNode, disabled)
		{
			var propRow, propNodes, locationString, currentLocation, insertedLoc, propContainer, i, k, values = [];

			if (property.getId() in this.locations)
			{
				if (disabled)
				{
					propRow = this.propsHiddenBlockNode.querySelector('[data-property-id-row="' + property.getId() + '"]');
					if (propRow)
					{
						propNodes = propRow.querySelectorAll('div.bx-soa-loc');
						for (i = 0; i < propNodes.length; i++)
						{
							locationString = this.getLocationString(propNodes[i]);
							values.push(locationString.length ? BX.util.htmlspecialchars(locationString) : BX.message('SOA_NOT_SELECTED'));
						}
					}
					propsItemNode.innerHTML += values.join('<br>');
				}
				else
				{
					propContainer = BX.create('DIV', {props: {className: 'soa-property-container'}});
					propRow = this.locations[property.getId()];
					for (i = 0; i < propRow.length; i ++)
					{
						currentLocation = propRow[i] ? propRow[i].output : {};
						insertedLoc = BX.create('DIV', {props: {className: 'bx-soa-loc'}, html: currentLocation.HTML});

						if (property.isMultiple())
							insertedLoc.style.marginBottom = this.locationsTemplate == 'search' ? '5px' : '20px';

						propContainer.appendChild(insertedLoc);

						for (k in currentLocation.SCRIPT)
						{
							if (currentLocation.SCRIPT.hasOwnProperty(k))
								BX.evalGlobal(currentLocation.SCRIPT[k].JS);
						}
					}

					if (property.isMultiple())
					{
						propContainer.appendChild(
							BX.create('DIV', {
								attrs: {'data-prop-id': property.getId()},
								props: {className: 'btn btn-sm btn-default'},
								text: BX.message('ADD_DEFAULT'),
								events: {
									click: BX.proxy(this.addLocationProperty, this)
								}
							})
						);
					}

					propsItemNode.appendChild(propContainer);
				}
			}
		},

		addLocationProperty: function(e)
		{
			var target = e.target || e.srcElement,
				propId = target.getAttribute('data-prop-id'),
				lastProp = BX.previousSibling(target),
				insertedLoc, k, input, index = 0,
				prefix = 'sls-',
				randomStr = BX.util.getRandomString(5);

			if (BX.hasClass(lastProp, 'bx-soa-loc'))
			{
				if (this.locationsTemplate == 'search')
				{
					input = lastProp.querySelector('input[type=text][class=dropdown-field]');
					if (input)
						index = parseInt(input.name.substring(input.name.indexOf('[') + 1, input.name.indexOf(']'))) + 1;
				}
				else
				{
					input = lastProp.querySelectorAll('input[type=hidden]');
					if (input.length)
					{
						input = input[input.length - 1];
						index = parseInt(input.name.substring(input.name.indexOf('[') + 1, input.name.indexOf(']'))) + 1;
					}
				}
			}

			if (this.cleanLocations[propId])
			{
				insertedLoc = BX.create('DIV', {
					props: {className: 'bx-soa-loc'},
					style: {marginBottom: this.locationsTemplate == 'search' ? '5px' : '20px'},
					html: this.cleanLocations[propId].HTML.split('#key#').join(index).replace(/sls-\d{5}/g, prefix + randomStr)
				});
				target.parentNode.insertBefore(insertedLoc, target);

				BX.saleOrderAjax.addPropertyDesc({
					id: propId + '_' + index,
					attributes: {
						id: propId + '_' + index,
						type: 'LOCATION',
						valueSource: 'form'
					}
				});


				for (k in this.cleanLocations[propId].SCRIPT)
					if (this.cleanLocations[propId].SCRIPT.hasOwnProperty(k))
						BX.evalGlobal(this.cleanLocations[propId].SCRIPT[k].JS.split('_key__').join('_' + index).replace(/sls-\d{5}/g, prefix + randomStr));

				BX.saleOrderAjax.initDeferredControl();
			}
		},

		insertDateProperty: function(property, propsItemNode, disabled)
		{
			var prop, dateInputs, values, i,
				propContainer, inputText;

			if (disabled)
			{
				prop = this.propsHiddenBlockNode.querySelector('div[data-property-id-row="' + property.getId() + '"]');
				if (prop)
				{
					values = [];
					dateInputs = prop.querySelectorAll('input[type=text]');

					for (i = 0; i < dateInputs.length; i++)
						if (dateInputs[i].value && dateInputs[i].value.length)
							values.push(dateInputs[i].value);

					propsItemNode.innerHTML += this.valuesToString(values);
				}
			}
			else
			{
				propContainer = BX.create('DIV', {props: {className: 'soa-property-container'}});
				property.appendTo(propContainer);
				propsItemNode.appendChild(propContainer);
				inputText = propContainer.querySelectorAll('input[type=text]');

				for (i = 0; i < inputText.length; i++)
					this.alterDateProperty(property.getSettings(), inputText[i]);

				this.alterProperty(property.getSettings(), propContainer);
				this.bindValidation(property.getId(), propContainer);
			}
		},

		insertFileProperty: function(property, propsItemNode, disabled)
		{
			var prop, fileLinks, values, i, html,
				saved, propContainer;

			if (disabled)
			{
				prop = this.propsHiddenBlockNode.querySelector('div[data-property-id-row="' + property.getId() + '"]');
				if (prop)
				{
					values = [];
					fileLinks = prop.querySelectorAll('a');

					for (i = 0; i < fileLinks.length; i++)
					{
						html = fileLinks[i].innerHTML;
						if (html.length)
							values.push(html);
					}

					propsItemNode.innerHTML += this.valuesToString(values);
				}
			}
			else
			{
				saved = this.savedFilesBlockNode.querySelector('div[data-property-id-row="' + property.getId() + '"]');
				if (saved)
					propContainer = saved.querySelector('div.soa-property-container');

				if (propContainer)
					propsItemNode.appendChild(propContainer);
				else
				{
					propContainer = BX.create('DIV', {props: {className: 'soa-property-container'}});
					property.appendTo(propContainer);
					propsItemNode.appendChild(propContainer);
					this.alterProperty(property.getSettings(), propContainer);
				}
			}
		},

		insertStringProperty: function(property, propsItemNode, disabled)
		{
			var prop, inputs, values, i, propContainer;

			if (disabled)
			{
				prop = this.propsHiddenBlockNode.querySelector('div[data-property-id-row="' + property.getId() + '"]');
				if (prop)
				{
					values = [];
					inputs = prop.querySelectorAll('input[type=text]');
					if (inputs.length == 0)
						inputs = prop.querySelectorAll('textarea');

					if (inputs.length)
					{
						for (i = 0; i < inputs.length; i++)
						{
							if (inputs[i].value.length)
								values.push(inputs[i].value);
						}
					}

					propsItemNode.innerHTML += this.valuesToString(values);
				}
			}
			else
			{
				propContainer = BX.create('DIV', {props: {className: 'soa-property-container'}});
				property.appendTo(propContainer);
				propsItemNode.appendChild(propContainer);
				this.alterProperty(property.getSettings(), propContainer);
				this.bindValidation(property.getId(), propContainer);
			}
		},

		insertEnumProperty: function(property, propsItemNode, disabled)
		{
			var prop, inputs, values, i, propContainer;

			if (disabled)
			{
				prop = this.propsHiddenBlockNode.querySelector('div[data-property-id-row="' + property.getId() + '"]');
				if (prop)
				{
					values = [];
					inputs = prop.querySelectorAll('input[type=radio]');
					if (inputs.length)
					{
						for (i = 0; i < inputs.length; i++)
						{
							if (inputs[i].checked)
								values.push(inputs[i].nextSibling.nodeValue);
						}
					}
					inputs = prop.querySelectorAll('option');
					if (inputs.length)
					{
						for (i = 0; i < inputs.length; i++)
						{
							if (inputs[i].selected)
								values.push(inputs[i].innerHTML);
						}
					}

					propsItemNode.innerHTML += this.valuesToString(values);
				}
			}
			else
			{
				propContainer = BX.create('DIV', {props: {className: 'soa-property-container'}});
				property.appendTo(propContainer);
				propsItemNode.appendChild(propContainer);
				this.bindValidation(property.getId(), propContainer);
			}
		},

		insertYNProperty: function(property, propsItemNode, disabled)
		{
			var prop, inputs, values, i, propContainer;

			if (disabled)
			{
				prop = this.propsHiddenBlockNode.querySelector('div[data-property-id-row="' + property.getId() + '"]');
				if (prop)
				{
					values = [];
					inputs = prop.querySelectorAll('input[type=checkbox]');

					for (i = 0; i < inputs.length; i+=2)
						values.push(inputs[i].checked ? BX.message('SOA_YES') : BX.message('SOA_NO'));

					propsItemNode.innerHTML += this.valuesToString(values);
				}
			}
			else
			{
				propContainer = BX.create('DIV', {props: {className: 'soa-property-container'}});
				property.appendTo(propContainer);
				propsItemNode.appendChild(propContainer);
				this.alterProperty(property.getSettings(), propContainer);
				this.bindValidation(property.getId(), propContainer);
			}
		},

		insertNumberProperty: function(property, propsItemNode, disabled)
		{
			var prop, inputs, values, i, propContainer;

			if (disabled)
			{
				prop = this.propsHiddenBlockNode.querySelector('div[data-property-id-row="' + property.getId() + '"]');
				if (prop)
				{
					values = [];
					inputs = prop.querySelectorAll('input[type=text]');

					for (i = 0; i < inputs.length; i++)
						if (inputs[i].value.length)
							values.push(inputs[i].value);

					propsItemNode.innerHTML += this.valuesToString(values);
				}
			}
			else
			{
				propContainer = BX.create('DIV', {props: {className: 'soa-property-container'}});
				property.appendTo(propContainer);
				propsItemNode.appendChild(propContainer);
				this.alterProperty(property.getSettings(), propContainer);
				this.bindValidation(property.getId(), propContainer);
			}
		},

		valuesToString: function(values)
		{
			var str = values.join(', ');

			return str.length ? BX.util.htmlspecialchars(str) : BX.message('SOA_NOT_SELECTED');
		},

		alterProperty: function(settings, propContainer)
		{
			var divs = BX.findChildren(propContainer, {tagName: 'DIV'}),
				i, textNode, inputs, del, add,
				fileInputs, accepts, fileTitles;

			if (divs && divs.length)
			{
				for (i = 0; i < divs.length; i++)
				{
					divs[i].style.margin = '5px 0';
				}
			}

			textNode = propContainer.querySelector('input[type=text]');
			if (!textNode)
				textNode = propContainer.querySelector('textarea');

			if (textNode)
			{
				textNode.id = 'soa-property-' + settings.ID;
				if (settings.IS_ADDRESS == 'Y')
					textNode.setAttribute('autocomplete', 'address');
				if (settings.IS_EMAIL == 'Y')
					textNode.setAttribute('autocomplete', 'email');
				if (settings.IS_PAYER == 'Y')
					textNode.setAttribute('autocomplete', 'name');
				if (settings.IS_PHONE == 'Y')
					textNode.setAttribute('autocomplete', 'tel');

				if (settings.PATTERN && settings.PATTERN.length)
				{
					textNode.removeAttribute('pattern');
				}
			}

			inputs = propContainer.querySelectorAll('input[type=text]');
			for (i = 0; i < inputs.length; i++)
			{
				inputs[i].placeholder = settings.DESCRIPTION;
				BX.addClass(inputs[i], 'form-control bx-soa-customer-input bx-ios-fix');
			}

			inputs = propContainer.querySelectorAll('select');
			for (i = 0; i < inputs.length; i++)
				BX.addClass(inputs[i], 'form-control');

			inputs = propContainer.querySelectorAll('textarea');
			for (i = 0; i < inputs.length; i++)
			{
				inputs[i].placeholder = settings.DESCRIPTION;
				BX.addClass(inputs[i], 'form-control bx-ios-fix');
			}

			del = propContainer.querySelectorAll('label');
			for (i = 0; i < del.length; i++)
				BX.remove(del[i]);

			if (settings.TYPE == 'FILE')
			{
				if (settings.ACCEPT && settings.ACCEPT.length)
				{
					fileInputs = propContainer.querySelectorAll('input[type=file]');
					accepts = this.getFileAccepts(settings.ACCEPT);
					for (i = 0; i < fileInputs.length; i++)
						fileInputs[i].setAttribute('accept', accepts);
				}

				fileTitles = propContainer.querySelectorAll('a');
				for (i = 0; i < fileTitles.length; i++)
				{
					BX.bind(fileTitles[i], 'click', function(e){
						var target = e.target || e.srcElement,
							fileInput = target && target.nextSibling && target.nextSibling.nextSibling;

						if (fileInput)
							BX.fireEvent(fileInput, 'change');
					});
				}
			}

			add = propContainer.querySelectorAll('input[type=button]');
			for (i = 0; i < add.length; i++)
			{
				BX.addClass(add[i], 'btn btn-default btn-sm');

				if (settings.MULTIPLE == 'Y' && i == add.length - 1)
					continue;

				if (settings.TYPE == 'FILE')
				{
					BX.prepend(add[i], add[i].parentNode);
					add[i].style.marginRight = '10px';
				}
			}

			if (add.length)
			{
				add = add[add.length - 1];
				BX.bind(add, 'click', BX.delegate(function(e){
					var target = e.target || e.srcElement,
						targetContainer = BX.findParent(target, {tagName: 'div', className: 'soa-property-container'}),
						del = targetContainer.querySelector('label'),
						add = targetContainer.querySelectorAll('input[type=button]'),
						textInputs = targetContainer.querySelectorAll('input[type=text]'),
						textAreas = targetContainer.querySelectorAll('textarea'),
						divs = BX.findChildren(targetContainer, {tagName: 'DIV'});

					var i, fileTitles, fileInputs, accepts;

					if (divs && divs.length)
					{
						for (i = 0; i < divs.length; i++)
						{
							divs[i].style.margin = '5px 0';
						}
					}

					this.bindValidation(settings.ID, targetContainer);

					if (add.length && add[add.length - 2])
					{
						BX.prepend(add[add.length - 2], add[add.length - 2].parentNode);
						add[add.length - 2].style.marginRight = '10px';
						BX.addClass(add[add.length - 2], 'btn btn-default btn-sm');
					}

					del && BX.remove(del);
					if (textInputs.length)
					{
						textInputs[textInputs.length - 1].placeholder = settings.DESCRIPTION;
						BX.addClass(textInputs[textInputs.length - 1], 'form-control bx-soa-customer-input bx-ios-fix');
						if (settings.TYPE == 'DATE')
							this.alterDateProperty(settings, textInputs[textInputs.length - 1]);

						if (settings.PATTERN && settings.PATTERN.length)
							textInputs[textInputs.length - 1].removeAttribute('pattern');
					}

					if (textAreas.length)
					{
						textAreas[textAreas.length - 1].placeholder = settings.DESCRIPTION;
						BX.addClass(textAreas[textAreas.length - 1], 'form-control bx-ios-fix');
					}

					if (settings.TYPE == 'FILE')
					{
						if (settings.ACCEPT && settings.ACCEPT.length)
						{
							fileInputs = propContainer.querySelectorAll('input[type=file]');
							accepts = this.getFileAccepts(settings.ACCEPT);
							for (i = 0; i < fileInputs.length; i++)
								fileInputs[i].setAttribute('accept', accepts);
						}

						fileTitles = targetContainer.querySelectorAll('a');
						BX.bind(fileTitles[fileTitles.length - 1], 'click', function(e){
							var target = e.target || e.srcElement,
								fileInput = target && target.nextSibling && target.nextSibling.nextSibling;

							if (fileInput)
								setTimeout(function(){BX.fireEvent(fileInput, 'change');}, 10);
						});
					}
				}, this));
			}
		},

		alterDateProperty: function(settings, inputText)
		{
			var parentNode = BX.findParent(inputText, {tagName: 'DIV'}),
				addon;

			BX.addClass(parentNode, 'input-group');
			addon = BX.create('DIV', {
				props: {className: 'input-group-addon'},
				children: [BX.create('I', {props: {className: 'bx-calendar'}})]
			});
			BX.insertAfter(addon, inputText);
			BX.remove(parentNode.querySelector('input[type=button]'));
			BX.bind(addon, 'click', BX.delegate(function(e){
				var target = e.target || e.srcElement,
					parentNode = BX.findParent(target, {tagName: 'DIV', className: 'input-group'});

				BX.calendar({
					node: parentNode.querySelector('.input-group-addon'),
					field: parentNode.querySelector('input[type=text]').name,
					form: '',
					bTime: settings.TIME == 'Y',
					bHideTime: false
				});
			}, this));
		},

		isValidForm: function()
		{
			if (!this.options.propertyValidation)
				return true;

			var regionErrors = this.isValidRegionBlock(),
				propsErrors = this.isValidPropertiesBlock(),
				navigated = false, tooltips, i;

			if (regionErrors.length)
			{
				navigated = true;
				this.animateScrollTo(this.regionBlockNode, 800, 50);
			}

			if (propsErrors.length && !navigated)
			{
				if (this.activeSectionId == this.propsBlockNode.id)
				{
					tooltips = this.propsBlockNode.querySelectorAll('div.tooltip');
					for (i = 0; i < tooltips.length; i++)
					{
						if (tooltips[i].getAttribute('data-state') == 'opened')
						{
							this.animateScrollTo(BX.findParent(tooltips[i], {className: 'form-group bx-soa-customer-field'}), 800, 50);
							break;
						}
					}
				}
				else
					this.animateScrollTo(this.propsBlockNode, 800, 50);
			}

			if (regionErrors.length)
			{
				this.showError(this.regionBlockNode, regionErrors);
				BX.addClass(this.regionBlockNode, 'bx-step-error');
			}

			if (propsErrors.length)
			{
				if (this.activeSectionId !== this.propsBlockNode.id)
					this.showError(this.propsBlockNode, propsErrors);

				BX.addClass(this.propsBlockNode, 'bx-step-error');
			}

			return !(regionErrors.length + propsErrors.length);
		},

		isValidRegionBlock: function()
		{
			if (!this.options.propertyValidation)
				return [];

			var regionProps = this.orderBlockNode.querySelectorAll('.bx-soa-location-input-container[data-property-id-row]'),
				regionErrors = [],
				id, arProperty, data, i;

			for (i = 0; i < regionProps.length; i++)
			{
				id = regionProps[i].getAttribute('data-property-id-row');
				arProperty = this.validation.properties[id];
				data = this.getValidationData(arProperty, regionProps[i]);

				regionErrors = regionErrors.concat(this.isValidProperty(data, true));
			}

			return regionErrors;
		},

		isValidPropertiesBlock: function(excludeLocation)
		{
			if (!this.options.propertyValidation)
				return [];

			var props = this.orderBlockNode.querySelectorAll('.bx-soa-customer-field[data-property-id-row]'),
				propsErrors = [],
				id, propContainer, arProperty, data, i;

			for (i = 0; i < props.length; i++)
			{
				id = props[i].getAttribute('data-property-id-row');

				if (!!excludeLocation && this.locations[id])
					continue;

				propContainer = props[i].querySelector('.soa-property-container');
				if (propContainer)
				{
					arProperty = this.validation.properties[id];
					data = this.getValidationData(arProperty, propContainer);
					propsErrors = propsErrors.concat(this.isValidProperty(data, true));
				}
			}

			return propsErrors;
		},

		isValidProperty: function(data, fieldName)
		{
			var propErrors = [], inputErrors, i;

			if (!data || !data.inputs)
				return propErrors;

			for (i = 0; i < data.inputs.length; i++)
			{
				inputErrors = data.func(data.inputs[i], !!fieldName);
				if (inputErrors.length)
					propErrors[i] = inputErrors.join('<br>');
			}

			this.showValidationResult(data.inputs, propErrors);

			return propErrors;
		},

		bindValidation: function(id, propContainer)
		{
			if (!this.validation.properties || !this.validation.properties[id])
				return;

			var arProperty = this.validation.properties[id],
				data = this.getValidationData(arProperty, propContainer),
				i, k;

			if (data && data.inputs && data.action)
			{
				for (i = 0; i < data.inputs.length; i++)
				{
					if (BX.type.isElementNode(data.inputs[i]))
						BX.bind(data.inputs[i], data.action, BX.delegate(function(){
							this.isValidProperty(data);
						}, this));
					else
						for (k = 0; k < data.inputs[i].length; k++)
							BX.bind(data.inputs[i][k], data.action, BX.delegate(function(){
								this.isValidProperty(data);
							}, this));
				}
			}
		},

		getValidationData: function(arProperty, propContainer)
		{
			if (!arProperty || !propContainer)
				return;

			var data = {}, inputs;

			switch (arProperty.TYPE)
			{
				case 'STRING':
					data.action = 'change';
					data.func = BX.delegate(function(input, fieldName){
						return this.validateString(input, arProperty, fieldName);
					}, this);

					inputs = propContainer.querySelectorAll('input[type=text]');
					if (inputs.length)
					{
						data.inputs = inputs;
						break;
					}
					inputs = propContainer.querySelectorAll('textarea');
					if (inputs.length)
						data.inputs = inputs;
					break;
				case 'LOCATION':
					data.func = BX.delegate(function(input, fieldName){
						return this.validateLocation(input, arProperty, fieldName);
					}, this);

					inputs = propContainer.querySelectorAll('input.bx-ui-sls-fake[type=text]');
					if (inputs.length)
					{
						data.inputs = inputs;
						data.action = 'keyup';
						break;
					}
					inputs = propContainer.querySelectorAll('div.bx-ui-slst-pool');
					if (inputs.length)
					{
						data.inputs = inputs;
					}
					break;
				case 'Y/N':
					data.inputs = propContainer.querySelectorAll('input[type=checkbox]');
					data.action = 'change';
					data.func = BX.delegate(function(input, fieldName){
						return this.validateCheckbox(input, arProperty, fieldName);
					}, this);
					break;
				case 'NUMBER':
					data.inputs = propContainer.querySelectorAll('input[type=text]');
					data.action = 'blur';
					data.func = BX.delegate(function(input, fieldName){
						return this.validateNumber(input, arProperty, fieldName);
					}, this);
					break;
				case 'ENUM':
					inputs = propContainer.querySelectorAll('input[type=radio]');
					if (!inputs.length)
						inputs = propContainer.querySelectorAll('input[type=checkbox]');

					if (inputs.length)
					{
						data.inputs = [inputs];
						data.action = 'change';
						data.func = BX.delegate(function(input, fieldName){
							return this.validateEnum(input, arProperty, fieldName);
						}, this);
						break;
					}

					inputs = propContainer.querySelectorAll('option');
					if (inputs.length)
					{
						data.inputs = [inputs];
						data.action = 'click';
						data.func = BX.delegate(function(input, fieldName){
							return this.validateSelect(input, arProperty, fieldName);
						}, this);
					}
					break;
				case 'FILE':
					data.inputs = propContainer.querySelectorAll('input[type=file]');
					data.action = 'change';
					data.func = BX.delegate(function(input, fieldName){
						return this.validateFile(input, arProperty, fieldName);
					}, this);
					break;
				case 'DATE':
					data.inputs = propContainer.querySelectorAll('input[type=text]');
					data.action = 'change';
					data.func = BX.delegate(function(input, fieldName){
						return this.validateDate(input, arProperty, fieldName);
					}, this);
					break;
			}

			return data;
		},

		showErrorTooltip: function(tooltipId, targetNode, text)
		{
			if (!tooltipId || !targetNode || !text)
				return;

			var tooltip = BX('tooltip-' + tooltipId),
				tooltipInner, quickLocation;

			text = this.uniqueText(text, '<br>');

			if (tooltip)
			{
				tooltipInner = tooltip.querySelector('div.tooltip-inner');
			}
			else
			{
				tooltipInner = BX.create('DIV', {props: {className: 'tooltip-inner'}});
				tooltip = BX.create('DIV', {
					props: {
						id: 'tooltip-' + tooltipId,
						className: 'bx-soa-tooltip bx-soa-tooltip-static bx-soa-tooltip-danger tooltip top'
					},
					children: [
						BX.create('DIV', {props: {className: 'tooltip-arrow'}}),
						tooltipInner
					]
				});

				quickLocation = targetNode.parentNode.querySelector('div.quick-locations');
				if (quickLocation)
					targetNode = quickLocation;

				BX.insertAfter(tooltip, targetNode);
			}

			tooltipInner.innerHTML = text;

			if (tooltip.getAttribute('data-state') != 'opened')
			{
				tooltip.setAttribute('data-state', 'opened');
				tooltip.style.opacity = 0;
				tooltip.style.display = 'block';

				new BX.easing({
					duration: 150,
					start: {opacity: 0},
					finish: {opacity: 100},
					transition: BX.easing.transitions.quad,
					step: function(state){
						tooltip.style.opacity = state.opacity / 100;
					}
				}).animate();
			}
		},

		closeErrorTooltip: function(tooltipId)
		{
			var tooltip = BX('tooltip-' + tooltipId);
			if (tooltip)
			{
				tooltip.setAttribute('data-state', 'closed');

				new BX.easing({
					duration: 150,
					start: {opacity: 100},
					finish: {opacity: 0},
					transition: BX.easing.transitions.quad,
					step: function(state){
						tooltip.style.opacity = state.opacity / 100;
					},
					complete: function(){
						tooltip.style.display = 'none';
					}
				}).animate();
			}
		},

		showValidationResult: function(inputs, errors)
		{
			if (!inputs || !inputs.length || !errors)
				return;

			var input0 = BX.type.isElementNode(inputs[0]) ? inputs[0] : inputs[0][0],
				formGroup = BX.findParent(input0, {tagName: 'DIV', className: 'form-group'}),
				label = formGroup.querySelector('label'),
				tooltipId, inputDiv, i;

			if (label)
				tooltipId = label.getAttribute('for');

			for (i = 0; i < inputs.length; i++)
			{
				inputDiv = BX.findParent(inputs[i], {tagName: 'DIV', className: 'form-group'});
				if (errors[i] && errors[i].length)
					BX.addClass(inputDiv, 'has-error');
				else
					BX.removeClass(inputDiv, 'has-error');
			}

			if (errors.length)
				this.showErrorTooltip(tooltipId, label, errors.join('<br>'));
			else
				this.closeErrorTooltip(tooltipId);
		},

		validateString: function(input, arProperty, fieldName)
		{
			if (!input || !arProperty)
				return [];

			var value = input.value,
				errors = [],
				name = BX.util.htmlspecialchars(arProperty.NAME),
				field = !!fieldName ? BX.message('SOA_FIELD') + ' "' + name + '"' : BX.message('SOA_FIELD'),
				re;

			if (arProperty.MULTIPLE === 'Y')
				return errors;

			if (arProperty.REQUIRED === 'Y' && value.length === 0)
				errors.push(field + ' ' + BX.message('SOA_REQUIRED'));

			if (value.length)
			{
				if (arProperty.MINLENGTH && arProperty.MINLENGTH > value.length)
					errors.push(BX.message('SOA_MIN_LENGTH') + ' "' + name + '" ' + BX.message('SOA_LESS') + ' ' + arProperty.MINLENGTH + ' ' + BX.message('SOA_SYMBOLS'));

				if (arProperty.MAXLENGTH && arProperty.MAXLENGTH < value.length)
					errors.push(BX.message('SOA_MAX_LENGTH') + ' "' + name + '" ' + BX.message('SOA_MORE') + ' ' + arProperty.MAXLENGTH + ' ' + BX.message('SOA_SYMBOLS'));

				if (arProperty.IS_EMAIL === 'Y')
				{
					input.value = value = BX.util.trim(value);
					if (value.length)
					{
						re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
						if (!re.test(value))
						{
							errors.push(BX.message('SOA_INVALID_EMAIL'));
						}
					}
				}

				if (value.length > 0 && arProperty.PATTERN && arProperty.PATTERN.length)
				{
					re = new RegExp(arProperty.PATTERN);
					if (!re.test(value))
						errors.push(field + ' ' + BX.message('SOA_INVALID_PATTERN'));
				}
			}

			return errors;
		},

		validateLocation: function(input, arProperty, fieldName)
		{
			if (!input || !arProperty)
				return [];

			var parent = BX.findParent(input, {tagName: 'DIV', className: 'form-group'}),
				value = this.getLocationString(parent),
				errors = [],
				field = !!fieldName ? BX.message('SOA_FIELD') + ' "' + BX.util.htmlspecialchars(arProperty.NAME) + '"' : BX.message('SOA_FIELD');

			if (arProperty.MULTIPLE == 'Y' && arProperty.IS_LOCATION !== 'Y')
				return errors;

			if (arProperty.REQUIRED == 'Y' && (value.length == 0 || value == BX.message('SOA_NOT_SPECIFIED')))
				errors.push(field + ' ' + BX.message('SOA_REQUIRED'));

			return errors;
		},

		validateCheckbox: function(input, arProperty, fieldName)
		{
			if (!input || !arProperty)
				return [];

			var errors = [],
				field = !!fieldName ? BX.message('SOA_FIELD') + ' "' + BX.util.htmlspecialchars(arProperty.NAME) + '"' : BX.message('SOA_FIELD');

			if (arProperty.MULTIPLE == 'Y')
				return errors;

			if (arProperty.REQUIRED == 'Y' && !input.checked)
				errors.push(field + ' ' + BX.message('SOA_REQUIRED'));

			return errors;
		},

		validateNumber: function(input, arProperty, fieldName)
		{
			if (!input || !arProperty)
				return [];

			var value = input.value,
				errors = [],
				name = BX.util.htmlspecialchars(arProperty.NAME),
				field = !!fieldName ? BX.message('SOA_FIELD') + ' "' + name + '"' : BX.message('SOA_FIELD'),
				num, del;

			if (arProperty.MULTIPLE == 'Y')
				return errors;

			if (arProperty.REQUIRED == 'Y' && value.length == 0)
				errors.push(field + ' ' + BX.message('SOA_REQUIRED'));

			if (value.length)
			{
				if (!/[0-9]|\./.test(value))
					errors.push(field + ' ' + BX.message('SOA_NOT_NUMERIC'));

				if (arProperty.MIN && parseFloat(arProperty.MIN) > parseFloat(value))
					errors.push(BX.message('SOA_MIN_VALUE') + ' "' + name + '" ' + parseFloat(arProperty.MIN));

				if (arProperty.MAX && parseFloat(arProperty.MAX) < parseFloat(value))
					errors.push(BX.message('SOA_MAX_VALUE') + ' "' + name + '" ' + parseFloat(arProperty.MAX));

				if (arProperty.STEP && parseFloat(arProperty.STEP) > 0)
				{
					num = Math.abs(parseFloat(value) - (arProperty.MIN && parseFloat(arProperty.MIN) > 0 ? parseFloat(arProperty.MIN) : 0));
					del = (num / parseFloat(arProperty.STEP)).toPrecision(12);
					if (del != parseInt(del))
						errors.push(field + ' ' + BX.message('SOA_NUM_STEP') + ' ' + arProperty.STEP);
				}
			}

			return errors;
		},

		validateEnum: function(inputs, arProperty, fieldName)
		{
			if (!inputs || !arProperty)
				return [];

			var values = [], errors = [], i,
				field = !!fieldName ? BX.message('SOA_FIELD') + ' "' + BX.util.htmlspecialchars(arProperty.NAME) + '"' : BX.message('SOA_FIELD');

			if (arProperty.MULTIPLE == 'Y')
				return errors;

			for (i = 0; i < inputs.length; i++)
				if (inputs[i].checked || inputs[i].selected)
					values.push(i);

			if (arProperty.REQUIRED == 'Y' && values.length == 0)
				errors.push(field + ' ' + BX.message('SOA_REQUIRED'));

			return errors;
		},

		validateSelect: function(inputs, arProperty, fieldName)
		{
			if (!inputs || !arProperty)
				return [];

			var values = [], errors = [], i,
				field = !!fieldName ? BX.message('SOA_FIELD') + ' "' + BX.util.htmlspecialchars(arProperty.NAME) + '"' : BX.message('SOA_FIELD');

			if (arProperty.MULTIPLE == 'Y')
				return errors;

			for (i = 0; i < inputs.length; i++)
				if (inputs[i].selected)
					values.push(i);

			if (arProperty.REQUIRED == 'Y' && values.length == 0)
				errors.push(field + ' ' + BX.message('SOA_REQUIRED'));

			return errors;
		},

		validateFile: function(inputs, arProperty, fieldName)
		{
			if (!inputs || !arProperty)
				return [];

			var errors = [], i,
				files = inputs.files || [],
				field = !!fieldName ? BX.message('SOA_FIELD') + ' "' + BX.util.htmlspecialchars(arProperty.NAME) + '"' : BX.message('SOA_FIELD'),
				defaultValue = inputs.previousSibling.value,
				file, fileName, splittedName, fileExtension;

			if (arProperty.MULTIPLE == 'Y')
				return errors;

			if (
				arProperty.REQUIRED == 'Y' && files.length == 0 && defaultValue == ''
				&& (!arProperty.DEFAULT_VALUE || !arProperty.DEFAULT_VALUE.length)
			)
			{
				errors.push(field + ' ' + BX.message('SOA_REQUIRED'));
			}
			else
			{
				for (i = 0; i < files.length; i++)
				{
					file = files[i];
					fileName = BX.util.htmlspecialchars(file.name);
					splittedName = file.name.split('.');
					fileExtension = splittedName.length > 1 ? splittedName[splittedName.length - 1].toLowerCase() : '';

					if (arProperty.ACCEPT.length > 0 && (fileExtension.length == 0 || arProperty.ACCEPT.indexOf(fileExtension) == '-1'))
						errors.push(BX.message('SOA_BAD_EXTENSION') + ' "' + fileName + '" (' + BX.util.htmlspecialchars(arProperty.ACCEPT) + ')');

					if (file.size > parseInt(arProperty.MAXSIZE))
						errors.push(BX.message('SOA_MAX_SIZE') + ' "' + fileName + '" (' + this.getSizeString(arProperty.MAXSIZE, 1) + ')');
				}
			}

			return errors;
		},

		validateDate: function(input, arProperty, fieldName)
		{
			if (!input || !arProperty)
				return [];

			var value = input.value,
				errors = [],
				name = BX.util.htmlspecialchars(arProperty.NAME),
				field = !!fieldName ? BX.message('SOA_FIELD') + ' "' + name + '"' : BX.message('SOA_FIELD');

			if (arProperty.MULTIPLE == 'Y')
				return errors;

			if (arProperty.REQUIRED == 'Y' && value.length == 0)
				errors.push(field + ' ' + BX.message('SOA_REQUIRED'));

			return errors;
		},

		editPropsMap: function(propsNode)
		{
			var propsMapContainer = BX.create('DIV', {props: {className: 'col-sm-12'}, style: {marginBottom: '10px'}}),
				map = BX.create('DIV', {props: {id: 'propsMap'}, style: {width: '100%'}});

			propsMapContainer.appendChild(map);
			propsNode.appendChild(propsMapContainer);
		},

		editPropsComment: function(propsNode)
		{
			var propsCommentContainer, label, input, div;

			propsCommentContainer = BX.create('DIV', {props: {className: 'col-sm-12'}});
			label = BX.create('LABEL', {
				attrs: {for: 'orderDescription'},
				props: {className: 'bx-soa-customer-label'},
				html: this.params.MESS_ORDER_DESC
			});
			input = BX.create('TEXTAREA', {
				props: {
					id: 'orderDescription',
					cols: '4',
					className: 'form-control bx-soa-customer-textarea bx-ios-fix',
					name: 'ORDER_DESCRIPTION'
				},
				text: this.result.ORDER_DESCRIPTION ? this.result.ORDER_DESCRIPTION : ''
			});
			div = BX.create('DIV', {
				props: {className: 'form-group bx-soa-customer-field'},
				children: [label, input]
			});

			propsCommentContainer.appendChild(div);
			propsNode.appendChild(propsCommentContainer);
		},

		editTotalBlock: function()
		{
			if (!this.totalInfoBlockNode || !this.result.TOTAL)
				return;

			var total = this.result.TOTAL,
				priceHtml, params = {},
				discText, valFormatted, i,
				curDelivery, deliveryError, deliveryValue,
				showOrderButton = this.params.SHOW_TOTAL_ORDER_BUTTON === 'Y';

			BX.cleanNode(this.totalInfoBlockNode);

			if (parseFloat(total.ORDER_PRICE) === 0)
			{
				priceHtml = this.params.MESS_PRICE_FREE;
				params.free = true;
			}
			else
			{
				priceHtml = total.ORDER_PRICE_FORMATED;
			}

			if (this.options.showPriceWithoutDiscount)
			{
				priceHtml += '<br><span class="bx-price-old">' + total.PRICE_WITHOUT_DISCOUNT + '</span>';
			}

			this.totalInfoBlockNode.appendChild(this.createTotalUnit(BX.message('SOA_SUM_SUMMARY'), priceHtml, params));

			if (this.options.showOrderWeight)
			{
				this.totalInfoBlockNode.appendChild(this.createTotalUnit(BX.message('SOA_SUM_WEIGHT_SUM'), total.ORDER_WEIGHT_FORMATED));
			}

			if (this.options.showTaxList)
			{
				for (i = 0; i < total.TAX_LIST.length; i++)
				{
					valFormatted = total.TAX_LIST[i].VALUE_MONEY_FORMATED || '';
					this.totalInfoBlockNode.appendChild(
						this.createTotalUnit(
							total.TAX_LIST[i].NAME + (!!total.TAX_LIST[i].VALUE_FORMATED ? ' ' + total.TAX_LIST[i].VALUE_FORMATED : '') + ':',
							valFormatted
						)
					);
				}
			}

			params = {};
			curDelivery = this.getSelectedDelivery();
			deliveryError = curDelivery && curDelivery.CALCULATE_ERRORS && curDelivery.CALCULATE_ERRORS.length;

			if (deliveryError)
			{
				deliveryValue = BX.message('SOA_NOT_CALCULATED');
				params.error = deliveryError;
			}
			else
			{
				if (parseFloat(total.DELIVERY_PRICE) === 0)
				{
					deliveryValue = this.params.MESS_PRICE_FREE;
					params.free = true;
				}
				else
				{
					deliveryValue = total.DELIVERY_PRICE_FORMATED;
				}

				if (
					curDelivery && typeof curDelivery.DELIVERY_DISCOUNT_PRICE !== 'undefined'
					&& parseFloat(curDelivery.PRICE) > parseFloat(curDelivery.DELIVERY_DISCOUNT_PRICE)
				)
				{
					deliveryValue += '<br><span class="bx-price-old">' + curDelivery.PRICE_FORMATED + '</span>';
				}
			}

			if (this.result.DELIVERY.length)
			{
				this.totalInfoBlockNode.appendChild(this.createTotalUnit(BX.message('SOA_SUM_DELIVERY'), deliveryValue, params));
			}

			if (this.options.showDiscountPrice)
			{
				discText = this.params.MESS_ECONOMY;
				if (total.DISCOUNT_PERCENT_FORMATED && parseFloat(total.DISCOUNT_PERCENT_FORMATED) > 0)
					discText += total.DISCOUNT_PERCENT_FORMATED;

				this.totalInfoBlockNode.appendChild(this.createTotalUnit(discText + ':', total.DISCOUNT_PRICE_FORMATED, {highlighted: true}));
			}

			if (this.options.showPayedFromInnerBudget)
			{
				this.totalInfoBlockNode.appendChild(this.createTotalUnit(BX.message('SOA_SUM_IT'), total.ORDER_TOTAL_PRICE_FORMATED));
				this.totalInfoBlockNode.appendChild(this.createTotalUnit(BX.message('SOA_SUM_PAYED'), total.PAYED_FROM_ACCOUNT_FORMATED));
				this.totalInfoBlockNode.appendChild(this.createTotalUnit(BX.message('SOA_SUM_LEFT_TO_PAY'), total.ORDER_TOTAL_LEFT_TO_PAY_FORMATED, {total: true}));
			}
			else
			{
				this.totalInfoBlockNode.appendChild(this.createTotalUnit(BX.message('SOA_SUM_IT'), total.ORDER_TOTAL_PRICE_FORMATED, {total: true}));
			}

			if (parseFloat(total.PAY_SYSTEM_PRICE) >= 0 && this.result.DELIVERY.length)
			{
				this.totalInfoBlockNode.appendChild(this.createTotalUnit(BX.message('SOA_PAYSYSTEM_PRICE'), '~' + total.PAY_SYSTEM_PRICE_FORMATTED));
			}

			if (!this.result.SHOW_AUTH)
			{
				this.totalInfoBlockNode.appendChild(
					BX.create('DIV', {
						props: {className: 'bx-soa-cart-total-button-container' + (!showOrderButton ? ' visible-xs' : '')},
						children: [
							BX.create('A', {
								props: {
									href: 'javascript:void(0)',
									className: 'btn btn-default btn-lg btn-order-save'
								},
								html: this.params.MESS_ORDER,
								events: {
									click: BX.proxy(this.clickOrderSaveAction, this)
								}
							})

						]
					})
				);
			}

			this.editMobileTotalBlock();
		},

		editMobileTotalBlock: function()
		{
			if (this.result.SHOW_AUTH)
				BX.removeClass(this.mobileTotalBlockNode, 'visible-xs');
			else
				BX.addClass(this.mobileTotalBlockNode, 'visible-xs');

			BX.cleanNode(this.mobileTotalBlockNode);
			this.mobileTotalBlockNode.appendChild(this.totalInfoBlockNode.cloneNode(true));
			BX.bind(this.mobileTotalBlockNode.querySelector('a.bx-soa-price-not-calc'), 'click', BX.delegate(function(){
				this.animateScrollTo(this.deliveryBlockNode);
			}, this));
			BX.bind(this.mobileTotalBlockNode.querySelector('a.btn-order-save'), 'click', BX.proxy(this.clickOrderSaveAction, this));
		},

		createTotalUnit: function(name, value, params)
		{
			var totalValue, className = 'bx-soa-cart-total-line';

			name = name || '';
			value = value || '';
			params = params || {};

			if (params.error)
			{
				totalValue = [BX.create('A', {
					props: {className: 'bx-soa-price-not-calc'},
					html: value,
					events: {
						click: BX.delegate(function(){
							this.animateScrollTo(this.deliveryBlockNode);
						}, this)
					}
				})];
			}
			else if (params.free)
			{
				totalValue = [BX.create('SPAN', {
					props: {className: 'bx-soa-price-free'},
					html: value
				})];
			}
			else
			{
				totalValue = [value];
			}

			if (params.total)
			{
				className += ' bx-soa-cart-total-line-total';
			}

			if (params.highlighted)
			{
				className += ' bx-soa-cart-total-line-highlighted';
			}

			return BX.create('DIV', {
				props: {className: className},
				children: [
					BX.create('SPAN', {props: {className: 'bx-soa-cart-t'}, text: name}),
					BX.create('SPAN', {
						props: {
							className: 'bx-soa-cart-d' + (!!params.total && this.options.totalPriceChanged ? ' bx-soa-changeCostSign' : '')
						},
						children: totalValue
					})
				]
			});
		},

		basketBlockScrollCheckEvent: function(e)
		{
			var target = e.target || e.srcElement,
				scrollLeft = target.scrollLeft,
				scrollRight = target.scrollWidth - (scrollLeft + target.clientWidth),
				parent = target.parentNode;

			if (scrollLeft == 0)
				BX.removeClass(parent, 'bx-soa-table-fade-left');
			else
				BX.addClass(parent, 'bx-soa-table-fade-left');

			if (scrollRight == 0)
				BX.removeClass(parent, 'bx-soa-table-fade-right');
			else
				BX.addClass(parent, 'bx-soa-table-fade-right');
		},

		basketBlockScrollCheck: function()
		{
			var scrollableNodes = this.orderBlockNode.querySelectorAll('div.bx-soa-table-fade'),
				parentNode, parentWidth, tableNode, tableWidth,
				i, scrollNode, scrollLeft, scrollRight, scrollable = false;

			for (i = 0; i < scrollableNodes.length; i++)
			{
				parentNode = scrollableNodes[i];
				tableNode = parentNode.querySelector('div.bx-soa-item-table');
				parentWidth = parentNode.clientWidth;
				tableWidth = tableNode.clientWidth || 0;
				scrollable = scrollable || tableWidth > parentWidth;

				if (scrollable)
				{
					scrollNode = BX.firstChild(parentNode);
					scrollLeft = scrollNode.scrollLeft;
					scrollRight = scrollNode.scrollWidth - (scrollLeft + scrollNode.clientWidth);

					if (scrollLeft == 0)
						BX.removeClass(parentNode, 'bx-soa-table-fade-left');
					else
						BX.addClass(parentNode, 'bx-soa-table-fade-left');

					if (scrollRight == 0)
						BX.removeClass(parentNode, 'bx-soa-table-fade-right');
					else
						BX.addClass(parentNode, 'bx-soa-table-fade-right');

					if (scrollLeft == 0 && scrollRight == 0)
						BX.addClass(parentNode, 'bx-soa-table-fade-right');
				}
				else
					BX.removeClass(parentNode, 'bx-soa-table-fade-left bx-soa-table-fade-right');
			}
		},

		totalBlockScrollCheck: function()
		{
			if (!this.totalInfoBlockNode || !this.totalGhostBlockNode)
				return;

			var scrollTop = BX.GetWindowScrollPos().scrollTop,
				ghostTop = BX.pos(this.totalGhostBlockNode).top,
				ghostBottom = BX.pos(this.orderBlockNode).bottom,
				width;

			if (ghostBottom - this.totalBlockNode.offsetHeight < scrollTop + 20)
				BX.addClass(this.totalInfoBlockNode, 'bx-soa-cart-total-bottom');
			else
				BX.removeClass(this.totalInfoBlockNode, 'bx-soa-cart-total-bottom');

			if (scrollTop > ghostTop && !BX.hasClass(this.totalInfoBlockNode, 'bx-soa-cart-total-fixed'))
			{
				width = this.totalInfoBlockNode.offsetWidth;
				BX.addClass(this.totalInfoBlockNode, 'bx-soa-cart-total-fixed');
				this.totalGhostBlockNode.style.paddingTop = this.totalInfoBlockNode.offsetHeight + 'px';
				this.totalInfoBlockNode.style.width = width + 'px';
			}
			else if (scrollTop < ghostTop && BX.hasClass(this.totalInfoBlockNode, 'bx-soa-cart-total-fixed'))
			{
				BX.removeClass(this.totalInfoBlockNode, 'bx-soa-cart-total-fixed');
				this.totalGhostBlockNode.style.paddingTop = 0;
				this.totalInfoBlockNode.style.width = '';
			}
		},

		totalBlockResizeCheck: function()
		{
			if (!this.totalInfoBlockNode || !this.totalGhostBlockNode)
				return;

			if (BX.hasClass(this.totalInfoBlockNode, 'bx-soa-cart-total-fixed'))
				this.totalInfoBlockNode.style.width = this.totalGhostBlockNode.offsetWidth + 'px';
		},

		totalBlockFixFont: function()
		{
			var totalNode = this.totalInfoBlockNode.querySelector('.bx-soa-cart-total-line.bx-soa-cart-total-line-total'),
				buttonNode, target, objList = [];

			if (totalNode)
			{
				target = BX.lastChild(totalNode);
				objList.push({
					node: target,
					maxFontSize: 28,
					smallestValue: false,
					scaleBy: target.parentNode
				});
			}

			if (this.params.SHOW_TOTAL_ORDER_BUTTON == 'Y')
			{
				buttonNode = this.totalInfoBlockNode.querySelector('.bx-soa-cart-total-button-container');
				if (buttonNode)
				{
					target = BX.lastChild(buttonNode);
					objList.push({
						node: target,
						maxFontSize: 18,
						smallestValue: false
					});
				}
			}

			if (objList.length)
				BX.FixFontSize.init({objList: objList, onAdaptiveResize: true});
		},

		setAnalyticsDataLayer: function(action, id)
		{
			if (!this.params.DATA_LAYER_NAME)
				return;

			var info, i;
			var products = [],
				dataVariant, item;

			for (i in this.result.GRID.ROWS)
			{
				if (this.result.GRID.ROWS.hasOwnProperty(i))
				{
					item = this.result.GRID.ROWS[i];
					dataVariant = [];

					for (i = 0; i < item.data.PROPS.length; i++)
					{
						dataVariant.push(item.data.PROPS[i].VALUE);
					}

					products.push({
						'id': item.data.PRODUCT_ID,
						'name': item.data.NAME,
						'price': item.data.PRICE,
						'brand': (item.data[this.params.BRAND_PROPERTY + '_VALUE'] || '').split(', ').join('/'),
						'variant': dataVariant.join('/'),
						'quantity': item.data.QUANTITY
					});
				}
			}

			switch (action)
			{
				case 'checkout':
					info = {
						'event': 'checkout',
						'ecommerce': {
							'checkout': {
								'products': products
							}
						}
					};
					break;
				case 'purchase':
					info = {
						'event': 'purchase',
						'ecommerce': {
							'purchase': {
								'actionField': {
									'id': id,
									'revenue': this.result.TOTAL.ORDER_TOTAL_PRICE,
									'tax': this.result.TOTAL.TAX_PRICE,
									'shipping': this.result.TOTAL.DELIVERY_PRICE
								},
								'products': products
							}
						}
					};
					break;
			}

			window[this.params.DATA_LAYER_NAME] = window[this.params.DATA_LAYER_NAME] || [];
			window[this.params.DATA_LAYER_NAME].push(info);
		},

		isOrderSaveAllowed: function()
		{
			return this.orderSaveAllowed === true;
		},

		allowOrderSave: function()
		{
			this.orderSaveAllowed = true;
		},

		disallowOrderSave: function()
		{
			this.orderSaveAllowed = false;
		},

		initUserConsent: function()
		{
			BX.ready(BX.delegate(function(){
				var control = BX.UserConsent && BX.UserConsent.load(this.orderBlockNode);
				if (control)
				{
					BX.addCustomEvent(control, BX.UserConsent.events.save, BX.proxy(this.doSaveAction, this));
					BX.addCustomEvent(control, BX.UserConsent.events.refused, BX.proxy(this.disallowOrderSave, this));
				}
			}, this));
		}
	};
})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:102:"/bitrix/components/bitrix/sale.location.selector.steps/templates/.default/script.min.js?15956921037752";s:6:"source";s:83:"/bitrix/components/bitrix/sale.location.selector.steps/templates/.default/script.js";s:3:"min";s:87:"/bitrix/components/bitrix/sale.location.selector.steps/templates/.default/script.min.js";s:3:"map";s:87:"/bitrix/components/bitrix/sale.location.selector.steps/templates/.default/script.map.js";}"*/
BX.namespace("BX.Sale.component.location.selector");if(typeof BX.Sale.component.location.selector.steps=="undefined"&&typeof BX.ui!="undefined"&&typeof BX.ui.widget!="undefined"){BX.Sale.component.location.selector.steps=function(e,t){this.parentConstruct(BX.Sale.component.location.selector.steps,e);BX.merge(this,{opts:{bindEvents:{"after-select-item":function(e){if(typeof this.opts.callback=="string"&&this.opts.callback.length>0&&this.opts.callback in window)window[this.opts.callback].apply(this,[e,this])}},disableKeyboardInput:false,dontShowNextChoice:false,pseudoValues:[],provideLinkBy:"id",requestParamsInject:false},vars:{cache:{nodesByCode:{}}},sys:{code:"slst"},flags:{skipAfterSelectItemEventOnce:false}});this.handleInitStack(t,BX.Sale.component.location.selector.steps,e)};BX.extend(BX.Sale.component.location.selector.steps,BX.ui.chainedSelectors);BX.merge(BX.Sale.component.location.selector.steps.prototype,{init:function(){this.pushFuncStack("buildUpDOM",BX.Sale.component.location.selector.steps);this.pushFuncStack("bindEvents",BX.Sale.component.location.selector.steps)},buildUpDOM:function(){},bindEvents:function(){var e=this,t=this.opts;if(t.disableKeyboardInput){this.bindEvent("after-control-placed",function(e){var t=e.getControl();BX.unbindAll(t.ctrls.toggle);BX.bind(t.ctrls.scope,"click",function(e){t.toggleDropDown()})})}BX.bindDelegate(this.getControl("quick-locations",true),"click",{tag:"a"},function(){e.setValueByLocationId(BX.data(this,"id"))})},setValueByLocationId:function(e){BX.Sale.component.location.selector.steps.superclass.setValue.apply(this,[e])},setValueByLocationIds:function(e){if(!e.PARENT_ID)return;this.flags.skipAfterSelectItemEventOnce=true;this.setValueByLocationId(e.PARENT_ID);this.bindEvent("after-control-placed",function(t){var s=t.getControl();if(s.vars.value!=false)return;if(e.IDS)this.opts.requestParamsInject={filter:{"=ID":e.IDS}};s.tryDisplayPage("toggle")})},setValueByLocationCode:function(e){var t=this.vars;if(e==null||e==false||typeof e=="undefined"||e.toString().length==0){this.displayRoute([]);this.setValueVariable("");this.setTargetValue("");this.fireEvent("after-clear-selection");return}this.fireEvent("before-set-value",[e]);var s=new BX.deferred;var i=this;s.done(BX.proxy(function(s){this.displayRoute(s);var i=t.cache.nodesByCode[e].VALUE;t.value=i;this.setTargetValue(this.checkCanSelectItem(i)?i:this.getLastValidValue())},this));s.fail(function(e){if(e=="notfound"){i.displayRoute([]);i.setValueVariable("");i.setTargetValue("");i.showError({errors:[i.opts.messages.nothingFound],type:"server-logic",options:{}})}});this.hideError();this.getRouteToNodeByCode(e,s)},setValue:function(e){if(this.opts.provideLinkBy=="id")BX.Sale.component.location.selector.steps.superclass.setValue.apply(this,[e]);else this.setValueByLocationCode(e)},setTargetValue:function(e){this.setTargetInputValue(this.opts.provideLinkBy=="code"?e?this.vars.cache.nodes[e].CODE:"":e);if(!this.flags.skipAfterSelectItemEventOnce)this.fireEvent("after-select-item",[e]);else this.flags.skipAfterSelectItemEventOnce=false},getValue:function(){if(this.opts.provideLinkBy=="id")return this.vars.value===false?"":this.vars.value;else{return this.vars.value?this.vars.cache.nodes[this.vars.value].CODE:""}},getNodeByLocationId:function(e){return this.vars.cache.nodes[e]},getSelectedPath:function(){var e=this.vars,t=[];if(typeof e.value=="undefined"||e.value==false||e.value=="")return t;if(typeof e.cache.nodes[e.value]!="undefined"){var s=e.cache.nodes[e.value];while(typeof s!="undefined"){var i=BX.clone(s);var n=i.PARENT_VALUE;delete i.PATH;delete i.PARENT_VALUE;delete i.IS_PARENT;if(typeof i.TYPE_ID!="undefined"&&typeof this.opts.types!="undefined")i.TYPE=this.opts.types[i.TYPE_ID].CODE;t.push(i);if(typeof n=="undefined"||typeof e.cache.nodes[n]=="undefined")break;else s=e.cache.nodes[n]}}return t},setInitialValue:function(){if(this.opts.selectedItem!==false)this.setValueByLocationId(this.opts.selectedItem);else if(this.ctrls.inputs.origin.value.length>0){if(this.opts.provideLinkBy=="id")this.setValueByLocationId(this.ctrls.inputs.origin.value);else this.setValueByLocationCode(this.ctrls.inputs.origin.value)}},getRouteToNodeByCode:function(e,t){var s=this.vars,i=this;if(typeof e!="undefined"&&e!==false&&e.toString().length>0){var n=[];if(typeof s.cache.nodesByCode[e]!="undefined")n=this.getRouteToNodeFromCache(s.cache.nodesByCode[e].VALUE);if(n.length==0){i.downloadBundle({request:{CODE:e},callbacks:{onLoad:function(o){for(var a in o){if(typeof s.cache.links[a]=="undefined")s.cache.incomplete[a]=true}i.fillCache(o,true);n=[];if(typeof s.cache.nodesByCode[e]!="undefined")n=this.getRouteToNodeFromCache(s.cache.nodesByCode[e].VALUE);if(n.length==0)t.reject("notfound");else t.resolve(n)},onError:function(){t.reject("internal")}},options:{}})}else t.resolve(n)}else t.resolve([])},addItem2Cache:function(e){this.vars.cache.nodes[e.VALUE]=e;this.vars.cache.nodesByCode[e.CODE]=e},controlChangeActions:function(e,t){var s=this,i=this.opts,n=this.vars,o=this.ctrls;this.hideError();if(t.length==0){s.truncateStack(e);n.value=s.getLastValidValue();s.setTargetValue(n.value);this.fireEvent("after-select-real-value")}else if(BX.util.in_array(t,i.pseudoValues)){s.truncateStack(e);s.setTargetValue(s.getLastValidValue());this.fireEvent("after-select-item",[t]);this.fireEvent("after-select-pseudo-value")}else{var a=n.cache.nodes[t];if(typeof a=="undefined")throw new Error("Selected node not found in the cache");s.truncateStack(e);if(i.dontShowNextChoice){if(a.IS_UNCHOOSABLE)s.appendControl(t)}else{if(typeof n.cache.links[t]!="undefined"||a.IS_PARENT)s.appendControl(t)}if(s.checkCanSelectItem(t)){n.value=t;s.setTargetValue(t);this.fireEvent("after-select-real-value")}}},refineRequest:function(e){var t={};var s={VALUE:"ID",DISPLAY:"NAME.NAME",1:"TYPE_ID",2:"CODE"};var i={};if(typeof e["PARENT_VALUE"]!="undefined"){t["=PARENT_ID"]=e.PARENT_VALUE;s["10"]="IS_PARENT"}if(typeof e["VALUE"]!="undefined"){t["=ID"]=e.VALUE;i["1"]="PATH"}if(BX.type.isNotEmptyString(e["CODE"])){t["=CODE"]=e.CODE;i["1"]="PATH"}if(BX.type.isNotEmptyString(this.opts.query.BEHAVIOUR.LANGUAGE_ID))t["=NAME.LANGUAGE_ID"]=this.opts.query.BEHAVIOUR.LANGUAGE_ID;if(BX.type.isNotEmptyString(this.opts.query.FILTER.SITE_ID)){if(typeof this.vars.cache.nodes[e.PARENT_VALUE]=="undefined"||this.vars.cache.nodes[e.PARENT_VALUE].IS_UNCHOOSABLE)t["=SITE_ID"]=this.opts.query.FILTER.SITE_ID}var n={select:s,filter:t,additionals:i,version:"2"};if(this.opts.requestParamsInject){for(var o in this.opts.requestParamsInject){if(this.opts.requestParamsInject.hasOwnProperty(o)){if(n[o]==undefined)n[o]={};for(var a in this.opts.requestParamsInject[o]){if(this.opts.requestParamsInject[o].hasOwnProperty(a)){if(n[o][a]!=undefined){var r=n[o][a];n[o][a]=[];n[o][a].push(r)}else{n[o][a]=[]}for(var l in this.opts.requestParamsInject[o][a])if(this.opts.requestParamsInject[o][a].hasOwnProperty(l))n[o][a].push(this.opts.requestParamsInject[o][a][l])}}}}}return n},refineResponce:function(e,t){if(e.length==0)return e;if(typeof t.PARENT_VALUE!="undefined"){var s={};s[t.PARENT_VALUE]=e["ITEMS"];e=s}else if(typeof t.VALUE!="undefined"||typeof t.CODE!="undefined"){var i={};if(typeof e.ITEMS[0]!="undefined"&&typeof e.ETC.PATH_ITEMS!="undefined"){var n=0;for(var o=e.ITEMS[0]["PATH"].length-1;o>=0;o--){var a=e.ITEMS[0]["PATH"][o];var r=e.ETC.PATH_ITEMS[a];r.IS_PARENT=true;i[n]=[r];n=r.VALUE}i[n]=[e.ITEMS[0]]}e=i}return e},showError:function(e){if(e.type!="server-logic")e.errors=[this.opts.messages.error];this.ctrls.errorMessage.innerHTML='<p><font class="errortext">'+BX.util.htmlspecialchars(e.errors.join(", "))+"</font></p>";BX.show(this.ctrls.errorMessage);BX.debug(e)}})}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:103:"/bitrix/components/bitrix/sale.location.selector.search/templates/.default/script.min.js?15956920957747";s:6:"source";s:84:"/bitrix/components/bitrix/sale.location.selector.search/templates/.default/script.js";s:3:"min";s:88:"/bitrix/components/bitrix/sale.location.selector.search/templates/.default/script.min.js";s:3:"map";s:88:"/bitrix/components/bitrix/sale.location.selector.search/templates/.default/script.map.js";}"*/
BX.namespace("BX.Sale.component.location.selector");if(typeof BX.Sale.component.location.selector.search=="undefined"&&typeof BX.ui!="undefined"&&typeof BX.ui.widget!="undefined"){BX.Sale.component.location.selector.search=function(e,t){this.parentConstruct(BX.Sale.component.location.selector.search,e);BX.merge(this,{opts:{usePagingOnScroll:true,pageSize:10,arrowScrollAdditional:2,pageUpWardOffset:3,provideLinkBy:"id",bindEvents:{"after-input-value-modify":function(){this.ctrls.fullRoute.value=""},"after-select-item":function(e){var t=this.opts;var i=this.vars.cache.nodes[e];var s=i.DISPLAY;if(typeof i.PATH=="object"){for(var o=0;o<i.PATH.length;o++){s+=", "+this.vars.cache.path[i.PATH[o]]}}this.ctrls.inputs.fake.setAttribute("title",s);this.ctrls.fullRoute.value=s;if(typeof this.opts.callback=="string"&&this.opts.callback.length>0&&this.opts.callback in window)window[this.opts.callback].apply(this,[e,this])},"after-deselect-item":function(){this.ctrls.fullRoute.value="";this.ctrls.inputs.fake.setAttribute("title","")},"before-render-variant":function(e){if(e.PATH.length>0){var t="";for(var i=0;i<e.PATH.length;i++)t+=", "+this.vars.cache.path[e.PATH[i]];e.PATH=t}else e.PATH="";var s="";if(this.vars&&this.vars.lastQuery&&this.vars.lastQuery.QUERY)s=this.vars.lastQuery.QUERY;if(BX.type.isNotEmptyString(s)){var o=[];if(this.opts.wrapSeparate)o=s.split(/\s+/);else o=[s];e["=display_wrapped"]=BX.util.wrapSubstring(e.DISPLAY+e.PATH,o,this.opts.wrapTagName,true)}else e["=display_wrapped"]=BX.util.htmlspecialchars(e.DISPLAY)}}},vars:{cache:{path:{},nodesByCode:{}}},sys:{code:"sls"}});this.handleInitStack(t,BX.Sale.component.location.selector.search,e)};BX.extend(BX.Sale.component.location.selector.search,BX.ui.autoComplete);BX.merge(BX.Sale.component.location.selector.search.prototype,{init:function(){if(typeof this.opts.pathNames=="object")BX.merge(this.vars.cache.path,this.opts.pathNames);this.pushFuncStack("buildUpDOM",BX.Sale.component.location.selector.search);this.pushFuncStack("bindEvents",BX.Sale.component.location.selector.search)},buildUpDOM:function(){var e=this.ctrls,t=this.opts,i=this.vars,s=this,o=this.sys.code;e.fullRoute=BX.create("input",{props:{className:"bx-ui-"+o+"-route"},attrs:{type:"text",disabled:"disabled",autocomplete:"off"}});BX.style(e.fullRoute,"paddingTop",BX.style(e.inputs.fake,"paddingTop"));BX.style(e.fullRoute,"paddingLeft",BX.style(e.inputs.fake,"paddingLeft"));BX.style(e.fullRoute,"paddingRight","0px");BX.style(e.fullRoute,"paddingBottom","0px");BX.style(e.fullRoute,"marginTop",BX.style(e.inputs.fake,"marginTop"));BX.style(e.fullRoute,"marginLeft",BX.style(e.inputs.fake,"marginLeft"));BX.style(e.fullRoute,"marginRight","0px");BX.style(e.fullRoute,"marginBottom","0px");if(BX.style(e.inputs.fake,"borderTopStyle")!="none"){BX.style(e.fullRoute,"borderTopStyle","solid");BX.style(e.fullRoute,"borderTopColor","transparent");BX.style(e.fullRoute,"borderTopWidth",BX.style(e.inputs.fake,"borderTopWidth"))}if(BX.style(e.inputs.fake,"borderLeftStyle")!="none"){BX.style(e.fullRoute,"borderLeftStyle","solid");BX.style(e.fullRoute,"borderLeftColor","transparent");BX.style(e.fullRoute,"borderLeftWidth",BX.style(e.inputs.fake,"borderLeftWidth"))}BX.prepend(e.fullRoute,e.container);e.inputBlock=this.getControl("input-block");e.loader=this.getControl("loader")},bindEvents:function(){var e=this;BX.bindDelegate(this.getControl("quick-locations",true),"click",{tag:"a"},function(){e.setValueByLocationId(BX.data(this,"id"))});this.vars.outSideClickScope=this.ctrls.inputBlock},setValueByLocationId:function(e,t){BX.Sale.component.location.selector.search.superclass.setValue.apply(this,[e,t])},setValueByLocationIds:function(e){if(e.IDS){this.displayPage({VALUE:e.IDS,order:{TYPE_ID:"ASC","NAME.NAME":"ASC"}})}},setValueByLocationCode:function(e,t){var i=this.vars,s=this.opts,o=this.ctrls,n=this;this.hideError();if(e==null||e==false||typeof e=="undefined"||e.toString().length==0){this.resetVariables();BX.cleanNode(o.vars);if(BX.type.isElementNode(o.nothingFound))BX.hide(o.nothingFound);this.fireEvent("after-deselect-item");this.fireEvent("after-clear-selection");return}if(t!==false)i.forceSelectSingeOnce=true;if(typeof i.cache.nodesByCode[e]=="undefined"){this.resetNavVariables();n.downloadBundle({CODE:e},function(t){n.fillCache(t,false);if(typeof i.cache.nodesByCode[e]=="undefined"){n.showNothingFound()}else{var o=i.cache.nodesByCode[e].VALUE;if(s.autoSelectIfOneVariant||i.forceSelectSingeOnce)n.selectItem(o);else n.displayVariants([o])}},function(){i.forceSelectSingeOnce=false})}else{var a=i.cache.nodesByCode[e].VALUE;if(i.forceSelectSingeOnce)this.selectItem(a);else this.displayVariants([a]);i.forceSelectSingeOnce=false}},getNodeByValue:function(e){if(this.opts.provideLinkBy=="id")return this.vars.cache.nodes[e];else return this.vars.cache.nodesByCode[e]},getNodeByLocationId:function(e){return this.vars.cache.nodes[e]},setValue:function(e){if(this.opts.provideLinkBy=="id")BX.Sale.component.location.selector.search.superclass.setValue.apply(this,[e]);else this.setValueByLocationCode(e)},getValue:function(){if(this.opts.provideLinkBy=="id")return this.vars.value===false?"":this.vars.value;else{return this.vars.value?this.vars.cache.nodes[this.vars.value].CODE:""}},getSelectedPath:function(){var e=this.vars,t=[];if(typeof e.value=="undefined"||e.value==false||e.value=="")return t;if(typeof e.cache.nodes[e.value]!="undefined"){var i=BX.clone(e.cache.nodes[e.value]);if(typeof i.TYPE_ID!="undefined"&&typeof this.opts.types!="undefined")i.TYPE=this.opts.types[i.TYPE_ID].CODE;var s=i.PATH;delete i.PATH;t.push(i);if(typeof s!="undefined"){for(var o in s){var i=BX.clone(e.cache.nodes[s[o]]);if(typeof i.TYPE_ID!="undefined"&&typeof this.opts.types!="undefined")i.TYPE=this.opts.types[i.TYPE_ID].CODE;delete i.PATH;t.push(i)}}}return t},setInitialValue:function(){if(this.opts.selectedItem!==false)this.setValueByLocationId(this.opts.selectedItem);else if(this.ctrls.inputs.origin.value.length>0){if(this.opts.provideLinkBy=="id")this.setValueByLocationId(this.ctrls.inputs.origin.value);else this.setValueByLocationCode(this.ctrls.inputs.origin.value)}},addItem2Cache:function(e){this.vars.cache.nodes[e.VALUE]=e;this.vars.cache.nodesByCode[e.CODE]=e},refineRequest:function(e){var t={};if(typeof e["QUERY"]!="undefined")t["=PHRASE"]=e.QUERY;if(typeof e["VALUE"]!="undefined")t["=ID"]=e.VALUE;if(typeof e["CODE"]!="undefined")t["=CODE"]=e.CODE;if(typeof this.opts.query.BEHAVIOUR.LANGUAGE_ID!="undefined")t["=NAME.LANGUAGE_ID"]=this.opts.query.BEHAVIOUR.LANGUAGE_ID;if(BX.type.isNotEmptyString(this.opts.query.FILTER.SITE_ID))t["=SITE_ID"]=this.opts.query.FILTER.SITE_ID;var i={select:{VALUE:"ID",DISPLAY:"NAME.NAME",1:"CODE",2:"TYPE_ID"},additionals:{1:"PATH"},filter:t,version:"2"};if(typeof e["order"]!="undefined")i["order"]=e.order;return i},refineResponce:function(e,t){if(typeof e.ETC.PATH_ITEMS!="undefined"){for(var i in e.ETC.PATH_ITEMS){if(BX.type.isNotEmptyString(e.ETC.PATH_ITEMS[i].DISPLAY))this.vars.cache.path[i]=e.ETC.PATH_ITEMS[i].DISPLAY}for(var i in e.ITEMS){var s=e.ITEMS[i];if(typeof s.PATH!="undefined"){var o=BX.clone(s.PATH);for(var n in s.PATH){var a=s.PATH[n];o.shift();if(typeof this.vars.cache.nodes[a]=="undefined"&&typeof e.ETC.PATH_ITEMS[a]!="undefined"){var l=BX.clone(e.ETC.PATH_ITEMS[a]);l.PATH=BX.clone(o);this.vars.cache.nodes[a]=l}}}}}return e.ITEMS},refineItems:function(e){return e},refineItemDataForTemplate:function(e){return e},getSelectorValue:function(e){if(this.opts.provideLinkBy=="id")return e;if(typeof this.vars.cache.nodes[e]!="undefined")return this.vars.cache.nodes[e].CODE;else return""},whenLoaderToggle:function(e){BX[e?"show":"hide"](this.ctrls.loader)}})}
/* End */
;; /* /bitrix/components/bitrix/sale.basket.basket/templates/.default/script.min.js?159569210822553*/
; /* /bitrix/components/bitrix/sale.basket.basket/templates/.default/js/mustache.min.js?15956921085835*/
; /* /bitrix/components/bitrix/sale.basket.basket/templates/.default/js/action-pool.min.js?15956921084358*/
; /* /bitrix/components/bitrix/sale.basket.basket/templates/.default/js/filter.min.js?159569210810511*/
; /* /bitrix/components/bitrix/sale.basket.basket/templates/.default/js/component.min.js?159569210837537*/
; /* /bitrix/components/bitrix/sale.products.gift.basket/templates/.default/script.min.js?15956920973259*/
; /* /bitrix/components/bitrix/catalog.item/templates/.default/script.min.js?159569191340913*/
; /* /bitrix/components/bitrix/sale.order.ajax/templates/.default/script.min.js?15956921076461*/
; /* /bitrix/components/bitrix/sale.order.ajax/templates/.default/order_ajax.js?1595692107235778*/
; /* /bitrix/components/bitrix/sale.location.selector.steps/templates/.default/script.min.js?15956921037752*/
; /* /bitrix/components/bitrix/sale.location.selector.search/templates/.default/script.min.js?15956920957747*/

//# sourceMappingURL=page_074b9f68a029c31bac5cab510660d6b2.map.js