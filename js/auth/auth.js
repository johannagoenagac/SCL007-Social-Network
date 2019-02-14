//Funciones - Aquí va la lógica
//callback - función que se llamará dsps

export const updateManualUser = (name) => {
  const user = firebase.auth().currentUser;
  console.log(name);
  user.updateProfile({
    displayName: name,
    photoURL: "./style/img/user.png"
  }).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });
};

export const logoutUser = () =>{
  firebase.auth().signOut()
  .then(function() {
    // Sign-out successful.
    alert('Has cerrado sesion exitosamente');
  })
  .catch(function(error) {
    alert('Ha ocurrido un error. Intenta nuevamente');
  });
};

export const checkAuthStatus = (callback) => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      //console.log("Hay un usuario > "+ JSON.stringify(user));
      callback(user);
    }else{
      console.log("No está logeado")
      callback(null);
    }
  });
};

export const registerUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
   .then((user)=>{
     registerForm.style.display = "none";
     login.style.display = "block";
    //  console.log("Usuario registrado > "+JSON.stringify(user));
     firebase.auth().signOut()
      .then(function() {
        // Sign-out successful.        
      })
      .catch(function(error) {
        alert('Ha ocurrido un error. Intenta nuevamente');
      });
   })
   .catch((error) => {
     console.error("Error > "+error.message);
   });
};

export const loginUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log("Usuario logueado > "+JSON.stringify(user));
    })
    .catch((error) => {
      console.error("Error > "+error.message);
    });
};

export const registerUserGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider)
    .then(function(result) {
        console.log('Entro a width redirect');
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = result.credential.accessToken;
          console.log("Usuario registrado >"+ JSON.stringify(user));
        }
        // The signed-in user info.
        var user = result.user;
     }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
        if(errorCode === 'auth/account-exists-with-different-credential'){
          alert('Usuario ya está registrado');

        }
     });
};

export const registerUserFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};



