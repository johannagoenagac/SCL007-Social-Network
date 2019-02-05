export const savePost = (postImage, fullPostText, userID) => {

  const newPostKey = firebase.database().ref('timeline').push().key;

  firebase.database().ref(`timeline/${newPostKey}`).set({
    image: postImage,
    text: fullPostText,
    useruid: userID,
    likes: 0
  });
};

export const readPost = (onPostChange) => {
  let postRef = firebase.database().ref('timeline');
  postRef.on('child_added', (post) => {
    onPostChange(post);
  });
};

export const likePost = (postID, userID) => {
  
  const like = document.getElementsByClassName("fa-heart");

  let postRef = firebase.database().ref('timeline/' + postID);
  console.log("el post ref es" + postRef)

  for (let i = 0; i < like.length; i++) {
    like[i].onclick = () => {


        // A post entry.
        let likesCount = {
          likes: 1
        };
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/timeline/' + postID + '/likes/'] = likesCount;
      
        return firebase.database().ref().update(updates);
    }
  }
}