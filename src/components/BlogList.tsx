import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { Blog } from "@/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogListProps {
  onSelectBlog: (id: number) => void;
}

export default function BlogList({ onSelectBlog }: BlogListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return <div className="p-4">Loading blogs...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Failed to load blogs.</div>;
  }

  return (
    <div className="space-y-4">
      {data?.map((blog: Blog) => (
        <Card
          key={blog.id}
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => onSelectBlog(blog.id!)}
        >
          <CardHeader>
            <CardTitle className="text-lg">{blog.title}</CardTitle>
            <div className="text-xs text-gray-500">
              {blog.category.join(", ")}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{blog.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
