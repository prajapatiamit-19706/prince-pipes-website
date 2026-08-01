export const FooterColumn = ({ title, children, className = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {title && (
        <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">
          {title}
        </h4>
      )}
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
};
