'use strict';(()=>{let d=null;Registry.require(["crcrc","i18n"],()=>{const k=Registry.get("crcrc"),l=Registry.get("i18n"),r=k.cr,h=k.crc;let g=null;const u=(b,c,a,f,e)=>{f||(f="");const m=h("table","curtable"+(e?" "+e:""),c,a,"table"+f);e=h("tr",e?" "+e:"",c,a,"tr2"+f);const t=h("td","curtableoutertd",c,a,"td1"+f),n=h("td","curtableinner",c,a,"td2"+f);c=h("td","curtableoutertd",c,a,"td3"+f);e.appendChild(t);e.appendChild(n);e.appendChild(c);m.appendChild(e);b&&n.appendChild(b);return m},p=(b,c)=>
{c||(c={});const a=r("div","ct","0","p"),f=h("div","curbg","ct","0","c");c=h("div",c.fixed?"curmiddle_fixed":"curmiddle_relative","ct","0","d");a.inserted||(a.setAttribute("class","curouter hide"),a.setAttribute("style","z-index: 10000"));b=u(b,"ct","0");c.appendChild(b);a.appendChild(c);a.appendChild(f);a.show=()=>{a.setAttribute("class","curouter block")};a.hide=()=>{a.setAttribute("class","curouter hide")};a.remove=()=>{a.parentNode&&a.parentNode.removeChild(a)};a.setText=e=>{a.text=e};a.print=
e=>{a.text&&(a.text.textContent=e)};document.body.appendChild(a);return a},q=()=>{const b=document.createElement("div");b.setAttribute("class","curcontainer");const c=document.createElement("div");c.setAttribute("class","curwaithead");const a=document.createElement("div");a.setAttribute("class","curwaitmsg");b.appendChild(c);b.appendChild(a);return{outer:b,inner:a}};Registry.register("curtain","e1582c36",{wait:b=>{if(document.body){void 0===b&&(b=l.getMessage("Please_wait___"));if(null===
g){d&&(d.remove(),d=null);g=0;{var c=b;const a=q(),f=a.inner;b=document.createElement("div");b.textContent=c;b.setAttribute("class","curtext");$(f).append($('<div class="lds-css ng-scope"><div class="lds-dual-ring"><div></div><div></div></div>')).append(b);c=a.outer}d=p(c,{fixed:!0});d.setText(b);d.show();return!0}if(0===g&&(void 0===b&&(b=l.getMessage("Please_wait___")),d))return b&&d.print(b),d.show(),!0}},hide:()=>{0===g&&(d&&d.hide(),g=null)},dialog:b=>{if(document.body){if(1===g)return!1;if(null===
g){d&&(d.remove(),d=null);g=1;var c=q();c.inner.appendChild(b);d=p(c.outer);d.show();return!0}}},hideDialog:()=>{1===g&&(d&&d.hide(),g=null)}})})})();
