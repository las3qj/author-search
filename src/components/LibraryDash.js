import { useEffect, useState } from 'react';
import {LibraryCard} from './BookCard';
import LibrarySearch from './LibrarySearch';
import {Container, Row, Col, Tab, Tabs} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function LibraryDash() {
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [active, setActive] = useState("All");
    const [changes, setChanges] = useState(true);

    useEffect(() => {
        if(changes) {
            console.log('refreshing');
            const url = new URL("http://localhost:8000/library");
            fetch(url).then(resp => resp.json()).then(books => {
                const newFavorites = [];
                books.forEach(book => {
                    if(book.favorite==="true"){
                        newFavorites.push(book);
                    }
                });
                if(newFavorites.length===0 && active==="Favorites") {
                    setActive("All");
                }
                setBooks(books);
                setFavorites(newFavorites);
                setChanges(false);
            });
        }
    }, [changes]);    

    const handleDelete = async (index) => {
        const id = books[index].id;
        const url = new URL("http://localhost:8000/library");
        url.searchParams.append("id", id);
        fetch(url, {method: 'DELETE'}).then(resp => setChanges(true));
        const newBooks = books.slice(); 
        newBooks.splice(index, 1);
        setBooks(newBooks);
    }

    const handleFavorite = async (id) => {        
        const newBooks = books.slice();
        const newFavorites = favorites.slice();
        const bIndex = newBooks.findIndex(nB => nB.id === id);
        const book = newBooks[bIndex];
        const favorite = book.favorite==="true"?"false":"true";

        const url = new URL("http://localhost:8000/library");
        url.searchParams.append("title", book.title);
        url.searchParams.append("author", book.author);
        url.searchParams.append("image", book.image);
        url.searchParams.append("favorite", favorite);
        url.searchParams.append("id", book.id);
        fetch(url, {method: 'PUT'}).then(resp => setChanges(true));

        book.favorite = favorite;
        if(favorite==="false") {
            const fIndex = newFavorites.findIndex(f => f.id === book.id);
            console.log(fIndex);
            newFavorites.splice(fIndex, 1);
        }
        else{ 
            newFavorites.push(book);
        }
        newBooks[bIndex] = book;
        setBooks(newBooks);
        setFavorites(newFavorites);
    }




    return(
        <Container>
            <h1 style={{marginTop: 20}}>Welcome to Your Library!</h1>
            <LibrarySearch books={active==="All"?books:favorites} setBooks={active==="All"?setBooks:setFavorites}/>
            <Tabs
                id="library tabs"
                activeKey={active}
                onSelect={(k) => setActive(k)}
                >
                <Tab eventKey="All" title="All books">
                    {books.length === 0 && <h2 style={{marginTop: 30}}>You don't have any books yet; <Link to="/search">find a few!</Link></h2>}
                    <Row>
                        <Col>
                            {books.map((book, index) => 
                                    index%2===0&&<LibraryCard book={book} onDelete={() => handleDelete(index)} 
                                        onFavorite={() => handleFavorite(book.id)}/>
                            )}
                        </Col>
                        <Col>
                            {books.map((book, index) => 
                                    index%2===1&&<LibraryCard book={book} onDelete={() => handleDelete(index)} 
                                    onFavorite={() => handleFavorite(book.id)}/>
                            )}
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="Favorites" title="Favorites" disabled={favorites.length===0}>
                    <Row style={{paddingBottom: 30}}>
                        <Col>
                            {favorites.map((book, index) => 
                                    index%2===0&&<LibraryCard book={book} onDelete={() => handleDelete(index)} 
                                        onFavorite={() => handleFavorite(book.id)}/>
                            )}
                        </Col>
                        <Col>
                            {favorites.map((book, index) => 
                                    index%2===1&&<LibraryCard book={book} onDelete={() => handleDelete(index)} 
                                    onFavorite={() => handleFavorite(book.id)}/>
                            )}
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>

    );

}

export default LibraryDash;