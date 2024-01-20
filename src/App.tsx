import React, { useState } from 'react';
import CoffeeList from './components/CoffeeList';
import { Coffee, mockCoffees } from './components/Coffee';
import './App.scss'; // Importing global SCSS

const App: React.FC = () => {
  const [coffees, setCoffees] = useState<Coffee[]>(mockCoffees);

  const handleOrder = (coffee: Coffee) => {
    console.log("Ordering", coffee.name);
    // Handle the order logic here
  };

  return (
    <div className="App">
      <h1>Welcome to Our Coffee Shop</h1>
      <CoffeeList coffees={coffees} onOrder={handleOrder} />
    </div>
  );
};

export default App;
