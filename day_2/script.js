function generateMarksInputs() {
    const numSubjects = document.getElementById("numSubjects").value;
    const marksForm = document.getElementById("marksForm");
    const marksInputs = document.getElementById("marksInputs");

    marksInputs.innerHTML = "";
    for (let i = 0; i < numSubjects; i++) {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = "subject-input";

        const nameLabel = document.createElement('label');
        nameLabel.textContent = `Name of Subject ${i + 1} : `;

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'nameinput';
        nameInput.required = true;

        const markLabel = document.createElement('label');
        markLabel.textContent = `Mark for Subject ${i + 1} : `;

        const markInput = document.createElement('input');
        markInput.type = 'number';
        markInput.min = '0';
        markInput.max = '100';
        markInput.required = true;

        subjectDiv.appendChild(nameLabel);
        subjectDiv.appendChild(nameInput);
        subjectDiv.appendChild(markLabel);
        subjectDiv.appendChild(markInput);

        marksInputs.appendChild(subjectDiv);
    }
    marksForm.style.display = 'block';
}
function calculateResults() {
    document.getElementById('toclose').style.display='none';
    const subjectInputs = document.querySelectorAll('.subject-input');
    let totalMarks = 0;
    let details = '';
    const tableBody = document.querySelector('#marksTable tbody');
    let namest = document.getElementById('nameofst').value;
    let collegeou = document.getElementById('collegein').value;
    document.getElementById('collegeto').innerHTML=collegeou;
    document.getElementById('nametost').innerHTML=namest;
    tableBody.innerHTML = ''; // Clear existing rows

    subjectInputs.forEach((subjectInput, index) => {
        const nameInput = subjectInput.querySelector('input[type="text"]');
        const markInput = subjectInput.querySelector('input[type="number"]');

        if (nameInput && markInput) {
            const subjectName = nameInput.value;
            const subjectMark = parseInt(markInput.value);
            const passOrFail = subjectMark >= 35 ? 'Pass' : 'Fail';
            const grade = getGrade(subjectMark);
            totalMarks += subjectMark;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${subjectName}</td>
                <td>${subjectMark}</td>
                <td>${grade}</td>
                <td>${passOrFail}</td>
            `;
            tableBody.appendChild(row);
        } else {
            console.error(`Error accessing input elements for subject ${index + 1}`);
        }
    });

    const averageMark = totalMarks / subjectInputs.length;

    document.getElementById('totalMarks').textContent = totalMarks;
    document.getElementById('averageMarks').textContent = averageMark.toFixed(2);
    document.getElementById('container2').style.display = 'block';
}

function getGrade(marks) {
    if (marks >= 90) return 'A';
    if (marks >= 80) return 'B';
    if (marks >= 70) return 'C';
    if (marks >= 60) return 'D';
    return 'F';
}
function printResults() {
    document.getElementById('res').style.display ='none';
    document.getElementById('toclose').style.display='none';
    window.print();
}