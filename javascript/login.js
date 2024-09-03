$(document).ready(function() {
  // Static user data
  const users = [
    {
      "email": "user1@example.com",
      "password": "password1"
    }
  ];

  $('#loginButton').click(function() {
    const email = $('#email').val();
    const password = $('#password').val();

    // Find the user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      window.location.href = 'customer-home.html'; // Redirect to home page on successful login
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });
});
