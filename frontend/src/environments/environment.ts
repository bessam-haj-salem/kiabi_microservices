// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // users
  urlUsers: "http://localhost:8099/users/",
  urlUserLogin: "http://localhost:8099/users/login",
  // urlGetUsers: "http://localhost:4000/api/users",
  // urlAddUser: "http://localhost:4000/api/users/register",
  // urlDeleteUser: "http://localhost:4000/api/users/delete/",
  // urlUpdateUser: "http://localhost:4000/api/users/update/",
  // urlLoginUser: "http://localhost:4000/api/users/login",
  // API
  urlApiCrackend: "http://localhost:8099/api",
  urlAddRabbit: "http://localhost:8099/clients/produce",


  //clients
  urlClients: "http://localhost:8099/clients/",
  // urlGetClients: "http://localhost:3000/api/addclients",
  // urlClient: "http://localhost:3000/clients/",
  // urlAddClient: "http://localhost:3000/api/clients/add",
  // urlDeleteClient: "http://localhost:3000/api/clients/delete/",
  // urlUpdateClient: "http://localhost:3000/api/clients/update/",
  
  //produits
  urlProduits: "http://localhost:8099/products/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
