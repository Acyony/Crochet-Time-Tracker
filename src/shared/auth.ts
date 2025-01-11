import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Secret key";

export function authenticateToken(token: string): number {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        return decoded.userId;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        throw new Error("Token invalid or expired");
    }
}
