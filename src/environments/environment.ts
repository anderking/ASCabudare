// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA2jTUN1-LY9GvAHKBWrf_SjETzf_W9x-w',
    authDomain: 'ingreso-egreso-912f0.firebaseapp.com',
    databaseURL: 'https://ingreso-egreso-912f0.firebaseio.com',
    projectId: 'ingreso-egreso-912f0',
    storageBucket: 'ingreso-egreso-912f0.appspot.com',
    messagingSenderId: '363021279013',
    appId: '1:363021279013:web:58927a23e9b3a7381ec4cc',
    measurementId: 'G-PC73KDJKRV'
  },
  failed: 'Hay problemas para cargar los datos, revise su conexion a internet o recargue la página',
  conexionFailed: 'Ha ocurrido un error al enviar sus datos!!! posiblemente esto se deba a problemas con su conexión a internet, para asegurarnos de esto, recargaremos la página y por favor intente de nuevo. Si el problema persiste intente mas tarde.',
  apiUrl: '',
  key : "aW5nYW5kZXJzb25kaWF6",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
