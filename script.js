const inputElements = document.querySelectorAll(".card__input");
const submitButton = document.querySelector(".card__button");

const checkDay = (day) => {
    return day && day > 0 && day <= 31;
};

const checkMonth = (month) => {
    return month && month > 0 && month <= 12;
};

const checkYear = (year) => {
    const date = new Date().getFullYear();
    return year && year >= 1000 && year <= date;
};

const checkDate = (yearElement, monthElement, dayElement) => {
    let checked = [false, false, false];

    if (!checkYear(yearElement.value)) {
        yearElement.classList.add("card__input--error");
    } else {
        checked[0] = true;
        yearElement.classList.remove("card__input--error");
    }

    if (!checkMonth(monthElement.value)) {
        monthElement.classList.add("card__input--error");
    } else {
        checked[1] = true;
        monthElement.classList.remove("card__input--error");
    }

    if (!checkDay(dayElement.value)) {
        dayElement.classList.add("card__input--error");
    } else {
        checked[2] = true;
        dayElement.classList.remove("card__input--error");
    }

    return checked.every((item) => item === true);
};

const calculateAge = (year, month, day) => {
    const today = new Date();
    const birthday = new Date(year, month - 1, day); 
    let ageYear = today.getFullYear() - birthday.getFullYear();
    let ageMonth = today.getMonth() - birthday.getMonth();
    let ageDay = today.getDate() - birthday.getDate();

    if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < birthday.getDate())) {
        ageYear--;
        ageMonth = 12 + ageMonth;
    }

    return [ageYear, ageMonth, ageDay];
};

const onClickHandler = () => {
    const dayElement = document.querySelector('.card__input[name="day"]');
    const monthElement = document.querySelector('.card__input[name="month"]');
    const yearElement = document.querySelector('.card__input[name="year"]');
    const resultElement1 = document.querySelector(".card__resultValue1");
    const resultElement2 = document.querySelector(".card__resultValue2");
    const resultElement3 = document.querySelector(".card__resultValue3");

    if (!checkDate(yearElement, monthElement, dayElement)) {
        resultElement1.textContent = "-";
        resultElement2.textContent = "-";
        resultElement3.textContent = "-";
        return;
    }

    const [ageYear, ageMonth, ageDay] = calculateAge(
        yearElement.value,
        monthElement.value,
        dayElement.value
    );

    resultElement1.textContent = ageYear.toString();
    resultElement2.textContent = ageMonth.toString();
    resultElement3.textContent = ageDay.toString();
};

submitButton.addEventListener("click", onClickHandler);

inputElements.forEach((item) => {
    item.addEventListener("keydown", (event) => event.key === "Enter" && onClickHandler());
});
