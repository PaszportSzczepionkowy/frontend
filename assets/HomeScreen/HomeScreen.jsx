import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";
import { Icon } from 'react-native-elements'


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
    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.navigate('Scan')}
            onSwipeLeft={() => navigation.navigate('Login')}
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
