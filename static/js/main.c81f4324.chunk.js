(this.webpackJsonpbarcode=this.webpackJsonpbarcode||[]).push([[0],{57:function(e,t,a){e.exports=a.p+"static/media/barcode.111a5967.png"},64:function(e,t,a){e.exports=a(80)},69:function(e,t,a){},70:function(e,t,a){},80:function(e,t,a){"use strict";a.r(t);var n=a(0),A=a.n(n),c=a(15),o=a.n(c),r=(a(69),a(70),a(13)),i=a.n(r),l=a(22),s=a(14),u=a(41),m=a(20);function d(e){var t=e.title,a=e.values,n=e.onSelect;return A.a.createElement(u.a,{variant:"secondary",className:"mr-2",id:"dropdown-basic-button",title:t},a.map((function(e){return A.a.createElement(m.a.Item,{key:"".concat(e),eventKey:"".concat(e),onSelect:function(e){return n(e)}},e)})))}var h,v=a(16),g=a(49),p=a(50),E=a(23),f=a.n(E),b=function(){function e(){Object(g.a)(this,e),this._onDetected=void 0}return Object(p.a)(e,[{key:"start",value:function(e){var t=e.width,a=e.height,n=e.onDetected;this._onDetected=n;var A=this,c={numOfWorkers:navigator.hardwareConcurrency,locate:!0,inputStream:{name:"Live",type:"LiveStream",target:"#captureTarget",constraints:{width:t,height:a,facingMode:"environment"},area:{top:"0%",right:"0%",left:"0%",bottom:"0%"}},decoder:{readers:["code_128_reader"],debug:{drawBoundingBox:!1,showFrequency:!1,drawScanline:!1,showPattern:!1},multiple:!1},locator:{halfSample:!0,patchSize:"large",debug:{showCanvas:!1,showPatches:!1,showFoundPatches:!1,showSkeleton:!1,showLabels:!1,showPatchLabels:!1,showRemainingPatchLabels:!1,boxFromPatches:{showTransformed:!1,showTransformedBox:!1,showBB:!1}}}};console.log("config: ".concat(JSON.stringify(c))),f.a.init(c,(function(e){e?console.log(e):(console.log("initialization finished"),f.a.onDetected(A.handleDetected.bind(A)),f.a.start())}))}},{key:"stop",value:function(){f.a.offDetected(this.handleDetected),f.a.stop()}},{key:"handleDetected",value:function(e){this._onDetected(e.codeResult.code)}}]),e}(),w=a(52);function k(e){return Q.apply(this,arguments)}function Q(){return(Q=Object(l.a)(i.a.mark((function e(t){var a,n,A;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A=function(e){t&&t(e),n&&n.pause()},e.next=3,navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});case 3:if(a=e.sent,n=document.querySelector("video")){e.next=7;break}throw new Error("can't find video tag");case 7:n.srcObject=a,h=a.getVideoTracks()[0],n.addEventListener("loadedmetadata",(function(e){window.setTimeout((function(){return A(h.getCapabilities())}),500)}));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return y.apply(this,arguments)}function y(){return(y=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h){e.next=3;break}return e.next=3,k(null);case 3:return e.next=5,h.applyConstraints({advanced:[{torch:t}]});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var D=a(39),I=a(103),B=a(104);function x(){var e=[100,200,250,300,480,800,960,1280,1920],t=new b,a=Object(n.useState)(!1),c=Object(s.a)(a,2),o=c[0],r=c[1],u=Object(n.useState)(200),h=Object(s.a)(u,2),g=h[0],p=h[1],E=Object(n.useState)(480),f=Object(s.a)(E,2),Q=f[0],y=f[1],x=Object(n.useState)(null),j=Object(s.a)(x,2),U=j[0],L=j[1],O=Object(n.useState)(null),W=Object(s.a)(O,2),C=W[0],N=W[1],Z=Object(n.useState)(null),K=Object(s.a)(Z,2),R=K[0],F=K[1],G=Object(n.useState)(!1),M=Object(s.a)(G,2),Y=M[0],P=M[1],q=Object(n.useState)(!1),J=Object(s.a)(q,2),V=J[0],T=J[1],z=function(e){console.log("detected: code=".concat(e)),L(e),H()},H=function(){var e=new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");e.volume=1,e.play()},X=function(e){console.error(e);var t={message:e.message,name:e.name,stack:e.stack,type:Object.prototype.toString.call(e)};N(t)},_=function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k((function(e){F(e)}));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),X(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}(),$=function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S(!V);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),X(e.t0);case 8:T(!V);case 9:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}();return A.a.createElement(A.a.Fragment,null,A.a.createElement("div",null,A.a.createElement("div",{id:"captureTarget",style:{visibility:o?"visible":"collapse"}}),A.a.createElement("video",{hidden:!0}),A.a.createElement("div",null,o?A.a.createElement(v.a,{className:"ml-2",onClick:function(){return console.log("stopping.."),t.stop(),void r(!1)}},"Stop"):A.a.createElement(A.a.Fragment,null,A.a.createElement("div",null,A.a.createElement(m.a,{as:w.a},A.a.createElement(d,{title:"Width: ".concat(g,"px"),values:e.map((function(e){return"".concat(e,"px")})),onSelect:function(e){var t,a=null===e||void 0===e||null===(t=e.match(/\d+/))||void 0===t?void 0:t[0];void 0!==a&&p(Number(a))}}),A.a.createElement(d,{title:"Height: ".concat(Q,"px"),values:e.map((function(e){return"".concat(e,"px")})),onSelect:function(e){var t,a=null===e||void 0===e||null===(t=e.match(/\d+/))||void 0===t?void 0:t[0];void 0!==a&&y(Number(a))}})),A.a.createElement(v.a,{variant:"secondary",onClick:function(){R||_(),P(!Y)}},"Show/Hide Camera Info"),A.a.createElement(B.a,{className:"ml-2",control:A.a.createElement(I.a,{style:{color:"#00e676"},checked:V,onChange:$}),label:"Torch"})),A.a.createElement("div",{className:"mt-2 text-left",hidden:!C},A.a.createElement(D.a,{data:C,expandLevel:10,showNonenumerable:!1,sortObjectKeys:!0,theme:"chromeDark"})),A.a.createElement("div",{className:"mt-2 text-left",hidden:!Y},A.a.createElement(D.a,{data:R,expandLevel:10,showNonenumerable:!1,sortObjectKeys:!0,theme:"chromeDark"})),A.a.createElement(v.a,{className:"ml-2",onClick:function(){return function(){console.log("starting..");try{t.start({width:g,height:Q,onDetected:z})}catch(e){X(e)}r(!0)}()}},"Start (Quagga)"),A.a.createElement(v.a,{className:"ml-2",disabled:!0},"Start (Quagga2.. TBA)"),A.a.createElement(v.a,{className:"ml-2",disabled:!0},"Start (ZXing.. TBA)")),U?A.a.createElement(A.a.Fragment,null,A.a.createElement("br",null),A.a.createElement("div",null,"Code: ".concat(U))):null)))}var j=a(57),U=a.n(j);var L=function(){return A.a.createElement(A.a.Fragment,null,A.a.createElement("div",{className:"App"},A.a.createElement("header",{className:"App-header"},A.a.createElement("img",{src:U.a,className:"App-logo",alt:"logo",height:"300px"}),A.a.createElement("br",null),A.a.createElement("br",null),A.a.createElement(x,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(79);o.a.render(A.a.createElement(A.a.StrictMode,null,A.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[64,1,2]]]);
//# sourceMappingURL=main.c81f4324.chunk.js.map