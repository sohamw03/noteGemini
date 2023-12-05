import React from "react";
import { useNoteContext } from "../context/notes/NoteContext";

export default function Alert(props) {
    // Note context
    const { hideAlert } = useNoteContext();

    return (
        <>
            {props.alert && (
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show m-3 rounded-pill ps-4 shadow-sm position-fixed bottom-0 end-0`} role="alert">
                    <strong>{props.alert.msg}</strong>
                    <button type="button" className="btn-close rounded-pill" onClick={hideAlert}></button>
                </div>
            )}
        </>
    );
}
