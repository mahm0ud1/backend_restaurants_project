interface PhotosInterface {
    contentType: String,
    photos: Photos[]
}

interface Photos {
    data:Buffer
}

export default PhotosInterface;