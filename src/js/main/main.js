//Manejo del DOM

import { checkAuthStatus, registerUserGoogle, registerUserFacebook, logoutUser } from '../auth/auth.js';
import { savePost } from '../data/data.js';

const loginPage = document.getElementById("loginPage");


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
            if (user !== null) {
                let name = user.displayName.split(" ");
                document.getElementById('user-name-marker').innerHTML = name[0];
                document.getElementById('user-name').innerHTML = name[0];
            }
        } else {
            //Muestra el login, ya que usuario no está logeado
            header.style.display = "none";
            loginPage.style.display = "block";
            auth.style.display = "block";
            root.style.display = "none";
            footer.style.display = "none"
            post.style.display = "none";
            profile.style.display = "none";
        }
    });
    //Llama a la función registro con Google

    const registerWithFacebook = () => {
        registerUserFacebook();
    }

    const registerWithGoogle = () => {
        registerUserGoogle();
    }
    const logoutUsers = () => {
        logoutUser();
    }

    //Si hace click al botón Google, llama a la función registro con Google
    googleRegistry.addEventListener('click', registerWithGoogle);

    //Si hace click al botón Facebook, llama a la función registro con Facebook
    facebookRegistry.addEventListener('click', registerWithFacebook);

    //Si hace click al botón Logout, llama a la función Logout
    logout.addEventListener('click', logoutUsers);
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

    // //Funcion para cargar la imagen del post
    // function readFile(input) {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();

    //         reader.onload = function (e) {
    //             var filePreview = document.createElement('img');
    //             filePreview.id = 'saveFilePreview';
    //             //e.target.result contents the base64 data from the image uploaded
    //             filePreview.src = e.target.result;
    //             console.log(e.target.result);

    //             var previewZone = document.getElementById('file-preview-zone');
    //             previewZone.appendChild(filePreview);
    //         }

    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }

    // var fileUpload = document.getElementById('file-upload');
    // fileUpload.onchange = function (e) {
    //     readFile(e.srcElement);
    // }

    // //Funcion para subir la informacion del post a Firebase
    // const savePostIntoDatabase = () => {
    //     console.log(saveFilePreview)
    //     console.log(postText)
    //     const postImage = saveFilePreview;
    //     const fullPostText = postText.value;
    //     const userID = firebase.auth().currentUser.uid;
    //     savePost(postImage, fullPostText, userID);
    // }

    send.addEventListener("click", () => {
        console.log('sendBtn');
    });
});


recipeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Receta";
});

userLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Perfil";
});
