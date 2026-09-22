import type { DataCollection } from '@wix/astro/builders';

export const collectionIdSuffix = 'inventoryitems';

export default {
  idSuffix: collectionIdSuffix,
  displayName: 'BinderFlow Inventory',
  fields: [
    {
      type: 'TEXT',
      displayName: 'Card Name',
      key: 'name',
    },
    {
      type: 'TEXT',
      displayName: 'Game',
      key: 'game',
    },
    {
      type: 'TEXT',
      displayName: 'Set',
      key: 'setName',
    },
    {
      type: 'TEXT',
      displayName: 'Card Number',
      key: 'cardNumber',
    },
    {
      type: 'TEXT',
      displayName: 'Variant',
      key: 'variant',
    },
    {
      type: 'TEXT',
      displayName: 'Condition',
      key: 'condition',
    },
    {
      type: 'NUMBER',
      displayName: 'Quantity',
      key: 'quantity',
    },
    {
      type: 'NUMBER',
      displayName: 'Acquisition Cost',
      key: 'acquisitionCost',
    },
    {
      type: 'NUMBER',
      displayName: 'Sale Price',
      key: 'salePrice',
    },
    {
      type: 'TEXT',
      displayName: 'Currency',
      key: 'currency',
    },
    {
      type: 'TEXT',
      displayName: 'Binder',
      key: 'binder',
    },
    {
      type: 'TEXT',
      displayName: 'Page',
      key: 'page',
    },
    {
      type: 'TEXT',
      displayName: 'Slot',
      key: 'slot',
    },
    {
      type: 'TEXT',
      displayName: 'Wix Product ID',
      key: 'wixProductId',
    },
    {
      type: 'TEXT',
      displayName: 'Status',
      key: 'status',
    },
  ],
  displayField: 'name',
  dataPermissions: {
    itemInsert: 'CMS_EDITOR',
    itemRead: 'CMS_EDITOR',
    itemRemove: 'CMS_EDITOR',
    itemUpdate: 'CMS_EDITOR',
  },
  indexes: [],
  initialData: [],
} satisfies DataCollection;
