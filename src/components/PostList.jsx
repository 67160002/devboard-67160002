import { useState } from "react";
import PostCard from "./PostCard";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // เพิ่ม state สำหรับ sort (desc = ใหม่ก่อน)

  //  ฟังก์ชันสลับการ sort
  function toggleSort() {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  }

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // sort ก่อน map
  const sortedPosts = [...filtered].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.id - a.id; // ใหม่ก่อน
    } else {
      return a.id - b.id; // เก่าก่อน
    }
  });

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/*  ปุ่ม sort */}
      <button
        onClick={toggleSort}
        style={{
          marginBottom: "0.75rem",
          padding: "0.4rem 0.8rem",
          borderRadius: "6px",
          border: "1px solid #cbd5e0",
          background: "#edf2f7",
          cursor: "pointer",
        }}
      >
        {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
      </button>

      {/* Search Input */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ //ใช้ sortedPosts แทน filtered */}
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
