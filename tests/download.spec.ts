import {test, expect} from '@playwright/test';
import {fs} from 'fs';

test('download a file', async ({page}) => {
    await page.goto('/download');
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: 'resume.txt' }).click(),
    ]);
    
    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toBe('resume.txt');
    
    const filePath = 'downloads/'+suggestedFilename;
    await download.saveAs(filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();
});

test('download multiple files', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    const fileNames = ["t1.txt","text.txt"];
    
   for (const fileName of fileNames) {
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByRole('link', { name: fileName }).first().click(),
        ]);
        
        const suggestedFilename = download.suggestedFilename();
        expect(suggestedFilename).toBe(fileName);
        
        const filePath = 'downloads/'+suggestedFilename;
        await download.saveAs(filePath);
        expect(fs.existsSync(filePath)).toBeTruthy();
    }
});