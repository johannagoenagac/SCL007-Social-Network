//Manejo del DOM

import {checkAuthStatus, registerUser} from '../src/data.js';

window.onload = () =>{

    checkAuthStatus((user)=>{
        if(user){
            header.style.display = "block"
            auth.style.display = "none";
            root.style.display = "block";
            loginPage.style.display = "none";
            post.style.display = "none";
        }else{
            header.style.display = "none";
            loginPage.style.display = "block";
            auth.style.display = "block";
            root.style.display = "none";
            footer.style.display = "none"
            post.style.display = "none";
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
    post.style.display = "block";

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
 
    var fileUpload = document.getElementById('file-upload');
    fileUpload.onchange = function (e) {
        readFile(e.srcElement);
    }
});

recipeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Receta";
});

userLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Perfil";
});
