document.getElementById('date-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const dateInput = document.getElementById('date-input').value;

    fetch(`/api/${encodeURIComponent(dateInput)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('unix').textContent = 'Error: ' + data.error;
                document.getElementById('utc').textContent = '';
            } else {
                document.getElementById('unix').textContent = 'Unix Timestamp: ' + data.unix;
                document.getElementById('utc').textContent = 'UTC Date: ' + data.utc;
            }
        })
        .catch(error => console.error('Error:', error));
});
