import React, { CSSProperties } from "react";

type props = {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    styles?: CSSProperties;
}
const style: Record<string, CSSProperties> = {
    input: {
        fontFamily: 'Poppins',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        border: '1px solid #ccc',
        outline: 'none',
        backgroundColor: 'rgba(225, 225, 225, 0)',
        color: '#ffffffff',
    }
}

export default function InputTextLogin({ type, placeholder, value, onChange, styles }: props) {
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{ ...style.input, ...styles }} />
    )
}