// // src/pages/Blogs.tsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { blogs } from "../components/BlogData"; // ✅ import from data
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// export default function Blogs() {
//     const [items, setItems] = React.useState<BlogListItem[]>([])
//     const [loading, setLoading] = React.useState(true)
//     const [error, setError] = React.useState<string | null>(null)

//     React.useEffect(() => {
//       Api.listBlogs()
//         .then((data) => {
//           const results = Array.isArray(data) ? data : (data.results ?? [])
//           setItems(results as BlogListItem[])
//         })
//         .catch((e) => setError(e.message))
//         .finally(() => setLoading(false))
//     }, [])

//     if (loading) return <section className="container mx-auto px-4 py-12">Loading…</section>
//     if (error) return <section className="container mx-auto px-4 py-12 text-red-600">{error}</section>

//   return (
//     <>
//     <Header/>
//     <section className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">News</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {blogs.map((blog) => (
//           <Link
//             to={`/blogs/${blog.id}`}
//             key={blog.id}
//             className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
//           >
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
//             />
//             <div className="p-4">
//               <p className="text-xs text-gray-500 mb-2">{blog.date}</p>
//               <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#003B5A]">
//                 {blog.title}
//               </h2>
//               <p className="text-sm text-gray-600">{blog.excerpt}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//     <Footer/>
//     </>
//   );
// }
























// -----------------------------------------------------------------------




























// src/pages/Blogs.tsx
import React from "react";
import { Link } from "react-router-dom";
import { blogs as fallbackBlogs } from "../components/BlogData"; // static fallback data (kept)
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Api } from "@/lib/api"; // fetch-based helper (named export)
import { BlogListItem } from '@/lib/api-types';
import useRealtimePosts from '@/hooks/useRealtimePosts';

export default function Blogs() {
  const [items, setItems] = React.useState<BlogListItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    Api.listBlogs()
      .then((data) => {
        // Api.listBlogs() returns either an array or { results: [...] }
        const results = Array.isArray(data) ? data : (data.results ?? []);
        setItems(results as BlogListItem[]);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  // Realtime updates: insert/update/delete posts as they come from backend
  // Helper to extract an identifier (id or slug) from various payload shapes
  function getIdentifier(obj: unknown): string | number | undefined {
    if (obj == null) return undefined;
    if (typeof obj === 'object') {
      const rec = obj as Record<string, unknown>;
      if (typeof rec.slug === 'string') return rec.slug;
      if (typeof rec.id === 'number' || typeof rec.id === 'string') return rec.id;
    }
    return undefined;
  }

  useRealtimePosts((ev) => {
    const t = ev.type ?? '';
    const payload = ev.payload;

    try {
      if (t.endsWith('.created')) {
        if (payload) setItems((prev) => [payload as unknown as BlogListItem, ...prev]);
        return;
      }

      if (t.endsWith('.updated')) {
        const payloadId = getIdentifier(payload);
        if (payloadId == null) return;
        setItems((prev) =>
          prev.map((p) => {
            const pid = getIdentifier(p as unknown);
            if (pid === payloadId) {
              return { ...p, ...(payload as Partial<BlogListItem>) };
            }
            return p;
          })
        );
        return;
      }

      if (t.endsWith('.deleted')) {
        const idToRemove = ev.id ?? getIdentifier(payload);
        setItems((prev) => prev.filter((p) => getIdentifier(p as unknown) !== idToRemove));
        return;
      }
    } catch (err: unknown) {
      console.error('Realtime handler error', err);
    }
  });

  if (loading) return <section className="container mx-auto px-4 py-12">Loading…</section>;
  if (error)
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <strong className="block">Failed to load blogs</strong>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-xs mt-2 text-gray-500">Check browser console / network tab for details.</p>
          <p className="text-xs mt-2 text-gray-600">
            Hint: ensure your Django backend is running (e.g. python manage.py runserver 8000).
            If using the Vite dev server, consider enabling a dev proxy for /api or set VITE_API_BASE_URL.
          </p>
        </div>
      </section>
    );

  // prefer API items; fallback to static blogs during dev or if API returns empty
  // Cast fallback data to API type for rendering; the UI is defensive about missing fields.
  const listToRender: BlogListItem[] = items.length ? items : (fallbackBlogs as unknown as BlogListItem[]);

  return (
    <>
      <Header />
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">News</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listToRender.length === 0 && (
            <div className="col-span-full text-center text-gray-600">
              No blog posts found.
            </div>
          )}

          {listToRender.map((blog: BlogListItem) => {
            // handle both API and static object shapes (UI reads fields defensively)
            const slugOrId = getIdentifier(blog) ?? blog.id ?? blog.slug;
            const _blogRec = blog as unknown as Record<string, unknown>;
            const imgSrc = blog.cover_image ?? (_blogRec.image as string | undefined) ?? "/placeholder-hero.jpg";
            const date = blog.published ? new Date(blog.published).toLocaleDateString() : (_blogRec.date as string | undefined);
            const excerpt = blog.excerpt ?? (_blogRec.summary as string | undefined) ?? "";

            return (
              <Link
                to={`/blogs/${slugOrId}`}
                key={slugOrId}
                className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={blog.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder-hero.jpg";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-2">{date}</p>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#003B5A]">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600">{excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
