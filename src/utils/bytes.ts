export function bytesToChunks(data: `0x${string}`, chunkSize = 6): bigint[] {
  const hex = "00" + data.slice(2); // prepend one zero byte
  const step = chunkSize * 2; // hex chars per chunk
  const out: bigint[] = [];
  for (let i = 0; i < hex.length; i += step) {
    out.push(BigInt("0x" + hex.slice(i, i + step)));
  }
  return out;
}

const DECIMALS = 1_000_000n; // assumed from your %06s formatting

export function formatAccount(raw: bigint): string {
  const int = raw / DECIMALS;
  const frac = (raw % DECIMALS).toString().padStart(6, "0");
  return `${int}.${frac}`;
}
