import{h as g,p as m,a as s,Y as f,N as r,k as e,E as c,g as _}from"./q-DxS6npjT.js";import{c as h}from"./q-CBvf0knn.js";import{_ as d}from"./q-BKZ00VYc.js";const y=async()=>{const[n,l,o]=g();try{const t=await h.getContentByCode("GHHrrNrXYRDkkWuwZyYbEoIsSdZhCHDwtzvn2jD2elHbc0RgljqE7xd");t&&t.value_image&&t.value_image.length>0&&(o.value=t.value_image[0].image||"",console.log("Splash logo loaded:",o.value))}catch(t){console.error("Error loading splash logo:",t)}const a=1500,u=Date.now(),i=()=>{const t=Date.now()-u,p=Math.max(0,a-t);setTimeout(()=>{n.value=!1,setTimeout(()=>{l.value=!1},100)},p)};document.readyState==="complete"?i():window.addEventListener("load",i)},b=Object.freeze(Object.defineProperty({__proto__:null,_hW:_,s_GNA0T7zeUA8:y},Symbol.toStringTag,{value:"Module"})),v=`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.8;
      }
    }

    @keyframes fadeInLogo {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes spinSlow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .splash-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease-out;
    }

    .splash-container.fade-out {
      animation: fadeOut 0.8s ease-out forwards;
    }

    .logo-container {
      position: relative;
      animation: fadeIn 0.8s ease-out;
    }

    .logo-image {
      width: 120px;
      height: 120px;
      object-fit: contain;
      border-radius: 0;
      animation: fadeInLogo 0.6s ease-out 1s forwards, pulse 2s ease-in-out 1.6s infinite;
      background: transparent;
      padding: 0;
      mix-blend-mode: multiply;
      filter: contrast(1.1) brightness(1.1);
      opacity: 0;
    }

    .loading-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-top-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      animation: spinSlow 1.5s linear infinite;
    }

    .loading-text {
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 2px;
      white-space: nowrap;
      opacity: 0.9;
    }

    .loading-dots {
      display: inline-block;
      width: 20px;
      text-align: left;
    }

    @keyframes dotPulse {
      0%, 20% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .dot {
      animation: dotPulse 1.4s infinite;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }
  `,w=Object.freeze(Object.defineProperty({__proto__:null,s_u5f7EOK6pGQ:v},Symbol.toStringTag,{value:"Module"})),x=()=>{m(r(()=>d(()=>Promise.resolve().then(()=>w),void 0),"s_u5f7EOK6pGQ"));const n=s(!0),l=s(!0),o=s("");return f(r(()=>d(()=>Promise.resolve().then(()=>b),void 0),"s_GNA0T7zeUA8",[l,n,o])),n.value?e("div",null,{class:c(a=>`splash-container ${a.value?"":"fade-out"}`,[l])},e("div",null,{class:"logo-container"},[e("div",null,{class:"loading-ring"},null,3,null),o.value?e("img",null,{src:c(a=>a.value,[o]),alt:"Logo",class:"logo-image",width:120,height:120},null,3,"fn_0"):e("div",null,{class:"logo-image",style:"display: flex; align-items: center; justify-content: center; font-size: 48px;"},e("img",null,{src:"media/images/default-logo.png",alt:"",width:48,height:48},null,3,null),3,null),e("div",null,{class:"loading-text"},["LOADING",e("span",null,{class:"loading-dots"},[e("span",null,{class:"dot"},".",3,null),e("span",null,{class:"dot"},".",3,null),e("span",null,{class:"dot"},".",3,null)],3,null)],3,null)],1,null),1,"fn_1"):null},j=Object.freeze(Object.defineProperty({__proto__:null,s_RjVK2gUWK9M:x},Symbol.toStringTag,{value:"Module"}));export{_ as _hW,j as s,y as s_GNA0T7zeUA8,x as s_RjVK2gUWK9M,v as s_u5f7EOK6pGQ};
