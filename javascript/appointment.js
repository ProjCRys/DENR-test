document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const idPhotoInput = document.getElementById('idPhotoInput');
    const fileName = document.getElementById('fileName');
    const imagePopup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const uploadNewButton = document.getElementById('uploadNewButton');
    const closePopupButton = document.getElementById('closePopupButton');
    const appointmentTime = document.getElementById('appointmentTime');
    const appointmentDate = document.getElementById('appointmentDate');
    const formattedDate = document.getElementById('formattedDate');

    let currentFile = null;

    // Set min date to today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    appointmentDate.min = today.toISOString().split('T')[0];

    // Function to check if a date is Sunday
    function isSunday(date) {
        return date.getDay() === 0;
    }

    // Function to format date as "Weekday, Month Day"
    function formatDate(date) {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }

    // Event listener for date input
    appointmentDate.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        if (isSunday(selectedDate)) {
            alert("Sundays are not available for appointments. Please choose another day.");
            this.value = '';
            formattedDate.textContent = '';
        } else {
            formattedDate.textContent = formatDate(selectedDate);
        }
    });

    // Populate time options
    for (let hour = 7; hour <= 19; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            const time = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            appointmentTime.appendChild(option);
        }
    }

    uploadButton.addEventListener('click', function() {
        if (currentFile) {
            showImagePopup();
        } else {
            idPhotoInput.click();
        }
    });

    idPhotoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            currentFile = file;
            fileName.textContent = file.name.length > 30 ? file.name.substring(0, 30) + '...' : file.name;
        }
    });

    function showImagePopup() {
        const reader = new FileReader();
        reader.onload = function(e) {
            popupImage.src = e.target.result;
            imagePopup.style.display = 'block';
        }
        reader.readAsDataURL(currentFile);
    }

    uploadNewButton.addEventListener('click', function() {
        idPhotoInput.click();
        imagePopup.style.display = 'none';
    });

    closePopupButton.addEventListener('click', function() {
        imagePopup.style.display = 'none';
    });

    idPhotoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            currentFile = file;
            fileName.textContent = file.name.length > 30 ? file.name.substring(0, 30) + '...' : file.name;
            imagePopup.style.display = 'none';
        }
    });
});
