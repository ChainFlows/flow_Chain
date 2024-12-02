import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as chainflowIDL } from "../../../declarations/flow_chain_backend/flow_chain_backend.did.js";
import { idlFactory as ledgerIDL } from "../../../declarations/internet_identity/internet_identity.did.js"; //No such file or directory

const chainflow_CANISTER_ID = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
const LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
const HOST = "http://localhost:4943";

export async function getflowchainCanister() {
  return await getCanister(chainflow_CANISTER_ID, chainflowIDL);
}

export async function getLedgerCanister() {
  return getCanister(LEDGER_CANISTER_ID, ledgerIDL); // ledger IDL not found
}

async function getCanister(canisterId, idl) {
  const authClient = window.auth.client;
  const agent = new HttpAgent({
    host: HOST,
    identity: authClient.getIdentity(),
  });
  await agent.fetchRootKey(); // this line is needed for the local env only
  return Actor.createActor(idl, {
    agent,
    canisterId,
  });
}
