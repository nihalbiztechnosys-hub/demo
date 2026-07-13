import { Page, Locator } from '@playwright/test';

/**
 * TestimonialsComponent
 * Wraps <section class="testimonials" id="testimonials"> — grid of review cards.
 */
export class TestimonialsComponent {
  readonly page: Page;
  readonly root: Locator;

  readonly sectionTitle: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    this.page = page;

    // Stable: has id="testimonials"
    this.root = page.locator('#testimonials');

    this.sectionTitle = this.root.locator('.section-title');

    // Fragile: no ids/test-ids on individual cards.
    this.cards = this.root.locator('.testimonial-card');
  }

  async count(): Promise<number> {
    return this.cards.count();
  }

  /** Get a testimonial card by author name, e.g. "Sarah Mitchell". */
  cardByAuthor(authorName: string): Locator {
    return this.cards.filter({ has: this.page.getByRole('heading', { name: authorName } ) });
  }

  async getStarCount(authorName: string): Promise<number> {
    return this.cardByAuthor(authorName).locator('.testimonial-stars i.fa-star').count();
  }

  async getReviewText(authorName: string): Promise<string | null> {
    return this.cardByAuthor(authorName).locator('.testimonial-text').textContent();
  }

  async getRoleFor(authorName: string): Promise<string | null> {
    return this.cardByAuthor(authorName).locator('.testimonial-info span').textContent();
  }
}
