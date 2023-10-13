import { useDocumentEditor } from "@/contexts/document-editor-context";
import { useFloatingComments } from "@/hooks/useFloatingComments";
import { BubbleMenu, EditorContent } from "@tiptap/react";
import { RiMessage2Line } from "react-icons/ri";

const COMMENT_BUTTON_HEIGHT = 48;

function Tiptap() {
  const { editor, addComment, comments, selectActiveComment } =
    useDocumentEditor();
  const { commentCoords } = useFloatingComments(
    comments,
    COMMENT_BUTTON_HEIGHT
  );

  return (
    <div>
      {commentCoords.map(({ id, top }) => {
        return (
          <button
            key={id}
            style={{ top: -100 + top || 0, left: -24 }}
            className="btn btn-secondary absolute"
            onClick={() => selectActiveComment(id)}
          >
            <RiMessage2Line className="text-md" />
          </button>
        );
      })}
      <EditorContent editor={editor} />
      {editor && (
        <BubbleMenu
          editor={editor}
          className="p-1 rounded-lg bg-white shadow-sm"
        >
          <button
            className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary/20"
            onClick={addComment}
          >
            <RiMessage2Line />
          </button>
        </BubbleMenu>
      )}
    </div>
  );
}

export default Tiptap;
