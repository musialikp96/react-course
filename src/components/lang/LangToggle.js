import { Button } from 'antd';
import { EVENT_TYPE, emit } from '../../pages/GoogleMapMediator';
import { useMapStore } from '../../pages/store';

export default function LangToggle() {
    const [{ lang }] = useMapStore();
    const inactiveLang = lang === 'pl' ? 'en' : 'pl';

    const setLang = lang => {
        emit(EVENT_TYPE.LANG_CHANGED, lang);
    }

    return (
        <Button type="primary" shape="circle" onClick={() => setLang(inactiveLang)}>
            {lang}
        </Button>
    )
}
