import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { editContact, getContact } from "../../features/contacts/contactSlice";
import Button from "../utils/Button";

function FormEditContact({ contactDetail }) {
  // console.log(contactDetail);
  const { isSuceess } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    firstName: contactDetail && contactDetail.firstName,
    lastName: contactDetail && contactDetail.lastName,
    age: contactDetail && contactDetail.age,
    photo: "N/A",
  });

  const { firstName, lastName, age, photo } = formData;

  // gabungkan data negara dan lainnya
  const step1Data = {
    ...formData,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuceess) {
      dispatch(getContact());
    }
  }, [dispatch, isSuceess]);

  const onChange = (e) => {
    // console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(editContact([contactDetail.id, step1Data]));
  };

  // console.log(step1Data);

  return (
    <>
      <div className="px-6 pb-6">
        <div className="md:px-8">
          <form onSubmit={onSubmit}>
            <h1 className="font-bold text-xl text-center mb-8">Edit Contact</h1>
            <div className="py-2 flex">
              <div className="px-2 basis-1/2 flex-col">
                <h3 className="font-semibold">First Name</h3>
                <input id="contactFormEditFirstName" name="firstName" type="text" value={firstName} placeholder="First Name" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="px-2 basis-1/2 flex-col">
                <h3 className="font-semibold">Last Name</h3>
                <input id="contactFormEditLastName" name="lastName" type="text" value={lastName} placeholder="Last Name" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <div className="py-2 flex">
              <div className="px-2 basis-1/2 flex-col">
                <h3 className="font-semibold">Age</h3>
                <input id="contactFormEditAge" name="age" type="text" value={age} placeholder="Age" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <div className="py-4 flex justify-center">
              <Button className="bg-[#FCCF08]" type={"submit"}>
                Edit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormEditContact;
