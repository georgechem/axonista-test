import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import GistsNav from "../commponents/GistNav/GistsNav";

afterEach(cleanup);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GistsNav
        perPage={5}
        onSortingAttributeChange={jest.fn()}
        onInputChange={jest.fn()}
        onBackSpaceClick={jest.fn()}
        onSelectPerPage={jest.fn()}
        sortingOrder={{}}
        setSortingOrder={jest.fn()}
    />, div);
});

test('matches Snapshot', () => {

    const tree = renderer.create(<GistsNav
        perPage={5}
        onSortingAttributeChange={jest.fn()}
        onInputChange={jest.fn()}
        onBackSpaceClick={jest.fn()}
        onSelectPerPage={jest.fn()}
        sortingOrder={{}}
        setSortingOrder={jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();

});