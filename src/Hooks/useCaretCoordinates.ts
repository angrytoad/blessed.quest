import React from 'react';
const useCaretCoordinates = () => {
  const [
    position,
    setPosition
  ] = React.useState<{ x: null | number, y: null | number}>({ x: null, y: null });
  React.useEffect(() => {
    const updateCaretPosition = () => {

    };
    window.addEventListener('keydown', updateCaretPosition);
    return () => {
      window.removeEventListener('keydown', updateCaretPosition);
    };
  }, []);


  return position;
};
export default useCaretCoordinates;

