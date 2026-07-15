import { test, expect } from '@playwright/test';
import { HomePage } from '../Components';

test.describe('Zenith Studio — Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page, baseURL }) => {
    homePage = new HomePage(page);
    // Relative path + config baseURL, so this works locally AND in Jenkins
    // via the webServer block in playwright.config.ts.
    await homePage.goto('/index.html');
  });

  test('hero CTA navigates to contact section', async () => {
    await homePage.hero.clickStartProject();
    await expect(homePage.cta.heading).toBeVisible();
  });

  test('services section lists 5 cards', async () => {
    // Note: only 5 render — the "UI/UX Design" card is commented out in the HTML.
    expect(await homePage.services.count()).toBe(5);
    const titles = await homePage.services.getAllTitles();
    expect(titles).toContain('Web Development');
  });

  test('portfolio card shows correct tag', async () => {
    const tag = await homePage.portfolio.getTagFor('FinFlow Banking');
    expect(tag).toBe('Mobile App');
  });

  test('professional plan is marked most popular', async () => {
    expect(await homePage.pricing.isMostPopular('Professional')).toBe(true);
  });

  test('Get Started button click does not navigate (not yet wired up)', async ({ page }) => {
    const urlBefore = page.url();
    await homePage.pricing.clickPlanButton('Professional');
    await page.waitForTimeout(500); // brief wait to rule out delayed navigation
    expect(page.url()).toBe(urlBefore);
  });

  test('mobile menu opens and navigates to pricing', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await homePage.navbar.gotoSectionMobile('Pricing');
    await expect(homePage.pricing.sectionTitle).toBeVisible();
  });

  test('footer has 4 social links', async () => {
    expect(await homePage.footer.getSocialLinkCount()).toBe(4);
  });
});