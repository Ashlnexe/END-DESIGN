const { test, expect } = require('@playwright/test');

test.describe('BLOOM Portfolio Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the local server
    await page.goto('http://localhost:8080');
  });

  test('should load the page with correct title and header', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle('BLOOM Portfolio');
    
    // Check header logo text
    const logoText = page.locator('.logo-text');
    await expect(logoText).toHaveText('BLOOM');
    
    // Check main title
    const mainTitle = page.locator('.hero-title');
    await expect(mainTitle).toHaveText('Portfolio');
  });

  test('should display all gallery items by default', async ({ page }) => {
    // Check that there are 7 gallery items visible
    const visibleItems = page.locator('.gallery-item:not(.hidden)');
    await expect(visibleItems).toHaveCount(7);
  });

  test('should filter gallery items when clicking category buttons', async ({ page }) => {
    // Click on 'Interior' filter
    const interiorBtn = page.locator('button[data-filter="interior"]');
    await interiorBtn.click();
    
    // Active class should be updated
    await expect(interiorBtn).toHaveClass(/active/);
    
    // 'All' button should not have active class anymore
    const allBtn = page.locator('button[data-filter="all"]');
    await expect(allBtn).not.toHaveClass(/active/);

    // Verify correct items are displayed/hidden
    // (Interior category items should be visible, others hidden)
    const visibleItems = page.locator('.gallery-item:not(.hidden)');
    await expect(visibleItems).toHaveCount(4); // We have 4 interior items in index.html

    // Click on 'Exterior' filter
    const exteriorBtn = page.locator('button[data-filter="exterior"]');
    await exteriorBtn.click();
    
    // Verify exterior items count
    const visibleExteriorItems = page.locator('.gallery-item:not(.hidden)');
    await expect(visibleExteriorItems).toHaveCount(3); // We have 3 exterior items in index.html
  });

  test('should display all items when clicking the All button', async ({ page }) => {
    // Click on 'Interior' filter first to filter things out
    await page.locator('button[data-filter="interior"]').click();
    
    // Click 'All' filter
    const allBtn = page.locator('button[data-filter="all"]');
    await allBtn.click();

    // Verify all items are visible again
    const visibleItems = page.locator('.gallery-item:not(.hidden)');
    await expect(visibleItems).toHaveCount(7);
  });
});
