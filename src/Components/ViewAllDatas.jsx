import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";

const ViewAllDatas = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/api/getAll");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/api/users/${id}`);
      alert("datat deleted sucessfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid ">
      <div className="d-sm-flex align-items-center justify-content-between mb-4 mr-5">
        <h1 className="h3 mb-2 text-black mt-2 ml-3">Orders Table </h1>
        <Link
          to="/adduser"
          className="d-none mt-2 d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Create Order
        </Link>
      </div>
      <div className="row ml-5">
        <div className="input-group mb-3 col-6">
          <button className="btn btn-outline-secondary" type="button">
            Search Name
          </button>
          <input
            type="text"
            className="form-control"
            aria-label="Text input with dropdown button"
            placeholder="Search here ..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="card shadow bg-light">
        <div className="card-header bg-light">
          <div className="card-body">
            {filteredUsers.length === 0 ? (
              <p>No matching Name found</p>
            ) : (
              <>
                <div
                  className="table-responsive"
                  style={{ maxHeight: "360px" }}
                >
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                  >
                    <thead className="position-sticky fixed-top">
                      <tr>
                        <th className="bg-success text-light"> ID</th>
                        <th className="bg-success text-light">Image</th>
                        <th className="bg-success text-light">Name</th>
                        <th className="bg-success text-light"> Email</th>
                        <th className="bg-success text-light">Mobile No</th>
                        <th className="bg-success text-light">Designation</th>
                        <th className="bg-success text-light">genter</th>
                        <th className="bg-success text-light">course</th>
                        <th className="bg-success text-light">Create date</th>
                        <th className="bg-success text-light">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{item._id}</td>
                            <td>
                              <img
                                src={item.image}
                                alt=""
                                height="100px"
                                width="100px"
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobileNo}</td>
                            <td>{item.designation}</td>
                            <td>{item.gender}</td>
                            <td>{item.course}</td>
                            <td>{item.createdAt}</td>
                            <td>
                              <div className="text-center">
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  delete
                                </button>
                                <Link to={`/edit-user/${item._id}`}>
                                  <button className="btn btn-sm btn-warning ml-2">
                                    edit
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllDatas;
