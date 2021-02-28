import React, {useEffect,useState} from 'react';
import './SearchBox.css';


function SearchBox({allDemos, searchDemo, currentDemo, setPageNumber}) {

    const [queryByUsername, setQueryByUsername] = useState("");
    const [queryBySelection, setQueryBySelection] = useState("")
    const [filteredBySelection, setFilteredBySelection] = useState(allDemos);
    const [searchColumns] = useState(["username","status"]);

    useEffect(()=>{
        const listOfSelectedDemos =[];
        setQueryByUsername("")
        searchSelection(allDemos).map((demo)=>listOfSelectedDemos.push(demo));
        setFilteredBySelection(listOfSelectedDemos);
        displayList(listOfSelectedDemos);
    },[queryBySelection])

    useEffect(()=> {
        const listOfSelectedDemos =[];
        searchUsername(filteredBySelection).map((demo)=>listOfSelectedDemos.push(demo));
        displayList(listOfSelectedDemos);
    },[queryByUsername])

    function searchSelection(rows){
        return rows.filter(row =>
            searchColumns.some((column)=>row[column]
                .toString()
                .toLowerCase()
                .indexOf(queryBySelection.toLowerCase())>-1)
        )}

    function searchUsername(rows){
        return rows.filter(row =>
            searchColumns.some((column)=>row[column]
                .toString()
                .toLowerCase()
                .indexOf(queryByUsername.toLowerCase())>-1)
        )}

    function displayList(listOfSelectedDemos){
        searchDemo(listOfSelectedDemos);
        currentDemo(null);
        setPageNumber(0);
    }

    return (
        <div className="searchbar-container">
            <input
                className='searchbar-input'
                type='text'
                placeholder='Search by username.....'
                value={queryByUsername}
                onChange={(e) => setQueryByUsername(e.target.value)}
            />
            <div className='searchbar-radio-button'>
                <input type="radio"
                       value="pending"
                       name="status"
                       onChange={event => setQueryBySelection(event.target.value)}
                /> Pending
                <input type="radio"
                       value="reviewed"
                       name="status"
                       onChange={event => setQueryBySelection(event.target.value)}
                /> Reviewed
                <input type="radio"
                       value=""
                       name="status"
                       onChange={event => setQueryBySelection(event.target.value)}
                       checked={queryBySelection===""}
                /> All
            </div>
        </div>
    );
}

export default SearchBox;
