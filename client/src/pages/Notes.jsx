/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Moment from "moment";
import { ColorRing } from "react-loader-spinner";

import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Input from "../components/Input";

function Notes() {
  const navigate = useNavigate();
  const {
    notes,
    user,
    deleteNote,
    toggleEdit,
    getNotes,
    handleChange,
    searchQuery,
    sort,
    category,
    isLoading,
  } = useAppContext();

  const handleFilters = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  let newArr = [];

  if (notes && notes.length > 0) {
    const checkForElement = notes.map((note) => {
      if (newArr.includes(note.category)) {
        return;
      } else {
        newArr.push(note.category);
      }
    });
    newArr.unshift("all");
  }

  const navigatePage = (noteId) => {
    toggleEdit();
    navigate("/notes/create", { state: { id: noteId } });
  };

  useEffect(() => {
    if (notes.length > 0) {
      return;
    }
    getNotes();
  }, []);

  return (
    <>
      <main className="section">
        <Title title={"Welcome"} name={user.name} />
        <hr className="hr"></hr>
        {isLoading ? (
          <div className="loading">
            {" "}
            <ColorRing
              visible={true}
              height="100"
              width="100"
              colors={["blue"]}
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
            />
          </div>
        ) : (
          <section className="section-content">
            <section className="top-section">
              <div className="search-block">
                <Link className="btn create-btn" to="/notes/create">
                  Create
                </Link>
                <Input
                  placeholder={"Search your notes here..."}
                  value={searchQuery}
                  hanleChange={handleFilters}
                  type={"search"}
                  name={"searchQuery"}
                />
              </div>
              <div className="filter-block">
                {newArr && (
                  <div className="sort">
                    <label htmlFor="category">Category</label>
                    <select
                      onChange={handleFilters}
                      id="category"
                      name="category"
                      value={category}
                    >
                      {newArr.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                <div className="sort">
                  <label htmlFor="sort">Sort</label>
                  <select
                    onChange={handleFilters}
                    value={sort}
                    id="sort"
                    name="sort"
                  >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="name-a">Name A - Z</option>
                    <option value="name-z">Name Z - A</option>
                  </select>
                </div>
              </div>
            </section>
            <h3>
              {notes.length === 0
                ? "You have currently no notes"
                : `You have ${notes.length} note currently`}
            </h3>
            <section className="section-notes">
              {notes.length > 0 &&
                notes.map((note) => {
                  return (
                    <div className="single-note" key={note._id}>
                      <div className="note-content">
                        <div className="note-header">
                          <h3>{note.title}</h3>
                          <p>{note.category}</p>
                        </div>

                        <p>{note.description}</p>
                      </div>
                      <div className="note-info">
                        <p>{Moment(note.createdAt).format("MMM Do YY")}</p>
                        <div className="note-btns">
                          <button onClick={() => navigatePage(note._id)}>
                            <FaEdit color="blue" />
                          </button>
                          <button onClick={() => deleteNote(note._id)}>
                            <MdDelete color="blue" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </section>
          </section>
        )}
      </main>
    </>
  );
}

export default Notes;
