import { createConfig } from "ponder";
import { sepolia } from "viem/chains";
import { env } from "./src/config/env";
import { RollupContractAbi } from "./abis/RollupContractAbi";

export default createConfig({
  database: {
    kind: "postgres",
    connectionString: env.DATABASE_URL,
  },
  chains: {
    sepolia: {
      id: sepolia.id,
      rpc: env.PONDER_RPC_URL_11155111,
      ethGetLogsBlockRange: 10_000,
    },
  },

  contracts: {
    RollupContract: {
      chain: "sepolia",
      abi: RollupContractAbi,
      address: "0xf8f2d4315DB5db38f3e5c45D0bCd59959c603d9b",
      startBlock: 9166232,
    },
  },
});
