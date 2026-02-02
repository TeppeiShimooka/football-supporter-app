const slider = document.querySelector(".slider");
const menuBtn = document.querySelector(".menu-btn");


const sliderEvent = menuBtn.addEventListener('click' , ()=>{
    slider.classList.toggle("hidden");
});



