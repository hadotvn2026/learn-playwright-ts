import {test,expect} from '@playwright/test'

test('verify infinity scroll down', async({page}) =>{
    await page.goto('https://the-internet.herokuapp.com/infinite_scroll')

   for(let i =0;i<5;i++){
        await page.mouse.wheel(0, 100);
        i++;
   }

})