import { response } from "@/utils/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.success(JSON.stringify(notes));
  } catch (e) {
    return response.error.internalServer();
  }
}
