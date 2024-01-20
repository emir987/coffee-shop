import React from 'react';
import CoffeeCard from './CoffeeCard';
import styles from './CoffeeList.module.scss'; // Importing SCSS module
import { Coffee } from './Coffee';

interface CoffeeListProps {
  coffees: Coffee[];
  onOrder: (coffee: Coffee) => void;
}

const CoffeeList: React.FC<CoffeeListProps> = ({ coffees, onOrder }) => {
  return (
    <div className={styles.list}>
      {coffees.map(coffee => (
        <CoffeeCard key={coffee.id} coffee={coffee} onOrder={onOrder} />
      ))}
    </div>
  );
};

export default CoffeeList;
