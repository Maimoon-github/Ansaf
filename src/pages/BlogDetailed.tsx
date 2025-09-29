// // src/pages/BlogDetailed.tsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import { blogs } from "../components/BlogData";
// import Header from "@/components/Header2";
// import Footer from "@/components/Footer";

// export default function BlogDetailed() {

//     const { slug } = useParams<{ slug: string }>()
//   const [post, setPost] = React.useState<BlogDetail | null>(null)
//   const [loading, setLoading] = React.useState(true)
//   const [error, setError] = React.useState<string | null>(null)

//   React.useEffect(() => {
//     if (!slug) return
//     Api.getBlog(slug)
//       .then((data) => setPost(data as BlogDetail))
//       .catch((e) => setError(e.message))
//       .finally(() => setLoading(false))
//   }, [slug])

//   if (loading) return <main className="container mx-auto px-4 py-12">Loading…</main>
//   if (error) return <main className="container mx-auto px-4 py-12 text-red-600">{error}</main>
//   if (!post) return null


//   const { id } = useParams();
//   const blog = blogs.find((b) => b.id === id);

//   if (!blog) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-2xl font-bold text-gray-800">Blog not found</h1>
//       </div>
//     );
//   }

//   return (
//     <>
//     <Header/>
//    <article className="container mx-auto mt-20 px-4 pt-20 pb-12 max-w-3xl">
//   {/* Featured Image */}
//   <div className="w-full h-72 md:h-96 mb-8 overflow-hidden rounded-lg shadow">
//     <img
//       src={blog.image}
//       alt={blog.title}
//       className="w-full h-full object-cover"
//     />
//   </div>


//       {/* Title + Meta */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-snug">
//         {blog.title}
//       </h1>
//       <p className="text-gray-500 text-sm mb-1">{blog.date}</p>
//       <p className="text-gray-600 text-sm mb-6">
//         Reading time: about 15 minutes
//       </p>

//       {/* Blog Content */}
//       <div
//         className="prose prose-lg prose-gray max-w-none"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       />

//     </article>
//     <Footer/>
//     </>
//   );
// }




























// ---------------------------------------------------------------------------




























// src/pages/BlogDetailed.tsx
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header2";
import Footer from "@/components/Footer";
import { Api } from "@/lib/api"; // named export from your api helper (fetch-based)
import type { BlogDetail } from "@/lib/api-types";

export default function BlogDetailed() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<BlogDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!slug) return;
    Api.getBlog(slug)
      .then((data) => setPost(data as BlogDetail))
      .catch((e: unknown) => setError((e as { message?: string })?.message || String(e)))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return <main className="container mx-auto px-4 py-12">Loading…</main>;
  if (error)
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <strong className="block">Failed to load blog</strong>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-xs mt-2 text-gray-500">
            Open the console/network tab for diagnostics.
          </p>
        </div>
      </main>
    );
  if (!post)
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800">Blog not found</h1>
      </div>
    );

  return (
    <>
      <Header />
      <article className="container mx-auto mt-20 px-4 pt-20 pb-12 max-w-3xl">
        {/* Featured Image */}
        <div className="w-full h-72 md:h-96 mb-8 overflow-hidden rounded-lg shadow bg-gray-100">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder-hero.jpg";
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Title + Meta */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-snug">
          {post.title}
        </h1>
        <p className="text-gray-500 text-sm mb-1">
          {post.published ? new Date(post.published).toLocaleDateString() : ""}
        </p>
        <p className="text-gray-600 text-sm mb-6">Reading time: about 15 minutes</p>

        {/* Blog Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {post.body_html ? (
            <div dangerouslySetInnerHTML={{ __html: post.body_html }} />
          ) : (
            <p className="text-gray-600">Content not available.</p>
          )}
        </div>
      </article>
      <Footer />
    </>
  );
}
