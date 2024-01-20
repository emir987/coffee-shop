import React from 'react';
import styles from './CoffeeCard.module.scss'; // Importing SCSS module
import { Coffee } from './Coffee';

interface CoffeeCardProps {
  coffee: Coffee;
  onOrder: (coffee: Coffee) => void;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee, onOrder }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={coffee.image} alt={coffee.name} />
      <h3 className={styles.name}>{coffee.name}</h3>
      <p className={styles.description}>{coffee.description}</p>
      <button className={styles.orderButton} onClick={() => onOrder(coffee)}>
        Order Now
      </button>
    </div>
  );
};

export default CoffeeCard;
