import { useState } from 'react';
import {Container, InputGroup, FormControl, Button, Row} from 'react-bootstrap';
import BookCarousel from './BookCarousel';

function SearchDash() {
    const [input, setInput] = useState("");
    const [searches, setSearches] = useState([]);
    const [numSearches, setNumSearches] = useState(3);

    const query = async () => {
        const title = input;
        const url = new URL("http://localhost:8000/search");
        url.searchParams.append("title", title);
        setInput("");
        fetch(url).then(resp => resp.json()).then(resp => {
            const books = resp.books;
            console.log(resp);
            const newSearches = [books].concat(searches);
            setSearches(newSearches);
            /*
            if(resp.local) {
                const index = books.findIndex(b => b.id === resp.book.id);
                if(index > 0) {
                    books.splice(index, 1);
                    books.splice(0, 0, resp.book);
                }
                const newSearches = [{...resp.book, local: true}].concat(searches);
                setSearches(newSearches);
            }
            else {
                //const res = resp.books[0].volumeInfo;
                //const newSearches = [{title: res.title, author: res.authors[0], local: false}].concat(searches);
                const newSearches = [{local: false, books: resp.books}].concat(searches);
                setSearches(newSearches);
            }
            */

        });
    }

    const handleAdd = async (index1, index2) => {
        const book = searches[index1][index2];
        const url = new URL("http://localhost:8000/search");
        url.searchParams.append("title", book.title);
        url.searchParams.append("author", book.author);
        url.searchParams.append("image", book.image);
        url.searchParams.append("id", book.id);
        fetch(url, {method: 'POST'});
        const newSearches = searches.slice();
        book.local = true;
        newSearches[index1][index2] = book;
        setSearches(newSearches);
    }

    return(
        <Container style={{paddingRight: 250, paddingLeft: 250, paddingTop: 150, paddingBottom: 50}}>
            <h1 style={{paddingBottom: 50}}> Book search </h1>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => {
                            if(e.keyCode === 13) {
                                query();
                                e.preventDefault();
                            }
                        }}
                        placeholder="Book title"
                        aria-label="Book title"
                        aria-describedby="basic-addon1"
                    />
                    <Button onClick={query} style={{marginLeft: 10}}> Search </Button>
                </InputGroup>
            </Row>
            <Row style={{justifyContent: "flex-end", marginBottom: 10}}>    
                <Button variant="secondary" onClick={()=>setSearches([])}> Clear History</Button>
            </Row>
            {searches.length>0 && searches.slice(0,Math.min(searches.length, numSearches)).map((books, index1) => {
                return <BookCarousel books={books} onAdd={index2 => handleAdd(index1, index2)}></BookCarousel>;
            })}
            <Row style={{marginTop: 10, justifyContent: "center"}}>
            {searches.length > numSearches && <Button variant="secondary" onClick={()=>setNumSearches(numSearches+3)}>
                Show more searches</Button>
            }
            </Row>

        </Container>
    );
}

export default SearchDash;