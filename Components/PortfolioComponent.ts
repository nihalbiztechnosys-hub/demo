import { Page, Locator } from '@playwright/test';

/**
 * PortfolioComponent
 * Wraps <section class="portfolio" id="portfolio"> — grid of project cards with image + overlay.
 */
export class PortfolioComponent {
  readonly page: Page;
  readonly root: Locator;

  readonly sectionTitle: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    this.page = page;

    // Stable: has id="portfolio"
    this.root = page.locator('#portfolio');

    this.sectionTitle = this.root.locator('.section-title');

    // Fragile: no ids/test-ids on individual cards.
    this.cards = this.root.locator('.portfolio-card');
  }

  async count(): Promise<number> {
    return this.cards.count();
  }

  /** Get a portfolio card by its project name, e.g. "FinFlow Banking". */
  cardByProjectName(name: string): Locator {
    return this.cards.filter({ has: this.page.getByRole('heading', { name } ) });
  }

  cardByIndex(index: number): Locator {
    return this.cards.nth(index);
  }

  async getTagFor(projectName: string): Promise<string | null> {
    return this.cardByProjectName(projectName).locator('.portfolio-tag').textContent();
  }

  async getAllProjectNames(): Promise<string[]> {
    return this.cards.locator('h3').allTextContents();
  }

  async hoverCard(projectName: string): Promise<void> {
    await this.cardByProjectName(projectName).hover();
  }
}
