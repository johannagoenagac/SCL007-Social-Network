//Manejo del DOM

import {checkAuthStatus, registerUser} from '../src/data.js';

window.onload = () =>{

    checkAuthStatus((user)=>{
        if(user){
            auth.style.display = "none";
            root.style.display = "block";
        }else{
            auth.style.display = "block";
            root.style.display = "none";
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

// home.addEventListener("click", () => {
//     pageGuide.innerHTML = "Home";
// });

// search.addEventListener("click", () => {
//     pageGuide.innerHTML = "Buscar";
// });

// add.addEventListener("click", () => {
//     pageGuide.innerHTML = "Post";
// });

// recipe.addEventListener("click", () => {
//     pageGuide.innerHTML = "Receta";
// });

// user.addEventListener("click", () => {
//     pageGuide.innerHTML = "Perfil";
// });