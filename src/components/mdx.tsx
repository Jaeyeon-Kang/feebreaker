import Link from "next/link";
import type { ReactNode } from "react";

function CTA({ href, title, children }: { href: string; title: string; children: ReactNode }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-8 not-prose">
      <p className="font-semibold text-emerald-900 mb-2">{title}</p>
      <div className="text-sm text-emerald-800 mb-3">{children}</div>
      <Link
        href={href}
        className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Open calculator →
      </Link>
    </div>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-6 text-sm text-slate-700 not-prose">
      {children}
    </div>
  );
}

const h2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3" {...props} />
);

const h3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2" {...props} />
);

const p = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-slate-600 leading-relaxed my-4" {...props} />
);

const ul = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="list-disc pl-5 space-y-2 my-4 text-slate-600" {...props} />
);

const ol = (props: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-600" {...props} />
);

const table = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto my-6">
    <table className="w-full text-sm border-collapse border border-slate-200" {...props} />
  </div>
);

const thead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-slate-50" {...props} />
);

const th = (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700" {...props} />
);

const td = (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="p-3 border border-slate-200 text-slate-600" {...props} />
);

const strong = (props: React.HTMLAttributes<HTMLElement>) => (
  <strong className="font-semibold text-slate-900" {...props} />
);

const a = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a className="text-emerald-600 hover:text-emerald-700 underline" {...props} />
);

export const mdxComponents = {
  CTA,
  Callout,
  h2,
  h3,
  p,
  ul,
  ol,
  table,
  thead,
  th,
  td,
  strong,
  a,
};
