import { usePages } from '@/hooks/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Pages = () => {
  const { data: pagesResponse, isLoading, error } = usePages({ status: 'published' });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Pages</h1>
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
        <h1 className="text-3xl font-bold mb-8">Pages</h1>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Failed to load pages</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  const pages = pagesResponse?.results || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pages</h1>

      {pages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No pages found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  <Link
                    to={`/page/${page.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {page.title}
                  </Link>
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {page.published_at && (
                      <span>{format(new Date(page.published_at), 'MMM dd, yyyy')}</span>
                    )}
                    <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                      {page.status}
                    </Badge>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {page.meta_description && (
                  <p className="text-gray-700 mb-4 line-clamp-3">{page.meta_description}</p>
                )}
                <Link
                  to={`/page/${page.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pages;