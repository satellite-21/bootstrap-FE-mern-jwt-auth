// we want to retrieve the data from the server 
// in the case we access the protected rsources , 
// the http request needs authorization header

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.accessToken) {
        // The Bearer scheme is a common authentication scheme used for including access tokens in authorization headers.
        // return {Authorization: 'Bearer ' + user.accessToken}; for spring Boot BackEnd 
        return { 'x-access-token': user.accessToken };
// this is how the  authorization header might look like
//    {
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vcnR5IFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.abc123XYZ'
//   }
  
    } else{
        return {};
    }
}
// this code will check local storage for user item, if the user is logged in 
// return http authorization header 
// else return empty object

// ------------------BEARER SCHEME -----------------------
// this is a type of authentication scheme used to include access tokens in Authorization Headers
// this is a way for the client to communicate with the server to prove its identity
// -------------------------WORKING------------------------
// >>> client sends request to server to access protected resources
// >>> in order to authenticate itself, client includes the authorization header in the request, it contains accessToken
// >>> the accessToken is prefixed with the word 'Bearer ' , this indicates that the token being sent is of bearer type 
// >>> server receives the request and looks for the authorization headers, it checks the bearer type to identify the token type
// >>> once it recognizes, it extracts the token and verifies 
// >>> if the token is valid server grants permission to access the resources , if the token is invalid or expires, server denies the request


// The Bearer scheme is widely used in token-based authentication mechanisms, such as OAuth 2.0 and JSON Web Tokens (JWT).

