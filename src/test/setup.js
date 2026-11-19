import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => localStorage.removeItem('token'));
afterEach(() => {
  cleanup();
  localStorage.removeItem('token');
  vi.restoreAllMocks();
});
