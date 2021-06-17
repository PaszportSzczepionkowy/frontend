import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";
import { Icon } from 'react-native-elements'
import AsyncStorage from "@react-native-async-storage/async-storage";
const {width, height} = Dimensions.get("screen");

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
            style={{flex: 1}}
        >
            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: 'center', marginTop: 250 }}>
                <Icon name="skull-outline" type='ionicon' size={150}/>
                <View style={styles.box}>
                    <View style={styles.leftarr}>
                        <Icon name="chevron-back-outline" type='ionicon'/>
                        <Text> Scan </Text>
                    </View>
                    <View style={styles.container}>
                        <Text> Login </Text>
                        <Icon name="chevron-forward-outline" type='ionicon'/>
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

});
export default HomeScreen;
