$(document).ready(function() {
    const student = {
        name: '',
        lastName: '',
        tabel: {}
    };

    // Показ первой формы
    $('#startBtn').on('click touchstart', function() {
        $('#studentForm').addClass('active');
    });

    // Переход ко второй форме
    $('#nextBtn').on('click touchstart', function() {
        student.name = $('#name').val();
        student.lastName = $('#lastName').val();

        if (!student.name || !student.lastName) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        $('#studentForm').removeClass('active');
        $('#gradesForm').addClass('active');
    });

    // Добавление оценок
    $('#addGradeBtn').on('click touchstart', function() {
        const subject = prompt('Введите название предмета:');
        if (subject === null || subject === '') return;

        const grade = prompt(`Введите оценку по предмету ${subject} (от 0 до 10):`);
        if (grade === null) return;

        const gradeNum = parseInt(grade);
        if (!isNaN(gradeNum) && gradeNum >= 0 && gradeNum <= 10) {
            student.tabel[subject] = gradeNum;
            updateGradesList();
        } else {
            alert('Пожалуйста, введите корректную оценку (0-10)');
        }
    });

    // Обновление списка оценок
    function updateGradesList() {
        let list = '';
        for (let subject in student.tabel) {
            list += `<p>${subject}: ${student.tabel[subject]}</p>`;
        }
        $('#gradesList').html(list);
    }

    // Обработка финального подтверждения
    $('#submitBtn').on('click touchstart', function() {
        analyzeGrades();
    });

    function analyzeGrades() {
        const grades = Object.values(student.tabel);
        const badGrades = grades.filter(grade => grade < 4).length;
        const averageGrade = grades.length > 0 
            ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length 
            : 0;

        let result = `<p>Студент: ${student.name} ${student.lastName}</p>`;
        result += '<p>Оценки:</p><ul>';
        for (let subject in student.tabel) {
            result += `<li>${subject}: ${student.tabel[subject]}</li>`;
        }
        result += '</ul>';

        if (badGrades === 0) {
            result += '<p>Студент переведен на следующий курс</p>';
        } else {
            result += `<p>Количество плохих оценок (<4): ${badGrades}</p>`;
        }

        if (averageGrade > 7) {
            result += '<p>Студенту назначена стипендия</p>';
        }
        result += `<p>Средний балл: ${averageGrade.toFixed(2)}</p>`;

        $('#result').html(result);
    }
});