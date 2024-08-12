import React, { useEffect, useRef, useState } from 'react';
import styles from './Dialog.module.css';
import ShinyRippleButton from '../Button/ShinyRipplebutton';
import { useOmnipresence } from '@/app/Context/Omnipresent';
import { useRouter } from 'next/navigation';

const SecurityDialog = ({ user, ChosenRole, _id }) => {

    const inputsRef = useRef([]);
    const [isClosing, setIsClosing] = useState(false);
    const [InvalidPin, setInvalidPin] = useState(false);
    const [isopening, setisopening] = useState(true);
    const [isInvalidInput, setisInvalidInput] = useState(false)
    const router = useRouter();
    const length = user?.passkey_length || 4;
    const { setcorrect, Notify } = useOmnipresence();

    setTimeout(() => {
        setisopening(false)
    }, 1000);
    const handleInput = (e, index) => {
        const value = e.target.value;
        if (value.length >= 1 && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleSubmit = async () => {
        const passkey = inputsRef.current.map(input => input.value).join('');
        const response = await fetch("/Api/User/Admin/Data", { method: 'POST', body: JSON.stringify({ passkey: passkey }), headers: { 'Content-Type': 'application/json' } })
        const res = await response.json();

        // console.log(passkey, response)

        if (res.success === true) {
            setIsClosing(true);
            setcorrect(true);

            setTimeout(() => {
                setcorrect(false)
            }, 60000);

            const response = await fetch(`/Api/User/Admin/${_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ as: ChosenRole })
            });
            const data = await response.json();

            if (data.status) {
                Notify({ message: data.result, status: data.status })
                console.log('Roles updated successfully');
            } else {
                Notify({ message: data.message, status: data.status })
                console.log('Failed to update roles');
            }

            setTimeout(() => {
                router.push("/Account/ManageUser")
            }, 1000);

        }
        else {
            setInvalidPin(true)
            setisInvalidInput(true)
            setTimeout(() => {
                setInvalidPin(false)
            }, 500);
            Notify({ message: res.message, status: res.success })
        }
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

    useEffect(() => {
        if (inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }
    }, []);

    return (
        <div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}>
            <div className={`${styles.dialog} ${isopening ? styles.opening : ''} ${isClosing ? styles.closing : ''} ${InvalidPin ? styles.invalidpin : ''}`}>
                <h1 className={styles.heading}>Security Key</h1>
                <div className={`${styles.inputs} ${length === 4 ? styles.length4 : styles.length6} ${isInvalidInput? styles.invalidInput : ''}`} onClick={()=> setisInvalidInput(false)} >
                    {[...Array(length)].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            ref={el => inputsRef.current[index] = el}
                            onChange={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
                <ShinyRippleButton children='Submit' CustomDesign={styles.button} onClick={handleSubmit} extraLeave={40} extraMove={158} />
            </div>
        </div>
    );
}

export default SecurityDialog;
