document.addEventListener('DOMContentLoaded', () => {
  console.log('Contact Utility Loaded');

  const form = document.getElementById('contactForm');
  const status = document.getElementById('status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    status.textContent = 'Submitting...';

    try {
      const urlParams = new URLSearchParams(window.location.search);

      const referrer = urlParams.get('referrer') || '';
      const project = urlParams.get('project') || '';
      const repo = urlParams.get('repo') || '';

      const formData = new FormData();

      formData.append('gdocument', referrer);
      formData.append('project', project);
      formData.append('git repo', repo);

      formData.append(
        'name',
        document.getElementById('name').value,
      );

      formData.append(
        'email',
        document.getElementById('email').value,
      );

      formData.append(
        'phone',
        document.getElementById('phone').value,
      );

      formData.append(
        'message',
        document.getElementById('message').value,
      );

      const response = await fetch(
        'https://webhook.site/cb5893e5-6995-4ea3-a00b-8d791d8bf5fa',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        },
      );

      console.log('Form submitted');
      console.log(response);

      status.textContent = 'Form submitted successfully!';
      form.reset();
    } catch (error) {
      console.error(error);

      status.textContent = 'Error submitting form.';
    }
  });
});
