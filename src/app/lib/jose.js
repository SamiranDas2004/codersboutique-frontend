import { jwtVerify } from "jose";

export const verifyJoseToken = async token => {
    try {
        // verify token
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRETKEY),
            {
                // issuer: process.env.JWT_ISSUER, // issuer
                // audience: process.env.JWT_AUDIENCE, // audience
                algorithms: ["HS256"],
            }
        );
        return verified.payload;
    } catch (e) {
        if (e instanceof Error) {
            // throw new Error(`Token has expired: ${e.message}`);
            console.log(`Token has expired: ${e.message}`);
        } else {
            console.log(`Token has expired`);
            // throw new Error("Token has expired");
        }
    }
};