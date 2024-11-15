import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", (_reqest, reply) => {
   reply.send({ hello: "world" });
});

fastify.listen({ port: 8080 }, (err, _address) => {
   if (err) {
      fastify.log.error(err);
      process.exit(1);
   }
   // Server is now listening on ${address}
});
