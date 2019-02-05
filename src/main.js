//Manejo del DOM

import {checkAuthStatus, registerUser, logoutUser} from '../src/data.js';

window.onload = () =>{
    //Verifica estado de conexión del usuario
    checkAuthStatus((user)=>{
        if(user){
            //Usuario logeado, muestra menú y home
            header.style.display = "block";
            footer.style.display = "block";
            root.style.display = "block";
            loginPage.style.display = 'none';
            post.style.display = "block";
            //Muestra el nombre
            if(user !== null){
                let name = user.displayName.split(" ");
                document.getElementById('user-name').innerHTML = name[0];
            }
        }else{
            //Muestra el login, ya que usuario no está logeado
            loginPage.style.display = "block";
            header.style.display = "none";
            root.style.display = "none";
            footer.style.display = 'none';
            post.style.display = "none";
        }
    });
    //Llama a la función registro con Google
    const registerWithGoogle = () =>{
        registerUser();
    }
    const logoutUsers = () =>{
        logoutUser();
    }

    //Si hace click al botón Google, llama a la función registro con Google
    googleregistry.addEventListener('click',registerWithGoogle);
    logout.addEventListener('click',logoutUsers);

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