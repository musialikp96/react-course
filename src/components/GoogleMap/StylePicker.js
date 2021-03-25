import { useState, useEffect } from 'react'
import SnazzyApi from '../../services/api/SnazzyApi';

export default function StylePicker() {
    const [page, setPage] = useState(1);

    useEffect(() => {
        getStyles(page)
    }, [])

    const getStyles = async page => {
        let res = await SnazzyApi.getStyles(page);
        console.log({ res });
    }

    return (
        <div>

        </div>
    )
}
