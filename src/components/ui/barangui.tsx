import { Button } from "./button";
import { CSSProperties, useState, useRef, useEffect } from "react";
import Icons, { trashIcon, editIcon, saveIcon } from "@/public/icons/icons";


const styles: Record<string, CSSProperties> = {
    container: {
        backgroundColor: '#eceef3ff',
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        padding: '0.5rem',
        border: '3px solid #5c657bff',
        boxShadow: '10px 10px 10px rgba(107, 107, 115, 1)',
        alignItems: 'center',
        borderRadius: '20px',
    },
}
type barangProps = {
    id: number;
    item_name: string;
    stock: number;
    unit: string;
    handleDelete: (id: number) => void;
    handlePlus: (id: number) => void;
    handleMinus: (id: number) => void;
    handleSave: (id: number, ref: React.RefObject<HTMLInputElement> | null) => void;
    editName: boolean;
    handleEditName: (id: number) => void;
    handleEditUnit: (id: number, ref: React.RefObject<HTMLInputElement> | null) => void;
}

export default function BarangUI({ id, item_name, stock, unit, handleDelete, handlePlus, handleMinus, handleSave, editName, handleEditName, handleEditUnit }: barangProps) {
    const [editBarangName, setEditBarangName] = useState(false);
    const inputNameRef = useRef<any>(null);
    const inputUnitRef = useRef<any>(null);

    useEffect(() => {
        console.log(editName);
        setEditBarangName(editName);
    }, [editName]);

    return (
        <div style={styles.container}>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', height: 60 }}>
                {editBarangName && <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}><input type="text" defaultValue={item_name} ref={inputNameRef} style={{ width: '400px', height: '50%', padding: '0.5rem', borderRadius: '5px', fontSize: '1rem', border: '3px solid #5c657bff', backgroundColor: 'rgba(228, 228, 228, 0)', outline: 'none' }} /> <Button onClick={() => handleSave(id, inputNameRef)} style={{ backgroundColor: 'rgba(228, 228, 228, 0)', border: 'none' }}> <Icons color="#2932e9ff" icon={saveIcon} /></Button></div>}
                {!editBarangName && <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}><h3>{item_name}</h3> <Button onClick={() => handleEditName(id)} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none' }}> <Icons color="#ae9e0cff" icon={editIcon} /></Button></div>}
            </div>
            <div style={{ width: '20%', display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', alignItems: 'center', justifyContent: 'space-between', width: '50%', padding: '0.5rem' }}>
                    <Button onClick={() => handleMinus(id)} style={{ borderRadius: '20px', height: '25px', width: '25px', fontSize: '1rem' }}>-</Button>
                    <p style={{ width: '20%', backgroundColor: '#b0b0b0ff', borderRadius: '5px', padding: '0.5rem', textAlign: 'center' }}>{stock}</p>
                    <Button onClick={() => handlePlus(id)} style={{ borderRadius: '20px', height: '25px', width: '25px', fontSize: '1rem', }}>+</Button>
                </div>
            </div>
            <div style={{ width: '10%', display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                <input type="text" defaultValue={unit} ref={inputUnitRef} style={{ width: '50%', height: '50%', padding: '0.5rem', borderRadius: '5px', fontSize: '1rem', border: '3px solid #5c657bff', backgroundColor: 'rgba(228, 228, 228, 0)', outline: 'none' }} />
                <Button onClick={() => handleEditUnit(id, inputUnitRef)} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none' }}> <Icons color="#ae9e0cff" icon={saveIcon} /></Button>
            </div>

            <div style={{ width: '20%', display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={() => handleDelete(id)} style={{ outline: 'none', cursor: 'pointer' }}><Icons color="red" icon={trashIcon} /> Delete</Button>
            </div>
        </div >
    )
}