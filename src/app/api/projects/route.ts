import { PrismaClient } from '@prisma/client';
import {NextResponse} from "next/server";
import { authenticateToken } from "@/shared/auth";
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


export async function POST(req: Request) {
    const data = await req.json();

    if (data.action === 'create') {
        // Create a new project
        const newProject = await prisma.project.create({
            data: {
                name: data.name,
                time: 0,
            },
        });
        return new Response(JSON.stringify(newProject), { status: 201 });
    }

    if (data.action === 'update') {
        // Update an existing project's time
        const updatedProject = await prisma.project.update({
            where: {
                id: data.projectId,
            },
            data: {
                time: {
                    increment: data.additionalTime,
                },
            },
        });
        return new Response(JSON.stringify(updatedProject), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
}


export async function GET(req: Request) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Token not informed" }, { status: 401 });
        }
        const userId = authenticateToken(token);

        const projects = await prisma.project.findMany({
            where: { authorId: userId },
        });

        return NextResponse.json(projects);
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
