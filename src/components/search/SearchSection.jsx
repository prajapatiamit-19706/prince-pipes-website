"use client";

export const SearchSection = ({ title, children }) => {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="px-4 text-xs font-semibold tracking-wider text-primary uppercase mb-3">
        {title}
      </h3>
      <div className="flex flex-col gap-1">
        {children}
      </div>
    </div>
  );
};
