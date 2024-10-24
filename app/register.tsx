import { Text, Switch, View, Button, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useState } from "react";
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

const MainContainer = styled(KeyboardAvoidingView)`
    flex: 1;
    align-items: center;
    justify-content: center;
    vertical-align: center;
    background-color: #F5FCFF;
`

const Box = styled(View)`
    width: 250px;
    height: 50px;
    margin: 10px;
    background-color: black;
`

const TextView = styled(Box)`
    flex: 1;
    background-color: none;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
`

const Scroll = styled(ScrollView)`
    flex: 1;
`

const TxtIn = styled(TextInput)`
    width: 250px;
    height: 30px;
    margin: 10px;
    background-color: yellow;
`

const PassIn = styled(TxtIn)`
    width: 205px;
`

const BtnView = styled(Box)`
    flex: 1;
    background-color: none;
    align-items: center;
    justify-content: top;
`

const PassView = styled(View)`
    flex-direction: row;
`

const Btn = styled(Button)`
    background-color: blue;
`

const isPasswordValid = (password: string) => {
    const upperCase = /[A-Z]/;
    const specialChar = /[\W]/;

    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!password.match(upperCase)) return 'La contraseña debe tener al menos una letra mayúscula';
    if (!password.match(specialChar)) return 'La contraseña debe tener al menos un caracter especial';
    return "VALID";
}

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const validations = (email: string, password: string, confirmPassword: string) => {
        if (password === '' || email === '' || confirmPassword === '' || username === '') {
            Alert.alert('Hay campos vacíos. Todos los campos son obligatorios');
        } else if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            const passwordValidation = isPasswordValid(password);
            if (passwordValidation === 'VALID') {
                if (password === confirmPassword) {
                    Alert.alert('REGISTRO EXITOSO');
                    router.push({
                        pathname: './login',
                    });
                } else {
                    Alert.alert('Las contraseñas no coinciden');
                }
            } else {
                Alert.alert(passwordValidation);
            }
        } else {
            Alert.alert('El email debe tener un formato válido');
        }
    };

    return (
        <MainContainer
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80}
            >
            <Scroll
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignContent: 'center' }}
                >
                <TextView>
                    <TxtIn placeholder="Email" value={email} onChangeText={setEmail} />
                    <TxtIn placeholder="Nombre de usuario" value={username} onChangeText={setUsername} />
                    <PassView>
                        <PassIn placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
                        <Switch value={showPassword} onValueChange={setShowPassword} />
                    </PassView>
                    <PassView>
                        <PassIn placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showPassword} />
                        <Switch value={showConfirmPassword} onValueChange={setShowConfirmPassword} />
                    </PassView>
                </TextView>
                <BtnView>
                    <Btn title="Registrarse" onPress={() => validations(email, password, confirmPassword)} />
                </BtnView>
            </Scroll>
        </MainContainer>
    )
}
