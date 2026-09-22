import { app } from '@wix/astro/builders';

import inventory from './extensions/dashboard/pages/inventory/inventory.extension.ts';
import dataCollections from './extensions/backend/data-collections/data-collections.extension.ts';

export default app()
  .use(inventory)
  .use(dataCollections);
