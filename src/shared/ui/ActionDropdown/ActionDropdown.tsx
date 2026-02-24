"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/_shadcn/dropdown-menu";

export interface ActionDropdownItem {
  label: string;
  onClick: () => void;
}

export interface ActionDropdownProps {
  /** 트리거 버튼의 aria-label */
  ariaLabel: string;
  /** 트리거에 보여줄 내용 (아이콘 등) */
  trigger: React.ReactNode;
  /** 드롭다운 메뉴 아이템 (이름, 클릭 핸들러) */
  items: ActionDropdownItem[];
  triggerClassName?: string;
}

export function ActionDropdown({
  ariaLabel,
  trigger,
  items,
  triggerClassName = "cursor-pointer outline-none",
}: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className={triggerClassName}
        aria-label={ariaLabel}
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
