import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";

import styles from "./List.module.scss";

export default function List({ favorites, setFavorites }) {
    const API_URL = "https://jsonplaceholder.typicode.com/albums/1/photos?_limit=10";

    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [index, setIndex] = useState(1);
    const loaderRef = useRef(null);

    const observer = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            fetchData();
        }
    });

    // Initial load of images
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    API_URL
                );
                setPhotos(response.data);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        console.log("Initial Data Load");
        getData();
    }, []);

    // Fetch function which is only recreated when either the index or loading state changes.
    const fetchData = useCallback(async () => {
        if (isLoading) return;
        console.log("Data Load for Page:", index);
        setIsLoading(true);
        axios
            .get(`${API_URL}&_page=${index}`)
            .then((response) => {
                console.log("Response::", response)
                // It starts to return empty array after some pages, so need to remove the observer once there is not more data.
                if (response.data.length === 0) {
                    console.log("Clear Observer: No More Data")
                    if (loaderRef.current) {
                        observer.unobserve(loaderRef.current);
                        return;
                    }
                }
                setPhotos((prevItems) => [...prevItems, ...response.data]);
                setIndex((prevIndex) => prevIndex + 1);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [index, isLoading]);

    useEffect(() => {
        /**
         * Create an intersection observer for the loading element so that a new fetch call with incremented index is only made 
         * when this loading element (right now its just a span) is inside the view port
         */
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [fetchData]);

    const markAsFavorite = (photoId, url) => {
        const newFavorites = { ...favorites };

        if (favorites[photoId]) {
            delete newFavorites[photoId];
        } else {
            newFavorites[photoId] = url;
        }

        setFavorites(newFavorites)
    }

    // render the list of photos and the loading span text
    return (
        <div className={styles.list}>
            {photos.map((photo, index) => (
                <div className="list-item" key={index}>
                    <img src={photo?.url} alt='picture' width={200} />
                    <span className="image-title">{photo?.title}</span>
                    <button
                        style={{ cursor: "pointer" }}
                        className={favorites[photo.id] ? 'favorite' : ''}
                        onClick={() => markAsFavorite(photo?.id, photo?.url)}
                    >
                        Favorite
                    </button>
                </div>
            ))}
            <div data-testid="list-loading-spinner" ref={loaderRef}>{isLoading && <div className={styles.spinner}></div>}</div>
        </div>
    );
}