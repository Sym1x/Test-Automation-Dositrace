async function verifyPopupMessage(expectedMsg) {
    const popup_element = await this.page.locator("div[class*='ui-pnotify-container']");
    await this.expect(popup_element).toBeVisible();
    const popup_txt = await this.page.locator('.ui-pnotify-text').innerText();
    await this.expect(popup_txt).toBe(expectedMsg);
}


module.exports = {
  verifyPopupMessage
};