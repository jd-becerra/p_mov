import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Alert} from 'react-native';
import Login from '../../app/login';

// fireEvent: test click
// render: test render
// screen: validate things on screen

// Mock Alert module

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush
    }),
}));

describe('Login', () => {
    it('renders correctly', () => {
        render(<Login />);

        // Expects these elements to exist on th element
        expect(screen.getByPlaceholderText('Email')).toBeTruthy;
        expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy;
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy;
        expect(screen.getByText('Registrarse')).toBeTruthy;
        expect(screen.getByTestId('icon-image')).toBeTruthy;
    });

    it('can redirect to Register', () => {
        render(<Login />);

        const registerButton = screen.getByText('Registrarse');
        fireEvent.press(registerButton);

        expect(mockPush).toHaveBeenCalledWith({pathname: './register'});
    });

    it('validates email', () => {
        render(<Login/>);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText("Iniciar Sesión");
        
        // Simulate incorrect email input
        fireEvent.changeText(emailInput, 'incorrect_email@');  // user adds incorrect email (doesn't have xyz.com after @)  
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'Los campos no pueden estar vacíos'
        );
        // fireEvent.changeText(emailInput, 'incorrect_email@');
        fireEvent.changeText(passwordInput, 'A12345678@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'El email debe tener un formato válido'
        );
    });

    it('validates password', () => {
        render(<Login/>);
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText("Iniciar Sesión");
        
        // Simulate incorrect email input
        fireEvent.changeText(emailInput, 'correct_email@gmail.com');  // user adds incorrect email (doesn't have xyz.com after @)  
        fireEvent.changeText(passwordInput, '1234567');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'La contraseña debe tener al menos 8 caracteres'
        );
        fireEvent.changeText(passwordInput, 'A12345678');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'La contraseña debe tener al menos un caracter especial'
        );
        fireEvent.changeText(passwordInput, '12345678@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'La contraseña debe tener al menos una letra mayúscula'
        );
        fireEvent.changeText(passwordInput, 'A12345678@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'VALIDACIÓN EXITOSA'
        );
    });
});