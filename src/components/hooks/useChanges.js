import React, { useCallback, useState } from 'react';

const useChanges = (keys) => {
  const [values, setValue] = useState(keys);
  const handleChange = useCallback((key) => (text) => {
    setValue({ ...values, [key]: text });
  }, [values]);
  return {
    values,
    handleChange,
    setValue,
  };
};

export default useChanges;
