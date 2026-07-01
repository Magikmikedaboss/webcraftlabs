import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import MDXTakeaways, { Takeaways as TypedTakeaways } from './Takeaways';

describe('Takeaways components', () => {
  it('TypedTakeaways renders items passed with correct shape', () => {
    render(<TypedTakeaways items={[{ id: 'a', text: 'First' }]} title="T" />);
    expect(screen.getByText('First')).toBeTruthy();
  });

  it('MDX wrapper filters out invalid items and renders valid ones', () => {
    const mixed: unknown = [{ id: 'a', text: 'One' }, { foo: 'bar' }];
    render(<MDXTakeaways items={mixed} title="T" />);
    expect(screen.getByText('One')).toBeTruthy();
    expect(screen.queryByText('bar')).toBeNull();
  });

  it('MDX wrapper handles non-array items gracefully (renders nothing)', () => {
    render(<MDXTakeaways items={("not-an-array" as unknown)} />);
    // component returns null when no valid items; assert list is absent
    expect(screen.queryByRole('list')).toBeNull();
  });
});
