import { app } from '@wix/astro/builders';
import inventory from './extensions/dashboard/pages/inventory/inventory.extension.ts';

export default app()
  .use(inventory)
