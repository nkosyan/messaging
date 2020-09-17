import firebase from 'firebase';

class Firebase {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => firebase.initializeApp({
    apiKey: 'AIzaSyAVrnPZ5ksL7TEGVSCuCO0CS86EhPlDGno',
    authDomain: 'narkos-2020.firebaseapp.com',
    databaseURL: 'https://narkos-2020.firebaseio.com',
    projectId: 'narkos-2020',
    storageBucket: '',
    messagingSenderId: '34998462751',
  });
  observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return firebase.auth().currentUser?.uid;
  }
  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    return {
      _id: snapshot.key,
      timestamp: new Date(numberStamp),
      text,
      user,
    };
  };
  on = callback => this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));
  off = () => this.ref.off();
  send = msgs => msgs?.forEach(({ text, user, _id }) => this.ref.push({ text, user, timestamp: firebase.database.ServerValue.TIMESTAMP }));

}

Firebase.shared = new Firebase();
export default Firebase;
