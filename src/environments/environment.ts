// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
