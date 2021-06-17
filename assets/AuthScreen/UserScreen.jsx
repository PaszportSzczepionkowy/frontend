import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";
import {vh, vw} from "react-native-expo-viewport-units";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, IconButton} from "react-native-paper";
const styles = StyleSheet.create({

});

const UserScreen = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const [token, setToken] = useState(null)

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@login_token')
            if(value !== null) {
                setToken(value)
            } else {
                console.log("wrong token!")
            }
        } catch(e) {
            console.log(e)
        }
    }
    const getImage = () => {
        if (token !== null) {
            fetch('http://162.55.210.168:3000/qrcode/get', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log("fsafasfas  ",response)
                    if (image === null)
                        setImage(response.image)
                        console.log(response.image)
                })
                .catch((error) => {
                    console.log("bład API")
                });
        }
    }
    getToken()
    getImage()

    const logout = async () => {
        try {
            await AsyncStorage.setItem('@login_token', false)
        } catch (e) {
            console.log(e)
        }
    }
    const getRandomColor = () => { return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + '.25' + ')'; }

    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.push('Home')}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{width: vw(100), height: vh(100)}}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                    width: "100%",
                    height: "10%",
                }}>
                    <IconButton
                        icon="chevron-left"
                        rippleColor={getRandomColor()}
                        underlayColor={getRandomColor()}
                        style={{
                        }}
                        color={"black"}
                        size={50}
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>

                <Image
                    style={{
                        width: vw(80),
                        height: vw(80),
                        resizeMode: 'contain',
                    }}
                    source={{
                        uri: image,
                    }}
                />
                <Button
                    style={{ marginTop: 30}}
                    onPress={() => {
                        logout()
                        navigation.navigate("Home")
                    }}
                    color="#841584"
                >
                    Wyloguj się
                </Button>
            </View>
        </GestureRecognizer>
    );
};

export default UserScreen;
