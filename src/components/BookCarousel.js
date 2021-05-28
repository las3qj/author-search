import { useState } from "react";
import {Carousel} from 'react-bootstrap';
import {SearchCard} from './BookCard';
import { useHistory } from 'react-router-dom';

function BookCarousel ({books, onAdd}) {
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => setIndex(selectedIndex);
    const handleNext = index => {
        if(index+1 >= books.length){
            setIndex(0);
            return;
        }
        setIndex(index+1);
    }
    const handlePrev = index => {
        if(index-1 < 0){
            setIndex(books.length - 1);
            return;
        }
        setIndex(index-1);
    }

    return(
        <Carousel controls={false} indicators={false} interval={null} activeIndex={index} onSelect={handleSelect}>
            {books.map((book, index2) => 
                <Carousel.Item>
                    <SearchCard book={book} onAction={book.local?() => history.push('/'):() => onAdd(index2)} 
                        onNext={()=>handleNext(index2)} onPrev={()=>handlePrev(index2)}/>
                </Carousel.Item>
            )}
        </Carousel>
    );

}

export default BookCarousel;