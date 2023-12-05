import React, { useEffect, useRef, useState } from "react";
import { useNoteContext } from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

export default function Notes() {
    // Note context
    const { notes, getAllNotes, editNote } = useNoteContext();

    const [note, setNote] = useState({ _id: "", title: "", description: "", tag: "" });

    const navigate = useNavigate();

    const udpateNoteModalOpen = (currentNote) => {
        modalRef.current.click();
        console.log("edit", currentNote);
        setNote(currentNote);
    };

    const updateNote = (e) => {
        e.preventDefault();
        editNote(note._id, note.title, note.description, note.tag);
        modalCloseRef.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (sessionStorage.getItem("idtkn")) {
            getAllNotes();
        } else {
            navigate("/login");
        }
    }, []);

    const modalRef = useRef(null);
    const modalCloseRef = useRef(null);

    return (
        <>
            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={modalRef} style={{ display: "none" }}>
                Open edit modal
            </button>
            <button type="button" className="btn btn-success rounded rounded-circle position-absolute end-0 bottom-0 m-4" style={{ width: "3rem", height: "3rem" }}>
                <span style={{ fontSize: "1.5rem" }}>+</span>
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog w-50 position-absolute top-50 start-50 translate-middle">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edit
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-4" onSubmit={updateNote}>
                                <div className="mb-3">
                                    <label htmlFor="eInputTitle" className="form-label">
                                        Title
                                    </label>
                                    <input type="text" className="form-control" id="eInputTitle" name="title" onChange={onChange} value={note.title} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eInputDescription" className="form-label">
                                        Description
                                    </label>
                                    <input type="text" className="form-control" id="eInputDescription" name="description" onChange={onChange} value={note.description} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eInputTag" className="form-label">
                                        Tag
                                    </label>
                                    <input type="text" className="form-control" id="eInputTag" name="tag" onChange={onChange} value={note.tag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={modalCloseRef}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-success" onClick={updateNote}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <h1 className="px-0">Your Notes</h1>
                <div className="row my-4 px-2 gap-3 justify-content-center">
                    {notes.map((note, index) => {
                        return <NoteItem key={index} udpateNoteModalOpen={udpateNoteModalOpen} note={note} />;
                    })}
                </div>
            </div>
        </>
    );
}
