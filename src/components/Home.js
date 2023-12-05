import React from "react";
import { useNoteContext } from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Alert from "./Alert";
import Notes from "./Notes";

export default function Home() {
  const { alert } = useNoteContext();
  return (
    <>
      <Alert alert={alert} />
      <AddNote />
      <Notes />
    </>
  );
}
