import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "../App";
import GistPagination from "../commponents/GistPagination/GistPagination";
import {data} from "../data";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: ()=> Promise.resolve(data)
    })
);

afterEach(()=>cleanup);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GistPagination
        page={1}
        setPage={jest.fn()}
        perPage={10}
    />, div);
});

test('initial page is actually page 1', ()=>{
   const {getByTestId} = render(
       <GistPagination
           page={1}
           setPage={()=>jest.fn()}
           perPage={10}
       />);

   const page = getByTestId('pageValue');
   expect(page).toHaveTextContent('1');
});

test('page increments properly', ()=>{
    const {getByTestId} = render(
        <App>
            <GistPagination
                page={1}
                perPage={10}
                setPage={()=>jest.fn()}
            />
        </App>
        );

    const pageValue = getByTestId('pageValue');
    const nextPageEl = getByTestId('nextPage');
    expect(pageValue.textContent).toBe("1");
    fireEvent.click(nextPageEl);
    expect(pageValue.textContent).toBe("2");
});

test('page should not increments as limit exceeded', ()=>{
    const {getByTestId} = render(
        <App>
            <GistPagination
                page={1}
                perPage={10}
                setPage={()=>jest.fn()}
            />
        </App>
    );
    const pageValue = getByTestId('pageValue');
    const nextPageEl = getByTestId('nextPage');
    for(let i=1; i<300; i++){
        fireEvent.click(nextPageEl);
    }
    expect(pageValue.textContent).toBe("300");
    fireEvent.click(nextPageEl);
    expect(pageValue.textContent).toBe("300");
});

test('page decrements properly', ()=>{
    const {getByTestId} = render(
        <App>
            <GistPagination
                page={3}
                perPage={10}
                setPage={()=>jest.fn()}
            />
        </App>
    );
    const pageValue = getByTestId('pageValue');
    const prevPageEl = getByTestId('prevPage');
    const nextPageEl = getByTestId('nextPage');
    for(let i=1; i<3; i++){
        fireEvent.click(nextPageEl);
    }
    expect(pageValue.textContent).toBe("3");
    fireEvent.click(prevPageEl);
    expect(pageValue.textContent).toBe("2");
});

test('page should not decrement as current page is 1', ()=>{
    const {getByTestId} = render(
        <App>
            <GistPagination
                page={3}
                perPage={10}
                setPage={()=>jest.fn()}
            />
        </App>
    );
    const pageValue = getByTestId('pageValue');
    const prevPageEl = getByTestId('prevPage');

    expect(pageValue.textContent).toBe("1");
    fireEvent.click(prevPageEl);
    expect(pageValue.textContent).toBe("1");
});


test('matches Snapshot', () => {

    const tree = renderer.create(<GistPagination
        page={1}
        setPage={()=>jest.fn()}
        perPage={10}
    />).toJSON();

    expect(tree).toMatchSnapshot();
});