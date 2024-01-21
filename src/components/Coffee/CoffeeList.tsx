import React from 'react';
import CoffeeCard from './CoffeeCard';
import { Coffee } from './Coffee';
import { Grid } from '@mui/material';

interface CoffeeListProps {
  coffees: Coffee[];
}

const CoffeeList: React.FC<CoffeeListProps> = ({ coffees }) => {
  return (
    <Grid container spacing={2} alignItems='stretch'>
      {coffees.map(coffee => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={coffee.id}>
          <CoffeeCard coffee={coffee} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CoffeeList;
