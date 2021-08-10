export type ValidatorPropsType = (value: string) => string | undefined

export const required: ValidatorPropsType = (value) => {
    if (value) return undefined;

    return "Field is required";
}

export const maxLengthCreator = (maxLength: number):ValidatorPropsType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}