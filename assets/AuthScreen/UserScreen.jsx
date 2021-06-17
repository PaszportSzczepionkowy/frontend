import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";
import {vh, vw} from "react-native-expo-viewport-units";
const styles = StyleSheet.create({

});

const HomeScreen = ({ navigation }) => {
    // const qrCodeFetch = () => {
    //     fetch('http://localhost:3000/account/login', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email: email,
    //             password: password
    //         })
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             setToken(response.token)
    //             navigation.navigate('User')
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         });
    // }
    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.push('Home')}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{width: vw(100), height: vh(100)}}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Dane użytkownika </Text>
            </View>
        </GestureRecognizer>
    );
};

export default HomeScreen;
