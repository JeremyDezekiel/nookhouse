import React from 'react'

function LoadingPage() {
    return (
        <div className="flex justify-center items-center h-screen w-screen z-50 absolute top-0 left-0 right-0 bottom-0 bg-white">
            <div
                className="w-40 h-40 border-4 border-gray-500 border-dashed rounded-full animate-spin"
                style={{ animationDuration: '10s' }}>
            </div>
        </div>
    )
}

export default LoadingPage