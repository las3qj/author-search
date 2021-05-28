import { useEffect, useState } from 'react';
import {LibraryCard} from './BookCard';
import LibrarySearch from './LibrarySearch';
import {Container} from 'react-bootstrap';

function LibraryDash() {
    const [books, setBooks] = useState([]);
    const [changes, setChanges] = useState(true);

    useEffect(() => {
        if(changes) {
            console.log('refreshing');
            const url = new URL("http://localhost:8000/library");
            fetch(url).then(resp => resp.json()).then(books => {
                setBooks(books);
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

    return(
        <Container>
            <LibrarySearch books={books} setBooks={setBooks}/>
            {books.map((book, index) => 
                <LibraryCard book={book} onDelete={() => handleDelete(index)}></LibraryCard>
            )}
        </Container>

    );

}

export default LibraryDash;