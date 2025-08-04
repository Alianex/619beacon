
import React, { useState } from 'react';
import { submitFeedback } from '../services/geminiService';

const Feedback: React.FC = () => {
    const [feedbackType, setFeedbackType] = useState('General');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) {
            setError("Please enter a message before submitting.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await submitFeedback(feedbackType, message);
            setSuccess("Thank you! Your feedback has been successfully submitted. We appreciate you helping us improve.");
            setMessage('');
            setFeedbackType('General');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Submit Feedback</h2>
            <p className="text-gray-600 mb-8">
                Have a suggestion, found an error, or want to suggest a new service? Let us know!
            </p>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
                {success && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6" role="alert">
                        <p className="font-bold">Success</p>
                        <p>{success}</p>
                    </div>
                )}
                {error && (
                     <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="feedback-type" className="block text-sm font-medium text-gray-700 mb-2">
                                Type of Feedback
                            </label>
                            <select
                                id="feedback-type"
                                name="feedback-type"
                                value={feedbackType}
                                onChange={(e) => setFeedbackType(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md shadow-sm"
                            >
                                <option>General</option>
                                <option value="Bug Report">Report a Bug</option>
                                <option value="Feature Request">Suggest a New Feature</option>
                                <option value="Data Correction">Suggest a Service Update</option>
                                <option value="Compliment">Compliment</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                placeholder="Please provide as much detail as possible..."
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || !message.trim()}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    'Submit Feedback'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
