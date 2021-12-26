import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import Master from '../Master'

export default function Scan() {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Master title="Scan QR Code">
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
            />
            <Text style={{ textAlign: 'center', fontSize: 16 }}>Point the camera to a QR Mangala code</Text>
        </Master>
    )
}