import React, { useState } from 'react';
import CoffeeList from './components/Coffee/CoffeeList';
import { Coffee, mockCoffees } from './components/Coffee/Coffee';
import './App.scss'; // Importing global SCSS

const App: React.FC = () => {
  const [coffees, setCoffees] = useState<Coffee[]>(mockCoffees);


  return (
    <div className="App">
      <h1 className='dark-text'>Caffeine Corner</h1>
      <CoffeeList coffees={coffees} />
    </div>
  );
};

export default App;
