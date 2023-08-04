import React, { useEffect, useState, useRef, useCallback } from 'react';
import './_tooltip.sass';

const Tooltip = ({ children, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const [tooltipStyle, setTooltipStyle] = useState({});

  const activeTooltip = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setShowTooltip(false);
    setTooltipStyle({});
  }, []);

  const handleGetCoordinates = useCallback((event) => {
    const { clientX, clientY } = event;
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const windowWidth = window.innerWidth;

    let top = clientY + 24;
    let left = clientX - 16;

    // Check if tooltip overflows horizontally
    if (left + tooltipWidth + 50 > windowWidth) {
      left = windowWidth - tooltipWidth - 50;
    }

    setTooltipStyle({
      top: `${top}px`,
      left: `${left}px`,
    });
  }, []);

  useEffect(() => {
    const tooltipContainer = tooltipRef.current;

    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);

    if (isMobile) {
      if (tooltipContainer) {
        tooltipContainer.addEventListener('click', handleGetCoordinates);
        tooltipContainer.addEventListener('click', activeTooltip);
        window.addEventListener('scroll', hideTooltip);
        document.addEventListener('touchstart', hideTooltip);
      }
    } else {
      if (tooltipContainer) {
        tooltipContainer.addEventListener('mouseover', activeTooltip);
        tooltipContainer.addEventListener('mouseout', hideTooltip);
        tooltipContainer.addEventListener('mousemove', handleGetCoordinates);
      }
    }
  }, [activeTooltip, handleGetCoordinates, hideTooltip]);

  return (
    <div className="tooltipWrapper" ref={tooltipRef}>
      {children}
      <span
        className="tooltip"
        style={showTooltip ? tooltipStyle : { display: 'none' }}
      >
        {tooltip}
      </span>
    </div>
  );
};

export default Tooltip;
