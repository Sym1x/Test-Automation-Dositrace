const env = require('../environment/env-wrapper');
const { Navbar } = require("../page-objects/elements/Navbar");

async function verifyPopupMessage(expectedMsg) { //must be called in cucumber world (uses this.page)
    const popup_element = this.page.locator("div[class*='ui-pnotify-container']");
    try {
      await this.expect(popup_element).toBeVisible();
    } catch (err) { throw new Error('No ui-pnotify popup is visible'); }
    const popup_txt = await this.page.locator('.ui-pnotify-text').innerText();
    try {
    await this.expect(popup_txt).toBe(expectedMsg);
    } catch (err) { throw new Error(`Received popup message: ${popup_txt}`); }
}

async function redirectToDositrace(page) { //because for some reason the link has to be clicked after login
  const link = page.getByRole('link', { name: 'Dositrace' });
  await page.goto(env.dositraceURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  if(await link.isVisible()){
      await link.click();
      await page.waitForLoadState('load', { timeout: 60000 } );
      const nav = new Navbar(page);
      await nav.toggleNav();
  }
}

// used to output a range date (like 13/2/2026 - 14/5/2026)
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

// used to get the date after a certain number of days (passed as parameter)    (D/M/YYYY format)
// outputs today's date by default
function getDateAfter(days) {
  const today = new Date();
  const afterDays = new Date(today);
  const fmt = d => {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if(arguments.length === 0 || days == null || days === undefined) {
    return `${fmt(today)}`;
  }
  
  afterDays.setDate(afterDays.getDate() + days);

  return `${fmt(afterDays)}`;

}


module.exports = {
  verifyPopupMessage,
  redirectToDositrace,
  getLastMonthsRange,
  getDateAfter
};