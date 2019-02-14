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
export const savePost = (postImage, fullPostText, userID) => {  

  const newPostKey = firebase.database().ref('post').push().key;

  //sube información a firebase database
  firebase.database().ref(`timeline/${newPostKey}`).set({
    image: postImage,
    text: fullPostText,
    useruid: userID,
 
  });

  firebase.database().ref(`profile/${userID}/post`).child(`${newPostKey}`).set({

    image : postImage,
    text : fullPostText,

  });
};

export const saveComment = (postID, comment) =>{
  const newCommentKey = firebase.database().ref(`timeline/${postID}/comments`).push().key;
  let userID = firebase.auth().currentUser.uid;

  firebase.database().ref(`timeline/${postID}/comments/${newCommentKey}`).set({
    comment: comment,
    useruid: userID,
  });
}

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