import {PrismaClient} from '@prisma/client';
import {NextResponse} from "next/server";
import {authenticateToken} from "@/shared/auth";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function getUserIdFromRequest(req: Request): Promise<number | null> {
    const tokenWithBearer = req.headers.get("Authorization");
    if (!tokenWithBearer) {
        return null;
    }

    const parts = tokenWithBearer.split(" ");
    if (parts.length !== 2) {
        return null;
    }

    const token = parts[1];

    try {
        return authenticateToken(token);
    } catch {
        return null;
    }
}



export async function POST(req: Request) {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const data = await req.json();

    if (data.action === 'create') {
        const newProject = await prisma.project.create({
            data: {
                name: data.name,
                time: 0,
                authorId: userId,
            },
        });
        return new Response(JSON.stringify(newProject), { status: 201 });
    }

    if (data.action === 'update') {
        const updatedProject = await prisma.project.update({
            where: {
                id: data.projectId,
                authorId: userId,
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
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
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
