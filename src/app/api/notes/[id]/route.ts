import { response } from "@/utils/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const note = await prisma.note.findFirst({
      where: { id: Number(params.id) },
      include: {
        comments: true,
        _count: { select: { likes: true, comments: true } },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return response.success(JSON.stringify(note));
  } catch (e) {
    return response.error.internalServer();
  }
}
