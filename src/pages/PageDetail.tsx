import { usePage } from '@/hooks/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading, error } = usePage(slug || '');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/pages">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pages
          </Button>
        </Link>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Page not found</p>
          <Link to="/pages">
            <Button>Return to Pages</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/pages">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pages
        </Button>
      </Link>

      <article>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl mb-4">{page.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>By {page.author_username}</span>
                {page.published_at && (
                  <span>{format(new Date(page.published_at), 'MMMM dd, yyyy')}</span>
                )}
                <span>{page.views_count || 0} views</span>
              </div>
              {page.tags && page.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {page.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {page.excerpt && (
              <div className="text-lg text-gray-700 mb-6 italic border-l-4 border-gray-300 pl-4">
                {page.excerpt}
              </div>
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content || '<p>No content available.</p>' }}
            />
          </CardContent>
        </Card>
      </article>
    </div>
  );
};

export default PageDetail;