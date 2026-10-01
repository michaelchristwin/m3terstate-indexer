import { ponder } from "ponder:registry";
import { meterState, commit } from "ponder:schema";
import { bytesToChunks } from "./utils/bytes";

ponder.on("RollupContract:NewState", async ({ event, context }) => {
  const { from, chainLength, accountBlob, nonceBlob } = event.args;
  const txHash = event.transaction.hash;

  const accounts = bytesToChunks(accountBlob);
  const nonces = bytesToChunks(nonceBlob);
  if (accounts.length !== nonces.length) {
    throw new Error(
      `length mismatch at ${chainLength}: ${accounts.length} vs ${nonces.length}`,
    );
  }

  await context.db.insert(commit).values({
    chainLength,
    txHash,
    blockTime: event.block.timestamp,
    blockNumber: event.block.number,
    sender: from,
  });

  await context.db.insert(meterState).values(
    accounts.map((account, i) => ({
      chainLength,
      txHash,
      meterNo: i,
      account,
      nonce: nonces[i]!,
    })),
  );
});
