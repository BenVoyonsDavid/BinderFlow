import { extensions } from '@wix/astro/builders';

export default extensions.dashboardPage({
  id: '6b552a44-6d44-4d85-9f47-5fb5d5e966d1',
  title: 'Inventory',
  routePath: 'inventory',
  component: './extensions/dashboard/pages/inventory/inventory.tsx',
  fullPage: false,
});
