var d = document;

d.addEventListener('DOMContentLoaded',()=>{
    d.addEventListener("click",(e)=>{
        if(e.target.matches("#main-hamburger") ||e.target.matches(".header-main-h2-span")) {
            hamburger = d.querySelector("#main-hamburger-content");
            hamburger.classList.toggle("header-main-content-hidden");
        }
    },false);

    d.addEventListener("click",(e)=>{ 
        if(e.target.matches(".header-main-content-list-items a")) {
            hamburger = d.querySelector("#main-hamburger-content");
            hamburger.classList.toggle("header-main-content-hidden");
        }
    },false);
});


