const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-html', async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    const screenshotBase64 = screenshotBuffer.toString('base64');
    const htmlCode = `<img src="data:image/png;base64,${screenshotBase64}" alt="Screenshot">`;

    res.json({ htmlCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.all('/generate-html', (req, res) => {
  res.status(405).send('Method Not Allowed');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
