//Manejo del DOM


import { checkAuthStatus, registerUserGoogle, registerUserFacebook, logoutUser, registerUser, loginUser, updateManualUser } from '../auth/auth.js';
import { savePost, readPost, saveLikePost, searchForBiography, addBiography, readUserPost, deletePost, editPost } from '../data/data.js';


let nameUser = '';
let userImg = '';
let firstName = '';
//Llama a la función de cierre sesión
const logoutUsers = () => { logoutUser(); }

window.onload = () => {
    //Verifica estado de conexión del usuario
    checkAuthStatus((user) => {
        if (user) {
            //Llama a la funcion que muestra los posts
            readPostFromDatabase();
            //Usuario logeado, muestra menú y home
            header.style.display = "block";
            footer.style.display = "block";
            root.style.display = "block";
            loginPage.style.display = "none";
            post.style.display = "none";
            profile.style.display = "none";
            registerForm.style.display = "none";
            recipe.style.display = "none";
            //Muestra nombre del usuario
            if (user === null) {
                const nameUserInput = nameManualUser.value;
                updateManualUser(nameUserInput);
                nameManualUser.value = '';
            } else {
                nameUser = user.displayName;
                userImg = user.photoURL;
                let name = user.displayName.split(" ");
                firstName = name[0];
                // document.getElementById('user-name').innerHTML = name[0];
            }
        } else {
            //Muestra el login, ya que usuario no está logeado
            header.style.display = "none";
            footer.style.display = "none"
            registerForm.style.display = "none";
            loginPage.style.display = "block";
            root.style.display = "none";
            post.style.display = "none";
            profile.style.display = "none";
            recipe.style.display = "none";
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
    registerEmail.value = '';
    registerPassword.value = '';

};

const loginUserWithEmailAndPassword = () => {
    const emailFromUser = emailTextfield.value;
    const passwordFromUser = passwordTextfield.value;
    loginUser(emailFromUser, passwordFromUser);
    emailTextfield.value = '';
    passwordTextfield.value = '';
};

registerButton.addEventListener('click', (event) => {
    event.preventDefault();
    registerWithEmailAndPassword();
    // registerWithUserName();
    loginPage.style.display = "block"
    registerForm.style.display = "none"
});

loginButton.addEventListener('click', loginUserWithEmailAndPassword);

goRegister.addEventListener("click", (event) => {
    event.preventDefault();
    registerForm.style.display = "block";
    loginPage.style.display = "none";
});

//Lee la data guardada en Firebase, la recorre y agrega a cada post individualmente
const readPostFromDatabase = () => {

    readPost((posts) => {
        postContainer.innerHTML = "";

        const printPosts = (posts) => {
            Object.entries(posts.val()).forEach(post => {
                //Toma el ID de post
                let id = Object.values(post)[0];
                //Toma el objeto que contiene la imagen, el texto y la cantidad de likes y lo convierte en un array
                let extractedData = Object.values(post)[1];
                //Confirma si hay un collection likes y trae sus entries, de lo contrario retorna 0
                const extractedLikes = extractedData.likes ? Object.entries(extractedData.likes) : 0;
                //Confirma si existe una cantidad mayor a 0 de likes y retorna el total, de lo contrario retorna 0
                const likes = extractedLikes.length ? extractedLikes.length : 0;
                //Genera cada post con la informacion requerida
                postContainer.innerHTML = `
                    <div class="formPost">
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
                                <i class="fas fa-heart cardIcons" id="like${id}"><a>${likes}</a></i>
                            </div>
                            <section id="private${id}">
                                <div class="col-l-4">
                                    <i class="fas fa-edit cardIcons" id="edit${id}"></i>
                                </div>
                                <div class="col-l-4">
                                    <i class="fas fa-trash-alt cardIcons" id="delete${id}"></i>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div id="agreeRecipe">
                    </div>


                    <div class="container">
                    <div class="row">
                        <div id="textArea${id}" class="col-l-12">
                            <p id="text${id}">${extractedData.text}</p>
                        </div>
                    </div>
                    </div>
                </div>` + postContainer.innerHTML;

                if (extractedData.title !== undefined) {
                    printRecipe(extractedData.title, extractedData.ingredients, id)
                }

            });

            let entries = Object.entries(posts.val())

            for (let i = 0; i < entries.length; i++) {
                let entryID = entries[i][0]
                postOptions(entryID);
            }

            for (let i = 0; i < entries.length; i++) {
                let userUID = entries[i][1].useruid;
                let currentUser = firebase.auth().currentUser.uid;
                let id = entries[i][0]
                let ownPosts = document.getElementById("private" + id)

                if (userUID === currentUser) {
                    ownPosts.setAttribute("class", "inlineFlexRow");
                } else {
                    ownPosts.style.display = "none";
                }
            }
        }
        printPosts(posts);

    });

    //función para agregar contenedores faltantes a recetas, 
    //la cual llamare dentro de la estrcutura de los post
    function printRecipe(title, ingredients, id) {

        document.getElementById("agreeRecipe").innerHTML = `
            <div class="container">
                <div class="row">
                    <div id="textArea${id}" class="col-l-12">
                        <h5 id="text${id}">${title}</h5>
                    </div>
                </div>
            </div>
                
        
            <div class="container">
                <div class="row">
                    <div id="textArea${id}" class="col-l-12">
                        <p id="text${id}">${ingredients}</p>
                    </div>
                </div>
            </div>`
    }
}



const postOptions = (id) => {

    const likeID = document.getElementById("like" + id);
    const editID = document.getElementById("edit" + id);
    const textID = document.getElementById("text" + id);
    const textAreaID = document.getElementById("textArea" + id);
    const deleteID = document.getElementById("delete" + id);

    likeID.addEventListener("click", () => {
        saveLikePost(id);
    })

    editID.addEventListener("click", () => {

        let originalText = textID.textContent;
        let saveBtn = document.createElement("input");
        saveBtn.setAttribute("type", "button")
        saveBtn.setAttribute("value", "Guardar")
        let cancelBtn = document.createElement("input");
        cancelBtn.setAttribute("type", "button")
        cancelBtn.setAttribute("value", "Cancelar")
        let inputBox = document.createElement("textarea")
        inputBox.setAttribute("wrap", "hard")
        inputBox.value = originalText;
        textAreaID.removeChild(textID);
        textAreaID.appendChild(inputBox);
        textAreaID.appendChild(saveBtn);
        textAreaID.appendChild(cancelBtn);

        saveBtn.addEventListener("click", () => {
            let newText = inputBox.value
            editPost(id, newText);
        })

        cancelBtn.addEventListener("click", () => {
            textAreaID.removeChild(inputBox);
            textAreaID.removeChild(saveBtn);
            textAreaID.removeChild(cancelBtn);
            textAreaID.appendChild(textID);
        })
    })

    deleteID.addEventListener("click", () => {
        let confirmation = confirm("¿Estas seguro que quieres eliminar este post?")
        if (confirmation === true) {
            deletePost(id);
        }
    })
}

homeTab.addEventListener("click", () => {
    homeLogo.click();
})

homeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Home";
    home.style.display = "block";
    post.style.display = "none";
    profile.style.display = "none";
    recipe.style.display = "none";
});

searchLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Buscar";
});


let eventListener = [];

addLogo.addEventListener("click", (event) => {
    event.preventDefault();
    pageGuide.innerHTML = "Post";
    home.style.display = "none";
    post.style.display = "block";
    profile.style.display = "none";
    recipe.style.display = "none";

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
                let previewZone = document.getElementById('file-preview-zone');
                previewZone.appendChild(filePreview);
            };
            reader.readAsDataURL(input.files[0]);
        };
    };
    let fileUpload = document.getElementById('file-upload');
    fileUpload.onchange = function (e) {
        readFile(e.srcElement);
    };

    //Funcion para subir la informacion del post a Firebase
    const savePostIntoDatabase = function (event) {
        event.stopPropagation();
        const postImage = saveFilePreview.src;
        const fullPostText = postText.value;
        const userID = firebase.auth().currentUser.uid;
        savePost(postImage, fullPostText, userID);
        postText.value = '';
        document.getElementById('file-upload').value = '';
        document.getElementById('file-preview-zone').removeChild(filePreview);
    };

    if (eventListener.length > 0) {
        eventListener.forEach(evl => send.removeEventListener("click", evl));
    }
    send.addEventListener("click", savePostIntoDatabase);
    eventListener.push(savePostIntoDatabase);
});

recipeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Receta";
    home.style.display = "none";
    post.style.display = "none";
    profile.style.display = "none";
    recipe.style.display = "block";



    recipe.innerHTML = `
        <div class="container">
              <div class="row">
                <div class="col-s-12 col-m-12 col-l-12">
                  <form class="formRecipe" name="formulario" action="javascript:void(0)" autocomplete="off">
                    <div class="container">
                      <div class="row flexRow">
                        <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
                          <img id="icon-user" class="responsive-img" src="https://subirimagen.me/uploads/20190131084141.png"
                            alt="icon user">
                        </div>
                        <div class="col-xs-7 col-s-8 col-m-8 col-l-8 alignment">
                          <h1 id="user-name-recipe">${firstName}</h1>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col-xs-12 centered" id="file-preview-zone-recipe"></div>
                      </div>
                    </div>
                    <div class="container">
                      <div class="row">
                        <div class="col-xs-12" id="file-preview-zone-recipe">
                          <input id="file-upload-recipe" type="file" accept="image/*">
                        </div>
                      </div>
                    </div>

                    <div class="container">
                        <div class="row">
                          <div class="col-xs-12">
                            <input id="titleRecipe" type="text" placeholder="Nombre de la receta">
                          </div>
                        </div>
                      </div>

                      <div class="container">
                          <div class="row">
                            <div class="col-xs-12">
                                <textarea id="ingredientsRecipe">Ingredientes:</textarea>
                            </div>
                          </div>
                        </div>
  

                     <div class="container">
                      <div class="row">
                        <div class="col-s-12 m-12 l-12">
                          <textarea id="recipePostText">Preparación:</textarea>
                        </div>
                      </div>
                    </div>
                    <div class="container">
                      <div class="row">
                        <div class="col-xs-12 col-s-12 col-m-12 col-l-12">
                          <button id="sendRecipe">Enviar</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>`

    //captura de imagenes para recetas
    let filePreviewRecipe = document.createElement('img');
    //Funcion para cargar la imagen del post
    function readFile(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                filePreviewRecipe.id = 'saveFilePreviewRecipe';
                filePreviewRecipe.setAttribute("class", "cardImage");
                //e.target.result contents the base64 data from the image uploaded
                filePreviewRecipe.src = e.target.result;
                let previewZone = document.getElementById('file-preview-zone-recipe');
                previewZone.appendChild(filePreviewRecipe);
            };
            reader.readAsDataURL(input.files[0]);
        };
    };
    let fileUpload = document.getElementById('file-upload-recipe');
    fileUpload.onchange = function (e) {
        readFile(e.srcElement);
    };

    sendButtonRecipe();
})
function sendButtonRecipe() {
    sendRecipe.addEventListener("click", () => {
        console.log("hola");
        saveRecipeIntoDatabase();
    });



    //Funcion para subir la informacion de las recetas a Firebase
    const saveRecipeIntoDatabase = function (event) {

        const recipeImage = saveFilePreviewRecipe.src;//guardando imagen
        const recipeTitle = titleRecipe.value;//guardando el titulo
        const recipeIngredients = ingredientsRecipe.value;//guardando los ingredientes
        const recipeText = recipePostText.value;//guardando texto del post
        const userID = firebase.auth().currentUser.uid;
        savePost(recipeImage, recipeText, userID, recipeTitle, recipeIngredients);
        postText.value = '';
        recipeTitle
        document.getElementById('file-upload-recipe').value = '';//para limpiar formulario
        document.getElementById('file-preview-zone-recipe').removeChild(filePreviewRecipe);

    };

}


profileTab.addEventListener("click", () => {
    userLogo.click();
})

userLogo.addEventListener("click", (event) => {
    event.preventDefault();

    pageGuide.innerHTML = "Perfil";
    home.style.display = "none";
    post.style.display = "none";
    profile.style.display = "block";
    let bioContentProfile = '';
    let bioTextButton = '';
    let bioText = null;
    let postImageUser = '';

    const readPostOneUser = () => {
        readUserPost((userPosts) => {
            //Lo que tengo que mostrar
            const userShowPosts = (posts) => {
                Object.entries(userPosts.val()).forEach(post => {
                    let idPostUser = Object.values(post)[0];
                    let contentPostUser = Object.values(post)[1];

                    postImageUser = `
                    <div class="row">
                        <div class="col-l-12 centered">
                            <img class="cardImage" src="${contentPostUser.image}"/>
                        </div>
                    </div>
                    </div>` + postImageUser;
                });
            };
            userShowPosts(userPosts);
        });
    };


    const searchBiography = () => {
        searchForBiography((bio) => {
            if (bio !== null) {
                //Hay bio
                bioText = bio.texto;
            }
            asigna();
        });
    };


    searchBiography();
    readPostOneUser();
    function asigna() {
        if (bioText === null) {

            bioContentProfile = `
            <textarea id="biographyText" class = "biography" placeholder="Escribenos de ti"></textarea>`;
            bioTextButton = `<span id="textAtButton">Agregar biografía</span>`;
        } else {
            bioContentProfile = `<span class = "showBiography">${bioText}</span>`;
            bioTextButton = `<span id="textAtButton">Editar biografía</span>`;
        }
        showProfile();
    }

    function showProfile() {
        let showImg = '';
        if (userImg === undefined) {
            showImg = "./style/img/user.png";
        } else {
            showImg = userImg;
        };

        profile.innerHTML = `
        <section id = "userInfo">
        <div class="row flexRow">
            <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
                <img class="cardProfileImage" src="${showImg}"></img>
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
        <section id = "postsUserImage">
        <div class="container" id ="postsUser">${postImageUser}</div>
        </section>`;

        //Si no tiene biografía, agrega una a firebase
        biography.addEventListener("click", (event) => {
            event.preventDefault();
            if (textAtButton.innerHTML === 'Agregar biografía') {
                if (biographyText.value === '') {
                    alert("Por favor, ¡escríbenos de ti!");
                } else {
                    //Llamo a la función que agrega la biografía
                    //Tiene que mostrar la bio y boton editar
                    const addingBio = () => { addBiography(biographyText.value); }
                    addingBio();
                    searchBiography();
                    readPostOneUser();
                };
            } else {
                console.log('Aqui edito');
            }
        });
        //Si hace click al botón Logout, llama a la función Logout
        logout.addEventListener('click', logoutUsers);
    }
})








