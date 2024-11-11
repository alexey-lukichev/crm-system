const SERVER_URL = 'http://localhost:3000'

//создание студента
async function serverAddStudent(student) {
    let response = await fetch(SERVER_URL + '/api/students', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  })

  let data = await response.json()

  return data
}

// отображение студентов на сайте
async function displayStudents() {
  let students = await serverGetStudents();

  students.forEach(student => {
    let studentTr = createUserTr(student);
    $tableBody.appendChild(studentTr);
  });
}
displayStudents();

//получение списка студентов
async function serverGetStudents() {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  })

  let data = await response.json()

  return data
}

async function getAndLogStudents() {
  let serverData = await serverGetStudents()
  console.log(serverData)
}
getAndLogStudents();

//удаление студента
async function serverDeleteStudent(id) {
    let response = await fetch(SERVER_URL + '/api/students/' + id, {
      method: "DELETE",
    })

  let data = await response.json()

  return data
}

// const studentsList = [
//   {
//     name: 'Алексей',
//     surname: 'Лукичев',
//     lastname: 'Алексеевич',
//     birthday: formateDate(new Date('2000, 12, 9')),
//     studyStart: '2020',
//     faculty: 'Медицинский',
//   },
//   {
//     name: 'Евгений',
//     surname: 'Антонов',
//     lastname: 'Александрович',
//     birthday: formateDate(new Date('2002, 5 ,18')),
//     studyStart: '2024',
//     faculty: 'Экономический',
//   },
//   {
//     name: 'Владислав',
//     surname: 'Речнов',
//     lastname: 'Петрович',
//     birthday: formateDate(new Date('1999, 7 ,12')),
//     studyStart: '2019',
//     faculty: 'Архитектурный',
//   },
//   {
//     name: 'Петр',
//     surname: 'Ильин',
//     lastname: 'Олегович',
//     birthday: formateDate(new Date('1999, 11 ,25')),
//     studyStart: '2022',
//     faculty: 'Кулинарный',
//   },
//   {
//     name: 'Иван',
//     surname: 'Иванов',
//     lastname: 'Иванович',
//     birthday: formateDate(new Date('2003, 10 ,10')),
//     studyStart: '2023',
//     faculty: 'Гуманитарный',
//   },
// ]

let studentsList = []

async function init() {
  studentsList = await serverGetStudents();
  render(studentsList);
}
init()


// if (serverData !== null) {
//   studentsList = serverData
// }

function formateDate(date) {
  date = new Date(date);
  let dd = date.getDate();
  if (dd < 10) {
    dd = '0' + dd;
  }

  let mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = '0' + mm;
  }

  let yy = date.getFullYear();
  if (yy < 10) {
    yy = '0' + yy;
  }

  return dd + '.' + mm + '.' + yy;
}

function parseDate(dateString) {
  const parts = dateString.split('.');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

function getAge(birthday) {
  const today = new Date();
  const birthdayDate = parseDate(birthday);
  let age = today.getFullYear() - birthdayDate.getFullYear();
  const monthDiff = today.getMonth() - birthdayDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdayDate.getDate())) {
    age--;
  }
  return age;
}

function currentCourse(studyStart) {
  let today = new Date();
  let studyStartDate = new Date(studyStart);
  let course = today.getFullYear() - studyStartDate.getFullYear();
  if (today.getMonth() > 8) {
    course++;
  }
  return ++course > 4 ? 'закончил' : course;
}

let sortColumnFlag = 'fio'

//Создание элементов

const $app = document.getElementById('app'),
    $addForm = document.getElementById('add-form'),
    $surnameInp = document.getElementById('add-form__surname'),
    $nameInp = document.getElementById('add-form__name'),
    $lastnameInp = document.getElementById('add-form__lastname'),
    $dateBirthdayInp = document.getElementById('add-form__dateBirthday'),
    $studyStartInp = document.getElementById('add-form__studyStart'),
    $facultyInp = document.getElementById('add-form__faculty'),
    $table = document.createElement('table'),
    $tableHead = document.createElement('thead'),
    $tableBody = document.createElement('tbody');

    $filterForm = document.getElementById('filter-form'),
    $fioFilterInp = document.getElementById('filter-form__fio-inp'),
    $facFilterInp = document.getElementById('filter-form__fac-inp'),
    $studyStartFilterInp = document.getElementById('filter-form__studyStart-inp'),
    $endStudeFilterInp = document.getElementById('filter-form__endStude-inp');

    $tableHeadTr = document.createElement('tr'),
    $tableHeadThFIO = document.createElement('th'),
    $tableHeadThBirthday = document.createElement('th'),
    $tableHeadThStudyStart = document.createElement('th'),
    $tableHeadThFaculty = document.createElement('th'),
    $tableHeadThDeleteBtn = document.createElement('th'),

    $table.classList.add('table', 'table-success'),
    $tableHeadThFIO.classList.add('ThFio'),
    $tableHeadThBirthday.classList.add('ThBirthday'),
    $tableHeadThStudyStart.classList.add('ThStudyStart'),
    $tableHeadThFaculty.classList.add('ThFaculty'),
    $tableHeadThDeleteBtn.classList.add('ThDeleteBtn'),
    $tableBody.classList.add('main-content'),

    $tableHeadThFIO.textContent = 'ФИО'
    $tableHeadThBirthday.textContent = 'Дата рождения / Возраст'
    $tableHeadThStudyStart.textContent = 'Годы обучения / Курс'
    $tableHeadThFaculty.textContent = 'Факультет'
    $tableHeadThDeleteBtn.textContent = ''

$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThBirthday)
$tableHeadTr.append($tableHeadThStudyStart)
$tableHeadTr.append($tableHeadThFaculty)
$tableHeadTr.append($tableHeadThDeleteBtn)

$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)

function createUserTr(oneUser) {
  const $userTr = document.createElement('tr'),
        $userFIO = document.createElement('th'),
        $userBirthday = document.createElement('th'),
        $userStudyStart = document.createElement('th'),
        $userFaculty = document.createElement('th'),
        $userDeleteBtn = document.createElement('button');

        $userDeleteBtn.classList.add('btn', 'btn-danger', 'w-100');


  $userFIO.textContent = oneUser.surname + ' ' + oneUser.name + ' ' + oneUser.lastname
  $userBirthday.textContent = oneUser.birthday + ' ' + '/' + ' ' + getAge(oneUser.birthday)
  $userStudyStart.textContent = oneUser.studyStart + ' ' + '-' + ' ' + `${parseInt(oneUser.studyStart) + 4}` + ' ' + '/' + ' ' + currentCourse(oneUser.studyStart)
  $userFaculty.textContent = oneUser.faculty
  $userDeleteBtn.textContent = 'Удалить'

  $userDeleteBtn.addEventListener('click', async function() {
    await serverDeleteStudent(oneUser.id)
    alert('Вы уверены что хотите удалить студента?')
    $userTr.remove()
  })

  $userTr.append($userFIO)
  $userTr.append($userBirthday)
  $userTr.append($userStudyStart)
  $userTr.append($userFaculty)
  $userTr.append($userDeleteBtn)

  return $userTr;
}

//Рендер

function render(arrData) {
    $tableBody.innerHTML = '';

  let copyStudentList = [...arrData]
  for (const oneUser of copyStudentList) {
    oneUser.fio = oneUser.surname + ' ' + oneUser.name + ' ' + oneUser.lastname
    oneUser.age = getAge(oneUser.birthday)
    oneUser.studyStart = oneUser.studyStart
  }

  // copyStudentList = copyStudentList.sort(function(a, b) {
  //   if (a[sortColumnFlag] < b[sortColumnFlag]) return -1;
  // })

  copyStudentList = copyStudentList.sort(function(a, b) {
    if (a[sortColumnFlag] < b[sortColumnFlag]) return -1;
    if (a[sortColumnFlag] > b[sortColumnFlag]) return 1;
    return 0;
  });

  if ($fioFilterInp.value.trim() !== '') {
    copyStudentList = copyStudentList.filter(function(oneUser) {
      if (oneUser.fio.includes($fioFilterInp.value.trim())) return true
    })
  }

  if ($facFilterInp.value.trim() !== '') {
    copyStudentList = copyStudentList.filter(function(oneUser) {
      if (oneUser.faculty.includes($facFilterInp.value.trim())) return true
    })
  }

  if ($studyStartFilterInp.value.trim() !== '') {
    copyStudentList = copyStudentList.filter(function(oneUser) {
      if (oneUser.studyStart.includes($studyStartFilterInp.value.trim())) return true
    })
  }

  if ($endStudeFilterInp.value.trim() !== '') {
    copyStudentList = copyStudentList.filter(function(oneUser) {
      const endYear = parseInt(oneUser.studyStart) + 4;
      if (endYear.toString().includes($endStudeFilterInp.value.trim())) return true
    })
  }

  for (oneUser of copyStudentList) {
    const $newTr = createUserTr(oneUser);
    $tableBody.append($newTr)
  }
}

render(studentsList);

//Добавление

$addForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  if ($nameInp.value.trim() == '' || $surnameInp.value.trim() == '' || $lastnameInp.value.trim() == '' || $dateBirthdayInp.value.trim() == '' || $studyStartInp.value.trim() == '' || $facultyInp.value.trim() == '') {
    alert('Заполните все поля!')
    return
  }

  if (new Date($dateBirthdayInp.value.trim()) > new Date() || new Date($dateBirthdayInp.value.trim()) < new Date('1900, 1, 1')) {
    alert('Некорретная дата рождения!')
    return
  }

  if ($studyStartInp.value.trim() < 2000 || $studyStartInp.value.trim() > new Date().getFullYear()) {
    alert('Год начала обучения должен находится в диапазоне от 2000-го и до текущего года')
    return
  }


  // studentsList.push({
  //   name: $nameInp.value.trim(),
  //   surname: $surnameInp.value.trim(),
  //   lastname: $lastnameInp.value.trim(),
  //   birthday: formateDate(new Date($dateBirthdayInp.value.trim())),
  //   studyStart: $studyStartInp.value.trim(),
  //   faculty: $facultyInp.value.trim(),
  // })

  let serverDataObj = await serverAddStudent({
    name: $nameInp.value.trim(),
    surname: $surnameInp.value.trim(),
    lastname: $lastnameInp.value.trim(),
    birthday: formateDate(new Date($dateBirthdayInp.value.trim())),
    studyStart: $studyStartInp.value.trim(),
    faculty: $facultyInp.value.trim(),
  });


  studentsList.push(serverDataObj);
  console.log(studentsList);
  render(studentsList);

  $nameInp.value = '';
  $surnameInp.value = '';
  $lastnameInp.value = '';
  $dateBirthdayInp.value = '';
  $studyStartInp.value = '';
  $facultyInp.value = '';
})

$tableHeadThFIO.addEventListener('click', function() {
  sortColumnFlag = 'fio'
  render(studentsList);
})

$tableHeadThBirthday.addEventListener('click', function() {
  sortColumnFlag = 'age'
  render(studentsList);
})

$tableHeadThFaculty.addEventListener('click', function() {
  sortColumnFlag = 'faculty'
  render(studentsList);
})

$tableHeadThStudyStart.addEventListener('click', function() {
  sortColumnFlag = 'studyStart'
  render(studentsList);
})

// Фильтр

$filterForm.addEventListener('submit', function(e) {
  e.preventDefault();
})

$fioFilterInp.addEventListener('input', function() {
  render(studentsList);
})

$facFilterInp.addEventListener('input', function() {
  render(studentsList);
})

$studyStartFilterInp.addEventListener('input', function() {
  render(studentsList);
})

$endStudeFilterInp.addEventListener('input', function() {
  render(studentsList);
})
