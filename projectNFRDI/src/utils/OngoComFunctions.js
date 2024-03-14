// VisibilityToggles.js
import { useState } from 'react';

export const useVisibilityToggles = () => {
  const [isOngoingActive, setIsOngoingActive] = useState(false);
  const [isCompletedActive, setIsCompletedActive] = useState(false);

  const toggleOngoingVisibility = () => {
    setIsOngoingActive(!isOngoingActive);
    setIsCompletedActive(false); // Deactivate completed when ongoing is clicked
  };

  const toggleCompletedVisibility = () => {
    setIsCompletedActive(!isCompletedActive);
    setIsOngoingActive(false); // Deactivate ongoing when completed is clicked
  };

  return { isOngoingActive, isCompletedActive, toggleOngoingVisibility, toggleCompletedVisibility };
};
