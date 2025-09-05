import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll reveal animations using Intersection Observer API
 * Adds 'revealed' class to elements when they come into viewport
 */
export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const elementsRef = useRef<(Element | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    // Check if browser supports Intersection Observer
    if (!window.IntersectionObserver) {
      // Fallback: immediately reveal all elements
      elementsRef.current.forEach(el => {
        if (el) el.classList.add('revealed');
      });
      return;
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Unobserve after first intersection if triggerOnce is true
            if (triggerOnce && observerRef.current) {
              observerRef.current.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            // Remove revealed class if element goes out of view and triggerOnce is false
            entry.target.classList.remove('revealed');
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Observe all current elements
    elementsRef.current.forEach(el => {
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Function to add element to be observed
  const addElement = (element: Element | null) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
      
      // If observer is already created, observe this new element
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    }
  };

  // Function to remove element from observation
  const removeElement = (element: Element | null) => {
    if (element) {
      const index = elementsRef.current.indexOf(element);
      if (index > -1) {
        elementsRef.current.splice(index, 1);
        
        if (observerRef.current) {
          observerRef.current.unobserve(element);
        }
      }
    }
  };

  return { addElement, removeElement };
};

/**
 * Simple hook that returns a ref callback for automatic scroll reveal
 * Usage: <div ref={scrollRevealRef} className="scroll-reveal">Content</div>
 */
export const useScrollRevealRef = (options: UseScrollRevealOptions = {}) => {
  const { addElement } = useScrollReveal(options);

  return (element: Element | null) => {
    addElement(element);
  };
};

/**
 * Utility function to initialize scroll reveal for existing DOM elements
 * Useful for server-side rendered content or third-party components
 */
export const initializeScrollReveal = (selector: string = '.scroll-reveal', options: UseScrollRevealOptions = {}) => {
  const elements = document.querySelectorAll(selector);
  const { addElement } = useScrollReveal(options);

  elements.forEach(addElement);
};