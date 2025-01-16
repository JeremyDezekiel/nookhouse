import React from 'react'

function ImagesAddProduct({ image , index, handleDeleteImage }) {
    return (
        <div className='relative'>
            <button
                className='text-white text-lg absolute border px-4 m-2 rounded-md opacity-75 right-0 bg-red-500 hover:bg-red-400'
                onClick={() => handleDeleteImage(index)}
            >
                -
            </button>
            <img 
                className='p-2 rounded-md border border-dashed' 
                src={image} 
                alt={`image-${index}`} 
            />
        </div>
    )
}

export default ImagesAddProduct