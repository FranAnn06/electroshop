; /* /bitrix/js/fileman/html_editor/range.min.js?159569187848591*/
; /* /bitrix/js/fileman/html_editor/html-actions.min.js?159569187858094*/
; /* /bitrix/js/fileman/html_editor/html-views.min.js?159569187833881*/
; /* /bitrix/js/fileman/html_editor/html-parser.min.js?159569187756595*/
; /* /bitrix/js/fileman/html_editor/html-base-controls.js?159569187898161*/
; /* /bitrix/js/fileman/html_editor/html-controls.min.js?1595691878122255*/
; /* /bitrix/js/fileman/html_editor/html-components.js?159569187812580*/
; /* /bitrix/js/fileman/html_editor/html-snippets.min.js?159569187816791*/
; /* /bitrix/js/fileman/html_editor/html-editor.min.js?159569187875015*/

; /* Start:"a:4:{s:4:"full";s:59:"/bitrix/js/fileman/html_editor/range.min.js?159569187848591";s:6:"source";s:39:"/bitrix/js/fileman/html_editor/range.js";s:3:"min";s:43:"/bitrix/js/fileman/html_editor/range.min.js";s:3:"map";s:43:"/bitrix/js/fileman/html_editor/range.map.js";}"*/
(function(e){if(window.rangy){return}var t=typeof e.define=="function"&&e.define.amd;var n="object",r="function",i="undefined";var a=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"];var o=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"];var s=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"];var f=["collapse","compareEndPoints","duplicate","moveToElementText","parentElement","select","setEndPoint","getBoundingClientRect"];function c(e,t){var i=typeof e[t];return i==r||!!(i==n&&e[t])||i=="unknown"}function l(e,t){return!!(typeof e[t]==n&&e[t])}function u(e,t){return typeof e[t]!=i}function d(e){return function(t,n){var r=n.length;while(r--){if(!e(t,n[r])){return false}}return true}}var h=d(c);var g=d(l);var v=d(u);function p(e){return e&&h(e,f)&&v(e,s)}function m(e){return l(e,"body")?e.body:e.getElementsByTagName("body")[0]}var R={};var C={version:"1.3alpha.804",initialized:false,supported:true,util:{isHostMethod:c,isHostObject:l,isHostProperty:u,areHostMethods:h,areHostObjects:g,areHostProperties:v,isTextRange:p,getBody:m},features:{},modules:R,config:{alertOnFail:true,alertOnWarn:false,preferTextRange:false}};function N(e){if(l(window,"console")&&c(window.console,"log")){window.console.log(e)}}function E(e,t){if(t){window.alert(e)}else{N(e)}}function w(e){C.initialized=true;C.supported=false;E("Rangy is not supported on this page in your browser. Reason: "+e,C.config.alertOnFail)}C.fail=w;function S(e){E("Rangy warning: "+e,C.config.alertOnWarn)}C.warn=S;if({}.hasOwnProperty){C.util.extend=function(e,t,n){var r,i;for(var a in t){if(t.hasOwnProperty(a)){r=e[a];i=t[a];if(n&&r!==null&&typeof r=="object"&&i!==null&&typeof i=="object"){C.util.extend(r,i,true)}e[a]=i}}return e}}else{w("hasOwnProperty not supported")}(function(){var e=document.createElement("div");e.appendChild(document.createElement("span"));var t=[].slice;var n;try{if(t.call(e.childNodes,0)[0].nodeType==1){n=function(e){return t.call(e,0)}}}catch(r){}if(!n){n=function(e){var t=[];for(var n=0,r=e.length;n<r;++n){t[n]=e[n]}return t}}C.util.toArray=n})();var y;if(c(document,"addEventListener")){y=function(e,t,n){e.addEventListener(t,n,false)}}else if(c(document,"attachEvent")){y=function(e,t,n){e.attachEvent("on"+t,n)}}else{w("Document does not have required addEventListener or attachEvent method")}C.util.addListener=y;var O=[];function T(e){return e.message||e.description||String(e)}function _(){if(C.initialized){return}var e;var t=false,n=false;if(c(document,"createRange")){e=document.createRange();if(h(e,o)&&v(e,a)){t=true}e.detach()}var r=m(document);if(!r||r.nodeName.toLowerCase()!="body"){w("No body element found");return}if(r&&c(r,"createTextRange")){e=r.createTextRange();if(p(e)){n=true}}if(!t&&!n){w("Neither Range nor TextRange are available");return}C.initialized=true;C.features={implementsDomRange:t,implementsTextRange:n};var i,s;for(var f in R){if((i=R[f])instanceof x){i.init(i,C)}}for(var l=0,u=O.length;l<u;++l){try{O[l](C)}catch(d){s="Rangy init listener threw an exception. Continuing. Detail: "+T(d);N(s)}}}C.init=_;C.addInitListener=function(e){if(C.initialized){e(C)}else{O.push(e)}};var D=[];C.addCreateMissingNativeApiListener=function(e){D.push(e)};function A(e){e=e||window;_();for(var t=0,n=D.length;t<n;++t){D[t](e)}}C.createMissingNativeApi=A;function x(e,t,n){this.name=e;this.dependencies=t;this.initialized=false;this.supported=false;this.initializer=n}x.prototype={init:function(e){var t=this.dependencies||[];for(var n=0,r=t.length,i,a;n<r;++n){a=t[n];i=R[a];if(!i||!(i instanceof x)){throw new Error("required module '"+a+"' not found")}i.init();if(!i.supported){throw new Error("required module '"+a+"' not supported")}}this.initializer(this)},fail:function(e){this.initialized=true;this.supported=false;throw new Error("Module '"+this.name+"' failed to load: "+e)},warn:function(e){C.warn("Module "+this.name+": "+e)},deprecationNotice:function(e,t){C.warn("DEPRECATED: "+e+" in module "+this.name+"is deprecated. Please use "+t+" instead")},createError:function(e){return new Error("Error in Rangy "+this.name+" module: "+e)}};function P(e,t,n,r){var i=new x(t,n,function(e){if(!e.initialized){e.initialized=true;try{r(C,e);e.supported=true}catch(n){var i="Module '"+t+"' failed to load: "+T(n);N(i)}}});R[t]=i}C.createModule=function(e){var t,n;if(arguments.length==2){t=arguments[1];n=[]}else{t=arguments[2];n=arguments[1]}P(false,e,n,t)};C.createCoreModule=function(e,t,n){P(true,e,t,n)};function b(){}C.RangePrototype=b;C.rangePrototype=new b;function I(){}C.selectionPrototype=new I;var B=false;var H=function(e){if(!B){B=true;if(!C.initialized){_()}}};if(typeof window==i){w("No window found");return}if(typeof document==i){w("No document found");return}if(c(document,"addEventListener")){document.addEventListener("DOMContentLoaded",H,false)}y(window,"load",H);if(t){e.define(function(){C.amd=true;return C})}e.rangy=C})(this);rangy.createCoreModule("DomUtil",[],function(e,t){var n="undefined";var r=e.util;if(!r.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])){t.fail("document missing a Node creation method")}if(!r.isHostMethod(document,"getElementsByTagName")){t.fail("document missing getElementsByTagName method")}var i=document.createElement("div");if(!r.areHostMethods(i,["insertBefore","appendChild","cloneNode"]||!r.areHostObjects(i,["previousSibling","nextSibling","childNodes","parentNode"]))){t.fail("Incomplete Element implementation")}if(!r.isHostProperty(i,"innerHTML")){t.fail("Element is missing innerHTML property")}var a=document.createTextNode("test");if(!r.areHostMethods(a,["splitText","deleteData","insertData","appendData","cloneNode"]||!r.areHostObjects(i,["previousSibling","nextSibling","childNodes","parentNode"])||!r.areHostProperties(a,["data"]))){t.fail("Incomplete Text Node implementation")}var o=function(e,t){var n=e.length;while(n--){if(e[n]===t){return true}}return false};function s(e){var t;return typeof e.namespaceURI==n||((t=e.namespaceURI)===null||t=="http://www.w3.org/1999/xhtml")}function f(e){var t=e.parentNode;return t.nodeType==1?t:null}function c(e){var t=0;while(e=e.previousSibling){++t}return t}function l(e){switch(e.nodeType){case 7:case 10:return 0;case 3:case 8:return e.length;default:return e.childNodes.length}}function u(e,t){var n=[],r;for(r=e;r;r=r.parentNode){n.push(r)}for(r=t;r;r=r.parentNode){if(o(n,r)){return r}}return null}function d(e,t,n){var r=n?t:t.parentNode;while(r){if(r===e){return true}else{r=r.parentNode}}return false}function h(e,t){return d(e,t,true)}function g(e,t,n){var r,i=n?e:e.parentNode;while(i){r=i.parentNode;if(r===t){return i}i=r}return null}function v(e){var t=e.nodeType;return t==3||t==4||t==8}function p(e){if(!e){return false}var t=e.nodeType;return t==3||t==8}function m(e,t){var n=t.nextSibling,r=t.parentNode;if(n){r.insertBefore(e,n)}else{r.appendChild(e)}return e}function R(e,t,n){var r=e.cloneNode(false);r.deleteData(0,t);e.deleteData(t,e.length-t);m(r,e);if(n){for(var i=0,a;a=n[i++];){if(a.node==e&&a.offset>t){a.node=r;a.offset-=t}else if(a.node==e.parentNode&&a.offset>c(e)){++a.offset}}}return r}function C(e){if(e.nodeType==9){return e}else if(typeof e.ownerDocument!=n){return e.ownerDocument}else if(typeof e.document!=n){return e.document}else if(e.parentNode){return C(e.parentNode)}else{throw t.createError("getDocument: no document found for node")}}function N(e){var r=C(e);if(typeof r.defaultView!=n){return r.defaultView}else if(typeof r.parentWindow!=n){return r.parentWindow}else{throw t.createError("Cannot get a window object for node")}}function E(e){if(typeof e.contentDocument!=n){return e.contentDocument}else if(typeof e.contentWindow!=n){return e.contentWindow.document}else{throw t.createError("getIframeDocument: No Document object found for iframe element")}}function w(e){if(typeof e.contentWindow!=n){return e.contentWindow}else if(typeof e.contentDocument!=n){return e.contentDocument.defaultView}else{throw t.createError("getIframeWindow: No Window object found for iframe element")}}function S(e){return e&&r.isHostMethod(e,"setTimeout")&&r.isHostObject(e,"document")}function y(e,t,n){var i;if(!e){i=document}else if(r.isHostProperty(e,"nodeType")){i=e.nodeType==1&&e.tagName.toLowerCase()=="iframe"?E(e):C(e)}else if(S(e)){i=e.document}if(!i){throw t.createError(n+"(): Parameter must be a Window object or DOM node")}return i}function O(e){var t;while(t=e.parentNode){e=t}return e}function T(e,n,r,i){var a,o,s,f,l;if(e==r){return n===i?0:n<i?-1:1}else if(a=g(r,e,true)){return n<=c(a)?-1:1}else if(a=g(e,r,true)){return c(a)<i?-1:1}else{o=u(e,r);if(!o){throw new Error("comparePoints error: nodes have no common ancestor")}s=e===o?o:g(e,o,true);f=r===o?o:g(r,o,true);if(s===f){throw t.createError("comparePoints got to case 4 and childA and childB are the same!")}else{l=o.firstChild;while(l){if(l===s){return-1}else if(l===f){return 1}l=l.nextSibling}}}}var _=false;function D(e){try{e.parentNode;return false}catch(t){return true}}(function(){var t=document.createElement("b");t.innerHTML="1";var n=t.firstChild;t.innerHTML="<br>";_=D(n);e.features.crashyTextNodes=_})();function A(e){if(!e){return"[No node]"}if(_&&D(e)){return"[Broken node]"}if(v(e)){return'"'+e.data+'"'}if(e.nodeType==1){var t=e.id?' id="'+e.id+'"':"";return"<"+e.nodeName+t+">["+c(e)+"]["+e.childNodes.length+"]["+(e.innerHTML||"[innerHTML not supported]").slice(0,25)+"]"}return e.nodeName}function x(e){var t=C(e).createDocumentFragment(),n;while(n=e.firstChild){t.appendChild(n)}return t}var P;if(typeof window.getComputedStyle!=n){P=function(e,t){return N(e).getComputedStyle(e,null)[t]}}else if(typeof document.documentElement.currentStyle!=n){P=function(e,t){return e.currentStyle[t]}}else{t.fail("No means of obtaining computed style properties found")}function b(e){this.root=e;this._next=e}b.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var e=this._current=this._next;var t,n;if(this._current){t=e.firstChild;if(t){this._next=t}else{n=null;while(e!==this.root&&!(n=e.nextSibling)){e=e.parentNode}this._next=n}}return this._current},detach:function(){this._current=this._next=this.root=null}};function I(e){return new b(e)}function B(e,t){this.node=e;this.offset=t}B.prototype={equals:function(e){return!!e&&this.node===e.node&&this.offset==e.offset},inspect:function(){return"[DomPosition("+A(this.node)+":"+this.offset+")]"},toString:function(){return this.inspect()}};function H(e){this.code=this[e];this.codeName=e;this.message="DOMException: "+this.codeName}H.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};H.prototype.toString=function(){return this.message};e.dom={arrayContains:o,isHtmlNamespace:s,parentElement:f,getNodeIndex:c,getNodeLength:l,getCommonAncestor:u,isAncestorOf:d,isOrIsAncestorOf:h,getClosestAncestorIn:g,isCharacterDataNode:v,isTextOrCommentNode:p,insertAfter:m,splitDataNode:R,getDocument:C,getWindow:N,getIframeWindow:w,getIframeDocument:E,getBody:r.getBody,isWindow:S,getContentDocument:y,getRootContainer:O,comparePoints:T,isBrokenNode:D,inspectNode:A,getComputedStyleProperty:P,fragmentFromNodeChildren:x,createIterator:I,DomPosition:B};e.DOMException=H});rangy.createCoreModule("DomRange",["DomUtil"],function(e,t){var n=e.dom;var r=e.util;var i=n.DomPosition;var a=e.DOMException;var o=n.isCharacterDataNode;var s=n.getNodeIndex;var f=n.isOrIsAncestorOf;var c=n.getDocument;var l=n.comparePoints;var u=n.splitDataNode;var d=n.getClosestAncestorIn;var h=n.getNodeLength;var g=n.arrayContains;var v=n.getRootContainer;var p=e.features.crashyTextNodes;function m(e,t){return e.nodeType!=3&&(f(e,t.startContainer)||f(e,t.endContainer))}function R(e){return e.document||c(e.startContainer)}function C(e){return new i(e.parentNode,s(e))}function N(e){return new i(e.parentNode,s(e)+1)}function E(e,t,r){var i=e.nodeType==11?e.firstChild:e;if(o(t)){if(r==t.length){n.insertAfter(e,t)}else{t.parentNode.insertBefore(e,r==0?t:u(t,r))}}else if(r>=t.childNodes.length){t.appendChild(e)}else{t.insertBefore(e,t.childNodes[r])}return i}function w(e,t,n){Z(e);Z(t);if(R(t)!=R(e)){throw new a("WRONG_DOCUMENT_ERR")}var r=l(e.startContainer,e.startOffset,t.endContainer,t.endOffset),i=l(e.endContainer,e.endOffset,t.startContainer,t.startOffset);return n?r<=0&&i>=0:r<0&&i>0}function S(e){var t;for(var n,r=R(e.range).createDocumentFragment(),i;n=e.next();){t=e.isPartiallySelectedSubtree();n=n.cloneNode(!t);if(t){i=e.getSubtreeIterator();n.appendChild(S(i));i.detach(true)}if(n.nodeType==10){throw new a("HIERARCHY_REQUEST_ERR")}r.appendChild(n)}return r}function y(e,t,r){var i,a;r=r||{stop:false};for(var o,s;o=e.next();){if(e.isPartiallySelectedSubtree()){if(t(o)===false){r.stop=true;return}else{s=e.getSubtreeIterator();y(s,t,r);s.detach(true);if(r.stop){return}}}else{i=n.createIterator(o);while(a=i.next()){if(t(a)===false){r.stop=true;return}}}}}function O(e){var t;while(e.next()){if(e.isPartiallySelectedSubtree()){t=e.getSubtreeIterator();O(t);t.detach(true)}else{e.remove()}}}function T(e){for(var t,n=R(e.range).createDocumentFragment(),r;t=e.next();){if(e.isPartiallySelectedSubtree()){t=t.cloneNode(false);r=e.getSubtreeIterator();t.appendChild(T(r));r.detach(true)}else{e.remove()}if(t.nodeType==10){throw new a("HIERARCHY_REQUEST_ERR")}n.appendChild(t)}return n}function _(e,t,n){var r=!!(t&&t.length),i;var a=!!n;if(r){i=new RegExp("^("+t.join("|")+")$")}var s=[];y(new A(e,false),function(t){if(r&&!i.test(t.nodeType)){return}if(a&&!n(t)){return}var f=e.startContainer;if(t==f&&o(f)&&e.startOffset==f.length){return}var c=e.endContainer;if(t==c&&o(c)&&e.endOffset==0){return}s.push(t)});return s}function D(e){var t=typeof e.getName=="undefined"?"Range":e.getName();return"["+t+"("+n.inspectNode(e.startContainer)+":"+e.startOffset+", "+n.inspectNode(e.endContainer)+":"+e.endOffset+")]"}function A(e,t){this.range=e;this.clonePartiallySelectedTextNodes=t;if(!e.collapsed){this.sc=e.startContainer;this.so=e.startOffset;this.ec=e.endContainer;this.eo=e.endOffset;var n=e.commonAncestorContainer;if(this.sc===this.ec&&o(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===n&&!o(this.sc)?this.sc.childNodes[this.so]:d(this.sc,n,true);this._last=this.ec===n&&!o(this.ec)?this.ec.childNodes[this.eo-1]:d(this.ec,n,true)}}}A.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var e=this._current=this._next;if(e){this._next=e!==this._last?e.nextSibling:null;if(o(e)&&this.clonePartiallySelectedTextNodes){if(e===this.ec){(e=e.cloneNode(true)).deleteData(this.eo,e.length-this.eo)}if(this._current===this.sc){(e=e.cloneNode(true)).deleteData(0,this.so)}}}return e},remove:function(){var e=this._current,t,n;if(o(e)&&(e===this.sc||e===this.ec)){t=e===this.sc?this.so:0;n=e===this.ec?this.eo:e.length;if(t!=n){e.deleteData(t,n-t)}}else{if(e.parentNode){e.parentNode.removeChild(e)}else{}}},isPartiallySelectedSubtree:function(){var e=this._current;return m(e,this.range)},getSubtreeIterator:function(){var e;if(this.isSingleCharacterDataNode){e=this.range.cloneRange();e.collapse(false)}else{e=new Re(R(this.range));var t=this._current;var n=t,r=0,i=t,a=h(t);if(f(t,this.sc)){n=this.sc;r=this.so}if(f(t,this.ec)){i=this.ec;a=this.eo}pe(e,n,r,i,a)}return new A(e,this.clonePartiallySelectedTextNodes)},detach:function(e){if(e){this.range.detach()}this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};function x(e){this.code=this[e];this.codeName=e;this.message="RangeException: "+this.codeName}x.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};x.prototype.toString=function(){return this.message};var P=[1,3,4,5,7,8,10];var b=[2,9,11];var I=[5,6,10,12];var B=[1,3,4,5,7,8,10,11];var H=[1,3,4,5,7,8];function M(e){return function(t,n){var r,i=n?t:t.parentNode;while(i){r=i.nodeType;if(g(e,r)){return i}i=i.parentNode}return null}}var L=M([9,11]);var W=M(I);var k=M([6,10,12]);function F(e,t){if(k(e,t)){throw new x("INVALID_NODE_TYPE_ERR")}}function U(e){if(!e.startContainer){throw new a("INVALID_STATE_ERR")}}function j(e,t){if(!g(t,e.nodeType)){throw new x("INVALID_NODE_TYPE_ERR")}}function V(e,t){if(t<0||t>(o(e)?e.length:e.childNodes.length)){throw new a("INDEX_SIZE_ERR")}}function z(e,t){if(L(e,true)!==L(t,true)){throw new a("WRONG_DOCUMENT_ERR")}}function Y(e){if(W(e,true)){throw new a("NO_MODIFICATION_ALLOWED_ERR")}}function q(e,t){if(!e){throw new a(t)}}function Q(e){return p&&n.isBrokenNode(e)||!g(b,e.nodeType)&&!L(e,true)}function G(e,t){return t<=(o(e)?e.length:e.childNodes.length)}function X(e){return!!e.startContainer&&!!e.endContainer&&!Q(e.startContainer)&&!Q(e.endContainer)&&G(e.startContainer,e.startOffset)&&G(e.endContainer,e.endOffset)}function Z(e){U(e);if(!X(e)){throw new Error("Range error: Range is no longer valid after DOM mutation ("+e.inspect()+")")}}var $=document.createElement("style");var J=false;try{$.innerHTML="<b>x</b>";J=$.firstChild.nodeType==3}catch(K){}e.features.htmlParsingConforms=J;var ee=J?function(e){var t=this.startContainer;var r=c(t);if(!t){throw new a("INVALID_STATE_ERR")}var i=null;if(t.nodeType==1){i=t}else if(o(t)){i=n.parentElement(t)}if(i===null||i.nodeName=="HTML"&&n.isHtmlNamespace(c(i).documentElement)&&n.isHtmlNamespace(i)){i=r.createElement("body")}else{i=i.cloneNode(false)}i.innerHTML=e;return n.fragmentFromNodeChildren(i)}:function(e){U(this);var t=R(this);var r=t.createElement("body");r.innerHTML=e;return n.fragmentFromNodeChildren(r)};function te(e,t){Z(e);var n=e.startContainer,r=e.startOffset,i=e.endContainer,a=e.endOffset;var f=n===i;if(o(i)&&a>0&&a<i.length){u(i,a,t)}if(o(n)&&r>0&&r<n.length){n=u(n,r,t);if(f){a-=r;i=n}else if(i==n.parentNode&&a>=s(n)){a++}r=0}e.setStartAndEnd(n,r,i,a)}var ne=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"];var re=0,ie=1,ae=2,oe=3;var se=0,fe=1,ce=2,le=3;r.extend(e.rangePrototype,{compareBoundaryPoints:function(e,t){Z(this);z(this.startContainer,t.startContainer);var n,r,i,a;var o=e==oe||e==re?"start":"end";var s=e==ie||e==re?"start":"end";n=this[o+"Container"];r=this[o+"Offset"];i=t[s+"Container"];a=t[s+"Offset"];return l(n,r,i,a)},insertNode:function(e){Z(this);j(e,B);Y(this.startContainer);if(f(e,this.startContainer)){throw new a("HIERARCHY_REQUEST_ERR")}var t=E(e,this.startContainer,this.startOffset);this.setStartBefore(t)},cloneContents:function(){Z(this);var e,t;if(this.collapsed){return R(this).createDocumentFragment()}else{if(this.startContainer===this.endContainer&&o(this.startContainer)){e=this.startContainer.cloneNode(true);e.data=e.data.slice(this.startOffset,this.endOffset);t=R(this).createDocumentFragment();t.appendChild(e);return t}else{var n=new A(this,true);e=S(n);n.detach()}return e}},canSurroundContents:function(){Z(this);Y(this.startContainer);Y(this.endContainer);var e=new A(this,true);var t=e._first&&m(e._first,this)||e._last&&m(e._last,this);e.detach();return!t},surroundContents:function(e){j(e,H);if(!this.canSurroundContents()){throw new x("BAD_BOUNDARYPOINTS_ERR")}var t=this.extractContents();if(e.hasChildNodes()){while(e.lastChild){e.removeChild(e.lastChild)}}E(e,this.startContainer,this.startOffset);e.appendChild(t);this.selectNode(e)},cloneRange:function(){Z(this);var e=new Re(R(this));var t=ne.length,n;while(t--){n=ne[t];e[n]=this[n]}return e},toString:function(){Z(this);var e=this.startContainer;if(e===this.endContainer&&o(e)){return e.nodeType==3||e.nodeType==4?e.data.slice(this.startOffset,this.endOffset):""}else{var t=[],n=new A(this,true);y(n,function(e){if(e.nodeType==3||e.nodeType==4){t.push(e.data)}});n.detach();return t.join("")}},compareNode:function(e){Z(this);var t=e.parentNode;var n=s(e);if(!t){throw new a("NOT_FOUND_ERR")}var r=this.comparePoint(t,n),i=this.comparePoint(t,n+1);if(r<0){return i>0?ce:se}else{return i>0?fe:le}},comparePoint:function(e,t){Z(this);q(e,"HIERARCHY_REQUEST_ERR");z(e,this.startContainer);if(l(e,t,this.startContainer,this.startOffset)<0){return-1}else if(l(e,t,this.endContainer,this.endOffset)>0){return 1}return 0},createContextualFragment:ee,toHtml:function(){Z(this);var e=this.commonAncestorContainer.parentNode.cloneNode(false);e.appendChild(this.cloneContents());return e.innerHTML},intersectsNode:function(e,t){Z(this);q(e,"NOT_FOUND_ERR");if(c(e)!==R(this)){return false}var n=e.parentNode,r=s(e);q(n,"NOT_FOUND_ERR");var i=l(n,r,this.endContainer,this.endOffset),a=l(n,r+1,this.startContainer,this.startOffset);return t?i<=0&&a>=0:i<0&&a>0},isPointInRange:function(e,t){Z(this);q(e,"HIERARCHY_REQUEST_ERR");z(e,this.startContainer);return l(e,t,this.startContainer,this.startOffset)>=0&&l(e,t,this.endContainer,this.endOffset)<=0},intersectsRange:function(e){return w(this,e,false)},intersectsOrTouchesRange:function(e){return w(this,e,true)},intersection:function(e){if(this.intersectsRange(e)){var t=l(this.startContainer,this.startOffset,e.startContainer,e.startOffset),n=l(this.endContainer,this.endOffset,e.endContainer,e.endOffset);var r=this.cloneRange();if(t==-1){r.setStart(e.startContainer,e.startOffset)}if(n==1){r.setEnd(e.endContainer,e.endOffset)}return r}return null},union:function(e){if(this.intersectsOrTouchesRange(e)){var t=this.cloneRange();if(l(e.startContainer,e.startOffset,this.startContainer,this.startOffset)==-1){t.setStart(e.startContainer,e.startOffset)}if(l(e.endContainer,e.endOffset,this.endContainer,this.endOffset)==1){t.setEnd(e.endContainer,e.endOffset)}return t}else{throw new x("Ranges do not intersect")}},containsNode:function(e,t){if(t){return this.intersectsNode(e,false)}else{return this.compareNode(e)==le}},containsNodeContents:function(e){return this.comparePoint(e,0)>=0&&this.comparePoint(e,h(e))<=0},containsRange:function(e){var t=this.intersection(e);return t!==null&&e.equals(t)},containsNodeText:function(e){var t=this.cloneRange();t.selectNode(e);var n=t.getNodes([3]);if(n.length>0){t.setStart(n[0],0);var r=n.pop();t.setEnd(r,r.length);var i=this.containsRange(t);t.detach();return i}else{return this.containsNodeContents(e)}},getNodes:function(e,t){Z(this);return _(this,e,t)},getDocument:function(){return R(this)},collapseBefore:function(e){U(this);this.setEndBefore(e);this.collapse(false)},collapseAfter:function(e){U(this);this.setStartAfter(e);this.collapse(true)},getBookmark:function(t){var r=R(this);var i=e.createRange(r);t=t||n.getBody(r);i.selectNodeContents(t);var a=this.intersection(i);var o=0,s=0;if(a){i.setEnd(a.startContainer,a.startOffset);o=i.toString().length;s=o+a.toString().length;i.detach()}return{start:o,end:s,containerNode:t}},moveToBookmark:function(e){var t=e.containerNode;var n=0;this.setStart(t,0);this.collapse(true);var r=[t],i,a=false,o=false;var s,f,c;while(!o&&(i=r.pop())){if(i.nodeType==3){s=n+i.length;if(!a&&e.start>=n&&e.start<=s){this.setStart(i,e.start-n);a=true}if(a&&e.end>=n&&e.end<=s){this.setEnd(i,e.end-n);o=true}n=s}else{c=i.childNodes;f=c.length;while(f--){r.push(c[f])}}}},getName:function(){return"DomRange"},equals:function(e){return Re.rangesEqual(this,e)},isValid:function(){return X(this)},inspect:function(){return D(this)}});function ue(e){e.START_TO_START=re;e.START_TO_END=ie;e.END_TO_END=ae;e.END_TO_START=oe;e.NODE_BEFORE=se;e.NODE_AFTER=fe;e.NODE_BEFORE_AND_AFTER=ce;e.NODE_INSIDE=le}function de(e){ue(e);ue(e.prototype)}function he(e,t){return function(){Z(this);var n=this.startContainer,r=this.startOffset,i=this.commonAncestorContainer;var a=new A(this,true);var o,s;if(n!==i){o=d(n,i,true);s=N(o);n=s.node;r=s.offset}y(a,Y);a.reset();var f=e(a);a.detach();t(this,n,r,n,r);return f}}function ge(t,n,i){function a(e,t){return function(n){U(this);j(n,P);j(v(n),b);var r=(e?C:N)(n);(t?f:c)(this,r.node,r.offset)}}function f(e,t,r){var i=e.endContainer,a=e.endOffset;if(t!==e.startContainer||r!==e.startOffset){if(v(t)!=v(i)||l(t,r,i,a)==1){i=t;a=r}n(e,t,r,i,a)}}function c(e,t,r){var i=e.startContainer,a=e.startOffset;if(t!==e.endContainer||r!==e.endOffset){if(v(t)!=v(i)||l(t,r,i,a)==-1){i=t;a=r}n(e,i,a,t,r)}}var u=function(){};u.prototype=e.rangePrototype;t.prototype=new u;r.extend(t.prototype,{setStart:function(e,t){U(this);F(e,true);V(e,t);f(this,e,t)},setEnd:function(e,t){U(this);F(e,true);V(e,t);c(this,e,t)},setStartAndEnd:function(){U(this);var e=arguments;var t=e[0],r=e[1],i=t,a=r;switch(e.length){case 3:a=e[2];break;case 4:i=e[2];a=e[3];break}n(this,t,r,i,a)},setBoundary:function(e,t,n){this["set"+(n?"Start":"End")](e,t)},setStartBefore:a(true,true),setStartAfter:a(false,true),setEndBefore:a(true,false),setEndAfter:a(false,false),collapse:function(e){Z(this);if(e){n(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset)}else{n(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)}},selectNodeContents:function(e){U(this);F(e,true);n(this,e,0,e,h(e))},selectNode:function(e){U(this);F(e,false);j(e,P);var t=C(e),r=N(e);n(this,t.node,t.offset,r.node,r.offset)},extractContents:he(T,n),deleteContents:he(O,n),canSurroundContents:function(){Z(this);Y(this.startContainer);Y(this.endContainer);var e=new A(this,true);var t=e._first&&m(e._first,this)||e._last&&m(e._last,this);e.detach();return!t},detach:function(){i(this)},splitBoundaries:function(){te(this)},splitBoundariesPreservingPositions:function(e){te(this,e)},normalizeBoundaries:function(){Z(this);var e=this.startContainer,t=this.startOffset,r=this.endContainer,i=this.endOffset;var a=function(e){var t=e.nextSibling;if(t&&t.nodeType==e.nodeType){r=e;i=e.length;e.appendData(t.data);t.parentNode.removeChild(t)}};var f=function(n){var a=n.previousSibling;if(a&&a.nodeType==n.nodeType){e=n;var o=n.length;t=a.length;n.insertData(0,a.data);a.parentNode.removeChild(a);if(e==r){i+=t;r=e}else if(r==n.parentNode){var f=s(n);if(i==f){r=n;i=o}else if(i>f){i--}}}};var c=true;if(o(r)){if(r.length==i){a(r)}}else{if(i>0){var l=r.childNodes[i-1];if(l&&o(l)){a(l)}}c=!this.collapsed}if(c){if(o(e)){if(t==0){f(e)}}else{if(t<e.childNodes.length){var u=e.childNodes[t];if(u&&o(u)){f(u)}}}}else{e=r;t=i}n(this,e,t,r,i)},collapseToPoint:function(e,t){U(this);F(e,true);V(e,t);this.setStartAndEnd(e,t)}});de(t)}function ve(e){e.collapsed=e.startContainer===e.endContainer&&e.startOffset===e.endOffset;e.commonAncestorContainer=e.collapsed?e.startContainer:n.getCommonAncestor(e.startContainer,e.endContainer)}function pe(e,t,r,i,a){e.startContainer=t;e.startOffset=r;e.endContainer=i;e.endOffset=a;e.document=n.getDocument(t);ve(e)}function me(e){U(e);e.startContainer=e.startOffset=e.endContainer=e.endOffset=e.document=null;e.collapsed=e.commonAncestorContainer=null}function Re(e){this.startContainer=e;this.startOffset=0;this.endContainer=e;this.endOffset=0;this.document=e;ve(this)}ge(Re,pe,me);r.extend(Re,{rangeProperties:ne,RangeIterator:A,copyComparisonConstants:de,createPrototypeRange:ge,inspect:D,getRangeDocument:R,rangesEqual:function(e,t){return e.startContainer===t.startContainer&&e.startOffset===t.startOffset&&e.endContainer===t.endContainer&&e.endOffset===t.endOffset}});e.DomRange=Re;e.RangeException=x});rangy.createCoreModule("WrappedRange",["DomRange"],function(e,t){var n,r;var i=e.dom;var a=e.util;var o=i.DomPosition;var s=e.DomRange;var f=i.getBody;var c=i.getContentDocument;var l=i.isCharacterDataNode;if(e.features.implementsDomRange){(function(){var r;var o=s.rangeProperties;function l(e){var t=o.length,n;while(t--){n=o[t];e[n]=e.nativeRange[n]}e.collapsed=e.startContainer===e.endContainer&&e.startOffset===e.endOffset}function u(e,t,n,r,i){var a=e.startContainer!==t||e.startOffset!=n;var o=e.endContainer!==r||e.endOffset!=i;var s=!e.equals(e.nativeRange);if(a||o||s){e.setEnd(r,i);e.setStart(t,n)}}function d(e){e.nativeRange.detach();e.detached=true;var t=o.length;while(t--){e[o[t]]=null}}var h;n=function(e){if(!e){throw t.createError("WrappedRange: Range must be specified")}this.nativeRange=e;l(this)};s.createPrototypeRange(n,u,d);r=n.prototype;r.selectNode=function(e){this.nativeRange.selectNode(e);l(this)};r.cloneContents=function(){return this.nativeRange.cloneContents()};r.surroundContents=function(e){this.nativeRange.surroundContents(e);l(this)};r.collapse=function(e){this.nativeRange.collapse(e);l(this)};r.cloneRange=function(){return new n(this.nativeRange.cloneRange())};r.refresh=function(){l(this)};r.toString=function(){return this.nativeRange.toString()};var g=document.createTextNode("test");f(document).appendChild(g);var v=document.createRange();v.setStart(g,0);v.setEnd(g,0);try{v.setStart(g,1);r.setStart=function(e,t){this.nativeRange.setStart(e,t);l(this)};r.setEnd=function(e,t){this.nativeRange.setEnd(e,t);l(this)};h=function(e){return function(t){this.nativeRange[e](t);l(this)}}}catch(p){r.setStart=function(e,t){try{this.nativeRange.setStart(e,t)}catch(n){this.nativeRange.setEnd(e,t);this.nativeRange.setStart(e,t)}l(this)};r.setEnd=function(e,t){try{this.nativeRange.setEnd(e,t)}catch(n){this.nativeRange.setStart(e,t);this.nativeRange.setEnd(e,t)}l(this)};h=function(e,t){return function(n){try{this.nativeRange[e](n)}catch(r){this.nativeRange[t](n);this.nativeRange[e](n)}l(this)}}}r.setStartBefore=h("setStartBefore","setEndBefore");r.setStartAfter=h("setStartAfter","setEndAfter");r.setEndBefore=h("setEndBefore","setStartBefore");r.setEndAfter=h("setEndAfter","setStartAfter");r.selectNodeContents=function(e){this.setStartAndEnd(e,0,i.getNodeLength(e))};v.selectNodeContents(g);v.setEnd(g,3);var m=document.createRange();m.selectNodeContents(g);m.setEnd(g,4);m.setStart(g,2);if(v.compareBoundaryPoints(v.START_TO_END,m)==-1&&v.compareBoundaryPoints(v.END_TO_START,m)==1){r.compareBoundaryPoints=function(e,t){t=t.nativeRange||t;if(e==t.START_TO_END){e=t.END_TO_START}else if(e==t.END_TO_START){e=t.START_TO_END}return this.nativeRange.compareBoundaryPoints(e,t)}}else{r.compareBoundaryPoints=function(e,t){return this.nativeRange.compareBoundaryPoints(e,t.nativeRange||t)}}var R=document.createElement("div");R.innerHTML="123";var C=R.firstChild;var N=f(document);N.appendChild(R);v.setStart(C,1);v.setEnd(C,2);v.deleteContents();if(C.data=="13"){r.deleteContents=function(){this.nativeRange.deleteContents();l(this)};r.extractContents=function(){var e=this.nativeRange.extractContents();l(this);return e}}else{}N.removeChild(R);N=null;if(a.isHostMethod(v,"createContextualFragment")){r.createContextualFragment=function(e){return this.nativeRange.createContextualFragment(e)}}f(document).removeChild(g);v.detach();m.detach();r.getName=function(){return"WrappedRange"};e.WrappedRange=n;e.createNativeRange=function(e){e=c(e,t,"createNativeRange");return e.createRange()}})()}if(e.features.implementsTextRange){var u=function(e){var t=e.parentElement();var n=e.duplicate();n.collapse(true);var r=n.parentElement();n=e.duplicate();n.collapse(false);var a=n.parentElement();var o=r==a?r:i.getCommonAncestor(r,a);return o==t?o:i.getCommonAncestor(t,o)};var d=function(e){return e.compareEndPoints("StartToEnd",e)==0};var h=function(e,t,n,r,a){var s=e.duplicate();s.collapse(n);var f=s.parentElement();if(!i.isOrIsAncestorOf(t,f)){f=t}if(!f.canHaveHTML){var c=new o(f.parentNode,i.getNodeIndex(f));return{boundaryPosition:c,nodeInfo:{nodeIndex:c.offset,containerElement:c.node}}}var u=i.getDocument(f).createElement("span");if(u.parentNode){u.parentNode.removeChild(u)}var d,h=n?"StartToStart":"StartToEnd";var g,v,p,m;var R=a&&a.containerElement==f?a.nodeIndex:0;var C=f.childNodes.length;var N=C;var E=N;while(true){if(E==C){f.appendChild(u)}else{f.insertBefore(u,f.childNodes[E])}s.moveToElementText(u);d=s.compareEndPoints(h,e);

if(d==0||R==N){break}else if(d==-1){if(N==R+1){break}else{R=E}}else{N=N==R+1?R:E}E=Math.floor((R+N)/2);f.removeChild(u)}m=u.nextSibling;if(d==-1&&m&&l(m)){s.setEndPoint(n?"EndToStart":"EndToEnd",e);var w;if(/[\r\n]/.test(m.data)){var S=s.duplicate();var y=S.text.replace(/\r\n/g,"\r").length;w=S.moveStart("character",y);while((d=S.compareEndPoints("StartToEnd",S))==-1){w++;S.moveStart("character",1)}}else{w=s.text.length}p=new o(m,w)}else{g=(r||!n)&&u.previousSibling;v=(r||n)&&u.nextSibling;if(v&&l(v)){p=new o(v,0)}else if(g&&l(g)){p=new o(g,g.data.length)}else{p=new o(f,i.getNodeIndex(u))}}u.parentNode.removeChild(u);return{boundaryPosition:p,nodeInfo:{nodeIndex:E,containerElement:f}}};var g=function(e,t){var n,r,a=e.offset;var o=i.getDocument(e.node);var s,c,u=f(o).createTextRange();var d=l(e.node);if(d){n=e.node;r=n.parentNode}else{c=e.node.childNodes;n=a<c.length?c[a]:null;r=e.node}s=o.createElement("span");s.innerHTML="&#feff;";if(n){r.insertBefore(s,n)}else{r.appendChild(s)}u.moveToElementText(s);u.collapse(!t);r.removeChild(s);if(d){u[t?"moveStart":"moveEnd"]("character",a)}return u};r=function(e){this.textRange=e;this.refresh()};r.prototype=new s(document);r.prototype.refresh=function(){var e,t,n;var r=u(this.textRange);if(d(this.textRange)){t=e=h(this.textRange,r,true,true).boundaryPosition}else{n=h(this.textRange,r,true,false);e=n.boundaryPosition;t=h(this.textRange,r,false,false,n.nodeInfo).boundaryPosition}this.setStart(e.node,e.offset);this.setEnd(t.node,t.offset)};r.prototype.getName=function(){return"WrappedTextRange"};s.copyComparisonConstants(r);r.rangeToTextRange=function(e){if(e.collapsed){return g(new o(e.startContainer,e.startOffset),true)}else{var t=g(new o(e.startContainer,e.startOffset),true);var n=g(new o(e.endContainer,e.endOffset),false);var r=f(s.getRangeDocument(e)).createTextRange();r.setEndPoint("StartToStart",t);r.setEndPoint("EndToEnd",n);return r}};e.WrappedTextRange=r;if(!e.features.implementsDomRange||e.config.preferTextRange){var v=function(){return this}();if(typeof v.Range=="undefined"){v.Range=r}e.createNativeRange=function(e){e=c(e,t,"createNativeRange");return f(e).createTextRange()};e.WrappedRange=r}}e.createRange=function(n){n=c(n,t,"createRange");return new e.WrappedRange(e.createNativeRange(n))};e.createRangyRange=function(e){e=c(e,t,"createRangyRange");return new s(e)};e.createIframeRange=function(n){t.deprecationNotice("createIframeRange()","createRange(iframeEl)");return e.createRange(n)};e.createIframeRangyRange=function(n){t.deprecationNotice("createIframeRangyRange()","createRangyRange(iframeEl)");return e.createRangyRange(n)};e.addCreateMissingNativeApiListener(function(t){var n=t.document;if(typeof n.createRange=="undefined"){n.createRange=function(){return e.createRange(n)}}n=t=null})});rangy.createCoreModule("WrappedSelection",["DomRange","WrappedRange"],function(e,t){e.config.checkSelectionRanges=true;var n="boolean";var r="number";var i=e.dom;var a=e.util;var o=a.isHostMethod;var s=e.DomRange;var f=e.WrappedRange;var c=e.DOMException;var l=i.DomPosition;var u;var d;var h=e.features;var g="Control";var v=i.getDocument;var p=i.getBody;var m=s.rangesEqual;function R(e){return typeof e=="string"?/^backward(s)?$/i.test(e):!!e}function C(e,n){if(!e){return window}else if(i.isWindow(e)){return e}else if(e instanceof G){return e.win}else{var r=i.getContentDocument(e,t,n);return i.getWindow(r)}}function N(e){return C(e,"getWinSelection").getSelection()}function E(e){return C(e,"getDocSelection").document.selection}function w(e){var t=false;if(e.anchorNode){t=i.comparePoints(e.anchorNode,e.anchorOffset,e.focusNode,e.focusOffset)==1}return t}var S=o(window,"getSelection"),y=a.isHostObject(document,"selection");h.implementsWinGetSelection=S;h.implementsDocSelection=y;var O=y&&(!S||e.config.preferTextRange);if(O){u=E;e.isSelectionValid=function(e){var t=C(e,"isSelectionValid").document,n=t.selection;return n.type!="None"||v(n.createRange().parentElement())==t}}else if(S){u=N;e.isSelectionValid=function(){return true}}else{t.fail("Neither document.selection or window.getSelection() detected.")}e.getNativeSelection=u;var T=u();var _=e.createNativeRange(document);var D=p(document);var A=a.areHostProperties(T,["anchorNode","focusNode","anchorOffset","focusOffset"]);h.selectionHasAnchorAndFocus=A;var x=o(T,"extend");h.selectionHasExtend=x;var P=typeof T.rangeCount==r;h.selectionHasRangeCount=P;var b=false;var I=true;var B=x?function(t,n){var r=s.getRangeDocument(n);var i=e.createRange(r);i.collapseToPoint(n.endContainer,n.endOffset);t.addRange(F(i));t.extend(n.startContainer,n.startOffset)}:null;if(a.areHostMethods(T,["addRange","getRangeAt","removeAllRanges"])&&typeof T.rangeCount==r&&h.implementsDomRange){(function(){var t=window.getSelection();if(t){var n=t.rangeCount;var r=n>1;var i=[];var a=w(t);for(var o=0;o<n;++o){i[o]=t.getRangeAt(o)}var s=p(document);var f=s.appendChild(document.createElement("div"));f.contentEditable="false";var c=f.appendChild(document.createTextNode("\u00a0\u00a0\u00a0"));if(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1){I=false;b=false}else{var l=document.createRange();l.setStart(c,1);l.collapse(true);t.addRange(l);I=t.rangeCount==1;t.removeAllRanges();var u=l.cloneRange();l.setStart(c,0);u.setEnd(c,3);u.setStart(c,2);t.addRange(l);t.addRange(u);b=t.rangeCount==2}s.removeChild(f);t.removeAllRanges();for(o=0;o<n;++o){if(o==0&&a){if(B){B(t,i[o])}else{e.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because browser does not support Selection.extend");t.addRange(i[o])}}else{t.addRange(i[o])}}}})()}h.selectionSupportsMultipleRanges=b;h.collapsedNonEditableSelectionsSupported=I;var H=false,M;if(D&&o(D,"createControlRange")){M=D.createControlRange();if(a.areHostProperties(M,["item","add"])){H=true}}h.implementsControlRange=H;if(A){d=function(e){return e.anchorNode===e.focusNode&&e.anchorOffset===e.focusOffset}}else{d=function(e){return e.rangeCount?e.getRangeAt(e.rangeCount-1).collapsed:false}}function L(e,t,n){var r=n?"end":"start",i=n?"start":"end";e.anchorNode=t[r+"Container"];e.anchorOffset=t[r+"Offset"];e.focusNode=t[i+"Container"];e.focusOffset=t[i+"Offset"]}function W(e){var t=e.nativeSelection;e.anchorNode=t.anchorNode;e.anchorOffset=t.anchorOffset;e.focusNode=t.focusNode;e.focusOffset=t.focusOffset}function k(e){e.anchorNode=e.focusNode=null;e.anchorOffset=e.focusOffset=0;e.rangeCount=0;e.isCollapsed=true;e._ranges.length=0}function F(t){var n;if(t instanceof s){n=e.createNativeRange(t.getDocument());n.setEnd(t.endContainer,t.endOffset);n.setStart(t.startContainer,t.startOffset)}else if(t instanceof f){n=t.nativeRange}else if(h.implementsDomRange&&t instanceof i.getWindow(t.startContainer).Range){n=t}return n}function U(e){if(!e.length||e[0].nodeType!=1){return false}for(var t=1,n=e.length;t<n;++t){if(!i.isAncestorOf(e[0],e[t])){return false}}return true}function j(e){var n=e.getNodes();if(!U(n)){throw t.createError("getSingleElementFromRange: range "+e.inspect()+" did not consist of a single element")}return n[0]}function V(e){return!!e&&typeof e.text!="undefined"}function z(e,t){var n=new f(t);e._ranges=[n];L(e,n,false);e.rangeCount=1;e.isCollapsed=n.collapsed}function Y(t){t._ranges.length=0;if(t.docSelection.type=="None"){k(t)}else{var n=t.docSelection.createRange();if(V(n)){z(t,n)}else{t.rangeCount=n.length;var r,i=v(n.item(0));for(var a=0;a<t.rangeCount;++a){r=e.createRange(i);r.selectNode(n.item(a));t._ranges.push(r)}t.isCollapsed=t.rangeCount==1&&t._ranges[0].collapsed;L(t,t._ranges[t.rangeCount-1],false)}}}function q(e,n){var r=e.docSelection.createRange();var i=j(n);var a=v(r.item(0));var o=p(a).createControlRange();for(var s=0,f=r.length;s<f;++s){o.add(r.item(s))}try{o.add(i)}catch(c){throw t.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")}o.select();Y(e)}var Q;if(o(T,"getRangeAt")){Q=function(e,t){try{return e.getRangeAt(t)}catch(n){return null}}}else if(A){Q=function(t){var n=v(t.anchorNode);var r=e.createRange(n);r.setStartAndEnd(t.anchorNode,t.anchorOffset,t.focusNode,t.focusOffset);if(r.collapsed!==this.isCollapsed){r.setStartAndEnd(t.focusNode,t.focusOffset,t.anchorNode,t.anchorOffset)}return r}}function G(e,t,n){this.nativeSelection=e;this.docSelection=t;this._ranges=[];this.win=n;this.refresh()}G.prototype=e.selectionPrototype;function X(e){e.win=e.anchorNode=e.focusNode=e._ranges=null;e.rangeCount=e.anchorOffset=e.focusOffset=0;e.detached=true}var Z=[];function $(e,t){var n=Z.length,r,i;while(n--){r=Z[n];i=r.selection;if(t=="deleteAll"){X(i)}else if(r.win==e){if(t=="delete"){Z.splice(n,1);return true}else{return i}}}if(t=="deleteAll"){Z.length=0}return null}var J=function(e){if(e&&e instanceof G){e.refresh();return e}e=C(e,"getNativeSelection");var t=$(e);var n=u(e),r=y?E(e):null;if(t){t.nativeSelection=n;t.docSelection=r;t.refresh()}else{t=new G(n,r,e);Z.push({win:e,selection:t})}return t};e.getSelection=J;e.getIframeSelection=function(n){t.deprecationNotice("getIframeSelection()","getSelection(iframeEl)");return e.getSelection(i.getIframeWindow(n))};var K=G.prototype;function ee(e,n){var r=v(n[0].startContainer);var i=p(r).createControlRange();for(var a=0,o,s=n.length;a<s;++a){o=j(n[a]);try{i.add(o)}catch(f){throw t.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)")}}i.select();Y(e)}if(!O&&A&&a.areHostMethods(T,["removeAllRanges","addRange"])){K.removeAllRanges=function(){this.nativeSelection.removeAllRanges();k(this)};var te=function(e,t){B(e.nativeSelection,t);e.refresh()};if(P){K.addRange=function(t,n){if(H&&y&&this.docSelection.type==g){q(this,t)}else{if(R(n)&&x){te(this,t)}else{var r;if(b){r=this.rangeCount}else{this.removeAllRanges();r=0}this.nativeSelection.addRange(F(t).cloneRange());this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==r+1){if(e.config.checkSelectionRanges){var i=Q(this.nativeSelection,this.rangeCount-1);if(i&&!m(i,t)){t=new f(i)}}this._ranges[this.rangeCount-1]=t;L(this,t,ie(this.nativeSelection));this.isCollapsed=d(this)}else{this.refresh()}}}}}else{K.addRange=function(e,t){if(R(t)&&x){te(this,e)}else{this.nativeSelection.addRange(F(e));this.refresh()}}}K.setRanges=function(e){if(H&&e.length>1){ee(this,e)}else{this.removeAllRanges();for(var t=0,n=e.length;t<n;++t){this.addRange(e[t])}}}}else if(o(T,"empty")&&o(_,"select")&&H&&O){K.removeAllRanges=function(){try{this.docSelection.empty();if(this.docSelection.type!="None"){var e;if(this.anchorNode){e=v(this.anchorNode)}else if(this.docSelection.type==g){var t=this.docSelection.createRange();if(t.length){e=v(t.item(0))}}if(e){var n=p(e).createTextRange();n.select();this.docSelection.empty()}}}catch(r){}k(this)};K.addRange=function(t){if(this.docSelection.type==g){q(this,t)}else{e.WrappedTextRange.rangeToTextRange(t).select();this._ranges[0]=t;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;L(this,t,false)}};K.setRanges=function(e){this.removeAllRanges();var t=e.length;if(t>1){ee(this,e)}else if(t){this.addRange(e[0])}}}else{t.fail("No means of selecting a Range or TextRange was found");return false}K.getRangeAt=function(e){if(e<0||e>=this.rangeCount){throw new c("INDEX_SIZE_ERR")}else{return this._ranges[e].cloneRange()}};var ne;if(O){ne=function(t){var n;if(e.isSelectionValid(t.win)){n=t.docSelection.createRange()}else{n=p(t.win.document).createTextRange();n.collapse(true)}if(t.docSelection.type==g){Y(t)}else if(V(n)){z(t,n)}else{k(t)}}}else if(o(T,"getRangeAt")&&typeof T.rangeCount==r){ne=function(t){if(H&&y&&t.docSelection.type==g){Y(t)}else if(t&&t.nativeSelection){t._ranges.length=t.rangeCount=t.nativeSelection.rangeCount;if(t.rangeCount){for(var n=0,r=t.rangeCount;n<r;++n){t._ranges[n]=new e.WrappedRange(t.nativeSelection.getRangeAt(n))}L(t,t._ranges[t.rangeCount-1],ie(t.nativeSelection));t.isCollapsed=d(t)}else{k(t)}}}}else if(A&&typeof T.isCollapsed==n&&typeof _.collapsed==n&&h.implementsDomRange){ne=function(e){var t,n=e.nativeSelection;if(n.anchorNode){t=Q(n,0);e._ranges=[t];e.rangeCount=1;W(e);e.isCollapsed=d(e)}else{k(e)}}}else{t.fail("No means of obtaining a Range or TextRange from the user's selection was found");return false}K.refresh=function(e){var t=e?this._ranges.slice(0):null;var n=this.anchorNode,r=this.anchorOffset;ne(this);if(e){var i=t.length;if(i!=this._ranges.length){return true}if(this.anchorNode!=n||this.anchorOffset!=r){return true}while(i--){if(!m(t[i],this._ranges[i])){return true}}return false}};var re=function(e,t){var n=e.getAllRanges();e.removeAllRanges();for(var r=0,i=n.length;r<i;++r){if(!m(t,n[r])){e.addRange(n[r])}}if(!e.rangeCount){k(e)}};if(H){K.removeRange=function(e){if(this.docSelection.type==g){var t=this.docSelection.createRange();var n=j(e);var r=v(t.item(0));var i=p(r).createControlRange();var a,o=false;for(var s=0,f=t.length;s<f;++s){a=t.item(s);if(a!==n||o){i.add(t.item(s))}else{o=true}}i.select();Y(this)}else{re(this,e)}}}else{K.removeRange=function(e){re(this,e)}}var ie;if(!O&&A&&h.implementsDomRange){ie=w;K.isBackward=function(){return ie(this)}}else{ie=K.isBackward=function(){return false}}K.isBackwards=K.isBackward;K.toString=function(){var e=[];for(var t=0,n=this.rangeCount;t<n;++t){e[t]=""+this._ranges[t]}return e.join("")};function ae(e,t){if(e.win.document!=v(t)){throw new c("WRONG_DOCUMENT_ERR")}}K.collapse=function(t,n){ae(this,t);var r=e.createRange(t);r.collapseToPoint(t,n);this.setSingleRange(r);this.isCollapsed=true};K.collapseToStart=function(){if(this.rangeCount){var e=this._ranges[0];this.collapse(e.startContainer,e.startOffset)}else{throw new c("INVALID_STATE_ERR")}};K.collapseToEnd=function(){if(this.rangeCount){var e=this._ranges[this.rangeCount-1];this.collapse(e.endContainer,e.endOffset)}else{throw new c("INVALID_STATE_ERR")}};K.selectAllChildren=function(t){ae(this,t);var n=e.createRange(t);n.selectNodeContents(t);this.setSingleRange(n)};K.deleteFromDocument=function(){if(H&&y&&this.docSelection.type==g){var e=this.docSelection.createRange();var t;while(e.length){t=e.item(0);e.remove(t);t.parentNode.removeChild(t)}this.refresh()}else if(this.rangeCount){var n=this.getAllRanges();if(n.length){this.removeAllRanges();for(var r=0,i=n.length;r<i;++r){n[r].deleteContents()}this.addRange(n[i-1])}}};K.eachRange=function(e,t){for(var n=0,r=this._ranges.length;n<r;++n){if(e(this.getRangeAt(n))){return t}}};K.getAllRanges=function(){var e=[];this.eachRange(function(t){e.push(t)});return e};K.setSingleRange=function(e,t){this.removeAllRanges();this.addRange(e,t)};K.callMethodOnEachRange=function(e,t){var n=[];this.eachRange(function(r){n.push(r[e].apply(r,t))});return n};function oe(t){return function(n,r){var i;if(this.rangeCount){i=this.getRangeAt(0);i["set"+(t?"Start":"End")](n,r)}else{i=e.createRange(this.win.document);i.setStartAndEnd(n,r)}this.setSingleRange(i,this.isBackward())}}K.setStart=oe(true);K.setEnd=oe(false);e.rangePrototype.select=function(e){J(this.getDocument()).setSingleRange(this,e)};K.changeEachRange=function(e){var t=[];var n=this.isBackward();this.eachRange(function(n){e(n);t.push(n)});this.removeAllRanges();if(n&&t.length==1){this.addRange(t[0],"backward")}else{this.setRanges(t)}};K.containsNode=function(e,t){return this.eachRange(function(n){return n.containsNode(e,t)},true)};K.getBookmark=function(e){return{backward:this.isBackward(),rangeBookmarks:this.callMethodOnEachRange("getBookmark",[e])}};K.moveToBookmark=function(t){var n=[];for(var r=0,i,a;i=t.rangeBookmarks[r++];){a=e.createRange(this.win);a.moveToBookmark(i);n.push(a)}if(t.backward){this.setSingleRange(n[0],"backward")}else{this.setRanges(n)}};K.toHtml=function(){return this.callMethodOnEachRange("toHtml").join("")};function se(e){var t=[];var n=new l(e.anchorNode,e.anchorOffset);var r=new l(e.focusNode,e.focusOffset);var i=typeof e.getName=="function"?e.getName():"Selection";if(typeof e.rangeCount!="undefined"){for(var a=0,o=e.rangeCount;a<o;++a){t[a]=s.inspect(e.getRangeAt(a))}}return"["+i+"(Ranges: "+t.join(", ")+")(anchor: "+n.inspect()+", focus: "+r.inspect()+"]"}K.getName=function(){return"WrappedSelection"};K.inspect=function(){return se(this)};K.detach=function(){$(this.win,"delete");X(this)};G.detachAll=function(){$(null,"deleteAll")};G.inspect=se;G.isDirectionBackward=R;e.Selection=G;e.selectionPrototype=K;e.addCreateMissingNativeApiListener(function(e){if(typeof e.getSelection=="undefined"){e.getSelection=function(){return J(e)}}e=null})});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:66:"/bitrix/js/fileman/html_editor/html-actions.min.js?159569187858094";s:6:"source";s:46:"/bitrix/js/fileman/html_editor/html-actions.js";s:3:"min";s:50:"/bitrix/js/fileman/html_editor/html-actions.min.js";s:3:"map";s:50:"/bitrix/js/fileman/html_editor/html-actions.map.js";}"*/
(function(){function e(e){this.editor=e;this.document=e.sandbox.GetDocument();BX.addCustomEvent(this.editor,"OnIframeReInit",BX.proxy(function(){this.document=this.editor.sandbox.GetDocument()},this));this.actions=this.GetActionList();this.contentActionIndex={removeFormat:1,bold:1,italic:1,underline:1,strikeout:1,fontSize:1,foreColor:1,backgroundColor:1,formatInline:1,formatBlock:1,createLink:1,insertHTML:1,insertImage:1,insertLineBreak:1,removeLink:1,insertOrderedList:1,insertUnorderedList:1,align:1,indent:1,outdent:1,formatStyle:1,fontFamily:1,universalFormatStyle:1,quote:1,code:1,sub:1,sup:1,insertSmile:1}}e.prototype={IsSupportedByBrowser:function(e){var t=BX.browser.IsIE()||BX.browser.IsIE10()||BX.browser.IsIE11(),r={indent:t,outdent:t,formatBlock:t,insertUnorderedList:BX.browser.IsIE()||BX.browser.IsOpera(),insertOrderedList:BX.browser.IsIE()||BX.browser.IsOpera()},i={insertHTML:BX.browser.IsFirefox()};if(!r[e]){try{return this.document.queryCommandSupported(e)}catch(n){}try{return this.document.queryCommandEnabled(e)}catch(o){return!!i[e]}}return false},IsSupported:function(e){return!!this.actions[e]},IsContentAction:function(e){return this.contentActionIndex[e]},Exec:function(e,t,r){var i=this,n=this.actions[e],o=n&&n.exec,a=this.IsContentAction(e),l=null;if(!r){this.editor.On("OnBeforeCommandExec",[a,e,n,t])}if(a){this.editor.Focus(false)}if(o){l=o.apply(n,arguments)}else{try{l=this.document.execCommand(e,false,t)}catch(s){}}if(a){setTimeout(function(){i.editor.Focus(false)},1)}if(!r){this.editor.On("OnAfterCommandExec",[a,e])}return l},CheckState:function(e,t){var r=this.actions[e],i=null;if(r&&r.state){i=r.state.apply(r,arguments)}else{try{i=this.document.queryCommandState(e)}catch(n){i=false}}return i},GetValue:function(e){var t=this.commands[e],r=t&&t.value;if(r){return r.call(t,this.composer,e)}else{try{return this.document.queryCommandValue(e)}catch(i){return null}}},GetActionList:function(){this.actions={changeView:this.GetChangeView(),splitMode:this.GetChangeSplitMode(),fullscreen:this.GetFullscreen(),changeTemplate:this.GetChangeTemplate(),removeFormat:this.GetRemoveFormat(),bold:this.GetBold(),italic:this.GetItalic(),underline:this.GetUnderline(),strikeout:this.GetStrikeout(),fontSize:this.GetFontSize(),foreColor:this.GetForeColor(),backgroundColor:this.GetBackgroundColor(),formatInline:this.GetFormatInline(),formatBlock:this.GetFormatBlock(),createLink:this.GetCreateLink(),insertHTML:this.GetInsertHTML(),insertImage:this.GetInsertImage(),insertLineBreak:this.GetInsertLineBreak(),insertTable:this.GetInsertTable(),removeLink:this.GetRemoveLink(),insertHr:this.GetInsertHr(),insertOrderedList:this.GetInsertList({bOrdered:true}),insertUnorderedList:this.GetInsertList({bOrdered:false}),align:this.GetAlign(),indent:this.GetIndent(),outdent:this.GetOutdent(),formatStyle:this.GetFormatStyle(),fontFamily:this.GetFontFamily(),universalFormatStyle:this.GetUniversalFormatStyle(),selectNode:this.GetSelectNode(),doUndo:this.GetUndoRedo(true),doRedo:this.GetUndoRedo(false),sub:this.GetSubSup("sub"),sup:this.GetSubSup("sup"),quote:this.GetQuote(),code:this.GetCode(),insertSmile:this.GetInsertSmile(),tableOperation:this.GetTableOperation(),formatBbCode:this.GetFormatBbCode()};this.editor.On("OnGetActionsList");return this.actions},GetChangeView:function(){var e=this;return{exec:function(){var t=arguments[1];if({code:1,wysiwyg:1,split:1}[t])e.editor.SetView(t)},state:function(){return false},value:function(){}}},GetChangeSplitMode:function(){var e=this;return{exec:function(){e.editor.SetSplitMode(arguments[1]==1)},state:function(){return e.editor.GetSplitMode()},value:function(){}}},GetFullscreen:function(){var e=this;return{exec:function(){e.editor.Expand()},state:function(){return e.editor.IsExpanded()},value:function(){}}},GetFormatInline:function(){var e=this,t={strong:"b",em:"i",b:"strong",i:"em"},r={};function i(e,t,r){var i=e+":";if(r)i+=r;if(t){for(var n in t)if(t.hasOwnProperty(n))i+=n+"="+t[n]+";"}return i}function n(n,o,a){var l=i(n,o,a);if(!r[l]){var s=t[n];var d=s?[n.toLowerCase(),s.toLowerCase()]:[n.toLowerCase()];r[l]=new e.editor.HTMLStyler(e.editor,d,o,a,true)}return r[l]}return{exec:function(t,r,i,o,a,l){l=!l||typeof l!="object"?{}:l;e.editor.iframeView.Focus();var s=e.editor.selection.GetRange();if(!s){return false}var d=n(i,o,a);if(l.bClear){s=d.UndoToRange(s,false)}else{s=d.ToggleRange(s)}setTimeout(function(){e.editor.selection.SetSelection(s);var t,r,i,n,o,a=[],l=[],d=s.getNodes([1]);for(r=0;r<d.length;r++){if(BX.util.in_array(d[r].nodeName,["TD","TR","TH"])){t=BX.findParent(d[r],function(e){return e.nodeName=="TABLE"},e.editor.GetIframeDoc().body);if(t&&!BX.util.in_array(t,a)){a.push(t)}}}for(r=0;r<a.length;r++){t=a[r];for(i=0;i<t.rows.length;i++){for(n=0;n<t.rows[i].childNodes.length;n++){o=t.rows[i].childNodes[n];if(o&&o.nodeType==1&&!BX.util.in_array(o.nodeName,e.editor.TABLE_TAGS)){l.push(o)}}}}for(r=0;r<l.length;r++){BX.cleanNode(l[r],true)}var f=e.editor.selection.GetSelectedNode();if(f&&f.nodeType==1){e.editor.lastCreatedId=Math.round(Math.random()*1e6);f.setAttribute("data-bx-last-created-id",e.editor.lastCreatedId)}},10)},state:function(r,i,o,a,l){var s=e.editor.GetIframeDoc(),d=t[o]||o;if(!e.editor.util.DocumentHasTag(s,o)&&(o!=d&&!e.editor.util.DocumentHasTag(s,d))){return false}var f=e.editor.selection.GetRange();if(!f){return false}var c=n(o,a,l);return c.IsAppliedToRange(f,false)},value:BX.DoNothing}},GetFormatBlock:function(){var e=this,t="DIV",r=e.editor.GetBlockTags(),i=e.editor.NESTED_BLOCK_TAGS;function n(e,t,r){if(e.className){o(e,r);e.className+=" "+t}else{e.className=t}}function o(e,t){e.className=e.className.replace(t,"")}function a(t){var r=e.editor.util.GetNextNotEmptySibling(t),i=e.editor.util.GetPreviousNotEmptySibling(t);if(r&&!d(r)){t.parentNode.insertBefore(e.document.createElement("BR"),r)}if(i&&!d(i)){t.parentNode.insertBefore(e.document.createElement("BR"),t)}}function l(t){var r=e.editor.util.GetNextNotEmptySibling(t),i=e.editor.util.GetPreviousNotEmptySibling(t);if(r&&r.nodeName==="BR"){r.parentNode.removeChild(r)}if(i&&i.nodeName==="BR"){i.parentNode.removeChild(i)}}function s(e){var t=e.lastChild;if(t&&t.nodeName==="BR"){t.parentNode.removeChild(t)}}function d(t){return t.nodeName==="BR"||e.editor.util.IsBlockElement(t)}function f(t,r,i,n){if(i||n){}e.document.execCommand(t,false,r)}function c(e){return!e.className||BX.util.trim(e.className)===""}function u(t,r,i,n){if(r){if(t.nodeName!==r){t=e.editor.util.RenameNode(t,r)}if(i){t.className=i}if(n&&n.length>0){e.editor.util.SetCss(t,n)}}else{a(t);e.editor.util.ReplaceWithOwnChildren(t)}}return{exec:function(n,o,d,f,c){c=c||{};o=typeof o==="string"?o.toUpperCase():o;var m,h,g,N=c.range||e.editor.selection.GetRange(),p=o?e.actions.formatBlock.state(n,o,d,f):false,v;if(c.range)e.editor.selection.RestoreBookmark();if(p){var B=N.startContainer==p.firstChild&&N.endContainer==p.lastChild;if(o&&BX.util.in_array(o,i)&&c.nestedBlocks!==false){p=e.document.createElement(o||t);if(d){p.className=d}e.editor.selection.Surround(p);e.editor.selection.SelectNode(p);e.editor.util.SetCss(p,f);var b=e.editor.util.GetNextNotEmptySibling(p);if(b&&b.nodeName=="BR")BX.remove(b);setTimeout(function(){if(p){e.editor.selection.SelectNode(p)}},50)}else if(c&&c.splitBlock&&!B){var C=e.document.createElement(o||t);e.editor.selection.Surround(C);e.editor.selection.SelectNode(C);if(d)C.className=d;e.editor.util.SetCss(C,f);if(p&&p.lastChild){var x=N.cloneRange();x.setStartAfter(C);x.setEndAfter(p.lastChild);var I=p.cloneNode(false);e.editor.selection.SetSelection(x);e.editor.selection.Surround(I);var S=e.editor.selection._GetNonTextFirstChild(I);if(S&&S.nodeName=="BR")BX.remove(S)}e.editor.selection.SetSelection(N);setTimeout(function(){if(C){e.editor.selection.SelectNode(C)}},50)}else{e.editor.util.SetCss(p,f);if(d){p.className=d;if(BX.browser.IsFirefox()){var y="bx-editor-temp-"+Math.round(Math.random()*1e6);p.id=y;p.parentNode.innerHTML=p.parentNode.innerHTML;p=e.editor.GetIframeElement(y);if(p)p.removeAttribute("id")}}setTimeout(function(){if(p){e.editor.selection.SelectNode(p)}},50)}}else{if(o===null||BX.util.in_array(o,r)){p=false;v=e.editor.selection.GetSelectedNode();if(v){if(v.nodeType==1&&BX.util.in_array(v.nodeName,r)){p=v}else{p=BX.findParent(v,function(e){return BX.util.in_array(e.nodeName,r)},e.document.body)}}else{var T=e.editor.selection.GetCommonAncestorForRange(N);if(T&&T.nodeName!=="BODY"&&BX.util.in_array(T.nodeName,r)){p=T}}if(p&&!e.actions.quote.checkNode(p)){e.editor.selection.ExecuteAndRestoreSimple(function(){u(p,o,d,f)});return true}}p=BX.create(o||t,{},e.document);if(d){p.className=d}e.editor.util.SetCss(p,f);if(N.collapsed||v&&v.nodeType==3){e.editor.selection.SelectNode(v)}else if(N.collapsed){e.editor.selection.SelectLine()}e.editor.selection.Surround(p,N);l(p);s(p);if(c.leaveChilds){return p}if(o&&!BX.util.in_array(o,i)){N=e.editor.selection.GetRange();g=N.getNodes([1]);if(o=="P"){m=p.getElementsByTagName(o);for(h=0;h<g.length;h++){if(f&&e.editor.util.CheckCss(g[h],f,false)&&e.editor.util.IsEmptyNode(g[h],true,true)){BX.remove(g[h])}}while(m[0]){a(m[0]);e.editor.util.ReplaceWithOwnChildren(m[0])}}else if(o.substr(0,1)=="H"){for(h=0;h<g.length;h++){if(g[h].nodeName!==o&&e.editor.util.IsEmptyNode(g[h],true,true)){BX.remove(g[h])}}var A=BX.findChild(p,function(e){return BX.util.in_array(e.nodeName,r)&&e.nodeName.substr(0,1)=="H"},true,true);for(h=0;h<A.length;h++){a(A[h]);e.editor.util.ReplaceWithOwnChildren(A[h])}}}if(p&&c.bxTagParams&&typeof c.bxTagParams=="object"){e.editor.SetBxTag(p,c.bxTagParams)}if(p&&p.parentNode){var w=p.parentNode;if(w.nodeName=="UL"||w.nodeName=="OL"){var G=e.editor.util.GetPreviousNotEmptySibling(p);if(e.editor.util.IsEmptyLi(G)){BX.remove(G)}G=e.editor.util.GetNextNotEmptySibling(p);if(e.editor.util.IsEmptyLi(G)){BX.remove(G)}if(!e.editor.util.GetPreviousNotEmptySibling(p)&&!e.editor.util.GetNextNotEmptySibling(p)){var E=p.cloneNode(false);w.parentNode.insertBefore(E,w);e.editor.util.ReplaceWithOwnChildren(p);E.appendChild(w)}}if(p.firstChild&&p.firstChild.nodeName=="BLOCKQUOTE"){var X=e.editor.util.GetPreviousNotEmptySibling(p);if(X&&X.nodeName=="BLOCKQUOTE"&&e.editor.util.IsEmptyNode(X)){BX.remove(X)}}if((p.nodeName=="BLOCKQUOTE"||p.nodeName=="PRE")&&e.editor.util.IsEmptyNode(p)){p.innerHTML="";var L=e.document.createElement("br");p.appendChild(L);e.editor.selection.SetAfter(L)}}setTimeout(function(){if(p){e.editor.selection.SelectNode(p)}},10);return true}},state:function(t,r,i,n){r=typeof r==="string"?r.toUpperCase():r;var o=false,a=e.editor.selection.GetSelectedNode();if(a&&a.nodeName){if(a.nodeName!=r){a=BX.findParent(a,function(e){return e.nodeName==r},e.document.body)}o=a&&a.tagName==r?a:false}else{var l=e.editor.selection.GetRange(),s=e.editor.selection.GetCommonAncestorForRange(l);if(s.nodeName==r){o=s}}return o},value:BX.DoNothing,removeBrBeforeAndAfter:l,addBrBeforeAndAfter:a}},GetRemoveFormat:function(){var e={B:1,STRONG:1,I:1,EM:1,U:1,DEL:1,S:1,STRIKE:1,A:1,SPAN:1,CODE:1,NOBR:1,Q:1,FONT:1,CENTER:1,CITE:1},t={H1:1,H2:1,H3:1,H4:1,H5:1,H6:1,DIV:1,P:1,LI:1,UL:1,OL:1,MENU:1,BLOCKQUOTE:1,PRE:1},r=this;function i(i,n){if(!i)return;var o=i.nodeName;if(e[o]){r.editor.util.ReplaceWithOwnChildren(i)}else if(t[o]){r.actions.formatBlock.addBrBeforeAndAfter(i);r.editor.util.ReplaceWithOwnChildren(i)}else{i.removeAttribute("style");i.removeAttribute("class");i.removeAttribute("align");if(r.editor.bbCode&&i.nodeName=="TABLE"){i.removeAttribute("align")}}}function n(e){return BX.findParent(e,function(e){return e.nodeName=="TABLE"},r.editor.GetIframeDoc().body)}function o(e){var t,i,n=e.parentNode;while(n&&n.nodeName!=="BODY"){t=n.previousSibling&&!r.editor.util.IsEmptyNode(n.previousSibling);i=n.nextSibling&&!r.editor.util.IsEmptyNode(n.nextSibling);if(t||i||n.parentNode.nodeName=="BODY"){break}n=n.parentNode}return n}function a(e){var t=r.editor.GetIframeDoc(),i=BX.findParent(e,function(e){return e.nodeName=="UL"||e.nodeName=="OL"||e.nodeName=="MENU"},t.body);if(i){var n,o,a=i.cloneNode(false),l=i.cloneNode(false),s=true;BX.cleanNode(a);BX.cleanNode(l);for(n=0;n<i.childNodes.length;n++){o=i.childNodes[n];if(o==e){s=false}if(o.nodeName=="LI"){if(!r.editor.util.IsEmptyNode(o,true,true)){(s?a:l).appendChild(o.cloneNode(true))}}}if(a.childNodes.length>0){i.parentNode.insertBefore(a,i)}i.parentNode.insertBefore(e,i);if(l.childNodes.length>0){i.parentNode.insertBefore(l,i)}BX.remove(i);return true}return false}function l(e,t){if(e&&e.length>0){var n,o,a=[];for(n=0,o=e.length;n<o;n++){if(!r.editor.util.CheckSurrogateNode(e[n])){a.push({node:e[n],nesting:r.editor.util.GetNodeDomOffset(e[n])})}}a=a.sort(function(e,t){return t.nesting-e.nesting});for(n=0,o=a.length;n<o;n++){i(a[n].node,t)}}}function s(e){var t,i=false,n=r.editor.selection.SelectNode(e),o=n.getNodes([1]);if(e.nodeType==1){for(t=0;t<o.length;t++){if(o[t]==e){i=true;break}}if(!i){o=[e].concat(o)}}if(!o||typeof o!="object"||o.length==0){o=[e]}return o}function d(e,t){var r=[];if(e&&(!t||e==t)){r.push(e)}else if(!e&&t){r.push(t)}return r}return{exec:function(e,t){var i=r.editor.selection.GetRange();if(!i||r.editor.iframeView.IsEmpty())return;var d=true,f,c,u,m,h,g=i.getNodes([1]),N=r.editor.GetIframeDoc();if(g.length==0){c=i.getNodes([3]);if(c&&c.length==1){u=c[0]}if(!u&&i.startContainer==i.endContainer){if(i.startContainer.nodeType==3){u=i.startContainer}else{d=false;g=s(i.startContainer)}}if(u&&g.length==0){m=o(u);if(m&&(m.nodeName!="BODY"||i.collapsed)){d=false;g=s(m)}}}else{var p=false,v=[],B=n(i.startContainer),b=n(i.endContainer);if(B){v.push({startContainer:i.startContainer,startOffset:i.startOffset,end:B});i.setStartAfter(B);p=true}if(b){p=true;v.push({start:b,endContainer:i.endContainer,endOffset:i.endOffset});i.setEndBefore(b)}var C=r.editor.util.FindParentEx(i.startContainer,function(e){return e.nodeName=="UL"||e.nodeName=="OL"||e.nodeName=="MENU"},N.body),x=r.editor.util.FindParentEx(i.endContainer,function(e){return e.nodeName=="UL"||e.nodeName=="OL"||e.nodeName=="MENU"},N.body);if(C){i.setStartBefore(C);if(!x)i.setEndAfter(C);p=true}if(x){p=true;i.setEndAfter(x);if(!C)i.setStartBefore(x)}if(p){r.editor.selection.SetSelection(i);g=i.getNodes([1])}}if(d){h=N.createElement("span");r.editor.selection.Surround(h,i);g=s(h)}if(g&&g.length>0){r.editor.selection.ExecuteAndRestoreSimple(function(){l(g,N)})}if(v&&v.length>0){var I=i.cloneRange();for(f=0;f<v.length;f++){if(v[f].start){I.setStartBefore(v[f].start)}else{I.setStart(v[f].startContainer,v[f].startOffset)}if(v[f].end){I.setEndAfter(v[f].end)}else{I.setEnd(v[f].endContainer,v[f].endOffset)}r.editor.selection.SetSelection(I);l(I.getNodes([1]),N)}r.editor.selection.SetSelection(i)}if(d&&h&&h.parentNode){if(a(h)){r.editor.selection.SelectNode(h)}r.editor.selection.ExecuteAndRestoreSimple(function(){r.editor.util.ReplaceWithOwnChildren(h)})}if(!r.editor.iframeView.IsEmpty(true)){r.actions.formatBlock.exec("formatBlock",null)}},state:BX.DoNothing,value:BX.DoNothing}},GetBold:function(){var e=this;return{exec:function(t,r){if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){return e.actions.formatInline.exec(t,r,"b")}else{return e.actions.formatBbCode.exec(t,{tag:"B"})}},state:function(t,r){return e.actions.formatInline.state(t,r,"b")},value:BX.DoNothing}},GetItalic:function(){var e=this;return{exec:function(t,r){if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){return e.actions.formatInline.exec(t,r,"i")}else{return e.actions.formatBbCode.exec(t,{tag:"I"})}},state:function(t,r){return e.actions.formatInline.state(t,r,"i")},value:BX.DoNothing}},GetUnderline:function(){var e=this;return{exec:function(t,r){if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){return e.actions.formatInline.exec(t,r,"u")}else{return e.actions.formatBbCode.exec(t,{tag:"U"})}},state:function(t,r){return e.actions.formatInline.state(t,r,"u")},value:BX.DoNothing}},GetStrikeout:function(){var e=this;return{exec:function(t,r){if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){return e.actions.formatInline.exec(t,r,"del")}else{return e.actions.formatBbCode.exec(t,{tag:"S"})}},state:function(t,r){return e.actions.formatInline.state(t,r,"del")},value:BX.DoNothing}},GetFontSize:function(){var e=this;return{exec:function(t,r){var i;if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){if(r>0)i=e.actions.formatInline.exec(t,r,"span",{fontSize:r+"pt"});else i=e.actions.formatInline.exec(t,r,"span",{fontSize:null},null,{bClear:true})}else{i=e.actions.formatBbCode.exec(t,{tag:"SIZE",value:r+"pt"})}return i},state:function(t,r){return e.actions.formatInline.state(t,r,"span",{fontSize:r+"pt"})},value:BX.DoNothing}},GetForeColor:function(){var e=this;function t(){var t=e.editor.GetIframeDoc(),r,i,n=[],o=e.editor.selection.GetRange();if(o){var a=o.getNodes([1]);if(a.length==0&&o.startContainer==o.endContainer&&o.startContainer.nodeName!="BODY"){a=[o.startContainer]}for(r=0;r<a.length;r++){i=BX.findParent(a[r],function(e){return e.nodeName=="LI"&&e.style&&e.style.color},t.body);if(i){n.push(i)}}}return n.length===0?false:n}function r(t){var r=e.editor.GetIframeDoc(),i=e.editor.selection.GetSelectedNode(),n,o,a,l,s,d,f;if(i&&(i.nodeType===3||i.nodeName=="SPAN")){s=i.nodeName=="SPAN"?i:BX.findParent(i,{tag:"span"},r.body);if(s&&s.style.color){d=BX.findParent(s,{tag:"li"},r.body);if(d){if(d.childNodes.length==1&&d.firstChild==s){e.editor.selection.ExecuteAndRestoreSimple(function(){d.style.color=t;s.style.color="";if(BX.util.trim(s.style.cssText)==""){e.editor.util.ReplaceWithOwnChildren(s)}})}}}}else{if(!i){l=e.editor.selection.GetRange();f=l.getNodes([1])}else{f=[i]}for(n=0;n<f.length;n++){if(f[n]&&f[n].nodeName=="LI"&&!e.editor.bbCode){f[n].style.color=t;a=BX.findChild(f[n],function(e){return e.nodeName=="SPAN"},true,true);e.editor.selection.ExecuteAndRestoreSimple(function(){for(o=0;o<a.length;o++){if(a[o]&&a[o].parentNode&&a[o].parentNode.parentNode&&a[o].parentNode.parentNode.parentNode){try{a[o].style.color="";if(BX.util.trim(a[o].style.cssText)==""){e.editor.util.ReplaceWithOwnChildren(a[o])}}catch(t){}}}})}}}}return{exec:function(t,i){var n;if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){if(i==""){n=e.actions.formatInline.exec(t,i,"span",{color:null},null,{bClear:true})}else{n=e.actions.formatInline.exec(t,i,"span",{color:i});r(i)}}else if(i){n=e.actions.formatBbCode.exec(t,{tag:"COLOR",value:i})}return n},state:function(r,i){var n=e.actions.formatInline.state(r,i,"span",{color:i});if(!n){n=t()}return n},value:BX.DoNothing}},GetBackgroundColor:function(){var e=this;return{exec:function(t,r){var i;if(r==""){i=e.actions.formatInline.exec(t,r,"span",{backgroundColor:null},null,{bClear:true})}else{i=e.actions.formatInline.exec(t,r,"span",{backgroundColor:r})}return i},state:function(t,r){return e.actions.formatInline.state(t,r,"span",{backgroundColor:r})},value:BX.DoNothing}},GetCreateLink:function(){var e=["title","id","name","target","rel"],t=this;return{exec:function(r,i){if(t.editor.bbCode&&t.editor.synchro.IsFocusedOnTextarea()){t.editor.textareaView.Focus();var n="[URL="+t.editor.util.spaceUrlEncode(i.href)+"]"+(i.text||i.href)+"[/URL]";t.editor.textareaView.WrapWith(false,false,n)}else{t.editor.iframeView.Focus();var o,a=i&&typeof i==="object"?i:{href:i},l,s,d=0,f,c;function u(r,i){var n;r.removeAttribute("class");r.removeAttribute("target");for(n in i){if(i.hasOwnProperty(n)&&BX.util.in_array(n,e)){if(i[n]==""||i[n]==undefined){r.removeAttribute(n)}else{r.setAttribute(n,i[n])}}}if(i.className)r.className=i.className;r.href=t.editor.util.spaceUrlEncode(i.href)||"";if(i.noindex){r.setAttribute("data-bx-noindex","Y")}else{r.removeAttribute("data-bx-noindex")}}c=i.node?[i.node]:t.actions.formatInline.state(r,i,"a");if(c){for(l=0;l<c.length;l++){s=c[l];if(s){u(s,a);f=s;d++}}if(d===1&&f&&(f.querySelector&&!f.querySelector("*"))&&a.text!=""){t.editor.util.SetTextContent(f,a.text)}o=f;if(o)t.editor.selection.SetAfter(o);setTimeout(function(){if(o)t.editor.selection.SetAfter(o)},10)}else{var m="_bx-editor-temp-"+Math.round(Math.random()*1e6),h,g,N;t.actions.formatInline.exec(r,i,"A",false,m);if(t.document.querySelectorAll){c=t.document.querySelectorAll("A."+m)}else{c=[]}for(l=0;l<c.length;l++){s=c[l];if(s){u(s,a)}}o=s;if(c.length===1){N=t.editor.util.GetTextContent(s);g=N===""||N===t.editor.INVISIBLE_SPACE;if(N!=a.text){t.editor.util.SetTextContent(s,a.text||a.href)}if(s.querySelector&&!s.querySelector("*")&&g){t.editor.util.SetTextContent(s,a.text||a.href)}}if(s){if(s.nextSibling&&s.nextSibling.nodeType==3&&t.editor.util.IsEmptyNode(s.nextSibling)){h=s.nextSibling}else{h=t.editor.util.GetInvisibleTextNode()}t.editor.util.InsertAfter(h,s);o=h}if(o)t.editor.selection.SetAfter(o);setTimeout(function(){if(o)t.editor.selection.SetAfter(o)},10)}}},state:function(e,r){return t.actions.formatInline.state(e,r,"a")},value:BX.DoNothing}},GetRemoveLink:function(){var e=this;return{exec:function(t,r){e.editor.iframeView.Focus();var i,n,o;if(r&&typeof r=="object"){o=r}else{o=e.actions.formatInline.state(t,r,"a")}if(o){e.editor.selection.ExecuteAndRestoreSimple(function(){for(i=0;i<o.length;i++){n=o[i];if(n){e.editor.util.ReplaceWithOwnChildren(o[i])}}})}},state:function(e,t){},value:BX.DoNothing}},GetInsertHTML:function(){var e=this;return{exec:function(t,r){e.editor.iframeView.Focus();if(e.IsSupportedByBrowser(t))e.document.execCommand(t,false,r);else e.editor.selection.InsertHTML(r)},state:function(){return false},value:BX.DoNothing}},GetInsertImage:function(){var e=["title","alt","width","height","align"],t=this;return{exec:function(r,i){if(i.src=="")return;i.src=t.editor.util.spaceUrlEncode(i.src);if(t.editor.bbCode&&t.editor.synchro.IsFocusedOnTextarea()){t.editor.textareaView.Focus();var n="";if(i.width)n+=" WIDTH="+parseInt(i.width);if(i.height)n+=" HEIGHT="+parseInt(i.height);var o="[IMG"+n+"]"+i.src+"[/IMG]";t.editor.textareaView.WrapWith(false,false,o);return}t.editor.iframeView.Focus();var a=i&&typeof i==="object"?i:{src:i},l=i.image||t.actions.insertImage.state(r,i),s,d;function f(r,i){var n,o;r.removeAttribute("class");r.setAttribute("data-bx-orig-src",i.src||"");for(n in i){if(i.hasOwnProperty(n)&&BX.util.in_array(n,e)){if(i[n]==""||i[n]==undefined){r.removeAttribute(n)}else{o=r.getAttribute("data-bx-app-ex-"+n);if(!o||t.editor.phpParser.AdvancedPhpGetFragmentByCode(o,true)!=i[n]){r.setAttribute(n,i[n]);if(o){r.removeAttribute("data-bx-app-ex-"+n)}}}}}if(i.className){r.className=i.className}o=r.getAttribute("data-bx-app-ex-src");if(!o||t.editor.phpParser.AdvancedPhpGetFragmentByCode(o,true)!=i.src){r.src=i.src||"";if(o){r.removeAttribute("data-bx-app-ex-src")}}}if(!l){l=t.document.createElement("IMG");f(l,a);t.editor.selection.InsertNode(l)}else{f(l,a)}var c=l,u=l.parentNode&&l.parentNode.nodeName=="A"?l.parentNode:null;if(a.link){if(u){u.href=a.link}else{u=t.document.createElement("A");u.href=a.link;l.parentNode.insertBefore(u,l);u.appendChild(l)}c=u}else if(u){t.editor.util.ReplaceWithOwnChildren(u)}if(BX.browser.IsIE()){t.editor.selection.SetAfter(l);d=l.nextSibling;if(d&&d.nodeType==3&&t.editor.util.IsEmptyNode(d))s=d;else s=t.editor.util.GetInvisibleTextNode();t.editor.selection.InsertNode(s);c=s}t.editor.selection.SetAfter(c);t.editor.util.Refresh()},state:function(){var e,r,i;if(!t.editor.util.DocumentHasTag(t.document,"IMG"))return false;e=t.editor.selection.GetSelectedNode();if(!e)return false;if(e.nodeName==="IMG")return e;if(e.nodeType!==1)return false;r=BX.util.trim(t.editor.selection.GetText());if(r&&r!=t.editor.INVISIBLE_SPACE)return false;i=t.editor.selection.GetNodes(1,function(e){return e.nodeName==="IMG"});if(i.length!==1)return false;return i[0]},value:BX.DoNothing}},GetInsertLineBreak:function(){var e=this,t="<br>"+(BX.browser.IsOpera()?" ":"");return{exec:function(r){if(e.IsSupportedByBrowser(r)){e.document.execCommand(r,false,null)}else{e.actions.insertHTML.exec("insertHTML",t)}if(BX.browser.IsChrome()||BX.browser.IsSafari()||BX.browser.IsIE10()){e.editor.selection.ScrollIntoView()}},state:BX.DoNothing,value:BX.DoNothing}},GetInsertHr:function(){var e=this,t="<hr>"+(BX.browser.IsOpera()?" ":"");return{exec:function(r){e.actions.insertHTML.exec("insertHTML",t);if(BX.browser.IsChrome()||BX.browser.IsSafari()||BX.browser.IsIE10()){e.editor.selection.ScrollIntoView()}},state:BX.DoNothing,value:BX.DoNothing}},GetInsertTable:function(){var e=this,t=["title","id","border","cellSpacing","cellPadding","align"];function r(t){var r=e.document.createElement("TH");while(t.firstChild)r.appendChild(t.firstChild);e.editor.util.ReplaceNode(t,r)}function i(t){var r=e.document.createElement("TD");while(t.firstChild)r.appendChild(t.firstChild);e.editor.util.ReplaceNode(t,r)}function n(n,o){var a;n.removeAttribute("class");for(a in o){if(o.hasOwnProperty(a)&&BX.util.in_array(a,t)){if(o[a]===""||o[a]==undefined){n.removeAttribute(a)}else{n.setAttribute(a,o[a])}}}if(o.className){n.className=o.className}n.removeAttribute("data-bx-no-border");if(n.getAttribute("border")==0||!n.getAttribute("border")){n.removeAttribute("border");n.setAttribute("data-bx-no-border","Y")}if(o.width){if(parseInt(o.width)==o.width){o.width=o.width+"px"}if(n.getAttribute("width")){n.setAttribute("width",o.width)}else{n.style.width=o.width}}if(o.height){if(parseInt(o.height)==o.height){o.height=o.height+"px"}if(n.getAttribute("height")){n.setAttribute("height",o.height)}else{n.style.height=o.height}}var l,s,d;for(l=0;l<n.rows.length;l++){for(s=0;s<n.rows[l].cells.length;s++){d=n.rows[l].cells[s];if((o.headers=="top"||o.headers=="topleft")&&l==0||(o.headers=="left"||o.headers=="topleft")&&s==0){r(d)}else if(d.nodeName=="TH"){i(d)}}}var f=BX.findChild(n,{tag:"CAPTION"},false);if(o.caption){if(f){f.innerHTML=BX.util.htmlspecialchars(o.caption)}else{f=e.document.createElement("CAPTION");f.innerHTML=BX.util.htmlspecialchars(o.caption);n.insertBefore(f,n.firstChild)}}else if(f){BX.remove(f)}}return{exec:function(t,r){if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){if(!r||!r.rows||!r.cols){return false}e.editor.iframeView.Focus();var i=r.table||e.actions.insertTable.state(t,r);r.rows=parseInt(r.rows)||1;r.cols=parseInt(r.cols)||1;if(r.align=="left"||e.editor.bbCode){r.align=""}if(!i){i=e.document.createElement("TABLE");var o=i.appendChild(e.document.createElement("TBODY")),a,l,s,d;r.rows=parseInt(r.rows)||1;r.cols=parseInt(r.cols)||1;for(a=0;a<r.rows;a++){s=o.insertRow(-1);for(l=0;l<r.cols;l++){d=BX.adjust(s.insertCell(-1),{html:"&nbsp;"})}}n(i,r);e.editor.selection.InsertNode(i);var f=e.editor.util.GetNextNotEmptySibling(i);if(!f){e.editor.util.InsertAfter(BX.create("BR",{},e.document),i)}if(f&&f.nodeName=="BR"&&!f.nextSibling){e.editor.util.InsertAfter(e.editor.util.GetInvisibleTextNode(),f)}}else{n(i,r)}var c=i.rows[0].cells[0].firstChild;if(c){e.editor.selection.SetAfter(c)}setTimeout(function(){e.editor.util.Refresh(i)},10)}else{e.editor.textareaView.Focus();var u="",m,h,g=e.editor.INVISIBLE_SPACE;if(r.rows>0&&r.cols>0){u+="[TABLE]\n";for(m=0;m<r.rows;m++){u+="	[TR]\n";for(h=0;h<r.cols;h++){u+="		[TD]"+g+"[/TD]\n"}u+="	[/TR]\n"}u+="[/TABLE]\n"}e.editor.textareaView.WrapWith(false,false,u)}},state:function(t,r){var i,n;if(!e.editor.util.DocumentHasTag(e.document,"TABLE")){return false}i=e.editor.selection.GetSelectedNode();if(!i){return false}if(i.nodeName==="TABLE"){return i}if(i.nodeType!==1){return false}n=e.editor.selection.GetNodes(1,function(e){return e.nodeName==="TABLE"});if(n.length!==1){return false}return n[0]},value:BX.DoNothing}},GetInsertList:function(e){var t=this;var r=!!e.bOrdered,i=r?"OL":"UL",n=r?"UL":"OL";function o(e){var r=e.nextSibling;while(r&&r.nodeType==3&&t.editor.util.IsEmptyNode(r,true)){r=r.nextSibling}return r}function a(e){if(e.nodeName!=="MENU"&&e.nodeName!=="UL"&&e.nodeName!=="OL"){return}var r=t.document.createDocumentFragment(),i=e.previousSibling,n,o,a,l;if(i&&!t.editor.util.IsBlockElement(i)&&!t.editor.util.IsEmptyNode(i,true)){r.appendChild(t.document.createElement("BR"))}while(l=e.firstChild){o=l.lastChild;while(n=l.firstChild){if(n.nodeName=="I"&&n.innerHTML==""&&n.className!=""){BX.remove(n);n=l.firstChild;if(!n)break}a=n===o&&!t.editor.util.IsBlockElement(n)&&n.nodeName!=="BR";r.appendChild(n);if(a){r.appendChild(t.document.createElement("BR"))}}l.parentNode.removeChild(l)}var s=t.editor.util.GetNextNotEmptySibling(e);if(s&&s.nodeName=="BR"&&r.lastChild&&r.lastChild.nodeName=="BR"){BX.remove(r.lastChild)}e.parentNode.replaceChild(r,e)}function l(e,r){if(!e||!e.parentNode)return false;var i=e.nodeName.toUpperCase();if(i==="UL"||i==="OL"||i==="MENU"){return e}var n=t.document.createElement(r),o,a;while(e.firstChild){a=a||n.appendChild(t.document.createElement("li"));o=e.firstChild;if(t.editor.util.IsBlockElement(o)){a=a.firstChild?n.appendChild(t.document.createElement("li")):a;a.appendChild(o);a=null;continue}if(o.nodeName==="BR"){a=a.firstChild?null:a;e.removeChild(o);continue}a.appendChild(o)}e.parentNode.replaceChild(n,e);return n}function s(e){return e.nodeName=="OL"||e.nodeName=="UL"||e.nodeName=="MENU"}function d(e,r){if(!r){r=t.editor.selection.GetSelectedNode()}if(!r||r.nodeName=="BODY"){var i=t.editor.selection.GetRange(),n=t.editor.selection.GetCommonAncestorForRange(i);if(n&&s(n)){r=n}else{var o,a=true,l,d,f=i.getNodes([1]),c=f.length;if(n){l=d=BX.findParent(n,s,t.document.body)}if(!d){for(o=0;o<c;o++){d=BX.findParent(f[o],s,n);if(!d||l&&d!=l){a=false;break}l=d}}if(!l){var u=false;for(o=0;o<c;o++){if(s(f[o])){u=f[o];break}}if(u){var m=true;for(o=0;o<c;o++){if(f[o]==u||BX.findParent(f[o],function(e){return e===u},t.document.body)||f[o].nodeName=="BR"||t.editor.util.IsEmptyNode(f[o])){}else{m=false;break}}if(m){l=u}}}if(l){r=l}}}return r&&r.nodeName==e?r:BX.findParent(r,{tagName:e},t.document.body)}function f(e,t){if(!e)return false;if(!t)t={tag:"I",remove:true};var r,i,n,o=e.ownerDocument;for(r=0;r<e.childNodes.length;r++){i=e.childNodes[r];if(i&&i.nodeType==1&&i.nodeName=="LI"){n=i.firstChild;if(n.nodeName==t.tag&&n.innerHTML==""){if(t.remove)BX.remove(n);else n.className=t.className}else{i.insertBefore(BX.create(t.tag,{props:{className:t.className}},o),n)}}}}function c(e){if(!e)return false;var t,r,i;for(t=0;t<e.childNodes.length;t++){r=e.childNodes[t];if(r&&r.nodeType==1&&r.nodeName=="LI"){i=r.firstChild;if(i&&i.nodeName=="I"&&i.innerHTML==""&&i.className!==""){return i.className}}}return false}function u(e,r,i){if(e&&(e.nodeName=="UL"||e.nodeName=="OL")){var n,o,a,l=e.ownerDocument,s;for(n=0;n<e.childNodes.length;n++){o=e.childNodes[n];if(o&&o.nodeType==1&&o.nodeName=="LI"&&o.firstChild){a=o.firstChild;if(a.nodeName=="I"&&a.innerHTML==""&&a.className!==""){if(!r)r=a.className}else if(a.nodeName=="I"&&a.innerHTML==""&&r){a.className=r;s=a}else if(a&&r){s=o.insertBefore(BX.create("I",{props:{className:r}},l),a)}}}if(i&&s)t.editor.selection._MoveCursorAfterNode(s)}}return{exec:function(e,o){if(!t.editor.bbCode||!t.editor.synchro.IsFocusedOnTextarea()){var s=t.editor.selection.GetRange();if(t.IsSupportedByBrowser(e)&&s.collapsed){t.document.execCommand(e,false,null)}else{var f=t.editor.selection.GetSelectedNode(),c=d(i,f),u=d(n,f),m,h;if(c){t.editor.selection.ExecuteAndRestoreSimple(function(){a(c)})}else if(u){t.editor.selection.ExecuteAndRestoreSimple(function(){t.editor.util.RenameNode(u,i)})}else{h=t.document.createElement("span");t.editor.selection.Surround(h);m=h.innerHTML===""||h.innerHTML===t.editor.INVISIBLE_SPACE;t.editor.selection.ExecuteAndRestoreSimple(function(){var e,r=h.getElementsByTagName("SPAN");for(e=r.length-1;e>=0;e--){if(!r[e].className&&!r[e].id&&!r[e].style.cssText){t.editor.util.ReplaceWithOwnChildren(r[e])}}c=l(h,i)});if(c){var g=0,N;while(g<c.childNodes.length){N=c.childNodes[g];if(N.nodeName=="LI"){if(t.editor.util.IsEmptyNode(N,true,true)){BX.remove(N);continue}g++}else if(N.nodeType==1){BX.remove(N)}}var p=t.editor.util.GetPreviousNotEmptySibling(c);if(p&&(p.nodeName=="BLOCKQUOTE"||p.nodeName=="PRE"||p.nodeName=="UL"||p.nodeName=="OL")&&c.childNodes[0]&&BX.findChild(c.childNodes[0],{
tag:p.nodeName})){if(BX.util.trim(t.editor.util.GetTextContent(p))==""){BX.remove(p)}}}if(m&&c&&c.querySelector){t.editor.selection.SelectNode(c.querySelector("li"))}}}}else{if(o&&o.items){t.editor.textareaView.Focus();var v="[LIST"+(r?"=1":"")+"]\n",B;for(B=0;B<o.items.length;B++){v+="	[*]"+o.items[B]+"\n"}v+="[/LIST]\n";t.editor.textareaView.WrapWith(false,false,v)}}},state:function(){return d(i)||false},value:BX.DoNothing,customBullit:f,getCustomBullitClass:c,checkCustomBullitList:u}},GetAlign:function(){var e="bx-align-tmp",t="data-bx-checked-align-list",r="left",i={TD:1,TR:1,TH:1,TABLE:1,TBODY:1,CAPTION:1,COL:1,COLGROUP:1,TFOOT:1,THEAD:1},n={IMG:1,P:1,DIV:1,TABLE:1,H1:1,H2:1,H3:1,H4:1,H5:1,H6:1},o=this;function a(e){var t=e.nodeName,r,i=false;if(e.nodeType===1){r=e.style.textAlign;if(e.style.textAlign){i={node:e,style:r}}if(n[t]){r=e.getAttribute("align");if(r){if(i){i.attribute=r}else{i={node:e,attribute:r}}}}}return i}function l(e){return e&&(e.nodeName=="TD"||e.nodeName=="TH")}function s(e,t){e.setAttribute("data-bx-tmp-align",t);e.style.textAlign=t}function d(e,t){if(t=="left"||t=="justify"||o.editor.bbCode){e.removeAttribute("align")}else{e.setAttribute("align",t)}}function f(e,t){var r,i,n=true,o=e.getElementsByTagName("TD");for(i=0;i<o.length;i++){if(o[i].getAttribute("data-bx-tmp-align")!=t){n=false;break}}if(n){r=e.getElementsByTagName("TH");for(i=0;i<r.length;i++){if(r[i].getAttribute("data-bx-tmp-align")!=t){n=false;break}}}if(n){d(e,t)}}function c(e,t){var r=BX.create("DIV",{style:{textAlign:t},html:e.innerHTML},o.editor.GetIframeDoc());e.innerHTML="";e.appendChild(r);return r}function u(e,t){var r=BX.create("DIV",{style:{textAlign:t}},o.editor.GetIframeDoc());e.parentNode.insertBefore(r,e);r.appendChild(e);return r}function m(e,r,i){var n=o.editor.GetIframeDoc(),a=o.editor.bbCode;if(!e&&r){e=BX.findParent(r,function(e){return e.nodeName=="OL"||e.nodeName=="UL"||e.nodeName=="MENU"},n)}if(e&&!e.getAttribute(t)){var l,s=true,d=e.getElementsByTagName("LI");for(l=0;l<d.length;l++){if(d[l].style.textAlign!==i){s=false;break}}if(a){e.style.textAlign="";if(e.style.cssText==""){e.removeAttribute("style")}h(e);u(e,i)}else if(s){e.style.textAlign=i;h(e)}e.setAttribute(t,"Y");return e}return false}function h(e){var t,r=e.getElementsByTagName("LI");for(t=0;t<r.length;t++){r[t].style.textAlign="";if(r[t].style.cssText==""){r[t].removeAttribute("style")}}}function g(e,t){if(t&&t.nodeName=="TABLE"){var r,i=false;for(r=0;r<e.length;r++){if(e[r]==t){i=true;break}}if(!i){e.push(t)}}return e}return{exec:function(r,n){var a;if(!o.editor.bbCode||!o.editor.synchro.IsFocusedOnTextarea()){var N,p="P",v=o.editor.selection.GetRange(),B=false,b=false,C=false,x=o.editor.selection.GetBookmark(),I=o.editor.selection.GetSelectedNode();if(I){if(o.editor.util.IsBlockNode(I)){B=I}else if(I.nodeType==1&&i[I.nodeName]){b=I;a=true;setTimeout(function(){o.editor.selection.SelectNode(b);if(b.nodeName=="TABLE"){d(b,n)}},10)}else{if(I.nodeName=="LI"){C=I}else if(I.nodeName=="OL"||I.nodeName=="UL"||I.nodeName=="MENU"){if(o.editor.bbCode){u(I,n);I.style.textAlign=""}else{I.style.textAlign=n}a=true;h(I);setTimeout(function(){o.editor.selection.SelectNode(I)},10)}else{C=BX.findParent(I,function(e){return e.nodeName=="LI"},o.document.body)}if(C){if(o.editor.bbCode){c(C,n);C.style.textAlign=""}else{C.style.textAlign=n}a=true;setTimeout(function(){o.editor.selection.SelectNode(C)},10)}else{B=BX.findParent(I,function(e){return o.editor.util.IsBlockNode(e)&&!o.actions.quote.checkNode(e)},o.document.body)}}}else{var S=[],y=false,T=[],A=[],w=v.getNodes([1]);for(N=0;N<w.length;N++){if(l(w[N])){S=g(S,BX.findParent(w[N],{tagName:"TABLE"}));s(w[N],n);a=true}if(w[N].nodeName=="TABLE"){S=g(S,w[N]);y=true}else if(w[N].nodeName=="OL"||w[N].nodeName=="UL"||w[N].nodeName=="MENU"){w[N].style.textAlign=n;T.push(w[N]);a=true}else if(w[N].nodeName=="LI"){w[N].style.textAlign=n;a=true;A.push(w[N])}}for(N=0;N<S.length;N++){f(S[N],n)}if(a){var G=o.editor.selection.GetCommonAncestorForRange(v);if(G&&G.nodeName=="BODY"){a=false}}for(N=0;N<T.length;N++){h(T[N])}var E=[],X;for(N=0;N<A.length;N++){X=m(false,A[N],n);if(X){E.push(X)}}for(N=0;N<E.length;N++){E[N].removeAttribute(t)}}if(!a){if(B){if(o.editor.bbCode){c(B,n);B.style.textAlign=""}else{p=B.tagName!="DIV"?B.tagName:"P";a=o.actions.formatBlock.exec("formatBlock",p,null,{textAlign:n})}o.editor.util.Refresh(B)}else if(b){if(l(b)){s(b,n)}else{var L=BX.findChild(b,l,true,true),R=BX.findChild(b,l,true,true);for(N=0;N<L.length;N++){s(L[N],n)}for(N=0;N<R.length;N++){s(R[N],n)}}}else if(v.collapsed){a=o.actions.formatBlock.exec("formatBlock","P",e,{textAlign:n});var O,k=o.document.querySelectorAll("."+e);for(N=0;N<=k.length;N++){BX.removeClass(k[N],e);if(N==0){O=k[N].firstNode;if(!O)O=k[N].appendChild(o.editor.util.GetInvisibleTextNode());setTimeout(function(){if(O)o.editor.selection.SetAfter(O)},100)}}}else{var D=o.actions.insertImage.state();if(!a&&false){var F=true;w=v.getNodes([1]);if(w&&w.length>0){for(N=0;N<w.length;N++){if(w[N].nodeName=="P"){w[N].style.textAlign=n}else{F=false}}a=F}}if(!a){p=o.editor.bbCode?"DIV":"P";a=o.actions.formatBlock.exec("formatBlock",p,null,{textAlign:n},{leaveChilds:true,splitBlock:true});if(a&&typeof a=="object"&&a.nodeName==p){var M=0,P=2e3,H,U,V,_=false;if(a.firstChild&&a.firstChild.nodeName=="BLOCKQUOTE"){H=o.editor.util.GetPreviousNotEmptySibling(a);if(H&&H.nodeName=="BLOCKQUOTE"&&o.editor.util.IsEmptyNode(H)){BX.remove(H)}}N=0;while(N<a.childNodes.length||M>P){U=a.childNodes[N];if(o.editor.util.IsBlockNode(U)){U.style.textAlign=n;_=true;N++}else{if(!V||_){V=o.document.createElement(p);V.style.textAlign=n;a.insertBefore(V,U);N++}V.appendChild(U);_=false}M++}if(a.previousSibling&&a.previousSibling.nodeName=="P"&&o.editor.util.IsEmptyNode(a.previousSibling,true,true)){BX.remove(a.previousSibling)}if(a.nextSibling&&a.nextSibling.nodeName=="P"&&o.editor.util.IsEmptyNode(a.nextSibling,true,true)){BX.remove(a.nextSibling)}o.editor.util.ReplaceWithOwnChildren(a);setTimeout(function(){if(V)o.editor.selection.SelectNode(V)},100)}}if(D){o.editor.util.Refresh(D)}}}setTimeout(function(){o.editor.selection.SetBookmark(x)},10)}else{if(n){a=o.actions.formatBbCode.exec(r,{tag:n.toUpperCase()})}}return a},state:function(e,t){var i,n,l=o.editor.selection.GetSelectedNode();if(l){i=a(l);if(!i){n=BX.findParent(l,function(e){i=a(e);return i},o.document.body)}return{node:i?i.node:null,value:i?i.style||i.attribute:r,res:i}}else{var s={node:null,value:r,res:true},d=o.editor.selection.GetRange();if(!d.collapsed){var f,c="",u,m=d.getNodes([1]);for(u=0;u<m.length;u++){if(!o.editor.util.CheckSurrogateNode(m[u])&&m[u].nodeName!=="BR"&&o.editor.util.GetNodeDomOffset(m[u])==0){f=a(m[u]);t=f?f.style||f.attribute:r;if(!c){c=t}if(t!=c){s.res=false;break}}}if(s.res){s.value=c}}else{s.res=false}return s}},value:BX.DoNothing}},GetIndent:function(){var e=this;return{exec:function(t){var r=e.editor.selection.GetRange();if(r&&r.collapsed&&r.endContainer==r.startContainer&&BX.util.in_array(r.startContainer.nodeName,["TD","TR","TH"])&&arguments[1]!==r.startContainer.nodeName){var i="bxed_bogus_node_59811",n=r.startContainer.appendChild(BX.create("SPAN",{props:{id:i},html:"&nbsp;"},e.document));is_text=e.editor.util.GetInvisibleTextNode();if(n){r.setStartBefore(n);r.setEndAfter(n);e.editor.selection.SetSelection(r);return setTimeout(function(){e.actions.indent.exec(t,r.startContainer.nodeName);var n=e.editor.GetIframeElement(i);if(n){e.editor.selection.SetAfter(n);BX.remove(n)}},0)}}if(e.IsSupportedByBrowser(t)){e.document.execCommand(t)}else{e.actions.formatBlock.exec("formatBlock","BLOCKQUOTE")}var o=e.editor.selection.GetRange();if(o){var a=0,l,s=o.getNodes([1]);for(l=0;l<s.length;l++){if(s[l].nodeName=="BLOCKQUOTE"){a++;s[l].removeAttribute("style")}}if(o.startContainer){var d,f=false,c=o.startContainer;while(c){c=BX.findParent(c,{tag:"BLOCKQUOTE"},e.document.body);if(c){if(!f)f=c;c.removeAttribute("style")}}if(f){d=e.editor.util.GetInvisibleTextNode();f.appendChild(d);e.editor.selection.SetAfter(d)}}}},state:function(t,r){var i=false,n=e.editor.selection.GetRange();if(n){var o=e.editor.selection.GetCommonAncestorForRange(n);if(o&&o.nodeType==1&&o.nodeName==="BLOCKQUOTE"){i=o}}return i},value:BX.DoNothing}},GetOutdent:function(){var e=this;return{exec:function(t,r){var i,n="data-bx-tmp-flag",o=e.editor.GetIframeDoc(),a=o.getElementsByTagName("BLOCKQUOTE");{var l=[],s=o.getElementsByTagName("P");for(i=0;i<s.length;i++){s[i].setAttribute(n,"Y")}e.document.execCommand(t);s=o.getElementsByTagName("P");for(i=0;i<s.length;i++){if(!s[i].getAttribute(n)){l.push(s[i])}else{s[i].removeAttribute(n)}}e.editor.selection.ExecuteAndRestoreSimple(function(){for(i=0;i<l.length;i++){e.actions.formatBlock.addBrBeforeAndAfter(l[i]);e.editor.util.ReplaceWithOwnChildren(l[i])}})}},state:function(t,r){var i=e.editor.selection.GetRange();return false},value:BX.DoNothing}},GetFontFamily:function(){var e=this;return{exec:function(t,r){var i;if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){if(r)i=e.actions.formatInline.exec(t,r,"span",{fontFamily:r});else i=e.actions.formatInline.exec(t,r,"span",{fontFamily:null},null,{bClear:true})}else{return e.actions.formatBbCode.exec(t,{tag:"FONT",value:r})}return i},state:function(t,r){return e.actions.formatInline.state(t,r,"span",{fontFamily:r})},value:BX.DoNothing}},GetFormatStyle:function(){var e=this,t=this.editor.toolbar.controls.StyleSelector,r=t?t.checkedClasses:[],i=t?t.checkedTags:[];function n(t){if(t&&t.nodeType==1&&t.nodeName!=="BODY"&&(BX.util.in_array(t.nodeName,i)||BX.util.in_array(t.className,r))){return!e.editor.GetBxTag(t.id).tag}return false}return{exec:function(t,r){if(!r){return e.actions.removeFormat.exec("removeFormat")}else if(typeof r==="string"){return e.actions.formatBlock.exec("formatBlock",r)}else if(typeof r==="object"){if(r.tag=="UL"){var i=e.actions.insertUnorderedList.state();if(i&&r.className&&r.className.indexOf("~~")!==-1){var n=r.className.split("~~");if(n&&n.length>=2){var o=n[0],a=n[1];i.className=o;e.actions.insertUnorderedList.customBullit(i,{tag:"I",className:a,html:""})}}else if(i){i.className=r.className||"";e.actions.insertUnorderedList.customBullit(i,false)}}else if(r.tag){var l=r.className,s=r.tag.toUpperCase();if(s=="SPAN"){e.actions.formatInline.exec(t,r,s,false,l)}else{e.actions.formatBlock.exec("formatBlock",s,l,null,{nestedBlocks:false})}}if(!e.editor.util.FirstLetterSupported()){e.editor.parser.FirstLetterCheckNodes("","",true)}}},state:function(t,r){var i=false,o=e.editor.selection.GetSelectedNode();if(o){if(n(o)){i=o}else{i=BX.findParent(o,n,e.document.body)}}else{var a=e.editor.selection.GetRange(),l=e.editor.selection.GetCommonAncestorForRange(a);if(n(l)){i=l}}return i},value:BX.DoNothing}},GetChangeTemplate:function(){var e=this;return{exec:function(t,r){e.editor.ApplyTemplate(r)},state:function(t,r){return e.editor.GetTemplateId()},value:BX.DoNothing}},GetSelectNode:function(){var e=this;return{exec:function(t,r){if(!e.editor.iframeView.IsFocused()){e.editor.iframeView.Focus()}if(r===false||r&&r.nodeName=="BODY"){if(e.IsSupportedByBrowser("SelectAll")){e.document.execCommand("SelectAll")}else{e.editor.selection.SelectNode(r)}}else{e.editor.selection.SelectNode(r)}},state:BX.DoNothing,value:BX.DoNothing}},GetUndoRedo:function(e){var t=this;return{exec:function(e){if(e=="doUndo"){t.editor.undoManager.Undo()}else if(e=="doRedo"){t.editor.undoManager.Redo()}},state:BX.DoNothing,value:BX.DoNothing}},GetUniversalFormatStyle:function(){var e="bx-tmp-ufs-class",t="data-bx-tmp-status",r=this;function i(i){var o=[];if(i&&i.length>0){var a,l,s=[],d,f;for(a=0,l=i.length;a<l;a++){if(!r.editor.util.CheckSurrogateNode(i[a])&&i[a].nodeName!=="BR"){i[a].setAttribute(t,"Y");s.push({node:i[a],nesting:r.editor.util.GetNodeDomOffset(i[a])})}}s=s.sort(function(e,t){return e.nesting-t.nesting});for(a=0,l=s.length;a<l;a++){d=s[a].node;f=d.getAttribute(t);if(f=="Y"&&!n(d)){BX.findChild(d,function(r){if(r.nodeType==1&&r.nodeName!=="BR"&&r.setAttribute){r.setAttribute(t,r.className==e?"GET_RID_OF":"SKIP")}return false},true,true);o.push(d)}}}return o}function n(e){var r=BX.findChild(e,function(e){return e.nodeType==1&&e.nodeName!=="BR"&&e.getAttribute&&e.getAttribute(t)!=="Y"},true,false);return!!r}function o(e,t,r){try{if(t!==false){if(t==""){e.removeAttribute("class")}else{e.className=t}}if(r!==false){if(r==""){e.removeAttribute("style")}else{e.style.cssText=r}}}catch(i){}}return{exec:function(n,a){if(a.nodes&&a.nodes.length>0){for(s=0;s<a.nodes.length;s++){o(a.nodes[s],a.className,a.style)}}else{r.actions.formatInline.exec(n,a,"span",false,e);if(document.querySelectorAll){var l=r.editor.GetIframeDoc().querySelectorAll("."+e);if(l){for(s=0;s<l.length;s++){d=l[s];if(BX.util.trim(d.innerHTML)==""){r.editor.util.ReplaceWithOwnChildren(d)}}}}var s,d,f=r.actions.universalFormatStyle.state(n),c=i(f);for(s=0;s<c.length;s++){o(c[s],a.className,a.style)}if(document.querySelectorAll){l=r.editor.GetIframeDoc().querySelectorAll("."+e);if(l){for(s=0;s<l.length;s++){d=l[s];if(d.getAttribute(t)=="GET_RID_OF"){r.editor.util.ReplaceWithOwnChildren(l[s])}else{o(l[s],a.className,a.style)}}}}}},state:function(e){var t=r.editor.selection.GetRange();if(t){var i,n,o,a=t.getNodes([1]);if(a.length==0){i=t.getNodes([3]);if(i&&i.length==1){n=i[0]}if(!n&&t.startContainer==t.endContainer){if(t.startContainer.nodeType==3){n=t.startContainer}else{r.editor.selection.SelectNode(t.startContainer);a=[t.startContainer]}}if(n&&a.length==0){o=n.parentNode;if(o){a=[o]}}}return a}},value:BX.DoNothing}},GetSubSup:function(e){var t=this;e=e=="sup"?"sup":"sub";return{exec:function(r,i){return t.actions.formatInline.exec(r,i,e)},state:function(r,i){return t.actions.formatInline.state(r,i,e)},value:BX.DoNothing}},GetQuote:function(){var e,t,r=this;function i(e){return e&&e.className=="bxhtmled-quote"&&e.nodeName=="BLOCKQUOTE"}function n(e){t=e}function o(){return t}function a(t){return e=t}function l(e){e=e||r.editor.selection.GetRange(r.editor.selection.GetSelection(document));if(e){var t;if(e.startContainer==e.endContainer&&e.startOffset==0&&e.endOffset==e.endContainer.length&&e.startContainer.parentNode&&e.startContainer.parentNode.nodeName=="A"&&e.startContainer.parentNode.href){t=BX.create("DIV",{html:e.startContainer.parentNode.href},r.editor.GetIframeDoc())}else{var i=e.toHtml();i=i.replace(/<br.*?>/gi,"#BX_BR#");t=BX.create("DIV",{html:BX.util.htmlspecialchars(i)},r.editor.GetIframeDoc())}var o=r.editor.util.GetTextContentEx(t);o=o.replace(/#BX_BR#/gi,"<br>");n(o);BX.remove(t)}else{n("")}}function s(e){var t,i,n=e.querySelectorAll("blockquote.bxhtmled-quote");for(t=0;t<n.length;t++){i=n[t];if(i.nextSibling===null){r.editor.util.InsertAfter(r.editor.util.GetInvisibleTextNode(),i)}}}return{exec:function(t){var i=false,n=o();if(r.editor.bbCode&&r.editor.synchro.IsFocusedOnTextarea()){r.editor.textareaView.Focus();if(n){i=r.editor.textareaView.WrapWith(false,false,"[QUOTE]"+n+"[/QUOTE]")}else{i=r.actions.formatBbCode.exec(t,{tag:"QUOTE"})}}else{if(!e&&r.editor.selection.lastCheckedRange&&r.editor.selection.lastCheckedRange.range){e=r.editor.selection.lastCheckedRange.range}r.editor.iframeView.Focus();if(e){r.editor.selection.SetSelection(e)}if(n){var a="bxq_"+Math.round(Math.random()*1e6);r.editor.InsertHtml('<blockquote id="'+a+'" class="bxhtmled-quote">'+n+"</blockquote>"+r.editor.INVISIBLE_SPACE,e);setTimeout(function(){var e=r.editor.GetIframeElement(a);if(e){var t=e.previousSibling;if(t&&t.nodeType==3&&r.editor.util.IsEmptyNode(t)&&t.previousSibling&&t.previousSibling.nodeName=="BR"){BX.remove(t)}e.removeAttribute("id")}},0)}else{if(!e&&r.editor.selection.lastRange)e=r.editor.selection.lastRange;i=r.actions.formatBlock.exec("formatBlock","blockquote","bxhtmled-quote",false,{range:e})}if(!n)r.editor.selection.ScrollIntoView()}e=null;return i},state:function(){return r.actions.formatBlock.state("formatBlock","blockquote","bxhtmled-quote")},value:BX.DoNothing,setExternalSelectionFromRange:l,setExternalSelection:n,getExternalSelection:o,checkSpaceAfterQuotes:s,setRange:a,checkNode:i}},GetCode:function(){var e=this;return{exec:function(t){if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){var r=e.actions.code.state();if(r){var i=BX.util.trim(r.innerHTML);if(i=="<br>"||i===""){e.editor.selection.SetAfter(r);BX.remove(r)}else{e.editor.selection.ExecuteAndRestoreSimple(function(){r.className="";r=e.editor.util.RenameNode(r,"P")})}}else{e.actions.formatBlock.exec("formatBlock","pre","bxhtmled-code")}}else{return e.actions.formatBbCode.exec(t,{tag:"CODE"})}},state:function(){return e.actions.formatBlock.state("formatBlock","pre","bxhtmled-code")},value:BX.DoNothing}},GetInsertSmile:function(){var e=this;return{exec:function(t,r){var i=e.editor.smilesIndex[r];if(e.editor.bbCode&&e.editor.synchro.IsFocusedOnTextarea()){e.editor.textareaView.Focus();e.editor.textareaView.WrapWith(false,false," "+i.code+" ")}else{e.editor.iframeView.Focus();if(i){var n=BX.create("IMG",{props:{src:i.path,title:i.name||i.code}},e.editor.iframeView.document);e.editor.SetBxTag(n,{tag:"smile",params:i});if(i.width)n.style.width=parseInt(i.width)+"px";if(i.height)n.style.height=parseInt(i.height)+"px";e.editor.selection.InsertNode(n);var o=e.editor.iframeView.document.createTextNode(" ");n.parentNode.insertBefore(o,n);var a=BX.create("SPAN",{html:"&nbsp;"},e.editor.iframeView.document);e.editor.util.InsertAfter(a,n);e.editor.selection.SetAfter(a);setTimeout(function(){e.editor.selection.SetAfter(a)},10)}}},state:BX.DoNothing,value:BX.DoNothing}},GetTableOperation:function(){var e=this,t="&nbsp;";function r(e){var t=e.rows;var r=[],i,n,o,a,l,s,d,f,c=-1;for(i=0;i<t.length;i++){c++;if(!r[c]){r[c]=[]}n=-1;for(o=0;o<t[i].cells.length;o++){a=t[i].cells[o];n++;while(r[c][n]){n++}d=isNaN(a.colSpan)?1:a.colSpan;f=isNaN(a.rowSpan)?1:a.rowSpan;for(l=0;l<f;l++){if(!r[c+l]){r[c+l]=[]}for(s=0;s<d;s++){r[c+l][n+s]=t[i].cells[o]}}n+=d-1}}return r}function i(e,t){var r,i,n=[];for(r=0;r<t.length;r++){for(i=0,l=t[r].length;i<l;i++){if(t[r][i]==e){n.push({r:r,c:i})}}}return n}function n(e){var t=[],r=[],i={cells:0},n;for(n=0;n<e.length;n++){i.cells++;i.maxRow=n===0?e[n].r:Math.max(e[n].r,i.maxRow);i.minRow=n===0?e[n].r:Math.min(e[n].r,i.minRow);i.maxCol=n===0?e[n].c:Math.max(e[n].c,i.maxCol);i.minCol=n===0?e[n].c:Math.min(e[n].c,i.minCol);if(!BX.util.in_array(e[n].r,t))t.push(e[n].r);if(!BX.util.in_array(e[n].c,r))r.push(e[n].c)}i.rows=t.length;i.cols=r.length;return i}function o(e,t,r){if(t){t=c(t,r);if(t&&!BX.util.in_array(t,e))e.push(t)}return e}function a(t,r){var i=[],n;if(BX.browser.IsFirefox()){var a,l,s,d,f=rangy.getNativeSelection(e.editor.sandbox.GetWindow());for(a=0;a<f.rangeCount;a++){l=f.getRangeAt(a);s=l.startContainer.nodeType===1?l.startContainer.childNodes[l.startOffset]:l.startContainer;d=l.endContainer.nodeType===1?l.endContainer.childNodes[l.endOffset]:l.endContainer;i=o(i,s,r);i=o(i,d,r)}}else{if(t.collapsed){n=c(t.startContainer);i=o(i,n,r)}else{var u=t.getNodes([1]);for(a=0;a<u.length;a++){if(u[a].nodeName=="TD"||u[a].nodeName=="TH"){i=o(i,u[a],r)}}}}return i}function s(e,n,o){var a=BX.findParent(e,{tag:"TD"});if(!a)return;var l=a.parentNode,s=o=="insertColumnLeft"?a.cellIndex:a.cellIndex+1,d=l.rowIndex,f=r(n),c=i(a,f);l.insertCell(s).innerHTML=t;var u,m,h,g,N,p=o=="insertColumnLeft"?c[0].c:c[0].c+1;for(N=0;N<n.rows.length;N++){u=n.rows[N];if(u.rowIndex==d){continue}m=0;h=0;for(h=0;h<u.cells.length;h++){g=u.cells[h];c=i(g,f);if(c[0].c>=p){m=g.cellIndex;break}m=h+1}u.insertCell(m).innerHTML="&nbsp;"}}function d(e,r,i){var n=BX.findParent(e,{tag:"TR"});if(!n||!r)return;var o,a,l=i=="insertRowUpper"?n.rowIndex:n.rowIndex+1,s=r.insertRow(l);for(o=0;o<n.cells.length;o++){a=s.insertCell(o);a.innerHTML=t;a.colSpan=n.cells[o].colSpan}}function f(e,r,i){var n=c(e,r);if(!n||!r)return;var o=n.parentNode,a=i=="insertCellLeft"?n.cellIndex:n.cellIndex+1;o.insertCell(a).innerHTML=t}function c(e,t){if(e.nodeName=="TD"||e.nodeName=="TH")return e;return BX.findParent(e,function(e){return e.nodeName=="TD"||e.nodeName=="TH"},t)}function u(e,t){var o,a,l=r(t),s=n(i(e[0],l)),d=s,f=false,c=true,u=true;for(a=1;a<e.length;a++){o=n(i(e[a],l));c=c&&o.rows==s.rows&&o.maxRow==s.maxRow&&o.minRow==s.minRow;u=u&&o.cols==s.cols&&o.maxCol==s.maxCol&&o.minCol==s.minCol;f=f||c&&Math.abs(o.minCol-d.maxCol)>1||u&&Math.abs(o.minRow-d.maxRow)>1||!c&&!u;d=o}return{sameCol:u,sameRow:c,gaps:f}}function m(e,t,r){if(!e)e=a(t,r);if(!e||e.length<2)return false;var i=u(e,r);return!i.gaps&&(!i.sameRow&&i.sameCol||i.sameRow&&!i.sameCol)}function h(e,t){var n=a(e,t);if(!n||n.length!==1)return false;var o=r(t),l=i(n[0],o);if(l.length<1)return false;var s,d,f=l[l.length-1].c,c=true,u;for(s=0;s<l.length;s++){if(l[s].c==f){if(o[l[s].r]&&o[l[s].r][l[s].c+1]){u=o[l[s].r][l[s].c+1];if(d===undefined)d=u;else if(d!==u)c=false}else{c=false}}}c=c&&d&&m([n[0],d],e,t);return c}function g(e,t){var n=a(e,t);if(!n||n.length!==1)return false;var o=r(t),l=i(n[0],o);if(l.length<1)return false;var s,d,f=l[l.length-1].r,c=true,u;for(s=0;s<l.length;s++){if(l[s].r==f){if(o[f+1]&&o[f+1][l[s].c]){u=o[f+1][l[s].c];if(d===undefined)d=u;else if(d!==u)c=false}else{c=false}}}c=c&&d&&m([n[0],d],e,t);return c}function N(e,t,r){if(!r)r=a(e,t);if(r.length<2)return;var i=u(r,t),n,o,l=0,s=0,d="";if(i.sameRow&&!i.sameCol&&!i.gaps){for(n=0;n<r.length;n++){d+=" "+BX.util.trim(r[n].innerHTML);o=r[n].parentNode;l+=r[n].colSpan;if(n>0)o.removeChild(r[n])}r[0].colSpan=l;r[0].innerHTML=BX.util.trim(d)}else if(!i.sameRow&&i.sameCol&&!i.gaps){for(n=0;n<r.length;n++){d+=" "+BX.util.trim(r[n].innerHTML);o=r[n].parentNode;s+=r[n].rowSpan;if(n>0)o.removeChild(r[n])}r[0].rowSpan=s;r[0].innerHTML=BX.util.trim(d)}else{alert(BX.message("BXEdTableMergeError"))}}function p(e,t){var r=a(e,t);if(!r||r.length!==1)return false;var i=BX.findParent(r[0],{tag:"TR"},t);if(r[0].cellIndex<i.cells.length-1){r.push(i.cells[r[0].cellIndex+1])}return N(e,t,r)}function v(e,t){var n=a(e,t);if(!n||n.length!==1)return false;var o=r(t),l=i(n[0],o),s,d,f=l[l.length-1].r,c=true,u;for(s=0;s<l.length;s++){if(l[s].r==f){if(o[f+1]&&o[f+1][l[s].c]){u=o[f+1][l[s].c];if(d===undefined)d=u;else if(d!==u)c=false}else{c=false}}}if(c){n.push(d);return N(e,t,n)}}function B(e,t){var r=a(e,t);if(!r||r.length!==1)return false;var i,n=[],o=r[0].parentNode;for(i=0;i<o.cells.length;i++){n.push(o.cells[i])}return N(e,t,n)}function b(e,t){var l=a(e,t);if(!l||l.length!==1)return false;var s,d,f=[],c=r(t),u=n(i(l[0],c));for(s=0;s<c.length;s++){for(d=u.minCol;d<=u.minCol;d++){f=o(f,c[s][d],t)}}return N(e,t,f)}function C(e,r){var i=a(e,r);if(!i||i.length!=1)return false;var n,o,l=0,s,d,f,c=i[0].colSpan,u=i[0].rowSpan,m=i[0].parentNode;for(n=0;n<=i[0].cellIndex;n++)l+=m.cells[n].colSpan;if(c>1){i[0].colSpan--}else{for(o=0;o<r.rows.length;o++){if(o==m.rowIndex||o>=m.rowIndex&&o<m.rowIndex+u)continue;s=0;d=r.rows[o];n=0;while(s<l&&n<d.cells.length)s+=d.cells[n++].colSpan;n--;d.cells[n].colSpan+=1;if(d.cells[n].rowSpan>1)o=o+d.cells[n].rowSpan-1}}f=m.insertCell(i[0].cellIndex+1);f.rowSpan=i[0].rowSpan;f.innerHTML=t}function x(e,n){var o=a(e,n);if(!o||o.length!=1)return false;var l,s,d,f,c,u,m,h,g=r(n),N=i(o[0],g),p=o[0].parentNode,v=p.rowIndex,B=o[0].cellIndex,b=N[0].r,C=N[0].c,x=true,I=true;for(l=1;l<N.length;l++){if(N[l].r!=b)I=false;if(N[l].c!=C)x=false}if(I){var S=n.insertRow(p.rowIndex+1),y=S.insertCell(-1);y.innerHTML=t;if(!x)y.colSpan=o[0].colSpan;for(s=0;s<=b;s++){f=n.rows[s];for(d=0;d<f.cells.length;d++){c=f.cells[d];if(s==v&&d==B)continue;m=s;if(c.rowSpan>1)m+=c.rowSpan-1;if(m>=b)c.rowSpan++}}}else{f=n.rows[v+--o[0].rowSpan];h=false;for(d=0;d<f.cells.length;d++){u=i(f.cells[d],g);for(l=0;l<u.length;l++){if(u[l].c>B)h=0;else if(u[l].c+1==B)h=f.cells[d].cellIndex+1;if(h!==false)break}}y=f.insertCell(h);y.innerHTML=t;if(!x)y.colSpan=o[0].colSpan}}function I(e,t){var n=a(e,t);if(!n||n.length!=1)return false;var o=n[0];if(!o)return false;var l,s,d=r(t),f=i(o,d),c;for(c=0;c<d.length;c++){s=d[c][f[0].c];if(s&&s.parentNode){l=s.parentNode;BX.remove(s);if(l.cells.length==0)BX.remove(l)}}if(t.rows.length==0)BX.remove(t)}function S(e,t){var r=a(e,t);if(!r||r.length!=1)return false;var i=r[0];if(!i)return false;BX.remove(i.parentNode);if(t.rows.length==0)BX.remove(t)}function y(e,t,r){if(!r){var i=a(e,t);if(!i||i.length!=1)return false;r=i[0]}if(!r)return false;var n=r.parentNode;BX.remove(r);if(n.cells.length==0)BX.remove(n);if(t.rows.length==0)BX.remove(t)}function T(e,t){var r=a(e,t);if(!r||r.length==1)return false;var i,n;for(i=0;i<r.length;i++){n=r[i].parentNode;BX.remove(r[i]);if(n.cells.length==0)BX.remove(n)}if(t.rows.length==0)BX.remove(t)}return{exec:function(e,t){var r=t.range.commonAncestorContainer;switch(t.actionType){case"insertColumnLeft":case"insertColumnRight":s(r,t.tableNode,t.actionType);break;case"insertRowUpper":case"insertRowLower":d(r,t.tableNode,t.actionType);break;case"insertCellLeft":case"insertCellRight":f(r,t.tableNode,t.actionType);break;case"removeColumn":I(t.range,t.tableNode);break;case"removeRow":S(t.range,t.tableNode);break;case"removeCell":y(t.range,t.tableNode);break;case"removeSelectedCells":T(t.range,t.tableNode);break;case"mergeSelectedCells":N(t.range,t.tableNode);break;case"mergeRightCell":p(t.range,t.tableNode);break;case"mergeBottomCell":v(t.range,t.tableNode);break;case"mergeRow":B(t.range,t.tableNode);break;case"mergeColumn":b(t.range,t.tableNode);break;case"splitHorizontally":C(t.range,t.tableNode);break;case"splitVertically":x(t.range,t.tableNode);break}},state:BX.DoNothing,value:BX.DoNothing,getSelectedCells:a,canBeMerged:m,canBeMergedWithRight:h,canBeMergedWithBottom:g}},GetFormatBbCode:function(){var e=this;return{view:"textarea",exec:function(t,r){var i=r.value,n=r.tag.toUpperCase(),o=n;if(n=="FONT"||n=="COLOR"||n=="SIZE"){n+="="+i}if(r.singleTag===true)e.editor.textareaView.WrapWith("[","]",n);else e.editor.textareaView.WrapWith("["+n+"]","[/"+o+"]")},state:BX.DoNothing,value:BX.DoNothing}}};window.BXEditorActions=e})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:64:"/bitrix/js/fileman/html_editor/html-views.min.js?159569187833881";s:6:"source";s:44:"/bitrix/js/fileman/html_editor/html-views.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(){function e(e,t,i){this.editor=e;this.element=t;this.container=i;this.config=e.config||{};this.isShown=null;this.bbCode=e.bbCode;BX.addCustomEvent(this.editor,"OnClickBefore",BX.proxy(this.OnClick,this))}e.prototype={Focus:function(){if(!document.querySelector||this.element.ownerDocument.querySelector(":focus")===this.element)return;try{this.element.focus()}catch(e){}},Hide:function(){this.isShown=false;this.container.style.display="none"},Show:function(){this.isShown=true;this.container.style.display=""},Disable:function(){this.element.setAttribute("disabled","disabled")},Enable:function(){this.element.removeAttribute("disabled")},OnClick:function(e){},IsShown:function(){return!!this.isShown}};function t(e,t,o){i.superclass.constructor.apply(this,arguments);this.name="textarea";this.InitEventHandlers();if(!this.element.value&&this.editor.config.content)this.SetValue(this.editor.config.content,false)}BX.extend(t,e);t.prototype.Clear=function(){this.element.value=""};t.prototype.GetValue=function(e){var t=this.IsEmpty()?"":this.element.value;if(e){t=this.parent.parse(t)}return t};t.prototype.SetValue=function(e,t,i){if(t){e=this.editor.Parse(e,true,i)}this.editor.dom.pValueInput.value=this.element.value=e};t.prototype.SaveValue=function(){if(this.editor.inited){this.editor.dom.pValueInput.value=this.element.value}};t.prototype.HasPlaceholderSet=function(){var e=this.element.getAttribute("placeholder")||null,t=this.element.value;return!t||t===e};t.prototype.IsEmpty=function(){var e=BX.util.trim(this.element.value);return e===""||this.HasPlaceholderSet()};t.prototype.InitEventHandlers=function(){var e=this;BX.bind(this.element,"focus",function(){e.editor.On("OnTextareaFocus");e.isFocused=true});BX.bind(this.element,"blur",function(){e.editor.On("OnTextareaBlur");e.isFocused=false});BX.bind(this.element,"keydown",function(t){e.editor.textareaKeyDownPreventDefault=false;if((t.ctrlKey||t.metaKey)&&!t.altKey&&t.keyCode===e.editor.KEY_CODES["enter"]){e.editor.On("OnCtrlEnter",[t,e.editor.GetViewMode()]);return BX.PreventDefault(t)}e.editor.On("OnTextareaKeydown",[t]);if(e.editor.textareaKeyDownPreventDefault)return BX.PreventDefault(t)});BX.bind(this.element,"keyup",function(t){e.editor.On("OnTextareaKeyup",[t])})};t.prototype.IsFocused=function(){return this.isFocused};t.prototype.ScrollToSelectedText=function(e){};t.prototype.SelectText=function(e){var t=this.element.value,i=t.indexOf(e);if(i!=-1){this.element.focus();this.element.setSelectionRange(i,i+e.length)}};t.prototype.GetTextSelection=function(){var e=false;if(this.element.selectionStart!=undefined){e=this.element.value.substr(this.element.selectionStart,this.element.selectionEnd-this.element.selectionStart)}else if(document.selection&&document.selection.createRange){e=document.selection.createRange().text}else if(window.getSelection){e=window.getSelection();e=e.toString()}return e};t.prototype.WrapWith=function(e,t,i){if(!e)e="";if(!t)t="";if(!i)i="";if(e.length<=0&&t.length<=0&&i.length<=0)return true;var o=!!i,n=this.GetTextSelection(),r=n?"select":o?"after":"in";if(o){i=e+i+t}else if(n){i=e+n+t}else{i=e+t}if(this.element.selectionStart!=undefined){var s=this.element.scrollTop,a=this.element.selectionStart,l=this.element.selectionEnd;this.element.value=this.element.value.substr(0,a)+i+this.element.value.substr(l);if(r=="select"){this.element.selectionStart=a;this.element.selectionEnd=a+i.length}else if(r=="in"){this.element.selectionStart=this.element.selectionEnd=a+e.length}else{this.element.selectionStart=this.element.selectionEnd=a+i.length}this.element.scrollTop=s}else if(document.selection&&document.selection.createRange){var d=document.selection.createRange();var u=d.duplicate();i=i.replace(/\r?\n/g,"\n");d.text=i;d.setEndPoint("StartToStart",u);d.setEndPoint("EndToEnd",u);if(r=="select"){d.collapse(true);i=i.replace(/\r\n/g,"1");d.moveEnd("character",i.length)}else if(r=="in"){d.collapse(false);d.moveEnd("character",e.length);d.collapse(false)}else{d.collapse(false);d.moveEnd("character",i.length);d.collapse(false)}d.select()}else{this.element.value+=i}return true};t.prototype.GetCursorPosition=function(){return this.element.selectionStart};function i(e,t,o){i.superclass.constructor.apply(this,arguments);this.name="wysiwyg";this.caretNode="<br>"}BX.extend(i,e);i.prototype.OnCreateIframe=function(){this.document=this.editor.sandbox.GetDocument();this.element=this.document.body;this.editor.document=this.document;this.textarea=this.editor.dom.textarea;this.isFocused=false;this.InitEventHandlers();window.rangy.init();this.Enable()};i.prototype.Clear=function(){this.element.innerHTML=this.caretNode};i.prototype.GetValue=function(e,t){this.iframeValue=this.IsEmpty()?"":this.editor.GetInnerHtml(this.element);this.editor.On("OnIframeBeforeGetValue",[this.iframeValue]);if(e){this.iframeValue=this.editor.Parse(this.iframeValue,false,t)}return this.iframeValue};i.prototype.SetValue=function(e,t){if(t){e=this.editor.Parse(e)}this.element.innerHTML=e;this.CheckContentLastChild(this.element);this.editor.On("OnIframeSetValue",[e])};i.prototype.Show=function(){this.isShown=true;this.container.style.display="";this.ReInit()};i.prototype.ReInit=function(){this.Disable();this.Enable();this.editor.On("OnIframeReInit")};i.prototype.Hide=function(){this.isShown=false;this.container.style.display="none"};i.prototype.Disable=function(){this.element.removeAttribute("contentEditable")};i.prototype.Enable=function(){this.element.setAttribute("contentEditable","true")};i.prototype.Focus=function(e){if(BX.browser.IsIE()&&this.HasPlaceholderSet()){this.Clear()}if(!document.querySelector||this.element.ownerDocument.querySelector(":focus")!==this.element||!this.IsFocused()){if(BX.browser.IsIOS()){var t=this;if(this.focusTimeout)clearTimeout(this.focusTimeout);this.focusTimeout=setTimeout(function(){var e=document.documentElement.scrollTop||document.body.scrollTop,i=document.documentElement.scrollLeft||document.body.scrollLeft;BX.focus(t.element);window.scrollTo(i,e)},200)}else{BX.focus(this.element)}}if(e&&this.element.lastChild){if(this.element.lastChild.nodeName==="BR"){this.editor.selection.SetBefore(this.element.lastChild)}else{this.editor.selection.SetAfter(this.element.lastChild)}}};i.prototype.SetFocusedFlag=function(e){this.isFocused=e};i.prototype.IsFocused=function(){return this.isFocused};i.prototype.GetTextContent=function(e){var t=this.editor.util.GetTextContent(this.element);return e===true?t.replace(/\uFEFF/gi,""):t};i.prototype.HasPlaceholderSet=function(){return this.textarea&&this.GetTextContent()==this.textarea.getAttribute("placeholder")};i.prototype.IsEmpty=function(e){if(!document.querySelector)return false;var t=this.element.innerHTML,i="blockquote, ul, ol, img, embed, object, table, iframe, svg, video, audio, button, input, select, textarea";return t===""||t===this.caretNode||this.HasPlaceholderSet()||this.GetTextContent(e)===""&&!this.element.querySelector(i)};i.prototype._initObjectResizing=function(){var e=["width","height"],t=e.length,i=this.element;this.commands.exec("enableObjectResizing",this.config.allowObjectResizing);if(this.config.allowObjectResizing){if(browser.supportsEvent("resizeend")){dom.observe(i,"resizeend",function(o){var n=o.target||o.srcElement,r=n.style,s=0,a;for(;s<t;s++){a=e[s];if(r[a]){n.setAttribute(a,parseInt(r[a],10));r[a]=""}}redraw(i)})}}else{if(browser.supportsEvent("resizestart")){dom.observe(i,"resizestart",function(e){e.preventDefault()})}}};var o=function(e){if(e.setActive){try{e.setActive()}catch(e){}}else{var t=e.style,i=doc.documentElement.scrollTop||doc.body.scrollTop,o=doc.documentElement.scrollLeft||doc.body.scrollLeft,n={position:t.position,top:t.top,left:t.left,WebkitUserSelect:t.WebkitUserSelect};dom.setStyles({position:"absolute",top:"-99999px",left:"-99999px",WebkitUserSelect:"none"}).on(e);e.focus();dom.setStyles(n).on(e);if(win.scrollTo){win.scrollTo(o,i)}}};i.prototype.InitEventHandlers=function(){var e=this,t=this.editor,i=this.GetValue(),o=this.element,n=this.editor.sandbox.GetWindow(),r=!BX.browser.IsOpera()?o:this.editor.sandbox.GetWindow();if(this._eventsInitedObject&&this._eventsInitedObject===r)return;this._eventsInitedObject=r;BX.bind(r,"focus",function(){t.On("OnIframeFocus");e.isFocused=true;if(i!==e.GetValue())BX.onCustomEvent(t,"OnIframeChange")});BX.bind(r,"blur",function(){t.On("OnIframeBlur");e.isFocused=false;setTimeout(function(){i=e.GetValue()},0)});BX.bind(r,"contextmenu",function(i){if(i&&!i.ctrlKey&&!i.shiftKey&&BX.getEventButton(i)&BX.MSRIGHT){t.On("OnIframeContextMenu",[i,i.target||i.srcElement,e.contMenuRangeCollapsed])}});BX.bind(r,"mousedown",function(i){var o=t.selection.GetRange(),n=i.target||i.srcElement,r=t.GetBxTag(n);e.contMenuRangeCollapsed=o&&o.collapsed;if(t.synchro.IsSyncOn()){t.synchro.StopSync()}if(BX.browser.IsIE10()||BX.browser.IsIE11()){t.phpParser.RedrawSurrogates()}if(n.nodeName=="BODY"||!t.phpParser.CheckParentSurrogate(n)){setTimeout(function(){o=t.selection.GetRange();if(o&&o.collapsed&&o.startContainer&&o.startContainer==o.endContainer){var e=t.phpParser.CheckParentSurrogate(o.startContainer);if(e){t.selection.SetInvisibleTextAfterNode(e);t.selection.SetInvisibleTextBeforeNode(e)}}},10)}t.action.actions.quote.checkSpaceAfterQuotes(n);t.selection.SaveRange(false);setTimeout(function(){t.selection.SaveRange(false)},10);t.On("OnIframeMouseDown",[i,n,r])});BX.bind(r,"touchend",function(){e.Focus()});BX.bind(r,"touchstart",function(){e.Focus()});BX.bind(r,"click",function(e){var i=e.target||e.srcElement;t.On("OnIframeClick",[e,i])});BX.bind(r,"dblclick",function(e){var i=e.target||e.srcElement;t.On("OnIframeDblClick",[e,i])});BX.bind(r,"mouseup",function(e){var i=e.target||e.srcElement;if(!t.synchro.IsSyncOn()){t.synchro.StartSync()}t.On("OnIframeMouseUp",[e,i])});BX.bind(o,"dragover",function(){t.On("OnIframeDragOver",arguments)});BX.bind(o,"dragenter",function(){t.On("OnIframeDragEnter",arguments)});BX.bind(o,"dragleave",function(){t.On("OnIframeDragLeave",arguments)});BX.bind(o,"dragexit",function(){t.On("OnIframeDragExit",arguments)});BX.bind(o,"drop",function(){t.On("OnIframeDrop",arguments)});if(BX.browser.IsFirefox()){BX.bind(o,"dragover",function(e){e.preventDefault()});BX.bind(o,"dragenter",function(e){e.preventDefault()})}BX.bind(o,"drop",BX.delegate(this.OnPasteHandler,this));BX.bind(o,"paste",BX.delegate(this.OnPasteHandler,this));BX.bind(o,"keyup",function(i){var o=i.keyCode,n=t.selection.GetSelectedNode(true);e.SetFocusedFlag(true);if(o===t.KEY_CODES["space"]||o===t.KEY_CODES["enter"]){if(o===t.KEY_CODES["enter"]){e.OnEnterHandlerKeyUp(i,o,n)}t.On("OnIframeNewWord")}else{e.OnKeyUpArrowsHandler(i,o)}t.selection.SaveRange();t.On("OnIframeKeyup",[i,o,n]);if(o===t.KEY_CODES["backspace"]&&BX.browser.IsChrome()&&n&&n.nodeType=="3"&&n.nextSibling&&n.nextSibling.nodeType=="3"){e.editor.selection.ExecuteAndRestoreSimple(function(){e.editor.util.SetTextContent(n,e.editor.util.GetTextContent(n)+e.editor.util.GetTextContent(n.nextSibling));n.nextSibling.parentNode.removeChild(n.nextSibling)})}if(!t.util.FirstLetterSupported()&&e.editor.parser.firstNodeCheck){e.editor.parser.FirstLetterCheckNodes("","",true)}if(BX.browser.IsChrome()){if(e.stopBugusScrollTimeout)clearTimeout(e.stopBugusScrollTimeout);e.stopBugusScrollTimeout=setTimeout(function(){e.stopBugusScroll=false},200)}});BX.bind(o,"mousedown",function(i){var o=i.target||i.srcElement;if(!t.util.CheckImageSelectSupport()&&o.nodeName==="IMG"){t.selection.SelectNode(o)}if(!t.util.CheckPreCursorSupport()&&o.nodeName==="PRE"){var n=t.selection.GetSelectedNode(true);if(n&&n!=o){e.FocusPreElement(o,true)}}});BX.bind(o,"keydown",BX.proxy(this.KeyDown,this));if(BX.browser.IsChrome()){BX.bind(window,"scroll",BX.proxy(function(t){if(e.stopBugusScroll){if((!e.savedScroll||!e.savedScroll.scrollTop)&&e.lastSavedScroll)e.savedScroll=e.lastSavedScroll;if(e.savedScroll&&!e.lastSavedScroll)e.lastSavedScroll=e.savedScroll;e._RestoreScrollTop()}},this))}var s={IMG:BX.message.SrcTitle+": ",A:BX.message.UrlTitle+": "};BX.bind(o,"mouseover",function(e){var t=e.target||e.srcElement,i=t.getAttribute("href")||t.getAttribute("src"),o=t.nodeName;if(s[o]&&!t.hasAttribute("title")&&i&&i.indexOf("data:image/")===-1){t.setAttribute("title",s[o]+i);t.setAttribute("data-bx-clean-attribute","title")}});this.editor.InitClipboardHandler()};i.prototype.KeyDown=function(e){var t=this,i=e.keyCode,o=this.editor.KEY_CODES;this.SetFocusedFlag(true);this.editor.iframeKeyDownPreventDefault=false;if(BX.browser.IsChrome()){this.stopBugusScroll=true;this.savedScroll=BX.GetWindowScrollPos(document)}var n=this.editor.SHORTCUTS[i],r=this.editor.selection.GetSelectedNode(true),s=this.editor.selection.GetRange(),a=this.document.body,l;if((BX.browser.IsIE()||BX.browser.IsIE10()||BX.browser.IsIE11())&&!BX.util.in_array(i,[16,17,18,20,65,144,37,38,39,40])){if(r&&r.nodeName=="BODY"||s.startContainer&&s.startContainer.nodeName=="BODY"||s.startContainer==a.firstChild&&s.endContainer==a.lastChild&&s.startOffset==0&&s.endOffset==a.lastChild.length){BX.addCustomEvent(this.editor,"OnIframeKeyup",BX.proxy(this._IEBodyClearHandler,this))}}if((BX.browser.IsIE()||BX.browser.IsIE10()||BX.browser.IsIE11())&&i==o["backspace"]){BX.addCustomEvent(this.editor,"OnIframeKeyup",BX.proxy(this._IEBodyClearHandlerEx,this))}this.isUserTyping=true;if(this.typingTimeout){this.typingTimeout=clearTimeout(this.typingTimeout)}this.typingTimeout=setTimeout(function(){t.isUserTyping=false},1e3);this.editor.synchro.StartSync(200);this.editor.On("OnIframeKeydown",[e,i,n,r]);if(this.editor.iframeKeyDownPreventDefault)return BX.PreventDefault(e);if((e.ctrlKey||e.metaKey)&&!e.altKey&&n){this.editor.action.Exec(n);return BX.PreventDefault(e)}if(i===o["backspace"]&&s.startOffset==0&&s.startContainer.nodeType==3&&s.startContainer.parentNode.firstChild==s.startContainer&&s.startContainer.parentNode&&s.startContainer.parentNode.nodeName=="BLOCKQUOTE"&&s.startContainer.parentNode.className){s.startContainer.parentNode.className=""}if(i===o["delete"]&&s.collapsed&&s.endContainer.nodeType==3&&s.endOffset==s.endContainer.length){var d=this.editor.util.GetNextNotEmptySibling(s.endContainer);if(d){if(d.nodeName=="BR"){d=this.editor.util.GetNextNotEmptySibling(d)}if(d&&d.nodeName=="BLOCKQUOTE"&&d.className){d.className=""}}}if(r&&r.nodeName==="IMG"&&(i===o["backspace"]||i===o["delete"])){l=r.parentNode;l.removeChild(r);if(l.nodeName==="A"&&!l.firstChild){l.parentNode.removeChild(l)}setTimeout(function(){t.editor.util.Refresh(t.element)},0);BX.PreventDefault(e)}if(s.collapsed&&this.OnKeyDownArrowsHandler(e,i,s)===false){return false}if((e.ctrlKey||e.metaKey)&&!e.altKey&&i===o["enter"]){if(this.IsFocused())this.editor.On("OnIframeBlur");this.editor.On("OnCtrlEnter",[e,this.editor.GetViewMode()]);return BX.PreventDefault(e)}if(BX.browser.IsFirefox()&&r&&(i===o["delete"]||i===o["backspace"])){var u=r.nodeName=="LI"?r:BX.findParent(r,{tag:"LI"},a);if(u&&u.firstChild&&u.firstChild.nodeName=="I"){var c=BX.findParent(u,{tag:"UL"},a);if(c){var f=this.editor.action.actions.insertUnorderedList.getCustomBullitClass(c);if(f){setTimeout(function(){if(c&&u&&u.innerHTML!==""){t.editor.action.actions.insertUnorderedList.checkCustomBullitList(c,f)}},0)}}}}if(!this.editor.util.FirstLetterSupported()&&t.editor.parser.firstNodeCheck&&i===this.editor.KEY_CODES["backspace"]){t.editor.parser.FirstLetterBackspaceHandler(s)}if(!e.shiftKey&&(i===o["enter"]||i===o["backspace"])){return this.OnEnterHandler(e,i,r,s)}if(i===o["pageUp"]||i===o["pageDown"]){this.savedScroll=BX.GetWindowScrollPos(document);BX.addCustomEvent(this.editor,"OnIframeKeyup",BX.proxy(this._RestoreScrollTop,this));setTimeout(BX.proxy(this._RestoreScrollTop,this),0)}};i.prototype._RestoreScrollTop=function(e){if(this.savedScroll){window.scrollTo(this.savedScroll.scrollLeft,this.savedScroll.scrollTop);this.savedScroll=null}BX.removeCustomEvent(this.editor,"OnIframeKeyup",BX.proxy(this._RestoreScrollTop,this))};i.prototype._IEBodyClearHandler=function(e){var t=this.document.body.firstChild;if(e.keyCode==this.editor.KEY_CODES["enter"]&&t.nodeName=="P"&&t!=this.document.body.lastChild){if(t.innerHTML&&t.innerHTML.toLowerCase()=="<br>"){var i=t.nextSibling;this.editor.util.ReplaceWithOwnChildren(t);t=i}}if(t&&t.nodeName=="P"&&t==this.document.body.lastChild){this.editor.util.ReplaceWithOwnChildren(t)}BX.removeCustomEvent(this.editor,"OnIframeKeyup",BX.proxy(this._IEBodyClearHandler,this))};i.prototype._IEBodyClearHandlerEx=function(e){var t=this.document.body.firstChild;if(e.keyCode==this.editor.KEY_CODES["backspace"]&&t&&t.nodeName=="P"&&t==this.document.body.lastChild&&(this.editor.util.IsEmptyNode(t,true,true)||t.innerHTML&&t.innerHTML.toLowerCase()=="<br>")){this.editor.util.ReplaceWithOwnChildren(t)}BX.removeCustomEvent(this.editor,"OnIframeKeyup",BX.proxy(this._IEBodyClearHandlerEx,this))};i.prototype.OnEnterHandler=function(e,t,i,o){if(BX.browser.IsChrome()){this.document.body.style.minHeight=parseInt(this.document.body.style.minHeight)+1+"px";this.document.body.style.minHeight=parseInt(this.document.body.style.minHeight)-1+"px"}if(!i){return}var n=this;function r(e){if(e){if(e.nodeName!=="P"&&e.nodeName!=="DIV"){e=BX.findParent(e,function(e){return e.nodeName==="P"||e.nodeName==="DIV"},n.document.body)}var t=n.editor.util.GetInvisibleTextNode();if(e){e.parentNode.insertBefore(t,e);n.editor.util.ReplaceWithOwnChildren(e);n.editor.selection.SelectNode(t)}}}var s,a,l,d=["LI","P","H1","H2","H3","H4","H5","H6"],u=["UL","OL","MENU"];if(BX.util.in_array(i.nodeName,d)){l=i}else{l=BX.findParent(i,function(e){return BX.util.in_array(e.nodeName,d)},this.document.body)}if(l){if(l.nodeName==="LI"){if(t===n.editor.KEY_CODES["enter"]&&l&&l.parentNode){var c=n.editor.action.actions.insertUnorderedList.getCustomBullitClass(l.parentNode)}setTimeout(function(){var e=n.editor.selection.GetSelectedNode(true);if(e){s=BX.findParent(e,function(e){return BX.util.in_array(e.nodeName,u)},n.document.body);if(t===n.editor.KEY_CODES["enter"]&&l&&l.parentNode){n.editor.action.actions.insertUnorderedList.checkCustomBullitList(l.parentNode,c,true)}if(s&&BX.browser.IsChrome()&&t===n.editor.KEY_CODES["enter"]){var i,o=s.getElementsByTagName("LI");for(i=0;i<o.length;i++){o[i].innerHTML=o[i].innerHTML.replace(/\uFEFF/gi,"")}}if(!s){r(e)}}},0)}else if(l.nodeName.match(/H[1-6]/)&&t===this.editor.KEY_CODES["enter"]){setTimeout(function(){r(n.editor.selection.GetSelectedNode())},0)}return true}if(t===this.editor.KEY_CODES["enter"]&&!BX.browser.IsFirefox()&&this.editor.action.IsSupported("insertLineBreak")){if(BX.browser.IsIE10()||BX.browser.IsIE11()){this.editor.action.Exec("insertHTML","<br>"+this.editor.INVISIBLE_SPACE)}else if(BX.browser.IsChrome()){this.editor.action.Exec("insertLineBreak");if(BX.browser.IsMac()){var f="bx-editor-temp-"+Math.round(Math.random()*1e6);this.editor.action.Exec("insertHTML",'<span id="'+f+'">'+this.editor.INVISIBLE_SPACE+"</span>");var h=this.editor.GetIframeElement(f);if(h)BX.remove(h)}else{this.editor.action.Exec("insertHTML",this.editor.INVISIBLE_SPACE)}}else{this.editor.action.Exec("insertLineBreak")}return BX.PreventDefault(e)}if((BX.browser.IsChrome()||BX.browser.IsIE10()||BX.browser.IsIE11())&&t==this.editor.KEY_CODES["backspace"]&&o.collapsed){var m=BX.create("SPAN",false,this.document);this.editor.selection.InsertNode(m);var p=m.previousSibling;if(p&&p.nodeType==3&&this.editor.util.IsEmptyNode(p,false,false)){BX.remove(p)}this.editor.selection.SetBefore(m);BX.remove(m)}};i.prototype.OnEnterHandlerKeyUp=function(e,t,i){if(i){var o=this;if(!BX.util.in_array(i.nodeName,this.editor.GetBlockTags())){i=BX.findParent(i,function(e){return BX.util.in_array(e.nodeName,o.editor.GetBlockTags())},this.document.body)}if(i&&BX.util.in_array(i.nodeName,this.editor.GetBlockTags())){var n=BX.util.trim(i.innerHTML).toLowerCase();if(this.editor.util.IsEmptyNode(i,true,true)||n==""||n=="<br>"){i.removeAttribute("class")}}}};i.prototype.OnKeyDownArrowsHandler=function(e,t,i){var o,n,r,s,a=this.editor.KEY_CODES;this.keyDownRange=i;if(t===a["right"]||t===a["down"]){o=i.endContainer;r=o?o.nextSibling:false;n=o?o.parentNode:false;if(o.nodeType==3&&o.length==i.endOffset&&n&&n.nodeName!=="BODY"&&(!r||r&&r.nodeName=="BR"&&!r.nextSibling)&&(this.editor.util.IsBlockElement(n)||this.editor.util.IsBlockNode(n))){this.editor.selection.SetInvisibleTextAfterNode(n,true);return BX.PreventDefault(e)}else if(o.nodeType==3&&this.editor.util.IsEmptyNode(o)&&r&&(this.editor.util.IsBlockElement(r)||this.editor.util.IsBlockNode(r))){BX.remove(o);if(r.firstChild){this.editor.selection.SetBefore(r.firstChild)}else{this.editor.selection.SetAfter(r)}return BX.PreventDefault(e)}else if(o.nodeType==3&&o.length==i.endOffset&&n&&n.nodeName!=="BODY"&&r&&r.nodeName=="BR"&&!r.nextSibling&&(this.editor.util.IsBlockElement(n)||this.editor.util.IsBlockNode(n))){this.editor.selection.SetInvisibleTextAfterNode(n,true);return BX.PreventDefault(e)}}else if(t===a["left"]||t===a["up"]){o=i.startContainer;n=o?o.parentNode:false;s=o?o.previousSibling:false;if(o.nodeType==3&&i.endOffset===0&&n&&n.nodeName!=="BODY"&&!s&&(this.editor.util.IsBlockElement(n)||this.editor.util.IsBlockNode(n))){this.editor.selection.SetInvisibleTextBeforeNode(n);return BX.PreventDefault(e)}else if(o.nodeType==3&&this.editor.util.IsEmptyNode(o)&&s&&(this.editor.util.IsBlockElement(s)||this.editor.util.IsBlockNode(s))){BX.remove(o);if(s.lastChild){this.editor.selection.SetAfter(s.lastChild)}else{this.editor.selection.SetBefore(s)}return BX.PreventDefault(e)}}return true};i.prototype.OnKeyUpArrowsHandler=function(e,t){var i=this,o,n,r,s,a,l=this.editor.selection.GetRange(),d,u,c,f,h,m,p,y,S,v,B,C=this.editor.KEY_CODES;if(t===C["right"]||t===C["down"]){this.editor.selection.GetStructuralTags();if(l.collapsed){d=l.endContainer;h=this.editor.util.IsEmptyNode(d);p=this.editor.selection.CheckLastRange(l);c=d.nextSibling;if(!this.editor.util.CheckPreCursorSupport()){if(d.nodeName==="PRE"){o=d}else if(d.nodeType==3){o=BX.findParent(d,{tag:"PRE"},this.element)}if(o){if(this.keyDownRange){s=this.keyDownRange.endContainer;a=s==o?o:BX.findParent(s,function(e){return e==o},this.element)}i.FocusPreElement(o,false,a?null:"start")}}if(d.nodeType==3&&h&&c){d=c;h=this.editor.util.IsEmptyNode(d)}m=this.editor.util.CheckSurrogateNode(d);if(m){r=d.nextSibling;if(r&&r.nodeType==3&&this.editor.util.IsEmptyNode(r))this.editor.selection._MoveCursorAfterNode(r);else this.editor.selection._MoveCursorAfterNode(d);BX.PreventDefault(e)}else if(d.nodeType==1&&d.nodeName!="BODY"&&!h){if(p){this.editor.selection._MoveCursorAfterNode(d);BX.PreventDefault(e)}}else if(p&&d.nodeType==3&&!h){u=d.parentNode;if(u&&d===u.lastChild&&u.nodeName!="BODY"){this.editor.selection._MoveCursorAfterNode(u)}}else if(d.nodeType==3&&d.parentNode){u=d.parentNode;f=u.previousSibling;if((this.editor.util.IsBlockElement(u)||this.editor.util.IsBlockNode(u))&&f&&f.nodeType==3&&this.editor.util.IsEmptyNode(f)){BX.remove(f)}}}else{y=l.startContainer;S=l.endContainer;v=this.editor.util.CheckSurrogateNode(y);B=this.editor.util.CheckSurrogateNode(S);if(v){n=y.previousSibling;if(n&&n.nodeType==3&&this.editor.util.IsEmptyNode(n))l.setStartBefore(n);else l.setStartBefore(y);this.editor.selection.SetSelection(l)}if(B){r=S.nextSibling;if(r&&r.nodeType==3&&this.editor.util.IsEmptyNode(r))l.setEndAfter(r);else l.setEndAfter(S);this.editor.selection.SetSelection(l)}}}else if(t===C["left"]||t===C["up"]){this.editor.selection.GetStructuralTags();if(l.collapsed){d=l.startContainer;h=this.editor.util.IsEmptyNode(d);p=this.editor.selection.CheckLastRange(l);if(d.nodeType==3&&h&&d.previousSibling){d=d.previousSibling;h=this.editor.util.IsEmptyNode(d)}if(!this.editor.util.CheckPreCursorSupport()){if(d.nodeName==="PRE"){o=d}else if(d.nodeType==3){o=BX.findParent(d,{tag:"PRE"},this.element)}if(o){if(this.keyDownRange){s=this.keyDownRange.startContainer;a=s==o?o:BX.findParent(s,function(e){return e==o},this.element)}i.FocusPreElement(o,false,a?null:"end")}}m=this.editor.util.CheckSurrogateNode(d);if(m){n=d.previousSibling;if(n&&n.nodeType==3&&this.editor.util.IsEmptyNode(n))this.editor.selection._MoveCursorBeforeNode(n);else this.editor.selection._MoveCursorBeforeNode(d);BX.PreventDefault(e)}else if(d.nodeType==1&&d.nodeName!="BODY"&&!h){if(p){this.editor.selection._MoveCursorBeforeNode(d);BX.PreventDefault(e)}}else if(p&&d.nodeType==3&&!h){u=d.parentNode;if(u&&d===u.firstChild&&u.nodeName!="BODY"){this.editor.selection._MoveCursorBeforeNode(u)}}else if(d.nodeType==3&&d.parentNode){u=d.parentNode;f=u.nextSibling;if((this.editor.util.IsBlockElement(u)||this.editor.util.IsBlockNode(u))&&f&&f.nodeType==3&&this.editor.util.IsEmptyNode(f)){BX.remove(f)}}}else{y=l.startContainer;S=l.endContainer;v=this.editor.util.CheckSurrogateNode(y);B=this.editor.util.CheckSurrogateNode(S);if(v){n=y.previousSibling;if(n&&n.nodeType==3&&this.editor.util.IsEmptyNode(n))l.setStartBefore(n);else l.setStartBefore(y);this.editor.selection.SetSelection(l)}if(B){r=S.nextSibling;if(r&&r.nodeType==3&&this.editor.util.IsEmptyNode(r))l.setEndAfter(r);else l.setEndAfter(S);this.SetSelection(l)}}}this.keyDownRange=null};i.prototype.FocusPreElement=function(e,t,i){var o=this;if(this._focusPreElementTimeout)this._focusPreElementTimeout=clearTimeout(this._focusPreElementTimeout);if(t){this._focusPreElementTimeout=setTimeout(function(){o.FocusPreElement(e,false,i)},100);return}BX.focus(e);if(i=="end"&&e.lastChild){this.editor.selection.SetAfter(e.lastChild)}else if(i=="start"&&e.firstChild){this.editor.selection.SetBefore(e.firstChild)}};i.prototype.OnPasteHandler=function(e){if(!this.editor.skipPasteHandler){this.editor.skipPasteHandler=true;this.editor.pasteNodeIndex={};var t=document.documentElement.scrollTop||document.body.scrollTop,i=document.documentElement.scrollLeft||document.body.scrollLeft,o=this,n=[],r,s,a,l;function d(e){if(e&&e.setAttribute){var t=Math.round(Math.random()*1e6);o.editor.pasteNodeIndex[t]=true;e.setAttribute("data-bx-paste-flag",t)}}r=this.document.body;if(r){l=r.querySelectorAll("*");for(s=0;s<l.length;s++){if(l[s].nodeType==1&&l[s].nodeName!="BODY"&&l[s].nodeName!="HEAD"){n.push(l[s])}}for(s=0;s<r.parentNode.childNodes.length;s++){a=r.parentNode.childNodes[s];if(a.nodeType==1&&a.nodeName!="BODY"&&a.nodeName!="HEAD"){n.push(a)}}}for(s=0;s<n.length;s++){d(n[s])}var u=this.editor.synchro.IsSyncOn();if(u){this.editor.synchro.StopSync()}if(this.editor.iframeView.pasteHandlerTimeout){clearTimeout(this.editor.iframeView.pasteHandlerTimeout)}this.pasteHandlerTimeout=setTimeout(function(){o.editor.SetCursorNode();o.editor.pasteHandleMode=true;o.editor.bbParseContentMode=true;o.editor.synchro.lastIframeValue=false;if(!o.editor.skipPasteControl){o.editor.pasteControl.SaveIframeContent(o.GetValue());o.editor.pasteControl.CheckAndShow()}o.editor.synchro.FromIframeToTextarea(true,true);o.editor.pasteHandleMode=false;o.editor.bbParseContentMode=false;o.editor.synchro.lastTextareaValue=false;o.editor.synchro.FromTextareaToIframe(true);o.editor.RestoreCursor();o.editor.On("OnIframePaste");o.editor.On("OnIframeNewWord");o.editor.skipPasteHandler=false;if(u){o.editor.synchro.StartSync()}if(window.scrollTo){window.scrollTo(i,t)}},10)}};i.prototype.InitAutoLinking=function(){var e=this,t=this.editor,i=t.action.IsSupportedByBrowser("autoUrlDetect"),o=BX.browser.IsIE()||BX.browser.IsIE9()||BX.browser.IsIE10();if(i)t.action.Exec("autoUrlDetect",false);if(t.config.autoLink===false)return;var n={CODE:1,PRE:1,A:1,SCRIPT:1,HEAD:1,TITLE:1,STYLE:1},r=/(((?:https?|ftp):\/\/|www\.)[^\s'"<]{3,500})/gi,s=/[\.a-z0-9_\-]+@[\.a-z0-9_\-]+\.[\.a-z0-9_\-]+/gi,a=100,l={")":"(","]":"[","}":"{"};this.editor.autolinkUrlRegExp=r;this.editor.autolinkEmailRegExp=s;function d(){try{if(u()){t.selection.ExecuteAndRestore(function(e,t){if(t&&t.parentNode)c(t.parentNode)})}}catch(e){}}function u(){var e,i,o=false,n=t.GetIframeDoc(),a=n.createTreeWalker(n.body,NodeFilter.SHOW_TEXT,null,false);while(e=a.nextNode()){i=e.nodeValue||"";if((i.match(s)||i.match(r))&&e.parentNode&&e.parentNode.nodeName!="A"){o=true;break}}return o}function c(e){if(e&&!n[e.nodeName]){var t=BX.findParent(e,function(e){return!!n[e.nodeName]},e.ownerDocument.body);if(t)return e;if(e===e.ownerDocument.documentElement)e=e.ownerDocument.body;return p(e)}}function f(t){t=BX.util.htmlspecialchars(t);return t.replace(r,function(t,i){var o=(i.match(/([^\w\u0430-\u0456\u0451\/\-#](,?))$/i)||[])[1]||"",n=l[o];i=i.replace(/([^\w\u0430-\u0456\u0451\/\-#](,?))$/i,"");if(i.split(n).length>i.split(o).length){i=i+o;o=""}var r=i,s=BX.util.htmlspecialchars(i);if(i.length>a)s=s.substr(0,a)+"...";if(r.substr(0,4)==="www.")r="http://"+r;BX.onCustomEvent(e.editor,"OnAfterUrlConvert",[r]);return'<a href="'+r+'">'+s+"</a>"+o})}function h(e){e=BX.util.htmlspecialchars(e);return e.replace(s,function(e){var t=(e.match(/([^\w\/\-](,?))$/i)||[])[1]||"",i=l[t];e=e.replace(/([^\w\/\-](,?))$/i,"");if(e.split(i).length>e.split(t).length){e=e+t;t=""}var o="mailto:"+e;return'<a href="'+o+'">'+e+"</a>"+t})}function m(e){var t=e._bx_autolink_temp_div;if(!t)t=e._bx_autolink_temp_div=e.createElement("div");return t}function p(e){var t,i,o;if(e&&!n[e.nodeName]){if(e.nodeType===3&&e.data.match(r)&&e.parentNode){i=e.parentNode;o=m(i.ownerDocument);o.innerHTML="<span></span>"+f(e.data);o.removeChild(o.firstChild);while(o.firstChild)i.insertBefore(o.firstChild,e);i.removeChild(e)}else if(e.nodeType===3&&e.data.match(s)&&e.parentNode){i=e.parentNode;o=m(i.ownerDocument);o.innerHTML="<span></span>"+h(e.data);o.removeChild(o.firstChild);while(o.firstChild)i.insertBefore(o.firstChild,e);i.removeChild(e)}else if(e.nodeType===1){var a=e.childNodes,l;for(l=0;l<a.length;l++)p(a[l]);t=e}}return t}if(!o||o&&i){BX.addCustomEvent(t,"OnIframeNewWord",function(){if(t.autolinkTimeout)t.autolinkTimeout=clearTimeout(t.autolinkTimeout);t.autolinkTimeout=setTimeout(d,500)});BX.addCustomEvent(t,"OnSubmit",function(){try{c(t.GetIframeDoc().body)}catch(e){}})}var y=t.sandbox.GetDocument().getElementsByTagName("a"),S=function(e){var i=BX.util.trim(t.util.GetTextContent(e));if(i.substr(0,4)==="www.")i="http://"+i;return i};BX.addCustomEvent(t,"OnIframeKeydown",function(e,t,i,o){if(y.length>0&&o){var n=BX.findParent(o,{tag:"A"},o.ownerDocument.body);if(n){var s=S(n);setTimeout(function(){var e=S(n);if(e===s)return;if(e.match(r))n.setAttribute("href",e)},0)}}})};i.prototype.IsUserTypingNow=function(e){return this.isFocused&&this.isShown&&this.isUserTyping};i.prototype.CheckContentLastChild=function(e){if(!e){e=this.element}var t=e.lastChild;if(t&&(this.editor.util.IsEmptyNode(t,true)&&this.editor.util.IsBlockNode(t.previousSibling)||this.editor.phpParser.IsSurrogate(t))){e.appendChild(BX.create("BR",{},e.ownerDocument));e.appendChild(this.editor.util.GetInvisibleTextNode())}};function n(e,t,i){this.INTERVAL=500;this.editor=e;this.textareaView=t;this.iframeView=i;this.lastFocused="wysiwyg";this.InitEventHandlers()}n.prototype={FromIframeToTextarea:function(e,t){var i;if(this.editor.bbCode){i=this.iframeView.GetValue(this.editor.bbParseContentMode,false);i=BX.util.trim(i);if(i!==this.lastIframeValue){var o=this.editor.bbParser.Unparse(i);this.textareaView.SetValue(o,false,t||this.editor.bbParseContentMode);if(typeof this.lastSavedIframeValue!=="undefined"&&this.lastSavedIframeValue!=i){this.editor.On("OnContentChanged",[o,i])}this.lastSavedIframeValue=i;this.lastIframeValue=i}}else{i=this.iframeView.GetValue();i=BX.util.trim(i);if(i!==this.lastIframeValue){this.textareaView.SetValue(i,true,t);if(typeof this.lastSavedIframeValue!=="undefined"&&this.lastSavedIframeValue!=i){this.editor.On("OnContentChanged",[this.textareaView.GetValue()||"",i||""])}this.lastSavedIframeValue=i;this.lastIframeValue=i}}},FromTextareaToIframe:function(e){var t=this.textareaView.GetValue();if(t!==this.lastTextareaValue){if(t){if(this.editor.bbCode){var i=this.editor.bbParser.Parse(t);i=i.replace(/\u2060/gi,'<span id="bx-cursor-node"> </span>');this.iframeView.SetValue(i,e)}else{t=t.replace(/\u2060/gi,'<span id="bx-cursor-node"> </span>');this.iframeView.SetValue(t,e)}}else{this.iframeView.Clear()}this.lastTextareaValue=t;this.editor.On("OnContentChanged",[t||"",this.iframeView.GetValue()||""])}},FullSyncFromIframe:function(){this.lastIframeValue=false;this.FromIframeToTextarea(true,true);this.lastTextareaValue=false;this.FromTextareaToIframe(true)},Sync:function(){var e=true;var t=this.editor.currentViewName;if(t==="split"){if(this.GetSplitMode()==="code"){this.FromTextareaToIframe(e)}else{this.FromIframeToTextarea(e)}}else if(t==="code"){this.FromTextareaToIframe(e)}else{this.FromIframeToTextarea(e)}},GetSplitMode:function(){var e=false;if(this.editor.currentViewName=="split"){if(this.editor.iframeView.IsFocused()){e="wysiwyg"}else if(this.editor.textareaView.IsFocused()){e="code"}else{e=this.lastFocused}}return e},InitEventHandlers:function(){var e=this;BX.addCustomEvent(this.editor,"OnTextareaFocus",function(){e.lastFocused="code";e.StartSync()});BX.addCustomEvent(this.editor,"OnIframeFocus",function(){e.lastFocused="wysiwyg";e.StartSync()});BX.addCustomEvent(this.editor,"OnTextareaBlur",BX.delegate(this.StopSync,this));BX.addCustomEvent(this.editor,"OnIframeBlur",BX.delegate(this.StopSync,this))},StartSync:function(e){var t=this;if(this.interval){this.interval=clearTimeout(this.interval)}this.delay=e||this.INTERVAL;function i(){t.delay=t.INTERVAL;t.Sync();t.interval=setTimeout(i,t.delay)}this.interval=setTimeout(i,t.delay)},StopSync:function(){if(this.interval){this.interval=clearTimeout(this.interval)}},IsSyncOn:function(){return!!this.interval},OnIframeMousedown:function(e,t,i){},IsFocusedOnTextarea:function(){return this.editor.currentViewName==="code"||this.editor.currentViewName==="split"&&this.GetSplitMode()==="code"}};window.BXEditorTextareaView=t;window.BXEditorIframeView=i;window.BXEditorViewsSynchro=n})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:65:"/bitrix/js/fileman/html_editor/html-parser.min.js?159569187756595";s:6:"source";s:45:"/bitrix/js/fileman/html_editor/html-parser.js";s:3:"min";s:49:"/bitrix/js/fileman/html_editor/html-parser.min.js";s:3:"map";s:49:"/bitrix/js/fileman/html_editor/html-parser.map.js";}"*/
(function(){function e(e){this.editor=e;this.specialParsers={};this.DEFAULT_NODE_NAME="span",this.WHITE_SPACE_REG_EXP=/\s+/,this.defaultRules={tags:{},classes:{}};this.convertedBxNodes=[];this.rules={};if(!this.editor.util.FirstLetterSupported()){this.firstNodeCheck=false;this.FIRST_LETTER_CLASS="bxe-first-letter";this.FIRST_LETTER_CLASS_CHROME="bxe-first-letter-chrome";this.FIRST_LETTER_SPAN="bxe-first-letter-s"}}e.prototype={Parse:function(e,t,r,i,s){if(!r){r=document}this.convertedBxNodes=[];this.firstNodeCheck=false;var a=r.createDocumentFragment(),n=this.GetAsDomElement(e,r),o,l,d;this.SetParseBxMode(s);this.pasteNodeIndexTmp=BX.clone(this.editor.pasteNodeIndex);while(n.firstChild){d=n.firstChild;n.removeChild(d);o=this.Convert(d,i,s,o);if(o){l=!s&&this.CheckBlockNode(o);if(BX.browser.IsFirefox()&&o.nodeName=="DIV"){l=false}a.appendChild(o);if(l){a.appendChild(this.editor.util.GetInvisibleTextNode())}}}n.innerHTML="";n.appendChild(a);e=this.RegexpContentParse(this.editor.GetInnerHtml(n),s);return e},SetParseBxMode:function(e){this.bParseBx=!!e},CodeParse:function(e){return e},GetAsDomElement:function(e,t){if(!t)t=document;var r=t.createElement("DIV");if(typeof e==="object"&&e.nodeType){r.appendChild(e)}else if(this.editor.util.CheckHTML5Support()){r.innerHTML=e}else if(this.editor.util.CheckHTML5FullSupport()){r.style.display="none";t.body.appendChild(r);try{r.innerHTML=e}catch(e){}t.body.removeChild(r)}return r},Convert:function(e,t,r,i){var s=false,a=e.nodeType,n=e.childNodes,o,l,d,u;if(a==1){if(e.nodeName=="IMG"){if(!e.getAttribute("data-bx-orig-src"))e.setAttribute("data-bx-orig-src",e.getAttribute("src"));else e.setAttribute("src",e.getAttribute("data-bx-orig-src"))}if(this.editor.pasteHandleMode&&(r||this.editor.bbParseContentMode)){if(e.id=="bx-cursor-node"){return e.ownerDocument.createTextNode(this.editor.INVISIBLE_CURSOR)}var f=e.getAttribute("data-bx-paste-flag");s=f!=="Y"&&!this.pasteNodeIndexTmp[f];if(e&&e.id){u=this.editor.GetBxTag(e.id);if(u.tag){s=false}}if(s){e=this.CleanNodeAfterPaste(e,i);if(!e){return null}n=e.childNodes;a=e.nodeType}e.removeAttribute("data-bx-paste-flag");if(this.pasteNodeIndexTmp[f])delete this.pasteNodeIndexTmp[f]}else{if(e.id=="bx-cursor-node"){return e.cloneNode(true)}}if(a==1){if(!e.__bxparsed){if(this.IsAnchor(e)&&!e.getAttribute("data-bx-replace_with_children")){o=e.cloneNode(true);o.innerHTML="";l=null;for(d=0;d<n.length;d++){l=this.Convert(n[d],t,r,l);if(l){o.appendChild(l)}}var h={};for(d=0;d<o.attributes.length;d++){if(o.attributes[d].name!=="name")h[o.attributes[d].name]=o.attributes[d].value}e=this.editor.phpParser.GetSurrogateNode("anchor",BX.message("BXEdAnchor")+": #"+o.name,null,{html:o.innerHTML,name:o.name,attributes:h})}else if(this.IsPrintBreak(e)){e=this.GetPrintBreakSurrogate(e)}if(e&&e.id){u=this.editor.GetBxTag(e.id);if(u.tag){e.__bxparsed=1;if(this.bParseBx){o=e.ownerDocument.createTextNode("~"+u.id+"~");this.convertedBxNodes.push(u)}else{o=e.cloneNode(true)}return o}}if(!o&&e.nodeType){o=this.ConvertElement(e,r)}}}}else if(a==3){o=this.HandleText(e)}if(!o){return null}for(d=0;d<n.length;d++){l=this.Convert(n[d],t,r);if(l){o.appendChild(l)}}if(o.nodeType==1){if(o.style&&BX.util.trim(o.style.cssText)==""&&o.removeAttribute){o.removeAttribute("style")}if(this.editor.config.cleanEmptySpans&&t&&o.childNodes.length<=1&&o.nodeName.toLowerCase()===this.DEFAULT_NODE_NAME&&!o.attributes.length){return o.firstChild}}return o},ConvertElement:function(e,t){var r,i,s,a,n,o=this.editor.GetParseRules().tags,l=e.nodeName.toLowerCase(),d=e.scopeName;if(e.__bxparsed){return null}e.__bxparsed=1;if(e.className==="bx-editor-temp"){return null}if(d&&d!="HTML"){l=d+":"+l}if("outerHTML"in e&&!this.editor.util.AutoCloseTagSupported()&&e.nodeName==="P"&&e.outerHTML.slice(-4).toLowerCase()!=="</p>"){l="div"}if(!this.editor.util.FirstLetterSupported()&&e.className){if(e.className==this.FIRST_LETTER_CLASS&&!this.bParseBx){this.HandleFirstLetterNode(e)}else if(e.className==this.FIRST_LETTER_CLASS_CHROME&&this.bParseBx){this.HandleFirstLetterNodeBack(e)}}if(l=="table"&&!this.bParseBx){var u=parseInt(e.getAttribute("border"),10);if(!u){e.removeAttribute("border");e.setAttribute("data-bx-no-border","Y")}}if(l in o){r=o[l];if(!r||r.remove){return null}if(r.clean_empty&&(e.innerHTML===""||e.innerHTML===this.editor.INVISIBLE_SPACE)&&(!e.className||e.className=="")&&(!this.editor.lastCreatedId||this.editor.lastCreatedId!=e.getAttribute("data-bx-last-created-id"))){return null}r=typeof r==="string"?{rename_tag:r}:r;n=e.getAttribute("data-bx-new-rule");if(n){r[n]=e.getAttribute("data-bx-"+n)}}else if(e.firstChild){r={rename_tag:this.DEFAULT_NODE_NAME}}else{return null}if(r.convert_attributes&&t==false){for(i in r.convert_attributes){if(r.convert_attributes.hasOwnProperty(i)&&e.getAttribute(i)){s=this.ConvertAttributeValueToCss(i,r.convert_attributes[i],e.getAttribute(i));if(s!==false){r.replace_with_children=false;e.style[r.convert_attributes[i]]=s}e.removeAttribute(i)}}}if(r.replace_with_children){a=e.ownerDocument.createDocumentFragment()}else{a=e.ownerDocument.createElement(r.rename_tag||l);this.HandleAttributes(e,a,r,t)}if(n){r[n]=null;delete r[n]}if((!a.className||a.className=="")&&a.removeAttribute){a.removeAttribute("class")}e=null;return a},CleanNodeAfterPaste:function(e,t){var r,i,s=e.nodeName,a=e.innerHTML,n=BX.util.trim(a),o={align:1,alt:1,bgcolor:1,border:1,cellpadding:1,cellspacing:1,color:1,colspan:1,height:1,href:1,rowspan:1,size:1,span:1,src:1,style:1,target:1,title:1,type:1,value:1,width:1},l={B:1,STRONG:1,I:1,EM:1,U:1,DEL:1,S:1,STRIKE:1},d={A:1,SPAN:1,B:1,STRONG:1,I:1,EM:1,U:1,DEL:1,S:1,STRIKE:1,H1:1,H2:1,H3:1,H4:1,H5:1,H6:1,ABBR:1,TIME:1,FIGURE:1,FIGCAPTION:1};if(s=="IFRAME"){return null}if(e.style.display=="none"||e.style.visibility=="hidden"){return null}if(d[s]&&a==""){return null}var u=e.getAttribute("data-bx-clean-attribute");if(u){e.removeAttribute(u);e.removeAttribute("data-bx-clean-attribute")}if(s=="IMG"){var f=e.getAttribute("alt");if(f===""){e.removeAttribute("alt")}else if(typeof f=="string"&&f!==""&&f.indexOf("://")!==-1){this.CheckAltImage(e)}e.removeAttribute("class");this.CleanNodeCss(e);return e}if(s=="A"&&(n==""||n=="&nbsp;")){return null}if(s==="A"){BX.onCustomEvent(this.editor,"OnAfterLinkInserted",[e.getAttribute("href")])}e.removeAttribute("class");e.removeAttribute("id");i=0;while(i<e.attributes.length){r=e.attributes[i].name;if(!o[r]||e.attributes[i].value==""){e.removeAttribute(r)}else{i++}}if(s=="THEAD"){var h=e.getElementsByTagName("TR"),c;for(i=0;i<h.length;i++){if(h[i]&&h[i].getAttribute){c=h[i].getAttribute("style");if(c&&c.indexOf("mso-yfti-irow")!==-1&&c.indexOf("mso-yfti-irow:0")===-1&&c.indexOf("mso-yfti-irow:-1")===-1&&c.indexOf("mso-yfti-firstrow:yes")===-1){e.setAttribute("data-bx-new-rule","rename_tag");e.setAttribute("data-bx-rename_tag","TBODY");break}}}}if(s=="DIV"||e.style.display=="block"||s=="FORM"){if(!e.lastChild||e.lastChild&&e.lastChild.nodeName!="BR"){e.appendChild(e.ownerDocument.createElement("BR")).setAttribute("data-bx-paste-flag","Y")}if(t&&typeof t=="object"&&t.nodeType==3&&e.firstChild){e.insertBefore(e.ownerDocument.createElement("BR"),e.firstChild).setAttribute("data-bx-paste-flag","Y")}e.setAttribute("data-bx-new-rule","replace_with_children");e.setAttribute("data-bx-replace_with_children","1")}if(s=="B"&&e.style.fontWeight=="normal"){e.setAttribute("data-bx-new-rule","replace_with_children");e.setAttribute("data-bx-replace_with_children","1")}if(l[s]&&this.editor.config.pasteSetDecor){e.setAttribute("data-bx-new-rule","replace_with_children");e.setAttribute("data-bx-replace_with_children","1")}if(l[s]&&this.editor.config.pasteSetDecor){e.setAttribute("data-bx-new-rule","replace_with_children");e.setAttribute("data-bx-replace_with_children","1")}if(this.IsAnchor(e)&&(e.name==""||BX.util.trim(e.name==""))){e.setAttribute("data-bx-new-rule","replace_with_children");e.setAttribute("data-bx-replace_with_children","1")}if(BX.util.in_array(s,this.editor.TABLE_TAGS)&&this.editor.config.pasteClearTableDimen){e.removeAttribute("width");e.removeAttribute("height")}this.CleanNodeCss(e);if(s=="SPAN"&&e.style.cssText==""){e.setAttribute("data-bx-new-rule","replace_with_children");e.setAttribute("data-bx-replace_with_children","1")}if((s=="P"||s=="SPAN"||s=="FONT")&&BX.util.trim(e.innerHTML)=="&nbsp;"){e.innerHTML=" "}return e},CleanNodeCss:function(e){var t,r,i,s,a,n=e.nodeName,o={width:["auto"],height:["auto"]};if(BX.util.in_array(n,this.editor.TABLE_TAGS)&&this.editor.config.pasteClearTableDimen){o={}}if(!this.editor.config.pasteSetColors){o["color"]=["#000000","#000","black"];o["background-color"]=["transparent","#fff","#ffffff","white"];o["background"]=1}if(!this.editor.config.pasteSetBorders){o["border-collapse"]=1;o["border-color"]=["transparent","#fff","#ffffff","white"];o["border-style"]=["none","hidden"];o["border-top"]=["0px","0"];o["border-right"]=["0px","0"];o["border-bottom"]=["0px","0"];o["border-left"]=["0px","0"];o["border-top-color"]=["transparent","#fff","#ffffff","white"];o["border-right-color"]=["transparent","#fff","#ffffff","white"];o["border-bottom-color"]=["transparent","#fff","#ffffff","white"];o["border-left-color"]=["transparent","#fff","#ffffff","white"];o["border-top-style"]=["none","hidden"];o["border-right-style"]=["none","hidden"];o["border-bottom-style"]=["none","hidden"];o["border-left-style"]=["none","hidden"];o["border-top-width"]=["0px","0"];o["border-right-width"]=["0px","0"];o["border-bottom-width"]=["0px","0"];o["border-left-width"]=["0px","0"];o["border-width"]=["0px","0"];o["border"]=["0px","0"]}if(!this.editor.config.pasteSetDecor){o["font-style"]=["normal"];o["font-weight"]=["normal"];o["text-decoration"]=["none"]}if(e.style&&BX.util.trim(e.style.cssText)!=""&&n!=="BR"){t=[];for(a in e.style){if(e.style.hasOwnProperty(a)){if(parseInt(a).toString()===a){i=e.style[a];s=e.style.getPropertyValue(i)}else{i=a;s=e.style.getPropertyValue(i)}if(s===null)continue;if(!o[i]||s.match(/^-(moz|webkit|ms|o)/gi)||s=="inherit"||s=="initial"||i=="color"&&n=="A"||(n=="SPAN"||n=="P")&&(i=="width"||i=="height")||typeof o[i]=="object"&&BX.util.in_array(s.toLowerCase(),o[i])){continue}if(i.indexOf("color")!==-1){s=this.editor.util.RgbToHex(s);if(typeof o[i]=="object"&&BX.util.in_array(s.toLowerCase(),o[i])||s=="transparent"){continue}}if(i.indexOf("border")!==-1&&s.indexOf("none")!==-1){continue}t.push({name:i,value:s})}}e.removeAttribute("style");if(t.length>0){for(r=0;r<t.length;r++){e.style[t[r].name]=t[r].value}}}else{e.removeAttribute("style")}},CheckAltImage:function(e){var t=this.editor.GetIframeDoc();function r(e){var r,i=t.getElementsByTagName("IMG");for(r=0;r<i.length;r++){if(i[r].src===e){return i[r]}}}function i(){if(e.src===e.alt&&e.getAttribute("data-bx-orig-src")!==e.src){e.setAttribute("data-bx-orig-src",e.getAttribute("src"))}BX.unbind(e,"load",i);BX.unbind(e,"error",s)}function s(){var t=e.getAttribute("alt"),a=r(e.src);if(!a){BX.unbind(e,"load",i);BX.unbind(e,"error",s);return}if(e.getAttribute("src")!==e.alt){a.setAttribute("src",t)}else{a.setAttribute("src",e.getAttribute("data-bx-orig-src"));BX.unbind(e,"load",i);BX.unbind(e,"error",s)}}BX.bind(e,"load",i);BX.bind(e,"error",s)},HandleText:function(e){var t=e.data;if(this.editor.pasteHandleMode&&t.indexOf("EndFragment:")!==-1){t=t.replace(/Version:\d\.\d(?:\s|\S)*?StartHTML:\d+(?:\s|\S)*?EndHTML:\d+(?:\s|\S)*?StartFragment:\d+(?:\s|\S)*?EndFragment:\d+(?:\s|\n|\t|\r)*/g,"")}return e.ownerDocument.createTextNode(t)},HandleAttributes:function(e,t,r,i){var s={},a=r.set_class,n=r.add_class,o=r.add_css,l=r.set_attributes,d=r.check_attributes,u=r.clear_attributes,f=this.editor.GetParseRules().classes,h=0,c,p={},g,m=[],b=[],T=[],B=[],S,v,P,x,C,A,y,I;if(d){for(A in d){I=this.GetCheckAttributeHandler(d[A]);if(!I)continue;y=I(this.GetAttributeEx(e,A));if(typeof y==="string"&&y!=="")s[A]=y}}var E=e.getAttribute("data-bx-clean-attribute");if(E){e.removeAttribute(E);e.removeAttribute("data-bx-clean-attribute")}if(!u){for(h=0;h<e.attributes.length;h++){C=e.attributes[h];if(i){if(C.name.substr(0,15)=="data-bx-app-ex-"){c=C.name.substr(15);s[c]=e.getAttribute(C.name);p[c]=true}if(p[C.name]){continue}}if(C.name.substr(0,8)=="data-bx-"&&C.name!="data-bx-noindex"&&this.bParseBx){continue}s[C.name]=this.GetAttributeEx(e,C.name)}}if(a)m.push(a);if(o){for(g in o){if(o.hasOwnProperty(g))t.style[g]=o[g]}}B=e.getAttribute("class");if(B)m=m.concat(B.split(this.WHITE_SPACE_REG_EXP));S=m.length;for(;h<S;h++){P=m[h];if(f[P])b.push(P)}if(T.length)s["class"]=T.join(" ");for(A in s){try{t.setAttribute(A,s[A])}catch(e){}}if(s.src){if(typeof s.width!=="undefined")t.setAttribute("width",s.width);if(typeof s.height!=="undefined")t.setAttribute("height",s.height)}},ConvertAttributeValueToCss:function(e,t,r){if(e=="size"&&t=="fontSize"){var i={1:"9px",2:"13px",3:"16px",4:"18px",5:"24px",6:"32px",7:"48px"};if(i[r]){r=i[r]}else if(r<1){r=false}else if(r>7){r=i[7]}}return r},GetAttributeEx:function(e,t){t=t.toLowerCase();var r,i=e.nodeName;if(i=="IMG"&&t=="src"&&this.IsLoadedImage(e)===true){r=e.getAttribute("src")}else if(!this.editor.util.CheckGetAttributeTruth()&&"outerHTML"in e){var s=e.outerHTML.toLowerCase(),a=s.indexOf(" "+t+"=")!=-1;r=a?e.getAttribute(t):null}else{r=e.getAttribute(t)}return r},IsLoadedImage:function(e){try{return e.complete&&!e.mozMatchesSelector(":-moz-broken")}catch(t){if(e.complete&&e.readyState==="complete")return true}return false},GetCheckAttributeHandler:function(e){var t=this.GetCheckAttributeHandlers();return t[e]},GetCheckAttributeHandlers:function(){return{url:function(e){return e},alt:function(e){if(!e){return""}return e.replace(/[^ a-z0-9_\-]/gi,"")},numbers:function(e){e=(e||"").replace(/\D/g,"");return e||null}}},HandleBitrixNode:function(e){return e},RegexpContentParse:function(e,t){if(e.indexOf("rgb")!==-1){e=e.replace(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)/gi,function(e,t,r,i,s){function a(e){return("0"+parseInt(e).toString(16)).slice(-2)}return"#"+a(t)+a(r)+a(i)})}if(t&&e.indexOf("data-bx-noindex")!==-1){e=e.replace(/(<a[^<]*?)data\-bx\-noindex="Y"([\s\S]*?>[\s\S]*?\/a>)/gi,function(e,t,r){return"\x3c!--noindex--\x3e"+t+r+"\x3c!--/noindex--\x3e"})}if(t){e=e.replace(/\uFEFF/gi,"")}else{e=e.replace(/\uFEFF+/gi,this.editor.INVISIBLE_SPACE)}if(t&&e.indexOf("#BXAPP")!==-1){var r=this;e=e.replace(/#BXAPP(\d+)#/g,function(e,t){t=parseInt(t,10);return r.editor.phpParser.AdvancedPhpGetFragmentByIndex(t,true)})}return e},IsAnchor:function(e){return e.nodeName=="A"&&!e.href},IsPrintBreak:function(e){return e.style.pageBreakAfter=="always"},GetPrintBreakSurrogate:function(e){var t=this.editor.GetIframeDoc(),r=this.editor.SetBxTag(false,{tag:"printbreak",params:{innerHTML:BX.util.trim(e.innerHTML)},name:BX.message("BXEdPrintBreakName"),title:BX.message("BXEdPrintBreakTitle")});return BX.create("IMG",{props:{src:this.editor.EMPTY_IMAGE_SRC,id:r,className:"bxhtmled-printbreak",title:BX.message("BXEdPrintBreakTitle")}},t)},CheckBlockNode:function(e){return this.editor.phpParser.IsSurrogate(e)||e.nodeType==1&&(e.style.display=="block"||e.style.display=="inline-block"||e.nodeName=="BLOCKQUOTE"||e.nodeName=="DIV")},HandleFirstLetterNode:function(e){this.firstNodeCheck=true;e.className=this.FIRST_LETTER_CLASS_CHROME;var t=true,r=this.editor.GetIframeDoc(),i,s,a=this._GetFlTextNode(e),n=this._GetFlSpan(e);if(a){i=BX.util.trim(this.editor.util.GetTextContent(a));if(n){this._FLCleanNodesBeforeFirstSpan(n);s=BX.util.trim(this.editor.util.GetTextContent(n));if(i.substr(0,1)==s&&s.length==1){t=false}else if(i==s&&s.length>1){t=false;this.editor.SetCursorNode();this.editor.util.InsertAfter(r.createTextNode(i.substr(1)),n);this.editor.RestoreCursor();n.innerHTML=i.substr(0,1)}this._FLCleanNodesBeforeFirstSpan(n)}if(t){if(n){this.editor.SetCursorNode();this.editor.util.ReplaceWithOwnChildren(n);this.editor.RestoreCursor()}n=BX.create("SPAN",{props:{className:this.FIRST_LETTER_SPAN},text:i.substr(0,1)},e.ownerDocument);this.editor.util.SetTextContent(a,i.substr(1));a.parentNode.insertBefore(n,a);this._FLCleanNodesBeforeFirstSpan(n)}this._FLCleanBogusSpans(e)}},HandleFirstLetterNodeBack:function(e){this.firstNodeCheck=true;e.className=this.FIRST_LETTER_CLASS;var t=this._GetFlSpan(e);if(t){this.editor.util.ReplaceWithOwnChildren(t)}},_GetFlSpan:function(e){return BX.findChild(e,{className:this.FIRST_LETTER_SPAN},1)},_GetFlTextNode:function(e){if(e.innerHTML==""||!e.firstChild)return null;if(e.firstChild&&e.firstChild.nodeType==3&&e.firstChild.nodeValue&&BX.util.trim(e.firstChild.nodeValue)!=="")return e.firstChild;var t=0,r=this,i=e;while(t++<=100){i=BX.findChild(i,function(e){return BX.util.trim(r.editor.util.GetTextContent(e))!==""},false);if(i.nodeType==3&&i.nodeValue&&BX.util.trim(i.nodeValue)!==""){return i}}return null},FirstLetterCheckNodes:function(e,t,r){var i=this.editor.GetIframeDoc(),s;if(this.firstNodeCheck||e.indexOf(this.FIRST_LETTER_CLASS)!==-1||r===true){var a,n=i.querySelectorAll("."+this.FIRST_LETTER_CLASS),o=i.querySelectorAll("."+this.FIRST_LETTER_CLASS_CHROME);for(s=0;s<o.length;s++){a=BX.util.trim(o[s].innerHTML);if(a==""||a=="<br>"){BX.remove(o[s]);continue}this.HandleFirstLetterNode(o[s])}for(s=0;s<n.length;s++){this.HandleFirstLetterNode(n[s])}this.firstNodeCheck=!!(n.length||o.length)}if(!this.firstNodeCheck&&e.indexOf(this.FIRST_LETTER_SPAN)!==-1){var l=i.querySelectorAll("."+this.FIRST_LETTER_SPAN);for(s=0;s<l.length;s++){this.editor.util.ReplaceWithOwnChildren(l[s])}}},_FLCleanNodesBeforeFirstSpan:function(e){while(e.previousSibling){BX.remove(e.previousSibling)}},_FLCleanBogusSpans:function(e){var t,r=e.getElementsByTagName("SPAN");for(t=r.length-1;t>=0;t--){if(!r[t].className&&r[t].style.lineHeight&&r[t].style.fontSize)this.editor.util.ReplaceWithOwnChildren(r[t])}},FirstLetterBackspaceHandler:function(e){if(e.collapsed&&e.startOffset==0){var t=e.startContainer.previousSibling;if(t&&t.className.indexOf(this.FIRST_LETTER_SPAN)!==-1){this.editor.selection.SetAfter(t.lastChild)}}}};function t(e){this.PHP_PATTERN="#BXPHP_IND#";this.editor=e;this.allowed={php:this.editor.allowPhp||this.editor.lpa,javascript:true,style:true,htmlcomment:true,iframe:true,video:true,audio:true,object:true};this.bUseAPP=true;this.APPConfig={arTags_before:["tbody","thead","tfoot","tr","td","th"],arTags_after:["tbody","thead","tfoot","tr","td","th"],arTags:{a:["href","title","class","style"],img:["src","alt","class","style","width","height"],input:["id","name","value"]}};this.customParsers=[];this.arScripts={};this.arJavascripts={};this.arHtmlComments={};this.arIframes={};this.arVideos={};this.arAudio={};this.arStyles={};this.arObjects={};this.surrClass="bxhtmled-surrogate";this.surrogateTags={component:1,php:1,javascript:1,style:1,htmlcomment:1,anchor:1,iframe:1,video:1,audio:1,object:1};BX.addCustomEvent(this.editor,"OnIframeMouseDown",BX.proxy(this.OnSurrogateMousedown,this));BX.addCustomEvent(this.editor,"OnIframeDblClick",BX.proxy(this.OnSurrogateDblClick,this));BX.addCustomEvent(this.editor,"OnIframeKeydown",BX.proxy(this.OnSurrogateKeydown,this));BX.addCustomEvent(this.editor,"OnAfterCommandExec",BX.proxy(this.RenewSurrogates,this))}t.prototype={ParsePhp:function(e){var t=this;if(this.IsAllowed("php")){e=this.ReplacePhpBySymCode(e)}else{e=this.CleanPhp(e)}e=this.CustomContentParse(e);e=this.ReplaceJavascriptBySymCode(e);e=this.ReplaceHtmlCommentsBySymCode(e);e=this.ReplaceIframeBySymCode(e);e=this.ReplaceAudioBySymCode(e);e=this.ReplaceStyleBySymCode(e);e=this.ReplaceObjectBySymCode(e);e=this.ParseBreak(e);e=this.AdvancedPhpParse(e);e=this.ParseSymCode(e);if(this.editor.lpa){e=e.replace(/#PHP(\d+)#/g,function(e){return t.GetSurrogateHTML("php_protected",BX.message("BXEdPhpCode")+" *",BX.message("BXEdPhpCodeProtected"),{value:e})});e=e.replace(/#BXAPP(\d+)#/g,function(e,r){r=parseInt(r);return t.editor.phpParser.AdvancedPhpGetFragmentByIndex(r,false)})}return e},ReplacePhpBySymCode:function(e,t){var r=[],i=0,s,a,n,o,l,d,u,f=0;t=t===true;while((i=e.indexOf("<?",i))>=0){f=0;s=i+1;a=false;n=false;while(s<e.length-1){s++;o=e.substr(s,1);if(!n){if(o=="/"&&s+1<e.length){l=e.indexOf("?>",s);if(l==-1){i=e.length;break}l+=2;d=0;if(e.substr(s+1,1)=="*"&&(d=e.indexOf("*/",s+2))>=0){d+=2}else if(e.substr(s+1,1)=="/"&&(d=e.indexOf("\n",s+2))>=0){d+=1}if(d>0){if(d>l&&e.substr(s+1,1)!="*"){r.push([i,l,e.substr(i,l-i)]);i=l;break}else{s=d-1}}continue}if(o=="?"&&s+1<e.length&&e.substr(s+1,1)==">"){s=s+2;r.push([i,s,e.substr(i,s-i)]);i=s+1;break}}if(n&&o=="\\"){a=true;continue}if(o=='"'||o=="'"){if(n){if(!a&&u==o)n=false}else{n=true;u=o}}a=false}if(s>=e.length)break;i=s}this.arScripts={};if(r.length>0){var h="",c=0,p;if(t){for(s=0;s<r.length;s++){p=r[s];h+=e.substr(c,p[0]-c);c=p[1]}}else{for(s=0;s<r.length;s++){p=r[s];h+=e.substr(c,p[0]-c)+this.SavePhpCode(p[2],s);c=p[1]}}e=h+e.substr(c)}return e},CleanPhp:function(e){return this.ReplacePhpBySymCode(e,true)},ReplaceJavascriptBySymCode:function(e){this.arJavascripts={};var t=this,r=0;e=e.replace(/<script[\s\S]*?\/script>/gi,function(e){t.arJavascripts[r]=e;var i=t.GetPattern(r,false,"javascript");r++;return i});return e},ReplaceHtmlCommentsBySymCode:function(e){this.arHtmlComments={};var t=this,r=0;e=e.replace(/(<!--noindex-->)(?:[\s|\n|\r|\t]*?)<a([\s\S]*?)\/a>(?:[\s|\n|\r|\t]*?)(<!--\/noindex-->)/gi,function(e,t,r,i){return'<a data-bx-noindex="Y"'+r+"/a>"});e=e.replace(/<!--[\s\S]*?-->/gi,function(e){t.arHtmlComments[r]=e;return t.GetPattern(r++,false,"html_comment")});return e},ReplaceIframeBySymCode:function(e){this.arIframes={};var t=this,r=0;e=e.replace(/<iframe([\s\S]*?)\/iframe>/gi,function(e,i){var s=t.CheckForVideo(i);if(s){t.arVideos[r]={html:e,provider:s.provider||false,src:s.src||false};return t.GetPattern(r++,false,"video")}else{t.arIframes[r]=e;return t.GetPattern(r++,false,"iframe")}});return e},ReplaceStyleBySymCode:function(e){this.arStyles={};var t=this,r=0;e=e.replace(/<style[\s\S]*?\/style>/gi,function(e){t.arStyles[r]=e;return t.GetPattern(r++,false,"style")});return e},ReplaceAudioBySymCode:function(e){this.arAudio={};var t=this,r=0;e=e.replace(/<audio[\s\S]*?\/audio>/gi,function(e){t.arAudio[r]=e;return t.GetPattern(r++,false,"audio")});return e},ReplaceObjectBySymCode:function(e){this.arObjects={};var t=this,r=0;e=e.replace(/<object[\s\S]*?\/object>/gi,function(e){t.arObjects[r]=e;return t.GetPattern(r++,false,"object")});e=e.replace(/<embed[\s\S]*?(?:\/embed)?>/gi,function(e){t.arObjects[r]=e;return t.GetPattern(r++,false,"object")});return e},CheckForVideo:function(e){var t=new RegExp("(?:src)\\s*=\\s*(\"|')([\\s\\S]*?((?:youtube.com)|(?:youtu.be)|(?:rutube.ru)|(?:vimeo.com)|(?:vk.com)|(?:"+location.host+"))[\\s\\S]*?)(\\1)","ig");var r=t.exec(e);if(r){return{src:r[2],provider:this.GetVideoProviderName(r[3],e)}}else{return false}},GetVideoProviderName:function(e,t){var r="";if(!BX.type.isNotEmptyString(t)){t=""}switch(e){case"youtube.com":case"youtu.be":r="YouTube";break;case"rutube.ru":r="Rutube";break;case"vimeo.com":r="Vimeo";break;case"vk.com":r="Vk";break;case location.host:var i=/((?:provider))=([\S]+)(?:&*)/gi;res=i.exec(t);if(res){r=res[2]}break}return r},SavePhpCode:function(e,t){this.arScripts[t]=e;return this.GetPhpPattern(t,false)},GetPhpPattern:function(e,t){if(t)return new RegExp("#BXPHP_"+e+"#","ig");else return"#BXPHP_"+e+"#"},GetPattern:function(e,t,r){var i;switch(r){case"php":i="#BXPHP_";break;case"javascript":i="#BXJAVASCRIPT_";break;case"html_comment":i="#BXHTMLCOMMENT_";break;case"iframe":i="#BXIFRAME_";break;case"style":i="#BXSTYLE_";break;case"video":i="#BXVIDEO_";break;case"audio":i="#BXAUDIO_";break;case"object":i="#BXOBJECT_";break;default:return""}return t?new RegExp(i+e+"#","ig"):i+e+"#"},ParseSymCode:function(e){var t=this;e=e.replace(/#BX(PHP|JAVASCRIPT|HTMLCOMMENT|IFRAME|STYLE|VIDEO|AUDIO|OBJECT)_(\d+)#/g,function(e,r,i){var s="";if(t.IsAllowed(r.toLowerCase())){switch(r){case"PHP":s=t.GetPhpCodeHTML(t.arScripts[i]);break;case"JAVASCRIPT":s=t.GetJavascriptCodeHTML(t.arJavascripts[i]);break;case"HTMLCOMMENT":s=t.GetHtmlCommentHTML(t.arHtmlComments[i]);break;case"IFRAME":s=t.GetIframeHTML(t.arIframes[i]);break;case"STYLE":s=t.GetStyleHTML(t.arStyles[i]);break;case"VIDEO":s=t.GetVideoHTML(t.arVideos[i]);break;case"AUDIO":s=t.GetAudioHTML(t.arAudio[i]);break;case"OBJECT":s=t.GetObjectHTML(t.arObjects[i]);break}}return s||e});return e},GetPhpCodeHTML:function(e){if(typeof e!=="string")return null;var t="",r=this.editor.components.IsComponent(e);if(r!==false){var i=this.editor.components.GetComponentData(r.name),s=i.title||r.name,a=i.params&&i.params.DESCRIPTION?i.params.DESCRIPTION:a;if(i.className){r.className=i.className||""}t=this.GetSurrogateHTML("component",s,a,r)}else{if(this.editor.allowPhp){t=this.GetSurrogateHTML("php",BX.message("BXEdPhpCode"),BX.message("BXEdPhpCode")+": "+this.GetShortTitle(e,200),{value:e})}else{t=""}}return t},GetJavascriptCodeHTML:function(e){if(typeof e!=="string")return null;return this.GetSurrogateHTML("javascript","Javascript","Javascript: "+this.GetShortTitle(e,200),{value:e})},GetHtmlCommentHTML:function(e){if(typeof e!=="string")return null;return this.GetSurrogateHTML("htmlcomment",BX.message("BXEdHtmlComment"),BX.message("BXEdHtmlComment")+": "+this.GetShortTitle(e),{value:e})},GetIframeHTML:function(e){if(typeof e!=="string")return null;return this.GetSurrogateHTML("iframe",BX.message("BXEdIframe"),BX.message("BXEdIframe")+": "+this.GetShortTitle(e),{value:e})},GetStyleHTML:function(e){if(typeof e!=="string")return null;return this.GetSurrogateHTML("style",BX.message("BXEdStyle"),BX.message("BXEdStyle")+": "+this.GetShortTitle(e),{value:e})},GetVideoHTML:function(e){var t="video",r=e.params||this.FetchVideoIframeParams(e.html,e.provider);r.value=e.html;var i=this.editor.SetBxTag(false,{tag:t,name:r.title,params:r}),s=this.editor.SetBxTag(false,{tag:"surrogate_dd",params:{origParams:r,origId:i}});this.editor.SetBxTag({id:i},{tag:t,name:r.title,params:r,title:r.title,surrogateId:s});var a='<span id="'+i+'" title="'+r.title+'"  class="'+this.surrClass+" bxhtmled-video-surrogate"+'" '+'style="min-width:'+r.width+"px; max-width:"+r.width+"px; min-height:"+r.height+"px; max-height:"+r.height+'px"'+">"+'<img title="'+r.title+'" id="'+s+'" class="bxhtmled-surrogate-dd" src="'+this.editor.util.GetEmptyImage()+'"/>'+'<span class="bxhtmled-surrogate-inner"><span class="bxhtmled-video-icon"></span><span class="bxhtmled-comp-lable" spellcheck=false>'+r.title+"</span></span>"+"</span>";return a},GetAudioHTML:function(e){if(typeof e!=="string")return null;var t="Audio",r=this.FetchVideoIframeParams(e);if(r&&r.src){t+=": "+this.GetShortTitle(BX.util.htmlspecialchars(r.src))}return this.GetSurrogateHTML("audio",t,"Audio: "+this.GetShortTitle(e),{value:e})},GetObjectHTML:function(e){return this.GetSurrogateHTML("object",BX.message("BXEdObjectEmbed"),BX.message("BXEdObjectEmbed")+": "+this.GetShortTitle(e),{value:e})},FetchVideoIframeParams:function(e,t){var r=/((?:src)|(?:title)|(?:width)|(?:height))\s*=\s*("|')([\s\S]*?)(\2)/gi,i={src:"",width:180,height:100,title:t?BX.message("BXEdVideoTitleProvider").replace("#PROVIDER_NAME#",t):BX.message("BXEdVideoTitle"),origTitle:""};e.replace(r,function(e,t,r,s){t=t.toLowerCase();if(t=="width"||t=="height"){s=parseInt(s,10);if(s&&!isNaN(s)){i[t]=s}}else if(t=="title"){i.origTitle=BX.util.htmlspecialcharsback(s);i.title+=": "+s}else{i[t]=s}return e});return i},GetSurrogateHTML:function(e,t,r,i){if(r){r=BX.util.htmlspecialchars(r);r=r.replace('"','"')}if(!i){i={}}var s=this.editor.SetBxTag(false,{tag:e,name:t,params:i}),a=this.editor.SetBxTag(false,{tag:"surrogate_dd",params:{origParams:i,origId:s}});this.editor.SetBxTag({id:s},{tag:e,name:t,params:i,title:r,surrogateId:a});if(!this.surrogateTags.tag){this.surrogateTags.tag=1}var n='<span id="'+s+'" title="'+(r||t)+'"  class="'+this.surrClass+(i.className?" "+i.className:"")+'">'+this.GetSurrogateInner(a,r,t)+"</span>";return n},GetSurrogateNode:function(e,t,r,i){var s=this.editor.GetIframeDoc(),a=this.editor.SetBxTag(false,{tag:e,name:t,params:i,title:r}),n=this.editor.SetBxTag(false,{tag:"surrogate_dd",params:{origParams:i,origId:a}});if(!i)i={};this.editor.SetBxTag({id:a},{tag:e,name:t,params:i,title:r,surrogateId:n});if(!this.surrogateTags.tag){this.surrogateTags.tag=1}return BX.create("SPAN",{props:{id:a,title:r||t,className:this.surrClass+(i.className?" "+i.className:"")},html:this.GetSurrogateInner(n,r,t)},s)},GetSurrogateInner:function(e,t,r){return'<img title="'+(t||r)+'" id="'+e+'" class="bxhtmled-surrogate-dd" src="'+this.editor.util.GetEmptyImage()+'"/>'+'<span class="bxhtmled-surrogate-inner"><span class="bxhtmled-right-side-item-icon"></span><span class="bxhtmled-comp-lable" unselectable="on" spellcheck=false>'+BX.util.htmlspecialchars(r)+"</span></span>"},GetShortTitle:function(e,t){if(e.length>100)e=e.substr(0,100)+"...";return e},_GetUnParsedContent:function(e){var t=this;e=e.replace(/#BX(PHP|JAVASCRIPT|HTMLCOMMENT|IFRAME|STYLE|VIDEO|AUDIO|OBJECT)_(\d+)#/g,function(e,r,i){var s;switch(r){case"PHP":s=t.arScripts[i];break;case"JAVASCRIPT":s=t.arJavascripts[i];break;case"HTMLCOMMENT":s=t.arHtmlComments[i];break;case"IFRAME":s=t.arIframes[i];break;case"STYLE":s=t.arStyles[i];break;case"VIDEO":s=t.arVideos[i].html;break;case"AUDIO":s=t.arAudio[i];break;case"OBJECT":s=t.arObjects[i].html;break}return s});return e},IsSurrogate:function(e){return e&&BX.hasClass(e,this.surrClass)},TrimPhpBrackets:function(e){if(e.substr(0,2)!="<?")return e;if(e.substr(0,5).toLowerCase()=="<?php")e=e.substr(5);else e=e.substr(2);e=e.substr(0,e.length-2);return e},TrimQuotes:function(e,t){var r,i;e=e.trim();if(t==undefined){r=e.substr(0,1);i=e.substr(0,1);if(r=='"'&&i=='"'||r=="'"&&i=="'")e=e.substring(1,e.length-1)}else{if(!t.length)return e;r=e.substr(0,1);i=e.substr(0,1);t=t.substr(0,1);if(r==t&&i==t)e=e.substring(1,e.length-1)}return e},CleanCode:function(e){var t=false,r=false,i="",s=-1,a,n,o;while(s<e.length-1){s++;a=e.substr(s,1);if(!r){if(a=="/"&&s+1<e.length){n=0;if(e.substr(s+1,1)=="*"&&(n=e.indexOf("*/",s+2))>=0)n+=2;else if(e.substr(s+1,1)=="/"&&(n=e.indexOf("\n",s+2))>=0)n+=1;if(n>0){if(s>n)alert("iti="+s+"="+n);s=n}continue}if(a==" "||a=="\r"||a=="\n"||a=="\t")continue}if(r&&a=="\\"){t=true;i+=a;continue}if(a=='"'||a=="'"){if(r){if(!t&&o==a)r=false}else{r=true;o=a}}t=false;i+=a}return i},ParseFunction:function(e){var t=e.indexOf("("),r=e.lastIndexOf(")");if(t>=0&&r>=0&&t<r)return{name:e.substr(0,t),params:e.substring(t+1,r)};return false},ParseParameters:function(e){e=this.CleanCode(e);var t=this.GetParams(e),r,i,s=t.length;for(i=0;i<s;i++){if(t[i].substr(0,6).toLowerCase()=="array("||t[i].substr(0,1).toLowerCase()=="["){t[i]=this.GetArray(t[i])}else{r=this.TrimQuotes(t[i]);if(this.IsNum(r)||t[i]!=r)t[i]=r;else t[i]=this.WrapPhpBrackets(t[i])}}return t},GetArray:function(e){var t=e.substr(0,1).toLowerCase()=="[",r={};if(e.substr(0,6).toLowerCase()!="array("&&!t){return e}e=e.substring(t?1:6,e.length-1);var i=this.GetParams(e),s,a,n,o,l;for(l=0;l<i.length;l++){if(i[l].substr(0,6).toLowerCase()=="array("||i[l].substr(0,1).toLowerCase()=="["){r[l]=this.GetArray(i[l]);continue}n=i[l].indexOf("=>");if(n==-1){if(i[l]==this.TrimQuotes(i[l]))r[l]=this.WrapPhpBrackets(i[l]);else r[l]=this.TrimQuotes(i[l])}else{s=this.TrimQuotes(i[l].substr(0,n));a=i[l].substr(n+2);o=this.TrimQuotes(a);if(a==o){a=this.WrapPhpBrackets(a);if(a.substr(0,6).toLowerCase()=="array("||a.substr(0,1).toLowerCase()=="["){a=this.GetArray(a)}}else{a=this.TrimQuotes(a)}r[s]=a}}return r},WrapPhpBrackets:function(e){e=e.trim();var t=e.substr(0,1),r=e.substr(0,1);if(t=='"'&&r=='"'||t=="'"&&r=="'")return e;return"={"+e+"}"},GetParams:function(e){var t=[],r=0,i=0,s,a,n=1,o=1,l,d="";for(l=0;l<e.length;l++){s=e.substr(l,1);if(s=='"'&&o==1&&!a){n*=-1}else if(s=="'"&&n==1&&!a){o*=-1}else if(s=="\\"&&!a){a=true;d+=s;continue}if(a)a=false;if(o==-1||n==-1){d+=s;continue}if(s=="["){r++}else if(s=="]"){r--}else if(s=="("){i++}else if(s==")"){i--}else if(s==","&&r==0&&i==0){t.push(d);d="";continue}if(i<0||r<0){break}d+=s}if(d!=""){t.push(d)}return t},IsNum:function(e){var t=e;e=parseFloat(t);if(isNaN(e))e=parseInt(t);if(!isNaN(e))return t==e;return false},ParseBxNodes:function(e){var t,r=this.editor.parser.convertedBxNodes,i=r.length;for(t=0;t<i;t++){if(r[t].tag=="surrogate_dd"){e=e.replace("~"+r[t].params.origId+"~","")}}this._skipNodeIndex={};this._skipNodeList=[];var s=this;e=e.replace(/~(bxid\d{1,9})~/gi,function(e,t){if(!s._skipNodeIndex[t]){var r=s.editor.GetBxTag(t);if(r&&r.tag){var i=s.GetBxNode(r.tag);if(i){return i.Parse(r.params,t)}}}return""});return e},GetBxNodeList:function(){var e=this;this.arBxNodes={component:{Parse:function(t,r){return e.editor.components.GetSource(t,r)}},component_icon:{Parse:function(t){return e.editor.components.GetOnDropHtml(t)}},surrogate_dd:{Parse:function(t){if(BX.browser.IsFirefox()||!t||!t.origId){return""}var r=e.editor.GetBxTag(t.origId);if(r){e._skipNodeIndex[t.origId]=true;e._skipNodeList.push(t.origId);var i=e.GetBxNode(r.tag);if(i){return i.Parse(r.params)}}return"#parse surrogate_dd#"}},php:{Parse:function(t){return e._GetUnParsedContent(t.value)}},php_protected:{Parse:function(e){return e.value}},javascript:{Parse:function(t){return e._GetUnParsedContent(t.value)}},htmlcomment:{Parse:function(t){return e._GetUnParsedContent(t.value)}},iframe:{Parse:function(t){return e._GetUnParsedContent(t.value)}},style:{Parse:function(t){return e._GetUnParsedContent(t.value)}},video:{Parse:function(t){return e._GetUnParsedContent(t.value)}},audio:{Parse:function(t){return e._GetUnParsedContent(t.value)}},object:{Parse:function(t){return e._GetUnParsedContent(t.value)}},anchor:{Parse:function(e){var t="";if(e.attributes){for(var r in e.attributes){if(e.attributes.hasOwnProperty(r)){t+=r+'="'+e.attributes[r]+'" '}}}return"<a "+t+(e.name?'name="'+e.name+'"':"")+">"+e.html+"</a>"}},pagebreak:{Parse:function(e){return"<BREAK />"}},printbreak:{Parse:function(e){return'<div style="page-break-after: always">'+e.innerHTML+"</div>"}}};this.editor.On("OnGetBxNodeList");return this.arBxNodes},AddBxNode:function(e,t){if(this.arBxNodes==undefined){var r=this;BX.addCustomEvent(this.editor,"OnGetBxNodeList",function(){r.arBxNodes[e]=t})}else{this.arBxNodes[e]=t}},GetBxNode:function(e){if(!this.arBxNodes){this.arBxNodes=this.GetBxNodeList()}return this.arBxNodes[e]||null},OnSurrogateMousedown:function(e,t,r){var i=this;if(r.tag=="surrogate_dd"){BX.bind(t,"dragstart",function(e){i.OnSurrogateDragStart(e,this)});BX.bind(t,"dragend",function(e){i.OnSurrogateDragEnd(e,this,r)})}else{setTimeout(function(){var e=i.CheckParentSurrogate(i.editor.selection.GetSelectedNode());if(e){i.editor.selection.SetAfter(e);if(!e.nextSibling||e.nextSibling.nodeType!=3){var t=i.editor.util.GetInvisibleTextNode();i.editor.selection.InsertNode(t);i.editor.selection.SetAfter(t)}}},0)}},OnSurrogateDragEnd:function(e,t,r){if(!document.querySelectorAll)return;var i=this.editor.GetIframeDoc(),s,a,n,o={},l=i.querySelectorAll(".bxhtmled-surrogate"),d=i.querySelectorAll(".bxhtmled-surrogate-dd"),u=l.length;for(s=0;s<d.length;s++){if(d[s]&&d[s].id==r.id){BX.remove(d[s])}}for(s=0;s<u;s++){a=l[s];if(o[a.id]){if(a.getAttribute("data-bx-paste-flag")=="Y"||!o[a.id].getAttribute("data-bx-paste-flag"))BX.remove(a);else if(o[a.id].getAttribute("data-bx-paste-flag"))BX.remove(o[a.id])}else{o[a.id]=a;n=this.editor.GetBxTag(a.id);a.innerHTML=this.GetSurrogateInner(n.surrogateId,n.title,n.name)}}},OnSurrogateDragStart:function(e,t){if(BX.browser.IsFirefox()){this.editor.GetIframeDoc().body.appendChild(t)}},CheckParentSurrogate:function(e){if(!e){return false}if(this.IsSurrogate(e)){return e}var t=this,r=0,i=BX.findParent(e,function(e){return r++>4||t.IsSurrogate(e)},this.editor.GetIframeDoc().body);return this.IsSurrogate(i)?i:false},CheckSurrogateDd:function(e){return e&&e.nodeType==1&&this.editor.GetBxTag(e).tag=="surrogate_dd"},OnSurrogateClick:function(e,t){var r=this.editor.GetBxTag(t);if(r&&r.tag=="surrogate_dd"){var i=this.editor.GetBxTag(r.params.origId);this.editor.On("OnSurrogateClick",[r,i,t,e])}},OnSurrogateDblClick:function(e,t){var r=this.editor.GetBxTag(t);if(r&&r.tag=="surrogate_dd"){var i=this.editor.GetBxTag(r.params.origId);this.editor.On("OnSurrogateDblClick",[r,i,t,e])}},OnSurrogateKeyup:function(e,t,r,i){var s,a,n=this.editor.selection.GetRange();if(n){if(n.collapsed){}else{}}},OnSurrogateKeydown:function(e,t,r,i){var s,a=this.editor.KEY_CODES,n=this.editor.selection.GetRange(),o,l,d,u=i;if(!n||!n.getNodes)return;if(!n.collapsed){if(t===a["backspace"]||t===a["delete"]){var f,h=n.getNodes([3]);for(f=0;f<h.length;f++){s=this.editor.util.CheckSurrogateNode(h[f]);if(s){l=this.editor.GetBxTag(s);if(this.surrogateTags[l.tag]){this.RemoveSurrogate(s,l)}}}}}if(t===a["delete"]&&n.collapsed){o=this.editor.util.GetInvisibleTextNode();this.editor.selection.InsertNode(o);this.editor.selection.SetAfter(o);var c=o.nextSibling;if(c){if(c&&c.nodeName=="BR"){c=c.nextSibling}if(c&&c.nodeType==3&&(c.nodeValue=="\n"||this.editor.util.IsEmptyNode(c))){c=c.nextSibling}if(c){BX.remove(o);l=this.editor.GetBxTag(c);if(this.surrogateTags[l.tag]){this.RemoveSurrogate(c,l);return BX.PreventDefault(e)}}}}else if(t===a["backspace"]&&n.collapsed){o=this.editor.util.GetInvisibleTextNode();this.editor.selection.InsertNode(o);this.editor.selection.SetAfter(o);var p=this.editor.util.GetPreviousNotEmptySibling(o);if(p&&this.editor.phpParser.IsSurrogate(p)){BX.remove(p);if(o)BX.remove(o);return BX.PreventDefault(e)}else{if(o)BX.remove(o)}}if(n.startContainer&&n.startContainer==n.endContainer&&n.startContainer.nodeName!=="BODY"){u=n.startContainer;d=this.editor.util.CheckSurrogateNode(u);if(d){l=this.editor.GetBxTag(d.id);if(t===a["backspace"]||t===a["delete"]){this.RemoveSurrogate(d,l);BX.PreventDefault(e)}else if(t===a["left"]||t===a["up"]){var g=d.previousSibling;if(g&&g.nodeType==3&&this.editor.util.IsEmptyNode(g))this.editor.selection._MoveCursorBeforeNode(g);else this.editor.selection._MoveCursorBeforeNode(d);return BX.PreventDefault(e)}else if(t===a["right"]||t===a["down"]){var m=d.nextSibling;if(m&&m.nodeType==3&&this.editor.util.IsEmptyNode(m))this.editor.selection._MoveCursorAfterNode(m);else this.editor.selection._MoveCursorAfterNode(d);return BX.PreventDefault(e)}else if(t===a.shift||t===a.ctrl||t===a.alt||t===a.cmd||t===a.cmdRight){return BX.PreventDefault(e)}else{this.editor.selection._MoveCursorAfterNode(d)}}}},RemoveSurrogate:function(e,t){this.editor.undoManager.Transact();BX.remove(e);this.editor.On("OnSurrogateRemove",[e,t])},CheckHiddenSurrogateDrag:function(){var e,t;for(t=0;t<this.hiddenDd.length;t++){e=this.editor.GetIframeElement(this.hiddenDd[t]);if(e){e.style.visibility=""}}this.hiddenDd=[]},GetAllSurrogates:function(e){if(!document.querySelectorAll)return[];e=e===true;var t=this.editor.GetIframeDoc(),r=[],i,s,a,n=t.querySelectorAll(".bxhtmled-surrogate");for(i=0;i<n.length;i++){s=n[i];a=this.editor.GetBxTag(s.id);if(a.tag||e){r.push({node:s,bxTag:a})}}return r},RenewSurrogates:function(){var e=true,t,r={},i,s=this.GetAllSurrogates(true);for(t=0;t<s.length;t++){if(!s[t].bxTag.tag){BX.remove(s[t].node);continue}i=s[t].bxTag.surrogateId;if(!r[i]||!e){r[i]=i;s[t].node.innerHTML=this.GetSurrogateInner(s[t].bxTag.surrogateId,s[t].bxTag.title,s[t].bxTag.name)}else{BX.remove(s[t].node)}}},RedrawSurrogates:function(){var e,t=this.GetAllSurrogates();for(e=0;e<t.length;e++){if(t[e].node){BX.addClass(t[e].node,"bxhtmled-surrogate-tmp")}}setTimeout(function(){for(e=0;e<t.length;e++){if(t[e].node){BX.removeClass(t[e].node,"bxhtmled-surrogate-tmp")}}},0)},IsAllowed:function(e){return this.allowed[e]},AdvancedPhpParse:function(e){if(this.bUseAPP){this.arAPPFragments=[];e=this.AdvancedPhpParseInAttributes(e)}return e},AdvancedPhpParseBetweenTableTags:function(e){var t=this;function r(e,r,i,s,a){t.arAPPFragments.push(JS_addslashes(r));return i+s+' data-bx-php-before="#BXAPP'+(t.arAPPFragments.length-1)+'#" '+a}function i(e,r,i,s,a){t.arAPPFragments.push(JS_addslashes(a));return r+">"+s+"<"+i+' style="display:none;" data-bx-php-after="#BXAPP'+(t.arAPPFragments.length-1)+'#"></'+i+">"}var s=t.APPConfig.arTags_before,a=t.APPConfig.arTags_after,n,o,d;for(o=0;o<s.length;o++){n=s[o];if(t.limit_php_access)d=new RegExp("#(PHP(?:\\d{4}))#(\\s*)(<"+n+"[^>]*?)(>)","ig");else d=new RegExp("<\\?(.*?)\\?>(\\s*)(<"+n+"[^>]*?)(>)","ig");e=e.replace(d,r)}for(o=0,l=a.length;o<l;o++){n=a[o];if(t.limit_php_access)d=new RegExp("(</("+n+")[^>]*?)>(\\s*)#(PHP(?:\\d{4}))#","ig");else d=new RegExp("(</("+n+")[^>]*?)>(\\s*)<\\?(.*?)\\?>","ig");e=e.replace(d,i)}return e},AdvancedPhpParseInAttributes:function(e){var t=this,r=this.APPConfig.arTags,i,s,a,n;function o(e,r,i,s,a,n,o){var l,d;if(a.match(/#PHP\d+#/g)){t.arAPPFragments.push(a);l=t.arAPPFragments.length-1;d="#BXAPP"+l+"#";return r+i+'="'+d+'"'+n}if(a.indexOf("#BXPHP_")===-1){return e}t.arAPPFragments.push(a);l=t.arAPPFragments.length-1;d=t.AdvancedPhpGetFragmentByIndex(l,true);return r+i+'="'+d+'"'+" data-bx-app-ex-"+i+'="#BXAPP'+l+'#"'+n}for(i in r){if(r.hasOwnProperty(i)){for(a=0;a<r[i].length;a++){s=r[i][a];n=new RegExp("(<"+i+"(?:[^>](?:\\?>)*?)*?)("+s+")\\s*=\\s*((?:\"|')?)([\\s\\S]*?)\\3((?:[^>](?:\\?>)*?)*?>)","ig");e=e.replace(n,o)}}}return e},AdvancedPhpUnParse:function(e){return e},AdvancedPhpGetFragmentByCode:function(e,t){var r=e.substr(6);r=parseInt(r.substr(0,r.length-1),10);return this.AdvancedPhpGetFragmentByIndex(r,t)},AdvancedPhpGetFragmentByIndex:function(e,t){var r=this,i=this.arAPPFragments[e];i=i.replace(/#BXPHP_(\d+)#/g,function(e,i){var s=r.arScripts[parseInt(i,10)];if(t){var a=r.GetSiteTemplatePath();if(a){s=s.replace(/<\?=\s*SITE_TEMPLATE_PATH;?\s*\?>/i,a);s=s.replace(/<\?\s*echo\s*SITE_TEMPLATE_PATH;?\s*\?>/i,a)}}return s});return i},ParseBreak:function(e){var t=this;e=e.replace(/<break\s*\/*>/gi,function(e){return t.GetSurrogateHTML("pagebreak",BX.message("BXEdPageBreakSur"),BX.message("BXEdPageBreakSurTitle"))});return e},GetSiteTemplatePath:function(){return this.editor.GetTemplateParams().SITE_TEMPLATE_PATH},CustomContentParse:function(e){for(var t=0;t<this.customParsers.length;t++){if(typeof this.customParsers[t]=="function"){e=this.customParsers[t](e)}}return e},AddCustomParser:function(e){if(typeof e=="function")this.customParsers.push(e)}};function r(e){this.editor=e;this.parseAlign=true}r.prototype={Unparse:function(e){var t=this.editor.parser.GetAsDomElement(e,this.editor.GetIframeDoc());t.setAttribute("data-bx-parent-node","Y");e=this.GetNodeHtml(t,true);e=e.replace(/#BR#/gi,"\n");e=e.replace(/&nbsp;/gi," ");e=e.replace(/\uFEFF/gi,"");return e},Parse:function(e){var t=this,r,i;e=e.replace(/</gi,"&lt;");e=e.replace(/>/gi,"&gt;");function s(e){if(!e.replace)return e;return e.replace(/("|<|>)/g,"")}var a=[];e=e.replace(/\[code\]((?:\s|\S)*?)\[\/code\]/gi,function(e,t){a.push('<pre class="bxhtmled-code">'+t+"</pre>");return"#BX_CODE"+(a.length-1)+"#"});var n,o;for(n in this.editor.parser.specialParsers){if(this.editor.parser.specialParsers.hasOwnProperty(n)){o=this.editor.parser.specialParsers[n];if(o&&o.Parse){e=o.Parse(n,e,this.editor)}}}if(this.editor.sortedSmiles){var l=[],d=[],u;e=e.replace(/\[(?:\s|\S)*?\]/gi,function(e){d.push(e);return"#BX_TMP_TAG"+(d.length-1)+"#"});e=e.replace(/(?:https?|ftp):\/\//gi,function(e){l.push(e);return"#BX_TMP_URL"+(l.length-1)+"#"});i=this.editor.sortedSmiles.length;var f,h="\\s.,;:!?\\#\\-\\*\\|\\[\\]\\(\\)\\{\\}<>&\\n\\t\\r",c;for(r=0;r<i;r++){u=this.editor.sortedSmiles[r];if(u.path&&u.code){c="";if(u.width)c+="width:"+parseInt(u.width)+"px;";if(u.height)c+="height:"+parseInt(u.height)+"px;";if(c!=="")c='style="'+c+'"';f='<img id="'+t.editor.SetBxTag(false,{tag:"smile",params:u})+'" src="'+u.path+'" title="'+(u.name||u.code)+'" '+c+"/>";e=e.replace(new RegExp("(["+h+"])"+BX.util.preg_quote(u.code)+"(["+h+"])","ig"),"$1"+f+"$2");e=e.replace(new RegExp("(["+h+"])"+BX.util.preg_quote(u.code)+"$","ig"),"$1"+f);e=e.replace(new RegExp("^"+BX.util.preg_quote(u.code)+"(["+h+"])","ig"),f+"$1");e=e.replace(new RegExp("^"+BX.util.preg_quote(u.code)+"$","ig"),f)}}if(l.length>0){e=e.replace(/#BX_TMP_URL(\d+)#/gi,function(e,t){return l[t]||e})}if(d.length>0){e=e.replace(/#BX_TMP_TAG(\d+)#/gi,function(e,t){return d[t]||e})}}e=e.replace(/\[quote\]/gi,'<blockquote class="bxhtmled-quote">');e=e.replace(/\[\/quote\]\n?/gi,"</blockquote>");e=e.replace(/[\r\n\s\t]?\[table\][\r\n\s\t]*?\[tr\]/gi,'<table border="1">[TR]');e=e.replace(/\[tr\][\r\n\s\t]*?\[td\]/gi,"[TR][TD]");e=e.replace(/\[tr\][\r\n\s\t]*?\[th\]/gi,"[TR][TH]");e=e.replace(/\[\/td\][\r\n\s\t]*?\[td\]/gi,"[/TD][TD]");e=e.replace(/\[\/tr\][\r\n\s\t]*?\[tr\]/gi,"[/TR][TR]");e=e.replace(/\[\/td\][\r\n\s\t]*?\[\/tr\]/gi,"[/TD][/TR]");e=e.replace(/\[\/th\][\r\n\s\t]*?\[\/tr\]/gi,"[/TH][/TR]");e=e.replace(/\[\/tr\][\r\n\s\t]*?\[\/table\][\r\n\s\t]?/gi,"[/TR][/TABLE]");e=e.replace(/[\r\n\s\t]*?\[\/list\]/gi,"[/LIST]");e=e.replace(/[\r\n\s\t]*?\[\*\]?/gi,"[*]");e=e.replace(/\[p\]/gi,"<p>");e=e.replace(/\[\/p\]\n?/gi,"</p>");var p=["b","u","i",["s","del"],"table","tr","td","th"],g,m;i=p.length;for(r=0;r<i;r++){if(typeof p[r]=="object"){g=p[r][0];m=p[r][1]}else{g=m=p[r]}e=e.replace(new RegExp("\\[(\\/?)"+g+"\\]","ig"),"<$1"+m+">")}e=e.replace(/\[url\]((?:\s|\S)*?)\[\/url\]/gi,function(e,t){return'<a href="'+s(t)+'">'+t+"</a>"});e=e.replace(/\[url\s*=\s*((?:\s|\S)*?)\]((?:\s|\S)*?)\[\/url\]/gi,function(e,t,r){return'<a href="'+s(t)+'">'+r+"</a>"});e=e.replace(/\[img((?:\s|\S)*?)\]((?:\s|\S)*?)\[\/img\]/gi,function(e,r,i){r=t.FetchImageParams(r);i=s(i);var a="";if(r.width)a+="width:"+parseInt(r.width)+"px;";if(r.height)a+="height:"+parseInt(r.height)+"px;";if(a!=="")a='style="'+a+'"';return'<img  src="'+i+'"'+a+"/>"});r=0;while(e.toLowerCase().indexOf("[color=")!=-1&&e.toLowerCase().indexOf("[/color]")!=-1&&r++<20){e=e.replace(/\[color=((?:\s|\S)*?)\]((?:\s|\S)*?)\[\/color\]/gi,function(e,t,r){return'<span style="color:'+s(t)+'">'+r+"</span>"})}r=0;while(e.toLowerCase().indexOf("[list=")!=-1&&e.toLowerCase().indexOf("[/list]")!=-1&&r++<20){e=e.replace(/\[list=1\]((?:\s|\S)*?)\[\/list\]/gi,"<ol>$1</ol>")}r=0;while(e.toLowerCase().indexOf("[list")!=-1&&e.toLowerCase().indexOf("[/list]")!=-1&&r++<20){e=e.replace(/\[list\]((?:\s|\S)*?)\[\/list\]/gi,"<ul>$1</ul>")}e=e.replace(/\[\*\]/gi,"<li>");r=0;while(e.toLowerCase().indexOf("[font=")!=-1&&e.toLowerCase().indexOf("[/font]")!=-1&&r++<20){e=e.replace(/\[font=((?:\s|\S)*?)\]((?:\s|\S)*?)\[\/font\]/gi,function(e,t,r){return'<span style="font-family:'+s(t)+'">'+r+"</span>"})}r=0;while(e.toLowerCase().indexOf("[size=")!=-1&&e.toLowerCase().indexOf("[/size]")!=-1&&r++<20){e=e.replace(/\[size=((?:\s|\S)*?)\]((?:\s|\S)*?)\[\/size\]/gi,function(e,t,r){return'<span style="font-size:'+s(t)+'">'+r+"</span>"})}if(this.parseAlign){e=e.replace(/\[(center|left|right|justify)\]/gi,function(e,t){return'<div style="text-align:'+s(t)+'">'});e=e.replace(/\[\/(center|left|right|justify)\]/gi,"</div>")}if(e.toLowerCase().indexOf("[/video]")!=-1){e=e.replace(/\[video((?:\s|\S)*?)\]((?:\s|\S)*?)\[\/video\]/gi,function(e,r,i){return t.GetVideoSourse(i,t.FetchVideoParams(r.trim(r)),e)})}e=e.replace(/\n/gi,"<br />");e=e.replace(/&#91;/gi,"[");e=e.replace(/&#93;/gi,"]");if(a.length>0){e=e.replace(/#BX_CODE(\d+)#/gi,function(e,t){return a[t]||e})}return e},GetNodeHtml:function(e,t){var r={node:e},i="";if(!t){if(e.nodeType==3){var s=BX.util.htmlspecialchars(e.nodeValue);if(!s.match(/[^\n]+/gi)&&e.previousSibling&&e.nextSibling&&this.editor.util.IsBlockNode(e.previousSibling)&&this.editor.util.IsBlockNode(e.nextSibling)){return"\n"}if(BX.browser.IsChrome()&&this.editor.pasteHandleMode&&e.nextSibling&&e.nextSibling.nodeName=="P"){s=s.replace(/\n+/gi,"\n")}if(e.parentNode&&!e.parentNode.getAttribute("data-bx-parent-node")&&BX.util.in_array(e.parentNode.nodeName,["P","DIV","SPAN","TD","TH","B","STRONG","I","EM","U","DEL","S","STRIKE","BLOCKQUOTE"])){s=s.replace(/\n/gi," ")}if(BX.browser.IsMac()||BX.browser.IsFirefox()){s=s.replace(/\n/gi," ")}s=s.replace(/\[/gi,"&#91;");s=s.replace(/\]/gi,"&#93;");return s}if(e.nodeType==1&&e.nodeName=="P"){var a=BX.util.trim(e.innerHTML);a=a.replace(/[\n\r\s]/gi,"").toLowerCase();if(a=="<br>"){e.innerHTML=""}}var n=this.UnParseNodeBB(r);if(n!==false){return n}if(r.bbOnlyChild)t=true;if(!t){if(r.breakLineBefore){i+="\n"}if(e.nodeType==1&&!r.hide){i+="["+r.bbTag;if(r.bbValue){i+="="+r.bbValue}i+="]"}}}if(r.checkNodeAgain){i+=this.GetNodeHtml(e)}else{var o,l,d="";for(o=0;o<e.childNodes.length;o++){l=e.childNodes[o];d+=this.GetNodeHtml(l)}i+=d}if(!t){if(r.breakLineAfter)i+="\n";if(d==""&&this.IsPairNode(r.bbTag)&&e.nodeName!=="P"&&e.nodeName!=="TD"&&e.nodeName!=="TR"&&e.nodeName!=="TH"){return""}if(e.nodeType==1&&(e.childNodes.length>0||this.IsPairNode(r.bbTag))&&!r.hide&&!r.hideRight){i+="[/"+r.bbTag+"]"}if(BX.browser.IsFirefox()&&this.editor.util.IsBlockNode(e)&&BX.util.trim(e.innerHTML.replace(/\uFEFF/gi,"")).toLowerCase()=="<br>"){return"\n"}if(r.breakLineAfterEnd||e.nodeType==1&&this.editor.util.IsBlockNode(e)&&this.editor.util.IsBlockNode(this.editor.util.GetNextSibling(e))){i+="\n"}}return i},UnParseNodeBB:function(e){var t,r,i,s=e.node.nodeName.toUpperCase();e.checkNodeAgain=false;if(s=="BR"){return"#BR#"}if(e.node&&e.node.id){t=this.editor.GetBxTag(e.node.id);if(t.tag){var a=this.editor.parser.specialParsers[t.tag];if(a&&a.UnParse){return a.UnParse(t,e,this.editor)}else if(t.tag=="video"){return t.params.value}else if(t.tag=="smile"){return t.params.code}else{return""}}}if(s=="SCRIPT"){return""}if(s=="IFRAME"&&e.node.src){var n=e.node.src.replace(/https?:\/\//gi,"//"),o=this.editor.phpParser.CheckForVideo('src="'+n+'"');if(o){var l=parseInt(e.node.width),d=parseInt(e.node.height);return"[VIDEO TYPE="+o.provider.toUpperCase()+" WIDTH="+l+" HEIGHT="+d+"]"+n+"[/VIDEO]"}}if(s=="PRE"&&BX.hasClass(e.node,"bxhtmled-code")){return"[CODE]"+this.GetCodeContent(e.node)+"[/CODE]"}if(s=="IMG"){var u="";if(e.node.style.width)u+=" WIDTH="+parseInt(e.node.style.width);else if(e.node.width)u+=" WIDTH="+parseInt(e.node.width);if(e.node.style.height)u+=" HEIGHT="+parseInt(e.node.style.height);else if(e.node.height)u+=" HEIGHT="+parseInt(e.node.height);return"[IMG"+u+"]"+e.node.src+"[/IMG]"}e.hide=false;e.bbTag=s;r=BX.util.in_array(s,this.editor.TABLE_TAGS);i=this.parseAlign&&(e.node.style.textAlign||e.node.align)&&!r;if(s=="STRONG"||s=="B"){e.bbTag="B"}else if(s=="EM"||s=="I"){e.bbTag="I"}else if(s=="DEL"||s=="S"){e.bbTag="S"}else if(s=="OL"||s=="UL"){e.bbTag="LIST";e.breakLineAfter=true;e.bbValue=s=="OL"?"1":""}else if(s=="LI"){if(e.node.lastChild&&e.node.lastChild.nodeName=="BR"){e.node.removeChild(e.node.lastChild)}e.bbTag="*";e.breakLineBefore=true;e.hideRight=true}else if(s=="A"){e.bbTag="URL";e.bbValue=this.editor.parser.GetAttributeEx(e.node,"href");e.bbValue=e.bbValue.replace(/\[/gi,"&#91;").replace(/\]/gi,"&#93;");if(e.bbValue===""){e.bbOnlyChild=true}}else if(e.node.style.color&&!r){e.bbTag="COLOR";e.bbValue=this.editor.util.RgbToHex(e.node.style.color);e.node.style.color="";if(e.node.style.cssText!=""){e.checkNodeAgain=true}}else if(e.node.style.fontFamily&&!r){e.bbTag="FONT";e.bbValue=e.node.style.fontFamily;e.node.style.fontFamily="";if(e.node.style.cssText!=""){e.checkNodeAgain=true}}else if(e.node.style.fontSize&&!r){e.bbTag="SIZE";e.bbValue=e.node.style.fontSize;e.node.style.fontSize="";if(e.node.style.cssText!=""){e.checkNodeAgain=true}}else if(s=="BLOCKQUOTE"&&e.node.className=="bxhtmled-quote"&&!e.node.getAttribute("data-bx-skip-check")){e.bbTag="QUOTE";e.breakLineAfterEnd=true;if(i){e.checkNodeAgain=true;e.node.setAttribute("data-bx-skip-check","Y")}}else if(i){var f=e.node.style.textAlign||e.node.align;if(BX.util.in_array(f,["left","right","center","justify"])){e.hide=false;e.bbTag=f.toUpperCase()}else{e.hide=!BX.util.in_array(s,this.editor.BBCODE_TAGS)}}else if(!BX.util.in_array(s,this.editor.BBCODE_TAGS)){e.hide=true}return false},IsPairNode:function(e){e=e.toUpperCase();return!(e.substr(0,1)=="H"||e=="BR"||e=="IMG"||e=="INPUT")},GetCodeContent:function(e){if(!e||this.editor.util.IsEmptyNode(e))return"";var t,r="";for(t=0;t<e.childNodes.length;t++){if(e.childNodes[t].nodeType==3)r+=e.childNodes[t].data;else if(e.childNodes[t].nodeType==1&&e.childNodes[t].nodeName=="BR")r+="#BR#";else r+=this.GetCodeContent(e.childNodes[t])}if(BX.browser.IsIE())r=r.replace(/\r/gi,"#BR#");else r=r.replace(/\n/gi,"#BR#");r=r.replace(/\[/gi,"&#91;");r=r.replace(/\]/gi,"&#93;");return r},GetVideoSourse:function(e,t,r,i){i=i||BX.message.BXEdVideoTitle;return this.editor.phpParser.GetVideoHTML({params:{width:t.width,height:t.height,title:i,origTitle:"",provider:t.type},html:r})},FetchVideoParams:function(e){e=BX.util.trim(e);var t=e.split(" "),r,i,s,a,n={width:180,height:100,type:false};for(r=0;r<t.length;r++){a=t[r].split("=");i=a[0].toLowerCase();s=a[1];if(i=="width"||i=="height"){s=parseInt(s,10);if(s&&!isNaN(s)){n[i]=Math.max(s,100)}}else if(i=="type"){s=s.toUpperCase();if(s=="YOUTUBE"||s=="RUTUBE"||s=="VIMEO"){n[i]=s}}}return n},FetchImageParams:function(e){e=BX.util.trim(e);var t=e.split(" "),r,i,s,a,n={};for(r=0;r<t.length;r++){a=t[r].split("=");i=a[0].toLowerCase();s=a[1];if(i=="width"||i=="height"){s=parseInt(s,10);if(s&&!isNaN(s)){n[i]=s}}}return n}};function i(e){this.editor=e;var t=["area","hr","i?frame","link","meta","noscript","style","table","tbody","thead","tfoot"],r=["li","dt","dd","h[1-6]","option","script"];this.reBefore=new RegExp("^<(/?"+t.join("|/?")+"|"+r.join("|")+")[ >]","i");this.reAfter=new RegExp("^<(br|/?"+t.join("|/?")+"|/"+r.join("|/")+")[ >]");var i=["blockquote","div","dl","fieldset","form","frameset","map","ol","p","pre","select","td","th","tr","ul"];this.reLevel=new RegExp("^</?("+i.join("|")+")[ >]");this.lastCode=null;this.lastResult=null}i.prototype={Format:function(e){if(e!=this.lastCode){this.lastCode=e;this.lastResult=this.DoFormat(e)}return this.lastResult},DoFormat:function(e){e+=" ";this.level=0;var t=this,r,i,s=0,a=null,n=null,o="",l="",d=0,u="";this.pieces={};e=e.replace(/<pre[\s\S]*?\/pre>/gi,function(e){t.pieces[d]=e;var r="#BX_CODE_PIECE_"+d+"#";d++;return r});for(r=0;r<e.length;r++){s=r;if(e.substr(r).indexOf("<")==-1){l+=e.substr(r);l=l.replace(/\n\s*\n/g,"\n");l=l.replace(/^[\s\n]*/,"");l=l.replace(/[\s\n]*$/,"");if(l.indexOf("\x3c!--noindex--\x3e")!==-1){l=l.replace(/(<!--noindex-->)(?:[\s|\n|\r|\t]*?)(<a[\s\S]*?\/a>)(?:[\s|\n|\r|\t]*?)(<!--\/noindex-->)(?:[\n|\r|\t]*)/gi,"$1$2$3")}l=l.replace(/#BX_CODE_PIECE_(\d+)#/g,function(e,r){return r&&t.pieces[r]?t.pieces[r]:e});return l}while(s<e.length&&e.charAt(s)!=="<"){s++}if(r!=s){u=e.substr(r,s-r);if(u.match(/^\s+$/)){u=u.replace(/\s+/g," ");l+=u}else{if(l.charAt(l.length-1)=="\n"){l+=this.GetTabs()}else if(u.charAt(0)=="\n"){l+="\n"+this.GetTabs();u=u.replace(/^\s+/,"")}u=u.replace(/\n/g," ");u=u.replace(/\n+/g,"");u=u.replace(/\s+/g," ");l+=u}if(u.match(/\n/)){l+="\n"+this.GetTabs()}}a=s;while(s<e.length&&e.charAt(s)!=">"){s++}o=e.substr(a,s-a);r=s;if(o.substr(1,3)==="!--"){if(!o.match(/--$/)){while(e.substr(s,3)!=="--\x3e"){s++}s+=2;o=e.substr(a,s-a);r=s}if(l.charAt(l.length-1)!=="\n"){l+="\n"}l+=this.GetTabs();l+=o+">\n"}else if(o[1]==="!"){l=this.PutTag(o+">",l)}else if(o[1]=="?"){l+=o+">\n"}else if(i=o.match(/^<(script|style)/i)){i[1]=i[1].toLowerCase();l=this.PutTag(this.CleanTag(o),l);n=String(e.substr(r+1)).toLowerCase().indexOf("</"+i[1]);if(n){u=e.substr(r+1,n);r+=n;l+=u}}else{l=this.PutTag(this.CleanTag(o),l)}}e=e.replace(/#BX_CODE_PIECE_(\d+)#/g,function(e,r){return r&&t.pieces[r]?t.pieces[r]:e});return e},GetTabs:function(){var e="",t;for(t=0;t<this.level;t++){e+="\t"}return e},CleanTag:function(e){var t,r=/\s*([^= ]+)(?:=((['"']).*?\3|[^ ]+))?/,i="",s="";e=e.replace(/\n/g," ");e=e.replace(/[\s]{2,}/g," ");e=e.replace(/^\s+|\s+$/g," ");if(e.match(/\/$/)){s="/";e=e.replace(/\/+$/,"")}while(t=r.exec(e)){if(t[2])i+=t[1]+"="+t[2];else if(t[1])i+=t[1];i+=" ";e=e.substr(t[0].length)}return i.replace(/\s*$/,"")+s+">"},PutTag:function(e,t){var r=e.match(this.reLevel);if(e.match(this.reBefore)||r){t=t.replace(/\s*$/,"");t+="\n"}if(r&&e.charAt(1)=="/"){this.level--}if(t.charAt(t.length-1)=="\n"){t+=this.GetTabs()}if(r&&"/"!=e.charAt(1)){this.level++}t+=e;if(e.match(this.reAfter)||e.match(this.reLevel)){t=t.replace(/ *$/,"");t+="\n"}return t}};function s(){window.BXHtmlEditor.BXCodeFormatter=i;window.BXHtmlEditor.BXEditorParser=e;window.BXHtmlEditor.BXEditorPhpParser=t;window.BXHtmlEditor.BXEditorBbCodeParser=r}if(window.BXHtmlEditor){s()}else{BX.addCustomEvent(window,"OnBXHtmlEditorInit",s)}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:68:"/bitrix/js/fileman/html_editor/html-base-controls.js?159569187898161";s:6:"source";s:52:"/bitrix/js/fileman/html_editor/html-base-controls.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/**
 * Bitrix HTML Editor 3.0
 * Date: 24.04.13
 * Time: 4:23
 *
 * Taskbarmanager
 * Taskbar
 * Context Menu
 * Search/Replace
 */
;(function() {
	function TaskbarManager(editor, init)
	{
		this.editor = editor;
		this.bShown = false;
		this.closedWidth = 20;
		this.MIN_CLOSED_WIDTH = 120;
		this.width = this.editor.config.taskbarWidth || 250;
		this.taskbars = {};
		this.freezeOnclickHandler = false;

		if (init)
		{
			this.Init();
		}
	}

	TaskbarManager.prototype = {
		Init: function()
		{
			this.pCont = this.editor.dom.taskbarCont;
			this.pCont.setAttribute('data-bx-type', 'taskbarmanager');

			this.pResizer = BX('bx-html-editor-tskbr-res-' + this.editor.id);
			this.pResizer.setAttribute('data-bx-type', 'taskbarflip');
			this.pTopCont = BX('bx-html-editor-tskbr-top-' + this.editor.id);

			BX.bind(this.pResizer, 'mousedown', BX.proxy(this.StartResize, this));
			BX.bind(this.pCont, 'click', BX.proxy(this.OnClick, this));

			// Search
			this.pSearchCont = BX('bxhed-tskbr-search-cnt-' + this.editor.id);
			this.pSearchAli = BX('bxhed-tskbr-search-ali-' + this.editor.id);
			this.pSearchInput = BX('bxhed-tskbr-search-inp-' + this.editor.id);
			this.pSearchNothingNotice = BX('bxhed-tskbr-search-nothing-' + this.editor.id);
			BX.bind(this.pSearchInput, 'keyup', BX.proxy(this.TaskbarSearch, this));
		},

		OnClick: function(e)
		{
			if (!e)
				e = window.event;

			if (this.freezeOnclickHandler)
				return;

			var
				_this = this,
				target = e.target || e.srcElement,
				type = (target && target.getAttribute) ? target.getAttribute('data-bx-type') : null;

			if (!type)
			{
				target = BX.findParent(target, function(node)
				{
					return node == _this.pCont || (node.getAttribute && node.getAttribute('data-bx-type'));
				}, this.pCont);
				type = (target && target.getAttribute) ? target.getAttribute('data-bx-type') : null;
			}

			if (type == 'taskbarflip' || (!this.bShown && (type == 'taskbarmanager' || !type)))
			{
				if (this.bShown)
				{
					this.Hide();
				}
				else
				{
					this.Show();
				}
			}
			else if(type == 'taskbargroup_title')
			{
				BX.onCustomEvent(this, 'taskbargroupTitleClick', [target]);
			}
			else if(type == 'taskbarelement')
			{
				BX.onCustomEvent(this, 'taskbarelementClick', [target]);
			}
			else if(type == 'taskbar_title_but')
			{
				BX.onCustomEvent(this, 'taskbarTitleClick', [target]);
			}
			else if(type == 'taskbar_top_menu')
			{
				BX.onCustomEvent(this, 'taskbarMenuClick', [target]);
			}
			else if(type == 'taskbar_search_cancel')
			{
				this.pSearchInput.value = '';
				this.TaskbarSearch();
			}
		},

		Show: function(saveValue)
		{
			if (!this.bShown)
			{
				this.bShown = true;
				this.pCont.className = 'bxhtmled-taskbar-cnt bxhtmled-taskbar-shown';
			}
			this.pCont.style.width = this.GetWidth(true) + 'px';
			this.editor.ResizeSceleton();

			if (saveValue !== false)
			{
				this.editor.SaveOption('taskbar_shown', 1);
			}
		},

		Hide: function(saveValue)
		{
			if (this.bShown)
			{
				this.bShown = false;
				this.pCont.className = 'bxhtmled-taskbar-cnt bxhtmled-taskbar-hidden';
			}
			this.pCont.style.width = this.GetWidth() + 'px';
			this.editor.ResizeSceleton();

			if (saveValue !== false)
			{
				this.editor.SaveOption('taskbar_shown', 0);
			}
		},

		GetWidth: function(bCheck, maxWidth)
		{
			var width;
			if (this.bShown)
			{
				width = bCheck ? Math.max(this.width, this.closedWidth + this.MIN_CLOSED_WIDTH) : this.width;
				if(maxWidth && width > maxWidth)
				{
					width = this.width = Math.round(maxWidth);
				}
			}
			else
			{
				width = this.closedWidth;
			}

			return width;
		},

		AddTaskbar: function(oTaskbar)
		{
			this.taskbars[oTaskbar.id] = oTaskbar;
			this.pCont.appendChild(oTaskbar.GetCont());
			this.pTopCont.appendChild(oTaskbar.GetTitleCont());
		},

		ShowTaskbar: function(taskbarId)
		{
			this.pSearchInput.value = '';
			for(var id in this.taskbars)
			{
				if (this.taskbars.hasOwnProperty(id))
				{
					if (id == taskbarId)
					{
						this.taskbars[id].Activate();
						this.pSearchInput.placeholder = this.taskbars[id].searchPlaceholder;
					}
					else
					{
						this.taskbars[id].Deactivate();
					}

					this.activeTaskbarId = taskbarId;
					this.taskbars[id].ClearSearchResult();
				}
			}
		},

		GetActiveTaskbar: function()
		{
			return this.taskbars[this.activeTaskbarId];
		},

		StartResize: function(e)
		{
			if(!e)
				e = window.event;

			var target = e.target || e.srcElement;
			if (target.getAttribute('data-bx-tsk-split-but') == 'Y')
				return true;

			this.freezeOnclickHandler = true;

			var
				width = this.GetWidth(),
				overlay = this.editor.dom.resizerOverlay,
				dX = 0, newWidth,
				windowScroll = BX.GetWindowScrollPos(),
				startX = e.clientX + windowScroll.scrollLeft,
				_this = this;

			overlay.style.display = 'block';

			function moveResizer(e, bFinish)
			{
				if(!e)
					e = window.event;

				var x = e.clientX + windowScroll.scrollLeft;

				if(startX == x)
					return;

				dX = startX - x;
				newWidth = width + dX;

				if (bFinish)
				{
					_this.width = Math.max(newWidth, _this.closedWidth + _this.MIN_CLOSED_WIDTH);
					if (isNaN(_this.width))
					{
						_this.width = _this.closedWidth + _this.MIN_CLOSED_WIDTH;
					}
				}
				else
				{
					_this.width = newWidth;
				}

				if (newWidth > _this.closedWidth + (bFinish ? 20 : 0))
				{
					_this.Show();
				}
				else
				{
					_this.Hide();
				}
			}

			function finishResizing(e)
			{
				moveResizer(e, true);
				BX.unbind(document, 'mousemove', moveResizer);
				BX.unbind(document, 'mouseup', finishResizing);
				overlay.style.display = 'none';
				setTimeout(function(){_this.freezeOnclickHandler = false;}, 10);
				BX.PreventDefault(e);

				_this.editor.SaveOption('taskbar_width', _this.GetWidth(true));
			}

			BX.bind(document, 'mousemove', moveResizer);
			BX.bind(document, 'mouseup', finishResizing);
		},

		Resize: function(w, h)
		{
			var topHeight = parseInt(this.pTopCont.offsetHeight, 10);
			for(var id in this.taskbars)
			{
				if (this.taskbars.hasOwnProperty(id) && this.taskbars[id].pTreeCont)
				{
					this.taskbars[id].pTreeCont.style.height = (h - topHeight - 42) + 'px';
				}
			}

			this.pSearchCont.style.width = w + 'px';
			if (!BX.browser.IsDoctype())
			{
				this.pSearchAli.style.width = (w - 20) + 'px';
			}

			var _this = this;
			if (this.resizeTimeout)
			{
				this.resizeTimeout = clearTimeout(this.resizeTimeout);
			}

			this.resizeTimeout = setTimeout(function()
			{
				if (parseInt(_this.pTopCont.offsetHeight, 10) !== topHeight)
				{
					_this.Resize(w, h);
				}
			}, 100);
		},

		TaskbarSearch: function(e)
		{
			var
				taskbar = this.GetActiveTaskbar(),
				value = this.pSearchInput.value;

			if (e && e.keyCode == this.editor.KEY_CODES['escape'])
			{
				value = this.pSearchInput.value = '';
			}

			if (value.length < 2)
			{
				taskbar.ClearSearchResult();
			}
			else
			{
				taskbar.Search(value);
			}
		}
	};


	/*
	 *
	 *
	 * */
	function Taskbar(editor)
	{
		this.editor = editor;
		this.manager = this.editor.taskbarManager;
		this.searchIndex = [];
		this._searchResult = [];
		this._searchResultSect = [];

		BX.addCustomEvent(this.manager, 'taskbargroupTitleClick', BX.proxy(this.OnGroupTitleClick, this));
		BX.addCustomEvent(this.manager, 'taskbarelementClick', BX.proxy(this.OnElementClick, this));
		BX.addCustomEvent(this.manager, 'taskbarTitleClick', BX.proxy(this.OnTitleClick, this));
		BX.addCustomEvent(this.manager, 'taskbarMenuClick', BX.proxy(this.OnMenuClick, this));
	}

	Taskbar.prototype = {
		GetCont: function()
		{
			return this.pTreeCont;
		},

		GetTitleCont: function()
		{
			return this.pTitleCont;
		},

		BuildSceleton: function()
		{
			// Build title & menu
			this.pTitleCont = BX.create("span", {props: {className: "bxhtmled-split-btn"},html: '<span class="bxhtmled-split-btn-l"><span class="bxhtmled-split-btn-bg">' + this.title + '</span></span><span class="bxhtmled-split-btn-r"><span data-bx-type="taskbar_top_menu" data-bx-taskbar="' + this.id + '" class="bxhtmled-split-btn-bg"></span></span>'});
			this.pTitleCont.setAttribute('data-bx-type', 'taskbar_title_but');
			this.pTitleCont.setAttribute('data-bx-taskbar', this.id);

			this.pTreeCont = BX.create("DIV", {props: {className: "bxhtmled-taskbar-tree-cont"}});
			this.pTreeInnerCont = this.pTreeCont.appendChild(BX.create("DIV", {props: {className: "bxhtmled-taskbar-tree-inner-cont"}}));
		},

		BuildTree: function(sections, elements)
		{
			BX.cleanNode(this.pTreeCont);
			this.treeSectionIndex = {};
			this.BuildTreeSections(sections);
			this.BuildTreeElements(elements);
		},

		BuildTreeSections: function(sections)
		{
			this.sections = [];
			for (var i = 0; i < sections.length; i++)
			{
				this.BuildSection(sections[i]);
			}
		},

		GetSectionsTreeInfo: function()
		{
			return this.sections;
		},

		BuildSection: function(section)
		{
			var
				parentCont = this.GetSectionContByPath(section.path),
				pGroup = BX.create("DIV", {props: {className: "bxhtmled-tskbr-sect-outer"}}),
				pGroupTitle = pGroup.appendChild(BX.create("DIV", {props: {className: "bxhtmled-tskbr-sect"}})),
				icon = pGroupTitle.appendChild(BX.create("SPAN", {props: {className: "bxhtmled-tskbr-sect-icon"}})),
				title = pGroupTitle.appendChild(BX.create("SPAN", {props: {className: "bxhtmled-tskbr-sect-title"}, text: section.title || section.name})),
				childCont = pGroup.appendChild(BX.create("DIV", {props: {className: "bxhtmled-tskb-child"}})),
				elementsCont = pGroup.appendChild(BX.create("DIV", {props: {className: "bxhtmled-tskb-child-elements"}}));

			var key = section.path == '' ? section.name : section.path + ',' + section.name;
			var depth = section.path == '' ? 0 : 1; // Todo....

			var sect = {
				key: key,
				children: [],
				section: section
			}

			this.treeSectionIndex[key] = {
				icon: icon,
				outerCont: pGroup,
				cont: pGroupTitle,
				childCont: childCont,
				elementsCont: elementsCont,
				sect: sect
			};

			this.GetSectionByPath(section.path).push(sect);

			if (depth > 0)
			{
				BX.addClass(pGroupTitle, "bxhtmled-tskbr-sect-" + depth);
				BX.addClass(icon, "bxhtmled-tskbr-sect-icon-" + depth);
			}

			pGroupTitle.setAttribute('data-bx-type', 'taskbargroup_title');
			pGroupTitle.setAttribute('data-bx-taskbar', this.id);

			pGroup.setAttribute('data-bx-type', 'taskbargroup');
			pGroup.setAttribute('data-bx-path', key);
			pGroup.setAttribute('data-bx-taskbar', this.id);

			parentCont.appendChild(pGroup);
		},

		BuildTreeElements: function(elements)
		{
			this.elements = elements;
			for (var i in elements)
			{
				if (elements.hasOwnProperty(i))
				{
					this.BuildElement(elements[i]);
				}
			}
		},

		BuildElement: function(element)
		{
			var
				_this = this,
				parentCont = this.GetSectionContByPath(element.key || element.path, true),
				pElement = BX.create("DIV", {props: {className: "bxhtmled-tskbr-element"}, html: '<span class="bxhtmled-tskbr-element-icon"></span><span class="bxhtmled-tskbr-element-text">' + element.title + '</span>'});

			var dd = pElement.appendChild(BX.create("IMG", {props: {
				src: this.editor.util.GetEmptyImage(),
				className: "bxhtmled-drag"
			}}));

			this.HandleElementEx(pElement, dd, element);

			this.searchIndex.push({
				content: (element.title + ' ' + element.name).toLowerCase(),
				element: pElement
			});

			dd.onmousedown = function (e)
			{
				if (!e)
				{
					e = window.event;
				}

				var
					target = e.target || e.srcElement,
					bxTag = _this.editor.GetBxTag(target);

				return _this.OnElementMouseDownEx(e, target, bxTag);
			};

			dd.ondblclick = function(e)
			{
				var
					target = e.target || e.srcElement,
					bxTag = _this.editor.GetBxTag(target);

				return _this.OnElementDoubleClick(e, target, bxTag);
			};

			dd.ondragend = function (e)
			{
				if (!e)
				{
					e = window.event;
				}
				_this.OnDragEndHandler(e, this);
			};

			pElement.setAttribute('data-bx-type', 'taskbarelement');

			parentCont.appendChild(pElement);
		},

		HandleElementEx: function(dd)
		{

		},

		GetSectionContByPath: function(path, bElement)
		{
			if (path == '' || !this.treeSectionIndex[path])
			{
				return this.pTreeCont;
			}
			else
			{
				return bElement ? this.treeSectionIndex[path].elementsCont : this.treeSectionIndex[path].childCont;
			}
		},

		GetSectionByPath: function(path)
		{
			if (path == '' || !this.treeSectionIndex[path])
			{
				return this.sections;
			}
			else
			{
				return this.treeSectionIndex[path].sect.children;
			}
		},

		// Open or close
		ToggleGroup: function(cont, bOpen)
		{
			// TODO: animation
			var path = cont.getAttribute('data-bx-path');
			if (path)
			{
				var group = this.treeSectionIndex[path];
				if (!group)
				{
					return;
				}

				if (bOpen !== undefined)
				{
					group.opened = !bOpen;
				}

				if (group.opened)
				{
					BX.removeClass(group.cont, 'bxhtmled-tskbr-sect-open');
					BX.removeClass(group.icon, 'bxhtmled-tskbr-sect-icon-open');
					BX.removeClass(group.outerCont, 'bxhtmled-tskbr-sect-outer-open');
					group.childCont.style.display = 'none';
					group.elementsCont.style.display = 'none';
					group.opened = false;
				}
				else
				{
					BX.addClass(group.cont, 'bxhtmled-tskbr-sect-open');
					BX.addClass(group.icon, 'bxhtmled-tskbr-sect-icon-open');
					BX.addClass(group.outerCont, 'bxhtmled-tskbr-sect-outer-open');
					group.childCont.style.display = 'block';
					group.elementsCont.style.display = group.elementsCont.childNodes.length > 0 ? 'block' : 'none';
					group.opened = true;
				}
			}
		},

		OnDragEndHandler: function(e, node)
		{
			var _this = this;
			this.editor.skipPasteHandler = true;
			this.editor.skipPasteControl = true;

			if (this.editor.iframeView.pasteHandlerTimeout)
				this.editor.iframeView.pasteHandlerTimeout = clearTimeout(this.editor.iframeView.pasteHandlerTimeout);

			setTimeout(function()
			{
				var dd = _this.editor.GetIframeElement(node.id);
				if (dd && dd.parentNode)
				{
					var sur = _this.editor.util.CheckSurrogateNode(dd.parentNode);
					if (sur)
					{
						_this.editor.util.InsertAfter(dd, sur);
					}
				}
				_this.editor.synchro.FullSyncFromIframe();

				_this.editor.skipPasteHandler = false;
				_this.editor.skipPasteControl = false;
			}, 20);
		},

		OnElementMouseDownEx: function(e)
		{
			return true;
		},

		OnElementClick: function(e)
		{
			this.OnElementClickEx();
			return true;
		},

		OnElementClickEx: function()
		{
			return true;
		},

		OnElementDoubleClick: function(e, target, bxTag)
		{
			if (target)
			{
				var dd = target.cloneNode(true);
				this.editor.Focus();
				this.editor.selection.InsertNode(dd);
				this.editor.synchro.FullSyncFromIframe();
			}
		},

		OnGroupTitleClick: function(pElement)
		{
			if (pElement && pElement.getAttribute('data-bx-taskbar') == this.id)
			{
				return this.ToggleGroup(pElement.parentNode);
			}
			return true;
		},

		OnTitleClick: function(pElement)
		{
			if (pElement && pElement.getAttribute('data-bx-taskbar') == this.id)
			{
				return this.manager.ShowTaskbar(this.id);
			}
			return true;
		},

		OnMenuClick: function(pElement)
		{
			if (pElement && pElement.getAttribute('data-bx-taskbar') == this.id)
				return this.ShowMenu(pElement);
			return true;
		},

		Activate: function()
		{
			this.pTreeCont.style.display = 'block';
			this.bActive = true;
			return true;
		},

		Deactivate: function()
		{
			this.pTreeCont.style.display = 'none';
			this.bActive = false;
			return true;
		},

		IsActive: function()
		{
			return !!this.bActive;
		},

		ShowMenu: function(pElement)
		{
			var arItems = this.GetMenuItems();
			BX.PopupMenu.destroy(this.uniqueId + "_menu");
			BX.PopupMenu.show(this.uniqueId + "_menu", pElement, arItems, {
					overlay: {opacity: 0.1},
					events: {
						onPopupClose: function(){BX.removeClass(this.bindElement, "bxec-add-more-over");}
					},
					offsetLeft: 1,
					zIndex: 3005
				}
			);
			return true;
		},

		GetMenuItems: function()
		{
			return [];
		},

		Search: function(value)
		{
			this.ClearSearchResult();
			var
				bFoundItems = false,
				pSect, el,
				i, l = this.searchIndex.length;

			value = BX.util.trim(value.toLowerCase());

			BX.addClass(this.pTreeCont, 'bxhtmled-taskbar-tree-cont-search');
			BX.addClass(this.manager.pSearchCont, 'bxhtmled-search-cont-res');

			for(i = 0; i < l; i++)
			{
				el = this.searchIndex[i];
				if (el.content.indexOf(value) !== -1) // Show element
				{
					bFoundItems = true;
					BX.addClass(el.element, 'bxhtmled-tskbr-search-res');
					this._searchResult.push(el.element);

					pSect = BX.findParent(el.element, function(node)
					{
						return node.getAttribute && node.getAttribute('data-bx-type') == 'taskbargroup';
					}, this.pTreeCont);

					while (pSect)
					{
						BX.addClass(pSect, 'bxhtmled-tskbr-search-res');
						this.ToggleGroup(pSect, true);
						this._searchResultSect.push(pSect);

						pSect = BX.findParent(pSect, function(node)
						{
							return node.getAttribute && node.getAttribute('data-bx-type') == 'taskbargroup';
						}, this.pTreeCont);
					}
				}
			}

			if (!bFoundItems)
			{
				this.manager.pSearchNothingNotice.style.display = 'block';
			}
		},

		ClearSearchResult: function()
		{
			BX.removeClass(this.pTreeCont, 'bxhtmled-taskbar-tree-cont-search');
			BX.removeClass(this.manager.pSearchCont, 'bxhtmled-search-cont-res');
			this.manager.pSearchNothingNotice.style.display = 'none';
			var i;
			if (this._searchResult)
			{
				for(i = 0; i < this._searchResult.length; i++)
				{
					BX.removeClass(this._searchResult[i], 'bxhtmled-tskbr-search-res');
				}
				this._searchResult = [];
			}
			if (this._searchResultSect)
			{
				for(i = 0; i < this._searchResultSect.length; i++)
				{
					BX.removeClass(this._searchResultSect[i], 'bxhtmled-tskbr-search-res');
					this.ToggleGroup(this._searchResultSect[i], false);
				}
				this._searchResultSect = [];
			}
		},

		GetId: function()
		{
			return this.id;
		}
	};

	function ComponentsControl(editor)
	{
		// Call parrent constructor
		ComponentsControl.superclass.constructor.apply(this, arguments);

		this.id = 'components';
		this.title = BX.message('ComponentsTitle');
		this.templateId = this.editor.templateId;
		this.uniqueId = 'taskbar_' + this.editor.id + '_' + this.id;
		this.searchPlaceholder = BX.message('BXEdCompSearchPlaceHolder');

		this.Init();
	}

	BX.extend(ComponentsControl, Taskbar);

	ComponentsControl.prototype.Init = function()
	{
		this.BuildSceleton();
		// Build structure
		var list = this.editor.components.GetList();
		this.BuildTree(list.groups, list.items);
	};

	ComponentsControl.prototype.HandleElementEx = function(wrap, dd, params)
	{
		this.editor.SetBxTag(dd, {tag: "component_icon", params: params});
		if (params.complex == "Y")
		{
			params.className = 'bxhtmled-surrogate-green';
			BX.addClass(wrap, 'bxhtmled-tskbr-element-green');
			wrap.title = BX.message('BXEdComplexComp');
		}
	};

	ComponentsControl.prototype.OnElementMouseDownEx = function(e, target, bxTag)
	{
		if (!bxTag || bxTag.tag !== 'component_icon')
		{
			return false;
		}

		this.editor.components.LoadParamsList({
			name: bxTag.params.name
		});
	};

	ComponentsControl.prototype.GetMenuItems = function()
	{
		var _this = this;
		return [
			{
				text : BX.message('RefreshTaskbar'),
				title : BX.message('RefreshTaskbar'),
				className : "",
				onclick: function()
				{
					_this.editor.componentsTaskbar.ClearSearchResult();
					_this.editor.components.ReloadList();
					BX.PopupMenu.destroy(_this.uniqueId + "_menu");
				}
			}
		];
	};

	// Editor dialog
	function Dialog(editor, params)
	{
		this.editor = editor;
		this.id = params.id;
		this.params = params;
		this.className = "bxhtmled-dialog" + (params.className ? ' ' + params.className : '');
		this.zIndex = params.zIndex || 3008;
		this.firstFocus = false;
		this.Init();
	}

	Dialog.prototype = {
		Init: function()
		{
			var
				_this = this,
				config = {
					title : this.params.title || this.params.name || '',
					width: this.params.width || 600,
					resizable: false
				};

			if (this.params.resizable)
			{
				config.resizable = true;
				config.min_width = this.params.min_width || 400;
				config.min_height = this.params.min_height || 250;
				config.resize_id = this.params.resize_id || this.params.id + '_res';
			}

			this.oDialog = new BX.CDialog(config);
			config.height = this.params.height || false;

			BX.addCustomEvent(this.oDialog, 'onWindowResize', BX.proxy(this.OnResize, this));
			BX.addCustomEvent(this.oDialog, 'onWindowResizeFinished', BX.proxy(this.OnResizeFinished, this));
			BX.addClass(this.oDialog.PARTS.CONTENT, this.className);

			// Clear dialog height for auto resizing
			if (!config.height)
			{
				this.oDialog.PARTS.CONTENT_DATA.style.height = null;
			}

			// Buttons
			this.oDialog.SetButtons([
				new BX.CWindowButton(
					{
						title: BX.message('DialogSave'),
						className: 'adm-btn-save',
						action: function()
						{
							BX.onCustomEvent(_this, "OnDialogSave");
							_this.oDialog.Close();
						}
					}),
				this.oDialog.btnCancel
			]);

			BX.addCustomEvent(this.oDialog, 'onWindowUnRegister', function()
			{
				BX.unbind(window, "keydown", BX.proxy(_this.OnKeyDown, _this));
				_this.dialogShownTimeout = setTimeout(function(){_this.editor.dialogShown = false;}, 300);
				_this.RestoreWindowOverflow();
			});
		},

		Show: function()
		{
			var _this = this;
			this.editor.dialogShown = true;
			if (this.dialogShownTimeout)
			{
				this.dialogShownTimeout = clearTimeout(this.dialogShownTimeout);
			}
			this.oDialog.Show();
			this.oDialog.DIV.style.zIndex = this.zIndex;
			this.oDialog.OVERLAY.style.zIndex = this.zIndex - 2;
			var
				top = parseInt(this.oDialog.DIV.style.top) - 180,
				scrollPos = BX.GetWindowScrollPos(document),
				scrollTop = scrollPos.scrollTop,
				minTop = scrollTop + 50;

			this.oDialog.DIV.style.top = (top > minTop ? top : minTop) + 'px';
			BX.bind(window, "keydown", BX.proxy(this.OnKeyDown, this));

			this.savedBodyOverflow = this.savedScrollLeft = this.savedScrollTop = false;

			setTimeout(function()
				{
					// Hack for Opera
					if (BX.browser.IsOpera())
						_this.oDialog.Move(1, 1);

					_this.oDialog.__resizeOverlay();

					if (_this.firstFocus)
					{
						BX.focus(_this.firstFocus);
						if (_this.selectFirstFocus)
							_this.firstFocus.select();
					}
				},
				100
			);
		},

		BuildTabControl: function(pCont, arTabs)
		{
			var
				i,
				pTabsWrap = BX.create('DIV', {props: {className: 'bxhtmled-dlg-tabs-wrap'}}),
				pContWrap = BX.create('DIV', {props: {className: 'bxhtmled-dlg-cont-wrap'}});

			for (i = 0; i < arTabs.length; i++)
			{
				arTabs[i].tab = pTabsWrap.appendChild(BX.create('SPAN', {props: {className: 'bxhtmled-dlg-tab' + (i == 0 ? ' bxhtmled-dlg-tab-active' : '')}, attrs: {'data-bx-dlg-tab-ind': i.toString()}, text: arTabs[i].name}));
				arTabs[i].cont = pContWrap.appendChild(BX.create('DIV', {props: {className: 'bxhtmled-dlg-cont'}, style: {'display' : i == 0 ? '' : 'none'}}));
			}

			BX.bind(pTabsWrap, 'click', function(e)
			{
				var
					ind,
					target = e.target || e.srcElement;

				if (target && target.getAttribute)
				{
					ind = parseInt(target.getAttribute('data-bx-dlg-tab-ind'));
					if (!isNaN(ind))
					{
						for (i = 0; i < arTabs.length; i++)
						{
							if (i == ind)
							{
								arTabs[i].cont.style.display = '';
								BX.addClass(arTabs[i].tab, 'bxhtmled-dlg-tab-active');
							}
							else
							{
								arTabs[i].cont.style.display = 'none';
								BX.removeClass(arTabs[i].tab, 'bxhtmled-dlg-tab-active');
							}
						}
					}
				}
			});

			pCont.appendChild(pTabsWrap);
			pCont.appendChild(pContWrap);

			return {
				cont: pCont,
				tabsWrap : pTabsWrap,
				contWrap : pContWrap,
				tabs: arTabs
			};
		},

		OnKeyDown: function(e)
		{
			if (e.keyCode == 13 && this.closeByEnter !== false)
			{
				var target = e.target || e.srcElement;
				if (target && target.nodeName !== 'TEXTAREA')
				{
					this.oDialog.PARAMS.buttons[0].emulate();
				}
			}
		},

		SetContent: function(html)
		{
			return this.oDialog.SetContent(html);
		},

		SetTitle: function(title)
		{
			return this.oDialog.SetTitle(title);
		},

		OnResize: function()
		{
		},

		OnResizeFinished: function()
		{
		},

		GetContentSize: function()
		{
			return {
				width : this.oDialog.PARTS.CONTENT_DATA.offsetWidth,
				height : this.oDialog.PARTS.CONTENT_DATA.offsetHeight
			};
		},

		Save: function()
		{
			if (this.savedRange)
			{
				this.editor.selection.SetBookmark(this.savedRange);
			}

			if (this.action && this.editor.action.IsSupported(this.action))
			{
				this.editor.action.Exec(this.action, this.GetValues());
			}
		},

		Close: function()
		{
			if (this.IsOpen())
			{
				this.oDialog.Close();
			}
		},

		IsOpen: function()
		{
			return this.oDialog.isOpen;
		},

		DisableKeyCheck: function()
		{
			this.closeByEnter = false;
			BX.WindowManager.disableKeyCheck();
		},

		EnableKeyCheck: function()
		{
			var _this = this;
			setTimeout(function()
			{
				_this.closeByEnter = true;
				BX.WindowManager.enableKeyCheck();
			}, 200);
		},

		AddTableRow: function (tbl, firstCell)
		{
			var r, c1, c2;

			r = tbl.insertRow(-1);
			c1 = r.insertCell(-1);
			c1.className = 'bxhtmled-left-c';

			if (firstCell && firstCell.label)
			{
				c1.appendChild(BX.create('LABEL', {props: {className: firstCell.required ? 'bxhtmled-req' : ''}, text: firstCell.label})).setAttribute('for', firstCell.id);
			}

			c2 = r.insertCell(-1);
			c2.className = 'bxhtmled-right-c';
			return {row: r, leftCell: c1, rightCell: c2};
		},

		SetValues: BX.DoNothing,
		GetValues: BX.DoNothing,

		CheckSize: function(timeout)
		{
			var _this = this;

			if (this.checkSizeTimeout)
				this.checkSizeTimeout = clearTimeout(this.checkSizeTimeout);

			if (timeout !== true)
			{
				this.checkSizeTimeout = setTimeout(function()
				{
					_this.CheckSize(true);
				}, 50);
				return;
			}

			var
				innerSize = BX.GetWindowInnerSize(document),
				dialogBottom = this.oDialog.DIV.offsetHeight + 50;

			if (dialogBottom >= innerSize.innerHeight)
			{
				var scrollPos = BX.GetWindowScrollPos(document);
				this.savedBodyOverflow = document.body.style.overflow;
				this.savedScrollTop = scrollPos.scrollTop;
				this.savedScrollLeft = scrollPos.scrollLeft;
				document.body.style.overflow = "auto";

				if (this.editor.expanded)
					BX.unbind(window, "scroll", BX.proxy(this.editor.PreventScroll, this.editor));
			}
			else
			{
				this.RestoreWindowOverflow();
			}
		},

		RestoreWindowOverflow: function()
		{
			if (this.savedBodyOverflow !== false)
			{
				document.body.style.overflow = this.savedBodyOverflow;
				this.savedBodyOverflow = false;
			}

			if (this.savedScrollTop !== false)
			{
				window.scrollTo(this.savedScrollLeft, this.savedScrollTop);
				this.savedScrollLeft = this.savedScrollTop = false;
			}

			if (this.editor.expanded)
				BX.bind(window, "scroll", BX.proxy(this.editor.PreventScroll, this.editor));
		}
	};

	function ContextMenu(editor)
	{
		this.editor = editor;
		BX.addCustomEvent(this.editor, 'OnIframeContextMenu', BX.delegate(this.Show, this));
		this.Init();
	}

	ContextMenu.prototype = {
		Init: function()
		{
			var
				_this = this,
				defaultItem = {
					TEXT: BX.message('ContMenuDefProps'),
					ACTION: function()
					{
						_this.editor.selection.SetBookmark(_this.savedRange);
						_this.editor.GetDialog('Default').Show(false, _this.savedRange);
						_this.Hide();
					}
				};

			// Remove format ?
			// Replace Node by children ?

			this.items = {
				// Surrogates
				'php' : [
					{
						TEXT: BX.message('BXEdContMenuPhpCode'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.php)
							{
								_this.editor.GetDialog('Source').Show(items.php.bxTag);
							}
							_this.Hide();
						}
					}
				],
				'anchor' : [
					{
						TEXT: BX.message('BXEdEditAnchor'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.anchor)
							{
								_this.editor.GetDialog('Anchor').Show(items.anchor.bxTag);
							}
							_this.Hide();
						}
					}
				],
				'javascript' : [
					{
						TEXT: BX.message('BXEdContMenuJavascript'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.javascript)
							{
								_this.editor.GetDialog('Source').Show(items.javascript.bxTag);
							}
							_this.Hide();
						}
					}
				],
				'htmlcomment' : [
					{
						TEXT: BX.message('BXEdContMenuHtmlComment'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.htmlcomment)
							{
								_this.editor.GetDialog('Source').Show(items.htmlcomment.bxTag);
							}
							_this.Hide();
						}
					}
				],
				'iframe' : [
					{
						TEXT: BX.message('BXEdContMenuIframe'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.iframe)
							{
								_this.editor.GetDialog('Source').Show(items.iframe.bxTag);
							}
							_this.Hide();
						}
					}
				],
				'style' : [
					{
						TEXT: BX.message('BXEdContMenuStyle'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.style)
							{
								_this.editor.GetDialog('Source').Show(items.style.bxTag);
							}
							_this.Hide();
						}
					}
				],
				'object' : [
					{
						TEXT: BX.message('BXEdContMenuObject'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.object)
							{
								_this.editor.GetDialog('Source').Show(items.object.bxTag);
							}
							_this.Hide();
						}
					}
				],
				'component' : [
					{
						TEXT: BX.message('BXEdContMenuComponent'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.component)
							{
								// Show dialog
								_this.editor.components.ShowPropertiesDialog(items.component.bxTag.params, _this.editor.GetBxTag(items.component.bxTag.surrogateId));
							}
							_this.Hide();
						}
					},
					{
						TEXT: BX.message('BXEdContMenuComponentRemove'),
						ACTION: function()
						{
							var items = _this.GetTargetItem();
							if (items && items.component)
							{
								BX.remove(items.component.element);
							}
							_this.Hide();
						}
					}
				],
				'printbreak' : [
					{
						TEXT: BX.message('NodeRemove'),
						ACTION: function(e)
						{
							var node = _this.GetTargetItem('printbreak');
							if (node && node.element)
							{
								_this.editor.selection.RemoveNode(node.element);
							}
							_this.Hide();
						}
					}
				],
				'video': [
					{
						TEXT: BX.message('BXEdVideoProps'),
						bbMode: true,
						ACTION: function()
						{
							var node = _this.GetTargetItem('video');
							if (node)
							{
								_this.editor.GetDialog('Video').Show(node.bxTag);
							}
							_this.Hide();
						}
					},
					{
						TEXT: BX.message('BXEdVideoDel'),
						bbMode: true,
						ACTION: function(e)
						{
							var node = _this.GetTargetItem('video');
							if (node && node.element)
							{
								_this.editor.selection.RemoveNode(node.element);
							}
							_this.Hide();
						}
					}
				],
				'smile' : [],

				// Nodes
				'A' : [
					{
						TEXT: BX.message('ContMenuLinkEdit'),
						bbMode: true,
						ACTION: function()
						{
							var node = _this.GetTargetItem('A');
							if (node)
							{
								_this.editor.GetDialog('Link').Show([node], this.savedRange);
							}
							_this.Hide();
						}
					},
					{
						TEXT: BX.message('ContMenuLinkDel'),
						bbMode: true,
						ACTION: function()
						{
							var link = _this.GetTargetItem('A');
							if (link && _this.editor.action.IsSupported('removeLink'))
							{
								_this.editor.action.Exec('removeLink', [link]);
							}
							_this.Hide();
						}
					}
				],
				'IMG': [
					{
						TEXT: BX.message('ContMenuImgEdit'),
						bbMode: true,
						ACTION: function()
						{
							var node = _this.GetTargetItem('IMG');
							if (node)
							{
								_this.editor.GetDialog('Image').Show([node], _this.savedRange);
							}
							_this.Hide();
						}
					},
					{
						TEXT: BX.message('ContMenuImgDel'),
						bbMode: true,
						ACTION: function()
						{
							var node = _this.GetTargetItem('IMG');
							if (node)
							{
								_this.editor.selection.RemoveNode(node);
							}
							_this.Hide();
						}
					}
				],
				'DIV': [
					{
						TEXT: BX.message('ContMenuCleanDiv'),
						title: BX.message('ContMenuCleanDiv_Title'),
						ACTION: function()
						{
							var node = _this.GetTargetItem('DIV');
							if (node)
							{
								_this.editor.On('OnHtmlContentChangedByControl');
								_this.editor.util.ReplaceWithOwnChildren(node);
								_this.editor.synchro.FullSyncFromIframe();
							}
							_this.Hide();
						}
					},
					defaultItem
				],
				'TABLE': [

					{
						TEXT: BX.message('BXEdTableInsertMenu'),
						HIDE_ITEM: function()
						{
							var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
							return !cells || cells.length != 1;
						},
						MENU: [
							// Column
							{
								TEXT: BX.message('BXEdTableInsColLeft'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'insertColumnLeft',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								}
							},
							{
								TEXT: BX.message('BXEdTableInsColRight'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'insertColumnRight',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								}
							},
							// Row
							{
								TEXT: BX.message('BXEdTableInsRowUpper'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'insertRowUpper',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								}
							},
							{
								TEXT: BX.message('BXEdTableInsRowLower'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'insertRowLower',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								}
							},
							// Cell
							{
								TEXT: BX.message('BXEdTableInsCellBefore'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'insertCellLeft',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								}
							},
							{
								TEXT: BX.message('BXEdTableInsCellAfter'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'insertCellRight',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								}
							}
						]
					},
					{
						TEXT: BX.message('BXEdTableRemoveMenu'),
						MENU: [
							{
								TEXT: BX.message('BXEdTableDelCol'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'removeColumn',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
									return !cells || cells.length != 1;
								}
							},
							{
								TEXT: BX.message('BXEdTableDelRow'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'removeRow',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
									return !cells || cells.length != 1;
								}
							},
							{
								TEXT: BX.message('BXEdTableDellCell'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'removeCell',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
									return !cells || cells.length != 1;
								}
							},
							{
								TEXT: BX.message('BXEdTableDellSelectedCells'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'removeSelectedCells',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
									return !cells || cells.length === 1;
								}
							}
						]
					},
					{
						TEXT: BX.message('BXEdTableMergeMenu'),
						MENU: [
							{
								TEXT: BX.message('BXEdTableMergeSelectedCells'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'mergeSelectedCells',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									if (!_this.savedRange.collapsed)
									{
										return !_this.editor.action.actions.tableOperation.canBeMerged(false, _this.savedRange, _this.GetTargetItem('TABLE'));
									}

									return true;
								}
							},
							{
								TEXT: BX.message('BXEdTableMergeRight'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'mergeRightCell',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									return !_this.editor.action.actions.tableOperation.canBeMergedWithRight(_this.savedRange, _this.GetTargetItem('TABLE'));
								}
							},
							{
								TEXT: BX.message('BXEdTableMergeBottom'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'mergeBottomCell',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									return !_this.editor.action.actions.tableOperation.canBeMergedWithBottom(_this.savedRange, _this.GetTargetItem('TABLE'));
								}
							},
							{
								TEXT: BX.message('BXEdTableMergeRowCells'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'mergeRow',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
									return !cells || cells.length > 1;
								}
							},
							{
								TEXT: BX.message('BXEdTableMergeColCells'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'mergeColumn',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								},
								HIDE_ITEM: function()
								{
									var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
									return !cells || cells.length > 1;
								}
							}
						]
					},
					{
						TEXT: BX.message('BXEdTableSplitMenu'),
						HIDE_ITEM: function()
						{
							var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
							return !cells || cells.length != 1;
						},
						MENU: [
							{
								TEXT: BX.message('BXEdTableSplitCellHor'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'splitHorizontally',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								}
							},
							{
								TEXT: BX.message('BXEdTableSplitCellVer'),
								ACTION: function()
								{
									_this.editor.action.Exec('tableOperation', {
										actionType: 'splitVertically',
										tableNode: _this.GetTargetItem('TABLE'),
										range: _this.savedRange
									});
									_this.Hide();
								}
							}
						]
					},
					{SEPARATOR: true},

					{
						TEXT: BX.message('BXEdTableTableCellProps'),
						ACTION: function()
						{
							var node = _this.GetTargetItem('TABLE');
							if (node)
							{
								var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
								_this.editor.GetDialog('Default').Show(cells, _this.savedRange);
							}
							_this.Hide();
						},
						HIDE_ITEM: function()
						{
							var cells = _this.editor.action.actions.tableOperation.getSelectedCells(_this.savedRange, _this.GetTargetItem('TABLE'));
							return !cells || cells.length != 1;
						}
					},

					{
						TEXT: BX.message('BXEdTableTableProps'),
						ACTION: function()
						{
							var node = _this.GetTargetItem('TABLE');
							if (node)
							{
								_this.editor.GetDialog('Table').Show([node], _this.savedRange);
							}
							_this.Hide();
						}
					},
					{
						TEXT: BX.message('BXEdTableDeleteTable'),
						bbMode: true,
						ACTION: function()
						{
							var node = _this.GetTargetItem('TABLE');
							if (node)
							{
								_this.editor.selection.RemoveNode(node);
							}
							_this.Hide();
						}
					}
				],
				// ...
				'DEFAULT': [defaultItem]
			};
		},

		Show: function(e, target, collapsedSelection)
		{
			this.savedRange = this.editor.selection.GetBookmark();
			this.Hide();

			this.editor.contextMenuShown = true;
			if (this.contextMenuShownTimeout)
			{
				this.contextMenuShownTimeout = clearTimeout(this.contextMenuShownTimeout);
			}
			this.nodes = [];
			this.tagIndex = {};
			var
				bxTag,
				i, j, k, menuItems, item, itemGr,
				arItems = [],
				maxIter = 20, iter = 0,
				element = target,
				label;

			this.targetItems = {};
			while (true)
			{
				if (element.nodeName && element.nodeName.toUpperCase() != 'BODY')
				{
					if (element.nodeType != 3)
					{
						bxTag = this.editor.GetBxTag(element);

						if (bxTag && bxTag.tag == 'surrogate_dd')
						{
							var origTag = this.editor.GetBxTag(bxTag.params.origId);
							element = this.editor.GetIframeElement(origTag.id);
							this.PushTargetItem(origTag.tag, {element: element, bxTag: origTag});
							this.nodes = [element];
							this.tagIndex[origTag.tag] = 0;
							iter = 0;
							element = element.parentNode;
							continue;
						}
						else if (bxTag && bxTag.tag && this.items[bxTag.tag])
						{
							this.nodes = [element];
							this.PushTargetItem(bxTag.tag, {element: element, bxTag: bxTag.tag});
							this.nodes = [element];
							this.tagIndex[bxTag.tag] = 0;
							iter = 0;
							element = element.parentNode;
							continue;
						}

						label = element.nodeName;
						this.PushTargetItem(label, element);
						this.nodes.push(element);
						this.tagIndex[label] = this.nodes.length - 1;
					}
					iter++;
				}

				if (!element ||
					element.nodeName && element.nodeName.toUpperCase() == 'BODY' ||
					iter >= maxIter)
				{
					break;
				}

				element = element.parentNode;
			}

			for (i in this.items)
			{
				if (this.items.hasOwnProperty(i) && this.tagIndex[i] != undefined)
				{
					if (arItems.length > 0)
					{
						arItems.push({SEPARATOR : true});
					}

					for (j = 0; j < this.items[i].length; j++)
					{
						if (typeof this.items[i][j].HIDE_ITEM == 'function'  && this.items[i][j].HIDE_ITEM() === true)
							continue;

						if (this.editor.bbCode && !this.items[i][j].bbMode)
							continue;

						if (this.items[i][j].MENU)
						{
							itemGr = BX.clone(this.items[i][j]);
							menuItems = [];
							for (k = 0; k < itemGr.MENU.length; k++)
							{
								item = itemGr.MENU[k];
								if (typeof item.HIDE_ITEM == 'function'  && item.HIDE_ITEM() === true)
									continue;

								if (this.editor.bbCode && !item.bbMode)
									continue;

								menuItems.push(item);
							}

							if (menuItems.length === 0)
								continue;

							itemGr.MENU = menuItems;

							arItems.push(itemGr);
						}
						else
						{
							arItems.push(this.items[i][j]);
						}
					}
				}
			}

			if (arItems.length == 0 && (!this.editor.bbCode || this.items['DEFAULT'].bbMode))
			{
				if (!this.savedRange || (!this.savedRange.collapsed && !collapsedSelection))
				{
					for (j = 0; j < this.items['DEFAULT'].length; j++)
					{
						arItems.push(this.items['DEFAULT'][j]);
					}
				}
			}

			var
				x = e.clientX,
				y = e.clientY;

			if (!this.dummyTarget)
			{
				this.dummyTarget = this.editor.dom.iframeCont.appendChild(BX.create('DIV', {props: {className: 'bxhtmled-dummy-target'}}));
			}

			this.dummyTarget.style.left = x + 'px';
			this.dummyTarget.style.top = y + 'px';
			this.dummyTarget.style.zIndex = '2002';

			if (arItems.length > 0)
			{
				this.OPENER = new BX.COpener({
					DIV: this.dummyTarget,
					MENU: arItems,
					TYPE: 'click',
					ACTIVE_CLASS: 'adm-btn-active',
					CLOSE_ON_CLICK: true
				});
				this.OPENER.Open();
				var popupDiv = this.OPENER.GetMenu().DIV;
				popupDiv.style.zIndex = '3005';
				popupDiv.id = 'bx-admin-prefix';
				BX.addClass(popupDiv, 'bx-core-popup-menu-editor');

				this.isOpened = true;
				BX.addCustomEvent(this.editor, 'OnIframeClick', BX.proxy(this.Hide, this));
				BX.addCustomEvent(this.editor, 'OnIframeKeyup', BX.proxy(this.CheckEscapeClose, this));
				return BX.PreventDefault(e);
			}
		},

		Hide: function()
		{
			if (this.OPENER)
			{
				var _this = this;
				this.contextMenuShownTimeout = setTimeout(function(){_this.editor.contextMenuShown = false;}, 300);
				this.OPENER.bMenuInit = true;
				this.OPENER.Close();
				this.isOpened = false;
				BX.removeCustomEvent(this.editor, 'OnIframeClick', BX.proxy(this.Hide, this));
				BX.removeCustomEvent(this.editor, 'OnIframeKeyup', BX.proxy(this.CheckEscapeClose, this));
			}
		},

		CheckEscapeClose: function(e, keyCode)
		{
			if (keyCode == this.editor.KEY_CODES['escape'])
				this.Hide();
		},

		GetTargetItem: function(tag)
		{
			return tag ? (this.targetItems[tag] || null) : this.targetItems;
		},

		PushTargetItem: function(key, tag)
		{
			if (!this.targetItems[key])
				this.targetItems[key] = tag;
		}
	};

	function Toolbar(editor, topControls)
	{
		this.editor = editor;
		this.pCont = editor.dom.toolbar;
		this.controls = {};
		this.bCompact = false;
		this.topControls = topControls;
		this.showMoreButton = false;
		this.shown = true;
		this.height = 34;
		this.Init();
	}

	Toolbar.prototype = {
		Init: function()
		{
			this.BuildControls();
			// Init Event handlers
			BX.addCustomEvent(this.editor, "OnIframeFocus", BX.delegate(this.EnableWysiwygButtons, this));
			BX.addCustomEvent(this.editor, "OnTextareaFocus", BX.delegate(this.DisableWysiwygButtons, this));
		},

		BuildControls: function()
		{
			BX.cleanNode(this.pCont);
			var
				i,
				wrap, moreCont, cont,
				map = this.GetControlsMap(),
				wraps = {
					left: this.pCont.appendChild(BX.create('span', {props: {className: 'bxhtmled-top-bar-left-wrap'}, style: {display: 'none'}})),
					main: this.pCont.appendChild(BX.create('span', {props: {className: 'bxhtmled-top-bar-wrap'}, style: {display: 'none'}})),
					right: this.pCont.appendChild(BX.create('span', {props: {className: 'bxhtmled-top-bar-right-wrap'}, style: {display: 'none'}})),
					hidden: this.pCont.appendChild(BX.create('span', {props: {className: 'bxhtmled-top-bar-hidden-wrap'}}))
				};

			this.hiddenWrap = wraps.hidden;

			this.editor.normalWidth = this.editor.NORMAL_WIDTH;
			for (i = 0; i < map.length; i++)
			{
				if(map[i].hidden)
				{
					map[i].wrap = 'hidden';
					this.showMoreButton = true;
				}
				else if (map[i].checkWidth && map[i].offsetWidth)
				{
					this.editor.normalWidth += map[i].offsetWidth;
				}

				wrap = wraps[(map[i].wrap || 'main')];

				if (!wrap)
				{
					// We trying to find wrap as dom element by Id
					wrap = BX(map[i].wrap);
					if (wrap)
					{
						wraps[map[i].wrap] = wrap;
					}
					else
					{
						wrap = wraps['main'];
					}
				}

				if (wrap.style.display == 'none')
					wrap.style.display = '';

				if (map[i].separator)
				{
					wrap.appendChild(this.GetSeparator()); // Show separator
				}
				else if(this.topControls[map[i].id])
				{
					if (!this.controls[map[i].id])
					{
						this.controls[map[i].id] = new this.topControls[map[i].id](this.editor, wrap);
					}
					else
					{
						cont = this.controls[map[i].id].GetPopupBindCont ? this.controls[map[i].id].GetPopupBindCont() : this.controls[map[i].id].GetCont();

						if (this.controls[map[i].id].CheckBeforeShow && !this.controls[map[i].id].CheckBeforeShow())
							continue;

						if (this.controls.More && ((this.bCompact && !map[i].compact) || map[i].hidden))
						{
							if (!moreCont)
							{
								moreCont = this.controls.More.GetPopupCont();
							}
							moreCont.appendChild(cont);
						}
						else
						{
							wrap.appendChild(cont);
						}
					}
				}
			}

			for (i in wraps)
			{
				if (wraps.hasOwnProperty(i) && i !== 'main' && i !== 'left' && i !== 'right' && i !== 'hidden' && wraps[i].getAttribute('data-bx-check-command') !== 'N')
				{
					wraps[i].setAttribute('data-bx-check-command', 'N');
					BX.bind(wraps[i], "click", BX.proxy(function(e)
					{
						this.editor.CheckCommand(e.target || e.srcElement);
					}, this));
				}
			}
		},

		GetControlsMap: function()
		{
			if (this.controlsMap)
				return this.controlsMap;

			var res = this.editor.config.controlsMap;
			if (!res)
			{
				res = [
					//{id: 'SearchButton', wrap: 'left', compact: true},
					{id: 'ChangeView', wrap: 'left', compact: true, sort: 10},
					{id: 'Undo', compact: false, sort: 20},
					{id: 'Redo', compact: false, sort: 30},
					{id: 'StyleSelector', compact: true, sort: 40},
					{id: 'FontSelector', compact: false, sort: 50},
					{id: 'FontSize', compact: false, sort: 60},
					{separator: true, compact: false, sort: 70},
					{id: 'Bold', compact: true, sort: 80},
					{id: 'Italic', compact: true, sort: 90},
					{id: 'Underline', compact: true, sort: 100},
					{id: 'Strikeout', compact: true, sort: 110},
					{id: 'RemoveFormat', compact: true, sort: 120},
					{id: 'Color', compact: true, sort: 130},
					{separator: true, compact: false, sort: 140},
					{id: 'OrderedList', compact: true, sort: 150},
					{id: 'UnorderedList', compact: true, sort: 160},
					{id: 'IndentButton', compact: true, sort: 170},
					{id: 'OutdentButton', compact: true, sort: 180},
					{id: 'AlignList',compact: true, sort: 190},
					{separator: true, compact: false, sort: 200},
					{id: 'InsertLink', compact: true, sort: 210},
					{id: 'InsertImage', compact: true, sort: 220},
					{id: 'InsertVideo', compact: true, sort: 230},
					{id: 'InsertAnchor', compact: false, sort: 240},
					{id: 'InsertTable', compact: false, sort: 250},
					{id: 'InsertChar', compact: false, hidden: true, sort: 260},
					{id: 'PrintBreak', compact: false, hidden: true, sort: 270},
					{id: 'PageBreak', compact: false, hidden: true, sort: 275},
					{id: 'Spellcheck', compact: false, hidden: true, sort: 280},
					{id: 'InsertHr', compact: false, hidden: true, sort: 290},
					{id: 'Sub', compact: false, hidden: true, sort: 310},
					{id: 'Sup', compact: false, hidden: true, sort: 320},
					{id: 'TemplateSelector', compact: false, sort: 330},
					{id: 'Fullscreen', compact: true, sort: 340},

					{id: 'More', compact: true, sort: 400},
					{id: 'Settings',  wrap: 'right', compact: true, sort: 500}
				];
			}

			this.editor.On("GetControlsMap", [res]);
			res = res.sort(function(a, b){return a.sort - b.sort});
			this.controlsMap = res;
			return res;
		},

		GetSeparator: function()
		{
			return BX.create('span', {props: {className: 'bxhtmled-top-bar-separator'}});
		},

		GetHeight: function()
		{
			var res = 0;
			if (this.shown)
			{
				if (!this.height)
					this.height = parseInt(this.editor.dom.toolbarCont.offsetHeight);

				res = this.height;
			}
			return res;
		},

		DisableWysiwygButtons: function(bDisable)
		{
			bDisable = bDisable !== false;
			for (var i in this.controls)
			{
				if (this.controls.hasOwnProperty(i) && typeof this.controls[i].Disable == 'function' && this.controls[i].disabledForTextarea !== false)
					this.controls[i].Disable(bDisable);
			}
		},

		EnableWysiwygButtons: function()
		{
			this.DisableWysiwygButtons(false);
		},

		AdaptControls: function(width)
		{
			var bCompact = width < this.editor.normalWidth;
			if (this.controls.More)
			{
				if (bCompact || this.showMoreButton)
				{
					this.controls.More.GetCont().style.display = '';
				}
				else
				{
					this.controls.More.GetCont().style.display = 'none';
				}

				if (this.controls.More.pCont && this.controls.More.pCont.style.display !== 'none')
					this.controls.More.Close();
			}

			if (!bCompact && this.showMoreButton)
			{
				var moreCont = this.controls.More.GetPopupCont();
				while (this.hiddenWrap.firstChild)
				{
					moreCont.appendChild(this.hiddenWrap.firstChild);
				}
			}

			if (this.bCompact != bCompact)
			{
				this.bCompact = bCompact;
				this.BuildControls();
			}
		},

		Hide: function()
		{
			this.shown = false;
			this.editor.dom.toolbarCont.style.display = 'none';
			this.editor.ResizeSceleton();
		},

		Show: function()
		{
			this.shown = true;
			this.editor.dom.toolbarCont.style.display = '';
			this.editor.ResizeSceleton();
		},

		IsShown: function()
		{
			return this.shown;
		}
	};

	function NodeNavi(editor)
	{
		this.editor = editor;
		this.bShown = false;
		this.pCont = editor.dom.navCont;
		this.controls = {};
		this.height = 28;
		this.Init();
	}

	NodeNavi.prototype = {
		Init: function()
		{
			BX.addCustomEvent(this.editor, "OnIframeMouseDown", BX.proxy(this.OnIframeMousedown, this));
			BX.addCustomEvent(this.editor, "OnIframeKeyup", BX.proxy(this.OnIframeKeyup, this));
			BX.addCustomEvent(this.editor, "OnTextareaFocus", BX.delegate(this.Disable, this));
			BX.addCustomEvent(this.editor, "OnHtmlContentChangedByControl", BX.delegate(this.OnIframeKeyup, this));
			BX.bind(this.pCont, 'click', BX.delegate(this.ShowMenu, this));

			var _this = this;

			this.items = {
				// Surrogates
				'php' : function(node, bxTag)
				{
					_this.editor.GetDialog('Source').Show(bxTag);
				},
				'anchor' : function(node, bxTag)
				{
					_this.editor.GetDialog('Anchor').Show(bxTag);
				},
				'javascript' : function(node, bxTag)
				{
					_this.editor.GetDialog('Source').Show(bxTag);
				},
				'htmlcomment' : function(node, bxTag)
				{
					_this.editor.GetDialog('Source').Show(bxTag);
				},
				'iframe' : function(node, bxTag)
				{
					_this.editor.GetDialog('Source').Show(bxTag);
				},
				'style' : function(node, bxTag)
				{
					_this.editor.GetDialog('Source').Show(bxTag);
				},
				'video' : function(node, bxTag)
				{
					_this.editor.GetDialog('Video').Show(bxTag);
				},
				'component' : function(node, bxTag)
				{
					_this.editor.components.ShowPropertiesDialog(bxTag.params, _this.editor.GetBxTag(bxTag.surrogateId));
				},
				'printbreak' : false,

				// Nodes
				'A' : function(node)
				{
					_this.editor.GetDialog('Link').Show([node]);
				},
				'IMG' : function(node)
				{
					_this.editor.GetDialog('Image').Show([node]);
				},
				'TABLE' : function(node)
				{
					_this.editor.GetDialog('Table').Show([node]);
				},
				'DEFAULT' : function(node)
				{
					_this.editor.GetDialog('Default').Show([node]);
				}
			};
		},

		Show: function(bShow)
		{
			this.bShown = bShow = bShow !== false;
			this.pCont.style.display = bShow ? 'block' : 'none';
		},

		GetHeight: function()
		{
			if (!this.bShown)
				return 0;

			if (!this.height)
				this.height = parseInt(this.pCont.offsetHeight);

			return this.height;
		},

		OnIframeMousedown: function(e, target, bxTag)
		{
			this.BuildNavi(target);
		},

		OnIframeKeyup: function(e, keyCode, target)
		{
			this.BuildNavi(target);
		},

		BuildNavi: function(node)
		{
			BX.cleanNode(this.pCont);
			if (!node)
			{
				node = this.editor.GetIframeDoc().body;
			}
			this.nodeIndex = [];
			var itemCont, label, bxTag;
			while (node)
			{
				if (node.nodeType != 3)
				{
					bxTag = this.editor.GetBxTag(node);
					if (bxTag.tag)
					{
						if (bxTag.tag == "surrogate_dd")
						{
							node = node.parentNode;
							continue;
						}

						BX.cleanNode(this.pCont);
						this.nodeIndex = [];

						label = bxTag.name || bxTag.tag;
					}
					else
					{
						label = node.nodeName;
					}

					itemCont = BX.create("SPAN", {props: {className: "bxhtmled-nav-item"}, text: label});
					itemCont.setAttribute('data-bx-node-ind', this.nodeIndex.length.toString());

					this.nodeIndex.push({node: node, bxTag: bxTag.tag});

					if (this.pCont.firstChild)
					{
						this.pCont.insertBefore(itemCont, this.pCont.firstChild);
						if(!this.AdjustSize())
						{
							break;
						}
					}
					else
					{
						this.pCont.appendChild(itemCont);
					}
				}
				if (node.nodeName && node.nodeName.toUpperCase() == 'BODY')
				{
					break;
				}
				node = node.parentNode;
			}

			this.AdjustSize();
		},

		AdjustSize: function()
		{
			if (this.pCont.lastChild && this.pCont.lastChild.offsetTop > 0)
			{
				BX.remove(this.pCont.firstChild);
				return false;
			}
			return true;
		},

		ShowMenu: function(e)
		{
			if (!this.nodeIndex)
			{
				return;
			}

			var
				_this = this,
				nodeIndex,
				origNode,
				target;

			if (e.target)
			{
				target = e.target;
			}
			else if (e.srcElement)
			{
				target = e.srcElement;
			}
			if (target.nodeType == 3)
			{
				target = target.parentNode;
			}

			if (target)
			{
				nodeIndex = target.getAttribute('data-bx-node-ind');
				if (!this.nodeIndex[nodeIndex])
				{
					target = BX.findParent(target, function(node)
					{
						return node == _this.pCont || (node.getAttribute && node.getAttribute('data-bx-node-ind') >= 0);
					}, this.pCont);
					nodeIndex = target.getAttribute('data-bx-node-ind')
				}

				if (this.nodeIndex[nodeIndex])
				{
					var id = 'bx_node_nav_' + Math.round(Math.random() * 1000000000);
					origNode = this.nodeIndex[nodeIndex].node;

					var arItems = [];
					if (origNode.nodeName && origNode.nodeName.toUpperCase() != 'BODY')
					{
						if (!this.nodeIndex[nodeIndex].bxTag || !this.editor.phpParser.surrogateTags[this.nodeIndex[nodeIndex].bxTag])
						{
							arItems.push({
								text : BX.message('NodeSelect'),
								title : BX.message('NodeSelect'),
								className : "",
								onclick: function()
								{
									_this.editor.action.Exec('selectNode', origNode);
									this.popupWindow.close();
									this.popupWindow.destroy();
								}
							});
						}

						arItems.push({
							text : BX.message('NodeRemove'),
							title : BX.message('NodeRemove'),
							className : "",
							onclick: function()
							{
								if (origNode && origNode.parentNode)
								{
									_this.BuildNavi(origNode.parentNode);
									_this.editor.selection.RemoveNode(origNode);
								}
								this.popupWindow.close();
								this.popupWindow.destroy();
							}
						});

						var showProps = !(this.nodeIndex[nodeIndex] && this.nodeIndex[nodeIndex].bxTag && this.items[this.nodeIndex[nodeIndex].bxTag] == false);
						if (showProps)
						{
							arItems.push({
								text : BX.message('NodeProps'),
								title : BX.message('NodeProps'),
								className : "",
								onclick: function()
								{
									_this.ShowNodeProperties(origNode);
									this.popupWindow.close();
									this.popupWindow.destroy();
								}
							});
						}
					}
					else
					{
						arItems = [
							{
								text : BX.message('NodeSelectBody'),
								title : BX.message('NodeSelectBody'),
								className : "",
								onclick: function()
								{
									_this.editor.iframeView.CheckContentLastChild();
									_this.editor.action.Exec('selectNode', origNode);
									_this.editor.Focus();
									this.popupWindow.close();
									this.popupWindow.destroy();
								}
							},
							{
								text : BX.message('NodeRemoveBodyContent'),
								title : BX.message('NodeRemoveBodyContent'),
								className : "",
								onclick: function()
								{
									_this.BuildNavi(origNode);
									_this.editor.On('OnHtmlContentChangedByControl');
									_this.editor.iframeView.Clear();
									_this.editor.util.Refresh(origNode);
									_this.editor.synchro.FullSyncFromIframe();
									_this.editor.Focus();

									this.popupWindow.close();
									this.popupWindow.destroy();
								}
							}
						];
					}


					BX.PopupMenu.show(id + "_menu", target, arItems, {
							overlay: {opacity: 1},
							events: {
								onPopupClose: function()
								{
									//BX.removeClass(this.bindElement, "bxec-add-more-over");
								}
							},
							offsetLeft: 1,
							zIndex: 4000,
							bindOptions: { position: "top" }
						}
					);
				}
			}
		},

		ShowNodeProperties: function(node)
		{
			var bxTag, key;
			if (node.nodeName && node.nodeType == 1)
			{
				bxTag = this.editor.GetBxTag(node);
				key = bxTag.tag ? bxTag.tag : node.nodeName;

				if (this.items[key] && typeof this.items[key] == 'function')
				{
					this.items[key](node, bxTag);
				}
				else
				{
					this.items['DEFAULT'](node, bxTag);
				}
			}
		},

		// TODO: hide it ??
		Disable: function()
		{
			this.BuildNavi(false);
		},

		Enable: function()
		{
		}
	};

	function Overlay(editor, params)
	{
		this.editor = editor;
		this.id = 'bxeditor_overlay' + this.editor.id;
		this.zIndex = params && params.zIndex ? params.zIndex : 3001;
	}

	Overlay.prototype =
	{
		Create: function ()
		{
			this.bCreated = true;
			this.bShown = false;
			var ws = BX.GetWindowScrollSize();
			this.pWnd = document.body.appendChild(BX.create("DIV", {props: {id: this.id, className: "bxhtmled-overlay"}, style: {zIndex: this.zIndex, width: ws.scrollWidth + "px", height: ws.scrollHeight + "px"}}));
			this.pWnd.ondrag = BX.False;
			this.pWnd.onselectstart = BX.False;
		},

		Show: function(arParams)
		{
			if (!this.bCreated)
				this.Create();
			this.bShown = true;
			if (this.shownTimeout)
			{
				this.shownTimeout = clearTimeout(this.shownTimeout);
			}
			var ws = BX.GetWindowScrollSize();
			this.pWnd.style.display = 'block';
			this.pWnd.style.width = ws.scrollWidth + "px";
			this.pWnd.style.height = ws.scrollHeight + "px";

			if (!arParams)
			{
				arParams = {};
			}

			this.pWnd.style.zIndex = arParams.zIndex || this.zIndex;

			BX.bind(window, "resize", BX.proxy(this.Resize, this));
			return this.pWnd;
		},

		Hide: function ()
		{
			if (!this.bShown)
			{
				return;
			}
			var _this = this;
			_this.shownTimeout = setTimeout(function(){_this.bShown = false;}, 300);
			this.pWnd.style.display = 'none';
			BX.unbind(window, "resize", BX.proxy(this.Resize, this));
			this.pWnd.onclick = null;
		},

		Resize: function ()
		{
			if (this.bCreated)
			{
				var ws = BX.GetWindowScrollSize();
				this.pWnd.style.width = ws.scrollWidth + "px";
				this.pWnd.style.height = ws.scrollHeight + "px";
			}
		}
	}

	function Button(editor)
	{
		this.editor = editor;
		this.className = 'bxhtmled-top-bar-btn';
		this.activeClassName = 'bxhtmled-top-bar-btn-active';
		this.disabledClassName = 'bxhtmled-top-bar-btn-disabled';
		this.checkableAction = true;
		this.disabledForTextarea = true;
	}

	Button.prototype = {
		Create: function ()
		{
			this.pCont = BX.create("SPAN", {props: {className: this.className, title: this.title || ''}, html: '<i></i>'});
			BX.bind(this.pCont, "click", BX.delegate(this.OnClick, this));
			BX.bind(this.pCont, "mousedown", BX.delegate(this.OnMouseDown, this));
			BX.bind(this.pCont, "dblclick", function(e){return BX.PreventDefault(e);});

			if (this.action)
			{
				this.pCont.setAttribute('data-bx-type', 'action');
				this.pCont.setAttribute('data-bx-action', this.action);
				if (this.value)
					this.pCont.setAttribute('data-bx-value', this.value);

				if (this.checkableAction)
				{
					this.editor.RegisterCheckableAction(this.action, {
						action: this.action,
						control: this,
						value: this.value
					});
				}
			}
		},

		GetCont: function()
		{
			return this.pCont;
		},

		Check: function (bFlag)
		{
			if(bFlag == this.checked || this.disabled)
				return;

			this.checked = bFlag;
			if(this.checked)
			{
				BX.addClass(this.pCont, this.activeClassName);
			}
			else
			{
				BX.removeClass(this.pCont, this.activeClassName);
			}
		},

		Disable: function(bFlag)
		{
			if(bFlag != this.disabled)
			{
				this.disabled = !!bFlag;
				if(bFlag)
				{
					if (this.action)
					{
						this.pCont.setAttribute('data-bx-type', '');
					}
					BX.addClass(this.pCont, this.disabledClassName);
				}
				else
				{
					if (this.action)
					{
						this.pCont.setAttribute('data-bx-type', 'action');
					}
					BX.removeClass(this.pCont, this.disabledClassName);
				}
			}
		},

		OnClick: BX.DoNothing,
		OnMouseUp: function()
		{
			if(!this.checked)
			{
				BX.removeClass(this.pCont, this.activeClassName);
			}
			BX.unbind(document, 'mouseup', BX.proxy(this.OnMouseUp, this));
			BX.removeCustomEvent(this.editor, "OnIframeMouseUp", BX.proxy(this.OnMouseUp, this));

			if (this.editor.toolbar && this.editor.toolbar.controls && this.editor.toolbar.controls.More)
			{
				this.editor.toolbar.controls.More.Close();
			}
		},

		OnMouseDown: function()
		{
			if (!this.disabled)
			{
				if (this.disabledForTextarea || !this.editor.synchro.IsFocusedOnTextarea())
				{
					this.savedRange = this.editor.selection.SaveBookmark();
				}
				BX.addClass(this.pCont, this.activeClassName);
				BX.bind(document, 'mouseup', BX.proxy(this.OnMouseUp, this));
				BX.addCustomEvent(this.editor, "OnIframeMouseUp", BX.proxy(this.OnMouseUp, this));
			}
		},

		GetValue: function()
		{
			return !!this.checked;
		},

		SetValue: function(value)
		{
			this.Check(value);
		}
	};

	// List
	function DropDown(editor)
	{
		this.editor = editor;
		this.className = 'bxhtmled-top-bar-btn';
		this.activeClassName = 'bxhtmled-top-bar-btn-active';
		this.activeListClassName = 'bxhtmled-top-bar-btn-active';
		this.arValues = [];
		this.checkableAction = true;
		this.disabledForTextarea = true;
		this.posOffset = {top: 6, left: -4};
		this.zIndex = 3005;
	}

	DropDown.prototype = {
		Create: function ()
		{
			this.pCont = BX.create("SPAN", {props: {className: this.className}, html: '<i></i>'});
			this.pValuesCont = BX.create("DIV", {props: {className: "bxhtmled-popup bxhtmled-dropdown-cont"}, html: '<div class="bxhtmled-popup-corner"></div>'});
			if (this.title)
			{
				this.pCont.title = this.title;
			}

			if(this.zIndex)
			{
				this.pValuesCont.style.zIndex = this.zIndex;
			}

			this.valueIndex = {};
			this.pValuesContWrap = this.pValuesCont.appendChild(BX.create("DIV"));
			var but, value, _this = this;
			for (var i = 0; i < this.arValues.length; i++)
			{
				value = this.arValues[i];
				but = this.pValuesContWrap.appendChild(BX.create("SPAN", {props: {title: value.title, className: value.className}, html: '<i></i>'}));
				but.setAttribute('data-bx-dropdown-value', value.id);
				this.valueIndex[value.id] = i;

				if (value.action)
				{
					but.setAttribute('data-bx-type', 'action');
					but.setAttribute('data-bx-action', value.action);
					if (value.value)
					{
						but.setAttribute('data-bx-value', value.value);
					}
				}

				BX.bind(but, 'mousedown', function(e)
				{
					_this.SelectItem(this.getAttribute('data-bx-dropdown-value'));
					_this.editor.CheckCommand(this);
					_this.Close();
				});

				this.arValues[i].listCont = but;
			}

			if (this.action && this.checkableAction)
			{
				this.editor.RegisterCheckableAction(this.action, {
					action: this.action,
					control: this
				});
			}

			BX.bind(this.pCont, 'click', BX.proxy(this.OnClick, this));
			BX.bind(this.pCont, "mousedown", BX.delegate(this.OnMouseDown, this));
		},

		GetCont: function()
		{
			return this.pCont;
		},

		GetPopupBindCont: function()
		{
			return this.pCont;
		},

		Disable: function(bFlag)
		{
			if(bFlag != this.disabled)
			{
				this.disabled = !!bFlag;
				if(bFlag)
				{
					BX.addClass(this.pCont, 'bxhtmled-top-bar-btn-disabled');
				}
				else
				{
					BX.removeClass(this.pCont, 'bxhtmled-top-bar-btn-disabled');
				}
			}
		},

		OnKeyDown: function(e)
		{
			if(e.keyCode == 27)
			{
				this.Close();
			}
		},

		OnClick: function()
		{
			if(!this.disabled)
			{
				if (this.bOpened)
				{
					this.Close();
				}
				else
				{
					this.Open();
				}
			}
		},

		OnMouseUp: function()
		{
			this.editor.selection.RestoreBookmark();
			if(!this.checked)
			{
				BX.removeClass(this.pCont, this.activeClassName);
			}
			BX.unbind(document, 'mouseup', BX.proxy(this.OnMouseUp, this));
			BX.removeCustomEvent(this.editor, "OnIframeMouseUp", BX.proxy(this.OnMouseUp, this));
		},

		OnMouseDown: function()
		{
			if (!this.disabled)
			{
				if (this.disabledForTextarea || !this.editor.synchro.IsFocusedOnTextarea())
				{
					this.savedRange = this.editor.selection.SaveBookmark();
				}

				BX.addClass(this.pCont, this.activeClassName);
				BX.bind(document, 'mouseup', BX.proxy(this.OnMouseUp, this));
				BX.addCustomEvent(this.editor, "OnIframeMouseUp", BX.proxy(this.OnMouseUp, this));
			}
		},

		Close: function ()
		{
			var _this = this;
			this.popupShownTimeout = setTimeout(function(){_this.editor.popupShown = false;}, 300);
			BX.removeClass(this.pCont, this.activeClassName);
			this.pValuesCont.style.display = 'none';
			this.editor.overlay.Hide();

			BX.unbind(window, "keydown", BX.proxy(this.OnKeyDown, this));
			BX.unbind(document, 'mousedown', BX.proxy(this.CheckClose, this));

			BX.onCustomEvent(this, "OnPopupClose");

			this.bOpened = false;
		},

		CheckClose: function(e)
		{
			if (!this.bOpened)
			{
				return BX.unbind(document, 'mousedown', BX.proxy(this.CheckClose, this));
			}

			var pEl;
			if (e.target)
				pEl = e.target;
			else if (e.srcElement)
				pEl = e.srcElement;
			if (pEl.nodeType == 3)
				pEl = pEl.parentNode;

			if (!BX.findParent(pEl, {className: 'bxhtmled-popup'}))
			{
				this.Close();
			}
		},

		Open: function ()
		{
			this.editor.popupShown = true;
			if (this.popupShownTimeout)
			{
				this.popupShownTimeout = clearTimeout(this.popupShownTimeout);
			}
			document.body.appendChild(this.pValuesCont);
			this.pValuesCont.style.display = 'block';
			BX.addClass(this.pCont, this.activeClassName);
			var
				pOverlay = this.editor.overlay.Show({zIndex: this.zIndex - 1}),
				bindCont = this.GetPopupBindCont(),
				pos = BX.pos(bindCont),
				left = Math.round(pos.left - this.pValuesCont.offsetWidth / 2 + bindCont.offsetWidth / 2 + this.posOffset.left),
				top = Math.round(pos.bottom + this.posOffset.top),
				_this = this;

			BX.bind(window, "keydown", BX.proxy(this.OnKeyDown, this));
			pOverlay.onclick = function(){_this.Close()};

			this.pValuesCont.style.top = top + 'px';
			this.pValuesCont.style.left = left + 'px';
			this.bOpened = true;

			setTimeout(function()
			{
				BX.bind(document, 'mousedown', BX.proxy(_this.CheckClose, _this));
			},100);
		},

		SelectItem: function(id, val)
		{
			if (!val)
				val = this.arValues[this.valueIndex[id]];

			if (this.lastActiveItem)
				BX.removeClass(this.lastActiveItem, this.activeListClassName);

			if (val)
			{
				// Select value in list as active
				if (val.listCont)
				{
					this.lastActiveItem = val.listCont;
					BX.addClass(val.listCont, this.activeListClassName);
				}

				this.pCont.className = val.className;
				this.pCont.title = BX.util.htmlspecialchars(val.title || val.name || '');
			}
			else
			{
				this.pCont.className = this.className;
				this.pCont.title = this.title;
			}

			if (this.disabled)
			{
				this.disabled = false;
				this.Disable(true);
			}

			return val;
		},

		SetValue: function()
		{
		},

		GetValue: function()
		{
		},

		OnPopupClose: function()
		{
		}
	};

	function DropDownList(editor)
	{
		// Call parrent constructor
		DropDownList.superclass.constructor.apply(this, arguments);
		this.className = 'bxhtmled-top-bar-select';
		this.itemClassName = 'bxhtmled-dd-list-item';
		this.activeListClassName = 'bxhtmled-dd-list-item-active';
		this.disabledForTextarea = true;
	}
	BX.extend(DropDownList, DropDown);

	DropDownList.prototype.Create = function ()
	{
		this.pCont = BX.create("SPAN", {props: {className: this.className, title: this.title}, attrs: {unselectable: 'on'}, text: ''});
		if (this.width)
			this.pCont.style.width = this.width + 'px';

		this.pValuesCont = BX.create("DIV", {props: {className: "bxhtmled-popup bxhtmled-dropdown-list-cont"}, html: '<div class="bxhtmled-popup-corner"></div>'});
		this.pValuesContWrap = this.pValuesCont.appendChild(BX.create("DIV", {props: {className: "bxhtmled-dd-list-wrap"}}));
		this.valueIndex = {};

		if(this.zIndex)
		{
			this.pValuesCont.style.zIndex = this.zIndex;
		}

		var but, value, _this = this, itemClass, i, html;
		for (i = 0; i < this.arValues.length; i++)
		{
			value = this.arValues[i];
			itemClass = this.itemClassName;
			if (value.className)
				itemClass += ' ' + value.className;

			html = value.tagName ? ('<' + value.tagName + '>' + value.name + '</' + value.tagName + '>') : value.name;
			but = this.pValuesContWrap.appendChild(BX.create("SPAN", {props: {title: value.title || value.name, className: itemClass}, html: html, style: value.style}));

			but.setAttribute('data-bx-dropdown-value', value.id);
			this.valueIndex[value.id] = i;

			if (value.defaultValue)
				this.SelectItem(null, value);

			if (value.action)
			{
				but.setAttribute('data-bx-type', 'action');
				but.setAttribute('data-bx-action', value.action);
				if (value.value)
					but.setAttribute('data-bx-value', value.value);
			}

			BX.bind(but, 'mousedown', function(e)
			{
				if (!e)
					e = window.event;
				_this.SelectItem(this.getAttribute('data-bx-dropdown-value'));
				_this.editor.CheckCommand(this);
			});

			this.arValues[i].listCont = but;
		}

		if (this.action && this.checkableAction)
		{
			this.editor.RegisterCheckableAction(this.action, {
				action: this.action,
				control: this
			});
		}

		BX.bind(this.pCont, 'click', BX.proxy(this.OnClick, this));
	};

	DropDownList.prototype.SelectItem = function (valDropdown, val, bClose)
	{
		bClose = bClose !== false;
		if (!val)
		{
			val = this.arValues[this.valueIndex[valDropdown]];
		}

		if (this.lastActiveItem)
		{
			BX.removeClass(this.lastActiveItem, this.activeListClassName);
		}

		if (val)
		{
			this.pCont.innerHTML = BX.util.htmlspecialchars((val.topName || val.name || val.id));
			this.pCont.title = this.title + ': ' + BX.util.htmlspecialchars(val.title || val.name);


			// Select value in list as active
			if (val.listCont)
			{
				this.lastActiveItem = val.listCont;
				BX.addClass(val.listCont, this.activeListClassName);
			}
		}

		if (this.bOpened && bClose)
		{
			this.Close();
		}
	};

	DropDownList.prototype.SetValue = function(active, state)
	{
	};

	DropDownList.prototype.SetWidth = function(width)
	{
		width = parseInt(width, 10);
		if (width)
		{
			this.width = width;
			this.pCont.style.width = width + 'px';
		}
	};

	DropDownList.prototype.Disable = function(bFlag)
	{
		if(bFlag != this.disabled)
		{
			this.disabled = !!bFlag;
			if(bFlag)
			{
				BX.addClass(this.pCont, 'bxhtmled-top-bar-select-disabled');
			}
			else
			{
				BX.removeClass(this.pCont, 'bxhtmled-top-bar-select-disabled');
			}
		}
	};

	// Combobox with multiple choice of values
	function ComboBox(editor, params)
	{
		this.values = [];
		this.pInput = params.input;
		this.editor = editor;
		this.value = params.value || '';
		this.defaultValue = params.defaultValue || '';
		this.posOffset = {top: 8, left: -4};
		this.zIndex = 3010;
		this.SPLIT_SYMBOL = ',';
		this.itemClassName = 'bxhtmled-dd-list-item';
		this.itemClassNameActive = 'bxhtmled-dd-list-item-active';
	}

	ComboBox.prototype = {
		Init: function()
		{
			BX.bind(this.pInput, 'focus', BX.proxy(this.Focus, this));
			BX.bind(this.pInput, 'click', BX.proxy(this.Focus, this));
			BX.bind(this.pInput, 'blur', BX.proxy(this.Blur, this));
			BX.bind(this.pInput, 'keyup', BX.proxy(this.KeyUp, this));

			this.visibleItemsLength = this.values.length;
			this.currentItem = false;
		},

		UpdateValues: function(values)
		{
			this.bCreated = false;
			this.values = values;
			this.visibleItemsLength = this.values.length;
			this.currentItem = false;
			if (this.bOpened)
			{
				this.ClosePopup();
			}
		},

		Create: function()
		{
			this.pValuesCont = BX.create("DIV", {props: {className: "bxhtmled-popup bxhtmled-combo-cont"}, html: '<div class="bxhtmled-popup-corner"></div>'});
			this.pValuesCont.style.zIndex = this.zIndex;

			if (this.pValuesContWrap)
			{
				BX.cleanNode(this.pValuesContWrap);
				this.pValuesCont.appendChild(this.pValuesContWrap);
			}
			else
			{
				this.pValuesContWrap = this.pValuesCont.appendChild(BX.create("DIV", {props: {className: "bxhtmled-dd-list-wrap"}}));

				BX.bind(this.pValuesContWrap, 'mousedown', function(e)
				{
					var target = e.target || e.srcElement;
					if (!target.getAttribute('data-bx-dropdown-value'))
					{
						target = BX.findParent(target, function(n)
						{
							return n.getAttribute && n.getAttribute('data-bx-dropdown-value');
						}, _this.pValuesContWrap);
					}

					if (target)
					{
						_this.currentItem = parseInt(target.getAttribute('data-bx-dropdown-value'), 10);
						_this.SetValueFromList();
					}

					_this.ClosePopup();
				});
			}
			this.valueIndex = {};

			var but, value, _this = this, itemClass, i, html;
			for (i = 0; i < this.values.length; i++)
			{
				value = this.values[i];
				itemClass = this.itemClassName || '';
				this.values[i].TITLE = this.values[i].TITLE || this.values[i].NAME;

				if (this.values[i].VALUE && this.values[i].VALUE !== this.values[i].TITLE)
				{
					this.values[i].TITLE += ' (' + this.values[i].VALUE + ')';
				}
				else
				{
					this.values[i].VALUE = this.values[i].NAME;
				}

				but = this.pValuesContWrap.appendChild(BX.create("SPAN", {props: {className: itemClass}, html: value.TITLE}));
				but.setAttribute('data-bx-dropdown-value', i);
				this.values[i].cont = but;
			}

			this.bCreated = true;
		},

		KeyUp: function(e)
		{
			var keyCode = e.keyCode;
			if (keyCode == this.editor.KEY_CODES['down'])
			{
				this.SelectItem(1);
			}
			else if (keyCode == this.editor.KEY_CODES['up'])
			{
				this.SelectItem(-1);
			}
			else if (keyCode == this.editor.KEY_CODES['escape'])
			{
				if (this.bOpened)
				{
					this.ClosePopup();
					return BX.PreventDefault(e);
				}
			}
			else if (keyCode == this.editor.KEY_CODES['enter'])
			{
				if (this.bOpened)
				{
					this.SetValueFromList();
					this.ClosePopup();
					return BX.PreventDefault(e);
				}
			}
			else
			{
				this.FilterValue();
			}
		},

		FilterValue: function()
		{
			// Range
			var
				i, val,
				splitedVals = this.GetSplitedValues(),
				caretPos = this.GetCaretPos(this.pInput);

			for (i = 0; i < splitedVals.length; i++)
			{
				val = splitedVals[i];
				if (caretPos >= val.start && caretPos <= val.end)
				{
					break;
				}
			}

			// Filter values && highlight values
			this.FilterAndHighlight(val.value);
		},

		GetSplitedValues: function()
		{
			var
				arVals, i, gStart, gEnd, val,
				res = [],
				str = this.pInput.value;

			if (str.indexOf(this.SPLIT_SYMBOL) === -1 || this.bMultiple === false)
			{
				res.push(
					{
						start: 0,
						end: str.length,
						value: BX.util.trim(str)
					}
				);
			}
			else
			{
				arVals = str.split(this.SPLIT_SYMBOL);
				gStart = 0;
				gEnd = 0;
				for (i = 0; i < arVals.length; i++)
				{
					val = arVals[i];
					gEnd += val.length + i;
					res.push(
						{
							start: gStart,
							end: gEnd,
							value: BX.util.trim(val)
						}
					);
					gStart = gEnd;
				}
			}

			return res;
		},

		FilterAndHighlight: function(needle)
		{
			needle = BX.util.trim(needle);
			var val, i, showPopup = false, pos;

			this.visibleItemsLength = 0;
			for (i = 0; i < this.values.length; i++)
			{
				val = this.values[i];
				if (needle === '')
				{
					showPopup = true;
					val.cont.style.display = '';
					this.visibleItemsLength++;
				}
				else
				{
					pos = val.TITLE.toLowerCase().indexOf(needle.toLowerCase());
					if (pos !== -1 || needle == '')
					{
						val.cont.innerHTML = BX.util.htmlspecialchars(val.TITLE.substr(0, pos)) + '<b>' + BX.util.htmlspecialchars(needle) + '</b>' + BX.util.htmlspecialchars(val.TITLE.substr(pos + needle.length));
						showPopup = true;
						val.cont.style.display = '';
						val.cont.setAttribute('data-bx-dropdown-value', this.visibleItemsLength);
						this.visibleItemsLength++;
					}
					else
					{
						val.cont.innerHTML = BX.util.htmlspecialchars(val.TITLE);
						val.cont.style.display = 'none';
					}
				}
			}

			this.currentItem = false;

			if (showPopup && !this.bOpened)
			{
				this.ShowPopup();
			}
			else if (!showPopup && this.bOpened)
			{
				this.ClosePopup();
			}
		},

		GetCaretPos: function(input)
		{
			var caretPos = 0;

			// IE Support
			if (document.selection)
			{
				BX.focus(input);
				var oSel = document.selection.createRange();
				oSel.moveStart ('character', - input.value.length);
				// The caret position is selection length
				caretPos = oSel.text.length;
			}
			else if (input.selectionStart || input.selectionStart == '0')
			{
				caretPos = input.selectionStart;
			}
			return (caretPos);
		},

		SetValue: function(value)
		{
			this.pInput.value = value;
		},

		SetValueFromList: function()
		{
			var ind = 0, val, i;
			for (i = 0; i < this.values.length; i++)
			{
				val = this.values[i];
				if (val.cont.style.display != 'none')
				{
					if (ind == this.currentItem)
					{
						BX.addClass(val.cont, this.itemClassNameActive);
						break;
					}
					ind++;
				}
			}

			var
				splVal,
				splitedVals = this.GetSplitedValues(),
				caretPos = this.GetCaretPos(this.pInput);

			for (i = 0; i < splitedVals.length; i++)
			{
				splVal = splitedVals[i];
				if (caretPos >= splVal.start && caretPos <= splVal.end)
				{
					break;
				}
			}

			var
				glue = this.SPLIT_SYMBOL == ' ' ? ' ' : this.SPLIT_SYMBOL + ' ',
				curValue = this.pInput.value,
				before = curValue.substr(0, splVal.start),
				after = curValue.substr(splVal.end);

			before = before.replace(/^[\s\r\n\,]+/g, '').replace(/[\s\r\n\,]+$/g, '');
			after = after.replace(/^[\s\r\n\,]+/g, '').replace(/[\s\r\n\,]+$/g, '');

			this.pInput.value = before +
				(before == '' ? '' : glue) +
				val.VALUE +
				(after == '' ? '' : glue) +
				after;

			this.FilterAndHighlight('');
		},

		SelectItem: function(delta)
		{
			var ind, val, i, len;
			if (this.currentItem === false)
			{
				this.currentItem = 0;
			}
			else if(delta !== undefined)
			{
				this.currentItem += delta;

				if (this.currentItem > this.visibleItemsLength - 1)
				{
					this.currentItem = 0;
				}
				else if(this.currentItem < 0)
				{
					this.currentItem = this.visibleItemsLength - 1;
				}
			}

			if (document.querySelectorAll)
			{
				var selected = this.pValuesContWrap.querySelectorAll("." + this.itemClassNameActive);
				if (selected)
				{
					for (i = 0; i < selected.length; i++)
					{
						BX.removeClass(selected[i], this.itemClassNameActive);
					}
				}
			}

			ind = 0;
			len = this.values.length;
			for (i = 0; i < this.values.length; i++)
			{
				val = this.values[i];
				if (val.cont.style.display != 'none')
				{
					if (ind == this.currentItem)
					{
						BX.addClass(val.cont, this.itemClassNameActive);
						break;
					}
					ind++;
				}
			}
		},

		Focus: function(e)
		{
			if (this.values.length > 0 && !this.bFocused)
			{
				BX.focus(this.pInput);
				this.bFocused = true;
				if (this.value == this.defaultValue)
				{
					this.value = '';
				}

				this.ShowPopup();
			}
		},

		Blur: function()
		{
			if (this.values.length > 0 && this.bFocused)
			{
				this.bFocused = false;
				this.ClosePopup();
			}
		},

		ShowPopup: function()
		{
			if (!this.bCreated)
			{
				this.Create();
			}

			this.editor.popupShown = true;
			if (this.popupShownTimeout)
			{
				this.popupShownTimeout = clearTimeout(this.popupShownTimeout);
			}

			document.body.appendChild(this.pValuesCont);
			this.pValuesCont.style.display = 'block';

			var
				i,
				pos = BX.pos(this.pInput),
				left = pos.left + this.posOffset.left,
				top = pos.bottom + this.posOffset.top;

			this.pValuesCont.style.top = top + 'px';
			this.pValuesCont.style.left = left + 'px';
			this.bOpened = true;

			if (document.querySelectorAll)
			{
				var selected = this.pValuesContWrap.querySelectorAll("." + this.itemClassNameActive);
				if (selected)
				{
					for (i = 0; i < selected.length; i++)
					{
						BX.removeClass(selected[i], this.itemClassNameActive);
					}
				}
			}

			BX.onCustomEvent(this, "OnComboPopupOpen");
		},

		ClosePopup: function()
		{
			var _this = this;
			this.popupShownTimeout = setTimeout(function(){_this.editor.popupShown = false;}, 300);
			this.pValuesCont.style.display = 'none';
			this.editor.overlay.Hide();

			this.bOpened = false;
			BX.onCustomEvent(this, "OnComboPopupClose");
		},

		OnChange: function()
		{
		},

		CheckClose: function(e)
		{
			if (!this.bOpened)
			{
				return BX.unbind(document, 'mousedown', BX.proxy(this.CheckClose, this));
			}

			var pEl;
			if (e.target)
				pEl = e.target;
			else if (e.srcElement)
				pEl = e.srcElement;
			if (pEl.nodeType == 3)
				pEl = pEl.parentNode;

			if (!BX.findParent(pEl, {className: 'bxhtmled-popup'}))
				this.Close();
		}
	};

	function ClassSelector(editor, params)
	{
		// Call parrent constructor
		ClassSelector.superclass.constructor.apply(this, arguments);
		this.filterTag = params.filterTag || '';
		this.lastTemplateId = this.editor.GetTemplateId();
		this.values = this.GetClasses();
		this.SPLIT_SYMBOL = ' ';
		this.Init();
	}
	BX.extend(ClassSelector, ComboBox);

	ClassSelector.prototype.OnChange = function()
	{
		if (this.lastTemplateId != this.editor.GetTemplateId())
		{
			this.lastTemplateId = this.editor.GetTemplateId();
			this.values = this.GetClasses();
			this.bCreated = false;
		}
	};

	ClassSelector.prototype.GetClasses = function()
	{
		var
			title,
			classes = this.editor.GetCurrentCssClasses(this.filterTag);

		this.values = [];
		if (classes && classes.length > 0)
		{
			for (var i = 0; i < classes.length; i++)
			{
				title = null;
				if (classes[i].classTitle && typeof classes[i].classTitle == 'object')
				{
					if (classes[i].classTitle.title)
					{
						title = classes[i].classTitle.title;
					}
					else
					{
						continue;
					}
				}
				else if (classes[i].classTitle)
				{
					title = classes[i].classTitle;
				}

				this.values.push(
					{
						VALUE: classes[i].className,
						TITLE:  title,
						NAME: classes[i].className
					}
				);
			}
		}
		return this.values;
	};

	function PasteControl(editor)
	{
		this.editor = editor;
		if (this.editor.config.pasteSetColors !== this.editor.config.pasteSetBorders ||
				this.editor.config.pasteSetColors !== this.editor.config.pasteSetDecor)
		{
			this.mode = 'default';
		}
		else
		{
			this.mode = this.editor.config.pasteSetColors &&
			this.editor.config.pasteSetBorders &&
			this.editor.config.pasteSetDecor ? 'text' : 'rich';
		}

		var _this = this;

		this.items = [];
		if (this.mode == 'default')
		{
			this.items = [
				{
					TEXT: BX.message('BXEdPasteDefault'),
					ACTION: function()
					{
						_this.Hide('default');
					},
					CHECKED: this.mode == 'default',
					_MODE: 'default'
				}
			];
		}

		this.items.push({
			TEXT: BX.message('BXEdPasteText'),
			ACTION: function()
			{
				_this.Hide('text');
			},
			CHECKED: this.mode == 'text',
			_MODE: 'text'
		});
		this.items.push({
			TEXT: BX.message('BXEdPasteFormattedText'),
			ACTION: function()
			{
				_this.Hide('rich');
			},
			CHECKED: this.mode == 'rich',
			_MODE: 'rich'
		});

		// mantis: 71968
		BX.addCustomEvent('OnComponentParamsDisplay', BX.proxy(this.Hide, this));
	}

	PasteControl.prototype = {
		CheckAndShow: function ()
		{
			var
				isOpened = this.isOpened,
				_this = this;

			this.savedRange = this.editor.selection.GetBookmark();
			this.isOpened = true;
			this.lastPreviewMode = false;
			if (this.checkTimeout)
				this.checkTimeout = clearTimeout(this.checkTimeout);

			this.checkTimeout = setTimeout(function()
			{
				var skipPasteHandler = _this.editor.skipPasteHandler;
				_this.editor.skipPasteHandler = true;
				_this.PreviewContent({mode: 'rich', doTimeout: false, skipColors: true});
				var richContent = _this.editor.iframeView.GetValue();
				// Clear images before comparision
				richContent = richContent.replace(/<img((?:\s|\S)*?)>/ig, '');
				richContent = richContent.replace(/id="(\s|\S)*?"/ig, '');
				richContent = richContent.replace(/\s+/ig, ' ');

				_this.PreviewContent({mode: 'text', doTimeout: false});
				var textContent = _this.editor.iframeView.GetValue();
				// Clear images before comparision
				textContent = textContent.replace(/<img((?:\s|\S)*?)>/ig, '');
				textContent = textContent.replace(/id="(\s|\S)*?"/ig, '');
				textContent = textContent.replace(/\s+/ig, ' ');

				if (richContent != textContent)
				{
					_this.isOpened = isOpened;
					_this.editor.SetCursorNode(_this.savedRange);
					_this.Show();
				}

				_this.editor.skipPasteHandler = skipPasteHandler;
			}, 200);
		},

		Show: function ()
		{
			var _this = this;
			this.lastPreviewMode = false;
			this.Hide();

			this.pOverlay = this.editor.overlay.Show();
			BX.bind(this.pOverlay, 'click', BX.proxy(this.Hide, this));
			BX.bind(this.pOverlay, 'mousemove', BX.proxy(function(){this.PreviewContent({mode: 'default'});}, this));

			if (!this.dummyTarget)
			{
				this.dummyTarget = this.editor.dom.iframeCont.appendChild(BX.create('DIV', {props: {className: 'bxhtmled-dummy-target'}}));
			}

			var
				cursorNode = this.editor.GetIframeElement('bx-cursor-node'),
				top = 0, left = 0, node;

			if (cursorNode)
			{
				if (cursorNode.parentNode)
				{
					top += cursorNode.offsetHeight;
					node = cursorNode;
					do
					{
						top += node.offsetTop || 0;
						left += node.offsetLeft || 0;
						node = node.offsetParent;
					} while (node && node.nodeName != 'BODY');
				}
			}

			var scrollPos = BX.GetWindowScrollPos(this.editor.GetIframeDoc());

			top -= scrollPos.scrollTop;
			left -= scrollPos.scrollLeft;

			var
				editorSize = this.editor.GetSceletonSize(),
				maxTop = editorSize.height - this.items.length * 40,
				maxLeft = editorSize.width - 100;

			if (top < 0)
				top = 0;
			else if (top > maxTop)
				top = maxTop;

			if (left < 0)
				left = 0;
			else if (left > maxLeft)
				left = maxLeft;

			this.dummyTarget.style.left = left + 'px';
			this.dummyTarget.style.top = top + 'px';
			this.dummyTarget.style.zIndex = '2002';

			this.OPENER = new BX.COpener({
				DIV: this.dummyTarget, MENU: this.items, TYPE: 'click', ACTIVE_CLASS: 'adm-btn-active', CLOSE_ON_CLICK: true
			});
			this.OPENER.Open();

			var popupDiv = this.OPENER.GetMenu().DIV;
			popupDiv.style.zIndex = '3005';
			BX.addClass(popupDiv, 'bxhtmled-paste-control bx-core-popup-menu-editor');

			BX.addCustomEvent(this.OPENER.GetMenu(), 'onMenuClose', BX.proxy(this.Hide, this));

			var i, items = BX.findChild(popupDiv, {className: 'bx-core-popup-menu-item'}, 1, 1);
			for (i = 0; i < items.length; i++)
			{
				items[i].setAttribute('data-bx-mode', this.items[i]._MODE);
			}

			BX.bind(popupDiv, 'mousemove', function(e)
			{
				var
					target = e.target || e.srcElement,
					mode = (target && target.getAttribute) ? target.getAttribute('data-bx-mode') : null;

				if (!mode)
				{
					target = BX.findParent(target, function(n)
					{
						return n == popupDiv || (n.getAttribute && n.getAttribute('data-bx-mode'));
					}, popupDiv);
					mode = (target && target.getAttribute) ? target.getAttribute('data-bx-mode') : null;
				}

				_this.PreviewContent({mode: mode});
			});

			this.isOpened = true;
			BX.addCustomEvent(this.editor, 'OnIframeKeydown', BX.CMenu.broadcastCloseEvent);
			BX.bind(document.body, "keydown", BX.CMenu.broadcastCloseEvent);
		},

		Hide: function (mode)
		{
			if (this.isOpened)
			{
				this.editor.overlay.Hide();
				if (this.pOverlay)
				{
					BX.unbind(this.pOverlay, 'click', BX.proxy(this.Hide, this));
					BX.unbind(this.pOverlay, 'mousemove', BX.proxy(this.PreviewContent, this));
				}

				BX.removeCustomEvent(this.editor, 'OnIframeKeydown', BX.CMenu.broadcastCloseEvent);
				BX.unbind(document.body, "keydown", BX.CMenu.broadcastCloseEvent);

				if (!mode || typeof mode !== 'string' || (mode !== 'text' && mode !== 'rich'))
					mode = 'default';
				this.PreviewContent({mode: mode});
				this.editor.Focus();

				this.editor.On("OnIframePaste");
				this.editor.On("OnIframeNewWord");

				this.isOpened = false;
			}
		},

		PreviewContent: function(params)
		{
			if (this.isOpened)
			{
				if (this.lastPreviewMode != params.mode || !this.lastPreviewMode)
				{
					if (params.doTimeout !== false)
					{
						params.doTimeout = false;
						var _this = this;
						if (this.previewTimeout)
							clearTimeout(this.previewTimeout);
						this.previewTimeout = setTimeout(function(){_this.PreviewContent(params);}, 200);
						return;
					}

					if (params.mode == 'rich')
					{
						this.editor.config.pasteSetColors = !!params.skipColors;
						this.editor.config.pasteSetBorders = false;
						this.editor.config.pasteSetDecor = false;
					}
					else if (params.mode == 'text')
					{
						this.editor.config.pasteSetColors = true;
						this.editor.config.pasteSetBorders = true;
						this.editor.config.pasteSetDecor = true;
					}
					else // rich
					{
						this.editor.config.pasteSetColors = this.defPasteSetColors;
						this.editor.config.pasteSetBorders = this.defPasteSetBorders;
						this.editor.config.pasteSetDecor = this.defPasteSetDecor;
					}

					this.editor.pasteHandleMode = true;
					this.editor.bbParseContentMode = true;
					this.editor.synchro.lastIframeValue = false;

					this.editor.iframeView.SetValue(this.pastedContent, false);
					this.editor.synchro.FromIframeToTextarea(true, true);

					this.editor.pasteHandleMode = false;
					this.editor.bbParseContentMode = false;

					this.editor.synchro.lastTextareaValue = false;
					this.editor.synchro.FromTextareaToIframe(true);

					this.editor.RestoreCursor();

					this.editor.skipPasteHandler = false;

					// Restore settings
					if (params.mode != 'default')
					{
						this.editor.config.pasteSetColors = this.defPasteSetColors;
						this.editor.config.pasteSetBorders = this.defPasteSetBorders;
						this.editor.config.pasteSetDecor = this.defPasteSetDecor;
					}
				}
				this.lastPreviewMode = params.mode;
			}
		},

		SaveIframeContent: function(content)
		{
			// Save default values
			this.defPasteSetColors = this.editor.config.pasteSetColors;
			this.defPasteSetBorders = this.editor.config.pasteSetBorders;
			this.defPasteSetDecor = this.editor.config.pasteSetDecor;

			this.pastedContent = content;
		}
	};

	function __run()
	{
		window.BXHtmlEditor.TaskbarManager = TaskbarManager;
		window.BXHtmlEditor.Taskbar = Taskbar;
		window.BXHtmlEditor.ComponentsControl = ComponentsControl;
		window.BXHtmlEditor.ContextMenu = ContextMenu;
		window.BXHtmlEditor.Dialog = Dialog;
		window.BXHtmlEditor.Toolbar = Toolbar;
		window.BXHtmlEditor.NodeNavigator = NodeNavi;
		window.BXHtmlEditor.Button = Button;
		window.BXHtmlEditor.DropDown = DropDown;
		window.BXHtmlEditor.DropDownList = DropDownList;
		window.BXHtmlEditor.ComboBox = ComboBox;
		window.BXHtmlEditor.ClassSelector = ClassSelector;
		window.BXHtmlEditor.Overlay = Overlay;
		window.BXHtmlEditor.PasteControl = PasteControl;

		BX.onCustomEvent(window.BXHtmlEditor, 'OnEditorBaseControlsDefined');
	}

	if (window.BXHtmlEditor)
	{
		__run();
	}
	else
	{
		BX.addCustomEvent(window, "OnBXHtmlEditorInit", __run);
	}
})();

/* End */
;
; /* Start:"a:4:{s:4:"full";s:68:"/bitrix/js/fileman/html_editor/html-controls.min.js?1595691878122255";s:6:"source";s:47:"/bitrix/js/fileman/html_editor/html-controls.js";s:3:"min";s:51:"/bitrix/js/fileman/html_editor/html-controls.min.js";s:3:"map";s:51:"/bitrix/js/fileman/html_editor/html-controls.map.js";}"*/
(function(){function t(){var t=window.BXHtmlEditor.Button,e=window.BXHtmlEditor.Dialog;function i(t,e,i){this.editor=t;this.params=i||{};this.className="bxhtmled-top-bar-btn bxhtmled-top-bar-color";this.activeClassName="bxhtmled-top-bar-btn-active";this.disabledClassName="bxhtmled-top-bar-btn-disabled";this.bCreated=false;this.zIndex=3009;this.disabledForTextarea=true;this.posOffset={top:6,left:0};this.id="color";this.title=BX.message("BXEdForeColor");this.actionColor="foreColor";this.actionBg="backgroundColor";this.showBgMode=!this.editor.bbCode;this.disabledForTextarea=!t.bbCode;this.Create();if(e){e.appendChild(this.GetCont())}}i.prototype={Create:function(){this.pCont=BX.create("SPAN",{props:{className:this.className,title:this.title||""}});this.pContLetter=this.pCont.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-top-bar-btn-text"},html:"A"}));this.pContStrip=this.pCont.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-top-bar-color-strip"}}));this.currentAction=this.actionColor;BX.bind(this.pCont,"click",BX.delegate(this.OnClick,this));BX.bind(this.pCont,"mousedown",BX.delegate(this.OnMouseDown,this));if(this.params.registerActions!==false){this.editor.RegisterCheckableAction(this.actionColor,{action:this.actionColor,control:this,value:this.value});this.editor.RegisterCheckableAction(this.actionBg,{action:this.actionBg,control:this,value:this.value})}},GetCont:function(){return this.pCont},Check:function(t){if(t!=this.checked&&!this.disabled){this.checked=t;if(this.checked){BX.addClass(this.pCont,"bxhtmled-top-bar-btn-active")}else{BX.removeClass(this.pCont,"bxhtmled-top-bar-btn-active")}}},Disable:function(t){if(t!=this.disabled){this.disabled=!!t;if(t){BX.addClass(this.pCont,"bxhtmled-top-bar-btn-disabled")}else{BX.removeClass(this.pCont,"bxhtmled-top-bar-btn-disabled")}}},GetValue:function(){return!!this.checked},SetValue:function(t,e,i){if(e&&e[0]){var s=i==this.actionColor?e[0].style.color:e[0].style.backgroundColor;this.SelectColor(s,i)}else{this.SelectColor(null,i)}},OnClick:function(){if(this.disabled){return false}if(this.bOpened){return this.Close()}this.Open()},OnMouseUp:function(){this.editor.selection.RestoreBookmark();if(!this.checked){BX.removeClass(this.pCont,this.activeClassName)}BX.unbind(document,"mouseup",BX.proxy(this.OnMouseUp,this));BX.removeCustomEvent(this.editor,"OnIframeMouseUp",BX.proxy(this.OnMouseUp,this))},OnMouseDown:function(){if(!this.disabled){if(this.disabledForTextarea||!this.editor.synchro.IsFocusedOnTextarea()){this.editor.selection.SaveBookmark()}BX.addClass(this.pCont,this.activeClassName);BX.bind(document,"mouseup",BX.proxy(this.OnMouseUp,this));BX.addCustomEvent(this.editor,"OnIframeMouseUp",BX.proxy(this.OnMouseUp,this))}},Close:function(){var t=this;this.popupShownTimeout=setTimeout(function(){t.editor.popupShown=false},300);this.pValuesCont.style.display="none";BX.removeClass(this.pCont,this.activeClassName);this.editor.overlay.Hide();BX.unbind(window,"keydown",BX.proxy(this.OnKeyDown,this));BX.unbind(document,"mousedown",BX.proxy(this.CheckClose,this));this.bOpened=false},CheckClose:function(t){if(!this.bOpened){return BX.unbind(document,"mousedown",BX.proxy(this.CheckClose,this))}var e;if(t.target)e=t.target;else if(t.srcElement)e=t.srcElement;if(e.nodeType==3)e=e.parentNode;if(e!==this.custInp&&!BX.findParent(e,{className:"lhe-colpick-cont"})){this.Close()}},Open:function(){this.editor.popupShown=true;if(this.popupShownTimeout){this.popupShownTimeout=clearTimeout(this.popupShownTimeout)}var t=this;if(!this.bCreated){this.pValuesCont=document.body.appendChild(BX.create("DIV",{props:{className:"bxhtmled-popup  bxhtmled-color-cont"},style:{zIndex:this.zIndex},html:'<div class="bxhtmled-popup-corner"></div>'}));if(this.showBgMode){this.pTextColorLink=this.pValuesCont.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-color-link bxhtmled-color-link-active"},text:this.params.ForeColorMess||BX.message("BXEdForeColor")}));this.pTextColorLink.setAttribute("data-bx-type","changeColorAction");this.pTextColorLink.setAttribute("data-bx-value",this.actionColor);this.pBgColorLink=this.pValuesCont.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-color-link"},text:this.params.BgColorMess||BX.message("BXEdBackColor")}));this.pBgColorLink.setAttribute("data-bx-type","changeColorAction");this.pBgColorLink.setAttribute("data-bx-value",this.actionBg)}this.pValuesContWrap=this.pValuesCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-color-wrap"}}));BX.bind(this.pValuesCont,"mousedown",function(e){var i=e.target||e.srcElement,s;if(i!=t.pValuesCont){s=i&&i.getAttribute?i.getAttribute("data-bx-type"):null;if(!s){i=BX.findParent(i,function(e){return e==t.pValuesCont||e.getAttribute&&e.getAttribute("data-bx-type")},t.pValuesCont);s=i&&i.getAttribute?i.getAttribute("data-bx-type"):null}if(s=="customColorAction"){var a=i.getAttribute("data-bx-value");if(a=="link"){t.ShowCustomColor(true,t.colorCell.style.backgroundColor);BX.PreventDefault(e)}if(a=="button"){t.SelectColor(t.custInp.value);if(t.params.checkAction!==false&&t.editor.action.IsSupported(t.currentAction)){t.editor.action.Exec(t.currentAction,t.custInp.value)}}}else if(s=="changeColorAction"){if(t.showBgMode){t.SetMode(i.getAttribute("data-bx-value"));BX.PreventDefault(e)}}else if(i&&s){i.setAttribute("data-bx-action",t.currentAction);if(t.params.checkAction!==false){t.editor.CheckCommand(i)}t.SelectColor(i.getAttribute("data-bx-value"))}}});var e=["#FF0000","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF","#FFFFFF","#EBEBEB","#E1E1E1","#D7D7D7","#CCCCCC","#C2C2C2","#B7B7B7","#ACACAC","#A0A0A0","#959595","#EE1D24","#FFF100","#00A650","#00AEEF","#2F3192","#ED008C","#898989","#7D7D7D","#707070","#626262","#555555","#464646","#363636","#262626","#111111","#000000","#F7977A","#FBAD82","#FDC68C","#FFF799","#C6DF9C","#A4D49D","#81CA9D","#7BCDC9","#6CCFF7","#7CA6D8","#8293CA","#8881BE","#A286BD","#BC8CBF","#F49BC1","#F5999D","#F16C4D","#F68E54","#FBAF5A","#FFF467","#ACD372","#7DC473","#39B778","#16BCB4","#00BFF3","#438CCB","#5573B7","#5E5CA7","#855FA8","#A763A9","#EF6EA8","#F16D7E","#EE1D24","#F16522","#F7941D","#FFF100","#8FC63D","#37B44A","#00A650","#00A99E","#00AEEF","#0072BC","#0054A5","#2F3192","#652C91","#91278F","#ED008C","#EE105A","#9D0A0F","#A1410D","#A36209","#ABA000","#588528","#197B30","#007236","#00736A","#0076A4","#004A80","#003370","#1D1363","#450E61","#62055F","#9E005C","#9D0039","#790000","#7B3000","#7C4900","#827A00","#3E6617","#045F20","#005824","#005951","#005B7E","#003562","#002056","#0C004B","#30004A","#4B0048","#7A0045","#7A0026"];var i,s,a,l=BX.create("TABLE",{props:{className:"bxhtmled-color-tbl"}}),o,n=e.length;this.pDefValueRow=l.insertRow(-1);s=this.pDefValueRow.insertCell(-1);s.colSpan=5;var h=s.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-color-def-but"}}));h.innerHTML=BX.message("BXEdDefaultColor");h.setAttribute("data-bx-type","action");h.setAttribute("data-bx-action",this.action);h.setAttribute("data-bx-value","");a=this.pDefValueRow.insertCell(-1);a.colSpan=5;a.className="bxhtmled-color-inp-cell";a.style.backgroundColor=e[38];this.colorCell=a;s=this.pDefValueRow.insertCell(-1);s.colSpan=6;this.custLink=s.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-color-custom"},html:BX.message("BXEdColorOther")}));this.custLink.setAttribute("data-bx-type","customColorAction");this.custLink.setAttribute("data-bx-value","link");this.custInp=s.appendChild(BX.create("INPUT",{props:{type:"text",className:"bxhtmled-color-custom-inp"},style:{display:"none"}}));this.custInp.setAttribute("data-bx-type","customColorAction");this.custInp.setAttribute("data-bx-value","input");this.custBut=s.appendChild(BX.create("INPUT",{props:{type:"button",className:"bxhtmled-color-custom-but",value:"ok"},style:{display:"none"}}));this.custBut.setAttribute("data-bx-type","customColorAction");this.custBut.setAttribute("data-bx-value","button");for(o=0;o<n;o++){if(Math.round(o/16)==o/16){i=l.insertRow(-1)}s=i.insertCell(-1);s.innerHTML="&nbsp;";s.className="bxhtmled-color-col-cell";s.style.backgroundColor=e[o];s.id="bx_color_id__"+o;s.setAttribute("data-bx-type","action");s.setAttribute("data-bx-action",this.action);s.setAttribute("data-bx-value",e[o]);s.onmouseover=function(t){this.className="bxhtmled-color-col-cell bxhtmled-color-col-cell-over";a.style.backgroundColor=e[this.id.substring("bx_color_id__".length)]};s.onmouseout=function(t){this.className="bxhtmled-color-col-cell"};s.onclick=function(i){t.Select(e[this.id.substring("bx_color_id__".length)])}}this.pValuesContWrap.appendChild(l);this.bCreated=true}document.body.appendChild(this.pValuesCont);this.pDefValueRow.style.display=t.editor.synchro.IsFocusedOnTextarea()?"none":"";this.pValuesCont.style.display="block";var r=this.editor.overlay.Show(),d=BX.pos(this.pCont),p=d.left-this.pValuesCont.offsetWidth/2+this.pCont.offsetWidth/2+this.posOffset.left,c=d.bottom+this.posOffset.top;if(p<0){var u=this.pValuesCont.getElementsByClassName("bxhtmled-popup-corner")[0];u.style.transform="translateX("+p+"px)";p=0}BX.bind(window,"keydown",BX.proxy(this.OnKeyDown,this));BX.addClass(this.pCont,this.activeClassName);r.onclick=function(){t.Close()};this.pValuesCont.style.left=p+"px";this.pValuesCont.style.top=c+"px";this.bOpened=true;setTimeout(function(){BX.bind(document,"mousedown",BX.proxy(t.CheckClose,t))},100);this.ShowCustomColor(false,"")},SetMode:function(t){this.currentAction=t;var e="bxhtmled-color-link-active";if(t==this.actionColor){BX.addClass(this.pTextColorLink,e);BX.removeClass(this.pBgColorLink,e)}else{BX.addClass(this.pBgColorLink,e);BX.removeClass(this.pTextColorLink,e)}},SelectColor:function(t,e){if(!e){e=this.currentAction}if(this.params.callback&&typeof this.params.callback=="function"){this.params.callback(e,this.editor.util.RgbToHex(t))}if(e==this.actionColor){this.pContLetter.style.color=t||"#000";this.pContStrip.style.backgroundColor=t||"#000"}else{this.pContLetter.style.backgroundColor=t||"transparent"}},ShowCustomColor:function(t,e){if(t!==false){this.custInp.style.display="";this.custBut.style.display="";this.custLink.style.display="none"}else{this.custInp.style.display="none";this.custBut.style.display="none";this.custLink.style.display=""}if(e)e=this.editor.util.RgbToHex(e);this.custInp.value=e.toUpperCase()||""}};function s(t,e){s.superclass.constructor.apply(this,arguments);this.id="search";this.title=BX.message("ButtonSearch");this.className+=" bxhtmled-button-search";this.Create();this.bInited=false;if(e)e.appendChild(this.GetCont())}BX.extend(s,t);s.prototype.OnClick=function(){if(this.disabled)return;if(!this.bInited){var t=this;this.pSearchCont=BX("bx-html-editor-search-cnt-"+this.editor.id);this.pSearchWrap=this.pSearchCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-search-cnt-search"}}));this.pReplaceWrap=this.pSearchCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-search-cnt-replace"}}));this.pSearchInput=this.pSearchWrap.appendChild(BX.create("INPUT",{props:{className:"bxhtmled-top-search-inp",type:"text"}}));this.pShowReplace=this.pSearchWrap.appendChild(BX.create("INPUT",{props:{type:"checkbox",value:"Y"}}));this.pReplaceInput=this.pReplaceWrap.appendChild(BX.create("INPUT",{props:{type:"text"}}));BX.bind(this.pShowReplace,"click",function(){t.ShowReplace(!!this.checked)});this.animation=null;this.animationStartHeight=0;this.animationEndHeight=0;this.height0=0;this.height1=37;this.height2=66;this.bInited=true;this.bReplaceOpened=false}if(!this.bOpened)this.OpenPanel();else this.ClosePanel()};s.prototype.SetPanelHeight=function(t,e){this.pSearchCont.style.height=t+"px";this.pSearchCont.style.opacity=e/100;this.editor.SetAreaContSize(this.origAreaWidth,this.origAreaHeight-t,{areaContTop:this.editor.toolbar.GetHeight()+t})};s.prototype.OpenPanel=function(t){this.pSearchCont.style.display="block";if(this.animation)this.animation.stop();if(t){this.animationStartHeight=this.height1;this.animationEndHeight=this.height2}else{this.origAreaHeight=parseInt(this.editor.dom.areaCont.style.height,10);this.origAreaWidth=parseInt(this.editor.dom.areaCont.style.width,10);this.pShowReplace.checked=false;this.pSearchCont.style.opacity=0;this.animationStartHeight=this.height0;this.animationEndHeight=this.height1}var e=this;this.animation=new BX.easing({duration:300,start:{height:this.animationStartHeight,opacity:t?100:0},finish:{height:this.animationEndHeight,opacity:100},transition:BX.easing.makeEaseOut(BX.easing.transitions.quart),step:function(t){e.SetPanelHeight(t.height,t.opacity)},complete:BX.proxy(function(){this.animation=null},this)});this.animation.animate();this.bOpened=true};s.prototype.ClosePanel=function(t){if(this.animation)this.animation.stop();this.pSearchCont.style.opacity=1;if(t){this.animationStartHeight=this.height2;this.animationEndHeight=this.height1}else{this.animationStartHeight=this.bReplaceOpened?this.height2:this.height1;this.animationEndHeight=this.height0}var e=this;this.animation=new BX.easing({duration:200,start:{height:this.animationStartHeight,opacity:t?100:0},finish:{height:this.animationEndHeight,opacity:100},transition:BX.easing.makeEaseOut(BX.easing.transitions.quart),step:function(t){e.SetPanelHeight(t.height,t.opacity)},complete:BX.proxy(function(){if(!t)this.pSearchCont.style.display="none";this.animation=null},this)});this.animation.animate();if(!t)this.bOpened=false};s.prototype.ShowReplace=function(t){if(t){this.OpenPanel(true);this.bReplaceOpened=true}else{this.ClosePanel(true);this.bReplaceOpened=false}};function a(t,e){a.superclass.constructor.apply(this,arguments);this.id="change_view";this.title=BX.message("ButtonViewMode");this._className=this.className;this.activeClassName="bxhtmled-top-bar-btn-active bxhtmled-top-bar-dd-active";this.topClassName="bxhtmled-top-bar-dd";this.arValues=[{id:"view_wysiwyg",title:BX.message("ViewWysiwyg"),className:this.className+" bxhtmled-button-viewmode-wysiwyg",action:"changeView",value:"wysiwyg"},{id:"view_code",title:BX.message("ViewCode"),className:this.className+" bxhtmled-button-viewmode-code",action:"changeView",value:"code"}];if(!t.bbCode){this.arValues.push({id:"view_split_hor",title:BX.message("ViewSplitHor"),className:this.className+" bxhtmled-button-viewmode-split-hor",action:"splitMode",value:"0"});this.arValues.push({id:"view_split_ver",title:BX.message("ViewSplitVer"),className:this.className+" bxhtmled-button-viewmode-split-ver",action:"splitMode",value:"1"})}this.className+=" bxhtmled-top-bar-dd";this.disabledForTextarea=false;this.Create();if(e)e.appendChild(this.GetCont());var i=this;BX.addCustomEvent(this.editor,"OnSetViewAfter",function(){var t="view_"+i.editor.currentViewName;if(i.editor.currentViewName=="split"){t+="_"+(i.editor.GetSplitMode()?"ver":"hor")}if(t!==i.currentValueId){i.SelectItem(t)}})}BX.extend(a,window.BXHtmlEditor.DropDown);a.prototype.Open=function(){var t=this.editor.IsExpanded();if(!t){var e=BX.pos(this.editor.dom.cont);if(e.left<45)t=true}this.posOffset.left=t?40:-4;a.superclass.Open.apply(this,arguments);this.pValuesCont.firstChild.style.left=t?"20px":""};a.prototype.SelectItem=function(t,e){e=a.superclass.SelectItem.apply(this,[t,e]);if(e){this.pCont.className=this.topClassName+" "+e.className}else{this.pCont.className=this.topClassName+" "+this.className}this.currentValueId=t};function l(t,e){l.superclass.constructor.apply(this,arguments);this.id="bbcode";this.title=this.editor.bbCode?BX.message("BXEdBbCode"):BX.message("BXEdHtmlCode");this.className+=this.editor.bbCode?" bxhtmled-button-bbcode":" bxhtmled-button-htmlcode";this.disabledForTextarea=false;this.Create();var i=this;BX.addCustomEvent(this.editor,"OnSetViewAfter",function(){i.Check(i.editor.GetViewMode()=="code")});if(e)e.appendChild(this.GetCont())}BX.extend(l,t);l.prototype.OnClick=function(){if(this.disabled)return;if(this.editor.GetViewMode()=="wysiwyg"){this.editor.SetView("code",true);this.Check(true)}else{this.editor.SetView("wysiwyg",true);this.Check(false)}};function o(t,e){o.superclass.constructor.apply(this,arguments);this.id="undo";this.title=BX.message("Undo");this.className+=" bxhtmled-button-undo";this.action="doUndo";this.Create();if(e)e.appendChild(this.GetCont());var i=this;this.Disable(true);this._disabled=true;BX.addCustomEvent(this.editor,"OnEnableUndo",function(t){i._disabled=!t;i.Disable(!t)})}BX.extend(o,t);o.prototype.Disable=function(t){t=t||this._disabled;if(t!=this.disabled){this.disabled=!!t;if(t)BX.addClass(this.pCont,"bxhtmled-top-bar-btn-disabled");else BX.removeClass(this.pCont,"bxhtmled-top-bar-btn-disabled")}};function n(t,e){n.superclass.constructor.apply(this,arguments);this.id="redo";this.title=BX.message("Redo");this.className+=" bxhtmled-button-redo";this.action="doRedo";this.Create();if(e)e.appendChild(this.GetCont());var i=this;this.Disable(true);this._disabled=true;BX.addCustomEvent(this.editor,"OnEnableRedo",function(t){i._disabled=!t;i.Disable(!t)})}BX.extend(n,t);n.prototype.Disable=function(t){t=t||this._disabled;if(t!=this.disabled){this.disabled=!!t;if(t)BX.addClass(this.pCont,"bxhtmled-top-bar-btn-disabled");else BX.removeClass(this.pCont,"bxhtmled-top-bar-btn-disabled")}};function h(t,e){h.superclass.constructor.apply(this,arguments);this.id="style_selector";this.title=BX.message("StyleSelectorTitle");this.className+=" ";this.action="formatStyle";this.itemClassNameGroup="bxhtmled-dd-list-item-gr";this.OPEN_DELAY=800;this.checkedClasses=[];this.checkedTags=this.editor.GetBlockTags();this.arValues=this.GetStyleListValues();this.Create();if(e)e.appendChild(this.GetCont());BX.addCustomEvent(this.editor,"OnApplySiteTemplate",BX.proxy(this.OnTemplateChanged,this))}BX.extend(h,window.BXHtmlEditor.DropDownList);h.prototype.OnTemplateChanged=function(){if(this.bOpened)this.Close();this.arValues=this.GetStyleListValues();this.Create()};h.prototype.GetStyleListValues=function(){this.arValues=[{id:"",name:BX.message("StyleNormal"),topName:BX.message("StyleSelectorName"),tagName:false,action:"formatStyle",value:"",defaultValue:true},{name:BX.message("StyleH2"),className:"bxhtmled-style-h2",tagName:"H2",action:"formatStyle",value:"H2"},{name:BX.message("StyleH3"),className:"bxhtmled-style-h3",tagName:"H3",action:"formatStyle",value:"H3"},{id:"headingsMore",name:BX.message("HeadingMore"),className:"bxhtmled-style-heading-more",items:[{name:BX.message("StyleH1"),className:"bxhtmled-style-h1",tagName:"H1",action:"formatStyle",value:"H1"},{name:BX.message("StyleH4"),className:"bxhtmled-style-h4",tagName:"H4",action:"formatStyle",value:"H4"},{name:BX.message("StyleH5"),className:"bxhtmled-style-h5",tagName:"H5",action:"formatStyle",value:"H5"},{name:BX.message("StyleH6"),className:"bxhtmled-style-h6",tagName:"H6",action:"formatStyle",value:"H6"}]}];var t=this.editor.GetStylesDescription();this.metaClasses=this.GetMetaClassSections();var e,i,s=[],a={},l,o,n;for(e in t){if(t.hasOwnProperty(e)&&typeof t[e]=="object"){i=t[e];if(t[e].section){if(typeof a[i.section]=="undefined"){a[i.section]=s.length;s.push({id:this.metaClasses[i.section].id,name:this.metaClasses[i.section].name,defaultValue:false,items:[]})}s[a[i.section]].items.push({id:e,name:i.title||e,action:"formatStyle",value:{className:e,tag:i.tag||false},html:i.html||false,defaultValue:false})}else{s.push({id:e,name:i.title||e,action:"formatStyle",value:{className:e,tag:i.tag||false},html:i.html||false,defaultValue:false})}this.checkedClasses.push(e);if(i.tag){l=i.tag.indexOf(",")===-1?[i.tag]:i.tag.split(",");for(n=0;n<l.length;n++){o=BX.util.trim(l[n]).toUpperCase();if(!BX.util.in_array(o,this.checkedTags))this.checkedTags.push(o)}}}}if(s.length>0){this.arValues=this.arValues.concat(["separator"],s)}this.arValues.push("separator");this.arValues.push({id:"P",name:BX.message("StyleParagraph"),action:"formatStyle",value:"P"});this.arValues.push({id:"DIV",name:BX.message("StyleDiv"),action:"formatStyle",value:"DIV"});this.editor.On("GetStyleList",[this.styleList]);return this.arValues};h.prototype.GetMetaClassSections=function(){var t={quote:{id:"quote",name:BX.message("BXEdMetaClass_quote")},text:{id:"text",name:BX.message("BXEdMetaClass_text")},block:{id:"block",name:BX.message("BXEdMetaClass_block")},block_icon:{id:"block_icon",name:BX.message("BXEdMetaClass_block_icon")},list:{id:"list",name:BX.message("BXEdMetaClass_list"),activateNodes:["OL","UL"]}};return t};h.prototype.SetValue=function(t,e){this.FilterMetaClasses();var i=false,s,a;if(t){if(e&&e.nodeName){this.FilterMetaClasses(e.nodeName);if(e.className&&e.className!==""){a=e.className;if(e.nodeName=="UL"){var l=this.editor.action.actions.insertUnorderedList.getCustomBullitClass(e);if(l)a=e.className+"~~"+l}for(s in this.valueIndex){if(this.valueIndex.hasOwnProperty(s)&&s.indexOf(a)!==-1){this.SelectItem(s,false,false);i=true;break}}}}if(!i){var o=e.nodeName.toUpperCase();this.SelectItem(o,false,false);i=true}}if(!t||!i){this.SelectItem("",false,false)}};h.prototype.FilterMetaClasses=function(t){for(var e in this.metaClasses){if(this.metaClasses.hasOwnProperty(e)&&this.metaClasses[e].activateNodes&&this.metaClasses[e].itemNode){if(!t){this.metaClasses[e].itemNode.style.display="none"}else if(BX.util.in_array(t.toUpperCase(),this.metaClasses[e].activateNodes)){this.metaClasses[e].itemNode.style.display=""}}}};h.prototype.Create=function(){if(!this.pCont){this.pCont=BX.create("SPAN",{props:{className:this.className,title:this.title},attrs:{unselectable:"on"},text:""});if(this.width)this.pCont.style.width=this.width+"px";BX.bind(this.pCont,"click",BX.proxy(this.OnClick,this))}if(!this.pValuesCont){this.pValuesCont=BX.create("DIV",{props:{className:"bxhtmled-popup bxhtmled-dropdown-list-cont"},html:'<div class="bxhtmled-popup-corner"></div>'});this.pValuesContWrap=this.pValuesCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-dd-list-wrap"}}))}else{BX.cleanNode(this.pValuesContWrap)}this.valueIndex={};this.itemIndex={};if(this.zIndex){this.pValuesCont.style.zIndex=this.zIndex}var t,e;for(e=0;e<this.arValues.length;e++){t=this.arValues[e];if(t.items&&t.items.length>0){this.CreateSubmenuItem(t,this.pValuesContWrap,e)}else if(!t.items){this.CreateItem(t,this.pValuesContWrap,e)}}if(this.action&&this.checkableAction){this.editor.RegisterCheckableAction(this.action,{action:this.action,control:this})}};h.prototype.CreateItem=function(t,e,i){if(t=="separator"){e.appendChild(BX.create("I",{props:{className:"bxhtmled-dd-list-sep"}}))}else{if(t.tagName){t.tagName=t.tagName.toUpperCase();if(!t.id)t.id=t.tagName}var s=this,a=this.itemClassName+(t.className?" "+t.className:"");if(!t.html){t.html=t.tagName?"<"+t.tagName+">"+t.name+"</"+t.tagName+">":t.name}var l=e.appendChild(BX.create("SPAN",{props:{title:t.title||t.name,className:a},html:t.html,style:t.style}));l.setAttribute("data-bx-dropdown-value",t.id);this.valueIndex[t.id]=i;this.itemIndex[t.id]=t;if(t.defaultValue){this.SelectItem(null,t)}BX.bind(l,"mousedown",function(e){s.SelectItem(this.getAttribute("data-bx-dropdown-value"));if(t.action&&s.editor.action.IsSupported(t.action)){s.editor.action.Exec(t.action,t.value||false)}});this.arValues[i].listCont=l}};h.prototype.CreateSubmenuItem=function(t,e,i){var s=this,a=this.itemClassName+" "+this.itemClassNameGroup+(t.className?" "+t.className:""),l=e.appendChild(BX.create("SPAN",{props:{title:t.title||t.name,className:a},html:t.name+'<i class="bxed-arrow"></i>',style:t.style||""}));l.setAttribute("data-bx-dropdown-value",t.id);this.valueIndex[t.id]=i;this.itemIndex[t.id]=t;this.arValues[i].listCont=l;var o,n=false;var h=this.valueIndex[t.id];var r,d;for(r=0;r<t.items.length;r++){if(t.items[r].tagName){t.items[r].tagName=t.items[r].tagName.toUpperCase();if(!t.items[r].id)t.items[r].id=t.items[r].tagName}d=h+"_"+r;if(!this.arValues[d])this.arValues[d]=t.items[r];this.valueIndex[t.items[r].id]=d;t.items[r].listSubmenuCont=l}BX.bind(l,"mouseover",function(e){n=true;if(o)clearTimeout(o);o=setTimeout(function(){if(n){s.OpenSubmenu(t)}},s.OPEN_DELAY)});BX.bind(l,"mouseout",function(t){n=false;if(o)o=clearTimeout(o)});if(this.metaClasses&&this.metaClasses[t.id]){this.metaClasses[t.id].itemNode=l}};h.prototype.OpenSubmenu=function(t){if(t.id=="list")BX.loadCSS(["/bitrix/css/main/font-awesome.css"]);if(!this.pSubmenuCont){this.pSubmenuCont=BX.create("DIV",{props:{className:"bxhtmled-popup bxhtmled-popup-left bxhtmled-dropdown-list-cont bxhtmled-dropdown-list-cont-submenu"},html:'<div class="bxhtmled-popup-corner"></div>'});this.pSubmenuContWrap=this.pSubmenuCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-dd-list-wrap"}}))}else{BX.cleanNode(this.pSubmenuContWrap)}if(this.zIndex){this.pSubmenuCont.style.zIndex=this.zIndex}document.body.appendChild(this.pSubmenuCont);this.pSubmenuCont.style.display="block";if(this.curSubmenuItem){BX.removeClass(this.curSubmenuItem,"bxhtmled-dd-list-item-selected")}this.curSubmenuItem=t.listCont;BX.addClass(this.curSubmenuItem,"bxhtmled-dd-list-item-selected");var e=this,i=BX.pos(this.curSubmenuItem),s=i.right+17,a=i.top-9;this.pSubmenuCont.style.top=a+"px";this.pSubmenuCont.style.left=s+"px";var l=this.valueIndex[t.id];var o,n;for(o=0;o<t.items.length;o++){n=l+"_"+o;if(!this.arValues[n])this.arValues[n]=t.items[o];this.CreateItem(t.items[o],this.pSubmenuContWrap,n)}BX.onCustomEvent(this.curSubmenuItem,"OnStyleListSubmenuOpened",[])};h.prototype.CloseSubmenu=function(){if(this.pSubmenuCont&&this.pSubmenuContWrap){BX.cleanNode(this.pSubmenuContWrap);this.pSubmenuCont.style.display="none"}if(this.curSubmenuItem){BX.removeClass(this.curSubmenuItem,"bxhtmled-dd-list-item-selected")}};h.prototype.SelectItem=function(t,e,i){var s=this;i=i!==false;if(!e){e=this.arValues[this.valueIndex[t]];if(!e&&this.valueIndex[t.toUpperCase()]){e=this.arValues[this.valueIndex[t.toUpperCase()]]}if(!e&&this.valueIndex[t.toLowerCase()]){e=this.arValues[this.valueIndex[t.toLowerCase()]]}}if(this.lastActiveSubmenuItem)BX.removeClass(this.lastActiveSubmenuItem,this.activeListClassName);if(this.lastActiveItem)BX.removeClass(this.lastActiveItem,this.activeListClassName);if(e){this.pCont.innerHTML=BX.util.htmlspecialchars(e.topName||e.name||e.id);this.pCont.title=this.title+": "+(e.title||e.name);if(e.listSubmenuCont&&BX.isNodeInDom(e.listSubmenuCont)){this.lastActiveSubmenuItem=e.listSubmenuCont;BX.addClass(e.listSubmenuCont,this.activeListClassName)}if(e.listCont&&BX.isNodeInDom(e.listCont)){this.lastActiveItem=e.listCont;BX.addClass(e.listCont,this.activeListClassName)}else{function a(){if(e.listCont&&BX.isNodeInDom(e.listCont)){if(s.lastActiveItem)BX.removeClass(s.lastActiveItem,s.activeListClassName);s.lastActiveItem=e.listCont;BX.addClass(e.listCont,s.activeListClassName)}BX.removeCustomEvent(e.listSubmenuCont,"OnStyleListSubmenuOpened",a)}if(e.listSubmenuCont){BX.addCustomEvent(e.listSubmenuCont,"OnStyleListSubmenuOpened",a)}}}if(this.bOpened&&i){this.Close()}};h.prototype.Open=function(){h.superclass.Open.apply(this,arguments)};h.prototype.Close=function(){this.CloseSubmenu();h.superclass.Close.apply(this,arguments)};function r(t,e){r.superclass.constructor.apply(this,arguments);this.id="font_selector";this.title=BX.message("FontSelectorTitle");this.action="fontFamily";this.zIndex=3008;var i=this.editor.GetFontFamilyList();this.disabledForTextarea=!t.bbCode;this.arValues=[{id:"",name:BX.message("NoFontTitle"),topName:BX.message("FontSelectorTitle"),title:BX.message("NoFontTitle"),className:"",style:"",action:"fontFamily",value:"",defaultValue:true}];var s,a,l,o;for(s in i){if(i.hasOwnProperty(s)){l=i[s].value;if(typeof l!="object")l=[l];a=i[s].name;o=i[s].arStyle||{fontFamily:l.join(",")};this.arValues.push({id:a,name:a,title:a,className:i[s].className||"",style:i[s].arStyle||{fontFamily:l.join(",")},action:"fontFamily",value:l.join(",")})}}this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(r,window.BXHtmlEditor.DropDownList);r.prototype.SetValue=function(t,e){if(t){var i,s,a,l,o=this.arValues.length,n=e[0],h=BX.util.trim(BX.style(n,"fontFamily"));if(h!==""&&BX.type.isString(h)){a=h.split(",");for(i in a){l=false;if(a.hasOwnProperty(i)){for(s=0;s<o;s++){a[i]=a[i].replace(/'|"/gi,"");if(this.arValues[s].value.indexOf(a[i])!==-1){l=this.arValues[s].id;break}}if(l!==false){break}}}this.SelectItem(l,false,false)}else{this.SelectItem("",false,false)}}else{this.SelectItem("",false,false)}};function d(t,e){d.superclass.constructor.apply(this,arguments);this.id="font_size";this.title=BX.message("FontSizeTitle");this.className+=" bxhtmled-button-fontsize";this.activeClassName="bxhtmled-top-bar-btn-active bxhtmled-button-fontsize-active";this.disabledClassName="bxhtmled-top-bar-btn-disabled bxhtmled-button-fontsize-disabled";this.action="fontSize";this.zIndex=3007;this.disabledForTextarea=!t.bbCode;var i=[6,7,8,9,10,11,12,13,14,15,16,18,20,22,24,26,28,36,48,72];this.arValues=[{id:"font-size-0",className:"bxhtmled-top-bar-btn bxhtmled-button-remove-fontsize",action:this.action,value:"<i></i>"}];var s,a;for(s in i){if(i.hasOwnProperty(s)){a=i[s];this.arValues.push({id:"font-size-"+a,action:this.action,value:a})}}this.Create();if(e)e.appendChild(this.pCont_);BX.addCustomEvent(this,"OnPopupClose",BX.proxy(this.OnPopupClose,this))}BX.extend(d,window.BXHtmlEditor.DropDown);d.prototype.Create=function(){this.pCont_=BX.create("SPAN",{props:{className:"bxhtmled-button-fontsize-wrap",title:this.title}});this.pCont=this.pButCont=this.pCont_.appendChild(BX.create("SPAN",{props:{className:this.className},html:"<i></i>"}));this.pListCont=this.pCont_.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-top-bar-select",title:this.title},attrs:{unselectable:"on"},text:"",style:{display:"none"}}));this.pValuesCont=BX.create("DIV",{props:{className:"bxhtmled-popup bxhtmled-dropdown-cont"},html:'<div class="bxhtmled-popup-corner"></div>'});this.pValuesCont.style.zIndex=this.zIndex;this.pValuesContWrap=this.pValuesCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-dropdown-cont bxhtmled-font-size-popup"}}));this.valueIndex={};var t,e,i=this,s,a="bxhtmled-dd-list-item";for(s=0;s<this.arValues.length;s++){e=this.arValues[s];t=this.pValuesContWrap.appendChild(BX.create("SPAN",{props:{className:e.className||a},html:e.value,style:e.style||{}}));t.setAttribute("data-bx-dropdown-value",e.id);this.valueIndex[e.id]=s;if(e.action){t.setAttribute("data-bx-type","action");t.setAttribute("data-bx-action",e.action);if(e.value)t.setAttribute("data-bx-value",e.value)}BX.bind(t,"mousedown",function(t){i.SelectItem(this.getAttribute("data-bx-dropdown-value"));i.editor.CheckCommand(this);i.Close()})}this.editor.RegisterCheckableAction(this.action,{action:this.action,control:this});BX.bind(this.pCont_,"click",BX.proxy(this.OnClick,this));BX.bind(this.pCont,"mousedown",BX.delegate(this.OnMouseDown,this))};d.prototype.SetValue=function(t,e){if(e&&e[0]){var i=e[0];var s=i.style.fontSize;this.SelectItem(false,{value:parseInt(s,10),title:s})}else{this.SelectItem(false,{value:0})}};d.prototype.SelectItem=function(t,e){if(!e)e=this.arValues[this.valueIndex[t]];if(e.value){this.pListCont.innerHTML=e.value;this.pListCont.title=this.title+": "+(e.title||e.value);this.pListCont.style.display="";this.pButCont.style.display="none"}else{this.pListCont.title=this.title;this.pButCont.style.display="";this.pListCont.style.display="none"}};d.prototype.GetPopupBindCont=function(){return this.pCont_};d.prototype.Open=function(){d.superclass.Open.apply(this,arguments);this.pValuesContWrap.firstChild.style.display=this.editor.bbCode&&this.editor.synchro.IsFocusedOnTextarea()?"none":"";BX.addClass(this.pListCont,"bxhtmled-top-bar-btn-active")};d.prototype.Close=function(){d.superclass.Close.apply(this,arguments);BX.removeClass(this.pListCont,"bxhtmled-top-bar-btn-active")};d.prototype.OnPopupClose=function(){var t=this.editor.toolbar.controls.More;setTimeout(function(){if(t&&t.bOpened){t.CheckOverlay()}},100)};function p(t,e){p.superclass.constructor.apply(this,arguments);this.id="bold";this.title=BX.message("Bold");this.className+=" bxhtmled-button-bold";this.action="bold";this.disabledForTextarea=!t.bbCode;this.Create();if(e)e.appendChild(this.GetCont())}BX.extend(p,t);function c(t,e){c.superclass.constructor.apply(this,arguments);this.id="italic";this.title=BX.message("Italic");this.className+=" bxhtmled-button-italic";this.action="italic";this.disabledForTextarea=!t.bbCode;this.Create();if(e)e.appendChild(this.GetCont())}BX.extend(c,t);function u(t,e){u.superclass.constructor.apply(this,arguments);this.id="underline";this.title=BX.message("Underline");this.className+=" bxhtmled-button-underline";this.action="underline";this.disabledForTextarea=!t.bbCode;this.Create();if(e)e.appendChild(this.GetCont())}BX.extend(u,t);function m(t,e){m.superclass.constructor.apply(this,arguments);this.id="strike";this.title=BX.message("Strike");this.className+=" bxhtmled-button-strike";this.action="strikeout";this.disabledForTextarea=!t.bbCode;this.Create();if(e)e.appendChild(this.GetCont())}BX.extend(m,t);function f(t,e){f.superclass.constructor.apply(this,arguments);this.id="remove_format";this.title=BX.message("RemoveFormat");this.className+=" bxhtmled-button-remove-format";this.action="removeFormat";this.checkableAction=false;this.Create();if(e)e.appendChild(this.GetCont())}BX.extend(f,t);function C(t,e){C.superclass.constructor.apply(this,arguments);this.id="template_selector";this.title=BX.message("TemplateSelectorTitle");this.className+=" ";this.width=85;this.zIndex=3007;this.arValues=[];var i=this.editor.GetTemplateId(),s=this.editor.config.templates,a,l;for(a in s){if(s.hasOwnProperty(a)){l=s[a];this.arValues.push({id:l.value,name:l.name,title:l.name,className:"bxhtmled-button-viewmode-wysiwyg",action:"changeTemplate",value:l.value,defaultValue:l.value==i})}}this.Create();if(e)e.appendChild(this.GetCont());this.SelectItem(i)}BX.extend(C,window.BXHtmlEditor.DropDownList);function b(t,e){b.superclass.constructor.apply(this,arguments);this.id="ordered-list";this.title=BX.message("OrderedList");this.className+=" bxhtmled-button-ordered-list";this.action="insertOrderedList";this.disabledForTextarea=!t.bbCode;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(b,t);b.prototype.OnClick=function(){if(!this.disabled){if(!this.editor.bbCode||!this.editor.synchro.IsFocusedOnTextarea()){b.superclass.OnClick.apply(this,arguments)}else{this.editor.GetDialog("InsertList").Show({type:"ol"})}}};function g(t,e){g.superclass.constructor.apply(this,arguments);this.id="unordered-list";this.title=BX.message("UnorderedList");this.className+=" bxhtmled-button-unordered-list";this.action="insertUnorderedList";this.disabledForTextarea=!t.bbCode;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(g,t);g.prototype.OnClick=function(){if(!this.disabled){if(!this.editor.bbCode||!this.editor.synchro.IsFocusedOnTextarea()){b.superclass.OnClick.apply(this,arguments)}else{this.editor.GetDialog("InsertList").Show({type:"ul"})}}};function B(t,e){B.superclass.constructor.apply(this,arguments);this.id="indent";this.title=BX.message("Indent");this.className+=" bxhtmled-button-indent";this.action="indent";this.checkableAction=false;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(B,t);function X(t,e){X.superclass.constructor.apply(this,arguments);this.id="outdent";this.title=BX.message("Outdent");this.className+=" bxhtmled-button-outdent";this.action="outdent";this.checkableAction=false;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(X,t);function v(t,e){v.superclass.constructor.apply(this,arguments);this.id="align-list";this.title=BX.message("BXEdTextAlign");this.posOffset.left=0;this.action="align";var i=this.className;this.className+=" bxhtmled-button-align-left";this.disabledForTextarea=!t.bbCode;this.arValues=[{id:"align_left",title:BX.message("AlignLeft"),className:i+" bxhtmled-button-align-left",action:"align",value:"left"},{id:"align_center",title:BX.message("AlignCenter"),className:i+" bxhtmled-button-align-center",action:"align",value:"center"},{id:"align_right",title:BX.message("AlignRight"),className:i+" bxhtmled-button-align-right",action:"align",value:"right"},{id:"align_justify",title:BX.message("AlignJustify"),className:i+" bxhtmled-button-align-justify",action:"align",value:"justify"}];this.Create();if(e)e.appendChild(this.GetCont())}BX.extend(v,window.BXHtmlEditor.DropDown);v.prototype.SetValue=function(t,e){if(this.disabled){this.SelectItem(null)}else{if(e&&e.value){this.SelectItem("align_"+e.value)}else{this.SelectItem(null)}}};function x(t,e){x.superclass.constructor.apply(this,arguments);this.id="insert-link";this.title=BX.message("InsertLink");this.className+=" bxhtmled-button-link";this.posOffset={top:6,left:0};this.disabledForTextarea=!t.bbCode;this.arValues=[{id:"edit_link",title:BX.message("EditLink"),className:this.className+" bxhtmled-button-link"},{id:"remove_link",title:BX.message("RemoveLink"),className:this.className+" bxhtmled-button-remove-link",action:"removeLink"}];this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(x,window.BXHtmlEditor.DropDown);x.prototype.OnClick=function(){if(this.disabled)return;if(!this.editor.bbCode||!this.editor.synchro.IsFocusedOnTextarea()){var t,e,i,s=0,a=this.editor.action.CheckState("formatInline",{},"a");if(a){for(t=0;t<a.length;t++){e=a[t];if(e){i=e;s++}if(s>1){break}}}if(s===1&&i){if(this.bOpened){this.Close()}else{this.Open()}}else{this.editor.GetDialog("Link").Show(a,this.savedRange)}}else{this.editor.GetDialog("Link").Show(false,false)}};x.prototype.SelectItem=function(t){if(t=="edit_link"){this.editor.GetDialog("Link").Show(false,this.savedRange)}};function y(t,e){y.superclass.constructor.apply(this,arguments);this.id="image";this.title=BX.message("InsertImage");this.className+=" bxhtmled-button-image";this.disabledForTextarea=!t.bbCode;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(y,t);y.prototype.OnClick=function(){if(!this.disabled){this.editor.GetDialog("Image").Show(false,this.savedRange)}};function S(t,e){S.superclass.constructor.apply(this,arguments);this.id="video";this.title=BX.message("BXEdInsertVideo");this.className+=" bxhtmled-button-video";this.disabledForTextarea=!t.bbCode;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(S,t);S.prototype.OnClick=function(){if(!this.disabled){this.editor.GetDialog("Video").Show(false,this.savedRange)}};function w(t,e){w.superclass.constructor.apply(this,arguments);this.id="insert-anchor";this.title=BX.message("BXEdAnchor");this.className+=" bxhtmled-button-anchor";this.action="insertAnchor";this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(w,t);w.prototype.OnClick=function(t){var e=this;if(this.disabled)return;if(!this.pPopup){this.pPopup=new BX.PopupWindow(this.id+"-popup",this.GetCont(),{zIndex:3005,lightShadow:true,offsetTop:4,overlay:{opacity:1},offsetLeft:-128,autoHide:true,closeByEsc:true,className:"bxhtmled-popup",content:""});this.pPopupCont=BX(this.id+"-popup");this.pPopupCont.className="bxhtmled-popup";this.pPopupCont.innerHTML='<div class="bxhtmled-popup-corner"></div>';this.pPopupContWrap=this.pPopupCont.appendChild(BX.create("DIV"));this.pPopupContInput=this.pPopupContWrap.appendChild(BX.create("INPUT",{props:{type:"text",placeholder:BX.message("BXEdAnchorName")+"...",title:BX.message("BXEdAnchorInsertTitle")},style:{width:"150px"}}));this.pPopupContBut=this.pPopupContWrap.appendChild(BX.create("INPUT",{props:{type:"button",value:BX.message("BXEdInsert")},style:{marginLeft:"6px"}}));BX.bind(this.pPopupContInput,"keyup",BX.proxy(this.OnKeyUp,this));BX.bind(this.pPopupContBut,"click",BX.proxy(this.Save,this));BX.addCustomEvent(this.pPopup,"onPopupClose",function(){e.pPopup.destroy();e.pPopup=null})}this.pPopupContInput.value="";this.pPopup.show();BX.focus(this.pPopupContInput)};w.prototype.Save=function(){var t=BX.util.trim(this.pPopupContInput.value);if(t!==""){t=t.replace(/[^ a-z0-9_\-]/gi,"");if(this.savedRange){this.editor.selection.SetBookmark(this.savedRange)}var e=this.editor.phpParser.GetSurrogateNode("anchor",BX.message("BXEdAnchor")+": #"+t,null,{html:"",name:t});this.editor.selection.InsertNode(e);var i=this.editor.util.CheckSurrogateNode(e.parentNode);if(i){this.editor.util.InsertAfter(e,i)}this.editor.selection.SetInvisibleTextAfterNode(e);this.editor.synchro.StartSync(100);if(this.editor.toolbar.controls.More){this.editor.toolbar.controls.More.Close()}}this.pPopup.close()};w.prototype.OnKeyUp=function(t){if(t.keyCode===this.editor.KEY_CODES["enter"]){this.Save()}};function N(t,e){N.superclass.constructor.apply(this,arguments);this.id="insert-table";this.title=BX.message("BXEdTable");this.className+=" bxhtmled-button-table";this.itemClassName="bxhtmled-dd-list-item";this.action="insertTable";this.disabledForTextarea=!t.bbCode;this.PATTERN_ROWS=10;this.PATTERN_COLS=10;this.zIndex=3007;this.posOffset={top:6,left:0};this.Create();if(e){e.appendChild(this.GetCont())}BX.addCustomEvent(this,"OnPopupClose",BX.proxy(this.OnPopupClose,this))}BX.extend(N,window.BXHtmlEditor.DropDown);N.prototype.Create=function(){this.pCont=BX.create("SPAN",{props:{className:this.className,title:this.title},html:"<i></i>"});this.pValuesCont=BX.create("DIV",{props:{className:"bxhtmled-popup bxhtmled-dropdown-cont"},html:'<div class="bxhtmled-popup-corner"></div>'});this.pValuesCont.style.zIndex=this.zIndex;this.valueIndex={};this.pPatternWrap=this.pValuesCont.appendChild(BX.create("DIV"));this.pValuesContWrap=this.pValuesCont.appendChild(BX.create("DIV"));var t=this,e,i,s,a,l=false,o=this.PATTERN_ROWS*this.PATTERN_COLS,n;this.pPatternTbl=this.pPatternWrap.appendChild(BX.create("TABLE",{props:{className:"bxhtmled-pattern-tbl"}}));function h(e,i){var s,a,l;for(s=0;s<t.PATTERN_ROWS;s++){for(a=0;a<t.PATTERN_COLS;a++){l=t.pPatternTbl.rows[s].cells[a];l.className=s<=e&&a<=i?"bxhtmled-td-selected":""}}}BX.bind(this.pPatternTbl,"mousemove",function(t){var e=t.target||t.srcElement;if(a!==e){a=e;if(e.nodeName=="TD"){l=true;h(e.parentNode.rowIndex,e.cellIndex)}else if(e.nodeName=="TABLE"){l=false;h(-1,-1)}}});BX.bind(this.pPatternWrap,"mouseout",function(t){l=false;setTimeout(function(){if(!l){h(-1,-1)}},300)});BX.bind(this.pPatternTbl,"click",function(e){var i=e.target||e.srcElement;if(i.nodeName=="TD"){if(t.editor.action.IsSupported(t.action)){if(t.savedRange){t.editor.selection.SetBookmark(t.savedRange)}t.editor.action.Exec(t.action,{rows:i.parentNode.rowIndex+1,cols:i.cellIndex+1,border:1,cellPadding:1,cellSpacing:1})}if(t.editor.toolbar.controls.More){t.editor.toolbar.controls.More.Close()}t.Close()}});for(e=0;e<o;e++){if(e%this.PATTERN_COLS==0){i=this.pPatternTbl.insertRow(-1)}s=i.insertCell(-1);s.innerHTML="&nbsp;";s.title=s.cellIndex+1+"x"+(i.rowIndex+1)}n=this.pValuesContWrap.appendChild(BX.create("SPAN",{props:{title:BX.message("BXEdInsertTableTitle"),className:this.itemClassName},html:BX.message("BXEdInsertTable")}));BX.bind(n,"mousedown",function(e){t.editor.GetDialog("Table").Show(false,t.savedRange);if(t.editor.toolbar.controls.More){t.editor.toolbar.controls.More.Close()}t.Close()});BX.bind(this.pCont,"click",BX.proxy(this.OnClick,this));BX.bind(this.pCont,"mousedown",BX.delegate(this.OnMouseDown,this))};N.prototype.OnPopupClose=function(){var t=this.editor.toolbar.controls.More;setTimeout(function(){if(t&&t.bOpened){t.CheckOverlay()}},100)};function I(t,e){I.superclass.constructor.apply(this,arguments);this.id="specialchar";this.title=BX.message("BXEdSpecialchar");this.className+=" bxhtmled-button-specialchar";this.itemClassName="bxhtmled-dd-list-item";this.CELLS_COUNT=10;this.posOffset={top:6,left:0};this.zIndex=3007;this.Create();if(e){e.appendChild(this.GetCont())}BX.addCustomEvent(this,"OnPopupClose",BX.proxy(this.OnPopupClose,this))}BX.extend(I,window.BXHtmlEditor.DropDown);I.prototype.Create=function(){this.pCont=BX.create("SPAN",{props:{className:this.className,title:this.title},html:"<i></i>"});this.pValuesCont=BX.create("DIV",{props:{className:"bxhtmled-popup bxhtmled-dropdown-cont"},html:'<div class="bxhtmled-popup-corner"></div>'});this.pValuesCont.style.zIndex=this.zIndex;this.valueIndex={};this.pPatternWrap=this.pValuesCont.appendChild(BX.create("DIV"));this.pValuesContWrap=this.pValuesCont.appendChild(BX.create("DIV"));var t=this.editor.GetLastSpecialchars(),e=this,i,s,a,l=t.length,o;this.pLastChars=this.pPatternWrap.appendChild(BX.create("TABLE",{props:{className:"bxhtmled-last-chars"}}));for(i=0;i<l;i++){if(i%this.CELLS_COUNT==0){s=this.pLastChars.insertRow(-1)}a=s.insertCell(-1)}BX.bind(this.pLastChars,"click",function(t){var i,s=t.target||t.srcElement;if(s.nodeType==3){s=s.parentNode}if(s&&s.getAttribute&&s.getAttribute("data-bx-specialchar")&&e.editor.action.IsSupported("insertHTML")){if(e.savedRange){e.editor.selection.SetBookmark(e.savedRange)}i=s.getAttribute("data-bx-specialchar");e.editor.On("OnSpecialcharInserted",[i]);e.editor.action.Exec("insertHTML",i)}if(e.editor.toolbar.controls.More){e.editor.toolbar.controls.More.Close()}e.Close()});o=this.pValuesContWrap.appendChild(BX.create("SPAN",{props:{title:BX.message("BXEdSpecialcharMoreTitle"),className:this.itemClassName},html:BX.message("BXEdSpecialcharMore")}));BX.bind(o,"mousedown",function(){e.editor.GetDialog("Specialchar").Show(e.savedRange);if(e.editor.toolbar.controls.More){e.editor.toolbar.controls.More.Close()}e.Close()});BX.bind(this.pCont,"click",BX.proxy(this.OnClick,this));BX.bind(this.pCont,"mousedown",BX.delegate(this.OnMouseDown,this))};I.prototype.OnClick=function(){if(this.disabled)return;var t=this.editor.GetLastSpecialchars(),e,i=-1,s=-1,a,l=t.length;for(e=0;e<l;e++){if(e%this.CELLS_COUNT==0){i++;s=-1}s++;a=this.pLastChars.rows[i].cells[s];if(a){a.innerHTML=t[e];a.setAttribute("data-bx-specialchar",t[e]);a.title=BX.message("BXEdSpecialchar")+": "+t[e].substr(1,t[e].length-2)}}I.superclass.OnClick.apply(this,arguments)};I.prototype.OnPopupClose=function(){var t=this.editor.toolbar.controls.More;setTimeout(function(){if(t&&t.bOpened){t.CheckOverlay()}},100)};function E(t,e){E.superclass.constructor.apply(this,arguments);this.id="print_break";this.title=BX.message("BXEdPrintBreak");this.className+=" bxhtmled-button-print-break";this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(E,t);E.prototype.OnClick=function(){if(this.disabled)return;if(this.editor.action.IsSupported("insertHTML")){if(this.savedRange){this.editor.selection.SetBookmark(this.savedRange)}var t=this.editor.GetIframeDoc(),e=this.editor.SetBxTag(false,{tag:"printbreak",params:{innerHTML:'<span style="display: none">&nbsp;</span>'},name:BX.message("BXEdPrintBreakName"),title:BX.message("BXEdPrintBreakTitle")}),i=BX.create("IMG",{props:{src:this.editor.EMPTY_IMAGE_SRC,id:e,className:"bxhtmled-printbreak",title:BX.message("BXEdPrintBreakTitle")}},t);this.editor.selection.InsertNode(i);var s=this.editor.util.CheckSurrogateNode(i.parentNode);if(s){this.editor.util.InsertAfter(i,s)}this.editor.selection.SetAfter(i);this.editor.Focus();this.editor.synchro.StartSync(100)}if(this.editor.toolbar.controls.More){this.editor.toolbar.controls.More.Close()}};function T(t,e){T.superclass.constructor.apply(this,arguments);this.id="page_break";this.title=BX.message("BXEdPageBreak");this.className+=" bxhtmled-button-page-break";this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(T,t);T.prototype.OnClick=function(){if(this.savedRange)this.editor.selection.SetBookmark(this.savedRange);var t=this.editor.phpParser.GetSurrogateNode("pagebreak",BX.message("BXEdPageBreakSur"),BX.message("BXEdPageBreakSurTitle"));this.editor.selection.InsertNode(t);var e=this.editor.util.CheckSurrogateNode(t.parentNode);if(e){this.editor.util.InsertAfter(t,e)}this.editor.selection.SelectNode(t);this.NormilizeBreakElement(t);this.editor.selection.SetInvisibleTextAfterNode(t);this.editor.synchro.StartSync(100);if(this.editor.toolbar.controls.More){this.editor.toolbar.controls.More.Close()}};T.prototype.NormilizeBreakElement=function(t){if(t.parentNode&&t.parentNode.nodeName!=="BODY"){var e=this.editor.util.GetNextNotEmptySibling(t),i=this.editor.util.GetPreviousNotEmptySibling(t);if(!e||!i){if(!e)this.editor.util.InsertAfter(t,t.parentNode);if(!i)t.parentNode.parentNode.insertBefore(t,t.parentNode);return this.NormilizeBreakElement(t)}}};function k(t,e){k.superclass.constructor.apply(this,arguments);this.id="hr";this.title=BX.message("BXEdInsertHr");this.className+=" bxhtmled-button-hr";this.action="insertHr";this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(k,t);function A(t,e){A.superclass.constructor.apply(this,arguments);this.id="spellcheck";this.title=BX.message("BXEdSpellcheck");this.className+=" bxhtmled-button-spell";this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(A,t);A.prototype.OnClick=function(){if(this.disabled)return;if(this.editor.config.usePspell!=="Y"){alert(BX.message("BXEdNoPspellWarning"))}else{var t=this;if(!window.BXHtmlEditor.Spellchecker)return BX.loadScript(this.editor.config.spellcheck_path,BX.proxy(this.OnClick,this));if(!this.editor.Spellchecker){this.editor.Spellchecker=new window.BXHtmlEditor.Spellchecker(this.editor)}this.editor.GetDialog("Spell").Show(this.savedRange);this.editor.Spellchecker.CheckDocument()}};function P(t,e){P.superclass.constructor.apply(this,arguments);this.id="settings";this.title=BX.message("BXEdSettings");this.className+=" bxhtmled-button-settings";this.disabledForTextarea=false;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(P,t);P.prototype.OnClick=function(){this.editor.GetDialog("Settings").Show()};function L(t,e){L.superclass.constructor.apply(this,arguments);this.id="sub";this.title=BX.message("BXEdSub");this.className+=" bxhtmled-button-sub";this.action="sub";this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(L,t);function O(t,e){O.superclass.constructor.apply(this,arguments);this.id="sup";this.title=BX.message("BXEdSup");this.className+=" bxhtmled-button-sup";this.action="sup";this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(O,t);function V(t,e){V.superclass.constructor.apply(this,arguments);this.id="fullscreen";this.title=BX.message("BXEdFullscreen");this.className+=" bxhtmled-button-fullscreen";this.action="fullscreen";this.disabledForTextarea=false;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(V,t);V.prototype.Check=function(t){this.GetCont().title=t?BX.message("BXEdFullscreenBack"):BX.message("BXEdFullscreen");V.superclass.Check.apply(this,arguments)};function H(t,e){H.superclass.constructor.apply(this,arguments);this.id="smile";this.title=BX.message("BXEdSmile");this.className+=" bxhtmled-button-smile";this.checkableAction=false;this.zIndex=3007;this.smileSizeDef=20;this.posOffset={top:6,left:0};this.smiles=t.config.smiles||[];this.smileSets=t.config.smileSets||[];this.disabledForTextarea=!t.bbCode;this.Create();if(e&&this.smiles.length>0){e.appendChild(this.GetCont())}BX.addCustomEvent(this,"OnPopupClose",BX.proxy(this.OnPopupClose,this))}BX.extend(H,window.BXHtmlEditor.DropDown);H.prototype.CheckBeforeShow=function(){return this.editor.config.smiles&&this.editor.config.smiles.length>0};H.prototype.Create=function(){this.pCont=BX.create("SPAN",{props:{className:this.className,title:this.title},html:"<i></i>"});this.pValuesCont=BX.create("DIV",{props:{className:"bxhtmled-popup bxhtmled-dropdown-cont bxhtmled-smile-cont"},html:'<div class="bxhtmled-popup-corner"></div>'});this.pValuesCont.style.zIndex=this.zIndex;this.valueIndex={};var t=this,e,i,s,a=this.smileSets.length,l=Math.round(100/a)+"%",o=100*a+"%";if(a>1){this.smileSetsIndex={};this.smileTabsWrap=this.pValuesCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-smile-tabs-wrap"}}));this.smileSliderWrap=this.pValuesCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-smile-slider-wrap"}}));this.smileSlider=this.smileSliderWrap.appendChild(BX.create("DIV",{props:{className:"bxhtmled-smile-slider"},style:{width:o}}));for(e=0;e<this.smileSets.length;e++){if(!this.smileSets[e].ID&&this.smileSets[e].id)this.smileSets[e].ID=this.smileSets[e].id;this.smileSetsIndex[this.smileSets[e].ID]=e;this.smileSets[e].butWrap=this.smileTabsWrap.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-smile-tab"}}));this.smileSets[e].butWrap.setAttribute("data-bx-smile-set",this.smileSets[e].ID);this.smileSets[e].butWrapImage=false;this.smileSets[e].smilesBlock=this.smileSlider.appendChild(BX.create("DIV",{props:{className:"bxhtmled-smiles-wrap"},style:{width:l}}));if(e==0){BX.addClass(this.smileSets[e].butWrap,"bxhtmled-smile-tab-active");this.currentTab=this.smileSets[e].butWrap}}}for(e=0;e<this.smiles.length;e++){i=BX.create("IMG",{props:{className:"bxhtmled-smile-img",src:this.smiles[e].path,title:this.smiles[e].name||this.smiles[e].code}});if(this.smiles[e].width){i.style.width=parseInt(this.smiles[e].width)+"px"}if(this.smiles[e].height){i.style.height=parseInt(this.smiles[e].height)+"px"}BX.bind(i,"error",function(){BX.remove(this)});if(this.smiles[e].set_id&&this.smileSetsIndex&&this.smileSetsIndex[this.smiles[e].set_id]!==undefined){s=this.smileSetsIndex[this.smiles[e].set_id];this.smileSets[s].smilesBlock.appendChild(i);if(!this.smileSets[s].butWrapImage){this.smileSets[s].butWrapImage=i.cloneNode();this.smileSets[s].butWrapImage.style.cssText="";this.smileSets[s].butWrapImage.className="";this.smileSets[s].butWrapImage.title="";this.smileSets[s].butWrap.appendChild(this.smileSets[s].butWrapImage);var n=this.smiles[e].height;if(n<this.smileSizeDef){this.smileSets[s].butWrapImage.style.marginTop=Math.round((this.smileSizeDef-n)/2)+"px"}}}else{this.pValuesCont.appendChild(i)}i.setAttribute("data-bx-type","action");i.setAttribute("data-bx-action","insertSmile");i.setAttribute("data-bx-value",this.smiles[e].code)}BX.bind(this.pCont,"click",BX.proxy(this.OnClick,this));BX.bind(this.pCont,"mousedown",BX.delegate(this.OnMouseDown,this));BX.bind(this.pValuesCont,"mousedown",function(e){var i=e.target||e.srcElement;if(i&&i.getAttribute("data-bx-smile-set")!==null){return t.ShowSetTab(i.getAttribute("data-bx-smile-set"))}else if(i&&i.parentNode&&i.parentNode.getAttribute("data-bx-smile-set")!==null){return t.ShowSetTab(i.parentNode.getAttribute("data-bx-smile-set"))}t.editor.CheckCommand(e.target||e.srcElement);t.Close()})};H.prototype.ShowSetTab=function(t){if(this.smileSetsIndex[t]!==undefined){var e=this,i=this.smileSets[this.smileSetsIndex[t]],s=parseInt(this.smileSlider.style.marginLeft)||0,a=-parseInt(this.smileSetsIndex[t]*100);if(this.currentTab)BX.removeClass(this.currentTab,"bxhtmled-smile-tab-active");BX.addClass(i.butWrap,"bxhtmled-smile-tab-active");this.currentTab=i.butWrap;this.ani=new BX.easing({duration:300,start:{marginLeft:s},finish:{marginLeft:a},transition:BX.easing.makeEaseOut(BX.easing.transitions.quart),step:function(t){if(e.smileSlider)e.smileSlider.style.marginLeft=t.marginLeft+"%"},complete:function(){if(e.smileSlider)e.smileSlider.style.marginLeft="-"+a+"%";e.ani=null}});this.ani.animate()}return false};N.prototype.OnPopupClose=function(){var t=this.editor.toolbar.controls.More;setTimeout(function(){if(t&&t.bOpened){t.CheckOverlay()}},100)};function D(t,e){D.superclass.constructor.apply(this,arguments);this.id="quote";this.title=BX.message("BXEdQuote");this.className+=" bxhtmled-button-quote";this.action="quote";this.disabledForTextarea=!t.bbCode;this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(D,t);D.prototype.OnMouseDown=function(){this.editor.action.actions.quote.setExternalSelection(false);this.editor.action.actions.quote.setRange(false);var t=this.editor.selection.GetRange(this.editor.selection.GetSelection(document));if(!this.editor.synchro.IsFocusedOnTextarea()&&this.editor.iframeView.isFocused){this.savedRange=this.editor.selection.SaveBookmark();this.editor.action.actions.quote.setRange(this.savedRange)}if((this.editor.synchro.IsFocusedOnTextarea()||!this.editor.iframeView.isFocused||this.savedRange.collapsed)&&t&&!t.collapsed){this.editor.action.actions.quote.setExternalSelectionFromRange(t)}D.superclass.OnMouseDown.apply(this,arguments)};function R(t,e){R.superclass.constructor.apply(this,arguments);this.id="code";this.title=BX.message("BXEdCode");this.className+=" bxhtmled-button-code";this.action="code";this.disabledForTextarea=!t.bbCode;this.lastStatus=null;this.allowedControls=["SearchButton","ChangeView","Undo","Redo","RemoveFormat","TemplateSelector","InsertChar","Settings","Fullscreen","Spellcheck","Code","More","BbCode"];this.Create();if(e){e.appendChild(this.GetCont())}}BX.extend(R,t);R.prototype.SetValue=function(t,e,i){if(this.lastStatus!==t){var s=this.editor.toolbar;for(var a in s.controls){if(s.controls.hasOwnProperty(a)&&typeof s.controls[a].Disable=="function"&&!BX.util.in_array(a,this.allowedControls)){s.controls[a].Disable(t)}}}this.lastStatus=t;this.Check(t)};function F(t,e){F.superclass.constructor.apply(this,arguments);this.id="more";this.title=BX.message("BXEdMore");this.className+=" bxhtmled-button-more";this.Create();this.posOffset.left=-8;BX.addClass(this.pValuesContWrap,"bxhtmled-more-cnt");this.disabledForTextarea=false;if(e){e.appendChild(this.GetCont())}var i=this;BX.bind(this.pValuesContWrap,"click",function(t){var e=t.target||t.srcElement,s=e&&e.getAttribute?e.getAttribute("data-bx-type"):false;i.editor.CheckCommand(e)})}BX.extend(F,window.BXHtmlEditor.DropDown);F.prototype.Open=function(){this.pValuesCont.style.width="";F.superclass.Open.apply(this,arguments);var t=this.GetPopupBindCont(),e=BX.pos(t),i=Math.round(e.left-this.pValuesCont.offsetWidth/2+t.offsetWidth/2+this.posOffset.left);this.pValuesCont.style.width=this.pValuesCont.offsetWidth+"px";this.pValuesCont.style.left=i+"px"};F.prototype.GetPopupCont=function(){return this.pValuesContWrap};F.prototype.CheckClose=function(t){if(!this.bOpened){return BX.unbind(document,"mousedown",BX.proxy(this.CheckClose,this))}var e;if(t.target)e=t.target;else if(t.srcElement)e=t.srcElement;if(e.nodeType==3)e=e.parentNode;if(e.style.zIndex>this.zIndex){this.CheckOverlay()}else if(!BX.findParent(e,{className:"bxhtmled-popup"})){this.Close()}};F.prototype.CheckOverlay=function(){var t=this;this.editor.overlay.Show({zIndex:this.zIndex-1}).onclick=function(){t.Close()}};function _(t,e){e={id:"bx_image",width:700,resizable:false,className:"bxhtmled-img-dialog"};this.id="image";this.action="insertImage";this.loremIpsum=BX.message("BXEdLoremIpsum")+"\n"+BX.message("BXEdLoremIpsum");_.superclass.constructor.apply(this,[t,e]);this.readyToShow=false;if(!this.editor.fileDialogsLoaded){var i=this;this.editor.LoadFileDialogs(function(){i.SetContent(i.Build());i.readyToShow=true})}else{this.SetContent(this.Build());this.readyToShow=true}BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(_,e);_.prototype.Build=function(){function t(t,e,i){var s,a,l;s=t.insertRow(-1);if(i){s.className="bxhtmled-add-row"}a=s.insertCell(-1);a.className="bxhtmled-left-c";if(e&&e.label){a.appendChild(BX.create("LABEL",{props:{className:e.required?"bxhtmled-req":""},text:e.label})).setAttribute("for",e.id)}l=s.insertCell(-1);l.className="bxhtmled-right-c";return{row:s,leftCell:a,rightCell:l}}var e=this,i,s;this.pCont=BX.create("DIV",{props:{className:"bxhtmled-img-dialog-cnt"}});var a=BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl bxhtmled-img-dialog-tbl"}});i=a.insertRow(-1);i.className="bxhtmled-img-preview-row";s=BX.adjust(i.insertCell(-1),{props:{colSpan:2,className:"bxhtmled-img-prev-c"}});this.pPreview=s.appendChild(BX.create("DIV",{props:{className:"bxhtmled-img-preview"+(this.editor.bbCode?" bxhtmled-img-preview-bb":""),id:this.id+"-preview"},html:this.editor.bbCode?"":this.loremIpsum}));this.pPreviewRow=i;i=t(a,{label:BX.message("BXEdImgSrc")+":",id:this.id+"-src",required:true});this.pSrc=i.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-src",className:"bxhtmled-80-input"}}));this.pSrc.placeholder=BX.message("BXEdImgSrcRequired");BX.bind(this.pSrc,"blur",BX.proxy(this.SrcOnChange,this));BX.bind(this.pSrc,"change",BX.proxy(this.SrcOnChange,this));BX.bind(this.pSrc,"keyup",BX.proxy(this.SrcOnChange,this));this.firstFocus=this.pSrc;if(!this.editor.bbCode){var l=BX("bx-open-file-medialib-but-"+this.editor.id);if(l){i.rightCell.appendChild(l)}else{var o=BX("bx_open_file_medialib_button_"+this.editor.id);if(o){i.rightCell.appendChild(o);BX.bind(o,"click",window["BxOpenFileBrowserImgFile"+this.editor.id])}else{var n=BX("bx_ml_bx_open_file_medialib_button_"+this.editor.id);if(n){i.rightCell.appendChild(n)}}}}else{l=BX("bx-open-file-medialib-but-"+this.editor.id);o=BX("bx_open_file_medialib_button_"+this.editor.id);if(l){l.style.display="none"}if(o){o.style.display="none"}}i=t(a,{label:BX.message("BXEdImgSize")+":",id:this.id+"-size"});i.rightCell.appendChild(this.GetSizeControl());BX.addClass(i.leftCell,"bxhtmled-left-c-top");i.leftCell.style.paddingTop="12px";this.pSizeRow=i.row;if(!this.editor.bbCode){i=t(a,{label:BX.message("BXEdImgTitle")+":",id:this.id+"-title"});this.pTitle=i.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-title",className:"bxhtmled-90-input"}}))}i=a.insertRow(-1);var h=i.insertCell(-1);BX.adjust(h,{props:{className:"bxhtmled-title-cell bxhtmled-title-cell-foldable",colSpan:2},text:BX.message("BXEdLinkAdditionalTitle")});h.onclick=function(){e.ShowRows(["align","style","alt","link"],true,!e.bAdditional);e.bAdditional=!e.bAdditional};if(!this.editor.bbCode){i=t(a,{label:BX.message("BXEdImgAlign")+":",id:this.id+"-align"});this.pAlign=i.rightCell.appendChild(BX.create("SELECT",{props:{id:this.id+"-align"}}));this.pAlign.options.add(new Option(BX.message("BXEdImgAlignNone"),"",true,true));this.pAlign.options.add(new Option(BX.message("BXEdImgAlignTop"),"top",true,true));this.pAlign.options.add(new Option(BX.message("BXEdImgAlignLeft"),"left",true,true));this.pAlign.options.add(new Option(BX.message("BXEdImgAlignRight"),"right",true,true));this.pAlign.options.add(new Option(BX.message("BXEdImgAlignBottom"),"bottom",true,true));this.pAlign.options.add(new Option(BX.message("BXEdImgAlignMiddle"),"middle",true,true));BX.bind(this.pAlign,"change",BX.delegate(this.ShowPreview,this));this.pAlignRow=i.row}if(!this.editor.bbCode){i=t(a,{label:BX.message("BXEdImgAlt")+":",id:this.id+"-alt"});this.pAlt=i.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-alt",className:"bxhtmled-90-input"}}));this.pAltRow=i.row}if(!this.editor.bbCode){i=t(a,{label:BX.message("BXEdCssClass")+":",id:this.id+"-style"},true);this.pClass=i.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-style"}}));this.pStyleRow=i.row}i=t(a,{label:BX.message("BXEdImgLinkOnImage")+":",id:this.id+"-link"});this.pLink=i.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-link",className:"bxhtmled-80-input"}}));this.pEditLinkBut=i.rightCell.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-top-bar-btn bxhtmled-button-link",title:BX.message("EditLink")},html:"<i></i>"}));BX.bind(this.pEditLinkBut,"click",function(){if(BX.util.trim(e.pSrc.value)==""){BX.focus(e.pSrc)}else{var t=e.pLink.value;e.pLink.value="bx-temp-link-href";e.Save();e.oDialog.Close();var i,s,a=e.editor.GetIframeDoc().getElementsByTagName("A");for(i=0;i<a.length;i++){var l=a[i].getAttribute("href");if(l=="bx-temp-link-href"){s=a[i];s.setAttribute("href",t);e.editor.selection.SelectNode(s);e.editor.GetDialog("Link").Show([s]);break}}}});this.pCont.appendChild(a);this.pLinkRow=i.row;if(!this.editor.bbCode){window["OnFileDialogImgSelect"+this.editor.id]=function(t,i,s){var a;if(typeof t=="object"){a=t.src;if(e.pTitle)e.pTitle.value=t.description||t.name;if(e.pAlt)e.pAlt.value=t.description||t.name}else{a=(i=="/"?"":i)+"/"+t}e.pSrc.value=a;BX.focus(e.pSrc);e.pSrc.select();e.SrcOnChange()}}this.rows={preview:{cont:this.pPreviewRow,height:200},size:{cont:this.pSizeRow,height:68},align:{cont:this.pAlignRow,height:36},style:{cont:this.pStyleRow,height:36},alt:{cont:this.pAltRow,height:36},link:{cont:this.pLinkRow,height:36}};return this.pCont};_.prototype.GetSizeControl=function(){var t,e,i=this,s,a,l=[100,90,80,70,60,50,40,30,20],o=BX.create("DIV"),n=o.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-size-perc"}}));this.percVals=l;this.pPercWrap=n;this.pSizeCont=o;this.oSize={};BX.bind(n,"click",function(t){var e=t.target||t.srcElement;if(e){var s=parseInt(e.getAttribute("data-bx-size-val"),10);if(s){i.SetPercentSize(s,true)}}});function h(t){var e=0,s,a=t.target||t.srcElement;if(a!==n){a=BX.findParent(a,function(t){e++;return t==n||e>3},n)}if(a!==n){i.SetPercentSize(i.savedPerc,false);if(i.sizeControlChecker){BX.unbind(document,"mousemove",h);i.sizeControlChecker=false}}}BX.bind(n,"mouseover",function(t){var e,a=t.target||t.srcElement;if(!i.sizeControlChecker){BX.bind(document,"mousemove",h);i.sizeControlChecker=true}e=parseInt(a.getAttribute("data-bx-size-val"),10);i.overPerc=e>0;if(i.overPerc){i.SetPercentSize(e,false)}else{if(s){clearTimeout(s)}s=setTimeout(function(){if(!i.overPerc){i.SetPercentSize(i.savedPerc,false);if(i.sizeControlChecker){BX.unbind(document,"mousemove",h);i.sizeControlChecker=false}}},200)}});BX.bind(n,"mouseout",function(t){var e,a=t.target||t.srcElement;if(s){clearTimeout(s)}s=setTimeout(function(){if(!i.overPerc){i.SetPercentSize(i.savedPerc,false);if(i.sizeControlChecker){BX.unbind(document,"mousemove",h);i.sizeControlChecker=false}}},200)});function r(){var e=parseInt(i.pWidth.value);if(!isNaN(e)&&t!=e){if(!i.sizeRatio&&i.originalWidth&&i.originalHeight){i.sizeRatio=i.originalWidth/i.originalHeight}if(i.sizeRatio){i.pHeight.value=Math.round(e/i.sizeRatio);t=e;i.ShowPreview()}}}function d(){var t=parseInt(i.pHeight.value);if(!isNaN(t)&&e!=t){if(!i.sizeRatio&&i.originalWidth&&i.originalHeight){i.sizeRatio=i.originalWidth/i.originalHeight}if(i.sizeRatio){i.pWidth.value=parseInt(t*i.sizeRatio);e=t;i.ShowPreview()}}}o.appendChild(BX.create("LABEL",{text:BX.message("BXEdImgWidth")+": "})).setAttribute("for",this.id+"-width");this.pWidth=o.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-width"},style:{width:"40px",marginBottom:"4px"}}));o.appendChild(BX.create("LABEL",{style:{marginLeft:"20px"},text:BX.message("BXEdImgHeight")+": "})).setAttribute("for",this.id+"-height");this.pHeight=o.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-height"},style:{width:"40px",marginBottom:"4px"}}));this.pNoSize=o.appendChild(BX.create("INPUT",{props:{type:"checkbox",id:this.id+"-no-size",className:"bxhtmled-img-no-size-ch"}}));o.appendChild(BX.create("LABEL",{props:{className:"bxhtmled-img-no-size-lbl"},text:BX.message("BXEdImgNoSize")})).setAttribute("for",this.id+"-no-size");BX.bind(this.pNoSize,"click",BX.proxy(this.NoSizeCheck,this));BX.bind(this.pWidth,"blur",r);BX.bind(this.pWidth,"change",r);BX.bind(this.pWidth,"keyup",r);BX.bind(this.pHeight,"blur",d);BX.bind(this.pHeight,"change",d);BX.bind(this.pHeight,"keyup",d);for(a=0;a<l.length;a++){n.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-size-perc-i"},attrs:{"data-bx-size-val":l[a]},html:l[a]+"%"}))}return o};_.prototype.NoSizeCheck=function(){if(this.pNoSize.checked){BX.addClass(this.pSizeCont,"bxhtmled-img-no-size-cont");this.pSizeRow.cells[0].style.height=this.pSizeRow.cells[1].style.height=""}else{BX.removeClass(this.pSizeCont,"bxhtmled-img-no-size-cont")}this.ShowPreview()};_.prototype.SetPercentSize=function(t,e){var i,s,a="bxhtmled-size-perc-i-active";if(e){for(s=0;s<this.pPercWrap.childNodes.length;s++){i=this.pPercWrap.childNodes[s];if(t&&i.getAttribute("data-bx-size-val")==t){BX.addClass(i,a)}else{BX.removeClass(i,a)}}}if(t!==false){t=t/100;this.pWidth.value=Math.round(this.originalWidth*t)||"";this.pHeight.value=Math.round(this.originalHeight*t)||""}else if(this.savedWidth&&this.savedHeight){this.pWidth.value=this.savedWidth;this.pHeight.value=this.savedHeight}this.ShowPreview();if(e){this.savedWidth=this.pWidth.value;this.savedHeight=this.pHeight.value;this.savedPerc=t!==false?(t||1)*100:false}};_.prototype.SrcOnChange=function(t){var e,i,s,a,l,o=this,n=this.pSrc.value;t=t!==false;if(this.lastSrc!==n){this.lastSrc=n;if(!this.pInvisCont){this.pInvisCont=this.pCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-invis-cnt"}}))}else{BX.cleanNode(this.pInvisCont)}this.dummyImg=this.pInvisCont.appendChild(BX.create("IMG"));BX.bind(this.dummyImg,"load",function(){setTimeout(function(){o.originalWidth=o.dummyImg.offsetWidth;o.originalHeight=o.dummyImg.offsetHeight;if(t){o.pWidth.value=o.originalWidth;o.pHeight.value=o.originalHeight;i=100}else{i=false;a=Math.round(1e4*parseInt(o.pWidth.value)/parseInt(o.originalWidth))/100;l=Math.round(1e4*parseInt(o.pHeight.value)/parseInt(o.originalHeight))/100;if(Math.abs(a-l)<=.1){s=(a+l)/2;for(e=0;e<o.percVals.length;e++){if(Math.abs(o.percVals[e]-s)<=.1){i=o.percVals[e];break}}}}o.sizeRatio=o.originalWidth/o.originalHeight;o.SetPercentSize(i,true);if(o.bEmptySrcRowsHidden){o.ShowRows(o.bAdditional?["preview","size","align","style","alt"]:["preview","size"],true,true);o.bEmptySrcRowsHidden=false}o.ShowPreview()},100)});BX.bind(this.dummyImg,"error",function(){o.pWidth.value="";o.pHeight.value=""});this.dummyImg.src=n}};_.prototype.ShowPreview=function(){if(!this.pPreviewImg){this.pPreviewImg=BX.create("IMG");if(this.pAlign){this.pPreview.insertBefore(this.pPreviewImg,this.pPreview.firstChild)}else{this.pPreview.appendChild(this.pPreviewImg)}}if(this.pPreviewImg.src!=this.pSrc.value){this.pPreviewImg.src=this.pSrc.value}if(this.pNoSize.checked){this.pPreviewImg.style.width="";this.pPreviewImg.style.height=""}else{this.pPreviewImg.style.width=this.pWidth.value+"px";this.pPreviewImg.style.height=this.pHeight.value+"px"}if(this.pAlign){var t=this.pAlign.value;if(t!=this.pPreviewImg.align){if(t==""){this.pPreviewImg.removeAttribute("align")}else{this.pPreviewImg.align=t}}}};_.prototype.SetValues=function(t){if(!t){t={}}var e,i,s=["preview","size","align","style","alt"];this.lastSrc="";this.bEmptySrcRowsHidden=this.bNewImage;if(this.bNewImage){for(e=0;e<s.length;e++){i=this.rows[s[e]];if(i&&i.cont){i.cont.style.display="none";this.SetRowHeight(i.cont,0,0)}}}else{for(e=0;e<s.length;e++){i=this.rows[s[e]];if(i&&i.cont){i.cont.style.display="";this.SetRowHeight(i.cont,i.height,100)}}}this.pSrc.value=this.editor.util.spaceUrlDecode(t.src||"");if(this.pTitle)this.pTitle.value=t.title||"";if(this.pAlt)this.pAlt.value=t.alt||"";this.savedWidth=this.pWidth.value=t.width||"";this.savedHeight=this.pHeight.value=t.height||"";if(this.pAlign)this.pAlign.value=t.align||"";if(this.pClass)this.pClass.value=t.className||"";this.pLink.value=t.link||"";this.pNoSize.checked=t.noWidth&&t.noHeight;this.NoSizeCheck();this.ShowRows(["align","style","alt","link"],false,false);this.bAdditional=false;this.SrcOnChange(!t.width||!t.height);if(this.pClass){if(!this.oClass){this.oClass=new window.BXHtmlEditor.ClassSelector(this.editor,{id:this.id+"-class-selector",input:this.pClass,filterTag:"IMG",value:this.pClass.value});var a=this;BX.addCustomEvent(this.oClass,"OnComboPopupClose",function(){a.closeByEnter=true});BX.addCustomEvent(this.oClass,"OnComboPopupOpen",function(){a.closeByEnter=false})}else{this.oClass.OnChange()}}};_.prototype.GetValues=function(){var t={src:this.pSrc.value,width:this.pNoSize.checked?"":this.pWidth.value,height:this.pNoSize.checked?"":this.pHeight.value,link:this.pLink.value||"",image:this.image||false};if(this.pTitle)t.title=this.pTitle.value;if(this.pAlt)t.alt=this.pAlt.value;if(this.pAlign)t.align=this.pAlign.value;if(this.pClass)t.className=this.pClass.value||"";return t};_.prototype.Show=function(t,e){var i=this,s,a={},l,o,n=false;if(!this.readyToShow){return setTimeout(function(){i.Show(t,e)},100)}this.savedRange=e;if(!this.editor.bbCode||!this.editor.synchro.IsFocusedOnTextarea()){if(!this.editor.iframeView.IsFocused()){this.editor.iframeView.Focus()}if(this.savedRange){this.editor.selection.SetBookmark(this.savedRange)}if(!t){s=this.editor.selection.GetRange();t=s.getNodes([1])}}if(t){for(o=0;o<t.length;o++){n=t[o];l=this.editor.GetBxTag(n);if(l.tag||!n.nodeName||n.nodeName!="IMG"){n=false}else{break}}}this.bNewImage=!n;this.image=n;if(n){a.src=n.getAttribute("src");if(n.style.width){a.width=n.style.width}if(!a.width&&n.getAttribute("width")){a.width=n.getAttribute("width")}if(!a.width){a.width=n.offsetWidth;a.noWidth=true}if(n.style.height){a.height=n.style.height}if(!a.height&&n.getAttribute("height")){a.height=n.getAttribute("height")}if(!a.height){a.height=n.offsetHeight;a.noHeight=true}var h=n.getAttribute("data-bx-clean-attribute");if(h){n.removeAttribute(h);n.removeAttribute("data-bx-clean-attribute")}a.alt=n.alt||"";a.title=n.title||"";a.title=n.title||"";a.className=n.className;a.align=n.align||"";var r=n.parentNode.nodeName=="A"?n.parentNode:null;if(r&&r.href){a.link=r.getAttribute("href")}}if(!this.editor.bbCode){window["OnFileDialogSelect"+this.editor.id]=window["OnFileDialogImgSelect"+this.editor.id]=function(t,e,s){var a;if(typeof t=="object"){a=t.src;if(i.pTitle)i.pTitle.value=t.description||t.name;if(i.pAlt)i.pAlt.value=t.description||t.name}else{a=(e=="/"?"":e)+"/"+t}i.pSrc.value=a;BX.focus(i.pSrc);i.pSrc.select();i.SrcOnChange()}}this.SetValues(a);this.SetTitle(BX.message("InsertImage"));_.superclass.Show.apply(this,arguments)};_.prototype.SetPanelHeight=function(t,e){this.pSearchCont.style.height=t+"px";this.pSearchCont.style.opacity=e/100;this.editor.SetAreaContSize(this.origAreaWidth,this.origAreaHeight-t,{areaContTop:this.editor.toolbar.GetHeight()+t})};_.prototype.ShowRows=function(t,e,i){var s=this,a,l,o,n,h,r;if(e){for(h=0;h<t.length;h++){r=this.rows[t[h]];if(r&&r.cont){if(r.animation)r.animation.stop();r.cont.style.display="";if(i){a=0;l=r.height;o=0;n=100}else{a=r.height;l=0;o=100;n=0}r.animation=new BX.easing({_row:r,duration:300,start:{height:a,opacity:o},finish:{height:l,opacity:n},transition:BX.easing.makeEaseOut(BX.easing.transitions.quart),step:function(t){s.SetRowHeight(this._row.cont,t.height,t.opacity)},complete:function(){s.CheckSize();this._row.animation=null}});r.animation.animate()}}}else{for(h=0;h<t.length;h++){r=this.rows[t[h]];if(r&&r.cont){if(i){r.cont.style.display="";this.SetRowHeight(r.cont,r.height,100)}else{r.cont.style.display="none";this.SetRowHeight(r.cont,0,0)}}}this.CheckSize()}};_.prototype.SetRowHeight=function(t,e,i){if(t&&t.cells){if(e==0||i==0){t.style.display="none"}else{t.style.display=""}t.style.opacity=i/100;for(var s=0;s<t.cells.length;s++){t.cells[s].style.height=e+"px"}}};function z(t,e){e={id:"bx_link",width:600,resizable:false,className:"bxhtmled-link-dialog"};z.superclass.constructor.apply(this,[t,e]);this.id="link"+this.editor.id;this.action="createLink";this.selectFirstFocus=true;this.readyToShow=false;if(!this.editor.fileDialogsLoaded){var i=this;this.editor.LoadFileDialogs(function(){i.SetContent(i.Build());i.readyToShow=true})}else{this.SetContent(this.Build());this.readyToShow=true}BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(z,e);z.prototype.Build=function(){function t(t,e,i){var s,a,l;s=t.insertRow(-1);if(i){s.className="bxhtmled-add-row"}a=s.insertCell(-1);a.className="bxhtmled-left-c";if(e&&e.label){a.appendChild(BX.create("LABEL",{text:e.label})).setAttribute("for",e.id)}l=s.insertCell(-1);l.className="bxhtmled-right-c";return{row:s,leftCell:a,rightCell:l}}var e,i=BX.create("DIV");var s=BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl bxhtmled-dialog-tbl-collapsed"}});if(!this.editor.bbCode){e=t(s,{label:BX.message("BXEdLinkType")+":",id:this.id+"-type"});this.pType=e.rightCell.appendChild(BX.create("SELECT",{props:{id:this.id+"-type"}}));this.pType.options.add(new Option(BX.message("BXEdLinkTypeInner"),"internal",true,true));this.pType.options.add(new Option(BX.message("BXEdLinkTypeOuter"),"external",false,false));this.pType.options.add(new Option(BX.message("BXEdLinkTypeAnchor"),"anchor",false,false));this.pType.options.add(new Option(BX.message("BXEdLinkTypeEmail"),"email",false,false));BX.bind(this.pType,"change",BX.delegate(this.ChangeType,this))}e=t(s,{label:BX.message("BXEdLinkText")+":",id:this.id+"-text"});this.pText=e.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-text",placeholder:BX.message("BXEdLinkTextPh")}}));this.pTextCont=e.row;e=t(s,{label:BX.message("BXEdLinkInnerHtml")+":",id:this.id+"-innerhtml"});this.pInnerHtml=e.rightCell.appendChild(BX.create("DIV",{props:{className:"bxhtmled-ld-html-wrap"}}));this.pInnerHtmlCont=e.row;this.firstFocus=this.pText;e=t(s,{label:BX.message("BXEdLinkHref")+":",id:this.id+"-href"});this.pHrefIn=e.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-href",placeholder:BX.message("BXEdLinkHrefPh")}}));if(!this.editor.bbCode){this.pHrefIn.style.minWidth="80%";var a=BX("bx-open-file-link-medialib-but-"+this.editor.id);if(a){e.rightCell.appendChild(a)}else{var l=BX("bx_open_file_link_medialib_button_"+this.editor.id);if(l){e.rightCell.appendChild(l);BX.bind(l,"click",window["BxOpenFileBrowserImgFile"+this.editor.id])}else{var o=BX("bx_ml_bx_open_file_link_medialib_button_"+this.editor.id);if(o){e.rightCell.appendChild(o)}}}}else{a=BX("bx-open-file-link-medialib-but-"+this.editor.id);l=BX("bx_open_file_link_medialib_button_"+this.editor.id);if(a){a.style.display="none"}if(l){l.style.display="none"}}this.pHrefIntCont=e.row;e=t(s,{label:BX.message("BXEdLinkHref")+":",id:this.id+"-href-ext"});this.pHrefType=e.rightCell.appendChild(BX.create("SELECT",{props:{id:this.id+"-href-type"}}));this.pHrefType.options.add(new Option("http://","http://",false,false));this.pHrefType.options.add(new Option("https://","https://",false,false));this.pHrefType.options.add(new Option("ftp://","ftp://",false,false));this.pHrefType.options.add(new Option("","",false,false));this.pHrefExt=e.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-href-ext",placeholder:BX.message("BXEdLinkHrefExtPh")},style:{minWidth:"250px"}}));this.pHrefExtCont=e.row;e=t(s,{label:BX.message("BXEdLinkHrefAnch")+":",id:this.id+"-href-anch"});this.pHrefAnchor=e.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-href-anchor",placeholder:BX.message("BXEdLinkSelectAnchor")}}));this.pHrefAnchCont=e.row;e=t(s,{label:BX.message("BXEdLinkHrefEmail")+":",id:this.id+"-href-email"});var n=BX.browser.IsIE()||BX.browser.IsIE9()?"text":"email";this.pHrefEmail=e.rightCell.appendChild(BX.create("INPUT",{props:{type:n,id:this.id+"-href-email"}}));this.pHrefEmailCont=e.row;if(!this.editor.bbCode){e=s.insertRow(-1);var h=e.insertCell(-1);BX.adjust(h,{props:{className:"bxhtmled-title-cell bxhtmled-title-cell-foldable",colSpan:2},text:BX.message("BXEdLinkAdditionalTitle")});h.onclick=function(){BX.toggleClass(s,"bxhtmled-dialog-tbl-collapsed")};if(this.editor.config.useLinkStat!==false){e=t(s,false,true);this.pStatCont=e.row;this.pStat=e.leftCell.appendChild(BX.create("INPUT",{props:{type:"checkbox",id:this.id+"-stat"}}));e.rightCell.appendChild(BX.create("LABEL",{text:BX.message("BXEdLinkStat")})).setAttribute("for",this.id+"-stat");var r,d=e.rightCell.appendChild(BX.create("DIV",{props:{className:"bxhtmled-stat-wrap"}}));r=d.appendChild(BX.create("DIV",{html:'<label for="event1">'+BX.message("BXEdLinkStatEv1")+":</label> "}));this.pStatEvent1=r.appendChild(BX.create("INPUT",{props:{type:"text",id:"event1"},style:{minWidth:"50px"}}));r=d.appendChild(BX.create("DIV",{html:'<label for="event2">'+BX.message("BXEdLinkStatEv2")+":</label> "}));this.pStatEvent2=r.appendChild(BX.create("INPUT",{props:{type:"text",id:"event2"},style:{minWidth:"50px"}}));r=d.appendChild(BX.create("DIV",{html:'<label for="event3">'+BX.message("BXEdLinkStatEv3")+":</label> "}));this.pStatEvent3=r.appendChild(BX.create("INPUT",{props:{type:"text",id:"event3"},style:{minWidth:"50px"}}));BX.addClass(e.leftCell,"bxhtmled-left-c-top");BX.bind(this.pStat,"click",BX.delegate(this.CheckShowStatParams,this))}e=t(s,{label:BX.message("BXEdLinkTitle")+":",id:this.id+"-title"},true);this.pTitle=e.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-title"}}));e=t(s,{label:BX.message("BXEdCssClass")+":",id:this.id+"-style"},true);this.pClass=e.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-style"}}));e=t(s,{label:BX.message("BXEdLinkTarget")+":",id:this.id+"-target"},true);this.pTarget=e.rightCell.appendChild(BX.create("SELECT",{props:{id:this.id+"-target"}}));this.pTarget.options.add(new Option(BX.message("BXEdLinkTargetBlank"),"_blank",false,false));this.pTarget.options.add(new Option(BX.message("BXEdLinkTargetParent"),"_parent",false,false));this.pTarget.options.add(new Option(BX.message("BXEdLinkTargetSelf"),"_self",true,true));this.pTarget.options.add(new Option(BX.message("BXEdLinkTargetTop"),"_top",false,false));e=t(s,false,true);this.pNoindex=e.leftCell.appendChild(BX.create("INPUT",{props:{type:"checkbox",id:this.id+"-noindex"}}));e.rightCell.appendChild(BX.create("LABEL",{text:BX.message("BXEdLinkNoindex")})).setAttribute("for",this.id+"-noindex");BX.bind(this.pNoindex,"click",BX.delegate(this.CheckNoindex,this));e=t(s,{label:BX.message("BXEdLinkId")+":",id:this.id+"-id"},true);this.pId=e.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-id"}}));e=t(s,{label:BX.message("BXEdLinkRel")+":",id:this.id+"-rel"},true);this.pRel=e.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-rel"}}))}i.appendChild(s);return i};z.prototype.OpenFileDialog=function(){var t=window["BxOpenFileBrowserWindFile"+this.editor.id];if(t&&typeof t=="function"){var e=this;window["OnFileDialogSelect"+this.editor.id]=function(t,i,s){e.pHrefIn.value=(i=="/"?"":i)+"/"+t;e.pHrefIn.focus();e.pHrefIn.select();window["OnFileDialogSelect"+e.editor.id]=null};t()}};z.prototype.ChangeType=function(){var t=this.pType?this.pType.value:this.editor.config.linkDialogType||"internal";this.pHrefIntCont.style.display="none";this.pHrefExtCont.style.display="none";this.pHrefAnchCont.style.display="none";this.pHrefEmailCont.style.display="none";if(this.pStatCont)this.pStatCont.style.display="none";if(t=="internal"){this.pHrefIntCont.style.display=""}else if(t=="external"){if(this.pStatCont)this.pStatCont.style.display="";this.pHrefExtCont.style.display=""}else if(t=="anchor"){this.pHrefAnchCont.style.display=""}else if(t=="email"){this.pHrefEmailCont.style.display=""}this.editor.config.linkDialogType=t;this.editor.SaveOption("link_dialog_type",this.editor.config.linkDialogType)};z.prototype.CheckShowStatParams=function(){if(this.pStat&&this.pStat.checked){BX.removeClass(this.pStatCont,"bxhtmled-link-stat-hide")}else{BX.addClass(this.pStatCont,"bxhtmled-link-stat-hide")}};z.prototype.CheckNoindex=function(){if(this.pNoindex.checked){this.pRel.value="nofollow";this.pRel.disabled=true}else{this.pRel.value=this.pRel.value=="nofollow"?"":this.pRel.value;this.pRel.disabled=false}};z.prototype.SetValues=function(t){this.pHrefAnchor.value="";if(!this.editor.bbCode&&this.pStat){this.pStatEvent1.value=this.pStatEvent2.value=this.pStatEvent3.value="";this.pStat.checked=false}if(!t){t={}}else{var e=this.editor.util.spaceUrlDecode(t.href||"");if(this.editor.bbCode){t.type="internal";this.pHrefIn.value=e||"";this.firstFocus=this.pHrefIn}else if(e!=""){if(e.substring(0,"mailto:".length).toLowerCase()=="mailto:"){t.type="email";this.pHrefEmail.value=e.substring("mailto:".length)}else if(e.substr(0,1)=="#"){t.type="anchor";this.pHrefAnchor.value=e;this.firstFocus=this.pHrefAnchor}else if(e.indexOf("://")!==-1||e.substr(0,"www.".length)=="www."||e.indexOf("&goto=")!==-1){t.type="external";if(this.pStat&&e.substr(0,"/bitrix/redirect.php".length)=="/bitrix/redirect.php"){this.pStat.checked=true;this.CheckShowStatParams();var i=e.substring("/bitrix/redirect.php".length);function s(t,e){var i=e.indexOf(t+"=");if(i<0){return""}var s=e.indexOf("&",i+t.length+1);if(s<0){e=e.substring(i+t.length+1)}else{e=e.substr(i+t.length+1,s-i-1-t.length)}return unescape(e)}this.pStatEvent1.value=s("event1",i);this.pStatEvent2.value=s("event2",i);this.pStatEvent3.value=s("event3",i);e=s("goto",i)}if(e.substr(0,"www.".length)=="www.")e="http://"+e;var a=e.substr(0,e.indexOf("://")+3);this.pHrefType.value=a;if(this.pHrefType.value!=a)this.pHrefType.value="";this.pHrefExt.value=e.substring(e.indexOf("://")+3);this.firstFocus=this.pHrefExt}else{t.type="internal";this.pHrefIn.value=e||"";this.firstFocus=this.pHrefIn}}if(!t.type){if(t.text&&t.text.match(this.editor.autolinkEmailRegExp)){this.pHrefEmail.value=t.text;t.type="email";this.firstFocus=this.pHrefEmail}else{if(this.editor.config.linkDialogType&&BX.util.in_array(this.editor.config.linkDialogType,["internal","external","anchor","email"])){t.type=this.editor.config.linkDialogType;if(t.type=="email"){this.pHrefEmail.value="";this.firstFocus=this.pHrefEmail}else if(t.type=="anchor"){this.pHrefAnchor.value="";this.firstFocus=this.pHrefAnchor}else if(t.type=="internal"){this.pHrefIn.value="";this.firstFocus=this.pHrefIn}else{this.pHrefExt.value="";this.firstFocus=this.pHrefExt}}else{t.type="internal";this.pHrefIn.value=e||"";this.firstFocus=this.pHrefIn}}}if(this.pType){this.pType.value=t.type}this.pInnerHtmlCont.style.display="none";this.pTextCont.style.display="none";if(t.bTextContent){this.pText.value=t.text||"";this.pTextCont.style.display=""}else{if(!t.text&&t.innerHtml){this.pInnerHtml.innerHTML=t.innerHtml;this.pInnerHtmlCont.style.display=""}else{this.pText.value=t.text||"";this.pTextCont.style.display=""}this._originalText=t.text}}if(!this.editor.bbCode){this.pTitle.value=t.title||"";this.pTarget.value=t.target||"_self";this.pClass.value=t.className||"";this.pId.value=t.id||"";this.pRel.value=t.rel||"";this.pNoindex.checked=t.noindex}this.ChangeType();if(!this.editor.bbCode){this.CheckShowStatParams();this.CheckNoindex();if(!this.oClass){this.oClass=new window.BXHtmlEditor.ClassSelector(this.editor,{id:this.id+"-class-selector",input:this.pClass,filterTag:"A",value:this.pClass.value});var l=this;BX.addCustomEvent(this.oClass,"OnComboPopupClose",function(){l.closeByEnter=true});BX.addCustomEvent(this.oClass,"OnComboPopupOpen",function(){l.closeByEnter=false})}else{this.oClass.OnChange()}}};z.prototype.GetValues=function(){var t=this.pType?this.pType.value:"internal",e={text:this.pText.value};if(!this.editor.bbCode){e.className="";e.title=this.pTitle.value;e.id=this.pId.value;e.rel=this.pRel.value;e.noindex=!!this.pNoindex.checked}if(t=="internal"){e.href=this.pHrefIn.value}else if(t=="external"){e.href=this.pHrefExt.value;if(this.pHrefType.value&&e.href.indexOf("://")==-1){e.href=this.pHrefType.value+e.href}if(this.pStat&&this.pStat.checked){e.href="/bitrix/redirect.php?event1="+escape(this.pStatEvent1.value)+"&event2="+escape(this.pStatEvent2.value)+"&event3="+escape(this.pStatEvent3.value)+"&goto="+escape(e.href)}}else if(t=="anchor"){e.href=this.pHrefAnchor.value}else if(t=="email"){e.href="mailto:"+this.pHrefEmail.value}if(this.pTarget&&this.pTarget.value!=="_self"){e.target=this.pTarget.value}if(this.pClass&&this.pClass.value){e.className=this.pClass.value}e.node=this.lastLink||false;return e};z.prototype.Show=function(t,e){var i=this,s={},a,l,o,n,h=0;this.lastLink=false;if(!this.readyToShow){return setTimeout(function(){i.Show(t,e)},100)}this.savedRange=e;if(!this.editor.bbCode||!this.editor.synchro.IsFocusedOnTextarea()){if(!t){t=this.editor.action.CheckState("formatInline",{},"a")}if(t){for(a=0;a<t.length;a++){o=t[a];if(o){n=o;h++}if(h>1){break}}if(h===1&&n&&n.querySelector){if(!n.querySelector("*")){s.text=this.editor.util.GetTextContent(n);s.bTextContent=true}else{s.text=this.editor.util.GetTextContent(n);if(BX.util.trim(s.text)==""){s.innerHtml=n.innerHTML}s.bTextContent=false}var r=n.getAttribute("data-bx-clean-attribute");if(r){n.removeAttribute(r);n.removeAttribute("data-bx-clean-attribute")}s.noindex=n.getAttribute("data-bx-noindex")=="Y";s.href=n.getAttribute("href");s.title=n.title;s.id=n.id;s.rel=n.getAttribute("rel");s.target=n.target;s.className=n.className;this.lastLink=n}}else{var d=BX.util.trim(this.editor.selection.GetText());if(d&&d!=this.editor.INVISIBLE_SPACE){s.text=d}}this.bNewLink=t&&h>0;var p=[],c;if(document.querySelectorAll){var u=this.editor.sandbox.GetDocument().querySelectorAll(".bxhtmled-surrogate");l=u.length;for(a=0;a<l;a++){c=this.editor.GetBxTag(u[a]);if(c.tag=="anchor"){p.push({NAME:"#"+c.params.name,DESCRIPTION:BX.message("BXEdLinkHrefAnch")+": #"+c.params.name,CLASS_NAME:"bxhtmled-inp-popup-item"})}}}if(p.length>0){this.oHrefAnchor=new BXInputPopup({id:this.id+"-href-anchor-cntrl"+Math.round(Math.random()*1e9),values:p,input:this.pHrefAnchor,className:"bxhtmled-inp-popup"});BX.addCustomEvent(this.oHrefAnchor,"onInputPopupShow",function(t){if(t&&t.oPopup&&t.oPopup.popupContainer){t.oPopup.popupContainer.style.zIndex=3010;if(p.length>20){t.oPopup.popupContainer.style.overflow="auto";t.oPopup.popupContainer.style.paddingRight="20px";t.oPopup.popupContainer.style.maxHeight="300px"}}})}}else{s.text=this.editor.textareaView.GetTextSelection()}if(!this.editor.bbCode){window["OnFileDialogImgSelect"+this.editor.id]=window["OnFileDialogSelect"+this.editor.id]=function(t,e,s){var a;if(typeof t=="object"){a=t.src;if(i.pTitle)i.pTitle.value=t.description||t.name;if(i.pAlt)i.pAlt.value=t.description||t.name}else{a=(e=="/"?"":e)+"/"+t}i.pHrefIn.value=a;i.pHrefIn.focus();i.pHrefIn.select()}}this.SetValues(s);this.SetTitle(BX.message("InsertLink"));z.superclass.Show.apply(this,arguments)};function W(t,e){e={id:"bx_video",width:600,className:"bxhtmled-video-dialog"};this.sizes=[{key:"560x315",width:560,height:315},{key:"640x360",width:640,height:360},{key:"853x480",width:853,height:480},{key:"1280x720",width:1280,height:720}];W.superclass.constructor.apply(this,[t,e]);this.id="video_"+this.editor.id;this.waitCounter=false;this.SetContent(this.Build());BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(W,e);W.prototype.Build=function(){this.pCont=BX.create("DIV",{props:{className:"bxhtmled-video-dialog-cnt bxhtmled-video-cnt  bxhtmled-video-empty"}});var t=this,e,i,s=BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl bxhtmled-video-dialog-tbl"}});e=this.AddTableRow(s,{label:BX.message("BXEdVideoSource")+":",id:this.id+"-source"});this.pSource=e.rightCell.appendChild(BX.create("INPUT",{props:{id:this.id+"-source",type:"text",className:"bxhtmled-90-input",placeholder:BX.message("BXEdVideoSourcePlaceholder")}}));BX.bind(this.pSource,"change",BX.delegate(this.VideoSourceChanged,this));BX.bind(this.pSource,"mouseup",BX.delegate(this.VideoSourceChanged,this));BX.bind(this.pSource,"keyup",BX.delegate(this.VideoSourceChanged,this));this.pErrorRow=s.insertRow(-1);this.pErrorRow.style.display="none";i=BX.adjust(this.pErrorRow.insertCell(-1),{props:{className:"bxhtmled-video-error-cell"},attrs:{colSpan:2}});this.pError=i.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-video-error"}}));e=s.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-video-params-wrap"},attrs:{colSpan:2}});var a=i.appendChild(BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl bxhtmled-video-dialog-tbl"}}));e=this.AddTableRow(a,{label:BX.message("BXEdVideoInfoTitle")+":",id:this.id+"-title"});this.pTitle=e.rightCell.appendChild(BX.create("INPUT",{props:{id:this.id+"-title",type:"text",className:"bxhtmled-90-input",disabled:!!this.editor.bbCode}}));BX.addClass(e.row,"bxhtmled-video-ext-row bxhtmled-video-ext-loc-row");e=this.AddTableRow(a,{label:BX.message("BXEdVideoSize")+":",id:this.id+"-size"});this.pSize=e.rightCell.appendChild(BX.create("SELECT",{props:{id:this.id+"-size"}}));BX.addClass(e.row,"bxhtmled-video-ext-row");this.pUserSizeCnt=e.rightCell.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-user-size"},style:{display:"none"}}));this.pUserSizeCnt.appendChild(BX.create("LABEL",{props:{className:"bxhtmled-width-lbl"},text:BX.message("BXEdImgWidth")+": ",attrs:{for:this.id+"-width"}}));this.pWidth=this.pUserSizeCnt.appendChild(BX.create("INPUT",{props:{id:this.id+"-width",type:"text"}}));this.pUserSizeCnt.appendChild(BX.create("LABEL",{props:{className:"bxhtmled-width-lbl"},text:BX.message("BXEdImgHeight")+": ",attrs:{for:this.id+"-height"}}));this.pHeight=this.pUserSizeCnt.appendChild(BX.create("INPUT",{props:{id:this.id+"-height",type:"text"}}));BX.bind(this.pSize,"change",function(){t.pUserSizeCnt.style.display=t.pSize.value==""?"":"none"});this.pPreviewCont=a.insertRow(-1);i=BX.adjust(this.pPreviewCont.insertCell(-1),{props:{title:BX.message("BXEdVideoPreview")},attrs:{colSpan:2}});this.pPreview=i.appendChild(BX.create("DIV",{props:{className:"bxhtmled-video-preview-cnt"}}));BX.addClass(this.pPreviewCont,"bxhtmled-video-ext-row bxhtmled-video-ext-loc-row");this.pCont.appendChild(s);return this.pCont};W.prototype.VideoSourceChanged=function(){var t=BX.util.trim(this.pSource.value);if(t!==this.lastSourceValue){this.lastSourceValue=t;if(this.editor.bbCode&&this.bEdit&&t.toLowerCase().indexOf("[/video]")!==-1)return;this.AnalyzeVideoSource(t)}};W.prototype.AnalyzeVideoSource=function(t){var e=this;if(t.match(/<iframe([\s\S]*?)\/iframe>/gi)){var i=this.editor.phpParser.CheckForVideo(t);if(i){var s=this.editor.phpParser.FetchVideoIframeParams(t,i.provider)||{};this.ShowVideoParams({html:t,provider:i.provider||false,title:s.origTitle||"",width:s.width||false,height:s.height||false})}}else{this.StartWaiting();this.editor.Request({getData:this.editor.GetReqData("video_oembed",{video_source:t}),handler:function(t){if(t.result){e.StopWaiting();e.ShowVideoParams(t.data)}else{e.StopWaiting();if(t.error!==""){e.ShowVideoParams(false,t.error)}}}})}};W.prototype.StartWaiting=function(){var t="",e=this;this.waitCounter=this.waitCounter===false||this.waitCounter>3?0:this.waitCounter;if(e.waitCounter==1)t=".";else if(e.waitCounter==2)t="..";else if(e.waitCounter==3)t="...";e.SetTitle(BX.message("BXEdVideoTitle")+t);this.StopWaiting(false);this.waitingTimeout=setTimeout(function(){e.waitCounter++;e.StartWaiting()},250)};W.prototype.StopWaiting=function(t){if(this.waitingTimeout){clearTimeout(this.waitingTimeout);this.waitingTimeout=null}if(t!==false){this.waitCounter=false;this.SetTitle(t||BX.message("BXEdVideoTitle"))}};W.prototype.ShowVideoParams=function(t,e){this.data=t||{};this.pErrorRow.style.display="none";this.pPreviewCont.style.display="none";this.pPreview.innerHTML="";BX.removeClass(this.pCont,"bxhtmled-video-local");if(t===false||typeof t!="object"){BX.addClass(this.pCont,"bxhtmled-video-empty");if(e){this.pErrorRow.style.display="";this.pError.innerHTML=BX.util.htmlspecialchars(e)}}else if(t.remote&&!this.bEdit){BX.removeClass(this.pCont,"bxhtmled-video-empty");this.pTitle.value=t.title||"";if(t.width&&t.height){this.SetSize(t.width,t.height)}else{this.SetSize(400,300)}}else if(t.local&&!this.bEdit){this.SetSize(400,300);BX.removeClass(this.pCont,"bxhtmled-video-empty");BX.addClass(this.pCont,"bxhtmled-video-local")}else{BX.removeClass(this.pCont,"bxhtmled-video-empty");if(t.provider){this.SetTitle(BX.message("BXEdVideoTitleProvider").replace("#PROVIDER_NAME#",BX.util.htmlspecialchars(t.provider)))}this.pTitle.value=t.title||"";this.SetSize(t.width,t.height);if(t.html){var i=Math.min(t.width,560),s=Math.min(t.height,315),a=t.html;a=this.UpdateHtml(a,i,s);this.pPreview.innerHTML=a;this.pPreviewCont.style.display=""}else{this.pPreviewCont.style.display="none"}}};W.prototype.SetSize=function(t,e){var i=t+"x"+e;if(!this.sizeIndex[i]){this.ClearSizeControl([{key:i,width:t,height:e,title:BX.message("BXEdVideoSizeAuto")+" ("+t+" x "+e+")"}].concat(this.sizes))}this.pSize.value=i};W.prototype.ClearSizeControl=function(t){t=t||this.sizes;this.pSize.options.length=0;this.sizeIndex={};for(var e=0;e<t.length;e++){this.sizeIndex[t[e].key]=true;this.pSize.options.add(new Option(t[e].title||t[e].width+" x "+t[e].height,t[e].key,false,false))}this.pSize.options.add(new Option(BX.message("BXEdVideoSizeCustom"),"",false,false))};W.prototype.UpdateHtml=function(t,e,i,s){var a=false;if(s){s=BX.util.htmlspecialchars(s)}t=t.replace(/((?:title)|(?:width)|(?:height))\s*=\s*("|')([\s\S]*?)(\2)/gi,function(t,l,o,n){l=l.toLowerCase();if(l=="width"&&e){return l+'="'+e+'"'}else if(l=="height"&&i){return l+'="'+i+'"'}else if(l=="title"&&s){a=true;return l+'="'+s+'"'}return""});if(!a&&s){t=t.replace(/<iframe\s*/i,function(t){return t+' title="'+s+'" '})}return t};W.prototype.Show=function(t,e){this.savedRange=e;if(this.savedRange){this.editor.selection.SetBookmark(this.savedRange)}this.SetTitle(BX.message("BXEdVideoTitle"));this.ClearSizeControl();this.bEdit=t&&t.tag=="video";this.bxTag=t;if(this.bEdit){this.pSource.value=this.lastSourceValue=t.params.value;if(!this.editor.bbCode)this.AnalyzeVideoSource(t.params.value)}else{this.ShowVideoParams(false);this.pSource.value=""}W.superclass.Show.apply(this,arguments)};W.prototype.Save=function(){var t=this,e=this.pTitle.value,i=parseInt(this.pWidth.value)||100,s=parseInt(this.pHeight.value)||100,a=this.data.mimeType||"";if(this.pSize.value!==""){var l=this.pSize.value.split("x");if(l&&l.length==2){i=parseInt(l[0]);s=parseInt(l[1])}}if(this.data&&this.data.html)this.data.html=this.UpdateHtml(this.data.html,i,s,e);var o="",n="";if(this.bEdit){if(this.bxTag&&this.editor.bbCode&&!this.data){this.bxTag.params.value=this.pSource.value}else if(this.data&&this.editor.action.IsSupported("insertHTML")){var h=this.editor.GetIframeElement(this.bxTag.id);if(h){this.editor.selection.SelectNode(h);BX.remove(h)}n=this.data.html}}else if(this.data){if(this.editor.bbCode&&this.data.local){o=this.data.html="[VIDEO width="+i+" height="+s+"]"+this.data.path+"[/VIDEO]";n=this.editor.bbParser.GetVideoSourse(this.data.path,{type:false,width:i,height:s,html:this.data.html},this.data.html)}else if(this.editor.bbCode&&this.data.remote){o="[VIDEO ";if(a){o+="mimetype='"+a+"' "}o+="width="+i+" height="+s+"]"+this.data.path+"[/VIDEO]";this.data.html=o;n=this.editor.bbParser.GetVideoSourse(this.data.path,{type:false,width:i,height:s,html:this.data.html,title:this.data.title},this.data.html)}else if(this.data.html){if(this.savedRange){this.editor.selection.SetBookmark(this.savedRange)}if(t.editor.synchro.IsFocusedOnTextarea()){var r=this.editor.phpParser.FetchVideoIframeParams(this.data.html);o="[VIDEO TYPE="+this.data.provider.toUpperCase()+" WIDTH="+this.data.width+" HEIGHT="+this.data.height+"]"+r.src+"[/VIDEO]"}n=this.data.html}}if(t.editor.synchro.IsFocusedOnTextarea()){if(o!=="")this.editor.textareaView.WrapWith(false,false,o);t.editor.synchro.Sync()}else{if(n!==""&&this.editor.action.IsSupported("insertHTML")){this.editor.action.Exec("insertHTML",n)}setTimeout(function(){t.editor.synchro.FullSyncFromIframe()},50)}};function M(t,e){e={id:"bx_source",height:400,width:700,resizable:true,className:"bxhtmled-source-dialog"};M.superclass.constructor.apply(this,[t,e]);this.id="source_"+this.editor.id;this.SetContent(this.Build());BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(M,e);M.prototype.Build=function(){this.pValue=BX.create("TEXTAREA",{props:{className:"bxhtmled-source-value",id:this.id+"-value"}});return this.pValue};M.prototype.OnResize=function(){var t=this.oDialog.PARTS.CONTENT_DATA.offsetWidth,e=this.oDialog.PARTS.CONTENT_DATA.offsetHeight;this.pValue.style.width=t-30+"px";this.pValue.style.height=e-30+"px"};M.prototype.OnResizeFinished=function(){};M.prototype.Save=function(){this.bxTag.params.value=this.pValue.value;this.editor.SetBxTag(false,this.bxTag);var t=this;setTimeout(function(){t.editor.synchro.FullSyncFromIframe()},50)};M.prototype.Show=function(t){this.bxTag=t;if(t&&t.tag){this.SetTitle(t.name);this.pValue.value=t.params.value;M.superclass.Show.apply(this,arguments);this.OnResize();BX.focus(this.pValue)}};function G(t,e){e={id:"bx_anchor",width:300,resizable:false,className:"bxhtmled-anchor-dialog"};G.superclass.constructor.apply(this,[t,e]);this.id="anchor_"+this.editor.id;this.SetContent(this.Build());BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(G,e);G.prototype.Build=function(){var t=BX.create("DIV");t.appendChild(BX.create("LABEL",{text:BX.message("BXEdAnchorName")+": "})).setAttribute("for",this.id+"-value");this.pValue=t.appendChild(BX.create("INPUT",{props:{className:"",id:this.id+"-value"}}));return t};G.prototype.Save=function(){this.bxTag.params.name=BX.util.trim(this.pValue.value.replace(/[^ a-z0-9_\-]/gi,""));this.editor.SetBxTag(false,this.bxTag);var t=this;setTimeout(function(){t.editor.synchro.FullSyncFromIframe()},50)};G.prototype.Show=function(t){this.bxTag=t;if(t&&t.tag){this.SetTitle(BX.message("BXEdAnchor"));this.pValue.value=t.params.name;G.superclass.Show.apply(this,arguments);BX.focus(this.pValue);this.pValue.select()}};function U(t,e){e={id:"bx_table",width:t.bbCode?300:600,resizable:false,className:"bxhtmled-table-dialog"};z.superclass.constructor.apply(this,[t,e]);this.id="table"+this.editor.id;this.action="insertTable";this.SetContent(this.Build());BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(U,e);U.prototype.Build=function(){var t,e,i,s=BX.create("DIV");var a=BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl bxhtmled-dialog-tbl-hide-additional"}});e=a.insertRow(-1);i=BX.adjust(e.insertCell(-1),{attrs:{colSpan:4}});t=i.appendChild(BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl"}}));e=t.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableRows")+":",attrs:{for:this.id+"-rows"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-val-cell"}});this.pRows=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-rows"}}));if(!this.editor.bbCode){i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableWidth")+":",attrs:{for:this.id+"-width"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-val-cell"}});this.pWidth=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-width"}}))}e=t.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableCols")+":",attrs:{for:this.id+"-cols"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-val-cell"}});this.pCols=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-cols"}}));if(!this.editor.bbCode){i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableHeight")+":",attrs:{for:this.id+"-height"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-val-cell"}});this.pHeight=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-height"}}))}if(!this.editor.bbCode){e=a.insertRow(-1);var l=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-title-cell bxhtmled-title-cell-foldable",colSpan:4},text:BX.message("BXEdLinkAdditionalTitle")});BX.bind(l,"click",function(){BX.toggleClass(a,"bxhtmled-dialog-tbl-hide-additional")});var o=a.appendChild(BX.create("TBODY",{props:{className:"bxhtmled-additional-tbody"}}));e=o.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableHeads")+":",attrs:{for:this.id+"-th"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-val-cell"}});this.pHeaders=i.appendChild(BX.create("SELECT",{props:{id:this.id+"-th"},style:{width:"130px"}}));this.pHeaders.options.add(new Option(BX.message("BXEdThNone"),"",true,true));this.pHeaders.options.add(new Option(BX.message("BXEdThTop"),"top",false,false));this.pHeaders.options.add(new Option(BX.message("BXEdThLeft"),"left",false,false));this.pHeaders.options.add(BX.adjust(new Option(BX.message("BXEdThTopLeft"),"topleft",false,false),{props:{title:BX.message("BXEdThTopLeftTitle")}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableCellSpacing")+":",attrs:{for:this.id+"-cell-spacing"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-val-cell"}});this.pCellSpacing=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-cell-spacing"}}));e=o.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableBorder")+":",attrs:{for:this.id+"-border"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-val-cell"}});this.pBorder=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-border"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableCellPadding")+":",attrs:{for:this.id+"-cell-padding"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-val-cell"}});this.pCellPadding=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-cell-padding"}}));e=o.insertRow(-1);i=BX.adjust(e.insertCell(-1),{attrs:{colSpan:4}});t=i.appendChild(BX.create("TABLE",{props:{className:"bxhtmled-dialog-inner-tbl"}}));e=t.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-inner-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableAlign")+":",attrs:{for:this.id+"-align"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-inner-val-cell"}});this.pAlign=i.appendChild(BX.create("SELECT",{props:{id:this.id+"-align"},style:{width:"130px"}}));this.pAlign.options.add(new Option(BX.message("BXEdTableAlignLeft"),"left",true,true));this.pAlign.options.add(new Option(BX.message("BXEdTableAlignCenter"),"center",false,false));this.pAlign.options.add(new Option(BX.message("BXEdTableAlignRight"),"right",false,false));e=t.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-inner-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableCaption")+":",attrs:{for:this.id+"-caption"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-inner-val-cell"}});this.pCaption=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-caption"}}));e=t.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-inner-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdCssClass")+":",attrs:{for:this.id+"-class"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-inner-val-cell"}});this.pClass=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-class"}}));e=t.insertRow(-1);i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-inner-lbl-cell"}});i.appendChild(BX.create("LABEL",{text:BX.message("BXEdTableId")+":",attrs:{for:this.id+"-id"}}));i=BX.adjust(e.insertCell(-1),{props:{className:"bxhtmled-inner-val-cell"}});this.pId=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-id"}}))}s.appendChild(a);return s};U.prototype.SetValues=function(t){this.pRows.value=t.rows||3;this.pCols.value=t.cols||4;if(!this.editor.bbCode){this.pWidth.value=t.width||"";this.pHeight.value=t.height||"";this.pId.value=t.id||"";this.pCaption.value=t.caption||"";this.pCellPadding.value=t.cellPadding||"";this.pCellSpacing.value=t.cellSpacing||"";this.pBorder.value=t.border||"";this.pClass.value=t.className||"";this.pHeaders.value=t.headers||"";this.pRows.disabled=this.pCols.disabled=!!this.currentTable;this.pAlign.value=t.align||"left";if(!this.oClass){this.oClass=new window.BXHtmlEditor.ClassSelector(this.editor,{id:this.id+"-class-selector",input:this.pClass,filterTag:"TABLE",value:this.pClass.value});var e=this;BX.addCustomEvent(this.oClass,"OnComboPopupClose",function(){e.closeByEnter=true});BX.addCustomEvent(this.oClass,"OnComboPopupOpen",function(){e.closeByEnter=false})}else{this.oClass.OnChange()}}};U.prototype.GetValues=function(){var t={table:this.currentTable||false,rows:parseInt(this.pRows.value)||1,cols:parseInt(this.pCols.value)||1};if(!this.editor.bbCode){t.width=BX.util.trim(this.pWidth.value);t.height=BX.util.trim(this.pHeight.value);t.id=BX.util.trim(this.pId.value);t.caption=BX.util.trim(this.pCaption.value);t.cellPadding=isNaN(parseInt(this.pCellPadding.value))?"":parseInt(this.pCellPadding.value);t.cellSpacing=isNaN(parseInt(this.pCellSpacing.value))?"":parseInt(this.pCellSpacing.value);t.border=isNaN(parseInt(this.pBorder.value))?"":parseInt(this.pBorder.value);t.headers=this.pHeaders.value;t.className=this.pClass.value;t.align=this.pAlign.value}return t};U.prototype.Show=function(t,e){var i,s={};this.savedRange=e;if(this.savedRange){this.editor.selection.SetBookmark(this.savedRange)}if(!t){t=this.editor.action.CheckState("insertTable")}if(t&&t.nodeName){i=t}else if(t&&t[0]&&t[0].nodeName){i=t[0]}this.currentTable=false;if(i){this.currentTable=i;s.rows=i.rows.length;s.cols=i.rows[0].cells.length;if(i.style.width){s.width=i.style.width}if(!s.width&&i.width){s.width=i.width}if(i.style.height){s.height=i.style.height}if(!s.height&&i.height){s.height=i.height}s.cellPadding=i.getAttribute("cellPadding")||"";s.cellSpacing=i.getAttribute("cellSpacing")||"";s.border=i.getAttribute("border")||0;s.id=i.getAttribute("id")||"";var a=BX.findChild(i,{tag:"CAPTION"},false);s.caption=a?BX.util.htmlspecialcharsback(a.innerHTML):"";s.className=i.className||"";var l,o,n,h=true,r=true;for(l=0;l<i.rows.length;l++){for(o=0;o<i.rows[l].cells.length;o++){n=i.rows[l].cells[o];if(l==0){h=n.nodeName=="TH"&&h}if(o==0){r=n.nodeName=="TH"&&r}}}if(!h&&!r){s.headers=""}else if(h&&r){s.headers="topleft"}else if(h){s.headers="top"}else{s.headers="left"}s.align=i.getAttribute("align")}this.SetValues(s);this.SetTitle(BX.message("BXEdTable"));U.superclass.Show.apply(this,arguments)};function j(t,e){e={id:"bx_settings",width:600,resizable:false};this.id="settings";q.superclass.constructor.apply(this,[t,e]);this.SetContent(this.Build());BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(j,e);j.prototype.Build=function(){this.pCont=BX.create("DIV",{props:{className:"bxhtmled-settings-dialog-cnt"}});var t,e,i=BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl"}});t=this.AddTableRow(i);this.pCleanSpans=t.leftCell.appendChild(BX.create("INPUT",{props:{id:this.id+"-clean-spans",type:"checkbox"}}));t.rightCell.appendChild(BX.create("LABEL",{html:BX.message("BXEdSettingsCleanSpans")})).setAttribute("for",this.id+"-clean-spans");t=i.insertRow(-1);e=t.insertCell(-1);BX.adjust(e,{props:{className:"bxhtmled-title-cell",colSpan:2},text:BX.message("BXEdPasteSettings")});t=this.AddTableRow(i);this.pPasteSetColors=t.leftCell.appendChild(BX.create("INPUT",{props:{id:this.id+"-ps-colors",type:"checkbox"}}));t.rightCell.appendChild(BX.create("LABEL",{html:BX.message("BXEdPasteSetColors")})).setAttribute("for",this.id+"-ps-colors");t=this.AddTableRow(i);this.pPasteSetBgBorders=t.leftCell.appendChild(BX.create("INPUT",{props:{id:this.id+"-ps-border",type:"checkbox"}}));t.rightCell.appendChild(BX.create("LABEL",{html:BX.message("BXEdPasteSetBgBorders")})).setAttribute("for",this.id+"-ps-border");t=this.AddTableRow(i);this.pPasteSetDecor=t.leftCell.appendChild(BX.create("INPUT",{props:{id:this.id+"-ps-decor",type:"checkbox"}}));t.rightCell.appendChild(BX.create("LABEL",{html:BX.message("BXEdPasteSetDecor")})).setAttribute("for",this.id+"-ps-decor");t=this.AddTableRow(i);this.pPasteTblDimen=t.leftCell.appendChild(BX.create("INPUT",{props:{id:this.id+"-ps-tbl-dim",type:"checkbox"}}));t.rightCell.appendChild(BX.create("LABEL",{html:BX.message("BXEdPasteSetTableDimen")})).setAttribute("for",this.id+"-ps-tbl-dim");t=i.insertRow(-1);e=t.insertCell(-1);BX.adjust(e,{props:{className:"bxhtmled-title-cell",colSpan:2},text:BX.message("BXEdViewSettings")});t=this.AddTableRow(i);this.pShowSnippets=t.leftCell.appendChild(BX.create("INPUT",{props:{id:this.id+"-show-snippets",type:"checkbox"}}));t.rightCell.appendChild(BX.create("LABEL",{html:BX.message("BXEdShowSnippets")+"*"})).setAttribute("for",this.id+"-show-snippets");t=i.insertRow(-1);e=t.insertCell(-1);BX.adjust(e,{props:{className:"bxhtmled-notice-cell",colSpan:2},text:"* "+BX.message("BXEdRefreshNotice")});this.pCont.appendChild(i);return this.pCont};j.prototype.Show=function(){var t={};this.SetValues(t);this.SetTitle(BX.message("BXEdSettings"));this.pCleanSpans.checked=this.editor.config.cleanEmptySpans;this.pPasteSetColors.checked=this.editor.config.pasteSetColors;this.pPasteSetBgBorders.checked=this.editor.config.pasteSetBorders;this.pPasteSetDecor.checked=this.editor.config.pasteSetDecor;this.pPasteTblDimen.checked=this.editor.config.pasteClearTableDimen;this.pShowSnippets.checked=this.editor.config.showSnippets;j.superclass.Show.apply(this,arguments)};j.prototype.Save=function(){this.editor.config.cleanEmptySpans=this.pCleanSpans.checked;this.editor.config.pasteSetColors=this.pPasteSetColors.checked;this.editor.config.pasteSetBorders=this.pPasteSetBgBorders.checked;this.editor.config.pasteSetDecor=this.pPasteSetDecor.checked;this.editor.config.pasteClearTableDimen=this.pPasteTblDimen.checked;this.editor.config.showSnippets=this.pShowSnippets.checked;this.editor.SaveOption("clean_empty_spans",this.editor.config.cleanEmptySpans?"Y":"N");this.editor.SaveOption("paste_clear_colors",this.editor.config.pasteSetColors?"Y":"N");this.editor.SaveOption("paste_clear_borders",this.editor.config.pasteSetBorders?"Y":"N");this.editor.SaveOption("paste_clear_decor",this.editor.config.pasteSetDecor?"Y":"N");this.editor.SaveOption("paste_clear_table_dimen",this.editor.config.pasteClearTableDimen?"Y":"N");this.editor.SaveOption("show_snippets",this.editor.config.showSnippets?"Y":"N")};function q(t,e){e={id:"bx_default",width:500,resizable:false,className:"bxhtmled-default-dialog"};this.id="default";this.action="universalFormatStyle";q.superclass.constructor.apply(this,[t,e]);this.SetContent(this.Build());BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(q,e);q.prototype.Show=function(t,e){var i=[],s,a,l=typeof t!=="object"||t.length==0,o;this.savedRange=e;if(this.savedRange){this.editor.selection.SetBookmark(this.savedRange)}if(l){t=this.editor.action.CheckState(this.action)}if(!t){t=[]}var n=t.length==1&&t[0].nodeName=="BODY";if(t.length==1&&BX.util.in_array(t[0].nodeName,["TD","TH","TR","TABLE"])){this.colorRow.style.display=""}else{this.colorRow.style.display="none"}if(!n){for(s=0;s<t.length;s++){if(a===undefined&&o===undefined){a=t[s].style.cssText;o=t[s].className}else{a=t[s].style.cssText===a?a:false;o=t[s].className===o?o:false}i.push(t[s].nodeName)}}this.SetValues({nodes:t,renewNodes:l,style:a,className:o});if(n)this.SetTitle(BX.message("BXEdDefaultPropDialog").replace("#NODES_LIST#",BX.message("BXEdDefaultPropDialogTextNode")));else this.SetTitle(BX.message("BXEdDefaultPropDialog").replace("#NODES_LIST#",i.join(", ")));q.superclass.Show.apply(this,arguments)};q.prototype.Build=function(){var t,e,i=this,s=BX.create("DIV");var a=BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl"}});t=a.insertRow(-1);e=BX.adjust(t.insertCell(-1),{props:{className:"bxhtmled-left-c"}});e.appendChild(BX.create("LABEL",{text:BX.message("BXEdCssClass")+":",attrs:{for:this.id+"-css-class"}}));e=BX.adjust(t.insertCell(-1),{props:{className:"bxhtmled-right-c"}});this.pCssClass=e.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-css-class"}}));t=a.insertRow(-1);e=BX.adjust(t.insertCell(-1),{props:{className:"bxhtmled-left-c"}});e.appendChild(BX.create("LABEL",{text:BX.message("BXEdCSSStyle")+":",attrs:{for:this.id+"-css-style"}}));e=BX.adjust(t.insertCell(-1),{props:{className:"bxhtmled-right-c"}});this.pCssStyle=e.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-css-style"}}));t=a.insertRow(-1);e=BX.adjust(t.insertCell(-1),{props:{className:"bxhtmled-left-c"}});e.appendChild(BX.create("LABEL",{text:BX.message("BXEdColorpickerDialog")+":",attrs:{for:this.id+"-css-class"}}));e=BX.adjust(t.insertCell(-1),{props:{className:"bxhtmled-right-c"}});this.textColor=e.appendChild(BX.create("INPUT",{props:{type:"hidden",id:this.id+"-s"}}));this.bgColor=e.appendChild(BX.create("INPUT",{props:{type:"hidden",id:this.id+"-s"}}));var l=new window.BXHtmlEditor.Controls.Color(this.editor,e,{registerActions:false,checkAction:false,BgColorMess:BX.message("BXEdBgColor"),callback:function(t,e){var s,a=" "+i.pCssStyle.value;if(t=="foreColor"){s=a.replace(/\s+color\s*:\s*([\s\S]*?);/gi,e?" color: "+e+";":"");if(s.toLowerCase()!=a.toLowerCase())a=s;else if(e)a+=" color: "+e+";"}else if(t=="backgroundColor"){s=a.replace(/background-color\s*:\s*([\s\S]*?);/gi,"background-color: "+e+";");if(s.toLowerCase()!=a.toLowerCase())a=s;else if(e)a+=" background-color: "+e+";"}i.pCssStyle.value=BX.util.trim(a)}});this.colorRow=t;s.appendChild(a);return s};q.prototype.SetValues=function(t){if(!t){t={}}this.nodes=t.nodes||[];this.renewNodes=t.renewNodes;this.pCssStyle.value=this.editor.util.RgbToHex(t.style||"");this.pCssClass.value=t.className||"";if(!this.oClass){this.oClass=new window.BXHtmlEditor.ClassSelector(this.editor,{id:this.id+"-class-selector",input:this.pCssClass,filterTag:"A",value:this.pCssClass.value});var e=this;BX.addCustomEvent(this.oClass,"OnComboPopupClose",function(){e.closeByEnter=true});BX.addCustomEvent(this.oClass,"OnComboPopupOpen",function(){e.closeByEnter=false})}else{this.oClass.OnChange()}};q.prototype.GetValues=function(){return{className:this.pCssClass.value,style:this.pCssStyle.value,nodes:this.renewNodes?[]:this.nodes}};function Y(t,e){this.editor=t;e={id:"bx_char",width:570,resizable:false,className:"bxhtmled-char-dialog"};this.id="char"+this.editor.id;Y.superclass.constructor.apply(this,[t,e]);this.oDialog.ClearButtons();this.oDialog.SetButtons([this.oDialog.btnCancel]);this.SetContent(this.Build());BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(Y,e);Y.prototype.Build=function(){var t=this,e,i,s,a=18,l,o=this.editor.HTML_ENTITIES.length,n=BX.create("DIV");var h=BX.create("TABLE",{props:{className:"bxhtmled-specialchar-tbl"}});for(s=0;s<o;s++){if(s%a==0){e=h.insertRow(-1)}l=this.editor.HTML_ENTITIES[s];i=e.insertCell(-1);i.innerHTML=l;i.setAttribute("data-bx-specialchar",l);i.title=BX.message("BXEdSpecialchar")+": "+l.substr(1,l.length-2)}BX.bind(h,"click",function(e){var i,s=e.target||e.srcElement;if(s.nodeType==3){s=s.parentNode}if(s&&s.getAttribute&&s.getAttribute("data-bx-specialchar")&&t.editor.action.IsSupported("insertHTML")){if(t.savedRange){t.editor.selection.SetBookmark(t.savedRange)}i=s.getAttribute("data-bx-specialchar");t.editor.On("OnSpecialcharInserted",[i]);t.editor.action.Exec("insertHTML",i)}t.oDialog.Close()});n.appendChild(h);return n};Y.prototype.SetValues=BX.DoNothing;Y.prototype.GetValues=BX.DoNothing;Y.prototype.Show=function(t){this.savedRange=t;if(this.savedRange){this.editor.selection.SetBookmark(this.savedRange)}this.SetTitle(BX.message("BXEdSpecialchar"));Y.superclass.Show.apply(this,arguments)};function K(t,e){this.editor=t;e={id:"bx_list",width:360,resizable:false,className:"bxhtmled-list-dialog"};this.id="list"+this.editor.id;K.superclass.constructor.apply(this,[t,e]);this.SetContent(this.Build());BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(K,e);K.prototype.Build=function(){var t=this,e,i,s,a=18,l,o=this.editor.HTML_ENTITIES.length,n=BX.create("DIV");this.itemsWrap=n.appendChild(BX.create("DIV",{props:{className:"bxhtmled-list-wrap"}}));this.addItem=n.appendChild(BX.create("span",{props:{className:"bxhtmled-list-add-item"},text:BX.message("BXEdAddListItem")}));BX.bind(this.addItem,"click",BX.proxy(this.AddItem,this));return n};K.prototype.BuildList=function(t){if(this.pList){BX.remove(this.pList)}this.pList=this.itemsWrap.appendChild(BX.create(t,{props:{className:"bxhtmled-list"}}));this.AddItem({focus:true});this.AddItem({focus:false});this.AddItem({focus:false})};K.prototype.AddItem=function(t){if(typeof t!=="object")t={};var e=BX.create("LI"),i=e.appendChild(BX.create("INPUT",{props:{type:"text",value:"",size:35}}));this.pList.appendChild(e);var s=e.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-list-del-item",title:BX.message("DelListItem")}}));if(t.focus!==false){setTimeout(function(){BX.focus(i)},100)}BX.bind(i,"keyup",BX.proxy(this.CheckList,this));BX.bind(i,"mouseup",BX.proxy(this.CheckList,this));BX.bind(i,"focus",BX.proxy(this.CheckList,this));BX.bind(s,"click",BX.proxy(this.RemoveItem,this))};K.prototype.RemoveItem=function(t){var e=t.target||t.srcElement,i=BX.findParent(e,{tag:"LI"});if(i){BX.remove(i)}};K.prototype.CheckList=function(){var t=this.pList.getElementsByTagName("LI");if(t.length<3){this.AddItem({focus:false});this.CheckList({focus:false})}else{if(t[t.length-1].firstChild&&t[t.length-1].firstChild.value!==""){this.AddItem({focus:false})}}};K.prototype.InputKeyNavigation=function(t){var e=t.target||t.srcElement,i=t.keyCode};K.prototype.SetValues=BX.DoNothing;K.prototype.GetValues=BX.DoNothing;K.prototype.Show=function(t){this.type=t.type;this.SetTitle(t.type=="ul"?BX.message("UnorderedList"):BX.message("OrderedList"));this.BuildList(t.type);K.superclass.Show.apply(this,arguments)};K.prototype.Save=function(){var t,e=[],i=this.pList.getElementsByTagName("INPUT");for(t=0;t<i.length;t++){if(i[t].value!==""){e.push(i[t].value)}}this.editor.action.Exec(this.type=="ul"?"insertUnorderedList":"insertOrderedList",{items:e})};window.BXHtmlEditor.Controls={SearchButton:s,ChangeView:a,Undo:o,Redo:n,StyleSelector:h,FontSelector:r,FontSize:d,Bold:p,Italic:c,Underline:u,Strikeout:m,Color:i,RemoveFormat:f,TemplateSelector:C,OrderedList:b,UnorderedList:g,IndentButton:B,OutdentButton:X,AlignList:v,InsertLink:x,InsertImage:y,InsertVideo:S,InsertAnchor:w,InsertTable:N,InsertChar:I,Settings:P,Fullscreen:V,PrintBreak:E,PageBreak:T,InsertHr:k,Spellcheck:A,Code:R,Quote:D,Smile:H,Sub:L,Sup:O,More:F,BbCode:l};window.BXHtmlEditor.dialogs.Image=_;window.BXHtmlEditor.dialogs.Link=z;window.BXHtmlEditor.dialogs.Video=W;window.BXHtmlEditor.dialogs.Source=M;window.BXHtmlEditor.dialogs.Anchor=G;window.BXHtmlEditor.dialogs.Table=U;window.BXHtmlEditor.dialogs.Settings=j;window.BXHtmlEditor.dialogs.Default=q;window.BXHtmlEditor.dialogs.Specialchar=Y;window.BXHtmlEditor.dialogs.InsertList=K}if(window.BXHtmlEditor&&window.BXHtmlEditor.Button&&window.BXHtmlEditor.Dialog)t();else BX.addCustomEvent(window,"OnEditorBaseControlsDefined",t)})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:65:"/bitrix/js/fileman/html_editor/html-components.js?159569187812580";s:6:"source";s:49:"/bitrix/js/fileman/html_editor/html-components.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/**
 * Bitrix HTML Editor 3.0
 * Date: 24.04.13
 * Time: 4:23
 *
 * Components class
 */
(function()
{
	function BXEditorComponents(editor)
	{
		this.editor = editor;
		this.phpParser = this.editor.phpParser;
		this.listLoaded = false;
		this.components = this.editor.config.components;
		this.compNameIndex = {};
		this.componentIncludeMethod = '$APPLICATION->IncludeComponent';

		this.requestUrl = '/bitrix/admin/fileman_component_params.php';
		this.HandleList();

		this.Init();
	}

	BXEditorComponents.prototype = {
		Init: function()
		{
			BX.addCustomEvent(this.editor, "OnSurrogateDblClick", BX.proxy(this.OnComponentDoubleClick, this));
		},

		GetList: function()
		{
			return this.components;
		},

		HandleList: function()
		{
			if (this.components && this.components.items)
			{
				for(var i = 0; i < this.components.items.length; i++)
					this.compNameIndex[this.components.items[i].name] = i;
			}
		},

		IsComponent: function(code)
		{
			code = this.phpParser.TrimPhpBrackets(code);
			code = this.phpParser.CleanCode(code);

			var oFunction = this.phpParser.ParseFunction(code);
			if (oFunction && oFunction.name.toUpperCase() == this.componentIncludeMethod.toUpperCase())
			{
				var componentParams = this.phpParser.ParseParameters(oFunction.params);
				return {
					name: componentParams[0],
					template: componentParams[1] || "",
					params: componentParams[2] || {},
					parentComponent: (componentParams[3] && componentParams[3] != '={false}') ? componentParams[3] : false,
					exParams: componentParams[4] || false
				};
			}
			return false;
		},

		IsReady: function()
		{
			return this.listLoaded;
		},

		GetSource: function(params, bxid)
		{
			if (!this.arVA)
			{
				this.arVA = {};
			}

			var
				res = "<?" + this.componentIncludeMethod + "(\n" +
					"\t\"" + params.name + "\",\n" +
					"\t\"" + (params.template || "") + "\",\n";

			if (params.params && !this.editor.util.IsEmptyObject(params.params))
			{
				res += "\tArray(\n";

				var
					propValues = params.params,
					keysSorted = Object.keys(propValues).sort(),
					i, k, arVal, arLen, j,
					_len1 = "SEF_URL_TEMPLATES_".length,
					_len2 = "VARIABLE_ALIASES_".length,
					SUT, VA, lio, templ_key,
					params_exist = false;

				for (k = 0; k < keysSorted.length; k++)
				{
					i = keysSorted[k];
					if (!propValues.hasOwnProperty(i))
						continue;

					//try{
						if (!params_exist)
							params_exist = true;

						if (typeof(propValues[i]) == 'string')
						{
							propValues[i] = this.editor.util.stripslashes(propValues[i]);
						}
						else if (typeof(propValues[i]) == 'object')
						{
							arVal = 'array(';
							arLen = 0;
							for (j in propValues[i])
							{
								if (propValues[i].hasOwnProperty(j) && typeof(propValues[i][j]) == 'string')
								{
									arLen++;
									arVal += '"' + this.editor.util.stripslashes(propValues[i][j]) + '",';
								}
							}
							if (arLen > 0)
								arVal = arVal.substr(0, arVal.length - 1) + ')';
							else
								arVal += ')';

							propValues[i] = arVal;
						}
						else
						{
							continue;
						}

						if (propValues["SEF_MODE"] && propValues["SEF_MODE"].toUpperCase() == "Y")
						{
							//*** Handling SEF_URL_TEMPLATES in SEF = ON***
							if(i.substr(0, _len1) == "SEF_URL_TEMPLATES_")
							{
								templ_key = i.substr(_len1);
								this.arVA[templ_key] = this.CatchVariableAliases(propValues[i]);

								if (!SUT)
								{
									res += "\t\t\"" + i.substr(0, _len1 - 1) + "\" => Array(\n"
									SUT = true;
								}
								res += "\t\t\t\"" + i.substr(_len1) + "\" => ";
								if (this.IsPHPBracket(propValues[i]))
									res += this.TrimPHPBracket(propValues[i]);
								else
									res += "\"" + this.editor.util.addslashes(propValues[i])+"\"";

								res += ",\n";
								continue;
							}
							else if (SUT)
							{
								lio = res.lastIndexOf(",");
								res = res.substr(0,lio)+res.substr(lio+1);
								SUT = false;
								res += "\t\t),\n";
							}

							//*** Handling  VARIABLE_ALIASES  in SEF = ON***
							if(i.substr(0, _len2) == "VARIABLE_ALIASES_")
								continue;
						}
						else if(propValues["SEF_MODE"] == "N")
						{
							//*** Handling SEF_URL_TEMPLATES in SEF = OFF ***
							if (i.substr(0, _len1)=="SEF_URL_TEMPLATES_" || i == "SEF_FOLDER")
								continue;

							//*** Handling VARIABLE_ALIASES  in SEF = OFF ***
							if(i.substr(0, _len2) == "VARIABLE_ALIASES_")
							{
								if (!VA)
								{
									res += "\t\t\"" + i.substr(0, _len2 - 1) + "\" => Array(\n";
									VA = true;
								}
								res += "\t\t\t\"" + i.substr(_len2) + "\" => \"" + this.editor.util.addslashes(propValues[i]) + "\",\n";
								continue;
							}
							else if (VA)
							{
								lio = res.lastIndexOf(",");
								res = res.substr(0, lio) + res.substr(lio + 1);
								VA = false;
								res += "\t\t),\n";
							}
						}

						res += "\t\t\"" + i + "\" => ";
						if (this.IsPHPBracket(propValues[i]))
							res += this.TrimPHPBracket(propValues[i]);
						else if (propValues[i].substr(0, 6).toLowerCase() == 'array(')
							res += propValues[i];
						else
							res += '"' + this.editor.util.addslashes(propValues[i]) + '"';
						res += ",\n";

					//}catch(e){continue;}
				}

				if (VA || SUT)
				{
					lio = res.lastIndexOf(",");
					res = res.substr(0, lio) + res.substr(lio + 1);
					res += "\t\t),\n";
				}

				if (params_exist)
				{
					lio = res.lastIndexOf(",");
					res = res.substr(0, lio) + res.substr(lio + 1);
				}
				res += "\t)";
			}
			else
			{
				res += "Array()";

				if (this.lastDroppedName == params.name && bxid)
				{
					var bxTag = this.editor.GetBxTag(bxid);
					if (bxTag && bxTag.surrogateId)
					{
						this.ShowPropertiesDialog(bxTag.params, this.editor.GetBxTag(bxTag.surrogateId));
					}
				}
			}

			if (params.parentComponent !== false || params.exParams !== false)
			{
				var pc = params.parentComponent;
				if (!pc || pc.toLowerCase() == '={false}')
				{
					res += ",\nfalse";
				}
				else
				{
					if (this.IsPHPBracket(pc))
						res += ",\n" + this.TrimPHPBracket(pc);
					else
						res += ",\n'" + pc + "'";
				}

				if (params.exParams !== false && typeof params.exParams == 'object')
				{
					res += ",\nArray(";
					for (i in params.exParams)
					{
						if (params.exParams.hasOwnProperty(i) && typeof(params.exParams[i]) == 'string')
						{
							res += "\n\t'" + i + "' => '" + this.editor.util.stripslashes(params.exParams[i]) + "',";
						}
					}
					if (res.substr(res.length - 1) == ',')
						res = res.substr(0, res.length - 1) + "\n";
					res += ")";
				}
			}
			res += "\n);?>";

			return res;
		},

		GetOnDropHtml: function(params)
		{
			var _params = {
				name: params.name
			};
			this.lastDroppedName = params.name;
			return this.GetSource(_params);
		},

		CatchVariableAliases: function(str)
		{
			var
				arRes = [], i, matchRes,
				res = str.match(/(\?|&)(.+?)=#([^#]+?)#/ig);

			if (!res)
				return arRes;

			for (i = 0; i < res.length; i++)
			{
				matchRes = res[i].match(/(\?|&)(.+?)=#([^#]+?)#/i);
				arRes[matchRes[3]] = matchRes[2];
			}
			return arRes;
		},

		LoadParamsList: function(params)
		{
			oBXComponentParamsManager.LoadComponentParams(
				{
					name: params.name,
					parent: false,
					template: '',
					exParams: false,
					currentValues: {}
				}
			);
		},

		GetComponentData: function(name)
		{
			var item = this.components.items[this.compNameIndex[name]];
			return item || {};
		},

		IsPHPBracket: function(str)
		{
			return str.substr(0, 2) =='={';
		},

		TrimPHPBracket: function(str)
		{
			return str.substr(2, str.length - 3);
		},

		OnComponentDoubleClick: function(bxTag, origTag, target, e)
		{
			if (origTag && origTag.tag == 'component')
			{
				// Show dialog
				this.ShowPropertiesDialog(origTag.params, bxTag);
			}
		},

		ShowPropertiesDialog: function(component, bxTag)
		{
			// Used to prevent influence of oBXComponentParamsManager to this array...
			var comp = BX.clone(component, 1);
			if (!this.oPropertiesDialog)
			{
				//PropertiesDialog
				this.oPropertiesDialog = this.editor.GetDialog('componentProperties', {oBXComponentParamsManager: oBXComponentParamsManager});

				BX.addCustomEvent(this.oPropertiesDialog, "OnDialogSave", BX.proxy(this.SavePropertiesDialog, this));
				BX.addCustomEvent(this.oPropertiesDialog.oDialog, "onWindowUnRegister",BX.proxy(this.OnDialogClose, this));
			}

			this.currentViewedComponentTag = bxTag;
			this.oPropertiesDialog.SetTitle(BX.message('ComponentPropsTitle').replace('#COMPONENT_NAME#', comp.name));

			this.oPropertiesDialog.SetContent('<span class="bxcompprop-wait-notice">' + BX.message('ComponentPropsWait') + '</span>');
			this.oPropertiesDialog.Show();
			if (this.oPropertiesDialog.oDialog.PARTS.CONTENT_DATA)
			{
				BX.addClass(this.oPropertiesDialog.oDialog.PARTS.CONTENT_DATA, 'bxcompprop-outer-wrap');
			}

			var _this = this;
			var pParamsContainer = BX.create("DIV");

			BX.onCustomEvent(oBXComponentParamsManager, 'OnComponentParamsDisplay',
			[{
				name: comp.name,
				parent: !!comp.parentComponent,
				template: comp.template,
				exParams: comp.exParams,
				currentValues: comp.params,
				container: pParamsContainer,
				siteTemplate: this.editor.GetTemplateId(),
				relPath: this.editor.config.relPath,
				callback: function(params, container){
					_this.PropertiesDialogCallback(params, container);
				}
			}]);
		},

		PropertiesDialogCallback: function(params, container)
		{
			if (this.oPropertiesDialog.oDialog.PARTS.CONTENT_DATA)
				BX.addClass(this.oPropertiesDialog.oDialog.PARTS.CONTENT_DATA, 'bxcompprop-outer-wrap');
			this.oPropertiesDialog.SetContent(container);

			var size = this.oPropertiesDialog.GetContentSize();
			BX.onCustomEvent(oBXComponentParamsManager, 'OnComponentParamsResize', [
				size.width,
				size.height
			]);
		},

		SavePropertiesDialog: function()
		{
			var
				ddBxTag = this.currentViewedComponentTag,
				compBxTag = this.editor.GetBxTag(ddBxTag.params.origId),
				currentValues = oBXComponentParamsManager.GetParamsValues(),
				template = oBXComponentParamsManager.GetTemplateValue();

			ddBxTag.params.origParams.params = compBxTag.params.params = currentValues;
			ddBxTag.params.origParams.template = compBxTag.params.template = template;

			this.editor.synchro.FullSyncFromIframe();
			this.lastDroppedName = '';
		},

		OnDialogClose: function()
		{
			if (this.editor.util.IsEmptyObject(this.currentViewedComponentTag.params.origParams.params) && this.lastDroppedName)
			{
				this.SavePropertiesDialog();
			}
		},

		ReloadList: function()
		{
			var _this = this;
			this.editor.Request({
				getData: this.editor.GetReqData('load_components_list',
					{
						site_template: this.editor.GetTemplateId(),
						componentFilter: this.editor.GetComponentFilter(),
						site: this.editor.GetSiteId()
					}
				),
				handler: function(res)
				{
					_this.components = _this.editor.config.components = res;
					_this.HandleList();
					_this.editor.componentsTaskbar.BuildTree(_this.components.groups, _this.components.items);
				}
			});
		},

		SetComponentIcludeMethod: function(method)
		{
			this.componentIncludeMethod = method;
		}
	};

	function __runcomp()
	{
		window.BXHtmlEditor.BXEditorComponents = BXEditorComponents;

		function PropertiesDialog(editor, params)
		{
			params = params || {};
			params.id = 'bx_component_properties';
			params.height = 600;
			params.width =  800;
			params.resizable = true;
			this.oBXComponentParamsManager = params.oBXComponentParamsManager;

			this.id = 'components_properties';

			// Call parrent constructor
			PropertiesDialog.superclass.constructor.apply(this, [editor, params]);

			BX.addClass(this.oDialog.DIV, "bxcompprop-dialog");
			BX.addCustomEvent(this, "OnDialogSave", BX.proxy(this.Save, this));
		}
		BX.extend(PropertiesDialog, window.BXHtmlEditor.Dialog);

		PropertiesDialog.prototype.OnResize = function()
		{
			var
				w = this.oDialog.PARTS.CONTENT_DATA.offsetWidth,
				h = this.oDialog.PARTS.CONTENT_DATA.offsetHeight;

			BX.onCustomEvent(this.oBXComponentParamsManager, 'OnComponentParamsResize', [w, h]);
		};

		PropertiesDialog.prototype.OnResizeFinished = function()
		{
		};

		window.BXHtmlEditor.dialogs.componentProperties = PropertiesDialog;
	}

	if (window.BXHtmlEditor && window.BXHtmlEditor.dialogs)
		__runcomp();
	else
		BX.addCustomEvent(window, "OnEditorBaseControlsDefined", __runcomp);

})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:67:"/bitrix/js/fileman/html_editor/html-snippets.min.js?159569187816791";s:6:"source";s:47:"/bitrix/js/fileman/html_editor/html-snippets.js";s:3:"min";s:51:"/bitrix/js/fileman/html_editor/html-snippets.min.js";s:3:"map";s:51:"/bitrix/js/fileman/html_editor/html-snippets.map.js";}"*/
(function(){function t(){function t(t){this.editor=t;this.listLoaded=false;this.snippets=this.editor.config.snippets;this.HandleList();this.Init()}t.prototype={Init:function(){BX.addCustomEvent(this.editor,"OnApplySiteTemplate",BX.proxy(this.OnTemplateChanged,this))},SetSnippets:function(t){this.snippets=this.editor.config.snippets=this.editor.snippetsTaskbar.snippets=t;this.HandleList()},GetList:function(){return this.snippets[this.editor.GetTemplateId()]},HandleList:function(){var t,e=this.GetList().items;if(e){for(t in e){if(e.hasOwnProperty(t)){e[t].key=e[t].path.replace("/",",")}}}},ReloadList:function(t){this.editor.snippetsTaskbar.ClearSearchResult();var e=this;this.editor.Request({getData:this.editor.GetReqData("load_snippets_list",{site_template:this.editor.GetTemplateId(),clear_cache:t?"Y":"N"}),handler:function(t){if(t.result){e.SetSnippets(t.snippets);e.RebuildAll()}}})},FetchPlainListOfCategories:function(t,e,i){var s,a=t.length;for(s=0;s<a;s++){i.push({level:e,key:t[s].key,section:t[s].section});if(t[s].children&&t[s].children.length>0){this.FetchPlainListOfCategories(t[s].children,e+1,i)}}},AddNewCategory:function(t){var e=this;this.editor.Request({getData:this.editor.GetReqData("snippet_add_category",{site_template:this.editor.GetTemplateId(),category_name:t.name,category_parent:t.parent}),handler:function(t){if(t.result){e.SetSnippets(t.snippets);e.RebuildAll()}}})},RemoveCategory:function(t){var e=this;this.editor.Request({getData:this.editor.GetReqData("snippet_remove_category",{site_template:this.editor.GetTemplateId(),category_path:t.path}),handler:function(t){if(t.result){e.SetSnippets(t.snippets);e.RebuildAll()}}})},RenameCategory:function(t){var e=this;this.editor.Request({getData:this.editor.GetReqData("snippet_rename_category",{site_template:this.editor.GetTemplateId(),category_path:t.path,category_new_name:t.newName}),handler:function(t){if(t.result){e.SetSnippets(t.snippets);e.RebuildAll()}}})},SaveSnippet:function(t){var e=this;this.editor.Request({postData:this.editor.GetReqData("edit_snippet",{site_template:this.editor.GetTemplateId(),path:t.path.replace(",","/"),name:t.name,code:t.code,description:t.description,current_path:t.currentPath}),handler:function(t){if(t.result){e.SetSnippets(t.snippets);e.RebuildAll()}}})},RemoveSnippet:function(t){var e=this;this.editor.Request({getData:this.editor.GetReqData("remove_snippet",{site_template:this.editor.GetTemplateId(),path:t.path.replace(",","/")}),handler:function(t){if(t.result){e.SetSnippets(t.snippets);e.RebuildAll()}}})},RebuildAll:function(){var t=this.editor.GetDialog("snippetsCategories");if(t&&t.IsOpen()){t.DisplayAddForm(false);t.BuildTree(this.GetList().groups)}if(this.snippets[this.editor.GetTemplateId()]&&this.editor.snippetsTaskbar){this.editor.snippetsTaskbar.BuildTree(this.snippets[this.editor.GetTemplateId()].groups,this.snippets[this.editor.GetTemplateId()].items)}var e=this.editor.GetDialog("editSnippet");if(e&&e.IsOpen()){e.SetCategories()}},OnTemplateChanged:function(){this.ReloadList(false)}};function e(t){e.superclass.constructor.apply(this,arguments);this.id="snippets";this.snippets=this.editor.config.snippets;this.templateId=this.editor.templateId;this.title=BX.message("BXEdSnippetsTitle");this.searchPlaceholder=BX.message("BXEdSnipSearchPlaceHolder");this.uniqueId="taskbar_"+this.editor.id+"_"+this.id;this.Init()}BX.extend(e,window.BXHtmlEditor.Taskbar);e.prototype.Init=function(){this.BuildSceleton();if(this.snippets[this.templateId]){this.BuildTree(this.snippets[this.templateId].groups,this.snippets[this.templateId].items)}var t=this;t.editor.phpParser.AddBxNode("snippet_icon",{Parse:function(t){return t.code||""}})};e.prototype.GetMenuItems=function(){var t=this;return[{text:BX.message("BXEdAddSnippet"),title:BX.message("BXEdAddSnippet"),className:"",onclick:function(){t.editor.GetDialog("editSnippet").Show();BX.PopupMenu.destroy(t.uniqueId+"_menu")}},{text:BX.message("RefreshTaskbar"),title:BX.message("RefreshTaskbar"),className:"",onclick:function(){t.editor.snippets.ReloadList(true);BX.PopupMenu.destroy(t.uniqueId+"_menu")}},{text:BX.message("BXEdManageCategories"),title:BX.message("BXEdManageCategories"),className:"",onclick:function(){t.editor.GetDialog("snippetsCategories").Show();BX.PopupMenu.destroy(t.uniqueId+"_menu")}}]};e.prototype.HandleElementEx=function(t,e,i){this.editor.SetBxTag(e,{tag:"snippet_icon",params:i});t.title=i.description||i.title;var s=t.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-right-side-item-edit-btn",title:BX.message("BXEdSnipEdit")}}));this.editor.SetBxTag(s,{tag:"_snippet",params:i});BX.bind(s,"mousedown",BX.proxy(this.EditSnippet,this))};e.prototype.EditSnippet=function(t){var e=t.target||t.srcElement;function i(){BX.removeClass(e,"bxhtmled-right-side-item-edit-btn-active");BX.unbind(document,"mouseup",i)}BX.addClass(e,"bxhtmled-right-side-item-edit-btn-active");BX.bind(document,"mouseup",i);this.editor.GetDialog("editSnippet").Show(e);return BX.PreventDefault(t)};e.prototype.BuildTree=function(t,i){e.superclass.BuildTree.apply(this,arguments);if((!t||t.length==0)&&(!i||i.length==0)){this.pTreeCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-no-snip"},text:BX.message("BXEdSnipNoSnippets")}))}};function i(t,e){e=e||{};e.id="bx_edit_snippet";e.width=600;this.zIndex=3007;this.id="edit_snippet";i.superclass.constructor.apply(this,[t,e]);this.SetContent(this.Build());BX.addClass(this.oDialog.DIV,"bx-edit-snip-dialog");BX.addCustomEvent(this,"OnDialogSave",BX.proxy(this.Save,this))}BX.extend(i,window.BXHtmlEditor.Dialog);i.prototype.Save=function(){this.editor.snippets.SaveSnippet({path:this.pCatSelect.value,name:this.pName.value,code:this.pCode.value,description:this.pDesc.value,currentPath:this.currentPath})};i.prototype.Build=function(){this.pCont=BX.create("DIV",{props:{className:"bxhtmled-edit-snip-cnt"}});function t(t,e,i){var s,a,n;s=t.insertRow(-1);if(i){s.className="bxhtmled-add-row"}a=s.insertCell(-1);a.className="bxhtmled-left-c";if(e&&e.label){a.appendChild(BX.create("LABEL",{props:{className:e.required?"bxhtmled-req":""},text:e.label})).setAttribute("for",e.id)}n=s.insertCell(-1);n.className="bxhtmled-right-c";return{row:s,leftCell:a,rightCell:n}}this.arTabs=[{id:"base",name:BX.message("BXEdSnipBaseSettings")},{id:"additional",name:BX.message("BXEdSnipAddSettings")}];var e=this.BuildTabControl(this.pCont,this.arTabs);this.arTabs=e.tabs;var i=this,s,a,n=BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl"}}),p=BX.create("TABLE",{props:{className:"bxhtmled-dialog-tbl"}});s=t(n,{label:BX.message("BXEdSnipName")+":",id:this.id+"-name",required:true});this.pName=s.rightCell.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-name",placeholder:BX.message("BXEdSnipNamePlaceHolder")}}));s=t(n,{label:BX.message("BXEdSnipCode")+":",id:this.id+"-code",required:true});this.pCode=s.rightCell.appendChild(BX.create("TEXTAREA",{props:{id:this.id+"-code",placeholder:BX.message("BXEdSnipCodePlaceHolder")},style:{height:"250px"}}));this.arTabs[0].cont.appendChild(n);s=t(p,{label:BX.message("BXEdSnipCategory")+":",id:this.id+"-category"});this.pCatSelect=s.rightCell.appendChild(BX.create("SELECT",{props:{id:this.id+"-category"},style:{maxWidth:"280px"}}));this.pCatManageBut=s.rightCell.appendChild(BX.create("INPUT",{props:{className:"bxhtmled-manage-cat",type:"button",value:"...",title:BX.message("BXEdManageCategories")}}));this.pCatManageBut.onclick=function(){i.editor.GetDialog("snippetsCategories").Show()};s=t(p,{label:BX.message("BXEdSnipDescription")+":",id:this.id+"-hint"});this.pDesc=s.rightCell.appendChild(BX.create("TEXTAREA",{props:{id:this.id+"-hint",placeholder:BX.message("BXEdSnipDescriptionPlaceholder")}}));this.arTabs[1].cont.appendChild(p);s=BX.adjust(p.insertRow(-1),{style:{display:"none"}});a=BX.adjust(s.insertCell(-1),{props:{className:"bxhtmled--centr-c"},attrs:{colsPan:2}});a.appendChild(BX.create("INPUT",{props:{className:"",type:"button",value:BX.message("BXEdSnipRemove")},events:{click:function(){if(confirm(BX.message("BXEdSnipRemoveConfirm"))){i.editor.snippets.RemoveSnippet({path:i.currentPath});i.Close()}}}}));this.delSnipRow=s;return this.pCont};i.prototype.Show=function(t){this.SetTitle(BX.message("BXEdEditSnippetDialogTitle"));this.SetCategories();var e={},s=this.editor.GetBxTag(t),a=!s||!s.tag;if(!a){e=s.params;this.currentPath=(e.path==""?"":e.path.replace(",","/")+"/")+e.name;this.delSnipRow.style.display=""}else{this.currentPath="";this.delSnipRow.style.display="none"}this.pName.value=e.title||"";this.pCode.value=e.code||"";this.pDesc.value=e.description||"";this.pCatSelect.value=e.key||"";i.superclass.Show.apply(this,arguments)};i.prototype.SetCategories=function(){this.pCatSelect.options.length=0;this.pCatSelect.options.add(new Option(BX.message("BXEdSnippetsTitle"),"",true,true));var t,e=" . ",i,s,a=[],n=this.editor.snippetsTaskbar.GetSectionsTreeInfo();this.editor.snippets.FetchPlainListOfCategories(n,1,a);for(s=0;s<a.length;s++){t="";for(i=0;i<a[s].level;i++){t+=e}t+=a[s].section.name;this.pCatSelect.options.add(new Option(t,a[s].key,false,false))}};function s(t,e){e=e||{};e.id="bx_snippets_cats";e.width=400;e.zIndex=3010;this.id="snippet_categories";s.superclass.constructor.apply(this,[t,e]);this.SetContent(this.Build());this.oDialog.ClearButtons();this.oDialog.SetButtons([this.oDialog.btnClose]);BX.addClass(this.oDialog.DIV,"bx-edit-snip-cat-dialog")}BX.extend(s,window.BXHtmlEditor.Dialog);s.prototype.Save=function(){};s.prototype.Build=function(){this.pCont=BX.create("DIV",{props:{className:"bxhtmled-snip-cat-cnt"}});this.pAddCatWrap=this.pCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-snip-cat-add-wrap"}}));this.pAddCatBut=this.pAddCatWrap.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-snip-cat-add-but"},text:BX.message("BXEdSnipCatAdd")}));BX.bind(this.pAddCatBut,"click",BX.proxy(this.DisplayAddForm,this));var t=this.pAddCatWrap.appendChild(BX.create("TABLE",{props:{className:"bxhtmled-snip-cat-add-tbl"}}));var e,i;e=t.insertRow(-1);i=e.insertCell(-1);i.className="bxhtmled-left-c";i.appendChild(BX.create("LABEL",{props:{className:"bxhtmled-req"},attrs:{for:this.id+"-cat-name"},text:BX.message("BXEdSnipCatAddName")+":"}));i=e.insertCell(-1);i.className="bxhtmled-right-c";this.pCatName=i.appendChild(BX.create("INPUT",{props:{type:"text",id:this.id+"-cat-name"}}));e=t.insertRow(-1);i=e.insertCell(-1);i.className="bxhtmled-left-c";i.appendChild(BX.create("LABEL",{props:{className:"bxhtmled-req"},attrs:{for:this.id+"-cat-par"},text:BX.message("BXEdSnipParCategory")+":"}));i=e.insertCell(-1);i.className="bxhtmled-right-c";this.pCatPar=i.appendChild(BX.create("SELECT",{props:{id:this.id+"-cat-par"}}));e=t.insertRow(-1);i=e.insertCell(-1);i.colSpan=2;i.style.textAlign="center";this.pSaveCat=i.appendChild(BX.create("INPUT",{props:{type:"button",className:"adm-btn-save bxhtmled-snip-save-but",value:BX.message("BXEdSnipCatAddBut")}}));BX.bind(this.pSaveCat,"click",BX.proxy(this.AddNewCategory,this));this.pCatListWrap=this.pCont.appendChild(BX.create("DIV",{props:{className:"bxhtmled-snip-cat-list-wrap"}}));return this.pCont};s.prototype.AddNewCategory=function(){this.editor.snippets.AddNewCategory({name:this.pCatName.value,parent:this.pCatPar.value,siteTemplate:""})};s.prototype.DisplayAddForm=function(t){if(this.animation)this.animation.stop();if(t!==true&&t!==false)t=!this.bAddCatOpened;t=t!==false;if(this.bAddCatOpened!==t){if(t){this.DisableKeyCheck();BX.bind(this.pCatName,"keydown",BX.proxy(this.AddCatKeydown,this));this.SetParentCategories();this.animationStartHeight=25;this.animationEndHeight=160;BX.focus(this.pCatName)}else{this.EnableKeyCheck();BX.unbind(this.pCatName,"keydown",BX.proxy(this.AddCatKeydown,this));this.animationStartHeight=160;this.animationEndHeight=25}var e=this;this.animation=new BX.easing({duration:300,start:{height:this.animationStartHeight},finish:{height:this.animationEndHeight},transition:BX.easing.makeEaseOut(BX.easing.transitions.quart),step:function(t){e.pAddCatWrap.style.height=t.height+"px"},complete:BX.proxy(function(){this.animation=null},this)});this.animation.animate();this.bAddCatOpened=t}this.ResetAddCategoryForm()};s.prototype.SetParentCategories=function(){this.pCatPar.options.length=0;this.pCatPar.options.add(new Option(BX.message("BXEdSnippetsTitle"),"",true,true));var t,e=" . ",i,s,a=[],n=this.editor.snippetsTaskbar.GetSectionsTreeInfo();this.editor.snippets.FetchPlainListOfCategories(n,1,a);for(s=0;s<a.length;s++){if(a[s].level<2){t="";for(i=0;i<a[s].level;i++){t+=e}t+=a[s].section.name;this.pCatPar.options.add(new Option(t,a[s].key,false,false))}}};s.prototype.Show=function(){this.SetTitle(BX.message("BXEdManageCategoriesTitle"));this.BuildTree(this.editor.snippets.GetList().groups);this.bAddCatOpened=false;this.pAddCatWrap.style.height="";s.superclass.Show.apply(this,arguments)};s.prototype.BuildTree=function(t){BX.cleanNode(this.pCatListWrap);this.catIndex={};for(var e=0;e<t.length;e++){this.BuildCategory(t[e])}};s.prototype.BuildCategory=function(t){var e=this,i=this.GetCategoryContByPath(t.path),s=BX.create("DIV",{props:{className:"bxhtmled-tskbr-sect-outer"}}),a=s.appendChild(BX.create("DIV",{props:{className:"bxhtmled-tskbr-sect"}})),n=a.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-tskbr-sect-icon bxhtmled-tskbr-sect-icon-open"}})),p=a.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-tskbr-sect-title"},text:t.title||t.name})),o=a.appendChild(BX.create("INPUT",{props:{type:"text",className:"bxhtmled-tskbr-name-input"}})),d=s.appendChild(BX.create("DIV",{props:{className:"bxhtmled-tskb-child"},style:{display:"block"}})),r=a.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-right-side-item-edit-btn",title:BX.message("BXEdSnipCatEdit")}})),l=a.appendChild(BX.create("SPAN",{props:{className:"bxhtmled-right-side-item-del-btn",title:BX.message("BXEdSnipCatDelete")}}));BX.bind(l,"mousedown",BX.proxy(this.DisableDD(),this));BX.bind(r,"mousedown",BX.proxy(this.DisableDD(),this));BX.bind(o,"mousedown",BX.proxy(this.DisableDD(),this));BX.bind(l,"click",function(){if(confirm(BX.message("BXEdDropCatConfirm"))){var i=t.path==""?t.name:t.path+"/"+t.name;e.editor.snippets.RemoveCategory({path:i})}});BX.bind(r,"click",function(){e.ShowRename(true,t,o,a)});d.style.display="block";var h=t.path==""?t.name:t.path+","+t.name;var c=t.path==""?0:1;var m={key:h,children:[],section:t};this.catIndex[h]={icon:n,outerCont:s,cont:a,childCont:d,sect:m};if(c>0){BX.addClass(a,"bxhtmled-tskbr-sect-"+c);BX.addClass(n,"bxhtmled-tskbr-sect-icon-"+c)}i.appendChild(s)};s.prototype.ShowRename=function(t,e,i,s){t=t!==false;if(t){BX.addClass(s,"bxhtmled-tskbr-sect-rename");this.currentRenamedCat={section:e,renameInput:i,pGroupTitle:s};i.value=e.name;this.DisableKeyCheck();BX.bind(i,"keydown",BX.proxy(this.RenameKeydown,this));BX.focus(i);i.select()}else{BX.removeClass(s,"bxhtmled-tskbr-sect-rename");BX.unbind(i,"keydown",BX.proxy(this.RenameKeydown,this));this.EnableKeyCheck();this.currentRenamedCat=false}};s.prototype.RenameKeydown=function(t){if(t&&this.currentRenamedCat){if(t.keyCode==this.editor.KEY_CODES["escape"]){this.ShowRename(false,this.currentRenamedCat.section,this.currentRenamedCat.renameInput,this.currentRenamedCat.pGroupTitle);BX.PreventDefault(t)}else if(t.keyCode==this.editor.KEY_CODES["enter"]){var e=BX.util.trim(this.currentRenamedCat.renameInput.value),i=this.currentRenamedCat.section,s=i.path==""?i.name:i.path+"/"+i.name;if(e!==""){this.editor.snippets.RenameCategory({path:s,newName:e})}this.ShowRename(false,this.currentRenamedCat.section,this.currentRenamedCat.renameInput,this.currentRenamedCat.pGroupTitle);BX.PreventDefault(t)}}};s.prototype.AddCatKeydown=function(t){if(t&&this.bAddCatOpened){if(t.keyCode==this.editor.KEY_CODES["escape"]){this.DisplayAddForm(false);BX.PreventDefault(t)}else if(t.keyCode==this.editor.KEY_CODES["enter"]){this.AddNewCategory();BX.PreventDefault(t)}}};s.prototype.DisableDD=function(){jsDD.Disable();BX.bind(document,"mouseup",BX.proxy(this.EnableDD,this))};s.prototype.EnableDD=function(){jsDD.Enable();BX.unbind(document,"mouseup",BX.proxy(this.EnableDD,this))};s.prototype.OnDragFinish=function(){};s.prototype.GetCategoryContByPath=function(t){if(t==""||!this.catIndex[t]){return this.pCatListWrap}else{return this.catIndex[t].childCont}};s.prototype.ResetAddCategoryForm=function(t){this.pCatName.value="";this.pCatPar.value=""};window.BXHtmlEditor.SnippetsControl=e;window.BXHtmlEditor.BXEditorSnippets=t;window.BXHtmlEditor.dialogs.editSnippet=i;window.BXHtmlEditor.dialogs.snippetsCategories=s}if(window.BXHtmlEditor&&window.BXHtmlEditor.dialogs)t();else BX.addCustomEvent(window,"OnEditorBaseControlsDefined",t)})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:65:"/bitrix/js/fileman/html_editor/html-editor.min.js?159569187875015";s:6:"source";s:45:"/bitrix/js/fileman/html_editor/html-editor.js";s:3:"min";s:49:"/bitrix/js/fileman/html_editor/html-editor.min.js";s:3:"map";s:49:"/bitrix/js/fileman/html_editor/html-editor.map.js";}"*/
(function(t){var e;function i(t){this.InitUtil();this.dom={};this.bxTags={};this.EMPTY_IMAGE_SRC="/bitrix/images/1.gif";this.HTML5_TAGS=["abbr","article","aside","audio","bdi","canvas","command","datalist","details","figcaption","figure","footer","header","hgroup","keygen","mark","meter","nav","output","progress","rp","rt","ruby","svg","section","source","summary","time","track","video","wbr"];this.BLOCK_TAGS=["H1","H2","H3","H4","H5","H6","P","BLOCKQUOTE","DIV","SECTION","PRE"];this.NESTED_BLOCK_TAGS=["BLOCKQUOTE","DIV"];this.TABLE_TAGS=["TD","TR","TH","TABLE","TBODY","CAPTION","COL","COLGROUP","TFOOT","THEAD"];this.BBCODE_TAGS=["P","U","TABLE","TR","TD","TH","IMG","A","CENTER","LEFT","RIGHT","JUSTIFY"];this.HTML_ENTITIES=["&iexcl;","&cent;","&pound;","&curren;","&yen;","&brvbar;","&sect;","&uml;","&copy;","&ordf;","&laquo;","&not;","&reg;","&macr;","&deg;","&plusmn;","&sup2;","&sup3;","&acute;","&micro;","&para;","&middot;","&cedil;","&sup1;","&ordm;","&raquo;","&frac14;","&frac12;","&frac34;","&iquest;","&Agrave;","&Aacute;","&Acirc;","&Atilde;","&Auml;","&Aring;","&AElig;","&Ccedil;","&Egrave;","&Eacute;","&Ecirc;","&Euml;","&Igrave;","&Iacute;","&Icirc;","&Iuml;","&ETH;","&Ntilde;","&Ograve;","&Oacute;","&Ocirc;","&Otilde;","&Ouml;","&times;","&Oslash;","&Ugrave;","&Uacute;","&Ucirc;","&Uuml;","&Yacute;","&THORN;","&szlig;","&agrave;","&aacute;","&acirc;","&atilde;","&auml;","&aring;","&aelig;","&ccedil;","&egrave;","&eacute;","&ecirc;","&euml;","&igrave;","&iacute;","&icirc;","&iuml;","&eth;","&ntilde;","&ograve;","&oacute;","&ocirc;","&otilde;","&ouml;","&divide;","&oslash;","&ugrave;","&uacute;","&ucirc;","&uuml;","&yacute;","&thorn;","&yuml;","&OElig;","&oelig;","&Scaron;","&scaron;","&Yuml;","&circ;","&tilde;","&ndash;","&mdash;","&lsquo;","&rsquo;","&sbquo;","&ldquo;","&rdquo;","&bdquo;","&dagger;","&Dagger;","&permil;","&lsaquo;","&rsaquo;","&euro;","&Alpha;","&Beta;","&Gamma;","&Delta;","&Epsilon;","&Zeta;","&Eta;","&Theta;","&Iota;","&Kappa;","&Lambda;","&Mu;","&Nu;","&Xi;","&Omicron;","&Pi;","&Rho;","&Sigma;","&Tau;","&Upsilon;","&Phi;","&Chi;","&Psi;","&Omega;","&alpha;","&beta;","&gamma;","&delta;","&epsilon;","&zeta;","&eta;","&theta;","&iota;","&kappa;","&lambda;","&mu;","&nu;","&xi;","&omicron;","&pi;","&rho;","&sigmaf;","&sigma;","&tau;","&upsilon;","&phi;","&chi;","&psi;","&omega;","&bull;","&hellip;","&prime;","&Prime;","&oline;","&frasl;","&trade;","&larr;","&uarr;","&rarr;","&darr;","&harr;","&part;","&sum;","&minus;","&radic;","&infin;","&int;","&asymp;","&ne;","&equiv;","&le;","&ge;","&loz;","&spades;","&clubs;","&hearts;"];if(!BX.browser.IsIE()){this.HTML_ENTITIES=this.HTML_ENTITIES.concat(["&thetasym;","&upsih;","&piv;","&weierp;","&image;","&real;","&alefsym;","&crarr;","&lArr;","&uArr;","&rArr;","&dArr;","&hArr;","&forall;","&exist;","&empty;","&nabla;","&isin;","&notin;","&ni;","&prod;","&lowast;","&prop;","&ang;","&and;","&or;","&cap;","&cup;","&there4;","&sim;","&cong;","&sub;","&sup;","&nsub;","&sube;","&supe;","&oplus;","&otimes;","&perp;","&sdot;","&lceil;","&rceil;","&lfloor;","&rfloor;","&lang;","&rang;","&diams;"])}this.SHORTCUTS={66:"bold",73:"italic",85:"underline"};this.KEY_CODES={backspace:8,enter:13,escape:27,space:32,delete:46,left:37,right:39,up:38,down:40,z:90,y:89,shift:16,ctrl:17,alt:18,cmd:91,cmdRight:93,pageUp:33,pageDown:34};this.INVISIBLE_SPACE="\ufeff";this.INVISIBLE_CURSOR="\u2060";this.NORMAL_WIDTH=1020;this.MIN_WIDTH=700;this.MIN_HEIGHT=100;this.MAX_HANDLED_FORMAT_LENGTH=5e4;this.MAX_HANDLED_FORMAT_TIME=500;this.iframeCssText="";this.InitConfig(this.CheckConfig(t));if(!t.lazyLoad){this.Init()}}i.prototype={Init:function(){if(this.inited)return;this.parser=new BXHtmlEditor.BXEditorParser(this);this.On("OnEditorInitedBefore",[this]);if(!this.BuildSceleton())return;this.HTMLStyler=r;this.dom.textarea=this.dom.textareaCont.appendChild(BX.create("TEXTAREA",{props:{className:"bxhtmled-textarea"}}));this.dom.pValueInput=BX("bxed_"+this.id);if(!this.dom.pValueInput){this.dom.pValueInput=this.dom.cont.appendChild(BX.create("INPUT",{props:{type:"hidden",id:"bxed_"+this.id,name:this.config.inputName}}))}this.dom.pValueInput.value=this.config.content;this.dom.form=this.dom.textarea.form||false;this.document=null;this.sandbox=this.CreateIframeSandBox();var t=this.sandbox.GetIframe();t.style.width="100%";t.style.height="100%";this.textareaView=new BXEditorTextareaView(this,this.dom.textarea,this.dom.textareaCont);this.iframeView=new BXEditorIframeView(this,this.dom.textarea,this.dom.iframeCont);this.synchro=new BXEditorViewsSynchro(this,this.textareaView,this.iframeView);if(this.bbCode){this.bbParser=new BXHtmlEditor.BXEditorBbCodeParser(this)}this.phpParser=new BXHtmlEditor.BXEditorPhpParser(this);this.components=new BXHtmlEditor.BXEditorComponents(this);this.styles=new h(this);this.overlay=new BXHtmlEditor.Overlay(this);this.BuildToolbar();if(this.showTaskbars){this.taskbarManager=new BXHtmlEditor.TaskbarManager(this,true);if(this.showComponents){this.componentsTaskbar=new BXHtmlEditor.ComponentsControl(this);this.taskbarManager.AddTaskbar(this.componentsTaskbar)}if(this.showSnippets){this.snippets=new BXHtmlEditor.BXEditorSnippets(this);this.snippetsTaskbar=new BXHtmlEditor.SnippetsControl(this,this.taskbarManager);this.taskbarManager.AddTaskbar(this.snippetsTaskbar)}this.taskbarManager.ShowTaskbar(this.showComponents?this.componentsTaskbar.GetId():this.snippetsTaskbar.GetId())}else{this.dom.taskbarCont.style.display="none"}this.contextMenu=new BXHtmlEditor.ContextMenu(this);if(this.config.showNodeNavi){this.nodeNavi=new BXHtmlEditor.NodeNavigator(this);this.nodeNavi.Show()}this.pasteControl=new BXHtmlEditor.PasteControl(this);this.InitEventHandlers();this.ResizeSceleton();if(this.showTaskbars&&this.config.taskbarShown){this.taskbarManager.Show(false)}this.inited=true;this.On("OnEditorInitedAfter",[this]);if(!this.CheckBrowserCompatibility()){this.dom.cont.parentNode.insertBefore(BX.create("DIV",{props:{className:"bxhtmled-warning"},text:BX.message("BXEdInvalidBrowser")}),this.dom.cont)}this.InitImageUploader();this.Show();BX.onCustomEvent(BXHtmlEditor,"OnEditorCreated",[this])},InitConfig:function(t){this.config=t;this.id=this.config.id;this.dialogs={};this.bbCode=!!this.config.bbCode;this.config.splitVertical=!!this.config.splitVertical;this.config.splitRatio=parseFloat(this.config.splitRatio);this.config.view=this.config.view||"wysiwyg";this.config.taskbarShown=!!this.config.taskbarShown;this.config.taskbarWidth=parseInt(this.config.taskbarWidth);this.config.showNodeNavi=this.config.showNodeNavi!==false;this.config.setFocusAfterShow=this.config.setFocusAfterShow!==false;this.cssCounter=0;this.iframeCssText=this.config.iframeCss;this.fileDialogsLoaded=this.bbCode||this.config.useFileDialogs===false;if(this.config.bbCodeTags&&this.bbCode){this.BBCODE_TAGS=this.config.bbCodeTags}if(this.config.minBodyWidth)this.MIN_WIDTH=parseInt(this.config.minBodyWidth);if(this.config.minBodyHeight)this.MIN_HEIGHT=parseInt(this.config.minBodyHeight);if(this.config.normalBodyWidth)this.NORMAL_WIDTH=parseInt(this.config.normalBodyWidth);this.normalWidth=this.NORMAL_WIDTH;if(!this.config.height)this.config.height=this.MIN_HEIGHT;if(!this.config.width)this.config.width=this.MIN_WIDTH;if(this.config.smiles){this.smilesIndex={};this.sortedSmiles=[];var e,i,s,n;for(e=0;e<this.config.smiles.length;e++){i=this.config.smiles[e];if(!i["codes"]||i["codes"]==i["code"]){this.smilesIndex[this.config.smiles[e].code]=i;this.sortedSmiles.push(i)}else if(i["codes"].length>0){n=i["codes"].split(" ");for(s=0;s<n.length;s++){this.smilesIndex[n[s]]=i;this.sortedSmiles.push({name:i.name,path:i.path,code:n[s]})}}}this.sortedSmiles=this.sortedSmiles.sort(function(t,e){return e.code.length-t.code.length})}this.allowPhp=!!this.config.allowPhp;this.lpa=!this.config.allowPhp&&this.config.limitPhpAccess;this.templateId=this.config.templateId;this.componentFilter=this.config.componentFilter;this.showSnippets=this.config.showSnippets!==false;this.showComponents=this.config.showComponents!==false&&(this.allowPhp||this.lpa);this.showTaskbars=this.config.showTaskbars!==false&&(this.showSnippets||this.showComponents);this.templates={};this.templates[this.templateId]=this.config.templateParams},InitEventHandlers:function(){var e=this;BX.bind(this.dom.cont,"click",BX.proxy(this.OnClick,this));BX.bind(this.dom.cont,"mousedown",BX.proxy(this.OnMousedown,this));BX.bind(t,"resize",function(){e.ResizeSceleton()});if(BX.adminMenu){BX.addCustomEvent(BX.adminMenu,"onAdminMenuResize",function(){e.ResizeSceleton()})}BX.addCustomEvent(this,"OnIframeFocus",function(){e.bookmark=null;if(e.statusInterval){clearInterval(e.statusInterval)}e.statusInterval=setInterval(BX.proxy(e.CheckCurrentStatus,e),500)});BX.addCustomEvent(this,"OnIframeBlur",function(){e.bookmark=null;if(e.statusInterval){clearInterval(e.statusInterval)}e.iframeView.stopBugusScroll=false});BX.addCustomEvent(this,"OnTextareaFocus",function(){e.bookmark=null;if(e.statusInterval){clearInterval(e.statusInterval)}});BX.addCustomEvent(this,"OnSurrogateDblClick",function(t,i,s,n){if(i){switch(i.tag){case"php":case"javascript":case"htmlcomment":case"iframe":case"style":e.GetDialog("Source").Show(i);break}}});if(this.dom.form){BX.bind(this.dom.form,"submit",BX.proxy(this.OnSubmit,this));if(this.config.initAutosave!==false){setTimeout(function(){if(e.dom.form.BXAUTOSAVE){e.InitAutosaveHandlers()}},100)}}BX.addCustomEvent(this,"OnSpecialcharInserted",function(t){var i=e.GetLastSpecialchars(),s=BX.util.array_search(t,i);if(s!==-1){i=BX.util.deleteFromArray(i,s);i.unshift(t)}else{i.unshift(t);i.pop()}e.config.lastSpecialchars=i;e.SaveOption("specialchars",i.join("|"))});this.parentDialog=BX.WindowManager.Get();if(this.parentDialog&&this.parentDialog.DIV&&BX.isNodeInDom(this.parentDialog.DIV)&&BX.findParent(this.dom.cont,function(t){return t==e.parentDialog.DIV})){BX.addCustomEvent(this.parentDialog,"onWindowResizeExt",function(){e.ResizeSceleton()})}if(this.config.autoResize){BX.addCustomEvent(this,"OnIframeKeyup",BX.proxy(this.AutoResizeSceleton,this));BX.addCustomEvent(this,"OnInsertHtml",BX.proxy(this.AutoResizeSceleton,this));BX.addCustomEvent(this,"OnIframeSetValue",BX.proxy(this.AutoResizeSceleton,this));BX.addCustomEvent(this,"OnFocus",BX.proxy(this.AutoResizeSceleton,this))}BX.addCustomEvent(this,"OnIframeKeyup",BX.proxy(this.CheckBodyHeight,this))},BuildSceleton:function(){var t=false;this.dom.cont=BX("bx-html-editor-"+this.id);if(this.dom.cont&&BX.isNodeInDom(this.dom.cont)){this.dom.toolbarCont=BX("bx-html-editor-tlbr-cnt-"+this.id);this.dom.toolbar=BX("bx-html-editor-tlbr-"+this.id);this.dom.areaCont=BX("bx-html-editor-area-cnt-"+this.id);this.dom.iframeCont=BX("bx-html-editor-iframe-cnt-"+this.id);this.dom.textareaCont=BX("bx-html-editor-ta-cnt-"+this.id);this.dom.resizerOverlay=BX("bx-html-editor-res-over-"+this.id);this.dom.splitResizer=BX("bx-html-editor-split-resizer-"+this.id);this.dom.splitResizer.style.display="none";this.dom.splitResizer.className=this.config.splitVertical?"bxhtmled-split-resizer-ver":"bxhtmled-split-resizer-hor";BX.bind(this.dom.splitResizer,"mousedown",BX.proxy(this.StartSplitResize,this));this.dom.taskbarCont=BX("bx-html-editor-tskbr-cnt-"+this.id);this.dom.navCont=BX("bx-html-editor-nav-cnt-"+this.id);this.dom.fileDialogsWrap=BX("bx-html-editor-file-dialogs-"+this.id);t=true}return t},ResizeSceleton:function(t,e,i){var s=this;if(this.expanded){var n=BX.GetWindowInnerSize(document);t=this.config.width=n.innerWidth;e=this.config.height=n.innerHeight}if(!t){t=this.config.width}if(!e){e=this.config.height}this.dom.cont.style.minWidth=this.MIN_WIDTH+"px";this.dom.cont.style.minHeight=this.MIN_HEIGHT+"px";var o,r;if(this.resizeTimeout){clearTimeout(this.resizeTimeout);this.resizeTimeout=null}if(t.toString().indexOf("%")!==-1){o=t;t=this.dom.cont.offsetWidth;if(!t){this.resizeTimeout=setTimeout(function(){s.ResizeSceleton(t,e,i)},500);return}}else{if(t<this.MIN_WIDTH){t=this.MIN_WIDTH}o=t+"px"}this.dom.cont.style.width=o;this.dom.toolbarCont.style.width=o;if(e.toString().indexOf("%")!==-1){r=e;e=this.dom.cont.offsetHeight}else{if(e<this.MIN_HEIGHT){e=this.MIN_HEIGHT}r=e+"px"}this.dom.cont.style.height=r;var a=Math.max(t,this.MIN_WIDTH),h=Math.max(e,this.MIN_HEIGHT),l=this.toolbar.GetHeight(),d=this.showTaskbars?this.taskbarManager.GetWidth(true,a*.8):0,c=h-l-(this.config.showNodeNavi&&this.nodeNavi?this.nodeNavi.GetHeight():0),u=a-d;this.dom.areaCont.style.top=l?l+"px":0;this.SetAreaContSize(u,c,i);this.dom.taskbarCont.style.height=c+"px";this.dom.taskbarCont.style.width=d+"px";if(this.showTaskbars){this.taskbarManager.Resize(d,c)}this.toolbar.AdaptControls(t);this.On("OnEditorResizedAfter",[{width:t,height:e}])},CheckBodyHeight:function(){if(this.iframeView.IsShown()){var t=8,e,i=this.GetIframeDoc();if(i&&i.body){e=i.body.parentNode.offsetHeight-t*2;if(e<=20){setTimeout(BX.proxy(this.CheckBodyHeight,this),300)}else if(this.config.autoResize||e>i.body.offsetHeight){i.body.style.minHeight=e+"px"}}}},GetSceletonSize:function(){return{width:this.dom.cont.offsetWidth,height:this.dom.cont.offsetHeight}},AutoResizeSceleton:function(){if(this.expanded||!this.IsShown()||this.iframeView.IsEmpty())return;var t=parseInt(this.config.autoResizeMaxHeight||0),e=parseInt(this.config.autoResizeMinHeight||50),i=this.dom.areaCont.offsetHeight,s,n=this;if(this.autoResizeTimeout){clearTimeout(this.autoResizeTimeout)}this.autoResizeTimeout=setTimeout(function(){s=n.GetHeightByContent();if(s>i){if(BX.browser.IsIOS()){t=Infinity}else if(!t||t<10){t=Math.round(BX.GetWindowInnerSize().innerHeight*.9)}s=Math.min(s,t);s=Math.max(s,e);n.SmoothResizeSceleton(s)}},300)},GetHeightByContent:function(){var t=parseInt(this.config.autoResizeOffset||80),e;if(this.GetViewMode()=="wysiwyg"){var i=this.GetIframeDoc().body,s=i.lastChild,n=false;e=i.offsetHeight;while(true){if(!s){break}if(s.offsetTop){n=s.offsetTop+(s.offsetHeight||0);e=n+t;break}else{s=s.previousSibling}}var o=BX.GetWindowSize(this.GetIframeDoc());if(o.scrollHeight-o.innerHeight>5){e=Math.max(o.scrollHeight+t,e)}}else{e=(this.textareaView.element.value.split("\n").length+5)*17}return e},SmoothResizeSceleton:function(t){this.On("AutoResizeStarted");var e=this,i=this.GetSceletonSize(),s=i.height,n=0,o=t>s,r=50,a=5;if(!o)return;if(this.smoothResizeInt){clearInterval(this.smoothResizeInt)}this.smoothResizeInt=setInterval(function(){s+=Math.round(a*n);var i=s>=t;if(s>t){clearInterval(e.smoothResizeInt);if(s>t){s=t}}e.config.height=s;e.ResizeSceleton();if(i){e.On("AutoResizeFinished")}n++},r)},SetAreaContSize:function(t,e,i){t+=2;this.dom.areaCont.style.width=t+"px";this.dom.areaCont.style.height=e+"px";if(i&&i.areaContTop){this.dom.areaCont.style.top=i.areaContTop+"px"}var s=3;if(this.currentViewName=="split"){function n(t,e,i){if(t<e){t=e}if(t>i){t=i}return t}var o=10,r,a,h;if(this.config.splitVertical==true){r=i&&i.deltaX?i.deltaX:0;a=n(t*this.config.splitRatio/(1+this.config.splitRatio)-r,o,t-o);h=t-a;this.dom.iframeCont.style.width=a-s+"px";this.dom.iframeCont.style.height=e+"px";this.dom.iframeCont.style.top=0;this.dom.iframeCont.style.left=0;this.dom.textareaCont.style.width=h-s+"px";this.dom.textareaCont.style.height=e+"px";this.dom.textareaCont.style.top=0;this.dom.textareaCont.style.left=a+"px";this.dom.splitResizer.className="bxhtmled-split-resizer-ver";this.dom.splitResizer.style.top=0;this.dom.splitResizer.style.left=a-3+"px";this.dom.textareaCont.style.height=e+"px"}else{r=i&&i.deltaY?i.deltaY:0;a=n(e*this.config.splitRatio/(1+this.config.splitRatio)-r,o,e-o);h=e-a;this.dom.iframeCont.style.width=t-s+"px";this.dom.iframeCont.style.height=a+"px";this.dom.iframeCont.style.top=0;this.dom.iframeCont.style.left=0;this.dom.textareaCont.style.width=t-s+"px";this.dom.textareaCont.style.height=h+"px";this.dom.textareaCont.style.top=a+"px";this.dom.textareaCont.style.left=0;this.dom.splitResizer.className="bxhtmled-split-resizer-hor";this.dom.splitResizer.style.top=a-3+"px";this.dom.splitResizer.style.left=0}if(i&&i.updateSplitRatio){this.config.splitRatio=a/h;this.SaveOption("split_ratio",this.config.splitRatio)}}else{this.dom.iframeCont.style.width=t-s+"px";this.dom.iframeCont.style.height=e+"px";this.dom.iframeCont.style.top=0;this.dom.iframeCont.style.left=0;this.dom.textareaCont.style.width=t-s+"px";this.dom.textareaCont.style.height=e+"px";this.dom.textareaCont.style.top=0;this.dom.textareaCont.style.left=0}},BuildToolbar:function(){this.toolbar=new BXHtmlEditor.Toolbar(this,this.GetTopControls())},GetTopControls:function(){this.On("GetTopButtons",[t.BXHtmlEditor.Controls]);return t.BXHtmlEditor.Controls},CreateIframeSandBox:function(){return new s(BX.proxy(this.OnCreateIframe,this),{editor:this,cont:this.dom.iframeCont})},OnCreateIframe:function(){if(!document.body.contains(this.dom.iframeCont)){return}this.On("OnCreateIframeBefore");this.iframeView.OnCreateIframe();this.selection=new n(this);this.action=new BXEditorActions(this);this.config.content=this.dom.pValueInput.value;this.SetContent(this.config.content,true);this.undoManager=new a(this);this.action.Exec("styleWithCSS",false,true);this.iframeView.InitAutoLinking();if(this.config.view!="wysiwyg"){var t,e=false,i=false,s=this.toolbar.GetControlsMap();if(this.config.view=="split"){for(t=0;t<s.length;t++){if(s[t]&&s[t].id=="ChangeView"){e=true;break}}if(!e)this.config.view="wysiwyg"}if(this.config.view!="wysiwyg"){for(t=0;t<s.length;t++){if(s[t]&&(s[t].id=="BbCode"||s[t].id=="ChangeView")){i=true;break}}if(!i)this.config.view="wysiwyg"}}this.SetView(this.config.view,false);if(this.config.setFocusAfterShow!==false){this.Focus(false)}this.sandbox.inited=true;this.On("OnCreateIframeAfter",[this])},GetDialog:function(e,i){if(!this.dialogs[e]&&t.BXHtmlEditor.dialogs[e])this.dialogs[e]=new t.BXHtmlEditor.dialogs[e](this,i);return this.dialogs[e]||null},Show:function(){this.dom.cont.style.display=""},Hide:function(){this.dom.cont.style.display="none"},IsShown:function(){return this.inited&&this.dom.cont.style.display!=="none"&&this.dom.cont.offsetWidth>0&&BX.isNodeInDom(this.dom.cont)},SetView:function(t,e){this.On("OnSetViewBefore");if(t=="split"&&this.bbCode)t="wysiwyg";if(this.currentViewName!=t){if(t=="wysiwyg"){this.iframeView.Show();this.textareaView.Hide();this.dom.splitResizer.style.display="none";this.CheckBodyHeight()}else if(t=="code"){this.iframeView.Hide();this.textareaView.Show();this.CheckCurrentStatus(false);this.dom.splitResizer.style.display="none"}else if(t=="split"){this.textareaView.Show();this.iframeView.Show();this.dom.splitResizer.style.display="";this.CheckBodyHeight()}this.currentViewName=t}if(e!==false){this.SaveOption("view",t)}this.ResizeSceleton();this.On("OnSetViewAfter")},GetViewMode:function(){return this.currentViewName},SetContent:function(t,e){this.On("OnSetContentBefore");if(this.bbCode){var i=this.bbParser.Parse(t);this.iframeView.SetValue(i,e)}else{this.iframeView.SetValue(t,e)}this.textareaView.SetValue(t,false);this.On("OnSetContentAfter")},Focus:function(t){if(this.currentViewName=="wysiwyg"){this.iframeView.Focus(t)}else if(this.currentViewName=="code"){this.textareaView.Focus(t)}else if(this.currentViewName=="split"){if(this.synchro.GetSplitMode()=="wysiwyg"){this.iframeView.Focus(t)}else{this.textareaView.Focus(t)}}this.On("OnFocus");return this},SaveContent:function(){if(this.currentViewName=="wysiwyg"||this.currentViewName=="split"&&this.synchro.GetSplitMode()=="wysiwyg"){this.synchro.lastIframeValue="";this.synchro.FromIframeToTextarea(true,true)}else{this.textareaView.SaveValue()}},GetContent:function(){this.SaveContent();return this.textareaView.GetValue()},IsExpanded:function(){return this.expanded},Expand:function(e){if(e==undefined){e=!this.expanded}var i=this,s=BX.GetWindowInnerSize(document),n,o,r,a,h,l,d,c;if(e){var u=BX.GetWindowScrollPos(document),f=BX.pos(this.dom.cont);n=this.dom.cont.offsetWidth;o=this.dom.cont.offsetHeight;r=f.top;a=f.left;h=s.innerWidth;l=s.innerHeight;d=u.scrollTop;c=u.scrollLeft;this.savedSize={width:n,height:o,top:r,left:a,scrollLeft:u.scrollLeft,scrollTop:u.scrollTop,configWidth:this.config.width,configHeight:this.config.height};this.config.width=h;this.config.height=l;BX.addClass(this.dom.cont,"bx-html-editor-absolute");this._bodyOverflow=document.body.style.overflow;document.body.style.overflow="hidden";this.dummieDiv=BX.create("DIV");this.dummieDiv.style.width=n+"px";this.dummieDiv.style.height=o+"px";this.dom.cont.parentNode.insertBefore(this.dummieDiv,this.dom.cont);document.body.appendChild(this.dom.cont);BX.addCustomEvent(this,"OnIframeKeydown",BX.proxy(this.CheckEscCollapse,this));BX.bind(document.body,"keydown",BX.proxy(this.CheckEscCollapse,this));BX.bind(t,"scroll",BX.proxy(this.PreventScroll,this))}else{n=this.dom.cont.offsetWidth;o=this.dom.cont.offsetHeight;r=this.savedSize.scrollTop;a=this.savedSize.scrollLeft;h=this.savedSize.width;l=this.savedSize.height;d=this.savedSize.top;c=this.savedSize.left;BX.removeCustomEvent(this,"OnIframeKeydown",BX.proxy(this.CheckEscCollapse,this));BX.unbind(document.body,"keydown",BX.proxy(this.CheckEscCollapse,this));BX.unbind(t,"scroll",BX.proxy(this.PreventScroll,this))}this.dom.cont.style.width=n+"px";this.dom.cont.style.height=o+"px";this.dom.cont.style.top=r+"px";this.dom.cont.style.left=a+"px";var m=this.GetContent();this.expandAnimation=new BX.easing({duration:300,start:{height:o,width:n,top:r,left:a},finish:{height:l,width:h,top:d,left:c},transition:BX.easing.makeEaseOut(BX.easing.transitions.quart),step:function(t){i.dom.cont.style.width=t.width+"px";i.dom.cont.style.height=t.height+"px";i.dom.cont.style.top=t.top+"px";i.dom.cont.style.left=t.left+"px";i.ResizeSceleton(t.width.toString(),t.height.toString())},complete:function(){i.expandAnimation=null;if(!e){i.util.ReplaceNode(i.dummieDiv,i.dom.cont);i.dummieDiv=null;i.dom.cont.style.width="";i.dom.cont.style.height="";i.dom.cont.style.top="";i.dom.cont.style.left="";BX.removeClass(i.dom.cont,"bx-html-editor-absolute");document.body.style.overflow=i._bodyOverflow;i.config.width=i.savedSize.configWidth;i.config.height=i.savedSize.configHeight;i.ResizeSceleton()}setTimeout(function(){i.CheckAndReInit(m)},10)}});this.expandAnimation.animate();this.expanded=e},CheckEscCollapse:function(t,e,i,s){if(!e){e=t.keyCode}if(this.IsExpanded()&&e==this.KEY_CODES["escape"]&&!this.IsPopupsOpened()){this.Expand(false);return BX.PreventDefault(t)}},PreventScroll:function(e){t.scrollTo(this.savedSize.scrollLeft,this.savedSize.scrollTop);return BX.PreventDefault(e)},IsPopupsOpened:function(){return!!(this.dialogShown||this.popupShown||this.contextMenuShown||this.overlay.bShown)},ReInitIframe:function(){this.sandbox.InitIframe();this.iframeView.OnCreateIframe();this.synchro.StopSync();this.synchro.lastTextareaValue="";this.synchro.FromTextareaToIframe(true);this.synchro.StartSync();this.iframeView.ReInit();this.selection.lastCheckedRange=null;if(this.config.setFocusAfterShow!==false){this.Focus()}},CheckAndReInit:function(t){if(this.sandbox.inited){var e=this.sandbox.GetWindow();if(e){var i=this.sandbox.GetDocument();if(i!==this.iframeView.document||!i.head||i.head.innerHTML==""){this.iframeView.document=i;this.iframeView.element=i.body;this.ReInitIframe()}else if(i.body){i.body.style.minHeight=""}}else{throw new Error("HtmlEditor: CheckAndReInit error iframe isn't in the DOM")}}if(t!==undefined){this.SetContent(t,true);this.CheckBodyHeight()}},Disable:function(){},Enable:function(){},CheckConfig:function(t){if(t.content===undefined){t.content=""}return t},GetInnerHtml:function(t){var e="%7E",i="&amp;",s=t.innerHTML;if(s.indexOf(i)!==-1||s.indexOf(e)!==-1){s=s.replace(/(?:href|src)\s*=\s*("|')([\s\S]*?)(\1)/gi,function(t){t=t.replace(/%7E/gi,"~");t=t.replace(/&amp;/gi,"&");return t})}s=s.replace(/(?:title|alt)\s*=\s*("|')([\s\S]*?)(\1)/gi,function(t){t=t.replace(/</g,"&lt;");t=t.replace(/>/g,"&gt;");return t});if(this.bbCode){s=s.replace(/[\s\n\r]*?<!--[\s\S]*?-->[\s\n\r]*?/gi,"")}return s},InitUtil:function(){var e=this;this.util={};if("textContent"in document.documentElement){this.util.SetTextContent=function(t,e){t.textContent=e};this.util.GetTextContent=function(t){return t.textContent}}else if("innerText"in document.documentElement){this.util.SetTextContent=function(t,e){t.innerText=e};this.util.GetTextContent=function(t){return t.innerText}}else{this.util.SetTextContent=function(t,e){t.nodeValue=e};this.util.GetTextContent=function(t){return t.nodeValue}}this.util.AutoCloseTagSupported=function(){var t=document.createElement("div"),i,s;t.innerHTML="<p><div></div>";s=t.innerHTML.toLowerCase();i=s==="<p></p><div></div>"||s==="<p><div></div></p>";e.util.AutoCloseTagSupported=function(){return i};return i};this.util.FirstLetterSupported=function(){var t=!BX.browser.IsChrome()&&!BX.browser.IsSafari();e.util.FirstLetterSupported=function(){return t};return t};this.util.CheckGetAttributeTruth=function(){var t=document.createElement("td"),i=t.getAttribute("rowspan")!="1";e.util.CheckGetAttributeTruth=function(){return i};return i};this.util.CheckHTML5Support=function(t){if(!t){t=document}var i=false,s="<article>bitrix</article>",n=t.createElement("div");n.innerHTML=s;i=n.innerHTML.toLowerCase()===s;e.util.CheckHTML5Support=function(){return i};return i};this.util.CheckHTML5FullSupport=function(t){if(!t){t=document}var i,s=e.GetHTML5Tags(),n=false,o=t.createElement("div");for(var r=0;r<s.length;r++){i="<"+s[r]+">bitrix</"+s[r]+">";o.innerHTML=i;n=o.innerHTML.toLowerCase()===i;if(!n){break}}e.util.CheckHTML5FullSupport=function(){return n};return n};this.util.GetEmptyImage=function(){return e.EMPTY_IMAGE_SRC};this.util.CheckDataTransferSupport=function(){var i=false;try{i=!!(t.Clipboard||t.DataTransfer).prototype.getData}catch(t){}e.util.CheckDataTransferSupport=function(){return i};return i};this.util.CheckImageSelectSupport=function(){var t=!(BX.browser.IsChrome()||BX.browser.IsSafari());e.util.CheckImageSelectSupport=function(){return t};return t};this.util.CheckPreCursorSupport=function(){var t=!(BX.browser.IsIE()||BX.browser.IsIE10()||BX.browser.IsIE11());e.util.CheckPreCursorSupport=function(){return t};return t};this.util.Refresh=function(t){if(t&&t.parentNode){var i="bx-editor-refresh";BX.addClass(t,i);BX.removeClass(t,i);if(BX.browser.IsFirefox()){try{var s,n=t.ownerDocument,o=n.getElementsByTagName("I"),r=o.length;for(s=0;s<o.length;s++){o[s].setAttribute("data-bx-orgig-i",true)}n.execCommand("italic",false,null);n.execCommand("italic",false,null);var a=n.getElementsByTagName("I");if(a.length!==r){for(s=0;s<a.length;s++){if(a[s].getAttribute("data-bx-orgig-i")){a[s].removeAttribute("data-bx-orgig-i")}else{e.util.ReplaceWithOwnChildren(a[s])}}}}catch(t){}}}};this.util.addslashes=function(t){t=t.replace(/\\/g,"\\\\");t=t.replace(/"/g,'\\"');return t};this.util.stripslashes=function(t){t=t.replace(/\\"/g,'"');t=t.replace(/\\\\/g,"\\");return t};this.util.ReplaceNode=function(t,e){t.parentNode.insertBefore(e,t);t.parentNode.removeChild(t);return e};this.util.spaceUrlEncode=function(t){t=t.replace(/ /g,"%20");return t};this.util.spaceUrlDecode=function(t){t=t.replace(/%20/g," ");return t};this.util.DocumentHasTag=function(t,i){var s={},n=e.id+":"+i,o=s[n];if(!o)o=s[n]=t.getElementsByTagName(i);return o.length>0};this.util.IsSplitPoint=function(t,e){var i=e>0&&e<t.childNodes.length;if(rangy.dom.isCharacterDataNode(t)){if(e==0)i=!!t.previousSibling;else if(e==t.length)i=!!t.nextSibling;else i=true}return i};this.util.SplitNodeAt=function(t,i,s){var n;if(rangy.dom.isCharacterDataNode(i)){if(s==0){s=rangy.dom.getNodeIndex(i);i=i.parentNode}else if(s==i.length){s=rangy.dom.getNodeIndex(i)+1;i=i.parentNode}else{n=rangy.dom.splitDataNode(i,s)}}if(!n){n=i.cloneNode(false);if(n.id){n.removeAttribute("id")}var o;while(o=i.childNodes[s]){n.appendChild(o)}rangy.dom.insertAfter(n,i)}if(i&&i.nodeName=="BODY"){return n}return i==t?n:e.util.SplitNodeAt(t,n.parentNode,rangy.dom.getNodeIndex(n))};this.util.ReplaceWithOwnChildren=function(t){var e=t.parentNode;while(t.firstChild){e.insertBefore(t.firstChild,t)}e.removeChild(t)};this.util.IsBlockElement=function(t){var e=BX.style(t,"display");return e&&BX.type.isString(e)&&e.toLowerCase()==="block"};this.util.IsBlockNode=function(t){return t&&t.nodeType==1&&BX.util.in_array(t.nodeName,e.GetBlockTags())};this.util.CopyAttributes=function(t,e,i){if(e&&i){var s,n,o=t.length;for(n=0;n<o;n++){s=t[n];if(e[s])i[s]=e[s]}}};this.util.RenameNode=function(t,i){var s=t.ownerDocument.createElement(i),n;while(n=t.firstChild)s.appendChild(n);e.util.CopyAttributes(["align","className"],t,s);if(t.style.cssText!=""){s.style.cssText=t.style.cssText}t.parentNode.replaceChild(s,t);return s};this.util.GetInvisibleTextNode=function(){return e.iframeView.document.createTextNode(e.INVISIBLE_SPACE)};this.util.IsEmptyNode=function(t,i,s){var n;if(t.nodeType==3){n=t.data===""||t.data===e.INVISIBLE_SPACE||t.data==="\n"&&i;if(!n&&s&&t.data.toString().match(/^[\s\n\r\t]+$/gi)){n=true}}else if(t.nodeType==1){n=t.innerHTML===""||t.innerHTML===e.INVISIBLE_SPACE;if(!n&&s&&t.innerHTML.toString().match(/^[\s\n\r\t]+$/gi)){n=true}}return n};var i=document.documentElement;if("textContent"in i){this.util.SetTextContent=function(t,e){t.textContent=e};this.util.GetTextContent=function(t){return t.textContent}}else if("innerText"in i){this.util.SetTextContent=function(t,e){t.innerText=e};this.util.GetTextContent=function(t){return t.innerText}}else{this.util.SetTextContent=function(t,e){t.nodeValue=e};this.util.GetTextContent=function(t){return t.nodeValue}}this.util.GetTextContentEx=function(t){var i,s,n=[],o=t.cloneNode(true),r=o.getElementsByTagName("SCRIPT"),a=o.getElementsByTagName("A");for(i=r.length-1;i>=0;i--){BX.remove(r[i])}for(i=a.length-1;i>=0;i--){var h=a[i].href;if(h.toLowerCase().indexOf("javascript:")!==-1){e.util.ReplaceNode(a[i],a[i].ownerDocument.createTextNode(e.util.GetTextContent(a[i])))}else{n.push('<a href="'+a[i].href+'">'+e.util.GetTextContent(a[i])+"</a>");e.util.ReplaceNode(a[i],a[i].ownerDocument.createTextNode("#BX~TMP~LINK"+(n.length-1)+"#"))}}s=e.util.GetTextContent(o);if(n.length>0){s=s.replace(/#BX~TMP~LINK(\d+)#/gi,function(t,e){return n[e]||""})}return s};this.util.RgbToHex=function(t){if(!t)t="";if(t.search("rgb")!==-1){function e(t){return("0"+parseInt(t).toString(16)).slice(-2)}t=t.replace(/rgba\(0,\s*0,\s*0,\s*0\)/gi,"transparent");t=t.replace(/rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([\d\.]{1,3}))?\)/gi,function(t,i,s,n,o){return"#"+e(i)+e(s)+e(n)})}return t};this.util.CheckCss=function(t,e,i){var s=true,n;for(n in e){if(e.hasOwnProperty(n)){if(t.style[n]!=""){s=s&&(i?t.style[n]==e[n]:true)}else{s=false}}}return s};this.util.SetCss=function(t,e){if(t&&e&&typeof e=="object"){for(var i in e){if(e.hasOwnProperty(i)){t.style[i]=e[i]}}}};this.util.InsertAfter=function(t,e){return rangy.dom.insertAfter(t,e)};this.util.GetNodeDomOffset=function(t){var e=0;while(t.parentNode&&t.parentNode.nodeName!=="BODY"){t=t.parentNode;e++}return e};this.util.CheckSurrogateNode=function(t){return e.phpParser.CheckParentSurrogate(t)};this.util.CheckSurrogateDd=function(t){return e.phpParser.CheckSurrogateDd(t)};this.util.GetPreviousNotEmptySibling=function(t){var i=t.previousSibling;while(i&&i.nodeType==3&&e.util.IsEmptyNode(i,true,true)){i=i.previousSibling}return i};this.util.GetNextNotEmptySibling=function(t){var i=t.nextSibling;while(i&&i.nodeType==3&&e.util.IsEmptyNode(i,true,true)){i=i.nextSibling}return i};this.util.IsEmptyLi=function(t){if(t&&t.nodeName=="LI"){return e.util.IsEmptyNode(t,true,true)||t.innerHTML.toLowerCase()=="<br>"}return false};this.util.FindParentEx=function(t,e,i){if(BX.checkNode&&BX.checkNode(t,e))return t;return BX.findParent(t,e,i)};this.util.IsEmptyObject=function(t){for(var e in t){if(t.hasOwnProperty(e)){return false}}return true};this.util.GetNextSibling=function(t){var e=t.nextSibling;while(e&&e.nodeType==3&&e.nodeValue=="\ufeff"&&e.nextSibling){e=e.nextSibling}return e||null}},Parse:function(t,e,i){e=!!e;this.content=t;this.On("OnParse",[e]);if(e){this.content=this.parser.Parse(this.content,this.GetParseRules(),this.GetIframeDoc(),true,e);if((i===true||this.textareaView.IsShown())&&!this.bbCode){this.content=this.FormatHtml(this.content)}this.content=this.phpParser.ParseBxNodes(this.content)}else{this.content=this.phpParser.ParsePhp(this.content);this.content=this.parser.Parse(this.content,this.GetParseRules(),this.GetIframeDoc(),true,e)}this.On("OnAfterParse",[e]);return this.content},On:function(t,e){BX.onCustomEvent(this,t,e||[])},GetIframeDoc:function(){if(!this.document){this.document=this.sandbox.GetDocument();BX.addCustomEvent(this,"OnIframeReInit",BX.proxy(function(){this.document=this.sandbox.GetDocument()},this))}return this.document},GetParseRules:function(){this.rules=e;this.On("OnGetParseRules");var t=this;this.GetParseRules=function(){return t.rules};return this.rules},GetHTML5Tags:function(){return this.HTML5_TAGS},GetBlockTags:function(){return this.BLOCK_TAGS},SetBxTag:function(t,e){var i;if(e.id||t&&t.id)i=e.id||t.id;if(!i){i="bxid"+Math.round(Math.random()*1e9)}else{if(this.bxTags[i]){if(!e.tag)e.tag=this.bxTags[i].tag}}e.id=i;if(t)t.id=e.id;this.bxTags[e.id]=e;return e.id},GetBxTag:function(t){var e;if(typeof t=="object"&&t&&t.id)e=t.id;else e=t;if(e){if(typeof e!="string"&&e.id)e=e.id;if(e&&e.length>0&&this.bxTags[e]&&this.bxTags[e].tag){this.bxTags[e].tag=this.bxTags[e].tag.toLowerCase();return this.bxTags[e]}}return{tag:false}},OnMousedown:function(t){var e=t.target||t.srcElement;if(e&&(e.getAttribute||e.parentNode)){var i=this,s=e.getAttribute("data-bx-type");if(!s){e=BX.findParent(e,function(t){return t==i.dom.cont||t.getAttribute&&t.getAttribute("data-bx-type")},this.dom.cont);s=e&&e.getAttribute?e.getAttribute("data-bx-type"):null}if(s=="action"){return BX.PreventDefault(t)}}return true},OnClick:function(t){var e=t.target||t.srcElement,i=e&&e.getAttribute?e.getAttribute("data-bx-type"):false;this.On("OnClickBefore",[{e:t,target:e,bxType:i}]);this.CheckCommand(e)},CheckCommand:function(t){if(t&&(t.getAttribute||t.parentNode)){var e=this,i=t.getAttribute("data-bx-type");if(!i){t=BX.findParent(t,function(t){return t==e.dom.cont||t.getAttribute&&t.getAttribute("data-bx-type")},this.dom.cont);i=t&&t.getAttribute?t.getAttribute("data-bx-type"):null}if(i=="action"){var s=t.getAttribute("data-bx-action"),n=t.getAttribute("data-bx-value");if(this.action.IsSupported(s)){this.action.Exec(s,n)}}}},SetSplitMode:function(t,e){this.config.splitVertical=!!t;if(e!==false){this.SaveOption("split_vertical",this.config.splitVertical?1:0)}this.SetView("split",e)},GetSplitMode:function(){return this.config.splitVertical},StartSplitResize:function(t){this.dom.resizerOverlay.style.display="block";var e=0,i=0,s=BX.GetWindowScrollPos(),n=t.clientX+s.scrollLeft,o=t.clientY+s.scrollTop,r=this;function a(t,a){var h=t.clientX+s.scrollLeft,l=t.clientY+s.scrollTop;if(n==h&&o==l){return}e=n-h;i=o-l;r.ResizeSceleton(0,0,{deltaX:e,deltaY:i,updateSplitRatio:a})}function h(t){a(t,true);BX.unbind(document,"mousemove",a);BX.unbind(document,"mouseup",h);r.dom.resizerOverlay.style.display="none"}BX.bind(document,"mousemove",a);BX.bind(document,"mouseup",h)},Request:function(t){if(!t.url)t.url=this.config.actionUrl;if(t.bIter!==false)t.bIter=true;if(!t.postData&&!t.getData)t.getData=this.GetReqData();var e=t.getData?t.getData.reqId:t.postData.reqId;var i=this,s=0;var n=function(n){function o(){var r=t.handler(i.GetRequestRes(e),n);if(r===false&&++s<20&&t.bIter)setTimeout(o,5);else i.ClearRequestRes(e)}setTimeout(o,50)};if(t.postData)BX.ajax.post(t.url,t.postData,n);else BX.ajax.get(t.url,t.getData,n)},GetRequestRes:function(t){if(top.BXHtmlEditorAjaxResponse[t]!=undefined)return top.BXHtmlEditorAjaxResponse[t];return{}},ClearRequestRes:function(t){if(top.BXHtmlEditorAjaxResponse){top.BXHtmlEditorAjaxResponse[t]=null;delete top.BXHtmlEditorAjaxResponse[t]}},GetReqData:function(t,e){if(!e)e={};if(t)e.action=t;e.sessid=BX.bitrix_sessid();e.bx_html_editor_request="Y";e.reqId=Math.round(Math.random()*1e6);return e},GetTemplateId:function(){return this.templateId},GetSiteId:function(){return this.config.siteId},GetComponentFilter:function(){return this.componentFilter},GetTemplateParams:function(){return this.templates[this.templateId]},GetTemplateStyles:function(){var t=this.templates[this.templateId]||{};return t.STYLES||""},ApplyTemplate:function(t){if(this.templateId!==t){if(this.templates[t]){this.templateId=t;var e=this.templates[t],i,s=this.sandbox.GetDocument(),n=s.head||s.getElementsByTagName("HEAD")[0],o=n.getElementsByTagName("STYLE"),r=n.getElementsByTagName("LINK");for(i=0;i<o.length;i++){if(o[i].getAttribute("data-bx-template-style")=="Y")BX.cleanNode(o[i],true)}i=0;while(i<r.length){if(r[i].getAttribute("data-bx-template-style")=="Y"){BX.remove(r[i],true)}else{i++}}if(e["STYLES"]){n.appendChild(BX.create("STYLE",{props:{type:"text/css"},text:e["STYLES"]},s)).setAttribute("data-bx-template-style","Y")}if(e&&e["EDITOR_STYLES"]){for(i=0;i<e["EDITOR_STYLES"].length;i++){n.appendChild(BX.create("link",{props:{rel:"stylesheet",href:e["EDITOR_STYLES"][i]+"_"+this.cssCounter++}},s)).setAttribute("data-bx-template-style","Y")}}this.On("OnApplySiteTemplate",[t])}else{var a=this;this.Request({getData:this.GetReqData("load_site_template",{site_template:t}),handler:function(e){a.templates[t]=e;a.ApplyTemplate(t)}})}}},FormatHtml:function(e,i){if(e.length<this.MAX_HANDLED_FORMAT_LENGTH||i===true){if(!this.formatter)this.formatter=new t.BXHtmlEditor.BXCodeFormatter(this);var s=(new Date).getTime();e=this.formatter.Format(e);var n=(new Date).getTime();if(n-s>this.MAX_HANDLED_FORMAT_TIME)this.MAX_HANDLED_FORMAT_LENGTH-=5e3}return e},GetFontFamilyList:function(){if(!this.fontFamilyList){this.fontFamilyList=[{value:["Times New Roman","Times"],name:"Times New Roman"},{value:["Courier New"],name:"Courier New"},{value:["Arial","Helvetica"],name:"Arial / Helvetica"},{value:["Arial Black","Gadget"],name:"Arial Black"},{value:["Tahoma","Geneva"],name:"Tahoma / Geneva"},{value:"Verdana",name:"Verdana"},{value:["Georgia","serif"],name:"Georgia"},{value:"monospace",name:"monospace"}];this.On("GetFontFamilyList",[this.fontFamilyList])}return this.fontFamilyList},CheckCurrentStatus:function(t){var e,i,s,n,o=this.GetActiveActions();if(t===false){for(i in o){if(o.hasOwnProperty(i)&&this.action.IsSupported(i)){e=o[i];e.control.SetValue(false,null,i)}}}if(!this.iframeView.IsFocused())return this.On("OnIframeBlur");var r=this.selection.GetRange();if(!r||!r.isValid())return this.On("OnIframeBlur");for(i in o){if(o.hasOwnProperty(i)&&this.action.IsSupported(i)){e=o[i];s=this.action.CheckState(i,e.value);n=e.control.GetValue();if(s){e.control.SetValue(true,s,i)}else{e.control.SetValue(false,null,i)}}}},RegisterCheckableAction:function(t,e){if(!this.checkedActionList)this.checkedActionList={};this.checkedActionList[t]=e},GetActiveActions:function(){return this.checkedActionList},SaveOption:function(t,e){BX.userOptions.save("html_editor",this.config.settingsKey,t,e)},GetCurrentCssClasses:function(t){return this.styles.GetCSS(this.templateId,this.templates[this.templateId].STYLES,this.templates[this.templateId].PATH||"",t||false)},GetStylesDescription:function(t){if(!t)t=this.templateId;var e={};if(t&&this.templates[t]){e=this.templates[t].STYLES_TITLE||{}}return e},IsInited:function(){return!!this.inited},IsContentChanged:function(){var t=this.config.content.replace(/[\s\n\r\t]+/gi,""),e=this.GetContent().replace(/[\s\n\r\t]+/gi,"");return t!=e},IsSubmited:function(){return this.isSubmited},OnSubmit:function(){if(!this.isSubmited&&this.dom.cont.style.display!=="none"){this.RemoveCursorNode();this.isSubmited=true;if(this.iframeView.IsFocused())this.On("OnIframeBlur");this.On("OnSubmit");this.SaveContent()}},AllowBeforeUnloadHandler:function(){this.beforeUnloadHandlerAllowed=true},DenyBeforeUnloadHandler:function(){this.beforeUnloadHandlerAllowed=false},Destroy:function(){if(this.sandbox)this.sandbox.Destroy();if(this.Check())BX.remove(this.dom.cont)},Check:function(){return this.dom.cont&&BX.isNodeInDom(this.dom.cont)},IsVisible:function(){return this.Check()&&this.dom.cont.offsetWidth>0},GetLastSpecialchars:function(){var t=["&cent;","&sect;","&euro;","&pound;","&yen;","&copy;","&reg;","&laquo;","&raquo;","&deg;","&plusmn;","&para;","&hellip;","&prime;","&Prime;","&trade;","&asymp;","&ne;","&lt;","&gt;"];if(this.config.lastSpecialchars&&typeof this.config.lastSpecialchars=="object"&&this.config.lastSpecialchars.length>1){return this.config.lastSpecialchars}else{return t}},GetIframeElement:function(t){var e=this.GetIframeDoc();return e?e.getElementById(t):null},RegisterDialog:function(e,i){t.BXHtmlEditor.dialogs[e]=i},SetConfigHeight:function(t){this.config.height=t;if(this.IsExpanded()){this.savedSize.configHeight=t;this.savedSize.height=t}},CheckBrowserCompatibility:function(){return!(BX.browser.IsOpera()||BX.browser.IsIE8()||BX.browser.IsIE7()||BX.browser.IsIE6()||!document.querySelectorAll)},GetCursorHtml:function(){return'<span id="bx-cursor-node"> </span>'},SetCursorNode:function(t){if(!t)t=this.selection.GetRange();this.RemoveCursorNode();this.selection.InsertHTML(this.GetCursorHtml(),t)},RestoreCursor:function(){var t=this.GetIframeElement("bx-cursor-node");if(t){this.selection.SetAfter(t);BX.remove(t)}},RemoveCursorNode:function(){if(this.synchro.IsFocusedOnTextarea()){}else{var t=this.GetIframeElement("bx-cursor-node");if(t){this.selection.SetAfter(t);BX.remove(t)}}},AddButton:function(e){if(e.compact==undefined)e.compact=false;if(e.toolbarSort==undefined)e.toolbarSort=301;if(e.hidden==undefined)e.hidden=false;var i=function(t,s){i.superclass.constructor.apply(this,arguments);this.id=e.id;this.title=e.name;if(e.iconClassName)this.className+=" "+e.iconClassName;if(e.action)this.action=e.action;if(e.disabledForTextarea!==undefined)this.disabledForTextarea=e.disabledForTextarea;this.Create();if(e.src)this.pCont.firstChild.style.background='url("'+e.src+'") no-repeat scroll 0 0';if(s)s.appendChild(this.GetCont())};BX.extend(i,t.BXHtmlEditor.Button);if(e.handler)i.prototype.OnClick=e.handler;t.BXHtmlEditor.Controls[e.id]=i;BX.addCustomEvent(this,"GetControlsMap",function(t){t.push({id:e.id,compact:e.compact,hidden:e.hidden,sort:e.toolbarSort,checkWidth:e.checkWidth==undefined?true:!!e.checkWidth,offsetWidth:e.offsetWidth||32})})},AddCustomParser:function(t){if(this.phpParser&&this.phpParser.AddCustomParser){this.phpParser.AddCustomParser(t)}else{var e=this;BX.addCustomEvent("OnEditorInitedAfter",function(){e.phpParser.AddCustomParser(t)})}},AddParser:function(t){if(t&&t.name&&typeof t.obj=="object"){this.parser.specialParsers[t.name]=t.obj}},InsertHtml:function(t,e){if(!this.synchro.IsFocusedOnTextarea()){this.Focus();if(this.selection.lastCheckedRange&&this.selection.lastCheckedRange.range&&!e){try{this.selection.SetSelection(this.selection.lastCheckedRange.range)}catch(t){}}if(!e){e=this.selection.GetRange()}if(!e&&this.selection.lastRange)e=this.selection.lastRange;if(e){if(!e.collapsed&&e.startContainer==e.endContainer&&e.startContainer.nodeName!=="BODY"){var i=this.util.CheckSurrogateNode(e.startContainer);if(i){this.selection.SetAfter(i)}}this.selection.InsertHTML(t,e);this.selection.ScrollIntoView()}}},ParseContentFromBbCode:function(t){if(this.bbCode){t=this.bbParser.Parse(t);t=this.Parse(t,true,true)}return t},LoadFileDialogs:function(t){var e=this;this.Request({getData:this.GetReqData("load_file_dialogs",{editor_id:this.id}),handler:function(i,s){s=BX.util.trim(s);e.dom.fileDialogsWrap.innerHTML=s;e.fileDialogsLoaded=true;setTimeout(t,100)}})},InitAutosaveHandlers:function(){var t=this,e=this.dom.form;try{BX.addCustomEvent(this,"OnContentChanged",function(){e.BXAUTOSAVE.Init()});BX.addCustomEvent(e,"onAutoSave",function(e,i){if(t.IsShown()&&!t.IsSubmited()){i[t.config.inputName]=t.GetContent()}});BX.addCustomEvent(e,"onAutoSaveRestore",function(e,i){if(t.IsShown()){t.SetContent(i[t.config.inputName],true)}})}catch(t){}},InitImageUploader:function(){if(this.config.uploadImagesFromClipboard!==false){var t=this.config.actionUrl;t+=(t.indexOf("?")!==-1?"&":"?")+"action=uploadfile";this.imageUploader=BX.Uploader.getInstance({id:this.CID,streams:1,allowUpload:"A",uploadFileUrl:t,uploadMethod:"immediate",showImage:false,sortItems:false,input:null,placeHolder:null,uploadFormData:"N"});var e=this;BX.addCustomEvent(this,"OnImageDataUriHandle",function(t,i){var s=BX.UploaderUtils.dataURLToBlob(i.src);if(s&&s.size>0&&s.type.indexOf("image/")==0){s.name=s.name||i.title||this.GetDefaultImageName()+"."+s.type.substr(6);s.uniqId=i.uniqId;s.editorBase64Src=i.src;e.imageUploader.onChange([s])}});BX.addCustomEvent(this.imageUploader,"onFileIsCreated",function(t,i){BX.addCustomEvent(i,"onUploadDone",function(t,i){e.HandleImageDataUriCaughtUploadedCallback({src:t.file.editorBase64Src,uniqId:t.file.uniqId},{src:i.file.uploadedPath})})})}},GetDefaultImageName:function(){var t={value:false};this.On("OnGetDefaultUploadImageName",[t]);if(!t.value){t.value="content-img"}return t.value},InitClipboardHandler:function(){var t=this;this.base64Images=[];function e(i){t.pasteCheckItteration++;var s;for(s=0;s<i.length;s++){if(!i[s].getAttribute("data-bx-paste-check")){if(i[s].complete)t.CheckImage(i[s],false);else BX.bind(i[s],"load",BX.proxy(t.CheckImage,t));i[s].setAttribute("data-bx-paste-check","Y")}}if(t.pasteCheckItteration==1)setTimeout(function(){e(i)},500);else if(t.pasteCheckItteration<15)setTimeout(function(){e(i)},1e3)}BX.bind(this.iframeView.element,"paste",function(i){var s=false,n=i.clipboardData;if(n&&n.items&&!BX.browser.IsFirefox()){var o=n.items[0];if(o&&o.type.indexOf("image/")>-1){var r=o.getAsFile();if(r){var a=new FileReader;a.readAsDataURL(r);a.onload=function(e){s=true;var i=new Image;i.src=e.target.result;setTimeout(function(){t.selection.InsertNode(i);t.HandleImageDataUri(i)},100)}}}}if(!s){var h=t.GetIframeDoc(),l=h.body.getElementsByTagName("IMG");t.pasteCheckItteration=0;e(l)}});BX.addCustomEvent(this,"OnImageDataUriCaughtUploaded",BX.proxy(this.HandleImageDataUriCaughtUploadedCallback,this))},GetBase64Image:function(t){var e,i=false;for(e=0;e<this.base64Images.length;e++){if(this.base64Images[e].source==t){i=this.base64Images[e]}}return i},RegisterBase64Image:function(t,e){this.base64Images.push({source:t,status:e,index:this.base64Images.length})},CheckImage:function(t,e){if(t&&t.getAttribute){var i=t.getAttribute("src");if(i.indexOf("data:image/")!==-1){this.HandleImageDataUri(t)}if(e!==false){BX.unbind(t,"load",BX.proxy(this.CheckImage,this))}}},HandleImageDataUri:function(t){if(!t.getAttribute("data-bx-unique-id")){this.skipPasteControl=true;if(this.pasteControl.isOpened){this.pasteControl.Hide()}var e=this.GetBase64Image(t.src);if(e===false){this.RegisterBase64Image(t.src,"requested");var i="bx_base64_id_"+Math.round(Math.random()*1e9);t.setAttribute("data-bx-unique-id",i);t.removeAttribute("data-bx-orig-src");this.On("OnImageDataUriHandle",[this,{src:t.src,title:t.title||"",uniqId:i}])}else{if(e.status=="uploaded"){this.HandleImageDataUriCaughtUploadedCallback({src:t.src,title:t.title||"",uniqId:e.uniqId},{src:e.fileSrc},e.htmlForInsert||null)}}}},HandleImageDataUriCaughtUploadedCallback:function(t,e,i){if(t&&t.uniqId&&e&&e.src){var s=this.GetBase64Image(t.src);if(s&&!s.fileSrc){s.status="uploaded";s.uniqId=t.uniqId;s.fileSrc=e.src;s.htmlForInsert=i}var n,o,r=this.GetIframeDoc().body.getElementsByTagName("IMG");for(n=0;n<r.length;n++){o=r[n];if(o.getAttribute("data-bx-unique-id")==t.uniqId||o.getAttribute("src")==t.src){if(i&&i.replacement){this.selection.SetAfter(o);this.selection.InsertHTML(i.replacement);BX.remove(o);if(i.callback){setTimeout(i.callback,300)}}else{o.src=e.src;o.setAttribute("src",e.src);o.setAttribute("data-bx-orig-src",e.src);o.removeAttribute("data-bx-paste-check");o.removeAttribute("data-bx-unique-id")}}}}this.skipPasteControl=false}};t.BXEditor=i;function s(t,e){this.callback=t||BX.DoNothing;this.config=e||{};this.editor=this.config.editor;this.iframe=this.CreateIframe();this.bSandbox=false;this.windowProperties=["parent","top","opener","frameElement","frames","localStorage","globalStorage","sessionStorage","indexedDB"];this.windowProperties2=["open","close","openDialog","showModalDialog","alert","confirm","prompt","openDatabase","postMessage","XMLHttpRequest","XDomainRequest"];this.documentProperties=["referrer","write","open","close"]}s.prototype={GetIframe:function(){return this.iframe},GetWindow:function(){this._readyError()},GetDocument:function(){this._readyError()},Destroy:function(){var t=this.GetIframe();t.parentNode.removeChild(t)},_readyError:function(){throw new Error("Sandbox: Sandbox iframe isn't loaded yet")},CreateIframe:function(){var t=this,e=BX.create("IFRAME",{props:{className:"bx-editor-iframe",frameborder:0,allowtransparency:"true",width:0,height:0,marginwidth:0,marginheight:0}});e.onload=function(){e.onreadystatechange=e.onload=null;t.OnLoadIframe(e)};e.onreadystatechange=function(){if(/loaded|complete/.test(e.readyState)){e.onreadystatechange=e.onload=null;t.OnLoadIframe(e)}};this.config.cont.appendChild(e);return e},OnLoadIframe:function(t){if(BX.isNodeInDom(t)){var e=this,i=t.contentWindow,s=i.document;this.InitIframe(t);i.onerror=function(t,e,i){throw new Error("Sandbox: "+t,e,i)};if(this.bSandbox){var n,o;for(n=0,o=this.windowProperties.length;n<o;n++){this._unset(i,this.windowProperties[n])}for(n=0,o=this.windowProperties2.length;n<o;n++){this._unset(i,this.windowProperties2[n],BX.DoNothing())}for(n=0,o=this.documentProperties.length;n<o;n++){this._unset(s,this.documentProperties[n])}this._unset(s,"cookie","",true)}this.loaded=true;setTimeout(function(){e.callback(e)},0)}},InitIframe:function(t){t=this.iframe||t;var e=t.contentWindow.document,i=this.GetHtml(this.config.stylesheets,this.editor.GetTemplateStyles());e.open("text/html","replace");e.write(i);e.close();this.GetWindow=function(){return t.contentWindow};this.GetDocument=function(){return t.contentWindow.document};this.editor.On("OnIframeInit")},GetHtml:function(t,e){var i="",s="",n;if(this.editor.config.bodyClass||this.editor.IsExpanded()){var o=this.editor.config.bodyClass||"";if(this.editor.IsExpanded())o+=" fullscreen";i+=' class="'+BX.util.trim(o)+'"'}if(this.editor.config.bodyId){i+=' id="'+this.editor.config.bodyId+'"'}var r=this.editor.GetTemplateParams();if(r&&r["EDITOR_STYLES"]){for(n=0;n<r["EDITOR_STYLES"].length;n++){s+='<link data-bx-template-style="Y" rel="stylesheet" href="'+r["EDITOR_STYLES"][n]+"_"+this.editor.cssCounter+++'">'}}t=typeof t==="string"?[t]:t;if(t){for(n=0;n<t.length;n++){s+='<link rel="stylesheet" href="'+t[n]+'">'}}s+='<link rel="stylesheet" href="'+this.editor.config.cssIframePath+"_"+this.editor.cssCounter+++'">';if(typeof e==="string"){s+='<style type="text/css" data-bx-template-style="Y">'+e+"</style>"}if(this.editor.iframeCssText&&this.editor.iframeCssText.length>0){s+='<style type="text/css">'+this.editor.iframeCssText+"</style>"}return"<!DOCTYPE html><html><head>"+s+"</head><body"+i+"></body></html>"},_unset:function(t,e,i,s){try{t[e]=i}catch(t){}try{t.__defineGetter__(e,function(){return i})}catch(t){}if(s){try{t.__defineSetter__(e,function(){})}catch(t){}}if(!crashesWhenDefineProperty(e)){try{var n={get:function(){return i}};if(s){n.set=function(){}}Object.defineProperty(t,e,n)}catch(t){}}}};function n(e){this.editor=e;this.document=e.sandbox.GetDocument();BX.addCustomEvent(this.editor,"OnIframeReInit",BX.proxy(function(){this.document=this.editor.sandbox.GetDocument()},this));t.rangy.init()}n.prototype={GetBookmark:function(){if(!this.editor.synchro.IsFocusedOnTextarea()){var t=this.GetRange();return t&&t.cloneRange()}return false},SetBookmark:function(t){if(t&&this.editor.currentViewName!=="code"){this.SetSelection(t)}},SaveBookmark:function(){this.lastRange=this.GetBookmark();return this.lastRange},GetLastRange:function(){if(this.lastRange)return this.lastRange},RestoreBookmark:function(){if(this.lastRange){this.SetBookmark(this.lastRange);this.lastRange=false}},SetBefore:function(t){var e=rangy.createRange(this.document);e.setStartBefore(t);e.setEndBefore(t);return this.SetSelection(e)},SetAfter:function(t){var e=rangy.createRange(this.document);e.setStartAfter(t);e.setEndAfter(t);return this.SetSelection(e)},SelectNode:function(t){if(!t)return;var e=rangy.createRange(this.document),i=t.nodeType===1,s="canHaveHTML"in t?t.canHaveHTML:t.nodeName!=="IMG",n=i?t.innerHTML:t.data,o=n===""||n===this.editor.INVISIBLE_SPACE,r=BX.style(t,"display"),a=r==="block"||r==="list-item";if((BX.browser.IsIE()||BX.browser.IsIE10()||BX.browser.IsIE11())&&t&&BX.util.in_array(t.nodeName.toUpperCase(),this.editor.TABLE_TAGS)){if(t.tagName=="TABLE"||t.tagName=="TBODY"){var h=t.rows[0],l=t.rows[t.rows.length-1];e.setStartBefore(h.cells[0]);e.setEndAfter(l.cells[l.cells.length-1])}else if(t.tagName=="TR"||t.tagName=="TH"){e.setStartBefore(t.cells[0]);e.setEndAfter(t.cells[t.cells.length-1])}else{e.setStartBefore(t);e.setEndAfter(t)}this.SetSelection(e);return e}if(o&&i&&s){try{t.innerHTML=this.editor.INVISIBLE_SPACE}catch(t){}}if(s)e.selectNodeContents(t);else e.selectNode(t);if(s&&o&&i){e.collapse(a)}else if(s&&o){e.setStartAfter(t);e.setEndAfter(t)}try{this.SetSelection(e)}catch(t){}return e},GetSelectedNode:function(t){var e,i,s;if(t&&this.document.selection&&this.document.selection.type==="Control"){s=this.document.selection.createRange();if(s&&s.length){e=s.item(0)}}if(!e){i=this.GetSelection();if(i.focusNode===i.anchorNode){e=i.focusNode}}if(!e){s=this.GetRange();e=s?s.commonparentContainer:this.document.body}if(e&&e.ownerDocument!=this.editor.GetIframeDoc()){e=this.document.body}return e},ExecuteAndRestore:function(t,e){var i=this.document.body,s=e&&i.scrollTop,n=e&&i.scrollLeft,o="_bx-editor-temp-placeholder",r='<span class="'+o+'">'+this.editor.INVISIBLE_SPACE+"</span>",a=this.GetRange(),h;if(!a){t(i,i);return}var l=a.createContextualFragment(r);a.insertNode(l);try{t(a.startContainer,a.endContainer)}catch(t){setTimeout(function(){throw t},0)}if(document.querySelector){var d=this.document.querySelector("."+o);if(d){h=rangy.createRange(this.document);h.selectNode(d);h.deleteContents();this.SetSelection(h)}else{i.focus()}}if(e){i.scrollTop=s;i.scrollLeft=n}try{if(d&&d.parentNode)d.parentNode.removeChild(d)}catch(t){}},ExecuteAndRestoreSimple:function(t){var e=this.GetRange(),i=this.document.body,s,n,o,r,a;if(!e){t(i,i);return}r=e.getNodes([3]);n=r[0]||e.startContainer;o=r[r.length-1]||e.endContainer;a={collapsed:e.collapsed,startContainer:n,startOffset:n===e.startContainer?e.startOffset:0,endContainer:o,endOffset:o===e.endContainer?e.endOffset:o.length};try{t(e.startContainer,e.endContainer)}catch(t){setTimeout(function(){throw t},0)}s=rangy.createRange(this.document);try{s.setStart(a.startContainer,a.startOffset)}catch(t){}try{s.setEnd(a.endContainer,a.endOffset)}catch(t){}try{this.SetSelection(s)}catch(t){}},InsertHTML:function(t,e){var i=rangy.createRangyRange(this.document),s=i.createContextualFragment(t),n=s.lastChild;this.InsertNode(s,e);if(n){this.SetAfter(n)}this.editor.On("OnInsertHtml")},InsertNode:function(t,e){if(!e||!e.isValid||!e.isValid())e=this.GetRange();if(e){e.insertNode(t)}this.editor.On("OnInsertHtml")},RemoveNode:function(t){this.editor.On("OnHtmlContentChangedByControl");var e=t.parentNode,i=t.nextSibling;BX.remove(t);this.editor.util.Refresh(e);if(i){this.editor.selection.SetBefore(i);this.editor.Focus()}this.editor.synchro.StartSync(100)},Surround:function(t,e){e=e||this.GetRange();if(e){try{e.surroundContents(t);this.SelectNode(t)}catch(i){t.appendChild(e.extractContents());e.insertNode(t)}}},ScrollIntoView:function(){var t,e=this,i=this.document,s=this.editor.sandbox.GetWindow(),n=i.documentElement.scrollHeight>i.documentElement.offsetHeight;if(n&&s){var o=i.__scrollIntoViewElement=i.__scrollIntoViewElement||function(){return BX.create("SPAN",{html:e.editor.INVISIBLE_SPACE},i)}(),r=0;this.InsertNode(o);if(o.parentNode){t=o;do{r+=t.offsetTop||0;t=t.offsetParent}while(t);o.parentNode.removeChild(o)}var a=BX.GetWindowScrollPos(i),h=BX.GetWindowInnerSize(i);if(r>a.scrollTop+h.innerHeight-40){s.scrollTo(a.scrollLeft,r)}}},SelectLine:function(){var e="getSelection"in t&&"modify"in t.getSelection();if(e){var i=this.document.defaultView,s=i.getSelection();s.modify("move","left","lineboundary");s.modify("extend","right","lineboundary")}else if(this.document.selection){var n=this.document.selection.createRange(),o=n.boundingTop,r=n.boundingHeight,a=this.document.body.scrollWidth,h,l,d,c,u;if(!n.moveToPoint)return;if(o===0){d=this.document.createElement("span");this.insertNode(d);o=d.offsetTop;d.parentNode.removeChild(d)}o+=1;for(c=-10;c<a;c+=2){try{n.moveToPoint(c,o);break}catch(t){}}h=o;l=this.document.selection.createRange();for(u=a;u>=0;u--){try{l.moveToPoint(u,h);break}catch(t){}}n.setEndPoint("EndToEnd",l);n.select()}},GetText:function(){var t=this.GetSelection();return t?t.toString():""},GetNodes:function(t,e){var i=this.GetRange();if(i)return i.getNodes([t],e);else return[]},GetRange:function(t,e){if(!t){if(!this.editor.iframeView.IsFocused()&&e!==false){var i=this.editor.GetIframeDoc(),s=i.documentElement.scrollTop||i.body.scrollTop,n=i.documentElement.scrollLeft||i.body.scrollLeft;this.editor.iframeView.Focus();var o=i.documentElement.scrollTop||i.body.scrollTop,r=i.documentElement.scrollLeft||i.body.scrollLeft;if(o!==s||r!==n){var a=this.editor.sandbox.GetWindow();if(a)a.scrollTo(n,s)}}t=this.GetSelection()}var h=t&&t.rangeCount&&t.getRangeAt(0);if(h.commonAncestorContainer&&h.commonAncestorContainer.nodeName=="#document"){h.selectNodeContents(this.editor.GetIframeDoc().body)}return h},GetSelection:function(t){return rangy.getSelection(t||this.document.defaultView||this.document.parentWindow)},SetSelection:function(t){var e=this.document.defaultView||this.document.parentWindow,i=rangy.getSelection(e);return i.setSingleRange(t)},GetStructuralTags:function(){if(!this.structuralTags){var t=/^TABLE/i;this.structuralTags={LI:/^UL|OL|MENU/i,DT:/^DL/i,DD:/^DL/i,TD:t,TR:t,TH:t,TBODY:t,TFOOT:t,THEAD:t,CAPTION:t,COL:t,COLGROUP:t};this.structuralTagsMatchRe=/^LI|DT|DD|TD|TR|TH|TBODY|CAPTION|COL|COLGROUP|TFOOT|THEAD/i}return this.structuralTags},SetCursorBeforeNode:function(t){},_GetNonTextLastChild:function(t){var e=t.lastChild;while(e.nodeType!=1&&e.previousSibling)e=e.previousSibling;return e.nodeType==1?e:false},_GetNonTextFirstChild:function(t){var e=t.firstChild;while(e.nodeType!=1&&e.nextSibling)e=e.nextSibling;return e.nodeType==1?e:false},_MoveCursorBeforeNode:function(t){var e=this,i,s,n;this.GetStructuralTags();if(t.nodeType==1&&t.nodeName.match(this.structuralTagsMatchRe)){n=this._GetNonTextFirstChild(t.parentNode)===t;if(!n){return}i=this.structuralTags[t.nodeName];if(i){s=BX.findParent(t,function(t){if(t.nodeName.match(i)){return true}n=n&&e._GetNonTextFirstChild(t.parentNode)===t;return false},t.ownerDocument.BODY);if(s&&n){t=s}else{return}}}this.SetInvisibleTextBeforeNode(t)},_MoveCursorAfterNode:function(t){var e=this,i,s,n;this.GetStructuralTags();if(t.nodeType==1&&t.nodeName.match(this.structuralTagsMatchRe)){n=this._GetNonTextLastChild(t.parentNode)===t;if(!n){return}i=this.structuralTags[t.nodeName];if(i){s=BX.findParent(t,function(t){if(t.nodeName.match(i)){return true}n=n&&e._GetNonTextLastChild(t.parentNode)===t;return false},t.ownerDocument.BODY);if(s&&n){t=s}else{return}}}this.SetInvisibleTextAfterNode(t)},SaveRange:function(t){var e=this.GetRange(false,t);if(e){this.lastCheckedRange={endOffset:e.endOffset,endContainer:e.endContainer,range:e}}else{setTimeout(BX.proxy(this.SaveRange,this),0)}},CheckLastRange:function(t){return this.lastCheckedRange&&this.lastCheckedRange.endOffset==t.endOffset&&this.lastCheckedRange.endContainer==t.endContainer},SetInvisibleTextAfterNode:function(t,e){var i=this.editor.util.GetInvisibleTextNode();if(t.nextSibling&&t.nextSibling.nodeType==3&&this.editor.util.IsEmptyNode(t.nextSibling)){this.editor.util.ReplaceNode(t.nextSibling,i)}else{this.editor.util.InsertAfter(i,t)}if(e){this.SetBefore(i)}else{this.SetAfter(i)}this.editor.Focus()},SetInvisibleTextBeforeNode:function(t){var e=this.editor.util.GetInvisibleTextNode();if(t.previousSibling&&t.previousSibling.nodeType==3&&this.editor.util.IsEmptyNode(t.previousSibling)){this.editor.util.ReplaceNode(t.previousSibling,e)}else{t.parentNode.insertBefore(e,t)}this.SetBefore(e);this.editor.Focus()},GetCommonAncestorForRange:function(t){return t.collapsed?t.startContainer:rangy.dom.getCommonAncestor(t.startContainer,t.endContainer)}};function o(t){this.isElementMerge=t.nodeType==1;this.firstTextNode=this.isElementMerge?t.lastChild:t;this.firstNode=t;this.textNodes=[this.firstTextNode]}o.prototype={DoMerge:function(){var t,e=this.textNodes.length,i=[],s,n,o;for(t=0;t<e;++t){s=this.textNodes[t];if(this.textNodes[t].nodeType!==3){return false}n=s.parentNode;i[t]=s.data;if(t){n.removeChild(s);if(!n.hasChildNodes())n.parentNode.removeChild(n)}}this.firstTextNode.data=o=i.join("");return o},GetLength:function(){var t=this.textNodes.length,e=0;while(t--)e+=this.textNodes[t].length;return e}};function r(t,e,i,s,n){this.editor=t;this.document=t.iframeView.document;this.tagNames=e||[defaultTagName];this.arStyle=i||{};this.cssClass=s||"";this.similarClassRegExp=null;this.normalize=n;this.applyToAnyTagName=false}r.prototype={GetStyledParent:function(t,e){e=e!==false;var i,s;while(t){if(t.nodeType==1){s=this.CheckCssStyle(t,e);i=this.CheckCssClass(t);if(BX.util.in_array(t.tagName.toLowerCase(),this.tagNames)&&i&&s)return t}t=t.parentNode}return false},CheckCssStyle:function(t,e){return this.editor.util.CheckCss(t,this.arStyle,e)},SimplifyNodesWithCss:function(t){var e,i=t.parentNode;if(i.childNodes.length==1){if(t.nodeName==i.nodeName){for(e in this.arStyle){if(this.arStyle.hasOwnProperty(e)&&t.style[e]){i.style[e]=t.style[e]}}this.editor.util.ReplaceWithOwnChildren(t)}else{for(e in this.arStyle){if(this.arStyle.hasOwnProperty(e)&&i.style[e]&&t.style[e]){i.style[e]=""}}}}},CheckCssClass:function(t){return!this.cssClass||this.cssClass&&BX.hasClass(t,this.cssClass)},PostApply:function(t,e){var i,s=t[0],n=t[t.length-1],r=[],a,h=s,l=n,d=0,c=n.length,u,f;for(i=0;i<t.length;++i){u=t[i];f=this.GetAdjacentMergeableTextNode(u.parentNode,false);if(f){if(!a){a=new o(f);r.push(a)}a.textNodes.push(u);if(u===s){h=a.firstTextNode;d=h.length}if(u===n){l=a.firstTextNode;c=a.GetLength()}}else{a=null}}var m=this.GetAdjacentMergeableTextNode(n.parentNode,true);if(m){if(!a){a=new o(n);r.push(a)}a.textNodes.push(m)}if(r.length){for(i=0;i<r.length;++i)r[i].DoMerge();e.setStart(h,d);e.setEnd(l,c)}t=e.getNodes([3]);for(i=0;i<t.length;++i){u=t[i];this.SimplifyNodesWithCss(u.parentNode)}},NormalizeNewNode:function(t,e){var i=t.parentNode;if(i&&i.nodeName!=="BODY"){var s=this.GetNonEmptyChilds(i),n=this.CheckCssStyle(i,false),o=this.CheckCssClass(i);if(s.length==1&&i.nodeName==t.nodeName&&n&&o){i.parentNode.insertBefore(t,i);BX.remove(i)}}return e},GetNonEmptyChilds:function(t){var e,i=t.childNodes,s=[];for(e=0;e<i.length;e++){if(i[e].nodeType==1||i[e].nodeType==3&&i[e].nodeValue!=""&&i[e].nodeValue!=this.editor.INVISIBLE_SPACE&&!i[e].nodeValue.match(/^[\s\n\r\t]+$/gi)){s.push(i[e])}}return s},GetAdjacentMergeableTextNode:function(t,e){var i=t.nodeType==3,s=i?t.parentNode:t,n,o=e?"nextSibling":"previousSibling";if(i){n=t[o];if(n&&n.nodeType==3){return n}}else{}return null},AreElementsMergeable:function(t,e){return rangy.dom.arrayContains(this.tagNames,(t.tagName||"").toLowerCase())&&rangy.dom.arrayContains(this.tagNames,(e.tagName||"").toLowerCase())&&t.className.replace(/\s+/g," ")==e.className.replace(/\s+/g," ")&&this.CompareNodeAttributes(t,e)},CompareNodeAttributes:function(t,e){if(t.attributes.length!=e.attributes.length)return false;var i,s=t.attributes.length,n,o,r;for(i=0;i<s;i++){n=t.attributes[i];r=n.name;if(r!="class"){o=e.attributes.getNamedItem(r);if(n.specified!=o.specified)return false;if(n.specified&&n.nodeValue!==o.nodeValue){return false}}}return true},CreateContainer:function(){var t=this.document.createElement(this.tagNames[0]);if(this.cssClass){t.className=this.cssClass}if(this.arStyle){for(var e in this.arStyle){if(this.arStyle.hasOwnProperty(e)){t.style[e]=this.arStyle[e]}}}return t},ApplyToTextNode:function(t){var e=t.parentNode,i;if(e.childNodes.length==1&&BX.util.in_array(e.tagName.toLowerCase(),this.tagNames)){if(this.cssClass){BX.addClass(e,this.cssClass)}if(this.arStyle){for(i in this.arStyle){if(this.arStyle.hasOwnProperty(i)){e.style[i]=this.arStyle[i]}}}}else{if(e.childNodes.length==1){if(this.cssClass&&BX.hasClass(e,this.cssClass)){BX.removeClass(e,this.cssClass)}if(this.arStyle){for(i in this.arStyle){if(this.arStyle.hasOwnProperty(i)&&e.style[i]){e.style[i]=""}}}}var s=this.CreateContainer();t.parentNode.insertBefore(s,t);s.appendChild(t)}},IsRemovable:function(t){return rangy.dom.arrayContains(this.tagNames,t.tagName.toLowerCase())&&BX.util.trim(t.className)==this.cssClass},IsAvailableTextNodeParent:function(t){return t&&t.nodeName&&t.nodeName!=="OL"&&t.nodeName!=="UL"&&t.nodeName!=="MENU"&&t.nodeName!=="TBODY"&&t.nodeName!=="TFOOT"&&t.nodeName!=="THEAD"&&t.nodeName!=="TABLE"&&t.nodeName!=="DL"},UndoToTextNode:function(t,e,i){if(!e.containsNode(i)){var s=e.cloneRange();s.selectNode(i);BX.isParentForNode(i,e.endContainer);if(e.endContainer.nodeName!=="BODY"&&s.isPointInRange(e.endContainer,e.endOffset)&&this.editor.util.IsSplitPoint(e.endContainer,e.endOffset)&&BX.isParentForNode(i,e.endContainer)){this.editor.util.SplitNodeAt(i,e.endContainer,e.endOffset);e.setEndAfter(i)}if(e.startContainer.nodeName!=="BODY"&&s.isPointInRange(e.startContainer,e.startOffset)&&this.editor.util.IsSplitPoint(e.startContainer,e.startOffset)&&BX.isParentForNode(i,e.startContainer)){i=this.editor.util.SplitNodeAt(i,e.startContainer,e.startOffset)}}if(i&&i.nodeName!="BODY"&&this.IsRemovable(i)){if(this.arStyle){for(var n in this.arStyle){if(this.arStyle.hasOwnProperty(n)&&i.style[n]){i.style[n]=""}}}if(!i.style.cssText||BX.util.trim(i.style.cssText)===""){this.editor.util.ReplaceWithOwnChildren(i)}else if(this.tagNames.length>1||this.tagNames[0]!=="span"){this.editor.util.RenameNode(i,"span")}}},ApplyToRange:function(t){var e=t.getNodes([3]);if(!e.length){try{var i=this.CreateContainer();t.surroundContents(i);t=this.NormalizeNewNode(i,t);this.SelectNode(t,i);return t}catch(t){}}t.splitBoundaries();e=t.getNodes([3]);if(!e.length&&t.collapsed&&t.startContainer==t.endContainer){var s=this.editor.util.GetInvisibleTextNode();this.editor.selection.InsertNode(s);e=[s]}if(e.length){var n;for(var o=0,r=e.length;o<r;++o){n=e[o];if(!this.GetStyledParent(n)&&this.IsAvailableTextNodeParent(n.parentNode)){this.ApplyToTextNode(n)}}t.setStart(e[0],0);n=e[e.length-1];t.setEnd(n,n.length);if(this.normalize){this.PostApply(e,t)}}return t},UndoToRange:function(t,e){var i=t.getNodes([3]),s,n;e=e!==false;if(i.length){t.splitBoundaries();i=t.getNodes([3])}else{var o=this.editor.util.GetInvisibleTextNode();t.insertNode(o);t.selectNode(o);i=[o]}var r,a,h=[];for(r=0,a=i.length;r<a;r++){h.push({node:i[r],nesting:this.GetNodeNesting(i[r])})}h=h.sort(function(t,e){return e.nesting-t.nesting});for(r=0,a=h.length;r<a;r++){s=h[r].node;n=this.GetStyledParent(s,e);if(n){this.UndoToTextNode(s,t,n);t=this.editor.selection.GetRange()}}if(a==1){this.SelectNode(t,i[0])}else{t.setStart(i[0],0);t.setEnd(i[i.length-1],i[i.length-1].length);this.editor.selection.SetSelection(t);if(this.normalize){this.PostApply(i,t)}}return t},GetNodeNesting:function(t){return this.editor.util.GetNodeDomOffset(t)},SelectNode:function(t,e){var i=e.nodeType===1,s="canHaveHTML"in e?e.canHaveHTML:true,n=i?e.innerHTML:e.data,o=n===""||n===this.editor.INVISIBLE_SPACE;if(o&&i&&s){try{e.innerHTML=this.editor.INVISIBLE_SPACE}catch(t){}}t.selectNodeContents(e);if(o&&i){t.collapse(false)}else if(o){t.setStartAfter(e);t.setEndAfter(e)}},GetTextSelectedByRange:function(t,e){var i=e.cloneRange();i.selectNodeContents(t);var s=i.intersection(e);var n=s?s.toString():"";i.detach();return n},IsAppliedToRange:function(t,e){var i=[],s,n=t.getNodes([3]);e=e!==false;if(!n.length){s=this.GetStyledParent(t.startContainer,e);return s?[s]:false}var o,r;for(o=0;o<n.length;++o){r=this.GetTextSelectedByRange(n[o],t);s=this.GetStyledParent(n[o],e);if(r!=""&&!s){return false}else{i.push(s)}}return i},ToggleRange:function(t){return this.IsAppliedToRange(t)?this.UndoToRange(t):this.ApplyToRange(t)}};function a(t){this.editor=t;this.history=[this.editor.iframeView.GetValue()];this.position=1;this.document=t.sandbox.GetDocument();this.historyLength=30;BX.addCustomEvent(this.editor,"OnIframeReInit",BX.proxy(function(){this.document=this.editor.sandbox.GetDocument()},this));this.Init()}a.prototype={Init:function(){var t=this;BX.addCustomEvent(this.editor,"OnHtmlContentChangedByControl",BX.delegate(this.Transact,this));BX.addCustomEvent(this.editor,"OnIframeNewWord",BX.delegate(this.Transact,this));BX.addCustomEvent(this.editor,"OnIframeKeyup",BX.delegate(this.Transact,this));BX.addCustomEvent(this.editor,"OnBeforeCommandExec",function(e){if(e){t.Transact()}});BX.addCustomEvent(this.editor,"OnIframeKeydown",BX.proxy(this.Keydown,this))},Keydown:function(t,e,i,s){if((t.ctrlKey||t.metaKey)&&!t.altKey){var n=e===this.editor.KEY_CODES["z"]&&!t.shiftKey,o=e===this.editor.KEY_CODES["z"]&&t.shiftKey||e===this.editor.KEY_CODES["y"];if(n){this.Undo();return BX.PreventDefault(t)}else if(o){this.Redo();return BX.PreventDefault(t)}}if(e!==this.lastKey){if(e===this.editor.KEY_CODES["backspace"]||e===this.editor.KEY_CODES["delete"]){this.Transact()}this.lastKey=e}},Transact:function(){var t=this.history[this.position-1],e=this.editor.iframeView.GetValue();if(e!==t){var i=this.history.length=this.position;if(i>this.historyLength){this.history.shift();this.position--}this.position++;this.history.push(e);this.CheckControls()}},Undo:function(){if(this.position>1){this.Transact();this.position--;this.Set(this.history[this.position-1]);this.editor.On("OnUndo");this.CheckControls()}},Redo:function(){if(this.position<this.history.length){this.position++;this.Set(this.history[this.position-1]);this.editor.On("OnRedo");this.CheckControls()}},Set:function(t){this.editor.iframeView.SetValue(t);this.editor.Focus(true)},CheckControls:function(){this.editor.On("OnEnableUndo",[this.position>1]);this.editor.On("OnEnableRedo",[this.position<this.history.length])}};function h(t){this.editor=t;this.arStyles={};this.sStyles=""}h.prototype={GetIframe:function(t){if(!this.cssIframe){this.cssIframe=this.CreateIframe(t)}return this.cssIframe},CreateIframe:function(t){this.cssIframe=document.body.appendChild(BX.create("IFRAME",{props:{className:"bx-editor-css-iframe"}}));this.iframeDocument=this.cssIframe.contentDocument||this.cssIframe.contentWindow.document;this.iframeDocument.open("text/html","replace");this.iframeDocument.write('<!DOCTYPE html><html><head><style type="text/css" data-bx-template-style="Y">'+t+"</style></head><body></body></html>");this.iframeDocument.close();return this.cssIframe},GetCSS:function(t,e,i,s){if(!this.arStyles[t]){if(!this.cssIframe){this.cssIframe=this.CreateIframe(e)}else{var n,o=this.iframeDocument,r=o.head||o.getElementsByTagName("HEAD")[0],a=r.getElementsByTagName("STYLE");for(n=0;n<a.length;n++){if(a[n].getAttribute("data-bx-template-style")=="Y")BX.cleanNode(a[n],true)}if(e){r.appendChild(BX.create("STYLE",{props:{type:"text/css"},text:e},o)).setAttribute("data-bx-template-style","Y")}}this.arStyles[t]=this.ParseCss()}var h=this.arStyles[t];if(s){var l=[],d;if(typeof s!="object"){s=[s]}s.push("DEFAULT");for(n=0;n<s.length;n++){d=s[n];if(h[d]&&typeof h[d]=="object"){l=l.concat(h[d])}}h=l}return h},ParseCss:function(){var t=this.iframeDocument,e=[],i={},s,n,o,r,a,h,l,d,c,u,f;if(!t.styleSheets){return i}var m=t.styleSheets,p=this.editor.GetStylesDescription();for(r=0,c=m.length;r<c;r++){s=m[r].rules?m[r].rules:m[r].cssRules;for(a=0,u=s.length;a<u;a++){if(s[a].type!=s[a].STYLE_RULE){continue}n=s[a].selectorText;o=n.split(",");for(h=0,f=o.length;h<f;h++){l=o[h].split(" ");l=l[l.length-1].trim();if(l.substr(0,1)=="."){l=l.substr(1);d="DEFAULT"}else{d=l.split(".");l=d.length>1?d[1]:"";d=d[0].toUpperCase()}if(!e[l]){e[l]=true;if(!i[d]){i[d]=[]}i[d].push({className:l,classTitle:p[l]||null,original:o[h],cssText:s[a].style.cssText})}}}}return i}};e={classes:{},tags:{b:{clean_empty:true},strong:{clean_empty:true},i:{clean_empty:true},em:{clean_empty:true},u:{clean_empty:true},del:{clean_empty:true},s:{rename_tag:"del"},strike:{rename_tag:"del"},h1:{},h2:{},h3:{},h4:{},h5:{},h6:{},span:{clean_empty:true},p:{},br:{},div:{},hr:{},nobr:{},code:{},section:{},figure:{},figcaption:{},fieldset:{},legend:{},menu:{rename_tag:"ul"},ol:{},ul:{},li:{},pre:{},table:{},tr:{},td:{check_attributes:{rowspan:"numbers",colspan:"numbers"}},tbody:{},tfoot:{},thead:{},th:{check_attributes:{rowspan:"numbers",colspan:"numbers"}},caption:{},col:{},colgroup:{},dl:{rename_tag:""},dd:{rename_tag:""},dt:{rename_tag:""},iframe:{},noindex:{},font:{rename_tag:"span",convert_attributes:{face:"fontFamily",size:"fontSize",color:"color"},replace_with_children:1},embed:{},noembed:{},object:{},param:{},sup:{},sub:{},address:{},nav:{},aside:{},article:{},main:{},acronym:{},abbr:{},label:{},time:{},small:{},big:{},details:{},summary:{},footer:{},video:{},source:{},audio:{},title:{remove:1},area:{remove:1},command:{remove:1},noframes:{remove:1},bgsound:{remove:1},basefont:{remove:1},head:{remove:1},track:{remove:1},wbr:{remove:1},noscript:{remove:1},svg:{remove:1},keygen:{remove:1},meta:{remove:1},isindex:{remove:1},base:{remove:1},canvas:{remove:1},applet:{remove:1},spacer:{remove:1},frame:{remove:1},style:{remove:1},device:{remove:1},xml:{remove:1},nextid:{remove:1},link:{remove:1},script:{remove:1},comment:{remove:1},frameset:{remove:1},multicol:{rename_tag:"div"},map:{rename_tag:"div"},body:{rename_tag:"div"},html:{rename_tag:"div"},hgroup:{rename_tag:"div"},listing:{rename_tag:"div"},header:{rename_tag:"div"},rt:{rename_tag:"span"},xmp:{rename_tag:"span"},bdi:{rename_tag:"span"},progress:{rename_tag:"span"},dfn:{rename_tag:"span"},rb:{rename_tag:"span"},mark:{rename_tag:"span"},output:{rename_tag:"span"},marquee:{rename_tag:"span"},rp:{rename_tag:"span"},var:{rename_tag:"span"},tt:{rename_tag:"span"},blink:{rename_tag:"span"},plaintext:{rename_tag:"span"},kbd:{rename_tag:"span"},meter:{rename_tag:"span"},datalist:{rename_tag:"span"},samp:{rename_tag:"span"},bdo:{rename_tag:"span"},ruby:{rename_tag:"span"},ins:{rename_tag:"span"},optgroup:{rename_tag:"span"},form:{},option:{},select:{},textarea:{},button:{},input:{},dir:{rename_tag:"ul"},a:{},img:{check_attributes:{width:"numbers",alt:"alt",src:"url",height:"numbers"},add_class:{align:"align_img"}},q:{check_attributes:{cite:"url"}},blockquote:{check_attributes:{cite:"url"}},center:{rename_tag:"div",add_css:{textAlign:"center"}},cite:{}}}})(window);
/* End */
;
//# sourceMappingURL=kernel_htmleditor.map.js