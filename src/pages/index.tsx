import Toolbar from "@/components/toolbar";
import DocumentEditor from "@/components/document-editor";
import DocumentDiscussion from "@/components/document-discussion";
import { DocumentEditorProvider } from "@/contexts/document-editor-context";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Comment } from "@/lib/comment";
import { useState } from "react";
import Underline from "@tiptap/extension-underline";

export default function Home() {
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Comment.configure({
        HTMLAttributes: {
          class: "bg-secondary",
        },
        onCommentActivated: (commentId) => {
          setActiveCommentId(commentId);
        },
      }),
      Underline,
    ],
    content:
      "<h1>Hello world</h1><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none p-2",
      },
    },
  });

  return (
    <DocumentEditorProvider
      editor={editor}
      activeCommentId={activeCommentId}
      onActiveCommentChange={(id) => setActiveCommentId(id)}
    >
      <div className="container mx-auto h-screen flex flex-col py-4">
        <Toolbar />
        <div className="flex gap-2 mt-5 flex-1">
          <DocumentEditor />
          <DocumentDiscussion />
        </div>
      </div>
    </DocumentEditorProvider>
  );
}
