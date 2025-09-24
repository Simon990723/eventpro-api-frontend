import { useEffect, useRef, type RefObject } from 'react';

function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: MouseEvent | TouchEvent | PointerEvent) => void
) {
    // Keep the latest handler without re-subscribing listeners each render
    const handlerRef = useRef(handler);
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const doc: Document | null = typeof document !== 'undefined' ? document : null;
        const win: Window | null = typeof window !== 'undefined' ? window : null;
        if (!doc || !win) return;

        // Use window.Node if available to avoid referencing a missing global in SSR
        const NodeCtor: unknown = (win as any).Node;

        const isInside = (target: EventTarget | null): boolean => {
            const el = ref.current;
            if (!el || !target) return false;
            if (NodeCtor && target instanceof (NodeCtor as any)) {
                return (el as any).contains(target as any);
            }
            return false;
        };

        const isInsideViaComposedPath = (ev: Event): boolean => {
            const el = ref.current;
            if (!el) return false;
            const composedPath = (ev as unknown as { composedPath?: () => EventTarget[] }).composedPath?.();
            if (Array.isArray(composedPath)) {
                return composedPath.includes(el);
            }
            return isInside(ev.target);
        };

        const onPointerDown = (event: PointerEvent) => {
            if (isInsideViaComposedPath(event)) return;
            handlerRef.current(event);
        };

        const onMouseDown = (event: MouseEvent) => {
            if (isInsideViaComposedPath(event)) return;
            handlerRef.current(event);
        };

        const onTouchStart = (event: TouchEvent) => {
            if (isInsideViaComposedPath(event)) return;
            handlerRef.current(event);
        };

        const supportsPointer = 'PointerEvent' in win;
        if (supportsPointer) {
            doc.addEventListener('pointerdown', onPointerDown);
        } else {
            doc.addEventListener('mousedown', onMouseDown);
            doc.addEventListener('touchstart', onTouchStart, { passive: true });
        }

        return () => {
            if (supportsPointer) {
                doc.removeEventListener('pointerdown', onPointerDown);
            } else {
                doc.removeEventListener('mousedown', onMouseDown);
                doc.removeEventListener('touchstart', onTouchStart);
            }
        };
    }, [ref]);
}

export default useClickOutside;