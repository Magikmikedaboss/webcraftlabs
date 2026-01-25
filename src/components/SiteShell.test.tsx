import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SiteShell from '@/components/SiteShell';
import { ThemeProvider } from '@/components/ThemeProvider';

describe('SiteShell', () => {
  it('renders the title and intro', () => {
    render(
      <ThemeProvider>
        <SiteShell title="Test Title" intro="Test intro">
          <div>Child content</div>
        </SiteShell>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test intro')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
