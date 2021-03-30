import React, { memo } from 'react'
import Logo from '@/presentation/components/logo/logo'
import Styles from './footer-styles.scss'

const Footer: React.FC = () => {
    return <footer className={Styles.footer} />
}

export default memo(Footer)