import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, Button, View, ScrollView} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import GestureRecognizer from "react-native-swipe-gestures";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
    camera: {
        height: vh(50),
        width: "100%",
        marginBottom: 5,
    },
    filler: {
        height: vh(15),
    },
    txt: {
        fontSize: 15,
        marginBottom: 10,
        width: "100%",
        textAlign: "center"
    },
    txtContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        width: vw(80)
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
    }

    return (
        <GestureRecognizer
            onSwipeLeft={() => navigation.navigate('Home')}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{width: vw(100), height: vh(100)}}
        >
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.camera}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
                <View style={styles.txtContainer}>
                    <Text style={styles.txt}> {user !== undefined ? "Imie: "+user.name : ""} </Text>
                    <Text style={styles.txt}> {user !== undefined ? "Nazwisko: "+user.surname : ""} </Text>
                    <Text style={styles.txt}> {user !== undefined ? "Pesel: "+user.pesel : ""} </Text>
                    <Text style={styles.txt}> {user !== undefined ? "Data urodzenia: "+user.birthDate : ""} </Text>
                    <Text style={styles.txt}> {vaccine !== undefined ? "Data pierwszej szczepionki: "+vaccine.date : ""} </Text>
                    <Text style={styles.txt}> {vaccine !== undefined ? "secondDoseDate" in vaccine ?  "Data drugiej szczepionki: "+vaccine.secondDoseDate : "" : ""} </Text>
                </View>
            </View>
        </GestureRecognizer>
    )
}

export default ScanScreen
