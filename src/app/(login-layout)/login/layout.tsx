import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-primary-50 dark:bg-black-900 fixed z-20 h-full w-full">{children}</div>
  );
};

export default layout;
