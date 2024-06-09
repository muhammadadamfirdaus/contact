import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../features/contacts/contactSlice";
import { HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";
import FormEditContact from "./forms/FormEditContact";
import Modal from "./utils/Modal";

function ContactDetail({ contact }) {
  const [showModalEditContact, setshowModalEditContact] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    photo: "N/A",
  });

  const { firstName, lastName, age, photo } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    // console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onDeleteContact = () => {
    dispatch(deleteContact(contact.id));
  };

  const onClickEditContactShow = useCallback(
    (id) => () => {
      setshowModalEditContact(!showModalEditContact);
    },
    []
  );

  const onClickEditContactClose = (e) => {
    e.preventDefault();
    setshowModalEditContact(!showModalEditContact);
  };

  const modalEditContact = (
    <Modal onClose={onClickEditContactClose}>
      <FormEditContact contactDetail={contact} />
    </Modal>
  );

  return (
    <>
      <div className="flex basis-9/12 items-center">
        <h1 className="basis-1/2">{contact.firstName}</h1>
        <h1 className="basis-1/2">{contact.lastName}</h1>
        <p className="basis-1/2">{contact.age}</p>
      </div>
      {/* <img src={contact.photo} alt={`${contact.firstName} ${contact.lastName}`} /> */}
      <div className="flex basis-3/12">
        <HiOutlinePencilSquare className="cursor-pointer flex-auto" onClick={onClickEditContactShow(contact.id)} />
        <HiOutlineTrash className="cursor-pointer flex-auto" onClick={onDeleteContact} />
      </div>

      {showModalEditContact && modalEditContact}
    </>
  );
}

export default ContactDetail;
