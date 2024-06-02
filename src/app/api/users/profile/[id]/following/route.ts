import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const users = await prisma.user.findMany({
      where: {
        followedBy: {
          some: {
            followingId: Number(params.id),
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return response.successJson(users);
  } catch (e) {
    return response.error.internalServer();
  }
}
