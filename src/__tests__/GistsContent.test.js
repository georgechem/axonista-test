import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import GistsContent from "../commponents/GistContent/GistsContent";


afterEach(cleanup);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GistsContent
        gist={{}}/>, div);
});

test('matches Snapshot', () => {

    const tree = renderer.create(<GistsContent
        gist={{}}/>).toJSON();

    expect(tree).toMatchSnapshot();

});