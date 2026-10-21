import { db } from "ponder:api";
import schema, { commit, meterState } from "ponder:schema";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { client, desc, graphql, eq } from "ponder";
import { m3terstateListSchema } from "./models/m3terstate";

const app = new OpenAPIHono();

app.use("/sql/*", client({ db, schema }));
app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

const latestCommitRoute = createRoute({
  method: "get",
  path: "/commits/latest",
  responses: {
    200: {
      content: { "application/json": { schema: m3terstateListSchema } },
      description:
        "The m3terstates of the commit with the highest chain length",
    },
    500: { description: "Invalid response" },
  },
});

const v1 = new OpenAPIHono();

v1.openapi(latestCommitRoute, async (c) => {
  const m3terstates = await db
    .select()
    .from(meterState)
    .where(
      eq(
        meterState.txHash,
        db
          .select({ txHash: commit.txHash })
          .from(commit)
          .orderBy(desc(commit.chainLength))
          .limit(1),
      ),
    );

  const result = m3terstateListSchema.safeParse(
    m3terstates.map((state) => ({
      ...state,
      account: state.account.toString(),
      chainLength: state.chainLength.toString(),
      nonce: state.nonce.toString(),
    })),
  );

  if (!result.success) {
    console.error(result.error);
    return c.json({ error: "Invalid response" }, 500);
  }
  return c.json(result.data, 200);
});

v1.doc("/openapi.json", {
  openapi: "3.0.0",
  info: { title: "M3terstate Indexer", version: "1.0.0" },
});

v1.get("/docs", swaggerUI({ url: "api/v1/openapi.json" }));
app.route("/api/v1", v1);

export default app;
