//Manejo del DOM

import { checkAuthStatus, registerUserGoogle, registerUserFacebook, logoutUser, registerUser, loginUser } from '../auth/auth.js';
import { savePost, readPost, saveLikePost, searchForBiography, addBiography} from '../data/data.js';


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
            registerForm.style.display = "none";
            //Muestra nombre del usuario
            if (user !== null) {
                nameUser = user.displayName;
                userImg = user.photoURL;
                let name = user.displayName.split(" ");
                document.getElementById('user-name').innerHTML = name[0];
            }
            
            readPostFromDatabase();
        } else {
            //Muestra el login, ya que usuario no está logeado
            header.style.display = "none";
            loginPage.style.display = "block";
            root.style.display = "none";
            footer.style.display = "none"
            post.style.display = "none";
            profile.style.display = "none";
            registerForm.style.display ="none";
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



const registerWithEmailAndPassword = () => {
    const emailFromUser = registerEmail.value;
   const passwordFromUser = registerPassword.value;
   registerUser(emailFromUser, passwordFromUser);
   
};

const loginUserWithEmailAndPassword = () => {
    const emailFromUser = emailTextfield.value;
    const passwordFromUser = passwordTextfield.value;
    loginUser(emailFromUser, passwordFromUser);
};


registerButton.addEventListener('click', (event)=>{
event.preventDefault();
registerWithEmailAndPassword();
// registerWithUserName();
});



loginButton.addEventListener('click', loginUserWithEmailAndPassword);

goRegister.addEventListener("click", (event)=>{
    event.preventDefault();
    registerForm.style.display = "block";
    loginPage.style.display = "none";
    });



const readPostFromDatabase = () => {
    readPost((posts) => {
        postContainer.innerHTML = "";

        const printPosts = (posts) => {
            Object.entries(posts.val()).forEach(post => {
                let id = Object.values(post)[0];
                let extractedData = Object.values(post)[1];
                const extractedLikes =  extractedData.likes ? Object.entries(extractedData.likes) : 0;
                const likes = extractedLikes.length ? extractedLikes.length : 0;

                postContainer.innerHTML =
                    `<div class="formPost">
                    <div class="container">
                    <div class="row">
                        <div class="col-l-12 centered">
                            <img class="cardImage" src="${extractedData.image}"/>
                        </div>
                    </div>
                    </div>
                    <div class="container">
                        <div class="row inlineFlexRow">
                            <div class="col-l-4">
                                <i class="fas fa-heart cardIcons" id="${id}"><a>${likes}</a></i>
                            </div>
                            <div class="col-l-4">
                                <i class="far fa-comment cardIcons"></i>
                            </div>
                            <div class="col-l-4">
                                <i class="fas fa-share cardIcons"></i>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                    <div class="row">
                        <div class="col-l-12">
                            <p>${extractedData.text}</p>
                        </div>
                    </div>
                    </div>
                </div>` + postContainer.innerHTML;
            });

            const like = document.getElementsByClassName("fa-heart");

            for (let i = 0; i < like.length; i++) {
                like[i].addEventListener("click", () => {
                    saveLikePost(like[i].id);
                });
            }
        }
        printPosts(posts);
        homeFinishedLoading();
    });
}

const homeFinishedLoading = () => {
    pageGuide.innerHTML = "Home";
    home.style.display = "block";
    post.style.display = "none";
}

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
    profile.style.display = "none";
    clearPostInformation();  
    let filePreview = document.createElement('img');

    //Funcion para cargar la imagen del post
    function readFile(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                filePreview.id = 'saveFilePreview';
                filePreview.setAttribute("class", "cardImage");
                //e.target.result contents the base64 data from the image uploaded
                filePreview.src = e.target.result;
                console.log(e.target.result);
                let previewZone = document.getElementById('file-preview-zone');
                previewZone.appendChild(filePreview);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    let fileUpload = document.getElementById('file-upload');
    fileUpload.onchange = function (e) {
        readFile(e.srcElement);
    }
    function clearPostInformation(){
        saveFilePreview.src = "";
        postText.value = "";
    };
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
        clearPostInformation();
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
    let bioContentProfile = '';
    let bioTextButton = '';
    let bioText = null;
    const searchBiography = () => { searchForBiography((bio) =>{
        if (bio !== null){
            //Hay bio
            bioText = bio.texto;
        }
        asigna();        
    });};
    searchBiography();

    function asigna() {  
        if (bioText === null){
            bioContentProfile = `
            <textarea id="biographyText" class = "biography" placeholder="Escribenos de ti"></textarea>`;  
            bioTextButton = `<span id="textAtButton">Agregar biografía</span>`;
        }else{
            console.log(bioText);
            bioContentProfile = `<span class = "showBiography">${bioText}</span>`;  
            bioTextButton = `<span id="textAtButton">Editar biografía</span>`;
        }
        showProfile(); 
    }

    function showProfile () {
        let showImg = '';
        if(userImg === undefined){
            showImg = "style/img/user.png";
        }else{
            showImg = userImg;
        };
        
        profile.innerHTML = `
        <section id = "userInfo">
        <div class="row flexRow">
            <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
                <img class="cardProfileImage" src=${showImg}></img>
            </div>
            <div id="userInfo" class="col-xs-7 col-s-8 col-m-8 col-l-8 alignment">    
                <span id="fullName">${nameUser}</span>

                <div class="row flexrow">
            <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
                <button type="button" id="logout">
                    <span>Cierra sesión <span id="user-name-marker"></span></span>
                </button>
            </div>
        </div>
            </div>
        </div>
        </section>
        <section id = "userbiography">
            <div class="row container">
                <div class="col-s-12 m-12 l-12"> 
                    ${bioContentProfile}
                    <button type="button" id="biography">
                        ${bioTextButton}
                    </button>
                </div>
            </div>
        </section>
        <section id = "">
        </section>`;
        
        //Si no tiene biografía, agrega una a firebase
        biography.addEventListener("click",(event) => {
            event.preventDefault();
            if (textAtButton.innerHTML === 'Agregar biografía'){
                if(biographyText.value === ''){
                    alert("Por favor, ¡escríbenos de ti!");
                } else {
                    //Llamo a la función que agrega la biografía
                    //Tiene que mostrar la bio y boton editar
                    const addingBio = () => { addBiography(biographyText.value);}
                    addingBio();
                    searchBiography();
                };
            }else{
                console.log('Aqui edito');
            }
        });
        
        //Llama a la función de cierre sesión
        const logoutUsers = () => { logoutUser(); }
        //Si hace click al botón Logout, llama a la función Logout
        logout.addEventListener('click', logoutUsers);
    }
});