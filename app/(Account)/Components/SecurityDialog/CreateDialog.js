import React, { useRef, useState } from 'react'
import ShinyRippleButton from '../Button/ShinyRipplebutton'
import styles from './createdialog.module.css'
import { useRouter } from 'next/navigation'
import { useOmnipresence } from '@/app/Context/Omnipresent'
const CreateDialog = () => {
    const { Notify } = useOmnipresence();
    const [length, setlength] = useState(4)
    const [isSwiped, setisSwiped] = useState(false)
    const inputsRef = useRef([]);
    const [isClosing, setIsClosing] = useState(false);
    const router = useRouter();

    // const { Notify } = useOmnipresence();

    const handleInput = (e, index) => {
        const value = e.target.value;
        if (value.length >= 1 && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleSubmit = async () => {
        setIsClosing(true);
        console.log(length)
        const passkey = inputsRef.current.map(input => input.value).join('');
        const response = await fetch("/Api/User/Admin/Data", { method: 'PUT', body: JSON.stringify({ passkey: passkey, passkey_length: parseInt(length) }), headers: { 'Content-Type': 'application/json' } })
        const res = await response.json();
        console.log(passkey, response)
        if (res.success === true) {
            Notify({ message: "Successfully Created Security Pin", status: res.success })
        } else {
            Notify({ message: res.message, status: res.success })
        }
        setTimeout(() => {
            router.push('/Account/ManageUser/?passkey=true')
        }, 500);
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (inputsRef.current[index].value === '') {
                if (index > 0) {
                    inputsRef.current[index - 1].focus();
                    inputsRef.current[index - 1].value = '';
                }
            } else {
                inputsRef.current[index].value = '';
            }
        }
    };
    const handleLength = (length) => {
        setlength(length);
        setisSwiped(true);
        setTimeout(() => {
            if (inputsRef.current[0]) {
                inputsRef.current[0].focus();
            }
        }, 500);
    }
    return (
        <div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}>
            <div className={`${styles.dialog} ${isClosing ? styles.closing : ''}`}>
                <section className={`${styles.sections} ${isSwiped ? styles.swiped : ''}`}>
                    <div className={styles.headings}>
                        <h2>Haven't Created Your Security Pin?</h2>
                        <h4>Create your pin in a Jiffy!!</h4>
                    </div>
                    <div className={styles.subheadings}>
                        <p>Choose Number of Characters</p>
                        <div className={styles.buttons}>
                            <ShinyRippleButton children={6} CustomDesign={styles.button} onClick={() => handleLength(6)} extraMove={70} extraLeave={20} />
                            <ShinyRippleButton children={4} CustomDesign={styles.button} onClick={() => handleLength(4)} extraMove={70} extraLeave={20} />
                        </div>
                    </div>
                </section>
                <section className={`${styles.sections} ${isSwiped ? styles.swiped : ''}`}>

                    <h2 className={styles.h2tagsec2}><span className={styles.back} onClick={() => setisSwiped(false)}>&lt;-</span>Enter The Pin</h2>
                    <p className={styles.ptagsec2}>Always Remember this pin</p>
                    <div className={`${styles.inputarea} ${length === 4 ? styles.length4 : styles.length6}`}>
                        {[...Array(length)].map((_, index) => <input key={index}
                            type="text"
                            maxLength={1}
                            ref={el => inputsRef.current[index] = el}
                            onChange={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />)}
                    </div>
                    <ShinyRippleButton children='Create Your Pin' CustomDesign={styles.buttonsub} extraMove={160} extraLeave={70} onClick={handleSubmit} />
                </section>
            </div>
        </div>
    )
}

export default CreateDialog