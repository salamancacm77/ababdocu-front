// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const api = {
  // Datos para conexión
  // Basic Authentication
  user: 'sergiom',
  passUser: 'qwerty123',
  // URL Localhost (URL + Port)
  urlLocalhost: 'http://localhost:8000',
  // Datos de servidor SAP (URL + Port)
  urlServer: '/35.184.254.201:8000',
  // Datos de servicio
  // Ruta principal
  mainService: '/sap/bc/sofka/abapdocu',
  // Ruta para clases
  classesService: '/class/info/',
  classAttributes: '/class/attributes/',
  classMethods: '/class/methods/',
  classTypes: '/class/types/',
  classEvents: '/class/events/',
  classFriends: '/class/friends/',
  classInheritance: '/class/inheritance/',
  sourceCodeClassMethod:'/class/sourcecode/',
  // Datos Mandante
  mandt: '?sap-client=800'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
