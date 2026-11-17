import { createConfig } from "ponder";
import { sepolia } from "viem/chains";
import { env } from "./src/config/env";
import { RollupContractAbi } from "./abis/RollupContractAbi";

export default createConfig({
  database: {
    kind: env.DATABASE_KIND,
    connectionString: env.DATABASE_URL,
  },
  chains: {
    sepolia: {
      id: sepolia.id,
      rpc: [
        env.PONDER_RPC_URL_11155111,
        env.PONDER_RPC_URL_2,
        env.PONDER_RPC_URL_3,
      ],
      ethGetLogsBlockRange: 5_000,
      pollingInterval: 1_000 * 60 * 30,
    },
  },

  contracts: {
    RollupContract: {
      chain: "sepolia",
      abi: RollupContractAbi,
      address: env.ROLLUP_SMART_CONTRACT,
      startBlock: 9166232,
    },
  },
});
