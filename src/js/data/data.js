export const savePost = (postImage, fullPostText, userID) => {

  const newPostKey = firebase.database().ref('timeline').push().key;

  firebase.database().ref(`timeline/${newPostKey}`).set({
    image: postImage,
    text: fullPostText,
    useruid: userID,
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