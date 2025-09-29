// src/pages/BlogDetailed.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { blogs } from "../components/BlogData";
import Header from "@/components/Header2";
import Footer from "@/components/Footer";

export default function BlogDetailed() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800">Blog not found</h1>
      </div>
    );
  }

  return (
    <>
    <Header/>
   <article className="container mx-auto mt-20 px-4 pt-20 pb-12 max-w-3xl">
  {/* Featured Image */}
  <div className="w-full h-72 md:h-96 mb-8 overflow-hidden rounded-lg shadow">
    <img
      src={blog.image}
      alt={blog.title}
      className="w-full h-full object-cover"
    />
  </div>


      {/* Title + Meta */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-snug">
        {blog.title}
      </h1>
      <p className="text-gray-500 text-sm mb-1">{blog.date}</p>
      <p className="text-gray-600 text-sm mb-6">
        Reading time: about 15 minutes
      </p>

      {/* Blog Content */}
      <div
        className="prose prose-lg prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

    </article>
    <Footer/>
    </>
  );
}
