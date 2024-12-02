import React, { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

//* hides all default view components except "Add button"
export const DefaultRenderWrapper: React.FC<Props> = ({ children }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stackElements =
      parentRef?.current?.querySelectorAll('[data-ui="Card"]');

    stackElements?.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      // htmlElement.style.visibility = 'hidden';
      // htmlElement.style.height = '0px';
    });
  }, []);

  return <div ref={parentRef}>{children}</div>;
};
