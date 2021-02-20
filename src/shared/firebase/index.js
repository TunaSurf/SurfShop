import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export default class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      // Check that `window` is in scope for the analytics module!
      if (typeof window !== 'undefined') {
        // Enable analytics. https://firebase.google.com/docs/analytics/get-started
        if ('measurementId' in config) {
          firebase.analytics();
          firebase.performance();
        }
      }
    }

    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage().ref();

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.googleProvider.setCustomParameters({ prompt: 'select_account' });
    // this.googleProvider.addScope('profile');
    // this.googleProvider.addScope('email');
  }

  // ################
  // *** Auth API ***
  // ################
  // Creates user, adds user to firebase's authenticated users, adds authenticated user to firestore's collection of users
  // Parameters: requires an email and password to authenticate, additional credentials will be added to the db
  createUserWithEmailAndPassword = async ({
    email,
    password,
    displayName,
    roles,
  }) => {
    // Authorize user
    const authUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    // Add displayName to the user's profile
    await authUser.user.updateProfile({ displayName });
    // Now that user has been authorized, add a document to the users collection in the db as well
    await this.dbUser(authUser.user.uid).set(
      {
        roles,
      },
      {
        merge: true,
      }
    );
    // Send an email verification to the newly created user
    await this.sendEmailVerification();
  };

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () => this.signInWithSocialProvider(this.googleProvider);

  // Signs user in with the given provider - authenticates and adds to db
  signInWithSocialProvider = async (provider) => {
    const socialAuthUser = await this.auth.signInWithPopup(provider);
    // Set user credentials in db
    await this.dbUser(socialAuthUser.user.uid).set(
      {
        roles: {},
      },
      { merge: true }
    );
  };

  signOut = () => this.auth.signOut();

  sendPasswordResetEmail = (email) => this.auth.sendPasswordResetEmail(email);

  updatePassword = (password) => this.auth.currentUser.updatePassword(password);

  sendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  onAuthStateChanged = (observer) => this.auth.onAuthStateChanged(observer);

  // #############
  // *** DB API***
  // #############
  // *** User API ***
  dbUser = (uid) => this.db.doc(`users/${uid}`);

  dbUsers = () => this.db.collection('users');

  // *** Post API ***
  post = (postID) => this.db.doc(`posts/${postID}`);

  posts = () => this.db.collection(`posts`);

  // #################
  // ***Storage API***
  // #################
  upload = (file, location) =>
    this.storage.child(`posts/${location}`).put(file);
}
