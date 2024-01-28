import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import NotificationSound from "../../assets/notification-sound.mp3";
import { useUniqueId } from '../../context/UniqueIdContext';
import { List, ListItem, ListItemText } from '@mui/material';

interface OrderNotificationProps {
    onClose: () => void;
}

export interface Notification {
    tabletId: string
    orderId: string
    coffee: string
}

const OrderNotification: React.FC<OrderNotificationProps> = ({ onClose }) => {
    const [openNotification, setOpenNotification] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const audioPlayer = useRef<HTMLAudioElement>(null);
    const { uniqueId } = useUniqueId();

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:3000/api/orders/notifications");

        // Attaching a handler to receive message events
        eventSource.onmessage = (event) => {
            const notification: Notification = JSON.parse(event.data);
            console.log(typeof uniqueId, "sss")
            if (notification.tabletId === uniqueId) {
                setNotifications((prevNotifications) => [...prevNotifications, notification]);
                setOpenNotification(true);
                audioPlayer?.current?.play();
            }

        };

        // Terminating the connection on component unmount
        return () => {
            eventSource.close();
        };
    }, [uniqueId]);

    const handleNotificationClose = () => {
        setOpenNotification(false);
        setNotifications([])
        onClose();
    };

    return (
        <>
            <audio ref={audioPlayer} src={NotificationSound} />

            <Dialog open={openNotification} onClose={handleNotificationClose}>
                <DialogTitle>Ready to be picked up!</DialogTitle>
                <DialogContent>
                    <List>
                        {notifications.map((notification, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`#${notification.orderId} - ${notification.coffee}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={handleNotificationClose} color="primary">
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default OrderNotification;
