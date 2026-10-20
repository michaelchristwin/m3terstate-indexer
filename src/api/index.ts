import { db } from "ponder:api";
import schema, { commit } from "ponder:schema";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { client, desc, graphql } from "ponder";
import { commitSchema } from "./models/commit";

const app = new OpenAPIHono();

app.use("/sql/*", client({ db, schema }));

app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

const latestCommitRoute = createRoute({
  method: "get",
  path: "/commits/latest",
  responses: {
    200: {
      content: { "application/json": { schema: commitSchema } },
      description: "The commit with the highest chain length",
    },
    404: { description: "No commits yet" },
  },
});

app.openapi(latestCommitRoute, async (c) => {
  const latestCommit = await db.query.commit.findFirst({
    orderBy: [desc(commit.chainLength)],
  });
  if (!latestCommit) return c.json(null, 404);
  return c.json(latestCommit, 200);
});

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: { title: "M3terstate Indexer", version: "1.0.0" },
});

app.get("/docs", swaggerUI({ url: "/openapi.json" }));

export default app;
