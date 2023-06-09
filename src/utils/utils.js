export const getEndings = (num, word) => {
    const res = num % 10;
    if (res === 1) {
        return ` ${word}`;
    } else if (1 < res && res < 5) {
        return ` ${word}а`;
    } else if (num > 5 || !num) {
        return ` ${word}ов`;
    }
};

export const productRating = (reviews) => {
    if (!reviews || !reviews.length) {
        return 0;
    }
    const res = reviews.reduce((acc, el) => (acc += el.rating), 0);
    return Math.round(res / reviews.length);
};

export const timeOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
};

export const passwordValidationCheck = {
    required: {
        value: true,
        message: 'Пароль должен быть обязательно!',
    },
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message:
            'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру',
    },
};

export const telephoneValidationCheck = {
    required: {
        value: true,
    },
    pattern: {
        value: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
        message:
            'Телефон должен начинаться только с цифры или знака +, состоять из цифр, в середине можно использовать скобоки, пробел и знак дефиса ',
    },
};

export const checkingTheFillingEmail = { required: 'Email обязательно!' };

export const checkingTheFillingGroup = { required: 'Введите вашу группу обязательно!' };

export const checkingTheField = {
    required: {
        value: true,
        message: 'Обязательное поле для заполнения',
    },
};

export const sortItem = [
    { id: 'popular', title: 'Популярные' },
    { id: 'newProduct', title: 'Новинки' },
    { id: 'lowPrice', title: 'Сначала дешёвые' },
    { id: 'highPrice', title: 'Сначала дорогие' },
    { id: 'sale', title: 'По скидке' },
    { id: 'rate', title: 'По рейтингу' },
];
export const myFilterCards = (card) => {
    return card.filter((item) => item.author._id === '643fb8243291d790b3f3b309');
};

export const findFavorite = (card, id) => {
    return card.likes.some((i) => i === id);
};

export const refreshToken = (obj) => {
    return { ...obj, authorization: localStorage.getItem('tokenParrot') };
};

export function parseJwt(token) {
    if (!token) return null;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const path = ['/auth', '/register', '/newPass'];

export const countingTheRating = (data) => {
    return data.reviews.reduce(
        (acc, el) => {
            if (el.rating === 1) {
                acc[0] = acc[0] + 1;
                return acc;
            } else if (el.rating === 2) {
                acc[1] = acc[1] + 1;
                return acc;
            } else if (el.rating === 3) {
                acc[2] = acc[2] + 1;
                return acc;
            } else if (el.rating === 4) {
                acc[3] = acc[3] + 1;
                return acc;
            } else if (el.rating === 5) {
                acc[4] = acc[4] + 1;
                return acc;
            }
        },
        [0, 0, 0, 0, 0]
    );
};
