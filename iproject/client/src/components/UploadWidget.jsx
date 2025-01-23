import { useEffect, useRef } from 'react';

const UploadWidget = ({ setImages, images, handleTouchImages }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'jeannede',
            uploadPreset: 'product-image',
            folder: 'products',
            multiple: true
        }, function (error, result) {
            if (!error && result && result.event === 'success') {
                setImages((prevImages) => [...prevImages, result.info.secure_url])
            }
            // Handle the result or error here
        })
    }, [])

    return (
        <button
            className={`border w-full px-4 py-2 rounded-md bg-gray-200 text-black ${images.length >= 8 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
            type='button'
            onClick={() => {
                widgetRef.current.open()
                handleTouchImages()
            }}
            disabled={images.length >= 8}
        >
            Upload Image
        </button>
    )
};

export default UploadWidget;
