let e=null;const t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");d.disabled=!0,t.addEventListener("click",(()=>{t.disabled=!0,d.disabled=!1,e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),d.addEventListener("click",(()=>{clearInterval(e),t.disabled=!1,d.disabled=!0}));
//# sourceMappingURL=01-color-switcher.8f20c1c8.js.map