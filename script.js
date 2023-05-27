const container = document.querySelector(".container");
const alinan_koltuklar = document.querySelector(".alinan_koltuklar");
const toplam_para = document.querySelector(".toplam_fiyat_h2");
const al_btn = document.querySelector(".al_btn");

let koltuklarSec = document.querySelectorAll(".kutu");
let secilen_koltuklar;
let max = 81;
let para = 0;

function olustur(){
    for(let i = 0; i< max; i++){
        let koltuk = document.createElement("div");
        koltuk.classList.add("kutu", "overview");
        container.appendChild(koltuk);
    }
    koltuklarSec = document.querySelectorAll(".kutu");
}

let index_1 = 0;

function koltuklar() {
    const harfler = ['A', 'B', 'C', 'D', 'E', 'F', 'G', "H", "J"];
    const rakamlar = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let index = 0;
  
    for (let i = 0; i < harfler.length; i++) {
      for (let j = 0; j < rakamlar.length; j++) {
        const koltukBirles = harfler[i] + rakamlar[j];
        koltuklarSec[index].innerHTML = koltukBirles;
        if(rakamlar[j] === 4 || rakamlar[j] === 5){
        koltuklarSec[index].classList.add("mavi");
        }
        if(harfler[i] == "H" && rakamlar[j] == "4" || harfler[i] == "E" && rakamlar[j] == "1" || harfler[i] == "B" && rakamlar[j] == "4" || harfler[i] == "B" && rakamlar[j] == "5"){
        koltuklarSec[index].classList.add("dolu");

        }
        index++;
      }
    }
   koltuklarSec.forEach((item)=>{
    item.addEventListener("click", function(e){
      if(!e.target.classList.contains("active")){
        if(index_1 <= 9){
          let koltukYarat = document.createElement("div");
          koltukYarat.classList.add("secili_koltuklar");
          
          koltukYarat.innerHTML = e.target.textContent;
          alinan_koltuklar.appendChild(koltukYarat)
          para += 110;
          index_1++;
          toplam_para.innerHTML = `${para} TL`;
          al_btn.style.backgroundColor = "#88dbee";
          al_btn.innerHTML = "Ödeme Yap";
        }
      }
      else{
        secilen_koltuklar = document.querySelectorAll(".secili_koltuklar");
        secilen_koltuklar.forEach((item)=>{
          if(item.textContent === e.target.textContent){
            item.remove()
            index_1--;
            para -= 110;
            toplam_para.innerHTML = `${para} TL`;
            if(index_1 == 0){
              al_btn.style.backgroundColor = "#5e58e9";
              al_btn.innerHTML = "Koltuk Seçiniz";
            }
          }
        })
      }
      if(index_1 <= 9){
        item.classList.toggle("active");
      }
      silKutu()
      // console.log(index_1)
    })
  })
}

olustur()
koltuklar()


function silKutu() {
  secilen_koltuklar = document.querySelectorAll(".secili_koltuklar");
  
  secilen_koltuklar.forEach((item) => {
    item.onclick = function() {
      koltuklarSec.forEach((item_1) => {
        if (item_1.textContent === item.textContent) {
          item_1.classList.remove("active");
        }
      });
      item.remove();
      index_1--;
      para -= 110;
      toplam_para.innerHTML = `${para} TL`;
      if(index_1 == 0){
        al_btn.style.backgroundColor = "#5e58e9";
        al_btn.innerHTML = "Koltuk Seçiniz";
      }
    };
  });
}





const yenile = document.querySelector(".yenile").addEventListener("click",()=>location.reload())

const input = document.querySelector(".input_icerik");
const seans_film_alani = document.querySelector(".ilgili_alan");
const aranan_film = document.querySelector(".filmleri_goster");

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const url = "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    let goster =  data.results.slice(0,10)
    seans_film_alani.innerHTML = "";
    gosterFilm(goster) 
  } catch (error) {
    console.log(error);
  }
}


function gosterFilm(goster){
  seans_film_alani.innerHTML = "";
  aranan_film.innerHTML = "";

  goster.forEach((item)=>{
    let film_kutusu = document.createElement("div");
    film_kutusu.classList.add("film_1");

    const baslik = item.title;
    const kapak = item.poster_path;
    const reyting = item.vote_average;

    film_kutusu.insertAdjacentHTML("beforeend", `
    <img src = "${IMG_PATH + kapak}" alt="${baslik}">
    <div class = "bilgi">
    <h2>${baslik}</h2>
    <h2 class="reyting">${reyting}</h2>
    </div>
    `)

    aranan_film.appendChild(film_kutusu);

    console.log(item)
  })
}


input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    let inputValue = input.value;

    if (inputValue && inputValue !== "") {
      const searchUrl = url + inputValue;
      fetchData(searchUrl);
    }
  }
});

