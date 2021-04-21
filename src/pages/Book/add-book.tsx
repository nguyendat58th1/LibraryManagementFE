import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

type IFormInput = {
  title: string;
  author: string;
  image: string;
  categoryId: number,
  description: string

}

export function AddBook() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      axios
        .get("https://localhost:5001/api/Category")
        .then((res) => res.data)
        .then((data) => {
          setCategory(data);
        })
        .catch((err) => setError(err));
    })();
  }, []);
  async function onSubmit (data: IFormInput)  {
     const Book = {
      title: data.title,
      author: data.author,
      image: data.image,
      categoryId: data.categoryId,
      description: data.description
    };
    try {
      await axios.post("https://localhost:5001/api/Book", Book);
      const res = await axios.get("https://localhost:5001/api/Book");
      const data = res.data;
      setBook(data);
      alert('Success');
    } catch (err) {
      setError(err);
    }
  }
  
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input {...register("title", { required: true })}  className="form-control" id="exampleFormControlInput1" placeholder="" />
        {errors?.title?.type === "required" && <p>This field is required</p>}
        
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Author</label>
        <input {...register("author", { required: true })}  className="form-control" id="exampleFormControlInput1" placeholder="" />
        {errors?.title?.type === "required" && <p>This field is required</p>}
        
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Category </label>
        <select  {...register("categoryId")} className="form-control" id="exampleFormControlSelect1">
        {category &&
        category.length >= 0 &&
        category.map((c: any) => (
          <option value={c.categoryId}>{c.categoryName}</option>
         
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Image</label>
        <input {...register("image")}  className="form-control" id="exampleFormControlInput1" placeholder="" />
        
      </div>
      <div  className="form-group">
        <label htmlFor="exampleFormControlInput1">Description</label>
        <textarea {...register("description")} className="form-control" id="exampleFormControlInput1" placeholder="" />
        
      </div>

      <button id="signupSubmit" type="submit" className="btn btn-info btn-block">Add new book</button>
      {error && <p>Something went wrong!</p>}
    </form>


  )
}
export default AddBook;