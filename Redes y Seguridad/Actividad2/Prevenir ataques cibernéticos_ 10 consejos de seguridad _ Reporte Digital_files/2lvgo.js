!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(b,d){var e,f,g,h=b.nodeName.toLowerCase();return"area"===h?(e=b.parentNode,f=e.name,!(!b.href||!f||"map"!==e.nodeName.toLowerCase())&&(g=a("img[usemap='#"+f+"']")[0],!!g&&c(g))):(/^(input|select|textarea|button|object)$/.test(h)?!b.disabled:"a"===h?b.href||d:d)&&c(b)}function c(b){return a.expr.filters.visible(b)&&!a(b).parents().addBack().filter(function(){return"hidden"===a.css(this,"visibility")}).length}a.ui=a.ui||{},a.extend(a.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),a.fn.extend({scrollParent:function(b){var c=this.css("position"),d="absolute"===c,e=b?/(auto|scroll|hidden)/:/(auto|scroll)/,f=this.parents().filter(function(){var b=a(this);return(!d||"static"!==b.css("position"))&&e.test(b.css("overflow")+b.css("overflow-y")+b.css("overflow-x"))}).eq(0);return"fixed"!==c&&f.length?f:a(this[0].ownerDocument||document)},uniqueId:function(){var a=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&a(this).removeAttr("id")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(c){return b(c,!isNaN(a.attr(c,"tabindex")))},tabbable:function(c){var d=a.attr(c,"tabindex"),e=isNaN(d);return(e||d>=0)&&b(c,!e)}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(b,c){function d(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.css(b,"padding"+this))||0,d&&(c-=parseFloat(a.css(b,"border"+this+"Width"))||0),f&&(c-=parseFloat(a.css(b,"margin"+this))||0)}),c}var e="Width"===c?["Left","Right"]:["Top","Bottom"],f=c.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+c]=function(b){return void 0===b?g["inner"+c].call(this):this.each(function(){a(this).css(f,d(this,b)+"px")})},a.fn["outer"+c]=function(b,e){return"number"!=typeof b?g["outer"+c].call(this,b):this.each(function(){a(this).css(f,d(this,b,!0,e)+"px")})}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(a.fn.removeData=function(b){return function(c){return arguments.length?b.call(this,a.camelCase(c)):b.call(this)}}(a.fn.removeData)),a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),a.fn.extend({focus:function(b){return function(c,d){return"number"==typeof c?this.each(function(){var b=this;setTimeout(function(){a(b).focus(),d&&d.call(b)},c)}):b.apply(this,arguments)}}(a.fn.focus),disableSelection:function(){var a="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(a+".ui-disableSelection",function(a){a.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(b){if(void 0!==b)return this.css("zIndex",b);if(this.length)for(var c,d,e=a(this[0]);e.length&&e[0]!==document;){if(c=e.css("position"),("absolute"===c||"relative"===c||"fixed"===c)&&(d=parseInt(e.css("zIndex"),10),!isNaN(d)&&0!==d))return d;e=e.parent()}return 0}}),a.ui.plugin={add:function(b,c,d){var e,f=a.ui[b].prototype;for(e in d)f.plugins[e]=f.plugins[e]||[],f.plugins[e].push([c,d[e]])},call:function(a,b,c,d){var e,f=a.plugins[b];if(f&&(d||a.element[0].parentNode&&11!==a.element[0].parentNode.nodeType))for(e=0;e<f.length;e++)a.options[f[e][0]]&&f[e][1].apply(a.element,c)}}});
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){var b=0,c=Array.prototype.slice;return a.cleanData=function(b){return function(c){var d,e,f;for(f=0;null!=(e=c[f]);f++)try{d=a._data(e,"events"),d&&d.remove&&a(e).triggerHandler("remove")}catch(g){}b(c)}}(a.cleanData),a.widget=function(b,c,d){var e,f,g,h,i={},j=b.split(".")[0];return b=b.split(".")[1],e=j+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e.toLowerCase()]=function(b){return!!a.data(b,e)},a[j]=a[j]||{},f=a[j][b],g=a[j][b]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new g(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,d){return a.isFunction(d)?void(i[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},e=function(a){return c.prototype[b].apply(this,a)};return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=e,b=d.apply(this,arguments),this._super=c,this._superApply=f,b}}()):void(i[b]=d)}),g.prototype=a.widget.extend(h,{widgetEventPrefix:f?h.widgetEventPrefix||b:b},i,{constructor:g,namespace:j,widgetName:b,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g),g},a.widget.extend=function(b){for(var d,e,f=c.call(arguments,1),g=0,h=f.length;g<h;g++)for(d in f[g])e=f[g][d],f[g].hasOwnProperty(d)&&void 0!==e&&(a.isPlainObject(e)?b[d]=a.isPlainObject(b[d])?a.widget.extend({},b[d],e):a.widget.extend({},e):b[d]=e);return b},a.widget.bridge=function(b,d){var e=d.prototype.widgetFullName||b;a.fn[b]=function(f){var g="string"==typeof f,h=c.call(arguments,1),i=this;return g?this.each(function(){var c,d=a.data(this,e);return"instance"===f?(i=d,!1):d?a.isFunction(d[f])&&"_"!==f.charAt(0)?(c=d[f].apply(d,h),c!==d&&void 0!==c?(i=c&&c.jquery?i.pushStack(c.get()):c,!1):void 0):a.error("no such method '"+f+"' for "+b+" widget instance"):a.error("cannot call methods on "+b+" prior to initialization; attempted to call method '"+f+"'")}):(h.length&&(f=a.widget.extend.apply(null,[f].concat(h))),this.each(function(){var b=a.data(this,e);b?(b.option(f||{}),b._init&&b._init()):a.data(this,e,new d(f,this))})),i}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(c,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=b++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this.options=a.widget.extend({},this.options,this._getCreateOptions(),c),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(b,c){var d,e,f,g=b;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof b)if(g={},d=b.split("."),b=d.shift(),d.length){for(e=g[b]=a.widget.extend({},this.options[b]),f=0;f<d.length-1;f++)e[d[f]]=e[d[f]]||{},e=e[d[f]];if(b=d.pop(),1===arguments.length)return void 0===e[b]?null:e[b];e[b]=c}else{if(1===arguments.length)return void 0===this.options[b]?null:this.options[b];g[b]=c}return this._setOptions(g),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,"disabled"===a&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!b),b&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){if(b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled"))return("string"==typeof g?f[g]:g).apply(f,arguments)}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^([\w:-]*)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.delegate(k,j,h):c.bind(j,h)})},_off:function(b,c){c=(c||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,b.unbind(c).undelegate(c),this.bindings=a(this.bindings.not(b).get()),this.focusable=a(this.focusable.not(b).get()),this.hoverable=a(this.hoverable.not(b).get())},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}}),a.widget});
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],a):a(jQuery)}(function(a){return a.widget("ui.tabs",{version:"1.11.4",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var a=/#.*$/;return function(b){var c,d;b=b.cloneNode(!1),c=b.href.replace(a,""),d=location.href.replace(a,"");try{c=decodeURIComponent(c)}catch(e){}try{d=decodeURIComponent(d)}catch(e){}return b.hash.length>1&&c===d}}(),_create:function(){var b=this,c=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",c.collapsible),this._processTabs(),c.active=this._initialActive(),a.isArray(c.disabled)&&(c.disabled=a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"),function(a){return b.tabs.index(a)}))).sort()),this.options.active!==!1&&this.anchors.length?this.active=this._findActive(c.active):this.active=a(),this._refresh(),this.active.length&&this.load(c.active)},_initialActive:function(){var b=this.options.active,c=this.options.collapsible,d=location.hash.substring(1);return null===b&&(d&&this.tabs.each(function(c,e){if(a(e).attr("aria-controls")===d)return b=c,!1}),null===b&&(b=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),null!==b&&b!==-1||(b=!!this.tabs.length&&0)),b!==!1&&(b=this.tabs.index(this.tabs.eq(b)),b===-1&&(b=!c&&0)),!c&&b===!1&&this.anchors.length&&(b=0),b},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):a()}},_tabKeydown:function(b){var c=a(this.document[0].activeElement).closest("li"),d=this.tabs.index(c),e=!0;if(!this._handlePageNav(b)){switch(b.keyCode){case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:d++;break;case a.ui.keyCode.UP:case a.ui.keyCode.LEFT:e=!1,d--;break;case a.ui.keyCode.END:d=this.anchors.length-1;break;case a.ui.keyCode.HOME:d=0;break;case a.ui.keyCode.SPACE:return b.preventDefault(),clearTimeout(this.activating),void this._activate(d);case a.ui.keyCode.ENTER:return b.preventDefault(),clearTimeout(this.activating),void this._activate(d!==this.options.active&&d);default:return}b.preventDefault(),clearTimeout(this.activating),d=this._focusNextTab(d,e),b.ctrlKey||b.metaKey||(c.attr("aria-selected","false"),this.tabs.eq(d).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",d)},this.delay))}},_panelKeydown:function(b){this._handlePageNav(b)||b.ctrlKey&&b.keyCode===a.ui.keyCode.UP&&(b.preventDefault(),this.active.focus())},_handlePageNav:function(b){return b.altKey&&b.keyCode===a.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):b.altKey&&b.keyCode===a.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(b,c){function d(){return b>e&&(b=0),b<0&&(b=e),b}for(var e=this.tabs.length-1;a.inArray(d(),this.options.disabled)!==-1;)b=c?b+1:b-1;return b},_focusNextTab:function(a,b){return a=this._findNextTab(a,b),this.tabs.eq(a).focus(),a},_setOption:function(a,b){return"active"===a?void this._activate(b):"disabled"===a?void this._setupDisabled(b):(this._super(a,b),"collapsible"===a&&(this.element.toggleClass("ui-tabs-collapsible",b),b||this.options.active!==!1||this._activate(0)),"event"===a&&this._setupEvents(b),void("heightStyle"===a&&this._setupHeightStyle(b)))},_sanitizeSelector:function(a){return a?a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var b=this.options,c=this.tablist.children(":has(a[href])");b.disabled=a.map(c.filter(".ui-state-disabled"),function(a){return c.index(a)}),this._processTabs(),b.active!==!1&&this.anchors.length?this.active.length&&!a.contains(this.tablist[0],this.active[0])?this.tabs.length===b.disabled.length?(b.active=!1,this.active=a()):this._activate(this._findNextTab(Math.max(0,b.active-1),!1)):b.active=this.tabs.index(this.active):(b.active=!1,this.active=a()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var b=this,c=this.tabs,d=this.anchors,e=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(b){a(this).is(".ui-state-disabled")&&b.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){a(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return a("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=a(),this.anchors.each(function(c,d){var e,f,g,h=a(d).uniqueId().attr("id"),i=a(d).closest("li"),j=i.attr("aria-controls");b._isLocal(d)?(e=d.hash,g=e.substring(1),f=b.element.find(b._sanitizeSelector(e))):(g=i.attr("aria-controls")||a({}).uniqueId()[0].id,e="#"+g,f=b.element.find(e),f.length||(f=b._createPanel(g),f.insertAfter(b.panels[c-1]||b.tablist)),f.attr("aria-live","polite")),f.length&&(b.panels=b.panels.add(f)),j&&i.data("ui-tabs-aria-controls",j),i.attr({"aria-controls":g,"aria-labelledby":h}),f.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),c&&(this._off(c.not(this.tabs)),this._off(d.not(this.anchors)),this._off(e.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(b){return a("<div>").attr("id",b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(b){a.isArray(b)&&(b.length?b.length===this.anchors.length&&(b=!0):b=!1);for(var c,d=0;c=this.tabs[d];d++)b===!0||a.inArray(d,b)!==-1?a(c).addClass("ui-state-disabled").attr("aria-disabled","true"):a(c).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=b},_setupEvents:function(b){var c={};b&&a.each(b.split(" "),function(a,b){c[b]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(a){a.preventDefault()}}),this._on(this.anchors,c),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(b){var c,d=this.element.parent();"fill"===b?(c=d.height(),c-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var b=a(this),d=b.css("position");"absolute"!==d&&"fixed"!==d&&(c-=b.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){c-=a(this).outerHeight(!0)}),this.panels.each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")):"auto"===b&&(c=0,this.panels.each(function(){c=Math.max(c,a(this).height("").height())}).height(c))},_eventHandler:function(b){var c=this.options,d=this.active,e=a(b.currentTarget),f=e.closest("li"),g=f[0]===d[0],h=g&&c.collapsible,i=h?a():this._getPanelForTab(f),j=d.length?this._getPanelForTab(d):a(),k={oldTab:d,oldPanel:j,newTab:h?a():f,newPanel:i};b.preventDefault(),f.hasClass("ui-state-disabled")||f.hasClass("ui-tabs-loading")||this.running||g&&!c.collapsible||this._trigger("beforeActivate",b,k)===!1||(c.active=!h&&this.tabs.index(f),this.active=g?a():f,this.xhr&&this.xhr.abort(),j.length||i.length||a.error("jQuery UI Tabs: Mismatching fragment identifier."),i.length&&this.load(this.tabs.index(f),b),this._toggle(b,k))},_toggle:function(b,c){function d(){f.running=!1,f._trigger("activate",b,c)}function e(){c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),g.length&&f.options.show?f._show(g,f.options.show,d):(g.show(),d())}var f=this,g=c.newPanel,h=c.oldPanel;this.running=!0,h.length&&this.options.hide?this._hide(h,this.options.hide,function(){c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),e()}):(c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),h.hide(),e()),h.attr("aria-hidden","true"),c.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),g.length&&h.length?c.oldTab.attr("tabIndex",-1):g.length&&this.tabs.filter(function(){return 0===a(this).attr("tabIndex")}).attr("tabIndex",-1),g.attr("aria-hidden","false"),c.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(b){var c,d=this._findActive(b);d[0]!==this.active[0]&&(d.length||(d=this.active),c=d.find(".ui-tabs-anchor")[0],this._eventHandler({target:c,currentTarget:c,preventDefault:a.noop}))},_findActive:function(b){return b===!1?a():this.tabs.eq(b)},_getIndex:function(a){return"string"==typeof a&&(a=this.anchors.index(this.anchors.filter("[href$='"+a+"']"))),a},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){a.data(this,"ui-tabs-destroy")?a(this).remove():a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var b=a(this),c=b.data("ui-tabs-aria-controls");c?b.attr("aria-controls",c).removeData("ui-tabs-aria-controls"):b.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(b){var c=this.options.disabled;c!==!1&&(void 0===b?c=!1:(b=this._getIndex(b),c=a.isArray(c)?a.map(c,function(a){return a!==b?a:null}):a.map(this.tabs,function(a,c){return c!==b?c:null})),this._setupDisabled(c))},disable:function(b){var c=this.options.disabled;if(c!==!0){if(void 0===b)c=!0;else{if(b=this._getIndex(b),a.inArray(b,c)!==-1)return;c=a.isArray(c)?a.merge([b],c).sort():[b]}this._setupDisabled(c)}},load:function(b,c){b=this._getIndex(b);var d=this,e=this.tabs.eq(b),f=e.find(".ui-tabs-anchor"),g=this._getPanelForTab(e),h={tab:e,panel:g},i=function(a,b){"abort"===b&&d.panels.stop(!1,!0),e.removeClass("ui-tabs-loading"),g.removeAttr("aria-busy"),a===d.xhr&&delete d.xhr};this._isLocal(f[0])||(this.xhr=a.ajax(this._ajaxSettings(f,c,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(e.addClass("ui-tabs-loading"),g.attr("aria-busy","true"),this.xhr.done(function(a,b,e){setTimeout(function(){g.html(a),d._trigger("load",c,h),i(e,b)},1)}).fail(function(a,b){setTimeout(function(){i(a,b)},1)})))},_ajaxSettings:function(b,c,d){var e=this;return{url:b.attr("href"),beforeSend:function(b,f){return e._trigger("beforeLoad",c,a.extend({jqXHR:b,ajaxSettings:f},d))}}},_getPanelForTab:function(b){var c=a(b).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+c))}})});
document.documentElement.className +=' js_active ';
document.documentElement.className +='ontouchstart' in document.documentElement ? ' vc_mobile ':' vc_desktop ';
(function(){
var prefix=['-webkit-','-o-','-moz-','-ms-',""];
for (var i in prefix){ if(prefix[i]+'transform' in document.documentElement.style) document.documentElement.className +=" vc_transform "; }})();
jQuery(window).load(function(){
jQuery('.wpb_flexslider').each(function(){
var this_element=jQuery(this);
var sliderSpeed=800,
sliderTimeout=parseInt(this_element.attr('data-interval'))*1000,
sliderFx=this_element.attr('data-flex_fx'),
slideshow=true;
if(sliderTimeout==0) slideshow=false;
this_element.flexslider({
animation: sliderFx,
slideshow: slideshow,
slideshowSpeed: sliderTimeout,
sliderSpeed: sliderSpeed,
smoothHeight: true
});
});
});
jQuery(document).ready(function($){
vc_twitterBehaviour();
vc_toggleBehaviour();
vc_tabsBehaviour();
vc_accordionBehaviour();
vc_teaserGrid();
vc_carouselBehaviour();
vc_slidersBehaviour();
vc_prettyPhoto();
vc_googleplus();
vc_pinterest();
vc_progress_bar();
vc_waypoints();
});
if(typeof window['vc_twitterBehaviour']!=='function'){
function vc_twitterBehaviour(){
jQuery('.wpb_twitter_widget .tweets').each(function(index){
var this_element=jQuery(this),
tw_name=this_element.attr('data-tw_name');
tw_count=this_element.attr('data-tw_count');
this_element.tweet({
username: tw_name,
join_text: "auto",
avatar_size: 0,
count: tw_count,
template: "{avatar}{join}{text}{time}",
auto_join_text_default: "",
auto_join_text_ed: "",
auto_join_text_ing: "",
auto_join_text_reply: "",
auto_join_text_url: "",
loading_text: '<span class="loading_tweets">loading tweets...</span>'
});
});
}}
if(typeof window['vc_googleplus']!=='function'){
function vc_googleplus(){
if(jQuery('.wpb_googleplus').length > 0){
(function(){
var po=document.createElement('script'); po.type='text/javascript'; po.async=true;
po.src='https://apis.google.com/js/plusone.js';
var s=document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();
}}
}
if(typeof window['vc_pinterest']!=='function'){
function vc_pinterest(){
if(jQuery('.wpb_pinterest').length > 0){
(function(){
var po=document.createElement('script'); po.type='text/javascript'; po.async=true;
po.src='http://assets.pinterest.com/js/pinit.js';
var s=document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();
}}
}
if(typeof window['vc_progress_bar']!=='function'){
function vc_progress_bar(){
if(typeof jQuery.fn.waypoint!=='undefined'){
jQuery('.vc_progress_bar').waypoint(function(){
jQuery(this).find('.vc_single_bar').each(function(index){
var $this=jQuery(this),
bar=$this.find('.vc_bar'),
val=bar.attr('data-value');
setTimeout(function(){ bar.css({"width":val+'%'});}, index*200);
});
}, { offset: '85%' });
}}
}
if(typeof window['vc_waypoints']!=='function'){
function vc_waypoints(){
if(typeof jQuery.fn.waypoint!=='undefined'){
jQuery('.wpb_animate_when_almost_visible').waypoint(function(){
jQuery(this).addClass('wpb_start_animation');
}, { offset: '85%' });
}}
}
if(typeof window['vc_toggleBehaviour']!=='function'){
function vc_toggleBehaviour(){
jQuery(".wpb_toggle").click(function(e){
if(jQuery(this).hasClass('wpb_toggle_title_active')){
jQuery(this).removeClass('wpb_toggle_title_active').next().slideUp(500);
}else{
jQuery(this).addClass('wpb_toggle_title_active').next().slideDown(500);
}});
jQuery('.wpb_toggle_content').each(function(index){
if(jQuery(this).next().is('h4.wpb_toggle')==false){
jQuery('<div class="last_toggle_el_margin"></div>').insertAfter(this);
}});
}}
if(typeof window['vc_tabsBehaviour']!=='function'){
function vc_tabsBehaviour(){
jQuery(function($){$(document.body).off('click.preview', 'a')});
jQuery('.wpb_tabs, .wpb_tour').each(function(index){
var $tabs,
interval=jQuery(this).attr("data-interval"),
tabs_array=[];
$tabs=jQuery(this).find('.wpb_tour_tabs_wrapper').tabs({show: function(event, ui){wpb_prepare_tab_content(event, ui);}}).tabs('rotate', interval*1000);
jQuery(this).find('.wpb_tab').each(function(){ tabs_array.push(this.id); });
jQuery(this).find('.wpb_tab a[href^="#"]').click(function(e){
e.preventDefault();
if(jQuery.inArray(jQuery(this).attr('href'), tabs_array)){
$tabs.tabs("select", jQuery(this).attr('href'));
return false;
}});
jQuery(this).find('.wpb_prev_slide a, .wpb_next_slide a').click(function(e){
e.preventDefault();
var index=$tabs.tabs('option', 'selected');
if(jQuery(this).parent().hasClass('wpb_next_slide')){ 		index++; }else{	 	index--; }
if(index < 0){ 									index=$tabs.tabs("length") - 1; }
else if(index >=$tabs.tabs("length")){			index=0; }
$tabs.tabs("select", index);
});
});
}}
if(typeof window['vc_accordionBehaviour']!=='function'){
function vc_accordionBehaviour(){
jQuery('.wpb_accordion').each(function(index){
var $tabs,
interval=jQuery(this).attr("data-interval"),
active_tab = !isNaN(jQuery(this).data('active-tab'))&&parseInt(jQuery(this).data('active-tab')) >  0 ? parseInt(jQuery(this).data('active-tab'))-1:false,
collapsible=active_tab===false||jQuery(this).data('collapsible')==='yes';
$tabs=jQuery(this).find('.wpb_accordion_wrapper').accordion({
header: "> div > h3",
autoHeight: false,
active: active_tab,
collapsible: collapsible,
navigation: true,
change: function(event, ui){
if(jQuery.fn.isotope!=undefined){
ui.newContent.find('.isotope').isotope("reLayout");
}
vc_carouselBehaviour();
}});
});
}}
if(typeof window['vc_teaserGrid']!=='function'){
function vc_teaserGrid(){
var layout_modes={
fitrows: 'fitRows',
masonry: 'masonry'
}
jQuery('.wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)').each(function(){
var $container=jQuery(this);
var $thumbs=$container.find('.wpb_thumbnails');
var layout_mode=$thumbs.attr('data-layout-mode');
$thumbs.isotope({
itemSelector:'.isotope-item',
layoutMode:(layout_modes[layout_mode]==undefined ? 'fitRows':layout_modes[layout_mode])
});
$container.find('.categories_filter a').data('isotope', $thumbs).click(function(e){
e.preventDefault();
var $thumbs=jQuery(this).data('isotope');
jQuery(this).parent().parent().find('.active').removeClass('active');
jQuery(this).parent().addClass('active');
$thumbs.isotope({filter: jQuery(this).attr('data-filter')});
});
jQuery(window).load(function(){
$thumbs.isotope("reLayout");
});
});
/*
var isotope=jQuery('.wpb_grid ul.thumbnails');
if(isotope.length > 0){
isotope.isotope({
itemSelector:'.isotope-item',
layoutMode:'fitRows'
});
jQuery(window).load(function(){
isotope.isotope("reLayout");
});
}
*/
}}
if(typeof window['vc_carouselBehaviour']!=='function'){
function vc_carouselBehaviour(){
jQuery(".wpb_carousel").each(function(){
var $this=jQuery(this);
if($this.data('carousel_enabled')!==true&&$this.is(':visible')){
$this.data('carousel_enabled', true);
var carousel_width=jQuery(this).width(),
visible_count=getColumnsCount(jQuery(this)),
carousel_speed=500;
if(jQuery(this).hasClass('columns_count_1')){
carousel_speed=900;
}
var carousele_li=jQuery(this).find('.wpb_thumbnails-fluid li');
carousele_li.css({"margin-right": carousele_li.css("margin-left"), "margin-left":0 });
jQuery(this).find('.wpb_wrapper:eq(0)').jCarouselLite({
btnNext: jQuery(this).find('.next'),
btnPrev: jQuery(this).find('.prev'),
visible: visible_count,
speed: carousel_speed
})
.width('100%');
var fluid_ul=jQuery(this).find('ul.wpb_thumbnails-fluid');
fluid_ul.width(fluid_ul.width()+300);
jQuery(window).resize(function(){
var before_resize=screen_size;
screen_size=getSizeName();
if(before_resize!=screen_size){
window.setTimeout('location.reload()', 20);
}});
}});
}}
if(typeof window['vc_slidersBehaviour']!=='function'){
function vc_slidersBehaviour(){
jQuery('.wpb_gallery_slides').each(function(index){
var this_element=jQuery(this);
var ss_count=0;
if(this_element.hasClass('wpb_slider_nivo')){
var sliderSpeed=800,
sliderTimeout=this_element.attr('data-interval')*1000;
if(sliderTimeout==0) sliderTimeout=9999999999;
this_element.find('.nivoSlider').nivoSlider({
effect: 'boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse',
slices: 15,
boxCols: 8,
boxRows: 4,
animSpeed: sliderSpeed,
pauseTime: sliderTimeout,
startSlide: 0,
directionNav: true,
directionNavHide: true,
controlNav: true,
keyboardNav: false,
pauseOnHover: true,
manualAdvance: false,
prevText: 'Prev',
nextText: 'Next'
});
}
else if(this_element.hasClass('wpb_flexslider')&&1==2){ 
/*
var $first_object=this_element.find('li:first').show().find('*:not(a)');
$first_object.bind('load', function(){
if(!this_element.find('.flex-control-nav').is('ol')){
this_element.flexslider({
animation: sliderFx,
slideshow: slideshow,
slideshowSpeed: sliderTimeout,
sliderSpeed: sliderSpeed,
smoothHeight: true
});
}});
window.setTimeout(function(){
if(!this_element.find('.flex-control-nav').is('ol')){
this_element.flexslider({
animation: sliderFx,
slideshow: slideshow,
slideshowSpeed: sliderTimeout,
sliderSpeed: sliderSpeed,
smoothHeight: true
});
}}, 5000);
*/
}
else if(this_element.hasClass('wpb_image_grid')){
var isotope=this_element.find('.wpb_image_grid_ul');
isotope.isotope({
itemSelector:'.isotope-item',
layoutMode:'fitRows'
});
jQuery(window).load(function(){
isotope.isotope("reLayout");
});
}});
}}
if(typeof window['vc_prettyPhoto']!=='function'){
function vc_prettyPhoto(){
try {
jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({
animationSpeed: 'normal', 
padding: 15, 
opacity: 0.7, 
showTitle: true, 
allowresize: true, 
counter_separator_label: '/', 
hideflash: false, 
modal: false, 
callback: function(){
var url=location.href;
var hashtag=(url.indexOf('#!prettyPhoto')) ? true:false;
if(hashtag) location.hash="!";
} ,
social_tools:''
});
} catch (err){ }}
}
function getColumnsCount(el){
var find=false,
i=1;
while(find==false){
if(el.hasClass('columns_count_'+i)){
find=true;
return i;
}
i++;
}}
var screen_size=getSizeName();
function getSizeName(){
var screen_size='',
screen_w=jQuery(window).width();
if(screen_w > 1170){
screen_size="desktop_wide";
}
else if(screen_w > 960&&screen_w < 1169){
screen_size="desktop";
}
else if(screen_w > 768&&screen_w < 959){
screen_size="tablet";
}
else if(screen_w > 300&&screen_w < 767){
screen_size="mobile";
}
else if(screen_w < 300){
screen_size="mobile_portrait";
}
return screen_size;
}
function loadScript(url, $obj, callback){
var script=document.createElement("script")
script.type="text/javascript";
if(script.readyState){
script.onreadystatechange=function(){
if(script.readyState=="loaded" ||
script.readyState=="complete"){
script.onreadystatechange=null;
callback();
}};}else{
/*
script.onload=function(){
callback();
};
*/
}
script.src=url;
$obj.get(0).appendChild(script);
}
function wpb_prepare_tab_content(event, ui){
vc_carouselBehaviour();
var $ui_panel=jQuery(ui.panel).find('.isotope'),
$google_maps=jQuery(ui.panel).find('.wpb_gmaps_widget');
if($ui_panel.length > 0){
$ui_panel.isotope("reLayout");
}
if($google_maps.length&&!$google_maps.is('.map_ready')){
var $frame=$google_maps.find('iframe');
$frame.attr('src', $frame.attr('src'));
$google_maps.addClass('map_ready');
}};
window.addComment=function(a){function b(){c(),g()}function c(a){if(t&&(m=j(r.cancelReplyId),n=j(r.commentFormId),m)){m.addEventListener("touchstart",e),m.addEventListener("click",e);for(var b,c=d(a),g=0,h=c.length;g<h;g++)b=c[g],b.addEventListener("touchstart",f),b.addEventListener("click",f)}}function d(a){var b,c=r.commentReplyClass;return a&&a.childNodes||(a=q),b=q.getElementsByClassName?a.getElementsByClassName(c):a.querySelectorAll("."+c)}function e(a){var b=this,c=r.temporaryFormId,d=j(c);d&&o&&(j(r.parentIdFieldId).value="0",d.parentNode.replaceChild(o,d),b.style.display="none",a.preventDefault())}function f(b){var c,d=this,e=i(d,"belowelement"),f=i(d,"commentid"),g=i(d,"respondelement"),h=i(d,"postid");e&&f&&g&&h&&(c=a.addComment.moveForm(e,f,g,h),!1===c&&b.preventDefault())}function g(){if(s){var a={childList:!0,subTree:!0};p=new s(h),p.observe(q.body,a)}}function h(a){for(var b=a.length;b--;)if(a[b].addedNodes.length)return void c()}function i(a,b){return u?a.dataset[b]:a.getAttribute("data-"+b)}function j(a){return q.getElementById(a)}function k(b,c,d,e){var f=j(b);o=j(d);var g,h,i,k=j(r.parentIdFieldId),p=j(r.postIdFieldId);if(f&&o&&k){l(o),e&&p&&(p.value=e),k.value=c,m.style.display="",f.parentNode.insertBefore(o,f.nextSibling),m.onclick=function(){return!1};try{for(var s=0;s<n.elements.length;s++)if(g=n.elements[s],h=!1,"getComputedStyle"in a?i=a.getComputedStyle(g):q.documentElement.currentStyle&&(i=g.currentStyle),(g.offsetWidth<=0&&g.offsetHeight<=0||"hidden"===i.visibility)&&(h=!0),"hidden"!==g.type&&!g.disabled&&!h){g.focus();break}}catch(t){}return!1}}function l(a){var b=r.temporaryFormId,c=j(b);c||(c=q.createElement("div"),c.id=b,c.style.display="none",a.parentNode.insertBefore(c,a))}var m,n,o,p,q=a.document,r={commentReplyClass:"comment-reply-link",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},s=a.MutationObserver||a.WebKitMutationObserver||a.MozMutationObserver,t="querySelector"in q&&"addEventListener"in a,u=!!q.documentElement.dataset;return t&&"loading"!==q.readyState?b():t&&a.addEventListener("DOMContentLoaded",b,!1),{init:c,moveForm:k}}(window);
function theChampPopup(e){window.open(e,"_blank","height=520,width=770,left=315,top=80,resizable,scrollbars,toolbar=0,personalbar=0,menubar=no,location=no,directories=no,status")}function theChampStrReplace(e,t,n){for(var r=0;r<e.length;r++){n=n.replace(new RegExp(e[r],"g"),t[r])}return n}function theChampCallAjax(e){if(typeof jQuery!="undefined"){e()}else{theChampGetScript("https://code.jquery.com/jquery-latest.min.js",e)}}function theChampGetScript(e,t){var n=document.createElement("script");n.src=e;var r=document.getElementsByTagName("head")[0],i=false;n.onload=n.onreadystatechange=function(){if(!i&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){i=true;t();n.onload=n.onreadystatechange=null;r.removeChild(n)}};r.appendChild(n)}function theChampGetElementsByClass(e,t){if(e.getElementsByClassName){return e.getElementsByClassName(t)}else{return function(e,t){if(t==null){t=document}var n=[],r=t.getElementsByTagName("*"),i=r.length,s=new RegExp("(^|\\s)"+e+"(\\s|$)"),o,u;for(o=0,u=0;o<i;o++){if(s.test(r[o].className)){n[u]=r[o];u++}}return n}(t,e)}}if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}
function heateorSsLJLoginPopup(){var a=document.createElement("div");a.innerHTML='<button id="heateor_ss_lj_popup_close" class="close-button separated"><img src="'+theChampCloseIconPath+'" /></button><div id="the_champ_sharing_more_content"><div class="all-services" style="padding:20px 10px 0px 10px;height:auto;"><fieldset id="ss_openid"><legend>LiveJournal Login</legend><form action="'+theChampLJAuthUrl+'" method="post" onsubmit="this.login.disabled=true;"><input type="hidden" name="openid_action" value="SuperSocializerLogin"><div style="clear:both">'+theChampLJLoginUsernameString+'</div><div style="clear:both"><input type="text" name="openid_url" required class="openid_login"><input type="submit" name="login" value="Login"></div></form></fieldset></div></div></div>',a.setAttribute("id","the_champ_sharing_more_providers"),a.setAttribute("style","height:auto;");var b=document.createElement("div");b.setAttribute("id","heateor_ss_lj_popup_bg"),jQuery("body").append(a).append(b),document.getElementById("heateor_ss_lj_popup_bg").onclick=document.getElementById("heateor_ss_lj_popup_close").onclick=function(){a.parentNode.removeChild(a),b.parentNode.removeChild(b)}}function theChampGetCookie(e){for(var t=e+"=",a=document.cookie.split(";"),h=0;h<a.length;h++){for(var i=a[h];" "==i.charAt(0);)i=i.substring(1,i.length);if(0==i.indexOf(t))return i.substring(t.length,i.length)}return null};
function theChampInitiateFB(){FB.init({appId:theChampFBKey,channelUrl:"//"+theChampSiteUrl+"/channel.html",status:!0,cookie:!0,xfbml:!0,version:"v3.2"})}window.fbAsyncInit=function(){theChampInitiateFB(),theChampFbIosLogin&&theChampAuthUserFB(),"function"==typeof theChampDisplayLoginIcon&&theChampDisplayLoginIcon(document,["theChampFacebookButton","theChampFacebookLogin"]),("undefined"!=typeof theChampCommentNotification&&1==theChampCommentNotification||"undefined"!=typeof theChampHeateorFcmRecentComments&&1==theChampHeateorFcmRecentComments)&&FB.Event.subscribe("comment.create",function(e){void 0!==e.commentID&&e.commentID&&("undefined"!=typeof theChampCommentNotification&&1==theChampCommentNotification&&jQuery.ajax({type:"POST",dataType:"json",url:theChampSiteUrl+"/index.php",data:{action:"the_champ_moderate_fb_comments",data:e},success:function(e,t,n){}}),"undefined"!=typeof theChampHeateorFcmRecentComments&&1==theChampHeateorFcmRecentComments&&jQuery.ajax({type:"POST",dataType:"json",url:theChampSiteUrl+"/index.php",data:{action:"heateor_fcm_save_fb_comment",data:e},success:function(e,t,n){}}))}),"undefined"!=typeof theChampFbLikeMycred&&theChampFbLikeMycred&&(FB.Event.subscribe("edge.create",function(e){heateorSsmiMycredPoints("Facebook_like_recommend","",e||"")}),FB.Event.subscribe("edge.remove",function(e){heateorSsmiMycredPoints("Facebook_like_recommend","",e||"","Minus point(s) for undoing Facebook like-recommend")})),"undefined"!=typeof theChampSsga&&theChampSsga&&(FB.Event.subscribe("edge.create",function(e){heateorSsgaSocialPluginsTracking("Facebook","Like",e||"")}),FB.Event.subscribe("edge.remove",function(e){heateorSsgaSocialPluginsTracking("Facebook","Unlike",e||"")}))},function(e){var t,n="facebook-jssdk",o=e.getElementsByTagName("script")[0];e.getElementById(n)||((t=e.createElement("script")).id=n,t.async=!0,t.src="//connect.facebook.net/"+theChampFBLang+"/sdk.js",o.parentNode.insertBefore(t,o))}(document);
function theChampRenderFBCommenting(){var e=typeof theChampCommentingId!='undefined'?document.getElementById(theChampCommentingId):'';if(e){var t=[],n=[],a=[];t.wordpress='<div style="clear:both"></div>'+e.innerHTML,theChampFBCommentingContent=("undefined"!=typeof theChampFacebookCommentsNotifierOptinText?'<div class="heateor_ss_fb_comments_notifier_optin_container"><label><input type="checkbox" class="heateor_ss_fb_comments_notifier_optin" value="1" />'+theChampFacebookCommentsNotifierOptinText+"</label></div>":"")+("undefined"!=typeof theChampFacebookCommentsOptinText?'<div class="heateor_ss_fb_comments_optin_container"><label><input type="checkbox" class="heateor_ss_fb_comments_optin" value="1" />'+theChampFacebookCommentsOptinText+"</label></div>":"")+'<div class="fb-comments" data-href="'+theChampFBCommentUrl+'"',""!=theChampFBCommentColor&&(theChampFBCommentingContent+=' data-colorscheme="'+theChampFBCommentColor+'"'),""!=theChampFBCommentNumPosts&&(theChampFBCommentingContent+=' data-numposts="'+theChampFBCommentNumPosts+'"'),theChampFBCommentingContent+=' data-width="'+theChampFBCommentWidth+'"',""!=theChampFBCommentOrderby&&(theChampFBCommentingContent+=' data-order-by="'+theChampFBCommentOrderby+'"'),theChampFBCommentingContent+=" ></div>",t.fb=theChampFBCommentingContent,n.fb="theChampInitiateFB();",t.googleplus="<div class='g-comments' data-href='"+theChampGpCommentsUrl+"' "+(theChampGpCommentsWidth?"data-width='"+theChampGpCommentsWidth+"'":"")+" data-first_party_property='BLOGGER' data-view_type='FILTERED_POSTMOD' ></div>",n.googleplus=" ",a.googleplus="//apis.google.com/js/plusone.js",t.disqus='<div class="embed-container clearfix" id="disqus_thread">'+(""!=theChampDisqusShortname?theChampDisqusShortname:'<div style="font-size: 14px;clear: both;">Specify a Disqus shortname in Super Socializer &gt; Social Commenting section in admin panel</div>')+"</div>",n.disqus="var disqus_shortname='"+theChampDisqusShortname+"';(function(d){var dsq=d.createElement('script'); dsq.type='text/javascript'; dsq.async=true;dsq.src='//' + disqus_shortname + '.disqus.com/embed.js'; (d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(dsq); })(document);";var o='<div class="theChampCommentingTabs"><h3 id="theChampReplyTitle" style="margin-bottom:15px" class="comment-reply-title">'+theChampScLabel+"</h3><ul>";theChampScEnabledTabs=theChampScEnabledTabs.split(",");for(var i=0;i<theChampScEnabledTabs.length;i++){o+='<li id="theChampTabs-'+i+'-li" onclick="',o+="this.setAttribute('class', 'theChampSelectedTab');document.getElementById('theChampTabs-"+i+"').style.display='block';","fb"==theChampScEnabledTabs[i]&&(o+="theChampInitiateFB();");for(var m=0;m<theChampScEnabledTabs.length;m++)m!=i&&(o+="document.getElementById('theChampTabs-"+m+"-li').setAttribute('class', '');document.getElementById('theChampTabs-"+m+"').style.display='none';");o+='">',o+=theChampScTabLabels[theChampScEnabledTabs[i]],o+="</li>"}for(o+="</ul>",i=0;i<theChampScEnabledTabs.length;i++)o+='<div id="theChampTabs-'+i+'" ><div style="clear: both"></div>'+t[theChampScEnabledTabs[i]]+"</div>";o+="</div>",e.innerHTML=o;var h=document.getElementById("reply-title");for(h&&h.remove(),i=0;i<theChampScEnabledTabs.length;i++)if(n[theChampScEnabledTabs[i]]){var s=document.createElement("script");a[theChampScEnabledTabs[i]]&&s.setAttribute("src",a[theChampScEnabledTabs[i]]),s.innerHTML=n[theChampScEnabledTabs[i]],document.getElementById("theChampTabs-"+i).appendChild(s)}for(document.getElementById("theChampTabs-0-li").setAttribute("class","theChampSelectedTab"),i=1;i<theChampScEnabledTabs.length;i++)document.getElementById("theChampTabs-"+i).style.display="none";null!=theChampGetCookie("heateorSsSLOptin")&&jQuery("input.heateor_ss_social_login_optin").length>0&&jQuery("input.heateor_ss_social_login_optin").prop("checked",!0),jQuery("input.heateor_ss_social_login_optin").click(function(){if(jQuery(this).is(":checked")){if(null==theChampGetCookie("heateorSsSLOptin")){var e=new Date;e.setTime(e.getTime()+31536e6),document.cookie="heateorSsSLOptin=1; expires="+e.toUTCString()+"; path=/"}}else document.cookie="heateorSsSLOptin=; expires=Fri, 02 Jan 1970 00:00:00 UTC; path=/"}),"undefined"!=typeof theChampFacebookCommentsOptinText&&(null!=heateorFcmGetCookie("heateorFcmOptin")&&jQuery("input.heateor_ss_fb_comments_optin").prop("checked",!0),jQuery("input.heateor_ss_fb_comments_optin").click(function(){if(jQuery(this).is(":checked")){if(heateorFcmOptin=1,null==heateorFcmGetCookie("heateorFcmOptin")){var e=new Date;e.setTime(e.getTime()+31536e6),document.cookie="heateorFcmOptin=1; expires="+e.toUTCString()+"; path=/"}}else heateorFcmOptin=0,document.cookie="heateorFcmOptin=; expires=Fri, 02 Jan 1970 00:00:00 UTC; path=/"})),"undefined"!=typeof theChampFacebookCommentsNotifierOptinText&&(null!=heateorFcnGetCookie("heateorFcnOptin")&&jQuery("input.heateor_ss_fb_comments_notifier_optin").prop("checked",!0),jQuery("input.heateor_ss_fb_comments_notifier_optin").click(function(){if(jQuery(this).is(":checked")){if(heateorFcnOptin=1,null==heateorFcnGetCookie("heateorFcnOptin")){var e=new Date;e.setTime(e.getTime()+31536e6),document.cookie="heateorFcnOptin=1; expires="+e.toUTCString()+"; path=/"}}else heateorFcnOptin=0,document.cookie="heateorFcnOptin=; expires=Fri, 02 Jan 1970 00:00:00 UTC; path=/"}))}}theChampLoadEvent(function(){theChampRenderFBCommenting()});
function heateorSsDetermineWhatsappShareAPI(a){if(a)return-1!=navigator.userAgent.indexOf("Mobi")?"api.whatsapp.com":"web.whatsapp.com";var p=jQuery("i.theChampWhatsappBackground a").attr("href");return void 0!==p?-1!=navigator.userAgent.indexOf("Mobi")?(jQuery("i.theChampWhatsappBackground a").attr("href",p.replace("web.whatsapp.com","api.whatsapp.com")),"api.whatsapp.com"):(jQuery("i.theChampWhatsappBackground a").attr("href",p.replace("api.whatsapp.com","web.whatsapp.com")),"web.whatsapp.com"):""}
function theChampMoreSharingPopup(elem, postUrl, postTitle, twitterTitle){
var shareContainer=elem.parentElement.parentElement.parentElement;
postUrl=encodeURIComponent(postUrl);
concate='</ul></div><div class="footer-panel"><p></p></div></div>';
var theChampMoreSharingServices={
facebook: {
title: "Facebook",
locale: "en-US",
redirect_url: "http://www.facebook.com/sharer.php?u=" + postUrl + "&t=" + postTitle + "&v=3",
},
twitter: {
title: "Twitter",
locale: "en-US",
redirect_url: "http://twitter.com/intent/tweet?text=" + (twitterTitle ? twitterTitle:postTitle) + " " + postUrl,
},
linkedin: {
title: "Linkedin",
locale: "en-US",
redirect_url: "http://www.linkedin.com/shareArticle?mini=true&url=" + postUrl + "&title=" + postTitle,
},
pinterest: {
title: "Pinterest",
locale: "en-US",
redirect_url: "https://pinterest.com/pin/create/button/?url=" + postUrl + "&media=${media_link}&description=" + postTitle,
bookmarklet_url: "javascript:void((function(){var e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)})());"
},
CopyLink: {
title: "Copy Link",
locale: "en-US",
redirect_url: "",
bookmarklet_url: ""
},
Diaspora: {
title: "Diaspora",
locale: "en-US",
redirect_url: "https://joindiaspora.com/bookmarklet?url=" + postUrl + "&title=" + postTitle + "&v=1"
},
Douban: {
title: "Douban",
locale: "en-US",
redirect_url: "https://www.douban.com/share/service?name="+postTitle+"&href="+postUrl+"&image=&updated=&bm=&url="+postUrl+"&title="+postTitle+"&sel="
},
Draugiem: {
title: "Draugiem",
locale: "en-US",
redirect_url: "https://www.draugiem.lv/say/ext/add.php?link="+postUrl+"&title="+postTitle
},
Facebook_Messenger: {
title: "Facebook Messenger",
locale: "en-US",
redirect_url: "https://www.facebook.com/dialog/send?app_id=595489497242932&display=popup&link="+postUrl+"&redirect_uri="+postUrl
},
Google_Classroom: {
title: "Google Classroom",
locale: "en-US",
redirect_url: "https://classroom.google.com/u/0/share?url="+postUrl
},
Kik: {
title: "Kik",
locale: "en-US",
redirect_url: "https://www.kik.com/send/article/?app_name=Share&text=&title="+postTitle+"&url="+postUrl
},
Papaly: {
title: "Papaly",
locale: "en-US",
redirect_url: "https://papaly.com/api/share.html?url="+postUrl+"&title="+postTitle
},
Refind: {
title: "Refind",
locale: "en-US",
redirect_url: "https://refind.com/?url="+postUrl
},
Skype: {
title: "Skype",
locale: "en-US",
redirect_url: "https://web.skype.com/share?url="+postUrl
},
SMS: {
title: "SMS",
locale: "en-US",
bookmarklet_url: "sms://?&body="+postTitle+" "+postUrl
},
Trello: {
title: "Trello",
locale: "en-US",
redirect_url: "https://trello.com/add-card?mode=popup&url="+postUrl+"&name="+postTitle+"&desc="
},
Viber: {
title: "Viber",
locale: "en-US",
bookmarklet_url: "viber://forward?text="+postTitle+" "+postUrl
},
Threema: {
title: "Threema",
locale: "en-US",
bookmarklet_url: "threema://compose?text="+postTitle+" "+postUrl
},
Telegram: {
title: "Telegram",
locale: "en-US",
redirect_url: "https://telegram.me/share/url?url="+postUrl+"&text="+postTitle
},
email: {
title: "Email",
locale: "en-US",
redirect_url: "mailto:?subject=" + postTitle + "&body=Link: " + postUrl,
},
reddit: {
title: "Reddit",
locale: "en-US",
redirect_url: "http://reddit.com/submit?url=" + postUrl + "&title=" + postTitle,
},
float_it: {
title: "Float it",
locale: "en-US",
redirect_url: "http://www.designfloat.com/submit.php?url=" + postUrl + "&title=" + postTitle,
},
google_mail: {
title: "Google Gmail",
locale: "en-US",
redirect_url: "https://mail.google.com/mail/?ui=2&view=cm&fs=1&tf=1&su=" + postTitle + "&body=Link: " + postUrl,
},
gentlereader: {
title: "GentleReader",
locale: "en-US",
redirect_url: "https://app.gentlereader.com/bookmark?url=" + postUrl,
},
google_bookmarks: {
title: "Google Bookmarks",
locale: "en-US",
redirect_url: "http://www.google.com/bookmarks/mark?op=edit&bkmk=" + postUrl + "&title=" + postTitle,
},
digg: {
title: "Digg",
locale: "en-US",
redirect_url: "http://digg.com/submit?phase=2&url=" + postUrl + "&title=" + postTitle,
},
printfriendly: {
title: "PrintFriendly",
locale: "en-US",
redirect_url: "http://www.printfriendly.com/print?url=" + postUrl,
},
print: {
title: "Print",
locale: "en-US",
redirect_url: "http://www.printfriendly.com/print?url=" + postUrl,
},
tumblr: {
title: "Tumblr",
locale: "en-US",
redirect_url: "https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=" + postUrl + "&title=" + postTitle + "&caption=",
bookmarklet_url: "javascript:var d=document,w=window,e=w.getSelection,k=d.getSelection,x=d.selection,s=(e?e():(k)?k():(x?x.createRange().text:0)),f='http://www.tumblr.com/share',l=d.location,e=encodeURIComponent,p='?v=3&u='+e(l.href) +'&t='+e(d.title) +'&s='+e(s),u=f+p;try{if(!/^(.*\\.)?tumblr[^.]*$/.test(l.host))throw(0);tstbklt();}catch(z){a=function(){if(!w.open(u,'t','toolbar=0,resizable=0,status=1,width=450,height=430'))l.href=u;};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();}void(0);"
},
vk: {
title: "Vkontakte",
locale: "ru",
redirect_url: "https://vk.com/share.php?url=" + postUrl + "&title=" + postTitle,
},
evernote: {
title: "Evernote",
locale: "en-US",
redirect_url: "https://www.evernote.com/clip.action?url=" + postUrl + "&title=" + postTitle,
bookmarklet_url: "javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();"
},
amazon_us_wish_list: {
title: "Amazon Wish List",
locale: "en-US",
redirect_url: "http://www.amazon.com/wishlist/add?u=" + postUrl + "&t=" + postTitle,
bookmarklet_url: "javascript:(function(){var w=window,l=w.location,d=w.document,s=d.createElement('script'),e=encodeURIComponent,x='undefined',u='http://www.amazon.com/gp/wishlist/add';if(typeof s!='object')l.href=u+'?u='+e(l)+'&t='+e(d.title);function g(){if(d.readyState&&d.readyState!='complete'){setTimeout(g,200);}else{if(typeof AUWLBook==x)s.setAttribute('src',u+'.js?loc='+e(l)),d.body.appendChild(s);function f(){(typeof AUWLBook==x)?setTimeout(f,200):AUWLBook.showPopover();}f();}}g();}())"
},
wordpress_blog: {
title: "WordPress",
locale: "en-US",
redirect_url: "http://www.addtoany.com/ext/wordpress/press_this?linkurl=" + postUrl + "&linkname=" + postTitle,
},
whatsapp: {
title: "Whatsapp",
locale: "en-US",
redirect_url: "https://" + heateorSsDetermineWhatsappShareAPI(true) + "/send?text=" + postTitle + " " + postUrl,
},
diigo: {
title: "Diigo",
locale: "en-US",
redirect_url: "http://www.diigo.com/post?url=" + postUrl + "&title=" + postTitle,
},
yc_hacker_news: {
title: "Hacker News",
locale: "en-US",
redirect_url: "http://news.ycombinator.com/submitlink?u=" + postUrl + "&t=" + postTitle,
},
box_net: {
title: "Box.net",
locale: "en-US",
redirect_url: "https://www.box.net/api/1.0/import?url=" + postUrl + "&name=" + postTitle + "&import_as=link",
},
aol_mail: {
title: "AOL Mail",
locale: "en-US",
redirect_url: "http://webmail.aol.com/25045/aol/en-us/Mail/compose-message.aspx?subject=" + postTitle + "&body=" + postUrl,
},
yahoo_mail: {
title: "Yahoo Mail",
locale: "en-US",
redirect_url: "http://compose.mail.yahoo.com/?Subject=" + postTitle + "&body=Link: " + postUrl,
},
instapaper: {
title: "Instapaper",
locale: "en-US",
redirect_url: "http://www.instapaper.com/edit?url=" + postUrl + "&title=" + postTitle,
},
plurk: {
title: "Plurk",
locale: "en-US",
redirect_url: "http://www.plurk.com/m?content=" + postUrl + "&qualifier=shares",
},
wanelo: {
title: "Wanelo",
locale: "en-US",
redirect_url: "http://wanelo.com/p/post?bookmarklet=&images%5B%5D=&url=" + postUrl + "&title=" + postTitle + "&price=&shop=",
bookmarklet_url: "javascript:void ((function(url){if(!window.waneloBookmarklet){var productURL=encodeURIComponent(url),cacheBuster=Math.floor(Math.random()*1e3),element=document.createElement('script');element.setAttribute('src','//wanelo.com/bookmarklet/3/setup?*='+cacheBuster+'&url='+productURL),element.onload=init,element.setAttribute('type','text/javascript'),document.getElementsByTagName('head')[0].appendChild(element)}else init();function init(){window.waneloBookmarklet()}})(window.location.href))"
},
aim: {
title: "AIM",
locale: "en-US",
redirect_url: "http://share.aim.com/share/?url=" + postUrl + "&title=" + postTitle,
},
viadeo: {
title: "Viadeo",
locale: "en-US",
redirect_url: "http://www.viadeo.com/shareit/share/?url=" + postUrl + "&title=" + postTitle,
},
pinboard_in: {
title: "Pinboard",
locale: "en-US",
redirect_url: "http://pinboard.in/add?url=" + postUrl + "&title=" + postTitle,
},
blogger_post: {
title: "Blogger Post",
locale: "en-US",
redirect_url: "http://www.blogger.com/blog_this.pyra?t=&u=" + postUrl + "&l&n=" + postTitle,
},
typepad_post: {
title: "TypePad Post",
locale: "en-US",
redirect_url: "http://www.typepad.com/services/quickpost/post?v=2&qp_show=ac&qp_title=" + postTitle + "&qp_href=" + postUrl + "&qp_text=" + postTitle,
},
buffer: {
title: "Buffer",
locale: "en-US",
redirect_url: "http://bufferapp.com/add?url=" + postUrl + "&text=" + postTitle,
},
flipboard: {
title: "Flipboard",
locale: "en-US",
redirect_url: "https://share.flipboard.com/bookmarklet/popout?v=2&url=" + postUrl + "&title=" + postTitle,
},
mail: {
title: "Email",
locale: "en-US",
redirect_url: "mailto:?subject=" + postTitle + "&body=Link: " + postUrl,
},
pocket: {
title: "Pocket",
locale: "en-US",
redirect_url: "https://readitlaterlist.com/save?url=" + postUrl + "&title=" + postTitle,
},
fark: {
title: "Fark",
locale: "en-US",
redirect_url: "http://cgi.fark.com/cgi/fark/submit.pl?new_url=" + postUrl,
},
fintel: {
title: "Fintel",
locale: "en-US",
redirect_url: "https://fintel.io/submit?url=" + postUrl,
},
yummly: {
title: "Yummly",
locale: "en-US",
redirect_url: "http://www.yummly.com/urb/verify?url=" + postUrl + "&title=" + postTitle,
},
app_net: {
title: "App.net",
locale: "en-US",
redirect_url: "https://account.app.net/login/",
},
balatarin: {
title: "Balatarin",
locale: "en-US",
redirect_url: "https://www.balatarin.com/login",
},
bibSonomy: {
title: "BibSonomy",
locale: "en-US",
redirect_url: "http://www.bibsonomy.org/login",
},
Bitty_Browser: {
title: "Bitty Browser",
locale: "en-US",
redirect_url: "http://www.bitty.com/manual/?contenttype=&contentvalue=" + postUrl,
},
Blinklist: {
title: "Blinklist",
locale: "en-US",
redirect_url: "http://blinklist.com/blink?t=" + postTitle + "&d=&u=" + postUrl,
},
BlogMarks: {
title: "BlogMarks",
locale: "en-US",
redirect_url: "http://blogmarks.net/my/new.php?mini=1&simple=1&title=" + postTitle + "&url=" + postUrl,
},
Bookmarks_fr: {
title: "Bookmarks.fr",
locale: "en-US",
redirect_url: "http://www.bookmarks.fr/Connexion/?action=add&address=" + postUrl + "&title=" + postTitle,
},
BuddyMarks: {
title: "BuddyMarks",
locale: "en-US",
redirect_url: "http://buddymarks.com/login.php?bookmark_title=" + postTitle + "&bookmark_url=" + postUrl + "&bookmark_desc=&bookmark_tags=",
},
Care2_news: {
title: "Care2 News",
locale: "en-US",
redirect_url: "http://www.care2.com/passport/login.html?promoID=10&pg=http://www.care2.com/news/compose?sharehint=news&share[share_type]news&bookmarklet=Y&share[title]=" + postTitle + "&share[link_url]=" + postUrl + "&share[content]=",
},
CiteULike: {
title: "Cite U Like",
locale: "en-US",
redirect_url: "http://www.citeulike.org/posturl?url=" + postUrl + "&title=" + postTitle,
},
Diary_Ru: {
title: "Diary.Ru",
locale: "en-US",
redirect_url: "http://www.diary.ru/?newpost&title=" + postTitle + "&text=" + postUrl,
},
dzone: {
title: "DZone",
locale: "en-US",
redirect_url: "http://www.dzone.com/links/add.html?url=" + postUrl + "&title=" + postTitle,
},
Folkd: {
title: "Folkd",
locale: "en-US",
redirect_url: "http://www.folkd.com/page/social-bookmarking.html?addurl=" + postUrl,
},
Hatena: {
title: "Hatena",
locale: "en-US",
redirect_url: "http://b.hatena.ne.jp/bookmarklet?url=" + postUrl + "&btitle=" + postTitle,
},
Jamespot: {
title: "Jamespot",
locale: "en-US",
redirect_url: "//my.jamespot.com/",
},
Kakao: {
title: "Kakao",
locale: "en-US",
redirect_url: "https://story.kakao.com/share?url=" + postUrl,
},
Kindle_It: {
title: "Kindle_It",
locale: "en-US",
redirect_url: "//fivefilters.org/kindle-it/send.php?url=" + postUrl,
},
Known: {
title: "Known",
locale: "en-US",
redirect_url: "https://withknown.com/share/?url=" + postUrl + "&title=" + postTitle,
},
Line: {
title: "Line",
locale: "en-US",
redirect_url: "https://social-plugins.line.me/lineit/share?url=" + postUrl,
},
LiveJournal: {
title: "LiveJournal",
locale: "en-US",
redirect_url: "http://www.livejournal.com/update.bml?subject=" + postTitle + "&event=" + postUrl,
},
Mail_Ru: {
title: "Mail.Ru",
locale: "en-US",
redirect_url: "https://connect.mail.ru/share?share_url=" + postUrl,
},
Mendeley: {
title: "Mendeley",
locale: "en-US",
redirect_url: "https://www.mendeley.com/sign-in/",
},
Meneame: {
title: "Meneame",
locale: "en-US",
redirect_url: "https://www.meneame.net/submit.php?url=" + postUrl,
},
MeWe: {
title: "MeWe",
locale: "en-US",
redirect_url: "https://mewe.com/share?link=" + postUrl,
},
Mix: {
title: "Mix",
locale: "en-US",
redirect_url: "https://mix.com/mixit?url=" + postUrl,
},
Mixi: {
title: "Mixi",
locale: "en-US",
redirect_url: "https://mixi.jp/share.pl?mode=login&u=" + postUrl,
},
MySpace: {
title: "MySpace",
locale: "en-US",
redirect_url: "https://myspace.com/post?u=" + encodeURIComponent(postUrl) + "&t=" + postTitle + "&l=3&c=" + postTitle,
},
Netvouz: {
title: "Netvouz",
locale: "en-US",
redirect_url: "http://www.netvouz.com/action/submitBookmark?url=" + postUrl + "&title=" + postTitle + "&popup=no&description=",
},
Odnoklassniki: {
title: "Odnoklassniki",
locale: "en-US",
redirect_url: "https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st.shareUrl=" + postUrl + "&st.client_id=-1",
},
Outlook_com: {
title: "Outlook.com",
locale: "en-US",
redirect_url: "https://mail.live.com/default.aspx?rru=compose?subject=" + postTitle + "&body=" + postUrl + "&lc=1033&id=64855&mkt=en-us&cbcxt=mai",
},
Protopage_Bookmarks: {
title: "Protopage_Bookmarks",
locale: "en-US",
redirect_url: "http://www.protopage.com/add-button-site?url=" + postUrl + "&label=&type=page",
},
Pusha: {
title: "Pusha",
locale: "en-US",
redirect_url: "//www.pusha.se/posta?url=" + postUrl,
},
Qzone: {
title: "Qzone",
locale: "en-US",
redirect_url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + postUrl,
},
Rediff_MyPage: {
title: "Rediff MyPage",
locale: "en-US",
redirect_url: "//share.rediff.com/bookmark/addbookmark?bookmarkurl=" + postUrl + "&title=" + postTitle,
},
Renren: {
title: "Renren",
locale: "en-US",
redirect_url: "//www.connect.renren.com/share/sharer?url=" + postUrl + "&title=" + postTitle,
},
Sina_Weibo: {
title: "Sina Weibo",
locale: "en-US",
redirect_url: "//service.weibo.com/share/share.php?url=" + postUrl + "&title=" + postTitle,
},
SiteJot: {
title: "SiteJot",
locale: "en-US",
redirect_url: "http://www.sitejot.com/loginform.php?iSiteAdd=&iSiteDes=",
},
Slashdot: {
title: "Slashdot",
locale: "en-US",
redirect_url: "//slashdot.org/submission?url=" + postUrl,
},
StockTwits: {
title: "StockTwits",
locale: "en-US",
redirect_url: "https://stocktwits.com/widgets/share?body=" + postTitle + " " + postUrl,
},
Svejo: {
title: "Svejo",
locale: "en-US",
redirect_url: "https://svejo.net/story/submit_by_url?url=" + postUrl + "&title=" + postTitle + "&summary=",
},
Symbaloo_Feeds: {
title: "Symbaloo_Feeds",
locale: "en-US",
redirect_url: "//www.symbaloo.com/",
},
Tuenti: {
title: "Tuenti",
locale: "en-US",
redirect_url: "https://www.tuenti.com/share?p=b5dd6602&url=" + postUrl,
},
Twiddla: {
title: "Twiddla",
locale: "en-US",
redirect_url: "//www.twiddla.com/New.aspx?url=" + postUrl + "&title=" + postTitle,
},
Webnews: {
title: "Webnews",
locale: "en-US",
redirect_url: "//www.webnews.de/login",
},
Wykop: {
title: "Wykop",
locale: "en-US",
redirect_url: "//www.wykop.pl/dodaj?url=" + postUrl + "&title=" + postTitle,
},
Xing: {
title: "Xing",
locale: "en-US",
redirect_url: "https://www.xing.com/spi/shares/new?cb=0&url=" + postUrl,
},
Yoolink: {
title: "Yoolink",
locale: "en-US",
redirect_url: "//yoolink.to/addorshare?url_value=" + postUrl + "&title=" + postTitle,
}}
var theChampMoreSharingServicesHtml='<button id="the_champ_sharing_popup_close" class="close-button separated"><img src="'+ theChampCloseIconPath +'" /></button><div id="the_champ_sharing_more_content" data-href="'+ decodeURIComponent(shareContainer.getAttribute('class').indexOf('the_champ_horizontal_sharing')!=-1 ? heateorSsHorSharingShortUrl:heateorSsVerticalSharingShortUrl) +'"><div class="filter"><input type="text" onkeyup="theChampFilterSharing(this.value.trim())" placeholder="Search" class="search"></div><div class="all-services"><ul class="mini">';
for(var i in theChampMoreSharingServices){
var tempTitle=theChampCapitaliseFirstLetter(theChampMoreSharingServices[i].title.replace(/[_. ]/g, ""));
theChampMoreSharingServicesHtml +='<li><a rel="nofollow" class="theChamp'+i+'Share" title="'+ theChampMoreSharingServices[i].title +'" alt="'+ theChampMoreSharingServices[i].title +'" ';
if(theChampMoreSharingServices[i].bookmarklet_url){
theChampMoreSharingServicesHtml +='href="' + theChampMoreSharingServices[i].bookmarklet_url + '" ';
}else if(theChampMoreSharingServices[i].redirect_url){
theChampMoreSharingServicesHtml +='onclick="theChampPopup(\'' + theChampMoreSharingServices[i].redirect_url + '\')" href="javascript:void(0)" ';
}else{
theChampMoreSharingServicesHtml +='href="javascript:void(0)" ';
}
theChampMoreSharingServicesHtml +='"><i style="width:22px;height:22px" title="'+ theChampMoreSharingServices[i].title +'" class="theChampSharing theChamp' + tempTitle + 'Background"><ss style="display:block;width:100%;height:100%;" class="theChampSharingSvg theChamp' + tempTitle + 'Svg"></ss></i>' + theChampMoreSharingServices[i].title + '</a></li>';
}
theChampMoreSharingServicesHtml +=concate;
var mainDiv=document.createElement('div');
mainDiv.innerHTML=theChampMoreSharingServicesHtml;
mainDiv.setAttribute('id', 'the_champ_sharing_more_providers');
var bgDiv=document.createElement('div');
bgDiv.setAttribute('id', 'the_champ_popup_bg');
jQuery('body').append(mainDiv).append(bgDiv);
document.getElementById('the_champ_popup_bg').onclick=document.getElementById('the_champ_sharing_popup_close').onclick=function(){
mainDiv.parentNode.removeChild(mainDiv);
bgDiv.parentNode.removeChild(bgDiv);
}}
if(typeof theChampHorizontalSharingCountEnable=='undefined'){
var theChampHorizontalSharingCountEnable=0;
}
if(typeof theChampVerticalSharingCountEnable=='undefined'){
var theChampVerticalSharingCountEnable=0;
}
if(theChampHorizontalSharingCountEnable||theChampVerticalSharingCountEnable){
theChampLoadEvent(
function(){
theChampCallAjax(function(){
theChampGetSharingCounts();
});
}
);
}
function theChampFilterSharing(val){
jQuery('ul.mini li a').each(function(){
if(jQuery(this).text().toLowerCase().indexOf(val.toLowerCase())!=-1){
jQuery(this).parent().css('display', 'block');
}else{
jQuery(this).parent().css('display', 'none');
}});
};
var heateorSsFacebookTargetUrls=[];
function theChampGetSharingCounts(){
var targetUrls=[];
jQuery('.the_champ_sharing_container').each(function(){
if(typeof jQuery(this).attr('super-socializer-no-counts')=='undefined'){
var currentTargetUrl=jQuery(this).attr('super-socializer-data-href');
if(currentTargetUrl!=null&&jQuery.inArray(currentTargetUrl, heateorSsUrlCountFetched)==-1){
targetUrls.push(currentTargetUrl);
heateorSsUrlCountFetched.push(currentTargetUrl);
}}
});
if(targetUrls.length==0){
return;
}
jQuery.ajax({
type: 'GET',
dataType: 'json',
url: theChampSharingAjaxUrl,
data: {
action: 'the_champ_sharing_count',
urls: targetUrls,
},
success: function(data, textStatus, XMLHttpRequest){
if(data.status==1){
if(data.facebook){
heateorSsFacebookTargetUrls=data.facebook_urls;
}
for(var i in data.message){
var sharingContainers=jQuery("div[super-socializer-data-href='"+i+"']");
jQuery(sharingContainers).each(function(){
var totalCount=0;
for(var j in data.message[i]){
var sharingCount=parseInt(data.message[i][j])||0;
var targetElement=jQuery(this).find('.the_champ_'+j+'_count');
if(jQuery(targetElement).attr('ss_st_count')){
sharingCount=parseInt(sharingCount) + parseInt(jQuery(targetElement).attr('ss_st_count'));
}
totalCount +=parseInt(sharingCount);
if(sharingCount < 1){ continue; }
jQuery(targetElement).html(theChampCalculateApproxCount(sharingCount)).css({'visibility': 'visible', 'display': 'block'});
if(( typeof theChampReduceHorizontalSvgWidth!='undefined'&&jQuery(this).hasClass('the_champ_horizontal_sharing'))||(typeof theChampReduceVerticalSvgWidth!='undefined'&&jQuery(this).hasClass('the_champ_vertical_sharing'))){
jQuery(targetElement).parents('li').find('.theChampSharingSvg').css('float', 'left');
}
if(( typeof theChampReduceHorizontalSvgHeight!='undefined'&&jQuery(this).hasClass('the_champ_horizontal_sharing'))||(typeof theChampReduceVerticalSvgHeight!='undefined'&&jQuery(this).hasClass('the_champ_vertical_sharing'))){
jQuery(targetElement).parents('li').find('.theChampSharingSvg').css('marginTop', '0');
}}
var totalCountContainer=jQuery(this).find('.theChampTCBackground');
jQuery(totalCountContainer).each(function(){
var containerHeight=jQuery(this).css('height');
jQuery(this).html('<div class="theChampTotalShareCount" style="font-size: '+ (parseInt(containerHeight) * 62/100) +'px">' + theChampCalculateApproxCount(totalCount) + '</div><div class="theChampTotalShareText" style="font-size: '+ (parseInt(containerHeight) * 38/100) +'px">' + (totalCount==0||totalCount > 1 ? heateorSsSharesText:heateorSsShareText) + '</div>').css('visibility', 'visible');
});
});
}
if(heateorSsFacebookTargetUrls.length!=0){
theChampFetchFacebookShares(heateorSsFacebookTargetUrls);
}}
}});
}
function theChampFetchFacebookShares(targetUrls){
var loopCounter=0;
for(var i in targetUrls){
for(var j in targetUrls[i]){
loopCounter++;
theChampFBShareJSONCall(targetUrls[i][j], loopCounter, targetUrls[0].length*targetUrls.length, targetUrls[0][j]);
}}
}
function theChampFBShareJSONCall(targetUrl, loopCounter, targetUrlsLength, dataHref){
jQuery.getJSON('//graph.facebook.com/?id=' + targetUrl, function(data){
if(data.share&&data.share.share_count >=0){
var sharingContainers=jQuery("div[super-socializer-data-href='"+dataHref+"']");
jQuery(sharingContainers).each(function(){
var targetElement=jQuery(this).find('.the_champ_facebook_count');
var facebookBackground=jQuery(this).find('i.theChampFacebookBackground');
var sharingCount=parseInt(data.share.share_count);
if(jQuery(targetElement).attr('ss_st_count')!==undefined){
sharingCount +=parseInt(jQuery(targetElement).attr('ss_st_count'));
}
if(sharingCount > 0){
if(typeof jQuery(facebookBackground).attr('heateor-ss-fb-shares')=='undefined'){
jQuery(targetElement).html(theChampCalculateApproxCount(sharingCount)).css({'visibility': 'visible', 'display': 'block'});
jQuery(facebookBackground).attr('heateor-ss-fb-shares', sharingCount);
}else if(typeof jQuery(facebookBackground).attr('heateor-ss-fb-shares')!='undefined'){
var tempShareCount=parseInt(jQuery(facebookBackground).attr('heateor-ss-fb-shares'));
jQuery(facebookBackground).attr('heateor-ss-fb-shares', sharingCount + tempShareCount);
jQuery(targetElement).html(theChampCalculateApproxCount(sharingCount + tempShareCount));
}
if(( typeof theChampReduceHorizontalSvgWidth!='undefined'&&jQuery(this).hasClass('the_champ_horizontal_sharing'))||(typeof theChampReduceVerticalSvgWidth!='undefined'&&jQuery(this).hasClass('the_champ_vertical_sharing'))){
jQuery(targetElement).parents('li').find('.theChampSharingSvg').css('float', 'left');
}
if(( typeof theChampReduceHorizontalSvgHeight!='undefined'&&jQuery(this).hasClass('the_champ_horizontal_sharing'))||(typeof theChampReduceVerticalSvgHeight!='undefined'&&jQuery(this).hasClass('the_champ_vertical_sharing'))){
jQuery(targetElement).parents('li').find('.theChampSharingSvg').css('marginTop', '0');
}
var totalCountContainer=jQuery(this).find('.theChampTCBackground');
jQuery(totalCountContainer).each(function(){
var totalShareCountElem=jQuery(this).find('.theChampTotalShareCount');
var totalShareCount=jQuery(totalShareCountElem).text();
var newTotalCount=theChampCalculateActualCount(totalShareCount) + sharingCount;
jQuery(totalShareCountElem).text(theChampCalculateApproxCount(newTotalCount));
jQuery(this).find('.theChampTotalShareText').text(newTotalCount==0||newTotalCount > 1 ? heateorSsSharesText:heateorSsShareText);
});
}});
}
if(loopCounter==targetUrlsLength){
setTimeout(function(){
var facebookShares={};
for(var i in heateorSsFacebookTargetUrls[0]){
var sharingContainers=jQuery("div[super-socializer-data-href='"+heateorSsFacebookTargetUrls[0][i]+"']");
jQuery(sharingContainers).each(function(){
var facebookCountElement=jQuery(this).find('.the_champ_facebook_count');
var facebookCountElementBg=jQuery(this).find('i.theChampFacebookBackground');
var shareCountString=typeof jQuery(facebookCountElementBg).attr('heateor-ss-fb-shares')!='undefined' ? jQuery(facebookCountElementBg).attr('heateor-ss-fb-shares').trim():'';
if(shareCountString!=''){
var shareCount=parseInt(theChampCalculateActualCount(shareCountString));
if(jQuery(facebookCountElement).attr('ss_st_count')!==undefined){
var startingCount=parseInt(jQuery(facebookCountElement).attr('ss_st_count').trim());
shareCount=Math.abs(shareCount - startingCount);
}
facebookShares[heateorSsFacebookTargetUrls[0][i]]=shareCount;
return;
}});
}
if(!jQuery.isEmptyObject(facebookShares)){
theChampSaveFacebookShares(facebookShares);
}}, 1000);
}});
}
function theChampSaveFacebookShares(facebookShares){
jQuery.ajax({
type: 'GET',
dataType: 'json',
url: theChampSharingAjaxUrl,
data: {
action: 'the_champ_save_facebook_shares',
share_counts: facebookShares,
},
success: function(data, textStatus, XMLHttpRequest){}});
}
function theChampCalculateApproxCount(sharingCount){
if(sharingCount > 999&&sharingCount < 10000){
sharingCount=(Math.round(sharingCount/100))/10 + 'K';
}else if(sharingCount > 9999&&sharingCount < 100000){
sharingCount=(Math.round(sharingCount/100))/10 + 'K';
}else if(sharingCount > 99999&&sharingCount < 1000000){
sharingCount=(Math.round(sharingCount/100))/10 + 'K';
}else if(sharingCount > 999999){
sharingCount=(Math.round(sharingCount/100000))/10 + 'M';
}
return sharingCount;
}
function theChampCalculateActualCount(sharingCount){
if(sharingCount.indexOf('K') > 0){
sharingCount=sharingCount.replace('K', '') * 1000;
}else if(sharingCount.indexOf('M') > 0){
sharingCount=sharingCount.replace('M', '') * 1000000;
}
return parseInt(sharingCount);
}
function theChampCapitaliseFirstLetter(e){
return e.charAt(0).toUpperCase() + e.slice(1)
}
jQuery(function(){
var heateorSsWhatsappJSAPI=heateorSsDetermineWhatsappShareAPI(false);
var classes=['the_champ_vertical_sharing', 'the_champ_vertical_counter'];
for(var i=0; i < classes.length; i++){
if(jQuery('.' + classes[i]).length){
jQuery('.' + classes[i]).each(function(){
var verticalSharingHtml=jQuery(this).html();
if(jQuery(this).attr('style').indexOf('right') >=0){
var removeClass='theChampPushIn', margin='Right', alignment='right', addClass='theChampPullOut';
}else{
var removeClass='theChampPullOut', margin='Left', alignment='left', addClass='theChampPushIn';
}
jQuery(this).html(verticalSharingHtml + '<div title="Hide" style="float:' + alignment + '" onclick="theChampHideSharing(this, \''+ removeClass +'\', \''+ addClass +'\',\'' + margin +'\', \'' + alignment + '\')" class="theChampSharingArrow ' + removeClass + '"></div>');
});
}}
if(theChampMobileStickySharingEnabled==1){
if(jQuery('div.the_champ_vertical_sharing').length){
jQuery(document.body).append("<div class='heateor_ss_mobile_footer'></div>");
}}
var heateorSsClipboard=new Clipboard('.theChampCopyLinkBackground, .theChampCopyLinkShare, .theChampCopyLinkSvg', {
text: function(trigger){
if(jQuery(trigger).hasClass('theChampCopyLinkShare')){
var element=trigger.parentElement.parentElement.parentElement.parentElement;
var url=jQuery(element).attr("data-href")||"";
}else if(jQuery(trigger).hasClass('theChampCopyLinkSvg')){
var element=trigger.parentElement.parentElement.parentElement.parentElement;
var url=jQuery(element).attr("super-socializer-data-href")||"";
if(jQuery(element).hasClass('the_champ_horizontal_sharing')&&typeof heateorSsHorSharingShortUrl!=undefined){
var url=heateorSsHorSharingShortUrl;
}else if(jQuery(element).hasClass('the_champ_vertical_sharing')&&typeof heateorSsVerticalSharingShortUrl!=undefined){
var url=heateorSsVerticalSharingShortUrl;
}
if(!url){
var element=trigger.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
var url=jQuery(element).attr("data-href")||"";
}}
return url;
}});
heateorSsClipboard.on('success', function(e){
alert(heateorSsCopyLinkMessage);
});
});
function theChampHideSharing(elem, removeClass, addClass, margin, alignment){
var animation={}, counter=jQuery(elem).parent().hasClass('the_champ_vertical_counter'), offset=parseInt(jQuery(elem).parent().css('width')) + 10 - (counter ? 16:0);
var ssOffset=jQuery(elem).parent().attr('ss-offset');
if(ssOffset){
var savedOffset=parseInt(ssOffset);
}else{
var savedOffset=(counter ? theChampCounterOffset:theChampSharingOffset);
}
if(jQuery(elem).attr('title')=='Hide'){
animation[alignment]="-=" + (offset + savedOffset);
jQuery(elem).parent().animate(animation, 400, function(){
jQuery(elem).removeClass(removeClass).addClass(addClass).attr('title', 'Share');
if(counter){
var cssFloat=alignment=='left' ? 'right':'left';
jQuery(elem).css('float', cssFloat);
}else{
jQuery(elem).css('margin' + margin, offset + 'px')
}});
}else{
animation[alignment]="+=" + (offset + savedOffset);
jQuery(elem).parent().animate(animation, 400, function(){
jQuery(elem).removeClass(addClass).addClass(removeClass).attr('title', 'Hide');
if(counter){
jQuery(elem).css('float', alignment);
}else{
jQuery(elem).css('margin' + margin, '0px');
}});
}}
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var l="function"==typeof require&&require;if(!c&&l)return l(a,!0);if(r)return r(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n||t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){function o(t,e){for(;t&&t.nodeType!==i;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var i=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}e.exports=o},{}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&o.call(t,n)}}var r=t("./closest");e.exports=o},{"./closest":1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return l(document.body,t,e,n)}var c=t("./is"),l=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i),e=o.toString()}return e}e.exports=o},{}],6:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;o<i;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;r<a;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],7:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if(void 0!==o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return a(t,[{key:"resolveOptions",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function t(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px";var o=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=o+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function t(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function t(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:"copyText",value:function t(){var e=void 0;try{e=document.execCommand (this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function t(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function t(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function t(){this.removeFake()}},{key:"action",set:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==(void 0===e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:5}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if(void 0!==o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var s=i(e),u=i(n),f=i(o),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),p=function(t){function e(t,n){r(this,e);var o=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n),o.listenClick(t),o}return c(e,t),h(e,[{key:"resolveOptions",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===d(e.container)?e.container:document.body}},{key:"listenClick",value:function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})}},{key:"onClick",value:function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),container:this.container,trigger:n,emitter:this})}},{key:"defaultAction",value:function t(e){return l("action",e)}},{key:"defaultTarget",value:function t(e){var n=l("target",e);if(n)return document.querySelector(n)}},{key:"defaultText",value:function t(e){return l("text",e)}},{key:"destroy",value:function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),e}(u.default);t.exports=p})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});
window.advadsGAAjaxAds={};
window.advadsGAPassiveAds={};
(function($){
if(typeof advanced_ads_pro!=='undefined'){
advanced_ads_pro.observers.add(function(event){
if(event.event==='inject_passive_ads'){
var server='all';
if($.isArray(event.ad_ids)&&!event.ad_ids.length){
event.ad_ids={};}
advadsGAPassiveAds=advads_tracking_utils('concat', advadsGAPassiveAds, event.ad_ids);
var filteredIds=removeDelayedAdId(event.ad_ids);
var advads_ad_ids;
if(advadsTracking.method==='frontend'){
advads_ad_ids=advads_tracking_utils('concat', advads_tracking_ads, filteredIds);
advads_tracking_ads=[];
}else{
advads_ad_ids=filteredIds;
server='passive';
}
advads_track_ads(advads_ad_ids, server);
}
if(event.event==='inject_ajax_ads'){
if($.isArray(event.ad_ids)&&!event.ad_ids.length){
event.ad_ids={};}
if('ga'==advads_tracking_methods[ blogID ]){
for(var blogID in event.ad_ids){
for(var i in event.ad_ids[ blogID ]){
if($('[data-advadstrackid="' + event.ad_ids[ blogID ][ i ] + '"][data-advadstrackbid="' + blogID + '"]').length){
var HTMLID=$('[data-advadstrackid="' + event.ad_ids[ blogID ][ i ] + '"][data-advadstrackbid="' + blogID + '"]').attr('id');
if('undefined'!=typeof advads_items.showed&&-1!==advads_items.showed.indexOf(HTMLID)){
continue;
}else{
if('undefined'==typeof advadsGAAjaxAds[ blogID ]){
advadsGAAjaxAds[ blogID ]=[];
}
advadsGAAjaxAds[ blogID ].push(event.ad_ids[ blogID ][ i ]);
}}
}}
advads_track_ads(advadsGAAjaxAds, 'analytics');
}}
});
}
function triggerTrack(ev){
var bid=$(ev.target).attr('data-advadstrackbid');
var id=parseInt($(ev.target).attr('data-advadstrackid'));
if(! bid){
return;
}
if('ga'==advads_tracking_methods[ bid ]||advads_tracking_parallel[ bid ]){
advads_gadelayed_track_event(ev);
}else{
$.post(advads_tracking_urls[bid],{ads:[id]}, function(response){});
}}
$(function(){
if('undefined'!=typeof advanced_ads_layer_settings){
$(document).on(advanced_ads_layer_settings.layer_class + '-trigger', function(ev){
triggerTrack(ev);
});
}
if('undefined'!=typeof advanced_ads_sticky_check_position_fixed){
$(document).on('advads-sticky-trigger', function(ev){
triggerTrack(ev);
});
}});
}(jQuery));
function removeDelayedAdId(ids){
if(jQuery('[data-advadstrackid]').length){
jQuery('[data-advadstrackid]').each(function(){
var id=parseInt(jQuery(this).attr('data-advadstrackid'));
var bid=parseInt(jQuery(this).attr('data-advadstrackbid'));
if(advads_tracking_utils('hasAd', ids)){
if('undefined'!=typeof ids[bid]){
var index=ids[bid].indexOf(id);
if(-1!=index){
ids[bid].splice(index, 1);
}}
}});
}
return ids;
}
jQuery(document).ready(function($){
if('undefined'==typeof advads_tracking_ads) return;
advads_tracking_ads=removeDelayedAdId(advads_tracking_ads);
if(typeof advanced_ads_pro==='undefined'){
if(advads_tracking_utils('hasAd', advads_tracking_ads)){
for(var bid in advads_tracking_ads){
if('frontend'==advads_tracking_methods[bid]){
advads_track_ads(advads_tracking_ads);
advads_tracking_ads={1:[]};}}
}}
});
jQuery(document).on('advads_track_ads', function(e, ad_ids){
advads_track_ads(ad_ids);
});
function advads_gadelayed_track_event(ev){
var $el=jQuery(ev.target);
var $vector=[];
if($el.attr('data-advadstrackid')){
$vector=$el;
}else{
$vector=$el.find('[data-advadstrackid]');
}
if($vector.length){
var ids={};
$vector.each(function(){
var bid=parseInt(jQuery(this).attr('data-advadstrackbid'));
if('undefined'==typeof ids[bid]){
ids[bid]=[];
}
ids[bid].push(parseInt(jQuery(this).attr('data-advadstrackid')));
});
if('undefined'==typeof advadsGATracking.delayedAds){
advadsGATracking.delayedAds={};}
advadsGATracking.delayedAds=advads_tracking_utils('concat', advadsGATracking.delayedAds, ids);
advads_track_ads(advadsGATracking.delayedAds, 'delayed');
}}
function advads_tracking_utils(){
if(!arguments.hasOwnProperty(0)) return;
var fn=arguments[0];
var args=Array.prototype.slice.call(arguments, 1);
var utils={
hasAd: function(data){
for(var i in data){
if(jQuery.isArray(data[i])){
if(data[i].length){
return true;
}}
}
return false;
},
concat: function(){
var result={};
for(var i in args){
for(var j in args[i]){
if('undefined'==typeof result[j]){
result[j]=args[i][j];
}else{
if('function'==typeof result[j].concat){
result[j]=result[j].concat(args[i][j]);
}}
}}
return result;
},
blogUseGA: function(bid){
if('ga'!=advads_tracking_methods[bid]&&false===advads_tracking_parallel[bid]){
return false;
}
if(''==advads_gatracking_uids[bid]){
return false;
}
return true;
},
adsByBlog: function(ads, bid){
var result={};
if('undefined'!=typeof ads[bid]){
result[bid]=ads[bid];
return result;
}
return {};},
};
if('function'==typeof utils[fn]){
return utils[fn].apply(null, args);
}}
function advads_track_ads(advads_ad_ids, server){
if(!advads_tracking_utils('hasAd', advads_ad_ids)) return;
if('undefined'==typeof server) server='all';
for(var bid in advads_ad_ids){
var data={
ads: advads_ad_ids[bid],
};
if(advads_tracking_utils('blogUseGA', bid)){
if('undefined'==typeof advadsGATracking){
window.advadsGATracking={};}
if('undefined'==typeof advadsGATracking.deferedAds){
window.advadsGATracking.deferedAds={};}
if('local'!=server){
advadsGATracking.deferedAds=advads_tracking_utils(
'concat',
advadsGATracking.deferedAds,
advads_tracking_utils('adsByBlog', advads_ad_ids, bid)
);
if('delayed'==server){
jQuery(document).trigger('advadsGADelayedTrack');
var passiveDelayed={};
passiveDelayed[bid]=[];
if(-1==['frontend','ga'].indexOf(advads_tracking_methods[bid])){
if(advads_tracking_utils('hasAd', advads_tracking_utils('adsByBlog', advadsGAPassiveAds, bid))){
for(var i in advads_ad_ids[bid]){
if(-1!=advadsGAPassiveAds[bid].indexOf(advads_ad_ids[bid][i])){
passiveDelayed[bid].push(advads_ad_ids[i]);
}}
}
if(passiveDelayed[bid].length){
for(var j in passiveDelayed[bid]){
advadsGAPassiveAds[bid].splice(advadsGAPassiveAds[bid].indexOf(passiveDelayed[j]), 1);
}
jQuery.post(advads_tracking_urls[bid], {ads:passiveDelayed[bid]}, function(response){});
}}
}else{
if('passive'==server &&
advads_tracking_utils('hasAd', advads_tracking_utils('adsByBlog', advads_ad_ids, bid)) &&
-1!=['onrequest','shutdown'].indexOf(advads_tracking_methods[bid])
){
jQuery.post(advads_tracking_urls[bid], data, function(response){});
}
jQuery(document).trigger('advadsGADeferedTrack');
}}
if(advads_tracking_parallel[bid]&&'analytics'!=server&&advads_tracking_methods[bid]=='frontend'){
if(advads_tracking_utils('hasAd', advads_tracking_utils('adsByBlog', advadsGAAjaxAds, bid))){
var removed=[];
for(var i in advadsGAAjaxAds[bid]){
var index=data.ads.indexOf(advadsGAAjaxAds[bid][i]);
if(-1!=index){
data.ads.splice(index, 1);
removed.push(advadsGAAjaxAds[bid][i]);
}}
if(removed.length){
for(var j in removed){
index=advadsGAAjaxAds[bid].indexOf(removed[j]);
advadsGAAjaxAds[bid].splice(index, 1);
}}
}
if(data.ads.length){
jQuery.post(advads_tracking_urls[bid], data, function(response){});
}}
}else{
if('analytics'!=server){
jQuery.post(advads_tracking_urls[bid], {ads:data.ads}, function(response){});
}}
}};
!function(a){a.fn.hoverIntent=function(b,c,d){var e={interval:100,sensitivity:6,timeout:0};e="object"==typeof b?a.extend(e,b):a.isFunction(c)?a.extend(e,{over:b,out:c,selector:d}):a.extend(e,{over:b,out:b,selector:c});var f,g,h,i,j=function(a){f=a.pageX,g=a.pageY},k=function(b,c){return c.hoverIntent_t=clearTimeout(c.hoverIntent_t),Math.sqrt((h-f)*(h-f)+(i-g)*(i-g))<e.sensitivity?(a(c).off("mousemove.hoverIntent",j),c.hoverIntent_s=!0,e.over.apply(c,[b])):(h=f,i=g,c.hoverIntent_t=setTimeout(function(){k(b,c)},e.interval),void 0)},l=function(a,b){return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=!1,e.out.apply(b,[a])},m=function(b){var c=a.extend({},b),d=this;d.hoverIntent_t&&(d.hoverIntent_t=clearTimeout(d.hoverIntent_t)),"mouseenter"===b.type?(h=c.pageX,i=c.pageY,a(d).on("mousemove.hoverIntent",j),d.hoverIntent_s||(d.hoverIntent_t=setTimeout(function(){k(c,d)},e.interval))):(a(d).off("mousemove.hoverIntent",j),d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){l(c,d)},e.timeout)))};return this.on({"mouseenter.hoverIntent":m,"mouseleave.hoverIntent":m},e.selector)}}(jQuery);
(function($){
"use strict";
$.maxmegamenu=function(menu, options){
var plugin=this;
var $menu=$(menu);
var $toggle_bar=$menu.siblings(".mega-menu-toggle");
var html_body_class_timeout;
var defaults={
event: $menu.attr("data-event"),
effect: $menu.attr("data-effect"),
effect_speed: parseInt($menu.attr("data-effect-speed")),
effect_mobile: $menu.attr("data-effect-mobile"),
effect_speed_mobile: parseInt($menu.attr("data-effect-speed-mobile")),
panel_width: $menu.attr("data-panel-width"),
panel_inner_width: $menu.attr("data-panel-inner-width"),
mobile_force_width: $menu.attr("data-mobile-force-width"),
mobile_overlay: $menu.attr("data-mobile-overlay"),
second_click: $menu.attr("data-second-click"),
vertical_behaviour: $menu.attr("data-vertical-behaviour"),
document_click: $menu.attr("data-document-click"),
breakpoint: $menu.attr("data-breakpoint"),
unbind_events: $menu.attr("data-unbind")
};
plugin.settings={};
var items_with_submenus=$("li.mega-menu-megamenu.mega-menu-item-has-children," +
"li.mega-menu-flyout.mega-menu-item-has-children," +
"li.mega-menu-tabbed > ul.mega-sub-menu > li.mega-menu-item-has-children," +
"li.mega-menu-flyout li.mega-menu-item-has-children", menu);
plugin.addAnimatingClass=function(element){
if(plugin.settings.effect==="disabled"){
return;
}
$(".mega-animating").removeClass("mega-animating");
var timeout=plugin.settings.effect_speed + parseInt(megamenu.timeout, 10);
element.addClass("mega-animating");
setTimeout(function(){
element.removeClass("mega-animating");
}, timeout);
};
plugin.hideAllPanels=function(){
$(".mega-toggle-on > a.mega-menu-link", $menu).each(function(){
plugin.hidePanel($(this), false);
});
};
plugin.hideSiblingPanels=function(anchor, immediate){
anchor.parent().parent().find(".mega-toggle-on").children("a.mega-menu-link").each(function(){
plugin.hidePanel($(this), immediate);
});
};
plugin.isDesktopView=function(){
return Math.max(window.outerWidth, $(window).width()) > plugin.settings.breakpoint;
};
plugin.isMobileView=function(){
return !plugin.isDesktopView();
};
plugin.showPanel=function(anchor){
anchor.parent().triggerHandler("before_open_panel");
anchor.attr("aria-expanded", "true");
$(".mega-animating").removeClass("mega-animating");
if(plugin.isMobileView()&&anchor.parent().hasClass("mega-hide-sub-menu-on-mobile")){
return;
}
if(plugin.isDesktopView()&&($menu.hasClass("mega-menu-horizontal")||$menu.hasClass("mega-menu-vertical"))&&!anchor.parent().hasClass("mega-collapse-children")){
plugin.hideSiblingPanels(anchor, true);
}
if((plugin.isMobileView()&&$menu.hasClass("mega-keyboard-navigation"))||plugin.settings.vertical_behaviour==="accordion"){
plugin.hideSiblingPanels(anchor, false);
}
plugin.calculateDynamicSubmenuWidths(anchor);
if(anchor.parent().hasClass("mega-collapse-children")||plugin.settings.effect==="slide" ||
(plugin.isMobileView()&&(plugin.settings.effect_mobile==="slide"||plugin.settings.effect_mobile==="slide_left"||plugin.settings.effect_mobile==="slide_right"))
){
var speed=plugin.isMobileView() ? plugin.settings.effect_speed_mobile:plugin.settings.effect_speed;
anchor.siblings(".mega-sub-menu").css("display", "none").animate({"height":"show", "paddingTop":"show", "paddingBottom":"show", "minHeight":"show"}, speed, function(){
$(this).css("display", "");
});
}
anchor.parent().addClass("mega-toggle-on").triggerHandler("open_panel");
};
plugin.hidePanel=function(anchor, immediate){
anchor.parent().triggerHandler("before_close_panel");
anchor.attr("aria-expanded", "false");
if(anchor.parent().hasClass("mega-collapse-children")||(! immediate&&plugin.settings.effect==="slide") ||
(plugin.isMobileView()&&(plugin.settings.effect_mobile==="slide"||plugin.settings.effect_mobile==="slide_left"||plugin.settings.effect_mobile==="slide_right"))
){
var speed=plugin.isMobileView() ? plugin.settings.effect_speed_mobile:plugin.settings.effect_speed;
anchor.siblings(".mega-sub-menu").animate({"height":"hide", "paddingTop":"hide", "paddingBottom":"hide", "minHeight":"hide"}, speed, function(){
anchor.siblings(".mega-sub-menu").css("display", "");
anchor.parent().removeClass("mega-toggle-on").triggerHandler("close_panel");
});
return;
}
if(immediate){
anchor.siblings(".mega-sub-menu").css("display", "none").delay(plugin.settings.effect_speed).queue(function(){
$(this).css("display", "").dequeue();
});
}
anchor.siblings(".mega-sub-menu").find(".widget_media_video video").each(function(){
this.player.pause();
});
anchor.parent().removeClass("mega-toggle-on").triggerHandler("close_panel");
plugin.addAnimatingClass(anchor.parent());
};
plugin.calculateDynamicSubmenuWidths=function(anchor){
if(anchor.parent().hasClass("mega-menu-megamenu")&&anchor.parent().parent().hasClass("max-mega-menu")&&plugin.settings.panel_width&&$(plugin.settings.panel_width).length > 0){
if(plugin.isDesktopView()){
var submenu_offset=$menu.offset();
var target_offset=$(plugin.settings.panel_width).offset();
anchor.siblings(".mega-sub-menu").css({
width: $(plugin.settings.panel_width).outerWidth(),
left: (target_offset.left - submenu_offset.left) + "px"
});
}else{
anchor.siblings(".mega-sub-menu").css({
width: "",
left: ""
});
}}
if(anchor.parent().hasClass("mega-menu-megamenu")&&anchor.parent().parent().hasClass("max-mega-menu")&&plugin.settings.panel_inner_width&&$(plugin.settings.panel_inner_width).length > 0){
var target_width=0;
if($(plugin.settings.panel_inner_width).length){
target_width=parseInt($(plugin.settings.panel_inner_width).width(), 10);
}else{
target_width=parseInt(plugin.settings.panel_inner_width, 10);
}
var submenu_width=parseInt(anchor.siblings(".mega-sub-menu").innerWidth(), 10);
if(plugin.isDesktopView()&&target_width > 0&&target_width < submenu_width){
anchor.siblings(".mega-sub-menu").css({
"paddingLeft": (submenu_width - target_width) / 2 + "px",
"paddingRight": (submenu_width - target_width) / 2 + "px"
});
}else{
anchor.siblings(".mega-sub-menu").css({
"paddingLeft": "",
"paddingRight": ""
});
}}
};
var bindClickEvents=function(){
var dragging=false;
$(document).on({
"touchmove": function(e){ dragging=true; },
"touchstart": function(e){ dragging=false; }});
$(document).on("click touchend", function(e){
if(!dragging&&plugin.settings.document_click==="collapse"&&! $(e.target).closest(".max-mega-menu li").length&&! $(e.target).closest(".mega-menu-toggle").length){
plugin.hideAllPanels();
plugin.hideMobileMenu();
}
dragging=false;
});
var collapse_children_parents=$("li.mega-menu-megamenu li.mega-menu-item-has-children.mega-collapse-children > a.mega-menu-link");
var clickable_parents=$("> a.mega-menu-link", items_with_submenus).add(collapse_children_parents);
clickable_parents.on("touchend.megamenu", function(e){
plugin.unbindHoverEvents();
plugin.unbindHoverIntentEvents();
});
clickable_parents.on("click.megamenu", function(e){
if(plugin.isDesktopView()&&$(this).parent().hasClass("mega-toggle-on")&&$(this).parent().parent().parent().hasClass("mega-menu-tabbed")){
if(plugin.settings.second_click==="go"){
return;
}else{
e.preventDefault();
return;
}}
if(dragging){
return;
}
if(plugin.isMobileView()&&$(this).parent().hasClass("mega-hide-sub-menu-on-mobile")){
return;
}
if((plugin.settings.second_click==="go"||$(this).parent().hasClass("mega-click-click-go"))&&$(this).attr("href")!==undefined){
if(!$(this).parent().hasClass("mega-toggle-on")){
e.preventDefault();
plugin.showPanel($(this));
}}else{
e.preventDefault();
if($(this).parent().hasClass("mega-toggle-on")){
plugin.hidePanel($(this), false);
}else{
plugin.showPanel($(this));
}}
});
};
var bindHoverEvents=function(){
items_with_submenus.on({
"mouseenter.megamenu":function(){
plugin.unbindClickEvents();
if(! $(this).hasClass("mega-toggle-on")){
plugin.showPanel($(this).children("a.mega-menu-link"));
}},
"mouseleave.megamenu":function(){
if($(this).hasClass("mega-toggle-on")&&! $(this).hasClass("mega-disable-collapse")&&! $(this).parent().parent().hasClass("mega-menu-tabbed")){
plugin.hidePanel($(this).children("a.mega-menu-link"), false);
}}
});
};
var bindHoverIntentEvents=function(){
items_with_submenus.hoverIntent({
over: function (){
plugin.unbindClickEvents();
if(! $(this).hasClass("mega-toggle-on")){
plugin.showPanel($(this).children("a.mega-menu-link"));
}},
out: function (){
if($(this).hasClass("mega-toggle-on")&&! $(this).hasClass("mega-disable-collapse")&&! $(this).parent().parent().hasClass("mega-menu-tabbed")){
plugin.hidePanel($(this).children("a.mega-menu-link"), false);
}},
timeout: megamenu.timeout,
interval: megamenu.interval
});
};
var bindKeyboardEvents=function(){
var tab_key=9;
var escape_key=27;
var enter_key=13;
var left_arrow_key=37;
var right_arrow_key=39;
var space_key=32;
$menu.parent().on("keyup.megamenu", function(e){
var keyCode=e.keyCode||e.which;
if(keyCode===tab_key){
$menu.parent().addClass("mega-keyboard-navigation");
}});
$menu.parent().on("keydown.megamenu", function(e){
var keyCode=e.keyCode||e.which;
var active_link=$(e.target);
if(keyCode===space_key&&active_link.is(".mega-menu-link")&&$menu.parent().hasClass("mega-keyboard-navigation")){
e.preventDefault();
if(active_link.parent().is(items_with_submenus)){
if(active_link.parent().hasClass("mega-toggle-on")&&! active_link.parent().parent().parent().hasClass("mega-menu-tabbed")){
plugin.hidePanel(active_link);
}else{
plugin.showPanel(active_link);
}}
}});
$menu.parent().on("keyup.megamenu", function(e){
var keyCode=e.keyCode||e.which;
var active_link=$(e.target);
if(keyCode===tab_key&&$menu.parent().hasClass("mega-keyboard-navigation")){
if(active_link.parent().is(items_with_submenus)&&active_link.is("[href]")!==false){
plugin.showPanel(active_link);
}else{
if(! active_link.parent().parent().parent().hasClass("mega-menu-tabbed")){
plugin.hideSiblingPanels(active_link);
}}
}
if(keyCode===escape_key&&$menu.parent().hasClass("mega-keyboard-navigation")){
var submenu_open=$("> .mega-toggle-on", $menu).length!==0;
$("> .mega-toggle-on > a.mega-menu-link", $menu).focus();
plugin.hideAllPanels();
if(plugin.isMobileView()&&! submenu_open){
plugin.hideMobileMenu();
$(".mega-menu-toggle-block, button.mega-toggle-animated", $toggle_bar).first().focus();
}}
if(keyCode===enter_key&&$menu.parent().hasClass("mega-keyboard-navigation")){
if(active_link.hasClass("mega-menu-toggle-block")){
if($toggle_bar.hasClass("mega-menu-open")){
plugin.hideMobileMenu();
}else{
plugin.showMobileMenu();
}}
if(active_link.parent().is(items_with_submenus)&&active_link.is("[href]")===false){
if(active_link.parent().hasClass("mega-toggle-on")&&! active_link.parent().parent().parent().hasClass("mega-menu-tabbed")){
plugin.hidePanel(active_link);
}else{
plugin.showPanel(active_link);
}}
}
if(keyCode===right_arrow_key&&plugin.isDesktopView()&&$menu.parent().hasClass("mega-keyboard-navigation")&&$menu.hasClass("mega-menu-horizontal")){
var next_top_level_item=$("> .mega-toggle-on", $menu).nextAll("li.mega-menu-item:visible").find("> a.mega-menu-link, .mega-search input[type=text]").first();
if(next_top_level_item.length===0){
next_top_level_item=$(":focus", $menu).parent().nextAll("li.mega-menu-item:visible").find("> a.mega-menu-link, .mega-search input[type=text]").first();
}
next_top_level_item.focus();
if(next_top_level_item.parent().is(items_with_submenus)&&next_top_level_item.is("[href]")!==false){
plugin.showPanel(next_top_level_item);
}else{
plugin.hideSiblingPanels(next_top_level_item);
}}
if(keyCode===left_arrow_key&&plugin.isDesktopView()&&$menu.parent().hasClass("mega-keyboard-navigation")&&$menu.hasClass("mega-menu-horizontal")){
var prev_top_level_item=$("> .mega-toggle-on", $menu).prevAll("li.mega-menu-item:visible").find("> a.mega-menu-link, .mega-search input[type=text]").last();
if(prev_top_level_item.length===0){
prev_top_level_item=$(":focus", $menu).parent().prevAll("li.mega-menu-item:visible").find("> a.mega-menu-link, .mega-search input[type=text]").last();
}
prev_top_level_item.focus();
if(prev_top_level_item.parent().is(items_with_submenus)&&prev_top_level_item.is("[href]")!==false){
plugin.showPanel(prev_top_level_item);
}else{
plugin.hideSiblingPanels(prev_top_level_item);
}}
});
$menu.parent().on("focusout.megamenu", function(e){
if($menu.parent().hasClass("mega-keyboard-navigation")){
setTimeout(function(){
var menu_has_focus=$menu.parent().find(":focus").length > 0;
if(! menu_has_focus){
$menu.parent().removeClass("mega-keyboard-navigation");
plugin.hideAllPanels();
plugin.hideMobileMenu();
}}, 10);
}});
};
plugin.unbindAllEvents=function(){
$("ul.mega-sub-menu, li.mega-menu-item, li.mega-menu-row, li.mega-menu-column, a.mega-menu-link, span.mega-indicator", menu).off().unbind();
};
plugin.unbindClickEvents=function(){
$("> a.mega-menu-link", items_with_submenus).off("click.megamenu touchend.megamenu");
};
plugin.unbindHoverEvents=function(){
items_with_submenus.unbind("mouseenter.megamenu mouseleave.megamenu");
};
plugin.unbindHoverIntentEvents=function(){
items_with_submenus.unbind("mouseenter mouseleave").removeProp("hoverIntent_t").removeProp("hoverIntent_s");
};
plugin.unbindKeyboardEvents=function(){
$menu.parent().off("keyup.megamenu keydown.megamenu focusout.megamenu");
};
plugin.unbindMegaMenuEvents=function(){
if(plugin.settings.event==="hover_intent"){
plugin.unbindHoverIntentEvents();
}
if(plugin.settings.event==="hover"){
plugin.unbindHoverEvents();
}
plugin.unbindClickEvents();
plugin.unbindKeyboardEvents();
};
plugin.bindMegaMenuEvents=function(){
if(plugin.isDesktopView()&&plugin.settings.event==="hover_intent"){
bindHoverIntentEvents();
}
if(plugin.isDesktopView()&&plugin.settings.event==="hover"){
bindHoverEvents();
}
bindClickEvents();
bindKeyboardEvents();
};
plugin.monitorView=function(){
if(plugin.isDesktopView()){
$menu.data("view", "desktop");
}else{
$menu.data("view", "mobile");
plugin.switchToMobile();
}
plugin.checkWidth();
$(window).resize(function(){
plugin.checkWidth();
});
};
plugin.checkWidth=function(){
if(plugin.isMobileView()&&$menu.data("view")==="desktop"){
$menu.data("view", "mobile");
plugin.switchToMobile();
}
if(plugin.isDesktopView()&&$menu.data("view")==="mobile"){
$menu.data("view", "desktop");
plugin.switchToDesktop();
}
plugin.calculateDynamicSubmenuWidths($("> li.mega-menu-megamenu > a.mega-menu-link", $menu));
};
plugin.reverseRightAlignedItems=function(){
if(! $("body").hasClass("rtl")){
$menu.append($menu.children("li.mega-item-align-right").get().reverse());
}};
plugin.addClearClassesToMobileItems=function(){
$(".mega-menu-row", $menu).each(function(){
$("> .mega-sub-menu > .mega-menu-column:not(.mega-hide-on-mobile)", $(this)).filter(":even").addClass("mega-menu-clear");
});
};
plugin.switchToMobile=function(){
plugin.unbindMegaMenuEvents();
plugin.bindMegaMenuEvents();
plugin.reverseRightAlignedItems();
plugin.addClearClassesToMobileItems();
plugin.hideAllPanels();
};
plugin.switchToDesktop=function(){
plugin.unbindMegaMenuEvents();
plugin.bindMegaMenuEvents();
plugin.reverseRightAlignedItems();
plugin.hideAllPanels();
$menu.css({
width: "",
left: "",
display: ""
});
$toggle_bar.removeClass("mega-menu-open");
};
plugin.initToggleBar=function(){
$toggle_bar.on("click", function(e){
if($(e.target).is(".mega-menu-toggle, .mega-menu-toggle-block, .mega-menu-toggle-animated-block, .mega-menu-toggle-animated-block *, .mega-toggle-blocks-left, .mega-toggle-blocks-center, .mega-toggle-blocks-right, .mega-toggle-label, .mega-toggle-label span")){                    if($(this).hasClass("mega-menu-open")){
plugin.hideMobileMenu();
}else{
plugin.showMobileMenu();
}}
});
};
plugin.hideMobileMenu=function(){
if(! $toggle_bar.is(":visible")){
return;
}
html_body_class_timeout=setTimeout(function(){
$("body").removeClass($menu.attr("id") + "-mobile-open");
$("html").removeClass($menu.attr("id") + "-off-canvas-open");
}, plugin.settings.effect_speed_mobile);
$(".mega-toggle-label, .mega-toggle-animated", $toggle_bar).attr("aria-expanded", "false");
if(plugin.settings.effect_mobile==="slide"){
$menu.animate({"height":"hide"}, plugin.settings.effect_speed_mobile, function(){
$menu.css({
width: "",
left: "",
display: ""
});
});
}
$toggle_bar.removeClass("mega-menu-open");
};
plugin.showMobileMenu=function(){
if(! $toggle_bar.is(":visible")){
return;
}
clearTimeout(html_body_class_timeout);
$("body").addClass($menu.attr("id") + "-mobile-open");
if(plugin.settings.effect_mobile==="slide_left"||plugin.settings.effect_mobile==="slide_right"){
$("html").addClass($menu.attr("id") + "-off-canvas-open");
}
$(".mega-toggle-label, .mega-toggle-animated", $toggle_bar).attr("aria-expanded", "true");
plugin.toggleBarForceWidth();
if(plugin.settings.effect_mobile==="slide"){
$menu.animate({"height":"show"}, plugin.settings.effect_speed_mobile);
}
$toggle_bar.addClass("mega-menu-open");
};
plugin.toggleBarForceWidth=function(){
if($(plugin.settings.mobile_force_width).length&&(plugin.settings.effect_mobile=='slide'||plugin.settings.effect_mobile=='disabled')){
var submenu_offset=$toggle_bar.offset();
var target_offset=$(plugin.settings.mobile_force_width).offset();
$menu.css({
width: $(plugin.settings.mobile_force_width).outerWidth(),
left: (target_offset.left - submenu_offset.left) + "px"
});
}};
plugin.init=function(){
$menu.triggerHandler("before_mega_menu_init");
plugin.settings=$.extend({}, defaults, options);
$menu.removeClass("mega-no-js");
plugin.initToggleBar();
if(plugin.settings.unbind_events==="true"){
plugin.unbindAllEvents();
}
$("span.mega-indicator", $menu).on("click.megamenu", function(e){
e.preventDefault();
e.stopPropagation();
if($(this).parent().parent().hasClass("mega-toggle-on")){
if(! $(this).parent().parent().parent().parent().hasClass("mega-menu-tabbed")||plugin.isMobileView()){
plugin.hidePanel($(this).parent(), false);
}}else{
plugin.showPanel($(this).parent(), false);
}});
$(window).on("load", function(){
plugin.calculateDynamicSubmenuWidths($("> li.mega-menu-megamenu > a.mega-menu-link", $menu));
});
plugin.bindMegaMenuEvents();
plugin.monitorView();
$menu.triggerHandler("after_mega_menu_init");
};
plugin.init();
};
$.fn.maxmegamenu=function(options){
return this.each(function(){
if(undefined===$(this).data("maxmegamenu")){
var plugin=new $.maxmegamenu(this, options);
$(this).data("maxmegamenu", plugin);
}});
};
$(function(){
$(".max-mega-menu").maxmegamenu();
});
}(jQuery));
;(function($){
"use strict";
var HOST='https://www.google-analytics.com';
var BATCH_PATH='/batch';
var COLLECT_PATH='/collect';
var CLICK_TIMEOUT=1000;
var CLICK_TIMER=null;
var clickReqObj=null;
var getQS=function(URL){
var l=document.createElement("a");
l.href=URL;
var QS=l.search;
if(QS.length){
QS=QS.substr(1);
QS=QS.split('&');
if(QS.length){
var results={};
for(var i in QS){
var exp=QS[ i ].split('=');
results[ exp[0] ]=exp[1];
}
return results;
}else{
return [];
}
return QS;
}else{
return [];
}};
var appendQS=function(URL, QS){
for(var i in QS){
if(-1!==URL.indexOf('?')){
URL +='&' + i + '=' + QS[i];
}else{
URL +='?' + i + '=' + QS[i];
}}
return URL;
}
function abortAndRedirect(url){
if(null!==CLICK_TIMER){
clearTimeout(CLICK_TIMER);
CLICK_TIMER=null;
}
if(null!==clickReqObj){
clickReqObj.abort();
clickReqObj==null;
}
window.location=url;
}
var advadsTracker=function(name, blogId, UID){
this.name=name;
this.blogId=blogId
this.cid=false;
this.UID=UID;
this.analyticsObject=null;
var that=this;
this.normalTrackingDone=false;
this.analyticsObject=('string'==typeof(GoogleAnalyticsObject)&&'function'==typeof(window[GoogleAnalyticsObject]))? window[GoogleAnalyticsObject]:false;
if(false===this.analyticsObject){
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','_advads_ga');
_advads_ga('create', this.UID, 'auto', this.name);
if(advads_gatracking_anonym){
_advads_ga('set', 'anonymizeIp', true);
}
_advads_ga(function(){
var tracker=_advads_ga.getByName(that.name);
that.readyCB(tracker);
});
}else{
window[GoogleAnalyticsObject]('create', this.UID, 'auto', this.name);
if(advads_gatracking_anonym){
window[GoogleAnalyticsObject]('set', 'anonymizeIp', true);
}
window[GoogleAnalyticsObject](function(){
var tracker=window[GoogleAnalyticsObject].getByName(that.name);
that.readyCB(tracker);
});
}
return this;
}
advadsTracker.prototype={
contructor: advadsTracker,
hasCid: function(){
return(this.cid&&''!==this.cid);
},
readyCB: function(tracker){
var that=this;
this.cid=tracker.get('clientId');
$(document).on('advadsGADeferedTrack', function(args){
that.trackImpressions(false);
});
$(document).on('advadsGADelayedTrack', function(){
that.trackImpressions(true);
});
this.trackImpressions();
},
trackImpressions: function(delayed){
if('undefined'==typeof delayed){
delayed=false;
}
var trackedAds=[];
if(!this.normalTrackingDone &&
advads_tracking_utils(
'hasAd',
advads_tracking_utils('adsByBlog', advads_tracking_ads, this.blogId)
)
){
trackedAds=trackedAds.concat(advads_tracking_ads[this.blogId]);
}
if('frontend'==advads_tracking_methods[this.blogId]){
trackedAds=[];
}
if(delayed){
if('undefined'!=typeof advadsGATracking.delayedAds &&
advads_tracking_utils(
'hasAd',
advads_tracking_utils(
'adsByBlog',
advadsGATracking.delayedAds,
this.blogId
)
)
){
trackedAds=trackedAds.concat(advadsGATracking.delayedAds[this.blogId]);
advadsGATracking.delayedAds[this.blogId]=[];
}}else{
if('undefined'!=typeof advadsGATracking.deferedAds &&
advads_tracking_utils(
'hasAd',
advads_tracking_utils(
'adsByBlog',
advadsGATracking.deferedAds,
this.blogId
)
)
){
trackedAds=trackedAds.concat(advadsGATracking.deferedAds[this.blogId]);
advadsGATracking.deferedAds[this.blogId]=[];
}}
if(!trackedAds.length){
return;
}
if(! this.hasCid()){
console.log(' Advads Tracking >> no clientID. aborting ...');
return;
}
var trackBaseData={
v: 1,
tid: this.UID,
cid: this.cid,
t: 'event',
ni: 1,
ec: 'Advanced Ads',
ea: advadsGALocale.Impressions,
dl: document.location.origin + document.location.pathname,
dp: document.location.pathname,
};
var payload="";
for(var i in trackedAds){
if(undefined!==advads_gatracking_allads[this.blogId][trackedAds[i]]){
var adInfo={
el: '[' + trackedAds[i] + '] ' + advads_gatracking_allads[this.blogId][trackedAds[i]]['title'],
};
var adParam=$.extend({}, trackBaseData, adInfo);
payload +=$.param(adParam) + "\n";
}}
if(payload.length){
$.post(HOST + BATCH_PATH,
payload
);
}
if(!this.normalTrackingDone) this.normalTrackingDone=true;
},
trackClick: function(id, serverSide, ev, el){
if(! this.hasCid()){
console.log(' Advads Tracking >> no clientID. aborting ...');
return;
}
if(undefined===serverSide) serverSide=true;
var trackData={
v: 1,
tid: this.UID,
cid: this.cid,
t: 'event',
ni: 1,
ec: 'Advanced Ads',
ea: advadsGALocale.Clicks,
el: '[' + id + '] ' + advads_gatracking_allads[this.blogId][id]['title'],
dl: document.location.origin + document.location.pathname,
dp: document.location.pathname,
};
var payload=$.param(trackData);
var url=advads_gatracking_allads[this.blogId][id]['target']
if('undefined'!=typeof advadsGATracking.postContext){
url=url.replace('[CAT_SLUG]', advadsGATracking.postContext.cats);
url=url.replace('[POST_ID]', advadsGATracking.postContext.postID);
url=url.replace('[POST_SLUG]', advadsGATracking.postContext.postSlug);
}
url=url.replace('[AD_ID]', id);
var pageQS=getQS(document.location.href);
var linkQS=getQS($(el).attr('href'));
url=appendQS(url, linkQS);
if('undefined'!=typeof advads_gatracking_transmitpageqs&&'undefined'!=typeof advads_gatracking_transmitpageqs[ this.blogId ]){
if(true===advads_gatracking_transmitpageqs[ this.blogId ][ id ]){
url=appendQS(url, pageQS);
}}
if(serverSide){
url=$(el).attr('href');
}
var newTab=($(el).attr('target'))? true:false;
if(newTab){
$.post(HOST + COLLECT_PATH, payload);
if(!serverSide){
$(el).attr('href', url);
}}else{
ev.preventDefault();
if(null===CLICK_TIMER&&null===clickReqObj){
CLICK_TIMER=setTimeout(function(){
abortAndRedirect(url, newTab);
}, CLICK_TIMEOUT);
clickReqObj=$.post(HOST + COLLECT_PATH,
payload,
function(){
clearTimeout(CLICK_TIMER);
CLICK_TIMER=null;
clickReqObj=null;
abortAndRedirect(url);
}
);
}}
},
}
$(function(){
for(var bid in advads_tracking_methods){
var bid=parseInt(bid);
if(isNaN(bid)){
continue;
}
if(advads_tracking_utils('blogUseGA', bid)){
var tracker=new advadsTracker('advadsTracker_' + bid, bid, advads_gatracking_uids[bid]);
(function(_bid, _tracker){
var base=advads_tracking_linkbases[_bid];
var baseSelector='a[href^="' + advads_tracking_linkbases[_bid] + '"]';
if(-1==base.indexOf('://')){
baseSelector='a[href*="' + base + '="]';
}
$(document).on('click', baseSelector + '[data-bid="' + _bid + '"]', function(ev){
var id=0;
if(-1==base.indexOf('://')){
var regex=new RegExp(base + '=(\\d+)');
var link=$(this).attr('href');
var M=link.match(regex);
if(M&&'undefined'!=typeof M[1]){
id=M[1];
id=parseInt(id);
}}else{
id=$(this).attr('href').split(advads_tracking_linkbases[_bid]);
id=parseInt(id[1]);
}
if('undefined'!=typeof advads_gatracking_allads[_bid][id]&&advads_gatracking_allads[_bid][id]['target']){
var serverSide=true;
if('ga'==advads_tracking_methods[_bid]){
serverSide=false;
}
_tracker.trackClick(id, serverSide, ev, this);
}});
})(bid, tracker);
}}
});
})(jQuery);
!function(a,b){"use strict";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf("MSIE 10"),h=!!navigator.userAgent.match(/Trident.*rv:11\./),i=b.querySelectorAll("iframe.wp-embedded-content");for(c=0;c<i.length;c++){if(d=i[c],!d.getAttribute("data-secret"))f=Math.random().toString(36).substr(2,10),d.src+="#?secret="+f,d.setAttribute("data-secret",f);if(g||h)a=d.cloneNode(!0),a.removeAttribute("security"),d.parentNode.replaceChild(a,d)}}}var d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var d=c.data;if(d)if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret="'+d.secret+'"]'),k=b.querySelectorAll('blockquote[data-secret="'+d.secret+'"]');for(e=0;e<k.length;e++)k[e].style.display="none";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute("style"),"height"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else if(~~g<200)g=200;f.height=g}if("link"===d.message)if(h=b.createElement("a"),i=b.createElement("a"),h.href=f.getAttribute("src"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener("message",a.wp.receiveEmbedMessage,!1),b.addEventListener("DOMContentLoaded",c,!1),a.addEventListener("load",c,!1)}(window,document);
var ak_js=document.getElementById("ak_js");
if(! ak_js){
ak_js=document.createElement('input');
ak_js.setAttribute('id', 'ak_js');
ak_js.setAttribute('name', 'ak_js');
ak_js.setAttribute('type', 'hidden');
}else{
ak_js.parentNode.removeChild(ak_js);
}
ak_js.setAttribute('value',(new Date()).getTime());
var commentForm=document.getElementById('commentform');
if(commentForm){
commentForm.appendChild(ak_js);
}else{
var replyRowContainer=document.getElementById('replyrow');
if(replyRowContainer){
var children=replyRowContainer.getElementsByTagName('td');
if(children.length > 0){
children[0].appendChild(ak_js);
}}
};