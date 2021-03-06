import React, {useState, useEffect} from 'react';
import GistsNav from "./commponents/GistNav/GistsNav";
import GistsContent from "./commponents/GistContent/GistsContent";
import GistPagination from "./commponents/GistPagination/GistPagination";
import './style.scss';

const App = () => {
    const [ready, setReady] = useState(false);
    const [gists, setGists] = useState([]);
    const [gistsCopy, setGistsCopy] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [content, setContent] = useState('');
    const [sortingOrder, setSortingOrder] = useState({direction: 'desc'});
    const [sortingAttribute, setSortingAttribute] = useState({sortingCategory: 'login'});


    /**
     * Fetch data from Github API
     */
    useEffect(()=>{
        const url = `https://api.github.com/gists?page=${page}&per_page=${perPage}`;
        fetch(url,{
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                // Sort data after fetching
                if(!Array.isArray(data)) return;
                //console.log(data);
                const dataSorted = sortGists(true, data);
                setGists(dataSorted);
                setGistsCopy(dataSorted);
                // Set state that data are fetched and ready
                setReady(true);
            })
            .catch(err => {
                console.log(err);
            });
    },[page, perPage]);

    /**
     * Make sure one of button is pressed when application starts
     */
    useEffect(()=>{
        // Fire first soring indirectly by switching state
        onSortBy('sortByLoginSwitch');
    },[]);

    /**
     * Sort gists when:
     * - Fetched and ready (When app loads AND after page{Pagination element} or per page{Nav element} has changed)
     * - sorting order has changed (Nav element)
     * - sorting attribute has changed (Nav element)
     * - content of user input has changed (Nav element)
     */
    useEffect(()=>{
        // sort by chosen icon
        sortGists();
    }, [ready, sortingOrder, sortingAttribute, content]);


    /**
     * array of elements ID for all SortBy Switches in Nav
     * @type {string[]}
     */
    const allSwitches = ['sortByDateSwitch', 'sortByDescriptionSwitch', 'sortByLoginSwitch'];

    /**
     * Remove certain class from all SortBy buttons
     */
    const turnOfAllSwitches = () => {
        allSwitches.forEach((switchButton) => {
            const el = document?.getElementById(switchButton);
            if(el !== null){
                el.classList.remove('turnedOn');
            }
        })
    }

    /**
     * Restore all gists as user modifying input value
     * @param event
     */
    const onBackSpaceClick = (event) => {
        if(event.key === 'Backspace' || event.code === 'Backspace'){
            setGists(gistsCopy);
        }
    }

    /**
     * Handle every change of content in input element | text sortingByDate excluded
     * @param event
     */
    const onInputChange = (event) => {
        // if icon date selected do not sort with input text
        if(sortingAttribute.sortingCategory === 'date') return;
        setContent(event?.target?.value || '');
    }

    /**
     * Sorting attribute
     * ({sortingCategory: 'date'} | {sortingCategory: 'description'} | {sortingCategory: 'login'} )
     * @param e
     * @param state
     */
    const onSortingAttributeChange = (e, state) => {
        onSortBy(e.target.id);
        setSortingAttribute(state);
    }

    /**
     * Make button pressed by adding class
     * @param elementId
     */
    const onSortBy = (elementId) => {
        const el = document?.getElementById(elementId);
        if(el !== null){
            turnOfAllSwitches();
            el.classList.add('turnedOn');
        }
    }

    /**
     * Sorting gists by - LOGIN | DATE | DESCRIPTION and ASC | DESC
     */
    const sortGists = (fetchMode = false, data = []) => {
        let tmp =[];
        (!fetchMode) ? tmp = [...gistsCopy] : tmp = [...data];

        const compareStrings = (a, b) => {
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        }

        if(sortingOrder.direction === 'desc'){
            if(sortingAttribute.sortingCategory === 'login') tmp.sort((a, b) => compareStrings(a?.owner?.login?.toLowerCase(), b?.owner?.login?.toLowerCase()));
            if(sortingAttribute.sortingCategory === 'date') tmp.sort((a, b) => compareStrings(a?.updated_at, b?.updated_at));
            if(sortingAttribute.sortingCategory === 'description') tmp.sort((a, b) => compareStrings(a?.description?.toLowerCase(), b?.description?.toLowerCase()));
        }else{
            if(sortingAttribute.sortingCategory === 'login') tmp.sort((a, b) => compareStrings(b?.owner?.login?.toLowerCase(), a?.owner?.login?.toLowerCase()));
            if(sortingAttribute.sortingCategory === 'date') tmp.sort((a, b) => compareStrings(b?.updated_at, a?.updated_at));
            if(sortingAttribute.sortingCategory === 'description') tmp.sort((a, b) => compareStrings(b?.description?.toLowerCase(), a?.description?.toLowerCase()));
        }
        if(fetchMode) return tmp;

        let findings = [];
        if(sortingAttribute.sortingCategory === 'login') findings = tmp.filter(gist => (gist?.owner?.login?.toLowerCase().search(content) !== -1));
        else if(sortingAttribute.sortingCategory === 'description') findings = tmp.filter(gist => gist?.description?.toLowerCase().search(content) !== -1);
        else findings = tmp.filter(gist => true);

        setGists(findings);
    }

    /**
     * Set elements per Page
     */
    const onSelectPerPage = (e) => {
        console.log(e.target.options);
        const options = e.target.options;
        const index = e.target.options.selectedIndex;
        const value = parseInt(options[index].value) | 1;
        setPerPage(value);
    }

    return (
        <div>
            <GistsNav
                perPage={perPage}
                onSortingAttributeChange={onSortingAttributeChange}
                onInputChange={onInputChange}
                onBackSpaceClick={onBackSpaceClick}
                onSelectPerPage={onSelectPerPage}
                sortingOrder={sortingOrder} setSortingOrder={setSortingOrder}
                sortingAttribute={sortingAttribute}
            />
            {gists?.map((gist, key) => <GistsContent
                key={'gistKey_' + key}
                gist={gist}
            />)}
            <GistPagination
                page={page}
                setPage={setPage}
                perPage={perPage}
            />
        </div>
    );
};

export default App;