import { Page, Locator } from '@playwright/test';

/**
 * FooterComponent
 * Wraps <footer> — brand blurb, social links, three link columns, legal bottom bar.
 */
export class FooterComponent {
  readonly page: Page;
  readonly root: Locator;

  readonly brandBlurb: Locator;
  readonly socialLinks: Locator;
  readonly footerColumns: Locator;
  readonly copyrightText: Locator;
  readonly legalLinks: Locator;

  constructor(page: Page) {
    this.page = page;

    // Fragile: single <footer> element, no id — but tag itself is unique on the page.
    this.root = page.locator('footer');

    this.brandBlurb = this.root.locator('.footer-brand p');
    this.socialLinks = this.root.locator('.footer-social a');
    this.footerColumns = this.root.locator('.footer-column');
    this.copyrightText = this.root.locator('.footer-bottom p');
    this.legalLinks = this.root.locator('.footer-bottom-links a');
  }

  /** Get a footer column by its heading, e.g. "Services" | "Company" | "Resources". */
  columnByTitle(title: string): Locator {
    return this.footerColumns.filter({ has: this.page.getByRole('heading', { name: title } ) });
  }

  async clickColumnLink(columnTitle: string, linkText: string): Promise<void> {
    await this.columnByTitle(columnTitle).getByRole('link', { name: linkText }).click();
  }

  async clickLegalLink(text: 'Privacy Policy' | 'Terms of Service' | 'Cookies'): Promise<void> {
    await this.legalLinks.filter({ hasText: text }).click();
  }

  async getSocialLinkCount(): Promise<number> {
    return this.socialLinks.count();
  }
}
