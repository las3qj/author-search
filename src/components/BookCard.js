import {Card, Button, Container, Row, Col} from 'react-bootstrap';

function BookCard ({book, onAction, buttonText, buttonVariant, children=null}) {
    return (
        <Card>
            <Card.Body>
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col>
                            <Row><h1>{book.title}</h1></Row>
                            <Row><h2>{book.author}</h2></Row>
                            <Row style={{paddingLeft: 40, paddingTop: 10}}>{children}</Row>
                        </Col>
                        <Col>
                            <Row  className="d-flex justify-content-end">
                                <img className="img" src={book.image}></img>
                            </Row>
                            <Row  className="d-flex justify-content-end">
                                <Button onClick={onAction} variant={buttonVariant} style={{marginTop: 10}}>
                                        {buttonText}
                                </Button> 
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

function LibraryCard ({book, onDelete, onFavorite}) {
    return <BookCard book={book} onAction={onDelete} buttonText="Remove from library" buttonVariant="outline-danger">
        <Button variant={(book.favorite==="true"?"":"outline-")+"info"} onClick={onFavorite}>
            {(book.favorite==="true"?"Unf":"F")+"avorite"}</Button>
    </BookCard>;
}

function SearchCard ({book, onAction, onNext, onPrev}) {
    return <BookCard book={book} onAction={onAction} style={{background: "lightgray"}}
        buttonText={book.local?"View in library":"Add to library"} buttonVariant={book.local?"outline-primary":"outline-success"}>
                <Button variant="outline-secondary"style={{marginRight: 20}} onClick={()=>onPrev()}>{"Prev"}</Button>
                <Button variant="outline-secondary" onClick={()=>onNext()}>{"Next"}</Button>
        </BookCard>
}

export {LibraryCard, SearchCard};