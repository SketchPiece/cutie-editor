import Tiptap from "./tiptap";

function DocumentEditor() {
  return (
    <div className="card w-3/4 bg-base-100 shadow-xl min-h-full">
      <div className="card-body">
        <h2 className="card-title">Editor</h2>
        <div className="divider" />
        <Tiptap />
      </div>
    </div>
  );
}

export default DocumentEditor;
