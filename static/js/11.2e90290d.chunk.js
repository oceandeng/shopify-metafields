(this["webpackJsonpshopify-metafields"]=this["webpackJsonpshopify-metafields"]||[]).push([[11],{183:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(0),i=Object(a.createContext)(!1)},184:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(53);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},248:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(8),i=n(1),c=n(0),s=n.n(c),r=n(5),o={Collapsible:"Polaris-Collapsible",isFullyClosed:"Polaris-Collapsible--isFullyClosed",expandOnPrint:"Polaris-Collapsible--expandOnPrint"};function l(e){var t=e.id,n=e.expandOnPrint,l=e.open,u=e.transition,p=e.children,d=Object(c.useState)(0),b=Object(a.a)(d,2),m=b[0],h=b[1],j=Object(c.useState)(l),O=Object(a.a)(j,2),f=O[0],g=O[1],v=Object(c.useState)("idle"),y=Object(a.a)(v,2),x=y[0],k=y[1],C=Object(c.useRef)(null),w="idle"===x&&l&&f,P="idle"===x&&!l&&!f,E=n||!P?p:null,I=Object(r.a)(o.Collapsible,P&&o.isFullyClosed,n&&o.expandOnPrint),L=Object(i.a)(Object(i.a)({},u&&{transitionDuration:"".concat(u.duration),transitionTimingFunction:"".concat(u.timingFunction)}),{maxHeight:w?"none":"".concat(m,"px"),overflow:w?"visible":"hidden"}),F=Object(c.useCallback)((function(){k("idle"),g(l)}),[l]);return Object(c.useEffect)((function(){l!==f&&k("measuring")}),[l,f]),Object(c.useEffect)((function(){l&&C.current&&h(C.current.scrollHeight)}),[]),Object(c.useEffect)((function(){if(C.current)switch(x){case"idle":break;case"measuring":h(C.current.scrollHeight),k("animating");break;case"animating":h(l?C.current.scrollHeight:0)}}),[x,l,f]),s.a.createElement("div",{id:t,style:L,ref:C,className:I,onTransitionEnd:F,"aria-expanded":l},E)}},592:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a,i=n(0),c=n.n(i),s=n(21),r=n(35),o=n(5),l=function(e){return i.createElement("svg",Object.assign({viewBox:"0 0 20 20"},e),a||(a=i.createElement("path",{d:"M14 13v1a1 1 0 0 1-1 1h-7c-.575 0-1-.484-1-1v-7a1 1 0 0 1 1-1h1c1.037 0 1.04 1.5 0 1.5-.178.005-.353 0-.5 0v6h6v-.5c0-1 1.5-1 1.5 0zm-3.75-7.25a.75.75 0 0 1 .75-.75h4v4a.75.75 0 0 1-1.5 0v-1.44l-3.22 3.22a.75.75 0 1 1-1.06-1.06l3.22-3.22h-1.44a.75.75 0 0 1-.75-.75z"})))},u=n(52),p=n(38),d=n(183),b={Link:"Polaris-Link",IconLockup:"Polaris-Link__IconLockup",IconLayout:"Polaris-Link__IconLayout",monochrome:"Polaris-Link--monochrome"};function m(e){var t=e.url,n=e.children,a=e.onClick,i=e.external,m=e.id,h=e.monochrome,j=e.accessibilityLabel,O=Object(r.a)(),f=n,g=Object(s.a)().newDesignLanguage;if(i&&"string"===typeof n){var v=O.translate("Polaris.Common.newWindowAccessibilityHint");f=c.a.createElement(c.a.Fragment,null,n,c.a.createElement("span",{className:b.IconLockup},c.a.createElement("span",{className:b.IconLayout},c.a.createElement(u.a,{accessibilityLabel:v,source:l}))))}return c.a.createElement(d.a.Consumer,null,(function(e){var n=h||e,s=Object(o.a)(b.Link,n&&b.monochrome,g&&b.newDesignLanguage);return t?c.a.createElement(p.a,{onClick:a,className:s,url:t,external:i,id:m,"aria-label":j},f):c.a.createElement("button",{type:"button",onClick:a,className:s,id:m,"aria-label":j},f)}))}},618:function(e,t,n){"use strict";n.r(t);var a=n(184),i=n(2),c=n(3),s=n(6),r=n(7),o=n(0),l=n.n(o),u=n(592),p=n(612),d=n(616),b=n(170),m=n(211),h=n(248),j=n(589),O=n.p+"static/media/step-1.be3edfc9.jpg",f=n.p+"static/media/step-2.5e0f2967.jpg",g=n.p+"static/media/step-3.4ce2aaaa.jpg",v=n.p+"static/media/step-4.caf0368d.jpg",y=n(4),x=function(e){Object(s.a)(n,e);var t=Object(r.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={steps:[{heading:"1. Create Metafields in the resource you need ( take the product as an example ).",stepImg:O,stepOpen:!1},{heading:"2. Copy the liquid code.",stepImg:f,stepOpen:!1},{heading:"3. Paste the liquid code to the position you need.",stepImg:g,stepOpen:!1},{heading:"4. Preview in the theme.",link:Object(y.jsx)(y.Fragment,{children:Object(y.jsxs)("span",{className:"ml20",children:[Object(y.jsx)(u.a,{url:"https://ce-300-0303.myshopify.com/products/test",external:!0,children:"Demo"}),Object(y.jsx)("span",{className:"ml5 g9",children:"password: 000000"})]})}),stepImg:v,stepOpen:!1}],activeFullImage:null,active:!1},a}return Object(c.a)(n,[{key:"handleToogleStep",value:function(e){var t=this.state.steps.map((function(t,n){return Object(a.a)(Object(a.a)({},t),{},{stepOpen:e==n?!t.stepOpen:t.stepOpen})}));this.setState({steps:t})}},{key:"handleShowFullImage",value:function(e){this.setState({activeFullImage:e,active:!0})}},{key:"handleCloseModal",value:function(){this.setState({active:!1})}},{key:"render",value:function(){var e=this,t=this.state,n=t.steps,a=t.activeFullImage,i=t.active;return Object(y.jsxs)(p.a,{children:[Object(y.jsx)("div",{className:"wrapper",children:Object(y.jsx)("div",{className:"container hwo-to-use-body",children:Object(y.jsx)(d.a,{children:Object(y.jsx)(d.a.Section,{children:n.map((function(t,n){return Object(y.jsxs)("div",{className:t.stepOpen?"step1 use-steps active":"step1 use-steps",children:[Object(y.jsx)(b.a,{plain:!0,monochrome:!0,onClick:function(){e.handleToogleStep(n)},ariaExpanded:t.stepOpen,ariaControls:"basic-collapsible",children:Object(y.jsx)(m.a,{children:t.heading})}),t.link&&t.link,Object(y.jsx)(h.a,{open:t.stepOpen,id:"basic-collapsible",transition:{duration:"500ms",timingFunction:"ease-in-out"},expandOnPrint:!0,children:Object(y.jsx)("div",{className:"mt20",children:Object(y.jsx)("img",{src:t.stepImg,onClick:function(){e.handleShowFullImage(t.stepImg)}})})})]},n)}))})})})}),Object(y.jsx)(j.a,{large:!0,className:"how-to-use-modal",open:i,onClose:function(){e.handleCloseModal()},secondaryActions:{content:"Cancel",onAction:function(){e.handleCloseModal()}},children:Object(y.jsx)("div",{className:"how-to-use-img-body",children:Object(y.jsx)("img",{src:a})})})]})}}]),n}(l.a.Component);t.default=x}}]);
//# sourceMappingURL=11.2e90290d.chunk.js.map