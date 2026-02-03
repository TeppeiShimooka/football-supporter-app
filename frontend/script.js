const slider = document.querySelector(".slider");
const menuBtn = document.querySelector(".menu-btn");


const sliderEvent = menuBtn.addEventListener('click' , ()=>{
    slider.classList.toggle("hidden");
});

const API_URL = 'http://localhost:3000/api/matches';

const fetchMatches = async ()=>{
    try{
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error('Network response was not ok');

        const data = response.json();
        console.log('取得したデータ:' , data);

    }catch (error){
        console.log('データの取得に失敗した:' , error)
    }
}

fetchMatches();



