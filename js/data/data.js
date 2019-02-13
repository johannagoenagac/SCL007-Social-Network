//Muestra todos los post del usuario
export const readUserPost = (personalPost) => {
  const uid = firebase.auth().currentUser.uid;
  let onlyUserPost = firebase.database().ref(`profile/${uid}/post`);
  onlyUserPost.on('value', (userPosts) => {
    personalPost(userPosts);
  });
};

//Agrega biografía a perfil de usuario
export const addBiography = (textBio) => {
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`profile/${uid}/biography`).set({
    texto: textBio
  });
  console.log('Agregado??');
};

//Verifica si hay una biografía en la data
export const searchForBiography = (textBio) => {
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`profile/${uid}/biography`).once('value')
  .then(function(snapshot) {    
    textBio(snapshot.val());
    // console.log(snapshot.val());
  })
};

//Sube información de post a firebase database
export const savePost = (postImage, fullPostText, userID, recipeTittle,recipeIngredients) => {  

  const newPostKey = firebase.database().ref('post').push().key;

  //sube información a firebase database de los post
  firebase.database().ref(`timeline/${newPostKey}`).set({
    image: postImage,
    text: fullPostText,
    useruid: userID,
 
  });
 
  //subiendo información del perfil a database
  firebase.database().ref(`profile/${userID}/post`).child(`${newPostKey}`).set({

    image : postImage,
    text : fullPostText,

  });

  //subiendo información de recetas a database
  firebase.database().ref(`timeline/${newPostKey}`).set({
    image: postImage ,
    tittle: recipeTittle,
    ingredients: recipeIngredients,
    text: fullPostText,
    useruid: userID,
 
  });
};

export const readPost = (onPostChange) => {
  let postRef = firebase.database().ref('timeline');
  postRef.on('value', (posts) => {
    onPostChange(posts);
  });
};

export const saveLikePost = (postID) => {
  let userID = firebase.auth().currentUser.uid;
  let postRef = firebase.database().ref(`timeline`);

  postRef.once("value", function (snapshot) {

    let likeExists = snapshot.child(postID).child("likes").child(userID).val();

    if (likeExists === null) {
      postRef.child(postID).child("likes").child(userID).set(1)
    } else {
      postRef.child(postID).child("likes").child(userID).remove();
    }
  });
}

export const editPost = (postID, text) => {
  let postRef = firebase.database().ref(`timeline`);
  postRef.child(postID).update({text: text});
}

export const deletePost = (postID) => {
  let profileRef = firebase.database().ref(`profile`);
  let postRef = firebase.database().ref(`timeline`);
  profileRef.child(postID).remove();
  postRef.child(postID).remove();
}