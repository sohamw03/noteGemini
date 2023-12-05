import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export function NoteContextProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type,
        });
        setTimeout(() => setAlert(null), 2000); // Hide alert after 2 seconds.
    };

    const hideAlert = () => {
        setAlert(null);
    };

    // Fire an API call
    async function callAPI(method = "POST", url = "", data = {}) {
        let response;
        if (method === "GET") {
            response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("idtkn"),
                },
            });
        } else {
            response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("idtkn"),
                },
                body: JSON.stringify(data),
            });
        }
        return response.json();
    }

    // Get all notes
    const getAllNotes = async () => {
        try {
            const response = await callAPI("GET", `${process.env.REACT_APP_BACKEND}/api/notes/fetchallnotes`);

            console.log("Fetched all notes : ", response);
            // Save to client
            setNotes(response);
        } catch (error) {
            showAlert("Couldn't reach the server! Please try again", "warning");
        }
    };

    // Add a Note
    const addNote = async (title, description, tag) => {
        try {
            // TODO: API call
            const data = {
                title: title,
                description: description,
                tag: tag,
            };

            const response = await callAPI("POST", `${process.env.REACT_APP_BACKEND}/api/notes/addnote`, data);

            data._id = response._id;

            console.log(data);
            setNotes(notes.concat(data));
            showAlert("Note added successfully!", "success");
        } catch (error) {
            showAlert("Couldn't reach the server! Please try again", "warning");
        }
    };

    // Delete a Note
    const deleteNote = async (id) => {
        try {
            // TODO: API call
            const response = await callAPI("DELETE", `${process.env.REACT_APP_BACKEND}/api/notes/deletenote/${id}`);
            console.log(response);

            console.log(`Deleting a note with id : ${id}`);
            const newNotes = notes.filter((note) => {
                return note._id != id;
            });
            setNotes(newNotes);
            showAlert("Note deleted successfully!", "success");
        } catch (error) {
            showAlert("Couldn't reach the server! Please try again", "warning");
        }
    };

    // Edit a Note
    const editNote = (id, title, description, tag) => {
        try {
            const data = {
                title: title,
                description: description,
                tag: tag,
            };
            callAPI("PUT", `${process.env.REACT_APP_BACKEND}/api/notes/updatenote/${id}`, data);

            // Edit in client
            console.log({ id: id, title: title, description: description, tag: tag });
            const newNotes = JSON.parse(JSON.stringify(notes));
            for (let index = 0; index < newNotes.length; index++) {
                if (id === newNotes[index]._id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
            }
            setNotes(newNotes);
            showAlert("Note saved!", "success");
        } catch (error) {
            showAlert("Couldn't reach the server! Please try again", "warning");
        }
    };

    const values = { notes, setNotes, addNote, deleteNote, getAllNotes, editNote, showAlert, hideAlert, alert };

    return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>;
}

export function useNoteContext() {
    return useContext(NoteContext);
}
