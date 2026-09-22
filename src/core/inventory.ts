import type { InventoryItem } from "./types";

export function getInventoryValue(items: InventoryItem[]): number {
  return items.reduce(
    (total, item) => total + item.salePrice * item.quantity,
    0,
  );
}

export function getInventoryCost(items: InventoryItem[]): number {
  return items.reduce(
    (total, item) =>
      total + (item.acquisitionCost ?? 0) * item.quantity,
    0,
  );
}

export function isPublishedToWix(item: InventoryItem): boolean {
  return Boolean(item.wixProductId);
}

export function canSell(item: InventoryItem): boolean {
  return item.status === "available" && item.quantity > 0;
}

export function reserveStock(
  item: InventoryItem,
  quantity: number,
): InventoryItem {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Reservation quantity must be a positive integer.");
  }

  if (item.quantity < quantity) {
    throw new Error("Not enough stock to reserve this quantity.");
  }

  return {
    ...item,
    quantity: item.quantity - quantity,
    updatedAt: new Date().toISOString(),
  };
}
