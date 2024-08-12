// components/LottieAnimation.js
import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../../public/icons8-edit.json'; // Adjust the path to your JSON file
import styles from '../../Account/Profile/profile.module.css'
const LottieAnimation = ({ isPencil }) => {
    const lottieRef = useRef(null);
console.log(isPencil)

    // useEffect(() => {
    //     if (lottieRef.current) {
    //         if (isPencil) {
    //             lottieRef.current.goToAndStop(0, true); // Start at frame 0 (Pencil)
    //         } else {
    //             lottieRef.current.goToAndStop(15, true); // Start at frame 15 (Cross)
    //         }
    //     }
    // }, [isPencil]);

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.goToAndStop(0, true); // Ensure it doesn't play on mount
        }
    }, []);

    useEffect(() => {
        if (lottieRef.current && !isPencil) {
            lottieRef.current.playSegments([0, 15], true); // Play animation from 0 to 15 on click
        } else if (lottieRef.current && isPencil) {
            lottieRef.current.playSegments([15, 0], true); // Play animation from 15 to 0 on click
        }
    }, [isPencil]);


    return (
        <div className={styles.e_icon}>
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                style={{ width: 20, height: 20 }}
                className={styles.Lottie}
            />
        </div>
    );
};

export default LottieAnimation;
