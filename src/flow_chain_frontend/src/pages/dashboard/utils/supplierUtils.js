// supplierDashboardFunctions.js
import {
  createItem,
  getNewOrders,
  getSupplyCompanyActiveOrders,
  getSupplyCompanyBids,
  getSupplyCompanyCompletedOrders,
  getSupplyCompanyNewOrders,
  payDriver as payDriverAPI,
} from "../../../utils/supplyCompany";
import {
  createWarehouse,
  getAllWarehouseInventory,
} from "../../../utils/warehouse";

export const fetchNewOrderListings = async (setOrderListings, setLoading) => {
  try {
    setLoading(true);
    const orders = await getNewOrders();
    setOrderListings(orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchNewOrders = async (setNewOrders, setLoading, id) => {
  try {
    setLoading(true);
    const orders = await getSupplyCompanyNewOrders(id);
    setNewOrders(orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchCompletedOrders = async (
  setCompletedOrders,
  setLoading,
  id
) => {
  try {
    setLoading(true);
    const orders = await getSupplyCompanyCompletedOrders(id);
    setCompletedOrders(orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchCurrentOrders = async (setCurrentOrders, setLoading, id) => {
  try {
    setLoading(true);
    const orders = await getSupplyCompanyActiveOrders(id);
    setCurrentOrders(orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchSupplierBids = async (setBids, setLoading, id) => {
  try {
    setLoading(true);
    const bids = await getSupplyCompanyBids(id);
    setBids(bids.Ok);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchAllWarehouseInventory = async (
  setAllWarehouseInventory,
  setLoading,
  id
) => {
  try {
    setLoading(true);
    const inventory = await getAllWarehouseInventory(id);
    setAllWarehouseInventory(inventory);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const payDriverFunc = async (data, fetchCompletedOrders, setLoading) => {
  const { orderId } = data;
  const amount = parseInt(data.amount, 10) * 10 ** 8;

  try {
    setLoading(true);
    await payDriverAPI({ orderId }, amount);
    fetchCompletedOrders(); // Refresh completed orders after payment
    // toast(<NotificationSuccess text="Driver paid successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to pay driver." />);
  } finally {
    setLoading(false);
  }
};

export const saveItem = async (data, setLoading, id) => {
  try {
    setLoading(true);
    const PriceStr = data.unit_price;
    const QuantityStr = data.quantity;
    data.unit_price = BigInt(PriceStr);
    data.quantity = BigInt(QuantityStr);

    data.supplier_id = [id];

    console.log("item pay", data);
    await createItem(data).then((resp) => {
      console.log("item created", resp);
    });
    // const items = await getAllItemsByClient();
    // setItems(items);
    // toast(<NotificationSuccess text="Item saved successfully." />);
  } catch (error) {
    console.error("Failed to save item", error);
    // toast(<NotificationError text="Failed to save item." />);
  } finally {
    setLoading(false);
  }
};

export const saveWarehouse = async (data, setLoading, id) => {
  try {
    setLoading(true);
    const capacityStr = data.capacity;
    data.capacity = BigInt(capacityStr);

    data.supplier_id = id;

    await createWarehouse(data).then((resp) => {
      console.log("warehouse created", resp);
    });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export function formatICTimeToMMDDYY(nanoseconds) {
  // Convert nanoseconds to milliseconds
  const milliseconds = Number(nanoseconds) / 1_000_000;

  // Create a JavaScript Date object
  const date = new Date(milliseconds);

  // Format the date as "Aug 24, 2026"
  const options = {
    month: "short", // Short month name like "Aug"
    day: "numeric", // Day of the month, e.g., 24
    year: "numeric", // Full year, e.g., 2026
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
