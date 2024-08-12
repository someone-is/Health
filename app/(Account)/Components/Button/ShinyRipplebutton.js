'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './Shiny.module.css';

const ShinyRippleButton = ({
  children,
  extraLeave = 0,
  extraMove = 0,
  CustomDesign = styles.rippleButton,
  typeC = '',
  bgColourover = 'rgba(255,0,0,1)',
  bgColourLeave,
  onClick,
}) => {
  const buttonRef = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const [rippleStyle, setRippleStyle] = useState({});
  const [isRippling, setIsRippling] = useState(false);
  const [rippleStyleClick, setRippleStyleClick] = useState({});

  // Default bgColourLeave to bgColourover if not provided
  bgColourLeave = bgColourLeave || bgColourover;

  const createRipple = (event, sizeAdjustment) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) + sizeAdjustment;

    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    return {
      width: size,
      height: size,
      top: `${y}px`,
      left: `${x}px`,
    };
  };

  const handleClick = (event) => {
      if (onClick) {
        event.preventDefault();
        onClick(event);
      }
    // event.stopPropagation();
    setRippleStyleClick(createRipple(event, 0));
    setIsRippling(true);
  };

  const handleMouseLeave = (event) => {
    setRippleStyle({
      ...createRipple(event, -extraLeave),
      background: `radial-gradient(circle, ${bgColourLeave} 0%, rgba(56,254,0,0) 100%)`,
    });
    setIsOver(false);
  };

  const handleMouseMove = (event) => {
    setRippleStyle({
      ...createRipple(event, extraMove),
      background: `radial-gradient(circle, ${bgColourover} 0%, rgba(56,254,0,0) 100%)`,
    });
    setIsOver(true);
  };

  useEffect(() => {
    if (isRippling) {
      const timeout = setTimeout(() => setIsRippling(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isRippling]);

  return (
    <button
      ref={buttonRef}
      type={typeC}
      className={`${CustomDesign} ${styles.defaultShinybutton}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <span className={isOver ? styles.ripple : styles.rippleleave} style={rippleStyle} />
      {isRippling && <span className={styles.rippleclick} style={rippleStyleClick} />}
      <div className={styles.title}>{children}</div>
    </button>
  );
};

export default ShinyRippleButton;



// // components/RippleButton.js
// import { useState, useEffect, useRef } from 'react';
// import styles from './Shiny.module.css';

// const ShinyRippleButton = ({ children, extraLeave, extraMove, CustomDesign, typeC, bgColourover, bgColourLeave, onClick }) => {

//     if (!bgColourover) {
//         bgColourover = 'rgba(255,0,0,1)'
//     }
//     if (!bgColourLeave) {
//         bgColourLeave = bgColourover
//     }
//     if (!typeC) {
//         typeC = ''
//     }
//     if (!extraLeave) {
//         console.log("Not extraleave is -", !extraLeave)
//         extraLeave = 0
//     }
//     if (!extraMove) {
//         console.log("Not extraleave is -", !extraMove)
//         extraMove = 0
//     }
//     if (!CustomDesign) {
//         CustomDesign = styles.rippleButton
//     }
//     const buttonRef = useRef(null);
//     const [isOver, setisOver] = useState(false)
//     const [rippleStyle, setRippleStyle] = useState({});
//     const [isRippling, setIsRippling] = useState(false);
//     const [rippleStyleclick, setRippleStyleclick] = useState({});

//     const handleClick = (event) => {
//         const button = buttonRef.current;
//         const rect = button.getBoundingClientRect();
//         const size = Math.max(rect.width, rect.height);

//         const x = event.clientX - rect.left - size / 2;
//         const y = event.clientY - rect.top - size / 2;

//         setRippleStyleclick({
//             width: size,
//             height: size,
//             top: y + 'px',
//             left: x + 'px',
//         });

//         setIsRippling(true);
//     };
//     const handleOnMouseleave = (event) => {
//         const button = buttonRef.current;
//         const rect = button.getBoundingClientRect();
//         const size = Math.max(rect.width, rect.height);
//         const x = event.clientX - rect.left - (size - extraLeave) / 2;
//         const y = event.clientY - rect.top - (size - extraLeave) / 2;
//         setisOver(false)
//         setRippleStyle({
//             width: size - extraLeave,
//             height: size - extraLeave,
//             top: y + 'px',
//             left: x + 'px',
//             background: `radial-gradient(circle, ${bgColourLeave} 0%, rgba(56,254,0,0) 100%)`,
//         }
//         )
//     }
//     const handleMouseMove = (event) => {
//         const button = buttonRef.current;
//         const rect = button.getBoundingClientRect();
//         const size = Math.max(rect.width, rect.height);
//         const x = event.clientX - rect.left - (size + extraMove) / 2;
//         const y = event.clientY - rect.top - (size + extraMove) / 2;
//         setisOver(true)
//         setRippleStyle({
//             width: size + extraMove,
//             height: size + extraMove,
//             top: y + 'px',
//             left: x + 'px',
//             background: `radial-gradient(circle, ${bgColourover} 0%, rgba(56,254,0,0) 100%)`,
//         });
//     };
//     useEffect(() => {
//         if (isRippling) {
//             const timeout = setTimeout(() => setIsRippling(false), 500);
//             return () => clearTimeout(timeout);
//         }
//     }, [isRippling]);
//     return (
//         <button
//             ref={buttonRef}
//             type={typeC}
//             className={`${CustomDesign} ${styles.defaultShinybutton}`}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleOnMouseleave}
//             onClick={async (e) => {
//                 if (onClick) {
//                     e.preventDefault();
//                     await onClick()
//                 }
//                 e.stopPropagation();
//                 handleClick(e)
//             }}
//         >
//             <span className={isOver ? styles.ripple : styles.rippleleave} style={rippleStyle} />
//             {isRippling && <span className={styles.rippleclick} style={rippleStyleclick} />}
//             <p className={styles.title}>{children}</p>
//         </button>
//     );
// };

// export default ShinyRippleButton;
