import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://192.168.0.110:5003/api/customer/signup', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                navigation.navigate('Sign_in');
            }
        } catch (error:any) {
            console.error('Signup error:', error.response.data);
        }
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/t.jpg')}
            style={styles.background}
        >
            <View style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    keyboardType="email-address"
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
                <Button title="Sign Up" onPress={handleSignup} />
                <Text onPress={() => navigation.navigate("Sign_in")}>Already Have An account? Sign In</Text>
            </View>
        </ImageBackground>
    );
};

export default Register;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        textAlign: 'center',
        color: 'rgba(94, 3, 53, 0.7)',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'white',
        padding: 12,
        marginBottom: 15,
    },
});
