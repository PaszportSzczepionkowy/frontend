import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";


const styles = StyleSheet.create({

});

const HomeScreen = ({ navigation }) => {
    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.navigate('Home')}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{flex: 1}}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Dane użytkownika </Text>
            </View>
        </GestureRecognizer>
    );
};

export default HomeScreen;
