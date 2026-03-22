
const slider = document.querySelector(".slider");
const menuBtn = document.querySelector(".menu-btn");
const leagueImg  = document.querySelector(".league-img");
const leagueBtn = document.querySelectorAll(".nav-items");
const leagueName = document.querySelector(".league-name");
const leagueIconBtn = document.querySelectorAll(".nav-league-icon-btn");
const leagueIconSrc = document.querySelectorAll(".nav-league-icon");
const selectedSeason = document.querySelector(".selected-season");
 
const rennderSeason = ()=>{

    const seasonValue = document.querySelector(".season-value-now");
    const seasonValuebefore = document.querySelector(".season-value-before");
    const seasonValuebefore2 = document.querySelector(".season-value-before2");
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();

    seasonValue.value = nowYear - 1;
    seasonValue.textContent = `${nowYear - 1}/${nowYear}`;

    seasonValuebefore.value = nowYear - 2;
    seasonValuebefore.textContent = `${nowYear - 2}/${nowYear - 1}`;
    
    seasonValuebefore2.value = nowYear - 3;
    seasonValuebefore2.textContent = `${nowYear - 3}/${nowYear - 2}`;

};
rennderSeason();


selectedSeason.addEventListener('change' , () => {
    const currentLeagueCode = leagueCode[leagueName.textContent];
    const selectedSeasonValue = selectedSeason.value;

    if(currentLeagueCode){
        const url = `http://localhost:3000/api/matches/${currentLeagueCode}?season=${selectedSeasonValue}`;
        fetchMatches(url);
    }else{
        return
    };
});




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
        const matchItemsDiv = document.createElement("div");
        matchItemsDiv.className = "match-items";

        const matchDivBtn = document.createElement("button");
        matchDivBtn.className = "match-div-btn";

        const matchDate = createMatchDateElement(match);
        const matchCard = createMatchCardElement(match);
        matchItemsDiv.appendChild(matchDate);
        matchItemsDiv.appendChild(matchCard);
        matchDivBtn.appendChild(matchItemsDiv);
        upcomingSection.appendChild(matchDivBtn);
    });

    const pastMatches = matches.filter(m => new Date(m.utcDate) < now );
    pastMatches.forEach(match => {

        const matchDivBtn = document.createElement("button");
        matchDivBtn.className = "match-div-btn";
  
        const matchDate = createMatchDateElement(match);
        const matchCard = createMatchCardElement(match);
        matchDivBtn.appendChild(matchDate);
        matchDivBtn.appendChild(matchCard);
        pastSection.appendChild(matchDivBtn);

    });

    nowMaker.scrollIntoView({ behavior: 'smooth', block: 'start' });
};


const createMatchDateElement = (match) => {

    const matchDate = new Date(match.utcDate);
    const year = matchDate.getFullYear();
    const month = matchDate.getMonth() + 1;
    const days = matchDate.getDate();
    const hours = matchDate.getHours();
    const minutes = matchDate.getMinutes();

    const timeString = `${year} ${month}/${days} ${hours}:${minutes.toString().padStart(2, '0')}`;

  
    const matchDateDiv = document.createElement("div");
    matchDateDiv.className = "match-date";
    matchDateDiv.textContent = timeString;

    return matchDateDiv;

};

const createMatchCardElement = (match) => {

    const TameNameJp = {
        //---PL----
        "64": "リヴァプール",
        "1044": "ボーンマス",
        "58": "アストンヴィラ",
        "67": "ニューカッススル",
        "397": "ブライトン",
        "63": "フラム",
        "71": "サンダーランド",
        "563": "ウェストハム",
        "73": "トッテナム",
        "328": "バーンリー",
        "76": "ウルブス",
        "65": "マンC",
        "351": "ノッティンガム・フォレスト",
        "402": "ブレントフォード",
        "61": "チェルシー",
        "354": "クリスタルパレス",
        "66": "マンU",
        "57": "アーセナル",
        "341": "リーズ",
        "62": "エヴァートン",

        //---RL---
        "298": "ジローナ",
        "87": "ラージョ",
        "94": "ビジャレアル",
        "1048": "レアル・オビエド",
        "89": "マヨルカ",
        "81": "バルセロナ",
        "263": "アラベス",
        "88": "レバンテ",
        "95": "バレンシア",
        "92": "レアル・ソシエダ",
        "558": "セルタ",
        "82": "ヘタフェ",
        "77": "アスレティック・ビルバオ",
        "559": "セビージャ",
        "80": "エスパニョール",
        "78": "アトレティコ・マドリード",
        "285": "エルチェ",
        "90": "レアル・ベティス",
        "86": "レアル・マドリード",
        "79": "オサスナ",

        //---BL---
        "5": "バイエルン・ミュンヘン",
        "721": "RBライプツィヒ",
        "19": "フランクフルト",
        "12": "ヴェルダー・ブレーメン",
        "3": "レバークーゼン",
        "2": "ホッフェンハイム",
        "17": "フライブルク",
        "16": "アウクスブルク",
        "28": "ウニオン・ベルリン",
        "10": "シュトゥットガルト",
        "44": "ハイデンハイム",
        "11": "ヴォルフスブルク",
        "20": "ザンクトパウリ",
        "4": "ボルシア・ボルトムント",
        "15": "マインツ",
        "1": "FCケルン",
        "18": "ボルシアMG",
        "7": "ハンブルガーSV",

        //---SA---
        "107": "ジェノア",
        "5890": "レッチェ",
        "471": "サッスオーロ",
        "113": "ナポリ",
        "98": "ACミラン",
        "457": "USクレモネーゼ",
        "100": "ASローマ",
        "103": "ボローニャ",
        "104": "カリアリ",
        "99": "フィオレンティーナ",
        "7397": "コモ1907",
        "110": "ラツィオ",
        "102": "アトランタ",
        "487": "ピサ",
        "109": "ユヴェントス",
        "112": "パルマ",
        "115": "ウディネーゼ",
        "450": "エラス・ヴェローナ",
        "108": "インテル",
        "586": "トリノ",


        //---L1---
        "529": "スタッド・レンヌ",
        "516": "オリンピック・マルセイユ",
        "546": "RCランス",
        "523": "オリンピック・リヨン",
        "548": "ASモナコ",
        "533": "ル・アヴール",
        "522": "リール",
        "511": "トゥールーズ",
        "512": "スタッド・ブレスト",
        "521": "ニース",
        "519": "オセール",
        "525": "ロリアン",
        "545": "メス",
        "576": "RCストラスブール",
        "532": "アンジェ",
        "1045": "パリFC",
        "543": "FCナント",
        "524": "パリ・サンジェルマン",

        //---ED---
        "1920": "フォルトゥナ",
        "718": "ゴーアヘッド",
        "1915": "NECナイメヘン",
        "670": "エクセルシオール",
        "675": "フェイエノールト",
        "681": "NACブレダ",
        "673": "ヘーレンフェーン",
        "1919": "フォレンダム",
        "674": "PSV",
        "6806": "スパルタ・ロッテルダム",
        "684": "ズヴォレ",
        "666": "FCトゥウェンテ",
        "678": "アヤックス",
        "1912": "テルスター",
        "682": "AZ",
        "677": "フローニンゲン",
        "676": "ユトレヒト",
        "671": "ヘラクレス",


        //---other---
        "3929": "ユニオン",
        "1903": "ベンフィカ",
        "611": "カラバフFK",
        "930": "SKスラヴィア・プラハ",
        "5721": "ボデ/グリムド",
        "654": "オリンピアコス",
        "11034": "パフォスFC",
        "1876": "FCコペンハーゲン",
        "851": "クラブ・ブルッヘ",
        "610": "ガラタサライ",
        "498": "スポルティングCP",
        "10601": "カイラト"
    };

    const homeTeam = match.homeTeam;
    const homeTeamIconImgSrc = homeTeam.crest;
    const homeTeamId = homeTeam.id;
    const homeTeamName = TameNameJp[homeTeamId] || homeTeam.shortName;
    
    const homeTeamDiv = document.createElement("div");
    homeTeamDiv.className = "homeTeam-icon-name-div";

    const homeTeamIconImg = document.createElement("img");
    homeTeamIconImg.className = "homeTeam-icon-img";
    homeTeamIconImg.src = homeTeamIconImgSrc;
    homeTeamDiv.appendChild(homeTeamIconImg);

    const homeTeamNameDiv = document.createElement("div");
    homeTeamNameDiv.className = "homeTeam-name-div";
    homeTeamNameDiv.textContent = homeTeamName;
    homeTeamDiv.appendChild(homeTeamNameDiv);  

    const awayTeam = match.awayTeam;
    const awayTeamIconImgSrc = awayTeam.crest;
    const awayTeamId = awayTeam.id;
    const awayTeamName = TameNameJp[awayTeamId] || awayTeam.shortName;
    
    const awayTeamDiv = document.createElement("div");
    awayTeamDiv.className = "awayTeam-icon-name-div";

    const awayTeamIconImg = document.createElement("img");
    awayTeamIconImg.className = "awayTeam-icon-img";
    awayTeamIconImg.src = awayTeamIconImgSrc;
    awayTeamDiv.appendChild(awayTeamIconImg);

    const awayTeamNameDiv = document.createElement("div");
    awayTeamNameDiv.className = "awayTeam-name-div";
    awayTeamNameDiv.textContent = awayTeamName;
    awayTeamDiv.appendChild(awayTeamNameDiv);  

    const matchItemsDiv = document.createElement("div");
    matchItemsDiv.className = "match-items";
    matchItemsDiv.appendChild(homeTeamDiv);
    matchItemsDiv.appendChild(awayTeamDiv);

    return matchItemsDiv;

};








    





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
        const selectedSeason = document.querySelector(".selected-season");
        const selectedYear = selectedSeason.value;
        if(code){
            const leagueURL = `http://localhost:3000/api/matches/${code}?season=${selectedYear}`;
            fetchMatches(leagueURL);
        }else{
            console.error("ボタンにデータが設定されていないかデータが間違っている");
        }
    });
});



leagueBtn.forEach(button => {
    button.addEventListener('click' , async ()=>{
        const selectedSeason = document.querySelector(".selected-season");
        const selectedYear = selectedSeason.value;
        const btnTextcontent = button.textContent.trim();
        const code  = leagueCode[btnTextcontent];

        if(code){
            const leagueURL = `http://localhost:3000/api/matches/${code}?season=${selectedYear}`;
            await fetchMatches(leagueURL);
        }
    })
})









