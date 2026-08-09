export function FooterSection() {
  return (
    <footer className="text-center text-slate-400 py-10 text-sm border-t border-slate-200">
      <p>© {new Date().getFullYear()} Owen Tan Keng Leng.</p>
      <p className="mt-1">
        Actively building and always on the look-out for opportunities to
        contribute!
      </p>
    </footer>
  );
}
