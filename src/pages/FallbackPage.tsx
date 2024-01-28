import { Container, Typography, Button } from '@mui/material';
import React from 'react';


const FallbackPage: React.FC = () => (
  <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
    <Typography variant="h3" gutterBottom className='dark-text'>
      Oops! Something Went Wrong
    </Typography>
    <Button variant="contained" color="primary" href='/' >
      Try again
    </Button>
  </Container>
);

export default FallbackPage;
