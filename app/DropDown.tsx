import Link from "next/link";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Dropdown = () => {
    const [currency, setCurrency] = useState([{name:"USD"},{name:"EUR"},{name:"CAD"},{name:"GBP"}]);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("USD");
    const [open, setOpen] = useState(false);
    
    return (
        <div className='my-2 text-center'>
        
            <div
                onClick={() => setOpen(!open)}
                className={`flex items-center justify-between rounded ${
                !selected && "text-gray-700"
                }`}>
                    {selected
                    ? selected?.length > 25
                    ? selected?.substring(0, 25) + "..."
                    : selected: "Select Country"}
                    
                    <KeyboardArrowDownIcon fontSize="large" className={`${open && "rotate-180"}`}/>
            </div>
            <ul
                className={` mt-2 overflow-y-auto ${
                open ? "max-h-20 text-xl" : "max-h-0"
                } `}>
                {currency.map((currencyD)=>(
                    <li
                    key={currencyD.name}
                    onClick={() => {
                        if (currencyD.name.toLowerCase() !== selected.toLowerCase()) {
                            setSelected(currencyD.name);
                            setOpen(false);
                            setInputValue("");
                        }
                    }}
                    >
                        {currencyD.name}
                    </li>
                ))}
            </ul>
            <span className={'h-[1px] inline-block relative left-[50%] translate-x-[-50%] bg-light -bottom-3 w-[120%]'}>&nbsp;</span>
        </div>
    )
}

export default Dropdown