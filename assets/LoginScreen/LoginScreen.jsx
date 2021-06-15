import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function LoginScreen({ navigation }) {
    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.goBack()}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{flex: 1}}
        >
            <View style={styles.main}>
                <Text style={{fontSize: 20}}> Login </Text>
            </View>
        </GestureRecognizer>
    );
}

export default LoginScreen;
