import { Link, Outlet } from 'react-router';
import { ArticleInventoryProvider } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import { focusRingClass } from '../../ui/focusRing';
import { PageContainer } from '../../ui/PageContainer/PageContainer';
import { SectionMenu } from '../SectionMenu/SectionMenu';

const brandClass = `inline-flex min-h-11 items-center rounded text-lg font-bold text-accent transition-colors duration-200 hover:text-accent-strong ${focusRingClass}`;

export function AppShell() {
  return (
    <ArticleInventoryProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-20 bg-surface shadow-header">
          <PageContainer className="flex min-h-16 items-center justify-between gap-4 md:flex-wrap">
            <Link className={brandClass} to="/">
              Supermercado La Quinta
            </Link>
            <SectionMenu />
          </PageContainer>
        </header>
        <main className="flex-1 py-6 pb-24 md:py-10">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
      </div>
    </ArticleInventoryProvider>
  );
}
