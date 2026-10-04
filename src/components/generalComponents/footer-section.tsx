export function FooterSection() {
  return (
    <footer className="text-center text-ink-subtle py-10 text-sm border-t border-line">
      <p>© {new Date().getFullYear()} Owen Tan Keng Leng.</p>
      <p className="mt-1">
        Actively building and always on the look-out for opportunities to
        contribute!
      </p>
    </footer>
  );
}
