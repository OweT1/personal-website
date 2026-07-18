export function FooterSection() {
  return (
    <footer className="text-center text-slate-400 py-10 text-sm">
      <p>
        © {new Date().getFullYear()} Owen. Built with React, Tailwind & Vite.
      </p>
    </footer>
  );
}
