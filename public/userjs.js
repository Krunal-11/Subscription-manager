document.addEventListener('DOMContentLoaded', renderUsers);

function renderUsers() {
    fetch('http://localhost:8080/')  
        .then(response => response.json())
        .then(data => {
            console.log(data);
                const usersContainer = document.getElementById('root');
                usersContainer.innerHTML = ''; 
                usersContainer.innerHTML += `
                    <table>
                        <thead>
                            <tr>
                                <th>Subscription Type</th>
                            <th>Subscriber Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Payment Status</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>`;
            
            const tbody = usersContainer.querySelector('tbody');

            data.forEach(subscription => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${subscription.subscription_type}</td>
                    <td>${subscription.subscriber_name}</td>
                    <td>${subscription.subscription_start_date}</td>
                    <td>${subscription.subscription_end_date}</td>
                    <td>${subscription.payment_status}</td>
                    <td>${subscription.payment_date}</td>
                `;
                
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

renderUsers();
