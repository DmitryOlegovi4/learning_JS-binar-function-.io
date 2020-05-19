console.log(data);

let arrPay = []; // создаём переменную с пустым массивом

// добавляем данные зарплат в массив из data
for (let i =0; i<data.length; i++){
    arrPay.push(+data[i].pay) // делаем сразу массив числовой, а не строчный
}

console.log(arrPay); //вывели масиив для проверки

let arrSortPay = arrPay.slice(); // создаём второй массив для сортировки первого и его сохранения
arrSortPay.sort((a, b) => a - b); // сортируем массив по возрастанию

console.log(arrSortPay); //вывели масиив для проверки

// ввод данных пользователем для поиска и сохранение их в переменную в виде числа
let num = +prompt('Пожалуйста, введите число: ')
let userIndex; // индекс элемента массива

// проверка ввода данных
function checkNum (num){
    if (isNaN(num)){
        return alert('Вы ввели не число! Пожалуйста, обновите страницу и введите значение заново!');
    } else if (num < 5000){
        return alert('Мы не платим так мало :) Пожалуйста, обновите страницу и напишите более весомое значение!');
    } else if (num > 250000){
        return alert('Мы не платим так много :) Пожалуйста, обновите страницу и будьте скромнее!');
    } else {
        userIndex = search (num)
        return addForm(userIndex)
    }
}
checkNum (num);

// БИНАРНЫЙ ПОИСК по массиву с рекурсией
function search (n, arr = arrSortPay){
    let index = Math.floor(arr.length/2);
    let mediana = arr[index];
    console.log(`${mediana}=>${arr}`);
    if (n === mediana){
        return findIndex(n);
    } else if (n>mediana){
        return search(n, arr.slice(index+1))
    }else if (n<mediana){
        return search(n, arr.slice(0,index))
    }
    return findNearestElemInArr(n);
}

// поиск ближайшего значения в массиве, которое не превышает вводимое пользователем значение
// + поиск необходимого индекса этого элемента
function findNearestElemInArr(val){
    let result;
    arrSortPay.reduce(function(a,c) {
        return result = Math.abs(a-val) < Math.abs(c-val) ? a: c;
    })
    console.log(result)
    if (result > val){
        for (let i = 0; i < arrSortPay.length; i++) {
            if (arrSortPay[i] === result)
                result = arrSortPay[i-1];
        }
    }
    return findIndex(result)
}

// поиск необходимого индекса элемента
function findIndex(n) {
    for (let i = 0; i < arrPay.length; i++) {
        if (arrPay[i] === n)
            return i;
    }
}

// вывод результата в консоль
console.log(userIndex)
console.log(data[userIndex])

//вывод результата на страничку
function addForm(index) {
    let body = document.querySelector('body');
    let root = document.createElement('div');
    let container = document.createElement('div');
    let positionContainer = document.createElement('div');
    let nameContainer = document.createElement('div');
    let surnameContainer = document.createElement('div');
    let payContainer = document.createElement('div');
    let positionContainerText = document.createElement('p');
    let nameContainerText = document.createElement('p');
    let surnameContainerText = document.createElement('p');
    let payContainerText = document.createElement('p');
    let position = document.createElement('p');
    let name = document.createElement('p');
    let surname = document.createElement('p');
    let pay = document.createElement('p');

    positionContainerText.innerHTML = 'Должность: ';
    nameContainerText.innerHTML = 'Имя: ';
    surnameContainerText.innerHTML = 'Фамилия: ';
    payContainerText.innerHTML = 'З/П: ';
    position.innerHTML = data[index].position;
    name.innerHTML = data[index].name;
    surname.innerHTML = data[index].surname;
    pay.innerHTML = data[index].pay;

    root.classList.add('root');
    container.classList.add('container');
    positionContainer.classList.add('container-text');
    nameContainer.classList.add('container-text');
    surnameContainer.classList.add('container-text');
    payContainer.classList.add('container-text');

    positionContainer.appendChild(positionContainerText);
    positionContainer.appendChild(position);
    nameContainer.appendChild(nameContainerText);
    nameContainer.appendChild(name);
    surnameContainer.appendChild(surnameContainerText);
    surnameContainer.appendChild(surname);
    payContainer.appendChild(payContainerText);
    payContainer.appendChild(pay);
    container.appendChild(positionContainer);
    container.appendChild(nameContainer);
    container.appendChild(surnameContainer);
    container.appendChild(payContainer);
    root.appendChild(container);
    body.appendChild(root);
}
