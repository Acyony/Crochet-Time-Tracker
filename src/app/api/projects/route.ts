import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const projects = await prisma.project.findMany();
    return new Response(JSON.stringify(projects));
}

export async function POST(req: Request) {
    const data = await req.json();
    const newProject = await prisma.project.create({ data: {
            name: data.name,
            hours: data.hours,
        }, });
    return new Response(JSON.stringify(newProject), { status: 201 });
}
