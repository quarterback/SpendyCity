import{a as y,f as b}from"./D9OJ8qP2.js";import{t as g,g as o,C as c,s as n,F as x,G as k,c as i,r as l}from"./YlniFg-W.js";import{d as S,a as T,s as u}from"./DzaUzOeE.js";var _=b('<aside class="share"><p class="kicker">SHARE THIS STORY</p> <pre class="share-copy"> </pre> <button type="button" class="share-copy-btn"> </button></aside>');function R(m,t){const p=x(()=>`${t.headline}

${t.summary}

${t.url}`);let e=k(!1),d;async function f(){try{await navigator.clipboard.writeText(o(p)),c(e,!0),clearTimeout(d),d=setTimeout(()=>c(e,!1),1800)}catch{c(e,!1)}}var a=_(),s=n(i(a),2),h=i(s,!0);l(s);var r=n(s,2),v=i(r,!0);l(r),l(a),g(()=>{u(h,o(p)),u(v,o(e)?"Copied":"Copy social text")}),T("click",r,f),y(m,a)}S(["click"]);export{R as S};
