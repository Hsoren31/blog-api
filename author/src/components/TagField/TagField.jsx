import { useState } from "react";

export function TagField({ tags, handleAddTag, handleRemoveTag }) {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();

      if (
        userInput.trim() !== "" &&
        userInput.length <= 20 &&
        tags.length < 5
      ) {
        handleAddTag(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div>
      <label htmlFor="tags">Tags: </label>
      <ul className="edit-tags">
        {tags.map((tag, index) => (
          <span className="tag-pill" key={`${index}-${tag}`}>
            #{tag}
            <button
              className="remove-tag"
              onClick={() => handleRemoveTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </ul>
      <input
        id="tags"
        name="tags"
        type="text"
        placeholder="Type and press Enter to add a tag..."
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === 5}
        maxLength="20"
      />
      <span>{tags.length}/5 tags</span>
    </div>
  );
}
