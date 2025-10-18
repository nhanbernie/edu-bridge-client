import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Custom hook for infinite scroll with optimized settings for footer compatibility
 *
 * Key improvements:
 * - Larger rootMargin (300px) to trigger earlier
 * - Lower threshold (0.1) to be more sensitive
 * - Proper cleanup and ref management
 */
export const useTutorInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = "300px",
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  // Sync loading state to ref to avoid stale closures
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      // Only load more if:
      // 1. Element is intersecting
      // 2. Has more data to load
      // 3. Not currently loading
      if (entry.isIntersecting && hasMore && !isLoadingRef.current) {
        onLoadMore();
      }
    },
    [hasMore, onLoadMore]
  );

  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget || !hasMore) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      rootMargin, // Trigger 300px before reaching the element
      threshold, // Trigger when 10% of element is visible
    });

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [handleIntersection, hasMore, rootMargin, threshold]);

  return { observerTarget };
};
