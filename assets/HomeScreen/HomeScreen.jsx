import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";
import { Icon } from 'react-native-elements'
import AsyncStorage from "@react-native-async-storage/async-storage";


const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: "row",
    },
});

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState(null)
    const testerToken = async (value) => {
        try {
            await AsyncStorage.setItem('@login_token', value)
        } catch (e) {
            console.log(e)
        }
    }
    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@login_token')
            if(value !== null) {
                setToken(value)
                console.log("token: ", value)
            } else {
                setToken(null)
            }
        } catch(e) {
            console.log(e)
        }
    }
    getToken()
    // testerToken(false)
    console.log("check",token !== "false" && token !== false && token !== null && token !== "null")
    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.navigate('Scan')}
            onSwipeLeft={() => {
                if (token !== "false" && token !== false && token !== null && token !== "null"){
                    navigation.navigate('User')
                } else {
                    navigation.navigate('Login')
                }
            }}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{flex: 1}}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>Home</Text>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Icon name="chevron-back-outline" type='ionicon'/>
                        <Text> Scan </Text>
                    </View>
                    <View style={styles.container}>
                        <Text> Login  </Text>
                        <Icon name="chevron-forward-outline" type='ionicon'/>
                    </View>
                </View>
            </View>
        </GestureRecognizer>
    );
};

export default HomeScreen;
