import { Page, Locator } from '@playwright/test';

/**
 * CtaComponent
 * Wraps <section class="cta-section" id="contact"> — final "book a call" call-to-action.
 */
export class CtaComponent {
  readonly page: Page;
  readonly root: Locator;

  readonly heading: Locator;
  readonly emailLink: Locator;
  readonly bookCallLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Stable: has id="contact"
    this.root = page.locator('#contact');

    this.heading = this.root.locator('h2');

    // Stable-ish: matched by mailto href, unlikely to change.
    this.emailLink = this.root.locator('a[href^="mailto:"]');

    // Fragile: matched by text only.
    this.bookCallLink = this.root.getByRole('link', { name: 'Book a Call' });
  }

  async clickEmail(): Promise<void> {
    await this.emailLink.click();
  }

  async clickBookCall(): Promise<void> {
    await this.bookCallLink.click();
  }

  async getEmailAddress(): Promise<string | null> {
    return this.emailLink.getAttribute('href');
  }
}
