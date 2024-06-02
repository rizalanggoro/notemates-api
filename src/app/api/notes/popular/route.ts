import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        views: true,
        _count: { select: { likes: true, comments: true } },
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { views: "desc" },
        { likes: { _count: "desc" } },
        { title: "asc" },
      ],
      take: 3,
    });

    return response.successJson(notes);
  } catch (e) {
    console.log(e);
    return response.error.internalServer();
  }
}
