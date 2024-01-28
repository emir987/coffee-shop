import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UniqueIdContextProps {
    uniqueId: string;
}

const UniqueIdContext = createContext<UniqueIdContextProps | undefined>(undefined);

export const useUniqueId = () => {
    const context = useContext(UniqueIdContext);
    if (!context) {
        throw new Error('useUniqueId must be used within a UniqueIdProvider');
    }
    return context;
};

interface UniqueIdProviderProps {
    children: ReactNode;
}

export const UniqueIdProvider: React.FC<UniqueIdProviderProps> = ({ children }) => {
    const [uniqueId, setUniqueId] = useState<string>("");

    useEffect(() => {
        const storedUniqueId = localStorage.getItem('uniqueId');

        if (!storedUniqueId) {
            const newUniqueId = uuidv4();
            localStorage.setItem('uniqueId', newUniqueId);
            setUniqueId(newUniqueId);
            console.log('Generated new unique ID:', newUniqueId);
        } else {
            setUniqueId(storedUniqueId);
            console.log('Existing unique ID:', storedUniqueId);
        }
    }, []);

    return (
        <UniqueIdContext.Provider value={{ uniqueId }}>
            {children}
        </UniqueIdContext.Provider>
    );
};