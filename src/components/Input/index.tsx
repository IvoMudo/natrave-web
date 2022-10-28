import React, { ChangeEvent, ChangeEventHandler, FocusEventHandler, JSXElementConstructor, ReactElement, useState } from "react";

type Props = {
    name: string,
    type: string,
    label: string,
    placeholder: string
    value: string
    handleChange: ChangeEventHandler<HTMLInputElement>
    blur: FocusEventHandler<HTMLInputElement>
    erro: string
}

export const Input = ({ name, type, label, placeholder, value, handleChange, blur, erro }: Props): ReactElement => {
    return (
        <div className='flex flex-col'>
            <label
                htmlFor={name}
                className='text-sm md:text-base text-gray-500 font-bold mb-2'
            >
                {label}
            </label>

            <input
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={blur}
                className={`border-[1px] border-gray-500 rounded-2xl h-12 p-3 focus:outline outline-2 bg-white ${erro && 'border-red-500'}`}
            />
            <span className="text-red-500 font-bold text-sm">{erro}</span>
        </div>
    )
}