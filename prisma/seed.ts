import { PrismaClient } from "@prisma/client";

// Prismaクライアントの初期化
const prisma = new PrismaClient();

async function main() {
  // 初期データの投入
  console.log("Seeding database...");

  // Userテーブルにデータを挿入
  await prisma.user.createMany({
    data: [
      { email: "john.doe@example.com", name: "John Doe", tel: "12345678901" },
      { email: "jane.doe@example.com", name: "Jane Doe", tel: "10987654321" },
      { email: "sam.smith@example.com", name: "Sam Smith", tel: null },
    ],
  });

  // Articlesテーブルにデータを挿入
  await prisma.articles.createMany({
    data: [
      { contents: "Prisma is an ORM for modern applications." },
      { contents: "Seeding databases is easy with Prisma." },
      { contents: "Learn how to use Prisma with PostgreSQL." },
    ],
  });

  console.log("Seeding completed.");
}

// スクリプト実行
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
