import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Index from '../../app/index';

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
        push: mockPush,
    }),
}));

describe('Index', () => {
    it('renders correctly', () => {
        render(<Index />);

        // Expects these elements to exist on th element
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy;
        expect(screen.getByText('Registrarse')).toBeTruthy;
        expect(screen.getByTestId('icon-image')).toBeTruthy;
    });

    it('navigates to Register', () => {
        render(<Index />);

        const registerButton = screen.getByText('Registrarse');
        fireEvent.press(registerButton);

        expect(mockPush).toHaveBeenCalledWith({pathname: '/register'});
    });

    it('navigates to Login', () => {
        render(<Index />);

        const loginButton = screen.getByText('Iniciar Sesión');
        fireEvent.press(loginButton);

        expect(mockPush).toHaveBeenCalledWith({pathname: '/login'});
    });
});