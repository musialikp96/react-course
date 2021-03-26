import { useMapStore } from '../pages/store';

export default function StylePicker() {

    const [{ styles }] = useMapStore();

    console.log({ styles });
    return (
        <div>

        </div>
    )
}
