import {PrismaClient} from '@prisma/client';
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export async function GET(req: NextApiRequest, {params}: { params: { projectId: string } }) {
    const projectId = (await params).projectId;

    // Ensure projectId exists and is a single value
    if (!projectId || Array.isArray(projectId)) {
        return NextResponse.json(
            { error: 'projectId must be a valid number' },
            { status: 400 }
        );
    }

    // Convert projectId to a number if necessary
    const projectIdNumber = parseInt(projectId, 10);

    if (isNaN(projectIdNumber)) {
        return NextResponse.json(
            { error: 'projectId must be a valid number' },
            { status: 400 }
        );
    }

    try {
        // Fetch project from database
        const project = await prisma.project.findFirstOrThrow({
            where: {id: projectIdNumber},
        });
        // Return the project data
        return NextResponse.json(project);
    } catch {
        // Handle errors (e.g., project not found)
        return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
        );
    }
}



