import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.note.update({
      where: { id: Number.parseInt(params.id) },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return response.success();
  } catch (e) {
    return response.error.internalServer();
  }
}
