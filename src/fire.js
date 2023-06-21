import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCDqMgF57t0c2DVrB-RMRo-p8lRNroyEo0',
  authDomain: 'hackaton-js-react.firebaseapp.com',
  projectId: 'hackaton-js-react',
  storageBucket: 'hackaton-js-react.appspot.com',
  messagingSenderId: '247005307843',
  appId: '1:247005307843:web:3e64918e2944afeab69376',
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
