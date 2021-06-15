import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import GestureRecognizer from "react-native-swipe-gestures";
import SlidingPanel from 'react-native-sliding-up-down-panels';
const { width, height } = Dimensions.get('window');


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
            <View style={{
                flex: 1,
            }}>

                <View style={styles.container}>

                    <View style={styles.bodyViewStyle}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={styles.camera}
                        />
                    </View>
                    <SlidingPanel
                        headerLayoutHeight = {100}
                        headerLayout = { () =>
                            <View style={styles.headerLayoutStyle}>
                                <Text style={styles.commonTextStyle}>My Awesome sliding panel</Text>
                            </View>
                        }
                        slidingPanelLayout = { () =>
                            <View style={styles.slidingPanelLayoutStyle}>
                                <Text style={styles.commonTextStyle}>The best thing about me is you</Text>
                            </View>
                        }
                    />
                </View>
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </GestureRecognizer>
    );
}
const styles = StyleSheet.create({
    camera: {
        height: "50%",
        width: "100%",
    },
    container: {
        flex: 1,
    },
    bodyViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLayoutStyle: {
        width,
        height: 100,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    slidingPanelLayoutStyle: {
        width,
        height,
        backgroundColor: '#7E52A0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonTextStyle: {
        color: 'white',
        fontSize: 18,
    },
});

export default ScanScreen;
