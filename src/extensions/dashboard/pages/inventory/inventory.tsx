import { useMemo, useState, type FC } from 'react';
import { Page, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';

type InventoryRow = {
  id: string;
  name: string;
  game: string;
  set: string;
  number: string;
  variant: string;
  condition: 'NM' | 'LP' | 'MP' | 'HP' | 'DMG';
  quantity: number;
  price: number;
  binder: string;
};

const initialInventory: InventoryRow[] = [
  {
    id: '1',
    name: 'Sample Card',
    game: 'Riftbound',
    set: 'Sample Set',
    number: '001',
    variant: 'Normal',
    condition: 'NM',
    quantity: 3,
    price: 4.99,
    binder: 'RB-01 · Page 1 · A1',
  },
  {
    id: '2',
    name: 'Sample Foil Card',
    game: 'Magic',
    set: 'Sample Set',
    number: '042',
    variant: 'Foil',
    condition: 'LP',
    quantity: 1,
    price: 12.5,
    binder: 'MTG-01 · Page 4 · B2',
  },
];

const currency = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

const InventoryPage: FC = () => {
  const [query, setQuery] = useState('');
  const [inventory, setInventory] = useState<InventoryRow[]>(initialInventory);

  const filteredInventory = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return inventory;
    }

    return inventory.filter((item) =>
      [
        item.name,
        item.game,
        item.set,
        item.number,
        item.variant,
        item.condition,
        item.binder,
      ]
        .join(' ')
        .toLowerCase()
        .includes(search),
    );
  }, [inventory, query]);

  const totalCards = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const addCard = () => {
    setInventory((items) => [
      {
        id: crypto.randomUUID(),
        name: 'New card',
        game: 'Unassigned',
        set: 'Unassigned',
        number: '—',
        variant: 'Normal',
        condition: 'NM',
        quantity: 1,
        price: 0,
        binder: 'Not assigned',
      },
      ...items,
    ]);
  };

  return (
    <WixDesignSystemProvider>
      <Page>
        <Page.Header
          title="Inventory"
          subtitle="Manage TCG singles, quantities, prices, conditions, and binder locations."
        />

        <Page.Content>
          <div
            style={{
              display: 'grid',
              gap: 24,
              paddingBottom: 32,
            }}
          >
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 16,
              }}
            >
              <MetricCard label="Unique inventory lines" value={String(inventory.length)} />
              <MetricCard label="Cards in stock" value={String(totalCards)} />
              <MetricCard label="Inventory value" value={currency.format(totalValue)} />
              <MetricCard
                label="Without binder location"
                value={String(
                  inventory.filter((item) => item.binder === 'Not assigned').length,
                )}
              />
            </section>

            <section
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                padding: 20,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 18,
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: 20 }}>Singles</h2>
                  <p style={{ margin: '4px 0 0', color: '#6b7280' }}>
                    Search by card, game, set, number, variant, condition, or binder.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addCard}
                  style={{
                    border: 0,
                    borderRadius: 8,
                    padding: '10px 16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: '#116dff',
                    color: '#fff',
                  }}
                >
                  + Add card
                </button>
              </div>

              <input
                aria-label="Search inventory"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search inventory..."
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '11px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  fontSize: 14,
                  marginBottom: 18,
                }}
              />

              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    minWidth: 980,
                    borderCollapse: 'collapse',
                    fontSize: 14,
                  }}
                >
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                      <HeaderCell>Card</HeaderCell>
                      <HeaderCell>Game / Set</HeaderCell>
                      <HeaderCell>Variant</HeaderCell>
                      <HeaderCell>Condition</HeaderCell>
                      <HeaderCell>Qty</HeaderCell>
                      <HeaderCell>Price</HeaderCell>
                      <HeaderCell>Binder location</HeaderCell>
                      <HeaderCell>Wix</HeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <Cell>
                          <strong>{item.name}</strong>
                          <div style={{ color: '#6b7280', marginTop: 3 }}>
                            #{item.number}
                          </div>
                        </Cell>
                        <Cell>
                          <strong>{item.game}</strong>
                          <div style={{ color: '#6b7280', marginTop: 3 }}>
                            {item.set}
                          </div>
                        </Cell>
                        <Cell>{item.variant}</Cell>
                        <Cell>
                          <ConditionBadge condition={item.condition} />
                        </Cell>
                        <Cell>{item.quantity}</Cell>
                        <Cell>{currency.format(item.price)}</Cell>
                        <Cell>{item.binder}</Cell>
                        <Cell>
                          <span style={{ color: '#6b7280' }}>Not published</span>
                        </Cell>
                      </tr>
                    ))}

                    {filteredInventory.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          style={{
                            padding: 40,
                            textAlign: 'center',
                            color: '#6b7280',
                          }}
                        >
                          No inventory matches “{query}”.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

const MetricCard: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div
    style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 18,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    }}
  >
    <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
  </div>
);

const HeaderCell: FC<{ children: React.ReactNode }> = ({ children }) => (
  <th
    style={{
      padding: '12px 10px',
      color: '#475569',
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </th>
);

const Cell: FC<{ children: React.ReactNode }> = ({ children }) => (
  <td style={{ padding: '14px 10px', verticalAlign: 'top' }}>{children}</td>
);

const ConditionBadge: FC<{ condition: InventoryRow['condition'] }> = ({
  condition,
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 999,
      background: '#f1f5f9',
      padding: '4px 9px',
      fontSize: 12,
      fontWeight: 700,
    }}
  >
    {condition}
  </span>
);

export default InventoryPage;
