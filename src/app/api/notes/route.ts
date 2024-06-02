import { response } from "@/utils/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { title, description, content, idUser } = json;

    if (!title || !description || !content || !idUser)
      return response.error.badRequest();

    const note = await prisma.note.create({
      data: {
        title,
        description,
        content,
        idUser: idUser,
      },
    });

    return response.successJson(note);
  } catch (e) {
    return response.error.internalServer();
  }
}
