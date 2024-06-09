import axios from "axios";

// get contact
const getContact = async () => {
  const response = await axios.get("https://contact.herokuapp.com/contact");
  // console.log(response);

  return response.data;
};

// add contact
const addContact = async (data) => {
  // console.log(data);
  const response = await axios.post("https://contact.herokuapp.com/contact", data);

  return response.data;
};

// edit contact
const editContact = async (data) => {
  const response = await axios.put(`https://contact.herokuapp.com/contact/${data[0]}`, data[1]);

  return response.data;
};

// delete contact
const deleteContact = async (id) => {
  const response = await axios.delete(`https://contact.herokuapp.com/contact/${id}`);

  return response.data;
};

const contactService = {
  getContact,
  addContact,
  editContact,
  deleteContact,
};

export default contactService;
