import React, { useState } from 'react';
import { Coffee } from './Coffee';
import AddOrder from '../Order/AddOrder';
import { Card, CardActionArea, CardContent, CardMedia, Modal, Typography } from '@mui/material';

interface CoffeeCardProps {
  coffee: Coffee;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleBackdropCloseModal = (
    _: React.SyntheticEvent<unknown>,
    reason: "backdropClick" | "escapeKeyDown" | "closeClick"
  ) => {
    if (reason !== 'backdropClick') {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const confirmOrder = () => {
    // Add your logic for handling the order confirmation here
    // For now, we'll just close the modal
    handleCloseModal()
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardActionArea onClick={openModal}>
        <CardMedia
          component="img"
          image={coffee.image}
          alt={coffee.name}
         draggable={false} 
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {coffee.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {coffee.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Modal
        open={isModalOpen}
        onClose={handleBackdropCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddOrder onClose={handleCloseModal} onConfirm={confirmOrder} />
      </Modal>
    </Card>
  );
};

export default CoffeeCard;
