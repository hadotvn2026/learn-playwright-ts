import { test, expect } from './fixtures/bmi.fixture';

/**
 * Data-driven test for BMI calculation with different age, gender, height, and weight combinations (Parameterized test)
 * to verify 8 classifications of BMI results (
 * Severe thinness,
 *  Moderate thinness,
 *  Mild thinness,
 *  Normal,
 *  Overweight,
 *  Obese Class I, 
 * Obese Class II,
 *  Obese Class III
 * )
 */

[
    { age: '25', gender: 'Male', height: '180', weight: '30', expectedBMI: 'BMI = 9.3 kg/m2   (Severe thinness)' },
    { age: '25', gender: 'Male', height: '180', weight: '75', expectedBMI: 'BMI = 23.1 kg/m2 (Normal)' },
].forEach(({ age, gender, height, weight, expectedBMI }) => {
    test(`expect bmi = ${expectedBMI} with ${age}, ${gender}, ${height}, ${weight}`, async ({ bmiPage }) => {
        await bmiPage.open();
        await bmiPage.selectMetricUnits();
        await bmiPage.clearForm();
        await bmiPage.calculateBMI(age, gender, height, weight);
        const bmiResult = await bmiPage.getBMIResult();
        // toHaveText normalizes whitespace (incl. non-breaking spaces) and auto-retries
        await expect(bmiResult).toHaveText(expectedBMI);
    })
})