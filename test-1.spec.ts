import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://honda-mideast.com/en-om');
  // await page.getByRole('banner').getByRole('link').filter({ hasText: /^$/ }).click();
  // await page.getByRole('link', { name: 'OUR PRODUCTS' }).click();
  // await page.locator('#header__primary__navigation').getByRole('link', { name: 'DISCOVER' }).click();
  // await page.locator('.primary__navigation__dropdown.active > .container > .row > div > .header__nav__card > figure > img').first().click();
  // await page.locator('.primary__navigation__dropdown.active > .container > .row > div:nth-child(2) > .header__nav__card > figure > img').click();
  // await page.locator('.primary__navigation__dropdown.active > .container > .row > div:nth-child(3) > .header__nav__card > figure > img').click();
  // await page.locator('.primary__navigation__dropdown.active > .container > .row > div:nth-child(4) > .header__nav__card > figure > img').click();
  // await page.locator('#header__primary__navigation').getByRole('link', { name: 'SAFETY & TECHNOLOGY' }).click();
  // await page.locator('.primary__navigation__dropdown.active > .container > .row > div > .header__nav__card > figure > img').first().click();
  // await page.locator('.primary__navigation__dropdown.active > .container > .row > div:nth-child(2) > .header__nav__card > figure > img').click();
  // await page.locator('.primary__navigation__dropdown.active > .container > .row > div:nth-child(3) > .header__nav__card > figure > img').click();
  // await page.locator('.primary__navigation__dropdown.active > .container > .row > div:nth-child(3) > .header__nav__card > figure > img').click();
  // await page.getByRole('link', { name: 'OUR PRODUCTS' }).click();
  // await page.getByRole('button').filter({ hasText: /^$/ }).click();
  // await page.getByRole('listitem').filter({ hasText: 'OUR BRAND' }).click();
  // await page.getByRole('listitem').filter({ hasText: 'FUTURE INNOVATION' }).click();
  // await page.getByRole('link', { name: 'LATEST NEWS' }).click();
  //   await page.goto('https://honda-mideast.com/en-om');
  // await page.locator('#latest__news__slider--image').click();
  // await page.getByText('2 34').click();
  // await page.getByText('2 34').click();
});