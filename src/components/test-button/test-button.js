import React from 'react';
import { useTestGet } from '../../query/query';

export const TestButton = () => {
    const { refetch } = useTestGet({ refetchOnMount: false, retry: false });

    return <button onClick={() => refetch()}>Test</button>
};

export default TestButton;