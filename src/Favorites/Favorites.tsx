import React from "react";
import { TFavorites } from "../App.tsx"

export default function Favorites({ favorites }: { favorites: TFavorites }) {
    const favoriteImages: any = [];
    for (let photoId in favorites) {
        favoriteImages.push(<div key={photoId}>
            <img src={favorites[photoId]} alt='picture' width={200} />
        </div>)
    }
    return <>{favoriteImages}</>
}