import React, { ReactComponentElement, ReactElement } from 'react'
import { ReactComponent as ArrowLeft } from "../../assets/icones/arrow-left.svg"
import { ReactComponent as ArrowRight } from '../../assets/icones/arrow-right.svg'
import { ReactComponent as Profile } from '../../assets/icones/profile.svg'
import { ReactComponent as Back } from '../../assets/icones/back.svg'

type iconsTypes = {
    ArrowLeft: React.FC,
    ArrowRight: React.FC,
    Profile: React.FC,
    Back: React.FC,
}

const icons: iconsTypes = {
    ArrowLeft,
    ArrowRight,
    Profile,
    Back,
}

export const Icon: React.FC<{ iconName: string, className: string }> = ({ iconName, className, ...props }) => {
    const Aa = icons[iconName as keyof iconsTypes];
    return (
        <Aa {...props} />
    )
}