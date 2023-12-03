import { Person } from './Person.js';
import { fetchUser, CurrentTime } from './API.js'

window.onload = function() {
    const container = document.querySelector('.container');
    let card = createCard();
    container.appendChild(card);

    const button = document.createElement('button');
    button.textContent = 'GENERATE USER';
    button.onclick = function() {
        fetchUser(Person)
        .then(updateCard)
        .catch(console.error);
    };
    container.append(button);
}

function createCard() {
    let card = document.createElement('div');
    card.classList.add('card');

    card.appendChild(createElement('img', 'avatar', './user_nt_found.jpg'));
    card.appendChild(createElement('p', 'name', 'Name: name surname'));
    card.appendChild(createElement('p', 'email', 'Mail: mail'));
    card.appendChild(createElement('p', 'phone', 'phone: phone'));
    card.appendChild(createElement('p', 'location', 'Location: city'));
    card.appendChild(createElement('p', 'time', 'Current Time: Time'));

    return card;
}

function createElement(tag, id, text = '', isStrong = false) {
    const element = document.createElement(tag);
    element.id = id;
    if (tag === 'img') {
        element.src = text;
    } else if (isStrong) {
        const strong = document.createElement('strong');
        strong.textContent = text;
        element.appendChild(strong);
    } else {
        element.textContent = text;
    }
    return element;
}

function updateCard(person) {
    document.getElementById('avatar').src = person.getAvatar();
    updateElement('name', 'Name: ', person.getName());
    updateElement('email', 'Mail: ', person.getEmail());
    updateElement('phone', 'Phone: ', person.getPhone());
    updateElement('location', 'Location: ', person.getLocation());

    let city = person.getLocation().split(', ')[1];
    CurrentTime(city).then(time => {
        person.setTime(time);
        updateElement('time', 'Current Time: ', person.getTime());
    }).catch(console.error);
}

function updateElement(id, label, value) {
    const element = document.getElementById(id);
    element.textContent = '';
    element.appendChild(createElement('span', '', label, true));
    element.appendChild(document.createTextNode(value));
}
