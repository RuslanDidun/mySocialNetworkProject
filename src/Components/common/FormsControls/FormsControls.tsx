import React from 'react'
import styles from "./FormsControls.module.css"
import {Field, WrappedFieldProps} from "redux-form"
import {ValidatorPropsType} from "../../../utils/validators/validators"

type FormControlPropsType = {
    meta: {
        touched: boolean
        error: string
    },
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                            name: FormKeysType,
                            validators: Array<ValidatorPropsType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {}, text = "") {
    return <div>
        <Field placeholder={undefined}
               name={name}
               validate={validators}
               component={component} {...props}
        /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>
