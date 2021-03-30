import React, { memo, useContext } from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/form/form-context'

const Footer: React.FC = () => {
    const { state, errorState } = useContext(Context)

    return (
        <div data-testid="errorWrap" className={Styles.errorWrap}>
            {state.isLoading && <Spinner className={Styles.spinner} />}
            {errorState.main && (
                <span className={Styles.error}>{errorState.main}</span>
            )}
        </div>
    )
}

export default memo(Footer)
