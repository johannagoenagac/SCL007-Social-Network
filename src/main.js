//Manejo del DOM

import {checkAuthStatus, registerUser} from '../src/data.js';

window.onload = () =>{

    checkAuthStatus((user)=>{
        if(user){
            auth.style.display = "none";
            root.style.display = "block";
        }else{
            auth.style.display = "none";
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

window.onload = () =>{

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
 
            reader.onload = function (e) {
                var filePreview = document.createElement('img');
                filePreview.id = 'file-preview';
                //e.target.result contents the base64 data from the image uploaded
                filePreview.src = e.target.result;
                console.log(e.target.result);
 
                var previewZone = document.getElementById('file-preview-zone');
                previewZone.appendChild(filePreview);
            }
 
            reader.readAsDataURL(input.files[0]);
        }
    }
 
    // //Agregando colecciones
    // var fileUpload = document.getElementById('file-upload');
    // fileUpload.onchange = function (e) {
    //     readFile(e.srcElement);
    // }

    // firebase.initializeApp({
    //     apiKey: "AIzaSyD1b9ekmHfKFDrVRZYArX9rF2tUbmWaWfc",
    //     authDomain: "f00dtravel.firebaseapp.com",
    //     projectId: "f00dtravel",
    //   });
      
    //   // Initialize Cloud Firestore through Firebase
    //   var db = firebase.firestore();

    //  // Agregar colecciones
    //   db.collection("users").add({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
    


    
};
