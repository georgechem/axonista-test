import React, {useState, useEffect} from 'react';
import GistsNav from "./commponents/GistNav/GistsNav";
import GistsContent from "./commponents/GistContent/GistsContent";

import brand1 from './img/branding.png';

import './style.scss';
import GistPagination from "./commponents/GistPagination/GistPagination";


const App = () => {
    const [gists, setGists] = useState(null);
    const [sortingOrder, setSortingOrder] = useState('desc');
    const [sortingAttribute, setSortingAttribute] = useState('login');
    const [pageSize, setPageSize] = useState(2);

    const onSortingOrderChange = () => {
        const el = document.getElementsByClassName('gistNav__top__buttons__sortOrder')[0];
        if(sortingOrder === 'asc'){
            setSortingOrder( 'desc');
            el.classList.remove('rotate180deg');
        }else{
            setSortingOrder( 'asc');
            el.classList.add('rotate180deg');
        }
        sortGists();
    }

    const countAllPages = (gists) => {
        if(gists !== null){
            let numberOfPages = Math.floor(gists?.length / pageSize);
            const rest = gists?.length % pageSize;
            if(rest !== 0){
                numberOfPages++;
            }
            return numberOfPages;
        }
    }

    const sortGists = () => {
        const compareStrings = (a, b, type = sortingAttribute) => {
            let gistA = '';
            let gistB = '';
            if(sortingAttribute === 'login'){
                gistA = a.owner.login.toLowerCase();
                gistB = b.owner.login.toLowerCase();
            }else if(sortingAttribute === 'date'){
                gistA = a.updated_at;
                gistB = b.updated_at;
            }

            if(gistA < gistB){
                return -1;
            }
            if(gistA > gistB){
                return 1;
            }
            return 0;
        }
            if(sortingOrder === 'desc'){
                //gistsCopy.sort((a, b) => b.owner.id - a.owner.id);
                gists.sort((a,b) => compareStrings(a, b, sortingAttribute));

            }else{
                //gistsCopy.sort((a,b) => a.owner.id- b.owner.id);
                gists.sort((a, b) => compareStrings(b, a, sortingAttribute));
            }

        setGists(gists);


    }


    useEffect(()=>{

        fetch('https://api.github.com/gists/public?per_page=7',{
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setGists(data);
            })
            .catch(err => {
                console.log(err);
            });


    },[]);

    return (
        <div>
            <GistsNav
                gists={gists}
                onSortingOrderChange={onSortingOrderChange}

                sortingAttribute={sortingAttribute}
                setSortingAttribute={setSortingAttribute}
            />
            {gists?.map((gist, key) => <GistsContent
                key={'gistKey_' + key}
                gist={gist}
            />)}
        </div>
    );
};

export default App;