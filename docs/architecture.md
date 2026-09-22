# BinderFlow Architecture

## Core principle

BinderFlow must keep the **global TCG catalogue** separate from the **merchant's actual inventory**.

A catalogue can contain hundreds of thousands of known cards. A merchant should only create inventory records for cards they actually own, and only publish saleable inventory to Wix when necessary.

## Domain model

### Game

Represents a trading card game.

Suggested fields:

- id
- name
- slug
- publisher
- externalIds
- active

### Set

Represents a release / expansion.

Suggested fields:

- id
- gameId
- name
- code
- releaseDate
- externalIds

### Card

Represents the canonical card identity.

Suggested fields:

- id
- gameId
- setId
- name
- cardNumber
- rarity
- imageUrl
- externalIds

### CardVariant

Represents a sellable print treatment or version.

Suggested fields:

- id
- cardId
- language
- finish
- alternateArt
- promo
- variantName
- imageUrl
- externalIds

### InventoryItem

Represents merchant-owned stock.

Suggested fields:

- id
- cardVariantId
- condition
- quantity
- acquisitionCost
- salePrice
- sku
- status
- binderLocationId
- wixProductId
- notes
- createdAt
- updatedAt

### Binder

Represents a physical binder or storage container.

Suggested fields:

- id
- name
- code
- description
- location
- active

### BinderLocation

Represents an exact physical position.

Suggested fields:

- id
- binderId
- page
- row
- column
- slot
- label

## Relationship overview

```text
Game
  └── Set
       └── Card
            └── CardVariant
                 └── InventoryItem
                      ├── BinderLocation
                      │    └── Binder
                      └── Wix Product (optional)
```

## Wix integration strategy

BinderFlow should use Wix as the commerce layer while preserving TCG-specific data in BinderFlow.

### BinderFlow owns

- TCG catalogue mapping
- Card variants
- Card condition
- Binder position
- Buylist rules
- Market pricing rules
- TCG-specific inventory metadata

### Wix owns or participates in

- Published storefront products
- Commerce orders
- Customers
- Payments
- Taxes
- Checkout
- Merchant-facing Wix ecosystem integrations

## Product publication

Do not create a Wix product for every card in the catalogue.

Recommended flow:

```text
Global catalogue
      ↓
Merchant adds owned card
      ↓
InventoryItem created
      ↓
Merchant chooses to sell / publish
      ↓
Wix product created or linked
      ↓
wixProductId stored on InventoryItem
```

## Synchronization

Synchronization must eventually handle both directions.

### BinderFlow → Wix

- Create product
- Update price
- Update available quantity
- Update images / metadata
- Publish / unpublish

### Wix → BinderFlow

- Order created
- Order cancelled/refunded where applicable
- Inventory changes
- Product changes relevant to linked items

All sync operations should be idempotent and keep external IDs.

## Dashboard modules

Proposed dashboard navigation:

```text
BinderFlow
├── Dashboard
├── Inventory
│   ├── Singles
│   ├── Sealed
│   └── Accessories
├── Binders
├── POS
├── Buylist
├── Pricing
├── Orders
├── Customers
├── Reports
└── Settings
```

For v0.1, focus on:

```text
Dashboard
Inventory
Binders
Settings
```

## Technical direction

Initial direction:

- Wix CLI
- React
- TypeScript
- Wix SDK
- Wix Dashboard Pages / Plugins
- Wix Stores / eCommerce APIs where appropriate

Avoid locking the data layer too early. The first prototype should validate:

1. inventory performance;
2. Wix product synchronization;
3. binder-location UX;
4. catalogue import strategy.

## Design goals

- Fast enough for store-counter use
- Search-first interface
- Minimal clicks for repetitive intake
- Scalable catalogue
- Traceable stock movements
- Clear sync state with Wix
- Game-agnostic data model
