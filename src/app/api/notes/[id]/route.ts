import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const note = await prisma.note.findFirst({
      where: { id: Number(params.id) },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        views: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return response.successJson(note);
  } catch (e) {
    return response.error.internalServer();
  }
}
