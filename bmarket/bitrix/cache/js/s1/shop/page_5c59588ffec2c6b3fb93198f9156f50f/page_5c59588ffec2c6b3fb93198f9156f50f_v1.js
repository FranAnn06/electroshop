
; /* Start:"a:4:{s:4:"full";s:86:"/local/templates/shop/components/bitrix/catalog.element/detail/script.js?1597091650567";s:6:"source";s:72:"/local/templates/shop/components/bitrix/catalog.element/detail/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
const name=document.getElementById('name');
const email=document.getElementById('email');
const comment=document.getElementById('comment');
const errorElement=document.getElementById('error')
comment.addEventListener('submit',(e)=>{
    let messages=[]
    if(email.value==='' || email.value==null){
        messages.push('email is required')
    }
    if(messages.length>0){
        e.preventDefault();
        errorElement.InnerText=messages.join(', ')
    }
    if(name.value==='' || name.value==null){
        name.value="NoName";
    }


})


/* End */
;
; /* Start:"a:4:{s:4:"full";s:99:"/local/templates/shop/components/bitrix/forum.topic.reviews/Forum_comment/script.js?159706577221180";s:6:"source";s:83:"/local/templates/shop/components/bitrix/forum.topic.reviews/Forum_comment/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(window){
	BX.namespace("BX.Forum");
	var FTRList = function (params) {
		this.id = 'FTRList' + params.form.id;
		this.mess = {};
		this.form = params.form;
		if (!!params["id"]) {
			for (var ii = 0; ii < params["id"].length; ii++) {
				this.bind(params["id"][ii]);
			}
		}
		this.params = {
			preorder: (params.preorder == "Y"),
			pageNumber: params.pageNumber,
			pageCount: params.pageCount
		};
		BX.addCustomEvent(this.form, 'onAdd', BX.delegate(this.add, this));
		BX.addCustomEvent(this.form, 'onRequest', BX.delegate(function () {
			if (typeof this.params.pageNumber != 'undefined') {
				var pageNumberInput = this.form.elements["pageNumber"];
				if (!pageNumberInput) {
					pageNumberInput = BX.create("input", {props: {type: "hidden", name: 'pageNumber'}});
					this.form.appendChild(pageNumberInput);
				}
				pageNumberInput.value = this.params.pageNumber;
			}
			if (typeof this.params.pageCount != 'undefined') {
				var pageCountInput = BX.findChild(this.form, {attr: {name: 'pageCount'}});
				if (!pageCountInput) {
					pageCountInput = BX.create("input", {props: {type: "hidden", name: 'pageCount'}});
					this.form.appendChild(pageCountInput);
				}
				pageCountInput.value = this.params.pageCount;
			}
		}, this));
		BX.addCustomEvent(this.form, 'onResponse', BX.delegate(function () {
			var input_pageno = BX.findChild(this.form, { 'attr': { 'name': 'pageNumber' }}, true);
			if (input_pageno) {
				BX.remove(input_pageno);
			}
		}, this));
	};
	FTRList.prototype = {
		add : function(id, result)
		{
			var
				container = BX(this.form.id + 'container'),
				listform,
				post = {className: /reviews-reply-form|reviews-collapse/},
				msgNode = window.fTextToNode(result.message);
			if (! container)
			{
				container = BX.create('div', {
					'attrs' : {
						'id' : this.form.id + 'container'},
					'props': {
						'className': 'reviews-block-container reviews-reviews-block-container'},
					'children': [
						BX.create('div', {
							'props': {
								'className': 'reviews-block-outer'
							},
							'children': [
								BX.create('div', {
									'props': {
										'className': 'reviews-block-inner'
									}
								})
							]
						})
					]
				});
				window.fReplaceOrInsertNode(container, null, BX.findChild(document, post, true).parentNode, post);
				container = BX(this.form.id + 'container');
			}
			listform = (container ? BX.findChild(container, {className: 'reviews-block-inner'}, true) : null);
			if (msgNode && listform)
			{
				if (!!result["allMessages"])
				{
					window.fReplaceOrInsertNode(msgNode, listform, BX.findChild(document, post, true).parentNode, post);

					if (!!result.navigation && !!result.pageNumber)
					{
						var navDIV = window.fTextToNode(result.navigation), i,
							navPlaceholders = (navDIV ? BX.findChildren(container.parentNode, { className : 'reviews-navigation-box' } , true) : null);
						if (navDIV)
						{
							if (!navPlaceholders) // then add ...
							{
								container.parentNode.insertBefore(BX.create('div', {props:{className:"reviews-navigation-box reviews-navigation-top"}}), container);
								var tmpDiv = container;
								// bottom
								do {
									tmpDiv = tmpDiv.nextSibling;
								} while (tmpDiv && tmpDiv.nodeType != 1);
								var bottomPager = BX.create('div', {props:{className:"reviews-navigation-box reviews-navigation-bottom"}});
								if (tmpDiv)
									container.parentNode.insertBefore( bottomPager , tmpDiv);
								else
									container.parentNode.appendChild(bottomPager);

								navPlaceholders = BX.findChildren(container.parentNode, { className : 'reviews-navigation-box' } , true);
							}
							for (i = 0; i < navPlaceholders.length; i++)
								navPlaceholders[i].innerHTML = navDIV.innerHTML;
						}

						this.params.pageNumber = result.pageNumber;
						this.params.pageCount = result.pageCount;
					}
					if (result["messagesID"] && typeof result["messagesID"] == "object")
					{
						for (var ii = 0; ii < result["messagesID"].length; ii++)
						{
							if (result["messagesID"][ii] != id)
								this.bind(result["messagesID"][ii]);
						}
					}
				}
				else if (typeof result.message != 'undefined')
				{
					if (this.params.preorder)
						listform.appendChild(msgNode);
					else
						listform.insertBefore(msgNode, listform.firstChild);
				}
				window.fRunScripts(result.message);
				this.bind(id);
			}
		},
		bind : function(id)
		{
			var node = BX('message' + id);
			if (!!node)
			{
				this.mess['m' + id] = {
					node : node,
					author : {
						id : node.getAttribute("bx-author-id"),
						name : node.getAttribute("bx-author-name")
					}
				};

				var buttons = BX.findChildren(node, {tagName : "A", className : "reviews-button-small"}, true),
					func = BX.delegate(function() { var res = BX.proxy_context; this.act(res.getAttribute("bx-act"), id); }, this),
					func2 = BX.delegate(function(){ this.act('reply', id); }, this),
					func3 = BX.delegate(function(){ this.act('quote', id); }, this);
				if (!!buttons && buttons.length > 0)
				{
					for (var ii = 0; ii < buttons.length; ii++)
					{
						if (buttons[ii].getAttribute("bx-act") == "moderate" || buttons[ii].getAttribute("bx-act") == "del")
						{
							BX.adjust(buttons[ii],
								{
									events : { click : func },
									attrs : {
										"bx-href" : buttons[ii].getAttribute("href"),
										href : "javascript:void(0);"
									}
								}
							);
						}
						else if (!!this.form)
						{
							if (buttons[ii].getAttribute("bx-act") == "reply")
							{
								BX.bind(buttons[ii], 'click', func2);
							}
							else if (buttons[ii].getAttribute("bx-act") == "quote")
							{
								BX.bind(buttons[ii], 'mousedown', func3);
							}
						}
					}
				}
			}
		},
		act : function(act, id)
		{
			if (!id || !this.mess['m' + id]) {
				BX.DoNothing();
			}
			else if (act == 'quote') {
				var selection = window.GetSelection();
				if (document["getSelection"])
				{
					selection = selection.replace(/\r\n\r\n/gi, "_newstringhere_").replace(/\r\n/gi, " ");
					selection = selection.replace(/  /gi, "").replace(/_newstringhere_/gi, "\r\n\r\n");
				}

				if (selection === "" && id > 0 && BX('message_text_' + id, true))
				{
					var message = BX('message_text_' + id, true);
					if (typeof(message) == "object" && message)
						selection = message.innerHTML;
				}

				selection = selection.replace(/[\n|\r]*<br(\s)*(\/)*>/gi, "\n");

				// Video
				var videoWMV = function(str, p1)
				{
					var result = ' ';
					var rWmv = /showWMVPlayer.*?bx_wmv_player.*?file:[\s'"]*([^"']*).*?width:[\s'"]*([^"']*).*?height:[\s'"]*([^'"]*).*?/gi;
					var res = rWmv.exec(p1);
					if (res)
						result = "[VIDEO WIDTH="+res[2]+" HEIGHT="+res[3]+"]"+res[1]+"[/VIDEO]";
					if (result == ' ')
					{
						var rFlv = /bxPlayerOnload[\s\S]*?[\s'"]*file[\s'"]*:[\s'"]*([^"']*)[\s\S]*?[\s'"]*height[\s'"]*:[\s'"]*([^"']*)[\s\S]*?[\s'"]*width[\s'"]*:[\s'"]*([^"']*)/gi;
						res = rFlv.exec(p1);
						if (res)
							result = "[VIDEO WIDTH="+res[3]+" HEIGHT="+res[2]+"]"+res[1]+"[/VIDEO]";
					}
					return result;
				}

				selection = selection.replace(/<script[^>]*>/gi, '\001').replace(/<\/script[^>]*>/gi, '\002');
				selection = selection.replace(/\001([^\002]*)\002/gi, videoWMV)
				selection = selection.replace(/<noscript[^>]*>/gi, '\003').replace(/<\/noscript[^>]*>/gi, '\004');
				selection = selection.replace(/\003([^\004]*)\004/gi, " ");

				// Quote & Code & Table
				selection = selection.replace(/<table class\=[\"]*forum-quote[\"]*>[^<]*<thead>[^<]*<tr>[^<]*<th>([^<]+)<\/th><\/tr><\/thead>[^<]*<tbody>[^<]*<tr>[^<]*<td>/gi, "\001");
				selection = selection.replace(/<table class\=[\"]*forum-code[\"]*>[^<]*<thead>[^<]*<tr>[^<]*<th>([^<]+)<\/th><\/tr><\/thead>[^<]*<tbody>[^<]*<tr>[^<]*<td>/gi, "\002");
				selection = selection.replace(/<table class\=[\"]*data-table[\"]*>[^<]*<tbody>/gi, "\004");
				selection = selection.replace(/<\/td>[^<]*<\/tr>(<\/tbody>)*<\/table>/gi, "\003");
				selection = selection.replace(/[\r|\n]{2,}([\001|\002])/gi, "\n$1");

				var ii = 0;
				while(ii++ < 50 && (selection.search(/\002([^\002\003]*)\003/gi) >= 0 || selection.search(/\001([^\001\003]*)\003/gi) >= 0))
				{
					selection = selection.replace(/\002([^\002\003]*)\003/gi, "[CODE]$1[/CODE]").replace(/\001([^\001\003]*)\003/gi, "[QUOTE]$1[/QUOTE]");
				}

				var regexReplaceTableTag = function(s, tag, replacement)
				{
					var re_match = new RegExp("\004([^\004\003]*)("+tag+")([^\004\003]*)\003", "i");
					var re_replace = new RegExp("((?:\004)(?:[^\004\003]*))("+tag+")((?:[^\004\003]*)(?:\003))", "i");
					var ij = 0;
					while((ij++ < 300) && (s.search(re_match) >= 0))
						s = s.replace(re_replace, "$1"+replacement+"$3");
					return s;
				}

				ii = 0;
				while(ii++ < 10 && (selection.search(/\004([^\004\003]*)\003/gi) >= 0))
				{
					selection = regexReplaceTableTag(selection, "<tr>", "[TR]");
					selection = regexReplaceTableTag(selection, "<\/tr>", "[/TR]");
					selection = regexReplaceTableTag(selection, "<td>", "[TD]");
					selection = regexReplaceTableTag(selection, "<\/td>", "[/TD]");
					selection = selection.replace(/\004([^\004\003]*)\003/gi, "[TABLE]$1[/TD][/TR][/TABLE]");
				}

				// Smiles
				if (BX.browser.IsIE())
					selection = selection.replace(/<img(?:(?:\s+alt\s*=\s*\"?smile([^\"\s]+)\"?)|(?:\s+\w+\s*=\s*[^\s>]*))*>/gi, "$1");
				else
					selection = selection.replace(/<img.*?alt=[\"]*smile([^\"\s]+)[\"]*[^>]*>/gi, "$1");

				// Hrefs
				selection = selection.replace(/<a[^>]+href=[\"]([^\"]+)\"[^>]+>([^<]+)<\/a>/gi, "[URL=$1]$2[/URL]");
				selection = selection.replace(/<a[^>]+href=[\']([^\']+)\'[^>]+>([^<]+)<\/a>/gi, "[URL=$1]$2[/URL]");
				selection = selection.replace(/<[^>]+>/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, "\"");

				selection = selection.replace(/(smile(?=[:;8]))/g, "");

				selection = selection.replace(/\&shy;/gi, "");
				selection = selection.replace(/\&nbsp;/gi, " ");
				BX.onCustomEvent(this.form, 'onQuote', [{author : this.mess['m' + id]["author"], id : id, text : selection}]);
			}
			else if (act == 'reply') {
				BX.onCustomEvent(this.form, 'onReply', [{author : this.mess['m' + id]["author"], id : id}]);
			}
			else if (act == 'del' && (!confirm(BX.message('f_cdm')))) {
				BX.DoNothing();
			}
			else if (act == 'moderate' || act == 'del') {
				var
					link = BX.proxy_context,
					href = link.getAttribute("bx-href").replace(/.AJAX_CALL=Y/g,'').replace(/.sessid=[^&]*/g, ''),
					tbl = BX.findParent(link, {'tag' : 'table'}),
					note = BX.create('a', {attrs: { className : 'reply-action-note'}}),
					replyActionDone = function() {
						BX.remove(note);
						BX.show(link.parentNode);
					};

				BX.hide(link.parentNode);
				note.innerHTML = BX.message('f_wait');
				link.parentNode.parentNode.appendChild(note);
				BX.ajax.loadJSON(href,
					{AJAX_CALL : "Y", sessid : BX.bitrix_sessid()},
					BX.delegate(function(res) {
						if (res.status && !!tbl) {
							BX.onCustomEvent(window, 'onForumCommentAJAXAction', [act]);
							if (act == 'del') {
								var curpage = window["curpage"] || top.window.location.href;
								BX.fx.hide(tbl, 'scroll', {time: 0.15, callback_complete: BX.delegate(function() {
									BX.remove(tbl);
									replyActionDone();
									var reviews = BX.findChild(BX(this.form.id + 'container'), {'class': 'reviews-post-table'}, true, true);
									if ((!reviews) || (reviews.length < 1))
										if (this.params.pageNumber > 1)
											BX.reload(curpage);
								}, this)});
							} else {
								var bHidden = BX.hasClass(tbl, 'reviews-post-hidden');
								var label = (bHidden ? BX.message('f_hide') : BX.message('f_show'));
								var tbldiv = BX.findChild(tbl, { className : 'reviews-text'}, true);
								BX.fx.hide(tbldiv, 'fade', {time: 0.1, callback_complete: function() {
									BX.toggleClass(tbl, 'reviews-post-hidden');
									link.innerHTML = label;
									href = href.replace(new RegExp('REVIEW_ACTION='+(bHidden ? 'SHOW' : 'HIDE')), ('REVIEW_ACTION='+(bHidden ? 'HIDE' : 'SHOW')));
									link.setAttribute('bx-href', href);
									BX.fx.show(tbldiv, 'fade', {time: 0.1});
									replyActionDone();
									BX.style(tbldiv, 'background-color', (bHidden ? '#FFFFFF' : '#E5F8E3')); // IE9
								}});
							}
						} else {
							BX.addClass(note, 'error');
							note.innerHTML = '<span class="errortext">'+res.message+'</span>';
						}
					}, this)
				);
			}
			return false;
		}
	};

	var FTRForm = (function(){
		var d = function(params, editor) {
			this.id = 'FTRForm' + params.form.id;
			this.form = params.form;
			this.editor = editor;
			this.windowEvents = {};
			this.params = {
				messageMax : 64000
			};

			this.onsuccess = BX.delegate(this.onsuccess, this);
			this.onfailure = BX.delegate(this.onfailure, this);
			this.submit = BX.delegate(this.submit, this);
			BX.bind(this.form, "submit", this.submit);

			this.isAjax = (params['ajaxPost'] == "Y");

			if (params["captcha"] == "Y")
			{
				var oCaptcha = new Captcha(this.form);
				BX.addCustomEvent(editor, 'OnContentChanged', BX.proxy(oCaptcha.Show, oCaptcha));
				BX.ready(function(){
					BX.bind(BX('forum-refresh-captcha'), 'click', BX.proxy(oCaptcha.Update, oCaptcha));
				});
				if (params["bVarsFromForm"] == "Y")
					oCaptcha.Show();
			}

			BX.addCustomEvent(this.form, 'onQuote', BX.delegate(function(params){this.show(); this.quote(params);}, this));
			BX.addCustomEvent(this.form, 'onReply', BX.delegate(function(params){this.show(); this.paste(params);}, this));
			BX.addCustomEvent(this.form, 'onTransverse', BX.delegate(this.transverse, this));
		};
		d.prototype = {
			submit : function(e) {
				if (this.validate())
				{
					this.prepareForm();
					this.disableButtons(true);

					if (!this.isAjax)
						return true;

					this.send();
				}
				return BX.PreventDefault(e);
			},
			prepareForm : function() {},
			disableButtons : function(state) {
				var arr = this.form.getElementsByTagName("input");
				for (var i=0; i < arr.length; i++)
				{
					if (arr[i].getAttribute("type") == "submit")
						arr[i].disabled = (state !== false);
				}
			},
			validate : function()
			{
				this.editor.SaveContent();
				var errors = "",
					Message = this.editor.GetContent(),
					MessageLength = Message.length,
					MessageMax = 64000;
				if (this.form.TITLE && (this.form.TITLE.value.length <= 0 ))
					errors += BX.message('no_topic_name');
				if (MessageLength <= 0)
					errors += BX.message('no_message');
				else if (MessageLength > MessageMax)
					errors += BX.message('max_len').replace(/#MAX_LENGTH#/gi, MessageMax).replace(/#LENGTH#/gi, MessageLength);

				if (errors !== "")
				{
					alert(errors);
					return false;
				}
				return true;
			},
			busy : false,
			send : function() {
				if (this.busy === true)
					return false;

				this.busy = true;

				if (!this.form.elements["dataType"])
					this.form.appendChild(BX.create("input", {props: {type: "hidden", name: 'dataType', value : "json"}}));

				BX.onCustomEvent(this.form, 'onRequest', [this.form, this]);

				BX.ajax.submitAjax(this.form, {
					method: 'POST',
					url: this.form.action,
					dataType: 'json',
					onsuccess: this.onsuccess,
					onfailure: this.onfailure
				});
				return true;
			},
			onsuccess : function(result) {
				this.busy = false;
				this.disableButtons(false);
				BX.onCustomEvent(this.form, 'onResponse', [this.form, this]);
				this.get(result);
			},
			onfailure : function() {
				BX.onCustomEvent(this.form, 'onResponse', [this.form, this]);
				BX.reload();
			},
			get : function(result) {
				window["curpage"] = window["curpage"] || top.window.location.href;

				BX.onCustomEvent(window, 'onForumCommentAJAXPost', [result, this.form]);

				if (typeof result == 'undefined' || result.reload)
				{
					BX.reload(window["curpage"]);
					return;
				}

				if (result["status"])
				{
					if (!!result["allMessages"] || typeof result["message"] != 'undefined')
					{
						BX.onCustomEvent(this.form, 'onAdd', [result["messageID"], result]);
						this.clear();
					}
					else if (!!result["previewMessage"])
					{
						var previewDIV = BX.findChild(document, {'className': 'reviews-preview'}, true),
							previewParent = BX.findChild(document, {className : /reviews-reply-form|reviews-collapse/}, true).parentNode,
							previewNode = window.fTextToNode(result["previewMessage"]);
						window.fReplaceOrInsertNode(previewNode, previewDIV, previewParent, {'className' : /reviews-reply-form|reviews-collapse/});

						window.PostFormAjaxStatus('');
						window.fRunScripts(result["previewMessage"]);
					}
					var message = (!!result["messageID"] ? BX('message'+result["messageID"]) : null);
					if (message) {
						BX.scrollToNode(message);
					}
				}

				if (result["statusMessage"])
					window.PostFormAjaxStatus(result["statusMessage"]);
			},
			clear : function()
			{
				this.editor.CheckAndReInit('');

				if (this.editor.fAutosave)
					BX.bind(this.editor.pEditorDocument, 'keydown',
						BX.proxy(this.editor.fAutosave.Init, this.editor.fAutosave));
				var previewDIV = BX.findChild(document, {'className' : 'reviews-preview'}, true);
				if (previewDIV)
					BX.remove(previewDIV);

				var i = 0, fileDIV, fileINPUT, fileINPUT1;
				while ((fileDIV = BX('upload_files_'+(i++)+'_' + this.form.index.value)) && fileDIV)
				{
					if ((fileINPUT = BX.findChild(fileDIV, {tagName : 'input'}, true)) && BX(fileINPUT))
					{
						fileINPUT1 = BX.clone(fileINPUT);
						fileINPUT1.value = '';
						fileINPUT.parentNode.insertBefore(fileINPUT1, fileINPUT);
						fileINPUT.parentNode.removeChild(fileINPUT);
					}
					BX.hide(fileDIV);
				}
				var attachLink = BX.findChild(this.form, {'className':"forum-upload-file-attach"}, true);
				if (attachLink)
					BX.show(attachLink);
				var attachNote = BX.findChild(this.form, {'className':"reviews-upload-info"}, true);
				if (attachNote)
					BX.hide(attachNote);

				var captchaIMAGE = null,
					captchaHIDDEN = BX.findChild(this.form, {attr : {'name': 'captcha_code'}}, true),
					captchaINPUT = BX.findChild(this.form, {attr: {'name':'captcha_word'}}, true),
					captchaDIV = BX.findChild(this.form, {'className':'reviews-reply-field-captcha-image'}, true);
				if (captchaDIV)
					captchaIMAGE = BX.findChild(captchaDIV, {'tag':'img'});
				if (captchaHIDDEN && captchaINPUT && captchaIMAGE)
				{
					captchaINPUT.value = '';
					BX.ajax.getCaptcha(function(result) {
						captchaHIDDEN.value = result["captcha_sid"];
						captchaIMAGE.src = '/bitrix/tools/captcha.php?captcha_code='+result["captcha_sid"];
					});
				}
			},
			show : function()
			{
				BX.onCustomEvent(this.form, 'onBeforeShow', [this]);
				BX.show(this.form.parentNode);
				BX.scrollToNode(BX.findChild(this.form, {'attribute': { 'name' : 'send_button' }}, true));
				setTimeout(BX.delegate(function() {
					this.editor.Focus();
					BX.defer(this.editor.Focus, this.editor)();
				}, this), 100);
				BX.onCustomEvent(this.form, 'onAfterShow', [this]);
				return false;
			},
			hide : function()
			{
				BX.onCustomEvent(this.form, 'onBeforeHide', [this]);
				BX.hide(this.form.parentNode);
				BX.onCustomEvent(this.form, 'onAfterHide', [this]);
				return false;
			},
			transverse : function()
			{
				if (this.form.parentNode.style.display == 'none')
					this.show();
				else
					this.hide();
				return false;
			},
			quote : function(params)
			{
				BX.onCustomEvent(this.form, 'onPaste', [params, "QUOTE", this]);
				var author = (params["author"] || null),
					text = (params["text"] || ''),
					res = text;

				if (this.editor.GetViewMode() == 'wysiwyg') // BB Codes
				{
					res = res.replace(/</gi, '&lt;').replace(/>/gi, '&gt;').replace(/\n/g, '<br/>');
					if (author)
					{
						if (author.id > 0)
							author = '<span id="' + this.editor.SetBxTag(false, {tag: "postuser", params: {value : author.id}}) + '" class="bxhtmled-metion">' + author.name.replace(/</gi, '&lt;').replace(/>/gi, '&gt;') + '</span>';
						else
							author = '<span>' + author.name.replace(/</gi, '&lt;').replace(/>/gi, '&gt;') + '</span>';
						author = (author !== '' ? (author + BX.message("f_author") + '<br/>') : '');

						res = author + res;
					}
				}
				else if(this.editor.bbCode && author)
				{
					if (author.id > 0)
						author = "[USER=" + author.id + "]" + author.name + "[/USER]";
					else
						author = author.name;
					author = (author !== '' ? (author + BX.message("f_author") + '\n') : '');
					res = author + res;
				}

				this.editor.action.actions.quote.setExternalSelection(res);
				this.editor.action.Exec('quote');
			},
			paste : function(params)
			{
				BX.onCustomEvent(this.form, 'onPaste', [params, "REPLY", this]);
				var author = (params["author"] || null);
				if (author)
				{
					if(this.editor.GetViewMode() == 'wysiwyg') // WYSIWYG
					{
						var
							doc = this.editor.GetIframeDoc(),
							range = this.editor.selection.GetRange(
/* End */
;
; /* Start:"a:4:{s:4:"full";s:89:"/bitrix/components/bitrix/main.post.form/templates/.default/script.min.js?159569178660303";s:6:"source";s:69:"/bitrix/components/bitrix/main.post.form/templates/.default/script.js";s:3:"min";s:73:"/bitrix/components/bitrix/main.post.form/templates/.default/script.min.js";s:3:"map";s:73:"/bitrix/components/bitrix/main.post.form/templates/.default/script.map.js";}"*/
(function(){if(window["LHEPostForm"])return;var e={controller:{},handler:{},form:{}};BX.addCustomEvent(window,"BFileDLoadFormControllerWasBound",function(t){e.controller[t.id]=true});BX.addCustomEvent(window,"WDLoadFormControllerInit",function(t){e.controller[t.CID]=t});BX.addCustomEvent(window,"WDLoadFormControllerWasBound",function(t){e.controller[t.CID]=true});BX.addCustomEvent(window,"DiskDLoadFormControllerInit",function(t){e.controller[t.CID]=t});BX.addCustomEvent(window,"DiskLoadFormControllerWasBound",function(t){e.controller[t.CID]=true});BX.addCustomEvent(window,"OnEditorInitedBefore",function(t){if(e.handler[t.id]){t.__lhe_flags=["OnEditorInitedBefore"];if(e.handler[t.id]["params"]&&e.handler[t.id]["params"]["LHEJsObjName"])window[e.handler[t.id].params["LHEJsObjName"]]=t;e.handler[t.id].OnEditorInitedBefore(t)}});var t=function(t){if(e.handler[t.id]&&e.handler[t.id].editorIsLoaded!==true){e.handler[t.id].editorIsLoaded=true;e.handler[t.id].exec();BX.onCustomEvent(e.handler[t.id],"OnEditorIsLoaded",[e.handler[t.id],t])}};BX.addCustomEvent(window,"OnCreateIframeAfter",t);BX.addCustomEvent(window,"OnEditorInitedAfter",function(i,n){if(e.handler[i.id]){i.__lhe_flags.push("OnEditorInitedAfter");e.handler[i.id].OnEditorInitedAfter(i);if(e.handler[i.id].editorIsLoaded!==true&&n&&i.sandbox&&i.sandbox.inited)t.apply(i,[i])}});BX.util.object_search=function(e,t){for(var i in t){if(t.hasOwnProperty(i)){if(t[i]==e)return true;else if(typeof t[i]=="object"&&t[i]!==null){var n=BX.util.object_search_key(e,t[i]);if(n!==false)return n}}}return false};var i=function(e,t,i){i=i&&i.length>0?i:[];if(typeof t=="object"&&t.length>0){var n;while((n=t.pop())&&n&&t.length>0){i.push(n)}t=n}i.push(t);this.exist=true;this.bxTag=e;this.tag=t;this.tags=i;this.regexp=new RegExp("\\[("+i.join("|")+")=((?:\\s|\\S)*?)(?:\\s*?WIDTH=(\\d+)\\s*?HEIGHT=(\\d+))?\\]","ig");this.code="["+t+"=#ID##ADDITIONAL#]";this.wysiwyg='<span style="color: #2067B0; border-bottom: 1px dashed #2067B0; margin:0 2px;" id="#ID#"#ADDITIONAL#>#NAME#</span>'},n=function(t,i,n){this.CID=this.id=i;this.parser=t.parser["disk_file"]||null;this.params=n;this.node=BX("diskuf-selectdialog-"+i);this.handler=e.controller[i];this.manager=t;this.eventNode=this.manager.eventNode;this.parserName="disk_file";this.prefixNode="disk-edit-attach";this.prefixHTMLNode="disk-attach-";this.props={valueEditClassName:"wd-inline-file",securityCID:"disk-upload-cid"};this.storage="disk";this.fileToAttach={};this.xmlToAttach={};this.events={onInit:"DiskDLoadFormControllerInit",onShow:"DiskLoadFormController",onBound:"DiskLoadFormControllerWasBound"}};n.prototype={parser:false,eventNode:null,values:{},initialized:false,functionsToExec:[],exec:function(e,t){if(typeof e=="function")this.functionsToExec.push([e,t]);if(this.handler&&this.handler!==true){var i;while((i=this.functionsToExec.shift())&&i)i[0].apply(this,i[1])}},init:function(){if(this.initialized!==true){this.values={};this.functionsToExec=[];this.initialized=true;this.bindMainEvents(this.manager);if(this.parser!==null){this.bindEvents(this.manager);return this.initValues()}}return false},initValues:function(){var e=BX.findChildren(this.node,{className:this.props.valueEditClassName},true);if(e&&e.length>0){this.exec(this.runCheckText);return true}return false},bindMainEvents:function(t){var i=null;BX.addCustomEvent(t.eventNode,"onReinitializeBefore",BX.proxy(this.clean,this));BX.addCustomEvent(t.eventNode,"onShowControllers",BX.proxy(function(e){i=e;BX.onCustomEvent(t.eventNode,this.events.onShow,[e])},this));if(!e.controller[this.id]){var o=BX.delegate(function(e){if(e["UID"]==this.id||e["id"]==this.id){if(i==="show"||i==="hide"){BX.onCustomEvent(t.eventNode,this.events.onShow,[i]);i=null}BX.removeCustomEvent(window,this.events.onBound,o)}},this);BX.addCustomEvent(window,this.events.onBound,o)}if(BX["DD"]&&this.storage=="disk"){var r=BX.delegate(function(e){if((e["UID"]==this.id||e["id"]==this.id)&&this.manager["dropZoneExists"]!==true){BX.removeCustomEvent(window,this.events.onBound,r);this.manager["dropZoneExists"]=true;var i=this.eventNode,o=this.id;n.dndCatcher=n.dndCatcher||{};n.dndCatcher[o]={catch:true,files:[],dropZone:null,dropZoneMicro:null,initdrag:BX.delegate(function(){n.dndCatcher[o].dropZone=new BX.DD.dropFiles(t.eventNode);BX.addCustomEvent(t.eventNode,"OnImageDataUriHandle",function(e,t){if(BX["UploaderUtils"]){var i=BX.UploaderUtils.dataURLToBlob(t.src);if(i&&i.size>0&&i.type.indexOf("image/")==0){i.name=i.name||t.title||"image."+i.type.substr(6);i.referrerToEditor=t;if(n.dndCatcher[o]["catch"]===true)n.dndCatcher[o]["drop"]([i]);else if(this.handler&&this.handler["addFile"])this.handler.addFile(i);BX.onCustomEvent(e,"OnImageDataUriCaught",[t])}}}.bind(this));BX.addCustomEvent(n.dndCatcher[o].dropZone,"dropFiles",n.dndCatcher[o]["drop"]);BX.addCustomEvent(n.dndCatcher[o].dropZone,"dragEnter",n.dndCatcher[o]["dragover"]);BX.addCustomEvent(n.dndCatcher[o].dropZone,"dragLeave",n.dndCatcher[o]["dragleave"]);if(BX("micro"+t.__divId)){n.dndCatcher[o].dropZoneMicro=new BX.DD.dropFiles(BX("micro"+t.__divId));BX.addCustomEvent(n.dndCatcher[o].dropZoneMicro,"dragEnter",function(){BX.onCustomEvent(t.eventNode,"OnShowLHE",["justShow"])})}BX.unbind(document,"dragover",n.dndCatcher[o]["initdrag"]);BX.onCustomEvent(t.eventNode,"onDropZoneExists",[])},this),dragover:BX.delegate(function(){BX.addClass(t.eventNode,"feed-add-post-dnd-over");BX.onCustomEvent(t.eventNode,"dragover",[])},this),dragleave:BX.delegate(function(){BX.removeClass(t.eventNode,"feed-add-post-dnd-over");BX.onCustomEvent(t.eventNode,"dragleave",[])},this),dragenterwindow:BX.delegate(function(){BX.addClass(t.eventNode,"feed-add-post-dnd-ready");if(BX("micro"+t.__divId)){BX.addClass(BX("micro"+t.__divId),"feed-add-post-micro-dnd-ready")}BX.onCustomEvent(t.eventNode,"dragenterwindow",[])},this),dragleavewindow:BX.delegate(function(e){BX.removeClass(t.eventNode,"feed-add-post-dnd-ready");if(BX("micro"+t.__divId)){BX.removeClass(BX("micro"+t.__divId),"feed-add-post-micro-dnd-ready")}BX.onCustomEvent(t.eventNode,"dragleavewindow",[])},this),drop:BX.delegate(function(e){BX.onCustomEvent(t.eventNode,"drop",[]);BX.onCustomEvent(window,"dragWindowLeave");BX.onCustomEvent(window,"__dragWindowLeave");var i=0;if(e&&e.length>0){if(n.dndCatcher[o]["catch"]===true){n.dndCatcher[o].files=e;i=1}else{i=2}BX.onCustomEvent(t.eventNode,this.events.onShow,["show"]);BX.removeClass(t.eventNode,"feed-add-post-dnd-ready feed-add-post-dnd-over")}return i},this)};BX.ready(function(){n.dndCatcher[o]["initdrag"]()});BX.addCustomEvent(i,"OnIframeDrop",BX.delegate(function(e){BX.PreventDefault(e);if(e["dataTransfer"]&&e["dataTransfer"]["files"]){if(n.dndCatcher[o].drop(e["dataTransfer"]["files"])===2){this.handler.agent.onChange(e["dataTransfer"]["files"])}}},this));BX.addCustomEvent(i,"OnIframeDragOver",n.dndCatcher[o].dragover);BX.addCustomEvent(i,"OnIframeDragLeave",n.dndCatcher[o].dragleave);if(!window["bxMpfDndCatcher"]){window["bxMpfDndCatcher"]=true;var s=false,a=function(){if(s===false){s=true;BX.bind(document,"dragleave",l);BX.bind(document,"dragover",l);BX.bind(document,"mouseout",d);BX.onCustomEvent(window,"dragWindowEnter")}},d=function(e){BX.unbind(document,"dragleave",l);BX.unbind(document,"dragover",l);BX.unbind(document,"mouseout",d);s=false;BX.onCustomEvent(window,"dragWindowLeave")},l=function(e){if(h>0){clearTimeout(h);h=0}BX.fixEventPageXY(e);var t=true;if(e.pageX>0&&e.pageY>0){var i=BX.GetWindowSize();if(e.pageY<i.scrollHeight&&e.pageX<i.scrollWidth){var n=e.pageY-i.scrollTop,o=e.pageX-i.scrollLeft;if(0<n&&n<i.innerHeight-20&&0<o&&o<i.innerWidth-20){t=false}}}if(t){d(e)}else{h=setTimeout(function(){l({type:"intervalLimit"})},100)}},h=0;BX.bind(document,"dragenter",function(e){if(window["bxMpfDndCatcher"]>0){clearTimeout(window["bxMpfDndCatcher"])}var t=true;if(e&&e["dataTransfer"]&&e["dataTransfer"]["types"]){for(var i=0;i<e["dataTransfer"]["types"].length;i++){if(e["dataTransfer"]["types"][i]=="Files"){t=true;break}}}if(t){a()}});BX.addCustomEvent(window,"__dragWindowLeave",d);BX.bind(document,"dragover",function(e){return BX.PreventDefault(e)});BX.bind(document,"drop",function(e){d(e);return BX.PreventDefault(e)})}BX.addCustomEvent(window,"dragWindowEnter",n.dndCatcher[o].dragenterwindow);BX.addCustomEvent(window,"dragWindowLeave",n.dndCatcher[o].dragleavewindow);this.__initCatcher=BX.delegate(function(e,i){if(e==this.id){BX.removeCustomEvent(t.eventNode,"onControllerInitialized",this.__initCatcher);i.agent.initDropZone(t.eventNode);if(n.dndCatcher[e].files.length>0){i.agent.onChange(n.dndCatcher[e].files);n.dndCatcher[e].files=[]}n.dndCatcher[e]["catch"]=false;this.__initCatcher=null}},this);BX.addCustomEvent(t.eventNode,"onControllerInitialized",this.__initCatcher)}},this);BX.addCustomEvent(window,this.events.onBound,r);if(e.controller[this.id])r(e.controller[this.id])}},bindEvents:function(e){this._catchHandler=BX.delegate(function(t){BX.removeCustomEvent(this.eventNode,this.events.onInit,this._catchHandler);this.handler=t;var i=BX.findChild(BX(e.formID),{attr:{id:this.props.securityCID}},true,false);if(i)i.value=this.handler.CID;this.exec();var n=BX.delegate(function(){BX.onCustomEvent(e.eventNode,"onUploadsHasBeenChanged",arguments)},this);BX.addCustomEvent(this.handler.agent,"onFileIsInited",n);BX.addCustomEvent(this.handler.agent,"ChangeFileInput",n);BX.onCustomEvent(e.eventNode,"onControllerInitialized",[this.id,t])},this);if(typeof this.handler!="object"||!this.handler)BX.addCustomEvent(e.eventNode,this.events.onInit,this._catchHandler);else this._catchHandler(this.handler);BX.addCustomEvent(e.eventNode,"OnFileUploadSuccess",BX.delegate(function(e,t,i){if(this.id==t.CID||this.id==t.id){i=i||{};i.usePostfix=true;this.addFile(e,i,t)}},this));BX.addCustomEvent(e.eventNode,"OnFileUploadFailed",BX.delegate(function(e,t,i){if(this.id==t.CID||this.id==t.id){this.failFile(e,i,t)}},this));BX.addCustomEvent(e.eventNode,"OnFileUploadRemove",BX.delegate(function(e,t){if(this.id==t.CID||this.id==t.id){this.deleteFile(e,{usePostfix:true},t)}},this));BX.addCustomEvent(this,"onFileIsInText",BX.proxy(function(e,t){this.adjustFile(this.checkFile(e),t)},this))},addFile:function(e,t,i){var n=this.checkFile(e.element_id,e,t);if(n){setTimeout(BX.proxy(function(){this.bindFile(n);this.adjustFile(n,false)},this),100);BX.onCustomEvent(this.eventNode,"onFileIsAdded",[n,this,i,t])}else{this.failFile(this,t,i)}return true},failFile:function(e,t,i){BX.onCustomEvent(this.eventNode,"onFileIsFailed",[this,i,t])},checkFile:function(e,t){e=""+(typeof e=="object"?e.id:e);if(typeof t=="object"&&t!==null&&e&&t.element_name&&BX(t.place)){var i={id:e,name:t.element_name,url:t.element_url,type:"isnotimage/xyz",isImage:false,place:BX(t.place,true),xmlID:BX(t.place,true).getAttribute("bx-attach-xml-id"),fileID:BX(t.place,true).getAttribute("bx-attach-file-id"),fileType:BX(t.place,true).getAttribute("bx-attach-file-type")},n;if(/(\.png|\.jpg|\.jpeg|\.gif|\.bmp)$/i.test(t.element_name)&&(n=BX.findChild(i.place,{className:"files-preview",tagName:"IMG"},true,false))&&n){i.type="image/xyz";i.lowsrc=n.src;i.element_url=i.src=n.src.replace(/\Wwidth=(\d+)/,"").replace(/\Wheight=(\d+)/,"");i.isImage=true;i.width=parseInt(n.getAttribute("data-bx-full-width")||n.getAttribute("data-bx-width"));i.height=parseInt(n.getAttribute("data-bx-full-height")||n.getAttribute("data-bx-height"))}if(i.xmlID)this.xmlToAttach[i.xmlID+""]=e;if(i.fileID)this.fileToAttach[i.fileID+""]=e;this.values[e]=i}return this.values[e]||false},bindFile:function(e){var t=e.place;if(typeof e=="object"&&t&&!t.hasAttribute("bx-file-is-bound")){var i=BX.findChild(t,{className:"f-wrap"},true,false),n=BX.findChild(t,{className:"files-preview"},true,false);if(i){BX.bind(i,"click",BX.delegate(function(){this.insertFile(e.id)},this));i.style.cursor="pointer";i.title=BX.message("MPF_FILE")}if(n){BX.bind(n,"click",BX.delegate(function(){this.insertFile(e.id)},this))}}},adjustFile:function(e,t){var i=e.place;if(t===true||t===false){if(!e.info)e.info=BX.findChild(e.place,{className:"files-info"},true,false);i=e.info;if(BX.type.isDomNode(i)){var n="check-in-text-"+e.id,o=BX(n),r=t===false?{attrs:{"bx-file-is-in-text":"N"},props:{className:"insert-btn"},html:'<span class="insert-btn-text">'+BX.message("MPF_FILE_INSERT_IN_TEXT")+"</span>"}:{attrs:{"bx-file-is-in-text":"Y"},props:{className:"insert-text"},html:'<span class="insert-btn-text">'+BX.message("MPF_FILE_IN_TEXT")+"</span>"};if(!o){r.attrs.id=n;r.events={click:BX.proxy(function(){this.insertFile(e.id)},this)};i.appendChild(BX.create("SPAN",r))}else{BX.adjust(o,r)}}}},insertFile:function(e){BX.onCustomEvent(this.eventNode,"onFileIsInserted",[this.checkFile(e),this])},deleteFile:function(e,t){e=this.checkFile(e,t);if(e){BX.onCustomEvent(this.eventNode,"onFileIsDeleted",[e,this]);this.values[e.id].place=null;delete this.values[e.id].place;this.values[e.id]=null;delete this.values[e.id];e=null;return true}return false},reinitValues:function(e,t){var i,n,o={};while((i=t.pop())&&i){n=BX(this.prefixHTMLNode+i);n=n?n.tagName=="A"?n:BX.findChild(n,{tagName:"IMG"},true):null;if(n){o["E"+i]={type:"file",id:i,name:n.getAttribute("data-bx-title")||n.getAttribute("data-title"),size:n.getAttribute("data-bx-size")||"",sizeInt:n.getAttribute("data-bx-size")||"",width:n.getAttribute("data-bx-width"),height:n.getAttribute("data-bx-height"),storage:"disk",previewUrl:n.tagName=="A"?"":n.getAttribute("data-bx-src")||n.getAttribute("data-src"),fileId:n.getAttribute("bx-attach-file-id")};if(n.hasAttribute("bx-attach-xml-id"))o["E"+i]["xmlId"]=n.getAttribute("bx-attach-xml-id");if(n.hasAttribute("bx-attach-file-type"))o["E"+i]["fileType"]=n.getAttribute("bx-attach-file-type")}}this.handler.selectFile({},{},o);this.runCheckText()},runCheckText:function(){if(!this._checkText)this._checkText=BX.delegate(this.checkText,this);this.manager.exec(this._checkText)},checkText:function(){var e,t=this.manager.getContent(),i=[],n,o;if(t!=""){e=t;for(o in this.xmlToAttach){if(this.xmlToAttach.hasOwnProperty(o)){t=t.replace(new RegExp("\\&\\#91\\;DOCUMENT ID=("+o+")([WIDTHHEIGHT=0-9 ]*)\\&\\#93\\;","gim"),"["+this.parser["tag"]+"="+this.xmlToAttach[o]+"$2]").replace(new RegExp("\\[DOCUMENT ID=("+o+")([WIDTHHEIGHT=0-9 ]*)\\]","gim"),"["+this.parser["tag"]+"="+this.xmlToAttach[o]+"$2]")}}for(o in this.fileToAttach){if(this.fileToAttach.hasOwnProperty(o)){t=t.replace(new RegExp("\\&\\#91\\;"+this.parser["tag"]+"=("+o+")([WIDTHHEIGHT=0-9 ]*)\\&\\#93\\;","gim"),"["+this.parser["tag"]+"="+this.fileToAttach[o]+"$2]").replace(new RegExp("\\["+this.parser["tag"]+"=("+o+")([WIDTHHEIGHT=0-9 ]*)\\]","gim"),"["+this.parser["tag"]+"="+this.fileToAttach[o]+"$2]")}}n=new RegExp("(?:\\&\\#91\\;)("+this.parser["tags"].join("|")+")=([a-z=0-9 ]+)(?:\\&\\#93\\;)","gim");if(n.test(t)){for(o in this.values){if(this.values.hasOwnProperty(o)){i.push(o)}}if(i.length>0){n=new RegExp("(?:\\&\\#91\\;|\\[)("+this.parser["tags"].join("|")+")=("+i.join("|")+")([WIDTHHEIGHT=0-9 ]*)(?:\\&\\#93\\;|\\])","gim");if(n.test(t))t=t.replace(n,BX.delegate(function(e,t,i,n){return"["+t+"="+i+n+"]"},this))}}if(e!=t)BX.onCustomEvent(this.eventNode,"onFileIsDetected",[t,this])}return t},clean:function(){if(this.handler&&this.handler.values){var e,t,i,n=BX(this.manager.formID);while((e=this.handler.values.pop())&&e){BX.remove(e)}if(this.handler.params&&this.handler.params.controlName){t=BX.findChildren(n,{tagName:"INPUT",attribute:{name:this.handler.params.controlName}},true)}if(t){for(i=0;i<t.length;i++){BX.remove(t[i])}}}},reinit:function(e,t){var i=[],n,o;for(n in t){if(t.hasOwnProperty(n)){if(t[n]["USER_TYPE_ID"]==this.parserName&&t[n]["VALUE"]){for(o in t[n]["VALUE"]){if(t[n]["VALUE"].hasOwnProperty(o)){i.push(t[n]["VALUE"][o])}}}}}if(i.length>0){this.exec(this.reinitValues,[e,i]);return true}return false}};var o=function(e,t,i){o.superclass.constructor.apply(this,arguments);this.parser=e.parser["webdav_element"]||null;this.node=BX("wduf-selectdialog-"+t);this.manager=e;this.parserName="webdav_element";this.prefixNode="wd-doc";this.prefixHTMLNode="wdif-doc-";this.storage="webdav";this.events={onInit:"WDLoadFormControllerInit",onShow:"WDLoadFormController",onBound:"WDLoadFormControllerWasBound"}};BX.extend(o,n);o.prototype.reinitValues=function(e,t){var i,n,o={};this.waitAnswerFromServer=[];while((i=t.pop())&&i){n=BX(this.prefixHTMLNode+i);n=n?n.tagName=="A"?n:BX.findChild(n,{tagName:"IMG"},true):null;if(n){o["E"+i]={type:"file",id:i,name:n.getAttribute("alt"),storage:"webdav",size:n.getAttribute("data-bx-size"),sizeInt:1,ext:"",link:n.getAttribute("data-bx-document")};if(n.hasAttribute("bx-attach-xml-id"))o["E"+i]["xmlId"]=n.getAttribute("bx-attach-xml-id");this.waitAnswerFromServer.push(i)}}if(this.waitAnswerFromServer.length>0){if(!this._defferCheckText)this._defferCheckText=BX.delegate(this.defferCheckText,this);BX.addCustomEvent(this.eventNode,"OnFileUploadSuccess",this._defferCheckText);this.handler.WDFD_SelectFile({},{},o)}};o.prototype.defferCheckText=function(e){var t=BX.util.array_search(e.element_id,this.waitAnswerFromServer);if(t>=0){this.runCheckText();this.waitAnswerFromServer=BX.util.deleteFromArray(this.waitAnswerFromServer,t)}if(this.waitAnswerFromServer.length<=0)BX.removeCustomEvent(this.eventNode,"OnFileUploadSuccess",this._defferCheckText)};var r=function(e,t,i){r.superclass.constructor.apply(this,arguments);this.parser=e.parser["file"]?e.parser["file"]:e.parser["postimage"]["exist"]?e.parser["postimage"]:null;this.postfix=i["postfix"]||"";this.node=BX("file-selectdialog-"+t);this.parserName="file";this.prefixNode="wd-doc";this.prefixHTMLNode="file-doc-";this.props={valueEditClassName:"file-inline-file",securityCID:"upload-cid"};this.storage="bfile";this.events={onInit:"BFileDLoadFormControllerInit",onShow:"BFileDLoadFormController",onBound:"BFileDLoadFormControllerWasBound"}};BX.extend(r,n);r.prototype.initValues=function(e){var t;if(e!==true){t=BX.findChildren(this.node,{className:this.props.valueEditClassName},true);if(t&&t.length>1){this.exec(this.initValues,[true]);return true}return false}t=this.handler.agent.values||[];var i,n,o,r,s={},a="/bitrix/components/bitrix/main.file.input/file.php?mfi_mode=down&cid="+this.handler.CID+"&sessid="+BX.bitrix_sessid();for(var d=0;d<t.length;d++){r=parseInt(t[d].getAttribute("id").replace(this.prefixNode,""));if(s["id"+r])continue;s["id"+r]="Y";if(r>0){n=BX.findChild(t[d],{className:"f-wrap"},true,false);if(!n)continue;o={element_id:r,element_name:n.innerHTML,parser:this.parser.bxTag,storage:"bfile",element_url:a+"&fileID="+r};i=this.addFile(o,{usePostfix:true,hasPreview:false})}}this.runCheckText();return true};r.prototype.checkFile=function(e,t,i){e=""+(typeof e=="object"?e.id:e);e=e+(i&&i["usePostfix"]===true?this.postfix:"");if(typeof t=="object"&&t!==null&&e&&t.element_name&&BX(this.prefixNode+t.element_id,true)){var n={id:e,name:t.element_name,url:t.element_url,type:"isnotimage/xyz",isImage:false,place:BX(this.prefixNode+t.element_id,true)},o;if((t["element_type"]&&t["element_type"].indexOf("image/")===0||/(\.png|\.jpg|\.jpeg|\.gif|\.bmp)$/i.test(t.element_name))&&((o=BX.findChild(n.place,{tagName:"IMG"},true,false))&&o||i&&i["hasPreview"]===false)){n.type="image/xyz";n.src=t["element_thumbnail"]||t["element_url"];n.isImage=true;n.hasPreview=false;n.lowsrc="";n.width="";n.height="";if(BX(o)){n.hasPreview=true;n.lowsrc=t["element_thumbnail"]||o["src"];n.width=parseInt(o.getAttribute("data-bx-full-width"));n.height=parseInt(o.getAttribute("data-bx-full-height"))}}else if(this.parser.bxTag=="postimage"){return false}if(BX(n.place,true).getAttribute("bx-attach-file-type")){n.fileType=BX(n.place,true).getAttribute("bx-attach-file-type")}this.values[e]=n}return this.values[e]||false};r.prototype.bindFile=function(e){var t=e&&e["place"]?e["place"]:null;if(typeof e=="object"&&t&&!t.hasAttribute("bx-file-is-bound")){if(e.isImage&&e.hasPreview){var i=BX.findChild(t,{className:"feed-add-img-title"},true,false),n=BX.findChild(t,{className:"feed-add-img-wrap"},true,false);if(n){BX.bind(n,"click",BX.proxy(function(){this.insertFile(e)},this));n.style.cursor="pointer";n.title=BX.message("MPF_IMAGE")}if(i){BX.bind(i,"click",BX.delegate(function(){this.insertFile(e)},this));i.style.cursor="pointer";i.title=BX.message("MPF_IMAGE")}}else r.superclass.bindFile.apply(this,arguments)}};r.prototype.clean=function(){r.superclass.clean.apply(this,arguments);if(this["handler"]&&this.handler["agent"]&&this.handler.agent["inputName"]){var e,t,i=BX(this.manager.formID);e=BX.findChildren(i,{tagName:"INPUT",attribute:{name:this.handler.agent.inputName+"[]"}},true);if(e){for(t=0;t<e.length;t++){BX.remove(e[t])}}}};var s=function(t,i){this.params=i;this.formID=t;this.showPinButton=!!BX("lhe_button_editor_"+this.formID);if(this.showPinButton){this.params.showPanelEditor=!!this.params.pinEditorPanel}this.oEditorId=i["LHEJsObjId"];this.__divId=i["LHEJsObjName"]||i["LHEJsObjId"];e.handler[this.oEditorId]=this;e.form[this.formID]=this;this.oEditor=s.getEditor(this.oEditorId);this.urlPreview=this.initUrlPreview(i);this.eventNode=BX("div"+this.__divId);BX.addCustomEvent(this.eventNode,"OnShowLHE",BX.delegate(this.OnShowLHE,this));BX.addCustomEvent(this.eventNode,"OnButtonClick",BX.delegate(this.OnButtonClick,this));BX.addCustomEvent(this.eventNode,"OnAfterShowLHE",function(e,t){if(t.oEditor&&t.oEditor["AllowBeforeUnloadHandler"])t.oEditor.AllowBeforeUnloadHandler();if(t.monitoringWakeUp===true)t.monitoringStart()});BX.addCustomEvent(this.eventNode,"OnAfterHideLHE",function(e,t){t.monitoringWakeUp=t.monitoringStop();if(t.oEditor&&t.oEditor["DenyBeforeUnloadHandler"])t.oEditor.DenyBeforeUnloadHandler()});this.initParsers(i);this.initFiles(t,i);BX.ready(BX.delegate(function(){if(BX("lhe_button_submit_"+t,true)){BX.bind(BX("lhe_button_submit_"+t,true),"click",BX.proxy(function(e){BX.onCustomEvent(this.eventNode,"OnButtonClick",["submit"]);return BX.PreventDefault(e)},this))}if(BX("lhe_button_cancel_"+t,true)){BX.bind(BX("lhe_button_cancel_"+t,true),"click",BX.proxy(function(e){BX.onCustomEvent(this.eventNode,"OnButtonClick",["cancel"]);return BX.PreventDefault(e)},this))}},this));this.inited=true;if(BX(this.formID)){BX.addCustomEvent(BX(this.formID),"onAutoSavePrepare",function(e){e.FORM.setAttribute("bx-lhe-autosave-prepared","Y")})}BX.onCustomEvent(this,"onInitialized",[this,t,i,this.parsers]);BX.onCustomEvent(this.eventNode,"onInitialized",[this,t,i,this.parsers]);if(this.oEditor&&this.oEditor.inited&&!this.oEditor["__lhe_flags"]){BX.onCustomEvent(this.oEditor,"OnEditorInitedBefore",[this.oEditor]);BX.onCustomEvent(this.oEditor,"OnEditorInitedAfter",[this.oEditor,true])}};s.prototype={editorIsLoaded:false,arFiles:{},parser:{},controllers:{},exec:function(e,t){this.functionsToExec=this.functionsToExec||[];if(typeof e=="function")this.functionsToExec.push([e,t]);if(this.editorIsLoaded===true){var i;while((i=this.functionsToExec.shift())&&i)i[0].apply(this,i[1])}},initParsers:function(e){this.parser={postimage:{exist:false,bxTag:"postimage",tag:"IMG ID",tags:["IMG ID"],regexp:/\[(IMG ID)=((?:\s|\S)*?)(?:\s*?WIDTH=(\d+)\s*?HEIGHT=(\d+))?\]/gi,code:"[IMG ID=#ID##ADDITIONAL#]",wysiwyg:'<img id="#ID#" src="'+'#SRC#" lowsrc="'+'#LOWSRC#" title=""#ADDITIONAL# />'},player:{exist:false,bxTag:"player",tag:"FILE ID",tags:["FILE ID"],regexp:/\[(FILE ID)=((?:\s|\S)*?)?\]/gi,code:"[FILE ID=#ID##ADDITIONAL#]",wysiwyg:'<img class="bxhtmled-player-surrogate" id="#ID#" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" contenteditable="false" title=""#ADDITIONAL# />'}};var t=e["parsers"]?e["parsers"]:{};for(var n in t){if(t.hasOwnProperty(n)&&/[a-z]/gi.test(n+"")){this.parser[n]=new i(n,t[n])}}if(BX.util.object_search("UploadImage",t)){this.parser["postimage"]["exist"]=true}if(typeof e["arSize"]=="object"){var o="";if(e["arSize"]["width"])o+="max-width:"+e["arSize"]["width"]+"px;";if(e["arSize"]["height"])o+="max-height:"+e["arSize"]["height"]+"px;";if(o!=="")this.parser["postimage"]["wysiwyg"]=this.parser["postimage"]["wysiwyg"].replace("#ADDITIONAL#",' style="'+o+'" #ADDITIONAL#')}},initFiles:function(e,t){this.arFiles={};this.controllers={common:{postfix:"",storage:"bfile",parser:"postimage",node:window,obj:null,init:false}};this.monitoring={interval:null,text:"",savedText:"",files:[],savedFiles:[]};if(!t["CID"]||typeof t["CID"]!=="object")return;BX.addCustomEvent(this.eventNode,"onFileIsAdded",BX.delegate(this.OnFileUploadSuccess,this));BX.addCustomEvent(this.eventNode,"onFileIsFailed",BX.delegate(this.OnFileUploadFailed,this));BX.addCustomEvent(this.eventNode,"onFileIsDeleted",BX.delegate(this.OnFileUploadRemove,this));BX.addCustomEvent(this.eventNode,"onFileIsDetected",BX.delegate(this.setContent,this));BX.addCustomEvent(this.eventNode,"onFileIsInserted",BX.delegate(this.insertFile,this));var i,s,a;for(s in t["CID"]){if(t["CID"].hasOwnProperty(s)){i=t["CID"][s]["parser"];if(i=="disk_file")this.controllers[s]=new n(this,s,t["CID"][s]);else if(i=="webdav_element")this.controllers[s]=new o(this,s,t["CID"][s]);else if(i=="file")this.controllers[s]=new r(this,s,t["CID"][s]);if(this.controllers[s]&&this.controllers[s].init()&&!a)a=true}}BX.ready(BX.delegate(function(){BX.bind(BX("bx-b-uploadfile-"+e),"click",BX.proxy(this.controllerInit,this));if(a)this.controllerInit("show")},this))},controllerInit:function(e){this.controllerInitStatus=e=="show"||e=="hide"?e:this.controllerInitStatus=="show"?"hide":"show";BX.onCustomEvent(this.eventNode,"onShowControllers",[this.controllerInitStatus])},initUrlPreview:function(){if(this.params["urlPreviewId"]&&window["BXUrlPreview"]&&BX(this.params["urlPreviewId"])){return new BXUrlPreview(BX(this.params["urlPreviewId"]))}return null},getContent:function(){return this.oEditor?this.oEditor.GetContent():""},setContent:function(e){if(this.oEditor)this.oEditor.SetContent(e)},OnFileUploadSuccess:function(e,t,i,n){if(this.controllers[t.id]){var o=t.parser.bxTag+e.id;this.arFiles[o]=this.arFiles[o]||[];this.arFiles[o].push(t.id);if(n&&n["referrerToEditor"]){var r=this.getFileToInsert(e,t);BX.onCustomEvent(n["referrerToEditor"],"OnImageDataUriCaughtUploaded",[r]);BX.onCustomEvent(this.oEditor,"OnImageDataUriCaughtUploaded",[n["referrerToEditor"],e,r])}else if(i===true&&e.isImage&&this.insertImageAfterUpload){if(!this._insertFile)this._insertFile=BX.delegate(this.insertFile,this);this.exec(this._insertFile,arguments)}}},OnFileUploadFailed:function(e,t,i){if(i&&i["referrerToEditor"]){BX.onCustomEvent(i["referrerToEditor"],"OnImageDataUriCaughtFailed",[]);BX.onCustomEvent(this.editor,"OnImageDataUriCaughtFailed",[i["referrerToEditor"]])}},OnFileUploadRemove:function(e,t){if(this.controllers[t.id]){var i=t.parser.bxTag+e.id;if(this.arFiles[i]){var n=BX.util.array_search(t.id,this.arFiles[i]);this.arFiles[i]=BX.util.deleteFromArray(this.arFiles[i],n);if(!this.arFiles[i]||this.arFiles[i].length<=0){this.arFiles[i]=null;delete this.arFiles[i];if(!this._deleteFile)this._deleteFile=BX.delegate(this.deleteFile,this);this.exec(this._deleteFile,arguments)}}}},showPanelEditor:function(e,t){if(e==undefined)e=!this.oEditor.toolbar.IsShown();this.params.showPanelEditor=e;var i=BX("lhe_button_editor_"+this.formID),n=BX("panel-close"+this.__divId);if(n){this.oEditor.dom.cont.appendChild(n)}if(e){this.oEditor.dom.toolbarCont.style.opacity="inherit";this.oEditor.toolbar.Show();if(i)BX.addClass(i,"feed-add-post-form-btn-active");if(n)n.style.display=""}else{this.oEditor.toolbar.Hide();if(i)BX.removeClass(i,"feed-add-post-form-btn-active");if(n)n.style.display="none"}if(t!==false)BX.userOptions.save("main.post.form","postEdit","showBBCode",e?"Y":"N")},monitoring:{},monitoringStart:function(){if(this.monitoring.interval===null){if(!this._monitoringStart){this._monitoringStart=BX.delegate(this.checkFilesInText,this);BX.addCustomEvent(this.oEditor,"OnContentChanged",BX.proxy(function(e){this.monitoring.text=e},this))}this.monitoring.interval=setInterval(this._monitoringStart,1e3)}},monitoringStop:function(){var e=this.monitoring.interval!==null;if(this.monitoring.interval!==null)clearInterval(this.monitoring.interval);this.monitoring.interval=null;return e},monitoringSetStatus:function(e,t,i){if(this.arFiles[e+t]){var n;for(var o=0;o<this.arFiles[e+t].length;o++){n=this.arFiles[e+t][o];BX.onCustomEvent(this.controllers[n],"onFileIsInText",[t,i])}}},checkFilesInText:function(){if(this.monitoring.text!==this.monitoring.savedText){this.monitoring.savedText=this.monitoring.text;this.monitoring.files=[];var e=this.monitoring.savedText,t,i=function(e,t){return function(i,n,o){e.monitoring.files.push([t,o].join("/"))}};for(t in this.parser){if(this.parser.hasOwnProperty(t)){if(!this.parser[t]["checkFilesInText"]){this.parser[t]["checkFilesInText"]=i(this,t)}e.replace(this.parser[t]["regexp"],this.parser[t]["checkFilesInText"])}}if(this.monitoring.savedFiles.join(",")!==this.monitoring.files.join(",")){var n={},o;while(o=this.monitoring.savedFiles.pop()){n[o]=null}for(t=0;t<this.monitoring.files.length;t++){o=this.monitoring.files[t];n[o]=n[o]>=0?n[o]+1:1}for(t in n){if(n.hasOwnProperty(t)){o=t.split("/");this.monitoringSetStatus(o[0],o[1],n[t]>0)}}}this.monitoring.savedFiles=this.monitoring.files;if(this.monitoring.savedFiles.length<=0)this.monitoringStop()}},checkFile:function(e,t){var i=false;if(typeof e=="string"){var n=typeof t=="string"?t:t.parser;if(!!this.arFiles[n+e]){var o=this.arFiles[n+e][0];t=this.controllers[o];i={file:t.values[e],controller:t}}}else if(this.controllers[t.id]){i={file:e,controller:t}}return i},insertFile:function(e,t){var i=this.oEditor;if(i&&e){var n=i.GetViewMode(),o=this.getFileToInsert(e,t);if(n=="wysiwyg"){i.InsertHtml(o.replacement);setTimeout(BX.delegate(i.AutoResizeSceleton,i),500);setTimeout(BX.delegate(i.AutoResizeSceleton,i),1e3)}else if(n=="code"){i.textareaView.Focus();if(!i.bbCode){var r=i.GetIframeDoc();var s=r.createElement("DIV");s.style.display="none";s.innerHTML=o.replacement;r.body.appendChild(s);o.replacement=i.Parse(o.replacement,true,false);s.parentNode.removeChild(s)}i.textareaView.WrapWith("","",o.replacement)}else{return}o["callback"]()}},getFileToInsert:function(e,t){var i=this.oEditor;if(i&&e){var n=e["id"],o="",r=t.parser,s=i.bbCode?i.GetViewMode():"wysiwyg",a=this.parser[r.bxTag][s];if(e["fileType"]&&this.parser[e["fileType"]]&&s=="wysiwyg"){a=this.parser[e["fileType"]][s]}if(e["isImage"]){a=s=="wysiwyg"?this.parser["postimage"][s]:a;if(e.width>0&&e.height>0&&i.sEditorMode=="html"){o=' style="width:'+e.width+"px;height:"+e.height+"px;\" onload=\"this.style.width='auto';this.style.height='auto';\""}}if(s=="wysiwyg"){a=a.replace("#ID#",i.SetBxTag(false,{tag:r.bxTag,params:{value:n}})).replace("#SRC#",e.src).replace("#URL#",e.url).replace("#LOWSRC#",e.lowsrc||"").replace("#NAME#",e.name).replace("#ADDITIONAL#",o)+"<span>&nbsp;</span>"}else if(s=="code"&&i.bbCode){a=a.replace("#ID#",n).replace("#ADDITIONAL#","")}return{replacement:a,callback:BX.proxy(function(){this.monitoringSetStatus(t.parser.bxTag,e.id,true);this.monitoringStart()},this)}}return{replacement:"",callback:BX.DoNothing}},deleteFile:function(e,t){var i=this.oEditor,n=t.parser,o=e.id,r=i.GetContent();if(n&&r.indexOf("="+o)>=0){if(i.GetViewMode()=="wysiwyg"){var s=i.GetIframeDoc(),a,d;for(a in i["bxTags"]){if(i["bxTags"].hasOwnProperty(a)){if(typeof i.bxTags[a]=="object"&&i.bxTags[a]["params"]&&i.bxTags[a]["params"]["value"]==e.id){d=s.getElementById(a);if(d)d.parentNode.removeChild(d)}}}i.SaveContent()}else{r=r.replace(n.regexp,function(t,i,n){return n==e.id?"":t});i.SetContent(r);i.Focus()}this.monitoringSetStatus(n.bxTag,e.id,false)}},reinit:function(e,t){BX.onCustomEvent(this.eventNode,"onReinitializeBefore",[this,e,t]);this.arFiles={};delete this.monitoringWakeUp;this.monitoringStop();this.oEditor.CheckAndReInit(e||"");BX.onCustomEvent(this.eventNode,"onReinitialize",[this,e,t]);var i,n=false;for(i in this.controllers){if(this.controllers.hasOwnProperty(i)){if(this.controllers[i]["init"]&&this.controllers[i].reinit(e,t))n=true}}this.controllerInit(n?"show":"hide");if(this.params["~height"]){this.oEditor.SetConfigHeight(this.params["~height"]);this.oEditor.ResizeSceleton()}if(this.urlPreview){this.urlPreview.detachUrlPreview();var o;for(var r in t){if(t.hasOwnProperty(r)&&t[r].hasOwnProperty("USER_TYPE_ID")&&t[r]["USER_TYPE_ID"]==="url_preview"){o=t[r]["VALUE"]}}if(o)this.urlPreview.attachUrlPreview({id:o})}},Parse:function(e,t,i){var n=this.parser[e],o=this;if(n){t=t.replace(n.regexp,function(t,r,s,a,d){var l=o.checkFile(s,e);if(l&&(l=l.file)&&l){var h="",f=l.isImage?o.parser.postimage.wysiwyg:n.wysiwyg;o.monitoringStart();if(l.fileType&&o.parser[l.fileType]&&o.parser[l.fileType].wysiwyg){f=o.parser[l.fileType].wysiwyg}if(l.isImage){a=parseInt(a);d=parseInt(d);h=a&&d?' width="'+a+'" height="'+d+'"':"";if(h===""&&l["width"]>0&&l["height"]>0){h=' style="width:'+l["width"]+"px;height:"+l["height"]+"px;\" onload=\"this.style.width='auto';this.style.height='auto';\""}}return f.replace("#ID#",i.SetBxTag(false,{tag:e,params:{value:s}})).replace("#NAME#",l.name).replace("#SRC#",l.src).replace("#LOWSRC#",l.lowsrc).replace("#ADDITIONAL#",h).replace("#WIDTH#",parseInt(a)).replace("#HEIGHT#",parseInt(d))}return t})}return t},Unparse:function(e,t){var i="",n=e.tag;if(this.parser[n]){var o=parseInt(t.node.hasAttribute("width")?t.node.getAttribute("width"):0),r=parseInt(t.node.hasAttribute("height")?t.node.getAttribute("height"):0),s="";if(o>0&&r>0){s=" WIDTH="+o+" HEIGHT="+r}i=this.parser[n]["code"].replace("#ID#",e.params.value).replace("#ADDITIONAL#",s).replace("#WIDTH#",o).replace("#HEIGHT#",r)}return i},OnShowLHE:function(e,t,i){var n=this.__divId;e=e===false?false:e==="hide"?"hide":e==="justShow"?"justShow":true;this.oEditor=this.oEditor||s.getEditor(this.oEditorId);if(!this.oEditor)return;this.oEditor.Init();var o=BX("micro"+n),r=this.eventNode;if(o){o.style.display=e===true||e==="justShow"?"none":"block"}if(e=="hide"){BX.onCustomEvent(this.eventNode,"OnBeforeHideLHE",[e,this]);if(this.eventNode.style.display=="none"){BX.onCustomEvent(this.eventNode,"OnAfterHideLHE",[e,this])}else{new BX["easing"]({duration:200,start:{opacity:100,height:this.eventNode.scrollHeight},finish:{opacity:0,height:20},transition:BX.easing.makeEaseOut(BX.easing.transitions.quad),step:function(e){r.style.height=e.height+"px";r.style.opacity=e.opacity/100},complete:BX.proxy(function(){this.eventNode.style.cssText="";this.eventNode.style.display="none";BX.onCustomEvent(r,"OnAfterHideLHE",[e,this])},this)}).animate()}}else if(e){BX.onCustomEvent(this.eventNode,"OnBeforeShowLHE",[e,this]);if(e=="justShow"){this.eventNode.style.display="block";BX.onCustomEvent(this.eventNode,"OnAfterShowLHE",[e,this]);if(i!==false)this.oEditor.Focus()}else if(this.eventNode.style.display=="block"){BX.onCustomEvent(this.eventNode,"OnAfterShowLHE",[e,this]);if(i!==false)this.oEditor.Focus()}else{BX.adjust(this.eventNode,{style:{display:"block",overflow:"hidden",height:"20px",opacity:.1}});new BX["easing"]({duration:200,start:{opacity:10,height:20},finish:{opacity:100,height:r.scrollHeight},transition:BX["easing"].makeEaseOut(BX.easing.transitions.quad),step:function(e){r.style.height=e.height+"px";r.style.opacity=e.opacity/100},complete:BX.proxy(function(){BX.onCustomEvent(r,"OnAfterShowLHE",[e,this]);this.oEditor.Focus();this.eventNode.style.cssText=""},this)}).animate()}}else{BX.onCustomEvent(this.eventNode,"OnBeforeHideLHE",[e,this]);this.eventNode.style.display="none";BX.onCustomEvent(this.eventNode,"OnAfterHideLHE",[e,this])}},OnButtonClick:function(e){if(e!=="cancel"){var t={result:true};BX.onCustomEvent(this.eventNode,"OnClickBeforeSubmit",[this,t]);if(t["result"]!==false)BX.onCustomEvent(this.eventNode,"OnClickSubmit",[this])}else{d.node=null;BX.onCustomEvent(this.eventNode,"OnClickCancel",[this]);BX.onCustomEvent(this.eventNode,"OnShowLHE",["hide"])}},OnEditorInitedBefore:function(e){var t=this;this.oEditor=e;e.formID=this.formID;if(this.params)this.params["~height"]=e.config["height"];BX.addCustomEvent(e,"OnCtrlEnter",function(){e.SaveContent();if(BX.type.isNotEmptyString(t.params["ctrlEnterHandler"])&&typeof window[t.params["ctrlEnterHandler"]]=="function")window[t.params["ctrlEnterHandler"]]();else if(BX.type.isFunction(t.params["ctrlEnterHandler"]))t.params["ctrlEnterHandler"]();else BX.submit(BX(t.formID))});var i=this.params.parsers?this.params.parsers:[];if(BX.util.object_search("Spoiler",i)){e.AddButton({id:"spoiler",name:BX.message("spoilerText"),iconClassName:"spoiler",disabledForTextarea:false,src:BX.message("MPF_TEMPLATE_FOLDER")+"/images/lhespoiler.png",toolbarSort:205,handler:function(){var e=this,t=false;if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){t=e.editor.action.actions.formatBlock.exec("formatBlock","blockquote","bx-spoiler",false,{bxTagParams:{tag:"spoiler"}})}else{t=e.editor.action.actions.formatBbCode.exec("quote",{tag:"SPOILER"})}return t}});e.AddParser({name:"spoiler",obj:{Parse:function(e,t,i){if(/\[(cut|spoiler)(([^\]])*)\]/gi.test(t)){t=t.replace(/[\001-\006]/gi,"").replace(/\[cut(((?:=)[^\]]*)|)\]/gi,"\x01$1\x01").replace(/\[\/cut]/gi,"\x02").replace(/\[spoiler([^\]]*)\]/gi,"\x03$1\x03").replace(/\[\/spoiler]/gi,"\x04");var n=/(?:\001([^\001]*)\001)([^\001-\004]+)\002/gi,o=/(?:\003([^\003]*)\003)([^\001-\004]+)\004/gi,r=function(e,t){e=e.replace(/^(="|='|=)/gi,"").replace(/("|')?$/gi,"");return'<blockquote class="bx-spoiler" id="'+i.SetBxTag(false,{tag:"spoiler"})+'" title="'+e+'">'+t+"</blockquote>"},s=function(e,t,i){return r(t,i)};while(t.match(n)||t.match(o)){t=t.replace(n,s).replace(o,s)}}t=t.replace(/\001([^\001]*)\001/gi,"[cut$1]").replace(/\003([^\003]*)\003/gi,"[spoiler$1]").replace(/\002/gi,"[/cut]").replace(/\004/gi,"[/spoiler]");return t},UnParse:function(t,i){if(t.tag=="spoiler"){var n="",o;for(o=0;o<i.node.childNodes.length;o++){n+=e.bbParser.GetNodeHtml(i.node.childNodes[o])}n=BX.util.trim(n);if(n!="")return"[SPOILER"+(i.node.hasAttribute("title")?"="+i.node.getAttribute("title"):"")+"]"+n+"[/SPOILER]"}return""}}})}if(BX.util.object_search("MentionUser",i)){e.AddParser({name:"postuser",obj:{Parse:function(t,i){i=i.replace(/\[USER\s*=\s*(\d+)\]((?:\s|\S)*?)\[\/USER\]/gi,function(t,i,n){n=BX.util.trim(n);if(n=="")return"";return'<span id="'+e.SetBxTag(false,{tag:"postuser",params:{value:parseInt(i)}})+'" class="bxhtmled-metion">'+n+"</span>"});return i},UnParse:function(t,i){if(t.tag=="postuser"){var n="",o;for(o=0;o<i.node.childNodes.length;o++){n+=e.bbParser.GetNodeHtml(i.node.childNodes[o])}n=BX.util.trim(n);if(n!="")return"[USER="+t.params.value+"]"+n+"[/USER]"}return""}}})}var n=function(i,n){return t.Parse(i,n,e)},o=function(e,i){return t.Unparse(e,i)};for(var r in this.parser){if(this.parser.hasOwnProperty(r)){e.AddParser({name:r,obj:{Parse:n,UnParse:o}})}}if(this.showPinButton){this.pinEditorPanel=this.params&&this.params.pinEditorPanel===true;var s="toolbar_pin";var a=function(e,i){a.superclass.constructor.apply(this,arguments);this.id=s;this.title=BX.message("MPF_PIN_EDITOR_PANNEL");this.className+=" "+(t.pinEditorPanel?"bxhtmled-button-toolbar-pined":"bxhtmled-button-toolbar-pin");this.Create();if(i)i.appendChild(this.GetCont())};BX.extend(a,window.BXHtmlEditor.Button);a.prototype.OnClick=function(){BX.removeClass(this.pCont,"bxhtmled-button-toolbar-pined");BX.removeClass(this.pCont,"bxhtmled-button-toolbar-pin");if(t.pinEditorPanel){t.pinEditorPanel=false;BX.addClass(this.pCont,"bxhtmled-button-toolbar-pin")}else{t.pinEditorPanel=true;BX.addClass(this.pCont,"bxhtmled-button-toolbar-pined")}BX.userOptions.save("main.post.form","postEdit","pinEditorPanel",t.pinEditorPanel?"Y":"N")};window.BXHtmlEditor.Controls[s]=a;BX.addCustomEvent(e,"GetControlsMap",function(e){e.push({id:s,compact:true,hidden:false,sort:500,checkWidth:true,offsetWidth:32,wrap:"right"})})}},OnEditorInitedAfter:function(t){BX.addCustomEvent(t,"OnIframeDrop",BX.proxy(function(){BX.onCustomEvent(this.eventNode,"OnIframeDrop",arguments)},this));BX.addCustomEvent(t,"OnIframeDragOver",BX.proxy(function(){BX.onCustomEvent(this.eventNode,"OnIframeDragOver",arguments)},this));BX.addCustomEvent(t,"OnIframeDragLeave",BX.proxy(function(){BX.onCustomEvent(this.eventNode,"OnIframeDragLeave",arguments)},this));BX.addCustomEvent(t,"OnImageDataUriHandle",function(){BX.onCustomEvent(this.eventNode,"OnImageDataUriHandle",Array.prototype.slice.call(arguments))}.bind(this));BX.addCustomEvent(t,"OnAfterUrlConvert",this.OnAfterUrlConvert.bind(this));BX.addCustomEvent(t,"OnAfterLinkInserted",this.OnAfterUrlConvert.bind(this));BX.addCustomEvent(t,"OnBeforeCommandExec",this.OnBeforeCommandExec.bind(this));t.contextMenu.items["postimage"]=t.contextMenu.items["postdocument"]=t.contextMenu.items["postfile"]=[{TEXT:BX.message("BXEdDelFromText"),bbMode:true,ACTION:function(){var e=t.contextMenu.GetTargetItem("postimage");if(!e)e=t.contextMenu.GetTargetItem("postdocument");if(!e)e=t.contextMenu.GetTargetItem("postfile");if(e&&e.element){t.selection.RemoveNode(e.element)}t.contextMenu.Hide()}}];if(!this.params["lazyLoad"]){BX.onCustomEvent(this.eventNode,"OnShowLHE",["justShow",t,false])}if(t.toolbar.controls&&t.toolbar.controls.FontSelector){t.toolbar.controls.FontSelector.SetWidth(45)}if(BX(this.formID)){BX.addCustomEvent(BX(this.formID),"onAutoSavePrepare",function(e){var i=e;setTimeout(function(){BX.addCustomEvent(t,"OnContentChanged",BX.proxy(function(e){this["mpfTextContent"]=e;this.Init()},i))},1500)});BX.addCustomEvent(BX(this.formID),"onAutoSave",BX.proxy(function(e,t){if(BX.type.isNotEmptyString(e["mpfTextContent"]))t["text"+this.formID]=e["mpfTextContent"]},this));BX.addCustomEvent(BX(this.formID),"onAutoSaveRestore",BX.proxy(function(i,n){if(e.handler[t.id]){for(var o in e.handler[t.id].controllers){if(e.handler[t.id].controllers.hasOwnProperty(o)&&e.handler[t.id].controllers[o].handler&&e.handler[t.id].controllers[o].handler.params&&e.handler[t.id].controllers[o].handler.params.controlName&&e.handler[t.id].controllers[o].handler.params.controlName){delete n[e.handler[t.id].controllers[o].handler.params.controlName]}}}if(n["text"+this.formID]&&/[^\s]+/gi.test(n["text"+this.formID])){t.CheckAndReInit(n["text"+this.formID])}},this));if(BX(this.formID).hasAttribute("bx-lhe-autosave-prepared")&&BX(this.formID).BXAUTOSAVE){BX(this.formID).removeAttribute("bx-lhe-autosave-prepared");setTimeout(BX.proxy(function(){BX(this.formID).BXAUTOSAVE.Prepare()},this),100)}}var i=this.formID,n=this.params;this.showPanelEditor(n.showPanelEditor,false);if(!t.mainPostFormCustomized){t.mainPostFormCustomized=true;BX.addCustomEvent(t,"OnIframeKeydown",function(e){if(window.onKeyDownHandler){window.onKeyDownHandler(e,t,i)}});BX.addCustomEvent(t,"OnIframeKeyup",function(e){if(window.onKeyUpHandler){window.onKeyUpHandler(e,t,i)}});if(window["BXfpdStopMent"+i]){BX.addCustomEvent(t,"OnIframeClick",function(){window["BXfpdStopMent"+i]()})}if(t&&t.textareaView.GetCursorPosition){BX.addCustomEvent(t,"OnTextareaKeyup",function(e){if(window.onTextareaKeyUpHandler){window.onTextareaKeyUpHandler(e,t,i)}});BX.addCustomEvent(t,"OnTextareaKeydown",function(e){if(window.onTextareaKeyDownHandler){window.onTextareaKeyDownHandler(e,t,i)}})}}},OnAfterUrlConvert:function(e){if(this.urlPreview){this.urlPreview.attachUrlPreview({url:e})}},OnBeforeCommandExec:function(e,t,i,n){if(this.urlPreview&&t=="createLink"&&BX.type.isPlainObject(n)&&n.hasOwnProperty("href")){this.urlPreview.attachUrlPreview({url:n.href})}}};s.getEditor=function(e){return window["BXHtmlEditor"]?window["BXHtmlEditor"].Get(typeof e=="object"?e.id:e):null};s.getHandler=function(t){return e.handler[typeof t=="object"?t.id:t]};s.getHandlerByFormId=function(t){return e.form[t]};s.unsetHandler=function(t){var i=typeof t=="object"?t.id:t;if(!e.handler[i])return;if(e.handler[i].oEditor)e.handler[i].oEditor.Destroy();e.handler[i]=null};s.reinitData=function(e,t,i){var n=s.getHandler(e);if(n)n.exec(n.reinit,[t,i]);return false};s.reinitDataBefore=function(e){var t=s.getHandler(e);if(t&&t["eventNode"])BX.onCustomEvent(t.eventNode,"onReinitializeBefore",[t])};window.LHEPostForm=s;window.BXPostFormTags=function(e,t){this.popup=null;this.formID=e;this.buttonID=t;this.sharpButton=null;this.addNewLink=null;this.tagsArea=null;this.hiddenField=null;this.popupContent=null;BX.ready(BX.proxy(this.init,this))};window.BXPostFormTags.prototype.init=function(){this.sharpButton=BX(this.buttonID);this.addNewLink=BX("post-tags-add-new-"+this.formID);this.tagsArea=BX("post-tags-block-"+this.formID);this.tagsContainer=BX("post-tags-container-"+this.formID);this.hiddenField=BX("post-tags-hidden-"+this.formID);this.popupContent=BX("post-tags-popup-content-"+this.formID);this.popupInput=BX.findChild(this.popupContent,{tag:"input"});var e=BX.findChildren(this.tagsContainer,{className:"feed-add-post-del-but"},true);for(var t=0,i=e.length;t<i;t++){BX.bind(e[t],"click",BX.proxy(this.onTagDelete,{obj:this,tagBox:e[t].parentNode,tagValue:e[t].parentNode.getAttribute("data-tag")}))}BX.bind(this.sharpButton,"click",BX.proxy(this.onButtonClick,this));BX.bind(this.addNewLink,"click",BX.proxy(this.onAddNewClick,this))};window.BXPostFormTags.prototype.onTagDelete=function(){BX.remove(this.tagBox);this.obj.hiddenField.value=this.obj.hiddenField.value.replace(this.tagValue+",","").replace("  "," ")};window.BXPostFormTags.prototype.show=function(){if(this.popup===null){this.popup=new BX.PopupWindow("bx-post-tag-popup",this.addNewLink,{content:this.popupContent,lightShadow:false,offsetTop:8,offsetLeft:10,autoHide:true,angle:true,closeByEsc:true,zIndex:-840,buttons:[new BX.PopupWindowButton({text:BX.message("TAG_ADD"),events:{click:BX.proxy(this.onTagAdd,this)}})]});BX.bind(this.popupInput,"keydown",BX.proxy(this.onKeyPress,this));BX.bind(this.popupInput,"keyup",BX.proxy(this.onKeyPress,this))}this.popup.show();BX.focus(this.popupInput)};window.BXPostFormTags.prototype.addTag=function(e){var t=BX.type.isNotEmptyString(e)?e.split(","):this.popupInput.value.split(",");var i=[];for(var n=0;n<t.length;n++){var o=BX.util.trim(t[n]);if(o.length>0){var r=this.hiddenField.value.split(",");if(!BX.util.in_array(o,r)){var s;var a=BX.create("span",{children:[s=BX.create("span",{attrs:{class:"feed-add-post-del-but"}})],attrs:{class:"feed-add-post-tags"}});a.insertBefore(document.createTextNode(o),s);this.tagsContainer.insertBefore(a,this.addNewLink);BX.bind(s,"click",BX.proxy(this.onTagDelete,{obj:this,tagBox:a,tagValue:o}));this.hiddenField.value+=o+",";i.push(o)}}}return i};window.BXPostFormTags.prototype.onTagAdd=function(){this.addTag();this.popupInput.value="";this.popup.close()};window.BXPostFormTags.prototype.onAddNewClick=function(e){e=e||window.event;this.show();BX.PreventDefault(e)};window.BXPostFormTags.prototype.onButtonClick=function(e){e=e||window.event;BX.show(this.tagsArea);this.show();BX.PreventDefault(e)};window.BXPostFormTags.prototype.onKeyPress=function(e){e=e||window.event;var t=e.keyCode?e.keyCode:e.which?e.which:null;if(t==13){setTimeout(BX.proxy(this.onTagAdd,this),0)}};window.BXPostFormImportant=function(e,t,i){if(i){this.formID=e;this.buttonID=t;this.inputName=i;this.fireButton=null;this.activeBlock=null;this.hiddenField=null;BX.ready(BX.proxy(this.init,this))}return false};window.BXPostFormImportant.prototype.init=function(){this.fireButton=BX(this.buttonID);this.activeBlock=BX(this.buttonID+"-active");var e=BX(this.formID);if(e){this.hiddenField=e[this.inputName];if(this.hiddenField&&this.hiddenField.value==1){this.showActive()}}BX.bind(this.fireButton,"click",BX.proxy(function(e){e=e||window.event;this.showActive();BX.PreventDefault(e)},this));BX.bind(this.activeBlock,"click",BX.proxy(function(e){e=e||window.event;this.hideActive();BX.PreventDefault(e)},this))};window.BXPostFormImportant.prototype.showActive=function(e){BX.hide(this.fireButton);BX.show(this.activeBlock,"inline-block");if(this.hiddenField){this.hiddenField.value=1}return false};window.BXPostFormImportant.prototype.hideActive=function(e){BX.hide(this.activeBlock);BX.show(this.fireButton,"inline-block");if(this.hiddenField){this.hiddenField.value=0}return false};var a=null;window.MPFbuttonShowWait=function(e){if(e&&!BX.type.isElementNode(e))e=null;e=e||this;e=e?e.tagName=="A"?e:e.parentNode:e;if(e){BX.addClass(e,"ui-btn-clock");a=e;BX.defer(function(){e.disabled=true})()}};window.MPFbuttonCloseWait=function(e){if(e&&!BX.type.isElementNode(e))e=null;e=e||a||this;if(e){e.disabled=false;BX.removeClass(e,"ui-btn-clock");a=null}};window.__mpf_wd_getinfofromnode=function(e,t){var i=BX.findChild(BX((e["prefixNode"]||"wd-doc")+e.element_id),{className:"files-preview",tagName:"IMG"},true,false);if(i){e.lowsrc=i.src;e.element_url=i.src.replace(/\Wwidth=(\d+)/,"").replace(/\Wheight\=(\d+)/,"");e.width=parseInt(i.getAttribute("data-bx-full-width"));e.height=parseInt(i.getAttribute("data-bx-full-height"))}else if(t.urlGet){e.element_url=t.urlGet.replace("#element_id#",e.element_id).replace("#ELEMENT_ID#",e.element_id).replace("#element_name#",e.element_name).replace("#ELEMENT_NAME#",e.element_name)}};var d={listen:false,plus:false,text:"",bSearch:false,node:null,mode:null};window.onKeyDownHandler=function(e,t,i){var n=e.keyCode;if(!window["BXfpdStopMent"+i])return true;var o=window.MPFgetSelectorId("bx-mention-"+i+"-id");if(n===t.KEY_CODES["backspace"]&&d.node){var r=BX.util.trim(t.util.GetTextContent(d.node));if(r==="+"||r==="@"||d.mode=="button"&&r.length==1){window["BXfpdStopMent"+i]()}else if(d.mode=="button"&&r.length==1){window["BXfpdStopMent"+i]()}}if(BX.util.in_array(n,[107,187])||(e.shiftKey||e.modifiers>3)&&BX.util.in_array(n,[50,43,61])||e.altKey&&BX.util.in_array(n,[76])||typeof e.getModifierState==="function"&&!!e.getModifierState("AltGraph")&&BX.util.in_array(n,[81])){setTimeout(function(){var e=t.selection.GetRange(),i=t.GetIframeDoc(),n=e?e.endContainer.textContent:"",r=n?n.slice(e.endOffset-1,e.endOffset):"",s=n?n.slice(e.endOffset-2,e.endOffset-1):"";if((r=="@"||r=="+")&&(!s||BX.util.in_array(s,["+","@",",","("])||s.length==1&&BX.util.trim(s)==="")){d.listen=true;d.listenFlag=true;d.text="";d.leaveContent=true;d.mode="plus";e.setStart(e.endContainer,e.endOffset-1);e.setEnd(e.endContainer,e.endOffset);t.selection.SetSelection(e);d.node=BX.create("SPAN",{props:{id:"bx-mention-node"}},i);t.selection.Surround(d.node,e);e.setStart(d.node,1);e.setEnd(d.node,1);t.selection.SetSelection(e);if(BX.type.isNotEmptyString(o)){BX.onCustomEvent(window,"BX.MPF.MentionSelector:open",[{id:o,bindPosition:l(d.node,t)}])}}},10)}if(d.listen){var s=null;if(BX.type.isNotEmptyString(o)){s=BX.UI.SelectorManager.instances[o]}var a=false;if(s){a=s.getNavigationInstance().checkKeyboardNavigation({keyCode:n,tab:d.bSearch?"search":s?s.tabs.selected:false})}if(a){t.iframeKeyDownPreventDefault=true;e.stopPropagation();e.preventDefault()}}if(!d.listen&&d.listenFlag&&n===t.KEY_CODES["enter"]){var h=t.selection.GetRange();if(h.collapsed){var f=h.endContainer,u=t.GetIframeDoc();if(f){if(f.className!=="bxhtmled-metion"){f=BX.findParent(f,function(e){return e.className=="bxhtmled-metion"},u.body)}if(f&&f.className=="bxhtmled-metion"){t.selection.SetAfter(f)}}}}};window.onKeyUpHandler=function(e,t,i){var n=e.keyCode,o,r;if(!window["BXfpdStopMent"+i])return true;if(d.listen===true){if(n==t.KEY_CODES["escape"]){window["BXfpdStopMent"+i]()}else if(n!==t.KEY_CODES["enter"]&&n!==t.KEY_CODES["left"]&&n!==t.KEY_CODES["right"]&&n!==t.KEY_CODES["up"]&&n!==t.KEY_CODES["down"]){if(BX(d.node)){r=BX.util.trim(t.util.GetTextContent(d.node));var s=r;r=r.replace(/^[\+@]*/,"");d.bSearch=r.length>0;var a=window.MPFgetSelectorId("bx-mention-"+i+"-id");if(BX.type.isNotEmptyString(a)){var h=BX.UI.SelectorManager.instances[a];if(BX.type.isNotEmptyObject(h)){h.getSearchInstance().runSearch({text:r})}}if(d.leaveContent&&d._lastText&&s===""){window["BXfpdStopMent"+i]()}else if(d.leaveContent&&d.lastText&&s!==""&&r===""){d.bSearch=false;window["BXfpdStopMent"+i]();if(BX.type.isNotEmptyString(a)){BX.onCustomEvent(window,"BX.MPF.MentionSelector:open",[{id:a,bindPosition:l(d.node,t)}])}}d.lastText=r;d._lastText=s}else{window["BXfpdStopMent"+i]()}}}else{if(!e.shiftKey&&(n===t.KEY_CODES["space"]||n===t.KEY_CODES["escape"]||n===188||n===190)){o=t.selection.GetRange();if(o.collapsed){var f=o.endContainer,u=t.GetIframeDoc();if(f){if(f.className!=="bxhtmled-metion"){f=BX.findParent(f,function(e){return e.className=="bxhtmled-metion"},u.body)}if(f&&f.className=="bxhtmled-metion"){r=t.util.GetTextContent(f);var c=r.match(/[\s\.\,]$/);if(c||n===t.KEY_CODES["escape"]){f.innerHTML=r.replace(/[\s\.\,]$/,"");var p=BX.create("SPAN",{html:c||t.INVISIBLE_SPACE},u);t.util.InsertAfter(p,f);t.selection.SetAfter(p)}}}}}}};window.onTextareaKeyDownHandler=function(e,t,i){var n=e.keyCode;if(d.listen&&n==t.KEY_CODES["enter"]){var o=window.MPFgetSelectorId("bx-mention-"+i+"-id");if(BX.type.isNotEmptyString(o)){var r=BX.UI.SelectorManager.instances[o];if(BX.type.isNotEmptyObject(r)){r.getNavigationInstance().selectFirstItem({tab:d.bSearch?"search":r.tabs.selected})}}t.textareaKeyDownPreventDefault=true;e.stopPropagation();e.preventDefault()}};window.onTextareaKeyUpHandler=function(e,t,i){var n,o,r=e.keyCode;var s=window.MPFgetSelectorId("bx-mention-"+i+"-id");if(d.listen===true){if(r==27){window["BXfpdStopMent"+i]()}else if(r!==13){o=t.textareaView.GetValue(false);n=t.textareaView.GetCursorPosition();if(o.indexOf("+")!==-1||o.indexOf("@")!==-1){var a=o.substr(0,n),l=Math.max(a.lastIndexOf("+"),a.lastIndexOf("@"));if(l>=0){var h=a.substr(l),f=h;h=h.replace(/^[\+@]*/,"");d.bSearch=h.length>0;var u=null;if(BX.type.isNotEmptyString(s)){u=BX.UI.SelectorManager.instances[s]}if(BX.type.isNotEmptyObject(u)){u.getSearchInstance().runSearch({text:h})}if(d.leaveContent&&d._lastText&&(f===""||h==="")){window["BXfpdStopMent"+i]()}d.lastText=h;d._lastText=f}}}}else{if(r==16){var c=this;this.shiftPressed=true;if(this.shiftTimeout)this.shiftTimeout=clearTimeout(this.shiftTimeout);this.shiftTimeout=setTimeout(function(){c.shiftPressed=false},100)}if(r==107||(e.shiftKey||e.modifiers>3||this.shiftPressed)&&BX.util.in_array(r,[187,50,107,43,61])){n=t.textareaView.element.selectionStart;if(n>0){o=t.textareaView.element.value;var p=o.substr(n-1,1);if(p&&(p==="+"||p==="@")){d.listen=true;d.listenFlag=true;d.text="";d.textarea=true;d.bSearch=false;d.mode="plus";if(BX.type.isNotEmptyString(s)){BX.onCustomEvent(window,"BX.MPF.MentionSelector:open",[{id:s}])}}}}}};var l=function(e,t){var i=BX.pos(e),n=BX.pos(t.dom.areaCont),o=BX.GetWindowScrollPos(t.GetIframeDoc()),r=n.top+i.bottom-o.scrollTop+2,s=n.left+i.right-o.scrollLeft;return{top:r,left:s}};window.BxInsertMention=function(e){var t=e.item,i=e.type,n=e.formID,o=e.editorId,r=e.bNeedComa,a=s.getEditor(o),l;if(i=="users"&&t&&t.entityId>0&&a){if(a.GetViewMode()=="wysiwyg"){var h=a.GetIframeDoc(),f=a.selection.GetRange(),u=BX.create("SPAN",{props:{className:"bxhtmled-metion"},text:BX.util.htmlspecialcharsback(t.name)},h);l=BX.create("SPAN",{html:r?",&nbsp;":"&nbsp;"},h);a.SetBxTag(u,{tag:"postuser",params:{value:t.entityId}});if(BX(d.node)&&d.node.parentNode){a.util.ReplaceNode(d.node,u)}else{a.selection.InsertNode(u,f)}if(u&&u.parentNode){var c=BX.findParent(u,{className:"bxhtmled-metion"},h.body);if(c){a.util.InsertAfter(u,c)}}if(u&&u.parentNode){a.util.InsertAfter(l,u);a.selection.SetAfter(l)}}else if(a.GetViewMode()=="code"&&a.bbCode){a.textareaView.Focus();var p=a.textareaView.GetValue(false),m=a.textareaView.GetCursorPosition(),v=p.substr(0,m),B=Math.max(v.lastIndexOf("+"),v.lastIndexOf("@"));if(B>=0&&m>B){a.textareaView.SetValue(p.substr(0,B)+p.substr(m));a.textareaView.element.setSelectionRange(B,B)}a.textareaView.WrapWith(false,false,"[USER="+t.entityId+"]"+t.name+"[/USER]"+(r?", ":" "))}if(e.fireAddEvent===true){BX.onCustomEvent(window,"onMentionAdd",[t])}var g=window.MPFgetSelectorId("bx-mention-"+n+"-id");if(BX.type.isNotEmptyString(g)){var X=BX.UI.SelectorManager.instances[g];if(BX.type.isNotEmptyObject(X)){if(typeof X.itemsSelected[t.id]!="undefined"){delete X.itemsSelected[t.id]}}}window["BXfpdStopMent"+n]();d["text"]="";if(a.GetViewMode()=="wysiwyg"){a.Focus();a.selection.SetAfter(l)}}};window.MPFgetSelectorId=function(e){var t=false;var i=BX(e);if(!i){return t}t=i.getAttribute("data-bx-selector-id");return t};window.MPFMentionInit=function(e,t){if(t.initDestination===true){BX.addCustomEvent("onAutoSaveRestoreDestination",function(t){if(BX.type.isNotEmptyObject(t)&&BX.type.isNotEmptyObject(t.data)&&BX.type.isNotEmptyObject(t.data["DEST_CODES[]"])&&BX.type.isNotEmptyString(t.formId)&&t.formId==e&&BX.UI.SelectorManager){var i=window.MPFgetSelectorId(t.formId);var n=BX.UI.SelectorManager.instances[i];if(!BX.type.isNotEmptyObject(n)){return}var o=null,r=null,s={},a=[],d=false;for(var l=0;l<t.data["DEST_CODES[]"].length;l++){o=t.data["DEST_CODES[]"][l];if(o=="UA"){s[o]="groups"}d=o.match(/^U(\d+)$/i);if(d){s[o]="users";continue}d=o.match(/^SG(\d+)$/i);if(d){s[o]="sonetgroups";continue}d=o.match(/^DR(\d+)$/i);if(d){s[o]="departments";continue}d=o.match(/^UE(.+)$/i);if(d&&BX.SocialnetworkUISelector){r=d[1];a.push({selectorId:i,name:BX.type.isNotEmptyString(t.data["INVITED_USER_NAME["+r+"]"])?t.data["INVITED_USER_NAME["+r+"]"]:"",lastName:BX.type.isNotEmptyString(t.data["INVITED_USER_LAST_NAME["+r+"]"])?t.data["INVITED_USER_LAST_NAME["+r+"]"]:"",email:r,createCrmContact:BX.type.isNotEmptyString(t.data["INVITED_USER_CREATE_CRM_CONTACT["+r+"]"])?t.data["INVITED_USER_CREATE_CRM_CONTACT["+r+"]"]:""})}}n.itemsSelected=s;BX.addCustomEvent(window,"BX.Main.SelectorV2:afterInitDialog",function(e){if(e.id==i&&BX.SocialnetworkUISelector){for(var t=0;t<a.length;t++){BX.SocialnetworkUISelector.inviteEmailAddUser(a[t])}}})}});BX.addCustomEvent(window,"onMentionAdd",function(t){var i=window.MPFgetSelectorId(e);var n=BX.UI.SelectorManager.instances[i];if(!BX.type.isNotEmptyObject(n)){return}var o=BX.Main.selectorManagerV2.getById(n.id);if(BX.type.isNotEmptyObject(o)&&BX.type.isBoolean(o.initialized)){if(o.initialized){if(!BX.type.isNotEmptyObject(n.entities.USERS.items[t.id])){n.entities.USERS.items[t.id]=t}n.setOption("focusInputOnSelectItem","N");if(!BX.type.isNotEmptyString(n.itemsSelected[t.id])){n.selectItem({itemId:t.id,entityType:"USERS"})}}else{n.itemsSelected[t.id]="users";o.initDialog()}}})}window["BXfpdSelectCallbackMent"+e]=function(i){window.BxInsertMention({item:i.item,type:i.entityType.toLowerCase(),formID:e,editorId:t.editorId,fireAddEvent:t.initDestination})};window["BXfpdStopMent"+e]=function(){var t=window.MPFgetSelectorId("bx-mention-"+e+"-id");if(BX.type.isNotEmptyString(t)){var i=BX.UI.SelectorManager.instances[t];if(BX.type.isNotEmptyObject(i)){i.closeAllPopups();i.getSearchInstance().abortSearchRequest()}}};BX.ready(function(){var i=BX("bx-b-mention-"+e);var n=window.MPFgetSelectorId("bx-mention-"+e+"-id");if(n){BX.onCustomEvent(window,"BX.MPF.MentionSelector:init",[{id:n,openDialogWhenInit:false}])}BX.bind(i,"click",function(e){if(d.listen!==true){var o=s.getEditor(t.editorId),r=o.GetIframeDoc();if(o.GetViewMode()=="wysiwyg"&&r){d.listen=true;d.listenFlag=true;d.text="";d.leaveContent=false;d.mode="button";var a=o.selection.GetRange();if(BX(d.node)){BX.remove(BX(d.node))}o.InsertHtml('<span id="bx-mention-node">'+o.INVISIBLE_SPACE+"</span>",a);setTimeout(function(){if(n){BX.onCustomEvent(window,"BX.MPF.MentionSelector:open",[{id:n,bindNode:i}])}d.node=r.getElementById("bx-mention-node");if(d.node){a.setStart(d.node,0);if(d.node.firstChild&&d.node.firstChild.nodeType==3&&d.node.firstChild.nodeValue.length>0){a.setEnd(d.node,1)}else{a.setEnd(d.node,0)}o.selection.SetSelection(a)}o.Focus()},100)}else if(o.GetViewMode()=="code"){d.listen=true;d.listenFlag=true;d.text="";d.leaveContent=false;d.mode="button";setTimeout(function(){if(n){BX.onCustomEvent(window,"BX.MPF.MentionSelector:open",[{id:n,bindNode:i}])}},100)}BX.onCustomEvent(i,"mentionClick")}})})};window.BXfpdOnDialogOpen=function(){d.listen=true;d.listenFlag=true};window.BXfpdOnDialogClose=function(e){d.listen=false;setTimeout(function(){d.listenFlag=false;if(!d.listen){var t=s.getEditor(e.editorId);if(t){var i=t.GetIframeDoc();if(BX(d.node)){t.selection.SetAfter(d.node);if(d.leaveContent){t.util.ReplaceWithOwnChildren(d.node)}else{BX.remove(BX(d.node))}}t.Focus()}}},100)}})();
/* End */
;; /* /local/templates/shop/components/bitrix/catalog.element/detail/script.js?1597091650567*/
; /* /local/templates/shop/components/bitrix/forum.topic.reviews/Forum_comment/script.js?159706577221180*/
; /* /bitrix/components/bitrix/main.post.form/templates/.default/script.min.js?159569178660303*/

//# sourceMappingURL=page_5c59588ffec2c6b3fb93198f9156f50f.map.js