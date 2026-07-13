import { Page, Locator, expect } from '@playwright/test';

/**
 * NavbarComponent
 * Wraps <nav id="navbar"> — desktop nav links, CTA, and mobile hamburger/menu.
 */
export class NavbarComponent {
  readonly page: Page;
  readonly root: Locator;

  readonly logo: Locator;
  readonly navLinks: Locator;
  readonly servicesLink: Locator;
  readonly workLink: Locator;
  readonly reviewsLink: Locator;
  readonly pricingLink: Locator;
  readonly getStartedCta: Locator;

  readonly hamburger: Locator;
  readonly mobileMenu: Locator;
  readonly mobileServicesLink: Locator;
  readonly mobileWorkLink: Locator;
  readonly mobileReviewsLink: Locator;
  readonly mobilePricingLink: Locator;
  readonly mobileGetStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Stable: has id="navbar"
    this.root = page.locator('#navbar');

    this.logo = this.root.locator('.logo');
    this.navLinks = this.root.locator('.nav-links');

    // Fragile: no test-id, matched by href/text. Prefer getByRole where text is unique.
    this.servicesLink = this.root.getByRole('link', { name: 'Services' });
    this.workLink = this.root.getByRole('link', { name: 'Work' });
    this.reviewsLink = this.root.getByRole('link', { name: 'Reviews' });
    this.pricingLink = this.root.getByRole('link', { name: 'Pricing' });
    this.getStartedCta = this.root.getByRole('link', { name: 'Get Started' });

    // Stable: has id="hamburger"
    this.hamburger = page.locator('#hamburger');

    // Stable: has id="mobileMenu"
    this.mobileMenu = page.locator('#mobileMenu');
    this.mobileServicesLink = this.mobileMenu.getByRole('link', { name: 'Services' });
    this.mobileWorkLink = this.mobileMenu.getByRole('link', { name: 'Work' });
    this.mobileReviewsLink = this.mobileMenu.getByRole('link', { name: 'Reviews' });
    this.mobilePricingLink = this.mobileMenu.getByRole('link', { name: 'Pricing' });
    this.mobileGetStartedLink = this.mobileMenu.getByRole('link', { name: 'Get Started' });
  }

  /** Click a top-level nav link (desktop). */
  async gotoSection(section: 'Services' | 'Work' | 'Reviews' | 'Pricing'): Promise<void> {
    await this.root.getByRole('link', { name: section }).click();
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedCta.click();
  }

  async openMobileMenu(): Promise<void> {
    await this.hamburger.click();
    await expect(this.mobileMenu).toHaveClass(/active/);
  }

  async closeMobileMenu(): Promise<void> {
    // Menu toggles closed by clicking the hamburger again, or any mobile link click.
    await this.hamburger.click();
    await expect(this.mobileMenu).not.toHaveClass(/active/);
  }

  async gotoSectionMobile(section: 'Services' | 'Work' | 'Reviews' | 'Pricing'): Promise<void> {
    await this.openMobileMenu();
    await this.mobileMenu.getByRole('link', { name: section }).click();
  }

  async isScrolledStateActive(): Promise<boolean> {
    const classAttr = await this.root.getAttribute('class');
    return !!classAttr?.includes('scrolled');
  }
}
