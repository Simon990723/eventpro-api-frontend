import { useEffect, useState } from 'react';

/**
 * React hook that subscribes to a CSS media query and returns whether it currently matches.
 * Falls back safely during server-side rendering by assuming the query does not match.
 */
const useMediaQuery = (query: string): boolean => {
    const getInitialMatch = () => {
        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
            return false;
        }

        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState<boolean>(getInitialMatch);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
            return undefined;
        }

        const mediaQueryList = window.matchMedia(query);
        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        setMatches(mediaQueryList.matches);

        if (typeof mediaQueryList.addEventListener === 'function') {
            mediaQueryList.addEventListener('change', listener);
            return () => {
                mediaQueryList.removeEventListener('change', listener);
            };
        }

        mediaQueryList.addListener(listener);
        return () => {
            mediaQueryList.removeListener(listener);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
