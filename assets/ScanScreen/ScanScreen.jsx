import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import GestureRecognizer from "react-native-swipe-gestures";

const styles = StyleSheet.create({
    camera: {
        height: "50%",
        width: "100%",
    }
});

function ScanScreen({ navigation }) {
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
        <GestureRecognizer
            onSwipeLeft={() => navigation.goBack()}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{flex: 1}}
        >
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.camera}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </GestureRecognizer>
    );
}

export default ScanScreen;
