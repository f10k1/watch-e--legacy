import React, { ReactNode } from 'react';
import store from './store';
import { createRoot } from 'react-dom/client';

import Login from "./Login";
import Dashboard from "./dashboard";
import { Provider } from 'react-redux';

const initComponent = (Component: any, container: string, injectStore: boolean): void => {
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
                delete element.dataset[key];
            }
        });

        const root = createRoot(element);
        if (injectStore) root.render(<Provider store={store}><Component {...props} /></Provider>);
        else root.render(<Component {...props} />);
    });
};

initComponent(Login, '.react-login', true);
initComponent(Dashboard, '.react-dashboard', false);