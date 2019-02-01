//Manejo del DOM

import {checkAuthStatus, registerUser} from '../src/data.js';

window.onload = () =>{

    checkAuthStatus((user)=>{
        if(user){
            auth.style.display = "none";
            root.style.display = "block";
            loginPage.style.display = "none";
        }else{
            header.style.display = "none";
            auth.style.display = "block";
            root.style.display = "none";
            footer.style.display = "none"
        }
    });

    const registerWithGoogle = () =>{
        registerUser();
    }

    googleregistry.addEventListener('click',registerWithGoogle);
   
};


homeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Home";
});

searchLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Buscar";
});

addLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Post";
});

recipeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Receta";
});

userLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Perfil";
});

