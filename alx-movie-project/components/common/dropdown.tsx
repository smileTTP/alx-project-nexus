import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

export interface DropdownProps {
    label: string;
    options: { value: string | undefined; label: string }[];
    filterKey: string;
    selectedValue: string | undefined;
    isOpen: boolean;
    setOpenDropdown: (key: string | null) => void;
    updateFilter: (key: string, value: string | undefined) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, options, filterKey, selectedValue, isOpen, setOpenDropdown, updateFilter }) => {
    
    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || options[0].label;

    const handleSelect = (value: string | undefined) => {
        updateFilter(filterKey, value);
        setOpenDropdown(null);
    };

    return (
        <div className="flex flex-col relative w-32">
            <label className="text-[#f1d7de] text-base font-medium mb-1">{label}</label>
            <button
                type="button"
                onClick={() => setOpenDropdown(isOpen ? null : filterKey)}
                className="p-2 border-2 border-[#4C3A51] rounded-md bg-[#f1d7de] text-[#4C3A51] text-sm text-left w-full flex justify-between items-center truncate">
                <span className="truncate">{selectedLabel}</span>
                <IoIosArrowDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />            
                </button>

            {isOpen && (
                <ul 
                    className="absolute z-10 top-full mt-1 bg-[#f1d7de] rounded shadow-xl overflow-y-auto border-2 border-[#4C3A51] no-scrollbar"
                    style={{ maxHeight: '200px', width: '100%' }}>
                    {options.map((option) => (
                        <li
                            key={option.label}
                            className="p-2 cursor-pointer text-[#4C3A51] hover:bg-[#4C3A51] hover:text-[#f1d7de]"
                            onClick={() => handleSelect(option.value)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;