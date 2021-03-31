import React, { memo, useContext } from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/form/form-context'

const Footer: React.FC = () => {
    const { state } = useContext(Context)
    const { isLoading, mainError } = state

    return (
        <div data-testid="errorWrap" className={Styles.errorWrap}>
            {isLoading && <Spinner className={Styles.spinner} />}
            {mainError && <span className={Styles.error}>{mainError}</span>}
        </div>
    )
}

export default memo(Footer)
