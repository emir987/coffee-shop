import { useState } from "react";
import { ApiService, IOrder, IPlaceOrderParams } from "../ApiService";
import { useAlert } from "../../../context/AlertContext";

export const usePlaceOrder = () => {

    const [data, setData] = useState<IOrder>();
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const placeOrder = async (params: IPlaceOrderParams, onSuccess?: () => void) => {
        setLoading(true);
        try {
            const response = await ApiService.placeOrder(params);
            setData(response.data);
            onSuccess && onSuccess();
            setLoading(false);
        } catch (error) {
            showAlert('Placing order failed. Try again.', 'error');
            console.log(error)
        }
    }

    return { placeOrder, data, loading }
}