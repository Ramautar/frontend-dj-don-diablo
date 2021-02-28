import React, {useState,useEffect} from 'react';
import './SongList.css';
import SongListItem from "../songListItem/SongListItem";
import ReactPaginate from 'react-paginate';

function SongList({demos, selectedDemo, pageNumber, setPageNumber}){
    const [selectSong, setSelectSong] = useState();
    // const [pageNumber, setPageNumber] = useState(0);

    const demosPerPage = 5;
    const pagesVisited = pageNumber * demosPerPage;
    const pageCount = Math.ceil(demos.length/demosPerPage);

    const changePage = ({selected})=>{
        setPageNumber(selected);
    }


    useEffect(()=>{
        selectedDemo(selectSong - 1);
    },[selectSong])


    const songList = demos
        .slice(pagesVisited, pagesVisited + demosPerPage)
        .map((item, i)=> {
            return (
                <li key={i} className='song-list-component'>
                    <SongListItem
                        item={item}
                        setSelectSong={setSelectSong}
                        selectSong={selectSong}
                        demoURL={demos[(pageNumber)*demosPerPage+ i].demoURL}
                        index = {(pageNumber)*demosPerPage+ i + 1}
                    />
                </li>
            )
        })

    return(
        <div className='song-list'>
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
            {songList}
            {demos.length === 0 && <h1 className='my-demo-empty'> {'< '}Your List is Empty{' >'}</h1>}
        </div>
    )
}

export default SongList;
