//Manejo del DOM
import { checkAuthStatus, registerUserGoogle, registerUserFacebook, logoutUser, registerUser, loginUser, updateManualUser } from '../auth/auth.js';
import { savePost, readPost, saveLikePost, searchForBiography, addBiography, readUserPost, deletePost, editPost, saveComment } from '../data/data.js';



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
            if (user.displayName === null) {
                // const nameUserInput = nameManualUser.value;
                // updateManualUser(nameUserInput);
                // nameManualUser.value = '';
                userImg = `https://subirimagen.me/uploads/20190131084141.png`;
                firstName = 'Usuario';
                nameUser = 'Usuario';
            }else{
                //Asigna nombre completo, imagen y primer nombre, en variables globales, para el uso en distintas partes de la app
                nameUser = user.displayName;
                let name = user.displayName.split(" ");
                firstName = name[0];
                userImg = user.photoURL;
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
        pageGuide.innerHTML = "Home";
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

                postContainer.innerHTML =
                `<div class="col-l-12">
                    <div class="formPost">
                      <div class="container">
                        <div class="row">
                          <div class="centered">
                            <img class="cardImage" src="${extractedData.image}" />
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
                      <div class="container bottomBorder">
                        <div class="row">
                          <div class="col-l-12">
                            <textarea id="comment${id}"></textarea>
                            <button class="buttons endLine" id="commentBtn${id}">Comentar</button>
                            <h4>Comentarios</h4>
                          </div>
                        </div>
                      </div>
                      <div class="container">
                        <div class="row">
                          <div class="col-l-12" id="allComments${id}">
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>` + postContainer.innerHTML;

                  const extractedComments = extractedData.comments ? Object.entries(extractedData.comments) : 0;
                  
                  if(extractedComments !== 0 ){

                    extractedComments.forEach(element => {
                        let currentUser = firebase.auth().currentUser.uid;
                        let commentID = Object.values(element)[0];
                        let userID = Object.values(element)[1].useruid;
                        let userName = Object.values(element)[1].userName;
                        let everyComment = Object.values(element)[1].comment;
                        let allCommentsArea = document.getElementById("allComments" + id);
                        allCommentsArea.innerHTML += 
                            `<div class="bottomBorder">
                                <h5>${userName}</h5>
                                <span class="comments">${everyComment}</span>
                                <section class="inlineFlexRow" id="privateComment${commentID}">
                                    <div class="col-l-4">
                                        <i class="fas fa-edit cardIcons" id="edit${commentID}"></i>
                                    </div>
                                    <div class="col-l-4">
                                        <i class="fas fa-trash-alt cardIcons" id="delete${commentID}"></i>
                                    </div>
                                </section>
                            </div>`;
                        
                        let ownComments = document.getElementById("privateComment" + commentID)
                        if(currentUser === userID){
                            ownComments.style.display = "none";
                            //ownComments.setAttribute("class", "inlineFlexRow");
                        }else{
                            ownComments.style.display = "none";
                        }

                        // for(let i = 0; i < everyComment.length; i++){

                        //     let deleteComment = document.getElementById("delete" + commentID)
                        
                        //     deleteComment.addEventListener("click", () => {
                        //         console.log("click")
                        //         deleteComment(id, commentID);
                        //     });
                        // }
                      })
                  }

                  
                if (extractedData.title !== undefined) {
                    printRecipe(extractedData.title, extractedData.ingredients, id)
                }


            });

            let entries = Object.entries(posts.val())

            for (let i = 0; i < entries.length; i++) {
                let entryID = entries[i][0]
                postOptions(entryID);
                commentOnPost(entryID);
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
                        <h3 id="text${id}">${title}</h3>
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

const commentOnPost = (id) =>{
    let comment = document.getElementById("comment" + id);
    let commentBtn = document.getElementById("commentBtn" + id);

    commentBtn.addEventListener("click", () => {
        
        if(comment.value !== ""){
            saveComment(id, comment.value);
        }
    });
}

homeTab.addEventListener("click", () => {
    homeLogo.click();
})

mobileVersion.addEventListener("click", () => {
    homeLogo.click();
})

webVersion.addEventListener("click", () => {
    homeLogo.click();
})

homeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Home";
    home.style.display = "block";
    post.style.display = "none";
    profile.style.display = "none";
    recipe.style.display = "none";
});

addLogo.addEventListener("click", (event) => {
    event.stopPropagation();

    pageGuide.innerHTML = "Post";
    home.style.display = "none";
    profile.style.display = "none";
    recipe.style.display = "none";
    post.style.display = "block";

    post.innerHTML= `
    <!--Post create-->
    <div class="container">
    <div class="row">
        <div class="col-s-12 col-m-12 col-l-12">
        <form class="formPost" name="formulario" action="javascript:void(0)" autocomplete="off">
            <div class="container">
            <div class="row flexRow">
                <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
                <img id="icon-user" class="responsive-img" src=${userImg} alt="icon user">
                </div>
                <div class="col-xs-7 col-s-8 col-m-8 col-l-8 alignment">
                <h1 id="user-name">${firstName}</h1>
                </div>
            </div>
            </div>

            <!--Subir foto-->
            <div class="container">
            <div class="row">
                <div class="col-xs-12 centered" id="file-preview-zone"></div>
            </div>
            </div>
            <div class="container">
            <div class="row">
                <div class="col-xs-12" id="file-preview-zone">
                <input id="file-upload" type="file" accept="image/*"></input>
                </div>
            </div>
            </div>
            <div class="container">
            <div class="row">
                <div class="col-s-12 m-12 l-12">
                <textarea id="postText" placeholder="Escribe tu post"></textarea>
                </div>
            </div>
            </div>
            <div class="container">
            <div class="row">
                <div class="col-xs-12 col-s-12 col-m-12 col-l-12">
                <button id="send" class="buttons" type="button">Enviar</button>
                </div>
            </div>
            </div>
        </form>
        </div>
    </div>
    </div>`;

    const uploadImage = document.getElementById("file-upload");
    uploadImage.addEventListener('change', uploadImgStorage,false); //Llama a la funcion para obtener el valor de la imagen
    function uploadImgStorage(){ 
        const file = uploadImage.files[0]; //Obtengo el valor de la imagen
        //Función para subir la info a Firebase
        const savePostIntoDatabase = function(event){
            event.stopPropagation();
            const postImage = file;
            const fullPostText = postText.value;            
            savePost(postImage, fullPostText);
        }
        send.addEventListener("click", savePostIntoDatabase); //Si hago click en el botón "Save", se llama a función para subir el post
    };
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
                  <form class="formPost" name="formulario" action="javascript:void(0)" autocomplete="off">
                    <div class="container">
                      <div class="row flexRow">
                        <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
                          <img id="icon-user" class="responsive-img" src="${userImg}"
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
        // console.log("hola");
        saveRecipeIntoDatabase();
    });

    //Funcion para subir la informacion de las recetas a Firebase
    const saveRecipeIntoDatabase = function (event) {

        const recipeImage = saveFilePreviewRecipe.src;//guardando imagen
        const recipeTitle = titleRecipe.value;//guardando el titulo
        const recipeIngredients = ingredientsRecipe.value;//guardando los ingredientes
        const recipeText = recipePostText.value;//guardando texto del post
        savePost(recipeImage, recipeText, recipeTitle, recipeIngredients);
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
    recipe.style.display ="none";
    let bioContentProfile = '';
    let bioTextButton = '';
    let bioText = null;
    let postImageUser = '';

    //Muestra los post solo del usuario 
    const readPostOneUser = () => {
        readUserPost((userPosts) => {
            //Muestro los post del usuario en Sección Perfil
            const userShowPosts = (posts) => {
                if (userPosts.val() !== null){
                    Object.entries(userPosts.val()).forEach(post => {
                        // let idPostUser = Object.values(post)[0];
                        let contentPostUser = Object.values(post)[1];
                        postImageUser = `
                        <div class="row">
                            <div class="col-l-12 centered">
                                <img class="cardImage" src="${contentPostUser.image}"/>
                            </div>
                        </div>
                        </div>` + postImageUser;
                    });
                }else{
                    postImageUser = `
                        <div class="row">
                            <div class="col-l-12 centered">
                                <span>No hay post que mostrar</span>
                            </div>
                        </div>`
                }
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
        profile.innerHTML = `
        <section id = "userInfo">
        <form class="formProfile">
        <div class="row flexRow">
            <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
                <img class="cardProfileImage" src="${userImg}"></img>
            </div>
            <div id="userInfo" class="col-xs-7 col-s-8 col-m-8 col-l-8 alignment">    
                <span id="fullName">${nameUser}</span>
                <div class="row flexrow">
            <div class="col-xs-5 col-s-4 col-m-4 col-l-4">
                <button type="button" class="buttons" id="logout">
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
        </form>
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








