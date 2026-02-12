"use client";

import type { RefObject, ReactNode } from "react";
import { cn } from "@/lib/utils";
import MenuDotsIcon from "@/icons/menu-dots.svg";

export type DropdownMenuItem = {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  variant?: "default" | "danger";
  icon?: ReactNode;
};

type DropdownMenuProps = {
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onToggle: (e: React.MouseEvent) => void;
  items: DropdownMenuItem[];
  trigger?: ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
};

export function DropdownMenu({
  isOpen,
  menuRef,
  onToggle,
  items,
  trigger,
  triggerClassName,
  contentClassName,
}: DropdownMenuProps) {
  return (
    <div className="relative" ref={isOpen ? menuRef : null}>
      <button
        type="button"
        onClick={onToggle}
        className={cn("group p-1 cursor-pointer", triggerClassName)}
        aria-label="메뉴 열기"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger ?? (
          <MenuDotsIcon className="size-4 invisible group-hover:visible cursor-pointer" />
        )}
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 top-full mt-1 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px] dark:bg-gray-800 dark:border-gray-700",
            contentClassName
          )}
          role="menu"
        >
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                item.onClick(e);
              }}
              className={cn(
                "w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2",
                item.variant === "danger"
                  ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
