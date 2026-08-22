const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    where: {
      isDefault: true,
    },
  });

  for (const category of categories) {
    await prisma.expense.updateMany({
      where: {
        category: category.name,
        categoryId: null,
      },
      data: {
        categoryId: category.id,
      },
    });
  }

  console.log("Existing expenses linked to categories successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });