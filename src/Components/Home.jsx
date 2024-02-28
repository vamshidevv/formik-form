import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeFormData } from "./slice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    setShowHome(true);
  }, []);

  return (
    <>
      {props.retrieve && props.retrieve.length > 0 && (
        <div className={`homeContainer ${showHome ? "see" : ""}`}>
          <table border={1}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Gender</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.retrieve.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.gender}</td>
                  <td>{data.country}</td>
                  <td>{data.state}</td>
                  <td>{data.city}</td>
                  <td>{data.date}</td>
                  <td>
                    <button
                      className="delBtn"
                      title="Delete Data"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your profile information has been deleted.",
                              icon: "success",
                            });
                            dispatch(removeFormData(index));
                          }
                        });
                      }}
                    >
                      <ion-icon
                        name="close-outline"
                        id="delIcon"
                        style={{
                          height: "30px",
                          width: "30px",
                          transition: "0.2s all",
                        }}
                      ></ion-icon>
                    </button>

                    <button
                      className="eiditBtn"
                      title="Edit Data"
                      onClick={() => {
                        navigate("/registration", {
                          state: { formData: data, index: index },
                        });
                      }}
                    >
                      <ion-icon name="create-outline" id="editIcon"></ion-icon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Home;
