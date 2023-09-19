import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBBLjvWXyHqb13Ux5BZ3vIPrBy5ea6nbgM',
  authDomain: 'leetclone-12793.firebaseapp.com',
  projectId: 'leetclone-12793',
  storageBucket: 'leetclone-12793.appspot.com',
  messagingSenderId: '959638984898',
  appId: '1:959638984898:web:ec9d08dfd3e55f95a8c35b',
}

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const firestore = getFirestore(app)

export { auth, firestore, app }
