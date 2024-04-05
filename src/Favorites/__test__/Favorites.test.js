import React from 'react';
import { render } from '@testing-library/react';
import Favorites from '../Favorites';

describe("Favorites tests", () => {
    const favorites = {
        1: 'path/to/image1.jpg',
        2: 'path/to/image2.jpg',
        3: 'path/to/image3.jpg',
    };

    it('renders favorite images correctly', () => {
        const { getAllByAltText } = render(<Favorites favorites={favorites} />);
        const favoriteImages = getAllByAltText('picture');

        expect(favoriteImages).toHaveLength(Object.keys(favorites).length);

        // Check if each image has the correct source
        favoriteImages.forEach((image, index) => {
            expect(image).toHaveAttribute('src', favorites[index + 1]);
        });
    });

    it('renders no images when favorites is empty', () => {
        const { queryByAltText } = render(<Favorites favorites={{}} />);
        const favoriteImages = queryByAltText('picture');

        expect(favoriteImages).toBeNull();
    });
})