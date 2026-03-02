import { useEffect } from 'react';

export const useScrollToElement = (elementId, options = { behavior: 'smooth' }, dependencies = []) => {
    useEffect(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView(options);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};
