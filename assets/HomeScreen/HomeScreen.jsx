import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";
import { Icon } from 'react-native-elements'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {vh, vw} from "react-native-expo-viewport-units";
import {IconButton, TouchableRipple} from "react-native-paper";
const {width, height} = Dimensions.get("screen");
import logo from "../logo.png"

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState(null)
    // testowanie tokenu

    // const testerToken = async (value) => {
    //     try {
    //         await AsyncStorage.setItem('@login_token', value)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    // testerToken(false)

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@login_token')
            if(value !== null) {
                setToken(value)
            } else {
                setToken(null)
            }
        } catch(e) {
            console.log(e)
        }
    }

    getToken()

    const getRandomColor = () => { return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + '.25' + ')'; }


    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.navigate('Scan')}
            onSwipeLeft={() => {
                if (token !== "false" && token !== false && token !== null && token !== "null" && token !== ""){
                    navigation.navigate('User')
                } else {
                    navigation.navigate('Login')
                }
            }}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{flex: 1 }}
        >
            <View style={{
                width: '100%',
                height: '100%',
            }}>
                <View style={{
                    height: '40%',
                    width: '100%',
                    alignItems: "center",
                    justifyContent: "center",

                }}><View style={{
                    width: 205,
                    height: 235,
                    borderRadius: 10,
                    borderColor: '#a3a3a3',
                    borderWidth: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e8e8e8",
                    marginTop:vh(15),
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,
                }}>
                    <Image style={{
                    width: vw(50),
                    height: vw(50),
                    }} source={logo}>
                    </Image>
                </View>

                </View>
                <View style={{flexDirection: 'row', width: '100%', height: '60%' }}>
                    <View style={{
                        width: '50%',
                        height: '100%',
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <IconButton
                            icon="chevron-left"
                            rippleColor={getRandomColor()}
                            underlayColor={getRandomColor()}
                            style={{
                            }}
                            color={"black"}
                            size={100}
                            onPress={() => navigation.navigate('Scaner')}
                        />
                        <Text style={styles.text}>
                            Skaner
                        </Text>
                    </View>
                    <View style={{
                        width: '50%',
                        height: '100%',
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <IconButton
                            icon="chevron-right"
                            rippleColor={getRandomColor()}
                            underlayColor={getRandomColor()}
                            style={{
                            }}
                            color={"black"}
                            size={100}
                            onPress={() => navigation.navigate('Login')}
                        />
                        <Text style={styles.text}>
                            Logowanie
                        </Text>

                    </View>
                </View>
            </View>
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: "row",
    },
    box:{
        marginTop: width / 5,
        width: width / 1.4,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    leftarr:{
        flexDirection: "row",
    },
    text:{
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: vh(5),
    },

});
export default HomeScreen;
