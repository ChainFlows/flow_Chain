import { Principal } from "@dfinity/principal";
// get warehouse inventory
export async function getWarehouseInventory(id) {
  try {
    return await window.canister.flowchain.get_warehouse_inventory(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// get_all_warehouse_inventory
export async function getAllWarehouseInventory(id) {
  try {
    return await window.canister.flowchain.get_all_warehouse_inventory(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}