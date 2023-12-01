export function fetchUser(PersonClass) {
    return new Promise((resolve, reject) => {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data => {
                const user = data.results[0];
                const name = user.name.first + ' ' + user.name.last;
                const email = user.email;
                const phone = user.phone;
                const location = user.location.street.number +
                ' ' + user.location.street.name +
                ', ' + user.location.city +
                ', ' + user.location.state +
                ', ' + user.location.country;
                const avatar = user.picture.large;
                const person = new PersonClass(name, email, phone, location, avatar);
                resolve(person);
                return user.location.city;
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export async function CurrentTime(city){
    const url = 'https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=' + city;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '32e5bacbd9mshf16f0e6d36e37dbp15c445jsn7fcbde6a3b11',
            'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const time = result.hour + ':' + result.minute + ':' + result.second;
        return time;
    } catch (error) {
        console.error(error);
    }
}

