import React, { useEffect, useState } from "react";
import { GetListBook } from "./BookService/getlistBook"
import { Link } from "react-router-dom";
import axios from "axios";






export function ListBook() {
    const [book, setBook]: [any, any] = useState([]);
    useEffect(() => {
        GetListBook().then(data => {
            setBook(data.data);
        });
    }, []);

    return (
        <div className="container ">
            <div className="row " >
                {book &&
                    book.length > 0 &&
                    book.map((p: any) => (

                        <div className="col-md-4 book ">
                            <div>
                                <img className="imgBook" src={p.image} alt="Card image cap" />
                                <div >
                                    <h5 > {p.title}</h5>
                                    <h6 > {p.author}</h6>
                                    <h6> ID : {p.bookId}</h6>

                                    {/* <div>{p.description}</div> */}
                                    <Link className="btn btn-success" to={`/detailbook/${p.bookId}`}>Detail</Link>
                                    {/* <Link className="btn btn-primary" to={`/editbook/${p.bookId}`}>Edit</Link>
                                    <button className="btn btn-danger" onClick={() => { OnDelete(p.bookId) }}>Delete</button> */}
                                </div>
                            </div>

                        </div>


                    ))}
            </div>
        </div>

        // <table className="table table-hover">
        //     <thead>
        //         <tr>
        //         <th scope="col">ID</th>
        //         <th scope="col">Title</th>
        //         <th scope="col">Author</th>
        //         <th scope="col">Image</th>
        //         <th scope="col">Category ID</th>
        //         <th scope="col">Description</th>
        //         <th scope ="col"></th>
        //         <th scope ="col"></th>

        //         </tr>
        //     </thead>
        //     <tbody>
        //     {book &&
        //             book.length > 0 &&
        //             book.map((p: any) => (
        //                 <tr>
        //                 <th key={p.bookId} scope="row">{p.bookId}</th>
        //                 <td>{p.title}</td>
        //                 <td>{p.author}</td>
        //                 <td>{p.image}</td>
        //                 <td>{p.categoryId}</td>
        //                 <td>{p.description}</td>
        //                 <td> <Link to={`/detailbook/${p.bookId}`}>Detail</Link></td>
        //                 <td> <Link to={`/editproduct/${p.bookId}`}>Edit</Link></td>
        //                 </tr>
        //         ))}
        //         {/* {listPro.err && <p>Something went wrong!</p>} */}

        //     </tbody>
        // </table>

    )
}