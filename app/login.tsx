import { Switch, View, Button, TextInput, Alert, Image, Platform } from "react-native";
import React, { useState } from "react";
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

// Flex : tomar todo el espacio disponible
// flexDirection: {row | dolumn} los elementos se alinean en filas o columnas segun parametro

// Requisitos: pantalla de login con:
// Text input (nombre, email, contraseña)
// Etiquetas
// Imagen
// Botón

// Botón: imprimir alert con validaciones (validar que el email un email, y contraseña validacion al menos que sea de 8 characteres)

const MainContainer = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #F5FCFF;
`

const Box = styled(View)`
    width: 250px;
    height: 50px;
    margin: 10px;
    background-color: black;
`

const ImgView = styled(Box)`
    flex: 1;
    height: 150px;
    background-color: red;
    align-items: center;
    justify-content: center;
`

const TextView = styled(Box)`
    flex: 1;
    width: 250px;
    background-color: none;
    align-items: center;
    justify-content: center;
`

const TxtIn = styled(TextInput)`
    width: 200px;
    height: 30px;
    margin: 10px;
    background-color: yellow;
`

const EmailIn = styled(TxtIn)`
    width: 250px;
`

const PassIn = styled(TxtIn)`
    width: 200px;
`

const BtnView = styled(Box)`
    flex: 1;
    background-color: none;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const PassView = styled(View)`
    flex-direction: row;
`

const Img = styled(Image)`
    flex: 1;
    aspect-ratio: 1;
    resize-mode: contain;
`
const Btn = styled(Button)`
    background-color: blue;
`

const isPasswordValid = (password: string) => {
    // Password must be at least 8 characters
    // Password must contain at least one uppercase letter
    // Password must contain at least one special character

    const upperCase = /[A-Z]/;
    const specialChar = /[\W]/;

    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!password.match(upperCase)) return 'La contraseña debe tener al menos una letra mayúscula';
    if (!password.match(specialChar)) return 'La contraseña debe tener al menos un caracter especial'; 
    return "VALID";
}

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const onPressRegister = () => {
        router.push({
            pathname: './register',
        });
    }

    const showAlert = (message: string) => {
        if (Platform.OS === 'web' || Platform.OS === 'windows') {
            window.alert(message);
        } else {
            Alert.alert(message);
        }
    };

    const validations = (email: string, password: string) => {
        if (password === '' || email === '') {
            showAlert('Los campos no pueden estar vacíos');
        } else if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            const passwordValidation = isPasswordValid(password);
            if (passwordValidation === 'VALID') {
                showAlert('VALIDACIÓN EXITOSA');
            } else {
                showAlert(passwordValidation);
            }
        } else {
            showAlert('El email debe tener un formato válido');
        }
    };

    return (
        <MainContainer>
            <ImgView>
                <Img 
                testID="icon-image"
                source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}} style={{width: 150, height: 150}} />
            </ImgView>  
            <TextView>
                <EmailIn placeholder="Email" value={email} onChangeText={setEmail} />
                <PassView>
                    <PassIn placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
                    <Switch value={showPassword} onValueChange={setShowPassword} />
                </PassView> 
            </TextView>
            <BtnView>
                <Btn title="Iniciar Sesión" onPress={() => validations(email, password)} />
                <Btn title="Registrarse" onPress={onPressRegister} />
            </BtnView>
        </MainContainer>
    )
}
