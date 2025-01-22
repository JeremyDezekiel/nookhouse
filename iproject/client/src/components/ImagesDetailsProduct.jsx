import React from 'react'

function ImagesDetailsProduct({ image, idx, imageIdx, changeImage}) {
    return (
        <img key={idx}
            className={`size-8 md:size-14 xl:size-[75px] cursor-pointer border-black rounded-md p-1 ${imageIdx === idx ? 'border-2' : 'hover:border'}`}
            src={image}
            alt={`images-${idx}`}
            onClick={() => changeImage(idx)}
        />
    )
}

export default ImagesDetailsProduct