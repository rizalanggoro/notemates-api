import { response } from "@/utils/response";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

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
        view: true,
        like: true,
      },
    });

    return response.success(
      JSON.stringify({
        users,
        notes,
      })
    );
  } catch (e) {
    console.log(e);
    return response.error.internalServer();
  }
}
