import { prisma } from "@/utils/prisma-client";
import { response } from "@/utils/response";
import { headers } from "next/headers";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const idRequester = Number(headers().get("idRequester"));

    if (!idRequester) return response.error.badRequest();

    await prisma.likeNote.create({
      data: {
        idUser: idRequester,
        idNote: Number(params.id),
      },
    });

    return response.successJson({});
  } catch (e) {
    return response.error.internalServer();
  }
}
