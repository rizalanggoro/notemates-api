import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const { idRequester } = json;

    if (!idRequester) return response.error.badRequest();

    const user = await prisma.user.findFirst({
      where: { id: Number(params.id) },
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: {
            followedBy: true,
            following: true,
            notes: true,
          },
        },
        notes: {
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
          },
        },
      },
    });

    const isFollowed =
      (await prisma.userFollow.findFirst({
        where: {
          AND: {
            followingId: idRequester,
            followedById: user?.id,
          },
        },
      })) != undefined;

    return response.successJson({ ...user, isFollowed });
  } catch (e) {
    return response.error.internalServer();
  }
}
