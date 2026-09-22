export type CardFinish =
  | "normal"
  | "foil"
  | "etched"
  | "holo"
  | "reverse-holo"
  | "other";

export type CardCondition =
  | "NM"
  | "LP"
  | "MP"
  | "HP"
  | "DMG";

export type InventoryStatus =
  | "draft"
  | "available"
  | "reserved"
  | "sold"
  | "not-for-sale";

export interface ExternalIds {
  [provider: string]: string;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  publisher?: string;
  externalIds?: ExternalIds;
  active: boolean;
}

export interface CardSet {
  id: string;
  gameId: string;
  name: string;
  code?: string;
  releaseDate?: string;
  externalIds?: ExternalIds;
}

export interface Card {
  id: string;
  gameId: string;
  setId: string;
  name: string;
  cardNumber: string;
  rarity?: string;
  imageUrl?: string;
  externalIds?: ExternalIds;
}

export interface CardVariant {
  id: string;
  cardId: string;
  language: string;
  finish: CardFinish;
  alternateArt?: boolean;
  promo?: boolean;
  variantName?: string;
  imageUrl?: string;
  externalIds?: ExternalIds;
}

export interface Binder {
  id: string;
  name: string;
  code: string;
  description?: string;
  location?: string;
  active: boolean;
}

export interface BinderLocation {
  id: string;
  binderId: string;
  page?: number;
  row?: number;
  column?: number;
  slot?: string;
  label?: string;
}

export interface InventoryItem {
  id: string;
  cardVariantId: string;
  condition: CardCondition;
  quantity: number;
  acquisitionCost?: number;
  salePrice: number;
  currency: string;
  sku: string;
  status: InventoryStatus;
  binderLocationId?: string;
  wixProductId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
