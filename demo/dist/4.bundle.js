webpackJsonp([4],{35:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),h=r(a),u=n(50),p=r(u),c=n(51),g=r(c),d=n(42),f=r(d),m=n(52),b=r(m),k=function(e){function t(){return i(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"createMarkup",value:function(){return{__html:(0,p.default)(g.default)}}},{key:"render",value:function(){var e=this;return h.default.createElement(f.default,null,h.default.createElement(b.default,{ref:function(t){e.$parent=t},dangerouslySetInnerHTML:this.createMarkup()}))}}]),t}(h.default.Component);t.default=k},41:function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},42:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: 7rem;\n  background-color: #fff;\n  border-radius: 1rem;\n  overflow: hidden;\n  box-shadow: 0 .5rem 2rem rgba(0, 0, 0, 0.34);\n"],["\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: 7rem;\n  background-color: #fff;\n  border-radius: 1rem;\n  overflow: hidden;\n  box-shadow: 0 .5rem 2rem rgba(0, 0, 0, 0.34);\n"]),i=n(1),s=function(e){return e&&e.__esModule?e:{default:e}}(i),o=s.default.div(r);t.default=o},50:function(e,t,n){(function(t){(function(){"use strict";function t(e){this.tokens=[],this.tokens.links={},this.options=e||p.defaults,this.rules=c.normal,this.options.gfm&&(this.options.tables?this.rules=c.tables:this.rules=c.gfm)}function n(e,t){if(this.options=t||p.defaults,this.links=e,this.rules=g.normal,this.renderer=this.options.renderer||new r,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=g.breaks:this.rules=g.gfm:this.options.pedantic&&(this.rules=g.pedantic)}function r(e){this.options=e||{}}function i(e){this.tokens=[],this.token=null,this.options=e||p.defaults,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options}function s(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function o(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function l(e,t){return e=e.source,t=t||"",function n(r,i){return r?(i=i.source||i,i=i.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,i),n):new RegExp(e,t)}}function a(e,t){return d[" "+e]||(/^[^:]+:\/*[^\/]*$/.test(e)?d[" "+e]=e+"/":d[" "+e]=e.replace(/[^\/]*$/,"")),e=d[" "+e],"//"===t.slice(0,2)?e.replace(/:[\s\S]*/,":")+t:"/"===t.charAt(0)?e.replace(/(:\/*[^\/]*)[\s\S]*/,"$1")+t:e+t}function h(){}function u(e){for(var t,n,r=1;r<arguments.length;r++){t=arguments[r];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function p(e,n,r){if(r||"function"==typeof n){r||(r=n,n=null),n=u({},p.defaults,n||{});var o,l,a=n.highlight,h=0;try{o=t.lex(e,n)}catch(e){return r(e)}l=o.length;var c=function(e){if(e)return n.highlight=a,r(e);var t;try{t=i.parse(o,n)}catch(t){e=t}return n.highlight=a,e?r(e):r(null,t)};if(!a||a.length<3)return c();if(delete n.highlight,!l)return c();for(;h<o.length;h++)!function(e){"code"!==e.type?--l||c():a(e.text,e.lang,function(t,n){return t?c(t):null==n||n===e.text?--l||c():(e.text=n,e.escaped=!0,void(--l||c()))})}(o[h])}else try{return n&&(n=u({},p.defaults,n)),i.parse(t.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(n||p.defaults).silent)return"<p>An error occurred:</p><pre>"+s(e.message+"",!0)+"</pre>";throw e}}var c={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:h,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:h,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:h,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};c.bullet=/(?:[*+-]|\d+\.)/,c.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,c.item=l(c.item,"gm")(/bull/g,c.bullet)(),c.list=l(c.list)(/bull/g,c.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+c.def.source+")")(),c.blockquote=l(c.blockquote)("def",c.def)(),c._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",c.html=l(c.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,c._tag)(),c.paragraph=l(c.paragraph)("hr",c.hr)("heading",c.heading)("lheading",c.lheading)("blockquote",c.blockquote)("tag","<"+c._tag)("def",c.def)(),c.normal=u({},c),c.gfm=u({},c.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),c.gfm.paragraph=l(c.paragraph)("(?!","(?!"+c.gfm.fences.source.replace("\\1","\\2")+"|"+c.list.source.replace("\\1","\\3")+"|")(),c.tables=u({},c.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=c,t.lex=function(e,n){return new t(n).lex(e)},t.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},t.prototype.token=function(e,t,n){for(var r,i,s,o,l,a,h,u,p,e=e.replace(/^ +$/gm,"");e;)if((s=this.rules.newline.exec(e))&&(e=e.substring(s[0].length),s[0].length>1&&this.tokens.push({type:"space"})),s=this.rules.code.exec(e))e=e.substring(s[0].length),s=s[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?s:s.replace(/\n+$/,"")});else if(s=this.rules.fences.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"code",lang:s[2],text:s[3]||""});else if(s=this.rules.heading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});else if(t&&(s=this.rules.nptable.exec(e))){for(e=e.substring(s[0].length),a={type:"table",header:s[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3].replace(/\n$/,"").split("\n")},u=0;u<a.align.length;u++)/^ *-+: *$/.test(a.align[u])?a.align[u]="right":/^ *:-+: *$/.test(a.align[u])?a.align[u]="center":/^ *:-+ *$/.test(a.align[u])?a.align[u]="left":a.align[u]=null;for(u=0;u<a.cells.length;u++)a.cells[u]=a.cells[u].split(/ *\| */);this.tokens.push(a)}else if(s=this.rules.lheading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:"="===s[2]?1:2,text:s[1]});else if(s=this.rules.hr.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"hr"});else if(s=this.rules.blockquote.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"blockquote_start"}),s=s[0].replace(/^ *> ?/gm,""),this.token(s,t,!0),this.tokens.push({type:"blockquote_end"});else if(s=this.rules.list.exec(e)){for(e=e.substring(s[0].length),o=s[2],this.tokens.push({type:"list_start",ordered:o.length>1}),s=s[0].match(this.rules.item),r=!1,p=s.length,u=0;u<p;u++)a=s[u],h=a.length,a=a.replace(/^ *([*+-]|\d+\.) +/,""),~a.indexOf("\n ")&&(h-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+h+"}","gm"),"")),this.options.smartLists&&u!==p-1&&(l=c.bullet.exec(s[u+1])[0],o===l||o.length>1&&l.length>1||(e=s.slice(u+1).join("\n")+e,u=p-1)),i=r||/\n\n(?!\s*$)/.test(a),u!==p-1&&(r="\n"===a.charAt(a.length-1),i||(i=r)),this.tokens.push({type:i?"loose_item_start":"list_item_start"}),this.token(a,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(s=this.rules.html.exec(e))e=e.substring(s[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===s[1]||"script"===s[1]||"style"===s[1]),text:s[0]});else if(!n&&t&&(s=this.rules.def.exec(e)))e=e.substring(s[0].length),this.tokens.links[s[1].toLowerCase()]={href:s[2],title:s[3]};else if(t&&(s=this.rules.table.exec(e))){for(e=e.substring(s[0].length),a={type:"table",header:s[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3].replace(/(?: *\| *)?\n$/,"").split("\n")},u=0;u<a.align.length;u++)/^ *-+: *$/.test(a.align[u])?a.align[u]="right":/^ *:-+: *$/.test(a.align[u])?a.align[u]="center":/^ *:-+ *$/.test(a.align[u])?a.align[u]="left":a.align[u]=null;for(u=0;u<a.cells.length;u++)a.cells[u]=a.cells[u].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(a)}else if(t&&(s=this.rules.paragraph.exec(e)))e=e.substring(s[0].length),this.tokens.push({type:"paragraph",text:"\n"===s[1].charAt(s[1].length-1)?s[1].slice(0,-1):s[1]});else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"text",text:s[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var g={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ <>]+(@|:\/)[^ <>]+)>/,url:h,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)([\s\S]*?[^`])\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:h,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};g._inside=/(?:\[[^\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/,g._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,g.link=l(g.link)("inside",g._inside)("href",g._href)(),g.reflink=l(g.reflink)("inside",g._inside)(),g.normal=u({},g),g.pedantic=u({},g.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),g.gfm=u({},g.normal,{escape:l(g.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:l(g.text)("]|","~]|")("|","|https?://|")()}),g.breaks=u({},g.gfm,{br:l(g.br)("{2,}","*")(),text:l(g.gfm.text)("{2,}","*")()}),n.rules=g,n.output=function(e,t,r){return new n(t,r).output(e)},n.prototype.output=function(e){for(var t,n,r,i,o="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),o+=i[1];else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),"@"===i[2]?(n=s(":"===i[1].charAt(6)?this.mangle(i[1].substring(7)):this.mangle(i[1])),r=this.mangle("mailto:")+n):(n=s(i[1]),r=n),o+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(e))){if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),e=e.substring(i[0].length),o+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):s(i[0]):i[0];else if(i=this.rules.link.exec(e))e=e.substring(i[0].length),this.inLink=!0,o+=this.outputLink(i,{href:i[2],title:i[3]}),this.inLink=!1;else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){o+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,o+=this.outputLink(i,t),this.inLink=!1}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),o+=this.renderer.strong(this.output(i[2]||i[1]));else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),o+=this.renderer.em(this.output(i[2]||i[1]));else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),o+=this.renderer.codespan(s(i[2].trim(),!0));else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),o+=this.renderer.br();else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),o+=this.renderer.del(this.output(i[1]));else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),o+=this.renderer.text(s(this.smartypants(i[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(i[0].length),n=s(i[1]),r=n,o+=this.renderer.link(r,null,n);return o},n.prototype.outputLink=function(e,t){var n=s(t.href),r=t.title?s(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,s(e[1]))},n.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},n.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,i=0;i<r;i++)t=e.charCodeAt(i),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},r.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+s(t,!0)+'">'+(n?e:s(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:s(e,!0))+"\n</code></pre>"},r.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},r.prototype.html=function(e){return e},r.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},r.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},r.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},r.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},r.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},r.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},r.prototype.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},r.prototype.strong=function(e){return"<strong>"+e+"</strong>"},r.prototype.em=function(e){return"<em>"+e+"</em>"},r.prototype.codespan=function(e){return"<code>"+e+"</code>"},r.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.prototype.del=function(e){return"<del>"+e+"</del>"},r.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(o(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return n}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return n}this.options.baseUrl&&!f.test(e)&&(e=a(this.options.baseUrl,e));var i='<a href="'+e+'"';return t&&(i+=' title="'+t+'"'),i+=">"+n+"</a>"},r.prototype.image=function(e,t,n){this.options.baseUrl&&!f.test(e)&&(e=a(this.options.baseUrl,e));var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.prototype.text=function(e){return e},i.parse=function(e,t,n){return new i(t,n).parse(e)},i.prototype.parse=function(e){this.inline=new n(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},i.prototype.next=function(){return this.token=this.tokens.pop()},i.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},i.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},i.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,i="",s="";for(n="",e=0;e<this.token.header.length;e++)({header:!0,align:this.token.align[e]}),n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(i+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});s+=this.renderer.tablerow(n)}return this.renderer.table(i,s);case"blockquote_start":for(var s="";"blockquote_end"!==this.next().type;)s+=this.tok();return this.renderer.blockquote(s);case"list_start":for(var s="",o=this.token.ordered;"list_end"!==this.next().type;)s+=this.tok();return this.renderer.list(s,o);case"list_item_start":for(var s="";"list_item_end"!==this.next().type;)s+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(s);case"loose_item_start":for(var s="";"list_item_end"!==this.next().type;)s+=this.tok();return this.renderer.listitem(s);case"html":var l=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(l);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}};var d={},f=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;h.exec=h,p.options=p.setOptions=function(e){return u(p.defaults,e),p},p.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new r,xhtml:!1,baseUrl:null},p.Parser=i,p.parser=i.parse,p.Renderer=r,p.Lexer=t,p.lexer=t.lex,p.InlineLexer=n,p.inlineLexer=n.output,p.parse=p,e.exports=p}).call(function(){return this||("undefined"!=typeof window?window:t)}())}).call(t,n(41))},51:function(e,t){e.exports="<h1 id=native-scroll-augment>Native Scroll Augment</h1> <p>A small engine that augments, few additional functionalities to native scroll.</p> <p><a href=https://codeclimate.com/github/iamvijaydev/native-scroll-augment/maintainability><img src=https://api.codeclimate.com/v1/badges/a2cc06280bab4be9d957/maintainability /></a> <a href=https://codeclimate.com/github/iamvijaydev/native-scroll-augment/test_coverage><img src=https://api.codeclimate.com/v1/badges/a2cc06280bab4be9d957/test_coverage /></a></p> <h2 id=added-functionalities>Added functionalities</h2> <h3 id=connected-scrolling>Connected scrolling</h3> <p>Connect two or more scrollable areas. Meaning when we scroll one area, others scroll with it.</p> <h3 id=kinetic-scrolling>Kinetic scrolling</h3> <p>Kinetic scrolling with a tap, swipe, and flick features on a non-touch device. This feature can be enabled for devices that do not support smooth scrolling.</p> <h3 id=helper-functions>Helper functions</h3> <p>Helper functions to smooth scroll a scrollable area to a specific scroll position, to scroll start, or to scroll end. Also, a helper function to smooth scroll a scrollable area by a certain value.</p> <h2 id=installation-not-published-yet->Installation (Not published yet)</h2> <pre><code class=lang-shell>yarn add native-scroll-augment\n\n# or \n\nnpm install native-scroll-augment --save\n</code></pre> <h2 id=usage>Usage</h2> <pre><code class=lang-javascript>// import the package\nimport NativeScrollAugment from &#39;native-scroll-augment&#39;;\n\n// create an instance\nconst nsa = new NativeScrollAugment($parent, [$scrollArea], options);\n\n// initialize the instance\nnsa.init()\n</code></pre> "},52:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  padding: 2rem;\n  overflow-y: auto;\n  color: #24292e;\n  height: 100%;\n  box-sizing: border-box;\n\n  > h1 {\n    font-size: 3rem;\n    padding: 0 0 1rem 0;\n    margin: 0 0 1rem 0;\n    border-bottom: 1px solid #eaecef;\n  }\n\n  > h2 {\n    font-size: 2rem;\n    padding: 0 0 1rem 0;\n    margin: 3rem 0 1rem 0;\n    border-bottom: 1px solid #eaecef;\n  }\n\n  > h3 {\n    font-size: 1.7rem;\n    font-weight: 480;\n    margin: 2.5rem 0 0 0;\n  }\n\n  > p {\n    font-size: 1.5rem;\n    margin: 2rem 0 2rem 0;\n  }\n\n  p:empty {\n    display: none;\n  }\n\n  pre {\n    margin: 1rem 0;\n    padding: 1rem;\n    background: #eaecef;\n    border-radius: 3px;\n  }\n\n  code {\n    font-size: 1.3rem;\n  }\n"],["\n  padding: 2rem;\n  overflow-y: auto;\n  color: #24292e;\n  height: 100%;\n  box-sizing: border-box;\n\n  > h1 {\n    font-size: 3rem;\n    padding: 0 0 1rem 0;\n    margin: 0 0 1rem 0;\n    border-bottom: 1px solid #eaecef;\n  }\n\n  > h2 {\n    font-size: 2rem;\n    padding: 0 0 1rem 0;\n    margin: 3rem 0 1rem 0;\n    border-bottom: 1px solid #eaecef;\n  }\n\n  > h3 {\n    font-size: 1.7rem;\n    font-weight: 480;\n    margin: 2.5rem 0 0 0;\n  }\n\n  > p {\n    font-size: 1.5rem;\n    margin: 2rem 0 2rem 0;\n  }\n\n  p:empty {\n    display: none;\n  }\n\n  pre {\n    margin: 1rem 0;\n    padding: 1rem;\n    background: #eaecef;\n    border-radius: 3px;\n  }\n\n  code {\n    font-size: 1.3rem;\n  }\n"]),i=n(1),s=function(e){return e&&e.__esModule?e:{default:e}}(i),o=s.default.article(r);t.default=o}});