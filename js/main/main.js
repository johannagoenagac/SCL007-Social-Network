//Manejo del DOM

import { checkAuthStatus, registerUserGoogle, registerUserFacebook, logoutUser } from '../auth/auth.js';
import { savePost } from '../data/data.js';

const loginPage = document.getElementById("loginPage");
let nameUser = '';
let userImg = '';
window.onload = () => {
    //Verifica estado de conexión del usuario
    checkAuthStatus((user) => {
        if (user) {
            //Usuario logeado, muestra menú y home
            header.style.display = "block";
            footer.style.display = "block";
            root.style.display = "block";
            loginPage.style.display = "none";
            post.style.display = "none";
            profile.style.display = "none";
            //Muestra nombre del usuario
            if (user !== null) {
                nameUser = user.displayName;
                userImg = user.photoURL;                
                let name = user.displayName.split(" ");
                document.getElementById('user-name').innerHTML = name[0];
            }
        } else {
            //Muestra el login, ya que usuario no está logeado
            header.style.display = "none";
            loginPage.style.display = "block";
            root.style.display = "none";
            footer.style.display = "none"
            post.style.display = "none";
            profile.style.display = "none";
        }
    });
    //Llama a la función registro con Google, facebook
    const registerWithFacebook = () => { registerUserFacebook(); }
    const registerWithGoogle = () => { registerUserGoogle(); }
    

    //Si hace click al botón Google, llama a la función registro con Google
    googleRegistry.addEventListener('click', registerWithGoogle);

    //Si hace click al botón Facebook, llama a la función registro con Facebook
    facebookRegistry.addEventListener('click', registerWithFacebook);
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
    profile.style.display = "none";
    var filePreview = document.createElement('img');
    //Funcion para cargar la imagen del post
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                filePreview.id = 'saveFilePreview';
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
    //Funcion para subir la informacion del post a Firebase
    const savePostIntoDatabase = () => {
        console.log('savefilepreview')
        const postImage = saveFilePreview.src;
        const fullPostText = postText.value;
        const userID = firebase.auth().currentUser.uid;
        savePost(postImage, fullPostText, userID);
    }
    send.addEventListener("click", (event) => {
        event.preventDefault();
        savePostIntoDatabase();
    });
});

recipeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Receta";
});

userLogo.addEventListener("click", (event) => {
    event.preventDefault();
    pageGuide.innerHTML = "Perfil";
    home.style.display = "none";

    post.style.display = "none";
    profile.style.display = "block";
    let showImg = '';
    if(userImg === undefined){
        showImg = "style/img/user.png";
    }else{
        showImg = userImg;
    }                  

    profile.innerHTML = `
    <section id = "userInfo">
    <div class="row flexRow">
        <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
            <img class="cardProfileImage" src=${showImg}></img>
            <button type="button" id="logout">
                <span>Cierra sesión <span id="user-name-marker"></span></span>
            </button>
        </div>
        <div id="userInfo" class="col-xs-7 col-s-8 col-m-8 col-l-8 alignment">    
            <span id="fullName">${nameUser}</span>
        </div>
    </div>
    </section>
    <section id = "userbiography">
        <div class="row container">
            <div class="col-s-12 m-12 l-12">
                <textarea id="biography" class = "biography" placeholder="Escribenos de ti"></textarea>
                <button type="button" id="sendBiography">
                    <span>Editar biografía</span>
                </button>
            </div>
        </div>
    </section>
    <section id = "">
    </section>`

     
    //Llama a la función de cierre sesión
    const logoutUsers = () => { 
        logoutUser(); 
    }
    //Si hace click al botón Logout, llama a la función Logout
    logout.addEventListener('click', logoutUsers);
    

    

});
