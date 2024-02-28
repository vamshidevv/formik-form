import * as Yup from "yup";

// const mobileNoRegEx = /^[6,9][0-9]{9}$/;

// const emailRegEx = /[a-zA-Z0-9]{2}+@[a-z]{3,5}+.[a-z]{2,3}/;

export const registrationSchema = Yup.object({
  name: Yup.string()
    .min(2)
    .max(15)
      .matches(/^[^\d]+$/, "Number not Allowed")
    .required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter Your Email"),
  phone: Yup.string()
    .matches(/^6|^9/, "Number should start with 6 or 9")
    .matches(/^\d{10}$/, "Number should be 10 digits")
    .required("Please Enter Your Mobile Number"),
  gender: Yup.string().required("Please Select Your gender"),
  country: Yup.string().required("Please Select Your Country"),
  state: Yup.string().required("Please Select Your State"),
  city: Yup.string().required("Please Select Your City"),
  date: Yup.string().required("Please Select  Date"),
});
