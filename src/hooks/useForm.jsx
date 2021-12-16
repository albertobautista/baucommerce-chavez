import { useState } from 'react'

const useForm = (initState) => {
    const [form, setForm] = useState(initState)

    const handleChange = ({target}) => {
        const {value, name} = target;
        setForm({
            ...form,
            [name]: value
        })
    }

    return {form, handleChange}
}

export default useForm
