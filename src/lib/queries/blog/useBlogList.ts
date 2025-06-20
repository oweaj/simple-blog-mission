import { blogListApi } from "@/lib/api/blog/blog";
import type { TBlogListType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useBlogList = ({
  category,
  page,
}: { category: string | null; page: number }) => {
  const data = useQuery<{ data: TBlogListType[]; count: number }>({
    queryKey: ["blog_list", category ?? null, page],
    queryFn: () => blogListApi({ category: category ?? null, page }),
  });

  return { data: data.data?.data, count: data?.data?.count };
};
