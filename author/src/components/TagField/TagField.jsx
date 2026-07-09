import { useState } from "react";

export function TagField({ tags, handleAddTag, handleRemoveTag }) {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12 &&
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
      <input
        id="tags"
        name="tags"
        type="text"
        placeholder={
          tags.length < 5 ? "Add a tag" : "You can only enter max. of 5 tags"
        }
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === 5}
      />
      <ul>
        {tags.map((tag, index) => (
          <span key={`${index}-${tag}`}>
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </ul>
    </div>
  );
}
