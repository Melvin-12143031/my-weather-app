import React from 'react'

const Loading = () => {
    return (
        <div className="loading">
            <div className="spinner"></div>

            <div className="loading-content">
                <strong>Getting the latest weather...</strong>

                <span>Please wait a moment.</span>
            </div>
        </div>
    )
}

export default Loading
