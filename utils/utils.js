const env = require('../environment/env-wrapper');
const { Navbar } = require("../page-objects/elements/Navbar");

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
      await this.page.waitForLoadState('load', { timeout: 60000 } );
      const nav = new Navbar(this.page);
      await nav.toggleNav();
  }
}

function getLastMonthsRange(months) {
  const today = new Date();

  const start = new Date(today);
  start.setMonth(start.getMonth() - months);

  // format: D/M/YYYY
  const fmt = d => {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  return `${fmt(start)} - ${fmt(today)}`;
}


module.exports = {
  verifyPopupMessage,
  redirectToDositrace,
  getLastMonthsRange
};