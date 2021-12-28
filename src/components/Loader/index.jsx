import React from 'react'

const Loader = () => {
    return (
        <div class="border d-flex align-items-center justify-content-center"
            style={
                {height: "500px"}
        }>
            <div class="spinner-border"
                style={
                    {
                        width: "8rem",
                        height: "8rem"
                    }
                }
                role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
