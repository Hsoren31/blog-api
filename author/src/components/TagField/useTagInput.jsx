import { useState } from "react";

export function useTagInput() {
  const [tags, setTags] = useState([]);

  const handleAddTag = (newTag) => {
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return { tags, setTags, handleAddTag, handleRemoveTag };
}
