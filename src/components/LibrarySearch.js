import { useEffect, useState } from 'react';
import {Button, Row, Col} from 'react-bootstrap';

function LibrarySearch({books, setBooks}) {
    const [currSort, setCurrSort] = useState("None");

    const authorSort = (fE, sE) => {
        const index1 = fE.author.indexOf(" ")+1;
        const index2 = sE.author.indexOf(" ")+1;
        return sE.author.substr(index2) > fE.author.substr(index1)?1:-1;
    }

    const titleSort = (fE, sE) => {
        return sE.title > fE.title?1:-1;
    }

    useEffect(() => {
        console.log('sorting!!');
        const newBooks = books.slice();
        const dec = currSort.substr(3,1) === "D" ? 1 : -1;
        const funct = currSort.substr(0,2)==="Au"?authorSort:titleSort;
        newBooks.sort((fE, sE) => funct(fE, sE)*dec);
        setBooks(newBooks);

    }, [currSort])

    return(
        <Row style={{paddingLeft: 90, paddingRight: 90, margin: 20}}>
            <Col>
                <h5>Sort by..</h5>
            </Col>
            {["Author","Title"].map((propName) => {
                return(
                    <Col>
                        <SortingButton propName={propName} currSort={currSort} setCurrSort={setCurrSort}/>
                    </Col>
                )
            })}
        </Row>
    );
}

function SortingButton({propName, currSort, setCurrSort}) {
    return(
        <Button onClick={()=>setCurrSort(currSort.substr(0,2)!==propName.substr(0,2)?propName.substr(0,2)+"-I":
            currSort.substr(3,1)==="I"?propName.substr(0,2)+"-D":"None")}
            variant={currSort.substr(0,2)===propName.substr(0,2)?"secondary":"outline-secondary"}>
            {propName} {currSort===propName.substr(0,2)+"-I"?"^":currSort===propName.substr(0,2)+"-D"?"v":""}
        </Button>
    )
}

export default LibrarySearch;