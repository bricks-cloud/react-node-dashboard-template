import { useQuery } from 'react-query';
import { testGet } from '../api/http/api';

export const queryIds = {
    useTest: () => ['bricks', 'test'],
};

export const useTestGet = () => {
    const queryId = queryIds.useTest();

    return useQuery(queryId, () => testGet('rena'));
};