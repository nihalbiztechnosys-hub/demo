import { Page, Locator } from '@playwright/test';

/**
 * ServicesComponent
 * Wraps <section class="services" id="services"> — grid of service cards.
 */
export class ServicesComponent {
  readonly page: Page;
  readonly root: Locator;

  readonly sectionTitle: Locator;
  readonly sectionSubtitle: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    this.page = page;

    // Stable: has id="services"
    this.root = page.locator('#services');

    this.sectionTitle = this.root.locator('.section-title');
    this.sectionSubtitle = this.root.locator('.section-subtitle');

    // Fragile: cards differentiated only by class + child text, no ids/test-ids.
    this.cards = this.root.locator('.service-card');
  }

  async count(): Promise<number> {
    return this.cards.count();
  }

  /** Get a service card by its visible heading, e.g. "Web Development". */
  cardByTitle(title: string): Locator {
    return this.cards.filter({ has: this.page.getByRole('heading', { name: title }) });
  }

  cardByIndex(index: number): Locator {
    return this.cards.nth(index);
  }

  async clickLearnMore(title: string): Promise<void> {
    await this.cardByTitle(title).locator('.arrow').click();
  }

  async getAllTitles(): Promise<string[]> {
    return this.cards.locator('h3').allTextContents();
  }
}
