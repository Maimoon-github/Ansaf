// src/pages/Blogs.tsx
import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../components/BlogData"; // ✅ import from data
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Blogs() {
  return (
    <>
    <Header/>
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">News</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-2">{blog.date}</p>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#003B5A]">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600">{blog.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
    <Footer/>
    </>
  );
}
