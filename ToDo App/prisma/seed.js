const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const todos = [
    { title: "Buy groceries", description: "", completed: false },
    { title: "Walk the dog", description: "", completed: true },
    { title: "Read a book", description: "", completed: false },
  ];

  for (const todo of todos) {
    await prisma.todo.create({
      data: todo,
    });
  }

  // console.log(`Seeded ${todos.length} todo items`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
