import { useDocumentEditor } from "@/contexts/document-editor-context";
import { cn } from "@/lib/utils";
import { useId } from "react";
import {
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiBold,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiItalic,
  RiListOrdered,
  RiListUnordered,
  RiStrikethrough,
  RiUnderline,
} from "react-icons/ri";

function Toolbar() {
  const { editor, exportDocument, importDocument } = useDocumentEditor();
  const importId = useId();

  if (!editor) return null;

  return (
    <div className="navbar bg-base-100 shadow-xl rounded-xl">
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("bold") ? "btn-neutral" : "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <RiBold />
        </button>
      </div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("italic") ? "btn-neutral" : "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <RiItalic />
        </button>
      </div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("underline") ? "btn-neutral" : "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        >
          <RiUnderline />
        </button>
      </div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("strike") ? "btn-neutral" : "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <RiStrikethrough />
        </button>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("heading", { level: 1 })
              ? "btn-neutral"
              : "btn-ghost"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <RiH1 />
        </button>
      </div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("heading", { level: 2 })
              ? "btn-neutral"
              : "btn-ghost"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <RiH2 />
        </button>
      </div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("heading", { level: 3 })
              ? "btn-neutral"
              : "btn-ghost"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <RiH3 />
        </button>
      </div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("heading", { level: 4 })
              ? "btn-neutral"
              : "btn-ghost"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <RiH4 />
        </button>
      </div>

      <div className="divider divider-horizontal"></div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("bulletList") ? "btn-neutral" : "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <RiListUnordered />
        </button>
      </div>
      <div className="flex-none">
        <button
          className={cn(
            "btn btn-square text-xl",
            editor.isActive("orderedList") ? "btn-neutral" : "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <RiListOrdered />
        </button>
      </div>
      <div className="flex-none ml-auto">
        <label htmlFor={importId}>
          <div className="btn btn-outline text-lg">Import</div>
          <input
            id={importId}
            type="file"
            className="sr-only"
            onChange={importDocument}
          />
        </label>
      </div>
      <div className="flex-none ml-2">
        <button className="btn btn-neutral text-lg" onClick={exportDocument}>
          Export
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
