const prisma = require("../config/prisma");

const getCategories = async (userId) => {
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        {
          isDefault: true,
        },
        {
          userId,
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });

  return categories;
};
const createCategory = async (name, userId) => {
  if (!name || typeof name !== "string" || name.trim() === "") {
    throw new Error("Category name is required.");
  }

  const cleanName = name.trim();
  if (cleanName.length > 50) {
    throw new Error("Category name must be 50 characters or less.");
  }

  const slug = cleanName
  .toLowerCase()
  .replace(/\s+/g, "-");

const existingCategory = await prisma.category.findFirst({
  where: {
    slug,
    OR: [
      {
        isDefault: true,
      },
      {
        userId,
      },
    ],
  },
});

if (existingCategory) {
  throw new Error("A category with this name already exists.");
}

  const category = await prisma.category.create({
    data: {
      name: cleanName,
      slug,
      isDefault: false,
      userId,
    },
  });

  return category;
};

module.exports = {
  getCategories,
  createCategory,
};

