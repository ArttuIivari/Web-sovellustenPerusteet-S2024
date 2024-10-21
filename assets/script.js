
var cash = 0;
var click = {power:1,multiplier:1.0};
var building = [
        {id:0,cost:50,amount:0,amountPenalty:1.0,production:1.0,multiplier:1.0,type:1},
        {id:1,cost:1000,amount:0,amountPenalty:1.0,production:5.0,multiplier:1.0,type:2},
        {id:2,cost:25000,amount:0,amountPenalty:1.0,production:30.0,multiplier:1.0,type:3},
        {id:3,cost:25000,amount:0,amountPenalty:1.0,production:30.0,multiplier:1.0,type:4},
]
var upgrade = [
    {id:0,cost:25,purchased:0,type:1, prodMultiplierAdd:0.5,prodFlatAdd:0},
    {id:1,cost:750,purchased:0,type:0, prodMultiplierAdd:0,prodFlatAdd:2},
]
function upgradeSpecs(index, buildingtype){
    if(buildingtype == 0){
        click.power += upgrade[index].prodFlatAdd;
        click.multiplier += upgrade[index].prodMultiplierAdd;
    }
    if(buildingtype > 0){
        building[buildingtype-1].production += upgrade[index].prodFlatAdd;
        building[buildingtype-1].multiplier += upgrade[index].prodMultiplierAdd;
    }
}
var searchterm = "walter white";
    try{
    document.getElementById("gifForm").addEventListener("submit",function(event){
        event.preventDefault();
        console.log(event);
        
        searchterm = document.getElementById("GIFsearch").value;
        console.log(searchterm);
        document.getElementById("gifForm").reset();
        fetchGifs();
    });
} catch {
    console.log("search error");
}


for (let i = 0; i < 2; i++) {
    try {
        document.getElementById("upgrade"+i).addEventListener("click", function () {
            upgrades(i);
        });
    } catch {
        console.log("upgradebutton error");
    }
}
try{
document.getElementById("clickerButton").addEventListener('click',clicker);
} catch{
    console.log("clickerbuttonerror");
}

try{
document.getElementById("linkToClicker").addEventListener("click",(function(){window.location.replace("clicker.html");}));
} catch{
    console.log("linktoclicker error");
}
try {
    document.getElementById("buildingButton0").addEventListener("click", function () {
        buildings(0);
    });
} catch {
    console.log("build0 error");
}
try {
    document.getElementById("buildingButton1").addEventListener("click", function () {
        buildings(1);
    });
} catch {
    console.log("build1 error");
}
function clicker(){
    cash += (click.power * click.multiplier);
    updateCash();
}

function upgrades(num){
    if(cash >= upgrade[num].cost){
        upgrade[num].purchased = 1;
        cash = cash - upgrade[num].cost;
        upgradeSpecs(num, upgrade[num].type);
        updateCash();
        document.getElementById("upgrade"+num).remove();
    }
}

function buildings(num) {
    let penaltymultiplier = 1.05;
    if (cash >= building[num].cost) {

        building[num].amount++;
        cash = Math.round((cash - building[num].cost) * 100)/100;
        building[num].amountPenalty = Math.round(building[num].amountPenalty * penaltymultiplier * 100) / 100;
        building[num].cost = Math.round(building[num].cost * building[num].amountPenalty * 100) / 100;
        console.log(building[num].amount + " buildings");
    }
    updateCash();
    document.getElementById("buildingCost"+num).innerHTML = building[num].cost.toFixed(1);
}
class gifs {
    constructor(index, url, previewUrl) {
        this.index = index;
        this.url = url;
        this.previewUrl = previewUrl;
    }
}

var gifStash = [];
fetchGifs();

async function fetchGifs(){
    var response = await fetch("https://tenor.googleapis.com/v2/search?q="+searchterm+"&key=AIzaSyAYNNt2KSHHOgfNqJS6hqEC0lKJcW6QgBk&client_key=my_test_app&limit=20")
    .then(response => response.json())
    .then(data => {
        let randomarray = [];
        while(randomarray.length < 5){
            var r = Math.floor(Math.random() * 20);
            if(randomarray.indexOf(r) === -1) randomarray.push(r);
            
        }
        
        for(let i = 0; i<building.length+1; i++){
            
            
            gifStash[i] = new gifs(i,data.results[randomarray[i]].media_formats.gif.url,data.results[randomarray[i]].media_formats.gifpreview.url);
            
        }
       insertgifs();
        
    
    })
    .catch(error => console.error(error));
}



function updateCash(){
    document.getElementById("cash").innerHTML = "Cash: " + cash.toFixed(1);
}

setInterval(timer, 1000);
function timer() {
    try {
        for (let i = 0; building.length > i; i++) {
            cash += building[i].amount * building[i].production * building[i].multiplier;
        }
        updateCash();
    } catch {
        console.log("timer error");
    }
}

function getRandomInteger(min,max){
    let i=0;
    while(randomarray.length < 10){
        var r = Math.floor(Math.random() * (max - min + 1)) + min;
        if(randomarray.indexOf(r) === -1) randomarray.push(r);
        console.log(randomarray[r]);
    }
    


}

function insertgifs(){
    console.log(gifStash[0].url);
    document.getElementById("clickerImage").src = gifStash[0].url;
    try{
    for(let i=1; gifStash.length>i; i++){
        
        document.getElementById("buildingImage"+(i-1)).src = gifStash[i].url;
    }
    } catch{
        console.log("Error inserting images");
    }
    for(let index=0; upgrade.length>index; index++){
        
        for(let typeindex=0; building.length>typeindex; typeindex++){

            if(building[typeindex].type == upgrade[index].type){

                document.getElementById("upgradeImage"+index).src = gifStash[(typeindex+1)].url;
                console.log("image insertion successful");
            }
            if(upgrade[index].type == 0){
                document.getElementById("upgradeImage"+index).src = gifStash[0].url;
            }
        }
    }
}

// Tällä tavalla saa laitettuu style tiedostoon muutoksia muuttujien avulla
var rs = document.querySelector(":root");
rs.style.setProperty("--image",'url("../assets/images/shrek.png")');