import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, Button, View, ScrollView} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import GestureRecognizer from "react-native-swipe-gestures";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
    camera: {
        height: vh(85),
        width: "100%",
    },
    filler: {
        height: vh(15),

    }
})

function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [vaccine, setVaccine] = useState();
    const [user, setUser] = useState();

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
        setVaccine(JSON.parse(data).vaccine[0])
        setUser(JSON.parse(data).user[0])
        <ScrollView>
        </ScrollView>
    }

    return (
        <GestureRecognizer
            onSwipeLeft={() => navigation.navigate('Home')}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{width: vw(100), height: vh(100)}}
        >
            <ScrollView style={{flex: 1}}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.camera}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                <View style={styles.filler}/>
                <View>
                    <Text> Imie: {user !== undefined ? user.name : ""} </Text>
                    <Text> Nazwisko: {user !== undefined ? user.surname : ""} </Text>
                    <Text> Pesel: {user !== undefined ? user.pesel : ""} </Text>
                    <Text> Data urodzenia: {user !== undefined ? user.birthDate : ""} </Text>
                    <Text> Data pierwszej szczepionki: {vaccine !== undefined ? vaccine.date : ""} </Text>
                    <Text> {vaccine !== undefined ? "secondDoseDate" in vaccine ?  "Data drugiej szczepionki: "+vaccine.secondDoseDate : "" : ""} </Text>
                </View>
                <View style={styles.filler}/>
            </ScrollView>
        </GestureRecognizer>
    )
}

export default ScanScreen
