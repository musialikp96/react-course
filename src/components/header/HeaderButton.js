import { Button } from 'antd';

export default function HeaderButton({ text, onClick }) {
    return (
        <Button type="primary" onClick={onClick}>
            {text}
        </Button>
    )
}
