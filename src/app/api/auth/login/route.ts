import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(
    req: Request) {

    const data = await req.json();
    const { email, password } = data;

    if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }
}
