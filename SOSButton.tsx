
import React, { useState } from 'react';

const SOSButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-red-600 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                aria-label="Emergency SOS"
            >
                SOS
            </button>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
                    aria-labelledby="sos-modal-title"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setIsModalOpen(false)} // Close on overlay click
                >
                    <div 
                        className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center"
                        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <h2 id="sos-modal-title" className="text-2xl font-bold text-red-600">
                            Emergency Assistance
                        </h2>
                        <p className="mt-2 text-gray-600">
                            You are about to contact 911. Only use this for genuine emergencies.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                aria-label="Cancel emergency call"
                            >
                                Cancel
                            </button>
                            <a
                                href="tel:911"
                                className="w-full inline-flex items-center justify-center px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                aria-label="Confirm and call 911"
                            >
                                Call 911
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SOSButton;
