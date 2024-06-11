import { createSeedClient } from "@snaplet/seed";
import { genSalt, hash } from "bcrypt";
import { readFileSync } from "fs";
import { resolve } from "path";

const main = async () => {
  const seed = await createSeedClient();
  await seed.$resetDatabase();

  const password = await hash("password", await genSalt(12));

  await seed.user(() => [
    {
      name: "Rizal Dwi Anggoro",
      email: "rizal@gmail.com",
      password,
      notes: [
        {
          title: "Bakteri dan Fungi",
          description:
            "Bakteri adalah mikroorganisme bersel tunggal yang termasuk dalam domain Prokaryota.",
          content: readFileSync(
            resolve(__dirname, "contents/bakteri-dan-fungi.md"),
            "utf-8"
          ),
        },
        {
          title: "Apa itu sejarah?",
          description:
            "Sejarah adalah studi tentang masa lalu, khususnya bagaimana kaitannya dengan manusia.",
          content: readFileSync(
            resolve(__dirname, "contents/sejarah.md"),
            "utf-8"
          ),
        },
        {
          title: "Sistem Operasi Android",
          description:
            "Android adalah sistem operasi berbasis Linux yang dirancang untuk perangkat layar sentuh seperti smartphone dan tablet.",
          content: readFileSync(
            resolve(__dirname, "contents/sistem-operasi-android.md"),
            "utf-8"
          ),
        },
      ],
    },
    {
      name: "Yanuar Al Hisyami",
      email: "yanuar@gmail.com",
      password,
      notes: [
        {
          title: "Pendidikan Agama Islam",
          description:
            "Pendidikan Agama Islam adalah proses pembelajaran yang bertujuan untuk menanamkan nilai-nilai keagamaan Islam kepada peserta didik.",
          content: readFileSync(resolve(__dirname, "contents/pai.md"), "utf-8"),
        },
        {
          title: "Pendidikan Kewarganegaraan",
          description:
            "Pendidikan Kewarganegaraan adalah proses pendidikan yang bertujuan untuk membentuk warga negara yang memahami hak dan kewajibannya.",
          content: readFileSync(resolve(__dirname, "contents/pkn.md"), "utf-8"),
        },
        {
          title: "Ilmu Pengetahuan Sosial",
          description:
            "Ilmu Pengetahuan Sosial (IPS) adalah disiplin ilmu yang mempelajari aspek-aspek sosial dari kehidupan manusia, termasuk interaksi antarindividu, kelompok, dan masyarakat serta hubungan manusia dengan lingkungan sekitarnya.",
          content: readFileSync(resolve(__dirname, "contents/ips.md"), "utf-8"),
        },
      ],
    },
    {
      name: "Rafly Amanta Haryanto",
      email: "rafly@gmail.com",
      password,
      notes: [
        {
          title: "Pemberontakan G30SPKI",
          description:
            "Partai Komunis Indonesia (PKI) adalah partai politik yang berhaluan komunis dan pernah menjadi salah satu partai terbesar di Indonesia sebelum dilarang pada tahun 1966.",
          content: readFileSync(resolve(__dirname, "contents/ips.md"), "utf-8"),
        },
        {
          title: "Kisah: Nyi Roro Jonggrang",
          description:
            "Nyi Roro Jonggrang adalah tokoh legendaris dalam mitologi Jawa, yang terkait dengan cerita pembangunan Candi Prambanan.",
          content: readFileSync(
            resolve(__dirname, "contents/nyi-roro.md"),
            "utf-8"
          ),
        },
        {
          title: "Penggunaan Grammar dalam Bahasa Inggris",
          description:
            "Grammar Bahasa Inggris adalah aturan atau struktur yang digunakan untuk membentuk kalimat yang benar dalam bahasa Inggris.",
          content: readFileSync(
            resolve(__dirname, "contents/grammar.md"),
            "utf-8"
          ),
        },
      ],
    },
    {
      name: "Widya Khoirunnisa",
      email: "nisa@gmail.com",
      password,
    },
    {
      name: "Rafi Prathama Nugraha",
      email: "rafi@gmail.com",
      password,
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
