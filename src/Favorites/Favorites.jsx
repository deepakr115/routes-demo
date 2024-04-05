export default function Favorites({ favorites }) {
    let favoriteImages = [];
    for (let photoId in favorites) {
        favoriteImages.push(<div key={photoId}>
            <img src={favorites[photoId]} alt='flag' width={200} />
        </div>)
    }
    return <>{favoriteImages}</>
}