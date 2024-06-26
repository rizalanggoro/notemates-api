import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";
import { headers } from "next/headers";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.note.delete({
      where: {
        id: Number(params.id),
      },
    });

    return response.successJson({});
  } catch (e) {
    return response.error.internalServer();
  }
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const idRequester = Number(headers().get("idRequester"));
    if (!idRequester) return response.error.badRequest();

    const note = await prisma.note.findFirst({
      where: { id: Number(params.id) },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        views: true,
        _count: {
          select: {
            likes: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!note) return response.error.notFound();

    const isLiked = await prisma.likeNote.findFirst({
      where: {
        AND: [{ idUser: idRequester }, { idNote: note?.id }],
      },
    });

    return response.successJson({
      ...note,
      isLiked: isLiked != null,
    });
  } catch (e) {
    return response.error.internalServer();
  }
}
