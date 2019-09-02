import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Layout from './Layout';

describe('Layout', () => {

    it('should render fine', () => {
        const component = shallow(<Layout />);
        expect(toJSON(component)).toMatchSnapshot();
    });

    it('should render a header', () => {
        const component = shallow(<Layout />);

        expect(component.find('Header')).toHaveLength(1);
    });

    it('should render a footer', () => {
        const component = shallow(<Layout />);

        expect(component.find('Footer')).toHaveLength(1);
    });
});