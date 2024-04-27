import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
function List() {

    const [list, setList] = useState([])
    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(1)

    const Pagination = () => (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1rem',
            width: '100%',

        }}>

            <button style={{
                // background:'',
                // color:'#fff',
                padding: '0.8rem',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                borderColor: 'none',
                borderRadius: '10rem'
            }} onClick={handlePrevPage} disabled={page === 1}>
                Previous
            </button>
            <span>{page}</span>
            <button style={{
                // background:,
                // color:'#fff',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                padding: '0.8rem',
                borderColor: 'none',
                borderRadius: '10rem'
            }} onClick={handleNextPage}>Next</button>
            {/* Page: {page} */}
        </div>
    );

    const getList = async () => {
        const url = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2013-01-01,2024-03-25&platforms=187,18,4&page=${page}&page_size=${pageSize}`;
        console.log("api url: ", url)
        const api = await fetch(url)
        const data = await api.json()
        console.log("api response: ", data)
        localStorage.setItem('list', JSON.stringify(data.results || []))
        setList(data.results || [])
    }
    useEffect(() => {
        getList();
    }, [page, pageSize])

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1); // Reset page to 1 when changing page size
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: "0em 20em", justifyContent: "center", alignItems: "center" }}>
            <h2 style={{ width: '100%', position: "relative", right: "115px" }}>Popular Games</h2>
            <Wrapper>

                {list.map((items) => {
                    return (
                        <Card key={items.id}>

                            <img src={items.background_image} priority alt={items.name} />
                            <p>{items.name}</p>
                        </Card>
                    )
                })}
                {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    Page Size:
                    <select value={pageSize} onChange={handlePageSizeChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select> */}
                {/* </div> */}
            </Wrapper>
            <Pagination />
        </div>
    )
}
const Wrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4,1fr);
    /* flex-wrap: wrap; */
    justify-content: center;
    align-items: center;
`
const Card = styled.div`
    display: flex;
    margin: 1rem;
    height: 300px;
    width: 200px;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    img {
    border-radius: 2rem;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    left: 0;
    
}
  p {
    display:flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    z-index: 10;
    left: 0%;
    bottom: 5%;
    padding: 10px 0 ;
    transform: translate(0%, -50%);
    color: #ffffff;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 0.8rem;
  }
`
export default List


