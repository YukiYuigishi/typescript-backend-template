import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const app = fastify({ logger: true });
const prisma = new PrismaClient();

app.get("/", async (_reqest, reply) => {
  reply.send({ hello: "world" });
});

interface IPostBody {
  email: string;
  name: string | null;
  tel: string | null;
}

app.post<{ Body: IPostBody }>("/post", async (req, res) => {
  const { email, name, tel } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    const user = await prisma.users.create({
      data: {
        email,
        name: name || null,
        tel: tel || null,
      },
    });
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create user" });
  }
});

app.listen({ port: 8080, host: "0.0.0.0" }, (err, _address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
