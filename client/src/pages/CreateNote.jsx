/* eslint-disable no-unused-vars */

import {  useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Input from "../components/Input";

function CreateNote() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { createNote, notes, isEditing, updateNote, isLoading, toggleEdit } =
    useAppContext();
  let find;
  if (state && state.id) {
    find = notes.find((item) => item._id === state.id);
  }

  const initialValues = {
    title: find?.title || "",
    description: find?.description || "",
    category: find?.category || "",
  };

  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { title, description, category } = values;
    if (!title || !description || !category) {
      toast.error("Please provide all required fields", {
        theme: "colored",
      });
      return;
    }
    const data = {
      title,
      description,
      category,
    };
    if (isEditing) {
      updateNote({ data: data, id: state.id });
      return;
    }

    createNote(data);
  };

  const cancelEdit = () => {
    toggleEdit();
    navigate("/notes");
  };

  return (
    <main className="section">
      <div className="create-note-form">
        <Title title={isEditing ? "Edit Your Note" : "Create Your Note"} />
        <Input
          label={"Note Title"}
          value={values.title}
          hanleChange={handleChange}
          name={"title"}
          type={"text"}
          placeholder={"your note title"}
        />
        <Input
          label={"Note Description"}
          value={values.description}
          hanleChange={handleChange}
          name={"description"}
          type={"text"}
          placeholder={"your note description"}
        />
        <Input
          label={"Note Category"}
          value={values.category}
          hanleChange={handleChange}
          name={"category"}
          type={"text"}
          placeholder={"your note category"}
        />
        <div className="edit-btns">
          <button
            disabled={isLoading}
            style={{
              opacity: isLoading ? "0.75" : "1",
              cursor: isLoading ? "wait" : "pointer",
            }}
            className="btn"
            onClick={handleSubmit}
          >
            {isEditing ? "Edit" : "Create"}
          </button>
          {isEditing && (
            <button onClick={cancelEdit} className="btn">
              Cancel
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default CreateNote;
