import { Switch, View, Button, TextInput, Alert, Image } from "react-native";
import React, { useState } from "react";
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import { getMusicData } from "./api-client";

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
    margin-top: 80px;
`

const TxtIn = styled(TextInput)`
    width: 200px;
    height: 30px;
    margin: 10px;
    background-color: yellow;
`

const BtnView = styled(Box)`
    flex: 1;
    background-color: none;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: -70px;
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
    getMusicData().then(data => console.warn(data));

    const router = useRouter();
    const redirect = (path: any) => {
        router.push({
            pathname: path,
        });
    }



    return (
        <MainContainer>
            <ImgView>
                <Img 
                testID="icon-image"
                source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}} style={{width: 150, height: 150}} />
            </ImgView>
            <BtnView>
                <Btn title="Home" onPress={() => redirect('/home')}/>
                <Btn title="Iniciar Sesión" onPress={() => redirect('/login')}/>
                <Btn title="Registrarse" onPress={() => redirect('/register')}/>
            </BtnView>
        </MainContainer>
    )
}
