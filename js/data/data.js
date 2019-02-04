export const saveMeme = (memeTitle, memeImage, ownerName) => {
    const newMemeKey = firebase.database().ref('meme/boasfdisfbsfahb').child('likes').push().key;
  
    firebase.database().ref(`meme/${newMemeKey}`).set({
      title : memeTitle,
      image : memeImage,
      owner : ownerName
    });
  };