const clientId = 'z7wgnsxfmdhmpjs7188ycn63ym3wwe';
const apiUrl = 'https://api.twitch.tv/helix/';
const steams = document.getElementById("steamers");
const bg = document.getElementById("contanter");
const cinput = document.getElementById("int");

let currntstream;//trash lets
let descript;
let hints;

let regex = /\welcomz/
let hintused = false;
let person;
let dist;
let starmername;
let array = []


array = steams.innerText.split("\n")

// Example function to get information about a specific channel
async function getChannelInfo(channelName) {
  try {
    const response = await fetch(`${apiUrl}users?login=${channelName}`, {
      headers: {
        'Client-ID': clientId,
        'Authorization': 'Bearer londuhvcq1awqq67kczfofngse2szt', // Include an OAuth token if needed
      },
    });

    const data = await response.json();
    currntstream = data;
    build();
  } catch (error) {
    console.error('Error fetching channel info:', error);
  }
}
getChannelInfo(array[Math.floor(Math.random() * array.length)]) // Math.floor(Math.random() * array.length)

function get(){
  getChannelInfo(array[Math.floor(Math.random() * array.length)])
}
function guess(){
  if(cinput.value == starmername){
    console.log('correct');
    cinput.value = '';
  }else if(cinput.value == ""){
    alert("Inncorrect")
    cinput.value = "";
  }else{
    console.log('incorrect');
    cinput.value = '';
  }
}
function hint(){
  if(hintused){
    alert("hint has already been used!");
  }else{
    console.log(currntstream.data[0])
  }
  hintused=true;
}
function build(){
  starmername = currntstream.data[0].display_name.toLowerCase().replace(/[^\w\s]|_/gi, ''); //removes specal charaters
  console.log(starmername);
  regex = new RegExp("\\b" + starmername + "\\b", "i"); 
  
  dist = currntstream.data[0].description.toLowerCase().replace(regex, '[streamername]'); // removes the names of the streamers junk
  descript = document.createElement("h1"); // creates the element
  descript.innerText = "steamer description = " + dist
  bg.appendChild(descript);
}
