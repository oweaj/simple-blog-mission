"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PageTitle = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex items-center gap-2 text-xl font-semibold cursor-pointer"
      onClick={() => router.back()}
    >
      <ChevronLeft />
      <span className="truncate">{title}</span>
    </button>
  );
};

export default PageTitle;
