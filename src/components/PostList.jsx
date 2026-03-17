import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  //  ฟังก์ชันสลับการ sort
  function toggleSort() {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรก
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []); // [] = ทำครั้งเดียวตอน component mount

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedPosts = [...filtered].sort((a, b) => {
    return sortOrder === "desc" ? b.id - a.id : a.id - b.id;
  });

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

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

      {/* ปุ่ม sort */}
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

      {/* search */}
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

      {/* ไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* เปลี่ยน filtered เป็น sortedPosts(เรียงแล้ว) */}
      {/* list */}
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
