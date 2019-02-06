export const addBiography = (textBiography,uid) => {
  
};

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
