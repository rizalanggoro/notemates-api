import { response } from "@/utils/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      include: {
        _count: { select: { likes: true, comments: true } },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.success(JSON.stringify(notes));
  } catch (e) {
    console.log(e);
    return response.error.internalServer();
  }
}
