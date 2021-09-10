import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import GistPagination from "../commponents/GistPagination/GistPagination";

afterEach(cleanup);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GistPagination
        onNextPageClick={jest.fn()}
        page={1}
        onPrevPageClick={jest.fn()}/>, div);
});

test('calls click on Next and Prev', () => {
    const onNextPageClick = jest.fn();
    const onPrevPageClick = jest.fn();
    render(<GistPagination
        onNextPageClick={onNextPageClick}
        page={1}
        onPrevPageClick={onPrevPageClick}
    />);
    fireEvent.click(screen.getByText(/next/i));
    expect(onNextPageClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText(/prev/i));
    expect(onPrevPageClick).toHaveBeenCalledTimes(1);
});

test('matches Snapshot', () => {

    const tree = renderer.create(<GistPagination
        onPrevPageClick={jest.fn()}
        page={1}
        onNextPageClick={jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();


})