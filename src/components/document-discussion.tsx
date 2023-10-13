import { useDocumentEditor } from "@/contexts/document-editor-context";
import { useFloatingComments } from "@/hooks/useFloatingComments";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";

const COMMENT_CARD_HEIGHT = 176;

function DocumentDiscussion() {
  const {
    comments,
    updateComment,
    removeComment,
    activeCommentId,
    selectActiveComment,
  } = useDocumentEditor();
  const { commentCoords, maxTopValue } = useFloatingComments(
    comments,
    COMMENT_CARD_HEIGHT
  );
  const commentCoordsMap = useMemo(
    () =>
      commentCoords.reduce((acc, value) => {
        return { ...acc, [value.id]: value.top };
      }, {} as Record<string, number>),
    [commentCoords]
  );

  return (
    <div
      className="card w-96 bg-base-100 shadow-xl flex-1"
      style={{
        minHeight: maxTopValue + 100,
      }}
    >
      <div className="card-body">
        <h2 className="card-title">Comments</h2>
        <div className="divider" />
        <div className="relative">
          {comments.map(({ id, content }) => {
            return (
              <div
                className={cn(
                  "card w-full bg-base-100 shadow-sm absolute left-0 transition-all",
                  id === activeCommentId && "left-3"
                )}
                style={{
                  top: commentCoordsMap[id] - 230 || 0,
                }}
                key={id}
                onClick={() => selectActiveComment(id)}
              >
                <div className="card-body relative">
                  <div
                    className={cn(
                      "w-2 h-6 bg-secondary absolute -left-1 rounded-md",
                      id === activeCommentId ? "bg-primary" : "bg-secondary"
                    )}
                  ></div>
                  <p className="card-title flex">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span>U</span>
                      </div>
                    </div>
                    Username
                    <button
                      className="btn btn-error ml-auto text-md"
                      onClick={() => removeComment(id)}
                    >
                      <RiDeleteBin2Line />
                    </button>
                  </p>
                  <input
                    type="text"
                    placeholder="Type your comment here"
                    value={content}
                    className="input mt-2"
                    onChange={(e) => updateComment(id, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DocumentDiscussion;
