import { Page, Locator } from '@playwright/test';
import { NavbarComponent } from './NavbarComponent';
import { HeroComponent } from './HeroComponent';
import { ServicesComponent } from './ServicesComponent';
import { PortfolioComponent } from './PortfolioComponent';
import { TestimonialsComponent } from './TestimonialsComponent';
import { PricingComponent } from './PricingComponent';
import { CtaComponent } from './CtaComponent';
import { FooterComponent } from './FooterComponent';

/**
 * HomePage
 * Composes every section of the Zenith Studio landing page as component objects.
 * Keep page-level-only elements (back-to-top button) here; everything else
 * belongs to its respective component class.
 */
export class HomePage {
  readonly page: Page;

  readonly navbar: NavbarComponent;
  readonly hero: HeroComponent;
  readonly services: ServicesComponent;
  readonly portfolio: PortfolioComponent;
  readonly testimonials: TestimonialsComponent;
  readonly pricing: PricingComponent;
  readonly cta: CtaComponent;
  readonly footer: FooterComponent;

  readonly backToTopButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.navbar = new NavbarComponent(page);
    this.hero = new HeroComponent(page);
    this.services = new ServicesComponent(page);
    this.portfolio = new PortfolioComponent(page);
    this.testimonials = new TestimonialsComponent(page);
    this.pricing = new PricingComponent(page);
    this.cta = new CtaComponent(page);
    this.footer = new FooterComponent(page);

    // Stable: has id="backToTop"
    this.backToTopButton = page.locator('#backToTop');
  }

  async goto(baseUrl: string = '/'): Promise<void> {
    await this.page.goto(baseUrl);
  }

  async clickBackToTop(): Promise<void> {
    await this.backToTopButton.click();
  }

  async isBackToTopVisible(): Promise<boolean> {
    const classAttr = await this.backToTopButton.getAttribute('class');
    return !!classAttr?.includes('visible');
  }
}
