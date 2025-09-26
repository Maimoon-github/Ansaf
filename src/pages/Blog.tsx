import HeaderNew from '@/components/Header2';
import { useBlogs } from '@/hooks/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Blog = () => {
  console.log('Blog component rendering...');
  const { data: blogsResponse, isLoading, error, isError } = useBlogs({ status: 'published' });

  console.log('Blog data:', { blogsResponse, isLoading, error, isError });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Failed to load blogs</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  const blogs = blogsResponse?.results || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No blog posts found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {blog.title}
                  </Link>
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>By {blog.author_username}</span>
                    {blog.published_at && (
                      <>
                        <span>•</span>
                        <span>{format(new Date(blog.published_at), 'MMM dd, yyyy')}</span>
                      </>
                    )}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blog.excerpt && (
                  <p className="text-gray-700 mb-4 line-clamp-3">{blog.excerpt}</p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{blog.views_count || 0} views</span>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;