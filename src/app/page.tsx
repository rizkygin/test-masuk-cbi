'use client';

import { useContext, useEffect, useState, CSSProperties, useRef } from "react";
import { userContext } from "./layout";
import getListBarang, { Barang } from "@/models/barang";
import BarangUI from "@/src/components/ui/barangui";
import Icons, { searchIcon, plushIcon } from "@/public/icons/icons";
import { useMediaQuery } from "react-responsive";
import ModalTambahBarang from "@/src/components/ui/modaltambahbarang";
import { Button } from "../components/ui/button";

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    fontFamily: 'Poppins',
    flexDirection: 'column',
    gap: '1rem',
  },
  welcome: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },

  tableRow: {
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    fontSize: '1.5rem',
  },
};

export default function Home() {

  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPhonePotrait = useMediaQuery({ query: '(max-width: 375px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  // const user = useContext(userContext);
  const [editName, setEditName] = useState(false);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputStockRef = useRef<HTMLInputElement>(null);
  const inputUnitRef = useRef<HTMLInputElement>(null);

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const [tambahBarang, setTambahBarang] = useState(false);
  const [barang, setBarangs] = useState<Barang[]>([]);

  useEffect(() => {
    getListBarang().then((data) => {
      setBarangs(data);
    });
  }, []);

  const handleDelete = (id: number) => {
    setBarangs(barang.filter((item) => item.id !== id));
  }
  const handlePlus = (id: number) => {
    setBarangs(barang.map((item) => item.id === id ? { ...item, stock: item.stock + 1 } : item));
  }

  const handleMinus = (id: number) => {
    setBarangs(barang.map((item) => item.id === id ? { ...item, stock: item.stock - 1 } : item));
  }

  const handleSave = (id: number, ref: React.RefObject<HTMLInputElement> | null) => {

    setBarangs(barang.map((item) => {
      if (item.id === id) {
        setEditName(false);
        const barang = { id: item.id, item_name: item.item_name, stock: item.stock, unit: item.unit, editName: null }
        const barangs = { ...item, barang }
        // console.log(barang);
        return barangs
      }
      return item;
    }))
    setBarangs(barang.map((item) => item.id === id ? { ...item, item_name: ref?.current?.value || item.item_name } : item));
  }

  const handleEditName = (id: number) => {
    setBarangs(barang.map((item) => {
      if (item.id === id) {
        const barang = { ...item, editName: true }
        setEditName(true);
        return barang
      }
      return item;
    }));
  }

  const handleTambahBarang = (barangBaru: Barang) => {
    setTambahBarang(false);
    setBarangs([...barang, barangBaru]);
  }

  const cancelTambahBarang = () => {
    setTambahBarang(false);
  }

  const handleSearch = () => {

    if (inputSearchRef.current?.value === '') {
      return window.location.reload();
    }
    const search = inputSearchRef.current?.value;
    setBarangs(barang.filter((item) => item.item_name.toLowerCase().includes(search?.toLowerCase() || '')));
  }

  const handleEditUnit = (id: number, inputUnitRef: React.RefObject<HTMLInputElement> | null) => {
    setBarangs(barang.map((item) => {
      if (item.id === id) {
        const barang = { ...item, unit: inputUnitRef?.current?.value || item.unit }
        return barang
      }
      return item;
    }));
  }
  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Warehouse Management</h1>
      </div>
      {!tambahBarang && <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <input type="text" placeholder="Search" ref={inputSearchRef} style={{ width: '300px' }} />
          <Button onClick={handleSearch}><Icons color="green" icon={searchIcon} /> Search</Button>
        </div>
        <button onClick={() => setTambahBarang(true)}><Icons color="green" icon={plushIcon} /></button>
      </div>}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {tambahBarang &&
          <ModalTambahBarang tambah={handleTambahBarang} cancelTambahBarang={cancelTambahBarang} />
        }
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1.5rem' }}>
          <div style={styles.tableHeader}>
            <div style={{ width: '50%', alignItems: 'center', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              {isPhonePotrait ? <text>Name</text> : 'Name'}
            </div>
            <div style={{ width: '20%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              Stock
            </div>
            <div style={{ width: '10%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              Unit
            </div>
            <div style={{ width: '20%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              Action
            </div>
          </div>
          {barang.map((item) => (
            <BarangUI key={item.id}
              id={item.id}
              item_name={item.item_name}
              stock={item.stock}
              unit={item.unit}
              handleDelete={handleDelete}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
              handleSave={handleSave}
              editName={item.editName === true ? editName : false}
              handleEditUnit={handleEditUnit}
              handleEditName={handleEditName} />
          ))}
        </div>
      </div>


    </div>

  );
}

