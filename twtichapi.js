const clientId = 'fx2uvdsxkv4dbzuaoc5u0w9e43iv5e';
const apiUrl = 'https://api.twitch.tv/helix/';
const steams = document.getElementById("steamers");
const bg = document.getElementById("contanter");
const cinput = document.getElementById("int");
const cImage = document.getElementById("Image");

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
        'Authorization': 'Bearer r2uibsvqpoyj98gmh5y3i7eg7ga3fk', // Include an OAuth token if needed
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
  if(cinput.value.toLowerCase().replace(/[^\w\s]|_/gi, '') == starmername.toLowerCase()){
    alert("correct!!!")
    location.reload();
  }else if(cinput.value.replace(/\s/g, "") == ""){
    alert("Please Insert at least 1 charater")
    cinput.value = "";
  }else
  {
    alert("Inncorrect or misspelled")
    cinput.value = '';
  }
}

function convertToBlackAndWhiteFromUrl(imageUrl) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.crossOrigin = "Anonymous"; // Allow cross-origin images
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      
      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;       // Red
        data[i + 1] = avg;   // Green
        data[i + 2] = avg;   // Blue
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      var blackAndWhiteImageUrl = canvas.toDataURL();
      resolve(blackAndWhiteImageUrl);
    };
    img.onerror = function(error) {
      reject(error);
    };
    img.src = imageUrl;
  });
}

function hint(){
  if(hintused){
    alert("hint has already been used!");
  }else{
    convertToBlackAndWhiteFromUrl(currntstream.data[0].profile_image_url)
    .then(function(blackAndWhiteImageUrl) {
      cImage.src = blackAndWhiteImageUrl;
    })
    .catch(function(error) {
      alert("an error has apeared!");
    });
  }
  hintused=true;
}


function build(){
  console.log(currntstream)
  starmername = currntstream.data[0].display_name.toLowerCase().replace(/[^\w\s]|_/gi, ''); //removes specal charaters
  console.log(starmername);
  regex = new RegExp("\\b" + starmername + "\\b", "i"); 
  
  dist = currntstream.data[0].description.toLowerCase().replace(regex, '[streamername]'); // removes the names of the streamers junk
  descript = document.createElement("h1"); // creates the element
  descript.innerText = "steamer description = " + dist
  bg.appendChild(descript);
}

document.addEventListener("keydown" , e =>{
  if(e.key === "Enter"){
      guess();
  }
})
