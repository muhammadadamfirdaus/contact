import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getContact } from "../features/contacts/contactSlice";

import Modal from "./utils/Modal";
import Button from "./utils/Button";
import FormAddContact from "./forms/FormAddContact";
import ContactDetail from "./ContactDetail";

function Contact() {
  const { contact, isLoading, isSuccess, isError, message } = useSelector((state) => state.contact);

  const [showModalAddContact, setshowModalAddContact] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContact());
    setshowModalAddContact(false);
  }, [dispatch, isSuccess]);

  const onClickAddContactShow = (e) => {
    e.preventDefault();
    setshowModalAddContact(!showModalAddContact);
  };

  const onClickAddContactClose = (e) => {
    e.preventDefault();
    setshowModalAddContact(!showModalAddContact);
  };

  const modalAddContact = (
    <Modal onClose={onClickAddContactClose}>
      <FormAddContact />
    </Modal>
  );

  return (
    <>
      <Button className="bg-[#FCCF08]" onClick={onClickAddContactShow}>
        Add Contact
      </Button>
      <div className="flex mt-4 py-2 min-h-8 border-b border-slate-300">
        <div className="flex basis-3/12">
          <h1 className="font-bold">First Name</h1>
        </div>
        <div className="flex basis-3/12">
          <h1 className="font-bold">Last Name</h1>
        </div>
        <div className="flex basis-3/12">
          <h1 className="font-bold">Age</h1>
        </div>
        <div className="flex basis-3/12 justify-center">
          <h1 className="font-bold">Actions</h1>
        </div>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {contact.length > 2 &&
            contact.map((contact, i) => (
              <div key={i} className="flex py-2 items-center">
                <ContactDetail contact={contact} />
              </div>
            ))}

          {showModalAddContact && modalAddContact}
        </>
      )}
    </>
  );
}

export default Contact;
