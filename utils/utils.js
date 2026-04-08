const env = require('../environment/env-wrapper');


async function verifyPopupMessage(expectedMsg) {
    const popup_element = await this.page.locator("div[class*='ui-pnotify-container']");
    await this.expect(popup_element).toBeVisible();
    const popup_txt = await this.page.locator('.ui-pnotify-text').innerText();
    await this.expect(popup_txt).toBe(expectedMsg);
}

async function redirectToDositrace() { //because for some reason the link has to be clicked after login
  const link = this.page.getByRole('link', { name: 'Dositrace' });
  await this.page.goto(env.dositraceURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  if(await link.isVisible()){
      await link.click();
      await this.page.waitForLoadState('networkidle', { timeout: 60000 } );
  }
}

module.exports = {
  verifyPopupMessage,
  redirectToDositrace
};