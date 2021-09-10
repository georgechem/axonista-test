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
        sortingAttribute={''}
        onSelectPerPage={jest.fn()}
        setSortingAttribute={jest.fn()}
        setGists={jest.fn()}
        gistsCopy={[]}
        onInputChange={jest.fn()}
        onSortingOrderChange={jest.fn()}
    />, div);
});

test('matches Snapshot', () => {

    const tree = renderer.create(<GistsNav
        sortingAttribute={''}
        onSelectPerPage={jest.fn()}
        setSortingAttribute={jest.fn()}
        setGists={jest.fn()}
        gistsCopy={[]}
        onInputChange={jest.fn()}
        onSortingOrderChange={jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();

});