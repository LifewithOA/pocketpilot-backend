const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Food", slug: "food" },
    { name: "Transportation", slug: "transportation" },
    { name: "Bills", slug: "bills" },
    { name: "Groceries", slug: "groceries" },
    { name: "Charity", slug: "charity" },
    { name: "Emergency", slug: "emergency" },
    { name: "Savings", slug: "savings" },
    { name: "Personal Care", slug: "personal-care" },
    { name: "Entertainment", slug: "entertainment" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
        isDefault: true,
      },
    });
  }

  console.log("Default categories seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });