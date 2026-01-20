import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";
import { Blog } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateBlogForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Blog>({
    title: "",
    category: [],
    description: "",
    date: new Date().toISOString(),
    coverImage: "",
    content: "",
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      alert("Blog created successfully!");
      setForm({
        title: "",
        category: [],
        description: "",
        date: new Date().toISOString(),
        coverImage: "",
        content: "",
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      setForm({ ...form, category: value.split(",").map((c) => c.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border rounded-lg p-4 bg-white"
    >
      <h2 className="text-lg font-semibold">Create New Blog</h2>

      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <Input
        name="category"
        placeholder="Categories (comma separated)"
        onChange={handleChange}
        required
      />

      <Input
        name="coverImage"
        placeholder="Cover image URL"
        value={form.coverImage}
        onChange={handleChange}
      />

      <Textarea
        name="description"
        placeholder="Short description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <Textarea
        name="content"
        placeholder="Full content"
        value={form.content}
        onChange={handleChange}
        required
      />

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </Button>

      {mutation.isError && (
        <p className="text-sm text-red-500">Failed to create blog.</p
