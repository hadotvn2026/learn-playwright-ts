import { test as base } from '@playwright/test';
import { BMIPage } from '../pages/bmi.page';

type BMIPageFixture = {
    bmiPage: BMIPage;
};

export const test = base.extend<BMIPageFixture>({
    bmiPage: async ({ page }, use) => {
        const bmiPage = new BMIPage(page);
        await use(bmiPage);  
    }
});

export { expect } from '@playwright/test';