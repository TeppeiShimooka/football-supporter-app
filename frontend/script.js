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

const rennderMacthSchedule = (data)=>{
    const pastSection = document.querySelector(".past-section");
    const nowMaker = document.querySelector(".now-maker");
    const upcomingSection = document.querySelector(".upcoming-section");

    pastSection.innerHTML = "";
    upcomingSection.innerHTML = "";



    const now = new Date();
    const matches = data.matches;

    const upcmoingMatches = matches.filter(m => new Date(m.utcDate) >= now);
    upcmoingMatches.forEach(match => {
        const macthCard = createMatchElement(match);
        upcomingSection.appendChild(macthCard);
    });

    const pastMatches = matches.filter(m => new Date(m.utcDate) < now );
    pastMatches.forEach(match => {
        const matchCard = createMatchElement(match);
        pastSection.appendChild(matchCard);

    });

    nowMaker.scrollIntoView({ behavior: 'smooth', block: 'start' });
};


const createMatchElement = (match) => {

    const matchDate = new Date(match.utcDate);
    const year = matchDate.getFullYear();
    const month = matchDate.getMonth() + 1;
    const days = matchDate.getDate();
    const hours = matchDate.getHours();
    const minutes = matchDate.getMinutes();

    const timeString = `${year} ${month}/${days} ${hours}:${minutes.toString().padStart(2, '0')}`;

    const matchDiv = document.createElement("div");
    matchDiv.className = "match-items";
    const matchDivBtn = document.createElement("button");
    matchDivBtn.className = "match-div-btn";
    matchDiv.appendChild(matchDivBtn);
    const matchDateDiv = document.createElement("div");
    matchDateDiv.className = "match-date";
    matchDivBtn.appendChild(matchDateDiv);
    matchDateDiv.textContent = timeString;







    return matchDiv;

};

    // console.log(pastMatches.length);
    // console.log(upcmoingMatches.length);


    





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


        rennderMacthSchedule(data);
    }catch (error){
        console.log('データの取得に失敗した:' , error)
    }


};



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









