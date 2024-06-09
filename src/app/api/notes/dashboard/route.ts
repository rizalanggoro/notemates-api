import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { idRequester } = json;

    if (!idRequester) return response.error.badRequest();

    const notes = await prisma.note.findMany({
      where: {
        user: {
          followedBy: {
            some: {
              followingId: idRequester,
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        views: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.successJson(notes);
  } catch (e) {
    return response.error.internalServer();
  }
}
