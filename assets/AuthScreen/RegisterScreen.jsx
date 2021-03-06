import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, ScrollView} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Icon } from 'react-native-elements'
import {Button, IconButton} from "react-native-paper"
const {width, height} = Dimensions.get("screen")
import AsyncStorage from '@react-native-async-storage/async-storage'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
import DateTimePicker from '@react-native-community/datetimepicker';


function LoginScreen({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [pesel, setPesel] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("")

    const datePad = (day) => {
        if (day <= 9){
            return "0"+day.toString()
        }
        else {
            return day.toString()
        }
    }

    const registrationHandler = () => {
        alert(
            JSON.stringify({
                name: firstName,
                surname: surname,
                email: email,
                birthDate: date.getFullYear().toString()+datePad(date.getMonth()+1)+datePad(date.getDate()),
                pesel: pesel,
                password: password,
            })
        )
        fetch('http://162.55.210.168:3000/account/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: firstName,
                surname: surname,
                email: email,
                birthDate: date.getFullYear().toString()+datePad(date.getMonth()+1)+datePad(date.getDate()),
                pesel: pesel,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                navigation.navigate("Login")
            })
            .catch((error) => {
                console.error(error)
            });
    }

    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const showDatepicker = () => {
        setShow(true)
    }
    const getRandomColor = () => { return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + '.25' + ')'; }

    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.navigate('Home')}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{width: vw(100), height: vh(100)}}
        >
            <ScrollView>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                }}>
                    <View style={{
                        width: "100%",
                        height: "10%",
                    }}>
                        <IconButton
                            icon="chevron-left"
                            rippleColor={getRandomColor()}
                            underlayColor={getRandomColor()}
                            style={{
                            }}
                            color={"black"}
                            size={50}
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                    <Text style={{
                        marginTop: vh(2),
                        textAlign: "center",
                        fontSize: 45,
                    }}>
                        Rejestracja
                    </Text>
                    <View style={styles.userInput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={styles.textinput}
                           onChangeText={(imie => setFirstName(imie))}
                           placeholder={"Imie"}
                           maxLength = {35}
                        />
                    </View>
                    <View style={styles.userInput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={styles.textinput}
                               onChangeText={(nazwisko => setSurname(nazwisko))}
                               placeholder={"Nazwisko"}
                               maxLength = {35}
                        />
                    </View>
                    <View style={{ alignItems: "center", flexDirection: "collumn"}}>
                        <Button onPress={showDatepicker}  color={"black"}
                                mode="outlined"
                                style={{ marginTop: 15}} > Data urodzenia </Button>
                        {show && <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            locale="PL"
                            onChange={onChange}
                            style={{width: 100, height: 50, marginTop: 10}}
                        />}
                    </View>
                    <View style={styles.userInput}>
                        <Icon name={'apps-outline'} type='ionicon'/>
                        <TextInput style={styles.textinput}
                               onChangeText={(pesel => setPesel(pesel))}
                               placeholder={"Pesel"}
                               maxLength = {35}
                        />
                    </View>
                    <View style={styles.userInput}>
                        <Icon name={'person-circle-outline'} type='ionicon'/>
                        <TextInput style={styles.textinput}
                               onChangeText={(email => setEmail(email))}
                               placeholder={"Email"}
                               maxLength = {35}
                        />
                    </View>
                    <View style={styles.passInput}>
                        <Icon name={'lock-closed-outline'} type='ionicon'/>
                        <TextInput secureTextEntry={true} style={styles.textinput}
                               onChangeText={(haslo => setPassword(haslo))}
                               placeholder={"Has??o"}
                               maxLength = {35}
                        />
                    </View>
                    <View style={styles.passInput}>
                        <Icon name={'lock-closed-outline'} type='ionicon'/>
                        <TextInput secureTextEntry={true} style={styles.textinput}
                               onChangeText={(powtorzoneHaslo => setSecondPassword(powtorzoneHaslo))}
                               placeholder={"Powt??rz has??o"}
                               maxLength = {35}
                        />
                    </View>
                    <Button style={{
                        marginTop: 45,
                        marginBottom: 30,
                    }} mode="contained" color={"black"} onPress={registrationHandler}>
                        Zarejestruj
                    </Button>
                </View>
            </ScrollView>
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

    textinput:{
        width: width / 1.4,
        // placeholderTextColor: "#b0b0b0",
        // underlineColorAndroid: "transparent",
        // border: "none",
        paddingHorizontal: 10,
    }
});


export default LoginScreen;
