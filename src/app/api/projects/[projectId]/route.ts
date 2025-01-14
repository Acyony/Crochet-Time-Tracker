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

export async function GET(
    req: NextRequest,
    {params}: { params: Promise<{ projectId: string }> }) {
    const projectId = (await params).projectId;
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
        return new Response(JSON.stringify({error: "Unauthorized"}), {status: 401});
    }
    // Ensure projectId exists and is a single value
    if (!projectId || Array.isArray(projectId)) {
        return NextResponse.json(
            {error: 'projectId must be a valid number'},
            {status: 400}
        );
    }

    // Convert projectId to a number if necessary
    const projectIdNumber = parseInt(projectId, 10);

    if (isNaN(projectIdNumber)) {
        return NextResponse.json(
            {error: 'projectId must be a valid number'},
            {status: 400}
        );
    }

    try {
        // Fetch project from database
        const project = await prisma.project.findFirstOrThrow({
            where: {
                id: projectIdNumber,
                authorId: userId
            },
        });
        // Return the project data
        return NextResponse.json(project);
    } catch {
        // Handle errors (e.g., project not found)
        return NextResponse.json(
            {error: 'Project not found'},
            {status: 404}
        );
    }
}



