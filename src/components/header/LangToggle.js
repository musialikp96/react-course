import { EVENT_TYPE, emit } from '../../pages/GoogleMapMediator';
import { useMapStore } from '../../pages/store';
import HeaderButton from './HeaderButton';

const LangToggle = () => {
    const [{ lang }] = useMapStore();
    const inactiveLang = lang === 'pl' ? 'en' : 'pl';

    return (
        <HeaderButton
            onClick={() => emit(EVENT_TYPE.LANG_CHANGED, inactiveLang)}
            text={lang.toUpperCase()}
        />
    )
}
export default LangToggle;
