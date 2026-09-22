import { useMemo, useState, type FC, type FormEvent } from 'react';
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
  acquisitionCost: number;
  price: number;
  binder: string;
};

type AddCardForm = {
  game: string;
  set: string;
  name: string;
  number: string;
  variant: string;
  condition: InventoryRow['condition'];
  quantity: number;
  acquisitionCost: number;
  price: number;
  binder: string;
  page: string;
  slot: string;
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
    acquisitionCost: 2.25,
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
    acquisitionCost: 7.5,
    price: 12.5,
    binder: 'MTG-01 · Page 4 · B2',
  },
];

const initialForm: AddCardForm = {
  game: 'Riftbound',
  set: '',
  name: '',
  number: '',
  variant: 'Normal',
  condition: 'NM',
  quantity: 1,
  acquisitionCost: 0,
  price: 0,
  binder: '',
  page: '',
  slot: '',
};

const currency = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

const InventoryPage: FC = () => {
  const [query, setQuery] = useState('');
  const [inventory, setInventory] = useState<InventoryRow[]>(initialInventory);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState<AddCardForm>(initialForm);

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
  const totalCost = inventory.reduce(
    (sum, item) => sum + item.quantity * item.acquisitionCost,
    0,
  );

  const submitCard = (event: FormEvent) => {
    event.preventDefault();

    const binderParts = [
      form.binder.trim() || 'Not assigned',
      form.page.trim() ? `Page ${form.page.trim()}` : '',
      form.slot.trim() ? form.slot.trim() : '',
    ].filter(Boolean);

    setInventory((items) => [
      {
        id: crypto.randomUUID(),
        name: form.name.trim() || 'Unnamed card',
        game: form.game,
        set: form.set.trim() || 'Unassigned',
        number: form.number.trim() || '—',
        variant: form.variant,
        condition: form.condition,
        quantity: Math.max(1, form.quantity),
        acquisitionCost: Math.max(0, form.acquisitionCost),
        price: Math.max(0, form.price),
        binder: binderParts.join(' · '),
      },
      ...items,
    ]);

    setForm(initialForm);
    setIsAddOpen(false);
  };

  return (
    <WixDesignSystemProvider>
      <Page>
        <Page.Header
          title="Inventory"
          subtitle="Manage TCG singles, quantities, prices, conditions, and binder locations."
        />

        <Page.Content>
          <div style={{ display: 'grid', gap: 24, paddingBottom: 32 }}>
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
              <MetricCard label="Inventory cost" value={currency.format(totalCost)} />
            </section>

            {isAddOpen && (
              <form
                onSubmit={submitCard}
                style={{
                  background: '#fff',
                  border: '1px solid #dbe3ea',
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 16,
                    alignItems: 'flex-start',
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <h2 style={{ margin: 0, fontSize: 20 }}>Add card</h2>
                    <p style={{ margin: '4px 0 0', color: '#6b7280' }}>
                      Add a card variant to the merchant inventory.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    style={secondaryButtonStyle}
                  >
                    Cancel
                  </button>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 16,
                  }}
                >
                  <Field label="Game">
                    <select
                      value={form.game}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, game: event.target.value }))
                      }
                      style={controlStyle}
                    >
                      <option>Riftbound</option>
                      <option>Magic</option>
                      <option>Disney Lorcana</option>
                      <option>Pokémon</option>
                    </select>
                  </Field>

                  <Field label="Set">
                    <input
                      value={form.set}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, set: event.target.value }))
                      }
                      placeholder="Vendetta"
                      style={controlStyle}
                    />
                  </Field>

                  <Field label="Card">
                    <input
                      value={form.name}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, name: event.target.value }))
                      }
                      placeholder="Card name"
                      required
                      style={controlStyle}
                    />
                  </Field>

                  <Field label="Card number">
                    <input
                      value={form.number}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, number: event.target.value }))
                      }
                      placeholder="001"
                      style={controlStyle}
                    />
                  </Field>

                  <Field label="Variant">
                    <select
                      value={form.variant}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, variant: event.target.value }))
                      }
                      style={controlStyle}
                    >
                      <option>Normal</option>
                      <option>Foil</option>
                      <option>Alternate Art</option>
                      <option>Foil Alternate Art</option>
                      <option>Promo</option>
                    </select>
                  </Field>

                  <Field label="Condition">
                    <select
                      value={form.condition}
                      onChange={(event) =>
                        setForm((value) => ({
                          ...value,
                          condition: event.target.value as InventoryRow['condition'],
                        }))
                      }
                      style={controlStyle}
                    >
                      <option value="NM">Near Mint (NM)</option>
                      <option value="LP">Lightly Played (LP)</option>
                      <option value="MP">Moderately Played (MP)</option>
                      <option value="HP">Heavily Played (HP)</option>
                      <option value="DMG">Damaged (DMG)</option>
                    </select>
                  </Field>

                  <Field label="Quantity">
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={form.quantity}
                      onChange={(event) =>
                        setForm((value) => ({
                          ...value,
                          quantity: Number(event.target.value),
                        }))
                      }
                      style={controlStyle}
                    />
                  </Field>

                  <Field label="Acquisition cost (CAD)">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.acquisitionCost}
                      onChange={(event) =>
                        setForm((value) => ({
                          ...value,
                          acquisitionCost: Number(event.target.value),
                        }))
                      }
                      style={controlStyle}
                    />
                  </Field>

                  <Field label="Sale price (CAD)">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.price}
                      onChange={(event) =>
                        setForm((value) => ({
                          ...value,
                          price: Number(event.target.value),
                        }))
                      }
                      style={controlStyle}
                    />
                  </Field>

                  <Field label="Binder">
                    <input
                      value={form.binder}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, binder: event.target.value }))
                      }
                      placeholder="RB-01"
                      style={controlStyle}
                    />
                  </Field>

                  <Field label="Page">
                    <input
                      value={form.page}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, page: event.target.value }))
                      }
                      placeholder="12"
                      style={controlStyle}
                    />
                  </Field>

                  <Field label="Slot">
                    <input
                      value={form.slot}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, slot: event.target.value }))
                      }
                      placeholder="B3"
                      style={controlStyle}
                    />
                  </Field>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    style={secondaryButtonStyle}
                  >
                    Cancel
                  </button>
                  <button type="submit" style={primaryButtonStyle}>
                    Add to inventory
                  </button>
                </div>
              </form>
            )}

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
                  onClick={() => setIsAddOpen(true)}
                  style={primaryButtonStyle}
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
                  ...controlStyle,
                  width: '100%',
                  marginBottom: 18,
                }}
              />

              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    minWidth: 1080,
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
                      <HeaderCell>Cost</HeaderCell>
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
                        <Cell>{currency.format(item.acquisitionCost)}</Cell>
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
                          colSpan={9}
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

const Field: FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <label style={{ display: 'grid', gap: 6, fontSize: 13, fontWeight: 600 }}>
    <span>{label}</span>
    {children}
  </label>
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

const controlStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 40,
  padding: '9px 11px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  background: '#fff',
  fontSize: 14,
};

const primaryButtonStyle: React.CSSProperties = {
  border: 0,
  borderRadius: 8,
  padding: '10px 16px',
  fontWeight: 600,
  cursor: 'pointer',
  background: '#116dff',
  color: '#fff',
};

const secondaryButtonStyle: React.CSSProperties = {
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  padding: '10px 16px',
  fontWeight: 600,
  cursor: 'pointer',
  background: '#fff',
  color: '#111827',
};

export default InventoryPage;
