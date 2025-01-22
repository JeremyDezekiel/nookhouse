import React, { useEffect, useRef } from 'react'

function UploadProfilePicture({ setProfilePicture }) {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'jeannede',
            uploadPreset: 'profile-picture',
            folder: 'profile-picture',
        }, function (error, result) {
            if (!error && result && result.event === 'success') {
                setProfilePicture(result.info.secure_url)
            }
            // Handle the result or error here
        })
    }, [])

    return (
        <button
            className={`border px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300`}
            type='button'
            onClick={() => widgetRef.current.open()}
        >
            Upload Profile Picture
        </button>
    )
}

export default UploadProfilePicture