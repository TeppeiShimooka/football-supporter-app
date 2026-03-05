const slider = document.querySelector(".slider");
const menuBtn = document.querySelector(".menu-btn");
const leagueImg  = document.querySelector(".league-img");
const leagueBtn = document.querySelectorAll(".nav-items");
const leagueName = document.querySelector(".league-name");
const leagueIconBtn = document.querySelectorAll(".nav-league-icon-btn");
const leagueIconSrc = document.querySelectorAll(".nav-league-icon");



const sliderEvent = menuBtn.addEventListener('click' , ()=>{
    slider.classList.toggle("hidden");
});



const leagueNameJp = {
    "PL":"プレミアリーグ",
    "PD":"ラ・リーガ",
    "BL1":"ブンデスリーガ",
    "SA":"セリエA",
    "FL1":"リーグ・アン",
    "DED":"エールディビジ",
    "CL":"UEFAチャンピオンズリーグ"
}

const fetchMatches = async (url)=>{
    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        console.log('取得したデータ:' , data);

        leagueImg.src = data.competition.emblem;
        leagueName.textContent = leagueNameJp[data.competition.code];


        











    }catch (error){
        console.log('データの取得に失敗した:' , error)
    }


   ;
}



const leagueCode = {
    "プレミアリーグ": "PL",
    "ラ・リーガ":"PD",
    "ブンデスリーガ":"BL1",
    "セリエA":"SA",
    "リーグ・アン":"FL1",
    "エールディビジ":"DED",
    "UEFAチャンピオンズリーグ":"CL"
};

leagueIconBtn.forEach(button=>{
    button.addEventListener('click' , ()=>{
        const code = button.dataset.code;
        if(code){
            const leagueURL = `http://localhost:3000/api/matches/${code}`;
            fetchMatches(leagueURL);
        }else{
            console.error("ボタンにデータが設定されていないかデータが間違っている");
        }
    });
});



leagueBtn.forEach(button => {
    button.addEventListener('click' , async ()=>{
        
        const btnTextcontent = button.textContent.trim();
        const code  = leagueCode[btnTextcontent];

        if(code){
            const leagueURL = `http://localhost:3000/api/matches/${code}`;
            await fetchMatches(leagueURL);
        }
    })
})









