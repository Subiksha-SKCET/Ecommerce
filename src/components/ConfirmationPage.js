import React from 'react';
import './ConfirmationPage.css'; 

const ConfirmationPage = () => {
    return (
        <div className="confirmation-container">
            <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
            <dotlottie-player  
                src="https://lottie.host/c1edfde5-b420-418c-84b8-00d13971b8ed/E7YQi27U0z.json" 
                background="transparent" 
                speed="1" 
                style={{ width: '300px', height: '300px' }} 
                loop 
                autoplay>
            </dotlottie-player>
        </div>
    );
};

export default ConfirmationPage;
