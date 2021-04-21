import React, { useEffect, useState } from "react";
import { GetListBookAdmin } from "./BookService/getlistBook"
import { Link } from "react-router-dom";
import axios from "axios";




let OnDelete = (id: number) => {
    var x = window.confirm("Are you sure you want to delete?");
    if (x) {
        axios.delete("https://localhost:5001/api/Book/" + id)
            .then(
                (res) => {
                    if (!(res.status === 200)) {
                        alert("Delete book failed!")
                    }
                    else {
                        alert("Delete book successfully!");
                    }
                }
            );
        return true;
    }
    else
        return false;

}

export function ListBookAdmin() {
    const [book, setBook]: [any, any] = useState([]);
    useEffect(() => {
        GetListBookAdmin().then(data => {
            setBook(data.data);
        });
    }, []);

    return (
        // <div className="container ">
        //     <div className="row " >
        //         {book &&
        //             book.length > 0 &&
        //             book.map((p: any) => (

        //                 <div className="col-md-4 book ">
        //                     <div>
        //                         <img className="imgBook" src={p.image} alt="Card image cap" />
        //                         <div >
        //                             <h5 > {p.title}</h5>
        //                             <h6 > {p.author}</h6>
        //                             <h6> ID : {p.bookId}</h6>

        //                             {/* <div>{p.description}</div> */}
        //                             <Link className="btn btn-success" to={`/detailbook/${p.bookId}`}>Detail</Link>
        //                             {/* <Link className="btn btn-primary" to={`/editbook/${p.bookId}`}>Edit</Link>
        //                             <button className="btn btn-danger" onClick={() => { OnDelete(p.bookId) }}>Delete</button> */}
        //                         </div>
        //                     </div>

        //                 </div>


        //             ))}
        //     </div>
        // </div>
        <div className="container-fluid">
             <Link className="btn btn-info btnAddBook" to="/addbook">Add Book</Link> 
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category ID</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {book &&
                        book.length > 0 &&
                        book.map((p: any) => (
                            <tr>
                                <th key={p.bookId} scope="row">{p.bookId}</th>
                                <td>{p.title}</td>
                                <td>{p.author}</td>
                                <td><img className="tableImg" src={p.image} alt="" /></td>
                                <td>{p.categoryId}</td>
                                <td>{p.description}</td>
                                <td></td>
                                <td>
                                    <Link className="btn btn-success btnTB" to={`/detailbook/${p.bookId}`}>Detail</Link>
                                    <Link className="btn btn-primary btnTB" to={`/editbook/${p.bookId}`}>Edit</Link>
                                    <button className="btn btn-danger btnTB" onClick={() => { OnDelete(p.bookId) }}>Delete</button>
                                </td>

                            </tr>
                        ))}
                    {/* {listPro.err && <p>Something went wrong!</p>} */}

                </tbody>
            </table>
        </div>
    )
}