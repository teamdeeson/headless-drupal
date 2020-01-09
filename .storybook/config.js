import { configure } from '@storybook/react';

configure(require.context('../src/frontend', true, /\.stories\.js$/), module);
