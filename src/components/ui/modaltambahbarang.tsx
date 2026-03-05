import { useRef, useState } from "react";
import { Barang } from "@/models/barang";
import { Button } from "@/src/components/ui/button";

type tambahBarangProps = {
    tambah: (barang: Barang) => void,
    cancelTambahBarang: () => void,

}

export default function ModalTambahBarang({ tambah, cancelTambahBarang }: tambahBarangProps) {
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputStockRef = useRef<HTMLInputElement>(null);
    const inputUnitRef = useRef<HTMLInputElement>(null);
    // const setTambahBarang = useState(false);
    const handleTambahBarang = () => {
        const name = inputNameRef.current?.value;
        const stock = inputStockRef.current?.value;
        const unit = inputUnitRef.current?.value;
        // console.log(name, stock, unit);
        const random = Math.random() * 100;
        const id = Math.round(random);
        const barangBaru: Barang = {
            id: id,
            item_name: name?.toString() || '',
            stock: stock ? Number(stock) : 0,
            unit: unit?.toString() || '',
            editName: false
        }
        return tambah(barangBaru);
    }

    return (
        <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="relative p-4 w-full max-w-2xl max-h-full" style={{ backgroundColor: "white", borderRadius: "10px", padding: "20px" }}>
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "space-between", width: '300px' }}>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Tambah Barang</h1>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Name" ref={inputNameRef} style={{ width: '100%' }} />
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <label htmlFor="">Stock</label>
                    <input type="text" placeholder="Stock" ref={inputStockRef} style={{ width: '100%' }} />
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <label htmlFor="">Unit</label>
                    <input type="text" placeholder="Unit" ref={inputUnitRef} style={{ width: '100%' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <Button onClick={handleTambahBarang} style={{ backgroundColor: '#387cfaff', color: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>Save</Button>
                    <Button onClick={() => cancelTambahBarang()} style={{ backgroundColor: '#efc852ff', color: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>Cancel</Button>
                </div>

            </div>
        </div>
    )
}