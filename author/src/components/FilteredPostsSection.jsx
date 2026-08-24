import { useState } from "react";
import PostList from "./PostList";

export function FilteredPostsSection({ posts }) {
  const TABS = [
    {
      label: "All",
      value: "all",
      posts: posts,
    },
    {
      label: "Drafts",
      value: "drafts",
      posts: posts.filter((post) => !post.published),
    },
    {
      label: "Published",
      value: "published",
      posts: posts.filter((post) => post.published),
    },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  function handleTabChange(e) {
    let index = TABS.findIndex((tab) => tab.value === e.target.value);
    setActiveTab(TABS[index]);
  }

  return (
    <div>
      {TABS.map((tab) => (
        <button value={tab.value} onClick={handleTabChange}>
          {tab.label}
        </button>
      ))}
      <PostList list={activeTab.posts} />
    </div>
  );
}
