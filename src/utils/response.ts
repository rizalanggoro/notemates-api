export const response = {
  success: (body?: any) => new Response(body),
  error: {
    badRequest: () =>
      new Response(undefined, {
        status: 400,
      }),
    unauthorized: () =>
      new Response(undefined, {
        status: 401,
      }),
    notFound: () =>
      new Response(undefined, {
        status: 404,
      }),
    conflict: () =>
      new Response(undefined, {
        status: 409,
      }),
    internalServer: () =>
      new Response(undefined, {
        status: 500,
      }),
  },
};
