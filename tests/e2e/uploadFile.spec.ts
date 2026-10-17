import {test, expect} from '@playwright/test';

test('upload a file', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    
    const filePath = 'uploads/resume.txt';
    await page.setInputFiles('input[type="file"]', filePath);
    
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toContainText('resume.txt');
});
