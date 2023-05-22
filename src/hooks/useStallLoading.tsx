import {useDebouncedState} from '@mantine/hooks';
import {useEffect} from 'react';

export default function useStallLoading(debounce: number) {
    const [loaded, setLoaded] = useDebouncedState(false, debounce);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return loaded;
}