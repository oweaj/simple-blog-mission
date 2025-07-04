import type { IBlogDataType, IBlogListType } from "@/types/blog.type";

export const mockBlogData: IBlogDataType = {
  _id: "test-id",
  title: "테스트 제목",
  content: "테스트 내용 입력 영역입니다.",
  main_image: "/test-image.jpg",
  sub_image: null,
  category_id: "daily_life",
  deleted_at: null,
  user_id: { _id: "user-id", email: "test@test.com", name: "테스트" },
  createdAt: "2025-01-01T00:00:00.000Z",
  updateAt: null,
};

export const mockBlogListData: IBlogListType = {
  bloglist: [mockBlogData],
  page: 1,
  limit: 10,
  totalPages: 1,
  totalCount: 1,
};
