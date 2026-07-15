import { test, expect } from '@playwright/test';
import { HomePage } from '../Components';

test.describe('Zenith Studio — Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto('http://127.0.0.1:5500/index.html'); 
  });

  test('hero CTA navigates to contact section', async ({ page }) => {
    await homePage.hero.clickStartProject();
    await expect(homePage.cta.heading).toBeVisible();
  });

  // test('services section lists 6 cards', async () => {
  //   expect(await homePage.services.count()).toBe(5);
  //   const titles = await homePage.services.getAllTitles();
  //   expect(titles).toContain('Web Development');
  // });

  // test('portfolio card shows correct tag', async () => {
  //   const tag = await homePage.portfolio.getTagFor('FinFlow Banking');
  //   expect(tag).toBe('Mobile App');
  // });

  // test('professional plan is marked most popular', async () => {
  //   expect(await homePage.pricing.isMostPopular('Professional')).toBe(true);
  // });

  // test('Get Started button click does not navigate (not yet wired up)', async ({ page }) => {
  //   const urlBefore = page.url();
  //   await homePage.pricing.clickPlanButton('Professional');
  //   await page.waitForTimeout(500); 
  //   expect(page.url()).toBe(urlBefore);
  // });

  // test('mobile menu opens and navigates to pricing', async ({ page }) => {
  //   await page.setViewportSize({ width: 375, height: 812 });
  //   await homePage.navbar.gotoSectionMobile('Pricing');
  //   await expect(homePage.pricing.sectionTitle).toBeVisible();
  // });

  // test('footer has 4 social links', async () => {
  //   expect(await homePage.footer.getSocialLinkCount()).toBe(4);
  // });
});