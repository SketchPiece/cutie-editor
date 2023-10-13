import { Comment } from "@/contexts/document-editor-context";
import { useEffect, useState } from "react";

interface CommentCoords {
  id: string;
  top: number;
}

const sortCommentCoords = (a: CommentCoords, b: CommentCoords) => a.top - b.top;

export function useFloatingComments(
  comments: Comment[],
  elementHeight: number
): { commentCoords: CommentCoords[]; maxTopValue: number } {
  const [commentCoords, setCommentCoords] = useState<CommentCoords[]>([]);
  const [maxTopValue, setMaxTopValue] = useState(0);

  useEffect(() => {
    const commentCoords = comments.reduce((coordsAcc, { id }) => {
      const commentElement = document.querySelector(
        `[data-comment-id="${id}"]`
      );
      if (!commentElement) return coordsAcc;
      const commentRect = commentElement.getBoundingClientRect();
      let commentTop = commentRect.top + window.scrollY;
      const commentCoord = coordsAcc.reduce(
        (commentCoord, prevCoord) => {
          const absOffset = Math.abs(prevCoord.top - commentCoord.top);
          if (absOffset <= elementHeight)
            return {
              ...commentCoord,
              top: prevCoord.top + elementHeight + 5,
            };
          return commentCoord;
        },
        { id, top: commentTop }
      );

      return [...coordsAcc, commentCoord].sort(sortCommentCoords);
    }, [] as CommentCoords[]);
    const newMaxTopValue = Math.max(
      ...commentCoords.map((coord) => coord.top),
      0
    );
    setMaxTopValue(newMaxTopValue);
    setCommentCoords(commentCoords);
  }, [comments, elementHeight]);

  return { commentCoords, maxTopValue };
}
