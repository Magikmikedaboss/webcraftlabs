import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SiteShell from '@/components/SiteShell';

describe('SiteShell', () => {
  it('renders the title and intro', () => {
    render(
      <SiteShell title="Test Title" intro="Test intro">
        <div>Child content</div>
      </SiteShell>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test intro')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
