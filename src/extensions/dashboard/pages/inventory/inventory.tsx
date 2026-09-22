import type { FC } from 'react';
import { EmptyState, Page, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const InventoryPage: FC = () => {
  return (
    <WixDesignSystemProvider>
      <Page>
        <Page.Header
          title="Inventory"
          subtitle="Manage your TCG singles, quantities, prices, conditions, and binder locations."
        />
        <Page.Content>
          <EmptyState
            title="Your BinderFlow inventory starts here"
            subtitle="Next, we’ll connect this page to cards, variants, stock quantities, pricing, and binder locations."
            skin="page"
          />
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default InventoryPage;
