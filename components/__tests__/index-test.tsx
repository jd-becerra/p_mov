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

describe('Index', () => {
    it('renders correctly', () => {
        render(<Index />);

        // Expects these elements to exist on th element
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy;
        expect(screen.getByText('Registrarse')).toBeTruthy;
        expect(screen.getByTestId('icon-image')).toBeTruthy;
    });
});