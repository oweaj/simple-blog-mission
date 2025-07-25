import Select from "@/components/common/Select";
import FormFieldWrapper from "@/components/form/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BLOG_CATEGORY } from "@/constants/blogCategory";
import { useBlogCreate } from "@/lib/queries/blog/useBlogCreate";
import { useBlogUpdate } from "@/lib/queries/blog/useBlogUpdate";
import { cn } from "@/lib/utils";
import { BlogCreateSchema } from "@/schemas/blog.schema";
import type { IBlogFormDataType } from "@/types/blog.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigationGuard } from "next-navigation-guard";
import { useForm } from "react-hook-form";
import BlogImageUpload from "./ImageUpload";

interface BlogFormProps {
  editMode: boolean;
  defaultData?: IBlogFormDataType;
  id?: string;
}

const BlogForm = ({ editMode, defaultData, id }: BlogFormProps) => {
  const { mutate: queryBlogCreate } = useBlogCreate();
  const { mutate: queryBlogUpdate } = useBlogUpdate();
  const filterCategory = BLOG_CATEGORY.filter((item) => item.value !== "all");

  const form = useForm<IBlogFormDataType>({
    defaultValues: {
      title: editMode ? defaultData?.title || "" : "",
      main_image: editMode ? defaultData?.main_image || "" : "",
      sub_image: editMode ? defaultData?.sub_image || "" : null,
      category_id: editMode ? defaultData?.category_id || "" : "",
      content: editMode ? defaultData?.content || "" : "",
    },
    resolver: zodResolver(BlogCreateSchema),
  });

  const onSubmit = (data: IBlogFormDataType) => {
    return editMode
      ? queryBlogUpdate({ id: id || "", formData: data })
      : queryBlogCreate(data);
  };

  useNavigationGuard({
    enabled:
      (!form.formState.isSubmitSuccessful &&
        !form.formState.isSubmitting &&
        form.formState.isDirty) ||
      (!form.formState.isSubmitSuccessful && editMode && !!defaultData),
    confirm: () =>
      window.confirm(
        "작성중인 내용이 삭제됩니다.(※ 수정 폼인 경우 내용만 사라집니다.)",
      ),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full h-full space-y-8"
      >
        <FormFieldWrapper
          control={form.control}
          name="title"
          label="타이틀(30자 이내)"
          placeholder="타이틀을 입력해주세요."
        />
        <div className="flex items-center justify-between gap-2 max-[580px]:flex-col">
          <FormFieldWrapper
            control={form.control}
            name="main_image"
            label="사진"
            customContent={(field) => (
              <BlogImageUpload form={form} field={field} tag="main" />
            )}
          />
          <FormFieldWrapper
            control={form.control}
            name="sub_image"
            customContent={(field) => (
              <BlogImageUpload form={form} field={field} tag="sub" />
            )}
          />
        </div>
        <FormFieldWrapper
          control={form.control}
          name="category_id"
          label="카테고리"
          customContent={(field) => (
            <Select
              data={filterCategory}
              value={field.value}
              placeholder="카테고리 선택"
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="content"
          label="내용(10자 이상)"
          customContent={(field) => (
            <textarea
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              style={{ resize: "none" }}
              className="h-80 border rounded-lg bg-gray-50 p-3"
              placeholder="블로그 글을 작성해주세요."
            />
          )}
        />
        <Button
          type="submit"
          className={cn("w-full h-12 text-base font-bold bg-orange-400")}
        >
          제출
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;
