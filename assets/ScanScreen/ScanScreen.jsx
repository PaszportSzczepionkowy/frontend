import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, Button, View, ScrollView} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import GestureRecognizer from "react-native-swipe-gestures";
import RNU from 'react-native-units'

const styles = StyleSheet.create({
    camera: {
        height: RNU.vh(85),
        width: "100%",
    },
    filler: {
        height: RNU.vh(15)
    }
})

function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })();
    }, []);

    if (hasPermission === null) {
        return <Text style={styles.alert}>Requesting for camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text style={styles.alert}>No access to camera</Text>
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        alert(data)
    }

    return (
        <GestureRecognizer
            onSwipeLeft={() => navigation.goBack()}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{flex: 1}}
        >
            <ScrollView style={{flex: 1}}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.camera}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                <View style={styles.filler}/>
                <View>
                    <Text> Lorem ipsum </Text>
                    <Text> Lorem ipsum </Text>
                    <Text> Lorem ipsum </Text>
                    <Text> Lorem ipsum </Text>
                    <Text> Lorem ipsum </Text>
                </View>
            </ScrollView>
        </GestureRecognizer>
    )
}

export default ScanScreen
