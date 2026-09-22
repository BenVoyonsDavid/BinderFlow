import { extensions } from '@wix/astro/builders'

import inventoryitemsCollection from './inventoryitems';

export default extensions.dataCollections({
  id: '5c4d2c0e-d5d8-470e-bf56-8ef4f6ad6cb1',
  name: 'Data Collections',
  collections: [inventoryitemsCollection],
});
