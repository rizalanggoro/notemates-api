import { response } from "@/utils/response";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { email, password } = json;

    if (!email || !password) return response.error.badRequest();

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) return response.error.notFound();

    // validate password
    if (!(await compare(password, user.password)))
      return response.error.unauthorized();

    return response.success(JSON.stringify(user));
  } catch (e) {
    return response.error.internalServer();
  }
}
