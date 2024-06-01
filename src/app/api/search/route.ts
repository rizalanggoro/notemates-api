import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword")?.toLocaleLowerCase();

    if (!keyword) return response.error.badRequest();

    const users = await prisma.user.findMany({
      where: {
        name: { contains: keyword, mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: {
            followedBy: true,
          },
        },
      },
    });

    const notes = await prisma.note.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        views: true,
        _count: { select: { likes: true, comments: true } },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return response.successJson({
      users,
      notes,
    });
  } catch (e) {
    console.log(e);
    return response.error.internalServer();
  }
}
