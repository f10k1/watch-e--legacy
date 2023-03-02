import React, { ReactNode } from 'react';
import store from './store'
import { createRoot } from 'react-dom/client';

import Login from "./Login"

const initComponent = (Component: any, container: string) => {
    const containers: NodeListOf<HTMLElement> = document.querySelectorAll(container);

    if (!containers.length) return;

    containers.forEach((element: HTMLElement) => {
        const props: any = {};

        Object.keys(element.dataset).forEach(key => {
            if (key.includes('react')) {
                const value = element.dataset[key];
                let prop = key.replace('react', '');
                prop = prop[0].toLowerCase() + prop.slice(1);
                props[prop] = value;
                delete element.dataset[key]
            }
        });
        const root = createRoot(element);

        root.render(<Component {...props} store={store} />);
    });
};

initComponent(Login, '.react-login')