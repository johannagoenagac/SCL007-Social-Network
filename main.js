//Manejo del DOM

import { checkAuthStatus, registerUser, logoutUser } from '../src/data.js';

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
            if (user !== null) {
                let name = user.displayName.split(" ");
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
        }
    });
    //Llama a la función registro con Google
    const registerWithGoogle = () => {
        registerUser();
    }
    const logoutUsers = () => {
        logoutUser();
    }

    //Si hace click al botón Google, llama a la función registro con Google
    googleregistry.addEventListener('click', registerWithGoogle);
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
