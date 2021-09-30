import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import GistsNav from "../commponents/GistNav/GistsNav";
import {data} from "../data";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: ()=> Promise.resolve(data)
    })
);

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

test('initial sorting attribute is login and sorting attribute is working', ()=>{
    const {getByTestId} = render(
        <App>
            <GistsNav
                onBackSpaceClick={()=>jest.fn()}
                onInputChange={()=>jest.fn()}
                onSelectPerPage={()=>jest.fn()}
                onSortingAttributeChange={()=>jest.fn()}
                perPage={10}
                setSortingOrder={()=>jest.fn()}
                sortingOrder={{direction: 'desc'}}
                sortingAttribute={{}}
            />
        </App>
    );

    const sortingAttribute = getByTestId('nav-sortingAttribute');

    const navSortByDateSwitch = getByTestId('nav-sortByDateSwitch');
    const navSortByDescriptionSwitch = getByTestId('nav-sortByDescriptionSwitch');
    const navSortByLoginSwitch = getByTestId('nav-sortByLoginSwitch');

    expect(sortingAttribute.textContent).toBe('login');
    fireEvent.click(navSortByDateSwitch);
    expect(sortingAttribute.textContent).toBe('date');
    fireEvent.click(navSortByDescriptionSwitch);
    expect(sortingAttribute.textContent).toBe('description');
    fireEvent.click(navSortByLoginSwitch);
    expect(sortingAttribute.textContent).toBe('login');

});

test('select per page is 10', ()=>{
    const {getByTestId} = render(
        <App>
            <GistsNav
                onBackSpaceClick={()=>jest.fn()}
                onInputChange={()=>jest.fn()}
                onSelectPerPage={()=>jest.fn()}
                onSortingAttributeChange={()=>jest.fn()}
                perPage={10}
                setSortingOrder={()=>jest.fn()}
                sortingOrder={{direction: 'desc'}}
                sortingAttribute={{}}
            />
        </App>
    );

    const navOption10 = getByTestId('navOption10');

    expect(navOption10).toHaveAttribute('selected');
    expect(navOption10.textContent).toBe('10');

});