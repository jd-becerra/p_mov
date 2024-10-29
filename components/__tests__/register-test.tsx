import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Register from '../../app/register';
import { useRouter } from 'expo-router';

// Mock Alert and useRouter modules
jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('Register', () => {
    it('renders correctly', () => {
        render(<Register />);

        expect(screen.getByPlaceholderText('Email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Nombre de usuario')).toBeTruthy();
        expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
        expect(screen.getByPlaceholderText('Confirmar Contraseña')).toBeTruthy();
        expect(screen.getByText('Registrarse')).toBeTruthy();
    });

    it('validates empty fields', () => {
        render(<Register />);

        const button = screen.getByText("Registrarse");

        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith('Todos los campos son obligatorios');
    });

    it('validates email format', () => {
        render(<Register />);

        const emailInput = screen.getByPlaceholderText('Email');
        const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña');
        const button = screen.getByText("Registrarse");

        fireEvent.changeText(emailInput, 'incorrect_email@');
        fireEvent.changeText(usernameInput, 'username');
        fireEvent.changeText(passwordInput, 'A12345678@');
        fireEvent.changeText(confirmPasswordInput, 'A12345678@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith('El email no tiene formato válido');
    });

    it('validates password', () => {
        render(<Register />);
        
        const emailInput = screen.getByPlaceholderText('Email');
        const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña');
        const button = screen.getByText("Registrarse");

        fireEvent.changeText(emailInput, 'validemail@example.com');
        fireEvent.changeText(usernameInput, 'username');

        fireEvent.changeText(passwordInput, '1234567');
        fireEvent.changeText(confirmPasswordInput, '1234567');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith('La contraseña debe tener al menos 8 caracteres');

        fireEvent.changeText(passwordInput, '12345678');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith('La contraseña debe tener al menos una letra mayúscula');

        fireEvent.changeText(passwordInput, 'A12345678');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith('La contraseña debe tener al menos un caracter especial');
    });

    it('validates matching passwords', () => {
        render(<Register />);

        const emailInput = screen.getByPlaceholderText('Email');
        const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña');
        const button = screen.getByText("Registrarse");

        fireEvent.changeText(emailInput, 'validemail@example.com');
        fireEvent.changeText(usernameInput, 'username');
        fireEvent.changeText(passwordInput, 'A12345678@');
        fireEvent.changeText(confirmPasswordInput, 'B12345678@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
    });

    it('registers successfully with valid input', () => {
        render(<Register />);

        const emailInput = screen.getByPlaceholderText('Email');
        const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña');
        const button = screen.getByText("Registrarse");

        fireEvent.changeText(emailInput, 'validemail@example.com');
        fireEvent.changeText(usernameInput, 'username');
        fireEvent.changeText(passwordInput, 'A12345678@');
        fireEvent.changeText(confirmPasswordInput, 'A12345678@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith('VALIDACIÓN EXITOSA');
        expect(mockPush).toHaveBeenCalledWith({ pathname: './login' });
    });
});
