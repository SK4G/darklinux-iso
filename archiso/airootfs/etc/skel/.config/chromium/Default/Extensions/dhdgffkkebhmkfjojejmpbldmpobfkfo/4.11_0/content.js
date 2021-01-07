'use strict';(w=>{const l=w.rea;if(void 0!==l.globals._content)console.warn('content: Stop here, cause a second Tampermonkey instance was detected!\nThis can be caused by using "document.write" at Userscripts.\nSee https://code.google.com/p/chromium/issues/detail?id=253388 for more information');else{l.globals._content=!0;var t;w.Registry=(()=>{const d={};let k=[];const b=()=>{k=k.filter(f=>{let e=!1;f.r.forEach(g=>{d[g]||(e=!0)});if(e)return!0;f.fn()})},c=(f,e,g)=>{d[f]=g;b()},a=f=>{f=d[f];return f instanceof
Function?f():f};return{register:c,registerRaw:c,get:a,getRaw:a,require:function(f,e){k.push({r:f,fn:e});b()}}})();var x=(()=>{const d=b=>({}).toString.apply(b).match(/\s([a-z|A-Z]+)/)[1],k=b=>{if("Object"==d(b)){const c=[];for(const a in b)b.hasOwnProperty(a)&&c.push(a+":"+k(b[a]));return"{"+c.join(",")+"}"}if("Array"==d(b)){const c=[];b.forEach(a=>{c.push(k(a))});return"["+c.join(",")+"]"}return void 0===b?"undefined":null===b?"null":"Function"==d(b)?b.toString():'"'+b.toString()+'"'};return{createUUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
b=>{const c=16*Math.random()|0;return("x"==b?c:c&3|8).toString(16)})},processQueue:function(b){let c;for(;c=b.shift();)c()},serialize:k,toType:d}})(),E=(()=>{const d={_content:!0,JSHINT:!0},k=/(webkitStorageInfo|webkitIDB.*|webkitIndexedDB|webkitOfflineAudioContext|webkitAudioContext|webkitURL|webkitSpeech.*|Bluetooth.*|MIDI.*|StorageManager)/;return()=>{const b={};let c,a;const f=Object.getOwnPropertyNames(window),e=((h,m)=>{for(;(h=Object.getPrototypeOf(h))&&h!==Object.prototype;)m=m.concat(Object.getOwnPropertyNames(h));
return m})(window,[]);c=0;for(a=null;a=e[c];c++)d[a]||k.exec(a)||(2<a.length&&"on"===a.substr(0,2)?b[a]={proto:!0,event:!0}:b[a]={proto:!0});c=0;for(a=null;a=f[c];c++)d[a]||b[a]||k.exec(a)||(2<a.length&&"on"===a.substr(0,2)?b[a]={window:!0,event:!0}:b[a]={window:!0});const g={addEventListener:{window:1},alert:{window:1},atob:{window:1},blur:{window:1},btoa:{window:1},clearInterval:{window:1},clearTimeout:{window:1},close:{window:1},confirm:{window:1},decodeURI:{window:1},decodeURIComponent:{window:1},
dispatchEvent:{window:1},encodeURI:{window:1},encodeURIComponent:{window:1},eval:{window:1},find:{window:1},focus:{window:1},getComputedStyle:{window:1},getSelection:{window:1},isFinite:{window:1},isNaN:{window:1},location:{window:1},open:{window:1},openDialog:{window:1},parseFloat:{window:1},parseInt:{window:1},postMessage:{window:1},print:{window:1},prompt:{window:1},removeEventListener:{window:1},resizeBy:{window:1},resizeTo:{window:1},scroll:{window:1},scrollBy:{window:1},scrollByLines:{window:1},
scrollByPages:{window:1},scrollTo:{window:1},setInterval:{window:1},setTimeout:{window:1},stop:{window:1}};Object.keys(g).forEach(h=>{b[h]||(b[h]=g[h])});return b}})(),p=x.createUUID(),z=window.self==window.top,C=0,A,r=(d=>{const k=(m,q)=>{const n=d.createEvent("MutationEvent");n.initMutationEvent(m,!1,!1,null,null,null,JSON.stringify(q),n.ADDITION);return n},b=(m,q)=>{let n;m&&(n=h[m])&&(n(q),delete h[m])};let c,a;var f;let e;var g=1,h={};return{init:function(m){e||(e=m);f="2P_"+e;a="2C_"+e;d.addEventListener.apply(d,
[a,q=>{const n=JSON.parse(q.attrName);"message.response"==n.m?b(n.r,n.a):c&&c(n,n.r?y=>{y=k(f,{m:"message.response",a:y,r:n.r});d.dispatchEvent.apply(d,[y])}:()=>{})},!1])},send:function(m,q,n){if(n){{const y=++g;h[g]=n;n=y}}else n=null;m=k(f,{m,a:q,r:n});d.dispatchEvent.apply(d,[m])},onMessage:{addListener:function(m){c=m}},cleanup:function(){d.removeEventListener.apply(d,[a,c,!1])}}})(document),D=(()=>{const d={};let k;const b=c=>{let a=[],f=[];var e={postMessage:function(g){r.send("port.message",
{response_id:c,value:g})},onMessage:{addListener:function(g){a.push(g)}},onDisconnect:{addListener:function(g){f.push(g)}},disconnect:function(){r.send("port.message",{response_id:c,disconnect:!0});e=f=a=null;delete d[c]}};d[c]={message:function(g){a&&a.forEach(h=>{h(g)})},disconnect:function(g){f&&f.forEach(h=>{h(g)});e=f=a=null;delete d[c]}};return e};return{message:function(c){let a;c.connect?k&&k(c.destination,b(c.response_id)):(a=d[c.response_id])?c.disconnect?a.disconnect():a.message(c.value):
t&&console.warn("ports: unkown id",c.response_id,c)},connect:function(c){const a=x.createUUID();r.send("port.message",{response_id:a,connect:!0,destination:c});return b(a)},onConnect:{addListener:function(c){k=c}}}})(),u=(()=>{let d,k;const b=[],c=[];let a=()=>{t&&console.log("content: detected DOMContentLoaded "+p);k=!0;window.removeEventListener("DOMContentLoaded",a,!1);a=null;x.processQueue(b)},f=()=>{t&&console.log("content: detected load "+p);d=k=!0;e.cleanup();x.processQueue(c)};window.addEventListener("DOMContentLoaded",
a,!1);window.addEventListener("load",f,!1);var e={registerDomListener:function(g){k||d?g():b.push(g)},registerPageListener:function(g){d?g():c.push(g)},forcedLoad:function(){d||k||!f||(t&&console.log("content: use forced load "+p),f(!0))},seen:(()=>{const g={};Object.defineProperties(g,{load:{get:function(){return d},enumerable:!0},DOMContentLoaded:{get:function(){return k},enumerable:!0}});return g})(),cleanup:function(){a&&(window.removeEventListener("DOMContentLoaded",a,!1),a=null);f&&(window.removeEventListener("load",
f,!1),f=null)}};return e})(),v=(()=>({init:function(d){l.page.eval("("+A.backup+')(window, document,"'+d+'",'+t+");\n")},cleanup:function(){r.send("cleanup")},next:function(d,k,b){const c={short_id:l.runtime.short_id};"isFirstPartyIsolation downloadMode enforce_strict_mode measure_scripts version external_connect statistics".split(" ").forEach(a=>{c[a]=d[a]});c.sandbox_allow_getters=!0;c.detect_constructors_by_keys=l.FEATURES.RUNTIME.DETECT_CONSTRUCTORS_BY_KEYS;c.inIncognitoContext=l.extension.inIncognitoContext;
c.blob_download_supported=!l.FEATURES.RUNTIME.FIREFOX;t&&(u.seen.load?console.log("content: Start ENV with page loaded "+p):u.seen.DOMContentLoaded?console.log("content: Start ENV with DOMContentLoaded "+p):console.log("content: Start ENV normally "+p));k=A.next(p,JSON.stringify(d.scripts),x.serialize(k),JSON.stringify(b),JSON.stringify(c),JSON.stringify({}),C,void 0,void 0,void 0,void 0,t,u.seen.load,u.seen.DOMContentLoaded,A.environment);r.send("next",{src:k})}}))(),B=(()=>{const d={registerMenuCommand:function(b){const c=
l.extension.connect("registerMenuCommand");c.onMessage.addListener(a=>{a.run&&null!==c&&b.postMessage("run")});c.onDisconnect.addListener(()=>{b.disconnect()});b.onMessage.addListener(a=>{if("register"===a.method){var f=a.name,e=a.uuid;a=a.accessKey;var g=[p,f,e].join("#");c.postMessage({method:"registerMenuCommand",name:f,uuid:e,menuId:g,accessKey:a})}});b.onDisconnect.addListener(()=>{c.disconnect()})},openInTab:function(b){const c=l.extension.connect("openInTab");c.onMessage.addListener(a=>{b.postMessage(a)});
c.onDisconnect.addListener(()=>{b.disconnect()});b.onMessage.addListener(a=>{if("openTab"==a.method){let f=a.url;a=a.options;if("boolean"===typeof a||void 0===a)a={loadInBackground:a};const e=void 0===a.active?void 0===a.loadInBackground?!1:!a.loadInBackground:a.active,g=void 0===a.insert?!0:a.insert;f&&0===f.search(/^\/\//)&&(f=location.protocol+f);c.postMessage({method:"openInTab",details:{url:f,options:{active:!!e,insert:!!g,incognito:!!a.incognito,setParent:!a.incognito&&!!a.setParent}}})}else void 0!==
a.name?c.postMessage({name:a.name}):a.close&&c.postMessage({close:!0})});b.onDisconnect.addListener(()=>{c.disconnect()})},download:function(b){const c=l.extension.connect("download");c.onMessage.addListener(a=>{b.postMessage(a)});c.onDisconnect.addListener(()=>{b.disconnect()});b.onMessage.addListener(a=>{a.cancel?c.postMessage({cancel:!0,id:p}):(a=a.details,a.url&&"/"===a.url[0]&&(a.url=location.origin+a.url),c.postMessage({method:"download",details:a,id:p}))});b.onDisconnect.addListener(()=>{c.disconnect()})},
webRequest:function(b){const c=l.extension.connect("webRequest");c.onMessage.addListener(a=>{b.postMessage(a)});c.onDisconnect.addListener(()=>{b.disconnect()});b.onMessage.addListener(a=>{c.postMessage({method:"webRequest",rules:a.rules,uuid:a.uuid})});b.onDisconnect.addListener(()=>{c.disconnect()})},xhr:function(b){const c=l.extension.connect("xhr");c.onMessage.addListener(a=>{b.postMessage(a)});c.onDisconnect.addListener(()=>{b.disconnect()});b.onMessage.addListener(a=>{c.postMessage(a)});b.onDisconnect.addListener(()=>
{c.disconnect()})},onurlchange:function(b){const c=l.extension.connect("onurlchange");let a=()=>{b.postMessage({url:document.location.href})};const f=()=>{a&&(window.removeEventListener("hashchange",a),a=null)};window.addEventListener("hashchange",a);c.onMessage.addListener(e=>{b.postMessage(e)});c.onDisconnect.addListener(()=>{b.disconnect();f()});b.onMessage.addListener(e=>{c.postMessage(e)});b.onDisconnect.addListener(()=>{c.disconnect();f()})},values:function(b){const c=l.extension.connect("values");
c.onMessage.addListener(a=>{b.postMessage(a)});c.onDisconnect.addListener(()=>{b.disconnect()});b.onMessage.addListener(a=>{c.postMessage(a)});b.onDisconnect.addListener(()=>{c.disconnect()})}},k={setClipboard:function(b,c){const a=b.content;b=b.info;const f=typeof b;let e,g;"object"===f?(b.type&&(e=b.type),b.mimetype&&(g=b.mimetype)):"string"===f&&(e=b);const h=g||("html"==e?"text/html":"text/plain");if(l.FEATURES.RUNTIME.CLIPBOARD_API)l.extension.sendMessage({method:"clipboard",mimetype:h,content:a},
()=>c());else{const m=q=>{document.removeEventListener("copy",m,!0);q.stopImmediatePropagation();q.preventDefault();q.clipboardData.setData(h,a)};document.addEventListener("copy",m,!0);document.execCommand("copy");c()}},notification:function(b,c){b.method="notification";l.extension.sendMessage(b,c)},syntaxCheck:function(b,c){b.method="syntaxCheck";l.extension.sendMessage(b,c)},closeTab:function(b,c){l.extension.sendMessage({method:"closeTab",id:p},a=>{a.error&&console.warn(a.error);c()})},focusTab:function(b,
c){l.extension.sendMessage({method:"focusTab",id:p},a=>{a.error&&console.warn(a.error);c()})},addElement:(b,c)=>{try{const a=document.createElement(b.tag),f=b.properties;Object.keys(f).forEach(e=>{"textContent"==e?a.textContent=f[e]:a.setAttribute(e,f[e])});b.id&&a.setAttribute("id",b.id);(document.head||document.body||document.documentElement||document).appendChild(a);c()}catch(a){console.warn("content: error adding script",a)}},tabs:function(b,c){b.method="tabs";l.extension.sendMessage(b,a=>{c(a.data)})},
cookie:function(b,c){b.method="cookie";l.extension.sendMessage(b,a=>{c(a.data)})},api:function(b){b.method="api";l.extension.sendMessage(b,()=>{})}};return{init:function(){},getApi:function(){const b={};[k,d].forEach(c=>{Object.keys(c).map(a=>{b["GM_"+a]=c[a]})});return b},processMessage:function(b,c,a){if(b=k[b])return b(c,a);a()},processConnect:function(b,c){if(b=d[b])return b(c)}}})();l.extension.onMessage.addListener((d,k,b)=>{d.id&&d.id!=p?console.warn("content: Not for me! "+p.substr(0,10)+
"!="+d.id):"executeScript"==d.method?(d.url&&0!==window.location.href.indexOf(d.url)?t&&console.log("exec: URL doesn't match",window.location,d):void 0!==d.topframe&&d.topframe!=z?t&&console.log("exec: topframe doesn't match",window.self,d):r.send("executeScript",d),b({})):"onLoad"==d.method?(document.readyState&&"complete"!==document.readyState||u.forcedLoad(),b({})):z&&("loadUrl"==d.method?(window.location=d.url,b({})):"reload"==d.method?(window.location.reload(),b({})):"confirm"==d.method?window.setTimeout(()=>
{const c=window.confirm(d.msg);b({confirm:c})},100):"showMsg"==d.method?window.setTimeout(()=>{window.setTimeout(()=>{window.alert(d.msg)},1);b({})},100):"setForeignAttr"==d.method?(r.send(d.method,d),b({})):window.console.log("content: unknown method "+d.method))});D.onConnect.addListener((d,k)=>{B.processConnect(d,k)});r.onMessage.addListener((d,k)=>{if("document.write"==d.m){const b=document.documentElement;window.setTimeout(()=>{b!==document.documentElement&&r.init()},0)}else"port.message"==d.m?
D.message(d.a):"csp"==d.m?l.page.eval('window["'+d.a.id+'"] = function() { '+d.a.src+" };\n"):"external.message"==d.m?l.extension.sendMessage({method:"externalMessage",request:d.a},b=>{k(b)}):B.processMessage(d.m,d.a,k)});Registry.require(["page.js"],()=>{A=Registry.getRaw("page.js");let d=!1;const k=(e,g,h)=>{let m=1;const q=()=>{t&&console.debug('content: send "prepare" message');l.extension.sendMessage({method:"prepare",id:p,topframe:z,url:window.location.href},n=>{d||(n?(d=!0,n.contexters||n.scripts&&
n.scripts.length||n.external_connect?(h&&h(),g(n)):(v.cleanup(),e())):(t&&console.debug("content: _early_ execution, connection to bg failed -> retry!"),window.setTimeout(q,m),m*=2))})};l.content.onReady(q)},b=location.pathname+location.search,c="TM_"+l.runtime.short_id+window.btoa(b.length+b).substr(0,255).replace(/[#=\/]/g,"_"),a=()=>{let e;let g;try{g=document.cookie.split(";")}catch(q){return}for(e=0;e<g.length;e++){var h=g[e].substr(0,g[e].indexOf("="));var m=g[e].substr(g[e].indexOf("=")+1);
h=h.replace(/^\s+|\s+$/g,"");if(0===h.indexOf(c)&&(document.cookie=h+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;",h=window.decodeURIComponent(m),0===h.indexOf("blob:")&&(m=new XMLHttpRequest,m.open("GET",h,!1),m.send(null),200===m.status||0===m.status)))try{return JSON.parse(m.responseText)}catch(q){console.warn("content: unable to decode"+m.responseText)}}},f=document.contentType&&"text/html"!=document.contentType;((e,g,h)=>{f?window.setTimeout(()=>{e(g,h)},1):e(g,h)})((e,g)=>{t&&console.log("content: Started ("+
p+", "+window.location.origin+window.location.pathname+")",w.tm_info);let h;l.FEATURES.RUNTIME.FAST_EXEC_SUPPORT&&(h=a())||(h=w.tm_info)?(delete w.tm_info,h.contexters||h.scripts&&h.scripts.length||h.external_connect?(v.init(p),r.init(p),g(h,"sync")):e(),l.FEATURES.RUNTIME.FAST_EXEC_SUPPORT&&l.extension.sendMessage({method:"prepare",url:window.location.href,cleanup:!0},()=>{})):f?k(e,g,()=>{v.init(p);r.init(p)}):(v.init(p),r.init(p),k(e,g))},()=>{t&&console.log("content: disable event processing for "+
p);u.cleanup();v.cleanup();r.cleanup()},(e,g)=>{C=e.logLevel;t|=60<=C;u.registerDomListener(()=>{r.send("DOMContentLoaded")});u.registerPageListener(()=>{r.send("load")});t&&console.log("content: "+(g||"normal")+" start event processing for "+p+" ("+e.scripts.length+" to run)");B.init(e.scripts);v.next(e,B.getApi(),E());z||window.addEventListener("unload",()=>{l.extension.sendMessage({method:"unLoad",id:p,topframe:!1,url:window.location.href},()=>{});u.cleanup();v.cleanup();r.cleanup()},!1)})})}})(window);
