import { Button, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const Sign_in = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async () => {
        try {
            const response = await axios.post('http://192.168.11.122:5003/api/customer/signin', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                navigation.navigate('products');
            }
        } catch (error:any) {
            console.error('Signin error:', error.response.data);
        }
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/t.jpg')}
            style={styles.background}
        >
            <View style={styles.form}>
                <Text style={styles.title}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Button title='Sign In' onPress={handleSignin} />
                <Text onPress={() => navigation.navigate('Register')} style={styles.registerText}>
                    Don't Have An account? Create One
                </Text>
            </View>
        </ImageBackground>
    );
};

export default Sign_in;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent background for the form
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        color: 'rgba(94, 3, 53, 0.7)',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'white',
        padding: 12,
        marginBottom: 15,
        width: '100%',
    },
    registerText: {
        color: 'rgba(94, 3, 53, 0.7)',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});
