//Agrega biografía a perfil de usuario
export const addBiography = (textBio) => {
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`profile/${uid}/biography`).set({
    text: textBio
  });
  console.log('Agregado??');
};

//Verifica si hay una biografía en la data
export const searchForBiography = () => {
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`profile/${uid}/biography`).once('value')
  .then(function(snapshot) {
    let bioExists = snapshot.val();
    console.log(bioExists);
  });
};

//Sube información de post a firebase database
export const savePost = (postImage, fullPostText, userID) => {  
  const newPostKey = firebase.database().ref('post').push().key;

  //sube información a firebase database
  firebase.database().ref(`timeline/${newPostKey}`).set({
    image : postImage,
    text : fullPostText,
    useruid : userID,
    likes : 0
  });

  firebase.database().ref(`profile/${userID}/post`).child(`${newPostKey}`).set({
    image : postImage,
    text : fullPostText,
    likes : 0
  });
};

export const readPost = (onPostChange) => {
  let postRef = firebase.database().ref('timeline');
  postRef.on('child_added', (post) => {
    onPostChange(post);
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


