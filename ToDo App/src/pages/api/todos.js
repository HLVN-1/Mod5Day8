import { prisma } from "@/server/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .end(`Method ${req.method} Not Allowed. We only accept GET requests`);
  }
}
