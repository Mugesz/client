import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
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
      image: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.name === "") {
        errors.name = "Please enter the name";
      }

      if (values.name.length <= 3 || values.name.length > 15) {
        errors.name = "Name should be between 3 to 15 characters";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (values.mobileNo === "") {
        errors.mobileNo = "Please enter mobile number";
      }

      if (values.designation === "") {
        errors.designation = "Please enter designation";
      }
      if (values.gender === "select") {
        errors.gender = "Please choose gender";
      }
      if (values.course === "") {
        errors.course = "Please choose course";
      }
      if (values.image === "") {
        errors.image = "Please insert Image";
      }

      return errors;
    },

    onSubmit: async (values, formikbag) => {
      try {
        setLoading(true); // Set loading to true when submitting
        await axios.post("http://localhost:5000/user/api/users", values);
        formikbag.resetForm();
        alert("data created sucessfully");
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after submission
      }
    },
  });

  return (
    <>
      <Header />
      <div className="container margin-top">
        <h3 className="text-center mt-5">Add User</h3>
        <div className="  shadow-lg p-4 rounded">
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
                  <label
                    className="form-check-label ml-2"
                    htmlFor="designationHR"
                  >
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
              <div className="col-lg-12 mt-5">
                <button type="submit" className="btn btn-primary">
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;
