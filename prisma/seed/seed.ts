import { createSeedClient } from "@snaplet/seed";
import { genSalt, hash } from "bcrypt";

const main = async () => {
  const seed = await createSeedClient();
  await seed.$resetDatabase();

  const password = await hash("password", await genSalt(12));

  await seed.user(() => [
    {
      name: "Rizal Dwi Anggoro",
      email: "rizal@email.com",
      password,
      notes: [
        {
          title: "Judul Catatan Pertama",
          description: "Deskripsi catatan pertama",
          content: "# Hello world pertama",
        },
        {
          title: "Judul Catatan Kedua",
          description: "Deskripsi catatan kedua",
          content: "# Hello world kedua",
        },
        {
          title: "Judul Catatan Ketiga",
          description: "Deskripsi catatan ketiga",
          content: "# Hello world ketiga",
        },
      ],
    },
  ]);

  console.log("Database seeded successfully!");

  process.exit();
};

main();
