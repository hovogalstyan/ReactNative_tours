import React, { useCallback, useState } from 'react';

const useToggle = (bool) => {
  const [toggle, setToggle] = useState(bool);
  const handleToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);
  return [
    toggle,
    handleToggle,
  ];
};

export default useToggle;
