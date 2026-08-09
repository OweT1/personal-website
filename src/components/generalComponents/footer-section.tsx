export function FooterSection() {
  return (
    <footer className="text-center text-slate-400 py-10 text-sm border-t border-slate-200">
      <p>© {new Date().getFullYear()} Owen Tan Keng Leng.</p>
      <p className="mt-1">
        Actively seeking full-time data science and quantitative roles.
      </p>
    </footer>
  );
}