import { Page, Locator } from '@playwright/test';

/**
 * HeroComponent
 * Wraps <section class="hero" id="hero"> — headline, CTA buttons, animated stat counters.
 */
export class HeroComponent {
  readonly page: Page;
  readonly root: Locator;

  readonly badge: Locator;
  readonly heading: Locator;
  readonly bodyText: Locator;
  readonly startProjectButton: Locator;
  readonly viewWorkButton: Locator;

  readonly statItems: Locator;
  readonly projectsDoneCount: Locator;
  readonly clientSatisfactionCount: Locator;
  readonly yearsExperienceCount: Locator;

  constructor(page: Page) {
    this.page = page;

    // Stable: has id="hero"
    this.root = page.locator('#hero');

    this.badge = this.root.locator('.hero-badge');
    this.heading = this.root.locator('h1');
    this.bodyText = this.root.locator('.hero-text');

    // Fragile: matched by visible text, only unique within this section.
    this.startProjectButton = this.root.getByRole('link', { name: 'Start a Project' });
    this.viewWorkButton = this.root.getByRole('link', { name: 'View Our Work' });

    this.statItems = this.root.locator('.stat-item');
    // Fragile: relies on data-target attribute + DOM order (no ids on individual stats).
    this.projectsDoneCount = this.root.locator('.stat-item', { hasText: 'Projects Done' }).locator('.counting');
    this.clientSatisfactionCount = this.root
      .locator('.stat-item', { hasText: 'Client Satisfaction' })
      .locator('.counting');
    this.yearsExperienceCount = this.root
      .locator('.stat-item', { hasText: 'Years Experience' })
      .locator('.counting');
  }

  async clickStartProject(): Promise<void> {
    await this.startProjectButton.click();
  }

  async clickViewWork(): Promise<void> {
    await this.viewWorkButton.click();
  }

  /** Reads the final animated counter value once the count-up finishes. */
  async getProjectsDoneValue(): Promise<number> {
    return Number(await this.projectsDoneCount.textContent());
  }

  async getClientSatisfactionValue(): Promise<number> {
    return Number(await this.clientSatisfactionCount.textContent());
  }

  async getYearsExperienceValue(): Promise<number> {
    return Number(await this.yearsExperienceCount.textContent());
  }
}
