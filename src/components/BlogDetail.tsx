import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/api/blogs";
import { Blog } from "@/types/blog";

interface BlogDetailProps {
  blogId: number;
}

export default function BlogDetail({ blogId }: BlogDetailProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId),
    enabled: !!blogId,
  });

  if (isLoading) {
    return <div>Loading blog...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Failed to load blog.</div>;
  }

  if (!data) return null;

  const blog: Blog = data;

  return (
    <div className="space-y-4">
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg"
      />

      <div>
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <div className="text-sm text-gray-500">
          {blog.category.join(", ")} •{" "}
          {new Date(blog.date).toLocaleDateString()}
        </div>
      </div>

      <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
    </div>
  );
}
