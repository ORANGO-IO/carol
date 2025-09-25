import { test, expect } from '@playwright/test';

test.describe('CAROL Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page', async ({ page }) => {
    await expect(page).toHaveTitle(/CAROL/i);
    await expect(page.locator('h1')).toContainText(/Classificação/i);
  });

  test('should show form fields', async ({ page }) => {
    // Verificar se campos essenciais estão visíveis
    await expect(page.locator('input[name="age"]')).toBeVisible();
    await expect(page.locator('select[name="categoria"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Tentar submeter sem preencher campos obrigatórios
    await page.click('button[type="submit"]');
    
    // Verificar mensagens de erro
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('should allow filling patient data', async ({ page }) => {
    // Preencher dados do paciente
    await page.fill('input[name="age"]', '35');
    await page.selectOption('select[name="categoria"]', '1');
    await page.fill('input[name="temperatura"]', '38.5');
    
    // Verificar se valores foram preenchidos
    await expect(page.locator('input[name="age"]')).toHaveValue('35');
    await expect(page.locator('input[name="temperatura"]')).toHaveValue('38.5');
  });
});