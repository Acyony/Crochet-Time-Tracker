import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export async function DELETE( { params }: { params: { projectId: string } }) {
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
        // Delete the project from the database
        const deletedProject = await prisma.project.delete({
            where: { id: projectIdNumber },
        });

        // Return the deleted project data
        return NextResponse.json(deletedProject, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // Handle errors (e.g., project not found)
        return NextResponse.json(
            { error: 'Project not found or could not be deleted' },
            { status: 404 }
        );
    }
}
