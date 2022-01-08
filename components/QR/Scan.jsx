import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper';
import qrmAxios from '../../qrmAxios';
import Master from '../Master'

export default function Scan({ navigation }) {

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
        console.log("Scanned");
        qrmAxios.post('/scan/', {
            qrcode: data,
            userid: 1
        }).then(response => {
            navigation.navigate("Location", {
                data: response.data
            })
        }).catch(err => {
            console.log(err);
        })
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Master title="Scan QR Code">
            {!scanned ? <><BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
            />
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Point the camera to a QR Mangala code</Text>
            </> : <ActivityIndicator animating={true} />}
        </Master>
    )
}