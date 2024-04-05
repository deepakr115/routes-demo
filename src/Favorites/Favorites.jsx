export default function Favorites({ favorites }) {
    let favoriteImages = [];
    for (let photoId in favorites) {
        favoriteImages.push(<div key={photoId}>
            <img src={favorites[photoId]} alt='picture' width={200} />
        </div>)
    }
    return <>{favoriteImages}</>
}