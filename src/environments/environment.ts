// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api/',
  filmesUri: 'filmes',
  categoriasUri: 'categorias',
  loginUri: 'login',
  usuarioUri: 'usuarios',
  waitForRetryDelay: 2200,
  retryTimes: 5,
  languageHeader: 'accept-language',
  connectionErrorPage: 'erroconexao',
  authLocalStore: 'session',
  authHeaderHeader: 'Authentication',
  authTokenPrefix: 'Bearer ',
  telefoneMask: '(00) 00000-0000||(00) 0000-0000',
  dbDateFormat: 'yyyy-MM-DD',
  searchWaitTimeMs: 700,
  maxImageSize: 10485760
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
