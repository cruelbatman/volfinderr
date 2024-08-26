const firebaseConfig = {
    apiKey: "AIzaSyBryPDac7ovklz9YQlAZf2Qq_-9ksIqxpQ",
    authDomain: "volfinder-2.firebaseapp.com",
    databaseURL: "https://volfinder-2-default-rtdb.firebaseio.com",
    projectId: "volfinder-2",
    storageBucket: "volfinder-2.appspot.com",
    messagingSenderId: "419420623346",
    appId: "1:419420623346:web:38d0d9cb18cc0edcd45b6b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
const storage = firebase.storage()
function updateProfile(e){
    e.preventDefault()
    const id = sessionStorage.getItem('user')
    console.log(id)
    const firstName = document.querySelector('#first-name').value
    const lastName = document.querySelector('#last-name').value
    const organization = document.querySelector('#company').value
    const email = document.querySelector('#email').value
    const location = document.querySelector('#location').value
    const phoneNumber = document.querySelector('#phone').value
    const image = document.getElementById('profile-picture').files[0]
    console.log(image)
    const ref = storage.ref().child('images/'+image.name)
    ref.put(image).then((snapshot)=>{
        ref.getDownloadURL().then((url) => {
            database.collection("User").doc(id).set({
                firstName,
                lastName,
                organization,
                email,
                location,
                phoneNumber,
                profileUrl:url
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        })
        .catch((error) => {
            // Handle any errors
    });
})
}
