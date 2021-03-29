import React, { memo, useContext } from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/form/form-context'

const Footer: React.FC = () => {
    const { isLoading, errorMessage } = useContext(Context)
    return (
        <div data-testid="errorWrap" className={Styles.errorWrap}>
            {isLoading && <Spinner className={Styles.spinner} />}
            {errorMessage && (
                <span className={Styles.error}>{errorMessage}</span>
            )}
        </div>
    )
}

export default memo(Footer)
