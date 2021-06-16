import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./assets/HomeScreen/HomeScreen";
import LoginScreen from "./assets/LoginScreen/LoginScreen";
import ScanScreen from "./assets/ScanScreen/ScanScreen";
const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer style={{flex: 1}}>
            <Stack.Navigator initialRouteName="Home" style={{flex: 1}}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Scan" component={ScanScreen} options={{ gestureDirection: "horizontal-inverted", headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                {/*<Stack.Screen name="User" component={UserScreen} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
