document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('screenshot-form');
    const screenshotPreview = document.getElementById('screenshot-preview');
    const htmlCodeContainer = document.getElementById('html-code');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const url = event.target.url.value;
  
      try {
        const response = await fetch('http://localhost:3000/generate-html', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const data = await response.json();
        const { htmlCode } = data;
  
        screenshotPreview.src = ''; // Clear the previous image
        htmlCodeContainer.innerHTML = htmlCode;
      } catch (error) {
        console.error(error);
        htmlCodeContainer.textContent = 'Error: Something went wrong!';
      }
    });
  });
  