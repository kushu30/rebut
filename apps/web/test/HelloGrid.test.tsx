import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { HelloGrid } from '../src/HelloGrid';

afterEach(cleanup);

describe('HelloGrid', () => {
  it('renders an AG Grid with case column headers', async () => {
    render(<HelloGrid />);
    expect(await screen.findByText('Case')).toBeTruthy();
    expect(await screen.findByText('Amount')).toBeTruthy();
  });
});
