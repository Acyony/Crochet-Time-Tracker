import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from "next/server";
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
export async function GET(req: NextRequest) {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const searchParams = req.nextUrl.searchParams
    const name = searchParams.get('name')

    if (!name) {
        return NextResponse.json(
            {error: 'projectName must be a valid string'},
            {status: 400}
        );
    }

    try {
        const projects = await prisma.project.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
                authorId: userId
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(projects);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {error: 'Project not found'},
            {status: 404}
        );
    }
}
