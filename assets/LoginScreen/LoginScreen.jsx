import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput,} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Icon } from 'react-native-elements'
import dimensions from "react-native-web/dist/exports/Dimensions";
import {Button} from "react-native-paper";
const {width, height} = Dimensions.get("screen");




function LoginScreen({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.goBack()}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{flex: 1}}
        >
            <View style={styles.main}>
                <View style={{
                    marginTop: 150,
                    flex: 1,
                    alignItems: "center",
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 45,
                    }}>Logowanie</Text>
                    <View style={styles.userinput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={{
                            outline: 'none',
                            width: width / 1.4,
                            placeholderTextColor: "#b0b0b0",
                            padding: 10,
                            underlineColorAndroid: "transparent",
                            border: "none",
                        }}
                           onChangeText={(username => setUsername(username))}
                           placeholder={"Username"}
                           maxLength = {35}
                        />
                    </View>
                    <View style={styles.passinput}>
                        <Icon name={'lock-closed-outline'} type='ionicon'/>
                        <TextInput secureTextEntry={true} style={{
                            outline: 'none',
                            width: width / 1.4,
                            placeholderTextColor: "#b0b0b0",
                            padding: 10,
                            underlineColorAndroid: "transparent",
                            border: "none",
                        }}
                                   onChangeText={(text => setPassword(text))}
                                   placeholder={"Password"}
                                   maxLength = {35}
                        />
                    </View>
                    <Button style={{
                        marginTop: 45,
                    }} mode="contained" color={"black"} onPress={() => console.log('Pressed')}>
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

    userinput: {
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
    passinput: {
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
