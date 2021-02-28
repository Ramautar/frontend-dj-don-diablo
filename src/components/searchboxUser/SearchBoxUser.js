import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import './SearchBoxUser.css';


function SearchBoxUser({users, setSelectedUser}){

    const [queryByUsername, setQueryByUsername] = useState("");
    const [searchColumns] = useState(["username"]);
    const [pageNumber, setPageNumber] = useState(0);
    const [filteredUsername, setFilteredUsername] = useState([]);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(users.length/usersPerPage);

    const changePage = ({selected})=>{
        setPageNumber(selected);
    }

    useEffect(()=>{
        const listOfSelectedUser =[];
        searchUsername(users).map((user)=>listOfSelectedUser.push(user));
        showUsernameList(listOfSelectedUser)
    },[queryByUsername])

    function searchUsername(rows){
        return rows.filter((row) => searchColumns.some((column)=>row[column]
                .toString()
                .toLowerCase()
                .indexOf(queryByUsername.toLowerCase())>-1)
        )}

    function showUsernameList(listOfSelectedUser){
        const showList = listOfSelectedUser
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((user, index) => {
            return(
                <div key={index}>
                    <input
                        className='user-radio-button'
                        id={user.id}
                        type='radio'
                        name='searchUser'
                        value={user.username}
                        onChange={(event)=>setSelectedUser(event.target.value)}
                    />
                    <label htmlFor={user.id}>
                        {user.username}
                    </label>
                </div>
            )
        })
        setFilteredUsername(showList)
    }


    return(
        <div className='user-search'>
            <div className='user-search-bar'>
                <h3 className='select-user-title'>Select User</h3>
                <input
                    className='user-search-input'
                    type='text'
                    placeholder='Search by username.....'
                    value={queryByUsername}
                    onChange={(e) => setQueryByUsername(e.target.value)}
                />
            </div>
            <div className='list-of-allUsers'>
                {filteredUsername.length > 0 && filteredUsername}
            </div>
            <div className='user-paginate'>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    setResetPaginationToggle
                />
            </div>
        </div>
    )
}

export default SearchBoxUser;
