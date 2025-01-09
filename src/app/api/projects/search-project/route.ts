import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export async function GET(req: NextRequest) {

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
                }
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
