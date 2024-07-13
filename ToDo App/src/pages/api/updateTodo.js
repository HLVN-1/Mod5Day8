import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, title, completed } = req.body;

    // Check if the todo already exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (existingTodo) {
      try {
        const updatedTodo = await prisma.todo.update({
          where: { id: Number(id) },
          data: { title, completed },
        });
        res
          .status(200)
          .json({ todo: updatedTodo, message: "You've completed this task!" });
      } catch (error) {
        console.error("error", error);
        res.status(500).json({
          error: "Failed to update todo. We only support PUT requests",
        });
      }
    } else {
      try {
        const newTodo = await prisma.todo.create({
          data: { title, completed },
        });
        res.status(201).json(newTodo);
      } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Failed to create todo" });
      }
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res
      .status(405)
      .end(`Method ${req.method} Not Allowed. We only support PUT requests`);
  }
}
