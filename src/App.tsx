import { useState } from "react";
import BlogList from "@/components/BlogList";
import BlogDetail from "@/components/BlogDetail";
import CreateBlogForm from "@/components/CreateBlogForm";

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">CA Monk Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="md:col-span-1 space-y-4">
          <CreateBlogForm />
          <BlogList onSelectBlog={setSelectedBlogId} />
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 border rounded-lg p-6 bg-white">
          {selectedBlogId ? (
            <BlogDetail blogId={selectedBlogId} />
          ) : (
            <div className="text-gray-400 flex items-center justify-center h-full">
              Select a blog to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
