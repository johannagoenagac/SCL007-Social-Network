//Funciones - Aquí va la lógica
//callback - función que se llamará dsps
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
}

export const registerUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider)
    .then(function(result) {
        console.log('Entro a width redirect');
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = result.credential.accessToken;
          console.log("Usuario registrado >"+ JSON.stringify(user));
          // ...
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
     });
}


