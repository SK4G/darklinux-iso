var background=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=23)}([function(e,t,r){var n=r(10),o=r(11),i=r(12),a=r(13);e.exports=function(e){return n(e)||o(e)||i(e)||a()}},function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},function(e,t,r){"use strict";(function(e,n){var o,i=r(9);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:n;var a=Object(i.a)(o);t.a=a}).call(this,r(4),r(22)(e))},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.DISPATCH_TYPE="chromex.dispatch",t.STATE_TYPE="chromex.state",t.PATCH_STATE_TYPE="chromex.patch_state"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=t.noop=function(e){return e},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;return n({},e,e.payload?{payload:t(e.payload)}:{})},a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o,r=arguments[2];return r?function(n){for(var o=arguments.length,a=Array(o>1?o-1:0),u=1;u<o;u++)a[u-1]=arguments[u];return r.apply(void 0,[n].concat(a))?e.apply(void 0,[i(n,t)].concat(a)):e.apply(void 0,[n].concat(a))}:function(r){for(var n=arguments.length,o=Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return e.apply(void 0,[i(r,t)].concat(o))}};t.withDeserializer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;return function(t){return function(r,n){return t(a(r,e,n))}}},t.withSerializer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;return function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(){for(var n=arguments.length,o=Array(n),a=0;a<n;a++)o[a]=arguments[a];if(o.length<=r)throw new Error("Message in request could not be serialized. Expected message in position "+r+" but only received "+o.length+" args.");return o[r]=i(o[r],e),t.apply(void 0,o)}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.DIFF_STATUS_UPDATED="updated",t.DIFF_STATUS_REMOVED="removed",t.DIFF_STATUS_KEYS_UPDATED="updated_keys"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.alias=t.wrapStore=t.applyMiddleware=t.Store=void 0;var n=u(r(15)),o=u(r(18)),i=u(r(19)),a=u(r(21));function u(e){return e&&e.__esModule?e:{default:e}}t.Store=n.default,t.applyMiddleware=o.default,t.wrapStore=i.default,t.alias=a.default},function(e,t,r){"use strict";function n(e){var t,r=e.Symbol;return"function"==typeof r?r.observable?t=r.observable:(t=r("observable"),r.observable=t):t="@@observable",t}r.d(t,"a",(function(){return n}))},function(e,t,r){var n=r(3);e.exports=function(e){if(Array.isArray(e))return n(e)}},function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},function(e,t,r){var n=r(3);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,r){(function(e){!function(t){"use strict";function r(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function o(e,t,r){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function i(e,t){i.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function a(e,t){a.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function u(e,t,r){u.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function c(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function s(e){var t=void 0===e?"undefined":S(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function f(e,t,r,n,l,d,p){p=p||[];var h=(l=l||[]).slice(0);if(void 0!==d){if(n){if("function"==typeof n&&n(h,d))return;if("object"===(void 0===n?"undefined":S(n))){if(n.prefilter&&n.prefilter(h,d))return;if(n.normalize){var v=n.normalize(h,d,e,t);v&&(e=v[0],t=v[1])}}}h.push(d)}"regexp"===s(e)&&"regexp"===s(t)&&(e=e.toString(),t=t.toString());var y=void 0===e?"undefined":S(e),g=void 0===t?"undefined":S(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==g||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new i(h,t));else if(!m&&b)r(new a(h,e));else if(s(e)!==s(t))r(new o(h,e,t));else if("date"===s(e)&&e-t!=0)r(new o(h,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter((function(t){return t.lhs===e})).length)e!==t&&r(new o(h,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;for(e.length,w=0;w<e.length;w++)w>=t.length?r(new u(h,w,new a(void 0,e[w]))):f(e[w],t[w],r,n,h,w,p);for(;w<t.length;)r(new u(h,w,new i(void 0,t[w++])))}else{var E=Object.keys(e),O=Object.keys(t);E.forEach((function(o,i){var a=O.indexOf(o);a>=0?(f(e[o],t[o],r,n,h,o,p),O=c(O,a)):f(e[o],void 0,r,n,h,o,p)})),O.forEach((function(e){f(void 0,t[e],r,n,h,e,p)}))}p.length=p.length-1}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new o(h,e,t)))}function l(e,t,r,n){return n=n||[],f(e,t,(function(e){e&&n.push(e)}),r),n.length?n:void 0}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)void 0===n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":!function e(t,r,n){if(n.path&&n.path.length){var o,i=t[r],a=n.path.length-1;for(o=0;o<a;o++)i=i[n.path[o]];switch(n.kind){case"A":e(i[n.path[o]],n.index,n.item);break;case"D":delete i[n.path[o]];break;case"E":case"N":i[n.path[o]]=n.rhs}}else switch(n.kind){case"A":e(t[r],n.index,n.item);break;case"D":t=c(t,r);break;case"E":case"N":t[r]=n.rhs}return t}(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function p(e){return"color: "+j[e].color+"; font-weight: bold"}function h(e,t,r,n){var o=l(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach((function(e){var t=e.kind,n=function(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"\u2192",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}(e);r.log.apply(r,["%c "+j[t].text,p(t)].concat(T(n)))})):r.log("\u2014\u2014 no diff \u2014\u2014");try{r.groupEnd()}catch(e){r.log("\u2014\u2014 diff end \u2014\u2014 ")}}function v(e,t,r,n){switch(void 0===e?"undefined":S(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,T(r)):e[n];case"function":return e(t);default:return e}}function y(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?function(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}(t):o,a=t.collapsed,u=t.colors,c=t.level,s=t.diff,f=void 0===t.titleFormatter;e.forEach((function(o,l){var d=o.started,p=o.startedTime,y=o.action,g=o.prevState,b=o.error,m=o.took,w=o.nextState,O=e[l+1];O&&(w=O.prevState,m=O.started-d);var S=n(y),T="function"==typeof a?a((function(){return w}),y,o):a,_=E(p),j=u.title?"color: "+u.title(S)+";":"",P=["color: gray; font-weight: lighter;"];P.push(j),t.timestamp&&P.push("color: gray; font-weight: lighter;"),t.duration&&P.push("color: gray; font-weight: lighter;");var A=i(S,_,m);try{T?u.title&&f?r.groupCollapsed.apply(r,["%c "+A].concat(P)):r.groupCollapsed(A):u.title&&f?r.group.apply(r,["%c "+A].concat(P)):r.group(A)}catch(e){r.log(A)}var x=v(c,S,[g],"prevState"),D=v(c,S,[S],"action"),I=v(c,S,[b,g],"error"),N=v(c,S,[w],"nextState");if(x)if(u.prevState){var k="color: "+u.prevState(g)+"; font-weight: bold";r[x]("%c prev state",k,g)}else r[x]("prev state",g);if(D)if(u.action){var R="color: "+u.action(S)+"; font-weight: bold";r[D]("%c action    ",R,S)}else r[D]("action    ",S);if(b&&I)if(u.error){var M="color: "+u.error(b,g)+"; font-weight: bold;";r[I]("%c error     ",M,b)}else r[I]("error     ",b);if(N)if(u.nextState){var C="color: "+u.nextState(w)+"; font-weight: bold";r[N]("%c next state",C,w)}else r[N]("next state",w);s&&h(g,w,r,T);try{r.groupEnd()}catch(e){r.log("\u2014\u2014 log end \u2014\u2014")}}))}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},P,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,u=t.diffPredicate;if(void 0===r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return function(){return function(e){return function(t){return e(t)}}};var c=[];return function(e){var r=e.getState;return function(e){return function(s){if("function"==typeof i&&!i(r,s))return e(s);var f={};c.push(f),f.started=O.now(),f.startedTime=new Date,f.prevState=n(r()),f.action=s;var l=void 0;if(a)try{l=e(s)}catch(e){f.error=o(e)}else l=e(s);f.took=O.now()-f.started,f.nextState=n(r());var d=t.diff&&"function"==typeof u?u(r,s):t.diff;if(y(c,Object.assign({},t,{diff:d})),c.length=0,f.error)throw f.error;return l}}}}var b,m,w=function(e,t){return function(e,t){return new Array(t+1).join(e)}("0",t-e.toString().length)+e},E=function(e){return w(e.getHours(),2)+":"+w(e.getMinutes(),2)+":"+w(e.getSeconds(),2)+"."+w(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},_=[];b="object"===(void 0===e?"undefined":S(e))&&e?e:"undefined"!=typeof window?window:{},(m=b.DeepDiff)&&_.push((function(){void 0!==m&&b.DeepDiff===l&&(b.DeepDiff=m,m=void 0)})),r(o,n),r(i,n),r(a,n),r(u,n),Object.defineProperties(l,{diff:{value:l,enumerable:!0},observableDiff:{value:f,enumerable:!0},applyDiff:{value:function(e,t,r){e&&t&&f(e,t,(function(n){r&&!r(e,t,n)||d(e,t,n)}))},enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:function(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)void 0===i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":!function e(t,r,n){if(n.path&&n.path.length){var o,i=t[r],a=n.path.length-1;for(o=0;o<a;o++)i=i[n.path[o]];switch(n.kind){case"A":e(i[n.path[o]],n.index,n.item);break;case"D":case"E":i[n.path[o]]=n.lhs;break;case"N":delete i[n.path[o]]}}else switch(n.kind){case"A":e(t[r],n.index,n.item);break;case"D":case"E":t[r]=n.lhs;break;case"N":t=c(t,r)}return t}(i[r.path[n]],r.index,r.item);break;case"D":case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}},enumerable:!0},isConflict:{value:function(){return void 0!==m},enumerable:!0},noConflict:{value:function(){return _&&(_.forEach((function(e){e()})),_=null),l},enumerable:!0}});var j={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},P={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?g()({dispatch:t,getState:r}):void 0};t.defaults=P,t.createLogger=g,t.logger=A,t.default=A,Object.defineProperty(t,"__esModule",{value:!0})}(t)}).call(this,r(4))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=c(r(16)),i=r(5),a=r(6),u=c(r(17));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(){function e(t){var r=this,n=t.portName,o=t.state,c=void 0===o?{}:o,s=t.extensionId,f=void 0===s?null:s,l=t.serializer,d=void 0===l?a.noop:l,p=t.deserializer,h=void 0===p?a.noop:p,v=t.patchStrategy,y=void 0===v?u.default:v;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),!n)throw new Error("portName is required in options");if("function"!=typeof d)throw new Error("serializer must be a function");if("function"!=typeof h)throw new Error("deserializer must be a function");if("function"!=typeof y)throw new Error("patchStrategy must be one of the included patching strategies or a custom patching function");this.portName=n,this.readyResolved=!1,this.readyPromise=new Promise((function(e){return r.readyResolve=e})),this.extensionId=f,this.port=chrome.runtime.connect(this.extensionId,{name:n}),this.safetyHandler=this.safetyHandler.bind(this),this.safetyMessage=chrome.runtime.onMessage.addListener(this.safetyHandler),this.serializedPortListener=(0,a.withDeserializer)(h)((function(){var e;return(e=r.port.onMessage).addListener.apply(e,arguments)})),this.serializedMessageSender=(0,a.withSerializer)(d)((function(){var e;return(e=chrome.runtime).sendMessage.apply(e,arguments)}),1),this.listeners=[],this.state=c,this.patchStrategy=y,this.serializedPortListener((function(e){switch(e.type){case i.STATE_TYPE:r.replaceState(e.payload),r.readyResolved||(r.readyResolved=!0,r.readyResolve());break;case i.PATCH_STATE_TYPE:r.patchState(e.payload)}})),this.dispatch=this.dispatch.bind(this)}return n(e,[{key:"ready",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null!==e?this.readyPromise.then(e):this.readyPromise}},{key:"subscribe",value:function(e){var t=this;return this.listeners.push(e),function(){t.listeners=t.listeners.filter((function(t){return t!==e}))}}},{key:"patchState",value:function(e){this.state=this.patchStrategy(this.state,e),this.listeners.forEach((function(e){return e()}))}},{key:"replaceState",value:function(e){this.state=e,this.listeners.forEach((function(e){return e()}))}},{key:"getState",value:function(){return this.state}},{key:"replaceReducer",value:function(){}},{key:"dispatch",value:function(e){var t=this;return new Promise((function(r,n){t.serializedMessageSender(t.extensionId,{type:i.DISPATCH_TYPE,portName:t.portName,payload:e},null,(function(e){var t=e.error,i=e.value;if(t){var a=new Error("\nLooks like there is an error in the background page. You might want to inspect your background page for more details.\n"+t);n((0,o.default)(a,t))}else r(i&&i.payload)}))}))}},{key:"safetyHandler",value:function(e){"storeReady"===e.action&&(chrome.runtime.onMessage.removeListener(this.safetyHandler),this.readyResolved||(this.readyResolved=!0,this.readyResolve()))}}]),e}();t.default=s},function(e,t){var r=/^(?:0|[1-9]\d*)$/;function n(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}var o=Object.prototype,i=o.hasOwnProperty,a=o.toString,u=o.propertyIsEnumerable,c=Math.max;function s(e,t){var r=h(e)||function(e){return function(e){return function(e){return!!e&&"object"==typeof e}(e)&&v(e)}(e)&&i.call(e,"callee")&&(!u.call(e,"callee")||"[object Arguments]"==a.call(e))}(e)?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],n=r.length,o=!!n;for(var c in e)!t&&!i.call(e,c)||o&&("length"==c||d(c,n))||r.push(c);return r}function f(e,t,r){var n=e[t];i.call(e,t)&&p(n,r)&&(void 0!==r||t in e)||(e[t]=r)}function l(e){if(!y(e))return function(e){var t=[];if(null!=e)for(var r in Object(e))t.push(r);return t}(e);var t,r,n,a=(r=(t=e)&&t.constructor,n="function"==typeof r&&r.prototype||o,t===n),u=[];for(var c in e)("constructor"!=c||!a&&i.call(e,c))&&u.push(c);return u}function d(e,t){return!!(t=null==t?9007199254740991:t)&&("number"==typeof e||r.test(e))&&e>-1&&e%1==0&&e<t}function p(e,t){return e===t||e!=e&&t!=t}var h=Array.isArray;function v(e){return null!=e&&function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}(e.length)&&!function(e){var t=y(e)?a.call(e):"";return"[object Function]"==t||"[object GeneratorFunction]"==t}(e)}function y(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var g,b,m,w=(g=function(e,t){!function(e,t,r,n){r||(r={});for(var o=-1,i=t.length;++o<i;){var a=t[o],u=n?n(r[a],e[a],a,r,e):void 0;f(r,a,void 0===u?e[a]:u)}}(t,function(e){return v(e)?s(e,!0):l(e)}(t),e)},b=function(e,t){var r=-1,n=t.length,o=n>1?t[n-1]:void 0,i=n>2?t[2]:void 0;for(o=g.length>3&&"function"==typeof o?(n--,o):void 0,i&&function(e,t,r){if(!y(r))return!1;var n=typeof t;return!!("number"==n?v(r)&&d(t,r.length):"string"==n&&t in r)&&p(r[t],e)}(t[0],t[1],i)&&(o=n<3?void 0:o,n=1),e=Object(e);++r<n;){var a=t[r];a&&g(e,a,r,o)}return e},m=c(void 0===m?b.length-1:m,0),function(){for(var e=arguments,t=-1,r=c(e.length-m,0),o=Array(r);++t<r;)o[t]=e[m+t];t=-1;for(var i=Array(m+1);++t<m;)i[t]=e[t];return i[m]=o,n(b,this,i)});e.exports=w},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=Object.assign({},e);return t.forEach((function(e){var t=e.change,o=e.key,i=e.value;switch(t){case n.DIFF_STATUS_UPDATED:r[o]=i;break;case n.DIFF_STATUS_REMOVED:Reflect.deleteProperty(r,o)}})),r};var n=r(7)},function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),i=1;i<t;i++)r[i-1]=arguments[i];var a=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},u={getState:e.getState.bind(e),dispatch:function(){return a.apply(void 0,arguments)}};return r=(r||[]).map((function(e){return e(u)})),a=o.apply(void 0,n(r))(e.dispatch),e.dispatch=a,e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(5),i=r(6),a=r(20),u=(n=a)&&n.__esModule?n:{default:n};var c=function(e,t){Promise.resolve(e).then((function(e){t({error:null,value:e})})).catch((function(e){t({error:e.message,value:null})}))};t.default=function(e,t){var r=t.portName,n=t.dispatchResponder,a=t.serializer,s=void 0===a?i.noop:a,f=t.deserializer,l=void 0===f?i.noop:f,d=t.diffStrategy,p=void 0===d?u.default:d;if(!r)throw new Error("portName is required in options");if("function"!=typeof s)throw new Error("serializer must be a function");if("function"!=typeof l)throw new Error("deserializer must be a function");if("function"!=typeof p)throw new Error("diffStrategy must be one of the included diffing strategies or a custom diff function");n||(n=c);var h=function(t,i,a){if(t.type===o.DISPATCH_TYPE&&t.portName===r){var u=Object.assign({},t.payload,{_sender:i}),c=null;try{c=e.dispatch(u)}catch(e){c=Promise.reject(e.message)}return n(c,a),!0}},v=function(t){if(t.name===r){var n=(0,i.withSerializer)(s)((function(){return t.postMessage.apply(t,arguments)})),a=e.getState(),u=e.subscribe((function(){var t=e.getState(),r=p(a,t);r.length&&(a=t,n({type:o.PATCH_STATE_TYPE,payload:r}))}));t.onDisconnect.addListener(u),n({type:o.STATE_TYPE,payload:a})}},y=(0,i.withDeserializer)(l),g=function(e){return e.type===o.DISPATCH_TYPE&&e.portName===r};y((function(){var e;return(e=chrome.runtime.onMessage).addListener.apply(e,arguments)}))(h,g),chrome.runtime.onMessageExternal&&y((function(){var e;return(e=chrome.runtime.onMessageExternal).addListener.apply(e,arguments)}))(h,g),chrome.runtime.onConnect.addListener(v),chrome.runtime.onConnectExternal&&chrome.runtime.onConnectExternal.addListener(v),chrome.tabs.query({},(function(e){var t=!0,r=!1,n=void 0;try{for(var o,i=e[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;chrome.tabs.sendMessage(a.id,{action:"storeReady"})}}catch(e){r=!0,n=e}finally{try{!t&&i.return&&i.return()}finally{if(r)throw n}}}))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=[];return Object.keys(t).forEach((function(o){e[o]!==t[o]&&r.push({key:o,value:t[o],change:n.DIFF_STATUS_UPDATED})})),Object.keys(e).forEach((function(e){t.hasOwnProperty(e)||r.push({key:e,change:n.DIFF_STATUS_REMOVED})})),r};var n=r(7)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(){return function(t){return function(r){var n=e[r.type];return t(n?n(r):r)}}}}},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,r){"use strict";r.r(t),r.d(t,"injectSubstital",(function(){return I}));var n=r(1),o=r.n(n),i=r(0),a=r.n(i);function u(e){return function(t){var r=t.dispatch,n=t.getState;return function(t){return function(o){return"function"==typeof o?o(r,n,e):t(o)}}}}var c=u();c.withExtraArgument=u;var s=c,f=(r(14),r(2)),l=function(){return Math.random().toString(36).substring(7).split("").join(".")},d={INIT:"@@redux/INIT"+l(),REPLACE:"@@redux/REPLACE"+l(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+l()}};function p(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function h(e,t,r){var n;if("function"==typeof t&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function.");return r(h)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var o=e,i=t,a=[],u=a,c=!1;function s(){u===a&&(u=a.slice())}function l(){if(c)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return i}function v(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(c)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var t=!0;return s(),u.push(e),function(){if(t){if(c)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");t=!1,s();var r=u.indexOf(e);u.splice(r,1),a=null}}}function y(e){if(!p(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(c)throw new Error("Reducers may not dispatch actions.");try{c=!0,i=o(i,e)}finally{c=!1}for(var t=a=u,r=0;r<t.length;r++){(0,t[r])()}return e}function g(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");o=e,y({type:d.REPLACE})}function b(){var e,t=v;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function r(){e.next&&e.next(l())}return r(),{unsubscribe:t(r)}}})[f.a]=function(){return this},e}return y({type:d.INIT}),(n={dispatch:y,subscribe:v,getState:l,replaceReducer:g})[f.a]=b,n}function v(e,t){var r=t&&t.type;return"Given "+(r&&'action "'+String(r)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(r,!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}function w(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){var r=e.apply(void 0,arguments),n=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},o={getState:r.getState,dispatch:function(){return n.apply(void 0,arguments)}},i=t.map((function(e){return e(o)}));return b({},r,{dispatch:n=m.apply(void 0,i)(r.dispatch)})}}}var E=r(8),O="HOME",S="INFO";function T(){return function(e){return e({type:"REQUEST_NOTIFICATIONS"}),new Promise((function(e){setTimeout((function(){e([{text:"Update! (Oct 2020).                    \n             Fixed an issue with Amazon Prime Video.\n             Added a button to choose more conveniently your own subtitles files (instead of drag & drop only).\n             Minor user interface changes.\n             Fixed an issue where the video would sometimes be shifted to the top on Netflix after injecting Substital.\n             Fixed an issue with V LIVE.",id:4,sentOn:1603819301685},{text:"Update! Substital now supports the new user interface of Netflix.",id:3,sentOn:1543773003244},{text:"Reminder: Substital v2 supports Amazon Prime Video! (PrimeVideo.com)",id:2,sentOn:1510061286949},{text:"Welcome to Substital v2! This new major version includes a better video detection, new features, and improvements. You can access the subtitles settings by clicking on the Substital icon in the videos controls.",id:1,sentOn:1507637452358}])}),500)})).then((function(t){e(function(e){return{type:"RECEIVE_NOTIFICATIONS",notifications:e}}(t))}))}}function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var P=O;var A=function(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var o=t[n];0,"function"==typeof e[o]&&(r[o]=e[o])}var i,a=Object.keys(r);try{!function(e){Object.keys(e).forEach((function(t){var r=e[t];if(void 0===r(void 0,{type:d.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:d.PROBE_UNKNOWN_ACTION()}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+d.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')}))}(r)}catch(e){i=e}return function(e,t){if(void 0===e&&(e={}),i)throw i;for(var n=!1,o={},u=0;u<a.length;u++){var c=a[u],s=r[c],f=e[c],l=s(f,t);if(void 0===l){var d=v(c,t);throw new Error(d)}o[c]=l,n=n||l!==f}return(n=n||a.length!==Object.keys(e).length)?o:e}}({loadedCount:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INCR_LOADED_COUNT":return e+1;default:return e}},askedToRate:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ASKED_TO_RATE":return t.asked;default:return e}},popupTab:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_POPUP_TAB":return t.tab;default:return e}},popupIsDetecting:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_IS_DETECTING":return t.detecting;default:return e}},detectionError:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_DETECTION_ERROR":return t.error;default:return e}},detectionErrorMessage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:"detection.error.empty"},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_DETECTION_ERROR_MESSAGE":return t.errorMessage;default:return e}},videos:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CLEAR_VIDEOS":return[];case"ADD_VIDEOS":return[].concat(a()(e),a()(t.videos.map((function(t){return j(j({},t),{},{id:t.id+e.length,selected:!1})}))));case"RECEIVE_VIDEOS":return t.videos.map((function(e){return{title:e.title,player:e.player,src:e.src,quality:e.quality,selector:e.selector,origin:e.origin,selected:!1}}));case"SELECT_VIDEO":return e.map((function(e){return e.id===t.id?j(j({},e),{},{selected:!0}):j(j({},e),{},{selected:!1})}));default:return e}},notifications:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RECEIVE_NOTIFICATIONS":return t.notifications.map((function(t){var r=e.find((function(e){return e.id===t.id})),n=r&&r.isRead||!1,o=r&&r.isNew||!1;return{text:t.text,id:t.id,sentOn:t.sentOn,isRead:n,isNew:o}})).sort((function(e,t){return t.sentOn-e.sentOn}));case"SET_NOTIFICATIONS_READ":return e.map((function(e){return j(j({},e),{},{isRead:!0,isNew:!e.isRead})}));default:return e}},preferredSubtitleLanguage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PREFERRED_SUBTITLE_LANGUAGE":return t.language;default:return e}},flashMessage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:"notification.subtitles.noSubLoaded"},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_FLASH_MESSAGE":return t.message;default:return e}},flashType:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_FLASH_TYPE":return t.messageType;default:return e}},subtitlesFontSizeRatio:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SUBTITLES_FONT_SIZE_RATIO":return t.ratio;default:return e}},subtitlesFontColor:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#ffffff",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SUBTITLES_FONT_COLOR":return t.color;default:return e}},subtitlesBackgroundColor:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"transparent",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SUBTITLES_BG_COLOR":return t.color;default:return e}}});chrome.i18n.getMessage("@@extension_id");function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var I=function(){return chrome.tabs.executeScript(null,{file:"injection/bundle.js",allFrames:!0})},N=[s];chrome.storage.sync.get("state",(function(e){var t=h(A,D(D({},e.state),{},{detectionErrorMessage:{id:"detection.error.empty"},popupTab:O,videos:[]}),w.apply(void 0,a()(N)));function r(){chrome.storage.sync.get("newV2shown",(function(e){if(e.newV2shown){var r=t.getState().notifications.filter((function(e){return!e.isRead})).length,n=r>0?"".concat(r):"";chrome.browserAction.setBadgeText({text:n})}else chrome.browserAction.setBadgeText({text:"NEW"})}))}Object(E.wrapStore)(t,{portName:"SUBSTITAL"});t.subscribe((function(){chrome.storage.sync.set({state:t.getState()}),r()}));t.dispatch(T()),chrome.runtime.onConnect.addListener((function(e){"LISTEN_POPUP_CLOSED"===e.name&&e.onDisconnect.addListener((function(){t.dispatch({type:"SET_IS_DETECTING",detecting:!0}),t.dispatch({type:"SET_POPUP_TAB",tab:O}),t.dispatch({type:"SET_DETECTION_ERROR",error:!1}),t.dispatch({type:"SET_DETECTION_ERROR_MESSAGE",errorMessage:{id:"detection.error.empty"}})}))})),chrome.runtime.onMessage.addListener((function(e){"REMOVE_NEW_BADGE"===e.action&&(chrome.storage.sync.set({newV2shown:!0}),r())}))}));var k=document.createElement("script");k.type="text/javascript",k.async=!0,k.src="https://www.google-analytics.com/analytics.js";var R=document.getElementsByTagName("script")[0];R.parentNode.insertBefore(k,R),window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)},ga.l=+new Date,window.ga("create","UA-76459692-1","auto"),window.ga("set","checkProtocolTask",null),window.ga("send","pageview",window.location.pathname)}]);