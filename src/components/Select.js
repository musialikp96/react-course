import { Select as AntSelect } from 'antd';

const { Option } = AntSelect;

export default function Select({ placeholder, options, onChange }) {

    return (
        <AntSelect
            placeholder={placeholder}
            style={{ width: 220 }}
            onChange={onChange}
        >
            {options.map(obj => <Option value={obj} key={obj}>{obj}</Option>)}
        </AntSelect>
    )
}
