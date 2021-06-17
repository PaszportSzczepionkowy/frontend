 import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Icon } from 'react-native-elements'
import {Button} from "react-native-paper";
const {width, height} = Dimensions.get("screen");
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setToken = async (value) => {
        try {
            await AsyncStorage.setItem('@login_token', value)
            console.log("token set to: ", value)
        } catch (e) {
            console.log(e)
        }
    }

    const loginHandler = () => {
        fetch('http://localhost:3000/account/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((response) => response.json())
        .then((response) => {
            setToken(response.token)
            navigation.navigate('User')
        })
        .catch((error) => {
            console.error(error)
        });
    }


    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.navigate('Home')}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{width: vw(100), height: vh(100)}}
        >
            <View style={styles.main}>
                <View style={{
                    marginTop: vh(20),
                    flex: 1,
                    alignItems: "center",
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 45,
                    }}>
                        Logowanie
                    </Text>
                    <View style={styles.userInput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={{
                            width: width / 1.4,
                            border: "none",
                            paddingHorizontal: 10,

                        }}
                           onChangeText={(email => setEmail(email))}
                           placeholder={"Username"}
                           maxLength = {35}
                        />
                    </View>
                    <View style={styles.passInput}>
                        <Icon name={'lock-closed-outline'} type='ionicon'/>
                        <TextInput secureTextEntry={true} style={{
                            width: width / 1.4,
                            border: "none",
                            paddingHorizontal: 10,
                        }}
                            onChangeText={(text => setPassword(text))}
                            placeholder={"Password"}
                            maxLength = {35}
                        />
                    </View>
                    <Button style={{marginTop: 45}} mode="contained" color={"black"} onPress={loginHandler}>
                        Zaloguj
                    </Button>

                    <Button
                        color={"black"}
                        labelStyle={{color: "black"}}
                        style={{height: 30, marginTop: 25,color: "black"}}
                        onPress={() => navigation.navigate('Register')}

                    >
                        Zarejestruj się
                    </Button>
                </View>
            </View>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInput: {
        marginTop: 55,
        width: width / 1.3,
        height: 48,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 40,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        borderColor: "#b0b0b0",
        borderWidth: 0.2,
    },
    passInput: {
        marginTop: 20,
        width: width / 1.3,
        height: 48,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 40,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        borderColor: "#b0b0b0",
        borderWidth: 0.2,
    },
});


export default LoginScreen;
