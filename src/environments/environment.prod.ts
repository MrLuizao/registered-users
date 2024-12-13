import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'http://localhost:4200',

  firebase: {
    apiKey: "AIzaSyBQ0S68gorkbFP-eBZsCRraZbrp7YV4eu4",
    authDomain: "form-qr.firebaseapp.com",
    projectId: "form-qr",
    storageBucket: "form-qr.firebasestorage.app",
    messagingSenderId: "274695449880",
    appId: "1:274695449880:web:8aa249019e4ea7dc4c026d",
    measurementId: "G-E70S83NLW2"
  }
  
};
