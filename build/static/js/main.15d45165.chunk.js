(this["webpackJsonpshopify-metafields"]=this["webpackJsonpshopify-metafields"]||[]).push([[4],{133:function(e,t){window.publicTools={filterEmptyParams:function(e){return Object.keys(e).forEach((function(t){""==e[t]&&delete e[t]})),e},getQuery:function(e){var t=window.location.search.substring(1).split("&"),n={};return t.forEach((function(e){var t=e.split("=");n[t[0]]=t[1]})),e?decodeURIComponent(n[e]):n},getSearchQuery:function(e,t){var n=e.substring(1).split("&"),a={};return n.forEach((function(e){var t=e.split("=");a[t[0]]=t[1]})),t?decodeURIComponent(a[t]):a},IsPC:function(){for(var e=navigator.userAgent,t=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),n=!0,a=0;a<t.length;a++)if(e.indexOf(t[a])>0){n=!1;break}return n},leadingDigit:function(e){return("0"+e).substr(-2)},getRepeatArr:function(e){var t=[];return e.forEach((function(e){var n=-1;t.some((function(t,a){if(e.namespace==t.namespace&&e.key==t.key)return n=a,!0}))?t[n].data.push(e):t.push({namespace:e.namespace,key:e.key,data:[e]})})),t},clientTimeZone:function(){var e=(new Date).getTimezoneOffset(),t=parseInt(e/60),n=e%60,a="-";return(t<0||n<0)&&(a="+",t=-t,n<0&&(n=-n)),2==(t+=" ").length&&(t="0"+t),2==(n+=" ").length&&(n="0"+n),{prefix:a,hour:t,munite:n}},getExactTime:function(e){var t=new Date(e),n=t.getFullYear()+"-",a=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",i=t.getDate()+" ",o=(t.getHours().toString().length>1?t.getHours():"0".concat(t.getHours()))+":",s=(t.getMinutes().toString().length>1?t.getMinutes():"0".concat(t.getMinutes()))+":",c=t.getSeconds();return n+a+i+o+s+(c=c.toString().length>1?c:"0".concat(c))}}},134:function(e,t){!function(e){var t="https://metafields-dev.cedate.net/api/",n="/api/",a=window.location.hostname,i=t,o="hmac=01941f9e5d86f0fc4ea9580f5b239f01a73cea3b6925bd148a2a7e4a34f13db0&locale=en-HK&new_design_language=true&session=bdc973315792c5b0b8b608e61b8386ee8ebb29ae83cd6938162535a6abdae095&shop=ce-test-300.myshopify.com&timestamp=1615170144";["127.0.0.1"].includes(a)||(i=n,o=window.location.search.substring(1)),e.appEnvironment={},e.appEnvironment.apiURL=i,e.appEnvironment.publicSearch=o}(window)},152:function(e,t,n){},153:function(e,t,n){},160:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(36),s=n.n(o),c=n(2),r=n(3),l=n(6),u=n(7),h=n(37),p=n(97),d=n(165),f=n(166),b=n(9),m=n(5),j=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={tabs:[{id:"resources-list",content:"Resources list",panelID:"resources-list"},{id:"how-to-use",content:"How To Use",panelID:"how-to-use"}],selected:0},a}return Object(r.a)(n,[{key:"init",value:function(){var e=this.props.location.pathname.split("/").pop(),t=window.location.search;this.queryTag=window.publicTools.getSearchQuery(t,"callbackTag"),this.queryTag&&"pricing"==this.queryTag&&(e=this.queryTag),this.handleGetPath(e)}},{key:"handleTabChange",value:function(e){var t=this.state.tabs[e].panelID,n="/shopify-metafields/".concat(t);"pricing"==t&&(n+="?".concat(window.appEnvironment.publicSearch)),this.setState({selected:e}),this.props.history.push(n)}},{key:"handleGetPath",value:function(e){var t=this;this.state.tabs.forEach((function(n,a){n.id==e&&t.setState({selected:a},(function(){t.handleTabChange(a)}))}))}},{key:"componentDidUpdate",value:function(e,t){var n=this.props.location.pathname.split("/").pop();e.location.pathname!=this.props.location.pathname&&this.handleGetPath(n)}},{key:"componentDidMount",value:function(){this.init()}},{key:"render",value:function(){var e=this;return Object(m.jsx)("div",{className:"top-nav",children:Object(m.jsx)(f.a,{tabs:this.state.tabs,selected:this.state.selected,onSelect:function(t){e.handleTabChange(t)}})})}}]),n}(i.a.Component),g=Object(b.f)(j),v=n(39),O=i.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(9)]).then(n.bind(null,623))})),y=i.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(12)]).then(n.bind(null,600))})),w=i.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(6),n.e(14)]).then(n.bind(null,613))})),x=i.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(11)]).then(n.bind(null,618))})),k=function(){return Object(m.jsx)(a.Suspense,{fallback:Object(m.jsx)(v.a,{}),children:Object(m.jsxs)(b.c,{children:[Object(m.jsx)(b.a,{path:"/",exact:!0,component:O}),Object(m.jsx)(b.a,{path:"/shopify-metafields",exact:!0,component:O}),Object(m.jsx)(b.a,{path:"/shopify-metafields/resources-list",component:O}),Object(m.jsx)(b.a,{path:"/shopify-metafields/first-list/:ownerResource",component:y}),Object(m.jsx)(b.a,{path:"/shopify-metafields/editor/:ownerResource",component:w}),Object(m.jsx)(b.a,{path:"/shopify-metafields/how-to-use",component:x})]})})},S=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){return Object(c.a)(this,n),t.call(this,e)}return Object(r.a)(n,[{key:"render",value:function(){return Object(m.jsx)(k,{})}}]),n}(i.a.Component),P=n(55),E=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={loading:!1},a}return Object(r.a)(n,[{key:"init",value:function(){var e=this;this.eventEmitter=P.a.addListener("openPlanModal",(function(t){e.refs.PlanModal.handleModalOpen(t)}))}},{key:"handleGetShopData",value:function(){window.__PERMISSION__={isFree:!1,isBasic:!1,isPro:!0,hasExport:!0,hasImport:!0,hasBulkExport:!0,editorFieldsOptions:[{enable:!0}]}}},{key:"componentDidMount",value:function(){this.init()}},{key:"componentWillUnmount",value:function(){P.a.removeListener(this.eventEmitter)}},{key:"render",value:function(){return Object(m.jsx)("div",{children:Object(m.jsx)(d.a,{i18n:p,children:Object(m.jsxs)(h.a,{children:[Object(m.jsx)(g,{}),this.state.loading?Object(m.jsx)(v.a,{}):Object(m.jsx)(S,{})]})})})}}]),n}(i.a.Component),T=(n(133),n(134),n(98)),M=n.n(T);n(152),n(153),n(154),n(155),n(156),n(157),n(158),n(159);window.axios=M.a,s.a.render(Object(m.jsx)(E,{}),document.getElementById("root"))},39:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n(2),i=n(3),o=n(6),s=n(7),c=n(0),r=n.n(c),l=n(5),u=function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(e){var i;return Object(a.a)(this,n),(i=t.call(this,e)).state={fullScreen:!0},i}return Object(i.a)(n,[{key:"render",value:function(){var e=!this.props.notFullScreen&&this.state.fullScreen;return Object(l.jsx)("div",{className:e?"spinner-loading-body spinner-loading-fixed":"spinner-loading-body spinner-loading-absolute",children:Object(l.jsx)("div",{className:"spinner-loading",children:Object(l.jsx)("span",{className:"Polaris-Spinner Polaris-Spinner--colorTeal Polaris-Spinner--sizelarge",children:Object(l.jsx)("svg",{viewBox:"0 0 44 44",xmlns:"http://www.w3.org/2000/svg",children:Object(l.jsx)("path",{d:"M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z"})})})})})}}]),n}(r.a.Component)},55:function(e,t,n){"use strict";var a=n(96);t.a=new a.EventEmitter}},[[160,5,7]]]);
//# sourceMappingURL=main.15d45165.chunk.js.map