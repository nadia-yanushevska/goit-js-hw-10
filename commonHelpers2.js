import"./assets/styles-666cf17f.js";import{i as l}from"./assets/vendor-77e16229.js";import{g as c}from"./assets/izitoast-options-5f196598.js";const r=document.querySelector("[js-form]"),m=r.querySelector("[js-delay]"),u=r.querySelector("[js-fulfil]");r.addEventListener("submit",a);function a(e){e.preventDefault();const t=m.value,o=u.checked;f(t,o).then(s=>{i(s,!0)}).catch(s=>{i(s,!1)}),e.target.reset()}function f(e,t){const o=d(e,t);return new Promise((n,s)=>{setTimeout(()=>{t?n(o):s(o)},e)})}function d(e,t){let o=t?"✅ Fulfilled":"❌ Rejected";return o+=` promise in ${+e}ms`,o}function i(e,t){console.log(e),l.show(c(e.slice(2),t))}
//# sourceMappingURL=commonHelpers2.js.map
