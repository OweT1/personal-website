export const buttonVariants = {
  icon:
    "text-ink-muted hover:text-brand hover:-translate-y-0.5 transition-all duration-200",
  primary:
    "inline-flex items-center justify-center gap-2 bg-brand text-brand-ink px-5 py-2.5 rounded-md font-semibold shadow-sm hover:bg-brand-hover hover:-translate-y-0.5 transition-all duration-200 hover:cursor-pointer",
  secondary:
    "inline-flex items-center justify-center gap-2 bg-surface text-brand border border-brand/30 px-5 py-2.5 rounded-md font-semibold hover:border-brand/60 hover:bg-brand-soft transition-colors duration-200 hover:cursor-pointer",
  headerLink:
    "relative text-sm font-medium text-ink-muted hover:text-ink transition-colors hover:cursor-pointer",
  headerLinkActive: "text-brand",
};

export const cardVariants = {
  base:
    "bg-surface border border-line rounded-2xl shadow-sm transition-all duration-300",
  interactive:
    "hover:shadow-lg hover:border-brand/30 hover:-translate-y-1 dark:hover:shadow-brand/5",
};

export const pillVariants = {
  base:
    "px-4 py-1.5 bg-surface-muted text-ink-muted rounded-full text-sm font-medium transition-colors duration-200 cursor-default",
  hover: "hover:bg-brand hover:text-brand-ink",
};
