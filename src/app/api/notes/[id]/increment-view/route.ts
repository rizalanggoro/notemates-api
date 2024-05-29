import { response } from "@/utils/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.note.update({
      where: { id: Number.parseInt(params.id) },
      data: {
        view: {
          increment: 1,
        },
      },
    });
    return response.success();
  } catch (e) {
    return response.error.internalServer();
  }
}
