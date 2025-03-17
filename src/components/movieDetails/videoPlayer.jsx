import React from 'react';

export default function VideoPlayer({video}) {
    if (!video) {
        console.error('No video provided to VideoPlayer');
        return (
            <div className="video-placeholder">
                <p>No trailer available for this movie.</p>
            </div>
        );
    }
    return (
        <iframe
            className="w-full
                h-80 md:h-150 lg:h-180
                min-h-[350px]"

            src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}

            title="Movie Trailer"
            frameBorder="0"

            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"

            allowFullScreen
        >

        </iframe>
    );
}