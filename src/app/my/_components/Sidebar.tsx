"use client";

import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import { MYPAGE_SIDE_BAR } from "@/constants/mypageSidebar";
import { useUserDelete } from "@/lib/queries/auth/useUserDelete";
import { useUser } from "@/lib/queries/blog/useUser";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { mutate: userDelete } = useUserDelete();
  const user = useUser();

  return (
    <div className="min-w-[250px]">
      <Link href={"/my"}>
        <h2 className="inline-block text-[22px] font-semibold mb-6">
          마이페이지
        </h2>
      </Link>
      <nav className="space-y-8">
        {MYPAGE_SIDE_BAR.map(({ groupName, items }) => (
          <div key={groupName} className="">
            <h3 className="text-lg font-semibold mb-2">{groupName}</h3>
            <ul className="text-[15px] text-gray-500 space-y-2">
              {items.map(({ name, path }) =>
                path ? (
                  <li key={name}>
                    <Link href={path} className="hover:text-gray-700">
                      {name}
                    </Link>
                  </li>
                ) : (
                  <Modal
                    key={name}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    size="w-[35rem]"
                    content={
                      <span className="flex flex-col items-center gap-2">
                        <span>
                          <strong className="underline">{user?.email}</strong>{" "}
                          계정의 모든 데이터가 삭제되며 복구할 수 없습니다.
                        </span>
                        <label className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                          />
                          안내 사항 확인과 이에 대한 동의를 합니다.
                        </label>
                      </span>
                    }
                    trigger={
                      <li className="hover:text-gray-700 cursor-pointer">
                        {name}
                      </li>
                    }
                    actionButton={
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-1/3 h-10"
                          onClick={() => setIsOpen(false)}
                        >
                          취소
                        </Button>
                        <Button
                          type="submit"
                          className="w-1/3 h-10 border bg-red-500 font-semibold"
                          onClick={() => userDelete(user?._id || "")}
                          disabled={!checked}
                        >
                          확인
                        </Button>
                      </>
                    }
                  />
                ),
              )}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
