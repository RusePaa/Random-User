import { Person } from './Person.js';
import { fetchUser, CurrentTime } from './API.js'

window.onload = function() {
    const container = document.querySelector('.container');
    let card = createCard();
    container.appendChild(card);

    const button = document.createElement('button');
    button.textContent = 'GENERATE USER';
    button.onclick = function() {
        fetchUser(Person).then(person => {
            updateCard(person);
        }).catch(error => console.error('Error:', error));
    };
    container.append(button);
}

function createCard() {
    let card = document.createElement('div');
    card.classList.add('card');

    let avatar = createElement('img', 'avatar');
    avatar.src = './user_nt_found.jpg';
    card.appendChild(avatar);
    card.appendChild(createElement('p', 'name', 'Name: name surname'));
    card.appendChild(createElement('p', 'email', 'Mail: mail'));
    card.appendChild(createElement('p', 'phone', 'phone: phone'));
    card.appendChild(createElement('p', 'location', 'Location: city'));
    card.appendChild(createElement('p', 'time', 'Current Time: Time'));

    return card;
}

function createElement(tag, id, text, isStrong = false) {
    const element = document.createElement(tag);
    element.id = id;
    if (isStrong) {
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
    document.getElementById('name').textContent = '';
    document.getElementById('name').appendChild(createElement('span', '', 'Name: ', true));
    document.getElementById('name').appendChild(document.createTextNode(person.getName()));
    document.getElementById('email').textContent = '';
    document.getElementById('email').appendChild(createElement('span', '', 'Mail: ', true));
    document.getElementById('email').appendChild(document.createTextNode(person.getEmail()));
    document.getElementById('phone').textContent = '';
    document.getElementById('phone').appendChild(createElement('span', '', 'Phone: ', true));
    document.getElementById('phone').appendChild(document.createTextNode(person.getPhone()));
    document.getElementById('location').textContent = '';
    document.getElementById('location').appendChild(createElement('span', '', 'Location: ', true));
    document.getElementById('location').appendChild(document.createTextNode(person.getLocation()));

    let city = person.getLocation().split(', ')[1];
    console.log(city)
    CurrentTime(city).then(time => {
        let timeElement = document.getElementById('time');
        timeElement.textContent = '';
        timeElement.appendChild(createElement('span', '', 'Current Time: ', true));
        timeElement.appendChild(document.createTextNode(time));
    }).catch(error => console.error('Error:', error));
}
