import { PrismaClient } from '@prisma/client';
import {NextResponse} from "next/server";
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


export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                id: 'desc',
            },
        });
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}
