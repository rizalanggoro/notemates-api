import { response } from "@/utils/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { title, description, content, authorId } = json;

    if (!title || !description || !content || !authorId)
      return response.error.badRequest();

    const note = await prisma.note.create({
      data: {
        title,
        description,
        content,
        authorId,
      },
    });

    return response.success(JSON.stringify(note));
  } catch (e) {
    return response.error.internalServer();
  }
}
