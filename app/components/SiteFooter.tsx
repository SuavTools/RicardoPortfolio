export default function SiteFooter() {
  const link = 'font-mono text-xs text-zinc-400 hover:text-[#ffe66c] transition-colors uppercase tracking-wider';

  return (
    <footer className="bg-zinc-950 px-4 py-10 md:px-16 lg:px-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex gap-8">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn
          </a>
          <a href="mailto:ricardo.moreira.designs@gmail.com" className={link}>
            Email
          </a>
        </div>
        <span className="font-mono text-xs text-zinc-600 uppercase tracking-wider">© 2026 Ricardo Moreira</span>
      </div>
    </footer>
  );
}
