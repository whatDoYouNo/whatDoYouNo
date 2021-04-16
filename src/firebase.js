//import firebase module
import firebase from 'firebase/app';
import 'firebase/database';
//web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyC14jgdZyu39mnhJRuW786sOwqB8_0aLAA",
authDomain: "what-do-you-no.firebaseapp.com",
projectId: "what-do-you-no",
storageBucket: "what-do-you-no.appspot.com",
messagingSenderId: "1046396471830",
appId: "1:1046396471830:web:dec0fc89b0f22d758dc337"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;