import React, { ReactNode } from 'react';
import { render } from 'react-dom'
import store from './store'

const initComponent = (Component: any, container: string) => {
    const containers = document.querySelectorAll(container);

    if (!containers.length) return;

    (containers as NodeListOf<HTMLElement>).forEach((element: HTMLElement) => {
        const props: any = {};

        Object.keys(element.dataset).forEach(key => {
            if (key.includes('react')) {
                const value = element.dataset[key];
                let prop = key.replace('react', '');
                prop = prop[0].toLowerCase() + prop.slice(-1);
                props[prop] = value;
            }
        });

        render(<Component {...props} store={store} />, element);
    });
};
