import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Authorization token missing or invalid' },
            { status: 401 }
        );
    }

    const JWT_SECRET = process.env.JWT_SECRET || "Secret key";
    const token = authHeader.split(' ')[1];

    let authorId: string;
    try {
        const decoded = jwt.verify(token, JWT_SECRET || '') as { authorId: string };
        authorId = decoded.authorId;
        console.log('Decoded token:', authorId); // Debug
    } catch  {
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
        );
    }

    const projectId = (await params).projectId;

    // Validate projectId
    if (!projectId || Array.isArray(projectId)) {
        return NextResponse.json(
            { error: 'projectId must be a valid number' },
            { status: 400 }
        );
    }

    const projectIdNumber = parseInt(projectId, 10);

    if (isNaN(projectIdNumber)) {
        return NextResponse.json(
            { error: 'projectId must be a valid number' },
            { status: 400 }
        );
    }

    try {
        const body = await req.json();
        const { newProjectName } = body;

        if (!newProjectName) {
            return NextResponse.json(
                { error: 'New project name is required' },
                { status: 400 }
            );
        }

        const project = await prisma.project.findUnique({
            where: { id: projectIdNumber },
            select: { authorId: true },
        });

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        console.log('Project fetched from DB:', project); // Debug

        if (!project.authorId) {
            return NextResponse.json(
                { error: 'You are not authorized to update this project' },
                { status: 403 }
            );
        }

        const updatedProject = await prisma.project.update({
            where: { id: projectIdNumber },
            data: { name: newProjectName },
        });

        return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        return NextResponse.json(
            { error: 'An error occurred while updating the project' },
            { status: 500 }
        );
    }
}
