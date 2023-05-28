// import { expressjwt, GetVerificationKey } from "express-jwt";
// import jwksRsa from "jwks-rsa";
// import * as dotenv from "dotenv";

// dotenv.config();

// export const checkJwt = expressjwt({
//     secret: jwksRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//     }) as GetVerificationKey,

//     // Validate the audience and the issuer.
//     audience: process.env.AUTH0_AUDIENCE,
//     issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ["RS256"]
// });

import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import * as dotenv from "dotenv";

dotenv.config();

export const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});