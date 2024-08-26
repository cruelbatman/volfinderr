
const firebaseConfig = {
  apiKey: "AIzaSyBryPDac7ovklz9YQlAZf2Qq_-9ksIqxpQ",
  authDomain: "volfinder-2.firebaseapp.com",
  databaseURL: "https://volfinder-2-default-rtdb.firebaseio.com",
  projectId: "volfinder-2",
  storageBucket: "volfinder-2.appspot.com",
  messagingSenderId: "419420623346",
  appId: "1:419420623346:web:38d0d9cb18cc0edcd45b6b"
};
firebase.initializeApp(firebaseConfig)
function onRegister(event){
  event.preventDefault()
  
  const email = document.getElementById('register-email').value
  const password = document.getElementById('register-password').value
  firebase.auth().createUserWithEmailAndPassword(email,password).then((data)=>{
    console.log(data)
    window.location.href = 'index.html'
  }).catch((error)=>{
    console.log(error)
  })
}
function onLogin(event){
  event.preventDefault()
  
  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value
  firebase.auth().signInWithEmailAndPassword(email,password).then((data)=>{
    sessionStorage.setItem('user',JSON.stringify(data.user.uid))
    window.location.href = 'index.html'
  }).catch((error)=>{
    alert(error)
  })
}
function onPost(){
  const image = document.getElementById('image-upload').files[0]
  const storage = firebase.storage()
  const ref = storage.ref().child('images/'+image.name)
  ref.put(image).then((snapshot)=>{
    ref.getDownloadURL()
      .then((url) => {
        const postText = document.getElementById('post-text').value
        writePost('John',postText,url,Date.now())
      })
      .catch((error) => {
        // Handle any errors
      });
  })
  // 
}
function onLoad(){
  firebase.database().ref('Post/').on('value', (snapshot) => {
    const data = snapshot.val();
    if(data){
      const container = document.getElementById('post-container')
    container.innerHTML = ''
    Object.keys(data)&&Object.keys(data).forEach((value)=>{
        const post = document.createElement('div')
        post.className = 'post'
        post.innerHTML = `
                <div class="post-author">
                <img src="images/vprofile.jpg">
                <div>
                    <h1>${data[value].author}</h1>
                </div>
            </div>
            <p>${data[value].textContent}</p>
            <img src=${data[value].imageUrl}  width="100%">

            <div class="post-activity">
                <div class="post-activity-item">
                    <img src="images/like.png" id="likeIcon">
                    <span id="likeText">Like</span>
                </div>
                <div class="post-activity-item">
                    <img src="images/comment.png" id="commentIcon">
                    <span id="commentText">Comment</span>
                </div>
                <div class="post-activity-item">
                    <img src="images/share.png" id="shareIcon">
                    <span id="shareText">Share</span>
                </div>
                <div class="post-activity-item">
                    <img src="images/send.png" id="sendIcon">
                    <span id="sendText">Send</span>
                </div>
            </div>
        `
        container.appendChild(post)
    })
    }
  });
}



// login page js
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');


registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', ()=> {
  console.log('working')
    wrapper.classList.remove('active');
});
btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});


function writePost(author, textContent, imageUrl,date) {
  firebase.database().ref('Post/' + author + Math.floor(Math.random()*1e19)).set({
    author: author,
    textContent: textContent,
    imageUrl:imageUrl,
    date:date
  });
}

function readPost(){
  var getPost = firebase.database().ref('Post/' + 'John');
  getPost.on('value', (snapshot) => {
    const data = snapshot.val();
  });
}

function uploadImage(){
  document.getElementById('image-upload').click()
}