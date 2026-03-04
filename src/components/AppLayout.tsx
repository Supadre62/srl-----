import { ReactNode } from 'react';

interface AppLayoutProps {
  title: string;
  subtitle: string;
  stepper: ReactNode;
  supportPanel: ReactNode;
  sidebar?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

const AppLayout = ({ title, subtitle, stepper, supportPanel, sidebar, footer, children }: AppLayoutProps) => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-4 pb-6 pt-5 md:px-6 lg:px-8">
      <header className="panel mb-4 px-6 py-5">
        <p className="font-serif text-2xl font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        <div className="mt-4">{stepper}</div>
      </header>

      <main className={`grid flex-1 gap-4 ${sidebar ? 'lg:grid-cols-[minmax(0,1fr)_340px]' : 'lg:grid-cols-1'}`}>
        <section className="flex min-h-[620px] flex-col gap-4">
          <div className="panel flex-1 p-5 md:p-6">{children}</div>
          <div className="panel p-4">{supportPanel}</div>
        </section>
        {sidebar ? <aside className="panel p-4">{sidebar}</aside> : null}
      </main>

      <footer className="panel mt-4 p-4">{footer}</footer>
    </div>
  );
};

export default AppLayout;
