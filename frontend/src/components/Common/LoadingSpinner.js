import React from 'react';
import { Spinner } from '@heroui/react';

const LoadingSpinner = ({ size = 'lg', text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <Spinner size={size} color="primary" />
      {text && (
        <p className="text-foreground-600 text-sm">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
