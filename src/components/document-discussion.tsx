import { useDocumentEditor } from "@/contexts/document-editor-context";
import { useFloatingComments } from "@/hooks/useFloatingComments";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import CommentReplyDialog from "./comment-reply-dialog";

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
          {comments.map(({ id, content, reply }) => {
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
                {/* not necessary to transfer content but still reserved here */}
                <CommentReplyDialog id={id} content={content} reply={reply} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DocumentDiscussion;
