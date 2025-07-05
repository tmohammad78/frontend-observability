import { useState } from 'react';

const ErrorThrower = () => {
    const [shouldThrow, setShouldThrow] = useState(false);

    if (shouldThrow) {
        throw new Error('This is a test error from component!');
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Error Test Component</h2>
            <button
                onClick={() => setShouldThrow(true)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                Throw Error
            </button>
        </div>
    );
};

export default ErrorThrower;