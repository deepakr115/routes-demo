import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import List from '../List.jsx';

jest.mock('axios');

describe('List component', () => {
    const mockPhotos = [
        { id: 1, url: 'http://example.com/image1.jpg', title: 'Photo 1' },
        { id: 2, url: 'http://example.com/image2.jpg', title: 'Photo 2' },
        { id: 3, url: 'http://example.com/image3.jpg', title: 'Photo 3' },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockPhotos });
    });

    // Mock IntersectionObserver's observe method
    const observeMock = jest.fn();
    const unObserveMock = jest.fn();
    window.IntersectionObserver = jest.fn(() => ({
        observe: observeMock,
        unobserve: unObserveMock,
    }));

    test('renders list of photos correctly', async () => {
        const { getAllByAltText, getByText } = render(<List favorites={{}} setFavorites={() => { }} />);

        // Wait for the initial data load
        await waitFor(() => {
            expect(getAllByAltText('picture').length).toEqual(3);
        });

        // Check if all photos are rendered
        mockPhotos.forEach(photo => {
            expect(getByText(photo.title)).toBeInTheDocument();
        });
    });

    test('marks photo as favorite when "Favorite" button is clicked', async () => {
        const setFavoritesMock = jest.fn();
        const { getAllByAltText, getAllByRole } = render(<List favorites={{}} setFavorites={setFavoritesMock} />);

        // Wait for the initial data load
        await waitFor(() => {
            expect(getAllByAltText('picture').length).toEqual(3);
        });

        // Click on the "Favorite" button for the first photo
        const favoriteButton = getAllByRole('button', { name: 'Favorite' })[0];
        userEvent.click(favoriteButton);

        // Check if setFavorites is called with the correct arguments
        expect(setFavoritesMock).toHaveBeenCalledWith({ 1: 'http://example.com/image1.jpg' });
    });

    test('loads more photos when scrolled to the bottom', async () => {
        const { getAllByAltText } = render(<List favorites={{}} setFavorites={() => { }} />);

        // Wait for the initial data load
        await waitFor(() => {
            expect(getAllByAltText('picture').length).toEqual(3);
        });

        // Simulate scrolling to the bottom
        fireEvent.scroll(screen.getByTestId('list-loading-spinner'), { target: { scrollY: 300 } });

        // Check if IntersectionObserver's observe method is called
        expect(observeMock).toHaveBeenCalled();
    });
});