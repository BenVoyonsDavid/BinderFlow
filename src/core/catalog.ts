export type CatalogCard = {
  id: string;
  name: string;
  number: string;
  variants: string[];
};

export type CatalogSet = {
  id: string;
  name: string;
  cards: CatalogCard[];
};

export type CatalogGame = {
  id: string;
  name: string;
  sets: CatalogSet[];
};

export const demoCatalog: CatalogGame[] = [
  {
    id: 'riftbound',
    name: 'Riftbound',
    sets: [
      {
        id: 'vendetta',
        name: 'Vendetta',
        cards: [
          {
            id: 'rb-v-001',
            name: 'Ahri',
            number: '001',
            variants: ['Normal', 'Foil', 'Alternate Art'],
          },
          {
            id: 'rb-v-042',
            name: 'Jinx',
            number: '042',
            variants: ['Normal', 'Foil'],
          },
          {
            id: 'rb-v-137',
            name: 'Yasuo',
            number: '137',
            variants: ['Normal', 'Foil Alternate Art'],
          },
        ],
      },
      {
        id: 'origins',
        name: 'Origins',
        cards: [
          {
            id: 'rb-o-010',
            name: 'Lux',
            number: '010',
            variants: ['Normal', 'Foil'],
          },
          {
            id: 'rb-o-088',
            name: 'Teemo',
            number: '088',
            variants: ['Normal', 'Alternate Art'],
          },
        ],
      },
    ],
  },
  {
    id: 'magic',
    name: 'Magic',
    sets: [
      {
        id: 'demo-mtg',
        name: 'Demo Set',
        cards: [
          {
            id: 'mtg-001',
            name: 'Lightning Bolt',
            number: '001',
            variants: ['Normal', 'Foil'],
          },
          {
            id: 'mtg-002',
            name: 'Sol Ring',
            number: '002',
            variants: ['Normal', 'Foil', 'Promo'],
          },
        ],
      },
    ],
  },
  {
    id: 'lorcana',
    name: 'Disney Lorcana',
    sets: [
      {
        id: 'demo-lorcana',
        name: 'Demo Set',
        cards: [
          {
            id: 'lor-001',
            name: 'Mickey Mouse',
            number: '001',
            variants: ['Normal', 'Foil'],
          },
        ],
      },
    ],
  },
  {
    id: 'pokemon',
    name: 'Pokémon',
    sets: [
      {
        id: 'demo-pokemon',
        name: 'Demo Set',
        cards: [
          {
            id: 'pkm-001',
            name: 'Pikachu',
            number: '001',
            variants: ['Normal', 'Holo', 'Reverse Holo'],
          },
        ],
      },
    ],
  },
];
