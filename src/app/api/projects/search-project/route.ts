import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams
    const name = searchParams.get('name')

    // Validar se o nome do projeto foi fornecido corretamente
    if (!name) {
        return NextResponse.json(
            {error: 'projectName must be a valid string'},
            {status: 400}
        );
    }

    try {
        // Buscar o projeto pelo nome no banco de dados
        const projects = await prisma.project.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                }
            },
        });

        // Retornar os dados do projeto
        return NextResponse.json(projects);
    } catch (error) {
        // Retornar erro caso o projeto não seja encontrado
        return NextResponse.json(
            {error: 'Project not found'},
            {status: 404}
        );
    }
}
