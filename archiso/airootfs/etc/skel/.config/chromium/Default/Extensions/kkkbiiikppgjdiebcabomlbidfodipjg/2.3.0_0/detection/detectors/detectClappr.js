!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=7)}([function(t,e,n){var r=n(2),o=n(3),i=n(4),u=n(5);t.exports=function(t){return r(t)||o(t)||i(t)||u()}},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},function(t,e,n){var r=n(1);t.exports=function(t){if(Array.isArray(t))return r(t)}},function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},function(t,e,n){var r=n(1);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},,function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),i=function(){var t=[],e=new CustomEvent("detect_fromscript_result",{detail:{videos:t}});if(window.Clappr){var n=Object.keys(window).find((function(t){return window[t]instanceof window.Clappr.Player})),r=window[n];if(r&&r.playerInfo&&r.playerInfo.options&&r.playerInfo.options.sources){var i=r.playerInfo.options.sources.find((function(t){return t.includes(".mp4")}));if(i){var u=r.playerInfo.options.parentId;if(window!==window.top){var a=window.location.href,c=a.indexOf("embed"),f=a.substring(c);u='iframe[src*="'.concat(f,'"]')}t=[].concat(o()(t),[{title:document.title,player:"Video Player",src:i,quality:"",selector:u,origin:window.location.href}])}}e=new CustomEvent("detect_fromscript_result",{detail:{videos:t}}),document.dispatchEvent(e)}else document.dispatchEvent(e)};i(),document.addEventListener("detect_fromscript",(function(){i()})),e.default=i}]);