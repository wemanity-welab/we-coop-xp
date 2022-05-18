import React, { useRef, useEffect } from 'react';

/**
 * Hook that do the action parameter(a function) when clicks outside of the passed ref
 */
function useOutsideClick(ref, action) {
  useEffect(() => {
    /**
     * Action if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideClick;
