
import { renderHook, act, waitFor } from '@testing-library/react';
import { useVisitedArticles } from './use-visited-articles';
import { useSession } from 'next-auth/react';
import { vi } from 'vitest';

// Mock next-auth/react
vi.mock('next-auth/react');

const mockUseSession = vi.mocked(useSession);

describe('useVisitedArticles', () => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  beforeEach(() => {
    localStorageMock.clear();
    mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with no visited articles for a new user', async () => {
    const { result } = renderHook(() => useVisitedArticles());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.visitedArticles.size).toBe(0);
  });

  it('should load visited articles from localStorage for unauthenticated user', async () => {
    localStorage.setItem('visitedArticles', JSON.stringify(['slug-1', 'slug-2']));
    const { result } = renderHook(() => useVisitedArticles());

    await waitFor(() => {
      expect(result.current.visitedArticles.size).toBe(2);
    });

    expect(result.current.isVisited('slug-1')).toBe(true);
    expect(result.current.isVisited('slug-2')).toBe(true);
  });

  it('should mark an article as visited for unauthenticated user and save to localStorage', async () => {
    const { result } = renderHook(() => useVisitedArticles());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      result.current.markAsVisited('slug-1');
    });

    expect(result.current.isVisited('slug-1')).toBe(true);
    expect(JSON.parse(localStorage.getItem('visitedArticles')!)).toEqual(['slug-1']);
  });

  it('should not add duplicate slugs', async () => {
    localStorage.setItem('visitedArticles', JSON.stringify(['slug-1']));
    const { result } = renderHook(() => useVisitedArticles());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.visitedArticles.size).toBe(1);

    await act(async () => {
      result.current.markAsVisited('slug-1');
    });

    expect(result.current.visitedArticles.size).toBe(1);
    expect(JSON.parse(localStorage.getItem('visitedArticles')!)).toEqual(['slug-1']);
  });

  it('should handle multiple rapid calls without losing data', () => {
    const { result } = renderHook(() => useVisitedArticles());

    // Use the same function reference for all calls within a single synchronous block
    const { markAsVisited } = result.current;

    act(() => {
      markAsVisited('slug-1');
      markAsVisited('slug-2');
      markAsVisited('slug-3');
    });

    const fromStorage = JSON.parse(localStorage.getItem('visitedArticles')!);
    expect(fromStorage).toEqual(['slug-1', 'slug-2', 'slug-3']);
  });
});
