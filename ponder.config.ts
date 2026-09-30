import { createConfig } from "ponder";
import { RollupContractAbi } from "./abis/RollupContractAbi";
import { sepolia } from "viem/chains";

export default createConfig({
  chains: {
    sepolia: {
      id: sepolia.id,
      rpc: process.env.PONDER_RPC_URL_1!,
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
