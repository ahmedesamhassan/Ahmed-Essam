const appointmentForm = document.getElementById('appointmentForm');
const appointmentList = document.getElementById('appointmentList');

// Create a loading spinner element
const loadingSpinner = document.createElement('div');
loadingSpinner.className = 'loading-spinner';
loadingSpinner.style.display = 'none';
document.body.appendChild(loadingSpinner);

// Message handling functions
function showMessage(message, type = 'error') {
  const messageDiv = document.createElement('div');
  messageDiv.className = type + '-message';
  messageDiv.textContent = message;
  
  // Remove any existing messages
  const existingMessage = document.querySelector('.error-message, .success-message');
  if (existingMessage) existingMessage.remove();
  
  document.querySelector('.container').insertBefore(messageDiv, appointmentForm);
  
  // Auto-remove message after 3 seconds
  setTimeout(() => messageDiv.remove(), 3000);
}

function showError(message) {
  showMessage(message, 'error');
}

function showSuccess(message) {
  showMessage(message, 'success');
}

// Show/hide loading spinner
function setLoading(isLoading) {
  loadingSpinner.style.display = isLoading ? 'block' : 'none';
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.disabled = isLoading);
}

// Local Storage functions
function getAppointments() {
  const appointments = localStorage.getItem('appointments');
  return appointments ? JSON.parse(appointments) : [];
}

function saveAppointments(appointments) {
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

function fetchAppointments() {
  try {
    setLoading(true);
    const appointments = getAppointments();
    appointmentList.innerHTML = '';
    
    if (appointments.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="4" style="text-align: center">No appointments found</td>';
      appointmentList.appendChild(emptyRow);
      return;
    }
    
    // Sort appointments by date
    appointments.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));
    appointments.forEach(appointment => renderAppointment(appointment));
  } catch (error) {
    showError('Error loading appointments: ' + error.message);
  } finally {
    setLoading(false);
  }
}

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

function renderAppointment(appointment) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${appointment.patientName}</td>
    <td>${appointment.doctorName}</td>
    <td>${formatDateTime(appointment.appointmentTime)}</td>
    <td class="actions">
      <button onclick="editAppointment('${appointment.id}', '${appointment.patientName}', '${appointment.doctorName}', '${appointment.appointmentTime}')">Edit</button>
      <button onclick="confirmDelete('${appointment.id}', '${appointment.patientName}')">Delete</button>
    </td>
  `;
  appointmentList.appendChild(tr);
}

appointmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    const id = document.getElementById('appointmentId').value;
    const appointment = {
      patientName: document.getElementById('patientName').value.trim(),
      doctorName: document.getElementById('doctorName').value.trim(),
      appointmentTime: document.getElementById('appointmentTime').value
    };

    // Validate inputs
    if (!appointment.patientName || !appointment.doctorName || !appointment.appointmentTime) {
      throw new Error('Please fill in all fields');
    }

    const appointments = getAppointments();
    
    if (id) {
      // Update existing appointment
      const index = appointments.findIndex(a => a.id === id);
      if (index !== -1) {
        appointments[index] = { ...appointment, id };
      }
    } else {
      // Add new appointment
      appointment.id = Date.now().toString(); // Create unique ID
      appointments.push(appointment);
    }

    saveAppointments(appointments);
    appointmentForm.reset();
    document.getElementById('appointmentId').value = '';
    fetchAppointments();
    showSuccess('Appointment saved successfully!');
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
});

window.editAppointment = (id, patientName, doctorName, appointmentTime) => {
  document.getElementById('appointmentId').value = id;
  document.getElementById('patientName').value = patientName;
  document.getElementById('doctorName').value = doctorName;
  document.getElementById('appointmentTime').value = appointmentTime;
  document.getElementById('patientName').focus();
};

window.confirmDelete = (id, patientName) => {
  if (confirm(`Are you sure you want to delete the appointment for ${patientName}?`)) {
    deleteAppointment(id);
  }
};

function deleteAppointment(id) {
  try {
    setLoading(true);
    const appointments = getAppointments();
    const filteredAppointments = appointments.filter(a => a.id !== id);
    saveAppointments(filteredAppointments);
    fetchAppointments();
    showSuccess('Appointment deleted successfully!');
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
}

// Add loading spinner and message styles
const style = document.createElement('style');
style.textContent = `
  .loading-spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 1000;
  }

  .error-message {
    background-color: #e74c3c;
    color: white;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
    animation: fadeIn 0.3s ease;
    font-size: 16px;
  }

  .success-message {
    background-color: #2ecc71;
    color: white;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
    animation: fadeIn 0.3s ease;
    font-size: 16px;
  }

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);

// Function to show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  
  // Remove any existing messages
  const existingMessage = document.querySelector('.success-message, .error-message');
  if (existingMessage) existingMessage.remove();
  
  document.querySelector('.container').insertBefore(successDiv, appointmentForm);
  
  // Auto-remove success message after 3 seconds
  setTimeout(() => successDiv.remove(), 3000);
}

fetchAppointments();
