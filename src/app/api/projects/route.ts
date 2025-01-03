import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


export async function POST(req: Request) {
    const data = await req.json();

    const newProject = await prisma.project.create({
        data: {
            name: data.name,
            time: 0,
        },
    });
    return new Response(JSON.stringify(newProject), { status: 201 });
}
