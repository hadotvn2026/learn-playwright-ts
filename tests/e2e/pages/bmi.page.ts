import { expect, type Locator, type Page } from '@playwright/test';

export class BMIPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://www.calculator.net/bmi-calculator.html');
    }
    
    async selectMetricUnits() {
        await this.page.getByRole('link', { name: 'Metric Units' }).click();
    }

    async clearForm() {
        await this.page.getByRole('button', { name: 'Clear' }).click();
    }

    async calculateBMI(age: string, gender: string, height: string, weight: string) {
        await this.page.locator('#cage').fill(age);
        if (gender === 'Male') {
            await this.page.getByRole('radio', { name: 'Male', exact: true }).check();
        } else {
            await this.page.getByRole('radio', { name: 'Female', exact: true }).check();
        }
        await this.page.getByRole('radio', { name: gender, exact: true }).check();
        await this.page.locator('#cheightmeter').fill(height);
        await this.page.locator('#ckg').fill(weight);
        await this.page.getByRole('button', { name: 'Calculate' }).click();
    }

    async getBMIResult() {
       return this.page.locator('.rightresult .bigtext');
    }
}