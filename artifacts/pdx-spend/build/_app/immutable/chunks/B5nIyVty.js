import{a as v,f as y}from"./DrcGT_JG.js";import{t as g,s as n,c as o,r as c,g as i,u as x,d as S,b as l}from"./Dl5EMnMe.js";import{d as k,a as T,s as u}from"./DLuiya64.js";var _=y('<aside class="share"><p class="kicker">SHARE THIS STORY</p> <pre class="share-copy"> </pre> <button type="button" class="share-copy-btn"> </button></aside>');function R(m,t){const d=x(()=>`${t.headline}

${t.summary}

— PDX Spend, ${t.url}`);let e=S(!1),p;async function f(){try{await navigator.clipboard.writeText(i(d)),l(e,!0),clearTimeout(p),p=setTimeout(()=>l(e,!1),1800)}catch{l(e,!1)}}var a=_(),s=n(o(a),2),b=o(s,!0);c(s);var r=n(s,2),h=o(r,!0);c(r),c(a),g(()=>{u(b,i(d)),u(h,i(e)?"Copied":"Copy social text")}),T("click",r,f),v(m,a)}k(["click"]);export{R as S};
