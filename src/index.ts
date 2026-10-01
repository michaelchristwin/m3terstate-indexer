import { ponder } from "ponder:registry";
import { state, meterState } from "ponder:schema";
import { bytesToChunks } from "./utils/bytes";

ponder.on("RollupContract:NewState", async ({ event, context }) => {
  const { from, anchorBlock, chainLength, accountBlob, nonceBlob } = event.args;

  const accounts = bytesToChunks(accountBlob);
  const nonces = bytesToChunks(nonceBlob);

  if (accounts.length !== nonces.length) {
    throw new Error(
      `length mismatch at chainLength ${chainLength}: ${accounts.length} vs ${nonces.length}`,
    );
  }

  await context.db.insert(state).values({
    chainLength,
    sender: from,
    anchorBlock,
    txHash: event.transaction.hash,
    blockNumber: event.block.number,
    blockTime: event.block.timestamp,
  });

  await context.db.insert(meterState).values(
    accounts.map((account, i) => ({
      chainLength,
      meterNo: i,
      account,
      nonce: nonces[i]!,
    })),
  );
});
