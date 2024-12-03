
import {flow_chain_backend} from "../../../declarations/flow_chain_backend";



export async function createItem(item_payload) {
    return flow_chain_backend.create_item(item_payload);
  }
  
  export async function getAllItems() {
    try {
      return await flow_chain_backend.list_items();
    } catch (err) {
      if (err.name === "AgentHTTPResponseError") {
        const authClient = window.auth.client;
        await authClient.logout();
      }
      return [];
    }
  }
  