(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{183:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(0),c=Object(a.createContext)(!1)},184:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(53);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},248:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(8),c=n(1),i=n(0),s=n.n(i),r=n(5),o={Collapsible:"Polaris-Collapsible",isFullyClosed:"Polaris-Collapsible--isFullyClosed",expandOnPrint:"Polaris-Collapsible--expandOnPrint"};function l(e){var t=e.id,n=e.expandOnPrint,l=e.open,u=e.transition,p=e.children,d=Object(i.useState)(0),b=Object(a.a)(d,2),m=b[0],j=b[1],O=Object(i.useState)(l),h=Object(a.a)(O,2),f=h[0],g=h[1],v=Object(i.useState)("idle"),y=Object(a.a)(v,2),x=y[0],k=y[1],w=Object(i.useRef)(null),C="idle"===x&&l&&f,P="idle"===x&&!l&&!f,E=n||!P?p:null,I=Object(r.a)(o.Collapsible,P&&o.isFullyClosed,n&&o.expandOnPrint),L=Object(c.a)(Object(c.a)({},u&&{transitionDuration:"".concat(u.duration),transitionTimingFunction:"".concat(u.timingFunction)}),{maxHeight:C?"none":"".concat(m,"px"),overflow:C?"visible":"hidden"}),F=Object(i.useCallback)((function(){k("idle"),g(l)}),[l]);return Object(i.useEffect)((function(){l!==f&&k("measuring")}),[l,f]),Object(i.useEffect)((function(){l&&w.current&&j(w.current.scrollHeight)}),[]),Object(i.useEffect)((function(){if(w.current)switch(x){case"idle":break;case"measuring":j(w.current.scrollHeight),k("animating");break;case"animating":j(l?w.current.scrollHeight:0)}}),[x,l,f]),s.a.createElement("div",{id:t,style:L,ref:w,className:I,onTransitionEnd:F,"aria-expanded":l},E)}},592:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a,c=n(0),i=n.n(c),s=n(21),r=n(35),o=n(5),l=function(e){return c.createElement("svg",Object.assign({viewBox:"0 0 20 20"},e),a||(a=c.createElement("path",{d:"M14 13v1a1 1 0 0 1-1 1h-7c-.575 0-1-.484-1-1v-7a1 1 0 0 1 1-1h1c1.037 0 1.04 1.5 0 1.5-.178.005-.353 0-.5 0v6h6v-.5c0-1 1.5-1 1.5 0zm-3.75-7.25a.75.75 0 0 1 .75-.75h4v4a.75.75 0 0 1-1.5 0v-1.44l-3.22 3.22a.75.75 0 1 1-1.06-1.06l3.22-3.22h-1.44a.75.75 0 0 1-.75-.75z"})))},u=n(52),p=n(38),d=n(183),b={Link:"Polaris-Link",IconLockup:"Polaris-Link__IconLockup",IconLayout:"Polaris-Link__IconLayout",monochrome:"Polaris-Link--monochrome"};function m(e){var t=e.url,n=e.children,a=e.onClick,c=e.external,m=e.id,j=e.monochrome,O=e.accessibilityLabel,h=Object(r.a)(),f=n,g=Object(s.a)().newDesignLanguage;if(c&&"string"===typeof n){var v=h.translate("Polaris.Common.newWindowAccessibilityHint");f=i.a.createElement(i.a.Fragment,null,n,i.a.createElement("span",{className:b.IconLockup},i.a.createElement("span",{className:b.IconLayout},i.a.createElement(u.a,{accessibilityLabel:v,source:l}))))}return i.a.createElement(d.a.Consumer,null,(function(e){var n=j||e,s=Object(o.a)(b.Link,n&&b.monochrome,g&&b.newDesignLanguage);return t?i.a.createElement(p.a,{onClick:a,className:s,url:t,external:c,id:m,"aria-label":O},f):i.a.createElement("button",{type:"button",onClick:a,className:s,id:m,"aria-label":O},f)}))}},618:function(e,t,n){"use strict";n.r(t);var a=n(184),c=n(2),i=n(3),s=n(6),r=n(7),o=n(0),l=n.n(o),u=n(592),p=n(612),d=n(616),b=n(170),m=n(211),j=n(248),O=n(589),h=n.p+"static/media/step-1.be3edfc9.jpg",f=n.p+"static/media/step-2.5e0f2967.jpg",g=n.p+"static/media/step-3.4ce2aaaa.jpg",v=n.p+"static/media/step-4.caf0368d.jpg",y=n(4),x=function(e){Object(s.a)(n,e);var t=Object(r.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={steps:[{heading:"1. Create Metafields in the resource you need ( take the product as an example ).",stepImg:h,stepOpen:!1},{heading:"2. Copy the liquid code.",stepImg:f,stepOpen:!1},{heading:"3. Paste the liquid code to the position you need.",stepImg:g,stepOpen:!1},{heading:"4. Preview in the theme.",link:Object(y.jsx)(y.Fragment,{children:Object(y.jsxs)("span",{className:"ml20",children:[Object(y.jsx)(u.a,{url:"https://ce-300-0303.myshopify.com/products/test",external:!0,children:"Demo"}),Object(y.jsx)("span",{className:"ml5 g9",children:"password: 000000"})]})}),stepImg:v,stepOpen:!1}],activeFullImage:null,active:!1},a}return Object(i.a)(n,[{key:"handleToogleStep",value:function(e){var t=this.state.steps.map((function(t,n){return Object(a.a)(Object(a.a)({},t),{},{stepOpen:e==n?!t.stepOpen:t.stepOpen})}));this.setState({steps:t})}},{key:"handleShowFullImage",value:function(e){this.setState({activeFullImage:e,active:!0})}},{key:"handleCloseModal",value:function(){this.setState({active:!1})}},{key:"render",value:function(){var e=this,t=this.state,n=t.steps,a=t.activeFullImage,c=t.active;return Object(y.jsxs)(p.a,{children:[Object(y.jsx)("div",{className:"wrapper",children:Object(y.jsx)("div",{className:"container hwo-to-use-body",children:Object(y.jsx)(d.a,{children:Object(y.jsx)(d.a.Section,{children:n.map((function(t,n){return Object(y.jsxs)("div",{className:t.stepOpen?"step1 use-steps active":"step1 use-steps",children:[Object(y.jsx)(b.a,{plain:!0,monochrome:!0,onClick:function(){e.handleToogleStep(n)},ariaExpanded:t.stepOpen,ariaControls:"basic-collapsible",children:Object(y.jsx)(m.a,{children:t.heading})}),t.link&&t.link,Object(y.jsx)(j.a,{open:t.stepOpen,id:"basic-collapsible",transition:{duration:"500ms",timingFunction:"ease-in-out"},expandOnPrint:!0,children:Object(y.jsx)("div",{className:"mt20",children:Object(y.jsx)("img",{src:t.stepImg,onClick:function(){e.handleShowFullImage(t.stepImg)}})})})]},n)}))})})})}),Object(y.jsx)(O.a,{large:!0,className:"how-to-use-modal",open:c,onClose:function(){e.handleCloseModal()},secondaryActions:{content:"Cancel",onAction:function(){e.handleCloseModal()}},children:Object(y.jsx)("div",{className:"how-to-use-img-body",children:Object(y.jsx)("img",{src:a})})})]})}}]),n}(l.a.Component);t.default=x}}]);
//# sourceMappingURL=11.js.map