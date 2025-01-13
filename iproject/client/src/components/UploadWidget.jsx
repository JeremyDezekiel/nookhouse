import { useEffect, useRef } from 'react';

const UploadWidget = ({ setImage }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'jeannede',
            uploadPreset: 'product-image',
            folder: 'products'
        }, function (error, result) {
            if (!error && result && result.event === 'success') {
                setImage(result.info.secure_url)
            }
            // Handle the result or error here
        });
    }, []);

    return (
        <button
            className='border w-auto px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300'
            type='button'
            onClick={() => widgetRef.current.open()}
        >
            Upload Image
        </button>
    )
};

export default UploadWidget;
