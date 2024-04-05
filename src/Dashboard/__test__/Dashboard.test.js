import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

describe('Dashboard component', () => {
    test('renders Dashboard links correctly', () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        const dashboardLink = screen.getByText('Dashboard');
        const listLink = screen.getByText('List');

        expect(dashboardLink).toHaveAttribute('href', '/');
        expect(listLink).toHaveAttribute('href', '/list');
    });

    test('renders Dashboard component properly', () => {
        const { getByTestId } = render(
            <MemoryRouter initialEntries={['/']}>
                <Dashboard />
            </MemoryRouter>
        );

        const dashboardHeader = screen.getByRole('heading', { name: 'React Router' });
        const sidebar = screen.getByRole('link', { name: 'Dashboard' });
        const outlet = getByTestId('dashboard-outlet-div');

        expect(dashboardHeader).toBeInTheDocument();
        expect(sidebar).toBeInTheDocument();
        expect(outlet).toBeInTheDocument();
    });
});