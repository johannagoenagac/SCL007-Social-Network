//Manejo del DOM
import {checkOutStatus} from '../src/data.js';

window.onload = () =>{

    checkAuthStatus((user)=>{
        if(user){
            //ocular o mostrar divs de login o de menu
        }else{
    //ocular o mostrar divs de login o de menu
        }
    });

    const registerWithGoogle = () =>{
        registerUser();
    }

    googleregistry.addEventListener('click',registerWithGoogle);
   
};



const home = document.getElementById("homeLogo");
const search = document.getElementById("searchLogo");
const add = document.getElementById("addLogo");
const recipe = document.getElementById("recipeLogo");
const user = document.getElementById("userLogo");
const pageGuide = document.getElementById("pageGuide");

home.addEventListener("click", () => {
    pageGuide.innerHTML = "Home";
});

search.addEventListener("click", () => {
    pageGuide.innerHTML = "Buscar";
});

add.addEventListener("click", () => {
    pageGuide.innerHTML = "Post";
});

recipe.addEventListener("click", () => {
    pageGuide.innerHTML = "Receta";
});

user.addEventListener("click", () => {
    pageGuide.innerHTML = "Perfil";
});
