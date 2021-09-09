import React from 'react';
import renderer from 'react-test-renderer';
import {cleanup, fireEvent, queryByDisplayValue, render} from '@testing-library/react';
import GistPagination from "../commponents/GistPagination/GistPagination";

afterEach(cleanup);

it('GistPagination changing Pages after click on onNextPageClick', ()=>{

    const component = renderer.create(
        <GistPagination onNextPageClick={()=>{}} page={1} onPrevPageClick={()=>{}}/>
    );


});