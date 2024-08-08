
fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
    headers: {
        'Authorization': `Basic ${btoa('coalition:skills-test')}`
    }
})
    .then(response => response.json())
    .then(patients => {
        // console.log(patients);
        patients.forEach((patient, index) => {
            document.querySelector('.patients').innerHTML += 
            `
                <li class="patient ${index + 1}">
                    <div class="patient-details">
                        <div class="patient-image">
                            <img src=${patient.profile_picture} alt=${patient.name} width="40px" height="40px">
                        </div>
                        <div class="bio">
                            <h4>${patient.name}</h4>
                            <p>${patient.gender}, ${patient.age}</p>
                        </div>
                    </div>
                    <img src="./icons/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="more">
                </li>
            `
        });

        patients[3].diagnostic_list.forEach((diagnosis, index) => {
            document.querySelector('.diagnosis-list').querySelector('table').querySelector('tbody').innerHTML += 
            `
                <tr class=diagnosis-${index + 1}>
                    <td>${diagnosis.name}</td>
                    <td>${diagnosis.description}</td>
                    <td>${diagnosis.status}</td>
                </tr>
            `
        });

        patients[3].lab_results.forEach(result => {
            document.querySelector('.lab-results').querySelector('ul').innerHTML += 
            `
                <li>
                    <p>${result}</p>
                    <img src="./icons/download_FILL0_wght300_GRAD0_opsz24 (1).svg">
                </li>
            `
        });

        let diastolic= [];
        let systolic = [];
        let periods = [];

        for(let i = 0; i < 6; i++) {
            diastolic = [ ...diastolic, patients[3].diagnosis_history[i].blood_pressure.diastolic ];
            systolic = [ ...systolic, patients[3].diagnosis_history[i].blood_pressure.systolic ];
            periods = [ ...periods, patients[3].diagnosis_history[i].month + ', ' + patients[3].diagnosis_history[i].year ];
        }

        // const NUMBER_CFG = {min: 60, max: 180};
        const data = {
            labels: periods.reverse().map(period => period),
            datasets: [
                {
                    data: diastolic.reverse().map(val => val.value),
                    borderColor: '#8C6FE6',
                    backgroundColor: '#8C6FE6',
                },
                {
                    data: systolic.reverse().map(val => val.value),
                    borderColor: '#E66FD2',
                    backgroundColor: '#E66FD2',
                }
            ]
        }

        new Chart(document.getElementById('blood-pressure-graph'), {
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            type: 'line',
            data: data
        })();

    })
    .catch(err => console.error(err));