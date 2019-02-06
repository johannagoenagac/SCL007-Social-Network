//Manejo del DOM

import { checkAuthStatus, registerUserGoogle, registerUserFacebook, logoutUser } from '../auth/auth.js';
import { savePost, readPost, saveLikePost } from '../data/data.js';

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
            readPostFromDatabase();
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

const readPostFromDatabase = () => {
    readPost((post) => {
        postContainer.innerHTML =
            `<div class="formPost">
                <div class="container">
                <div class="row">
                    <div class="col-lg-12 centered">
                        <img class="cardImage" src="${post.val().image}"/>
                    </div>
                </div>
                </div>
                <div class="container">
                    <div class="row inlineFlexRow">
                        <div class="col-lg-1">
                            <button class="fas fa-heart cardIcons" id="${post.key}"></button>
                        </div>
                        <div class="col-lg-1">
                            <i class="far fa-comment cardIcons"></i>
                        </div>
                        <div class="col-lg-1">
                            <i class="fas fa-share cardIcons"></i>
                        </div>
                    </div>
                </div>
                <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <p>${post.val().text}</p>
                    </div>
                </div>
                </div>
            </div>` + postContainer.innerHTML;

        homeFinishedLoading();

        const like = document.getElementsByClassName("fa-heart");

        for(let i = 0; i < like.length; i++){
            like[i].addEventListener("click", () =>{
                saveLikePost(like[i].id);
            });
        }

        
    });
}

const homeFinishedLoading = () => {
    pageGuide.innerHTML = "Home";
    home.style.display = "block";
    post.style.display = "none";
}

// const likePost = (postID, userID) => {

//     console.log(postID)

//     like.addEventListener("click",() => {
//         console.log("click" + like)
//         saveLikePost(postID, userID)
//     })
// }
//     for (let i = 0; i < like.length; i++) {


// }

homeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Home";
    home.style.display = "block";
    post.style.display = "none";
});


searchLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Buscar";
});

addLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Post";
    home.style.display = "none";

    post.style.display = "block";

    //Funcion para cargar la imagen del post
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var filePreview = document.createElement('img');
                filePreview.id = 'saveFilePreview';
                filePreview.setAttribute("class", "cardImage");
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

userLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Perfil";
    home.style.display = "none";
    logout.style.display = "block";
    profile.style.display = "block";
});

