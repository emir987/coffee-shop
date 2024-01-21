import { useState } from "react";
import { OrderType } from "./Order";
import { ToggleButtonGroup, ToggleButton, Checkbox, FormControlLabel, Box, TextField, Button, Stack } from "@mui/material";

interface AddOrderProps {
  onConfirm: () => void;
  onClose: () => void;
}

const errorBackground = '#ffebee';

const AddOrder: React.FC<AddOrderProps> = ({ onConfirm, onClose }) => {
  const [extraMilk, setExtraMilk] = useState(false);
  const [extraSugar, setExtraSugar] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderType, setOrderType] = useState<OrderType>();
  const [orderTypeError, setOrderTypeError] = useState(false);


  const handleExtraMilkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtraMilk(event.target.checked);
  };

  const handleExtraSugarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtraSugar(event.target.checked);
  };

  const handleSpecialInstructionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialInstructions(event.target.value);
  };

  const handleOrderTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    orderType: number,
  ) => {
    setOrderType(orderType);
    setOrderTypeError(false);
  };

  const handleMakeOrder = () => {
    if (!orderType) {
      setOrderTypeError(true);
    } else {
      onConfirm();
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        gap: 2,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        width: '90%',
        maxWidth: '500px',
        mx: 'auto',
        my: '10%'
      }}>

      <ToggleButtonGroup
        color="primary"
        value={orderType}
        exclusive
        onChange={handleOrderTypeChange}
        aria-label="Order type"
        sx={{
          mb: 2,
          backgroundColor: orderTypeError ? errorBackground : ''
        }}
      >
        <ToggleButton value={OrderType.ToTable}>To table</ToggleButton>
        <ToggleButton value={OrderType.ToGo}>Take away</ToggleButton>
      </ToggleButtonGroup>

        <Stack direction="row" justifyContent='flex-start' spacing={2}>
          <FormControlLabel control={<Checkbox checked={extraMilk} onChange={handleExtraMilkChange} />} label="Extra milk" />
          <FormControlLabel control={<Checkbox checked={extraSugar} onChange={handleExtraSugarChange} />} label="Extra sugar" />
        </Stack>

      <TextField
        id="special-instructions"
        label="Special instructions"
        fullWidth
        multiline
        maxRows={4}
        variant="standard"
        sx={{ mb: 2 }}
        value={specialInstructions}
        onChange={handleSpecialInstructionsChange}
      />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleMakeOrder} variant='contained' color='primary'>Confirm</Button>
      </Stack>
    </Box>
  )
}

export default AddOrder