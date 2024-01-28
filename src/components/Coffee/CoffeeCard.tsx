import React, { useState } from 'react';
import { Coffee } from './Coffee';
import { Button, Card, CardActionArea, CardContent, CardMedia, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog, Typography } from '@mui/material';
import { usePlaceOrder } from '../../services/api/hooks/useOrders';
import { useUniqueId } from '../../context/UniqueIdContext';
import { useAlert } from '../../context/AlertContext';

interface CoffeeCardProps {
  coffee: Coffee;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee }) => {
  const {placeOrder} = usePlaceOrder()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { uniqueId } = useUniqueId();
  const { showAlert } = useAlert();
  
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleConfirmOrder = () => {
    placeOrder(
      {coffeeId: coffee.id, tabletId: uniqueId},
      () => {
        showAlert('Order accepted. We\'ll notify you when it\'s ready.', 'success');
      },
    );
    handleCloseDialog()
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardActionArea onClick={openDialog}>
        <CardMedia
          component="img"
          src={coffee.publicImage}
          alt={coffee.name}
          draggable={false} 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {coffee.name} - ${coffee.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {coffee.description}
          </Typography>
        </CardContent>
      </CardActionArea>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to confirm the order?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {coffee.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmOrder} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
    </Card>
  );
};

export default CoffeeCard;
