'use strict';Registry.require(["promise","uri","helper"],()=>{(h=>{const Q=Registry.get("promise"),R=Registry.get("uri"),S=Registry.get("helper"),x=rea.FEATURES,p=x.HTML5.LOCALSTORAGE;let E,F;const y=(b,c)=>{b&&c&&Object.keys(c).forEach(a=>{b[a]=c[a]})},k=(b,c)=>{if("string"===typeof l)b="G";else{b=b||"default";b=l.enabled&&!1===l.enabled[b]?null:l.tracker[b]||l.tracker["default"];if(null===b)return;b=(b||l.tracker["default"]).match(/[0-9]*/g).join("").split("").map(a=>String.fromCharCode(a.charCodeAt(0)+
23)).join("")}return[b].concat(c?[c]:[]).join(".")},q=(b,c)=>{let a=100*Math.random()<c;if(p)try{let e,d;const f=["wsr",b,c].join("_"),g=Date.now();if(e=p.getItem(f)){try{d=JSON.parse(e)}catch(w){}if(!d||d.ts+864E7<g)d={ts:g,w:a}}else d={ts:g,w:a};a=d.w;p.setItem(f,JSON.stringify(d))}catch(e){}return a},z=()=>({enabled:["default",q("UA-40782729",10),"api",q("UA-40782729",.001)],options:[],tracker:"script UA-40782729-2 script_update UA-40782729-2 naverr UA-40782729-3 api UA-40782729-4 cloud UA-40782729-5 default UA-40782729-6".split(" ")}),
G=()=>({enabled:["default",!0,"api",q("UA-149349990",.001)],options:[],tracker:["default","UA-149349990-1"]}),H=()=>({enabled:["default",!0,"api",q("UA-152632898",5E-4)],options:[],tracker:["default","UA-152632898-1"]}),I=()=>"UA-40861355-1",J=()=>"UA-57518333-1",K=()=>({enabled:["default",!0,"api",q("UA-152641681",5E-4)],options:[],tracker:["default","UA-152641681-1"]}),L=()=>({options:[],tracker:["default","UA-83591358-1","api",null]}),A={"default":z,gcal:z,G3XV:G,saap:G,fire:H,firb:H,iikm:K,neuu:J,
jecn:J,dhdg:()=>({enabled:["default",q("UA-40861355",1),"api",q("UA-40861355",5E-4)],options:[],tracker:["script","UA-40861355-2","script_update","UA-40861355-3","error","UA-40861355-4","naverr","UA-40861355-5","default","UA-40861355-6","api","UA-40861355-7","cloud","UA-40861355-8","browser",null]}),dcgo:I,bnim:I,mfdh:z,gz80:K,heif:L,"5snx":L};var l=(b=>{let c=b();"string"===typeof c&&(c={tracker:["default",c]});let a;const e={options:{},tracker:{},enabled:{}};Object.keys(e).forEach(d=>{if(c[d])for(a=
0;a<c[d].length;a+=2)e[d][c[d][a]]=c[d][a+1]});return e})(A[rea.runtime.short_id]||A["default"]);const T=[{msg:"a disconnected port"},{msg:"Function.prototype.apply: Arguments list has wrong type",url:"event_bindings"},{msg:"Script error."}];let M=!1,N=!1,m=!1;h._gaq=h._gaq||[];let t=[];const O=()=>{console.log("statistics: Unable to load GA -> enable emergency mode");const b={},c=()=>{let a=p?p.getItem("ga_clientId"):S.createUUID();p&&p.setItem("ga_clientId",a);return a};h.ga=(a,e,d,f,g,w,r)=>{if("create"==
a)b[f.name]=e;else{a=a.split(".");let u,v,B;(u=a[0])&&(v=b[u])&&(B=a[1])&&"send"==B&&"object"!=typeof f&&(r={v:1,aip:1,t:e,dl:location.href,cid:c(),tid:v,ni:r&&r.nonInteraction?1:void 0,z:Date.now()},y(r,"event"==e?{ec:d,ea:f,el:g,ev:void 0}:{dp:d}),e="https://www.google-analytics.com/collect?"+R.hash2params(r),d=new XMLHttpRequest,d.onerror=U=>{console.log("statistics: sending data failed",U)},d.open("GET",e),d.send(null))}};h.ga.getByName=()=>({get:function(a){if("clientId"===a)return c()}})},V=
()=>{const b=()=>{let a;for(;a=t.shift();)a();t=!1},c=()=>{O();b()};x.RUNTIME.FIREFOX||x.RUNTIME.SAFARI||E?(O(),b()):((a,e,d,f)=>{a.GoogleAnalyticsObject="ga";a.ga=a.ga||((...g)=>{(a.ga.q=a.ga.q||[]).push(g)});a.ga.l=1*new Date;d=e.createElement("script");f=e.getElementsByTagName("script")[0]||e.head;d.async=!0;d.src="https://ssl.google-analytics.com/analytics.js";d.addEventListener("load",b,!1);d.addEventListener("error",c,!1);f.parentNode.insertBefore(d,f)})(h,document)},n=(b,...c)=>{b&&W().done(()=>
{h.ga.apply(h,[b,...c])})},Y=()=>{N||(t.push(()=>{const b=[],c={};Object.keys(l.tracker).forEach(a=>{const e=k(a);if(e&&!c[e]){c[e]=!0;var d={name:e};y(d,null);y(d,(l.options||{})[a]);b.push(["create",l.tracker[a],"auto",d]);b.push([e+".set","checkProtocolTask",null]);b.push([e+".set","anonymizeIp",!0]);b.push([e+".set","forceSSL",!0])}});b.forEach(a=>{h.ga.apply(h,a)});A[rea.runtime.short_id]||window.setTimeout(X,3E4)}),V(),N=!0)};var P=b=>{M&&(m=b)&&(Y(),F&&C&&(C(),C=void 0))},C=()=>{n(k("pageview",
"send"),"pageview",h.location.pathname||h.location.href)},X=()=>{m&&n(k("extension","send"),"event","Extension","ID",rea.runtime.id+" @ "+navigator.userAgent,null,{nonInteraction:!0})},D=(b,c,a)=>{if(m&&b.search){void 0===c&&(c="");void 0===a&&(c+=" "+window.location.href,a="");var e=!1;T.forEach(d=>{if(d.msg||d.url)d.msg&&-1==b.indexOf(d.msg)||d.url&&-1==c.indexOf(d.url)||(e=!0)});e||n(k("error","send"),"event","Error",b,c+":"+a,null,{nonInteraction:!0})}},W=()=>{const b=Q();!1===t?b.resolve():t.push(b.resolve);
return b.promise()};Registry.register("statistics","e1582c36",{init:(b,c,a,e,d)=>{window.onerror=(f,g,w,r,u)=>{let v="";if(u)try{v=u.stack}catch(B){}D(f,c+" "+b+"@"+rea.extension.urls.prepareForReport(g),[w+":"+r,v].join(";"))};document.onsecuritypolicyviolation=f=>{let g="";if(f)try{g=f.stack}catch(w){}D("CSP violation of "+f.effectiveDirective,c+" "+b+"@"+rea.extension.urls.prepareForReport(f.documentURI),[f.sourceFile," -> ",f.lineNumber+":"+f.columnNumber,g].join(";"))};M=!0;d&&(E=d);
e&&(F=e);P(a)},setEnabled:P,isActive:function(b){return m&&!!k(b)},tB:b=>{if(m){var c="";b.updated&&(c="Updated");n(k("browser","send"),"event","Browser",c,navigator.userAgent,null,{nonInteraction:!0})}},tA:(b,c)=>{m&&(c={grant:"Granted",run_at:"RunAt"}[c]||"Used",n(k("api","send"),"event","API",c,b,null,{nonInteraction:!1}))},tC:(b,c,a)=>{if(m){var e="",d="";"init"===c?(d="Initialized",e=b):"error"===c&&(d="Error",e=b+" -> "+a);n(k("cloud","send"),"event","Cloud",d,e,null,{nonInteraction:!1})}},
tS:(b,c,a)=>{if(m){if("i"===a)a="Installed",b+=" <"+(c?c:"?")+">";else if("u"===a){a="Updated";var e=k("script_update","send")}else"b"===a?(a="Blacklisted",b+=" <"+(c?c:"?")+">"):"f"===a?(a="Foisted",b+=" <"+(c?c:"?")+">"):"w"===a?(a="Foisted While Installed",b+=" <"+(c?c:"?")+">"):"m"===a?(a="Revealed",b=c):a="Removed";n(e||k("script","send"),"event","Script",a,b,null,{nonInteraction:!1})}},tE:D,tG:(b,c,a)=>{if(m){var e="",d="";"clicked"===b?(d="Click",e=c+":"+a):"button"===b?(d="Button",e=c):"dialog"===
b&&(d="Dialog");n(k("begging","send"),"event","Begging",d,e,null,{nonInteraction:!1})}}})})(window)});
