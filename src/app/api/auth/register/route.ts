import validator from "validator";
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(
    req: Request) {

    const data = await req.json();
    const {email, password} = data;

    try {
        // Validate email
        if (!validator.isEmail(email)) {
            return new Response(JSON.stringify({message: 'Invalid email format'}), {status: 400});
        }

        // Validate password
        if (password.length < 8) {
            return new Response(JSON.stringify({message: 'Password must be at least 8 characters long'}), {status: 400});
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return new Response(JSON.stringify({message: 'Email already exists'}), {status: 400});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // Respond with success
        return new Response(JSON.stringify({
            message: 'User created successfully',
            user: {email: newUser.email},
        }), {status: 201});

    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({message: 'Internal server error'}), {status: 500});
    }
}
