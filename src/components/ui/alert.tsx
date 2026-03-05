import { useState } from "react";

export default function Alert({ show, message, color }: { show: boolean, message: string, color: string }) {
    // const [show, setShow] = useState(show);
    return (
        show && (
            <div style={{ backgroundColor: color, padding: '0.5rem', borderRadius: '0.5rem' }}>
                <p style={{ color: 'white' }}>{message}</p>
            </div>
        )
    )
}