import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


export async function POST(
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }) {
    const projectIdStr = (await params).projectId;
    const projectId = parseInt(projectIdStr, 10);
    const data = await req.json();

    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            time: {
                increment: data.additionalTime,
            },
        },
    });
    return new Response(JSON.stringify(updatedProject), { status: 200 });
}


