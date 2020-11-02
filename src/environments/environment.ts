// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// url de los clientes en SpringBoot BackEnd
export const urlEndPoint = "http://localhost:8080/api/clientes";

// url de la autentificacion mediante oauth2 de spring security
export const urlEndPointOAuth = "http://localhost:8080/oauth/token";

// cliente web
const webClient = "angularapp";

// cliente web passoword
const webClientPass = "Angular&Spring5";

export const webCredentials = btoa(webClient+':'+webClientPass);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
