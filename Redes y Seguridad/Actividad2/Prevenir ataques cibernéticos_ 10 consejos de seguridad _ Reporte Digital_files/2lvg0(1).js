advads={supports_localstorage:function(){"use strict";try{if(!window||window.localStorage===undefined){return false}window.localStorage.setItem("x","x");window.localStorage.removeItem("x");return true}catch(e){return false}},max_per_session:function(name,max){var num=1;if(max===undefined||parseInt(max)===0){max=1}if(this.cookie_exists(name)){if(this.get_cookie(name)>=max){return true}num=num+parseInt(this.get_cookie(name))}this.set_cookie(name,num);return false},count_up:function(name,exdays){var num=1;if(this.cookie_exists(name)){num=num+parseInt(this.get_cookie(name))}this.set_cookie(name,num)},set_cookie_exists:function(name){if(get_cookie(name)){return true}set_cookie(name,"",0);return false},get_cookie:function(name){var i,x,y,ADVcookies=document.cookie.split(";");for(i=0;i<ADVcookies.length;i++){x=ADVcookies[i].substr(0,ADVcookies[i].indexOf("="));y=ADVcookies[i].substr(ADVcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x===name){return unescape(y)}}},set_cookie:function(name,value,exdays,path,domain,secure){var expiry=exdays==null?null:exdays*24*60*60;this.set_cookie_sec(name,value,expiry,path,domain,secure)},set_cookie_sec:function(name,value,expiry,path,domain,secure){var exdate=new Date;exdate.setSeconds(exdate.getSeconds()+parseInt(expiry));document.cookie=name+"="+escape(value)+(expiry==null?"":"; expires="+exdate.toUTCString())+(path==null?"; path=/":"; path="+path)+(domain==null?"":"; domain="+domain)+(secure==null?"":"; secure")},cookie_exists:function(name){var c_value=this.get_cookie(name);if(c_value!==null&&c_value!==""&&c_value!==undefined){return true}return false},move:function(element,target,options){var el=jQuery(element);var target_string=target;if(typeof options==="undefined"){options={}}if(typeof options.css==="undefined"){options.css={}}if(typeof options.method==="undefined"){options.method="prependTo"}if(target===""&&typeof options.target!=="undefined"){switch(options.target){case"wrapper":var offset="left";if(typeof options.offset!=="undefined"){offset=options.offset}target=this.find_wrapper(element,offset);break}}if(typeof options.moveintohidden==="undefined"){target=jQuery(target).filter(":visible")}else{target=jQuery(target)}if(target.length>1){console.log("Advanced Ads: element '"+target_string+"' found "+target.length+" times.")}switch(options.method){case"insertBefore":el.insertBefore(target);break;case"insertAfter":el.insertAfter(target);break;case"appendTo":el.appendTo(target);break;case"prependTo":el.prependTo(target);break;default:el.prependTo(target)}},set_parent_relative:function(element,options){var options=typeof options!=="undefined"?options:{};var el=jQuery(element);var parent=el.parent();if(options.use_grandparent){parent=parent.parent()}if(parent.css("position")==="static"||parent.css("position")===""){parent.css("position","relative")}},fix_element:function(element,options){var options=typeof options!=="undefined"?options:{};var el=jQuery(element);if(options.use_grandparent){this.set_parent_relative(el.parent())}else{this.set_parent_relative(el)}if(options.is_invisible){el.show()}var topoffset=parseInt(el.offset().top);var leftoffset=parseInt(el.offset().left);if(options.is_invisible){el.hide()}if("left"===options.offset){var rightoffset=jQuery(window).width()-leftoffset-el.outerWidth();el.css("position","fixed").css("top",topoffset+"px").css("right",rightoffset+"px").css("left","")}else{el.css("position","fixed").css("top",topoffset+"px").css("left",leftoffset+"px").css("right","")}},find_wrapper:function(element,offset){var returnValue;jQuery("body").children().each(function(key,value){if(value.id!==element.substring(1)){var checkedelement=jQuery(value);if(offset==="right"&&checkedelement.offset().left+jQuery(checkedelement).width()<jQuery(window).width()||offset==="left"&&checkedelement.offset().left>0){if(checkedelement.css("position")==="static"||checkedelement.css("position")===""){checkedelement.css("position","relative")}returnValue=value;return false}}});return returnValue},center_fixed_element:function(element){var el=jQuery(element);var left=jQuery(window).width()/2-parseInt(el.css("width"))/2;el.css("left",left+"px")},center_vertically:function(element){var el=jQuery(element);var left=jQuery(window).height()/2-parseInt(el.css("height"))/2;if(el.css("position")!=="fixed"){left-=topoffset=parseInt(el.offset().top)}el.css("top",left+"px")},close:function(element){var wrapper=jQuery(element);wrapper.remove()},wait_for_images:function($el,ready_callback){var loaded_count=0;var srcs=[];$el.find('img[src][src!=""]').each(function(){srcs.push(this.src)});if(srcs.length===0){ready_callback.call($el)}jQuery.each(srcs,function(i,src){var image=new Image;image.src=src;var events="load error";jQuery(image).one(events,function me(event){jQuery(this).off(events,me);loaded_count++;if(loaded_count==srcs.length){ready_callback.call($el[0]);return false}})})},privacy:{get_state:function(){if(!window.advads_options||!window.advads_options.privacy){return"not_needed"}var options=window.advads_options.privacy;if(!options.enabled){return"not_needed"}var method=options["consent-method"]?options["consent-method"]:"0";switch(method){case"0":return"not_needed";break;case"custom":if(options["custom-cookie-value"===undefined]||options["custom-cookie-value"]===undefined){return"not_needed"}var found=advads.get_cookie(options["custom-cookie-name"]);if(typeof found!=="string"){return"unknown"}if(options["custom-cookie-value"]===""&&found===""||options["custom-cookie-value"]!==""&&found.indexOf(options["custom-cookie-value"])!==-1){return"accepted"}return"unknown";break;default:return advads.cookie_exists(method)?"accepted":"unknown"}},is_adsense_npa_enabled:function(){if(!window.advads_options||!window.advads_options.privacy){return true}var options=window.advads_options.privacy;return!!options["show-non-personalized-adsense"]}}};jQuery(document).ready(function(){if(advads.supports_localstorage()&&localStorage.getItem("advads_frontend_picker")){var advads_picker_cur,advads_picker_overlay=jQuery("<div id='advads-picker-overlay'>"),advads_picker_no=[document.body,document.documentElement,document];advads_picker_overlay.css({position:"absolute",border:"solid 2px #428bca",backgroundColor:"rgba(66,139,202,0.5)",boxSizing:"border-box",zIndex:1e6,pointerEvents:"none"}).prependTo("body");jQuery(document).mousemove(function(e){if(e.target===advads_picker_cur){return}if(~advads_picker_no.indexOf(e.target)){advads_picker_cur=null;advads_picker_overlay.hide();return}var target=jQuery(e.target),offset=target.offset(),width=target.outerWidth(),height=target.outerHeight();advads_picker_cur=e.target;advads_picker_overlay.css({top:offset.top,left:offset.left,width:width,height:height}).show();console.log(jQuery(advads_picker_cur).getPath())});jQuery(document).click(function(e){var path=jQuery(advads_picker_cur).getPath();localStorage.setItem("advads_frontend_element",path);window.location=localStorage.getItem("advads_prev_url")})}});jQuery.fn.extend({getPath:function(path,depth){if(typeof path==="undefined")path="";if(typeof depth==="undefined")depth=0;if(this.is("html")){return"html > "+path}else if(3===depth){return path}var cur=this.get(0).nodeName.toLowerCase();var el_id=this.attr("id"),el_class=this.attr("class");depth=depth+1;if(typeof el_id!=="undefined"&&!/\d/.test(el_id)){cur+="#"+el_id}else if(typeof el_class!=="undefined"){el_class=el_class.split(/[\s\n]+/);el_class=jQuery.grep(el_class,function(element,index){return!/\d/.test(element)});if(el_class.length){cur+="."+el_class.slice(0,2).join(".")}}if(this.siblings(cur).length){cur+=":eq("+this.siblings(cur).addBack().not("#advads-picker-overlay").index(this)+")"}if(path===""){return this.parent().getPath(cur,depth)}else{return this.parent().getPath(cur+" > "+path,depth)}}});
var advanced_ads_resizetimeout=1000;
var advanced_ads_cookieexpires=30;
var advanced_ads_browser_width=advanced_ads_get_browser_width();
if(window.advads!==undefined&&! advads.get_cookie('advanced_ads_browser_width') ||
advads.get_cookie('advanced_ads_browser_width')!==advanced_ads_browser_width){
advanced_ads_save_width(advanced_ads_browser_width);
}
if(window.addEventListener){
window.addEventListener("resize", advanced_ads_resize_window, false);
}else if(window.attachEvent){
window.attachEvent("onresize", advanced_ads_resize_window);
}
function advanced_ads_resize_window (){
advads_resize_delay(function(){
var previous_width=advanced_ads_browser_width;
advanced_ads_browser_width=advanced_ads_get_browser_width();
if(previous_width===advanced_ads_browser_width){
return;
}
advanced_ads_save_width(advanced_ads_browser_width);
var advanced_ads_responsive=window.advanced_ads_responsive||{}
if(window.jQuery&&parseInt(advanced_ads_responsive.reload_on_resize, 10)){
jQuery(document).triggerHandler('advanced-ads-resize-window');
}}, advanced_ads_resizetimeout);
}
function advanced_ads_save_width(width){
if(window.advads!==undefined){
advads.set_cookie('advanced_ads_browser_width', width, advanced_ads_cookieexpires);
}}
var advads_resize_delay=(function(){
var timer=0;
return function (callback, ms){
clearTimeout(timer);
timer=setTimeout(callback, ms);
};})();
function advanced_ads_get_browser_width(){
if(window.jQuery){
return jQuery(window).width();
}else{
var browserWidth=0;
if(typeof(window.innerWidth)=='number'){
browserWidth=window.innerWidth;
}else if(document.documentElement&&document.documentElement.clientWidth){
browserWidth=document.documentElement.clientWidth;
}else if(document.body&&document.body.clientWidth){
browserWidth=document.body.clientWidth;
}
return browserWidth;
}};
;(function($){
var cname='advads_procfp';
var cname_vc='advanced_ads_ad_clicks';
var PATH=null;
var DOMAIN=null;
function jsonDecode(str){
try {
var res=JSON.parse(str);
return res;
} catch(Ex){
return null;
}}
$(document).on('advads-passive-cb-conditions', function(e, cbs){
cbs.conditions['ad_clicks']='check_ad_clicks';
cbs['check_ad_clicks']=function(options, ad){
if(advads.cookie_exists(cname_vc + '_' + ad.id)){
var C_vc=advads.get_cookie(cname_vc + '_' + ad.id);
C_vc=jsonDecode(C_vc);
}
if(C_vc){
var now=parseInt(new Date().getTime() / 1000);
for(var i in C_vc){
if('_' + options.expiration==i){
if(C_vc[i]['ttl'] >=now&&C_vc[i]['count'] >=parseInt(options.limit)){
return false;
}}
}}
return true;
};});
var cfpTracker=function(){
this.$elements={};
this.currentIFrame=false;
this.focusLost=false;
this.init();
}
cfpTracker.prototype={
constructor: cfpTracker,
init: function(){
var that=this;
$(document).on('click', 'a[data-cfpa]', function(){
that.onClick(parseInt($(this).attr('data-cfpa')));
});
$(window).on('blur', function(){
if(false!==that.currentIFrame){
that.onClick(that.currentIFrame);
that.currentIFrame=false;
that.focusLost=true;
}});
$(document).on('mouseenter', 'div[data-cfpa]', function(){
var id=parseInt($(this).attr('data-cfpa'));
that.addElement(id);
});
},
addElement: function($el){
if(false===$el instanceof jQuery){
$el=$('[data-cfpa="' + $el + '"]');
}
var hasIframe=$el.find('iframe').length ? true:false;
if(!hasIframe){
if(!$el.find('a').length){
return;
}}
var adID=parseInt($el.attr('data-cfpa'));
this.$elements[adID]=$el;
$el.removeAttr('data-cfpa');
if(hasIframe){
$el.find('iframe').first().attr({
'data-cfpa': adID,
})
if($el.attr('data-cfph')){
$el.find('iframe').first().attr({
'data-cfph': $el.attr('data-cfph'),
})
}}else{
$el.find('a').not('.advads-edit-button').first().attr({
'data-cfpa': adID,
})
if($el.attr('data-cfph')){
$el.find('a').not('.advads-edit-button').first().attr({
'data-cfph': $el.attr('data-cfph'),
})
}}
$el.removeAttr('data-cfph');
if(advads.cookie_exists(cname_vc + '_' + adID)){
var C_vc=advads.get_cookie(cname_vc + '_' + adID);
C_vc=jsonDecode(C_vc);
if(C_vc){
var now=parseInt(new Date().getTime() / 1000), cookie_modified=false;
for(var i in C_vc){
if(!C_vc.hasOwnProperty(i)) continue;
if('exp'==i) continue;
if(C_vc[i]['ttl'] < now){
var period=parseFloat(i.substr(1));
var newTTL=C_vc[i]['ttl'];
while(newTTL < now){
newTTL +=period * 60 * 60;
}
C_vc[i]['ttl']=newTTL;
C_vc[i]['count']=0;
cookie_modified=true;
}}
if(cookie_modified){
var expTime=new Date(C_vc['exp']);
advads.set_cookie_sec(cname_vc + '_' + adID, JSON.stringify(C_vc, 'false', false), parseInt(expTime.getTime() / 1000), PATH, DOMAIN);
}}
}},
onClick: function(ID){
var C=false, C_vc=false;
if($('[data-cfpa="' + ID + '"]').attr('data-cfph')){
if(advads.cookie_exists(cname_vc + '_' + ID)){
C_vc=advads.get_cookie(cname_vc + '_' + ID);
C_vc=jsonDecode(C_vc);
}
if(C_vc){
for(var h in C_vc){
if(!C_vc.hasOwnProperty(h)) continue;
if('exp'==h) continue;
var count=parseInt(C_vc[h]['count']);
C_vc[h]['count']=count + 1;
}
var now=new Date();
var expiry=new Date(C_vc.exp);
var expirySecs=parseInt(( expiry.getTime() - now.getTime()) / 1000);
advads.set_cookie_sec(cname_vc + '_' + ID, JSON.stringify(C_vc, 'false', false), expirySecs, PATH, DOMAIN);
}else{
var H=$('[data-cfpa="' + ID + '"]').attr('data-cfph').split('_');
var cval={}, maxHValue=0;
var d=new Date();
var now=new Date();
for(var h in H){
if(parseFloat(H[h]) > maxHValue){
maxHValue=parseFloat(H[h]);
}
cval['_' + H[h]]={
count: 1,
ttl: parseInt(((now.getTime() / 1000) +(parseFloat(H[h]) * 3600))),
};}
d.setTime(d.getTime() +(maxHValue * 60 * 60 * 1000));
var expires="expires="+ d.toUTCString();
var expirySecs=parseInt(( d.getTime() - now.getTime()) / 1000);
cval['exp']=expires;
advads.set_cookie_sec(cname_vc + '_' + ID, JSON.stringify(cval, 'false', false), expirySecs, PATH, DOMAIN);
}}else{
if(advads.cookie_exists(cname + '_' + ID)){
C=advads.get_cookie(cname + '_' + ID);
C=jsonDecode(C);
}
if(C){
var count=parseInt(C.count);
C.count=count +1;
var now=new Date();
var expiry=new Date(C.exp);
var expirySecs=(expiry.getTime() - now.getTime()) / 1000;
advads.set_cookie_sec(cname + '_' + ID, JSON.stringify(C, 'false', false), expirySecs, PATH, DOMAIN);
if(advadsCfpClickLimit <=C.count&&'undefined'!=typeof advadsCfpBan){
var d=new Date();
d.setTime(d.getTime() +(advadsCfpBan*24*60*60*1000));
var ban=(d.getTime() - now.getTime()) / 1000;
advads.set_cookie_sec('advads_pro_cfp_ban', 1, ban, PATH, DOMAIN);
}}else{
var d=new Date();
var now=new Date();
d.setTime(d.getTime() +(advadsCfpExpHours*60*60*1000));
var expires="expires="+ d.toUTCString();
var expirySecs=(d.getTime() - now.getTime()) / 1000;
advads.set_cookie_sec(cname + '_' + ID, '{"count":1,"exp":"' + expires + '"}', expirySecs, PATH, DOMAIN);
}}
},
}
$(document).on('mouseenter', 'iframe[data-cfpa]', function(){
var ID=parseInt($(this).attr('data-cfpa'));
advadsProCfp.currentIFrame=ID;
}).on('mouseleave', '[data-cfpa]', function(){
advadsProCfp.currentIFrame=false;
if(advadsProCfp.focusLost){
advadsProCfp.focusLost=false;
$(window).focus();
}});
$(function(){
window.advadsProCfp=new cfpTracker();
for(var i in advadsCfpQueue){
if(advadsCfpQueue.hasOwnProperty(i)){
advadsProCfp.addElement(advadsCfpQueue[i]);
}}
advadsCfpQueue=[];
if('undefined'==typeof window.advadsCfpPath) return;
if(''!=advadsCfpPath){
PATH=advadsCfpPath;
}
if(''!=advadsCfpDomain){
DOMAIN=advadsCfpDomain;
}});
})(window.jQuery);
(function webpackUniversalModuleDefinition(root, factory){
if(typeof exports==='object'&&typeof module==='object')
module.exports=factory();
else if(typeof define==='function'&&define.amd)
define([], factory);
else if(typeof exports==='object')
exports["advads_postscribe"]=factory();
else
root["advads_postscribe"]=factory();
})(this, function(){
return  (function(modules){
var installedModules={};
function __webpack_require__(moduleId){
if(installedModules[moduleId])
return installedModules[moduleId].exports;
var module=installedModules[moduleId]={
exports: {},
id: moduleId,
loaded: false
};
modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
module.loaded=true;
return module.exports;
}
__webpack_require__.m=modules;
__webpack_require__.c=installedModules;
__webpack_require__.p="";
return __webpack_require__(0);
})
([
function(module, exports, __webpack_require__){
'use strict';
var _postscribe=__webpack_require__(1);
var _postscribe2=_interopRequireDefault(_postscribe);
function _interopRequireDefault(obj){ return obj&&obj.__esModule ? obj:{ 'default': obj };}
module.exports=_postscribe2['default'];
},
function(module, exports, __webpack_require__){
'use strict';
exports.__esModule=true;
var _extends=Object.assign||function (target){ for (var i=1; i < arguments.length; i++){ var source=arguments[i]; for (var key in source){ if(Object.prototype.hasOwnProperty.call(source, key)){ target[key]=source[key]; }} } return target; };
exports['default']=postscribe;
var _writeStream=__webpack_require__(2);
var _writeStream2=_interopRequireDefault(_writeStream);
var _utils=__webpack_require__(4);
var utils=_interopRequireWildcard(_utils);
function _interopRequireWildcard(obj){ if(obj&&obj.__esModule){ return obj; }else{ var newObj={}; if(obj!=null){ for (var key in obj){ if(Object.prototype.hasOwnProperty.call(obj, key)) newObj[key]=obj[key]; }} newObj['default']=obj; return newObj; }}
function _interopRequireDefault(obj){ return obj&&obj.__esModule ? obj:{ 'default': obj };}
function doNothing(){}
var OPTIONS={
afterAsync: doNothing,
afterDequeue: doNothing,
afterStreamStart: doNothing,
afterWrite: doNothing,
autoFix: true,
beforeEnqueue: doNothing,
beforeWriteToken: function beforeWriteToken(tok){
return tok;
},
beforeWrite: function beforeWrite(str){
return str;
},
done: doNothing,
error: function error(e){
throw new Error(e.msg);
},
releaseAsync: false
};
var nextId=0;
var queue=[];
var active=null;
function nextStream(){
var args=queue.shift();
if(args){
var options=utils.last(args);
options.afterDequeue();
args.stream=runStream.apply(undefined, args);
options.afterStreamStart();
}}
function runStream(el, html, options){
active=new _writeStream2['default'](el, options);
active.id=nextId++;
active.name=options.name||active.id;
postscribe.streams[active.name]=active;
var doc=el.ownerDocument;
var stash={
close: doc.close,
open: doc.open,
write: doc.write,
writeln: doc.writeln
};
function _write(str){
str=options.beforeWrite(str);
active.write(str);
options.afterWrite(str);
}
_extends(doc, {
close: doNothing,
open: doNothing,
write: function write(){
for (var _len=arguments.length, str=Array(_len), _key=0; _key < _len; _key++){
str[_key]=arguments[_key];
}
return _write(str.join(''));
},
writeln: function writeln(){
for (var _len2=arguments.length, str=Array(_len2), _key2=0; _key2 < _len2; _key2++){
str[_key2]=arguments[_key2];
}
return _write(str.join('') + '\n');
}});
var oldOnError=active.win.onerror||doNothing;
active.win.onerror=function (msg, url, line){
options.error({ msg: msg + ' - ' + url + ': ' + line });
oldOnError.apply(active.win, [msg, url, line]);
};
active.write(html, function (){
_extends(doc, stash);
active.win.onerror=oldOnError;
options.done();
active=null;
nextStream();
});
return active;
}
function postscribe(el, html, options){
if(utils.isFunction(options)){
options={ done: options };}else if(options==='clear'){
queue=[];
active=null;
nextId=0;
return;
}
options=utils.defaults(options, OPTIONS);
if(/^#/.test(el)){
el=window.document.getElementById(el.substr(1));
}else{
el=el.jquery ? el[0]:el;
}
var args=[el, html, options];
el.postscribe={
cancel: function cancel(){
if(args.stream){
args.stream.abort();
}else{
args[1]=doNothing;
}}
};
options.beforeEnqueue(args);
queue.push(args);
if(!active){
nextStream();
}
return el.postscribe;
}
_extends(postscribe, {
streams: {},
queue: queue,
WriteStream: _writeStream2['default']
});
},
function(module, exports, __webpack_require__){
'use strict';
exports.__esModule=true;
var _extends=Object.assign||function (target){ for (var i=1; i < arguments.length; i++){ var source=arguments[i]; for (var key in source){ if(Object.prototype.hasOwnProperty.call(source, key)){ target[key]=source[key]; }} } return target; };
var _prescribe=__webpack_require__(3);
var _prescribe2=_interopRequireDefault(_prescribe);
var _utils=__webpack_require__(4);
var utils=_interopRequireWildcard(_utils);
function _interopRequireWildcard(obj){ if(obj&&obj.__esModule){ return obj; }else{ var newObj={}; if(obj!=null){ for (var key in obj){ if(Object.prototype.hasOwnProperty.call(obj, key)) newObj[key]=obj[key]; }} newObj['default']=obj; return newObj; }}
function _interopRequireDefault(obj){ return obj&&obj.__esModule ? obj:{ 'default': obj };}
function _classCallCheck(instance, Constructor){ if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function"); }}
var DEBUG_CHUNK=false;
var BASEATTR='data-ps-';
var PROXY_STYLE='ps-style';
var PROXY_SCRIPT='ps-script';
function getData(el, name){
var attr=BASEATTR + name;
var val=el.getAttribute(attr);
return !utils.existy(val) ? val:String(val);
}
function setData(el, name){
var value=arguments.length > 2&&arguments[2]!==undefined ? arguments[2]:null;
var attr=BASEATTR + name;
if(utils.existy(value)&&value!==''){
el.setAttribute(attr, value);
}else{
el.removeAttribute(attr);
}}
var WriteStream=function (){
function WriteStream(root){
var options=arguments.length > 1&&arguments[1]!==undefined ? arguments[1]:{};
_classCallCheck(this, WriteStream);
this.root=root;
this.options=options;
this.doc=root.ownerDocument;
this.win=this.doc.defaultView||this.doc.parentWindow;
this.parser=new _prescribe2['default']('', { autoFix: options.autoFix });
this.actuals=[root];
this.proxyHistory='';
this.proxyRoot=this.doc.createElement(root.nodeName);
this.scriptStack=[];
this.writeQueue=[];
setData(this.proxyRoot, 'proxyof', 0);
}
WriteStream.prototype.write=function write(){
var _writeQueue;
(_writeQueue=this.writeQueue).push.apply(_writeQueue, arguments);
while (!this.deferredRemote&&this.writeQueue.length){
var arg=this.writeQueue.shift();
if(utils.isFunction(arg)){
this._callFunction(arg);
}else{
this._writeImpl(arg);
}}
};
WriteStream.prototype._callFunction=function _callFunction(fn){
var tok={ type: 'function', value: fn.name||fn.toString() };
this._onScriptStart(tok);
fn.call(this.win, this.doc);
this._onScriptDone(tok);
};
WriteStream.prototype._writeImpl=function _writeImpl(html){
this.parser.append(html);
var tok=void 0;
var script=void 0;
var style=void 0;
var tokens=[];
while ((tok=this.parser.readToken())&&!(script=utils.isScript(tok))&&!(style=utils.isStyle(tok))){
tok=this.options.beforeWriteToken(tok);
if(tok){
tokens.push(tok);
}}
if(tokens.length > 0){
this._writeStaticTokens(tokens);
}
if(script){
this._handleScriptToken(tok);
}
if(style){
this._handleStyleToken(tok);
}};
WriteStream.prototype._writeStaticTokens=function _writeStaticTokens(tokens){
var chunk=this._buildChunk(tokens);
if(!chunk.actual){
return null;
}
chunk.html=this.proxyHistory + chunk.actual;
this.proxyHistory +=chunk.proxy;
this.proxyRoot.innerHTML=chunk.html;
if(DEBUG_CHUNK){
chunk.proxyInnerHTML=this.proxyRoot.innerHTML;
}
this._walkChunk();
if(DEBUG_CHUNK){
chunk.actualInnerHTML=this.root.innerHTML;
}
return chunk;
};
WriteStream.prototype._buildChunk=function _buildChunk(tokens){
var nextId=this.actuals.length;
var raw=[];
var actual=[];
var proxy=[];
var len=tokens.length;
for (var i=0; i < len; i++){
var tok=tokens[i];
var tokenRaw=tok.toString();
raw.push(tokenRaw);
if(tok.attrs){
if(!/^noscript$/i.test(tok.tagName)){
var id=nextId++;
actual.push(tokenRaw.replace(/(\/?>)/, ' ' + BASEATTR + 'id=' + id + ' $1'));
if(tok.attrs.id!==PROXY_SCRIPT&&tok.attrs.id!==PROXY_STYLE){
proxy.push(tok.type==='atomicTag' ? '':'<' + tok.tagName + ' ' + BASEATTR + 'proxyof=' + id + (tok.unary ? ' />':'>'));
}}
}else{
actual.push(tokenRaw);
proxy.push(tok.type==='endTag' ? tokenRaw:'');
}}
return {
tokens: tokens,
raw: raw.join(''),
actual: actual.join(''),
proxy: proxy.join('')
};};
WriteStream.prototype._walkChunk=function _walkChunk(){
var node=void 0;
var stack=[this.proxyRoot];
while (utils.existy(node=stack.shift())){
var isElement=node.nodeType===1;
var isProxy=isElement&&getData(node, 'proxyof');
if(!isProxy){
if(isElement){
this.actuals[getData(node, 'id')]=node;
setData(node, 'id');
}
var parentIsProxyOf=node.parentNode&&getData(node.parentNode, 'proxyof');
if(parentIsProxyOf){
this.actuals[parentIsProxyOf].appendChild(node);
}}
stack.unshift.apply(stack, utils.toArray(node.childNodes));
}};
WriteStream.prototype._handleScriptToken=function _handleScriptToken(tok){
var _this=this;
var remainder=this.parser.clear();
if(remainder){
this.writeQueue.unshift(remainder);
}
tok.src=tok.attrs.src||tok.attrs.SRC;
tok=this.options.beforeWriteToken(tok);
if(!tok){
return;
}
if(tok.src&&this.scriptStack.length){
this.deferredRemote=tok;
}else{
this._onScriptStart(tok);
}
this._writeScriptToken(tok, function (){
_this._onScriptDone(tok);
});
};
WriteStream.prototype._handleStyleToken=function _handleStyleToken(tok){
var remainder=this.parser.clear();
if(remainder){
this.writeQueue.unshift(remainder);
}
tok.type=tok.attrs.type||tok.attrs.TYPE||'text/css';
tok=this.options.beforeWriteToken(tok);
if(tok){
this._writeStyleToken(tok);
}
if(remainder){
this.write();
}};
WriteStream.prototype._writeStyleToken=function _writeStyleToken(tok){
var el=this._buildStyle(tok);
this._insertCursor(el, PROXY_STYLE);
if(tok.content){
if(el.styleSheet&&!el.sheet){
el.styleSheet.cssText=tok.content;
}else{
el.appendChild(this.doc.createTextNode(tok.content));
}}
};
WriteStream.prototype._buildStyle=function _buildStyle(tok){
var el=this.doc.createElement(tok.tagName);
el.setAttribute('type', tok.type);
utils.eachKey(tok.attrs, function (name, value){
el.setAttribute(name, value);
});
return el;
};
WriteStream.prototype._insertCursor=function _insertCursor(el, which){
this._writeImpl('<span id="' + which + '"/>');
var cursor=this.doc.getElementById(which);
if(cursor){
cursor.parentNode.replaceChild(el, cursor);
}};
WriteStream.prototype._onScriptStart=function _onScriptStart(tok){
tok.outerWrites=this.writeQueue;
this.writeQueue=[];
this.scriptStack.unshift(tok);
};
WriteStream.prototype._onScriptDone=function _onScriptDone(tok){
if(tok!==this.scriptStack[0]){
this.options.error({ msg: 'Bad script nesting or script finished twice' });
return;
}
this.scriptStack.shift();
this.write.apply(this, tok.outerWrites);
if(!this.scriptStack.length&&this.deferredRemote){
this._onScriptStart(this.deferredRemote);
this.deferredRemote=null;
}};
WriteStream.prototype._writeScriptToken=function _writeScriptToken(tok, done){
var el=this._buildScript(tok);
var asyncRelease=this._shouldRelease(el);
var afterAsync=this.options.afterAsync;
if(tok.src){
el.src=tok.src;
this._scriptLoadHandler(el, !asyncRelease ? function (){
done();
afterAsync();
}:afterAsync);
}
try {
this._insertCursor(el, PROXY_SCRIPT);
if(!el.src||asyncRelease){
done();
}} catch (e){
this.options.error(e);
done();
}};
WriteStream.prototype._buildScript=function _buildScript(tok){
var el=this.doc.createElement(tok.tagName);
utils.eachKey(tok.attrs, function (name, value){
el.setAttribute(name, value);
});
if(tok.content){
el.text=tok.content;
}
return el;
};
WriteStream.prototype._scriptLoadHandler=function _scriptLoadHandler(el, done){
function cleanup(){
el=el.onload=el.onreadystatechange=el.onerror=null;
}
var error=this.options.error;
function success(){
cleanup();
if(done!=null){
done();
}
done=null;
}
function failure(err){
cleanup();
error(err);
if(done!=null){
done();
}
done=null;
}
function reattachEventListener(el, evt){
var handler=el['on' + evt];
if(handler!=null){
el['_on' + evt]=handler;
}}
reattachEventListener(el, 'load');
reattachEventListener(el, 'error');
_extends(el, {
onload: function onload(){
if(el._onload){
try {
el._onload.apply(this, Array.prototype.slice.call(arguments, 0));
} catch (err){
failure({ msg: 'onload handler failed ' + err + ' @ ' + el.src });
}}
success();
},
onerror: function onerror(){
if(el._onerror){
try {
el._onerror.apply(this, Array.prototype.slice.call(arguments, 0));
} catch (err){
failure({ msg: 'onerror handler failed ' + err + ' @ ' + el.src });
return;
}}
failure({ msg: 'remote script failed ' + el.src });
},
onreadystatechange: function onreadystatechange(){
if(/^(loaded|complete)$/.test(el.readyState)){
success();
}}
});
};
WriteStream.prototype._shouldRelease=function _shouldRelease(el){
var isScript=/^script$/i.test(el.nodeName);
return !isScript||!!(this.options.releaseAsync&&el.src&&el.hasAttribute('async'));
};
return WriteStream;
}();
exports['default']=WriteStream;
},
function(module, exports, __webpack_require__){
(function webpackUniversalModuleDefinition(root, factory){
if(true)
module.exports=factory();
else if(typeof define==='function'&&define.amd)
define([], factory);
else if(typeof exports==='object')
exports["Prescribe"]=factory();
else
root["Prescribe"]=factory();
})(this, function(){
return  (function(modules){
var installedModules={};
function __webpack_require__(moduleId){
if(installedModules[moduleId])
return installedModules[moduleId].exports;
var module=installedModules[moduleId]={
exports: {},
id: moduleId,
loaded: false
};
modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
module.loaded=true;
return module.exports;
}
__webpack_require__.m=modules;
__webpack_require__.c=installedModules;
__webpack_require__.p="";
return __webpack_require__(0);
})
([
function(module, exports, __webpack_require__){
'use strict';
var _HtmlParser=__webpack_require__(1);
var _HtmlParser2=_interopRequireDefault(_HtmlParser);
function _interopRequireDefault(obj){ return obj&&obj.__esModule ? obj:{ 'default': obj };}
module.exports=_HtmlParser2['default'];
},
function(module, exports, __webpack_require__){
'use strict';
exports.__esModule=true;
var _supports=__webpack_require__(2);
var supports=_interopRequireWildcard(_supports);
var _streamReaders=__webpack_require__(3);
var streamReaders=_interopRequireWildcard(_streamReaders);
var _fixedReadTokenFactory=__webpack_require__(6);
var _fixedReadTokenFactory2=_interopRequireDefault(_fixedReadTokenFactory);
var _utils=__webpack_require__(5);
function _interopRequireDefault(obj){ return obj&&obj.__esModule ? obj:{ 'default': obj };}
function _interopRequireWildcard(obj){ if(obj&&obj.__esModule){ return obj; }else{ var newObj={}; if(obj!=null){ for (var key in obj){ if(Object.prototype.hasOwnProperty.call(obj, key)) newObj[key]=obj[key]; }} newObj['default']=obj; return newObj; }}
function _classCallCheck(instance, Constructor){ if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function"); }}
var detect={
comment: /^<!--/,
endTag: /^<\//,
atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
startTag: /^</,
chars: /^[^<]/
};
var HtmlParser=function (){
function HtmlParser(){
var _this=this;
var stream=arguments.length > 0&&arguments[0]!==undefined ? arguments[0]:'';
var options=arguments.length > 1&&arguments[1]!==undefined ? arguments[1]:{};
_classCallCheck(this, HtmlParser);
this.stream=stream;
var fix=false;
var fixedTokenOptions={};
for (var key in supports){
if(supports.hasOwnProperty(key)){
if(options.autoFix){
fixedTokenOptions[key + 'Fix']=true;
}
fix=fix||fixedTokenOptions[key + 'Fix'];
}}
if(fix){
this._readToken=(0, _fixedReadTokenFactory2['default'])(this, fixedTokenOptions, function (){
return _this._readTokenImpl();
});
this._peekToken=(0, _fixedReadTokenFactory2['default'])(this, fixedTokenOptions, function (){
return _this._peekTokenImpl();
});
}else{
this._readToken=this._readTokenImpl;
this._peekToken=this._peekTokenImpl;
}}
HtmlParser.prototype.append=function append(str){
this.stream +=str;
};
HtmlParser.prototype.prepend=function prepend(str){
this.stream=str + this.stream;
};
HtmlParser.prototype._readTokenImpl=function _readTokenImpl(){
var token=this._peekTokenImpl();
if(token){
this.stream=this.stream.slice(token.length);
return token;
}};
HtmlParser.prototype._peekTokenImpl=function _peekTokenImpl(){
for (var type in detect){
if(detect.hasOwnProperty(type)){
if(detect[type].test(this.stream)){
var token=streamReaders[type](this.stream);
if(token){
if(token.type==='startTag'&&/script|style/i.test(token.tagName)){
return null;
}else{
token.text=this.stream.substr(0, token.length);
return token;
}}
}}
}};
HtmlParser.prototype.peekToken=function peekToken(){
return this._peekToken();
};
HtmlParser.prototype.readToken=function readToken(){
return this._readToken();
};
HtmlParser.prototype.readTokens=function readTokens(handlers){
var tok=void 0;
while (tok=this.readToken()){
if(handlers[tok.type]&&handlers[tok.type](tok)===false){
return;
}}
};
HtmlParser.prototype.clear=function clear(){
var rest=this.stream;
this.stream='';
return rest;
};
HtmlParser.prototype.rest=function rest(){
return this.stream;
};
return HtmlParser;
}();
exports['default']=HtmlParser;
HtmlParser.tokenToString=function (tok){
return tok.toString();
};
HtmlParser.escapeAttributes=function (attrs){
var escapedAttrs={};
for (var name in attrs){
if(attrs.hasOwnProperty(name)){
escapedAttrs[name]=(0, _utils.escapeQuotes)(attrs[name], null);
}}
return escapedAttrs;
};
HtmlParser.supports=supports;
for (var key in supports){
if(supports.hasOwnProperty(key)){
HtmlParser.browserHasFlaw=HtmlParser.browserHasFlaw||!supports[key]&&key;
}}
},
function(module, exports){
'use strict';
exports.__esModule=true;
var tagSoup=false;
var selfClose=false;
var work=window.document.createElement('div');
try {
var html='<P><I></P></I>';
work.innerHTML=html;
exports.tagSoup=tagSoup=work.innerHTML!==html;
} catch (e){
exports.tagSoup=tagSoup=false;
}
try {
work.innerHTML='<P><i><P></P></i></P>';
exports.selfClose=selfClose=work.childNodes.length===2;
} catch (e){
exports.selfClose=selfClose=false;
}
work=null;
exports.tagSoup=tagSoup;
exports.selfClose=selfClose;
},
function(module, exports, __webpack_require__){
'use strict';
exports.__esModule=true;
var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol" ? function (obj){ return typeof obj; }:function (obj){ return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype ? "symbol":typeof obj; };
exports.comment=comment;
exports.chars=chars;
exports.startTag=startTag;
exports.atomicTag=atomicTag;
exports.endTag=endTag;
var _tokens=__webpack_require__(4);
var REGEXES={
startTag: /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
endTag: /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
attr: /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
fillAttr: /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i
};
function comment(stream){
var index=stream.indexOf('-->');
if(index >=0){
return new _tokens.CommentToken(stream.substr(4, index - 1), index + 3);
}}
function chars(stream){
var index=stream.indexOf('<');
return new _tokens.CharsToken(index >=0 ? index:stream.length);
}
function startTag(stream){
var endTagIndex=stream.indexOf('>');
if(endTagIndex!==-1){
var match=stream.match(REGEXES.startTag);
if(match){
var _ret=function (){
var attrs={};
var booleanAttrs={};
var rest=match[2];
match[2].replace(REGEXES.attr, function (match, name){
if(!(arguments[2]||arguments[3]||arguments[4]||arguments[5])){
attrs[name]='';
}else if(arguments[5]){
attrs[arguments[5]]='';
booleanAttrs[arguments[5]]=true;
}else{
attrs[name]=arguments[2]||arguments[3]||arguments[4]||REGEXES.fillAttr.test(name)&&name||'';
}
rest=rest.replace(match, '');
});
return {
v: new _tokens.StartTagToken(match[1], match[0].length, attrs, booleanAttrs, !!match[3], rest.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''))
};}();
if((typeof _ret==='undefined' ? 'undefined':_typeof(_ret))==="object") return _ret.v;
}}
}
function atomicTag(stream){
var start=startTag(stream);
if(start){
var rest=stream.slice(start.length);
if(rest.match(new RegExp('<\/\\s*' + start.tagName + '\\s*>', 'i'))){
var match=rest.match(new RegExp('([\\s\\S]*?)<\/\\s*' + start.tagName + '\\s*>', 'i'));
if(match){
return new _tokens.AtomicTagToken(start.tagName, match[0].length + start.length, start.attrs, start.booleanAttrs, match[1]);
}}
}}
function endTag(stream){
var match=stream.match(REGEXES.endTag);
if(match){
return new _tokens.EndTagToken(match[1], match[0].length);
}}
},
function(module, exports, __webpack_require__){
'use strict';
exports.__esModule=true;
exports.EndTagToken=exports.AtomicTagToken=exports.StartTagToken=exports.TagToken=exports.CharsToken=exports.CommentToken=exports.Token=undefined;
var _utils=__webpack_require__(5);
function _classCallCheck(instance, Constructor){ if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function"); }}
var Token =
exports.Token=function Token(type, length){
_classCallCheck(this, Token);
this.type=type;
this.length=length;
this.text='';
};
var CommentToken=exports.CommentToken=function (){
function CommentToken(content, length){
_classCallCheck(this, CommentToken);
this.type='comment';
this.length=length||(content ? content.length:0);
this.text='';
this.content=content;
}
CommentToken.prototype.toString=function toString(){
return '<!--' + this.content;
};
return CommentToken;
}();
var CharsToken=exports.CharsToken=function (){
function CharsToken(length){
_classCallCheck(this, CharsToken);
this.type='chars';
this.length=length;
this.text='';
}
CharsToken.prototype.toString=function toString(){
return this.text;
};
return CharsToken;
}();
var TagToken=exports.TagToken=function (){
function TagToken(type, tagName, length, attrs, booleanAttrs){
_classCallCheck(this, TagToken);
this.type=type;
this.length=length;
this.text='';
this.tagName=tagName;
this.attrs=attrs;
this.booleanAttrs=booleanAttrs;
this.unary=false;
this.html5Unary=false;
}
TagToken.formatTag=function formatTag(tok){
var content=arguments.length > 1&&arguments[1]!==undefined ? arguments[1]:null;
var str='<' + tok.tagName;
for (var key in tok.attrs){
if(tok.attrs.hasOwnProperty(key)){
str +=' ' + key;
var val=tok.attrs[key];
if(typeof tok.booleanAttrs==='undefined'||typeof tok.booleanAttrs[key]==='undefined'){
str +='="' + (0, _utils.escapeQuotes)(val) + '"';
}}
}
if(tok.rest){
str +=' ' + tok.rest;
}
if(tok.unary&&!tok.html5Unary){
str +='/>';
}else{
str +='>';
}
if(content!==undefined&&content!==null){
str +=content + '</' + tok.tagName + '>';
}
return str;
};
return TagToken;
}();
var StartTagToken=exports.StartTagToken=function (){
function StartTagToken(tagName, length, attrs, booleanAttrs, unary, rest){
_classCallCheck(this, StartTagToken);
this.type='startTag';
this.length=length;
this.text='';
this.tagName=tagName;
this.attrs=attrs;
this.booleanAttrs=booleanAttrs;
this.html5Unary=false;
this.unary=unary;
this.rest=rest;
}
StartTagToken.prototype.toString=function toString(){
return TagToken.formatTag(this);
};
return StartTagToken;
}();
var AtomicTagToken=exports.AtomicTagToken=function (){
function AtomicTagToken(tagName, length, attrs, booleanAttrs, content){
_classCallCheck(this, AtomicTagToken);
this.type='atomicTag';
this.length=length;
this.text='';
this.tagName=tagName;
this.attrs=attrs;
this.booleanAttrs=booleanAttrs;
this.unary=false;
this.html5Unary=false;
this.content=content;
}
AtomicTagToken.prototype.toString=function toString(){
return TagToken.formatTag(this, this.content);
};
return AtomicTagToken;
}();
var EndTagToken=exports.EndTagToken=function (){
function EndTagToken(tagName, length){
_classCallCheck(this, EndTagToken);
this.type='endTag';
this.length=length;
this.text='';
this.tagName=tagName;
}
EndTagToken.prototype.toString=function toString(){
return '</' + this.tagName + '>';
};
return EndTagToken;
}();
},
function(module, exports){
'use strict';
exports.__esModule=true;
exports.escapeQuotes=escapeQuotes;
function escapeQuotes(value){
var defaultValue=arguments.length > 1&&arguments[1]!==undefined ? arguments[1]:'';
return !value ? defaultValue:value.replace(/([^"]*)"/g, function (_, prefix){
return (/\\/.test(prefix) ? prefix + '"':prefix + '\\"'
);
});
}
},
function(module, exports){
'use strict';
exports.__esModule=true;
exports['default']=fixedReadTokenFactory;
var EMPTY=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i;
var CLOSESELF=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;
function correct(tok){
if(tok&&tok.type==='startTag'){
tok.unary=EMPTY.test(tok.tagName)||tok.unary;
tok.html5Unary = !/\/>$/.test(tok.text);
}
return tok;
}
function peekToken(parser, readTokenImpl){
var tmp=parser.stream;
var tok=correct(readTokenImpl());
parser.stream=tmp;
return tok;
}
function closeLast(parser, stack){
var tok=stack.pop();
parser.prepend('</' + tok.tagName + '>');
}
function newStack(){
var stack=[];
stack.last=function (){
return this[this.length - 1];
};
stack.lastTagNameEq=function (tagName){
var last=this.last();
return last&&last.tagName&&last.tagName.toUpperCase()===tagName.toUpperCase();
};
stack.containsTagName=function (tagName){
for (var i=0, tok; tok=this[i]; i++){
if(tok.tagName===tagName){
return true;
}}
return false;
};
return stack;
}
function fixedReadTokenFactory(parser, options, readTokenImpl){
var stack=newStack();
var handlers={
startTag: function startTag(tok){
var tagName=tok.tagName;
if(tagName.toUpperCase()==='TR'&&stack.lastTagNameEq('TABLE')){
parser.prepend('<TBODY>');
prepareNextToken();
}else if(options.selfCloseFix&&CLOSESELF.test(tagName)&&stack.containsTagName(tagName)){
if(stack.lastTagNameEq(tagName)){
closeLast(parser, stack);
}else{
parser.prepend('</' + tok.tagName + '>');
prepareNextToken();
}}else if(!tok.unary){
stack.push(tok);
}},
endTag: function endTag(tok){
var last=stack.last();
if(last){
if(options.tagSoupFix&&!stack.lastTagNameEq(tok.tagName)){
closeLast(parser, stack);
}else{
stack.pop();
}}else if(options.tagSoupFix){
readTokenImpl();
prepareNextToken();
}}
};
function prepareNextToken(){
var tok=peekToken(parser, readTokenImpl);
if(tok&&handlers[tok.type]){
handlers[tok.type](tok);
}}
return function fixedReadToken(){
prepareNextToken();
return correct(readTokenImpl());
};}
}
])
});
;
},
function(module, exports){
'use strict';
exports.__esModule=true;
var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol" ? function (obj){ return typeof obj; }:function (obj){ return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype ? "symbol":typeof obj; };
exports.existy=existy;
exports.isFunction=isFunction;
exports.each=each;
exports.eachKey=eachKey;
exports.defaults=defaults;
exports.toArray=toArray;
exports.last=last;
exports.isTag=isTag;
exports.isScript=isScript;
exports.isStyle=isStyle;
function existy(thing){
return thing!==void 0&&thing!==null;
}
function isFunction(x){
return 'function'===typeof x;
}
function each(arr, fn, target){
var i=void 0;
var len=arr&&arr.length||0;
for (i=0; i < len; i++){
fn.call(target, arr[i], i);
}}
function eachKey(obj, fn, target){
for (var key in obj){
if(obj.hasOwnProperty(key)){
fn.call(target, key, obj[key]);
}}
}
function defaults(options, _defaults){
options=options||{};
eachKey(_defaults, function (key, val){
if(!existy(options[key])){
options[key]=val;
}});
return options;
}
function toArray(obj){
try {
return Array.prototype.slice.call(obj);
} catch (e){
var _ret=function (){
var ret=[];
each(obj, function (val){
ret.push(val);
});
return {
v: ret
};}();
if((typeof _ret==='undefined' ? 'undefined':_typeof(_ret))==="object") return _ret.v;
}}
function last(array){
return array[array.length - 1];
}
function isTag(tok, tag){
return !tok||!(tok.type==='startTag'||tok.type==='atomicTag')||!('tagName' in tok) ? !1:!!~tok.tagName.toLowerCase().indexOf(tag);
}
function isScript(tok){
return isTag(tok, 'script');
}
function isStyle(tok){
return isTag(tok, 'style');
}
}
])
});
;
var advanced_ads_pro, advads_pro_utils;
if(!advanced_ads_pro){
advanced_ads_pro={
ads: [],
ajax_ads: {},
passive_ads: {},
deferedAds: [],
blockme: false,
blockmeQueue: [],
observers: jQuery.Callbacks(),
postscribeObservers:jQuery.Callbacks(),
random_placements: false,
busy: false,
iterations: 0,
adblocker_active: false,
options: {
action: "advads_ad_select",
},
load: function (args){
"use strict";
var id, method, params, elementId, placement_id, is_lazy, blog_id;
id=args.hasOwnProperty("id") ? args.id:null;
method=args.hasOwnProperty("method") ? args.method:null;
params=args.hasOwnProperty("params") ? args.params:null;
elementId=args.hasOwnProperty("elementid") ? args.elementid:null;
is_lazy=advanced_ads_pro_ajax_object.lazy_load_module_enabled&&params&&params.lazy_load==='enabled';
blog_id=args.hasOwnProperty("blog_id") ? args.blog_id:'';
var server_conditions=args.hasOwnProperty("server_conditions") ? args.server_conditions:'';
if(elementId&&this.iterations > 1){
jQuery('#' + elementId).empty();
}
if(params&&typeof params==='object'){
if(! advads_pro_utils.selector_exists(params)){
return;
}
if(params.test_id){
if(params.previous_method==='placement'){
placement_id=params.previous_id;
}else{
placement_id=id;
}
if(jQuery.inArray(placement_id, this.get_random_placements()) < 0){
return;
}}
params.adblocker_active=this.adblocker_active;
params=JSON.stringify(params);
}
var obj={ ad_id: id, ad_method: method, ad_args: params, elementId: elementId, blog_id: blog_id, server_conditions: server_conditions };
if(is_lazy){
advanced_ads_pro.lazy_load.add(elementId, 'ajax', obj);
return;
}
this.deferedAds[ this.deferedAds.length ]=obj;
},
hasAd: function (id, method, title, cb_type, elementId){
"use strict";
var ad={id: id, type: method, title: title, cb_type: cb_type, elementId: elementId };
this.ads.push(ad);
this.observers.fire({ event: "hasAd", ad: ad });
},
injectBlocked: function (){
"use strict";
var queue=this.blockmeQueue, ad, i, l=queue.length;
this.blockmeQueue=[];
for (i=0; i < l; i +=1){
ad=queue[i];
this.inject(ad[0], ad[1]);
}},
inject: function(elementId, ad){
"use strict";
var that=this, async, ref;
if(this.blockme){
this.blockmeQueue.push([ elementId, ad ]);
return;
}
try {
async=(ad.match(/<script[^>]+src/)&&ad.indexOf(" async")===-1);
if(elementId===null){
ref=jQuery('head ');
}else{
ref=jQuery("#" + elementId);
if(! ref.length){ return; }}
if(async){
this.blockme=true;
advads_postscribe(ref, ad, {
afterAsync: function (){
that.blockme=false;
that.injectBlocked();
},
done: function(){
that.postscribeObservers.fire({ event: "postscribe_done", ref: ref, ad: ad });
},
error: function(e){
console.log(e);
}});
}else{
advads_postscribe(ref, ad, {
done: function(){
that.postscribeObservers.fire({ event: "postscribe_done", ref: ref, ad: ad });
},
error: function(e){
console.log(e);
}});
}} catch (err){
console.log(err);
}},
loadAjaxAds: function(){
"use strict";
if(! this.deferedAds.length){
advanced_ads_pro.observers.fire({ event: "inject_ajax_ads", ad_ids: [] });
advanced_ads_pro.busy=false;
return;
}
var j, i, that=this, data={ action: "advads_ad_select", ad_ids: this.ads, deferedAds: this.deferedAds };
this.deferedAds=[];
jQuery.ajax({ url: advanced_ads_pro_ajax_object.ajax_url, method: "POST", data: data, dataType: "json"})
.done(function(msg_bunch){
if(Array.isArray(msg_bunch)){
for(var j=0; j < msg_bunch.length; j++){
var msg=msg_bunch[j];
if(msg.hasOwnProperty("status")&&msg.status==="success"&&msg.hasOwnProperty("item")&&msg.item){
that.inject(msg.elementId, msg.item, true);
if(msg.hasOwnProperty("ads")&&Array.isArray(msg.ads)){
for (var i=0; i < msg.ads.length; i +=1){
if(!  advanced_ads_group_refresh.is_has_ad_needed(msg.elementId, msg.ads[ i ])){
continue;
}
that.hasAd(msg.ads[i].id, msg.ads[i].type, msg.ads[i].title, 'ajax', msg.elementId);
if(msg.ads[ i ].type==='ad'&&msg.ads[ i ].tracking_enabled){
var blog_id=msg.blog_id ? msg.blog_id:'';
if(! advanced_ads_pro.ajax_ads[ blog_id ]){
advanced_ads_pro.ajax_ads[ blog_id ]=[];
}
advanced_ads_pro.ajax_ads[ blog_id ].push(msg.ads[ i ].id);
}}
}}
if(msg.hasOwnProperty('method')&&msg.method==='placement'){
advanced_ads_pro.observers.fire({ event: "inject_placement", id: msg.id, is_empty: !!msg.item, cb_type: 'ajax' });
}}
advanced_ads_pro.observers.fire({ event: "inject_ajax_ads", ad_ids: advanced_ads_pro.ajax_ads });
advanced_ads_pro.ajax_ads={};
advanced_ads_pro.busy=false;
advads_pro_utils.log("AJAX CB response\n", msg_bunch);
}});
},
get_random_placements: function(placement_tests){
if(this.random_placements!==false){
return this.random_placements;
}
this.random_placements=[];
advads_pro_utils.each_key(placement_tests, function(placement_id, item){
if(typeof item==='object'){
if(random_placement=advads_pro_utils.get_random_el_by_weight(item.placements)){
this.random_placements.push(random_placement);
}}
}, this);
return this.random_placements;
},
create_non_existent_arrays: function(){
var self=this;
if(self.iterations===0){
advads_pro_utils.each(['advads_passive_ads', 'advads_passive_groups', 'advads_passive_placements'], function(name){
if(! advads_pro_utils.isset(window[ name ])){
window[ name ]={};}});
advads_pro_utils.each(['advads_placement_tests', 'advads_ajax_queries', 'advads_has_ads', 'advads_js_items'], function(name){
if(! advads_pro_utils.isset(window[ name ])){
window[ name ]=[];
}});
}},
process_passive_cb: function(){
var self=this;
self.create_non_existent_arrays();
advads_pro_utils.print_debug_arrays();
var fn=function(adblocker_active){
self.busy=true;
self.iterations++;
self.lazy_load.clear();
self.adblocker_active=adblocker_active;
advads_pro_utils.each(advads_has_ads, function(query){
advanced_ads_pro.hasAd.apply(advanced_ads_pro, query);
});
self.get_random_placements(advads_placement_tests);
advads_pro_utils.each_key(advads_passive_ads, function(key, item){
var _=(key + '').indexOf('_');
if(_!==-1){
key=key.slice(0, _);
}
advads_pro_utils.each(item.elementid, function(element_id){
if(advanced_ads_pro.iterations > 1) jQuery('#' + element_id).empty();
var ad=new Advads_passive_cb_Ad(item.ads[ key ], element_id);
if(ad.can_display()){
ad.output({ track: true, inject: true, do_has_ad: true });
}});
});
advads_pro_utils.each_key(advads_passive_groups, function(key, item){
advads_pro_utils.each(item.elementid, function(element_id){
if(advanced_ads_pro.iterations > 1) jQuery('#' + element_id).empty();
var group=new Advads_passive_cb_Group(item, element_id);
group.output();
});
});
advads_pro_utils.each_key(advads_passive_placements, function(key, item){
advads_pro_utils.each(item.elementid, function(element_id){
if(advanced_ads_pro.iterations > 1) jQuery('#' + element_id).empty();
var placement=new Advads_passive_cb_Placement(item, element_id);
if(! placement.can_use_passive_cb()){
advanced_ads_pro.load(placement.ajax_query);
return;
}
if(advanced_ads_pro_ajax_object.lazy_load_module_enabled
&& item.placement_info.options&&item.placement_info.options.lazy_load==='enabled'){
advanced_ads_pro.lazy_load.add(element_id, 'passive', { 'key': key, 'placement_id': item.placement_info.id });
return;
}
placement.output();
});
});
if(advads_pro_utils.isset(window.advads_js_items)){
advads_pro_utils.each_key(advads_js_items, function(key, item){
if(advanced_ads_pro.iterations > 1){ return; }
if(! advads_pro_utils.selector_exists(item.args)){ return; }
advanced_ads_pro.inject(item.elementid, item.output, true);
advads_pro_utils.each(item.has_js_items, function(query){
advanced_ads_pro.hasAd(query.id, query.type, query.title);
if(query.type==='ad'){
if(! advanced_ads_pro.passive_ads[ query.blog_id ]){
advanced_ads_pro.passive_ads[ query.blog_id ]=[];
}
advanced_ads_pro.passive_ads[ query.blog_id ].push(query.id);
}});
});
}
self.observers.fire({ event: "inject_passive_ads", ad_ids: self.passive_ads });
self.passive_ads={};
self.process_ajax_ads(advads_ajax_queries);
self.lazy_load.enable();
}
if('function'===typeof advanced_ads_check_adblocker){
advanced_ads_check_adblocker(function(is_enabled){
fn(is_enabled);
});
}else{
fn(false);
}},
process_ajax_ads: function(ajax_queries){
if(jQuery.isArray(ajax_queries)){
advads_pro_utils.each(ajax_queries, function(query){
advanced_ads_pro.load(query);
});
}
this.loadAjaxAds();
},
lazy_load: {
lazy_map: {},
did_init: false,
add: function(wrapper_id, type, data){
var node=document.getElementById(wrapper_id);
var placement_id;
if(! node){ return; }
if(data.placement_id){
placement_id=data.placement_id;
}else if(data.ad_method==='placement'){
placement_id=data.ad_id;
}
this.lazy_map[ wrapper_id ]={
'node': node,
'type': type,
'data': data,
'offset': this.get_offset(placement_id)
}},
get_offset: function(placement_id){
var offset=0;
if(advanced_ads_pro_ajax_object.lazy_load){
if(advanced_ads_pro_ajax_object.lazy_load.offsets[ placement_id ]){
offset=parseInt(advanced_ads_pro_ajax_object.lazy_load.offsets[ placement_id ], 10);
}else{
offset=parseInt(advanced_ads_pro_ajax_object.lazy_load.default_offset, 10);
}}
return offset;
},
clear: function(){
this.lazy_map={};},
enable: function(){
var self=this;
if(self.did_init){
jQuery(window).scroll();
return;
}
self._create_scroll_handler();
self.did_init=true;
},
_create_scroll_handler: function(){
var self=this;
var did_scroll=true;
function scrollHandler(){
var window_height=jQuery(window).height();
advads_pro_utils.each_key(self.lazy_map, function(wrapper_id, lazy_item){
var rect=lazy_item.node.getBoundingClientRect();
var offset=lazy_item.offset;
if(rect.top + offset >=0
&& rect.bottom - offset <=window_height
){
self._display(wrapper_id);
}});
did_scroll=false
}
function RAF(callback){
var fn=window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| function(callback){ return setTimeout(callback, 16); };
fn.call(window, callback);
}
jQuery(window).on('scroll', function(){
if(! did_scroll){
did_scroll=true;
RAF(scrollHandler);
}});
RAF(scrollHandler);
},
_display: function(wrapper_id){
var lazy_item=this.lazy_map[ wrapper_id ];
if(! lazy_item){ return; }
delete this.lazy_map[ wrapper_id ];
if(lazy_item.type==='ajax'){
advanced_ads_pro.deferedAds.push(lazy_item.data);
advanced_ads_pro.process_ajax_ads();
}else{
var passive_placement=advads_passive_placements[ lazy_item.data.key ];
var placement=new Advads_passive_cb_Placement(passive_placement, wrapper_id);
placement.output();
advanced_ads_pro.observers.fire({ event: "inject_passive_ads", ad_ids: advanced_ads_pro.passive_ads });
advanced_ads_pro.passive_ads={};}}
}};
jQuery(document).on('advanced-ads-resize-window', function(e){
if(advanced_ads_pro.busy){
return;
}
var cb_count=advanced_ads_pro.ads.length;
while(cb_count--){
if('off'!==advanced_ads_pro.ads.cb_method){
advanced_ads_pro.ads.splice(cb_count, 1);
}}
advanced_ads_pro.process_passive_cb();
});
var Advads_passive_cb_Conditions={
REFERRER_COOKIE_NAME: 'advanced_ads_pro_visitor_referrer',
PAGE_IMPRESSIONS_COOKIE_NAME: 'advanced_ads_page_impressions',
AD_IMPRESSIONS_COOKIE_NAME: 'advanced_ads_ad_impressions',
SERVER_INFO_COOKIE_NAME: 'advanced_ads_pro_server_info',
conditions:{
'mobile': 'check_mobile',
'referrer_url': 'check_referrer_url',
'user_agent': 'check_user_agent',
'request_uri': 'check_request_uri',
'browser_lang': 'check_browser_lang',
'cookie': 'check_cookie',
'page_impressions': 'check_page_impressions',
'ad_impressions': 'check_ad_impressions',
'new_visitor': 'check_new_visitor',
'device_width': 'check_browser_width',
'tablet': 'check_tablet',
'loggedin': 'check_loggedin',
'capability': 'check_capability',
'role': 'check_role',
'geo_targeting': 'check_geo_targeting',
'buddypress_profile_field': 'check_buddypress_profile_field'
},
init: function(){
/**
* Allow adding of visitor conditions. Usage example
* jQuery(document).on('advads-passive-cb-conditions', function(e, Advads_passive_cb_Conditions){
*    Advads_passive_cb_Conditions.conditions['condition_key']=function(options, ad){
*        return options.value==='some string'
*    };
* });
*/
jQuery(document).trigger('advads-passive-cb-conditions', [ this ]);
this.init=function(){}},
frontend_check: function(_condition, ad){
var check_function=this.conditions[_condition.type];
if(typeof check_function==='string'){
check_function=advads_pro_utils.bind(this[ check_function ], this);
}
if(check_function){
if(check_function(_condition, ad)){
return true;
}else{
return false;
}}
return true;
},
check_mobile: function(options){
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);
if(! advads_pro_utils.isset(options.operator)){
return true;
}
switch(options.operator){
case 'is':
return this.isMobile.any;
break;
case 'is_not':
return ! this.isMobile.any
break;
}
return true;
},
check_referrer_url: function(options){
var referer=advads.get_cookie(this.REFERRER_COOKIE_NAME)||'';
return this.helper_check_string(referer, options);
},
check_user_agent: function(options){
var user_agent=typeof navigator==='object' ? navigator.userAgent:'';
return this.helper_check_string(user_agent, options);
},
check_browser_lang: function(options){
var lang=options.value;
if(! lang){
return true;
}
var browser_lang=typeof navigator==='object' ?(navigator.languages ? navigator.languages.join(','):(navigator.language||navigator.userLanguage)):'';
if(! browser_lang){
return true;
}
try {
var regexp=new RegExp('\\b' + lang + '\\b', 'i');
var result=browser_lang.search(regexp)!==-1;
} catch(e){
return true;
}
if(options.operator==='is_not'){
return ! result;
}else{
return result;
}},
check_request_uri: function(options){
var uri_string=typeof location==='object' ? location.href:'';
return this.helper_check_string(uri_string, options);
},
check_cookie: function(options){
var must_be_set = ! advads_pro_utils.isset(options.operator)||'hide'!==options.operator;
if(! advads_pro_utils.isset(options.cookie)||''===options.cookie){
return must_be_set;
}
if(! advads_pro_utils.isset(advads.get_cookie(options.cookie))){
return ! must_be_set;
}
if(! advads_pro_utils.isset(options.value)||''===options.value ||
options.value===advads.get_cookie(options.cookie)){
return must_be_set;
}
return ! must_be_set;
},
check_page_impressions: function(options){
if(! advads_pro_utils.isset(options.operator)||! advads_pro_utils.isset(options.value)){
return true
}
var impressions=0;
if(advads_pro_utils.isset(advads.get_cookie(this.PAGE_IMPRESSIONS_COOKIE_NAME))){
impressions=parseInt(advads.get_cookie(this.PAGE_IMPRESSIONS_COOKIE_NAME))||0;
}else{
return true;
}
var value=parseInt(options.value)||0;
switch(options.operator){
case 'is_equal':
if(value!==impressions){ return false; }
break;
case 'is_higher':
if(value > impressions){ return false; }
break;
case 'is_lower':
if(value < impressions){ return false; }
break;
}
return true;
},
check_ad_impressions: function(options, ad){
if(! advads_pro_utils.isset(options.value)||! advads_pro_utils.isset(options.timeout)||! advads_pro_utils.isset(ad.id)){
return true
}
var value=parseInt(options.value)||0,
impressions=0,
cookie_name=this.AD_IMPRESSIONS_COOKIE_NAME + '_' + ad.id,
cookie_timeout_name=cookie_name + '_timeout';
if(advads_pro_utils.isset(advads.get_cookie(cookie_name))&&advads_pro_utils.isset(advads.get_cookie(cookie_timeout_name))){
impressions=parseInt(advads.get_cookie(cookie_name))||0;
if(value <=impressions){
return false;
}}
return true;
},
check_new_visitor: function(options){
if(! advads_pro_utils.isset(options.operator)){
return true
}
var impressions=0;
if(advads_pro_utils.isset(advads.get_cookie(this.PAGE_IMPRESSIONS_COOKIE_NAME))){
impressions=parseInt(advads.get_cookie(this.PAGE_IMPRESSIONS_COOKIE_NAME))||0;
}
switch(options.operator){
case 'is':
return 1===impressions;
break;
case 'is_not':
return 1 < impressions;
break;
}
return true;
},
check_browser_width: function(options){
if(! advads_pro_utils.isset(options.operator)||! advads_pro_utils.isset(options.value)){
return true
}
var browser_width=jQuery(window).width(),
value=parseInt(options.value)||0;
switch(options.operator){
case 'is_equal':
if(value!==browser_width){ return false; }
break;
case 'is_higher':
if(value > browser_width){ return false; }
break;
case 'is_lower':
if(value < browser_width){ return false; }
break;
}
return true;
},
check_tablet: function(options){
if(! advads_pro_utils.isset(options.operator)){
return true;
}
rules={iPad:"iPad|iPad.*Mobile",NexusTablet:"Android.*Nexus[\\s]+(7|9|10)",SamsungTablet:"SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561",Kindle:"Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI)\\b",SurfaceTablet:"Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",HPTablet:"HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",AsusTablet:"^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA",BlackBerryTablet:"PlayBook|RIM Tablet",HTCtablet:"HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",MotorolaTablet:"xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",NookTablet:"Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",AcerTablet:"Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20",ToshibaTablet:"Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",LGTablet:"\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",FujitsuTablet:"Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",PrestigioTablet:"PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",LenovoTablet:"Lenovo TAB|Idea(Tab|Pad)(A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",DellTablet:"Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",YarvikTablet:"Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",MedionTablet:"Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",ArnovaTablet:"AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",IntensoTablet:"INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",IRUTablet:"M702pro",MegafonTablet:"MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",EbodaTablet:"E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",AllViewTablet:"Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",ArchosTablet:"\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",AinolTablet:"NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",NokiaLumiaTablet:"Lumia 2520",SonyTablet:"Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",PhilipsTablet:"\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",CubeTablet:"Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",CobyTablet:"MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",MIDTablet:"M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",MSITablet:"MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",SMiTTablet:"Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",RockChipTablet:"Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",FlyTablet:"IQ310|Fly Vision",bqTablet:"Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus",HuaweiTablet:"MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",NecTablet:"\\bN-06D|\\bN-08D",PantechTablet:"Pantech.*P4100",BronchoTablet:"Broncho.*(N701|N708|N802|a710)",VersusTablet:"TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",ZyncTablet:"z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",PositivoTablet:"TB07STA|TB10STA|TB07FTA|TB10FTA",NabiTablet:"Android.*\\bNabi",KoboTablet:"Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",DanewTablet:"DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",TexetTablet:"NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",PlaystationTablet:"Playstation.*(Portable|Vita)",TrekstorTablet:"ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",PyleAudioTablet:"\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",AdvanTablet:"Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",DanyTechTablet:"Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",GalapadTablet:"Android.*\\bG1\\b",MicromaxTablet:"Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",KarbonnTablet:"Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",AllFineTablet:"Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",PROSCANTablet:"\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",YONESTablet:"BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",ChangJiaTablet:"TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",GUTablet:"TX-A1301|TX-M9002|Q702|kf026",PointOfViewTablet:"TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",OvermaxTablet:"OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",HCLTablet:"HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",DPSTablet:"DPS Dream 9|DPS Dual 7",VistureTablet:"V97 HD|i75 3G|Visture V4(HD)?|Visture V5(HD)?|Visture V10",CrestaTablet:"CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",MediatekTablet:"\\bMT8125|MT8389|MT8135|MT8377\\b",ConcordeTablet:"Concorde([ ]+)?Tab|ConCorde ReadMan",GoCleverTablet:"GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",ModecomTablet:"FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",VoninoTablet:"\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",ECSTablet:"V07OT2|TM105A|S10OT1|TR10CS1",StorexTablet:"eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",VodafoneTablet:"SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7",EssentielBTablet:"Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",RossMoorTablet:"RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",iMobileTablet:"i-mobile i-note",TolinoTablet:"tolino tab [0-9.]+|tolino shine",AudioSonicTablet:"\\bC-22Q|T7-QC|T-17B|T-17P\\b",AMPETablet:"Android.* A78 ",SkkTablet:"Android.* (SKYPAD|PHOENIX|CYCLOPS)",TecnoTablet:"TECNO P9",JXDTablet:"Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",iJoyTablet:"Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",FX2Tablet:"FX2 PAD7|FX2 PAD10",XoroTablet:"KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",ViewsonicTablet:"ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",OdysTablet:"LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",CaptivaTablet:"CAPTIVA PAD",IconbitTablet:"NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",TeclastTablet:"T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",OndaTablet:"\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",JaytechTablet:"TPC-PA762",BlaupunktTablet:"Endeavour 800NG|Endeavour 1010",DigmaTablet:"\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",EvolioTablet:"ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",LavaTablet:"QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",AocTablet:"MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",MpmanTablet:"MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",CelkonTablet:"CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",WolderTablet:"miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",MiTablet:"\\bMI PAD\\b|\\bHM NOTE 1W\\b",NibiruTablet:"Nibiru M1|Nibiru Jupiter One",NexoTablet:"NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",LeaderTablet:"TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",UbislateTablet:"UbiSlate[\\s]?7C",PocketBookTablet:"Pocketbook",KocasoTablet:"\\b(TB-1207)\\b",Hudl:"Hudl HT7S3|Hudl 2",TelstraTablet:"T-Hub2",GenericTablet:"Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b"};
var user_agent=typeof navigator==='object' ? navigator.userAgent:'';
var device='';
for (var key in rules){
var reg=new RegExp(rules[key], 'i');
if(reg.test(user_agent)){
device=reg;
break;
}}
switch(options.operator){
case 'is':
return device!=='';
break;
case 'is_not':
return device==='';
break;
}
return true;
},
check_loggedin: function(options){
if(! advads_pro_utils.isset(options.operator)||! advads_pro_utils.isset(options.type)){
return true
}
var r=this.check_stored(options, function(options, stored_condition){
return stored_condition===true;
});
switch(options.operator){
case 'is':
return r===true;
break;
case 'is_not':
return r===false;
break;
}
return true;
},
check_capability: function(options){
if(! advads_pro_utils.isset(options.operator)||! advads_pro_utils.isset(options.value)||! advads_pro_utils.isset(options.type)){
return true
}
var r=this.check_stored(options, function(options, stored_condition){
return stored_condition===options.value;
});
switch(options.operator){
case 'can':
return r===true;
break;
case 'can_not':
return r===false;
break;
}
return true;
},
check_role: function(options){
if(! advads_pro_utils.isset(options.operator)||! advads_pro_utils.isset(options.value)||! advads_pro_utils.isset(options.type)){
return true
}
var r=this.check_stored(options, function(options, stored_condition){
return stored_condition===options.value;
});
switch(options.operator){
case 'is':
return r===true;
break;
case 'is_not':
return r===false;
break;
}
return true;
},
check_geo_targeting: function(options){
if(! advads_pro_utils.isset(options.type)
|| ! advads_pro_utils.isset(options.operator)){
return true
}
var r=this.check_stored(options, function(options, stored_condition){
if('object'!==typeof stored_condition){
return true;
}
if(stored_condition.is_sucuri){
return this.check_geo_sucuri(options, stored_condition);
}else{
return this.check_geo_default(options, stored_condition);
}}, this);
return r;
},
check_geo_default: function(options, stored_condition){
var city=options["city"] ? jQuery.trim(options["city"]).toLowerCase():'';
var region=options["region"] ? jQuery.trim(options["region"]).toLowerCase():'';
var country=options["country"] ? jQuery.trim(options["country"]):'';
var visitor_city=('' + stored_condition.visitor_city).toLowerCase();
var visitor_region=('' + stored_condition.visitor_region).toLowerCase();
var v_continent_code=('' + stored_condition.continent_code);
var country_code=stored_condition.country_code;
if(0===country.indexOf('CONT_')){
country_code='CONT_' + v_continent_code;
}
if(options['geo_mode']==='latlon'){
var hasValidLatLonOptions=this.check_for_valid_lat_lon_options(options);
if(hasValidLatLonOptions){
var dst=advads_pro_utils.calculate_distance(parseFloat(stored_condition.current_lat), parseFloat(stored_condition.current_lon),
parseFloat(options['lat']), parseFloat(options['lon']),
options['distance_unit']
);
if(options['distance_condition']==='gt') return dst > options['distance'];
return dst <=options['distance'];
}
return true;
}else if('is_not'===options['operator']){
if(city){
return city!==visitor_city;
}else if(region){
return region!==visitor_region;
}
if('EU'===country){
return ! stored_condition.is_eu_state;
}
return country!==country_code;
}else{
if(city){
return city===visitor_city;
}else if(region){
return region===visitor_region;
}
if('EU'===country){
return stored_condition.is_eu_state;
}
return country===country_code;
}},
check_for_valid_lat_lon_options: function(options){
return  advads_pro_utils.is_numeric(options['lat'])
&& advads_pro_utils.is_numeric(options['lon'])
&& ''!==options['distance_condition']
&& advads_pro_utils.is_numeric(options['distance'])
&& ''!==options['distance_unit']
},
check_geo_sucuri: function(options, stored_condition){
var operator=options["operator"] ? options["operator"]:'is';
var country=options["country"] ? jQuery.trim(options["country"]):'';
if('is_not'===options['operator']){
if('EU'===country){
return ! stored_condition.is_eu_state;
}
return country!==country_code;
}else{
if('EU'===country){
return stored_condition.is_eu_state;
}
return country===country_code;
}},
check_buddypress_profile_field: function(options){
if(! advads_pro_utils.isset(options.operator)
|| ! advads_pro_utils.isset(options.value)
|| ! advads_pro_utils.isset(options.type)
|| ! advads_pro_utils.isset(options.field)){
return true
}
var r=this.check_stored(options, function(options, stored_condition){
if('object'!==typeof stored_condition){
return true;
}
if(stored_condition.field!==options.field){
return false;
}
return this.helper_check_string(stored_condition.data, options);
}, this);
return r;
},
check_stored: function(options, cb, self){
var stored_info=Advads_passive_cb_Conditions.get_stored_info();
var stored_type=stored_info[ options.type ];
if('object'!==typeof stored_type){
return true;
}
for(var hash in stored_type){
if(! stored_type.hasOwnProperty(hash)){ continue; }
var stored_condition=stored_type[ hash ];
if('object'!==typeof stored_condition||undefined===stored_condition.data){ continue; }
var r=cb.call(self, options, stored_condition.data)
if(r){
return true;
}}
return false;
},
helper_check_string: function(string, options){
var operator=options.operator;
var value=options.value;
if(typeof value==='string'&&value!==''){
string=string.toUpperCase();
value=value.toUpperCase();
}else{
return true;
}
var condition=true;
switch(operator){
case 'contain':
condition=string.indexOf(value)!==-1;
break;
case 'contain_not':
condition=string.indexOf(value)===-1;
break;
case 'start':
condition=string.lastIndexOf(value, 0)===0
break;
case 'start_not':
condition=string.lastIndexOf(value, 0)!==0
break;
case 'end':
condition=string.slice(- value.length)===value;
break;
case 'end_not':
condition=string.slice(- value.length)!==value;
break;
case 'match':
condition=string===value;
break;
case 'match_not':
condition=string!==value;
break;
case "regex":
try {
var regexp=new RegExp(value, 'i');
condition=string.search(regexp)!==-1;
} catch(e){
advads_pro_utils.log('regular expression"' + value + '" in visitor condition is broken');
}
break;
case 'regex_not':
try {
var regexp=new RegExp(value, 'i');
condition=string.search(regexp)===-1;
} catch(e){
advads_pro_utils.log('regular expression"' + value + '" in visitor condition is broken');
}
break;
}
return condition;
},
get_stored_info: function(){
try {
var info=JSON.parse(advads.get_cookie(this.SERVER_INFO_COOKIE_NAME));
} catch(e){}
if('object'!==typeof info||'object'!==typeof info['conditions']){
return {};};
return info['conditions'];
}};
function Advads_passive_cb_Placement(placement, element_id){
if(typeof placement!=='object' ||
! placement.hasOwnProperty('id') ||
! placement.hasOwnProperty('type') ||
! placement.hasOwnProperty('ads') ||
! placement.hasOwnProperty('placement_info') ||
typeof placement.ads!=='object'
){
throw new SyntaxError("Can not create Advads_passive_cb_Placement obj");
}
this.id=placement.id;
this.ajax_query=placement.ajax_query;
this.type=placement.type;
this.element_id=element_id;
this.ads=placement.ads;
this.ads_for_ab=placement.ads_for_ab;
this.placement_info=placement.placement_info;
this.placement_id=advads_pro_utils.isset_nested(this.placement_info, 'id') ? this.placement_info.id:null;
this.group_info=placement.group_info;
this.group_wrap=placement.group_wrap;
this.server_info_duration=parseInt(placement.server_info_duration, 10)||0;
this.server_conditions=placement.server_conditions;
};
Advads_passive_cb_Placement.prototype.can_display=function(){
if(advads_pro_utils.isset_nested(this.placement_info, 'options', 'test_id') &&
jQuery.inArray(this.placement_id, advanced_ads_pro.get_random_placements()) < 0
){
return false;
}
if(advads_pro_utils.isset_nested(this.placement_info, 'options', 'layer_placement', 'close', 'enabled') &&
this.placement_info.options.layer_placement.close.enabled){
if(advads_pro_utils.isset_nested(this.placement_info, 'options', 'layer_placement', 'close', 'timeout_enabled') &&
this.placement_info.options.layer_placement.close.timeout_enabled &&
advads_pro_utils.isset(advads.get_cookie('timeout_placement_' + this.placement_info.id))
){
return false;
}}
if(advads_pro_utils.isset_nested(this.placement_info, 'options', 'close', 'enabled') &&
this.placement_info.options.close.enabled){
if(advads_pro_utils.isset_nested(this.placement_info, 'options', 'close', 'timeout_enabled') &&
this.placement_info.options.close.timeout_enabled &&
advads_pro_utils.isset(advads.get_cookie('timeout_placement_' + this.placement_info.id))
){
return false;
}}
if(advads_pro_utils.isset_nested(this.placement_info, 'options')
&& typeof this.placement_info.options==='object'){
var params=this.placement_info.options;
if(! advads_pro_utils.selector_exists(params)){
return false;
}}
return true;
};
Advads_passive_cb_Placement.prototype.can_use_passive_cb=function(){
if(! this.ajax_query){
return true;
}
var stored_info=Advads_passive_cb_Conditions.get_stored_info();
var now=~~(( new Date()).getTime() / 1000);
for(var hash in this.server_conditions){
if(! this.server_conditions.hasOwnProperty(hash)){ continue; }
var condition=this.server_conditions[ hash ];
var stored_type=stored_info[ condition.type ];
if('object'!==typeof stored_type){
return false;
}
var stored_condition=stored_type[ hash ];
if('object'!==typeof stored_condition){
return false;
}
if(((parseInt(stored_condition.time, 10)||0)  + this.server_info_duration) < now){
return false;
}}
return true;
};
Advads_passive_cb_Placement.prototype.output=function(){
is_empty=true;
switch(this.type){
case 'ad':
if(! this.can_display()) break;
var ad=new Advads_passive_cb_Ad(this.ads[this.id], this.element_id);
if(ad.can_display()){
var ad_for_adblocker=this.get_ad_for_adblocker();
if(ad_for_adblocker){
ad=ad_for_adblocker;
}
ad.output({ track: true, inject: true, do_has_ad: true });
is_empty=false;
}
break;
case 'group':
if(typeof this.group_info==='object'){
if(! this.can_display()) break;
var group=new Advads_passive_cb_Group(this, this.element_id);
group.output();
is_empty=group.is_empty;
}
break;
}
advanced_ads_pro.observers.fire({ event: "inject_placement", id: this.placement_id, is_empty: is_empty, cb_type: 'passive' });
advanced_ads_pro.hasAd(this.placement_id, 'placement', this.placement_id, 'passive');
}
Advads_passive_cb_Placement.prototype.get_ad_for_adblocker=function(){
if(advanced_ads_pro.adblocker_active
&& this.ads_for_ab
){
for(var ad_id in this.ads_for_ab){
var ad=new Advads_passive_cb_Ad(this.ads_for_ab[ ad_id ] , this.element_id);
return ad;
}}
return false;
}
function Advads_passive_cb_Ad(ad_info, elementid){
if(typeof ad_info!=='object' ||
! advads_pro_utils.isset(ad_info.id) ||
! advads_pro_utils.isset(ad_info.title) ||
! advads_pro_utils.isset(ad_info.content)
){
throw new SyntaxError("Can not create Advads_passive_cb_Ad obj");
}
this.id=ad_info.id;
this.title=ad_info.title;
this.content=ad_info.content;
this.type=ad_info.type;
this.expiry_date=parseInt(ad_info.expiry_date)||0;
this.visitors=ad_info.visitors;
this.once_per_page=ad_info.once_per_page;
this.elementid=elementid ? elementid:null;
this.day_indexes=ad_info.day_indexes ? ad_info.day_indexes:null;
this.debugmode=ad_info.debugmode;
this.tracking_enabled=(ad_info.tracking_enabled===undefined||ad_info.tracking_enabled==true) ? true:false;
this.blog_id=ad_info.blog_id ? ad_info.blog_id:'';
this.privacy=ad_info.privacy ? ad_info.privacy:{};
this.position=ad_info.position ? ad_info.position:'';
};
Advads_passive_cb_Ad.prototype.output=function(options){
options=options||{};
if(this.debugmode){
var is_displayed=this.can_display({ ignore_debugmode: true }) ? 'displayed':'hidden';
var debug_message=jQuery(this.content).find('.advads-passive-cb-debug').data(is_displayed);
this.content=this.content.replace('##advanced_ads_passive_cb_debug##', debug_message);
}
if(options.do_has_ad){
advanced_ads_pro.hasAd(this.id, 'ad', this.title, 'passive');
}
if(options.track&&this.tracking_enabled){
if(! advanced_ads_pro.passive_ads[ this.blog_id ]){
advanced_ads_pro.passive_ads[ this.blog_id ]=[];
}
advanced_ads_pro.passive_ads[ this.blog_id ].push(this.id);
}
advads_pro_utils.log('output passive ad', this.id, this.elementid, this.content);
if(! options.inject){
return this.content;
}
advanced_ads_pro.inject(this.elementid, this.content);
},
Advads_passive_cb_Ad.prototype.can_display=function(check_options){
check_options=check_options||{};
if(this.debugmode&&! check_options.ignore_debugmode){
return true;
}
if(''===jQuery.trim(this.content)){
advads_pro_utils.log('passive ad id', this.id, 'cannot be displayed: empty content');
return false;
}
if(! this.can_display_by_visitor()){
advads_pro_utils.log('passive ad id', this.id, 'cannot be displayed: by_visitor');
return false;
}
if(! this.can_display_by_expiry_date()){
advads_pro_utils.log('passive ad id', this.id, 'cannot be displayed: by_expiry_date');
return false;
}
if(! this.can_display_by_timeout()){
advads_pro_utils.log('passive ad id', this.id, 'cannot be displayed: by_timeout');
return false;
}
if(! this.can_display_by_display_limit()){
advads_pro_utils.log('passive ad id', this.id, 'cannot be displayed: by_display_limit');
return false;
}
if(! this.can_display_by_weekday()){
advads_pro_utils.log('passive ad id', this.id, 'cannot be displayed: by_weekday');
return false;
}
if(! this.can_display_by_cfp()){
advads_pro_utils.log('passive ad id', this.id, 'cannot be displayed: by_cfp');
return false;
}
if(! this.can_display_by_consent()){
advads_pro_utils.log('passive ad id', this.id, 'cannot be displayed: by_consent');
return false;
}
return true;
};
Advads_passive_cb_Ad.prototype.can_display_by_visitor=function(){
if(! jQuery.isArray(this.visitors)||this.visitors.length===0){
return true
}
Advads_passive_cb_Conditions.init();
var pos=0, last_result=false, _condition;
for(var i=0; i < this.visitors.length; ++i){
_condition=this.visitors[ pos ];
if(last_result&&_condition.connector==='or'){
pos++;
continue;
}
last_result=Advads_passive_cb_Conditions.frontend_check(_condition, this);
if(! last_result){
pos++;
if(! this.visitors[ pos ]||this.visitors[ pos ].connector!=='or'){
return false;
}}else{
pos++;
}}
return true;
};
Advads_passive_cb_Ad.prototype.can_display_by_expiry_date=function(){
if(this.expiry_date <=0){
return true;
}
return this.expiry_date > ~~(new Date().getTime() / 1000);
}
Advads_passive_cb_Ad.prototype.can_display_by_weekday=function(){
if(this.day_indexes){
var today=new Date().getUTCDay();
return jQuery.inArray(today, this.day_indexes) >=0
}
return true;
}
Advads_passive_cb_Ad.prototype.can_display_by_timeout=function(){
if(advads_pro_utils.isset(advads.get_cookie('timeout_' + this.id))){
return false;
}
return true;
}
Advads_passive_cb_Ad.prototype.can_display_by_display_limit=function(){
if(this.once_per_page){
for(var i=0; i < advanced_ads_pro.ads.length; i++){
if(advanced_ads_pro.ads[ i ].type==='ad'&&parseInt(advanced_ads_pro.ads[ i ].id, 10)===this.id){
return false;
}};}
return true;
}
Advads_passive_cb_Ad.prototype.can_display_by_cfp=function(){
return ! advads.get_cookie('advads_pro_cfp_ban');
}
Advads_passive_cb_Ad.prototype.can_display_by_consent=function(){
if(this.privacy.ignore){
return true;
}
if(! advads.privacy){
return true;
}
if(this.type==='adsense'&&advads.privacy.is_adsense_npa_enabled()){
return true;
}
var state=advads.privacy.get_state();
return state==='accepted'||state==='not_needed';
}
function Advads_passive_cb_Group(item, elementid){
if(! advads_pro_utils.isset(item.group_info.id) ||
! advads_pro_utils.isset(item.group_info.type) ||
! advads_pro_utils.isset(item.group_info.weights) ||
! advads_pro_utils.isset(item.group_info.ordered_ad_ids) ||
! advads_pro_utils.isset(item.group_info.ad_count) ||
! advads_pro_utils.isset(item.ads)){
throw new SyntaxError("Can not create Advads_passive_cb_Group obj");
}
this.id=item.group_info.id;
this.name=item.group_info.name ? item.group_info.name:this.id;
this.type=item.group_info.type;
this.weights=item.group_info.weights;
this.ordered_ad_ids=item.group_info.ordered_ad_ids;
this.ad_count=item.group_info.ad_count;
this.elementid=elementid ? elementid:null;
this.slider_options=advads_pro_utils.isset(item.group_info.slider_options) ? item.group_info.slider_options: false;
this.refresh_enabled=advads_pro_utils.isset(item.group_info.refresh_enabled) ? true:false;
if(advads_pro_utils.isset(item.group_info.refresh_interval_for_ads)){
this.refresh_interval=item.group_info.refresh_interval_for_ads;
}else if(advads_pro_utils.isset(item.group_info.refresh_interval)){
this.refresh_interval=item.group_info.refresh_interval;
}else{
this.refresh_interval=2000;
}
this.placement=(item instanceof Advads_passive_cb_Placement) ? item: false;
this.random=item.group_info.random;
this.ads=item.ads;
this.group_wrap=item.group_wrap;
this.is_empty=true;
}
Advads_passive_cb_Group.prototype.output=function(){
var ad_for_adblocker=this.placement&&this.placement.get_ad_for_adblocker();
advanced_ads_pro.hasAd(this.id, 'group', this.name, 'passive');
if(! ad_for_adblocker&&this.refresh_enabled){
this.output_refresh();
return;
}
var ordered_ad_ids,
ads_displayed=0,
output_buffer=[];
switch(this.type){
case 'ordered':
case 'slider':
ordered_ad_ids=this.shuffle_ordered_ads(this.ordered_ad_ids, this.weights);
break;
case 'grid':
ordered_ad_ids=this.random ? this.shuffle_ads():this.shuffle_ordered_ads(this.ordered_ad_ids, this.weights);
break;
default:
ordered_ad_ids=this.shuffle_ads();
}
if(! jQuery.isArray(ordered_ad_ids)||! jQuery.isPlainObject(this.ads)){
return;
}
for(var i=0; i < ordered_ad_ids.length; i++){
if(! this.ads.hasOwnProperty(ordered_ad_ids[i])) continue;
var ad_info=this.ads[ordered_ad_ids[i]];
if(typeof ad_info==='object'){
var ad=new Advads_passive_cb_Ad(ad_info, this.elementid);
if(ad.can_display()){
if(ad_for_adblocker){
ad=ad_for_adblocker;
}
if(( this.type==='slider'&&this.slider_options)
|| this.group_wrap
){
output_buffer.push(ad.output({ track: true, inject: false, do_has_ad: true }));
}else{
ad.output({ track: true, inject: true, do_has_ad: true });
}
ads_displayed++;
this.is_empty=false;
}}
if(ads_displayed===this.ad_count){
break;
}
if(! this.is_empty&&ad_for_adblocker){
break;
}}
if(output_buffer.length){
if(this.type==='slider'&&this.slider_options){
output_buffer=this.output_slider(output_buffer);
}
advanced_ads_pro.inject(this.elementid, this.add_group_wrap(output_buffer, ads_displayed));
}}
Advads_passive_cb_Group.prototype.output_refresh=function(){
var ordered_ad_ids=this.ordered_ad_ids,
output_buffer=[],
self=this,
index=0,
ad_id,
prev_ad_id=false,
tracked_ads=[],
ads_displayed=0,
interval=this.refresh_interval;
var $el=jQuery('#' + self.elementid);
if(! jQuery.isArray(ordered_ad_ids)||! jQuery.isPlainObject(this.ads)){
return;
}
function track_ad(ad){
if(jQuery.inArray(ad.id, tracked_ads) < 0){
tracked_ads.push(ad.id);
var data={};
data[ ad.blog_id ]=[ ad.id ];
advanced_ads_pro.observers.fire({ event: "inject_passive_ads", ad_ids: data });
}}
function pick_ids(){
switch(self.type){
case 'ordered':
var prev_index=ordered_ad_ids.indexOf(prev_ad_id);
if(prev_index!==-1){
var new_ids=ordered_ad_ids.slice(prev_index + 1).concat(ordered_ad_ids.slice(0, prev_index));
}else{
var new_ids=ordered_ad_ids;
}
break;
default:
var new_ids=self.shuffle_ads();
var prev_index=new_ids.indexOf(prev_ad_id);
if(prev_index!==-1){
new_ids.splice(prev_index, 1);
}}
return new_ids;
}
function get_ad_interval(ad_id){
if(typeof self.refresh_interval!=='object'){
return parseInt(self.refresh_interval, 10)||2000;
}
return parseInt(self.refresh_interval[ ad_id ], 10)||2000;
}
function get_position(ad){
var position='';
if(advads_pro_utils.isset_nested(self.placement, 'placement_info', 'options', 'placement_position')){
position=self.placement.placement_info.options.placement_position;
}
if(['left', 'right'].indexOf(position)===-1){
position=ad.position;
}
return position;
}
(function tick(){
var new_ids=pick_ids();
for(var i=0; i < new_ids.length; i++){
var ad_id=new_ids[ i ];
var ad_info=self.ads[ ad_id ];
if(typeof ad_info==='object'){
var ad=new Advads_passive_cb_Ad(ad_info, self.elementid);
if(ad.can_display()){
if(ads_displayed===0){
tracked_ads.push(ad_id);
output_buffer=[ ad.output({ track: true, inject: false, do_has_ad: true }) ];
advanced_ads_group_refresh.prepare_wrapper($el, get_position(ad), true);
}else{
var do_has_ad=jQuery.inArray(ad_id, tracked_ads) < 0;
output_buffer=[ ad.output({ track: false, inject: false, do_has_ad: do_has_ad }) ];
track_ad(ad);
advanced_ads_group_refresh.prepare_wrapper($el, get_position(ad), false);
}
advanced_ads_pro.inject(self.elementid, self.add_group_wrap(output_buffer, 1));
self.is_empty=false;
ads_displayed++;
setTimeout(function(){
tick()
}, get_ad_interval(ad_id));
prev_ad_id=ad.id;
break;
}}
}})();
}
Advads_passive_cb_Group.prototype.add_group_wrap=function(output_buffer, ads_displayed){
if(! output_buffer.length){ return ''; }
var before='', after='';
if(this.group_wrap){
for(var i=0; i < this.group_wrap.length; i++){
var wrap=this.group_wrap[ i ];
wrap.min_ads=wrap.min_ads||1;
if(typeof(wrap)!=='object'||wrap.min_ads > ads_displayed){ continue; }
if(wrap.before){ before=wrap.before + before }
if(wrap.after){ after=after + wrap.after }
if(typeof wrap.each==='string'){
for(var j=0; j < output_buffer.length; j++){
output_buffer[ j ]=wrap.each.replace('%s', output_buffer[ j ]);
}}else if(typeof wrap.each==='object'){
var each_obj=wrap.each;
for(var j=0; j < output_buffer.length; j++){
for(var format_index in each_obj){
var ad_wrapped=false;
if(each_obj.hasOwnProperty(format_index)
&& format_index!=='all'
&&(( 1 + j) % parseInt(format_index, 10)===0)
){
output_buffer[ j ]=each_obj[ format_index ].replace('%s', output_buffer[ j ]);
ad_wrapped=true;
break;
}}
if(! ad_wrapped&&each_obj.all){
output_buffer[ j ]=each_obj.all.replace('%s', output_buffer[ j ]);
}}
}}
}
return before + output_buffer.join('') + after;
}
Advads_passive_cb_Group.prototype.output_slider=function(output_buffer){
var output_html, ads_output;
if(output_buffer.length > 1&&typeof jQuery.fn.unslider==='function'){
ads_output=output_buffer.join('</li><li>');
output_buffer=[];
output_buffer.push('<div id="' + this.slider_options.slider_id + '" class="' + this.slider_options.init_class + ' ' + this.slider_options.prefix + 'slider"><ul><li>');
output_buffer.push(ads_output);
output_buffer.push('</li></ul></div>');
output_buffer.push("<scr" + "ipt>jQuery(function(){ jQuery('." + this.slider_options.init_class + "').unslider({ " + this.slider_options.settings +" });});</scr" + "ipt>");
}
return output_buffer;
}
Advads_passive_cb_Group.prototype.shuffle_ordered_ads=function(ordered_ad_ids, weights){
weight_array=[];
for(var i=0; i < ordered_ad_ids.length; i++){
var weight=weights[ ordered_ad_ids [ i ] ];
if(! weight){
return ordered_ad_ids;
}
weight_array.push(weight);
}
var count=weight_array.length;
var pos=0;
for(var i=1; i <=count; i++){
if(i==count||weight_array[ i ]!==weight_array[ i - 1 ]){
var slice_len=i - pos;
if(slice_len!==1){
var shuffled=advads_pro_utils.shuffle_array(ordered_ad_ids.slice(pos, pos + slice_len));
var arg=[ pos, slice_len ].concat(shuffled);
Array.prototype.splice.apply(ordered_ad_ids, arg);
}
pos=i;
}}
return ordered_ad_ids;
}
Advads_passive_cb_Group.prototype.shuffle_ads=function(){
var shuffled_ads=[],
ad_weights=jQuery.extend({}, this.weights);
while(null!==(random_ad_id=advads_pro_utils.get_random_el_by_weight(ad_weights))){
delete ad_weights[random_ad_id];
shuffled_ads.push(parseInt(random_ad_id, 10));
}
return shuffled_ads;
}}
if(! advads_pro_utils){
var advads_pro_utils={
debug: window.location&&window.location.hash&&window.location.hash.indexOf('#debug=true')!==-1,
each: function(arr, fn, _this){
var i, len=(arr&&arr.length)||0;
for(i=0; i < len; i++){
fn.call(_this, arr[ i ], i);
}},
each_key: function(obj, fn, _this){
if('object'===typeof obj){
var key;
for(key in obj){
if(obj.hasOwnProperty(key)){
fn.call(_this, key, obj[ key ]);
}}
}},
log: function(){
if(this.debug&&this.isset(window.console)){
var args=Array.prototype.slice.call(arguments);
args.unshift('Advanced Ads CB:');
window.console.log.apply(window.console, args);
}},
print_debug_arrays: function(){
if(advanced_ads_pro.iterations===0){
this.log("passive_ads\n", advads_passive_ads);
this.log("passive_groups\n", advads_passive_groups);
this.log("passive_placements\n", advads_passive_placements);
this.log("ajax_queries\n", advads_ajax_queries);
this.log(Advads_passive_cb_Conditions.SERVER_INFO_COOKIE_NAME + "\n", Advads_passive_cb_Conditions.get_stored_info());
}},
isset: function(str){
return typeof str!=='undefined';
},
isset_nested: function(obj){
for(var i=1; i < arguments.length; i++){
if(! obj||! obj.hasOwnProperty(arguments[i])){
return false;
}
obj=obj[arguments[i]];
}
return true;
},
is_numeric: function(n){
return ! isNaN(parseFloat(n))&&isFinite(n);
},
get_random_number: function(min, max){
var rand=min - 0.5 + Math.random() * (max - min + 1)
return Math.round(rand);
},
get_random_el_by_weight: function(weights, skip){
var max=0, rand;
skip=typeof skip!=='undefined' ? skip:false;
if(typeof weights==='object'){
for(var el in weights){
if(el!==skip&&weights.hasOwnProperty(el)){
max +=parseInt(weights[el])||0;
}}
if(max < 1){
return null;
}
rand=advads_pro_utils.get_random_number(1, max);
for(var el in weights){
if(el!==skip&&weights.hasOwnProperty(el)){
rand -=weights[ el ];
if(rand <=0){
return el;
}}
}}
},
bind: function(func, context){
return function(){
return func.apply(context, arguments);
};},
shuffle_array: function(arr){
var temp, j, i=arr.length;
if(! i){
return arr;
}
while(--i){
j=~~(Math.random() *(i + 1));
temp=arr[ i ];
arr[ i ]=arr[ j ];
arr[ j ]=temp;
}
return arr;
},
selector_exists: function(params){
var cp_target=(! params.inject_by||params.inject_by==='pro_custom_element') ? 'pro_custom_element':'container_id';
var el=params[ cp_target ];
if(! el){
return true;
}
var $el=jQuery(el);
if(! $el.length){
advads_pro_utils.log("selector does not exist", el);
return false;
}
if(! advanced_ads_pro_ajax_object.moveintohidden&&! $el.filter(':visible').length){
advads_pro_utils.log("selector is hidden", el);
return false;
}
return true;
},
deg2rad: function(deg){
return deg * Math.PI / 180;
},
calculate_distance: function(lat1, lon1, lat2, lon2, unit){
unit=unit||'km';
lat1=this.deg2rad(lat1);
lon1=this.deg2rad(lon1);
lat2=this.deg2rad(lat2);
lon2=this.deg2rad(lon2);
dLon=lon2 - lon1;
a=Math.pow(Math.cos(lat2) * Math.sin(dLon), 2) + Math.pow(Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon), 2);
b=Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon);
rad=Math.atan2(Math.sqrt(a), b);
if(unit=='mi'){
return rad * 3958.755865744;
}else{
return rad * 6371.0;
}}
};}
var advanced_ads_group_refresh={
element_ids: {},
is_has_ad_needed: function(elementId, item){
if(this.element_ids[ elementId ]){
for(var k=0; k < advanced_ads_pro.ads.length; k++){
var saved_item=advanced_ads_pro.ads[ k ];
if(saved_item.elementId===elementId
&& saved_item.id===item.id
&& saved_item.type===item.type
){
return false;
}}
}
return true;
},
add_query: (function advanced_ads_group_refresh_add_query(query, interval){
var queries=[];
return function(query, interval){
var elementid=query.elementid;
var call_at=(new Date).getTime() + interval;
queries[ call_at ]=queries[ call_at ]||[];
queries[ call_at ].push(query);
setTimeout(function(){
var now=(new Date).getTime();
var requests=[];
for(call_time in queries){
if(! queries.hasOwnProperty(call_time)){ continue; }
if(now >(call_time - 1000)){
var queries_for_time=queries[ call_time ];
for(var i=0; i < queries_for_time.length; i++){
requests.push(queries_for_time[ i ]);
}
delete queries[ call_time ];
}}
advanced_ads_pro.process_ajax_ads(requests);
}, interval);
}})(),
find_float: function($el){
var r=false;
$el.find('div').each(function(i, el){
if(this.style.float==='left'||this.style.float=='right'){
r=this.style.float;
return false;
}})
return r;
},
prepare_wrapper: function($el, float, is_first_time){
if(! is_first_time){
this.maybe_increase_sizes($el);
$el.empty();
}
this.set_float($el, float);
},
maybe_increase_sizes: function($el){
var float=$el.css('float');
if(['left', 'right'].indexOf(float)===-1){
float=false;
}
var sizes={};
if(float){
var prev_w=parseInt($el.css('min-width'), 10)||0;
var now_w=$el.prop('scrollWidth')||0;
if(now_w > prev_w){
sizes[ 'min-width']=now_w;
}}
var prev_h=parseInt($el.css('min-height'), 10)||0;
var now_h=$el.prop('scrollHeight')||0;
if(now_h > prev_h){
sizes[ 'min-height']=now_h;
}
if(sizes['min-height']||sizes['min-width']){
$el.css(sizes);
}},
set_float: function($el, float){
if(['left', 'right'].indexOf(float)===-1){
float=false;
}
var prev_float=$el.data('prev_float')||false;
if(float!==prev_float){
$el.data('prev_float', float);
if(float){
$el.css({ 'min-width': '' , 'min-height': '', 'float': float });
}else{
$el.css({ 'min-width': '' , 'min-height': '', 'float': '' });
}}
}};
(function(t){function e(e){return u?e.data("events"):t._data(e[0]).events}function n(t,n,r){var i=e(t),a=i[n];if(!u){var s=r?a.splice(a.delegateCount-1,1)[0]:a.pop();return a.splice(r?0:a.delegateCount||0,0,s),void 0}r?i.live.unshift(i.live.pop()):a.unshift(a.pop())}function r(e,r,i){var a=r.split(/\s+/);e.each(function(){for(var e=0;a.length>e;++e){var r=t.trim(a[e]).match(/[^\.]+/i)[0];n(t(this),r,i)}})}function i(e){t.fn[e+"First"]=function(){var n=t.makeArray(arguments),i=n.shift();return i&&(t.fn[e].apply(this,arguments),r(this,i)),this}}var a=t.fn.jquery.split("."),s=parseInt(a[0]),f=parseInt(a[1]),u=1>s||1==s&&7>f;i("bind"),i("one"),t.fn.delegateFirst=function(){var e=t.makeArray(arguments),n=e[1];return n&&(e.splice(0,2),t.fn.delegate.apply(this,arguments),r(this,n,!0)),this},t.fn.liveFirst=function(){var e=t.makeArray(arguments);return e.unshift(this.selector),t.fn.delegateFirst.apply(t(document),e),this},u||(t.fn.onFirst=function(e,n){var i=t(this),a="string"==typeof n;if(t.fn.on.apply(i,arguments),"object"==typeof e)for(type in e)e.hasOwnProperty(type)&&r(i,type,a);else"string"==typeof e&&r(i,e,a);return i})})(jQuery);
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}function n(o){function t(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},t.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(e){}return r=o.write?o.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),u=f.slice(1).join("=");'"'===u.charAt(0)&&(u=u.slice(1,-1));try{var l=f[0].replace(s,decodeURIComponent);if(u=o.read?o.read(u,l):o(u,l)||u.replace(s,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch(e){}if(n===l){c=u;break}n||(c[l]=u)}catch(e){}}return c}}return t.set=t,t.get=function(e){return t.call(t,e)},t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(n,o){t(n,"",e(o,{expires:-1}))},t.withConverter=n,t}return n(function(){})});
if(!Array.prototype.includes){
Object.defineProperty(Array.prototype, 'includes', {
value: function (searchElement, fromIndex){
if(this==null){
throw new TypeError('"this" is null or not defined');
}
var o=Object(this);
var len=o.length >>> 0;
if(len===0){
return false;
}
var n=fromIndex | 0;
var k=Math.max(n >=0 ? n:len - Math.abs(n), 0);
function sameValueZero(x, y){
return x===y||(typeof x==='number'&&typeof y==='number'&&isNaN(x)&&isNaN(y));
}
while (k < len){
if(sameValueZero(o[k], searchElement)){
return true;
}
k++;
}
return false;
}});
}
!function ($, options){
if(options.debug){
console.log('PYS:', options);
}
var dummyPinterest=function (){
return {
isEnabled: function (){
},
disable: function (){
},
loadPixel: function (){
},
fireEvent: function (name, data){
return false;
},
onCommentEvent: function (){
},
onDownloadEvent: function (params){
},
onFormEvent: function (params){
},
onWooAddToCartOnButtonEvent: function (product_id){
},
onWooAddToCartOnSingleEvent: function (product_id, qty, is_variable, is_external, $form){
},
onWooRemoveFromCartEvent: function (cart_item_hash){
},
onEddAddToCartOnButtonEvent: function (download_id, price_index, qty){
},
onEddRemoveFromCartEvent: function (item){
}}
}();
var dummyBing=function (){
return {
isEnabled: function (){
},
disable: function (){
},
loadPixel: function (){
},
fireEvent: function (name, data){
return false;
},
onAdSenseEvent: function (){
},
onClickEvent: function (params){
},
onWatchVideo: function (params){
},
onCommentEvent: function (){
},
onFormEvent: function (params){
},
onDownloadEvent: function (params){
},
onWooAddToCartOnButtonEvent: function (product_id){
},
onWooAddToCartOnSingleEvent: function (product_id, qty, is_variable, is_external, $form){
},
onWooRemoveFromCartEvent: function (cart_item_hash){
},
onWooAffiliateEvent: function (product_id){
},
onWooPayPalEvent: function (){
},
onEddAddToCartOnButtonEvent: function (download_id, price_index, qty){
},
onEddRemoveFromCartEvent: function (item){
}}
}();
var Utils=function (options){
var Pinterest=dummyPinterest;
var Bing=dummyBing;
var gtag_loaded=false;
function loadPixels(){
if(!options.gdpr.all_disabled_by_api){
if(!options.gdpr.facebook_disabled_by_api){
Facebook.loadPixel();
}
if(!options.gdpr.analytics_disabled_by_api){
Analytics.loadPixel();
}
if(!options.gdpr.pinterest_disabled_by_api){
Pinterest.loadPixel();
}
if(!options.gdpr.bing_disabled_by_api){
Bing.loadPixel();
}}
}
return {
setupPinterestObject: function (){
Pinterest=window.pys.Pinterest||Pinterest;
return Pinterest;
},
setupBingObject: function (){
Bing=window.pys.Bing||Bing;
return Bing;
},
copyProperties: function (from, to){
for (var key in from){
to[key]=from[key];
}
return to;
},
getTagsAsArray: function (tag){
return [].slice.call(document.getElementsByTagName(tag));
},
getRequestParams: function (){
return [];
},
fireStaticEvents: function (pixel){
if(options.staticEvents.hasOwnProperty(pixel)){
$.each(options.staticEvents[pixel], function (eventName, events){
$.each(events, function (index, eventData){
eventData.fired=eventData.fired||false;
if(!eventData.fired){
var fired=false;
if('facebook'===pixel){
fired=Facebook.fireEvent(eventName, eventData);
}else if('ga'===pixel){
fired=Analytics.fireEvent(eventName, eventData);
}else if('pinterest'===pixel){
fired=Pinterest.fireEvent(eventName, eventData);
}else if('bing'===pixel){
fired=Bing.fireEvent(eventName, eventData);
}
eventData.fired=fired;
}});
});
}},
loadGoogleTag: function (id){
if(!gtag_loaded){
(function (window, document, src){
var a=document.createElement('script'),
m=document.getElementsByTagName('script')[0];
a.async=1;
a.src=src;
m.parentNode.insertBefore(a, m);
})(window, document, '//www.googletagmanager.com/gtag/js?id=' + id);
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function gtag(){
dataLayer.push(arguments);
};
gtag('js', new Date());
gtag_loaded=true;
}},
loadPixels: function (){
if(options.gdpr.ajax_enabled){
$.get({
url: options.ajaxUrl,
dataType: 'json',
data: {
action: 'pys_get_gdpr_filters_values'
},
success: function (res){
if(res.success){
options.gdpr.all_disabled_by_api=res.data.all_disabled_by_api;
options.gdpr.facebook_disabled_by_api=res.data.facebook_disabled_by_api;
options.gdpr.analytics_disabled_by_api=res.data.analytics_disabled_by_api;
options.gdpr.google_ads_disabled_by_api=res.data.google_ads_disabled_by_api;
options.gdpr.pinterest_disabled_by_api=res.data.pinterest_disabled_by_api;
options.gdpr.bing_disabled_by_api=res.data.bing_disabled_by_api;
}
loadPixels();
}});
}else{
loadPixels();
}},
consentGiven: function (pixel){
if(options.gdpr.cookiebot_integration_enabled&&typeof Cookiebot!=='undefined'){
var cookiebot_consent_category=options.gdpr['cookiebot_' + pixel + '_consent_category'];
if(options.gdpr[pixel + '_prior_consent_enabled']){
if(Cookiebot.consented===false||Cookiebot.consent[cookiebot_consent_category]){
return true;
}}else{
if(Cookiebot.consent[cookiebot_consent_category]){
return true;
}}
return false;
}
if(options.gdpr.ginger_integration_enabled){
var ginger_cookie=Cookies.get('ginger-cookie');
if(options.gdpr[pixel + '_prior_consent_enabled']){
if(typeof ginger_cookie==='undefined'||ginger_cookie==='Y'){
return true;
}}else{
if(ginger_cookie==='Y'){
return true;
}}
return false;
}
if(options.gdpr.cookie_notice_integration_enabled&&typeof cnArgs!=='undefined'){
var cn_cookie=Cookies.get(cnArgs.cookieName);
if(options.gdpr[pixel + '_prior_consent_enabled']){
if(typeof cn_cookie==='undefined'||cn_cookie==='true'){
return true;
}}else{
if(cn_cookie==='true'){
return true;
}}
return false;
}
if(options.gdpr.cookie_law_info_integration_enabled){
var cli_cookie=Cookies.get('viewed_cookie_policy');
if(options.gdpr[pixel + '_prior_consent_enabled']){
if(typeof cli_cookie==='undefined'||cli_cookie==='yes'){
return true;
}}else{
if(cli_cookie==='yes'){
return true;
}}
return false;
}
return true;
},
setupGdprCallbacks: function (){
if(options.gdpr.cookiebot_integration_enabled&&typeof Cookiebot!=='undefined'){
Cookiebot.onaccept=function (){
if(Cookiebot.consent[options.gdpr.cookiebot_facebook_consent_category]){
Facebook.loadPixel();
}
if(Cookiebot.consent[options.gdpr.cookiebot_analytics_consent_category]){
Analytics.loadPixel();
}
if(Cookiebot.consent[options.gdpr.cookiebot_pinterest_consent_category]){
Pinterest.loadPixel();
}
if(Cookiebot.consent[options.gdpr.cookiebot_bing_consent_category]){
bing.loadPixel();
}};
Cookiebot.ondecline=function (){
Facebook.disable();
Analytics.disable();
Pinterest.disable();
Bing.disable();
};}
if(options.gdpr.cookie_notice_integration_enabled){
$(document).onFirst('click', '.cn-set-cookie', function (){
if($(this).data('cookie-set')==='accept'){
Facebook.loadPixel();
Analytics.loadPixel();
Pinterest.loadPixel();
Bing.loadPixel();
}else{
Facebook.disable();
Analytics.disable();
Pinterest.disable();
Bing.disable();
}});
$(document).onFirst('click', '.cn-revoke-cookie', function (){
Facebook.disable();
Analytics.disable();
Pinterest.disable();
Bing.disable();
});
}
if(options.gdpr.cookie_law_info_integration_enabled){
$(document).onFirst('click', '#cookie_action_close_header', function (){
Facebook.loadPixel();
Analytics.loadPixel();
Pinterest.loadPixel();
Bing.loadPixel();
});
$(document).onFirst('click', '#cookie_action_close_header_reject', function (){
Facebook.disable();
Analytics.disable();
Pinterest.disable();
Bing.disable();
});
}},
getLinkExtension: function (link){
link=link.substring(0, (link.indexOf("#")===-1) ? link.length:link.indexOf("#"));
link=link.substring(0, (link.indexOf("?")===-1) ? link.length:link.indexOf("?"));
link=link.substring(link.lastIndexOf("/") + 1, link.length);
if(link.length > 0&&link.indexOf('.')!==-1){
link=link.substring(link.indexOf(".") + 1);
return link;
}else{
return "";
}},
getLinkFilename: function (link){
link=link.substring(0, (link.indexOf("#")===-1) ? link.length:link.indexOf("#"));
link=link.substring(0, (link.indexOf("?")===-1) ? link.length:link.indexOf("?"));
link=link.substring(link.lastIndexOf("/") + 1, link.length);
if(link.length > 0&&link.indexOf('.')!==-1){
return link;
}else{
return "";
}}
};}(options);
var Facebook=function (options){
var defaultEventTypes=[
'PageView',
'ViewContent',
'Search',
'AddToCart',
'AddToWishlist',
'InitiateCheckout',
'AddPaymentInfo',
'Purchase',
'Lead',
'Subscribe',
'CustomizeProduct',
'FindLocation',
'StartTrial',
'SubmitApplication',
'Schedule',
'Contact',
'Donate'
];
var initialized=false;
function fireEvent(name, data){
var actionType=defaultEventTypes.includes(name) ? 'track':'trackCustom';
var params={};
Utils.copyProperties(data, params);
Utils.copyProperties(options.commonEventParams, params);
if(options.debug){
console.log('[Facebook] ' + name, params);
}
fbq(actionType, name, params);
}
return {
isEnabled: function (){
return options.hasOwnProperty('facebook');
},
disable: function (){
initialized=false;
},
loadPixel: function (){
if(initialized||!this.isEnabled()||!Utils.consentGiven('facebook')){
return;
}
!function (f, b, e, v, n, t, s){
if(f.fbq) return;
n=f.fbq=function (){
n.callMethod ?
n.callMethod.apply(n, arguments):n.queue.push(arguments)
};
if(!f._fbq) f._fbq=n;
n.push=n;
n.loaded = !0;
n.version='2.0';
n.agent='dvpixelyoursite';
n.queue=[];
t=b.createElement(e);
t.async = !0;
t.src=v;
s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t, s)
}(window,
document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
options.facebook.pixelIds.forEach(function (pixelId){
if(options.facebook.removeMetadata){
fbq('set', 'autoConfig', false, pixelId);
}
fbq('init', pixelId, options.facebook.advancedMatching);
});
initialized=true;
Utils.fireStaticEvents('facebook');
},
fireEvent: function (name, data){
if(!initialized||!this.isEnabled()){
return false;
}
data.delay=data.delay||0;
data.params=data.params||{};
if(data.delay===0){
fireEvent(name, data.params);
}else{
setTimeout(function (name, params){
fireEvent(name, params);
}, data.delay * 1000, name, data.params);
}
return true;
},
onCommentEvent: function (){
if(initialized&&this.isEnabled()&&options.facebook.commentEventEnabled){
this.fireEvent('Comment', {
params: Utils.copyProperties(options.facebook.contentParams, {})
});
}},
onDownloadEvent: function (params){
if(initialized&&this.isEnabled()&&options.facebook.downloadEnabled){
this.fireEvent('Download', {
params: Utils.copyProperties(options.facebook.contentParams, params)
});
}},
onFormEvent: function (params){
if(initialized&&this.isEnabled()&&options.facebook.formEventEnabled){
this.fireEvent('Form', {
params: Utils.copyProperties(options.facebook.contentParams, params)
});
}},
onWooAddToCartOnButtonEvent: function (product_id){
if(window.pysWooProductData.hasOwnProperty(product_id)){
if(window.pysWooProductData[product_id].hasOwnProperty('facebook')){
this.fireEvent('AddToCart', {
params: Utils.copyProperties(window.pysWooProductData[product_id]['facebook'], {})
});
}}
},
onWooAddToCartOnSingleEvent: function (product_id, qty, is_variable, $form){
window.pysWooProductData=window.pysWooProductData||[];
if(window.pysWooProductData.hasOwnProperty(product_id)){
if(window.pysWooProductData[product_id].hasOwnProperty('facebook')){
if(is_variable&&!options.facebook.wooVariableAsSimple){
product_id=parseInt($form.find('input[name="variation_id"]').val());
}
var params=Utils.copyProperties(window.pysWooProductData[product_id]['facebook'], {});
if(options.woo.addToCartOnButtonValueEnabled&&options.woo.addToCartOnButtonValueOption!=='global'){
params.value=params.value * qty;
}
if(params.hasOwnProperty('contents')){
params.contents[0].quantity=qty;
}
this.fireEvent('AddToCart', {
params: params
});
}}
},
onWooRemoveFromCartEvent: function (cart_item_hash){
window.pysWooRemoveFromCartData=window.pysWooRemoveFromCartData||[];
if(window.pysWooRemoveFromCartData[cart_item_hash].hasOwnProperty('facebook')){
this.fireEvent('RemoveFromCart', {
params: Utils.copyProperties(window.pysWooRemoveFromCartData[cart_item_hash]['facebook'], {})
});
}},
onEddAddToCartOnButtonEvent: function (download_id, price_index, qty){
if(window.pysEddProductData.hasOwnProperty(download_id)){
var index;
if(price_index){
index=download_id + '_' + price_index;
}else{
index=download_id;
}
if(window.pysEddProductData[download_id].hasOwnProperty(index)){
if(window.pysEddProductData[download_id][index].hasOwnProperty('facebook')){
var params=Utils.copyProperties(window.pysEddProductData[download_id][index]['facebook'], {});
if(options.edd.addToCartOnButtonValueEnabled&&options.edd.addToCartOnButtonValueOption!=='global'){
params.value=params.value * qty;
}
var contents=JSON.parse(params.contents);
contents[0].quantity=qty;
params.contents=JSON.stringify(contents);
this.fireEvent('AddToCart', {
params: params
});
}}
}},
onEddRemoveFromCartEvent: function (item){
if(item.hasOwnProperty('facebook')){
this.fireEvent('RemoveFromCart', {
params: Utils.copyProperties(item['facebook'], {})
});
}}
};}(options);
var Analytics=function (options){
var initialized=false;
function fireEvent(name, data){
var eventParams=Utils.copyProperties(data, {});
var _fireEvent=function (tracking_id){
var params=Utils.copyProperties(eventParams, {send_to: tracking_id});
if(options.debug){
console.log('[Google Analytics #' + tracking_id + '] ' + name, params);
}
gtag('event', name, params);
};
options.ga.trackingIds.forEach(function (tracking_id){
_fireEvent(tracking_id);
});
}
return {
isEnabled: function (){
return options.hasOwnProperty('ga');
},
disable: function (){
initialized=false;
},
loadPixel: function (){
if(initialized||!this.isEnabled()||!Utils.consentGiven('analytics')){
return;
}
Utils.loadGoogleTag(options.ga.trackingIds[0]);
var config={
'link_attribution': options.ga.enhanceLinkAttr,
'anonymize_ip': options.ga.anonimizeIP
};
if(options.ga.crossDomainEnabled){
config.linker={
accept_incoming: options.ga.crossDomainAcceptIncoming,
domains: options.ga.crossDomainDomains
};}
options.ga.trackingIds.forEach(function (trackingId){
gtag('config', trackingId, config);
});
initialized=true;
Utils.fireStaticEvents('ga');
},
fireEvent: function (name, data){
if(!initialized||!this.isEnabled()){
return false;
}
data.delay=data.delay||0;
data.params=data.params||{};
if(data.delay===0){
fireEvent(name, data.params);
}else{
setTimeout(function (name, params){
fireEvent(name, params);
}, data.delay * 1000, name, data.params);
}
return true;
},
onCommentEvent: function (){
if(initialized&&this.isEnabled()&&options.ga.commentEventEnabled){
this.fireEvent(window.location.href, {
params: {
event_category: 'Comment',
event_label: $(document).find('title').text(),
non_interaction: options.ga.commentEventNonInteractive
}});
}},
onDownloadEvent: function (params){
if(initialized&&this.isEnabled()&&options.ga.downloadEnabled){
this.fireEvent(params.download_url, {
params: {
event_category: 'Download',
event_label: params.download_name,
non_interaction: options.ga.downloadEventNonInteractive
}});
}},
onFormEvent: function (params){
if(initialized&&this.isEnabled()&&options.ga.formEventEnabled){
this.fireEvent(window.location.href, {
params: {
event_category: 'Form',
event_label: params.form_class,
non_interaction: options.ga.formEventNonInteractive
}});
}},
onWooAddToCartOnButtonEvent: function (product_id){
if(window.pysWooProductData.hasOwnProperty(product_id)){
if(window.pysWooProductData[product_id].hasOwnProperty('ga')){
this.fireEvent('add_to_cart', {
params: window.pysWooProductData[product_id]['ga']
});
}}
},
onWooAddToCartOnSingleEvent: function (product_id, qty, is_variable, $form){
window.pysWooProductData=window.pysWooProductData||[];
if(is_variable){
product_id=parseInt($form.find('input[name="variation_id"]').val());
}
if(window.pysWooProductData.hasOwnProperty(product_id)){
if(window.pysWooProductData[product_id].hasOwnProperty('ga')){
var params=Utils.copyProperties(window.pysWooProductData[product_id]['ga'], {});
if(options.woo.addToCartOnButtonValueEnabled&&options.woo.addToCartOnButtonValueOption!=='global'){
params.items[0].price=params.items[0].price * qty;
}
params.items[0].quantity=qty;
this.fireEvent('add_to_cart', {
params: params
});
}}
},
onWooRemoveFromCartEvent: function (cart_item_hash){
window.pysWooRemoveFromCartData=window.pysWooRemoveFromCartData||[];
if(window.pysWooRemoveFromCartData[cart_item_hash].hasOwnProperty('ga')){
this.fireEvent('remove_from_cart', {
params: Utils.copyProperties(window.pysWooRemoveFromCartData[cart_item_hash]['ga'], {})
});
}},
onEddAddToCartOnButtonEvent: function (download_id, price_index, qty){
if(window.pysEddProductData.hasOwnProperty(download_id)){
var index;
if(price_index){
index=download_id + '_' + price_index;
}else{
index=download_id;
}
if(window.pysEddProductData[download_id].hasOwnProperty(index)){
if(window.pysEddProductData[download_id][index].hasOwnProperty('ga')){
var params=Utils.copyProperties(window.pysEddProductData[download_id][index]['ga'], {});
params.items[0].quantity=qty;
this.fireEvent('add_to_cart', {
params: params
});
}}
}},
onEddRemoveFromCartEvent: function (item){
if(item.hasOwnProperty('ga')){
this.fireEvent('remove_from_cart', {
params: Utils.copyProperties(item['ga'], {})
});
}}
};}(options);
window.pys=window.pys||{};
window.pys.Facebook=Facebook;
window.pys.Analytics=Analytics;
window.pys.Utils=Utils;
$(document).ready(function (){
var Pinterest=Utils.setupPinterestObject();
var Bing=Utils.setupBingObject();
Utils.setupGdprCallbacks();
if(options.woo.enabled){
if(options.woo.addToCartOnButtonEnabled){
$('.add_to_cart_button:not(.product_type_variable)').click(function (e){
var product_id=$(this).data('product_id');
if(typeof product_id!=='undefined'){
Facebook.onWooAddToCartOnButtonEvent(product_id);
Analytics.onWooAddToCartOnButtonEvent(product_id);
Pinterest.onWooAddToCartOnButtonEvent(product_id);
Bing.onWooAddToCartOnButtonEvent(product_id);
}});
$('.single_add_to_cart_button').click(function (e){
var $button=$(this);
if($button.hasClass('disabled')){
return;
}
var $form=$button.closest('form');
if($form.length===0){
return;
}
var is_variable=$form.hasClass('variations_form');
var product_id;
var qty;
if(is_variable){
product_id=parseInt($form.find('*[name="add-to-cart"]').val());
qty=parseInt($form.find('input[name="quantity"]').val());
}else{
product_id=parseInt($form.find('*[name="add-to-cart"]').val());
qty=parseInt($form.find('input[name="quantity"]').val());
}
Facebook.onWooAddToCartOnSingleEvent(product_id, qty, is_variable, $form);
Analytics.onWooAddToCartOnSingleEvent(product_id, qty, is_variable, $form);
Pinterest.onWooAddToCartOnSingleEvent(product_id, qty, is_variable, false, $form);
Bing.onWooAddToCartOnSingleEvent(product_id, qty, is_variable, false, $form);
});
}
if(options.woo.removeFromCartEnabled){
$('body').on('click', options.woo.removeFromCartSelector, function (e){
var $a=$(e.currentTarget),
href=$a.attr('href');
var regex=new RegExp("[\\?&]remove_item=([^&#]*)"),
results=regex.exec(href);
if(results!==null){
var item_hash=results[1];
window.pysWooRemoveFromCartData=window.pysWooRemoveFromCartData||[];
if(window.pysWooRemoveFromCartData.hasOwnProperty(item_hash)){
Facebook.onWooRemoveFromCartEvent(item_hash);
Analytics.onWooRemoveFromCartEvent(item_hash);
Pinterest.onWooRemoveFromCartEvent(item_hash);
Bing.onWooRemoveFromCartEvent(item_hash);
}}
});
}}
if(options.edd.enabled){
if(options.edd.addToCartOnButtonEnabled){
$('form.edd_download_purchase_form .edd-add-to-cart').click(function (e){
var $button=$(this);
var $form=$button.closest('form');
var variable_price=$button.data('variablePrice');
var price_mode=$button.data('priceMode');
var ids=[];
var quantities=[];
var qty;
var id;
if(variable_price==='yes'&&price_mode==='multi'){
id=$form.find('input[name="download_id"]').val();
$.each($form.find('input[name="edd_options[price_id][]"]:checked'), function (i, el){
ids.push(id + '_' + $(el).val());
});
$.each(ids, function (i, variant_id){
var variant_index=variant_id.split('_', 2);
qty=$form.find('input[name="edd_download_quantity_' + variant_index[1] + '"]').val();
if(typeof qty!=='undefined'){
quantities.push(qty);
}else{
quantities.push(1);
}});
}else if(variable_price==='yes'&&price_mode==='single'){
id=$form.find('input[name="download_id"]').val();
ids.push(id + '_' + $form.find('input[name="edd_options[price_id][]"]:checked').val());
qty=$form.find('input[name="edd_download_quantity"]').val();
if(typeof qty!=='undefined'){
quantities.push(qty);
}else{
quantities.push(1);
}}else{
ids.push($button.data('downloadId'));
qty=$form.find('input[name="edd_download_quantity"]').val();
if(typeof qty!=='undefined'){
quantities.push(qty);
}else{
quantities.push(1);
}}
$.each(ids, function (i, download_id){
var q=parseInt(quantities[i]);
var variant_index=download_id.toString().split('_', 2);
var price_index;
if(variant_index.length===2){
download_id=variant_index[0];
price_index=variant_index[1];
}
Facebook.onEddAddToCartOnButtonEvent(download_id, price_index, q);
Analytics.onEddAddToCartOnButtonEvent(download_id, price_index, q);
Pinterest.onEddAddToCartOnButtonEvent(download_id, price_index, q);
Bing.onEddAddToCartOnButtonEvent(download_id, price_index, q);
});
});
}
if(options.edd.removeFromCartEnabled){
$('form#edd_checkout_cart_form .edd_cart_remove_item_btn').click(function (e){
var href=$(this).attr('href');
var key=href.substring(href.indexOf('=') + 1).charAt(0);
window.pysEddRemoveFromCartData=window.pysEddRemoveFromCartData||[];
if(window.pysEddRemoveFromCartData[key]){
var item=window.pysEddRemoveFromCartData[key];
Facebook.onEddRemoveFromCartEvent(item);
Analytics.onEddRemoveFromCartEvent(item);
Pinterest.onEddRemoveFromCartEvent(item);
Bing.onEddRemoveFromCartEvent(item);
}});
}}
if(options.commentEventEnabled){
$('form.comment-form').submit(function (){
Facebook.onCommentEvent();
Analytics.onCommentEvent();
Pinterest.onCommentEvent();
Bing.onCommentEvent();
});
}
if(options.downloadEventEnabled&&options.downloadExtensions.length > 0){
$('body').click(function (event){
var el=event.srcElement||event.target;
while (el&&(typeof el.tagName==='undefined'||el.tagName.toLowerCase()!=='a'||!el.href)){
el=el.parentNode;
}
if(el&&el.href){
var extension=Utils.getLinkExtension(el.href);
var track_download=false;
if(extension.length > 0){
for (i=0, len=options.downloadExtensions.length; i < len; ++i){
if(options.downloadExtensions[i]===extension){
track_download=true;
break;
}}
}
if(track_download){
var params={
download_url: el.href,
download_type: extension,
download_name: Utils.getLinkFilename(el.href)
};
Facebook.onDownloadEvent(params);
Analytics.onDownloadEvent(params);
Pinterest.onDownloadEvent(params);
Bing.onDownloadEvent(params);
}}
});
}
if(options.formEventEnabled){
$(document).onFirst('submit', 'form', function (){
var $form=$(this);
if($form.hasClass('comment-form')||$form.hasClass('search-form')||$form.attr('id')==='adminbarsearch'){
return;
}
if($form.hasClass('woocommerce-product-search')||$form.hasClass('cart')||$form.hasClass('woocommerce-cart-form')
|| $form.hasClass('woocommerce-shipping-calculator')||$form.hasClass('checkout')||$form.hasClass('checkout_coupon')){
return;
}
if($form.hasClass('edd_form')||$form.hasClass('edd_download_purchase_form')){
return;
}
var params={
form_id: $form.attr('id'),
form_class: $form.attr('class')
};
Facebook.onFormEvent(params);
Analytics.onFormEvent(params);
Pinterest.onFormEvent(params);
Bing.onFormEvent(params);
});
$(document).onFirst('nfFormSubmitResponse', function (e, data){
var params={
form_id: data.response.data.form_id,
form_title: data.response.data.settings.title
};
Facebook.onFormEvent(params);
Analytics.onFormEvent(params);
Pinterest.onFormEvent(params);
Bing.onFormEvent(params);
});
}
Utils.loadPixels();
});
}(jQuery, pysOptions);