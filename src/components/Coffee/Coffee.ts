export interface Coffee {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const mockCoffees: Coffee[] = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Strong and rich coffee with a distinctive aroma.',
    image: '/coffee/esspresso.png',
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Creamy coffee with frothed milk and a sprinkle of cocoa powder.',
    image: '/coffee/cappucchino.png',
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Smooth coffee with steamed milk and a light layer of foam.',
    image: '/coffee/latte.png',
  },
  {
    id: 4,
    name: 'Americano',
    description: 'Espresso diluted with hot water, offering a lighter strength.',
    image: '/coffee/americano.png',
  },
  // ... add more coffees as needed
];