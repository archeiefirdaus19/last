if(!self.define){let e,t={};const s=(s,n)=>(s=new URL(s+".js",n).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(t[r])return;let c={};const o=e=>s(e,r),a={module:{uri:r},exports:c,require:o};t[r]=Promise.all(n.map((e=>a[e]||o(e)))).then((e=>(i(...e),c)))}}define([],(function(){"use strict";try{self["workbox:core:6.5.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=s(e)}}class i extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class r{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let c=r&&r.handler;const o=e.method;if(!c&&this.i.has(o)&&(c=this.i.get(o)),!c)return;let a;try{a=c.handle({url:s,request:e,event:t,params:i})}catch(e){a=Promise.reject(e)}const h=r&&r.catchHandler;return a instanceof Promise&&(this.o||h)&&(a=a.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:i})}catch(e){e instanceof Error&&(n=e)}if(this.o)return this.o.handle({url:s,request:e,event:t});throw n}))),a}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const c=r.match({url:e,sameOrigin:t,request:s,event:n});if(c)return i=c,(Array.isArray(i)&&0===i.length||c.constructor===Object&&0===Object.keys(c).length||"boolean"==typeof c)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(e,t="GET"){this.i.set(t,s(e))}setCatchHandler(e){this.o=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const o=()=>(c||(c=new r,c.addFetchListener(),c.addCacheListener()),c);function a(e,s,r){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new n((({url:e})=>e.href===t.href),s,r)}else if(e instanceof RegExp)c=new i(e,s,r);else if("function"==typeof e)c=new n(e,s,r);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}return o().registerRoute(c),c}try{self["workbox:cacheable-response:6.5.3"]&&_()}catch(e){}class h{constructor(e={}){this.h=e.statuses,this.u=e.headers}isResponseCacheable(e){let t=!0;return this.h&&(t=this.h.includes(e.status)),this.u&&t&&(t=Object.keys(this.u).some((t=>e.headers.get(t)===this.u[t]))),t}}try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}const u={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null},l={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[l.prefix,e,l.suffix].filter((e=>e&&e.length>0)).join("-"),d=e=>e||f(l.precache),w=e=>e||f(l.runtime);function p(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class y{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const b=new Set;function g(e){return"string"==typeof e?new Request(e):e}class v{constructor(e,t){this.l={},Object.assign(this,t),this.event=t.event,this.p=e,this.g=new y,this.v=[],this.m=[...e.plugins],this.R=new Map;for(const e of this.m)this.R.set(e,{});this.event.waitUntil(this.g.promise)}async fetch(e){const{event:s}=this;let n=g(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this.p.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw i&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:i.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=g(e);let s;const{cacheName:n,matchOptions:i}=this.p,r=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,c);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const n=g(e);var i;await(i=0,new Promise((e=>setTimeout(e,i))));const r=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:(c=r.url,new URL(String(c),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var c;const o=await this.q(s);if(!o)return!1;const{cacheName:a,matchOptions:h}=this.p,u=await self.caches.open(a),l=this.hasCallback("cacheDidUpdate"),f=l?await async function(e,t,s,n){const i=p(t.url,s);if(t.url===i)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),c=await e.keys(t,r);for(const t of c)if(i===p(t.url,s))return e.match(t,n)}(u,r.clone(),["__WB_REVISION__"],h):null;try{await u.put(r,l?o.clone():o)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of b)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:a,oldResponse:f,newResponse:o.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this.l[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=g(await e({mode:t,request:n,event:this.event,params:this.params}));this.l[s]=n}return this.l[s]}hasCallback(e){for(const t of this.p.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this.p.plugins)if("function"==typeof t[e]){const s=this.R.get(t),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return t[e](i)};yield n}}waitUntil(e){return this.v.push(e),e}async doneWaiting(){let e;for(;e=this.v.shift();)await e}destroy(){this.g.resolve(null)}async q(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class m{constructor(e={}){this.cacheName=w(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,i=new v(this,{event:t,request:s,params:n}),r=this.U(i,s,t);return[r,this.L(r,i,s,t)]}async U(e,s,n){let i;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(i=await this._(s,e),!i||"error"===i.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const r of e.iterateCallbacks("handlerDidError"))if(i=await r({error:t,event:n,request:s}),i)break;if(!i)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))i=await t({event:n,request:s,response:i});return i}async L(e,t,s,n){let i,r;try{i=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),t.destroy(),r)throw r}}function R(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}function q(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:r.href}}class U{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class L{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this.C.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this.C=e}}let x,E;async function C(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const i=e.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},c=s?s(r):r,o=function(){if(void 0===x){const e=new Response("");if("body"in e)try{new Response(e.body),x=!0}catch(e){x=!1}x=!1}return x}()?i.body:await i.blob();return new Response(o,c)}class N extends m{constructor(e={}){e.cacheName=d(e.cacheName),super(e),this.N=!1!==e.fallbackToNetwork,this.plugins.push(N.copyRedirectedCacheableResponsesPlugin)}async _(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this.j(e,t):await this.O(e,t))}async O(e,s){let n;const i=s.params||{};if(!this.N)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=i.integrity,r=e.integrity,c=!r||r===t;n=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||t:void 0})),t&&c&&"no-cors"!==e.mode&&(this.S(),await s.cachePut(e,n.clone()))}return n}async j(e,s){this.S();const n=await s.fetch(e);if(!await s.cachePut(e,n.clone()))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}S(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==N.copyRedirectedCacheableResponsesPlugin&&(n===N.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(N.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}N.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},N.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await C(e):e};class j{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.T=new Map,this.W=new Map,this.I=new Map,this.p=new N({cacheName:d(e),plugins:[...t,new L({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.p}precache(e){this.addToCacheList(e),this.P||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.P=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=q(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.T.has(i)&&this.T.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.T.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.I.has(e)&&this.I.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.I.set(e,n.integrity)}if(this.T.set(i,e),this.W.set(i,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return R(e,(async()=>{const t=new U;this.strategy.plugins.push(t);for(const[t,s]of this.T){const n=this.I.get(s),i=this.W.get(t),r=new Request(t,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return R(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.T.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.T}getCachedURLs(){return[...this.T.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.T.get(t.href)}getIntegrityForCacheKey(e){return this.I.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}const O=()=>(E||(E=new j),E);class S extends n{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const i of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(i);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}var T;self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),T={},function(e){O().precache(e)}([{url:"2.bundle.js",revision:"7b30a22b99d997f969e6713f76ba1ac7"},{url:"946.bundle.js",revision:"6296ff5bded5489adb1e179406f863d2"},{url:"app.webmanifest",revision:"81ae58cc3a24ebcdb475d45097f61959"},{url:"app~a51fa3f5.bundle.js",revision:"64dfeeb90f3ced00ea65ce907915fa13"},{url:"app~a51fa3f5.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~ca0940c6.bundle.js",revision:"6a7522718734338db4460ecf78cd7d7a"},{url:"app~ca0940c6.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~e4317507.bundle.js",revision:"025f41fc29fd3e077f458830951db9d7"},{url:"app~e4317507.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~f6563343.bundle.js",revision:"776dd9c2c6521dfe43aaadf44433d7a6"},{url:"favicon.png",revision:"6527d8cbd5c28e484e7ff7be3964e25c"},{url:"icons/icon-128x128.png",revision:"5ec1ac17a7bd4004a71ff4b1ec44122d"},{url:"icons/icon-144x144.png",revision:"154187001825ca8438bdf97dd244dd0e"},{url:"icons/icon-152x152.png",revision:"3cd15afcdbbf724d2b7aca0c34e52172"},{url:"icons/icon-192x192.png",revision:"aadefa9cf4ac37c02b7a6bc881e0f627"},{url:"icons/icon-384x384.png",revision:"e3390f0395437bf9b6f326da7f795538"},{url:"icons/icon-512x512.png",revision:"5194c5417b73a63b86219669759c4951"},{url:"icons/icon-72x72.png",revision:"110bd81e97ab810f1b1abeb22f9d0c80"},{url:"icons/icon-96x96.png",revision:"4f43254cfe0e18fa589bdc434ab36bae"},{url:"index.html",revision:"dab02b616137a92ef59965dee3db3bef"}]),function(e){const t=O();a(new S(t,e))}(T),a(/^https:\/\/restaurant-api.dicoding.dev\//,new class extends m{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(u)}async _(e,s){const n=s.fetchAndCachePut(e).catch((()=>{}));s.waitUntil(n);let i,r=await s.cacheMatch(e);if(r);else try{r=await n}catch(e){e instanceof Error&&(i=e)}if(!r)throw new t("no-response",{url:e.url,error:i});return r}}({cacheName:"2023-06-21T18:10:20.004Z",plugins:[new class{constructor(e){this.cacheWillUpdate=async({response:e})=>this.K.isResponseCacheable(e)?e:null,this.K=new h(e)}}({statuses:[200]})]}),"GET")}));
//# sourceMappingURL=sw.workbox.bundle.js.map