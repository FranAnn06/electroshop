
; /* Start:"a:4:{s:4:"full";s:93:"/bitrix/templates/shop/components/bitrix/catalog.top/New/slider/script.min.js?159603652832306";s:6:"source";s:73:"/bitrix/templates/shop/components/bitrix/catalog.top/New/slider/script.js";s:3:"min";s:77:"/bitrix/templates/shop/components/bitrix/catalog.top/New/slider/script.min.js";s:3:"map";s:77:"/bitrix/templates/shop/components/bitrix/catalog.top/New/slider/script.map.js";}"*/
(function(t){if(!!t.JCCatalogTopSlider){return}var s=function(t){s.superclass.constructor.apply(this,arguments);this.nameNode=BX.create("span",{props:{className:"bx_medium bx_bt_button",id:this.id},style:typeof t.style==="object"?t.style:{},text:t.text});this.buttonNode=BX.create("span",{attrs:{className:t.ownerClass},style:{borderBottom:"0 none transparent",marginBottom:"0",position:"static"},children:[this.nameNode],events:this.contextEvents});if(BX.browser.IsIE()){this.buttonNode.setAttribute("hideFocus","hidefocus")}};BX.extend(s,BX.PopupWindowButton);t.JCCatalogTopSlider=function(t){this.productType=0;this.showQuantity=true;this.showAbsent=true;this.secondPict=false;this.showOldPrice=false;this.showPercent=false;this.showSkuProps=false;this.basketAction="ADD";this.showClosePopup=false;this.useCompare=false;this.visual={ID:"",PICT_ID:"",SECOND_PICT_ID:"",QUANTITY_ID:"",QUANTITY_UP_ID:"",QUANTITY_DOWN_ID:"",PRICE_ID:"",DSC_PERC:"",SECOND_DSC_PERC:"",DISPLAY_PROP_DIV:""};this.product={checkQuantity:false,maxQuantity:0,stepQuantity:1,isDblQuantity:false,canBuy:true,canSubscription:true,name:"",pict:{},id:0,addUrl:"",buyUrl:""};this.basketMode="";this.basketData={useProps:false,emptyProps:false,quantity:"quantity",props:"prop",basketUrl:"",sku_props:"",sku_props_var:"basket_props",add_url:"",buy_url:""};this.compareData={compareUrl:"",comparePath:""};this.defaultPict={pict:null,secondPict:null};this.checkQuantity=false;this.maxQuantity=0;this.stepQuantity=1;this.isDblQuantity=false;this.canBuy=true;this.currentBasisPrice={};this.canSubscription=true;this.precision=6;this.precisionFactor=Math.pow(10,this.precision);this.offers=[];this.offerNum=0;this.treeProps=[];this.obTreeRows=[];this.showCount=[];this.showStart=[];this.selectedValues={};this.obProduct=null;this.obQuantity=null;this.obQuantityUp=null;this.obQuantityDown=null;this.obPict=null;this.obSecondPict=null;this.obPrice=null;this.obTree=null;this.obBuyBtn=null;this.obBasketActions=null;this.obNotAvail=null;this.obDscPerc=null;this.obSecondDscPerc=null;this.obSkuProps=null;this.obMeasure=null;this.obCompare=null;this.treeRowShowSize=5;this.treeEnableArrow={display:"",cursor:"pointer",opacity:1};this.treeDisableArrow={display:"",cursor:"default",opacity:.2};this.lastElement=false;this.containerHeight=0;this.errorCode=0;if("object"===typeof t){this.productType=parseInt(t.PRODUCT_TYPE,10);this.showQuantity=t.SHOW_QUANTITY;this.showAbsent=t.SHOW_ABSENT;this.secondPict=!!t.SECOND_PICT;this.showOldPrice=!!t.SHOW_OLD_PRICE;this.showPercent=!!t.SHOW_DISCOUNT_PERCENT;this.showSkuProps=!!t.SHOW_SKU_PROPS;if(!!t.ADD_TO_BASKET_ACTION){this.basketAction=t.ADD_TO_BASKET_ACTION}this.showClosePopup=!!t.SHOW_CLOSE_POPUP;this.useCompare=!!t.DISPLAY_COMPARE;this.visual=t.VISUAL;switch(this.productType){case 0:case 1:case 2:if(!!t.PRODUCT&&"object"===typeof t.PRODUCT){if(this.showQuantity){this.product.checkQuantity=t.PRODUCT.CHECK_QUANTITY;this.product.isDblQuantity=t.PRODUCT.QUANTITY_FLOAT;if(this.product.checkQuantity){this.product.maxQuantity=this.product.isDblQuantity?parseFloat(t.PRODUCT.MAX_QUANTITY):parseInt(t.PRODUCT.MAX_QUANTITY,10)}this.product.stepQuantity=this.product.isDblQuantity?parseFloat(t.PRODUCT.STEP_QUANTITY):parseInt(t.PRODUCT.STEP_QUANTITY,10);this.checkQuantity=this.product.checkQuantity;this.isDblQuantity=this.product.isDblQuantity;this.maxQuantity=this.product.maxQuantity;this.stepQuantity=this.product.stepQuantity;if(this.isDblQuantity){this.stepQuantity=Math.round(this.stepQuantity*this.precisionFactor)/this.precisionFactor}}this.product.canBuy=t.PRODUCT.CAN_BUY;this.product.canSubscription=t.PRODUCT.SUBSCRIPTION;if(!!t.PRODUCT.BASIS_PRICE){this.currentBasisPrice=t.PRODUCT.BASIS_PRICE}this.canBuy=this.product.canBuy;this.canSubscription=this.product.canSubscription;this.product.name=t.PRODUCT.NAME;this.product.pict=t.PRODUCT.PICT;this.product.id=t.PRODUCT.ID;if(!!t.PRODUCT.ADD_URL){this.product.addUrl=t.PRODUCT.ADD_URL}if(!!t.PRODUCT.BUY_URL){this.product.buyUrl=t.PRODUCT.BUY_URL}if(!!t.BASKET&&"object"===typeof t.BASKET){this.basketData.useProps=!!t.BASKET.ADD_PROPS;this.basketData.emptyProps=!!t.BASKET.EMPTY_PROPS}}else{this.errorCode=-1}break;case 3:if(!!t.OFFERS&&BX.type.isArray(t.OFFERS)){this.product.name=t.PRODUCT.NAME;this.product.id=t.PRODUCT.ID;this.offers=t.OFFERS;this.offerNum=0;if(!!t.OFFER_SELECTED){this.offerNum=parseInt(t.OFFER_SELECTED,10)}if(isNaN(this.offerNum)){this.offerNum=0}if(!!t.TREE_PROPS){this.treeProps=t.TREE_PROPS}if(!!t.DEFAULT_PICTURE){this.defaultPict.pict=t.DEFAULT_PICTURE.PICTURE;this.defaultPict.secondPict=t.DEFAULT_PICTURE.PICTURE_SECOND}}break;default:this.errorCode=-1}if(!!t.BASKET&&"object"===typeof t.BASKET){if(!!t.BASKET.QUANTITY){this.basketData.quantity=t.BASKET.QUANTITY}if(!!t.BASKET.PROPS){this.basketData.props=t.BASKET.PROPS}if(!!t.BASKET.BASKET_URL){this.basketData.basketUrl=t.BASKET.BASKET_URL}if(3===this.productType){if(!!t.BASKET.SKU_PROPS){this.basketData.sku_props=t.BASKET.SKU_PROPS}}if(!!t.BASKET.ADD_URL_TEMPLATE){this.basketData.add_url=t.BASKET.ADD_URL_TEMPLATE}if(!!t.BASKET.BUY_URL_TEMPLATE){this.basketData.buy_url=t.BASKET.BUY_URL_TEMPLATE}if(this.basketData.add_url===""&&this.basketData.buy_url===""){this.errorCode=-1024}}if(this.useCompare){if(!!t.COMPARE&&typeof t.COMPARE==="object"){if(!!t.COMPARE.COMPARE_PATH){this.compareData.comparePath=t.COMPARE.COMPARE_PATH}if(!!t.COMPARE.COMPARE_URL_TEMPLATE){this.compareData.compareUrl=t.COMPARE.COMPARE_URL_TEMPLATE}else{this.useCompare=false}}else{this.useCompare=false}}this.lastElement=!!t.LAST_ELEMENT&&"Y"===t.LAST_ELEMENT}if(0===this.errorCode){BX.ready(BX.delegate(this.Init,this))}};t.JCCatalogTopSlider.prototype.Init=function(){var s=0,e="",i=null;this.obProduct=BX(this.visual.ID);if(!this.obProduct){this.errorCode=-1}this.obPict=BX(this.visual.PICT_ID);if(!this.obPict){this.errorCode=-2}if(this.secondPict&&!!this.visual.SECOND_PICT_ID){this.obSecondPict=BX(this.visual.SECOND_PICT_ID)}this.obPrice=BX(this.visual.PRICE_ID);if(!this.obPrice){this.errorCode=-16}if(this.showQuantity&&!!this.visual.QUANTITY_ID){this.obQuantity=BX(this.visual.QUANTITY_ID);if(!!this.visual.QUANTITY_UP_ID){this.obQuantityUp=BX(this.visual.QUANTITY_UP_ID)}if(!!this.visual.QUANTITY_DOWN_ID){this.obQuantityDown=BX(this.visual.QUANTITY_DOWN_ID)}}if(3===this.productType&&this.offers.length>0){if(!!this.visual.TREE_ID){this.obTree=BX(this.visual.TREE_ID);if(!this.obTree){this.errorCode=-256}e=this.visual.TREE_ITEM_ID;for(s=0;s<this.treeProps.length;s++){this.obTreeRows[s]={LEFT:BX(e+this.treeProps[s].ID+"_left"),RIGHT:BX(e+this.treeProps[s].ID+"_right"),LIST:BX(e+this.treeProps[s].ID+"_list"),CONT:BX(e+this.treeProps[s].ID+"_cont")};if(!this.obTreeRows[s].LEFT||!this.obTreeRows[s].RIGHT||!this.obTreeRows[s].LIST||!this.obTreeRows[s].CONT){this.errorCode=-512;break}}}if(!!this.visual.QUANTITY_MEASURE){this.obMeasure=BX(this.visual.QUANTITY_MEASURE)}}this.obBasketActions=BX(this.visual.BASKET_ACTIONS_ID);if(!!this.obBasketActions){if(!!this.visual.BUY_ID){this.obBuyBtn=BX(this.visual.BUY_ID)}}this.obNotAvail=BX(this.visual.NOT_AVAILABLE_MESS);if(this.showPercent){if(!!this.visual.DSC_PERC){this.obDscPerc=BX(this.visual.DSC_PERC)}if(this.secondPict&&!!this.visual.SECOND_DSC_PERC){this.obSecondDscPerc=BX(this.visual.SECOND_DSC_PERC)}}if(this.showSkuProps){if(!!this.visual.DISPLAY_PROP_DIV){this.obSkuProps=BX(this.visual.DISPLAY_PROP_DIV)}}if(0===this.errorCode){if(this.showQuantity){if(!!this.obQuantityUp){BX.bind(this.obQuantityUp,"click",BX.delegate(this.QuantityUp,this))}if(!!this.obQuantityDown){BX.bind(this.obQuantityDown,"click",BX.delegate(this.QuantityDown,this))}if(this.obQuantity){BX.bind(this.obQuantity,"change",BX.delegate(this.QuantityChange,this))}}switch(this.productType){case 1:break;case 3:if(this.offers.length>0){i=BX.findChildren(this.obTree,{tagName:"li"},true);if(!!i&&0<i.length){for(s=0;s<i.length;s++){BX.bind(i[s],"click",BX.delegate(this.SelectOfferProp,this))}}for(s=0;s<this.obTreeRows.length;s++){BX.bind(this.obTreeRows[s].LEFT,"click",BX.delegate(this.RowLeft,this));BX.bind(this.obTreeRows[s].RIGHT,"click",BX.delegate(this.RowRight,this))}this.SetCurrent()}break}if(!!this.obBuyBtn){if(this.basketAction==="ADD"){BX.bind(this.obBuyBtn,"click",BX.delegate(this.Add2Basket,this))}else{BX.bind(this.obBuyBtn,"click",BX.delegate(this.BuyBasket,this))}}if(this.lastElement){this.containerHeight=parseInt(this.obProduct.parentNode.offsetHeight,10);if(isNaN(this.containerHeight)){this.containerHeight=0}this.setHeight();BX.bind(t,"resize",BX.delegate(this.checkHeight,this));BX.bind(this.obProduct.parentNode,"mouseover",BX.delegate(this.setHeight,this));BX.bind(this.obProduct.parentNode,"mouseout",BX.delegate(this.clearHeight,this))}if(this.useCompare){this.obCompare=BX(this.visual.COMPARE_LINK_ID);if(!!this.obCompare){BX.bind(this.obCompare,"click",BX.proxy(this.Compare,this))}}}};t.JCCatalogTopSlider.prototype.checkHeight=function(){this.containerHeight=parseInt(this.obProduct.parentNode.offsetHeight,10);if(isNaN(this.containerHeight)){this.containerHeight=0}};t.JCCatalogTopSlider.prototype.setHeight=function(){if(0<this.containerHeight){BX.adjust(this.obProduct.parentNode,{style:{height:this.containerHeight+"px"}})}};t.JCCatalogTopSlider.prototype.clearHeight=function(){BX.adjust(this.obProduct.parentNode,{style:{height:"auto"}})};t.JCCatalogTopSlider.prototype.QuantityUp=function(){var t=0,s=true,e;if(0===this.errorCode&&this.showQuantity&&this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){t+=this.stepQuantity;if(this.checkQuantity){if(t>this.maxQuantity){s=false}}if(s){if(this.isDblQuantity){t=Math.round(t*this.precisionFactor)/this.precisionFactor}this.obQuantity.value=t;e={DISCOUNT_VALUE:this.currentBasisPrice.DISCOUNT_VALUE*t,VALUE:this.currentBasisPrice.VALUE*t,DISCOUNT_DIFF:this.currentBasisPrice.DISCOUNT_DIFF*t,DISCOUNT_DIFF_PERCENT:this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,CURRENCY:this.currentBasisPrice.CURRENCY};this.setPrice(e)}}}};t.JCCatalogTopSlider.prototype.QuantityDown=function(){var t=0,s=true,e;if(0===this.errorCode&&this.showQuantity&&this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){t-=this.stepQuantity;if(t<this.stepQuantity){s=false}if(s){if(this.isDblQuantity){t=Math.round(t*this.precisionFactor)/this.precisionFactor}this.obQuantity.value=t;e={DISCOUNT_VALUE:this.currentBasisPrice.DISCOUNT_VALUE*t,VALUE:this.currentBasisPrice.VALUE*t,DISCOUNT_DIFF:this.currentBasisPrice.DISCOUNT_DIFF*t,DISCOUNT_DIFF_PERCENT:this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,CURRENCY:this.currentBasisPrice.CURRENCY};this.setPrice(e)}}}};t.JCCatalogTopSlider.prototype.QuantityChange=function(){var t=0,s,e,i;if(0===this.errorCode&&this.showQuantity){if(this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){if(this.checkQuantity){if(t>this.maxQuantity){t=this.maxQuantity}}if(t<this.stepQuantity){t=this.stepQuantity}else{i=Math.round(t*this.precisionFactor/this.stepQuantity)/this.precisionFactor;e=parseInt(i,10);if(isNaN(e)){e=1;i=1.1}if(i>e){t=e<=1?this.stepQuantity:e*this.stepQuantity;t=Math.round(t*this.precisionFactor)/this.precisionFactor}}this.obQuantity.value=t}else{this.obQuantity.value=this.stepQuantity}}else{this.obQuantity.value=this.stepQuantity}s={DISCOUNT_VALUE:this.currentBasisPrice.DISCOUNT_VALUE*this.obQuantity.value,VALUE:this.currentBasisPrice.VALUE*this.obQuantity.value,DISCOUNT_DIFF:this.currentBasisPrice.DISCOUNT_DIFF*this.obQuantity.value,DISCOUNT_DIFF_PERCENT:this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,CURRENCY:this.currentBasisPrice.CURRENCY};this.setPrice(s)}};t.JCCatalogTopSlider.prototype.QuantitySet=function(t){if(0===this.errorCode){this.canBuy=this.offers[t].CAN_BUY;if(this.canBuy){if(!!this.obBasketActions){BX.style(this.obBasketActions,"display","")}if(!!this.obNotAvail){BX.style(this.obNotAvail,"display","none")}}else{if(!!this.obBasketActions){BX.style(this.obBasketActions,"display","none")}if(!!this.obNotAvail){BX.style(this.obNotAvail,"display","")}}if(this.showQuantity){this.isDblQuantity=this.offers[t].QUANTITY_FLOAT;this.checkQuantity=this.offers[t].CHECK_QUANTITY;if(this.isDblQuantity){this.maxQuantity=parseFloat(this.offers[t].MAX_QUANTITY);this.stepQuantity=Math.round(parseFloat(this.offers[t].STEP_QUANTITY)*this.precisionFactor)/this.precisionFactor}else{this.maxQuantity=parseInt(this.offers[t].MAX_QUANTITY,10);this.stepQuantity=parseInt(this.offers[t].STEP_QUANTITY,10)}this.obQuantity.value=this.stepQuantity;this.obQuantity.disabled=!this.canBuy;if(!!this.obMeasure){if(!!this.offers[t].MEASURE){BX.adjust(this.obMeasure,{html:this.offers[t].MEASURE})}else{BX.adjust(this.obMeasure,{html:""})}}}this.currentBasisPrice=this.offers[t].BASIS_PRICE}};t.JCCatalogTopSlider.prototype.SelectOfferProp=function(){var t=0,s="",e="",i=[],a=null,o=BX.proxy_context;if(!!o&&o.hasAttribute("data-treevalue")){e=o.getAttribute("data-treevalue");i=e.split("_");if(this.SearchOfferPropIndex(i[0],i[1])){a=BX.findChildren(o.parentNode,{tagName:"li"},false);if(!!a&&0<a.length){for(t=0;t<a.length;t++){s=a[t].getAttribute("data-onevalue");if(s===i[1]){BX.addClass(a[t],"bx_active")}else{BX.removeClass(a[t],"bx_active")}}}}}};t.JCCatalogTopSlider.prototype.SearchOfferPropIndex=function(t,s){var e="",i=false,a,o,r=[],h=[],n=-1,l={},p=[];for(a=0;a<this.treeProps.length;a++){if(this.treeProps[a].ID===t){n=a;break}}if(-1<n){for(a=0;a<n;a++){e="PROP_"+this.treeProps[a].ID;l[e]=this.selectedValues[e]}e="PROP_"+this.treeProps[n].ID;i=this.GetRowValues(l,e);if(!i){return false}if(!BX.util.in_array(s,i)){return false}l[e]=s;for(a=n+1;a<this.treeProps.length;a++){e="PROP_"+this.treeProps[a].ID;i=this.GetRowValues(l,e);if(!i){return false}h=[];if(this.showAbsent){r=[];p=[];p=BX.clone(l,true);for(o=0;o<i.length;o++){p[e]=i[o];h[h.length]=i[o];if(this.GetCanBuy(p)){r[r.length]=i[o]}}}else{r=i}if(!!this.selectedValues[e]&&BX.util.in_array(this.selectedValues[e],r)){l[e]=this.selectedValues[e]}else{if(this.showAbsent)l[e]=r.length>0?r[0]:h[0];else l[e]=r[0]}this.UpdateRow(a,l[e],i,r)}this.selectedValues=l;this.ChangeInfo()}return true};t.JCCatalogTopSlider.prototype.RowLeft=function(){var t=0,s="",e=-1,i=BX.proxy_context;if(!!i&&i.hasAttribute("data-treevalue")){s=i.getAttribute("data-treevalue");for(t=0;t<this.treeProps.length;t++){if(this.treeProps[t].ID===s){e=t;break}}if(-1<e&&this.treeRowShowSize<this.showCount[e]){if(0>this.showStart[e]){this.showStart[e]++;BX.adjust(this.obTreeRows[e].LIST,{style:{marginLeft:this.showStart[e]*20+"%"}});BX.adjust(this.obTreeRows[e].RIGHT,{style:this.treeEnableArrow})}if(0<=this.showStart[e]){BX.adjust(this.obTreeRows[e].LEFT,{style:this.treeDisableArrow})}}}};t.JCCatalogTopSlider.prototype.RowRight=function(){var t=0,s="",e=-1,i=BX.proxy_context;if(!!i&&i.hasAttribute("data-treevalue")){s=i.getAttribute("data-treevalue");for(t=0;t<this.treeProps.length;t++){if(this.treeProps[t].ID===s){e=t;break}}if(-1<e&&this.treeRowShowSize<this.showCount[e]){if(this.treeRowShowSize-this.showStart[e]<this.showCount[e]){this.showStart[e]--;BX.adjust(this.obTreeRows[e].LIST,{style:{marginLeft:this.showStart[e]*20+"%"}});BX.adjust(this.obTreeRows[e].LEFT,{style:this.treeEnableArrow})}if(this.treeRowShowSize-this.showStart[e]>=this.showCount[e]){BX.adjust(this.obTreeRows[e].RIGHT,{style:this.treeDisableArrow})}}}};t.JCCatalogTopSlider.prototype.UpdateRow=function(t,s,e,i){var a=0,o=0,r="",h=0,n="",l={},p=false,u=false,c=false,d=0,f=this.treeEnableArrow,P=this.treeEnableArrow,T=0,b=null;if(-1<t&&t<this.obTreeRows.length){b=BX.findChildren(this.obTreeRows[t].LIST,{tagName:"li"},false);if(!!b&&0<b.length){p="PICT"===this.treeProps[t].SHOW_MODE;h=e.length;u=this.treeRowShowSize<h;n=u?100/h+"%":"20%";l={props:{className:""},style:{width:n}};if(p){l.style.paddingTop=n}for(a=0;a<b.length;a++){r=b[a].getAttribute("data-onevalue");c=r===s;if(BX.util.in_array(r,i)){l.props.className=c?"bx_active":""}else{l.props.className=c?"bx_active bx_missing":"bx_missing"}l.style.display="none";if(BX.util.in_array(r,e)){l.style.display="";if(c){d=o}o++}BX.adjust(b[a],l)}l={style:{width:(u?20*h:100)+"%",marginLeft:"0%"}};if(p){BX.adjust(this.obTreeRows[t].CONT,{props:{className:u?"bx_item_detail_scu full":"bx_item_detail_scu"}})}else{BX.adjust(this.obTreeRows[t].CONT,{props:{className:u?"bx_item_detail_size full":"bx_item_detail_size"}})}if(u){if(d+1===h){P=this.treeDisableArrow}if(this.treeRowShowSize<=d){T=this.treeRowShowSize-d-1;l.style.marginLeft=T*20+"%"}if(0===T){f=this.treeDisableArrow}BX.adjust(this.obTreeRows[t].LEFT,{style:f});BX.adjust(this.obTreeRows[t].RIGHT,{style:P})}else{BX.adjust(this.obTreeRows[t].LEFT,{style:{display:"none"}});BX.adjust(this.obTreeRows[t].RIGHT,{style:{display:"none"}})}BX.adjust(this.obTreeRows[t].LIST,l);this.showCount[t]=h;this.showStart[t]=T}}};t.JCCatalogTopSlider.prototype.GetRowValues=function(t,s){var e=0,i,a=[],o=false,r=true;if(0===t.length){for(e=0;e<this.offers.length;e++){if(!BX.util.in_array(this.offers[e].TREE[s],a)){a[a.length]=this.offers[e].TREE[s]}}o=true}else{for(e=0;e<this.offers.length;e++){r=true;for(i in t){if(t[i]!==this.offers[e].TREE[i]){r=false;break}}if(r){if(!BX.util.in_array(this.offers[e].TREE[s],a)){a[a.length]=this.offers[e].TREE[s]}o=true}}}return o?a:false};t.JCCatalogTopSlider.prototype.GetCanBuy=function(t){var s=0,e,i=false,a=true;for(s=0;s<this.offers.length;s++){a=true;for(e in t){if(t[e]!==this.offers[s].TREE[e]){a=false;break}}if(a){if(this.offers[s].CAN_BUY){i=true;break}}}return i};t.JCCatalogTopSlider.prototype.SetCurrent=function(){var t=0,s=0,e=[],i="",a=false,o={},r=[],h=this.offers[this.offerNum].TREE;for(t=0;t<this.treeProps.length;t++){i="PROP_"+this.treeProps[t].ID;a=this.GetRowValues(o,i);if(!a){break}if(BX.util.in_array(h[i],a)){o[i]=h[i]}else{o[i]=a[0];this.offerNum=0}if(this.showAbsent){e=[];r=[];r=BX.clone(o,true);for(s=0;s<a.length;s++){r[i]=a[s];if(this.GetCanBuy(r)){e[e.length]=a[s]}}}else{e=a}this.UpdateRow(t,o[i],a,e)}this.selectedValues=o;this.ChangeInfo()};t.JCCatalogTopSlider.prototype.ChangeInfo=function(){var t=0,s,e=-1,i={},a=true,o="";for(t=0;t<this.offers.length;t++){a=true;for(s in this.selectedValues){if(this.selectedValues[s]!==this.offers[t].TREE[s]){a=false;break}}if(a){e=t;break}}if(-1<e){if(!!this.obPict){if(!!this.offers[e].PREVIEW_PICTURE){BX.adjust(this.obPict,{style:{backgroundImage:"url("+this.offers[e].PREVIEW_PICTURE.SRC+")"}})}else{BX.adjust(this.obPict,{style:{backgroundImage:"url("+this.defaultPict.pict.SRC+")"}})}}if(this.secondPict&&!!this.obSecondPict){if(!!this.offers[e].PREVIEW_PICTURE_SECOND){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url("+this.offers[e].PREVIEW_PICTURE_SECOND.SRC+")"}})}else if(!!this.offers[e].PREVIEW_PICTURE.SRC){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url("+this.offers[e].PREVIEW_PICTURE.SRC+")"}})}else if(!!this.defaultPict.secondPict){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url("+this.defaultPict.secondPict.SRC+")"}})}else{BX.adjust(this.obSecondPict,{style:{backgroundImage:"url("+this.defaultPict.pict.SRC+")"}})}}if(this.showSkuProps&&!!this.obSkuProps){if(0===this.offers[e].DISPLAY_PROPERTIES.length){BX.adjust(this.obSkuProps,{style:{display:"none"},html:""})}else{BX.adjust(this.obSkuProps,{style:{display:""},html:this.offers[e].DISPLAY_PROPERTIES})}}this.setPrice(this.offers[e].PRICE);this.offerNum=e;this.QuantitySet(this.offerNum)}};t.JCCatalogTopSlider.prototype.setPrice=function(t){var s,e;if(!!this.obPrice){s=BX.Currency.currencyFormat(t.DISCOUNT_VALUE,t.CURRENCY,true);if(this.showOldPrice&&t.DISCOUNT_VALUE!==t.VALUE){s+=" <span>"+BX.Currency.currencyFormat(t.VALUE,t.CURRENCY,true)+"</span>"}BX.adjust(this.obPrice,{html:s});if(this.showPercent){if(t.DISCOUNT_VALUE!==t.VALUE){e={style:{display:""},html:t.DISCOUNT_DIFF_PERCENT}}else{e={style:{display:"none"},html:""}}if(!!this.obDscPerc){BX.adjust(this.obDscPerc,e)}if(!!this.obSecondDscPerc){BX.adjust(this.obSecondDscPerc,e)}}}};t.JCCatalogTopSlider.prototype.Compare=function(){var t,s;if(!!this.compareData.compareUrl){switch(this.productType){case 0:case 1:case 2:s=this.compareData.compareUrl.replace("#ID#",this.product.id.toString());break;case 3:s=this.compareData.compareUrl.replace("#ID#",this.offers[this.offerNum].ID);break}t={ajax_action:"Y"};BX.ajax.loadJSON(s,t,BX.proxy(this.CompareResult,this))}};t.JCCatalogTopSlider.prototype.CompareResult=function(t){var e,i;if(!!this.obPopupWin)this.obPopupWin.close();if(!BX.type.isPlainObject(t))return;this.InitPopupWindow();if(t.STATUS==="OK"){BX.onCustomEvent("OnCompareChange");e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+BX.message("COMPARE_MESSAGE_OK")+"</p></div>";if(this.showClosePopup){i=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_COMPARE_REDIRECT"),events:{click:BX.delegate(this.CompareRedirect,this)},style:{marginRight:"10px"}}),new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_CLOSE_POPUP"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}else{i=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_COMPARE_REDIRECT"),events:{click:BX.delegate(this.CompareRedirect,this)}})]}}else{e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+(!!t.MESSAGE?t.MESSAGE:BX.message("COMPARE_UNKNOWN_ERROR"))+"</p></div>";i=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_CLOSE"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}this.obPopupWin.setTitleBar(BX.message("COMPARE_TITLE"));this.obPopupWin.setContent(e);this.obPopupWin.setButtons(i);this.obPopupWin.show()};t.JCCatalogTopSlider.prototype.CompareRedirect=function(){if(!!this.compareData.comparePath){location.href=this.compareData.comparePath}else{this.obPopupWin.close()}};t.JCCatalogTopSlider.prototype.InitBasketUrl=function(){this.basketUrl=this.basketMode==="ADD"?this.basketData.add_url:this.basketData.buy_url;switch(this.productType){case 1:case 2:this.basketUrl=this.basketUrl.replace("#ID#",this.product.id.toString());break;case 3:this.basketUrl=this.basketUrl.replace("#ID#",this.offers[this.offerNum].ID);break}this.basketParams={ajax_basket:"Y"};if(this.showQuantity){this.basketParams[this.basketData.quantity]=this.obQuantity.value}if(!!this.basketData.sku_props){this.basketParams[this.basketData.sku_props_var]=this.basketData.sku_props}};t.JCCatalogTopSlider.prototype.FillBasketProps=function(){if(!this.visual.BASKET_PROP_DIV){return}var t=0,s=null,e=false,i=null;if(this.basketData.useProps&&!this.basketData.emptyProps){if(!!this.obPopupWin&&!!this.obPopupWin.contentContainer){i=this.obPopupWin.contentContainer}}else{i=BX(this.visual.BASKET_PROP_DIV)}if(!!i){s=i.getElementsByTagName("select");if(!!s&&!!s.length){for(t=0;t<s.length;t++){if(!s[t].disabled){switch(s[t].type.toLowerCase()){case"select-one":this.basketParams[s[t].name]=s[t].value;e=true;break;default:break}}}}s=i.getElementsByTagName("input");if(!!s&&!!s.length){for(t=0;t<s.length;t++){if(!s[t].disabled){switch(s[t].type.toLowerCase()){case"hidden":this.basketParams[s[t].name]=s[t].value;e=true;break;case"radio":if(s[t].checked){this.basketParams[s[t].name]=s[t].value;e=true}break;default:break}}}}}if(!e){this.basketParams[this.basketData.props]=[];this.basketParams[this.basketData.props][0]=0}};t.JCCatalogTopSlider.prototype.Add2Basket=function(){this.basketMode="ADD";this.Basket()};t.JCCatalogTopSlider.prototype.BuyBasket=function(){this.basketMode="BUY";this.Basket()};t.JCCatalogTopSlider.prototype.SendToBasket=function(){if(!this.canBuy){return}this.InitBasketUrl();this.FillBasketProps();BX.ajax.loadJSON(this.basketUrl,this.basketParams,BX.delegate(this.BasketResult,this))};t.JCCatalogTopSlider.prototype.Basket=function(){var t="";if(!this.canBuy){return}switch(this.productType){case 1:case 2:if(this.basketData.useProps&&!this.basketData.emptyProps){this.InitPopupWindow();this.obPopupWin.setTitleBar(BX.message("TITLE_BASKET_PROPS"));if(BX(this.visual.BASKET_PROP_DIV)){t=BX(this.visual.BASKET_PROP_DIV).innerHTML}this.obPopupWin.setContent(t);this.obPopupWin.setButtons([new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_SEND_PROPS"),events:{click:BX.delegate(this.SendToBasket,this)}})]);this.obPopupWin.show()}else{this.SendToBasket()}break;case 3:this.SendToBasket();break}};t.JCCatalogTopSlider.prototype.BasketResult=function(t){var e="",i="",a,o=[];if(!!this.obPopupWin)this.obPopupWin.close();if(!BX.type.isPlainObject(t))return;a=t.STATUS==="OK";if(a&&this.basketAction==="BUY"){this.BasketRedirect()}else{this.InitPopupWindow();if(a){BX.onCustomEvent("OnBasketChange");switch(this.productType){case 1:case 2:i=this.product.pict.SRC;break;case 3:i=!!this.offers[this.offerNum].PREVIEW_PICTURE?this.offers[this.offerNum].PREVIEW_PICTURE.SRC:this.defaultPict.pict.SRC;break}e='<div style="width: 100%; margin: 0; text-align: center;"><img src="'+i+'" height="130" style="max-height:130px"><p>'+this.product.name+"</p></div>";if(this.showClosePopup){o=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_BASKET_REDIRECT"),events:{click:BX.delegate(this.BasketRedirect,this)},style:{marginRight:"10px"}}),new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_CLOSE_POPUP"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}else{o=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_BASKET_REDIRECT"),events:{click:BX.delegate(this.BasketRedirect,this)}})]}}else{e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+(!!t.MESSAGE?t.MESSAGE:BX.message("BASKET_UNKNOWN_ERROR"))+"</p></div>";o=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_CLOSE"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}this.obPopupWin.setTitleBar(a?BX.message("TITLE_SUCCESSFUL"):BX.message("TITLE_ERROR"));this.obPopupWin.setContent(e);this.obPopupWin.setButtons(o);this.obPopupWin.show()}};t.JCCatalogTopSlider.prototype.BasketRedirect=function(){location.href=!!this.basketData.basketUrl?this.basketData.basketUrl:BX.message("BASKET_URL")};t.JCCatalogTopSlider.prototype.InitPopupWindow=function(){if(!!this.obPopupWin)return;this.obPopupWin=BX.PopupWindowManager.create("CatalogSectionBasket_"+this.visual.ID,null,{autoHide:false,offsetLeft:0,offsetTop:0,overlay:true,closeByEsc:true,titleBar:true,closeIcon:true,contentColor:"white"})};if(!!t.JCCatalogTopSliderList){return}t.JCCatalogTopSliderList=function(t){this.params=null;this.currentIndex=0;this.size=0;this.rotate=false;this.rotateTimer=3e4;this.rotatePause=false;this.showPages=false;this.errorCode=0;this.slider={cont:null,rows:null,left:null,right:null,pagination:null,pages:null};if(!t||"object"!==typeof t){this.errorCode=-1}if(0===this.errorCode){this.params=t}if(!!this.params.rotate){this.rotate=this.params.rotate}if(!!this.params.rotateTimer){this.params.rotateTimer=parseInt(this.params.rotateTimer,10);if(!isNaN(this.params.rotateTimer)&&0<=this.params.rotateTimer){this.rotateTimer=this.params.rotateTimer}}if(0===this.errorCode){BX.ready(BX.delegate(this.Init,this))}};t.JCCatalogTopSliderList.prototype.Init=function(){if(0>this.errorCode){return}var t=0;if(!!this.params.cont){this.slider.cont=BX(this.params.cont)}if(!!this.params.rows&&BX.type.isArray(this.params.rows)){this.slider.rows=[];for(t=0;t<this.params.rows.length;t++){this.slider.rows[this.slider.rows.length]=BX(this.params.rows[t]);if(!this.slider.cont){this.slider.cont=this.slider.rows[this.slider.rows.length-1].parent}}this.size=this.slider.rows.length}if(!!this.params.left){if(BX.type.isDomNode(this.params.left)){this.slider.left=this.params.left}else if("object"===typeof this.params.left){this.slider.left=this.slider.cont.appendChild(BX.create("DIV",{props:{id:this.params.left.id,className:this.params.left.className}}))}else if(BX.type.isNotEmptyString(this.params.left)){this.slider.left=BX(this.params.left)}}if(!!this.params.right){if(BX.type.isDomNode(this.params.right)){this.slider.right=this.params.right}else if("object"===typeof this.params.right){this.slider.right=this.slider.cont.appendChild(BX.create("DIV",{props:{id:this.params.right.id,className:this.params.right.className}}))}else if(BX.type.isNotEmptyString(this.params.right)){this.slider.right=BX(this.params.right)}}if(!!this.params.pagination){if(BX.type.isDomNode(this.params.pagination)){this.slider.pagination=this.params.pagination}else if("object"===typeof this.params.pagination){this.slider.pagination=this.slider.cont.appendChild(BX.create("UL",{props:{id:this.params.pagination.id,className:this.params.pagination.className}}))}else if(BX.type.isNotEmptyString(this.params.pagination)){this.slider.pagination=BX(this.params.pagination)}}if(!!this.slider.pagination){this.showPages=true;this.slider.pages=[];for(t=0;t<this.slider.rows.length;t++){this.slider.pages[this.slider.pages.length]=this.slider.pagination.appendChild(BX.create("LI",{props:{className:0===t?"active":"notactive"},attrs:{"data-pagevalue":t.toString()},events:{click:BX.delegate(this.RowMove,this)},html:"<span></span>"}))}}if(0===this.errorCode){if(this.rotate&&!!this.slider.cont&&0<this.rotateTimer){BX.bind(this.slider.cont,"mouseover",BX.delegate(this.RotateStop,this));BX.bind(this.slider.cont,"mouseout",BX.delegate(this.RotateStart,this));setTimeout(BX.delegate(this.RowRotate,this),this.rotateTimer)}if(!!this.slider.left){BX.bind(this.slider.left,"click",BX.delegate(this.RowLeft,this))}if(!!this.slider.right){BX.bind(this.slider.right,"click",BX.delegate(this.RowRight,this))}}};t.JCCatalogTopSliderList.prototype.RowLeft=function(){if(0>this.errorCode){return}if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"notactive"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide notactive"}});this.currentIndex=(0===this.currentIndex?this.size:this.currentIndex)-1;if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"active"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide active"}})};t.JCCatalogTopSliderList.prototype.RowRight=function(){if(0>this.errorCode){return}if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"notactive"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide notactive"}});this.currentIndex++;if(this.currentIndex===this.size){this.currentIndex=0}if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"active"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide active"}})};t.JCCatalogTopSliderList.prototype.RowMove=function(){if(0>this.errorCode){return}var t=0,s=BX.proxy_context;if(!!s&&s.hasAttribute("data-pagevalue")){t=parseInt(s.getAttribute("data-pagevalue"),10);if(!isNaN(t)&&t<this.size){if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"notactive"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide notactive"}});this.currentIndex=t;if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"active"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide active"}})}}};t.JCCatalogTopSliderList.prototype.RowRotate=function(){if(0>this.errorCode){return}if(!this.rotatePause){this.RowRight()}setTimeout(BX.delegate(this.RowRotate,this),this.rotateTimer);

};t.JCCatalogTopSliderList.prototype.RotateStart=function(){if(0>this.errorCode){return}this.rotatePause=false};t.JCCatalogTopSliderList.prototype.RotateStop=function(){if(0>this.errorCode){return}this.rotatePause=true}})(window);
/* End */
;; /* /bitrix/templates/shop/components/bitrix/catalog.top/New/slider/script.min.js?159603652832306*/

//# sourceMappingURL=page_940157b135c1fdf9c38a88042d635945.map.js