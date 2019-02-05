export const savePost = (postImage, fullPostText, userID) => {
    console.log(postImage, fullPostText, userID)
    const newPostKey = firebase.database().ref('post').child('likes').push().key;
  
    //sube información a firebase database
    firebase.database().ref(`timeline/${newPostKey}`).set({
      image : postImage,
      text : fullPostText,
      useruid : userID
    });
    // firebase.database().ref(`profile/${userID}`).set({
    //   image : postImage,
    //   text : fullPostText
    // });

  };