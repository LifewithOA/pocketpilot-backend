const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.expense.updateMany({
    where: {
      category: "Transport",
      categoryId: null,
    },
    data: {
      category: "Transportation",
    },
  });

  console.log(`${result.count} expense(s) updated.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });