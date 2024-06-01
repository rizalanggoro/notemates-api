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
          title: "Rizal: Judul Catatan Pertama",
          description: "Deskripsi catatan pertama",
          content: "# Hello world pertama",
        },
        {
          title: "Rizal: Judul Catatan Kedua",
          description: "Deskripsi catatan kedua",
          content: "# Hello world kedua",
        },
        {
          title: "Rizal: Judul Catatan Ketiga",
          description: "Deskripsi catatan ketiga",
          content: "# Hello world ketiga",
        },
      ],
    },
    {
      name: "Yanuar Al Hisyami",
      email: "yanuar@email.com",
      password,
      notes: [
        {
          title: "Yanu: Judul Catatan Pertama",
          description: "Deskripsi catatan pertama",
          content: "# Hello world pertama",
        },
        {
          title: "Yanu: Judul Catatan Kedua",
          description: "Deskripsi catatan kedua",
          content: "# Hello world kedua",
        },
        {
          title: "Yanu: Judul Catatan Ketiga",
          description: "Deskripsi catatan ketiga",
          content: "# Hello world ketiga",
        },
      ],
    },
    {
      name: "Rafly Amanta",
      email: "rafly@email.com",
      password,
      notes: [
        {
          title: "Rafly: Judul Catatan Pertama",
          description: "Deskripsi catatan pertama",
          content: "# Hello world pertama",
        },
        {
          title: "Rafly: Judul Catatan Kedua",
          description: "Deskripsi catatan kedua",
          content: "# Hello world kedua",
        },
        {
          title: "Rafly: Judul Catatan Ketiga",
          description: "Deskripsi catatan ketiga",
          content: "# Hello world ketiga",
        },
      ],
    },
  ]);

  await seed.userFollow(() => [
    { followingId: 1, followedById: 2 },
    { followingId: 1, followedById: 3 },
    { followingId: 2, followedById: 3 },
    { followingId: 3, followedById: 1 },
    { followingId: 3, followedById: 2 },
  ]);

  console.log("Database seeded successfully!");

  process.exit();
};

main();
