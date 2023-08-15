import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "https://harakeke-2023-jiho.au.auth0.com/api/v2/",
  issuerBaseURL: "https://harakeke-2023-jiho.au.auth0.com",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
