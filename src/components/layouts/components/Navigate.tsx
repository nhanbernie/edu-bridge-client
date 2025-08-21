import React from "react";

const Navigate = ({ items }: { items: any[] }) => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`group relative inline-block text-sm font-medium ${
            item.active ? "text-black" : "text-gray-300 hover:text-white"
          }`}
        >
          {item.label}
          <span
            className={`pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] origin-center scale-x-0 rounded bg-blue-400 transition-transform duration-200 group-hover:scale-x-100 ${
              item.active ? "scale-x-100" : ""
            }`}
          />
        </a>
      ))}
    </nav>
  );
};

export default Navigate;
