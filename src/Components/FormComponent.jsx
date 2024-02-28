import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
// import { setFormData } from "./slice";
import { registrationSchema } from "../Schemas/Validations";
import Swal from "sweetalert2";
import { addFormData, updateFormData } from "./slice"; // Importing the updateFormData action
import { useLocation } from "react-router-dom";

const FormComponent = () => {
  const dispatch = useDispatch();
  // const formData = useSelector((state) => state.form.formData);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const { formData: initialFormData, index } = location.state || {};

  useEffect(() => {
    setShowForm(true);
    if (initialFormData) {
      setSelectedCountry(initialFormData.country);
      setSelectedState(initialFormData.state);
      handleCountryChange({ target: { value: initialFormData.country } });
      handleStateChange({ target: { value: initialFormData.state } });
    }
    console.log("data : = " + initialFormData);
  }, [initialFormData]);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    if (selectedCountry === "India") {
      setStates(["Gujarat", "Maharashtra", "Telangana"]);
    } else if (selectedCountry === "USA") {
      setStates(["California", "New York", "Florida"]);
    } else if (selectedCountry === "Spain") {
      setStates(["Barcelona", "Asturias", "Central Spain"]);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    if (selectedState === "Gujarat") {
      setCities(["Surat", "Ahmedabad", "Vadodara"]);
    } else if (selectedState === "Maharashtra") {
      setCities(["Mumbai", "Pune", "Nagpur"]);
    } else if (selectedState === "Telangana") {
      setCities(["Warangal", "Hyderabad", "Secunderabad"]);
    } else if (selectedState === "California") {
      setCities(["Los Angeles", "San Francisco", "San Diego"]);
    } else if (selectedState === "New York") {
      setCities(["New York City", "Buffalo", "Rochester"]);
    } else if (selectedState === "Florida") {
      setCities(["Miami", "Orlando", "Tampa"]);
    } else if (selectedState === "Barcelona") {
      setCities(["Barcelona City", "L'Hospitalet de Llobregat", "Badalona"]);
    } else if (selectedState === "Asturias") {
      setCities(["Gijón", "Oviedo", "Avilés"]);
    } else if (selectedState === "Central Spain") {
      setCities(["Madrid", "Toledo", "Salamanca"]);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    resetForm();
    const buttonText = index !== undefined ? "Update" : "Submit";
    document.querySelector(".submitBtn").innerHTML = buttonText;
    if (index !== undefined) {
     
      await dispatch(updateFormData({ index: index, updatedData: values }));


      Swal.fire({
        icon: "success",
        title: "Data Updated",
        text: "The data has been successfully updated!",
    });
      resetForm({
        values: {
          name: "",
          email: "",
          phone: "",
          gender: "",
          country: "",
          state: "",
          city: "",
          date: "",
        },
      });
    } else {
      await dispatch(addFormData(values));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Successfully Submitted",
    });
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }} className="headingText">
        Registration-Form
      </h2>
      <div className={`formContainer ${showForm ? "show" : ""}`}>
        <Formik
          initialValues={
            initialFormData || {
              name: "",
              email: "",
              phone: "",
              gender: "",
              country: "",
              state: "",
              city: "",
              date: "",
            }
          }
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, errors, touched }) => (
            <Form>
              <label htmlFor="nameInpt">Enter Name : </label>
              <Field
                name="name"
                id="nameInpt"
                type="text"
                onChange={handleChange}
                value={values.name}
                placeholder="Enter your name"
              />
              {errors.name && touched.name && (
                <span style={{ color: "red" }}>{errors.name}</span>
              )}
              <br />
              <label htmlFor="emailInpt">Email : </label>
              <Field
                name="email"
                id="emailInpt"
                type="email"
                onChange={handleChange}
                value={values.email}
                placeholder="abc@gmail.com"
              />
              {errors.email && touched.email && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
              <br />
              <label htmlFor="mobileInpt">MobileNo : </label>
              <Field
                name="phone"
                id="mobileInpt"
                type="number"
                onChange={handleChange}
                value={values.phone}
                placeholder=" 97.. number must be 10 digits"
              />
              {errors.phone && touched.phone && (
                <span style={{ color: "red" }}>{errors.phone}</span>
              )}
              <br />
              <label>Gender: </label>
              <div id="genderStore">
                <Field
                  name="gender"
                  id="maleRadio"
                  type="radio"
                  value="male"
                  onChange={handleChange}
                  checked={values.gender === "male"}
                />
                Male
                <Field
                  name="gender"
                  id="femaleRadio"
                  type="radio"
                  value="female"
                  onChange={handleChange}
                  checked={values.gender === "female"}
                />
                Female
              </div>
              {errors.gender && touched.gender && (
                <span style={{ color: "red" }}>{errors.gender}</span>
              )}
              <br />
              <label>Country :</label>
              <Field
                as="select"
                name="country"
                id="countrySelect"
                onChange={(e) => {
                  handleChange(e);
                  handleCountryChange(e);
                }}
                value={values.country}
              >
                <option value="">---Select Country---</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Spain">Spain</option>
              </Field>
              {errors.country && touched.country && (
                <span style={{ color: "red" }}>{errors.country}</span>
              )}
              <br />
              <>
                <label>State :</label>
                <Field
                  as="select"
                  name="state"
                  id="stateSelect"
                  onChange={(e) => {
                    handleChange(e);
                    handleStateChange(e);
                  }}
                  disabled={!selectedCountry}
                  value={values.state}
                >
                  <option value="">---Select State---</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Field>
                {errors.state && touched.state && (
                  <span style={{ color: "red" }}>{errors.state}</span>
                )}
                <br />
                <label>City :</label>
                <Field
                  as="select"
                  name="city"
                  id="citySelect"
                  onChange={handleChange}
                  disabled={!selectedState}
                  value={values.city}
                >
                  <option value="">---Select City---</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Field>
                {errors.city && touched.city && (
                  <span style={{ color: "red" }}>{errors.city}</span>
                )}
              </>
              <br />
              <label>Date :</label>
              <Field
                type="date"
                name="date"
                onChange={handleChange}
                value={values.date}
              />
              {errors.date && touched.date && (
                <span style={{ color: "red" }}>{errors.date}</span>
              )}
              <br />
              <button type="submit" className="submitBtn">
              {index !== undefined ? "Update" : "Submit"}
              </button>
              <button type="reset" className="resettBtn">
                Reset
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormComponent;
