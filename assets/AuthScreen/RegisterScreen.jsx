import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Icon } from 'react-native-elements'
import {Button} from "react-native-paper";
const {width, height} = Dimensions.get("screen");
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

function LoginScreen({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [pesel, setPesel] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    const registrationHandler = () => {
        fetch('http://localhost:3000/account/register', {
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
                        Rejestracja
                    </Text>
                    <View style={styles.userInput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={{
                            width: width / 1.4,
                            placeholderTextColor: "#b0b0b0",
                            underlineColorAndroid: "transparent",
                            border: "none",
                        }}
                           onChangeText={(imie => setFirstName(imie))}
                           placeholder={"Imie"}
                           maxLength = {35}
                        />
                    </View>
                    <View style={styles.userInput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={{
                            width: width / 1.4,
                            placeholderTextColor: "#b0b0b0",
                            underlineColorAndroid: "transparent",
                            border: "none",

                        }}
                               onChangeText={(nazwisko => setSurname(nazwisko))}
                               placeholder={"Nazwisko"}
                               maxLength = {35}
                        />
                    </View>
                    <View style={styles.userInput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={{
                            width: width / 1.4,
                            placeholderTextColor: "#b0b0b0",
                            underlineColorAndroid: "transparent",
                            border: "none",
                        }}
                               onChangeText={(dataUrodzenia => setBirthDate(dataUrodzenia))}
                               placeholder={"Data urodzenia"}
                               maxLength = {35}
                        />
                    </View>
                    <View style={styles.userInput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={{
                            width: width / 1.4,
                            placeholderTextColor: "#b0b0b0",
                            underlineColorAndroid: "transparent",
                            border: "none",
                        }}
                               onChangeText={(pesel => setPesel(pesel))}
                               placeholder={"Pesel"}
                               maxLength = {35}
                        />
                    </View>
                    <View style={styles.passInput}>
                        <Icon name={'lock-closed-outline'} type='ionicon'/>
                        <TextInput secureTextEntry={true} style={{
                            width: width / 1.4,
                            placeholderTextColor: "#b0b0b0",
                            underlineColorAndroid: "transparent",
                            border: "none",
                        }}
                               onChangeText={(haslo => setPassword(haslo))}
                               placeholder={"Hasło"}
                               maxLength = {35}
                        />
                    </View>
                    <View style={styles.passInput}>
                        <Icon name={'lock-closed-outline'} type='ionicon'/>
                        <TextInput secureTextEntry={true} style={{
                            width: width / 1.4,
                            placeholderTextColor: "#b0b0b0",
                            underlineColorAndroid: "transparent",
                            border: "none",
                        }}
                               onChangeText={(powtorzoneHaslo => setSecondPassword(powtorzoneHaslo))}
                               placeholder={"Powtórz hasło"}
                               maxLength = {35}
                        />
                    </View>
                    <Button style={{
                        marginTop: 45,
                    }} mode="contained" color={"black"} onPress={registrationHandler}>
                        Zaloguj
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
