import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

type IFormInput = {

  categoryName: string

}

export function AddCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  async function onSubmit(data: IFormInput) {
    const Category = {

      categoryName: data.categoryName
    };
    try {
      await axios.post("https://localhost:5001/api/Category", Category);
      const res = await axios.get("https://localhost:5001/api/Category");
      const data = res.data;
      setCategory(data);
      alert('Success');
    } catch (err) {
      setError(err);
    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Category Name</label>
        <input {...register("categoryName", { required: true })} className="form-control" id="exampleFormControlInput1" placeholder="" />
        {errors?.categoryName?.type === "required" && <p>This field is required</p>}


      </div>
      <button id="signupSubmit" type="submit" className="btn btn-info btn-block">Add new category</button>
      {error && <p>Something went wrong!</p>}

    </form>


  )
}
export default AddCategory;