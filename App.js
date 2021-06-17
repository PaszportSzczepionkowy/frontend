import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./assets/HomeScreen/HomeScreen";
import LoginScreen from "./assets/AuthScreen/LoginScreen";
import ScanScreen from "./assets/ScanScreen/ScanScreen";
import UserScreen from "./assets/AuthScreen/UserScreen";
import {vh, vw} from "react-native-expo-viewport-units";
const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer style={{width: vw(100), height: vh(100)}}>
            <Stack.Navigator initialRouteName="Home" style={{width: vw(100), height: vh(100)}}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Scan" component={ScanScreen} options={{ gestureDirection: "horizontal-inverted", headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
