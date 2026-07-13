import { Page, Locator } from '@playwright/test';

/**
 * PricingComponent
 * Wraps <section class="pricing" id="pricing"> — Starter / Professional / Enterprise plan cards.
 */
export class PricingComponent {
  readonly page: Page;
  readonly root: Locator;

  readonly sectionTitle: Locator;
  readonly cards: Locator;
  readonly featuredCard: Locator;

  constructor(page: Page) {
    this.page = page;

    // Stable: has id="pricing"
    this.root = page.locator('#pricing');

    this.sectionTitle = this.root.locator('.section-title');

    // Fragile: no ids/test-ids on individual cards.
    this.cards = this.root.locator('.pricing-card');
    this.featuredCard = this.root.locator('.pricing-card.featured');
  }

  /** Get a plan card by heading, e.g. "Starter" | "Professional" | "Enterprise". */
  cardByPlan(planName: 'Starter' | 'Professional' | 'Enterprise'): Locator {
    return this.cards.filter({ has: this.page.getByRole('heading', { name: planName } ) });
  }

  async getPrice(planName: 'Starter' | 'Professional' | 'Enterprise'): Promise<string | null> {
    return this.cardByPlan(planName).locator('.price').textContent();
  }

  async getFeatures(planName: 'Starter' | 'Professional' | 'Enterprise'): Promise<string[]> {
    return this.cardByPlan(planName)
      .locator('.pricing-features li:not(.disabled)')
      .allTextContents();
  }

  async getDisabledFeatures(planName: 'Starter' | 'Professional' | 'Enterprise'): Promise<string[]> {
    return this.cardByPlan(planName).locator('.pricing-features li.disabled').allTextContents();
  }

  async clickPlanButton(planName: 'Starter' | 'Professional' | 'Enterprise'): Promise<void> {
    // Button text differs per plan ("Get Started" vs "Contact Us"); grab whatever button exists in that card.
    await this.cardByPlan(planName).locator('.pricing-btn').click();
  }

  async isMostPopular(planName: 'Starter' | 'Professional' | 'Enterprise'): Promise<boolean> {
    return (await this.cardByPlan(planName).locator('.pricing-popular').count()) > 0;
  }
}
