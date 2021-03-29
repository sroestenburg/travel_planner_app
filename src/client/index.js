import { search } from './js/app';
import { hideMyTrip } from './js/listeners';
import { saveMyTrip } from './js/app';


import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/cards.scss';
import './styles/savedTrip.scss';


import image from './images/hero.jpg';
document.getElementById('hero').jpg = image;

export {
    search,
    hideMyTrip,
    saveMyTrip
}