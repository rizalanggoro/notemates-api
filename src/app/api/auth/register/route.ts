import { response } from "@/utils/response";
import { Prisma, PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { name, email, password } = json;

    if (!name || !email || !password) return response.error.badRequest();

    const hashedPassword = await hash(password, await genSalt(12));
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return response.success(JSON.stringify(user));
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
      if (e.code === "P2002") return response.error.conflict();

    return response.error.internalServer();
  }
}
