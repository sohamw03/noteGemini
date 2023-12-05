import React, { useState } from "react";
import { useNoteContext } from "../context/notes/NoteContext";

export default function AddNote() {
    // Note context
    const { addNote } = useNoteContext();

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-5">
            <h1>Add a note</h1>
            <form className="my-4" onSubmit={handleAddNote}>
                <div className="mb-3">
                    <label htmlFor="InputTitle" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control" id="InputTitle" name="title" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputDescription" className="form-label">
                        Description
                    </label>
                    <input type="text" className="form-control" id="InputDescription" name="description" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputTag" className="form-label">
                        Tag
                    </label>
                    <input type="text" className="form-control" id="InputTag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-success">
                    Add
                </button>
            </form>
        </div>
    );
}
