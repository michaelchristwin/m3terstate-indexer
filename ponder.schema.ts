import { onchainTable, primaryKey, index } from "ponder";

export const states = onchainTable("states", (t) => ({
  chainLength: t.bigint().primaryKey(),
  sender: t.hex().notNull(),
  anchorBlock: t.hex().notNull(),
  txHash: t.hex().notNull(),
  blockNumber: t.bigint().notNull(),
  blockTime: t.bigint().notNull(),
}));

export const meterStates = onchainTable(
  "meter_states",
  (t) => ({
    chainLength: t.bigint().notNull(),
    meterNo: t.integer().notNull(),
    account: t.bigint().notNull(), // raw, in 1e-6 units
    nonce: t.bigint().notNull(),
  }),
  (table) => ({
    pk: primaryKey({ columns: [table.chainLength, table.meterNo] }),
    meterIdx: index().on(table.meterNo),
  }),
);
