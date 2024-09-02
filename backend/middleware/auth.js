import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const verifyToken = async (request, response, next) => {
    try {
        // Extract the token from the Authorization header
        let token = request.headers.authorization;
        token = token.split(" ")[1]; // Remove "Bearer" prefix

        // Verify the token using the secret key
        jwt.verify(token, "fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj");

        // If verification succeeds, proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If verification fails, return a 401 Unauthorized response
        return response.status(401).json({ error: "Unauthorized access" });
    }
}
