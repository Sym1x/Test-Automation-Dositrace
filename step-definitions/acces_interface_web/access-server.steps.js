const { When, Then } = require('@cucumber/cucumber');

When('I visit the server at {string}', async function (url) {
  this.response = await this.page.goto(url, { waitUntil: 'load' });
});

Then('the page should load successfully', async function () {
  const status = this.response.status();
  await this.expect.soft(status, 'HTTP status must be 2xx or 3xx').toBeGreaterThanOrEqual(200);
  await this.expect.soft(status).toBeLessThan(400);
});