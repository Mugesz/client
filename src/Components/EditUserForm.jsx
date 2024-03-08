import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Header from "./Header";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase";

const EditUserForm = () => {
  const { id } = useParams(); // Get the user id from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNo: "",
      designation: "",
      gender: "",
      course: [],
      image: null,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true); // Set loading to true when form submission starts
        await axios.put(
          `https://server-dealsdry.onrender.com/user/api/users/${id}`,
          values
        );
        alert("User data updated successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error updating user data:", error);
      } finally {
        setLoading(false); // Set loading back to false when form submission is complete
        setSubmitting(false);
      }
    },
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://server-dealsdry.onrender.com/user/api/users/${id}`
        );
        formik?.setValues(response.data); // Use optional chaining here
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <Header />
      <h1 className="margin-top text-center">Edit User</h1>
      <form onSubmit={formik.handleSubmit}>
      <div className="row">
          <div className="col-lg-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors.name}</span>
          </div>
          <div className="col-lg-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors.email}</span>
          </div>
          <div className="col-lg-4">
            <label htmlFor="mobileNo">Mobile No</label>
            <input
              type="tel"
              className="form-control"
              id="mobileNo"
              name="mobileNo"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors.mobileNo}</span>
          </div>
          <div className="col-lg-4 mt-5">
            <label htmlFor="gender">Gender</label>
            <select
              className=" dropdown-toggle"
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <span className="text-danger">{formik.errors.gender}</span>
          </div>

          <div className="col-lg-4">
            <label>Designation</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="designationHR"
                name="designation"
                value="HR"
                checked={formik.values.designation === "HR"}
                onChange={formik.handleChange}
              />
              <label className="form-check-label ml-2" htmlFor="designationHR">
                HR
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="designationManager"
                name="designation"
                value="Manager"
                checked={formik.values.designation === "Manager"}
                onChange={formik.handleChange}
              />
              <label
                className="form-check-label ml-2"
                htmlFor="designationManager"
              >
                Manager
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="designationSales"
                name="designation"
                value="Sales"
                checked={formik.values.designation === "Sales"}
                onChange={formik.handleChange}
              />
              <label
                className="form-check-label ml-2"
                htmlFor="designationSales"
              >
                Sales
              </label>
            </div>
            <span className="text-danger">{formik.errors.designation}</span>
          </div>
          <div className="col-lg-4">
            <label>course</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="MCA"
                name="course"
                value="MCA"
                checked={formik.values.course.includes("MCA")}
                onChange={formik.handleChange}
              />
              <label className="form-check-label ml-2" htmlFor="MCA">
                MCA
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="BCA"
                name="course"
                value="BCA"
                checked={formik.values.course.includes("BCA")}
                onChange={formik.handleChange}
              />
              <label className="form-check-label ml-2" htmlFor="BCA">
                BCA
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="BSC"
                name="course"
                value="BSC"
                checked={formik.values.course.includes("BSC")}
                onChange={formik.handleChange}
              />
              <label className="form-check-label ml-2" htmlFor="BSC">
                BSC
              </label>
            </div>
            <span className="text-danger">{formik.errors.course}</span>
          </div>

          <div className="col-lg-4">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={formik.handleChange} // Use onChange instead of value for file inputs
            />
            <span className="text-danger">{formik.errors.image}</span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </>
  );
};

export default EditUserForm;
