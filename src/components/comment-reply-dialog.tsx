import { useDocumentEditor } from "@/contexts/document-editor-context";
import { useFloatingComments } from "@/hooks/useFloatingComments";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";

const COMMENT_CARD_HEIGHT = 176;
export default function CommentReplyDialog({ id, content, reply}) {
  const {
    comments,
    updateComment,
    removeComment,
    activeCommentId,
    selectActiveComment,
    addCommentReply,
    removeCommentReply,
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

  const [commentText, setCommentText] = useState<string>("");

  const [hideActions, setHideActions] = useState<Boolean>(false);

  return (
    <div
      className={cn(
          "card w-full bg-base-100 shadow-2xl absolute left-0 transition-all",
          id === activeCommentId && "left-3"
      )}
      style={{
          top: commentCoordsMap[id] - 500 || 0,
      }}
      key={id}
      onClick={() => {
        selectActiveComment(id);
      }}
    >
      {/* repleis */}
      <div>
        {reply.map(({ id: childId, content }) => {
          return (
            <div
              key={childId}
              onClick={()=>{setHideActions(false)}}
            >
              <div className="flex ml-2 mb-5 mt-2">
                {/* avatar */}
                <span className="avatar placeholder card-title">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-7">
                      <span>U</span>
                  </div>
                </span>
                {/* name and content */}
                <span className="ml-2 mr-auto">
                  {/* name */}
                  <div className="text-xs mt-1 font-bold">username</div>
                  {/* content */}
                  <div className="text-sm">
                  { content }
                  </div>
                </span>
                {/* delete button */}
                <span className="card-title">
                  <button
                    className="btn btn-error btn-xs ml-auto text-md"
                    style={{borderRadius: '0'}}
                    onClick={() => removeCommentReply(id, childId)}
                  >
                    <RiDeleteBin2Line />
                  </button>
                </span> 
              </div>
            </div>
          );
        })}
      </div>
      {/* input area */}
      <div className="card-body relative" style={{display: hideActions ? 'none': 'block'}}>
        <div
        className={cn(
            "w-2 h-6 bg-secondary absolute -left-1 rounded-md",
            id === activeCommentId ? "bg-primary" : "bg-secondary"
        )}
        ></div>
        {/* prompt */}
        <p className="card-title flex text-sm" >
            Reply
        </p>
        {/* comment textarea */}
        <textarea 
          className="textarea textarea-bordered textarea-xs w-full max-w-xs"
          style={{borderRadius: '5px'}}
          placeholder="Type your comment here"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        {/*  actions: send and cancel button */}
        <div className="btn-group ml-auto">
          <button
            className="btn btn-outline btn-xs text-md"
            style={{borderRadius: '5px'}}
            onClick={() => {
              if(reply.length === 0) {
                removeComment(id);
              }
              setHideActions(true);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-outline btn-xs text-md"
            style={{borderRadius: '5px'}}
            onClick={(e) => {
              addCommentReply(id, commentText);
              setCommentText("");
            }}
          >
              Send
          </button>
        </div>
      </div>
    </div>
  );
}