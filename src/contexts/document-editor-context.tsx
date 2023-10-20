import { Editor, useEditor } from "@tiptap/react";
import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";

interface DocumentEditorContextApi {
  editor: Editor | null;
  activeCommentId: string | null;
  comments: Comment[];
  addComment: () => void;
  updateComment: (id: string, content: string) => void;
  removeComment: (id: string) => void;
  selectActiveComment: (id: string) => void;
  resetActiveComment: () => void;
  importDocument: (e: ChangeEvent<HTMLInputElement>) => void;
  exportDocument: () => void;
  addCommentReply: () => void;
  removeCommentReply: () => void;
}

const noop = () => {};

const DocumentEditorContext = createContext<DocumentEditorContextApi>({
  editor: null,
  activeCommentId: null,
  comments: [],
  addComment: noop,
  updateComment: noop,
  removeComment: noop,
  selectActiveComment: noop,
  resetActiveComment: noop,
  importDocument: noop,
  exportDocument: noop,
  addCommentReply: noop,
  removeCommentReply: noop,
});

interface DocumentEditorProviderProps extends PropsWithChildren {
  editor: Editor | null;
  activeCommentId: string | null;
  onActiveCommentChange: (commentId: string | null) => void;
}

export interface Comment {
  id: string;
  content: string;
  reply: Comment[];
}

export function DocumentEditorProvider({
  children,
  editor,
  activeCommentId,
  onActiveCommentChange,
}: DocumentEditorProviderProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = () => {
    const commentId = v4();
    const newComment = {
      id: commentId,
      content: "",
      reply: [],
    } satisfies Comment;

    editor?.commands.setComment(commentId);
    onActiveCommentChange(commentId);
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const updateComment = (id: string, content: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, content } : comment
      )
    );
  };

  const removeComment = (id: string) => {
    editor?.commands.unsetComment(id);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  useEffect(() => {
    const commentMarkupElements = document.querySelectorAll(
      "span[data-comment-id]"
    );
    commentMarkupElements.forEach((markupElement) => {
      markupElement.classList.remove("active-comment-selection");
    });
    requestAnimationFrame(() => {
      const commentMarkupElement = document.querySelector(
        `span[data-comment-id="${activeCommentId}"]`
      );
      commentMarkupElement?.classList.add("active-comment-selection");
    });
  }, [activeCommentId]);

  const exportDocument = () => {
    if (!editor) return;
    const jsonDoc = editor.getJSON();
    const jsonDocText = JSON.stringify({ ...jsonDoc, comments });
    const a = document.createElement("a");
    const file = new Blob([jsonDocText], { type: "text/plain" });
    const objectUrl = URL.createObjectURL(file);
    a.href = objectUrl;
    a.download = "export.json";
    a.click();
    URL.revokeObjectURL(objectUrl);
    console.log(jsonDocText);
  };

  const importDocument = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;

    const file = e.target.files?.[0];
    if (!file) return alert("Error during file import");
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener("load", () => {
      const jsonText = fileReader.result;
      if (!jsonText || !editor) return;
      try {
        const { comments, ...jsonDoc } = JSON.parse(jsonText as string);
        editor.commands.setContent(jsonDoc);
        if (comments && Array.isArray(comments)) setComments(comments);
      } catch {
        alert("Error during file import");
      }
    });
    fileReader.addEventListener("error", () => {
      alert("Error during file import");
    });
  };

  const addCommentReply = (parentId: string, content: string) => {
    const commentId = v4();
    const newReply = {
      id: commentId,
      content: content,
      reply: [],
    } satisfies Comment;
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === parentId ? { ...comment, reply: [...comment.reply, newReply] } : comment
      )
    );
  }

  const removeCommentReply = (parentId: string, childId: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === parentId ? { ...comment, reply: comment.reply.filter((item) => item.id !== childId) } : comment
      )
    );
  }

  return (
    <DocumentEditorContext.Provider
      value={{
        editor,
        comments,
        activeCommentId,
        addComment,
        selectActiveComment: (id) => onActiveCommentChange(id),
        resetActiveComment: () => onActiveCommentChange(null),
        updateComment,
        removeComment,
        importDocument,
        exportDocument,
        addCommentReply,
        removeCommentReply,
      }}
    >
      {children}
    </DocumentEditorContext.Provider>
  );
}

export function useDocumentEditor() {
  const context = useContext(DocumentEditorContext);
  if (!context) {
    throw new Error("No Document Editor context");
  }
  return context;
}
